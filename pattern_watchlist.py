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

Pending setups (forming / signal, including either-direction ones) are checked
against their price limits using the latest *close*. Each has a limit on either
side, and which one the close crossed decides what happened:
  forming:  invalidation behind, the signal level (or confirm, if there is no
            signal level) ahead
  signal:   the signal level behind (a close back past it cancels the signal;
            invalidation if there is no signal level), the confirm level ahead
  both:     breakUp / breakDown
A close past the limit *ahead* is the setup working, so it moves the setup on:
to `signal` on a close past the signal level, to `confirmed` on a close past
confirm -- `confirm` is the signal candle's low/high (PATTERN_RULES.md), so "a
later close beyond confirm" and "beyond the signal candle's low" are one test,
and confirmation needs a later bar than the one that signalled. `stageDate`
moves to the closing date.
A close past the limit *behind* is the setup coming apart, and only that flips
it to `stage: "update"` ("Needs updating": a new setup has to be posted),
recording `prevStage`, `updateDate` + `updateNote` (`stageDate` is left as it
was). An either-direction setup that breaks is flagged the same way: it carries
no signal, confirm or target, so a directional setup has to be drawn by hand.
Only a close on the setup's own timeframe counts: daily setups are checked every
run, weekly ones on Fridays, monthly ones on the month's last weekday. In between
they are only listed for review.

