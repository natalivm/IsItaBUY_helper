#!/usr/bin/env python3
"""
Build the landing page's two weekly lists (data/weeklyFeature.ts):

  1. Hottest setups  — up to 3 of the watchlist's most actionable setups,
     scored from data/patternWatchlist.ts (stage, RSI momentum, trend
     agreement, room to target, reward/risk, freshness).
  2. Reporting this week — every symbol the site tracks (valuation pages and
     watchlist-only symbols alike) whose next earnings date falls inside the
     coming Mon-Fri, from Yahoo Finance (cached in
     data/earningsCalendar.json) with each stock file's hand-curated
     `nextEarningsOn` as a fallback.

Both lists are rebuilt once a week, before Monday's open
(.github/workflows/weekly-feature.yml). No external dependencies.

Usage:
    python3 weekly_feature.py                 # dry run — print what would be written
    python3 weekly_feature.py --apply         # write data/weeklyFeature.ts
    python3 weekly_feature.py --offline       # skip Yahoo, use the cached calendar
    python3 weekly_feature.py --week 2026-10-26   # pin the week (testing)
    python3 weekly_feature.py --top 5         # feature more than 3 setups

The earnings cache is only ever added to: a fetch that comes back empty (no
network, Yahoo down) leaves the previous dates in place, so a failed Monday run
degrades to last week's calendar instead of an empty list.
"""

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import date as _date, datetime, timedelta, timezone

import pattern_watchlist as pw

_ROOT = os.path.dirname(os.path.abspath(__file__))
STOCKS_DIR = os.path.join(_ROOT, "stocks")
DATA_DIR = os.path.join(_ROOT, "data")
FEATURE_FILE = os.path.join(DATA_DIR, "weeklyFeature.ts")
CALENDAR_FILE = os.path.join(DATA_DIR, "earningsCalendar.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
}

# How many setups the landing page features.
TOP_N = 3

# Stages a setup can be featured in: it still has somewhere to go.
# `atRisk` is deliberately absent: a break whose own timeframe has closed back past
# invalidation is the last thing to feature as a hot setup. `retest` is absent too.
LIVE_STAGES = ("confirmed", "signal", "forming")


# ── The week being featured ──

def week_bounds(today=None):
    """(monday, friday) ISO dates of the week this run is for.

    The job runs before Monday's open, so Mon-Fri means "the week we are in"
    and a weekend run (or a manual one) means "the week about to start".
    """
    d = today or pw._now_et().date()
    monday = d - timedelta(days=d.weekday()) if d.weekday() < 5 else d + timedelta(days=7 - d.weekday())
    return monday.isoformat(), (monday + timedelta(days=4)).isoformat()


# ── Hottest setups ──

_AGREE_N_RE = re.compile(r'\bn:\s*(\d+)')


def _agree_n(text, pos):
    """`agree.n` for a setup — the parser keeps nested objects as spans, not values."""
    span = pos.get('agree')
    if not span:
        return 0
    m = _AGREE_N_RE.search(text, span[0], span[1])
    return int(m.group(1)) if m else 0


def _days_since(iso, today):
    try:
        return (today - _date.fromisoformat(iso)).days
    except (TypeError, ValueError):
        return None


def score_setup(s, agree_n, today):
    """(score, why[]) for one setup. Higher is hotter; None when it can't be featured.

    The weights are deliberately blunt — this ranks a handful of setups for a
    shortlist, it is not a model. In rough order of what makes a setup worth
    looking at this week:
      · how far along it is (a confirmed break beats one still forming),
      · whether daily RSI and the stock's own trend back its direction,
      · how many stored setups point at the same target,
      · how much room is left to the target, and how that compares with the
        distance to invalidation,
      · how recently it moved.
    """
    stage, direction = s.get('stage'), s.get('direction')
    price, target = s.get('price'), s.get('target')
    if stage not in LIVE_STAGES or direction not in ('up', 'down'):
        return None
    if not price or not target:
        return None
    room = (target - price) / price * 100
    # A target already behind the price has nothing left to offer.
    if (direction == 'up' and room <= 0) or (direction == 'down' and room >= 0):
        return None

    why = []
    score = {'confirmed': 40, 'signal': 25, 'forming': 12}[stage]
    tf = s.get('timeframe') or 'daily'
    why.append({
        'confirmed': f"Break confirmed on the {tf} chart",
        'signal': f"Signal candle on the {tf} chart, waiting on the confirm",
        'forming': f"Still forming on the {tf} chart",
    }[stage])

    rsi = s.get('rsi')
    mom = pw._momentum(rsi, direction)
    if mom == 'with':
        score += 20
        why.append(f"Daily RSI {rsi:.0f} backs the {'upside' if direction == 'up' else 'downside'}")
    elif mom == 'against':
        score -= 25

    trend = s.get('trend')
    if trend == direction:
        score += 10
        why.append(f"The stock's own trend is {direction}")
    elif trend in ('up', 'down'):
        score -= 5

    if agree_n > 1:
        score += min(12, 4 * (agree_n - 1))
        why.append(f"{agree_n} stored setups point at the same target")

    score += min(abs(room), 40) * 0.6
    why.append(f"{abs(room):.1f}% from here to the target")

    inval = s.get('invalidation')
    if inval:
        risk = abs(price - inval) / price * 100
        if risk > 0:
            rr = abs(room) / risk
            if rr >= 3:
                score += 10
                why.append(f"About {rr:.1f}x more room to the target than to invalidation")
            elif rr >= 2:
                score += 5

    age = _days_since(s.get('stageDate'), today)
    if age is not None:
        if age <= 10:
            score += 8
        elif age <= 30:
            score += 4

    return score, why


