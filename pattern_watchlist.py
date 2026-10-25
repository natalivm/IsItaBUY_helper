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


# Entry-level fields: they belong to the stock, not to whichever setup is on top, so
# `_setup_text` must not emit them and `rebuild_entry` has to re-emit them itself.
# `checkedOn` was missing from both, so promoting a different setup into the main slot
# dropped the stock's hand-check date and leaked it into the alt -- which `tsc` caught,
# `checkedOn` not being a field PatternAltSetup has.
HEADER_KEYS = ('ticker', 'name', 'auto', 'checkedOn', 'trend', 'rsi', 'price', 'priceDate')
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
    for k in ('checkedOn', 'trend', 'rsi', 'price', 'priceDate'):
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


BREAK_DRIFT = 0.08    # live break levels this far from the stored pair are a different drawing


def _live_breaks(s, text, pos, sym, tf, now_et, date):
    """`s` with breakUp / breakDown read off its own lines at the latest completed candle.

    The stored pair is a cache of exactly this value — `pattern_detect` writes it as the two
    lines at the last bar and `pattern_lines.relevel_breaks` refreshes it — but that refresh
    runs *after* this pass, so the levels reaching the break test are always a run old. On a
    steep channel that is enough to turn an ordinary close into a break: TEAM's daily channel
    climbs $2.79 a bar and a $227.61 close was read as a break of a stale $226.80 while the
    line itself stood at $237.65. Reading the lines here removes the lag rather than shrinking
    it; the stored pair remains what the UI shows and the fallback for a setup without lines.

    Falls back to the stored pair whenever the lines cannot say better: no lines, no candles,
    anchors off the chart, or a live value more than `BREAK_DRIFT` from the stored one — that
    last being UMAC's case, where the lines and the levels are not the same drawing and a
    human has to reconcile them rather than the break test picking a side.
    """
    up, dn = s.get('breakUp'), s.get('breakDown')
    if s.get('direction') != 'both' or up is None or dn is None:
        return s
    lines = stored_lines(text, pos)
    bars = _load_chart_bars(sym, tf)
    if not lines or len(lines) < 2 or not bars or not bars.get('t'):
        return s
    t = list(bars['t'])
    # The candle files are rewritten after this pass, so a daily series is missing the bar
    # that just closed. A weekly or monthly series already carries the bar holding `date`.
    if tf == 'daily' and date > t[-1]:
        t.append(date)
    i = _completed_count(t, tf, now_et) - 1
    if i < 0:
        return s
    at = {d: n for n, d in enumerate(t)}
    vals = []
    for (d0, v0), (d1, v1) in lines:
        if d0 not in at or d1 not in at or at[d1] == at[d0]:
            return s
        vals.append(v1 + (v1 - v0) / (at[d1] - at[d0]) * (i - at[d1]))
    live_up, live_dn = max(vals), min(vals)
    if abs(live_up - up) > BREAK_DRIFT * abs(up) or abs(live_dn - dn) > BREAK_DRIFT * abs(dn):
        return s
    return {**s, 'breakUp': live_up, 'breakDown': live_dn}


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

            reason, next_stage = _pending_break(_live_breaks(s, text, pos, sym, tf, now_et, date), price)
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
            'stretched': stretched_setups(new_text),
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
            if '_span' in pos:                    # stored (hidden): finished ones drop quietly
                # `update` is kept here too, matching the docstring and the shown setups. It
                # used to be dropped as "cancelled", which deleted the flag the run before had
                # just written — LITE's weekly falling wedge and TEAM's either-direction channel
                # were both flagged on Oct 23 and gone on Oct 25, before anyone could read them.
                # "Needs updating" asks a human for a replacement, so the run that asks cannot
                # also be the one that forgets.
                if not r:
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
        # A finished call leaves the page. It used to be kept as a `history` row so a target
        # you called and hit still showed under Finished, but the ledger is for readings to
        # act on and a completed one is a record. What it is still needed for is training:
        # pattern_reproduce.py scores the detector against calls that paid, so the ones that
        # reached their target are written to data/completedCalls.json on the way out.
        keep = []
        if posted:
            for label, r in done.items():
                sv = next((v for lb, v, pos in setups if lb == label and '_span' not in pos), None)
                if sv is None or sv.get('auto') or r[3] != 'target':
                    continue
                # A setup already marked `target` by hand carries the real date on its own
                # stageDate; r[0] is only when the run noticed. The harness replays the
                # chart up to the completion day, so taking the later date hands it bars
                # from after the call was over.
                when = sv.get('stageDate') if sv.get('stage') == 'target' else r[0]
                record_completed(t_, sv, when or r[0])
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
# ── Capping how many setups a stock shows ──
#
# Ten readings on one stock is not ten pieces of information, it is one chart described ten
# ways. SETUP_CAP keeps a stock to six, and finished rows go first — a call that completed
# is a record, not a thing to act on.
#
# A completed call IS the training data, though: `pattern_reproduce.py` scores the detector
# against every `history` row with stage "target", and CVX alone carried 3 of the 27 labels
# on record. So those are EXPORTED to data/completedCalls.json before being cut, and the
# harness reads both places. Deleting them outright would have quietly removed 11% of the
# evidence every tuning decision in this file rests on.

