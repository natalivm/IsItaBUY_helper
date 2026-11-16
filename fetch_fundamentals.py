#!/usr/bin/env python3
"""
Fetch reported fundamentals and earnings dates into the repo, so a review does
not have to start from a web search.

Two sources, neither needing a login, a cookie or a crumb:

  * Yahoo's fundamentals time series (annual, quarterly, trailing) — revenue,
    diluted EPS, net income, stock-based compensation, buybacks, EBITDA, EBIT,
    interest expense, debt, cash, operating cash flow, capex. This is the same
    data the `burry` and `debtSafety` blocks are entered from by hand.
  * Nasdaq's earnings calendar — report dates, for the stocks Yahoo's quote
    endpoint left without one in data/earningsCalendar.json.

It writes data/fundamentals.json (a cache, read by people and review agents;
the site never imports it) and fills GAPS in data/earningsCalendar.json. It
never edits a stock file: the figures feed a judgement — which fiscal year, what
`overstatementPct`, whether a leverage note still holds — and that stays a
review. `--compare` shows where a stock file has drifted from what was reported.

Usage:
    python3 fetch_fundamentals.py                 # dry run, every stock
    python3 fetch_fundamentals.py --apply         # write data/fundamentals.json
    python3 fetch_fundamentals.py NVDA AMAT       # only these tickers
    python3 fetch_fundamentals.py --compare       # stock files vs the cache (no network)
    python3 fetch_fundamentals.py --earnings      # dry run: fill missing earnings dates
    python3 fetch_fundamentals.py --earnings --apply

Money is stored in millions of the reporting currency. `currency` is recorded
because a foreign filer (ASML, NVO …) reports in its own; the stock files are in
USD, so `--compare` skips the money fields for those rather than compare units.
"""

import argparse
import glob
import json
import os
import re
import time
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
STOCKS_DIR = os.path.join(HERE, "stocks")
OUT = os.path.join(HERE, "data", "fundamentals.json")
CALENDAR = os.path.join(HERE, "data", "earningsCalendar.json")

# Plain on purpose. Yahoo's fundamentals endpoint answers 429 to a full
# browser-style User-Agent sent without a browser's cookies, and 200 to this.
HEADERS = {"User-Agent": "Mozilla/5.0"}

# Yahoo type suffix -> our key. Flows are prefixed annual/quarterly/trailing.
FIELDS = {
    "TotalRevenue": "revenue",
    "DilutedEPS": "epsDiluted",
    "NetIncome": "netIncome",
    "StockBasedCompensation": "sbc",
    "RepurchaseOfCapitalStock": "buyback",
    "EBITDA": "ebitda",
    "EBIT": "ebit",
    "InterestExpense": "interestExpense",
    "TotalDebt": "totalDebt",
    "CashCashEquivalentsAndShortTermInvestments": "cash",
    "OperatingCashFlow": "ocf",
    "CapitalExpenditure": "capex",
    "FreeCashFlow": "fcf",
}
PER_SHARE = {"epsDiluted"}
KEEP = {"annual": 4, "quarterly": 6, "trailing": 1}

# A stock file's figure further than this from the reported one is listed.
DRIFT = 0.20
# Nasdaq's calendar is one request per day; this is how far each way to look.
EARNINGS_BACK, EARNINGS_AHEAD = 100, 60
# Funds and indices the watchlist tracks; they never report.
NO_EARNINGS = {"SPY", "QQQ", "IWM", "DIA", "XOP", "XLE", "XLF", "SMH", "GLD", "SLV", "TLT", "IBIT"}
# Yahoo rate-limits this endpoint by address. One request per stock, paced; on a
# 429 wait and try once more, and after LIMIT_RETRIES of those stop the run.
PAUSE, LIMIT_WAIT, LIMIT_RETRIES = 0.6, 30, 3


class RateLimited(Exception):
    """Yahoo answered 429. Retrying at once only extends the ban, so the run
    stops, keeps what it has, and the next run picks up the rest."""


def _get(url, timeout=25, tries=3):
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code == 429:
                raise RateLimited(url)
            if e.code in (400, 404):
                raise
            err = e
        except (urllib.error.URLError, TimeoutError, ValueError) as e:
            err = e
        time.sleep(1.5 * (attempt + 1))
    raise err


