#!/usr/bin/env python3
"""Refresh the EPS_PE model's `baseEps` from consensus after a stock reports.

WHAT THIS DOES AND DOES NOT DO
------------------------------
`baseEps` is a **forward** estimate -- next fiscal year's consensus non-GAAP EPS, not
the quarter a company just reported. So this does not copy a reported number into the
model. It takes Yahoo's forward consensus (`epsForward`) for stocks that have just
reported, and writes it where it differs from what is stored.

It does NOT touch `scenarios` -- `epsCagr`, `exitPE`, `revGrowth`. Those encode a view
about the next five years, taken from guidance and transcripts, and nothing in a quote
endpoint can set them. A stock whose guidance changed still needs a human; this only
stops the *base* of the projection being two quarters stale.

It does NOT touch `dataReviewedOn`. That field means a person checked this stock, it is
what `review_status.py` reports on, and a bot writing it would destroy the one signal
separating checked from unchecked. `epsSyncedOn` records what this script did instead,
so the two stay distinguishable.

NOTHING THIS WRITES REACHES main DIRECTLY
-----------------------------------------
The workflow runs this on a branch and opens a pull request. Every change is a diff
to read before it is anything else, and the PR body carries the before/after rating for
each stock so the consequence is visible without opening the files. That is the point:
`baseEps` feeds the rating and the rating feeds the home-page group, so a misparsed
figure moves a stock between PRIME GROWTH and AVOID. A diff catches that; a nightly
commit to main does not.

GUARDS
------
The guards below still apply, because a bad proposal wastes a review:

  * only `modelType: 'EPS_PE'` stocks are touched -- DCF stocks have no `baseEps`;
  * a change larger than MAX_JUMP is reported, never written. Yahoo's basis is not
    always the non-GAAP consensus the stored comment cites, and that mismatch shows up
    as a large jump rather than a small one;
  * a change smaller than MIN_JUMP is skipped as noise;
  * a non-positive or missing estimate is skipped;
  * the rating is computed before and after, with the stored `currentPrice`, and any
    stock whose rating moves is called out in the report;
  * the provenance comment beside `baseEps` is rewritten, because leaving a comment
    citing a different source and date beside a new number is worse than no comment.

`lastReportTag` is updated only where the stock's existing tag is calendar-style
("Q3 2026"), which can be derived from the report date. A fiscal tag ("Q4 FY26") needs
the fiscal year end, which is not in any file here, so those are left and listed.

USAGE
    python3 earnings_sync.py                  # dry run: who reported, what would change
    python3 earnings_sync.py --apply          # write the files (the workflow then PRs them)
    python3 earnings_sync.py --window 10      # look back further (default 5 days)
    python3 earnings_sync.py --backlog        # every stock whose model predates its print
    python3 earnings_sync.py --quotes q.json  # read quotes from a file instead of Yahoo
"""
import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta

import update_prices as up

HERE = os.path.dirname(os.path.abspath(__file__))
STOCKS_DIR = os.path.join(HERE, "stocks")
CALENDAR = os.path.join(HERE, "data", "earningsCalendar.json")

WINDOW = 5          # days after a print that still counts as "just reported"
MAX_JUMP = 0.25     # a bigger move than this is reported, not written
MIN_JUMP = 0.005    # smaller than this is not worth a commit
SOURCE = "Yahoo consensus"


# ── which stocks are due ────────────────────────────────────────────────────────

def _field(src, name):
    m = re.search(rf"{name}:\s*'([^']*)'", src)
    return m.group(1) if m else None


def stock_src(ticker):
    path = os.path.join(STOCKS_DIR, f"{ticker}.ts")
    if not os.path.exists(path):
        return None, None
    with open(path) as fh:
        return path, fh.read()


def due(today, window=WINDOW, backlog=False):
    """[(ticker, report_date)] for stocks that reported and whose model predates it."""
    if not os.path.exists(CALENDAR):
        return []
    with open(CALENDAR) as fh:
        cal = json.load(fh)
    out = []
    for ticker, ev in sorted(cal.items()):
        iso = ev.get("date")
        if not iso:
            continue
        try:
            when = date.fromisoformat(iso)
        except ValueError:
            continue
        if when > today:
            continue                                   # not reported yet
        if not backlog and when < today - timedelta(days=window):
            continue
        path, src = stock_src(ticker)
        if not src:
            continue                                   # watchlist-only: no model to update
        synced = _field(src, "epsSyncedOn")
        reviewed = _field(src, "dataReviewedOn")
        fresh = max(x for x in (synced, reviewed, "0000-00-00") if x)
        if fresh >= iso:
            continue                                   # already current for this print
        out.append((ticker, iso))
    return out


# ── consensus ───────────────────────────────────────────────────────────────────

