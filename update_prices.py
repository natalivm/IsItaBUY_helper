#!/usr/bin/env python3
"""
Fetch latest stock prices from Yahoo Finance and update stocks/*.ts files.
No external dependencies — uses only Python standard library.

Usage:
    python3 update_prices.py              # dry run (show changes)
    python3 update_prices.py --apply      # write changes to stock files
    python3 update_prices.py --history    # show price history & flag big movers

Maintains a price history log in price_history.json to track changes over time.
Stocks moving >20% from their first recorded price are flagged for review
(fair value range, revenue estimates, and ratings may need updating).
"""

import argparse
import glob
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime

STOCKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stocks")
HISTORY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "price_history.json")

# Stocks moving more than this % from their baseline are flagged
FLAG_THRESHOLD = 20

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
    """Round price per project convention: >=100 integer, <100 keep 2 decimals."""
    if price >= 100:
        return str(int(round(price)))
    else:
        return f"{price:.2f}"


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
    """Record today's prices into history and return flagged stocks."""
    history = load_history()
    today = datetime.now().strftime("%Y-%m-%d")
    flagged = []

    for symbol in sorted(tickers.keys()):
        price = prices.get(symbol)
        if price is None:
            continue

        if symbol not in history:
            history[symbol] = {"baseline": price, "baseline_date": today, "entries": []}

        # Append today's entry (skip if already recorded today)
        entries = history[symbol]["entries"]
        if not entries or entries[-1]["date"] != today:
            entries.append({"date": today, "price": round(price, 2)})

        # Keep last 90 entries max
        history[symbol]["entries"] = entries[-90:]

        # Check move from baseline
        baseline = history[symbol]["baseline"]
        pct_from_baseline = ((price - baseline) / baseline) * 100 if baseline else 0

        if abs(pct_from_baseline) >= FLAG_THRESHOLD:
            flagged.append({
                "symbol": symbol,
                "baseline": baseline,
                "baseline_date": history[symbol]["baseline_date"],
                "current": round(price, 2),
                "pct_change": round(pct_from_baseline, 1),
            })

    save_history(history)
    return flagged


def reset_baseline(symbols=None):
    """Reset baseline to current price for given symbols (or all if None)."""
    history = load_history()
    today = datetime.now().strftime("%Y-%m-%d")

    for symbol, data in history.items():
        if symbols and symbol not in symbols:
            continue
        if data["entries"]:
            data["baseline"] = data["entries"][-1]["price"]
            data["baseline_date"] = today

    save_history(history)


def show_history():
    """Display price history and flag big movers."""
    history = load_history()
    if not history:
        print("No price history yet. Run with --apply first to start tracking.")
        return

    flagged = []
    print(f"{'Symbol':<8} {'Baseline':>10} {'Since':>12} {'Current':>10} {'Change':>8}")
    print("-" * 54)

    for symbol in sorted(history.keys()):
        data = history[symbol]
        baseline = data["baseline"]
        baseline_date = data["baseline_date"]
        if not data["entries"]:
            continue
        current = data["entries"][-1]["price"]
        pct = ((current - baseline) / baseline) * 100 if baseline else 0

        flag = " ⚠️" if abs(pct) >= FLAG_THRESHOLD else ""
        print(f"{symbol:<8} {baseline:>10.2f} {baseline_date:>12} {current:>10.2f} {pct:>+7.1f}%{flag}")

        if abs(pct) >= FLAG_THRESHOLD:
            flagged.append(symbol)

    if flagged:
        print(f"\n⚠️  REVIEW NEEDED — {len(flagged)} stock(s) moved >{FLAG_THRESHOLD}% since baseline:")
        print(f"   {', '.join(flagged)}")
        print(f"   These may need updated: fairPriceRange, revenue estimates, rsRating, rsTrend, ratingOverride")
        print(f"\n   After reviewing, reset their baselines:")
        print(f"   python3 update_prices.py --reset-baseline {' '.join(flagged)}")
    else:
        print(f"\nNo stocks moved >{FLAG_THRESHOLD}% from baseline.")


# --------------- File Updates ---------------

def update_files(tickers, prices, apply=False):
    """Update currentPrice in each stock file."""
    changes = []
    errors = []

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
            with open(info["path"], "w") as f:
                f.write(new_content)

    return changes, errors


def main():
    parser = argparse.ArgumentParser(description="Update stock prices from Yahoo Finance")
    parser.add_argument("--apply", action="store_true", help="Write changes to files (default is dry run)")
    parser.add_argument("--history", action="store_true", help="Show price history and flag big movers")
    parser.add_argument("--reset-baseline", nargs="*", metavar="TICKER",
                        help="Reset baseline for given tickers (or all if none specified)")
    parser.add_argument("--threshold", type=float, default=FLAG_THRESHOLD,
                        help=f"Flag threshold %% (default: {FLAG_THRESHOLD})")
    args = parser.parse_args()

    global FLAG_THRESHOLD
    FLAG_THRESHOLD = args.threshold

    # Handle --history
    if args.history:
        show_history()
        return

    # Handle --reset-baseline
    if args.reset_baseline is not None:
        symbols = args.reset_baseline if args.reset_baseline else None
        reset_baseline(symbols)
        label = ", ".join(args.reset_baseline) if args.reset_baseline else "all stocks"
        print(f"Baseline reset for {label}.")
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

    # Record history and flag big movers
    if args.apply and prices:
        flagged = record_prices(tickers, prices)
        if flagged:
            print(f"\n{'='*54}")
            print(f"⚠️  REVIEW NEEDED — {len(flagged)} stock(s) moved >{FLAG_THRESHOLD}% since baseline:\n")
            print(f"  {'Symbol':<8} {'Baseline':>10} {'Since':>12} {'Now':>10} {'Move':>8}")
            print(f"  {'-'*50}")
            for f in flagged:
                print(f"  {f['symbol']:<8} {f['baseline']:>10.2f} {f['baseline_date']:>12} {f['current']:>10.2f} {f['pct_change']:>+7.1f}%")
            print(f"\n  These stocks may need updated fairPriceRange, revenue estimates,")
            print(f"  rsRating, rsTrend, or ratingOverride.")
            print(f"\n  After reviewing, reset their baselines:")
            tickers_str = " ".join(f["symbol"] for f in flagged)
            print(f"  python3 update_prices.py --reset-baseline {tickers_str}")


if __name__ == "__main__":
    main()
