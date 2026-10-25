#!/usr/bin/env python3
"""
The daily / weekly part of `indicators/matrix_trend_btr.pine`, in Python.

Ports the three dashboard rows that follow from OHLC alone — **Trend**,
**Price / SMA 55** and **MA direction** — so the readings quoted in watchlist
notes can be computed instead of read off a screenshot.

Above 15m the Pine takes `fastChart = false`, which fixes every parameter:

  cloud    conversion = mid(9), base = mid(80), spanB = mid(160) where
           mid(n) = (highest(high, n) + lowest(low, n)) / 2;
           spanA = avg(conversion, base); both read `shift` = 3 bars back
  bias     sticky: 2 consecutive confirmed closes clear of the cloud flip it,
           a close inside keeps the last side (`cloudFlipCloses = 2`)
  MA       SMA(close, 55); slope over `slopeBars` = 1 with `slopeTicks` = 0,
           so MA direction is simply this bar's MA against the last
  POWER UP  5 consecutive `maUp` closes while price holds above the MA
           (`topPowerBars` = 5); a single CLOSE back under the MA cancels it

**Not ported**: the Latest Matrix row. The BUY / SELL engine behind it also
reads pivots, MACD, ATR proximity and the climax guards, and a partial port
of a signal is worse than none.

  python3 matrix_state.py PLTR STX
  python3 matrix_state.py --all          # every watchlist ticker, daily
"""

import argparse
import json
import os

BARS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public', 'bars')

CONVERSION, BASE, SPAN, SHIFT = 9, 80, 160, 3
MA_LEN, SLOPE_BARS, FLIP_CLOSES, POWER_BARS = 55, 1, 2, 5


def _mid(h, l, n, i):
    if i + 1 < n:
        return None
    return (max(h[i - n + 1:i + 1]) + min(l[i - n + 1:i + 1])) / 2


def state(bars):
    """The dashboard rows at the latest completed candle."""
    h, l, c = bars['h'], bars['l'], bars['c']
    n = len(c)
    if n < max(SPAN, MA_LEN) + SHIFT + POWER_BARS:
        return None

    span_a, span_b = [], []
    for i in range(n):
        cv, bs, sp = _mid(h, l, CONVERSION, i), _mid(h, l, BASE, i), _mid(h, l, SPAN, i)
        span_a.append(None if cv is None or bs is None else (cv + bs) / 2)
        span_b.append(sp)

    ma = [None] * n
    for i in range(MA_LEN - 1, n):
        ma[i] = sum(c[i - MA_LEN + 1:i + 1]) / MA_LEN

    bias, above_run, below_run = 0, 0, 0
    power, power_closes = False, 0
    for i in range(n):
        a, b = span_a[i - SHIFT], span_b[i - SHIFT] if i >= SHIFT else (None, None)
        if i >= SHIFT and a is not None and b is not None:
            top, bot = max(a, b), min(a, b)
            above_run = above_run + 1 if c[i] > top else 0
            below_run = below_run + 1 if c[i] < bot else 0
            if above_run >= FLIP_CLOSES:
                bias = 1
            elif below_run >= FLIP_CLOSES:
                bias = -1
        if ma[i] is None or ma[i - SLOPE_BARS] is None or c[i] <= ma[i]:
            power_closes, power = 0, False
        else:
            power_closes = min(power_closes + 1, POWER_BARS) if ma[i] > ma[i - SLOPE_BARS] else 0
            if power_closes >= POWER_BARS:
                power = True

    last = n - 1
    up = ma[last] > ma[last - SLOPE_BARS]
    down = ma[last] < ma[last - SLOPE_BARS]
    trend = ('POWER UP' if power and bias != -1 else
             'UP' if bias == 1 else 'DOWN' if bias == -1 else 'MIXED')
    a, b = span_a[last - SHIFT], span_b[last - SHIFT]
    return {'trend': trend, 'bias': bias, 'power': power,
            'price': c[last], 'ma55': ma[last],
            'priceVsMa': 'ABOVE' if c[last] > ma[last] else 'BELOW' if c[last] < ma[last] else 'ON MA',
            'maDirection': 'UP' if up else 'DOWN' if down else 'FLAT',
            'cloudTop': max(a, b), 'cloudBottom': min(a, b), 'date': bars['t'][last]}


def load(ticker, timeframe='daily'):
    path = os.path.join(BARS, f'{ticker}_{timeframe}.json')
    if not os.path.exists(path):
        return None
    with open(path) as fh:
        return json.load(fh)


def report(ticker, timeframe='daily'):
    bars = load(ticker, timeframe)
    if not bars:
        print(f'{ticker}: no {timeframe} candles')
        return None
    s = state(bars)
    if not s:
        print(f'{ticker}: not enough {timeframe} candles')
        return None
    print(f"{ticker} {timeframe} @ {s['date']}")
    print(f"  Trend            {s['trend']}")
    print(f"  Price / SMA 55   {s['priceVsMa']}   (${s['price']:.2f} vs ${s['ma55']:.2f})")
    print(f"  MA direction     {s['maDirection']}")
    print(f"  cloud            ${s['cloudBottom']:.2f} - ${s['cloudTop']:.2f}")
    return s


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('tickers', nargs='*')
    ap.add_argument('--timeframe', default='daily', choices=('daily', 'weekly', 'monthly'))
    ap.add_argument('--all', action='store_true', help='every watchlist ticker')
    args = ap.parse_args()
    names = args.tickers
    if args.all:
        import pattern_watchlist as pw
        text = open(pw.WATCHLIST_FILE).read()
        names = [{k: v[2] for k, v in e['fields'].items()}['ticker']
                 for e in pw.parse_watchlist(text)]
    for tk in names:
        report(tk, args.timeframe)