Only regular-session (9:30-16:00 ET) prices are used, never pre/post-market: Yahoo's
`regularMarketPrice` and daily bars with includePrePost=false. Close-based checks
(needs updating, invalidation) are skipped while that day's session is still open,
so a run before 16:00 ET never judges a setup on an intraday price. Target touches
are checked against regular-session highs/lows, which count as soon as they happen.
Confirmed setups that close beyond invalidation are only reported (failure needs
a follow-through close, which the bot can't judge).

Every status change is posted to the News feed (data/newsFeed.ts). Changes are
found by diffing against data/watchlistStatus.json, so hand edits (a new setup,
a setup marked failed, ...) get posted too, not just the bot's own changes.
Run `python3 pattern_watchlist.py --apply` after editing statuses by hand; the
daily price run does the same automatically.
"""

import argparse
import json
import os
import re
import urllib.request
from datetime import date as _date, datetime, timedelta, timezone

_DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
WATCHLIST_FILE = os.path.join(_DATA_DIR, "patternWatchlist.ts")
NEWS_FILE = os.path.join(_DATA_DIR, "newsFeed.ts")
SNAPSHOT_FILE = os.path.join(_DATA_DIR, "watchlistStatus.json")

# Pause the News feed while setups are being reworked by hand, so a session of edits does
# not post a post per change. Stage changes still happen and the snapshot is still written,
# so nothing floods the feed when this goes back to False -- the changes made while paused
# simply never get a News item. Every run says loudly that it is paused. `--no-news` does
# the same for a single run without touching this.
NEWS_PAUSED = True
# Candle files for the expanded-row charts, served with the site (public/ → dist/).
BARS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "bars")
# timeframe → (Yahoo interval, history range)
CHART_RANGES = {'daily': ('1d', '1y'), 'weekly': ('1wk', '5y'), 'monthly': ('1mo', '10y')}

_KEY_RE = re.compile(r'(?<![\w$])(\w+):\s*')
_VAL_RE = re.compile(r'"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true\b|false\b')


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
        val = json.loads(raw) if raw[0] in '"tf' else float(raw)
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
            more = []
            if 'more' in f:  # any number of extra setups: more: [{...}, {...}]
                m0, m1, _ = f['more']
                j = m0 + 1
                while j < m1 - 1:
                    if masked[j] == '{' and depth[j] == 3:
                        je = _close(masked, j)
                        item = _fields(text, masked, depth, j + 1, je, 4)
                        item['_span'] = (j, je, None)
                        more.append(item)
                        j = je
                    j += 1
            entries.append({'fields': f, 'alt': alt, 'more': more, 'span': (i, end)})
            i = end
        i += 1
    return entries


def get_watchlist_tickers(path=None):
    path = path or WATCHLIST_FILE
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
        # 3mo, not 1mo: these bars feed the trend read below as well as target touches.
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range=3mo&interval=1d&includePrePost=false"
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


# ── Chart candles ──

def chart_timeframes(path=None):
    """{ticker: {timeframes}} needed by the watchlist charts (main + alt setups)."""
    with open(path or WATCHLIST_FILE) as fh:
        entries = parse_watchlist(fh.read())
    out = {}
    for e in entries:
        main = {k: v[2] for k, v in e['fields'].items()}
        for _, s, _ in _setups(e):
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'
            out.setdefault(main['ticker'], set()).add(tf)
    return out


def fetch_chart_bars(sym, timeframe, headers, opener=None):
    """Regular-session OHLC candles as [(YYYY-MM-DD, o, h, l, c)], oldest first."""
    interval, rng = CHART_RANGES.get(timeframe, CHART_RANGES['daily'])
    url = (f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}"
           f"?range={rng}&interval={interval}&includePrePost=false")
    req = urllib.request.Request(url, headers=headers)
    resp = opener.open(req, timeout=15) if opener else urllib.request.urlopen(req, timeout=15)
    res = json.loads(resp.read().decode())["chart"]["result"][0]
    q = res["indicators"]["quote"][0]
    bars = {}
    for ts, o, h, l, c in zip(res.get("timestamp", []), q["open"], q["high"], q["low"], q["close"]):
        if None in (o, h, l, c):
            continue
        day = datetime.fromtimestamp(ts, tz=timezone.utc).date()
        # Yahoo sends the live week/month as an extra bar dated today: fold it into its period.
        if timeframe == 'weekly':
            key = day - timedelta(days=day.weekday())
        elif timeframe == 'monthly':
            key = day.replace(day=1)
        else:
            key = day
        if key in bars:
            d0, o0, h0, l0, _ = bars[key]
            bars[key] = (d0, o0, max(h0, h), min(l0, l), c)
        else:
            bars[key] = (day.isoformat(), o, h, l, c)
    return [bars[k] for k in sorted(bars)]


def write_chart_bars(headers, path=None, bars_dir=BARS_DIR, opener=None):
    """Write public/bars/TICKER_timeframe.json for every watchlist chart. Returns (written, failed)."""
    os.makedirs(bars_dir, exist_ok=True)
    written, failed = [], []
    for sym, tfs in sorted(chart_timeframes(path or WATCHLIST_FILE).items()):
        for tf in sorted(tfs):
            try:
                bars = fetch_chart_bars(sym, tf, headers, opener)
            except Exception as e:
                failed.append(f"{sym} {tf} ({e})")
                continue
            if not bars:
                failed.append(f"{sym} {tf} (no data)")
                continue
            r = lambda v: round(v, 2)
            data = {"t": [b[0] for b in bars], "o": [r(b[1]) for b in bars], "h": [r(b[2]) for b in bars],
                    "l": [r(b[3]) for b in bars], "c": [r(b[4]) for b in bars]}
            with open(os.path.join(bars_dir, f"{sym}_{tf}.json"), 'w') as fh:
                json.dump(data, fh, separators=(',', ':'))
            written.append(f"{sym}_{tf}")
    return written, failed


# ── Update + checks ──

STAGE_LABEL = {
    'forming': 'Waiting for a break', 'signal': 'Break pending', 'confirmed': 'Break confirmed',
    'retest': 'Retest in progress', 'atRisk': 'At risk',
    'target': 'Target reached', 'failed': 'Pattern failed', 'update': 'Needs updating',
}


def _fmt_price(p):
    s = f"{p:.2f}"
    return s.rstrip("0").rstrip(".") if "." in s else s


def _setups(entry):
    """[(label, values, positions)] for the main setup, the optional alt setup and any `more` setups."""
    f = entry['fields']
    main = {k: v[2] for k, v in f.items()}
    out = [('main', main, f)]
    if entry['alt']:
        a = {k: v[2] for k, v in entry['alt'].items()}
        out.append((f"{a.get('timeframe', 'alt')} alt", a, entry['alt']))
    used = {lb for lb, _, _ in out}
    for item in entry.get('more', []):
        m = {k: v[2] for k, v in item.items() if k != '_span'}
        label = f"{m.get('timeframe') or main.get('timeframe') or 'daily'} {m.get('pattern') or main.get('pattern')}"
        n = 2
        while label in used:
            label = f"{label.split(' #')[0]} #{n}"
            n += 1
        used.add(label)
        out.append((label, m, item))
    return out


AGREE = 0.05   # targets within 5% of each other agree


def annotate_agreement(text):
    """Set `agree` on the two shown setups (main + second): how many stored setups in the same
    direction, on any timeframe, point to a target within 5%, their range, and which they are.
    Only these summaries reach the site; the stored extras are stripped from the build."""
    edits = []
    for e in parse_watchlist(text):
        setups = _setups(e)
        main = setups[0][1]
        live = []
        for lb, sv, pos in setups:
            v = dict(sv)
            if v.get('stage') == 'update':
                v['stage'] = v.get('prevStage') or 'forming'
            v.setdefault('timeframe', main.get('timeframe') or 'daily')
            v['pattern'] = v.get('pattern') or main.get('pattern')
            live.append((lb, v, pos))
        for lb, v, pos in live:
            if lb != 'main' and not lb.endswith(' alt'):
                continue
            t = v.get('target')
            others = [] if t is None or v.get('direction') not in ('up', 'down') else [
                o for olb, o, _ in live if olb != lb and o.get('direction') == v['direction'] and o.get('target')
                and o.get('stage') not in ('target', 'failed') and abs(o['target'] - t) <= AGREE * t]
            new = None
            if others:
                ts = [t] + [o['target'] for o in others]
                new = json.dumps({'n': len(others) + 1, 'lo': _r2(min(ts)), 'hi': _r2(max(ts)),
                                  'with': [f"{o['timeframe'].capitalize()} {o['pattern'].lower()}" for o in others]})
            if 'agree' in pos:
                v0, v1, _ = pos['agree']
                if new:
                    edits.append((v0, v1, new))
                else:  # drop the line
                    a = text.rfind('\n', 0, v0)
                    b = v1 + (1 if text[v1:v1 + 1] == ',' else 0)
                    edits.append((a, b, ''))
            elif new:
                s0, s1, _ = pos['stage']
                line_start = text.rfind('\n', 0, s0) + 1
                indent = re.match(r'[ \t]*', text[line_start:]).group(0)
                edits.append((s1, s1, f",\n{indent}agree: {new}"))
    for a, b, v in sorted(edits, key=lambda x: (x[0], x[1]), reverse=True):
        text = text[:a] + v + text[b:]
    return text


def _r2(v):
    return round(v, 2)


# Trend read (see _trend). Direction comes from the moving average and the swing
# structure; ADX only gates whether there is a trend at all, per the usual
# convention that ADX measures strength and the DI/price side measures direction.
RETEST_BAND = 0.015      # within 1.5% of the broken boundary counts as sitting on it
TREND_MIN_BARS = 30      # fewer daily bars than this and the window is too short to call
TREND_WINDOW = 63        # ~3 months of sessions, when reading trend off the stored candles
TREND_SLOPE_BARS = 10    # lookback for "is the average sloping?"
TREND_ADX_PERIOD = 14
TREND_ADX_MIN = 20       # below this the market is ranging, so report flat


def _adx(bars, period=TREND_ADX_PERIOD):
    """Wilder's ADX. Strength only -- it says nothing about which way."""
    if len(bars) < period * 2 + 1:
        return None
    tr, pdm, ndm = [], [], []
    for i in range(1, len(bars)):
        _, h, l, c = bars[i]
        _, ph, pl, pc = bars[i - 1]
        tr.append(max(h - l, abs(h - pc), abs(l - pc)))
        up, dn = h - ph, pl - l
        pdm.append(up if up > dn and up > 0 else 0.0)
        ndm.append(dn if dn > up and dn > 0 else 0.0)

    def smooth(xs):
        out = [sum(xs[:period])]
        for x in xs[period:]:
            out.append(out[-1] - out[-1] / period + x)
        return out

    str_, sp, sn = smooth(tr), smooth(pdm), smooth(ndm)
    dx = []
    for a, b, c in zip(str_, sp, sn):
        if a <= 0:
            continue
        pdi, ndi = 100 * b / a, 100 * c / a
        if pdi + ndi:
            dx.append(100 * abs(pdi - ndi) / (pdi + ndi))
    if len(dx) < period:
        return None
    adx = sum(dx[:period]) / period
    for x in dx[period:]:
        adx = (adx * (period - 1) + x) / period
    return adx


def _structure(bars):
    """+1 for higher highs and higher lows, -1 for lower highs and lower lows, else 0.

    Uses the same swing definition as the patterns themselves (PATTERN_RULES.md
    section 1: one candle each side), so the trend read and the setups agree on
    what a swing is.
    """
    highs = [b[1] for b in bars]
    lows = [b[2] for b in bars]
    H = [i for i in range(1, len(bars) - 1) if highs[i] > highs[i - 1] and highs[i] > highs[i + 1]]
    L = [i for i in range(1, len(bars) - 1) if lows[i] < lows[i - 1] and lows[i] < lows[i + 1]]
    if len(H) < 2 or len(L) < 2:
        return 0
    hh, hl = highs[H[-1]] > highs[H[-2]], lows[L[-1]] > lows[L[-2]]
    lh, ll = highs[H[-1]] < highs[H[-2]], lows[L[-1]] < lows[L[-2]]
    if hh and hl:
        return 1
    if lh and ll:
        return -1
    return 0


# RSI (see _rsi). 14 is Wilder's own period and the default on most charts.
# The 60/40 pair is the Cardwell regime convention -- an uptrend tends to hold
# RSI between 40 and 80, a downtrend between 20 and 60 -- so clearing 60 is a
# bullish-regime signal and losing 40 a bearish one. They are conventions, not
# tested edges: RSI confirms a setup's direction, it never sets it.
RSI_PERIOD = 14
RSI_BULL = 60
RSI_BEAR = 40


def _rsi(bars, period=RSI_PERIOD):
    """Wilder's RSI on closes, or None if there is not enough history.

    Wilder smoothing (seed = simple mean of the first `period` changes, then
    recursive), not the simple-moving-average variant -- the two drift apart
    after a volatile stretch, and charts show Wilder's.
    """
    closes = [b[3] for b in bars if b[3] is not None]
    if len(closes) < period + 1:
        return None
    gains = losses = 0.0
    for i in range(1, period + 1):
        d = closes[i] - closes[i - 1]
        gains += max(d, 0.0)
        losses += max(-d, 0.0)
    avg_gain, avg_loss = gains / period, losses / period
    for i in range(period + 1, len(closes)):
        d = closes[i] - closes[i - 1]
        avg_gain = (avg_gain * (period - 1) + max(d, 0.0)) / period
        avg_loss = (avg_loss * (period - 1) + max(-d, 0.0)) / period
    if avg_loss == 0:
        return 100.0 if avg_gain > 0 else 50.0
    rs = avg_gain / avg_loss
    return 100 - 100 / (1 + rs)


def _momentum(rsi, direction):
    """Does momentum back this setup's direction? 'with' / 'against' / 'neutral'.

    Deliberately symmetric: RSI over 60 confirms an upward setup but argues
    against a downward one, and under 40 the reverse. An either-direction setup
    has no side to confirm.
    """
    if rsi is None or direction not in ('up', 'down'):
        return 'neutral'
    if rsi >= RSI_BULL:
        return 'with' if direction == 'up' else 'against'
    if rsi <= RSI_BEAR:
        return 'with' if direction == 'down' else 'against'
    return 'neutral'


def _stored_daily(sym):
    """Daily bars from public/bars/, as fetch_daily_bars shapes them.

    The no-network path (`--apply` with no quotes) still needs enough history to
    read a trend, and the chart candles are already on disk.
    """
    path = os.path.join(BARS_DIR, f"{sym}_daily.json")
    if not os.path.exists(path):
        return []
    try:
        with open(path) as fh:
            b = json.load(fh)
        return list(zip(b['t'], b['h'], b['l'], b['c']))[-TREND_WINDOW:]
    except (ValueError, KeyError, OSError):
        return []


def _trend(bars):
    """'up' / 'down' / 'flat' from ~3 months of daily bars, or None if too few.

    Follows the usual construction rather than a home-made one: a moving average
    for direction (its slope, and which side price sits on), swing structure to
    confirm, and ADX purely as a strength gate -- a market that is going nowhere
    reports flat however the other two lean. Direction is a majority of the
    three; requiring no dissent at all was too strict, since one disagreeing
    vote is normal (CRWD, +42% over the window with its last two swings lower,
    read flat under that rule).

    The UI puts setups pointing the same way as the trend at the top of a
    stock's setup list; flat leaves that list in its stored order.
    """
    bars = [b for b in bars if b[1] is not None and b[2] is not None and b[3] is not None]
    if len(bars) < TREND_MIN_BARS:
        return None
    closes = [b[3] for b in bars]
    n = 50 if len(closes) >= 50 + TREND_SLOPE_BARS else 20
    if len(closes) < n + TREND_SLOPE_BARS:
        return None
    sma = lambda k: sum(closes[k - n:k]) / n
    now, before = sma(len(closes)), sma(len(closes) - TREND_SLOPE_BARS)

    votes = [
        1 if now > before else -1 if now < before else 0,      # is the average sloping?
        1 if closes[-1] > now else -1 if closes[-1] < now else 0,  # which side is price on?
        _structure(bars),                                       # higher highs / lower lows
    ]
    adx = _adx(bars)
    if adx is not None and adx < TREND_ADX_MIN:
        return 'flat'                                           # ranging: strength gate fails
    if votes.count(1) >= 2:
        return 'up'
    if votes.count(-1) >= 2:
        return 'down'
    return 'flat'


HEADER_KEYS = ('ticker', 'name', 'auto', 'trend', 'rsi', 'price', 'priceDate')
SKIP_KEYS = HEADER_KEYS + ('alt', 'more', 'history', 'keyLevel', '_span')


# The parser records array fields (`lines`, `history`) as spans in the source text rather
# than values, so a setup's trendlines have to be read back out of it.
_LINE_RE = re.compile(r'\{\s*from:\s*\["([\d-]+)",\s*(-?[\d.]+)\],\s*to:\s*\["([\d-]+)",\s*(-?[\d.]+)\]\s*\}')


def stored_lines(text, pos):
    """The setup's trendlines as [((date, value), (date, value)), ...], or None."""
    if 'lines' not in pos:
        return None
    found = _LINE_RE.findall(text[pos['lines'][0]:pos['lines'][1]])
    return [((d0, float(v0)), (d1, float(v1))) for d0, v0, d1, v1 in found] or None


def line_value(line, t, i):
    """A stored line's value at bar i, extended at its own slope per bar."""
    (d0, v0), (d1, v1) = line
    idx = lambda d: max([k for k, x in enumerate(t) if x <= d] or [0])
    i0, i1 = idx(d0), idx(d1)
    per = (v1 - v0) / (i1 - i0) if i1 > i0 else 0.0
    return v0 + per * (i - i0)


def _reindent(value, indent):
    """Re-indent a multi-line value (e.g. a lines array) to sit under `indent`."""
    rows = value.split('\n')
    if len(rows) == 1:
        return value
    rest = [r for r in rows[1:] if r.strip()]
    cut = min(len(r) - len(r.lstrip()) for r in rest) if rest else 0
    return '\n'.join([rows[0]] + [indent + r[cut:] if r.strip() else r for r in rows[1:]])


def _setup_text(text, pos, indent, inherit=None):
    """Field lines for one setup object, copied from its source positions."""
    out = []
    keys = [k for k in pos if k not in SKIP_KEYS]
    if inherit and 'pattern' not in pos:
        out.append(f"{indent}pattern: {json.dumps(inherit)},")
    for k in sorted(keys, key=lambda k: pos[k][0]):
        v0, v1, _ = pos[k]
        out.append(f"{indent}{k}: {_reindent(text[v0:v1], indent)},")
    return out


def history_entry(sv, main, finish_date, kind, indent='      '):
    """A finished setup written as a `history` row, so a call that played out stays on the page.

    The watchlist drops setups once they are done; without this, a target you posted and hit
    leaves no trace. Only directional setups with the levels a history row needs qualify.
    """
    direction, pattern = sv.get('direction'), sv.get('pattern') or main.get('pattern')
    tf = sv.get('timeframe') or main.get('timeframe') or 'daily'
    confirm, inv, target = sv.get('confirm'), sv.get('invalidation'), sv.get('target')
    if direction not in ('up', 'down') or not pattern or None in (confirm, inv, target):
        return None
    note = sv.get('note')
    head = (f"{indent}{{ pattern: {json.dumps(pattern)}, timeframe: {json.dumps(tf)}, "
            f"direction: {json.dumps(direction)}, stage: {json.dumps(kind)}, "
            f"stageDate: {json.dumps(sv.get('stageDate') or finish_date)},")
    body = (f"{indent}  confirm: {_fmt_price(confirm)}, invalidation: {_fmt_price(inv)}, "
            f"target: {_fmt_price(target)}" + (',' if note else ' }'))
    rows = [head, body]
    if note:
        rows.append(f"{indent}  note: {json.dumps(note, ensure_ascii=False)} }}")
    return '\n'.join(rows)


def rebuild_entry(text, e, main_pos, alt_pos=None, stored=(), main_auto=False, alt_auto=False, history=()):
    """Entry text with the given main setup, optional second setup and stored setups."""
    f = e['fields']
    main_pattern = f['pattern'][2] if 'pattern' in f else None
    rows = ["{"]
    for k in ('ticker', 'name'):
        if k in f:
            rows.append(f"    {k}: {text[f[k][0]:f[k][1]]},")
    if main_auto:
        rows.append("    auto: true,")
    for k in ('trend', 'rsi', 'price', 'priceDate'):
        if k in f:
            rows.append(f"    {k}: {text[f[k][0]:f[k][1]]},")
    rows += _setup_text(text, main_pos, '    ', inherit=main_pattern)
    # The key level and the history belong to the stock, not to whichever setup is on top,
    # so they survive a setup being replaced.
    if 'keyLevel' in f:
        rows.append(f"    keyLevel: {_reindent(text[f['keyLevel'][0]:f['keyLevel'][1]], '    ')},")
    if 'history' in f or history:
        if 'history' in f:
            arr = _reindent(text[f['history'][0]:f['history'][1]], '    ')
            if history:   # newest first, like the News feed
                cut = arr.index('[') + 1
                arr = arr[:cut] + '\n' + ',\n'.join(history) + ',' + arr[cut:]
            rows.append(f"    history: {arr},")
        else:
            rows.append("    history: [")
            rows.append(',\n'.join(history))
            rows.append("    ],")
    if alt_pos is not None:
        rows.append("    alt: {")
        if alt_auto:
            rows.append("      auto: true,")
        rows += _setup_text(text, alt_pos, '      ', inherit=main_pattern)
        rows.append("    },")
    if stored:
        rows.append("    more: [")
        for pos in stored:
            rows.append("      {")
            if pos.get('auto', (0, 0, None))[2]:
                rows.append("        auto: true,")
            rows += _setup_text(text, pos, '        ', inherit=main_pattern)
            rows.append("      },")
        rows.append("    ],")
    rows.append("  }")
    return '\n'.join(rows)


def _describe(s, main):
    return f"{s.get('pattern') or main.get('pattern') or 'Setup'} ({s.get('timeframe') or main.get('timeframe') or 'daily'})"


TARGET_TOL = 0.005   # within this much of the target counts as reaching it
# Confirmation works the other way: the close has to CLEAR the level by this much before a
# break counts, so a close a few cents through does not start a call. Same 0.5%, opposite
# sign -- TARGET_TOL is generous (a near miss still counts), CONFIRM_TOL is strict.
CONFIRM_TOL = 0.005


def _confirmed(close, level, down):
    """Has `close` cleared the confirm level by CONFIRM_TOL, in the break's direction?"""
    return close < level * (1 - CONFIRM_TOL) if down else close > level * (1 + CONFIRM_TOL)


# A break that confirms almost on top of its own target is not a trade: by the time the
# call starts the move it predicts is already spent. LMT's daily ascending channel asked
# for a close above $608.00 for a $610.97 target -- half a percent of room. Measured from
# the confirmation level, not the signal, because that is the level you would act on.
MIN_ROOM = 0.10


def _narrowest(s):
    """(room, level, target) for the tightest of a setup's level/target pairs, or None.

    A two-way setup is measured on both sides and judged at its narrower one.
    """
    if s.get('direction') == 'both':
        pairs = [(s.get('breakUp'), s.get('goalUp')), (s.get('breakDown'), s.get('goalDown'))]
    else:
        level = s.get('confirm') if s.get('confirm') is not None else s.get('signal')
        pairs = [(level, s.get('target'))]
    rows = [(abs(g - lvl) / lvl, lvl, g) for lvl, g in pairs if lvl and g is not None and lvl > 0]
    return min(rows) if rows else None


def setup_room(s):
    """Distance from a setup's confirmation level to its target, as a fraction of that level.

    `None` when the setup carries no level pair to measure.
    """
    row = _narrowest(s)
    return row[0] if row else None


def _reached(direction, target, high=None, low=None):
    """Did this bar reach the target, give or take the tolerance?

    A miss by a rounding error is a hit: CRWV's weekly low stopped thirteen cents above a
    $53.37 target, which is not a setup that failed to get there. The margin is a fraction
    of the target rather than a fixed number of cents, because the watchlist runs from
    sub-dollar names to four-figure ones and a flat margin would be meaningless at one end
    and enormous at the other.
    """
    if direction == 'down':
        return low is not None and low <= target * (1 + TARGET_TOL)
    return high is not None and high >= target * (1 - TARGET_TOL)


def _target_hit(setup, bars, since, price):
    """First date on/after `since` where a confirmed setup's target was touched, else None."""
    direction, target = setup.get('direction'), setup.get('target')
    if direction not in ('up', 'down') or target is None:
        return None
    for d, high, low, _ in bars:
        if d < since:
            continue
        if _reached(direction, target, high, low):
            return d
    # No bars (fetch fallback / stored-price check) — fall back to the latest price alone.
    if not bars and price is not None:
        if _reached(direction, target, price, price):
            return 'today'
    return None


def _pending_break(s, price):
    """(reason, next_stage) if a forming/signal setup closed past one of its limits, else (None, None).

    A pending setup has a limit on each side, and which one the close crossed decides what
    happened -- they are not the same event:

      forward  (the signal level from `forming`, the confirm level from `signal`) is the
               setup *working*. Crossing the signal level is a signal; crossing confirm is
               a confirmation, because `confirm` is defined as the signal candle's low/high
               (PATTERN_RULES.md), so "a later close beyond confirm" and "beyond the signal
               candle's low" are the same test. `next_stage` names the stage it moved to.
      backward (invalidation, or the signal level cancelling its own signal) is the setup
               coming apart, and is the case that really does need a new one posted.
               `next_stage` is None.

    A `both`-direction setup that breaks also gets next_stage None: it carries breakUp /
    goalUp / breakDown / goalDown and no signal, confirm or target, so a directional setup
    has to be drawn by hand rather than synthesised here.
    """
    stage, d = s.get('stage'), s.get('direction')
    if stage not in ('forming', 'signal'):
        return None, None
    p = _fmt_price(price)
    if d == 'both':
        up, dn = s.get('breakUp'), s.get('breakDown')
        if up is not None and price > up:
            return f"closed ${p} above break-up ${_fmt_price(up)}", None
        if dn is not None and price < dn:
            return f"closed ${p} below break-down ${_fmt_price(dn)}", None
        return None, None
    if d not in ('up', 'down'):
        return None, None
    sig, conf, inv = s.get('signal'), s.get('confirm'), s.get('invalidation')
    if stage == 'forming':
        fwd_name, fwd = ('signal', sig) if sig is not None else ('confirm', conf)
        back_name, back = 'invalidation', inv
    else:
        fwd_name, fwd = 'confirm', conf
        back_name, back = ('signal', sig) if sig is not None else ('invalidation', inv)
    down = d == 'down'
    if fwd is not None:
        # Crossing `confirm` is a confirmation, so it needs the same margin the detector
        # uses; the other limits stay a plain close.
        crossed = _confirmed(price, fwd, down) if fwd_name == 'confirm' else \
            ((down and price < fwd) or (not down and price > fwd))
        if crossed:
            nxt = 'signal' if fwd_name == 'signal' else 'confirmed'
            return f"closed ${p} {'below' if down else 'above'} {fwd_name} ${_fmt_price(fwd)}", nxt
    if back is not None and ((down and price > back) or (not down and price < back)):
        extra = ", signal cancelled" if back_name == 'signal' else ""
        return f"closed ${p} back {'above' if down else 'below'} {back_name} ${_fmt_price(back)}{extra}", None
    return None, None


def _signal_candle_level(bars, iso, timeframe, direction):
    """`confirm` for a setup that has just signalled: the signal candle's high / low.

    A forming setup carries no `confirm`, and cannot: `confirm` *is* the signal candle's
    extreme (PATTERN_RULES.md), and until something breaks there is no such candle. So the
    close that promotes forming → signal is also the close that first makes the level
    knowable, and it has to be written then — a setup left at `signal` with no `confirm`
    has no level ahead of it and can never be confirmed, only cancelled. 92 of the 253
    pending directional setups were in exactly that shape.

    The candle is the setup's own, not the day's: a weekly setup signalling on Friday
    confirms against that week's high, so the daily bars of the period are folded together.
    `None` when the bars do not cover the period, and the caller then leaves `confirm`
    unset rather than guessing a level the whole call hangs on.
    """
    if direction not in ('up', 'down') or not bars:
        return None
    d = _date.fromisoformat(iso)
    if timeframe == 'weekly':
        first = d - timedelta(days=d.weekday())
    elif timeframe == 'monthly':
        first = d.replace(day=1)
    else:
        first = d
    lo_iso, hi_iso = first.isoformat(), iso
    highs = [b[1] for b in bars if lo_iso <= b[0] <= hi_iso and b[1] is not None]
    lows = [b[2] for b in bars if lo_iso <= b[0] <= hi_iso and b[2] is not None]
    if not highs or not lows:
        return None
    return float(_fmt_price(max(highs) if direction == 'up' else min(lows)))


def _period_closed(timeframe, iso):
    """True if a bar dated `iso` is a closing bar for this timeframe (holidays not modelled)."""
    d = _date.fromisoformat(iso)
    if timeframe == 'weekly':
        return d.weekday() == 4
    if timeframe == 'monthly':
        nxt = d + timedelta(days=1)
        while nxt.weekday() >= 5:
            nxt += timedelta(days=1)
        return nxt.month != d.month
    return True


def _now_et():
    """Current New York wall-clock time (naive)."""
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("America/New_York")).replace(tzinfo=None)
    except Exception:  # no tz database: US DST = 2nd Sunday of March → 1st Sunday of November
        utc = datetime.now(timezone.utc).replace(tzinfo=None)

        def sunday(month, n):
            d = datetime(utc.year, month, 1)
            return d + timedelta(days=(6 - d.weekday()) % 7, weeks=n - 1)
        dst = sunday(3, 2) + timedelta(hours=7) <= utc < sunday(11, 1) + timedelta(hours=6)
        return utc - timedelta(hours=4 if dst else 5)