def tickers():
    out = []
    for path in sorted(glob.glob(os.path.join(STOCKS_DIR, "*.ts"))):
        base = os.path.basename(path)[:-3]
        if base in ("index", "defineStock"):
            continue
        out.append(base)
    return out


WATCHLIST = os.path.join(HERE, "data", "patternWatchlist.ts")


def tracked():
    """Every symbol the site tracks: the valuation pages plus the watchlist-only
    names, which the landing page's "Reporting this week" lists just the same."""
    out = set(tickers())
    try:
        with open(WATCHLIST, encoding="utf-8") as f:
            out |= set(re.findall(r'ticker:\s*"([A-Z.\-]+)"', f.read()))
    except OSError:
        pass
    return sorted(out)


def _m(v):
    """Raw currency units -> millions, one decimal."""
    return round(v / 1e6, 1)


def fetch_one(ticker):
    """{'currency', 'annual': [...], 'quarterly': [...], 'trailing': {...}} newest last."""
    types = ",".join(p + f for p in KEEP for f in FIELDS)
    url = ("https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/"
           f"timeseries/{ticker}?type={types}&period1=1420070400&period2={int(time.time())}")
    data = _get(url)
    periods = {p: {} for p in KEEP}
    currency = None
    for series in data.get("timeseries", {}).get("result", []):
        t = (series.get("meta", {}).get("type") or [None])[0]
        if not t:
            continue
        for p in KEEP:
            if t.startswith(p) and t[len(p):] in FIELDS:
                key = FIELDS[t[len(p):]]
                for row in series.get(t) or []:
                    if not row or "reportedValue" not in row:
                        continue
                    raw = row["reportedValue"].get("raw")
                    if raw is None:
                        continue
                    currency = currency or row.get("currencyCode")
                    val = round(raw, 2) if key in PER_SHARE else _m(raw)
                    periods[p].setdefault(row["asOfDate"], {})[key] = val
    out = {"currency": currency}
    for p, n in KEEP.items():
        rows = [dict(asOf=d, **v) for d, v in sorted(periods[p].items())][-n:]
        out[p] = rows
    if not out["annual"] and not out["quarterly"]:
        return None
    out["derived"] = derive(out)
    return out


def derive(f):
    """The inputs the `burry` and `debtSafety` blocks take, from the latest fiscal
    year. Buybacks and capex are reported as outflows (negative); the stock files
    carry them as positive amounts."""
    # Yahoo opens a row for a fiscal year as soon as it ends, sometimes weeks
    # before the figures are filed. The latest year that carries an income
    # statement is the one a block can be entered from.
    full = [r for r in f["annual"] if "netIncome" in r]
    if not full:
        return {}
    a = full[-1]
    d = {"asOf": a["asOf"]}
    if "sbc" in a:
        d["sbc"] = a["sbc"]
    if "netIncome" in a:
        d["gaapNi"] = a["netIncome"]
    if "buyback" in a:
        d["buyback"] = abs(a["buyback"])
    if "sbc" in a and a.get("netIncome", 0) > 0:
        d["sbcToNiPct"] = round(100 * a["sbc"] / a["netIncome"], 1)
    if "totalDebt" in a and "cash" in a:
        d["netDebt"] = round(a["totalDebt"] - a["cash"], 1)
    elif "cash" in a and "totalDebt" not in a:
        d["netDebt"] = round(-a["cash"], 1)       # no debt line reported
    if "ebitda" in a:
        d["ebitda"] = a["ebitda"]
    if d.get("netDebt") is not None and a.get("ebitda", 0) > 0:
        d["netDebtToEbitda"] = round(d["netDebt"] / a["ebitda"], 2)
    if a.get("ocf", 0) > 0 and "capex" in a:
        d["capexToOcf"] = round(abs(a["capex"]) / a["ocf"], 3)
    if a.get("interestExpense", 0) > 0 and "ebit" in a:
        d["interestCoverage"] = round(a["ebit"] / a["interestExpense"], 1)
    return d


def load(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def save(path, obj, indent=1):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=indent, sort_keys=True)
        f.write("\n")


