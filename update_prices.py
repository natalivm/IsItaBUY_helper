#!/usr/bin/env python3
"""
Fetch latest stock prices from Yahoo Finance and update stocks/*.ts files.
No external dependencies — uses only Python standard library.

Usage:
    python3 update_prices.py              # dry run (show changes)
    python3 update_prices.py --apply      # write changes to stock files
    python3 update_prices.py --history    # show price history & flag big movers
    python3 update_prices.py --weekly     # weekly review (auto-runs on Fridays)

Maintains a price history log in price_history.json to track changes over time.
Every Friday (or via --weekly), compares current prices against the previous
Friday and flags stocks that swung >15% over the week for review.
"""

import argparse
import glob
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime, timedelta

STOCKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stocks")
HISTORY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "price_history.json")

# Stocks moving more than this % in a week are flagged
WEEKLY_THRESHOLD = 15

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
}


def get_tickers():
    """Extract tickers and current prices from stocks/*.ts files."""
    tickers = {}
    for path in sorted(glob.glob(os.path.join(STOCKS_DIR, "*.ts"))):
        basename = os.path.basename(path)
        if basename == "defineStock.ts":
            continue
        with open(path) as f:
            content = f.read()
        match = re.search(r"currentPrice:\s*([\d.]+)", content)
        if match:
            ticker = basename.replace(".ts", "")
            tickers[ticker] = {"path": path, "old_price": float(match.group(1))}
    return tickers


def format_price(price):
    """Format price to 2 decimal places, stripping unnecessary trailing zeros."""
    formatted = f"{price:.2f}"
    # 348.00 -> 348, 348.40 -> 348.4, 348.47 -> 348.47
    if "." in formatted:
        formatted = formatted.rstrip("0").rstrip(".")
    return formatted


def fetch_prices(tickers):
    """Fetch latest prices using Yahoo Finance API."""
    symbols = list(tickers.keys())
    print(f"Fetching prices for {len(symbols)} stocks from Yahoo Finance...\n")

    prices = {}

    # Try batch endpoint first
    symbols_str = ",".join(symbols)
    url = f"https://query2.finance.yahoo.com/v7/finance/quote?symbols={symbols_str}"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
        for quote in data.get("quoteResponse", {}).get("result", []):
            sym = quote.get("symbol", "")
            price = quote.get("regularMarketPrice")
            if sym and price:
                prices[sym] = float(price)
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(f"  Batch request failed ({e}), falling back to individual requests...\n")

    # Fallback: fetch missing symbols individually
    missing = [s for s in symbols if s not in prices]
    for sym in missing:
        try:
            url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range=1d&interval=1d"
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
            meta = data["chart"]["result"][0]["meta"]
            price = meta.get("regularMarketPrice", 0)
            if price > 0:
                prices[sym] = float(price)
                print(f"  {sym}: ${price:.2f}")
            else:
                print(f"  {sym}: no price data")
        except Exception as e:
            print(f"  {sym}: FAILED ({e})")

    return prices


# --------------- Price History ---------------

def load_history():
    """Load price history from JSON file."""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE) as f:
            return json.load(f)
    return {}


def save_history(history):
    """Save price history to JSON file."""
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2, sort_keys=True)


def record_prices(tickers, prices):
    """Record today's prices into history."""
    history = load_history()
    today = datetime.now().strftime("%Y-%m-%d")

    for symbol in sorted(tickers.keys()):
        price = prices.get(symbol)
        if price is None:
            continue

        if symbol not in history:
            history[symbol] = {"entries": []}

        entries = history[symbol]["entries"]
        if not entries or entries[-1]["date"] != today:
            entries.append({"date": today, "price": round(price, 2)})

        # Keep last 90 entries max
        history[symbol]["entries"] = entries[-90:]

    save_history(history)


def get_price_on_or_before(entries, target_date):
    """Find the closest price entry on or before target_date."""
    target = target_date.strftime("%Y-%m-%d")
    best = None
    for entry in entries:
        if entry["date"] <= target:
            best = entry
    return best


def weekly_review(threshold):
    """Compare this Friday vs last Friday prices and flag big movers."""
    history = load_history()
    if not history:
        print("No price history yet. Run with --apply first to start tracking.")
        return

    today = datetime.now()
    # Find last Friday (7 days ago from current week's Friday)
    days_since_friday = (today.weekday() - 4) % 7
    this_friday = today - timedelta(days=days_since_friday)
    last_friday = this_friday - timedelta(days=7)

    print(f"Weekly review: comparing {last_friday.strftime('%Y-%m-%d')} → {this_friday.strftime('%Y-%m-%d')}")
    print(f"Flag threshold: >{threshold}% swing\n")

    flagged = []
    all_stocks = []

    for symbol in sorted(history.keys()):
        entries = history[symbol]["entries"]
        prev = get_price_on_or_before(entries, last_friday)
        curr = get_price_on_or_before(entries, this_friday)

        if not prev or not curr or prev["date"] == curr["date"]:
            continue

        pct = ((curr["price"] - prev["price"]) / prev["price"]) * 100
        all_stocks.append((symbol, prev["price"], prev["date"], curr["price"], curr["date"], pct))

        if abs(pct) >= threshold:
            flagged.append((symbol, prev["price"], prev["date"], curr["price"], curr["date"], pct))

    if all_stocks:
        print(f"{'Symbol':<8} {'Last Fri':>10} {'This Fri':>10} {'Week Chg':>9}")
        print("-" * 42)
        for sym, prev_p, prev_d, curr_p, curr_d, pct in all_stocks:
            marker = " <<" if abs(pct) >= threshold else ""
            print(f"{sym:<8} {prev_p:>10.2f} {curr_p:>10.2f} {pct:>+8.1f}%{marker}")

    if flagged:
        print(f"\n{'='*54}")
        print(f"⚠️  {len(flagged)} stock(s) swung >{threshold}% this week:\n")
        for sym, prev_p, prev_d, curr_p, curr_d, pct in flagged:
            print(f"  {sym:<8} ${prev_p:.2f} → ${curr_p:.2f}  ({pct:+.1f}%)")
        print(f"\n  These may need review: fairPriceRange, revenue estimates,")
        print(f"  rsRating, rsTrend, or ratingOverride.")
    else:
        print(f"\nNo stocks swung >{threshold}% this week. All good!")