def _session_over(iso, now_et):
    """True once the regular session (closes 16:00 ET) of the day `iso` has ended."""
    d, today = _date.fromisoformat(iso), now_et.date()
    return d < today or (d == today and (now_et.hour, now_et.minute) >= (16, 0))


def _stage_edits(text, pos, new_stage, on_date, extra=None):
    """Edits that set stage (+ stageDate when on_date is given) and set/insert extra fields after `stage`."""
    s0, s1, _ = pos['stage']
    line_start = text.rfind('\n', 0, s0) + 1
    indent = re.match(r'[ \t]*', text[line_start:]).group(0)
    inline = not text[line_start:s0].strip().startswith('stage')  # e.g. `{ ..., stage: "x", ... }`
    sep = ', ' if inline else ',\n' + indent
    edits = [(s0, s1, json.dumps(new_stage))]
    insert = []
    if on_date is None:
        pass
    elif 'stageDate' in pos:
        edits.append((pos['stageDate'][0], pos['stageDate'][1], json.dumps(on_date)))
    else:
        insert.append(f"stageDate: {json.dumps(on_date)}")
    for k, v in (extra or {}).items():
        if k in pos:
            edits.append((pos[k][0], pos[k][1], json.dumps(v)))
        else:
            insert.append(f"{k}: {json.dumps(v)}")
    if insert:
        edits.append((s1, s1, ''.join(sep + i for i in insert)))
    return edits


