"""
Price refresh + target check for the Pattern Break Watchlist (data/patternWatchlist.ts).
Used by update_prices.py — no external dependencies.

For every watchlist entry it:
  1. updates `price` / `priceDate` to the latest daily close, and
  2. checks whether a *confirmed* setup has reached its target. A target counts
     as reached when any daily bar since the last check touched it (low <= target
     for a downward break, high >= target for an upward one), matching how the
     watchlist marks targets by touch rather than by close. A hit flips
     `stage: "confirmed"` → `"target"` and sets `stageDate` to the bar's date.
     The same check runs on the entry's `alt` setup (second timeframe).

Setups that are only forming / signalled are never auto-completed; if price has
already reached their target, or closed beyond invalidation, they are listed for
manual review instead (invalidation needs a follow-through close, which the bot
can't judge).
"""

import json
import os
import re
import urllib.request
from datetime import datetime, timezone

WATCHLIST_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "patternWatchlist.ts")

_KEY_RE = re.compile(r'(?<![\w$])(\w+):\s*')
_VAL_RE = re.compile(r'"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?')


# ── Minimal TS-literal reader (positions are kept so edits are surgical) ──

def _mask_strings(text):
    """Replace string contents with spaces so braces/keys inside notes are ignored."""
    out, i, n = list(text), 0, len(text)
    while i < n:
        if text[i] == '"':
            j = i + 1
            while j < n and text[j] != '"':
                if text[j] == '\\':
                    out[j] = ' '
                    j += 1
                out[j] = ' '
                j += 1
            i = j + 1
        elif text.startswith('//', i):
            j = text.find('\n', i)
            j = n if j == -1 else j
            for k in range(i, j):
                out[k] = ' '
            i = j
        else:
            i += 1
    return ''.join(out)


def _depths(masked):
    """depth[i] = bracket depth at position i (before applying masked[i])."""
    depth, d = [0] * (len(masked) + 1), 0
    for i, ch in enumerate(masked):
        depth[i] = d
        if ch in '{[':
            d += 1
        elif ch in '}]':
            d -= 1
    depth[len(masked)] = d
    return depth


def _close(masked, open_pos):
    d = 0
    for i in range(open_pos, len(masked)):
        if masked[i] in '{[':
            d += 1
        elif masked[i] in '}]':
            d -= 1
            if d == 0:
                return i
    raise ValueError("unbalanced brackets in watchlist file")


def _fields(text, masked, depth, start, end, level):
    """Keys at bracket depth `level` inside [start, end) → {key: (val_start, val_end, value)}."""
    out = {}
    for m in _KEY_RE.finditer(masked, start, end):
        if depth[m.start()] != level:
            continue
        vs = m.end()
        if masked[vs] in '{[':
            out[m.group(1)] = (vs, _close(masked, vs) + 1, None)
            continue
        vm = _VAL_RE.match(text, vs)
        if not vm:
            continue
        raw = vm.group(0)
        val = json.loads(raw) if raw.startswith('"') else float(raw)
        out[m.group(1)] = (vm.start(), vm.end(), val)
    return out


def parse_watchlist(text):
    """Return a list of entries: {'fields': {...}, 'alt': {...} | None} with value positions."""
    masked = _mask_strings(text)
    depth = _depths(masked)
    arr = masked.index('PATTERN_STOCKS')
    arr = masked.index('[', masked.index('=', arr))
    arr_end = _close(masked, arr)
    entries = []
    i = arr + 1
    while i < arr_end:
        if masked[i] == '{' and depth[i] == 1:
            end = _close(masked, i)
            f = _fields(text, masked, depth, i + 1, end, 2)
            alt = None
            if 'alt' in f:
                a0, a1, _ = f['alt']
                alt = _fields(text, masked, depth, a0 + 1, a1 - 1, 3)
            entries.append({'fields': f, 'alt': alt})
            i = end
        i += 1
    return entries


def get_watchlist_tickers(path=WATCHLIST_FILE):
    if not os.path.exists(path):
        return []
    with open(path) as fh:
        entries = parse_watchlist(fh.read())
    return [e['fields']['ticker'][2] for e in entries if 'ticker' in e['fields']]


# ── Daily bars (needed for intraday target touches) ──

def fetch_daily_bars(symbols, headers, opener=None):
    """{sym: {'price', 'date', 'bars': [(YYYY-MM-DD, high, low, close)]}} from Yahoo's chart API."""
    out = {}
    for sym in symbols:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range=1mo&interval=1d"
        try:
            req = urllib.request.Request(url, headers=headers)
            resp = opener.open(req, timeout=10) if opener else urllib.request.urlopen(req, timeout=10)
            res = json.loads(resp.read().decode())["chart"]["result"][0]
            q = res["indicators"]["quote"][0]
            bars = []
            for ts, h, l, c in zip(res.get("timestamp", []), q["high"], q["low"], q["close"]):
                if None in (h, l, c):
                    continue
                d = datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%d")
                bars.append((d, float(h), float(l), float(c)))
            meta = res["meta"]
            price = meta.get("regularMarketPrice") or (bars[-1][3] if bars else None)
            mtime = meta.get("regularMarketTime")
            date = (datetime.fromtimestamp(mtime, tz=timezone.utc).strftime("%Y-%m-%d")
                    if mtime else (bars[-1][0] if bars else None))
            if price and date:
                out[sym] = {"price": float(price), "date": date, "bars": bars}
        except Exception as e:
            print(f"  {sym}: daily bars FAILED ({e})")
    return out