def fetch_quotes(symbols, opener=None, crumb=None):
    """{ticker: {...}} of the quote fields this script reads. Empty on failure."""
    out = {}
    for i in range(0, len(symbols), 50):
        batch = symbols[i:i + 50]
        url = ("https://query2.finance.yahoo.com/v7/finance/quote?symbols="
               + ",".join(batch) + (f"&crumb={crumb}" if crumb else ""))
        try:
            req = urllib.request.Request(url, headers=up.HEADERS)
            fh = opener.open(req, timeout=20) if opener else urllib.request.urlopen(req, timeout=20)
            data = json.loads(fh.read().decode())
        except (urllib.error.HTTPError, urllib.error.URLError, ValueError) as exc:
            print(f"  quote batch {i // 50 + 1} failed ({exc})")
            continue
        for q in data.get("quoteResponse", {}).get("result", []):
            sym = q.get("symbol")
            if sym:
                out[sym] = q
    return out


def consensus_eps(quote):
    """Forward consensus EPS from a quote record, or None."""
    for key in ("epsForward", "epsCurrentYear"):
        v = quote.get(key)
        if isinstance(v, (int, float)) and v > 0:
            return float(v), key
    return None, None


# ── writing ─────────────────────────────────────────────────────────────────────

def calendar_tag(iso):
    """'Q3 2026' from a report date -- the quarter that was REPORTED, i.e. the prior one."""
    d = date.fromisoformat(iso)
    q = (d.month - 1) // 3 + 1
    q, year = (4, d.year - 1) if q == 1 else (q - 1, d.year)
    return f"Q{q} {year}"


def _fmt(v):
    s = f"{v:.2f}"
    return s.rstrip("0").rstrip(".") if "." in s else s


def _provenance(old_eps, old_comment, field, iso, today):
    """The new trailing comment, carrying the previous note rather than deleting it.

    The old comment describes the old number, so leaving it beside a new one is a lie --
    but deleting it throws away hand-written provenance ("stockanalysis consensus (Oct 8
    2026; range $0.52-0.60; FY27E $0.75)"), which is exactly the sort of prose the
    rulebook says not to eat. So it is demoted to a `Prior:` clause, which is the
    convention these files already use. Any previous `Prior:` chain is dropped, so the
    comment does not grow by a clause every quarter.
    """
    note = re.sub(r"\s*(?:--|—)?\s*Prior:.*$", "", (old_comment or "").strip()).strip()
    head = f"{SOURCE} ({field}), synced {today} after the {iso} report."
    if old_eps is None:
        return f"  // {head}"
    tail = f" Prior: {_fmt(old_eps)}" + (f" — {note}" if note else "") + ("" if note.endswith('.') else ".")
    return f"  // {head}{tail}"


def apply_to_file(path, src, new_eps, field, iso, tag_style, old_eps=None):
    """Return the rewritten source: baseEps + its comment, epsSyncedOn, maybe lastReportTag."""
    today = date.today().isoformat()
    m = re.search(r"\n\s*baseEps:\s*[\d.]+\s*,[ \t]*//[ \t]*([^\n]*)", src)
    comment = _provenance(old_eps, m.group(1) if m else None, field, iso, today)
    src = re.sub(r"(\n\s*baseEps:\s*)[\d.]+\s*,(?:[^\n]*)",
                 lambda mm: f"{mm.group(1)}{_fmt(new_eps)},{comment}", src, count=1)
    if re.search(r"\n\s*epsSyncedOn:\s*'[^']*'", src):
        src = re.sub(r"(\n\s*epsSyncedOn:\s*)'[^']*'", rf"\g<1>'{today}'", src, count=1)
    else:
        src = re.sub(r"(\n(\s*)dataReviewedOn:\s*'[^']*',)",
                     rf"\1\n\2epsSyncedOn: '{today}',", src, count=1)
    if tag_style == "calendar":
        src = re.sub(r"(\n\s*lastReportTag:\s*)'[^']*'", rf"\g<1>'{calendar_tag(iso)}'", src, count=1)
    return src


def rating_of(path, price=None):
    p = up.get_stock_params(path)
    price = price or p.get("currentPrice")
    target = up._base_target(p, price)
    return up._eff_rating(target, price, p.get("rsRating", 50), p.get("aiImpact"),
                          p.get("ratingOverride")), target, price


# ── main ────────────────────────────────────────────────────────────────────────

