"""Can the detector rebuild the setups that actually completed?

The source tool's finished calls are ground truth: a real break, real levels, and a
target price went on to reach. For each one this replays the chart up to the day it
completed, runs the detector on exactly those candles, and asks whether anything it
produces is that setup -- right pattern, right direction, and levels near the ones
that worked.

This is the objective the distribution comparisons could not be: no survivorship to
correct for, because every label is a setup that paid.
"""
import copy, json, os, re, sys, statistics as S
sys.path.insert(0, '/home/user/IsItaBUY_helper')
os.chdir('/home/user/IsItaBUY_helper')
import pattern_detect as pd, pattern_watchlist as pw

TUNABLE = ('TOUCH', 'MIN_TOUCHES', 'MIN_TARGET', 'FLAT', 'AGREE',
           'WINDOW', 'MIN_SPAN', 'RECENT', 'MAX_HEIGHT', 'MAX_PER_TF')
DEFAULTS = {k: copy.deepcopy(getattr(pd, k)) for k in TUNABLE}

ROW = re.compile(
    r'\{ pattern: "([^"]+)", timeframe: "(\w+)", direction: "(\w+)", stage: "target", '
    r'stageDate: "([\d-]+)",\s*\n\s*confirm: ([\d.]+), invalidation: ([\d.]+), target: ([\d.]+)')


def labels():
    """Every completed call on record, with the ticker it belongs to."""
    text = open(pw.WATCHLIST_FILE).read()
    spans = [(m.group(1), m.start()) for m in re.finditer(r'ticker: "([A-Z.]+)"', text)]
    out = []
    for m in ROW.finditer(text):
        tk = [t for t, at in spans if at < m.start()][-1]
        out.append({'ticker': tk, 'pattern': m.group(1), 'tf': m.group(2), 'dir': m.group(3),
                    'date': m.group(4), 'confirm': float(m.group(5)),
                    'invalidation': float(m.group(6)), 'target': float(m.group(7))})
    return out


def bars_until(ticker, tf, date):
    path = f'public/bars/{ticker}_{tf}.json'
    if not os.path.exists(path):
        return None
    b = json.load(open(path))
    n = sum(1 for d in b['t'] if d <= date)
    if n < 40:
        return None
    out = {k: b[k][:n] for k in 'tohlc' if k in b}
    out['tf'] = tf
    return out


def score(overrides, verbose=False):
    for k, v in DEFAULTS.items():
        setattr(pd, k, copy.deepcopy(v))
    for k, v in overrides.items():
        if '.' in k:
            name, sub = k.split('.', 1); getattr(pd, name)[sub] = v
        else:
            setattr(pd, k, v)
    found = pat = lvl = 0
    usable = 0
    errs = []
    for L in labels():
        bars = bars_until(L['ticker'], L['tf'], L['date'])
        if bars is None:
            continue
        usable += 1
        n = len(bars['t'])
        pool = []
        try:
            pd.detect_lines(bars, L['tf'], n, pool)
            h = pd.detect_hammer(bars, L['tf'], n)
            if h:
                pool.append(h)
        except Exception:
            pass
        if pool:
            found += 1
        same = [c for c in pool if c['pattern'] == L['pattern'] and c['direction'] == L['dir']]
        if not same:
            if verbose:
                print(f"    MISS {L['ticker']:<5} {L['tf']:<7}{L['pattern']:<19} "
                      f"(pool: {', '.join(sorted({c['pattern'] for c in pool})) or 'empty'})")
            continue
        pat += 1
        best = min(same, key=lambda c: abs((c.get('confirm') or 0) - L['confirm']))
        ce = abs((best.get('confirm') or 0) - L['confirm']) / L['confirm'] * 100
        te = abs((best.get('target') or 0) - L['target']) / L['target'] * 100
        errs.append((ce, te))
        if ce <= 3 and te <= 15:
            lvl += 1
        if verbose:
            print(f"    HIT  {L['ticker']:<5} {L['tf']:<7}{L['pattern']:<19}"
                  f"confirm off {ce:5.1f}%   target off {te:6.1f}%")
    return {'usable': usable, 'anything': found, 'pattern': pat, 'levels': lvl,
            'confirm_err': S.median([e[0] for e in errs]) if errs else None,
            'target_err': S.median([e[1] for e in errs]) if errs else None}


if __name__ == '__main__':
    L = labels()
    print(f"{len(L)} completed calls on record")
    r = score({}, verbose=True)
    print(f"\n  usable (bars reach back far enough): {r['usable']}")
    print(f"  detector produced anything at all:   {r['anything']}")
    print(f"  produced the right pattern+direction: {r['pattern']}")
    print(f"  and levels close (confirm<=3%, target<=15%): {r['levels']}")
    print(f"  median confirm error {r['confirm_err']}%   median target error {r['target_err']}%")