def run_fetch(want, apply):
    cache = load(OUT, {})
    today = date.today().isoformat()
    ok, changed, failed, limited = 0, [], [], 0
    # Never-fetched first, then oldest: a run cut short by a rate limit makes
    # progress on what is missing instead of redoing the same stocks. `fetchedOn`
    # is the day the figures last CHANGED, so an unchanged run rewrites nothing
    # and the scheduled job commits only when a company has actually filed.
    want = sorted(want, key=lambda t: cache.get(t, {}).get("fetchedOn", ""))
    for i, t in enumerate(want):
        try:
            got = fetch_one(t)
        except RateLimited:
            limited += 1
            if limited > LIMIT_RETRIES:
                failed.append(f"rate limited by Yahoo — stopped with {len(want) - i} stock(s) "
                              "unfetched; run again later, it resumes with those")
                break
            time.sleep(LIMIT_WAIT * limited)
            try:
                got = fetch_one(t)
            except Exception as e:
                failed.append(f"{t} ({type(e).__name__})")
                continue
        except Exception as e:                      # one symbol must not end the run
            failed.append(f"{t} ({type(e).__name__}: {e})")
            continue
        if not got:
            failed.append(f"{t} (no data)")
            continue
        ok += 1
        old = cache.get(t, {})
        if {k: v for k, v in old.items() if k != "fetchedOn"} != got:
            was = (old.get("derived") or {}).get("asOf")
            now = got["derived"].get("asOf")
            q_was = (old.get("quarterly") or [{}])[-1].get("asOf")
            q_now = (got["quarterly"] or [{}])[-1].get("asOf")
            what = []
            if now != was:
                what.append(f"fiscal year {was or '-'} -> {now}")
            if q_now != q_was:
                what.append(f"quarter {q_was or '-'} -> {q_now}")
            changed.append(f"{t:6} " + ("; ".join(what) or "figures restated"))
            cache[t] = dict(got, fetchedOn=today)
            if apply:
                save(OUT, cache)                    # as it goes: a stopped run keeps its work
        time.sleep(PAUSE)
    print(f"Fetched {ok}/{len(want)} stocks.")
    if changed:
        print(f"\n── NEW OR CHANGED ({len(changed)}) ──")
        for c in changed:
            print("  " + c)
    if failed:
        print(f"\n── FAILED ({len(failed)}) — previous figures kept ──")
        for c in failed:
            print("  " + c)
    if apply and changed:
        print(f"\nWrote {os.path.relpath(OUT, HERE)}")
    elif changed:
        print("\nDry run — pass --apply to write.")
    return cache


# ── compare: where a stock file has drifted from what was reported ──────────

def _block(src, name):
    m = re.search(rf"\b{name}:\s*\{{", src)
    if not m:
        return None
    i, depth = m.end(), 1
    while i < len(src) and depth:
        depth += {"{": 1, "}": -1}.get(src[i], 0)
        i += 1
    return src[m.end():i - 1]


def _num(block, name):
    m = re.search(rf"\b{name}:\s*(-?[\d_.]+)", block or "")
    return float(m.group(1).replace("_", "")) if m else None


def _str(block, name):
    m = re.search(rf"\b{name}:\s*'([^']*)'", block or "")
    return m.group(1) if m else None


def _off(have, got):
    if have is None or got is None:
        return None
    if abs(got) < 1:
        return abs(have - got) > 1
    return abs(have - got) / abs(got) > DRIFT


ESTIMATE = re.compile(r"(\d|FY)E\b|\best\b|estimate", re.I)
TRAILING = re.compile(r"LTM|TTM|\bQ\d", re.I)


def _basis(label):
    """What a block's `fy` label says its figures are: an estimate (nothing
    reported to hold it against), a trailing twelve months, or a fiscal year."""
    if not label:
        return "annual"
    if ESTIMATE.search(label):
        return "estimate"
    return "trailing" if TRAILING.search(label) else "annual"


def _debt_tier(net_debt, ebitda):
    """Steps 1 and 2 of the Debt Safety check: is leverage a question at all?"""
    if net_debt is None:
        return None
    if net_debt <= 0:
        return "net cash"
    if not ebitda or ebitda <= 0:
        return "over 2.0x"
    return "under 2.0x" if net_debt / ebitda <= 2.0 else "over 2.0x"


