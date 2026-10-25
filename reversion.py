#!/usr/bin/env python3
"""
`indicators/mean_reversion_zscore.pine`, in Python.

z-score oscillator, half-life, variance ratio, Hurst and the turn dots, on the
candles in `public/bars/`. Every default is the Pine's own:

  z        (close - SMA(close, 50)) / stdev(close, 50), then EMA 5.
           The smoothing matters: the half-life is fitted to the SMOOTHED z,
           and on CLS that is the difference between 11.3 bars and 117.
  half-life AR(1) on z: dz = a + b*z[-1] by correlation over the lookback;
           phi = 1 + b, half-life = -ln2 / ln(phi), reported only for 0 < phi < 1.
  regime   VR = Var(4-bar returns) / (4 * Var(1-bar returns));
           Hurst = 0.5 * (1 + ln(VR)/ln(4)); reverting while Hurst < 0.5.
  turn up  a pivot low in z, 3 bars lower either side, at or below -0.382 —
           "being stretched is not a signal; rolling over is".
  hlGate   dots are hidden when the half-life exceeds the lookback, which is
           on by default: a series that will not come halfway back inside the
           window being measured is not one to fade.

  python3 reversion.py PLTR STX
"""

import argparse
import json
import math
import os

BARS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public', 'bars')
LEN, SMOOTH, ZONE_IN, CONFIRM, VR_LAG = 50, 5, 0.382, 3, 4


def _sma(x, n, i):
    return sum(x[i - n + 1:i + 1]) / n if i + 1 >= n and None not in x[i - n + 1:i + 1] else None


def _stdev(x, n, i):
    m = _sma(x, n, i)
    if m is None:
        return None
    return (sum((v - m) ** 2 for v in x[i - n + 1:i + 1]) / n) ** 0.5   # Pine: population


def _corr(a, b, n, i):
    if i + 1 < n or None in a[i - n + 1:i + 1] or None in b[i - n + 1:i + 1]:
        return None
    xa, xb = a[i - n + 1:i + 1], b[i - n + 1:i + 1]
    ma, mb = sum(xa) / n, sum(xb) / n
    sa = (sum((v - ma) ** 2 for v in xa)) ** 0.5
    sb = (sum((v - mb) ** 2 for v in xb)) ** 0.5
    return sum((xa[k] - ma) * (xb[k] - mb) for k in range(n)) / (sa * sb) if sa and sb else None


def series(bars):
    c = bars['c']
    n = len(c)
    z_raw = [None] * n
    for i in range(n):
        m, s = _sma(c, LEN, i), _stdev(c, LEN, i)
        z_raw[i] = (c[i] - m) / s if (m is not None and s) else None
    z = [None] * n
    k = 2 / (SMOOTH + 1)
    for i in range(n):
        if z_raw[i] is None:
            continue
        z[i] = z_raw[i] if z[i - 1] is None else z_raw[i] * k + z[i - 1] * (1 - k)
    return z


def stats(bars):
    c, t = bars['c'], bars['t']
    n = len(c)
    z = series(bars)
    last = n - 1
    if z[last] is None:
        return None

    z_prev = [None] + z[:-1]
    dz = [None if (z[i] is None or z[i - 1] is None) else z[i] - z[i - 1] for i in range(n)]
    sd_p, sd_d = _stdev(z_prev, LEN, last), _stdev(dz, LEN, last)
    cor = _corr(z_prev, dz, LEN, last)
    half = None
    if None not in (sd_p, sd_d, cor) and sd_p:
        phi = 1 + cor * sd_d / sd_p
        if 0 < phi < 1:
            half = -math.log(2) / math.log(phi)

    r1 = [None] + [math.log(c[i] / c[i - 1]) for i in range(1, n)]
    rq = [None] * VR_LAG + [math.log(c[i] / c[i - VR_LAG]) for i in range(VR_LAG, n)]
    s1, sq = _stdev(r1, LEN, last), _stdev(rq, LEN, last)
    vr = (sq ** 2) / (VR_LAG * s1 ** 2) if (s1 and sq) else None
    hurst = 0.5 * (1 + math.log(vr) / math.log(VR_LAG)) if vr and vr > 0 else None

    slow = half is not None and half > LEN
    revert = hurst is None or hurst < 0.5

    # Turn dots: a confirmed pivot in z beyond the zone edge. Reported with the
    # bar it sits on, which is CONFIRM bars before it could be known.
    turns_up, turns_dn = [], []
    for i in range(CONFIRM, n - CONFIRM):
        if z[i] is None:
            continue
        w = [z[j] for j in range(i - CONFIRM, i + CONFIRM + 1)]
        if None in w:
            continue
        if z[i] == min(w) and z[i] <= -ZONE_IN:
            turns_up.append((t[i], z[i], n - 1 - i))
        if z[i] == max(w) and z[i] >= ZONE_IN:
            turns_dn.append((t[i], z[i], n - 1 - i))

    return {'date': t[last], 'z': z[last], 'halfLife': half, 'vr': vr, 'hurst': hurst,
            'regime': 'reverting' if revert else 'trending — fades are dangerous',
            'slowRev': slow, 'gated': slow,
            'lastTurnUp': turns_up[-1] if turns_up else None,
            'lastTurnDown': turns_dn[-1] if turns_dn else None}


def load(ticker, timeframe='daily'):
    p = os.path.join(BARS, f'{ticker}_{timeframe}.json')
    return json.load(open(p)) if os.path.exists(p) else None


def report(ticker, timeframe='daily'):
    b = load(ticker, timeframe)
    s = stats(b) if b else None
    if not s:
        print(f'{ticker}: no usable {timeframe} candles')
        return None
    hl = 'no pull to the mean' if s['halfLife'] is None else f"{s['halfLife']:.1f}"
    print(f"{ticker} {timeframe} @ {s['date']}")
    print(f"  z-score          {s['z']:+.2f}")
    print(f"  half-life        {hl}" + ('  slower than the lookback' if s['slowRev'] else ''))
    print(f"  variance ratio   {s['vr']:.2f}" if s['vr'] else "  variance ratio   -")
    print(f"  Hurst            {s['hurst']:.2f}" if s['hurst'] else "  Hurst            -")
    print(f"  regime           {s['regime']}")
    for name, k in (('last turn up', 'lastTurnUp'), ('last turn down', 'lastTurnDown')):
        v = s[k]
        print(f"  {name:<16} " + (f"{v[0]}  z {v[1]:+.2f}  ({v[2]} bars ago)" if v else '-')
              + ('   [hidden by hlGate]' if v and s['gated'] else ''))
    return s


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('tickers', nargs='+')
    ap.add_argument('--timeframe', default='daily', choices=('daily', 'weekly', 'monthly'))
    a = ap.parse_args()
    for tk in a.tickers:
        report(tk, a.timeframe)
