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
TOP_N = 3     # per direction: the landing page shows this many bullish and this many bearish

# Stages a setup can be featured in: it still has somewhere to go.
# `atRisk` is deliberately absent: a break whose own timeframe has closed back past
# invalidation is the last thing to feature as a hot setup.
#
# `retest` used to be absent alongside it, which had them on the same side of a gate they
# belong on opposite sides of. `atRisk` is a completed close PAST the line -- the setup's
# state has genuinely changed. `retest` is price REACHING the line and holding, and nothing
# about the setup changed at all: `prevStage` reads "confirmed" on every live one, same
# break, same confirm, same target, same levels. The only new thing is that somebody looked
# at the chart and wrote down where price is.
#
# So excluding it made the label a DEMOTION: marking the sixteen channels on Oct 26 knocked
# ANET and EME off the landing page, and ANET is the best bearish reading on the board
# either way. A ranking where looking harder at a setup removes it is backwards, and the
# incentive is worse than the one the exclusion guarded against -- if the stage can only
# cost you, the safe move is to never mark anything. RULEBOOK.md agrees from the other end:
# taken at the line the same target is bought against a stop that is immediate, which is the
# best entry available rather than a reason to hide the row.
#
# Known cost, recorded rather than fixed: `retest` has no automatic setter, so the shortlist
# now depends in part on a hand label. That is an argument for wiring the setter (the review
# line in pattern_watchlist already detects candidates every run), not for a penalty.
LIVE_STAGES = ("confirmed", "signal", "forming", "retest")


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


# ── Scoring ──
#
# Rank on the break, not on the target. Measured against the completed calls, the
# confirm level reproduces at **0.0% median error** while the target runs 6.7% and
# mostly is not reached at all — the source tool's live setups project 30.1% and the
# ones that finish deliver 12.1%. So every term below is about the break: how clean it
# is, how recent, whether the stock is turning behind it, and whether enough room is
# left to be worth taking. Room is a gate, never a prize.

ROOM_GOOD = 15.0        # % from price to target that counts as a real opportunity
ROOM_MIN = 6.0          # below this there is not enough left to feature
ROOM_CREDIT = 12        # flat, because a longer projection is not a better setup
TURN_WITH = 20          # the stock is rolling over the setup's way
TURN_AGAINST = -20      # ...or the wrong way, which is worse than no reading
SPENT_HALF, SPENT_MOST = 0.5, 0.75
SPENT_PENALTY = (-15, -30)
ENTRY_CREDIT = 12       # the whole of it to a break that has not moved yet, none at half-spent


def _turn_credit(bot, direction):
    """(points, reason) from the mean-reversion panel, or (0, None).

    `reversion.py`'s own rule is that *being stretched is not a signal; rolling over
    is* — price stays stretched far longer than it looks sustainable, so the evidence
    is the confirmed pivot in z, not the depth of it. An upward setup wants a turn-up
    dot behind it and is actively worse off with a fresh turn-down.

    A gated reading counts for nothing either way: the panel hides its dots when the
    half-life exceeds the lookback, and a list that disagreed with the panel it is read
    against would be its own kind of bug.
    """
    if not bot or bot.get('gated'):
        return 0, None
    fresh = pw.TURN_FRESH
    up_ago, dn_ago = bot.get('turnUpAgo'), bot.get('turnDownAgo')
    want, other = (up_ago, dn_ago) if direction == 'up' else (dn_ago, up_ago)
    if want is not None and want <= fresh and (other is None or other > want):
        side = 'up' if direction == 'up' else 'down'
        return TURN_WITH, f"Turning {side} — pivot confirmed {want} bars ago"
    if other is not None and other <= fresh:
        return TURN_AGAINST, None
    return 0, None