SETUP_CAP = 6
COMPLETED_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "completedCalls.json")
_HIST_ROW = re.compile(
    r'\{ pattern: "([^"]+)", timeframe: "(\w+)", direction: "(\w+)", stage: "(\w+)", '
    r'stageDate: "([\d-]+)",\s*\n\s*confirm: ([\d.]+), invalidation: ([\d.]+), target: ([\d.]+)')


def _history_rows(text, e):
    """(stage, start, end, source) for each row of this entry's `history` array."""
    if 'history' not in e['fields']:
        return []
    h0, h1, _ = e['fields']['history']
    seg = text[h0:h1]
    out, depth, start = [], 0, None
    for i, ch in enumerate(seg):
        if ch == '{':
            if depth == 0:
                start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start is not None:
                src = seg[start:i + 1]
                m = re.search(r'stage: "(\w+)"', src)
                out.append((m.group(1) if m else '?', h0 + start, h0 + i + 1, src))
                start = None
    return out


def export_completed(text, path=None):
    """Append every `history` row with stage "target" to the completed-calls file.

    Keyed by (ticker, pattern, timeframe, stageDate) so repeated runs do not duplicate.
    Returns the rows added.
    """
    path = path or COMPLETED_FILE
    have = []
    if os.path.exists(path):
        with open(path) as fh:
            have = json.load(fh)
    seen = {(r['ticker'], r['pattern'], r['timeframe'], r['stageDate']) for r in have}
    added = []
    for e in parse_watchlist(text):
        tk = e['fields'].get('ticker', (0, 0, None))[2]
        for stage, a, b, src in _history_rows(text, e):
            if stage != 'target':
                continue
            m = _HIST_ROW.search(src)
            if not m:
                continue
            row = {'ticker': tk, 'pattern': m.group(1), 'timeframe': m.group(2),
                   'direction': m.group(3), 'stage': m.group(4), 'stageDate': m.group(5),
                   'confirm': float(m.group(6)), 'invalidation': float(m.group(7)),
                   'target': float(m.group(8))}
            key = (tk, row['pattern'], row['timeframe'], row['stageDate'])
            if key in seen:
                continue
            seen.add(key)
            have.append(row)
            added.append(row)
    if added:
        have.sort(key=lambda r: (r['ticker'], r['stageDate']))
        with open(path, 'w') as fh:
            json.dump(have, fh, indent=2)
            fh.write('\n')
    return added


def _cap_plan(text, e):
    """(history rows to drop, live setup positions to drop) for one entry, or ([], [])."""
    m = {k: v[2] for k, v in e['fields'].items()}
    live = [(lb, sv, pos) for lb, sv, pos in _setups(e) if not sv.get('dormant')]
    hist = _history_rows(text, e)
    excess = len(live) + len(hist) - SETUP_CAP
    if excess <= 0:
        return [], [], len(live) + len(hist)
    drop_hist, drop_live = [], []
    for want in ('failed', 'target'):          # finished first: failures, then paid calls
        for row in hist:
            if excess and row[0] == want and row not in drop_hist:
                drop_hist.append(row)
                excess -= 1
    for lb, sv, pos in reversed(live):         # then surplus, never the two visible slots
        if not excess:
            break
        if lb == 'main' or lb.endswith(' alt') or '_span' not in pos:
            continue
        drop_live.append(pos)
        excess -= 1
    return drop_hist, drop_live, len(live) + len(hist)


def record_completed(ticker, sv, finish_date, path=None):
    """Append one completed call to the labels file, if it is not already there."""
    conf, inv, tgt = sv.get('confirm'), sv.get('invalidation'), sv.get('target')
    if not (conf and inv and tgt):
        return False
    path = path or COMPLETED_FILE
    have = []
    if os.path.exists(path):
        with open(path) as fh:
            have = json.load(fh)
    row = {'ticker': ticker, 'pattern': sv.get('pattern'), 'timeframe': sv.get('timeframe'),
           'direction': sv.get('direction'), 'stage': 'target', 'stageDate': finish_date,
           'confirm': conf, 'invalidation': inv, 'target': tgt}
    key = (row['ticker'], row['pattern'], row['timeframe'], row['stageDate'])
    if any((r['ticker'], r['pattern'], r['timeframe'], r['stageDate']) == key for r in have):
        return False
    have.append(row)
    have.sort(key=lambda r: (r['ticker'], r['stageDate']))
    with open(path, 'w') as fh:
        json.dump(have, fh, indent=2)
        fh.write('\n')
    return True


def strip_history(apply=False, path=None):
    """Export every completed call, then remove `history` from the ledger entirely.

    The array stays in the type so old data still parses; nothing writes one any more.
    """
    path = path or WATCHLIST_FILE
    with open(path) as fh:
        text = fh.read()
    exported = export_completed(text)
    cuts, touched = [], []
    for e in parse_watchlist(text):
        if 'history' not in e['fields']:
            continue
        tk = e['fields'].get('ticker', (0, 0, None))[2]
        h0, h1, _ = e['fields']['history']
        ls = text.rfind('\n', 0, text.rfind('history', 0, h0)) + 1
        le = h1
        while le < len(text) and text[le] in ', ':
            le += 1
        if le < len(text) and text[le] == '\n':
            le += 1
        n = len(_history_rows(text, e))
        cuts.append((ls, le, ''))
        touched.append(f"{tk}: {n} finished row(s) removed")
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)
    return touched, exported