def update_watchlist(quotes, apply=False, path=None, news_path=None,
                     snapshot_path=None, today=None, now_et=None, post_news=None):
    """
    quotes: {sym: {'price', 'date', 'bars'}}; pass None to re-check against the stored prices.
    Returns a dict: price_changes [(sym, old, new)], target_hits, needs_update, review, news.
    """
    now_et = now_et or _now_et()
    today = today or now_et.date().isoformat()
    # Resolved here, not in the signature: a default bound at import time cannot be
    # redirected by setting WATCHLIST_FILE, which is how the pattern_lines entry points
    # already behave -- and a test that redirects one but not the other writes to the
    # real ledger.
    path = path or WATCHLIST_FILE
    news_path = news_path or NEWS_FILE
    snapshot_path = snapshot_path or SNAPSHOT_FILE
    with open(path) as fh:
        text = fh.read()
    entries = parse_watchlist(text)
    edits, price_changes, target_hits, needs_update, review = [], [], [], [], []
    at_risk, back_inside = [], []   # confirmed breaks that closed past invalidation, and ones that came back
    promoted = []                   # pending setups whose close carried them forward a stage
    bot_notes = {}  # "TICKER|label" → (date, news text) for changes this run made
    momentum = []   # (sym, rsi, 'with'/'against'/'neutral', direction) for the hot-momentum report

    for e in entries:
        f = e['fields']
        main = {k: v[2] for k, v in f.items()}
        sym = main.get('ticker')
        if quotes is None:
            q = {'price': main.get('price'), 'date': main.get('priceDate') or today, 'bars': []}
        else:
            q = quotes.get(sym)
        if not q or q.get('price') is None:
            continue
        price, date = q['price'], q['date']
        old_date = main.get('priceDate') or date
        new_price = _fmt_price(price)
        is_close = _session_over(date, now_et)  # False while the day's session is still trading

        if 'price' in f and _fmt_price(f['price'][2]) != new_price:
            price_changes.append((sym, _fmt_price(f['price'][2]), new_price))
            edits.append((f['price'][0], f['price'][1], new_price))
        if 'priceDate' in f and f['priceDate'][2] != date:
            edits.append((f['priceDate'][0], f['priceDate'][1], json.dumps(date)))

        daily = q.get('bars') or _stored_daily(sym)
        trend = _trend(daily)
        rsi = _rsi(daily)
        # Both are read-only reads off the candles; slot new ones in after priceDate
        # so the entry header stays readable.
        for key, val in (('trend', trend), ('rsi', None if rsi is None else round(rsi, 1))):
            if val is None:
                continue
            new = json.dumps(val)
            if key in f:
                if json.dumps(f[key][2]) != new:
                    edits.append((f[key][0], f[key][1], new))
            elif 'priceDate' in f:
                at = f['priceDate'][1]
                edits.append((at, at, f',\n    {key}: {new}'))
            if key == 'rsi' and rsi is not None:
                momentum.append((sym, rsi, _momentum(rsi, main.get('direction')), main.get('direction')))

        for label, s, pos in _setups(e):
            stage, direction = s.get('stage'), s.get('direction')
            key, what = f"{sym}|{label}", _describe(s, main)
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'

            # A confirmed break that has come back to its boundary: report it so it can
            # be marked `retest` by hand. Never set here -- an automatic flag would flip
            # back and forth as price brushes the line, and post News each time.
            if stage == 'confirmed' and direction in ('up', 'down') and s.get('invalidation'):
                inv = s['invalidation']
                if inv and abs(price - inv) <= RETEST_BAND * inv:
                    review.append(f"{sym} ({_describe(s, main)}): back on the broken boundary "
                                  f"${_fmt_price(inv)} at ${_fmt_price(price)} — mark it `retest` if it is holding")
            # A retest is a confirmed break, so it keeps running the target check.
            if stage in ('confirmed', 'retest', 'atRisk') and direction in ('up', 'down'):
                since = max(old_date, s.get('stageDate') or old_date)
                hit = _target_hit(s, q['bars'], since, price)
                if hit:
                    hit_date = date if hit == 'today' else hit
                    target_hits.append((sym, label, s['target'], hit_date))
                    edits += _stage_edits(text, pos, 'target', hit_date)
                    bot_notes[key] = (hit_date, f"Hit target ${_fmt_price(s['target'])}.")
                    continue
                inv = s.get('invalidation')
                # The first leg of the failure test: a completed close on the setup's own
                # timeframe, back past invalidation. Only the follow-through close is left,
                # so the setup is flagged `atRisk` rather than left reading "confirmed".
                # Unlike `retest` this is safe to set here -- it turns on a completed close,
                # not on price brushing a line, so it cannot flip back and forth intraday.
                # Marking it failed stays a human call: see prune_finished / _finished.
                if is_close and inv is not None and _period_closed(tf, date):
                    past = (direction == 'down' and price > inv) or (direction == 'up' and price < inv)
                    if past and stage != 'atRisk':
                        # Same bookkeeping as `update`: stageDate keeps the date the break was
                        # confirmed, so the rail still reads right and a return inside restores
                        # the stage cleanly. The at-risk date goes in updateDate.
                        edits += _stage_edits(text, pos, 'atRisk', None, {
                            'prevStage': stage, 'updateDate': date,
                            'updateNote': f"Closed back past invalidation ${_fmt_price(inv)} ({_short_date(date)})."})
                        at_risk.append((sym, label, inv, new_price))
                        bot_notes[key] = (date, f"Closed ${new_price} back past invalidation "
                                                f"${_fmt_price(inv)}; needs a follow-through close to fail.")
                        continue
                    if not past and stage == 'atRisk':
                        back = s.get('prevStage') or 'confirmed'
                        edits += _stage_edits(text, pos, back, None)   # stageDate was never moved
                        back_inside.append((sym, label, inv, new_price, back))
                        bot_notes[key] = (date, f"Closed ${new_price} back inside ${_fmt_price(inv)}; "
                                                f"the break is intact again.")
                        continue
                    if past:
                        review.append(f"{sym} ({label}): still past invalidation ${_fmt_price(inv)} at ${new_price} — a follow-through close marks it failed")

            reason, next_stage = _pending_break(s, price)
            if reason and not is_close:
                review.append(f"{sym} ({label}): trading at ${new_price} past a limit — market still open; only the close counts, re-check after 16:00 ET")
                continue
            # A pending setup whose target has already been touched is finished, whatever
            # its timeframe. Waiting for a weekly or monthly close to say so would leave a
            # call that has fully played out sitting on "forming" for weeks -- and the move
            # ran through signal, confirm and target, so there is nothing left to judge.
            # Targets count by touch on any daily bar, exactly as they do once confirmed.
            if reason and next_stage:
                done = _target_hit(s, q.get('bars') or daily, max(old_date, s.get('stageDate') or old_date), price)
                if done:
                    hit_date = date if done == 'today' else done
                    target_hits.append((sym, label, s['target'], hit_date))
                    edits += _stage_edits(text, pos, 'target', hit_date)
                    bot_notes[key] = (hit_date, f"Hit target ${_fmt_price(s['target'])}.")
                    continue
            if reason and not _period_closed(tf, date):
                review.append(f"{sym} ({label}): {reason} — not a {tf} close yet; check at the {tf} close")
                continue
            # Confirmation needs a *later* close than the one that signalled, so a setup
            # whose stageDate is this very bar waits for the next one.
            if reason and next_stage and s.get('stageDate') == date:
                review.append(f"{sym} ({label}): {reason} — same bar as the {stage}; confirmation needs a later close")
                continue
            if reason and next_stage:
                # The setup moved forward, it did not come apart: crossing the signal level
                # is a signal and crossing confirm is a confirmation. Safe to set here for
                # the same reason `atRisk` is -- it turns on a completed close on the setup's
                # own timeframe, not on price brushing a line, so it cannot flip intraday.
                # A setup promoted to `signal` out of `forming` has no `confirm` yet, and
                # the bar that signalled is the one that sets it. Without this the setup
                # arrives at `signal` with nothing ahead of it and can never confirm.
                extra = None
                if next_stage == 'signal' and s.get('confirm') is None:
                    lvl = _signal_candle_level(q.get('bars') or daily, date, tf, direction)
                    if lvl is not None:
                        extra = {'confirm': lvl}
                    else:
                        review.append(f"{sym} ({label}): {reason}, but the candles do not reach "
                                      f"{date} — set `confirm` by hand (the signal candle's "
                                      f"{'high' if direction == 'up' else 'low'}) or it cannot confirm")
                promoted.append((sym, label, stage, next_stage, reason))
                edits += _stage_edits(text, pos, next_stage, date, extra)
                bot_notes[key] = (date, f"{reason[0].upper()}{reason[1:]}.")
                continue
            if reason:
                reason = reason[0].upper() + reason[1:]
                needs_update.append((sym, label, stage, reason))
                # stageDate keeps the date of the stage it was in; the flag date goes in updateDate.
                edits += _stage_edits(text, pos, 'update', None, {'prevStage': stage, 'updateDate': date,
                                                                   'updateNote': f"{reason} ({_short_date(date)})."})
                bot_notes[key] = (date, f"{reason}.")

    new_text = text
    for start, end, new in sorted(edits, key=lambda x: (x[0], x[1]), reverse=True):
        new_text = new_text[:start] + new + new_text[end:]

    news = sync_news(text, new_text, bot_notes, today, apply=apply, news_path=news_path,
                     snapshot_path=snapshot_path, paused=post_news is False or NEWS_PAUSED)

    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)

    return {'momentum': momentum, 'thin': thin_setups(new_text), 'stranded': stranded_setups(new_text),
            'geometry': geometry_faults(new_text), 'dead_stops': dead_stops(new_text),
            'dormant': dormant_candidates(new_text), 'wake': wake_candidates(new_text),
            'price_changes': price_changes, 'target_hits': target_hits, 'needs_update': needs_update,
            'at_risk': at_risk, 'back_inside': back_inside, 'promoted': promoted,
            'review': review, 'news': news}


# ── News feed ──

def _display_date(iso):
    try:
        return datetime.strptime(iso, "%Y-%m-%d").strftime("%b %-d %Y")
    except ValueError:
        return iso


def _short_date(iso):
    try:
        return datetime.strptime(iso, "%Y-%m-%d").strftime("%b %-d")
    except ValueError:
        return iso


def status_map(text):
    """{"TICKER|label": {ticker, label, stage, setup}} for every setup in the watchlist."""
    out = {}
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, s, _ in _setups(e):
            out[f"{main.get('ticker')}|{label}"] = {
                'ticker': main.get('ticker'), 'label': label,
                'stage': s.get('stage'), 'setup': _describe(s, main),
            }
    return out


