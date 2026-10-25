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

# Everything a sweep may move, and the module that owns it. Getting this list wrong is
# silent: a knob missing from it is never restored between configs, so every later row
# inherits the previous one's value -- and `MIN_ROOM` lives on pw, so the obvious
# `setattr(pd, 'MIN_ROOM', x)` creates an attribute nothing reads and the sweep reports
# "no change" for a parameter it never touched. That is how the floor came to be recorded
# as costing nothing; swept properly it costs three of the completed calls.
TUNABLE = ('TOUCH', 'MIN_TOUCHES', 'MIN_TARGET', 'FLAT', 'AGREE',
           'WINDOW', 'MIN_SPAN', 'RECENT', 'MAX_HEIGHT', 'MAX_PER_TF',
           'HEIGHT_REF', 'MIN_SIDE_TOUCHES', 'SIDE_EXEMPT')
PW_TUNABLE = ('MIN_ROOM', 'CONFIRM_TOL', 'TARGET_TOL')
MODULES = {'pd': pd, 'pw': pw}
DEFAULTS = {k: copy.deepcopy(getattr(pd, k)) for k in TUNABLE}
DEFAULTS.update({'pw.' + k: copy.deepcopy(getattr(pw, k)) for k in PW_TUNABLE})


def _set(key, value):
    """Apply one override. `pw.MIN_ROOM` names a module; `MAX_HEIGHT.daily` a dict key."""
    head, _, rest = key.partition('.')
    if head in MODULES:
        setattr(MODULES[head], rest, value)
    elif rest:
        getattr(pd, head)[rest] = value
    else:
        setattr(pd, head, value)

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


# How many candles before the completion day the replay stops. The completion bar is the
# one that reached the target, so including it hands the detector a chart on which the
# move is already over: `_stage` discards a setup whose target has been reached, and the
# shorter (more accurate) the projection, the more often that fires. At BACK = 0 the only
# setups that survive to be scored are the ones that over-project, which flatters exactly
# the error being measured. Stopping a bar earlier asks the honest question: with the call
# still live, does the detector draw it?
BACK = 1


def bars_until(ticker, tf, date, back=None):
    path = f'public/bars/{ticker}_{tf}.json'
    if not os.path.exists(path):
        return None
    b = json.load(open(path))
    n = sum(1 for d in b['t'] if d <= date) - (BACK if back is None else back)
    if n < 40:
        return None
    out = {k: b[k][:n] for k in 'tohlc' if k in b}
    out['tf'] = tf
    return out


def score(overrides, verbose=False):
    for k, v in DEFAULTS.items():
        _set(k, copy.deepcopy(v))
    for k, v in overrides.items():
        _set(k, v)
    found = pat = lvl = 0
    usable = 0
    errs = []
    by_kind = {'wedge': [], 'channel': [], 'other': []}
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
        by_kind['channel' if 'Channel' in L['pattern'] else
                'wedge' if 'Wedge' in L['pattern'] else 'other'].append(te)
        if ce <= 3 and te <= 15:
            lvl += 1
        if verbose:
            print(f"    HIT  {L['ticker']:<5} {L['tf']:<7}{L['pattern']:<19}"
                  f"confirm off {ce:5.1f}%   target off {te:6.1f}%")
    med = lambda xs: S.median(xs) if xs else None
    return {'usable': usable, 'anything': found, 'pattern': pat, 'levels': lvl,
            'confirm_err': med([e[0] for e in errs]),
            'target_err': med([e[1] for e in errs]),
            # Per pattern family, because that is how the tuning tables in CLAUDE.md are
            # written and they could not be regenerated from this harness without it.
            'wedge_err': med(by_kind['wedge']), 'channel_err': med(by_kind['channel']),
            'n_wedge': len(by_kind['wedge']), 'n_channel': len(by_kind['channel'])}


if __name__ == '__main__':
    if '--back' in sys.argv:
        BACK = int(sys.argv[sys.argv.index('--back') + 1])
    L = labels()
    print(f"{len(L)} completed calls on record")
    r = score({}, verbose=True)
    print(f"\n  usable (bars reach back far enough): {r['usable']}")
    print(f"  detector produced anything at all:   {r['anything']}")
    print(f"  produced the right pattern+direction: {r['pattern']}")
    print(f"  and levels close (confirm<=3%, target<=15%): {r['levels']}")
    print(f"  median confirm error {r['confirm_err']:.1f}%   median target error {r['target_err']:.1f}%")
    print(f"    wedges {r['wedge_err']:.1f}% (n={r['n_wedge']})   "
          f"channels {r['channel_err']:.1f}% (n={r['n_channel']})")
    print(f"  (replay stops {BACK} bar(s) before the completion day)")