def run(apply=False, window=WINDOW, backlog=False, quotes_file=None, today=None, summary_path=None):
    today = today or date.today()
    todo = due(today, window, backlog)
    if not todo:
        print("No stock has reported since its model was last synced.")
        return 0
    print(f"{len(todo)} stock(s) reported and carry a model older than the print:")
    for t, iso in todo:
        print(f"  {t:6} reported {iso}")

    if quotes_file:
        with open(quotes_file) as fh:
            quotes = json.load(fh)
    else:
        try:
            opener, crumb = up.get_yahoo_session()
        except Exception:
            opener, crumb = None, None
        quotes = fetch_quotes([t for t, _ in todo], opener, crumb)
    print(f"\nconsensus returned for {len(quotes)}/{len(todo)}\n")

    wrote, flagged, skipped, moves = [], [], [], []
    for ticker, iso in todo:
        path, src = stock_src(ticker)
        p = up.get_stock_params(path)
        if p.get("modelType") != "EPS_PE":
            skipped.append((ticker, "DCF model, no baseEps"))
            continue
        old = p.get("baseEps")
        q = quotes.get(ticker)
        if not q:
            skipped.append((ticker, "no quote"))
            continue
        new, field = consensus_eps(q)
        if new is None:
            skipped.append((ticker, "no forward estimate"))
            continue
        if not old:
            flagged.append((ticker, old, new, "no stored baseEps to compare"))
            continue
        delta = (new - old) / abs(old)
        if abs(delta) < MIN_JUMP:
            skipped.append((ticker, f"unchanged ({_fmt(new)})"))
            continue
        if abs(delta) > MAX_JUMP:
            flagged.append((ticker, old, new, f"{delta:+.0%} is past the {MAX_JUMP:.0%} guard"))
            continue

        before, _, price = rating_of(path)
        tag = _field(src, "lastReportTag") or ""
        style = "calendar" if re.fullmatch(r"Q[1-4] \d{4}", tag) else "fiscal"
        new_src = apply_to_file(path, src, new, field, iso, style, old_eps=old)
        if apply:
            with open(path, "w") as fh:
                fh.write(new_src)
            after, _, _ = rating_of(path)
        else:
            tmp = path + ".__probe"
            with open(tmp, "w") as fh:
                fh.write(new_src)
            after, _, _ = rating_of(tmp)
            os.remove(tmp)
        wrote.append((ticker, old, new, delta, style, before, after))
        if before != after:
            moves.append((ticker, before, after))

    verb = "Updated" if apply else "Would update"
    print(f"{verb} baseEps on {len(wrote)} stock(s):")
    for t, old, new, d, style, b, a in wrote:
        tagnote = "" if style == "calendar" else "  (fiscal tag left alone)"
        rate = f"  {b} -> {a}" if b != a else f"  {b}"
        print(f"  {t:6} {_fmt(old):>8} -> {_fmt(new):<8} {d:+6.1%}{rate}{tagnote}")
    if moves:
        print(f"\n  RATING MOVED on {len(moves)}: "
              + ", ".join(f"{t} {b}->{a}" for t, b, a in moves))
    if flagged:
        print(f"\nReported, not written ({len(flagged)}) -- these want a human:")
        for t, old, new, why in flagged:
            print(f"  {t:6} {('%s -> %s' % (_fmt(old), _fmt(new))) if old else _fmt(new):<22} {why}")
    if skipped:
        print(f"\nSkipped ({len(skipped)}): "
              + ", ".join(f"{t} ({why})" for t, why in skipped))
    if not apply and wrote:
        print("\nDry run. Re-run with --apply to write.")

    if summary_path:
        lines = ["## Earnings sync", ""]
        if wrote:
            lines += [f"`baseEps` refreshed from consensus on **{len(wrote)}** stock(s) that have reported.",
                      "", "| stock | baseEps | change | rating |", "|---|---|---|---|"]
            for t, old_v, new_v, d, style, b, a in wrote:
                rating = f"**{b} → {a}**" if b != a else b
                lines.append(f"| {t} | {_fmt(old_v)} → {_fmt(new_v)} | {d:+.1%} | {rating} |")
        else:
            lines.append("No stock's `baseEps` moved enough to write.")
        if moves:
            lines += ["", f"⚠️ **{len(moves)} rating change(s)**: "
                      + ", ".join(f"{t} {b} → {a}" for t, b, a in moves)
                      + ". A rating change moves the home-page group, so check these first."]
        if flagged:
            lines += ["", "### Reported but NOT written — these want a human", "",
                      "| stock | consensus | why |", "|---|---|---|"]
            for t, old_v, new_v, why in flagged:
                shown = f"{_fmt(old_v)} → {_fmt(new_v)}" if old_v else _fmt(new_v)
                lines.append(f"| {t} | {shown} | {why} |")
        if skipped:
            lines += ["", "<details><summary>Skipped (" + str(len(skipped)) + ")</summary>", "",
                      ", ".join(f"{t} ({why})" for t, why in skipped), "", "</details>"]
        lines += ["", "---", "",
                  "`scenarios` (epsCagr, exitPE, revGrowth) are NOT touched — those need guidance and "
                  "transcripts, which no quote endpoint carries. `dataReviewedOn` is NOT touched either, "
                  "so it still means a person looked; `epsSyncedOn` records this run."]
        with open(summary_path, "w") as fh:
            fh.write("\n".join(lines) + "\n")
        print(f"\nSummary written to {summary_path}")
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--apply", action="store_true", help="write the changes (default is a dry run)")
    ap.add_argument("--window", type=int, default=WINDOW, help=f"days back to look (default {WINDOW})")
    ap.add_argument("--backlog", action="store_true",
                    help="ignore the window: every stock whose model predates its last print")
    ap.add_argument("--quotes", help="read quotes from a JSON file instead of Yahoo (testing)")
    ap.add_argument("--today", help="pretend today is this date (testing)")
    ap.add_argument("--summary", help="write a markdown summary here, for the pull request body")
    a = ap.parse_args()
    return run(apply=a.apply, window=a.window, backlog=a.backlog, quotes_file=a.quotes,
               today=date.fromisoformat(a.today) if a.today else None, summary_path=a.summary)


if __name__ == "__main__":
    sys.exit(main())