def score_setup(s, agree_n, today, bot=None, tall=False, progress=None):
    """(score, why[]) for one setup. Higher is hotter; None when it can't be featured.

    The weights are deliberately blunt — this ranks a handful of setups for a
    shortlist, it is not a model. What it rewards, in order:
      · how far along the break is (a confirmed one beats one still forming),
      · whether the stock is rolling over the setup's way, and whether RSI and the
        stock's own trend back its direction,
      · how many stored setups point at the same target,
      · enough room left to be worth taking — a gate, not a sliding reward,
      · how recently it moved.

    **Two terms were removed and the reasons are worth keeping.** Reward:risk against
    the invalidation (+10 at ≥3x) measured nothing: RULEBOOK.md records that an
    invalidation marks a trend change rather than a trade stop, so the ratio was
    between two numbers that do not form a trade. And room to target used to scale at
    0.6 per % up to +24 — the single biggest weight — which made it a detector for the
    longest drawing on the board: across the trend-aligned ledger the setups
    `geometry_faults` flags carry a median 40.7% of room against 20.6% for the rest.
    Paying for projection distance is paying for the number we know does not arrive.
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
    if abs(room) < ROOM_MIN:
        return None
    # A long-horizon drawing is a horizon label rather than a defect (CLAUDE.md, "Too
    # tall to draw"), so it stays in the ledger — but its target will not resolve this
    # quarter, which is not what a weekly shortlist is for.
    if tall:
        return None

    why = []
    # A retest scores as the stage it came from -- it IS that setup, with price back at the
    # boundary. `prevStage` is written by whoever marked it; fall back to `confirmed`, which
    # is the only value it has ever carried and the only stage a retest can come from.
    rank_stage = s.get('prevStage') or 'confirmed' if stage == 'retest' else stage
    if rank_stage not in ('confirmed', 'signal', 'forming'):
        rank_stage = 'confirmed'
    tf = s.get('timeframe') or 'daily'
    score = {'confirmed': 40, 'signal': 25, 'forming': 12}[rank_stage]
    why.append({
        'confirmed': f"Break confirmed on the {tf} chart",
        'signal': f"Signal candle on the {tf} chart, waiting on the confirm",
        'forming': f"Still forming on the {tf} chart",
    }[rank_stage] + (", price back at the boundary it broke" if stage == 'retest' else ""))

    turn, turn_why = _turn_credit(bot, direction)
    score += turn
    if turn_why:
        why.append(turn_why)

    rsi = s.get('rsi')
    mom = pw._momentum(rsi, direction)
    if mom == 'with':
        score += 8
        why.append(f"Daily RSI {rsi:.0f} backs the {'upside' if direction == 'up' else 'downside'}")
    elif mom == 'against':
        score -= 10

    trend = s.get('trend')
    if trend == direction:
        score += 10
        why.append(f"The stock's own trend is {direction}")
    elif trend in ('up', 'down'):
        score -= 5

    if agree_n > 1:
        score += min(12, 4 * (agree_n - 1))
        why.append(f"{agree_n} stored setups point at the same target")

    if abs(room) >= ROOM_GOOD:
        score += ROOM_CREDIT
        why.append(f"{abs(room):.1f}% from here to the target")
    elif abs(room) >= ROOM_MIN:
        score += ROOM_CREDIT // 2
        why.append(f"{abs(room):.1f}% from here to the target")

    # A break most of the way to its target has had its entry. RULEBOOK.md puts the
    # entry at the invalidation, not mid-range, so a move already made is a watch.
    #
    # This is also what orders the shortlist. With room reduced to a gate the other
    # terms are all categorical, and nine setups tied at 98 — a ranking that does not
    # rank. The tiebreaker has to be something we believe, and "how much of this entry
    # is still available" is the one continuous quantity on a row that is not the
    # target we know does not arrive.
    done = (progress or {}).get('done')
    if done is not None:
        if done > SPENT_MOST:
            score += SPENT_PENALTY[1]
        elif done > SPENT_HALF:
            score += SPENT_PENALTY[0]
        else:
            left = max(0.0, min(1.0, 1 - done / SPENT_HALF))
            score += ENTRY_CREDIT * left
            if done <= 0.25:
                why.append(f"Only {max(done, 0) * 100:.0f}% of the move is spent")

    age = _days_since(s.get('stageDate'), today)
    if age is not None:
        if age <= 10:
            score += 8
        elif age <= 30:
            score += 4

    return score, why


def hot_setups(text, limit=TOP_N, include_auto=False, today=None):
    """The hottest setups: `limit` upward then `limit` downward, at most one per stock.

    Ranking the two together let one side take every slot — a week where the
    best breaks all point down reads as a market call rather than a shortlist,
    and the reader loses the other half of the board. Scoring is unchanged and
    each side is still ordered by it; only the pool is split.

    Only the two setups the site actually shows (main + alt) are considered,
    and auto-detected ones are skipped unless asked for: they carry a red dot
    until a human has checked them, which is not what belongs on a landing page.
    """
    today = today or pw._now_et().date()
    # Computed once for the whole file rather than per setup: geometry_faults reparses
    # the ledger and `bottoming` reads candle files off disk.
    tall = {(r[0], r[2], r[3]) for r in pw.geometry_faults(text)}
    prog = {(r[1], r[3], r[4]): r[14] for r in pw.reward_rank(text, shown_only=True,
                                                              include_auto=True)}
    bots = {}
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
            tk = main.get('ticker')
            if tk not in bots:
                bots[tk] = pw.bottoming(tk)
            key = (tk, s.get('pattern'), s.get('timeframe') or main.get('timeframe'))
            scored = score_setup(s, _agree_n(text, pos), today, bot=bots[tk],
                                 tall=key in tall, progress=prog.get(key))
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
                'why': why,          # printed by the dry run; not written to the TS file
            })
    out.sort(key=lambda h: -h['score'])
    up = [h for h in out if h['direction'] != 'down'][:limit]
    dn = [h for h in out if h['direction'] == 'down'][:limit]
    return up + dn


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
    ap.add_argument('--top', type=int, default=TOP_N, help=f'how many setups to feature per direction (default {TOP_N})')
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
    for side, label in (('up', 'Bullish'), ('down', 'Bearish')):
        picks = [h for h in hot if (h['direction'] == 'down') == (side == 'down')]
        print(f"{label} ({len(picks)}):")
        for h in picks:
            print(f"  {h['ticker']:<6} {h['score']:>6}  {h['stage']:<9} {h['timeframe']:<7} "
                  f"{h['pattern']}")
            for w in h['why']:
                print(f"           · {w}")
        print()

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
        'hot': [{k: v for k, v in h.items() if k != 'why'} for h in hot],
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
