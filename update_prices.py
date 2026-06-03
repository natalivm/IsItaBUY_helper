#!/usr/bin/env python3
"""
Fetch latest stock prices from Yahoo Finance and update stocks/*.ts files.
No external dependencies — uses only Python standard library.

Usage:
    python3 update_prices.py              # dry run (show changes + rating check)
    python3 update_prices.py --apply      # write changes to stock files
    python3 update_prices.py --apply --push  # write changes, commit, and push to git
    python3 update_prices.py --ratings    # show current model ratings without updating
    python3 update_prices.py --history    # show price history & flag big movers
    python3 update_prices.py --weekly     # weekly review (auto-runs on Fridays)

Maintains a price history log in price_history.json to track changes over time.
Every Friday (or via --weekly), compares current prices against the previous
Friday and flags stocks that swung >15% over the week for review.

After every --apply run, rating changes are automatically reported: stocks that
crossed a rating threshold (STRONG BUY / BUY / HOLD / OVERVALUED) due to price
action are flagged. Use --push to commit and push those changes to git.
"""

import argparse
import glob
import json
import os
import re
import subprocess
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


# ── Model Rating Constants (mirrors projectionService.ts) ──

_RF_RATE = 0.0425
_ERP = 0.055
_HORIZON = 5
_SB_UPSIDE = 0.30
_SB_SOFT = 0.25
_BUY_UPSIDE = 0.15
_BUY_SOFT = 0.12
_AVOID_RATIO = 0.96
_RS_QUALITY = 80

# Base-case driver template defaults (scenario index 1 in defineStock.ts)
_BASE_REV_PREM  = [0.01, 0.01, 0.01, 0.01, 0.01]
_BASE_FCF_UPLIFT = [0.005, 0.005, 0.01, 0.01, 0.01]
_BASE_BB_RATE    = 0.015
_BASE_EBITDA     = 0.22
_BASE_TERM_GROWTH = 0.025
_BASE_EXIT_MULT  = 15


# ── TypeScript file parsers ──

def _num(text, key, default=None):
    m = re.search(rf'{key}:\s*([\d.]+)', text)
    return float(m.group(1)) if m else default


def _str(text, key, default=None):
    m = re.search(rf"{key}:\s*'([^']+)'", text)
    return m.group(1) if m else default


def _flat_trio(text, key):
    """Parse 'key: [a, b, c]' → [a, b, c] as floats. Returns None if not found."""
    m = re.search(rf'{key}:\s*\[([\d.,\s]+)\]', text)
    if not m:
        return None
    return [float(x.strip()) for x in m.group(1).split(',') if x.strip()]


def _array_trio(text, key):
    """Parse 'key: [[...],[...],[...]]' → list of float lists (bracket-counting).
    Returns None if the structure isn't a 2D array."""
    idx = text.find(f'{key}:')
    if idx == -1:
        return None
    start = text.find('[', idx)
    if start == -1:
        return None

    depth = 0
    arrays = []
    cur_start = None

    for i in range(start, min(len(text), start + 3000)):
        ch = text[i]
        if ch == '[':
            depth += 1
            if depth == 2:
                cur_start = i + 1
        elif ch == ']':
            depth -= 1
            if depth == 1 and cur_start is not None:
                arr_str = text[cur_start:i]
                try:
                    vals = [float(x.strip()) for x in arr_str.split(',') if x.strip()]
                    arrays.append(vals)
                except ValueError:
                    pass
                cur_start = None
            elif depth == 0:
                break

    return arrays if len(arrays) >= 3 else None


def _driver_overrides(text, scenario_idx):
    """Extract driverOverrides for the given scenario index. Returns dict."""
    overrides = {}
    idx = text.find('driverOverrides:')
    if idx == -1:
        return overrides

    bracket_start = text.find('[', idx)
    if bracket_start == -1:
        return overrides

    # Extract the outer [...] block
    depth = 0
    end = bracket_start
    for i in range(bracket_start, min(len(text), bracket_start + 5000)):
        if text[i] in '[{':
            depth += 1
        elif text[i] in ']}':
            depth -= 1
            if depth == 0:
                end = i
                break

    array_content = text[bracket_start + 1:end]

    # Find each {object} at depth 1 within the array content
    objects = []
    obj_depth = 0
    obj_start = None
    for i, ch in enumerate(array_content):
        if ch == '{':
            obj_depth += 1
            if obj_depth == 1:
                obj_start = i
        elif ch == '}':
            obj_depth -= 1
            if obj_depth == 0 and obj_start is not None:
                objects.append(array_content[obj_start:i + 1])
                obj_start = None

    if len(objects) <= scenario_idx:
        return overrides

    obj_text = objects[scenario_idx]
    for key, dest in [('revPrem', 'revPrem'), ('fcfUplift', 'fcfUplift')]:
        m = re.search(rf'{key}:\s*\[([\d.,\s]+)\]', obj_text)
        if m:
            overrides[dest] = [float(x.strip()) for x in m.group(1).split(',') if x.strip()]

    return overrides