# ── Update + target check ──

def _fmt_price(p):
    s = f"{p:.2f}"
    return s.rstrip("0").rstrip(".") if "." in s else s


def _target_hit(setup, bars, since, price):
    """First date on/after `since` where a confirmed setup's target was touched, else None."""
    direction, target = setup.get('direction'), setup.get('target')
    if direction not in ('up', 'down') or target is None:
        return None
    for d, high, low, _ in bars:
        if d < since:
            continue
        if (direction == 'down' and low <= target) or (direction == 'up' and high >= target):
            return d
    # No bars (fetch fallback) — fall back to the latest price alone.
    if not bars and price is not None:
        if (direction == 'down' and price <= target) or (direction == 'up' and price >= target):
            return 'today'
    return None


def update_watchlist(quotes, apply=False, path=WATCHLIST_FILE):
    """
    quotes: {sym: {'price', 'date', 'bars'}}. Returns (price_changes, target_hits, review).
      price_changes: [(sym, old, new)]
      target_hits:   [(sym, label, target, date)]   label = 'main' or '<timeframe> alt'
      review:        [str] — forming/signal setups past target, or closes beyond invalidation
    """
    with open(path) as fh:
        text = fh.read()
    entries = parse_watchlist(text)
    edits, price_changes, target_hits, review = [], [], [], []

    for e in entries:
        f = e['fields']
        sym = f.get('ticker', (0, 0, None))[2]
        q = quotes.get(sym)
        if not q:
            continue
        price, date = q['price'], q['date']
        old_date = f['priceDate'][2] if 'priceDate' in f else date
        new_price = _fmt_price(price)

        if 'price' in f and _fmt_price(f['price'][2]) != new_price:
            price_changes.append((sym, _fmt_price(f['price'][2]), new_price))
            edits.append((f['price'][0], f['price'][1], new_price))
        if 'priceDate' in f and f['priceDate'][2] != date:
            edits.append((f['priceDate'][0], f['priceDate'][1], json.dumps(date)))

        setups = [('main', {k: v[2] for k, v in f.items()}, f)]
        if e['alt']:
            alt_vals = {k: v[2] for k, v in e['alt'].items()}
            setups.append((f"{alt_vals.get('timeframe', 'alt')} alt", alt_vals, e['alt']))

        for label, s, pos in setups:
            stage, direction = s.get('stage'), s.get('direction')
            if direction not in ('up', 'down'):
                continue
            since = max(old_date, s.get('stageDate') or old_date)
            hit = _target_hit(s, q['bars'], since, price)
            hit_date = date if hit == 'today' else hit

            if stage == 'confirmed' and hit_date:
                target_hits.append((sym, label, s['target'], hit_date))
                edits.append((pos['stage'][0], pos['stage'][1], '"target"'))
                if 'stageDate' in pos:
                    edits.append((pos['stageDate'][0], pos['stageDate'][1], json.dumps(hit_date)))
                else:  # insert right after stage
                    edits.append((pos['stage'][1], pos['stage'][1], f', stageDate: {json.dumps(hit_date)}'))
            elif stage in ('forming', 'signal') and hit_date:
                review.append(f"{sym} ({label}): {stage} setup already touched its ${_fmt_price(s['target'])} target on {hit_date} — review manually")

            inv = s.get('invalidation')
            if stage in ('signal', 'confirmed') and inv is not None and not hit_date:
                if (direction == 'down' and price > inv) or (direction == 'up' and price < inv):
                    review.append(f"{sym} ({label}): closed ${new_price} beyond invalidation ${_fmt_price(inv)} — check for follow-through / mark failed")

    if apply and edits:
        for start, end, new in sorted(edits, key=lambda x: x[0], reverse=True):
            text = text[:start] + new + text[end:]
        with open(path, 'w') as fh:
            fh.write(text)

    return price_changes, target_hits, review


def print_watchlist_report(price_changes, target_hits, review, missing, apply):
    print(f"\n{'='*72}\nPATTERN WATCHLIST ({os.path.relpath(WATCHLIST_FILE)})\n")
    mode = "Updated" if apply else "Would update"
    print(f"{mode} {len(price_changes)} watchlist price(s).")
    if target_hits:
        print(f"\n🎯 Target reached ({'marked' if apply else 'would mark'} stage → target):")
        for sym, label, target, d in target_hits:
            print(f"  {sym:<6} {label:<12} target ${_fmt_price(target)}  on {d}")
    if review:
        print("\n⚠ Needs review:")
        for line in review:
            print(f"  {line}")
    if missing:
        print(f"\nNo watchlist price for: {', '.join(missing)}")