# ── Stretched: momentum so strong it is its own risk ──
#
# RSI past STRETCH_HI behind a long (or STRETCH_LO behind a short) is the setup's own
# momentum taken to the point where it becomes a reason for caution: the move is extended
# and a snap back toward the mean is on the table. It is **a risk, not a forecast** --
# price can stay overbought far longer than it looks sustainable -- so it changes no score
# and demotes nothing. What it needs is to be visible, and most of all when something is
# scheduled that could be the trigger. CVX is the case in point: RSI 76.9 behind a
# confirmed upward break, reporting in five days.

STRETCH_HI = 72
STRETCH_LO = 28
STRETCH_SOON = 7        # days to earnings that makes the stretch worth naming


def stretch_of(sv, rsi):
    """'stretched' when the setup's own direction is backed by an extreme RSI, else None."""
    d, = (sv.get('direction'),)
    if rsi is None or d not in ('up', 'down'):
        return None
    if d == 'up' and rsi >= STRETCH_HI:
        return 'overbought'
    if d == 'down' and rsi <= STRETCH_LO:
        return 'oversold'
    return None


def stretched_setups(text, calendar=None, today=None):
    """Shown setups riding an extreme RSI, with days to the next print where known.

    Rows are (ticker, timeframe, pattern, direction, rsi, kind, days_to_earnings | None).
    """
    today = today or _now_et().date()
    if calendar is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "earningsCalendar.json")
        calendar = {}
        if os.path.exists(path):
            with open(path) as fh:
                calendar = json.load(fh)
    out = []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        tk, rsi = m.get('ticker'), m.get('rsi')
        due = (calendar.get(tk) or {}).get('date')
        days = None
        if due:
            try:
                days = (_date.fromisoformat(due) - today).days
            except ValueError:
                days = None
        for label, sv, pos in list(_setups(e))[:2]:
            if sv.get('dormant'):
                continue
            kind = stretch_of(sv, rsi)
            if kind:
                out.append((tk, sv.get('timeframe'), sv.get('pattern'), sv.get('direction'),
                            rsi, kind, days))
    # the ones with a scheduled trigger first, then by how extreme
    out.sort(key=lambda r: (r[6] if r[6] is not None and r[6] >= 0 else 999,
                            -r[4] if r[3] == 'up' else r[4]))
    return out


# ── Which two setups the row shows ──
#
# The visible slots used to be whatever the stored order happened to put first, and the
# dedupe's backfill took `keep_stored.pop(0)`. CVX ended up with a main projecting $273.38
# up and an alt projecting $172.26 down: the row contradicting itself because of list
# order. The slots are the most valuable thing on the page, so they go to the best setups.
#
# The weights are weekly_feature.score_setup's, deliberately -- the landing page ranks the
# week's hottest setups the same way, and a row disagreeing with that list about which of
# its own setups is best would be its own kind of bug. Two terms are added here that the
# featured list does not need: a tight stop is worth something on its own, and a setup
# nobody has checked should not hold a slot over one that has been.

SLOT_TIGHT = 0.10           # risk inside this fraction of the entry counts as tight
SLOT_FLOOR = 0.01           # ...and inside this it is not tight, it is about to die
SLOT_OPPOSITE = 10          # score given up to let the second slot read the other way
SLOT_UNDONE = 80            # a confirmed break that price has walked back past loses this
SLOT_UNDONE_CAP = 0.5       # ...up to the whole of the confirmed stage credit