def get_stock_params(path):
    """Extract all model parameters from a stocks/*.ts file."""
    with open(path) as f:
        content = f.read()

    p = {}
    p['currentPrice'] = _num(content, 'currentPrice')
    p['shares0']      = _num(content, 'shares0', 100)
    p['rev25']        = _num(content, 'rev25', 0)
    p['fcfMargin25']  = _num(content, 'fcfMargin25', 0.10)
    p['taxRate']      = _num(content, 'taxRate', 0.25)
    p['cash']         = _num(content, 'cash', 0)
    p['debt']         = _num(content, 'debt', 0)
    p['beta']         = _num(content, 'beta', 1.1)
    p['costDebt']     = _num(content, 'costDebt', 0.05)
    p['baseEps']      = _num(content, 'baseEps')
    p['rsRating']     = _num(content, 'rsRating', 50)
    p['modelType']    = _str(content, 'modelType') or 'DCF_ADVANCED'
    p['aiImpact']     = _str(content, 'aiImpact')
    p['ratingOverride'] = _str(content, 'ratingOverride')

    # Flat trio fields — extract base-case value (index 1)
    for key, default in [
        ('epsCagr',      20.0),
        ('exitPE',       25.0),
        ('termGrowth',   None),
        ('exitMultiple', None),
        ('ebitdaProxy',  None),
        ('bbRate',       None),
        ('waccAdj',      0.0),
    ]:
        trio = _flat_trio(content, key)
        if trio and len(trio) >= 2:
            p[f'{key}_base'] = trio[1]
        elif trio:
            p[f'{key}_base'] = trio[0]
        else:
            p[f'{key}_base'] = default

    if p['waccAdj_base'] is None:
        p['waccAdj_base'] = 0.0

    # 2D array fields — extract base-case row (index 1)
    rg = _array_trio(content, 'revGrowth')
    p['revGrowth_base'] = rg[1] if (rg and len(rg) >= 2) else [0.05] * 5

    fm = _array_trio(content, 'fcfMargin')
    if fm and len(fm) >= 2:
        p['fcfMargin_base'] = fm[1]
    else:
        # Scalar trio fallback
        fm_trio = _flat_trio(content, 'fcfMargin')
        if fm_trio and len(fm_trio) >= 2:
            p['fcfMargin_base'] = [fm_trio[1]] * 5
        else:
            p['fcfMargin_base'] = [p['fcfMargin25']] * 5

    # Driver overrides for base scenario (index 1)
    dov = _driver_overrides(content, 1)
    p['revPrem_base']   = dov.get('revPrem',   _BASE_REV_PREM)
    p['fcfUplift_base'] = dov.get('fcfUplift', _BASE_FCF_UPLIFT)

    return p


# ── Rating Computation (mirrors projectionService.ts) ──

def _wacc(p, price):
    beta = p.get('beta', 1.1)
    ke = _RF_RATE + beta * _ERP
    mkt_cap = price * (p.get('shares0') or 1)
    total_debt = p.get('debt', 0) or 0
    eq_w = mkt_cap / (mkt_cap + total_debt) if (mkt_cap + total_debt) > 0 else 1.0
    kd = (p.get('costDebt', 0.05) or 0.05) * (1 - (p.get('taxRate', 0.25) or 0.25))
    wacc_adj = p.get('waccAdj_base', 0.0) or 0.0
    return (eq_w * ke) + ((1 - eq_w) * kd) + wacc_adj


