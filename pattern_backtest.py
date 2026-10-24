#!/usr/bin/env python3
"""
Walk-forward backtest of the pattern detector (pattern_detect.py).

For every stock and timeframe it replays history: at each step it runs the
detector on only the candles known at that date. Whenever the detector reports
a *newly confirmed* break, the setup is followed forward on the later candles:

  win   = price touched the target first
  loss  = the setup failed first (channels: a close back inside the broken line;
          wedges: a close past invalidation + a follow-through close)
  open  = neither happened by the end of the data

Results are grouped by timeframe and pattern, with the average reward / risk
measured from the confirmation close (risk = distance to invalidation).

  python3 pattern_backtest.py                    # our stocks + ~100 large caps
  python3 pattern_backtest.py --tickers AMD MU   # a few stocks
  python3 pattern_backtest.py --set MIN_TOUCHES=5 --set MAX_HEIGHT.daily=0.4   # try a variant

Candles are cached in .backtest_cache/ (not committed).
"""

import argparse
import json
import multiprocessing as mp
import os
import time
from collections import defaultdict

import pattern_detect as pd
import pattern_watchlist as pw

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.backtest_cache')
RANGES = {'daily': ('1d', '3y'), 'weekly': ('1wk', '5y')}
STEP = {'daily': 5, 'weekly': 2}         # bars between replay points
WARMUP = {'daily': 200, 'weekly': 100}   # bars of history before the first replay point

LARGE_CAPS = """AAPL MSFT NVDA AMZN GOOGL META AVGO TSLA LLY JPM V UNH XOM MA JNJ PG COST HD ABBV MRK WMT NFLX
CRM BAC AMD KO PEP ORCL CVX TMO ADBE LIN MCD ACN CSCO ABT WFC DHR TXN QCOM DIS INTU VZ AMGN PM IBM GE CAT
AMAT NOW PFE CMCSA UNP NEE SPGI ISRG RTX LOW HON GS T BKNG UBER AXP BLK SYK ELV PLD VRTX MDT LMT C SCHW DE
BA ADI MU PANW GILD SBUX TJX MMC BMY CB LRCX MDLZ ADP KLAC AMT MO CI SO ETN DUK PYPL ICE ZTS CME SHW EQIX NKE CL""".split()


def bars_for(ticker, tf):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"{ticker}_{tf}.json")
    if not os.path.exists(path):
        saved = pw.CHART_RANGES[tf]
        pw.CHART_RANGES[tf] = RANGES[tf]
        try:
            rows = pw.fetch_chart_bars(ticker, tf, pd.HEADERS)
        finally:
            pw.CHART_RANGES[tf] = saved
        data = {k: [] for k in 'tohlc'}
        for d, o, h, l, c in rows:
            for k, v in zip('tohlc', (d, o, h, l, c)):
                data[k].append(v if k == 't' else round(v, 2))
        with open(path, 'w') as fh:
            json.dump(data, fh, separators=(',', ':'))
    with open(path) as fh:
        return json.load(fh)


def _line_fn(line, t):
    (d0, v0), (d1, v1) = line['from'], line['to']
    i0, i1 = t.index(d0), t.index(d1)
    per = (v1 - v0) / (i1 - i0) if i1 != i0 else 0.0
    return lambda i: v0 + per * (i - i0)


def outcome(bars, s, d):
    """Follow a setup confirmed at bar d forward: ('win'|'loss'|'open', bars taken)."""
    t, h, l, c = bars['t'], bars['h'], bars['l'], bars['c']
    dn, tgt, inv = s['direction'] == 'down', s['target'], s['invalidation']
    channel = 'Channel' in s['pattern']
    broken = None
    if channel and s.get('lines'):
        broken = _line_fn(s['lines'][1] if dn else s['lines'][0], t)
    for i in range(d + 1, len(t)):
        if pw._reached(s['direction'], tgt, h[i], l[i]):   # same margin the daily run allows
            return 'win', i - d
        if broken:
            if (c[i] > broken(i)) if dn else (c[i] < broken(i)):
                return 'loss', i - d
        elif i + 1 < len(t) and ((c[i] > inv and c[i + 1] > h[i]) if dn else (c[i] < inv and c[i + 1] < l[i])):
            return 'loss', i + 1 - d
    return 'open', len(t) - 1 - d