def slot_score(sv, stock):
    """How much this setup deserves one of the two visible slots. Higher is better."""
    stage = sv.get('stage')
    direction = sv.get('direction')
    price = stock.get('price')
    rsi, trend = stock.get('rsi'), stock.get('trend')
    if sv.get('dormant') or not price:
        return -1e9

    score = {'confirmed': 40, 'retest': 34, 'signal': 25, 'atRisk': 8,
             'update': -20, 'forming': 12}.get(stage, 0)

    target = sv.get('target')
    if direction == 'both':
        # Watching both ways is a real reading, but it is not a call: no direction to back
        # with momentum and no single target to measure. It sits below a directional setup
        # of the same stage rather than being excluded.
        score -= 8
        target = None

    if direction in ('up', 'down'):
        mom = _momentum(rsi, direction)
        if mom == 'with':
            score += 20                       # RSI over 60 behind a long, under 40 behind a short
        elif mom == 'against':
            score -= 25
        if trend == direction:
            score += 10
        elif trend in ('up', 'down'):
            score -= 5
        # Trend and momentum disagreeing with a setup is worse than the sum of the two.
        # One of them against is a setup fighting something; both against, on a stock
        # moving hard the other way, is a reading that does not belong on the row at all
        # while a setup going with the move exists.
        if mom == 'against' and trend in ('up', 'down') and trend != direction:
            score -= 15

    # A confirmed break that price has walked back past is not as confirmed as its stage
    # says. The UI has shown this for ages as the "Break undone %" chip and the ranking
    # never saw it: INTC carried an auto weekly falling wedge confirmed up at $95.94 with
    # price $86.96 -- 9.4% undone -- outranking a forming wedge whose trigger sat 3.6%
    # away, and IREN two setups 40% and 44% undone outranking the same. Scaled so that at
    # DORMANT_UNDONE (25%) a break has lost half the credit `confirmed` gave it, and by
    # 50% all of it, which is where it is worth no more than a setup that never broke.
    conf_level = sv.get('confirm')
    if stage in ('confirmed', 'retest') and conf_level and direction in ('up', 'down'):
        undone = ((price - conf_level) / conf_level if direction == 'down'
                  else (conf_level - price) / conf_level)
        if undone > 0:
            score -= min(undone, SLOT_UNDONE_CAP) * SLOT_UNDONE

    inval = sv.get('invalidation')
    if target and direction in ('up', 'down'):
        room = (target - price) / price * 100
        if (direction == 'up' and room <= 0) or (direction == 'down' and room >= 0):
            score -= 30                       # the target is already behind price
        else:
            score += min(abs(room), 40) * 0.6
        # Risk is measured from the ENTRY, not from today's price. Measuring from price
        # reproduces the artifact CLAUDE.md records under "Stop distance": CVX's weekly
        # down channel sits 0.15% from its own invalidation, which scored as a reward:risk
        # of 369x and a tight stop, when what it actually means is a setup one close from
        # dying. `breakInvalidation` is the stop as it stood on the day of the break, which
        # is the number that means what it says; confirm-to-invalidation is the fallback.
        entry = sv.get('confirm') or price
        stop = sv.get('breakInvalidation') or inval
        if stop and entry:
            risk = abs(entry - stop) / entry * 100
            if risk > 0:
                rr = abs(room) / risk
                score += 15 if rr >= 3 else 10 if rr >= 2 else 5 if rr >= 1 else -20
                # A tight stop is worth something by itself -- it is the difference between
                # a setup you can size and a direction you can only hold an opinion about.
                # Below SLOT_FLOOR it is not tight, it is degenerate.
                if SLOT_FLOOR * 100 <= risk <= SLOT_TIGHT * 100:
                    score += 10
        # Price already on top of the level that kills it: whatever the projection says,
        # this is not one of the two readings a row should lead with.
        if inval and abs(price - inval) / price < SLOT_FLOOR:
            score -= 25

    if sv.get('auto'):
        score -= 15                           # unchecked: never over a setup someone read

    return score


def reslot_setups(apply=False, path=None):
    """Put the two best setups on the row, the rest in `more`.

    The second slot must say something the first does not -- `_same_call` duplicates are
    skipped -- so the row carries two readings rather than one twice.
    """
    path = path or WATCHLIST_FILE
    with open(path) as fh:
        text = fh.read()
    cuts, moved = [], []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        tk = m.get('ticker')

        def vals(pos):
            return {k: v[2] for k, v in pos.items() if k != '_span'}

        # A row someone has read is a row someone composed. `checkedOn` is the record of
        # that, so reslot leaves it alone: the scoring cannot express "the bearish call is
        # the hypothesis and the forming bounce is what would end it", because a forming
        # setup scores 12 against a working confirmed break's 40 and always loses. IREN is
        # the case -- hand-set to a weekly rising wedge over a daily falling wedge, and
        # the next pass wanted to replace the wedge with a second bearish channel.
        #
        # This is not a permanent exemption. A check expires on the earnings print, on
        # price breaking against the reading it was made on, and on any of the stock's
        # setups being replaced by an auto-detected one -- and reslot resumes the moment
        # it does.
        if m.get('checkedOn'):
            continue

        every = [e['fields']] + ([e['alt']] if e['alt'] is not None else []) \
            + [pos for lb, sv, pos in _setups(e) if '_span' in pos]
        live = [pos for pos in every if not vals(pos).get('dormant')]
        if len(live) < 2:
            continue
        ranked = sorted(live, key=lambda pos: -slot_score(vals(pos), m))
        best = ranked[0]
        cands = [pos for pos in ranked[1:] if not _same_call(vals(pos), vals(best))]
        second = cands[0] if cands else (ranked[1] if len(ranked) > 1 else None)
        # The second slot's job is to say something the first does not, and the most useful
        # thing it can say is what would kill the first. A second reading the same way is
        # corroboration, which `agree` already counts and which cost FRSH both its slots;
        # a reading the other way is the bear case under a bull call. So among the
        # non-duplicate candidates, one pointing the other way takes the slot when it is
        # within SLOT_OPPOSITE of the one that would otherwise have it.
        #
        # 10 is argued rather than fitted -- the curve is smooth, 36% of rows read both
        # ways with no rule and 62% at a margin of 50, with no gap anywhere to stop at. It
        # is the size of the trend-agreement term, so the rule trades exactly one "the
        # trend agrees with this" worth of score for showing the other side, and cannot
        # promote a setup that is materially worse.
        bd = vals(best).get('direction')
        if second is not None and bd in ('up', 'down'):
            base = slot_score(vals(second), m)
            opp = [pos for pos in cands if vals(pos).get('direction') in ('up', 'down')
                   and vals(pos).get('direction') != bd]
            if opp and slot_score(vals(opp[0]), m) >= base - SLOT_OPPOSITE:
                second = opp[0]
        if best is e['fields'] and second is e['alt']:
            continue
        rest = [pos for pos in every if pos is not best and pos is not second]
        bv, sv2 = vals(best), vals(second) if second else {}
        moved.append(f"{tk}: {bv.get('timeframe')} {bv.get('pattern')} ({bv.get('stage')}, "
                     f"{slot_score(bv, m):.0f}) + {sv2.get('timeframe')} {sv2.get('pattern')} "
                     f"({sv2.get('stage')}, {slot_score(sv2, m):.0f})")
        a, b = e['span']
        cuts.append((a, b + 1, rebuild_entry(text, e, best, second, rest,
                                             bool(bv.get('auto')), bool(sv2.get('auto')))))
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)
    return moved


