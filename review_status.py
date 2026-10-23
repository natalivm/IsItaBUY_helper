#!/usr/bin/env python3
"""
Report which stocks are due for a manual data review.

Prices are auto-refreshed daily by update_prices.py (which stamps `updatedOn`),
but everything else — fundamentals (rev25, baseEps, epsCagr, exitPE), RS rating
& trend, ratingOverride, Burry/debt blocks — is hand-curated and goes stale
silently. `updatedOn` can't tell you that: the price bot resets it to today on
every run. The real freshness signal is `dataReviewedOn` (YYYY-MM-DD), which the
price bot never touches.

Elapsed days alone are not enough, though: a stock can be reviewed on the 11th,
report on the 21st and still look "fresh" on the 23rd. So each stock can also
carry `nextEarningsOn: 'YYYY-MM-DD'` — the next scheduled report, taken from the
company's IR calendar at review time. Once that date passes without a newer
review, the stock is flagged REPORTED SINCE REVIEW no matter how recent the
review was. Record the following quarter's date whenever you review a stock.

This tool reads it and prints a prioritized review queue. It NEVER changes any
value — it only surfaces what a human should look at.

Usage:
    python3 review_status.py                # full report
    python3 review_status.py --days 75      # flag reviews older than 75 days (default 90)
    python3 review_status.py --strict       # exit 1 if anything needs review (for CI)
    python3 review_status.py --today 2026-06-26   # override "today" (testing / fixed clock)

Set `dataReviewedOn: 'YYYY-MM-DD'` in a stock file whenever you refresh its
fundamentals / RS / override after checking the latest earnings.
"""

import argparse
import glob
import os
import re
from datetime import date, datetime

STOCKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stocks")

# A review older than this many days has likely missed at least one earnings cycle.
DEFAULT_STALE_DAYS = 90


def _field(text, name):
    m = re.search(rf"{name}:\s*'([^']*)'", text)
    return m.group(1) if m else None


def _has_block(text, name):
    return re.search(rf"\b{name}:\s*\{{", text) is not None


def load_stocks():
    rows = []
    for path in sorted(glob.glob(os.path.join(STOCKS_DIR, "*.ts"))):
        base = os.path.basename(path)
        if base in ("index.ts", "defineStock.ts"):
            continue
        with open(path, encoding="utf-8") as f:
            text = f.read()
        ticker = _field(text, "ticker")
        if not ticker:
            continue
        rows.append({
            "ticker": ticker,
            "reviewed": _field(text, "dataReviewedOn"),
            "nextEarnings": _field(text, "nextEarningsOn"),
            "lastReport": _field(text, "lastReportTag"),
            "override": _field(text, "ratingOverride"),
            "hasDebt": _has_block(text, "debtSafety"),
            "hasBurry": _has_block(text, "burry"),
        })
    return rows


def review_age(reviewed, today):
    if not reviewed:
        return None
    try:
        d = datetime.strptime(reviewed, "%Y-%m-%d").date()
    except ValueError:
        return None
    return (today - d).days


def main():
    ap = argparse.ArgumentParser(description="Report stocks due for a manual data review.")
    ap.add_argument("--days", type=int, default=DEFAULT_STALE_DAYS,
                    help=f"flag reviews older than N days (default {DEFAULT_STALE_DAYS})")
    ap.add_argument("--strict", action="store_true",
                    help="exit 1 if any stock needs review (for CI)")
    ap.add_argument("--today", help="override today's date (YYYY-MM-DD)")
    args = ap.parse_args()

    today = datetime.strptime(args.today, "%Y-%m-%d").date() if args.today else date.today()
    rows = load_stocks()
    n = len(rows)

    never, stale, fresh = [], [], []
    for r in rows:
        age = review_age(r["reviewed"], today)
        r["age"] = age
        if age is None:
            never.append(r)
        elif age > args.days:
            stale.append(r)
        else:
            fresh.append(r)

    # Earnings landed since the last review: the date-based check elapsed-days can't make.
    reported = []
    for r in rows:
        ne = r["nextEarnings"]
        if not ne:
            continue
        try:
            ne_d = datetime.strptime(ne, "%Y-%m-%d").date()
        except ValueError:
            continue
        if ne_d <= today and (not r["reviewed"] or r["reviewed"] < ne):
            reported.append(r)
    reported_set = {r["ticker"] for r in reported}

    no_report = [r for r in rows if not r["lastReport"]]
    no_next = [r for r in rows if not r["nextEarnings"]]
    no_debt = [r for r in rows if not r["hasDebt"]]
    no_burry = [r for r in rows if not r["hasBurry"]]

    print(f"Data review status — {n} stocks · as of {today} · stale threshold {args.days}d\n")
    print(f"  reviewed & fresh:        {len(fresh)}")
    print(f"  STALE (> {args.days}d):          {len(stale)}")
    print(f"  never reviewed (no date): {len(never)}")
    print(f"  REPORTED since review:    {len(reported)}")
    print(f"  missing nextEarningsOn:   {len(no_next)}")
    print(f"  missing lastReportTag:    {len(no_report)}")
    print(f"  missing debtSafety:       {len(no_debt)}")
    print(f"  missing burry:            {len(no_burry)}")

    if stale:
        print("\n── STALE — reviewed too long ago (oldest first) ──")
        for r in sorted(stale, key=lambda x: -x["age"]):
            print(f"  {r['ticker']:6} reviewed {r['reviewed']}  ({r['age']}d ago)  lastReport={r['lastReport'] or '?'}")

    if reported:
        print("\n── REPORTED SINCE REVIEW — earnings landed after dataReviewedOn (review regardless of age) ──")
        for r in sorted(reported, key=lambda x: x["nextEarnings"]):
            age = f"{r['age']}d ago" if r["age"] is not None else "never reviewed"
            print(f"  {r['ticker']:6} reported {r['nextEarnings']}  reviewed {r['reviewed'] or '-'} ({age})  lastReport={r['lastReport'] or '?'}")

    if never:
        print("\n── NEVER REVIEWED — no dataReviewedOn (set one after checking latest earnings) ──")
        print("  " + "  ".join(r["ticker"] for r in never))

    if no_next:
        print(f"\n── MISSING nextEarningsOn ({len(no_next)}) — can't tell if earnings landed since review ──")
        print("  " + "  ".join(r["ticker"] for r in no_next))

    if no_report:
        print("\n── MISSING lastReportTag — can't tell which earnings the data reflects ──")
        print("  " + "  ".join(r["ticker"] for r in no_report))

    if no_debt:
        print(f"\n── MISSING debtSafety ({len(no_debt)}) — CLAUDE.md asks for it on every stock ──")
        print("  " + "  ".join(r["ticker"] for r in no_debt))

    if no_burry:
        print(f"\n── MISSING burry ({len(no_burry)}) ──")
        print("  " + "  ".join(r["ticker"] for r in no_burry))

    needs_review = len({r["ticker"] for r in stale} | {r["ticker"] for r in never} | reported_set)
    print(f"\n{needs_review} stock(s) need a data review.")

    if args.strict and (needs_review or no_report):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