def _base_target(p, price):
    """Compute base-case 5-year target price. Returns None on failure."""
    try:
        if p.get('modelType') == 'EPS_PE':
            base_eps = p.get('baseEps')
            if not base_eps:
                return None
            cagr = (p.get('epsCagr_base') or 20) / 100
            exit_pe = p.get('exitPE_base') or 25
            return base_eps * (1 + cagr) ** _HORIZON * exit_pe

        # DCF_ADVANCED
        w = _wacc(p, price)
        rev_growth  = p.get('revGrowth_base',  [0.05] * 5)
        fcf_margin  = p.get('fcfMargin_base',  [0.10] * 5)
        rev_prem    = p.get('revPrem_base',    _BASE_REV_PREM)
        fcf_uplift  = p.get('fcfUplift_base',  _BASE_FCF_UPLIFT)
        bb_rate     = p.get('bbRate_base')     or _BASE_BB_RATE
        ebitda_prx  = p.get('ebitdaProxy_base') or _BASE_EBITDA
        exit_mult   = p.get('exitMultiple_base') or _BASE_EXIT_MULT
        term_growth = p.get('termGrowth_base') or _BASE_TERM_GROWTH

        if w <= term_growth:
            return None

        rev = p.get('rev25', 0) or 0
        shares = p.get('shares0', 1) or 1
        revs, fcfs, pv_fcfs, share_hist = [], [], [], []

        for i in range(5):
            rev *= (1 + rev_growth[i] + rev_prem[i])
            fcf = rev * (fcf_margin[i] + fcf_uplift[i])
            revs.append(rev)
            fcfs.append(fcf)
            pv_fcfs.append(fcf / (1 + w) ** (i + 1))
            if bb_rate > 0:
                shares *= (1 - bb_rate)
            share_hist.append(shares)

        tv_perp = (fcfs[-1] * (1 + term_growth)) / (w - term_growth)
        tv_exit = (revs[-1] * ebitda_prx) * exit_mult
        pv_tv = ((tv_perp + tv_exit) / 2) / (1 + w) ** 5
        net_debt = (p.get('debt', 0) or 0) - (p.get('cash', 0) or 0)
        equity = sum(pv_fcfs) + pv_tv - net_debt
        return equity / share_hist[-1]

    except (ZeroDivisionError, TypeError, ValueError):
        return None


def _rating_label(target, price, rs, ai):
    """Model rating label — does NOT apply ratingOverride."""
    if not target or not price or price == 0:
        return 'UNKNOWN'
    upside = (target - price) / price
    down_ratio = target / price
    boosted = ((rs is not None and rs >= _RS_QUALITY) or ai == 'TAILWIND')
    if upside > _SB_UPSIDE:                           return 'STRONG BUY'
    if boosted and upside > _SB_SOFT:                 return 'STRONG BUY'
    if upside > _BUY_UPSIDE:                          return 'BUY'
    if boosted and upside > _BUY_SOFT:                return 'BUY'
    if down_ratio < _AVOID_RATIO:
        return 'HOLD' if boosted else 'OVERVALUED'
    return 'HOLD'


def _eff_rating(target, price, rs, ai, override):
    """Effective rating as shown in the app (override takes precedence)."""
    return override if override else _rating_label(target, price, rs, ai)


# ── Rating Check ──

def compute_ratings(tickers, price_map):
    """Compute (symbol, model_rating, effective_rating, upside_pct, override) for every stock."""
    rows = []
    for symbol, info in sorted(tickers.items()):
        price = price_map.get(symbol, info['old_price'])
        p = get_stock_params(info['path'])
        target = _base_target(p, price)
        rs = p.get('rsRating', 50)
        ai = p.get('aiImpact')
        override = p.get('ratingOverride')
        model = _rating_label(target, price, rs, ai)
        eff   = _eff_rating(target, price, rs, ai, override)
        upside_pct = ((target - price) / price * 100) if (target and price) else float('nan')
        rows.append({
            'symbol':   symbol,
            'price':    price,
            'target':   target,
            'model':    model,
            'eff':      eff,
            'upside':   upside_pct,
            'override': override,
        })
    return rows