def run_compare(want):
    """Where a stock file disagrees with what was reported, like for like.

    A raw figure-by-figure comparison flags nearly every stock and means little:
    half the blocks are entered as estimates or trailing twelve months, EBITDA
    in a stock file is usually the company's adjusted figure, and net debt may
    or may not count leases. So: `burry` (GAAP lines, one definition) is compared
    on the basis its own `fy` label names, and `debtSafety` is compared on the
    only thing it decides — which side of net cash / 2.0x the stock falls."""
    cache = load(OUT, {})
    if not cache:
        print("No data/fundamentals.json yet — run with --apply first.")
        return
    newer, drift, tiers, missing, foreign, est = [], [], [], [], [], []
    for t in want:
        f = cache.get(t)
        if not f or not f.get("derived"):
            continue
        d = f["derived"]
        with open(os.path.join(STOCKS_DIR, t + ".ts"), encoding="utf-8") as fh:
            src = fh.read()
        burry, debt = _block(src, "burry"), _block(src, "debtSafety")
        if (f.get("currency") or "USD") != "USD":
            foreign.append(f"{t} ({f['currency']})")
            continue
        if burry is None and "sbc" in d and "gaapNi" in d:
            missing.append(f"{t:6} burry — FY ending {d['asOf']}: sbc {d['sbc']:,.0f}, gaapNi {d['gaapNi']:,.0f}"
                           + (f", buyback {d['buyback']:,.0f}" if "buyback" in d else "")
                           + (f"  (naive SBC/NI {d['sbcToNiPct']}%)" if "sbcToNiPct" in d else ""))
        if burry is not None:
            label = _str(burry, "fy")
            basis = _basis(label)
            if basis == "estimate":
                est.append(t)
            else:
                ref = d
                if basis == "trailing" and f.get("trailing"):
                    tr = f["trailing"][-1]
                    ref = {"sbc": tr.get("sbc"), "gaapNi": tr.get("netIncome"),
                           "buyback": abs(tr["buyback"]) if "buyback" in tr else None}
                notes = []
                for k in ("sbc", "gaapNi", "buyback"):
                    have, got = _num(burry, k), ref.get(k)
                    if _off(have, got):
                        notes.append(f"{k} {have:,.0f} vs {got:,.0f}")
                if notes:
                    against = "trailing 12 months" if basis == "trailing" else f"FY ending {d['asOf']}"
                    drift.append(f"{t:6} burry ({label or 'no fy'}) vs {against}: " + "; ".join(notes))
        if debt is not None:
            ours = _debt_tier(_num(debt, "netDebt"), _num(debt, "ebitda"))
            theirs = _debt_tier(d.get("netDebt"), d.get("ebitda"))
            # Net cash and under 2.0x are both GREEN, so only a disagreement
            # about whether Step 3 applies at all is worth a line.
            if ours and theirs and (ours == "over 2.0x") != (theirs == "over 2.0x"):
                tiers.append(f"{t:6} file says {ours} (netDebt {_num(debt, 'netDebt'):,.0f}, ebitda "
                             f"{_num(debt, 'ebitda') or 0:,.0f}); reported FY ending {d['asOf']} says {theirs} "
                             f"(netDebt {d['netDebt']:,.0f}, ebitda {d.get('ebitda', 0):,.0f})")
        elif "netDebt" in d and "ebitda" in d:
            missing.append(f"{t:6} debtSafety — FY ending {d['asOf']}: netDebt {d['netDebt']:,.0f}, ebitda {d['ebitda']:,.0f}")
    print(f"Compared {len(want)} stock files against {os.path.relpath(OUT, HERE)}.")
    for title, rows in (
            (f"BURRY FIGURES MORE THAN {DRIFT:.0%} OFF ({len(drift)}) — same basis as the block's own fy label", drift),
            (f"DEBT TIER DISAGREES ({len(tiers)}) — reported EBITDA is GAAP and net debt excludes leases; "
             "check which the block used before changing it", tiers),
            (f"MISSING BLOCK, FIGURES AVAILABLE ({len(missing)})", missing)):
        if rows:
            print(f"\n── {title} ──")
            for r in rows:
                print("  " + r)
    if est:
        print(f"\n── BURRY ENTERED AS AN ESTIMATE, nothing reported to compare ({len(est)}) ──")
        print("  " + "  ".join(est))
    if foreign:
        print(f"\n── NOT COMPARED, reports in another currency ({len(foreign)}) ──")
        print("  " + "  ".join(foreign))