def sync_news(old_text, new_text, bot_notes, today, apply=False, news_path=None, snapshot_path=None,
              paused=None):
    """Post one News item per status change since the last snapshot. Returns the items.

    `paused` defaults to the NEWS_PAUSED switch rather than to False, so the pause is
    global: pattern_detect calls this too, and a caller that forgets the argument used
    to post anyway while the feed was supposed to be quiet.
    """
    if paused is None:
        paused = NEWS_PAUSED
    news_path = news_path or NEWS_FILE
    snapshot_path = snapshot_path or SNAPSHOT_FILE
    if os.path.exists(snapshot_path):
        with open(snapshot_path) as fh:
            before = json.load(fh)
    else:  # first run: baseline on the file as it was, so only this run's changes post
        before = status_map(old_text)
    after = status_map(new_text)

    items = []
    for key in sorted(set(before) | set(after), key=lambda k: (k.split('|')[0], k)):
        label = key.split('|', 1)[1]
        if label != 'main' and not label.endswith(' alt'):
            continue                      # stored (hidden) setups don't post News
        old, new = before.get(key), after.get(key)
        if old and new and old['stage'] == new['stage'] and old['setup'] == new['setup']:
            continue
        ref = new or old
        t, label = ref['ticker'], ref['label']
        when, text, *custom = bot_notes.get(key, (today, None))
        if new is None:
            title, stage = (custom[0] if custom else f"{t} · setup removed"), 'removed'
            text = text or "No longer tracked."
        elif old is None or old['setup'] != new['setup']:
            stage = new['stage']
            title = custom[0] if custom else f"{t} · new setup"
            text = text or f"{new['setup']}, {STAGE_LABEL.get(stage, stage).lower()}."
        else:
            stage = new['stage']
            title = custom[0] if custom else f"{t} · {STAGE_LABEL.get(stage, stage).lower()}"
            text = text or f"Previously {STAGE_LABEL.get(old['stage'], old['stage']).lower()}."
        if label != 'main':
            title += f" ({label.replace(' alt', '')} setup)"
        items.append({
            'id': f"{when}-{t}-{label.replace(' ', '-')}-{stage}",
            'date': _display_date(when), 'tickers': [t], 'title': title, 'text': text,
        })

    items.sort(key=lambda it: it['tickers'][0])
    items.sort(key=lambda it: it['id'][:10], reverse=True)  # newest first; id starts with the ISO date
    if apply:
        if items and not paused:
            _prepend_news(items, news_path)
        # The snapshot is written either way: it is what the next run diffs against, so
        # leaving it stale would make every paused change post at once on resuming.
        with open(snapshot_path, 'w') as fh:
            json.dump(after, fh, indent=1, sort_keys=True)
            fh.write('\n')
    return items


def _prepend_news(items, news_path):
    with open(news_path) as fh:
        text = fh.read()
    marker = re.search(r'NEWS_ITEMS\s*:\s*NewsItem\[\]\s*=\s*\[\n?', text)
    if not marker:
        raise ValueError(f"NEWS_ITEMS array not found in {news_path}")
    existing = set(re.findall(r'id:\s*"([^"]+)"', text))
    block = ''
    for it in items:
        if it['id'] in existing:
            continue
        block += ("  {\n"
                  f"    id: {json.dumps(it['id'])},\n"
                  f"    date: {json.dumps(it['date'])},\n"
                  f"    tickers: {json.dumps(it['tickers'])},\n"
                  f"    title: {json.dumps(it['title'], ensure_ascii=False)},\n"
                  f"    text: {json.dumps(it['text'], ensure_ascii=False)},\n"
                  "  },\n")
    if block:
        text = text[:marker.end()] + block + text[marker.end():]
        with open(news_path, 'w') as fh:
            fh.write(text)


# ── Pruning finished setups ──

def _load_chart_bars(ticker, timeframe):
    path = os.path.join(BARS_DIR, f"{ticker}_{timeframe}.json")
    if not os.path.exists(path):
        return None
    with open(path) as fh:
        return json.load(fh)


def _completed_count(t, timeframe, now_et):
    """Number of candles whose period has closed (drops a live day / week / month)."""
    last = _date.fromisoformat(t[-1])
    today = now_et.date()
    if timeframe == 'weekly':
        # The week closes with Friday's session, so on Saturday and Sunday it is already
        # over — waiting for 16:00 on a day with no session left the just-closed week
        # looking live all weekend.
        closed = today.weekday() >= 5 or (today.weekday() == 4 and _session_over(today.isoformat(), now_et))
        live = last.isocalendar()[:2] == today.isocalendar()[:2] and not closed
    elif timeframe == 'monthly':
        live = (last.year, last.month) == (today.year, today.month) and not _period_closed('monthly', today.isoformat())
    else:
        live = not _session_over(t[-1], now_et)
    return len(t) - 1 if live else len(t)


def _finished(s, main, now_et, lines=None):
    """(date, news text, news title, kind) if a setup is done, kind 'target' or 'failed'; else None.

    `lines` comes from stored_lines(): the parser hands back a span, not a value, so the
    channel rule below cannot read them off the setup itself.
    """
    t_ = main.get('ticker')
    stage = s.get('stage')
    if stage == 'target':
        hit = s.get('stageDate') or now_et.date().isoformat()
        return now_et.date().isoformat(), f"Target reached {_short_date(hit)}.", f"{t_} · setup closed", 'target'
    if stage == 'failed':
        return now_et.date().isoformat(), "Pattern failed.", f"{t_} · setup closed", 'failed'
    if stage not in ('confirmed', 'retest', 'atRisk') or s.get('direction') not in ('up', 'down'):
        return None
    tf = s.get('timeframe') or main.get('timeframe') or 'daily'
    bars = _load_chart_bars(t_, tf)
    if not bars or not s.get('stageDate'):
        return None
    t, h, l, c = bars['t'], bars['h'], bars['l'], bars['c']
    dn, tgt, inv = s['direction'] == 'down', s.get('target'), s.get('invalidation')
    start = next((i for i, x in enumerate(t) if x >= s['stageDate']), len(t))
    for i in range(start, len(t)):  # touches count as they happen (regular-session highs/lows)
        if tgt is not None and _reached(s['direction'], tgt, h[i], l[i]):
            return t[i], f"Hit target ${_fmt_price(tgt)}.", f"{t_} · target reached", 'target'
    n = _completed_count(t, tf, now_et)
    pattern = s.get('pattern') or main.get('pattern') or ''
    if 'Channel' in pattern and lines and len(lines) >= 2:
        # Channels fail on one completed close back inside the broken line (its value that day):
        # the boundary the break came through, which is also where the invalidation sits.
        broken = lines[1] if dn else lines[0]   # lines = [upper, lower]
        for i in range(start + 1, n):
            if (c[i] > line_value(broken, t, i)) if dn else (c[i] < line_value(broken, t, i)):
                return (t[i], f"Closed ${_fmt_price(c[i])} back inside the channel.", f"{t_} · pattern failed", 'failed')
        return None
    for i in range(start, n - 1):  # a close past invalidation, then a follow-through close
        if inv is not None and (c[i] > inv if dn else c[i] < inv) and (c[i + 1] > h[i] if dn else c[i + 1] < l[i]):
            return (t[i + 1], f"Closed ${_fmt_price(c[i])} past invalidation ${_fmt_price(inv)}, then followed through.",
                    f"{t_} · pattern failed", 'failed')
    return None


NO_PATTERN = 'No clear pattern'


def placeholder_entry(ticker, name, price, price_date, note, history=()):
    """Body of a pending "No clear pattern" entry (without the surrounding braces' indentation)."""
    tail = ""
    if history:
        tail = ",\n    history: [\n" + ",\n".join(history) + "\n    ]"
    return ("{\n"
            f"    ticker: {json.dumps(ticker)},\n"
            f"    name: {json.dumps(name)},\n"
            "    auto: true,\n"
            f"    pattern: {json.dumps(NO_PATTERN)},\n"
            '    timeframe: "daily",\n'
            '    direction: "both",\n'
            '    stage: "forming",\n'
            f"    price: {_fmt_price(price) if price is not None else 0},\n"
            f"    priceDate: {json.dumps(price_date or _date.today().isoformat())},\n"
            f"    note: {json.dumps(note)}" + tail + "\n"
            "  }")


def prune_finished(apply=False, now_et=None, path=None, news_path=None, snapshot_path=None):
    """Remove setups that are done (target reached or failed) and post one News item each.

    "Needs updating" setups are kept: they are the to-do list for posting a replacement.
    If a stock's main setup is done but its second setup is still live, both are kept
    and the case is reported (promotion is left to a human).
    """
    now_et = now_et or _now_et()
    path = path or WATCHLIST_FILE
    news_path = news_path or NEWS_FILE
    snapshot_path = snapshot_path or SNAPSHOT_FILE
    with open(path) as fh:
        text = fh.read()
    cuts, notes, report = [], {}, []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        t_ = main['ticker']
        posted = not main.get('auto')
        setups = _setups(e)
        done, stored_live, edits = {}, [], []
        for label, sv, pos in setups:
            r = _finished(sv, main, now_et, stored_lines(text, pos))
            if '_span' in pos:                    # stored (hidden): finished / cancelled ones drop quietly
                if not r and sv.get('stage') != 'update':
                    stored_live.append(pos)
                continue
            if not r:
                continue
            if posted and not sv.get('auto') and r[3] == 'failed':
                # A setup you posted that failed stays on screen as failed; you post the next one.
                if sv.get('stage') != 'failed':
                    edits += _stage_edits(text, pos, 'failed', r[0])
                    notes[f"{t_}|{label}"] = (r[0], r[1], f"{t_} · pattern failed")
                    report.append(f"{t_} ({label}): pattern failed — {r[1]}")
                continue
            done[label] = r
        dropped = len(stored_live) < sum(1 for _, _, p in setups if '_span' in p)
        if edits or (not done and not dropped):
            # (a failed posted setup is marked in place; any stored clean-up waits for the next run)
            cuts += [(a, b, v) for a, b, v in edits]
            continue
        alt_label = next((lb for lb, _, _ in setups if lb.endswith(' alt')), None)
        fields = e['fields']
        alt_pos = e['alt']
        main_pos, main_auto = fields, bool(main.get('auto'))
        alt_auto = bool(alt_pos and alt_pos.get('auto', (0, 0, None))[2])
        def take(tf):
            """Best stored setup on a timeframe (stored setups are kept best-first)."""
            for p in stored_live:
                if (p['timeframe'][2] if 'timeframe' in p else main.get('timeframe')) == tf:
                    stored_live.remove(p)
                    return p
            return None
        if 'main' in done:
            # Target hit (or an auto setup finished): the best stored setup on the same timeframe
            # takes its place, marked auto (red dot) until you validate it.
            tf = main.get('timeframe') or 'daily'
            nxt = take(tf) or (stored_live.pop(0) if stored_live else None)
            if nxt is None and alt_pos is not None and alt_label not in done:
                nxt, alt_pos, main_auto = alt_pos, None, alt_auto
            elif nxt is not None:
                main_auto = True
            main_pos = nxt
        if alt_label in done:
            tf = alt_pos['timeframe'][2] if 'timeframe' in alt_pos else 'daily'
            alt_pos = take(tf)
            alt_auto = alt_pos is not None
        # Keep the setups you posted yourself: a target you called and hit, or a pattern that
        # failed, is worth having on the page instead of vanishing.
        keep = []
        if posted:
            for label, r in done.items():
                sv = next((v for lb, v, pos in setups if lb == label and '_span' not in pos), None)
                if sv is None or sv.get('auto'):
                    continue
                row = history_entry(sv, main, r[0], r[3])
                if row:
                    keep.append(row)
        a, b = e['span']
        if main_pos is None:
            reason = done['main'][1].rstrip('.')
            cuts.append((a, b + 1, placeholder_entry(t_, main.get('name', t_), main.get('price'), main.get('priceDate'),
                                                    f"Previous setup closed ({reason[0].lower() + reason[1:]}). Scanning for a new one.",
                                                    keep)))
        else:
            cuts.append((a, b + 1, rebuild_entry(text, e, main_pos, alt_pos, stored_live, main_auto, alt_auto, keep)))
        for label, r in done.items():
            notes[f"{t_}|{label}"] = r[:3]
            report.append(f"{t_} ({label}): {r[2].split(' · ')[1]} — {r[1]}")
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    news = sync_news(text, new_text, notes, now_et.date().isoformat(), apply=apply,
                     news_path=news_path, snapshot_path=snapshot_path, paused=NEWS_PAUSED)
    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)
    return report, news


