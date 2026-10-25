#!/usr/bin/env python3
"""
Time-at-price (TPO) profile for the candles in public/bars/.

The original Market Profile counts *time* at each price, not volume: every
bracket contributes one TPO to every price level its range covers, and the
price with the most of them is the Point of Control. Volume Profile is the
later variant that weights each bracket by what traded in it.

We build the TPO version because our candle files are t/o/h/l/c only —
`write_chart_bars` drops volume at aggregation — so the volume variant is not
computable from stored data. The cost is explicit and worth repeating wherever
one of these levels is used: a quiet drift through a price counts exactly as
much as a capitulation through it. A POC here says price spent a long time
there, never that a lot changed hands there.

  POC          the price level with the most time at it
  VAH / VAL    edges of the value area, the band holding VALUE_AREA of the time
  HVN          a local peak — price agreed on, where it stalls and chops
  LVN          a local trough *between* two peaks — the air pocket price moves
               through quickly, and the one shape the thin tails of a profile
               must not be confused with

  python3 price_profile.py PANW                  # daily, the whole file
  python3 price_profile.py PANW --months 3       # the window that matters most
  python3 price_profile.py CRWD --timeframe weekly
  python3 price_profile.py PANW --since 2026-06-01
  python3 price_profile.py PANW --rows 40        # coarser bins

**The window is the parameter, not a detail.** PANW is the case. Read over a
year of daily candles the profile puts $380 inside the year's thickest band
($321-$387) and finds nothing thin until $414 — price is in agreed value, with
resistance overhead. Read over three months the same candles say the opposite:
agreement ends at $377.83, and $385-$407 is a plateau of 6-8 bars out of 81
against a median of 12. Price closed $380.55, right on that edge.

The second reading is the one that matched a hand read of the volume profile,
which called the thin band and named $400. Nothing is wrong with the one-year
profile — it is answering a different question, about where the stock has spent
the year rather than what is overhead now. A long window buries a recent
thinness under months of older trade, so a profile asked about a current break
wants a window near the length of the move.
"""

import argparse
import json
import os
import statistics

import pattern_watchlist as pw

# Bin width as a fraction of the window's mid price, not a number of cents: the
# ledger runs from sub-dollar names to four-figure ones, the same reason
# TARGET_TOL is a fraction of the target.
BIN_PCT = 0.005
VALUE_AREA = 0.70
# A peak must carry this much of the median bin to count as agreement, a trough
# this little to count as an air pocket.
HVN_MULT = 1.30
LVN_MULT = 0.60
# Keep the bin count sane whatever the window's range: fine enough to separate
# shelves, coarse enough that one bin is not a single day's wick.
MIN_ROWS, MAX_ROWS = 24, 120


def load_bars(ticker, timeframe='daily'):
    path = os.path.join(pw.BARS_DIR, f"{ticker}_{timeframe}.json")
    if not os.path.exists(path):
        return None
    with open(path) as fh:
        return json.load(fh)


def build(bars, since=None, until=None, rows=None, bin_pct=BIN_PCT):
    """Count how many bars' ranges cover each price bin over the window."""
    t, h, l = bars['t'], bars['h'], bars['l']
    idx = [i for i in range(len(t))
           if (since is None or t[i] >= since) and (until is None or t[i] <= until)]
    if not idx:
        return None
    hi = max(h[i] for i in idx)
    lo = min(l[i] for i in idx)
    if hi <= lo:
        return None
    width = (hi + lo) / 2 * bin_pct if rows is None else (hi - lo) / rows
    n = int(round((hi - lo) / width))
    n = n if rows else min(MAX_ROWS, max(MIN_ROWS, n))
    width = (hi - lo) / n
    counts = [0] * n

    def binof(p):
        return min(n - 1, max(0, int((p - lo) / width)))

    for i in idx:
        for b in range(binof(l[i]), binof(h[i]) + 1):
            counts[b] += 1
    return {'lo': lo, 'hi': hi, 'width': width, 'counts': counts,
            'bars': len(idx), 'from': t[idx[0]], 'to': t[idx[-1]]}


def price_of(p, b):
    """Mid price of bin b."""
    return p['lo'] + (b + 0.5) * p['width']


def poc(p):
    counts = p['counts']
    return max(range(len(counts)), key=lambda b: counts[b])