def hot_setups(text, limit=TOP_N, include_auto=False, today=None):
    """The `limit` hottest setups, at most one per stock, highest score first.

    Only the two setups the site actually shows (main + alt) are considered,
    and auto-detected ones are skipped unless asked for: they carry a red dot
    until a human has checked them, which is not what belongs on a landing page.
    """
    today = today or pw._now_et().date()
    out = []
    for e in pw.parse_watchlist(text):
        f = e['fields']
        main = {k: v[2] for k, v in f.items()}
        entry_auto = bool(main.get('auto'))
        shown = [('main', main, f, entry_auto)]
        if e['alt']:
            alt = {k: v[2] for k, v in e['alt'].items()}
            # The alt inherits whatever it doesn't state itself from the main setup.
            merged = {k: alt.get(k, main.get(k)) for k in set(main) | set(alt)}
            merged['auto'] = alt.get('auto')
            shown.append(('alt', merged, e['alt'], bool(alt.get('auto'))))

        best = None
        for _, s, pos, auto in shown:
            if auto and not include_auto:
                continue
            if not s.get('pattern') or s['pattern'].lower().startswith('no clear pattern'):
                continue
            scored = score_setup(s, _agree_n(text, pos), today)
            if scored and (best is None or scored[0] > best[0]):
                best = (scored[0], s, scored[1])
        if best:
            score, s, why = best
            out.append({
                'ticker': main.get('ticker'),
                'name': main.get('name'),
                'pattern': s.get('pattern'),
                'timeframe': s.get('timeframe') or 'daily',
                'direction': s.get('direction'),
                'stage': s.get('stage'),
                'stageDate': s.get('stageDate'),
                'price': s.get('price'),
                'priceDate': main.get('priceDate'),
                'target': s.get('target'),
                'invalidation': s.get('invalidation'),
                'rsi': s.get('rsi'),
                'score': round(score, 1),
                'why': why,
            })
    out.sort(key=lambda h: -h['score'])
    return out[:limit]


# ── Earnings calendar ──

def stock_tickers():
    """{ticker: name} for every symbol the site tracks.

    That is every stock with a valuation page *and* every watchlist-only
    symbol (SPY, CAT, XOM, ...). A watchlist entry has a setup to link to,
    which is all the earnings list needs — it does not need fundamentals.
    """
    out = {}
    with open(pw.WATCHLIST_FILE) as fh:
        wl = fh.read()
    for e in pw.parse_watchlist(wl):
        f = e['fields']
        if 'ticker' in f:
            out[f['ticker'][2]] = f.get('name', (0, 0, f['ticker'][2]))[2]
    # A stock file's name wins: it is the curated one the detail page shows.
    for fn in sorted(os.listdir(STOCKS_DIR)):
        if not fn.endswith('.ts') or fn in ('index.ts', 'defineStock.ts'):
            continue
        with open(os.path.join(STOCKS_DIR, fn)) as fh:
            text = fh.read()
        m = re.search(r"name:\s*'([^']*)'|name:\s*\"([^\"]*)\"", text)
        out[fn[:-3]] = (m.group(1) or m.group(2)) if m else fn[:-3]
    return out


def curated_earnings():
    """{ticker: 'YYYY-MM-DD'} from the hand-maintained `nextEarningsOn` fields."""
    out = {}
    for fn in sorted(os.listdir(STOCKS_DIR)):
        if not fn.endswith('.ts') or fn in ('index.ts', 'defineStock.ts'):
            continue
        with open(os.path.join(STOCKS_DIR, fn)) as fh:
            m = re.search(r"nextEarningsOn:\s*['\"](\d{4}-\d{2}-\d{2})['\"]", fh.read())
        if m:
            out[fn[:-3]] = m.group(1)
    return out