def show_history(threshold):
    """Display full price history with cumulative change from first entry."""
    history = load_history()
    if not history:
        print("No price history yet. Run with --apply first to start tracking.")
        return

    flagged = []
    print(f"{'Symbol':<8} {'First':>10} {'Since':>12} {'Current':>10} {'Total Chg':>10}")
    print("-" * 56)

    for symbol in sorted(history.keys()):
        data = history[symbol]
        entries = data["entries"]
        if len(entries) < 2:
            continue
        first = entries[0]
        current = entries[-1]
        pct = ((current["price"] - first["price"]) / first["price"]) * 100 if first["price"] else 0

        flag = " <<" if abs(pct) >= threshold else ""
        print(f"{symbol:<8} {first['price']:>10.2f} {first['date']:>12} {current['price']:>10.2f} {pct:>+9.1f}%{flag}")

        if abs(pct) >= threshold:
            flagged.append(symbol)

    if flagged:
        print(f"\n⚠️  {len(flagged)} stock(s) moved >{threshold}% since first tracked:")
        print(f"   {', '.join(flagged)}")


# --------------- File Updates ---------------

def update_files(tickers, prices, apply=False):
    """Update currentPrice and updatedOn in each stock file."""
    changes = []
    errors = []
    today_tag = datetime.now().strftime("%m/%d")

    for symbol, info in sorted(tickers.items()):
        if symbol not in prices:
            errors.append(symbol)
            continue

        new_price = format_price(prices[symbol])

        with open(info["path"]) as f:
            content = f.read()

        old_match = re.search(r"(currentPrice:\s*)([\d.]+)", content)
        if not old_match:
            errors.append(symbol)
            continue

        old_val = old_match.group(2)
        if old_val == new_price:
            continue  # no change

        changes.append((symbol, old_val, new_price))

        if apply:
            new_content = content[:old_match.start(2)] + new_price + content[old_match.end(2):]
            # Update updatedOn tag to today's date
            new_content = re.sub(
                r"updatedOn:\s*'[^']*'",
                f"updatedOn: '{today_tag}'",
                new_content,
            )
            with open(info["path"], "w") as f:
                f.write(new_content)

    return changes, errors


def main():
    parser = argparse.ArgumentParser(description="Update stock prices from Yahoo Finance")
    parser.add_argument("--apply", action="store_true", help="Write changes to files (default is dry run)")
    parser.add_argument("--history", action="store_true", help="Show full price history")
    parser.add_argument("--weekly", action="store_true", help="Run weekly review (this Friday vs last Friday)")
    parser.add_argument("--threshold", type=float, default=WEEKLY_THRESHOLD,
                        help=f"Flag threshold %% (default: {WEEKLY_THRESHOLD})")
    args = parser.parse_args()

    threshold = args.threshold

    # Handle --history
    if args.history:
        show_history(threshold)
        return

    # Handle --weekly
    if args.weekly:
        weekly_review(threshold)
        return

    # Normal price update flow
    tickers = get_tickers()
    print(f"Found {len(tickers)} stocks in {STOCKS_DIR}\n")

    prices = fetch_prices(tickers)
    print(f"\nGot prices for {len(prices)}/{len(tickers)} stocks\n")

    changes, errors = update_files(tickers, prices, apply=args.apply)

    if changes:
        mode = "UPDATED" if args.apply else "WOULD UPDATE"
        print(f"{'Symbol':<8} {'Old':>10} {'New':>10}  {'Change':>8}")
        print("-" * 42)
        for symbol, old, new in changes:
            old_f = float(old)
            new_f = float(new)
            pct = ((new_f - old_f) / old_f) * 100 if old_f else 0
            print(f"{symbol:<8} {old:>10} {new:>10}  {pct:>+7.1f}%")
        print(f"\n{mode} {len(changes)} stock(s).")
    else:
        print("All prices are up to date.")

    if errors:
        print(f"\nFailed to fetch: {', '.join(errors)}")

    if not args.apply and changes:
        print("\nRun with --apply to write changes to files.")

    # Record history after applying
    if args.apply and prices:
        record_prices(tickers, prices)

        # Auto-run weekly review on Fridays
        if datetime.now().weekday() == 4:  # Friday
            print(f"\n{'='*54}")
            print("📅 FRIDAY WEEKLY REVIEW\n")
            weekly_review(threshold)


if __name__ == "__main__":
    main()