def check_rating_changes(tickers, new_prices):
    """Compare ratings at old prices vs new prices. Returns (all_new, changed)."""
    old_price_map = {sym: info['old_price'] for sym, info in tickers.items()}
    old_ratings   = {r['symbol']: r['eff'] for r in compute_ratings(tickers, old_price_map)}
    new_rows      = compute_ratings(tickers, new_prices)

    changed = [r for r in new_rows if old_ratings.get(r['symbol']) != r['eff']]
    for r in changed:
        r['old_eff'] = old_ratings.get(r['symbol'], '?')

    return new_rows, changed


def print_rating_report(all_rows, changed):
    """Print the rating check table and highlight changes."""
    RATING_ORDER = {'STRONG BUY': 0, 'BUY': 1, 'HOLD': 2, 'OVERVALUED': 3, 'UNKNOWN': 4}

    print(f"\n{'='*72}")
    print("MODEL RATING CHECK  (base-case, with enhancements)\n")
    print(f"{'Symbol':<8} {'Price':>8} {'Target':>8} {'Upside':>7}  {'Effective':>12}  {'Model':>12}  Note")
    print('-' * 72)

    for r in sorted(all_rows, key=lambda x: RATING_ORDER.get(x['eff'], 99)):
        changed_flag = '  <<' if any(c['symbol'] == r['symbol'] for c in changed) else ''
        ovr_note = f"[override: {r['override']}]" if r['override'] else ''
        target_str = f"${r['target']:,.0f}" if r['target'] else '  N/A'
        upside_str = f"{r['upside']:+.1f}%" if r['upside'] == r['upside'] else ' N/A'
        print(
            f"{r['symbol']:<8} ${r['price']:>7,.2f} {target_str:>8} {upside_str:>7}"
            f"  {r['eff']:>12}  {r['model']:>12}{changed_flag}  {ovr_note}"
        )

    if changed:
        print(f"\n{'='*72}")
        print(f"  {len(changed)} RATING CHANGE(S) due to price action:\n")
        for r in changed:
            arrow = f"{r['old_eff']}  →  {r['eff']}"
            price_str = f"${r['price']:,.2f}"
            print(f"    {r['symbol']:<8}  {arrow:<32}  upside {r['upside']:+.1f}%  @{price_str}")
        print()
    else:
        print("\n  No rating changes.\n")


# ── Git Operations ──

def git_commit_push(changed_files, changes, rating_changes):
    """Stage price-changed files, commit with a rating-aware message, and push."""
    if not changed_files:
        print("\nNothing to commit.")
        return

    # Stage only the changed stock files
    result = subprocess.run(['git', 'add'] + changed_files, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"\nGit add failed:\n{result.stderr.strip()}")
        return

    # Build commit message
    symbols = [sym for sym, _, _ in changes]
    msg_parts = [f"Update prices: {', '.join(symbols)}"]

    if rating_changes:
        msg_parts.append("")
        msg_parts.append("Rating changes due to price action:")
        for r in rating_changes:
            msg_parts.append(f"  {r['symbol']}: {r['old_eff']} → {r['eff']} (upside {r['upside']:+.1f}%)")

    commit_msg = "\n".join(msg_parts)
    result = subprocess.run(['git', 'commit', '-m', commit_msg], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"\nGit commit failed:\n{result.stderr.strip()}")
        return
    print(f"\nCommitted: {msg_parts[0]}")

    # Detect current branch
    branch_result = subprocess.run(
        ['git', 'rev-parse', '--abbrev-ref', 'HEAD'], capture_output=True, text=True
    )
    branch = branch_result.stdout.strip() if branch_result.returncode == 0 else 'HEAD'

    # Push with retry (exponential backoff: 2s, 4s, 8s, 16s)
    import time
    for attempt, wait in enumerate([0, 2, 4, 8, 16]):
        if wait:
            print(f"Push failed, retrying in {wait}s...")
            time.sleep(wait)
        result = subprocess.run(
            ['git', 'push', '-u', 'origin', branch], capture_output=True, text=True
        )
        if result.returncode == 0:
            print(f"Pushed to origin/{branch}")
            return
    print(f"\nPush failed after retries:\n{result.stderr.strip()}")


# ── Price Fetching ──

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


def get_yahoo_session():
    """Obtain a Yahoo Finance session cookie + crumb required for authenticated API calls."""
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())
    try:
        req = urllib.request.Request("https://fc.yahoo.com/", headers=HEADERS)
        opener.open(req, timeout=10)
        crumb_req = urllib.request.Request(
            "https://query2.finance.yahoo.com/v1/test/getcrumb", headers=HEADERS
        )
        crumb = opener.open(crumb_req, timeout=10).read().decode()
        if crumb and "<" not in crumb:  # sanity check — not an HTML error page
            return opener, crumb
    except Exception:
        pass
    return None, None