def _et_from_epoch(ts):
    """Epoch seconds → naive New York datetime."""
    utc = datetime.fromtimestamp(ts, tz=timezone.utc)
    try:
        from zoneinfo import ZoneInfo
        return utc.astimezone(ZoneInfo("America/New_York")).replace(tzinfo=None)
    except Exception:
        # Same DST approximation pattern_watchlist falls back on.
        naive = utc.replace(tzinfo=None)

        def sunday(month, n):
            d = datetime(naive.year, month, 1)
            return d + timedelta(days=(6 - d.weekday()) % 7, weeks=n - 1)
        dst = sunday(3, 2) + timedelta(hours=7) <= naive < sunday(11, 1) + timedelta(hours=6)
        return naive - timedelta(hours=4 if dst else 5)


def _slot(when):
    """'bmo' / 'amc' / 'tbd' from the reported ET time of the call."""
    if when.hour == 0 and when.minute == 0:
        return 'tbd'
    if when.hour < 12:
        return 'bmo'
    if when.hour >= 16:
        return 'amc'
    return 'tbd'


def _quote_earnings(quote):
    """{'date', 'time', 'estimated'} from one Yahoo quote record, or None."""
    ts = quote.get('earningsTimestamp') or quote.get('earningsTimestampStart')
    if not ts:
        return None
    when = _et_from_epoch(ts)
    start, end = quote.get('earningsTimestampStart'), quote.get('earningsTimestampEnd')
    # Yahoo widens start/end into a range when the date itself is not fixed yet.
    ranged = bool(start and end and end - start > 86_400)
    return {
        'date': when.date().isoformat(),
        'time': 'tbd' if ranged else _slot(when),
        'estimated': bool(quote.get('isEarningsDateEstimate')) or ranged,
    }


def fetch_earnings(symbols, opener=None, crumb=None):
    """{ticker: {'date', 'time', 'estimated'}} from Yahoo Finance. Empty on failure."""
    out = {}
    chunk = 50
    for i in range(0, len(symbols), chunk):
        batch = symbols[i:i + chunk]
        url = ("https://query2.finance.yahoo.com/v7/finance/quote?symbols="
               + ",".join(batch) + (f"&crumb={crumb}" if crumb else ""))
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            fetch = opener.open(req, timeout=20) if opener else urllib.request.urlopen(req, timeout=20)
            data = json.loads(fetch.read().decode())
        except (urllib.error.HTTPError, urllib.error.URLError, ValueError) as e:
            print(f"  quote batch {i // chunk + 1} failed ({e})")
            continue
        for quote in data.get('quoteResponse', {}).get('result', []):
            sym, ev = quote.get('symbol'), _quote_earnings(quote)
            if sym and ev:
                out[sym] = ev
    return out


def load_calendar():
    if os.path.exists(CALENDAR_FILE):
        with open(CALENDAR_FILE) as fh:
            return json.load(fh)
    return {}


def save_calendar(cal):
    with open(CALENDAR_FILE, 'w') as fh:
        json.dump(cal, fh, indent=2, sort_keys=True)
        fh.write("\n")


def earnings_this_week(names, monday, friday, offline=False):
    """([{ticker, name, date, time, estimated}], calendar) for the featured week."""
    cal = load_calendar()
    if not offline:
        try:
            import update_prices
            opener, crumb = update_prices.get_yahoo_session()
        except Exception:
            opener, crumb = None, None
        fresh = fetch_earnings(sorted(names), opener, crumb)
        print(f"  Yahoo returned earnings dates for {len(fresh)}/{len(names)} stocks")
        cal.update(fresh)

    # Hand-curated dates fill the gaps Yahoo leaves (and only those).
    for ticker, iso in curated_earnings().items():
        if ticker not in cal:
            cal[ticker] = {'date': iso, 'time': 'tbd', 'estimated': False}

    rows = [
        {'ticker': t, 'name': names.get(t, t), **ev}
        for t, ev in cal.items()
        if t in names and monday <= ev.get('date', '') <= friday
    ]
    rows.sort(key=lambda r: (r['date'], {'bmo': 0, 'tbd': 1, 'amc': 2}[r.get('time', 'tbd')], r['ticker']))
    return rows, cal


# ── Writing data/weeklyFeature.ts ──