def _slice(bars, n, tf):
    out = {k: bars[k][:n] for k in 'tohlc'}
    out['tf'] = tf
    return out


def backtest_stock(job):
    ticker, overrides = job
    _apply(overrides)
    recs = []
    for tf in ('daily', 'weekly'):
        try:
            bars = bars_for(ticker, tf)
        except Exception:
            continue
        n_all = len(bars['t'])
        seen = set()
        for d in range(WARMUP[tf], n_all - 1, STEP[tf]):
            sub = _slice(bars, d + 1, tf)
            cands = [x for x in (pd.detect_lines(sub, tf, d + 1), pd.detect_hammer(sub, tf, d + 1)) if x]
            for s in cands:
                if s['stage'] != 'confirmed':
                    continue
                ci = sub['t'].index(s['stageDate'])
                if d - ci >= STEP[tf]:
                    continue                      # only setups confirmed since the last replay point
                key = (s['pattern'], round(s.get('signal') or s['confirm'], 1))
                if key in seen:
                    continue
                seen.add(key)
                if s.get('lines'):
                    s = dict(s, lines=[{'from': ln['from'], 'to': ln['to']} for ln in s['lines']])
                res, took = outcome(bars, s, d)
                entry = bars['c'][d]
                risk = abs(entry - s['invalidation'])
                reward = abs(s['target'] - entry)
                recs.append({'ticker': ticker, 'tf': tf, 'pattern': s['pattern'], 'dir': s['direction'],
                             'date': s['stageDate'], 'result': res, 'bars': took,
                             'rr': round(reward / risk, 2) if risk > 0 else None,
                             'reward_pct': round(reward / entry * 100, 1), **s.get('quality', {})})
    return recs


def _apply(overrides):
    for key, val in overrides.items():
        if '.' in key:
            name, sub = key.split('.', 1)
            getattr(pd, name)[sub] = val
        else:
            setattr(pd, key, val)


def summarize(recs):
    groups = defaultdict(list)
    for r in recs:
        groups[(r['tf'], r['pattern'])].append(r)
        groups[(r['tf'], 'ALL')].append(r)
        groups[('all', 'ALL')].append(r)
    print(f"{'timeframe':<8} {'pattern':<20} {'setups':>6} {'win':>5} {'loss':>5} {'open':>5} {'hit rate':>9} {'avg bars':>9} {'avg R':>6}")
    for (tf, pat), rs in sorted(groups.items()):
        w = sum(r['result'] == 'win' for r in rs)
        lo = sum(r['result'] == 'loss' for r in rs)
        op = len(rs) - w - lo
        rate = f"{w / (w + lo) * 100:.0f}%" if w + lo else '-'
        done = [r['bars'] for r in rs if r['result'] != 'open']
        avg_b = f"{sum(done) / len(done):.0f}" if done else '-'
        rrs = [r['rr'] for r in rs if r['rr']]
        avg_rr = f"{sum(rrs) / len(rrs):.1f}" if rrs else '-'
        print(f"{tf:<8} {pat:<20} {len(rs):>6} {w:>5} {lo:>5} {op:>5} {rate:>9} {avg_b:>9} {avg_rr:>6}")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--tickers', nargs='*')
    ap.add_argument('--set', action='append', default=[], help='override a detector setting, e.g. MIN_TOUCHES=5')
    ap.add_argument('--out', default=os.path.join(CACHE, 'results.json'))
    args = ap.parse_args()
    overrides = {}
    for kv in args.set:
        k, v = kv.split('=')
        overrides[k] = float(v) if '.' in v else int(v)
    tickers = args.tickers or sorted(set(pd.stock_universe()) | set(pw.get_watchlist_tickers()) | set(LARGE_CAPS))
    t0 = time.time()
    with mp.Pool(min(4, os.cpu_count() or 1)) as pool:
        recs = [r for rs in pool.map(backtest_stock, [(t, overrides) for t in tickers]) for r in rs]
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'w') as fh:
        json.dump(recs, fh)
    print(f"{len(tickers)} stocks, {len(recs)} confirmed setups, {time.time() - t0:.0f}s"
          + (f", settings {overrides}" if overrides else '') + "\n")
    summarize(recs)


if __name__ == '__main__':
    main()