# ── One claim per slot ──
#
# FRSH carried six setups of which five projected $19-22: the same read, drawn five ways.
# Worse, its main and alt both said it, so the row spent both its visible slots on one
# claim. `agree` already counts the corroboration, so repeating it costs the slot and
# tells you nothing the badge did not.

DUPE = 0.05        # targets this close, in the same direction, are the same call
_STAGE_RANK = {'confirmed': 0, 'retest': 1, 'atRisk': 2, 'signal': 3, 'forming': 4}


def _same_call(a, b):
    """Do these two setups project the same move?"""
    if a.get('direction') != b.get('direction') or a.get('direction') not in ('up', 'down'):
        return False
    ta, tb = a.get('target'), b.get('target')
    return bool(ta and tb) and abs(ta - tb) / tb <= DUPE


def _claim_rank(sv, price=None):
    """How good a setup is, for deciding which of two identical claims survives.

    Hand-posted first, then the further-along stage, then reward:risk. The slot a setup
    happens to occupy is NOT part of this: keeping the main just because it is the main
    deleted FRSH's hand-posted confirmed break in favour of a machine-drawn signal, and
    took the landing page's top-scored card with it.
    """
    conf, inv, tgt = sv.get('confirm'), sv.get('invalidation'), sv.get('target')
    rr = 0.0
    if conf and inv and tgt and inv != conf:
        rr = abs(tgt - conf) / abs(inv - conf)
    return (1 if sv.get('auto') else 0, _STAGE_RANK.get(sv.get('stage'), 9), -rr)


def dedupe_setups(apply=False, path=None):
    """Keep one setup per claim, and keep the BEST one wherever it sits.

    Setups projecting the same move within DUPE are grouped; the strongest by _claim_rank
    survives and the rest go. If the survivor was stored while a weaker copy held a visible
    slot, it takes that slot -- a duplicate is removed by promoting the better reading, never
    by deleting it for sitting in the wrong place.
    """
    path = path or WATCHLIST_FILE
    with open(path) as fh:
        text = fh.read()
    swapped, dropped = [], []
    # Backfilling an emptied alt slot can itself create a fresh duplicate, so one pass does
    # not converge. Repeat until nothing changes -- it settled on the second pass in
    # practice, and the bound only guards against a cycle.
    for _ in range(6):
        text, sw, dr = _dedupe_pass(text)
        swapped += sw
        dropped += dr
        if not (sw or dr):
            break
    if apply:
        with open(path, 'w') as fh:
            fh.write(text)
    return swapped, dropped