def _ts(value, indent=0):
    """Render a Python value as a TS literal (objects keep insertion order)."""
    pad = '  ' * indent
    if value is None:
        return 'undefined'
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, (int, float)):
        return pw._fmt_price(value) if isinstance(value, float) else str(value)
    if isinstance(value, str):
        return json.dumps(value)
    if isinstance(value, list):
        if not value:
            return '[]'
        items = ',\n'.join(f"{pad}  {_ts(v, indent + 1)}" for v in value)
        return '[\n' + items + f'\n{pad}]'
    if isinstance(value, dict):
        kept = [(k, v) for k, v in value.items() if v is not None]
        if not kept:
            return '{}'
        items = ',\n'.join(f"{pad}  {k}: {_ts(v, indent + 1)}" for k, v in kept)
        return '{\n' + items + f'\n{pad}}}'
    raise TypeError(f"cannot render {type(value)}")


HEADER = '''// Landing-page lists, rebuilt once a week before Monday's open by
// weekly_feature.py (.github/workflows/weekly-feature.yml). Hand edits are
// overwritten by the next run — change the scoring in weekly_feature.py instead.

import type { PatternDirection, PatternStage, PatternTimeframe } from './patternWatchlist';

/** One of the week's featured setups, scored by weekly_feature.score_setup. */
export interface HotSetup {
  ticker: string;
  name: string;
  pattern: string;
  timeframe: PatternTimeframe;
  direction: PatternDirection;
  stage: PatternStage;
  stageDate?: string;
  /** Close the setup's percentages are measured from, and its date. */
  price: number;
  priceDate?: string;
  target: number;
  invalidation?: number;
  /** Daily Wilder RSI-14 at the time of the run. */
  rsi?: number;
  score: number;
  /** Plain-language reasons the setup made the shortlist. */
  why: string[];
}

/** A covered stock reporting earnings during the featured week. */
export interface EarningsEvent {
  ticker: string;
  name: string;
  /** Report date, YYYY-MM-DD. */
  date: string;
  /** Before the open / after the close / not announced. */
  time: 'bmo' | 'amc' | 'tbd';
  /** Yahoo has not confirmed the date — treat it as provisional. */
  estimated?: boolean;
}

export interface WeeklyFeature {
  /** Monday of the featured week, YYYY-MM-DD. */
  weekOf: string;
  /** Friday of the featured week, YYYY-MM-DD. */
  weekEnd: string;
  /** When this file was last rebuilt, YYYY-MM-DD. */
  generatedOn: string;
  hot: HotSetup[];
  earnings: EarningsEvent[];
}

export const WEEKLY_FEATURE: WeeklyFeature = '''


def render(feature):
    return HEADER + _ts(feature) + ';\n'


def main():
    ap = argparse.ArgumentParser(description="Rebuild the landing page's weekly lists.")
    ap.add_argument('--apply', action='store_true', help='write data/weeklyFeature.ts')
    ap.add_argument('--offline', action='store_true', help='skip Yahoo; use the cached calendar')
    ap.add_argument('--week', help='Monday of the week to build (YYYY-MM-DD), for testing')
    ap.add_argument('--top', type=int, default=TOP_N, help=f'how many setups to feature (default {TOP_N})')
    ap.add_argument('--include-auto', action='store_true',
                    help='also consider auto-detected setups (red dot: not checked by hand)')
    args = ap.parse_args()

    if args.week:
        monday, friday = week_bounds(_date.fromisoformat(args.week))
    else:
        monday, friday = week_bounds()
    print(f"Week of {monday} → {friday}\n")

    with open(pw.WATCHLIST_FILE) as fh:
        text = fh.read()
    hot = hot_setups(text, limit=args.top, include_auto=args.include_auto)
    print(f"Hottest setups ({len(hot)}):")
    for h in hot:
        print(f"  {h['ticker']:<6} {h['score']:>6}  {h['stage']:<9} {h['timeframe']:<7} "
              f"{h['direction']:<4} {h['pattern']}")
        for w in h['why']:
            print(f"           · {w}")

    names = stock_tickers()
    print(f"\nEarnings for {len(names)} tracked symbols:")
    rows, cal = earnings_this_week(names, monday, friday, offline=args.offline)
    if rows:
        for r in rows:
            flag = ' (estimated)' if r.get('estimated') else ''
            print(f"  {r['date']}  {r['time']:<3}  {r['ticker']:<6} {r['name']}{flag}")
    else:
        print("  none reporting this week")

    feature = {
        'weekOf': monday,
        'weekEnd': friday,
        'generatedOn': pw._now_et().date().isoformat(),
        'hot': hot,
        'earnings': rows,
    }
    out = render(feature)

    if not args.apply:
        print(f"\nDry run — {FEATURE_FILE} unchanged ({len(out)} bytes would be written). "
              f"Re-run with --apply.")
        return 0

    with open(FEATURE_FILE, 'w') as fh:
        fh.write(out)
    save_calendar(cal)
    print(f"\nWrote {FEATURE_FILE} and {CALENDAR_FILE}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