# ── earnings dates from Nasdaq, for the gaps Yahoo leaves ───────────────────

SLOT = {"time-pre-market": "bmo", "time-after-hours": "amc"}


def run_earnings(want, apply, today=None):
    today = today or date.today()
    cal = load(CALENDAR, {})
    # A gap is no date at all, or a date already behind us with nothing ahead:
    # the cache is only ever added to, so a past date never refreshes itself.
    need = {t for t in want if t not in cal or cal[t].get("date", "") < today.isoformat()}
    need -= NO_EARNINGS
    if not need:
        print("Every stock has an upcoming earnings date on file.")
        return
    found = {}                                      # ticker -> (past, future)
    days = [today + timedelta(n) for n in range(-EARNINGS_BACK, EARNINGS_AHEAD + 1)]
    failed = 0
    for d in days:
        if d.weekday() > 4:
            continue
        try:
            rows = (_get(f"https://api.nasdaq.com/api/calendar/earnings?date={d.isoformat()}")
                    .get("data") or {}).get("rows") or []
        except Exception:
            failed += 1
            continue
        for r in rows:
            sym = (r.get("symbol") or "").upper()
            if sym in need:
                slot = found.setdefault(sym, {})
                # Exactly the shape weekly_feature.py writes: it spreads these
                # records into the landing page's rows, so no extra keys.
                rec = {"date": d.isoformat(), "time": SLOT.get(r.get("time"), "tbd"),
                       "estimated": d > today}
                if d <= today:
                    slot["past"] = rec              # latest past wins (ascending scan)
                else:
                    slot.setdefault("future", rec)  # nearest future wins
        time.sleep(0.15)
    adds = []
    for t in sorted(found):
        rec = found[t].get("future") or found[t].get("past")
        old = cal.get(t)
        if old and old.get("date", "") >= rec["date"]:
            continue
        adds.append(f"{t:6} {rec['date']} {rec['time']}"
                    + ("" if rec["date"] > today.isoformat() else "  (already reported)")
                    + (f"  was {old['date']}" if old else ""))
        cal[t] = rec
    print(f"{len(need)} stocks had no upcoming date; Nasdaq's calendar gives {len(adds)}.")
    for a in adds:
        print("  " + a)
    still = sorted(need - set(found))
    if still:
        print(f"\nStill without a date ({len(still)}): " + "  ".join(still))
    if failed:
        print(f"\n{failed} calendar day(s) could not be fetched.")
    if apply and adds:
        save(CALENDAR, cal, indent=2)               # weekly_feature.save_calendar's format
        print(f"\nWrote {os.path.relpath(CALENDAR, HERE)}")
    elif adds:
        print("\nDry run — pass --apply to write.")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("tickers", nargs="*", help="limit to these tickers (default: every stock file)")
    ap.add_argument("--apply", action="store_true", help="write the result")
    ap.add_argument("--compare", action="store_true", help="stock files vs the cache; no network")
    ap.add_argument("--earnings", action="store_true", help="fill missing earnings dates from Nasdaq")
    ap.add_argument("--today", help="override today's date (YYYY-MM-DD)")
    args = ap.parse_args()
    known = tracked() if args.earnings else tickers()
    want = [t.upper() for t in args.tickers] or known
    bad = [t for t in want if t not in known]
    if bad:
        raise SystemExit(f"No stock file for: {', '.join(bad)}")
    if args.compare:
        run_compare(want)
    elif args.earnings:
        today = datetime.strptime(args.today, "%Y-%m-%d").date() if args.today else None
        run_earnings(want, args.apply, today)
    else:
        run_fetch(want, args.apply)


if __name__ == "__main__":
    main()