def fetch_prices(tickers):
    """Fetch latest prices using Yahoo Finance API."""
    symbols = list(tickers.keys())
    print(f"Fetching prices for {len(symbols)} stocks from Yahoo Finance...\n")

    prices = {}

    # Obtain session cookie + crumb (required since Yahoo Finance added auth)
    opener, crumb = get_yahoo_session()

    # Batch request — all symbols in one call
    symbols_str = ",".join(symbols)
    if crumb:
        url = f"https://query2.finance.yahoo.com/v7/finance/quote?symbols={symbols_str}&crumb={crumb}"
    else:
        url = f"https://query2.finance.yahoo.com/v7/finance/quote?symbols={symbols_str}"

    try:
        req = urllib.request.Request(url, headers=HEADERS)
        fetch = opener.open(req, timeout=20) if opener else urllib.request.urlopen(req, timeout=20)
        data = json.loads(fetch.read().decode())
        for quote in data.get("quoteResponse", {}).get("result", []):
            sym = quote.get("symbol", "")
            price = quote.get("regularMarketPrice")
            if sym and price:
                prices[sym] = float(price)
        if prices:
            print(f"  Batch request succeeded: got {len(prices)}/{len(symbols)} prices\n")
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(f"  Batch request failed ({e}), falling back to individual requests...\n")

    # Fallback: fetch missing symbols individually
    missing = [s for s in symbols if s not in prices]
    for sym in missing:
        try:
            url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range=1d&interval=1d"
            req = urllib.request.Request(url, headers=HEADERS)
            fetch = opener.open(req, timeout=10) if opener else urllib.request.urlopen(req, timeout=10)
            data = json.loads(fetch.read().decode())
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


# ── Price History ──

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
        print(f"  {len(flagged)} stock(s) swung >{threshold}% this week:\n")
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
        print(f"\n  {len(flagged)} stock(s) moved >{threshold}% since first tracked:")
        print(f"   {', '.join(flagged)}")


# ── File Updates ──

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


# ── Main ──

def main():
    parser = argparse.ArgumentParser(description="Update stock prices from Yahoo Finance")
    parser.add_argument("--apply",   action="store_true", help="Write changes to files (default is dry run)")
    parser.add_argument("--push",    action="store_true", help="Commit and push changes after --apply")
    parser.add_argument("--ratings", action="store_true", help="Show model ratings without updating prices")
    parser.add_argument("--history", action="store_true", help="Show full price history")
    parser.add_argument("--weekly",  action="store_true", help="Run weekly review (this Friday vs last Friday)")
    parser.add_argument("--threshold", type=float, default=WEEKLY_THRESHOLD,
                        help=f"Flag threshold %% (default: {WEEKLY_THRESHOLD})")
    args = parser.parse_args()

    threshold = args.threshold

    if args.push and not args.apply:
        print("--push requires --apply. Exiting.")
        sys.exit(1)

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

    # Handle --ratings (no price fetch — use current file prices)
    if args.ratings:
        price_map = {sym: info['old_price'] for sym, info in tickers.items()}
        all_rows = compute_ratings(tickers, price_map)
        print_rating_report(all_rows, [])
        return

    prices = fetch_prices(tickers)
    print(f"Got prices for {len(prices)}/{len(tickers)} stocks\n")

    # Compute rating changes BEFORE writing files (uses old prices vs new prices)
    all_rows, rating_changes = check_rating_changes(tickers, prices)

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

    # Always show rating check results
    print_rating_report(all_rows, rating_changes)

    if args.apply:
        record_prices(tickers, prices)

        # Push to git if requested
        if args.push and changes:
            changed_paths = [tickers[sym]['path'] for sym, _, _ in changes if sym in tickers]
            git_commit_push(changed_paths, changes, rating_changes)

        # Auto-run weekly review on Fridays
        if datetime.now().weekday() == 4:  # Friday
            print(f"\n{'='*72}")
            print("FRIDAY WEEKLY REVIEW\n")
            weekly_review(threshold)


if __name__ == "__main__":
    main()
