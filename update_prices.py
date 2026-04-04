#!/usr/bin/env python3
"""
Fetch latest stock prices from Yahoo Finance and update stocks/*.ts files.
No external dependencies — uses only Python standard library.

Usage:
    python update_prices.py          # dry run (show changes)
    python update_prices.py --apply  # write changes to files
"""

import argparse
import glob
import json
import os
import re
import sys
import urllib.request
import urllib.error

STOCKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stocks")

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
    """Fetch latest prices using Yahoo Finance v8 quote API."""
    symbols = list(tickers.keys())
    print(f"Fetching prices for {len(symbols)} stocks from Yahoo Finance...\n")

    prices = {}

    # Yahoo Finance quote endpoint accepts comma-separated symbols
    symbols_str = ",".join(symbols)
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbols_str}"

    # Fetch individually since chart endpoint is per-symbol
    # Use v7 quote endpoint for batch
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

    # Fallback: fetch missing symbols individually via chart API
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
    args = parser.parse_args()

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


if __name__ == "__main__":
    main()