# ── Report ──

# Three hand-posted channels found in one week -- CRDO's, STRL's and ENVA's -- projected
# targets of 96%, 67% and 60% down because each was drawn from an origin where its lower
# boundary extrapolated to near nothing. The detector refuses these: MAX_HEIGHT caps a
# pattern at a fraction of the close where it starts. Nothing applied that check to a setup
# posted by hand, so this reports them rather than changing them.
GEOMETRY_CAP = {'daily': 0.6, 'weekly': 0.7, 'monthly': 0.8}


def geometry_faults(text):
    """Hand-posted setups our own detector would refuse to draw, by height.

    Rows are (ticker, label, pattern, timeframe, height, price_at_start, ratio, target).
    """
    import pattern_lines as _pl
    out = []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, sv, pos in _setups(e):
            if bool(main.get('auto')) or bool(sv.get('auto')) or 'lines' not in pos:
                continue                                  # the detector polices its own
            lines = _pl.stored_lines(text, pos)
            if not lines or len(lines) < 2:
                continue
            tf = sv.get('timeframe') or main.get('timeframe')
            cap = GEOMETRY_CAP.get(tf)
            b = _pl.load_bars(main['ticker'], tf) if cap else None
            if not b:
                continue
            try:
                i0 = b['t'].index(lines[0][0][0])
            except ValueError:
                continue
            height = abs(lines[0][0][1] - lines[1][0][1])
            start = b['c'][i0]
            if not start or height <= cap * start:
                continue
            out.append((main['ticker'], label, sv.get('pattern') or main.get('pattern'),
                        tf, height, start, height / start, sv.get('target')))
    return out


# A confirmed break whose price has gone back past the level that confirmed it, far
# enough that the setup is no longer the read it was -- and whose invalidation is too
# distant to ever retire it. The failure rule needs a close past invalidation, so when
# that level is half the share price away the setup stays `confirmed` on a target nobody
# is still trading towards. LITE carried two of these: a daily channel confirmed down in
# August that then rallied 32% above its confirm, kept alive by an invalidation 57% above
# the highest price the stock had ever traded.
# ── Dormant setups: valid, but no longer what the chart is saying ──
#
# A confirmed break that price has walked a long way back past, months ago, on a stock now
# trending the other way, is not wrong — it just is not the read any more. NOW's monthly
# ascending channel confirmed down on 2026-02-02 at $113.13 and still carries a $39.08
# target while the stock sits at $158.96 in an uptrend, its break 40% undone. Leaving that
# on the row says something about ServiceNow that nobody believes.
#
# Shelving is NOT the same as finishing. `history` holds completed calls and is the label
# set pattern_reproduce.py trains on, so a setup that never resolved must not go there.
# `dormant` keeps it in place, out of sight, and wakes it the moment the break re-forms.

DORMANT_AGE = 120           # days since the break confirmed
DORMANT_UNDONE = 0.25       # price this far back past the confirm, against the setup


def _undone_by(sv, price):
    """How far price has travelled back past the confirm level, against the setup."""
    conf, d = sv.get('confirm'), sv.get('direction')
    if not (price and conf) or d not in ('up', 'down'):
        return None
    return (price - conf) / conf if d == 'down' else (conf - price) / conf


def dormant_candidates(text, today=None):
    """Confirmed setups old enough, undone enough, and against the stock's own trend.

    Rows are (ticker, label, timeframe, pattern, direction, age, undone, auto).
    """
    today = today or _now_et().date()
    out = []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        price, trend = m.get('price'), m.get('trend')
        for label, sv, pos in _setups(e):
            if sv.get('stage') != 'confirmed' or sv.get('dormant'):
                continue
            sd, d = sv.get('stageDate'), sv.get('direction')
            undone = _undone_by(sv, price)
            if not sd or undone is None or undone <= DORMANT_UNDONE:
                continue
            try:
                age = (today - _date.fromisoformat(sd)).days
            except ValueError:
                continue
            if age <= DORMANT_AGE:
                continue
            # The stock has to be going the other way. A flat trend is not an uptrend, and
            # shelving on "not moving" would retire setups that are merely waiting.
            if not ((trend == 'up' and d == 'down') or (trend == 'down' and d == 'up')):
                continue
            out.append((m.get('ticker'), label, sv.get('timeframe'), sv.get('pattern'),
                        d, age, undone, bool(m.get('auto')) or bool(sv.get('auto'))))
    return out


def wake_candidates(text):
    """Dormant setups whose break has re-formed: price is back past the confirm level."""
    out = []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        price = m.get('price')
        for label, sv, pos in _setups(e):
            if not sv.get('dormant'):
                continue
            undone = _undone_by(sv, price)
            if undone is not None and undone <= 0:
                out.append((m.get('ticker'), label, sv.get('timeframe'), sv.get('pattern'),
                            sv.get('direction'), sv.get('confirm'), price))
    return out


def shelve_dormant(apply=False, path=None, today=None):
    """Mark stale confirmed breaks dormant, and wake any whose break has re-formed.

    Writes `dormant` beside the setup's own `stage`, so it travels with the setup rather
    than with the stock. Waking clears the three fields and sets `stage: "update"` — the
    break re-forming months later is a different break on a different chart, so the setup
    comes back as a call to redraw rather than as a live one carrying its old target.
    """
    path = path or WATCHLIST_FILE
    with open(path) as fh:
        text = fh.read()
    today = today or _now_et().date()
    shelved, woken, edits = [], [], []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        tk, price, trend = m.get('ticker'), m.get('price'), m.get('trend')
        for label, sv, pos in _setups(e):
            if 'stage' not in pos:
                continue
            s0, s1, _ = pos['stage']
            line_start = text.rfind('\n', 0, s0) + 1
            indent = ' ' * (len(text[line_start:s0]) - len(text[line_start:s0].lstrip()))
            line_end = text.index('\n', s1) + 1
            if sv.get('dormant'):
                undone = _undone_by(sv, price)
                if undone is None or undone > 0:
                    continue
                # Waking does NOT resume the old setup. Its target was measured off a
                # pattern that is months stale by now, and a break re-forming after that
                # long is a different break on a different chart — the levels have to be
                # drawn again. So it comes back as `update` ("Needs updating"), which is
                # already the ledger's word for "post a new setup", rather than as a live
                # confirmed call carrying arithmetic nobody re-checked.
                a = line_end
                b = a
                while True:
                    nxt = text.index('\n', b) + 1 if '\n' in text[b:] else len(text)
                    if text[b:nxt].lstrip().startswith(('dormant:', 'dormantSince:', 'dormantNote:')):
                        b = nxt
                    else:
                        break
                if b <= a:
                    continue
                edits.append((a, b, ''))                      # drop the three dormant fields
                edits.append((s0, s1, '"update"'))            # stage: confirmed -> update
                note = (f"Woken {today}: price closed back past the ${_fmt_price(sv.get('confirm'))} "
                        f"break, so the read is live again — but it was shelved on "
                        f"{sv.get('dormantSince')} and these levels are the old pattern's. "
                        f"Redraw it on the current chart; the target in particular will move.")
                ins = (f"{indent}prevStage: \"{sv.get('stage')}\",\n"
                       f"{indent}updateDate: \"{today}\",\n"
                       f"{indent}updateNote: {json.dumps(note, ensure_ascii=False)},\n")
                edits.append((line_end, line_end, ins))
                woken.append(f"{tk} ({label}): back past ${_fmt_price(sv.get('confirm'))} — "
                             f"woken as `update`, the levels need redrawing")
                continue
            sd, d = sv.get('stageDate'), sv.get('direction')
            undone = _undone_by(sv, price)
            if sv.get('stage') != 'confirmed' or not sd or undone is None or undone <= DORMANT_UNDONE:
                continue
            # The main and alt slots ARE the row. Hiding one would leave the ledger showing
            # a setup it has been told not to show, so those stay and get listed instead.
            if label == 'main' or label.endswith(' alt'):
                continue
            try:
                age = (today - _date.fromisoformat(sd)).days
            except ValueError:
                continue
            if age <= DORMANT_AGE:
                continue
            if not ((trend == 'up' and d == 'down') or (trend == 'down' and d == 'up')):
                continue
            note = (f"Shelved {today}: confirmed {sd}, {age} days ago, and price has gone "
                    f"{undone * 100:.0f}% back past the ${_fmt_price(sv.get('confirm'))} break while the "
                    f"stock trends {trend}. Still valid — it wakes on a close back past the break.")
            ins = (f"{indent}dormant: true,\n{indent}dormantSince: \"{today}\",\n"
                   f"{indent}dormantNote: {json.dumps(note, ensure_ascii=False)},\n")
            edits.append((line_end, line_end, ins))
            shelved.append(f"{tk} ({label}, {sv.get('timeframe')} {sv.get('pattern')}): "
                           f"{age}d old, break {undone * 100:.0f}% undone, stock trends {trend}")
    new_text = text
    for a, b, repl in sorted(edits, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)
    return shelved, woken


# ── Invalidations that are not prices ──
#
# An invalidation is a trendline's value at the latest candle, and a sloped line extended
# past the pattern leaves the range of prices the stock has ever traded: downward it decays
# toward zero (ALAB's daily falling wedge froze a stop at $0.02 on a $257 stock), upward it
# climbs past the all-time high (DAVE's daily ascending channel at $546.90 against a $491.07
# high). Either way the fail rule can never fire, so the setup sits on the ledger forever —
# this is the mechanism behind most of what `stranded_setups` finds one symptom of.
#
# `_stop_fault` in pattern_lines.py already refuses to FREEZE such a level into
# `breakInvalidation`. Nothing was checking the live `invalidation`, which is what the UI
# shows and what the fail rule reads.

STOP_FLOOR = 0.05           # a stop inside this fraction of spot is not a level, it is zero
# What makes a stop unusable is not its distance but what it buys. Measured across the 74
# setups the old 50%-of-entry rule flagged, 92% had reward:risk below 1.0 and the median was
# 0.67 — so the threshold was finding setups that risk more than the target pays, and saying
# "wide" about it. Ratio says the thing directly, and it clears cases the distance rule got
# wrong in both directions: a tight stop on a tiny target still fails it, and a genuinely
# wide stop with a long target (AMKR's weekly falling wedge at 1.4x) passes.
MIN_RR = 1.0
# A stop just outside the traded range is correct, not broken: on a stock at its highs the
# place for a short's stop is a little above the high. QQQ's $764.44 against a $762.86 high
# is 0.2% out and perfectly tradeable, where DAVE's $546.90 against $491.07 is 11% out and
# a level price has no reason to visit. Only count it once it clears this margin.
STOP_BEYOND = 0.15
_RANGE_CACHE = {}


def traded_range(ticker):
    """(lowest low, highest high) over the longest candle file on disk, or None."""
    if ticker in _RANGE_CACHE:
        return _RANGE_CACHE[ticker]
    out = None
    for tf in ('monthly', 'weekly', 'daily'):
        d = _load_chart_bars(ticker, tf)
        if d and d.get('l') and d.get('h'):
            out = (min(d['l']), max(d['h']))
            break
    _RANGE_CACHE[ticker] = out
    return out