def _dedupe_pass(text):
    cuts, swapped, dropped = [], [], []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        tk = m.get('ticker')

        def vals(pos):
            return {k: v[2] for k, v in pos.items() if k != '_span'}

        slots = [('main', e['fields'])]
        if e['alt'] is not None:
            slots.append(('alt', e['alt']))
        stored = [pos for lb, sv, pos in _setups(e) if '_span' in pos]
        every = slots + [('stored', pos) for pos in stored]
        every = [(kind, pos) for kind, pos in every if not vals(pos).get('dormant')]

        # group identical claims
        groups, used = [], set()
        for i, (kind, pos) in enumerate(every):
            if i in used:
                continue
            grp = [(kind, pos)]
            used.add(i)
            for j, (k2, p2) in enumerate(every):
                if j in used:
                    continue
                if _same_call(vals(pos), vals(p2)):
                    grp.append((k2, p2))
                    used.add(j)
            if len(grp) > 1:
                groups.append(grp)
        if not groups:
            continue

        main_pos, alt_pos = e['fields'], e['alt']
        keep_stored = list(stored)
        changed = False
        for grp in groups:
            best = min(grp, key=lambda kp: _claim_rank(vals(kp[1]), m.get('price')))
            held = [kind for kind, _ in grp if kind in ('main', 'alt')]
            # The best copy takes the highest slot the group holds. Guarding the headline
            # instead -- "the main never disappears" -- let FRSH keep a machine-drawn signal
            # on the row while the hand-posted confirmed break sat beside it saying the same
            # thing, which is the duplication this is supposed to remove.
            if held:
                slot = 'main' if 'main' in held else 'alt'
                bv = vals(best[1])
                cur = main_pos if slot == 'main' else alt_pos
                if cur is not best[1]:
                    swapped.append(f"{tk}: {slot} was the weaker copy of the same call — promoted "
                                   f"{bv.get('timeframe')} {bv.get('pattern')} ({bv.get('stage')}) into it")
                    if slot == 'main':
                        main_pos = best[1]
                        # It may have been the alt. Vacate that slot or the row shows the
                        # same setup in both, which is the fault this routine exists to fix.
                        if alt_pos is best[1]:
                            alt_pos = None
                    else:
                        alt_pos = best[1]
                    changed = True
                keep_stored = [p for p in keep_stored if p is not best[1]]
            for kind, pos in grp:
                if pos is best[1]:
                    continue
                lv = vals(pos)
                # A stored copy costs no slot, and it is exactly what `annotate_agreement`
                # counts: "stored setups in the same direction, on any timeframe, pointing to
                # a target within 5%" is word for word the test `_same_call` applies here. So
                # dropping them deleted the evidence the agreement badge exists to show. D is
                # the case: a weekly falling wedge redrawn on current candles, signalling 0.7%
                # from spot, folded into the daily channel for landing 2.8% from its target.
                # The fault this routine was written for was a *row* spending both visible
                # slots on one claim (FRSH), so that is what it now guards.
                if kind == 'stored':
                    continue
                if alt_pos is pos:
                    alt_pos = None
                keep_stored = [p for p in keep_stored if p is not pos]
                dropped.append(f"{tk}: {lv.get('timeframe')} {lv.get('pattern')} "
                               f"({lv.get('stage')}) tgt ${_fmt_price(lv.get('target'))} — same call, weaker")
                changed = True
        if not changed:
            continue
        if alt_pos is None and keep_stored:
            alt_pos = keep_stored.pop(0)
        a, b = e['span']
        cuts.append((a, b + 1, rebuild_entry(text, e, main_pos, alt_pos, keep_stored,
                                             bool(vals(main_pos).get('auto')),
                                             bool(alt_pos and vals(alt_pos).get('auto')))))
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    return new_text, swapped, dropped


def cap_setups(apply=False, path=None):
    """Hold every stock to SETUP_CAP shown readings, finished rows going first.

    Order of removal: `history` rows that failed, then `history` rows that reached their
    target (exported to data/completedCalls.json first, so the reproduce harness keeps
    them), then surplus live setups from the end of the stored order. Dormant setups are
    not counted -- they are already out of the ledger -- and the main and alt slots are
    never cut, being the row itself.

    Done in two passes. A history row is a span *inside* an entry while dropping a live
    setup rewrites the whole entry, so doing both to one stock in a single pass splices
    overlapping ranges and corrupts the file. The first pass removes history, the second
    re-parses the result and removes setups.
    """
    path = path or WATCHLIST_FILE
    with open(path) as fh:
        text = fh.read()
    exported = export_completed(text)
    counts = {}

    cuts = []
    for e in parse_watchlist(text):
        tk = e['fields'].get('ticker', (0, 0, None))[2]
        drop_hist, drop_live, shown = _cap_plan(text, e)
        if drop_hist or drop_live:
            counts[tk] = [shown, len(drop_hist), len(drop_live)]
        for stage, a, b, src in drop_hist:
            nxt = b
            while nxt < len(text) and text[nxt] in ', \n':
                nxt += 1
            cuts.append((a, nxt, ''))
    for a, b, repl in sorted(cuts, reverse=True):
        text = text[:a] + repl + text[b:]

    cuts = []
    for e in parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        _, drop_live, _ = _cap_plan(text, e)
        if not drop_live:
            continue
        keep = [pos for lb, sv, pos in _setups(e) if '_span' in pos and pos not in drop_live]
        alt = e['alt']
        a, b = e['span']
        cuts.append((a, b + 1, rebuild_entry(text, e, e['fields'], alt, keep,
                                             bool(m.get('auto')),
                                             bool(alt and alt.get('auto', (0, 0, None))[2]))))
    for a, b, repl in sorted(cuts, reverse=True):
        text = text[:a] + repl + text[b:]

    report = [f"{tk}: {v[0]} -> {SETUP_CAP}  ({v[1]} finished, {v[2]} surplus setup(s))"
              for tk, v in counts.items()]
    if apply:
        with open(path, 'w') as fh:
            fh.write(text)
    return report, exported


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

# The second shape of "not the read any more", and it needs no clock at all. A setup that
# has not broken yet is only worth watching if its trigger is somewhere price might go.
# ANET's monthly ascending channel breaks down at $119.76 and up at $204.55 against a
# $172.37 close: 31% below or 19% above before anything at all happens. That is not a setup
# waiting for a break, it is a drawing waiting for a different year.
REACH = 0.15                # nearest trigger further than this: not actionable
REACH_WAKE = 0.10           # ...and nearer than this brings it back (hysteresis, so a
                            # setup hovering at the line does not flip every session)