def value_area(p, share=VALUE_AREA):
    """Grow out from the POC, taking the heavier neighbouring pair each step."""
    counts = p['counts']
    total = sum(counts)
    c = poc(p)
    lo = hi = c
    got = counts[c]
    while got < total * share and (lo > 0 or hi < len(counts) - 1):
        up = sum(counts[hi + 1:hi + 3]) if hi < len(counts) - 1 else -1
        dn = sum(counts[max(0, lo - 2):lo]) if lo > 0 else -1
        if up >= dn:
            hi = min(len(counts) - 1, hi + 2)
            got += max(up, 0)
        else:
            lo = max(0, lo - 2)
            got += max(dn, 0)
    return lo, hi


def _bands(flags):
    """Contiguous runs of True as (first, last) bin pairs."""
    out, start = [], None
    for i, on in enumerate(flags):
        if on and start is None:
            start = i
        elif not on and start is not None:
            out.append((start, i - 1))
            start = None
    if start is not None:
        out.append((start, len(flags) - 1))
    return out


def nodes(p):
    """(hvn, thin) as bin bands. Each thin band is tagged:

      pocket  thick price on both sides — the air pocket, price slices through
              it and is drawn to the agreed price either side
      shelf   thin all the way to one end of the range — not a pocket but the
              thing that matters for a stop: little traded there to defend it

    Threshold bands rather than local extrema, because a thin *tail* is a real
    and common shape and a trough-between-peaks rule cannot express it.
    """
    counts = p['counts']
    med = statistics.median(c for c in counts if c) or 1
    hvn = _bands([c >= med * HVN_MULT for c in counts])
    thin = []
    for a, b in _bands([c <= med * LVN_MULT for c in counts]):
        below = any(y < a for _, y in hvn)
        above = any(x > b for x, _ in hvn)
        thin.append((a, b, 'pocket' if below and above else 'shelf'))
    return hvn, thin


def report(ticker, timeframe='daily', since=None, until=None, rows=None):
    bars = load_bars(ticker, timeframe)
    if not bars:
        print(f"no candles for {ticker} {timeframe}")
        return None
    p = build(bars, since, until, rows)
    if not p:
        print(f"no bars in that window for {ticker} {timeframe}")
        return None
    c = poc(p)
    va_lo, va_hi = value_area(p)
    hvn, thin = nodes(p)
    rng = lambda a, b: (f"${price_of(p, a):.2f}" if a == b
                        else f"${price_of(p, a):.2f}-${price_of(p, b):.2f}")
    print(f"{ticker} {timeframe}: {p['bars']} bars {p['from']} to {p['to']}, "
          f"{len(p['counts'])} bins of ${p['width']:.2f}")
    print(f"  POC  ${price_of(p, c):.2f}")
    print(f"  VAH  ${price_of(p, va_hi):.2f}")
    print(f"  VAL  ${price_of(p, va_lo):.2f}")
    print(f"  HVN  {', '.join(rng(a, b) for a, b in hvn) or '-'}")
    for a, b, kind in thin:
        print(f"  {kind:<7}{rng(a, b)}")
    if not thin:
        print("  thin   -")
    return {'poc': price_of(p, c), 'vah': price_of(p, va_hi), 'val': price_of(p, va_lo),
            'hvn': [(price_of(p, a), price_of(p, b)) for a, b in hvn],
            'thin': [(price_of(p, a), price_of(p, b), k) for a, b, k in thin],
            'profile': p}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('ticker')
    ap.add_argument('--timeframe', default='daily', choices=('daily', 'weekly', 'monthly'))
    ap.add_argument('--since', help='first candle date to include (YYYY-MM-DD)')
    ap.add_argument('--months', type=int, help='include only the last N months (overrides --since)')
    ap.add_argument('--until', help='last candle date to include (YYYY-MM-DD)')
    ap.add_argument('--rows', type=int, help=f'bin count (default: bins of {BIN_PCT:.1%} of price)')
    args = ap.parse_args()
    since = args.since
    if args.months:
        today = pw._now_et().date()
        m = today.month - args.months
        y = today.year + (m - 1) // 12
        since = today.replace(year=y, month=(m - 1) % 12 + 1, day=1).isoformat()
    report(args.ticker, args.timeframe, since, args.until, args.rows)