def stop_fault(sv, price, rng):
    """Why this setup's invalidation cannot act as a stop, or None if it can.

    Returns (severity, reason): 'dead' for a level that is not a price at all, so the
    failure rule can never fire, and 'wide' for a real level too far away to trade against.
    """
    inv = sv.get('breakUp') if sv.get('direction') == 'both' else sv.get('invalidation')
    if inv is None or not price:
        return None
    if inv <= STOP_FLOOR * price:
        return 'dead', f"${_fmt_price(inv)} is {inv / price * 100:.1f}% of spot — the line has decayed to zero"
    if rng and inv > rng[1] * (1 + STOP_BEYOND):
        return 'dead', (f"${_fmt_price(inv)} is {inv / rng[1] * 100 - 100:.0f}% above every price "
                        f"it has traded (high ${_fmt_price(rng[1])})")
    if rng and inv < rng[0] * (1 - STOP_BEYOND):
        return 'dead', (f"${_fmt_price(inv)} is {100 - inv / rng[0] * 100:.0f}% below every price "
                        f"it has traded (low ${_fmt_price(rng[0])})")
    conf, dirn = sv.get('confirm'), sv.get('direction')
    if conf and dirn in ('up', 'down'):
        if (inv > conf) if dirn == 'up' else (inv < conf):
            return 'dead', f"${_fmt_price(inv)} sits on the winning side of the ${_fmt_price(conf)} entry"
        tgt = sv.get('target')
        # A down setup's target belongs below its entry and an up setup's above it. SMCI's
        # weekly rising wedge broke down at $31.43 and projected $37.31 — a short aiming
        # higher than it sold. The ratio test alone cannot see this, since it takes the
        # absolute distance and reads the setup as merely poor rather than impossible.
        if tgt and ((tgt > conf) if dirn == 'down' else (tgt < conf)):
            return 'dead', (f"target ${_fmt_price(tgt)} is on the wrong side of the "
                            f"${_fmt_price(conf)} entry for a {dirn} setup")
        risk = abs(inv - conf)
        if tgt and risk > 0:
            rr = abs(tgt - conf) / risk
            if rr < MIN_RR:
                return 'wide', (f"reward:risk {rr:.2f}x — target ${_fmt_price(tgt)} is nearer than "
                                f"the ${_fmt_price(inv)} stop, so being right pays less than being "
                                f"wrong costs")
    return None


def dead_stops(text):
    """Setups whose invalidation is not a usable price.

    Rows are (ticker, label, pattern, timeframe, stage, severity, reason, auto).
    """
    out = []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        price, tk = main.get('price'), main.get('ticker')
        rng = traded_range(tk) if tk else None
        for label, sv, pos in _setups(e):
            fault = stop_fault(sv, price, rng)
            if not fault:
                continue
            sev, why = fault
            auto = bool(main.get('auto')) or bool(sv.get('auto'))
            out.append((tk, label, sv.get('pattern') or main.get('pattern'),
                        sv.get('timeframe') or main.get('timeframe'),
                        sv.get('stage'), sev, why, auto))
    return out


def drop_dead_stops(apply=False, path=None):
    """Remove auto-detected setups whose invalidation is not a price; list the rest.

    Same policy as drop_thin: the hidden machine-drawn ones go quietly because a rescan
    would redraw them anyway, while a main setup or anything posted by hand is listed for
    review — replacing a call someone made is a decision, not a clean-up. Only 'dead'
    faults are dropped; a merely wide stop is a judgement call and is reported, never cut.
    """
    with open(path or WATCHLIST_FILE) as fh:
        text = fh.read()
    cuts, dropped, review = [], [], []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        t_, price = main['ticker'], main.get('price')
        rng = traded_range(t_)
        keep_alt, stored, hit = e['alt'], [], []
        for label, sv, pos in _setups(e):
            fault = stop_fault(sv, price, rng)
            bad = bool(fault)
            auto = bool(main.get('auto')) or bool(sv.get('auto'))
            if bad and (label == 'main' or not auto):
                review.append(f"{t_} ({label}, {sv.get('timeframe')} {sv.get('pattern')}): {fault[1]}")
                bad = False
            if '_span' in pos:
                (hit if bad else stored).append(pos)
            elif bad and label.endswith(' alt'):
                keep_alt = None
                hit.append(pos)
        if not hit:
            continue
        alt_auto = bool(keep_alt and keep_alt.get('auto', (0, 0, None))[2])
        if keep_alt is None and e['alt'] is not None and stored:
            tf = e['alt']['timeframe'][2] if 'timeframe' in e['alt'] else main.get('timeframe')
            keep_alt = next((p for p in stored if (p['timeframe'][2] if 'timeframe' in p else main.get('timeframe')) == tf), None)
            if keep_alt is not None:
                stored.remove(keep_alt)
                alt_auto = True
        for pos in hit:
            dropped.append(f"{t_} ({pos.get('timeframe', (0, 0, None))[2]} "
                           f"{pos.get('pattern', (0, 0, main.get('pattern')))[2]})")
        a, b = e['span']
        cuts.append((a, b + 1, rebuild_entry(text, e, e['fields'], keep_alt, stored,
                                             bool(main.get('auto')), alt_auto)))
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if apply and new_text != text:
        with open(path or WATCHLIST_FILE, 'w') as fh:
            fh.write(new_text)
    return dropped, review


STRANDED_UNDONE = 0.10      # price this far back past the confirm level
STRANDED_STOP = 0.40        # ...and an invalidation at least this far from price


def _closing_in(ticker, sv, tf, price, tgt, back=40):
    """Has price moved toward this setup's target over the last `back` sessions?"""
    try:
        import pattern_lines as _pl
        b = _pl.load_bars(ticker, 'daily')
        if not b or len(b['c']) <= back:
            return False
        then = b['c'][-1 - back]
    except Exception:
        return False
    return (price < then) if tgt < price else (price > then)


def stranded_setups(text):
    """Confirmed setups whose break is undone and whose invalidation cannot reach price.

    Rows are (ticker, label, pattern, timeframe, stageDate, price, confirm, undone, stop, auto).
    """
    out = []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        price = main.get('price')
        for label, sv, _pos in _setups(e):
            if sv.get('stage') != 'confirmed':
                continue
            inv, conf, d = sv.get('invalidation'), sv.get('confirm'), sv.get('direction')
            tgt, tf = sv.get('target'), sv.get('timeframe') or main.get('timeframe')
            if not (price and inv and conf) or d not in ('up', 'down'):
                continue
            undone = (price - conf) / conf if d == 'down' else (conf - price) / conf
            stop = abs(price - inv) / price
            if undone < STRANDED_UNDONE or stop < STRANDED_STOP:
                continue
            # Both tests above are snapshots, and a snapshot cannot tell a setup that was
            # abandoned from one whose price overshot the wrong way and is now coming back.
            # ENVA's weekly rising wedge confirmed down at $145.08, rallied to $267, and is
            # $165.07 falling: 14% above the confirm, so it read stranded, while in fact it
            # is heading for its $119.67 target. A setup still travelling toward its target
            # is not stranded whatever the snapshot says.
            if tgt is not None and _closing_in(main['ticker'], sv, tf, price, tgt):
                continue
            out.append((main['ticker'], label, sv.get('pattern') or main.get('pattern'),
                        sv.get('timeframe') or main.get('timeframe'), sv.get('stageDate'),
                        price, conf, undone, stop, bool(main.get('auto')) or bool(sv.get('auto'))))
    return out


def thin_setups(text):
    """Every stored setup whose target sits inside MIN_ROOM of its confirmation level.

    Rows are (ticker, label, pattern, timeframe, stage, level, target, room, auto).
    """
    out = []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, sv, pos in _setups(e):
            row = _narrowest(sv)
            if row is None or row[0] >= MIN_ROOM:
                continue
            room, level, target = row
            # `auto` is a stock-level flag: a stock marked auto does not repeat it on each
            # stored setup, so either place counts (see CLAUDE.md, "two traps").
            auto = bool(main.get('auto')) or bool(sv.get('auto'))
            out.append((main['ticker'], label, sv.get('pattern') or main.get('pattern'),
                        sv.get('timeframe') or main.get('timeframe'), sv.get('stage'),
                        level, target, room, auto))
    return out


def drop_thin(apply=False, path=None):
    """Remove auto-detected setups with too little room between confirmation and target.

    Only the hidden ones (`more[]`) and a second setup go quietly -- nothing was shown for
    them and nothing is lost, since a rescan would no longer produce them. A thin *main*
    setup, and anything posted by hand, is listed for review instead: those are calls
    someone made, and replacing one is a decision, not a clean-up.
    """
    with open(path or WATCHLIST_FILE) as fh:
        text = fh.read()
    cuts, dropped, review = [], [], []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        t_ = main['ticker']
        keep_alt, stored, hit = e['alt'], [], []
        for label, sv, pos in _setups(e):
            room = setup_room(sv)
            thin = room is not None and room < MIN_ROOM
            auto = bool(main.get('auto')) or bool(sv.get('auto'))
            if thin and (label == 'main' or not auto):
                review.append(f"{t_} ({label}): {room * 100:.1f}% from confirmation to target"
                              f" — posted by hand, replace it or leave it")
                thin = False
            if '_span' in pos:
                (hit if thin else stored).append(pos)
            elif thin and label.endswith(' alt'):
                keep_alt = None
                hit.append(pos)
        if not hit:
            continue
        alt_auto = bool(keep_alt and keep_alt.get('auto', (0, 0, None))[2])
        if keep_alt is None and e['alt'] is not None and stored:
            # The second setup is a visible slot: promote the best stored one on the same
            # timeframe rather than leaving the stock with one setup, as prune_finished does.
            tf = e['alt']['timeframe'][2] if 'timeframe' in e['alt'] else main.get('timeframe')
            keep_alt = next((p for p in stored if (p['timeframe'][2] if 'timeframe' in p else main.get('timeframe')) == tf), None)
            if keep_alt is not None:
                stored.remove(keep_alt)
                alt_auto = True
        for pos in hit:
            dropped.append(f"{t_} ({pos.get('timeframe', (0, 0, None))[2]} "
                           f"{pos.get('pattern', (0, 0, main.get('pattern')))[2]})")
        a, b = e['span']
        cuts.append((a, b + 1, rebuild_entry(text, e, e['fields'], keep_alt, stored,
                                             bool(main.get('auto')), alt_auto)))
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)
    return dropped, review