def _reach_of(sv, price):
    """Distance from price to the nearest level that would start this pending setup."""
    if not price:
        return None
    if sv.get('direction') == 'both':
        levels = [sv.get('breakUp'), sv.get('breakDown')]
    else:
        levels = [sv.get('signal') or sv.get('confirm')]
    levels = [x for x in levels if x]
    return min(abs(x - price) / price for x in levels) if levels else None


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
                pending = sv.get('stage') in ('forming', 'signal')
                if pending:
                    reach = _reach_of(sv, price)
                    if reach is None or reach > REACH_WAKE:
                        continue
                else:
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
                if pending:
                    # Nothing broke, so nothing stale is being presented as live: the stage
                    # still reads `forming`, which already says no claim is being made. It
                    # goes back exactly as it was.
                    woken.append(f"{tk} ({label}): price is within {REACH_WAKE * 100:.0f}% of its "
                                 f"trigger again — back on the list as {sv.get('stage')}")
                    continue
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
            stage, d = sv.get('stage'), sv.get('direction')
            # Out of reach: nothing has broken and nothing is close to breaking.
            if stage in ('forming', 'signal'):
                reach = _reach_of(sv, price)
                if reach is None or reach <= REACH:
                    continue
                if label == 'main' or label.endswith(' alt'):
                    continue
                note = (f"Shelved {today}: nothing has broken and the nearest trigger is "
                        f"{reach * 100:.0f}% away, so there is no break to watch for yet. "
                        f"It comes back when price is within {REACH_WAKE * 100:.0f}% of it.")
                ins = (f"{indent}dormant: true,\n{indent}dormantSince: \"{today}\",\n"
                       f"{indent}dormantNote: {json.dumps(note, ensure_ascii=False)},\n")
                edits.append((line_end, line_end, ins))
                shelved.append(f"{tk} ({label}, {sv.get('timeframe')} {sv.get('pattern')}): "
                               f"out of reach, nearest trigger {reach * 100:.0f}% away")
                continue
            sd = sv.get('stageDate')
            undone = _undone_by(sv, price)
            if stage != 'confirmed' or not sd or undone is None or undone <= DORMANT_UNDONE:
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
        # Compare the entry against the stop as it stood ON the entry, which is what
        # `breakInvalidation` freezes. A live `invalidation` is a trendline read at the latest
        # candle, so on a descending channel it walks down with the line and crosses below a
        # short's entry once the break has paid — a trailing stop past breakeven, not a fault.
        # Against the live level this branch fired twice across 348 confirmed setups (ASTS,
        # LHX) and was wrong both times. Comparing it to price instead is a different test and
        # a worse one: it flags every `atRisk` setup, which is the stage that already says so.
        entry_stop = sv.get('breakInvalidation') or inv
        if (entry_stop > conf) if dirn == 'up' else (entry_stop < conf):
            return 'dead', (f"${_fmt_price(entry_stop)} sits on the winning side of the "
                            f"${_fmt_price(conf)} entry")
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