def print_watchlist_report(result, missing, apply):
    if NEWS_PAUSED:
        print("\n⏸  News posting is PAUSED (NEWS_PAUSED in pattern_watchlist.py). Stage changes are\n"
              "   still written and the snapshot still moves, so nothing is queued up for later —\n"
              "   changes made while paused get no News item at all. Set it back to False to resume.")
    print(f"\n{'='*72}\nPATTERN WATCHLIST ({os.path.relpath(WATCHLIST_FILE)})\n")
    mode = "Updated" if apply else "Would update"
    print(f"{mode} {len(result['price_changes'])} watchlist price(s).")
    if result['target_hits']:
        print(f"\n🎯 Target reached ({'marked' if apply else 'would mark'} stage → target):")
        for sym, label, target, d in result['target_hits']:
            print(f"  {sym:<6} {label:<12} target ${_fmt_price(target)}  on {d}")
    if result.get('promoted'):
        print(f"\n➡ Moved forward ({'marked' if apply else 'would mark'} the new stage):")
        for sym, label, was, now, note in result['promoted']:
            print(f"  {sym:<6} {label:<12} {was} → {now:<9} {note}")
    if result['needs_update']:
        print(f"\n🔄 Needs updating ({'marked' if apply else 'would mark'} stage → update):")
        for sym, label, stage, note in result['needs_update']:
            print(f"  {sym:<6} {label:<12} {stage:<8} {note}")
    if result.get('at_risk'):
        print(f"\n⚠ At risk ({'marked' if apply else 'would mark'} stage → atRisk; a follow-through close marks it failed):")
        for sym, label, inv, px in result['at_risk']:
            print(f"  {sym:<6} {label:<12} closed ${px} back past invalidation ${_fmt_price(inv)}")
    if result.get('back_inside'):
        print(f"\n✓ Back inside ({'marked' if apply else 'would mark'} stage → confirmed again):")
        for sym, label, inv, px, back in result['back_inside']:
            print(f"  {sym:<6} {label:<12} closed ${px} back inside ${_fmt_price(inv)} → {back}")
    mom = result.get('momentum') or []
    if mom:
        hot = [m for m in mom if m[2] == 'with']
        longs = sorted([m for m in hot if m[3] == 'up'], key=lambda m: -m[1])
        shorts = sorted([m for m in hot if m[3] == 'down'], key=lambda m: m[1])
        against = [m for m in mom if m[2] == 'against']
        print(f"\n🔥 Momentum (daily RSI-{RSI_PERIOD}; ≥{RSI_BULL} bullish, ≤{RSI_BEAR} bearish)")
        if hot:
            print(f"  Actionable now — RSI backs the setup's direction ({len(hot)}):")
            if longs:
                print(f"    ↑ LONG  ({len(longs)}, strongest first)")
                for sym, rsi, _, _ in longs:
                    print(f"        {sym:<6} RSI {rsi:5.1f}")
            if shorts:
                print(f"    ↓ SHORT ({len(shorts)}, weakest first)")
                for sym, rsi, _, _ in shorts:
                    print(f"        {sym:<6} RSI {rsi:5.1f}")
        else:
            print("  Nothing actionable: no setup has RSI behind it today.")
        if against:
            print(f"  Momentum against the setup ({len(against)}) — wait or re-read:")
            print("    " + ", ".join(f"{s} {r:.0f}" for s, r, _, _ in sorted(against, key=lambda m: -m[1])))

    thin = result.get('thin') or []
    if thin:
        print(f"\n📏 Too little room (target within {MIN_ROOM * 100:.0f}% of the confirmation level):")
        for sym, label, pattern, tf, stage, level, target, room, auto in sorted(thin, key=lambda r: r[7]):
            tag = "auto" if auto else "posted"
            print(f"  {sym:<6} {tf:<7} {str(pattern):<20} {str(stage):<9} "
                  f"${_fmt_price(level)} → ${_fmt_price(target)}  {room * 100:4.1f}%  ({tag})")
        print("  Run with --thin to drop the auto-detected ones.")
    geom = result.get('geometry') or []
    if geom:
        print("\n📐 Too tall to draw (hand-posted; the detector would reject these on MAX_HEIGHT —")
        print("   the measured move is arithmetic, not a forecast):")
        for sym, label, pattern, tf, height, start, ratio, tgt in sorted(geom, key=lambda r: -r[6]):
            print(f"  {sym:<6} {tf:<7} {str(pattern):<20} height ${_fmt_price(height)} vs ${_fmt_price(start)} "
                  f"at the start = {ratio * 100:3.0f}% (cap {GEOMETRY_CAP[tf] * 100:.0f}%)  target ${_fmt_price(tgt) if tgt else '—'}")
    stranded = result.get('stranded') or []
    if result.get('wake'):
        print("\n⏰ Woken as `update` (the break has re-formed, but the shelved levels are the old")
        print("   pattern's — redraw on the current chart, the target especially):")
        for tk, label, tf, pat, d, conf, price in result['wake']:
            print(f"  {tk:<6} {str(tf):<7} {str(pat):<19} back past ${_fmt_price(conf)} at ${_fmt_price(price)}")
    if result.get('dormant'):
        print(f"\n😴 Shelve candidates (confirmed over {DORMANT_AGE}d ago, break >{DORMANT_UNDONE * 100:.0f}% undone,")
        print("   stock trending the other way — valid, but not what the chart says now):")
        for tk, label, tf, pat, d, age, undone, auto in result['dormant']:
            print(f"  {tk:<6} {str(tf):<7} {str(pat):<19} {age}d old, {undone * 100:.0f}% undone" + ("  (auto)" if auto else ""))
        print("  Run `python3 pattern_watchlist.py --dormant --apply` to shelve them.")
    if result.get('dead_stops'):
        dead = [r for r in result['dead_stops'] if r[5] == 'dead']
        wide = [r for r in result['dead_stops'] if r[5] == 'wide']
        if dead:
            print("\n🚫 Stop is not a price (the failure rule can never fire — a sloped line")
            print("   extended past its pattern leaves the range the stock trades in):")
            for tk, label, pat, tf, stage, _sev, why, auto in dead:
                print(f"  {tk:<6} {str(tf):<7} {str(pat):<19} {why}" + ("  (auto)" if auto else ""))
            print("  Run `python3 pattern_watchlist.py --deadstops --apply` to drop the auto ones.")
        if wide:
            print(f"\n📏 Reward:risk under {MIN_RR:.1f}x ({len(wide)} setups) — the target pays less than")
            print("   the stop costs, so the setup is not worth taking even when it is right:")
            for tk, label, pat, tf, stage, _sev, why, auto in wide[:12]:
                print(f"  {tk:<6} {str(tf):<7} {str(pat):<19} {why}" + ("  (auto)" if auto else ""))
            if len(wide) > 12:
                print(f"  ... and {len(wide) - 12} more")
    if stranded:
        print(f"\n🪦 Stranded (break undone by >{STRANDED_UNDONE * 100:.0f}% with an invalidation >{STRANDED_STOP * 100:.0f}% away —")
        print("   nothing can retire these; post a replacement or mark them `update` by hand):")
        for sym, label, pattern, tf, when, price, conf, undone, stop, auto in sorted(stranded, key=lambda r: -r[7]):
            tag = "auto" if auto else "posted"
            print(f"  {sym:<6} {tf:<7} {str(pattern):<20} confirmed {str(when):<12} "
                  f"${_fmt_price(conf)} → ${_fmt_price(price)}  {undone * 100:4.0f}% past, stop {stop * 100:3.0f}%  ({tag})")
    if result['review']:
        print("\n⚠ Needs review:")
        for line in result['review']:
            print(f"  {line}")
    if result['news']:
        # `apply` alone is not enough: with NEWS_PAUSED set, an --apply run computes the
        # items and writes none of them, and saying "posted" there sends you looking for
        # entries in newsFeed.ts that are not in it.
        posted = apply and not NEWS_PAUSED
        print(f"\n📰 News feed ({'posted' if posted else 'would post'} {len(result['news'])}"
              + (", paused" if apply and NEWS_PAUSED else "") + "):")
        for it in result['news']:
            print(f"  {it['date']}  {it['title']} — {it['text']}")
    if missing:
        print(f"\nNo watchlist price for: {', '.join(missing)}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Re-check watchlist setups against their stored prices and post status changes to the News feed (no network).")
    ap.add_argument("--apply", action="store_true", help="write changes (default is a dry run)")
    ap.add_argument("--bars", action="store_true", help="only (re)download the chart candles into public/bars/ (network)")
    ap.add_argument("--prune", action="store_true", help="remove finished setups (target reached / failed) and post them to News")
    ap.add_argument("--no-news", action="store_true", help="make no News posts this run (NEWS_PAUSED does the same, persistently)")
    ap.add_argument("--thin", action="store_true", help=f"remove auto-detected setups whose target is within {MIN_ROOM * 100:.0f}%% of their confirmation level")
    ap.add_argument("--deadstops", action="store_true", help=f"remove auto-detected setups whose stop is not a price, or whose reward:risk is under {MIN_RR:.1f}x")
    ap.add_argument("--dormant", action="store_true", help=f"shelve confirmed breaks older than {DORMANT_AGE}d whose break is >{DORMANT_UNDONE * 100:.0f}% undone against the stock's trend, and wake any whose break has re-formed")
    args = ap.parse_args()
    if args.dormant:
        shelved, woken = shelve_dormant(apply=args.apply)
        print(f"{'Shelved' if args.apply else 'Would shelve'} {len(shelved)} setup(s):")
        for line in shelved:
            print(f"  {line}")
        if woken:
            print(f"\n{'Woke' if args.apply else 'Would wake'} {len(woken)}:")
            for line in woken:
                print(f"  {line}")
        if (shelved or woken) and not args.apply:
            print("\nRun with --dormant --apply to write them.")
        raise SystemExit(0)
    if args.deadstops:
        gone, look = drop_dead_stops(apply=args.apply)
        print(f"{'Dropped' if args.apply else 'Would drop'} {len(gone)} setup(s) with an unusable stop"
              f" (not a price, or reward:risk under {MIN_RR:.1f}x)."
              + ("\n  " + "\n  ".join(gone) if gone else ""))
        if look:
            print("\nPosted by hand or holding the row, left alone:")
            for line in look:
                print(f"  {line}")
        if gone and not args.apply:
            print("\nRun with --deadstops --apply to remove them.")
        raise SystemExit(0)
    if args.thin:
        gone, look = drop_thin(apply=args.apply)
        print(f"{'Dropped' if args.apply else 'Would drop'} {len(gone)} thin auto setup(s)."
              + ("\n  " + "\n  ".join(gone) if gone else ""))
        if look:
            print("\nPosted by hand, left alone:")
            for line in look:
                print(f"  {line}")
        if gone and not args.apply:
            print("\nRun with --thin --apply to remove them.")
        raise SystemExit(0)
    if args.prune:
        rep_, news_ = prune_finished(apply=args.apply)
        print("\n".join(rep_) or "Nothing to prune.")
        for it in news_:
            print(f"  News: {it['title']} — {it['text']}")
        if rep_ and not args.apply:
            print("\nRun with --prune --apply to remove them.")
        raise SystemExit(0)
    if args.bars:
        ok, bad = write_chart_bars({"User-Agent": "Mozilla/5.0"})
        print(f"Wrote {len(ok)} chart file(s) to {os.path.relpath(BARS_DIR)}." + (f" Failed: {', '.join(bad)}" if bad else ""))
        raise SystemExit(0)
    res = update_watchlist(None, apply=args.apply, post_news=False if args.no_news else None)
    print_watchlist_report(res, [], args.apply)
    if not args.apply and (res['news'] or res['needs_update'] or res['target_hits'] or res.get('promoted')):
        print("\nRun with --apply to write these changes.")