def failing_setups(text):
    """Confirmed setups whose price has closed past `profileStop` and followed through.

    The ledger's own fail rule tests the invalidation, which is a trendline read at the
    latest candle — on a confirmed break that line keeps moving the way the break went, so
    it outruns price and the rule can never fire. Replayed across 348 confirmed setups,
    exactly **6** have ever closed past their own invalidation line since the break and
    **none** of those got the follow-through. That is why the ledger holds 351 confirmed
    calls and 1 marked `failed`: not a 99.7% hit rate, a stop nothing can reach.

    `profileStop` can be reached, because it is a price the stock actually traded. Using
    it as a second, independent path to failure — a close past it, then a follow-through
    beyond that candle — flags 22 setups against the frozen stop's 54. The frozen stop was
    not chosen despite firing more: price has already traded through it on 141 of 319
    setups the ledger still shows as live, against 50 of 230 for this one, so most of
    those 54 would be false closes.

    This only ever **reports**. 13 of the 22 hold a visible slot, MSFT, AMZN and TSLA
    mains among them, and closing a call someone is reading is a decision rather than a
    clean-up. Rows are (ticker, label, pattern, timeframe, stop, hit date, auto, shown).
    """
    import price_profile as pp
    out = []
    for e in parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, sv, _pos in _setups(e):
            if sv.get('stage') != 'confirmed' or sv.get('dormant'):
                continue
            stop, d = sv.get('profileStop'), sv.get('direction')
            tf, sd = sv.get('timeframe') or main.get('timeframe'), sv.get('stageDate')
            if not (stop and sd) or d not in ('up', 'down'):
                continue
            bars = pp.load_bars(main['ticker'], tf)
            if not bars or sd not in bars['t']:
                continue
            j = bars['t'].index(sd)
            c, h, l = bars['c'], bars['h'], bars['l']
            past = lambda k: (c[k] < stop) if d == 'up' else (c[k] > stop)
            hit = next((k for k in range(j, len(c)) if past(k)), None)
            if hit is None:
                continue
            if not any(((c[k] < l[hit]) if d == 'up' else (c[k] > h[hit]))
                       for k in range(hit + 1, len(c))):
                continue
            # A setup still travelling toward its target has not failed, whatever a stop
            # touched months ago says. This is the same error `_closing_in` was written for
            # on the stranded list, and ENVA is the same case: its weekly rising wedge
            # confirmed down at $145.08, rallied to $267 — through this stop in April —
            # and is now falling toward its $119.67 target, which the source tool and a
            # human reading of the chart both still call correct.
            if _closing_in(main['ticker'], sv, tf, main.get('price'), sv.get('target')):
                continue
            out.append((main['ticker'], label, sv.get('pattern') or main.get('pattern'), tf,
                        stop, bars['t'][hit], bool(sv.get('auto')),
                        label == 'main' or label.endswith('alt')))
    return out


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
    if result.get('stretched'):
        soon = [r for r in result['stretched'] if r[6] is not None and 0 <= r[6] <= STRETCH_SOON]
        if soon:
            print(f"\n⚠ Stretched into a print (RSI past {STRETCH_HI}/{STRETCH_LO} behind the setup's own")
            print("   direction, with earnings inside a week — the move is extended and the print")
            print("   is a plausible trigger for a snap back. A caution, not a reason to fade):")
            for tk, tf, pat, d, rsi, kind, days in soon:
                print(f"  {tk:<6} RSI {rsi:5.1f} {kind:<10} {str(tf):<7} {str(pat):<19} reports in {days}d")
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
    failing = failing_setups(text)
    if failing:
        print(f"\n💀 Closed past the shelter stop ({len(failing)} setups) — a close past `profileStop`")
        print("   and a follow-through beyond it. The invalidation rule cannot reach these:")
        print("   6 of 348 confirmed setups have ever closed past their own invalidation line,")
        print("   and none followed through. Nothing is marked; mark them `failed` by hand:")
        for sym, label, pattern, tf, stop, when, auto, shown in sorted(failing):
            print(f"  {sym:<6} {str(tf):<7} {str(pattern):<20} stop ${_fmt_price(stop)}"
                  f"  first close past {when}" + ("  (auto)" if auto else "") + ("  SHOWN" if shown else ""))
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
    ap.add_argument("--reslot", action="store_true", help="give the two visible slots to the best setups on each stock")
    ap.add_argument("--dedupe", action="store_true", help=f"keep one setup per claim: swap an alt that repeats the main, drop stored setups whose target is within {DUPE * 100:.0f}% of a shown one")
    ap.add_argument("--strip-history", action="store_true", dest="strip_history", help="export every completed call to the labels file, then remove `history` from the ledger")
    ap.add_argument("--cap", action="store_true", help=f"hold every stock to {SETUP_CAP} shown readings, finished rows first (completed calls are exported before they go)")
    ap.add_argument("--dormant", action="store_true", help=f"shelve confirmed breaks older than {DORMANT_AGE}d whose break is >{DORMANT_UNDONE * 100:.0f}% undone against the stock's trend, and wake any whose break has re-formed")
    args = ap.parse_args()
    if args.reslot:
        moved = reslot_setups(apply=args.apply)
        print(f"{'Reslotted' if args.apply else 'Would reslot'} {len(moved)} stock(s):")
        for line in moved[:25]:
            print(f"  {line}")
        if len(moved) > 25:
            print(f"  ... and {len(moved) - 25} more")
        if moved and not args.apply:
            print("\nRun with --reslot --apply to write them.")
        raise SystemExit(0)
    if args.dedupe:
        swapped, dropped = dedupe_setups(apply=args.apply)
        print(f"{'Swapped' if args.apply else 'Would swap'} {len(swapped)} duplicated alt slot(s):")
        for line in swapped:
            print(f"  {line}")
        print(f"\n{'Dropped' if args.apply else 'Would drop'} {len(dropped)} stored duplicate(s):")
        for line in dropped[:20]:
            print(f"  {line}")
        if len(dropped) > 20:
            print(f"  ... and {len(dropped) - 20} more")
        if (swapped or dropped) and not args.apply:
            print("\nRun with --dedupe --apply to write them.")
        raise SystemExit(0)
    if args.strip_history:
        touched, exported = strip_history(apply=args.apply)
        print(f"Exported {len(exported)} new completed call(s) to {os.path.relpath(COMPLETED_FILE)}.")
        print(f"{'Removed' if args.apply else 'Would remove'} history from {len(touched)} stock(s):")
        for line in touched:
            print(f"  {line}")
        if touched and not args.apply:
            print("\nRun with --strip-history --apply to write it.")
        raise SystemExit(0)
    if args.cap:
        rep, exported = cap_setups(apply=args.apply)
        if exported:
            print(f"Exported {len(exported)} completed call(s) to {os.path.relpath(COMPLETED_FILE)} first.")
        print(f"{'Capped' if args.apply else 'Would cap'} {len(rep)} stock(s):")
        for line in rep:
            print(f"  {line}")
        if rep and not args.apply:
            print("\nRun with --cap --apply to write them.")
        raise SystemExit(0)
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
