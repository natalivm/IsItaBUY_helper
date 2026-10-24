#!/usr/bin/env python3
"""
Fit chart-pattern trendlines (channels / wedges) to the setups in
data/patternWatchlist.ts, so the expanded-row charts can draw them.

The source tool draws each line through two swing points (H = candle highs for
the upper line, L = candle lows for the lower line) and derives the levels from
those lines:
  signal       = the broken line's value at the signal candle
  confirm      = the signal candle's high (upward break) / low (downward break)
  target       = signal ± the pattern's height at its start (where the lines begin)
  invalidation = the lower line's value at the latest candle (checked, not required)
  forming      = the line values at the latest candle are the break levels
                 (breakUp / breakDown, or signal + invalidation)

So for each setup we search the candles in public/bars/ for the pivot pairs whose
lines reproduce that setup's own levels, and only accept a fit that matches them.
Setups we can't match (or patterns without trendlines, e.g. Hammer / H&S) are listed.

  python3 pattern_lines.py            # dry run: show fits and misses
  python3 pattern_lines.py --apply    # write `lines` into setups that have none
  python3 pattern_lines.py --apply --refit   # also replace existing lines
  python3 pattern_lines.py --relevel [--apply]   # re-read sloped invalidations off the lines

A sloped invalidation is a line's value at the latest candle, so it moves a
little every session while the stored number stays where it was written. The
daily job re-reads it (--relevel) once the candles and any new lines are in.
"""

import argparse
import json
import os
import re
from datetime import date

import pattern_watchlist as pw

TRENDLINE_PATTERNS = {'Ascending Channel', 'Descending Channel', 'Rising Wedge', 'Falling Wedge',
                      'Symmetrical Triangle', 'Megaphone'}  # triangles fit like wedges: two pivots per line
HS_PATTERNS = {'Head & Shoulders', 'Inverse Head & Shoulders'}
LEVEL_TOL = 0.004     # line value vs stored level (fraction of price)
MIN_MOVE = 0.01       # --relevel: a level this near its line is close enough — leave it
CONVERGED = 0.03      # --relevel: lines this close together make the level's line ambiguous
DRIFT = 0.08          # --relevel: further than this from the line is not drift, so leave it
HEIGHT_TOL = 0.006    # target / goal implied by the height (fraction of price)
LOOKBACK = 220        # bars before the evaluation bar to search for pivots


def load_bars(ticker, timeframe):
    path = os.path.join(pw.BARS_DIR, f"{ticker}_{timeframe}.json")
    if not os.path.exists(path):
        return None
    with open(path) as fh:
        return json.load(fh)


def pivots(vals, kind, lo, hi, ks=(1, 2, 3, 5)):
    """Indices in [lo, hi] that are a swing high ('H') / low ('L') for any window k."""
    out = set()
    for k in ks:
        for i in range(max(lo, k), hi + 1):
            win = vals[i - k:i + k + 1]
            if len(win) < k + 2:
                continue
            if (kind == 'H' and vals[i] == max(win)) or (kind == 'L' and vals[i] == min(win)):
                out.add(i)
    return sorted(out)


class Line:
    def __init__(self, a, va, b=None, vb=None, slope=None):
        self.a, self.va = a, va
        self.slope = slope if slope is not None else (vb - va) / (b - a)
        self.anchors = (a, b)

    def at(self, i):
        return self.va + self.slope * (i - self.a)


def _pair_lines(idx, vals, end):
    for x in range(len(idx)):
        for y in range(x + 1, len(idx)):
            a, b = idx[x], idx[y]
            if b < end:
                yield Line(a, vals[a], b, vals[b])


def _contained(bars, up, lo, start, end, tol=0.012, allowed=2):
    """Closes between start and end-1 stay inside the lines (a couple of pokes allowed)."""
    bad = 0
    for i in range(start, end):
        c = bars['c'][i]
        if c > up.at(i) * (1 + tol) or c < lo.at(i) * (1 - tol):
            bad += 1
            if bad > allowed:
                return False
    return True


def _shape_ok(pattern, up, lo, start, end):
    su, sl = up.slope, lo.slope
    if up.at(start) <= lo.at(start) or up.at(end) <= lo.at(end):
        return False
    width0, width1 = up.at(start) - lo.at(start), up.at(end) - lo.at(end)
    if 'Channel' in pattern:
        if 'Ascending' in pattern and not (su > 0 and sl > 0):
            return False
        if 'Descending' in pattern and not (su < 0 and sl < 0):
            return False
        return 0.6 <= width1 / width0 <= 1.6
    if 'Rising' in pattern and not (sl > 0 and su > -abs(sl) * 0.2):
        return False
    if 'Falling' in pattern and not (su < 0 and sl < abs(su) * 0.2):
        return False
    return width1 < width0  # wedges converge


def _setup_view(s):
    s = dict(s)
    if s.get('stage') == 'update':
        s['stage'] = s.get('prevStage') or 'forming'
    return s


def fit_head_shoulders(s, bars):
    """Neckline through the closes of the two troughs around the head.

    Top (down): troughs = swing lows of the closes, head = highest high between them.
    Inverse (up): troughs = swing highs of the closes, head = lowest low between them.
    signal = neckline at the signal candle (the candle whose low/high equals confirm),
    target = signal -/+ (head - neckline at the head).
    """
    t, o, hi, lo_, c = bars['t'], bars['o'], bars['h'], bars['l'], bars['c']
    last = len(t) - 1
    up = s.get('direction') == 'up'
    sig, conf, tgt, inv = s.get('signal'), s.get('confirm'), s.get('target'), s.get('invalidation')
    if None in (sig, conf, tgt):
        return None, "missing signal / confirm / target"
    stop = max(i for i, x in enumerate(t) if x <= s['stageDate']) if s.get('stageDate') and t[0] <= s['stageDate'] else last
    E = next((i for i in range(stop, max(0, stop - 40), -1)
              if abs((hi[i] if up else lo_[i]) - conf) <= 0.011 + 0.0002 * conf), None)
    if E is None:
        return None, "signal candle not found (no candle extreme equals confirm)"
    body = c
    troughs = pivots(body, 'H' if up else 'L', max(0, E - 160), E - 1, ks=(1, 2, 3))
    height = abs(tgt - sig)
    best = None
    for x in range(len(troughs)):
        for y in range(x + 1, len(troughs)):
            i, j = troughs[x], troughs[y]
            if j - i < 3:
                continue
            neck = Line(i, body[i], j, body[j])
            if abs(neck.at(E) - sig) > LEVEL_TOL * sig:
                continue
            head = (min if up else max)(range(i + 1, j), key=lambda k: lo_[k] if up else hi[k])
            h0 = abs((lo_[head] if up else hi[head]) - neck.at(head))
            if abs(h0 - height) > HEIGHT_TOL * sig:
                continue
            err = abs(neck.at(E) - sig) / sig + abs(h0 - height) / sig
            inv_err = min(abs(neck.at(k) - inv) / inv for k in range(E, last + 1)) if inv else None
            if inv_err is not None:
                err += 0.25 * inv_err
            if best is None or err < best[0]:
                best = (err, neck, i, j, head, inv_err)
    if best is None:
        return None, "no neckline reproduces the stored levels"
    err, neck, i, j, head, inv_err = best
    lines = [{'from': [t[i], round(neck.at(i), 2)], 'to': [t[last], round(neck.at(last), 2)]}]
    return lines, {'err': err, 'inv_err': inv_err, 'anchors': [t[i], t[j], f"head {t[head]}"]}


def fit_setup(s, bars):
    """Return (lines, info) for a setup dict, or (None, reason)."""
    s = _setup_view(s)
    pattern, d, stage = s.get('pattern'), s.get('direction'), s.get('stage')
    if pattern in HS_PATTERNS:
        return fit_head_shoulders(s, bars)
    if pattern not in TRENDLINE_PATTERNS:
        return None, f"no trendlines for {pattern}"
    t, hi, lo_ = bars['t'], bars['h'], bars['l']
    n = len(t)
    last = n - 1

    # Where the stored levels were measured, and what they say about the lines.
    evals = []   # (E, {'upper': v or None, 'lower': v or None}, height, sign)
    if d == 'both':
        h = s['goalUp'] - s['breakUp']
        for E in (last, last - 1, last - 2):
            evals.append((E, {'upper': s['breakUp'], 'lower': s['breakDown']}, h))
    elif stage == 'forming':
        lvl = s.get('signal', s.get('confirm'))
        if lvl is None or s.get('target') is None:
            return None, "forming setup without a signal/target level"
        side, other = ('upper', 'lower') if d == 'up' else ('lower', 'upper')
        for E in (last, last - 1, last - 2):
            evals.append((E, {side: lvl, other: None}, abs(s['target'] - lvl)))
    else:
        sig, conf, tgt = s.get('signal'), s.get('confirm'), s.get('target')
        if None in (sig, conf, tgt):
            return None, "missing signal / confirm / target"
        stop = last
        if s.get('stageDate'):
            stop = max(i for i, x in enumerate(t) if x <= s['stageDate']) if t[0] <= s['stageDate'] else last
        iS = None
        for i in range(stop, max(0, stop - 40), -1):
            ext = hi[i] if d == 'up' else lo_[i]
            if abs(ext - conf) <= 0.011 + 0.0002 * conf:
                iS = i
                break
        if iS is None:
            return None, "signal candle not found (no candle extreme equals confirm)"
        side = 'upper' if d == 'up' else 'lower'
        evals.append((iS, {side: sig, 'upper' if side == 'lower' else 'lower': None}, abs(tgt - sig)))

    inv = s.get('invalidation')
    best = None
    for E, want, height in evals:
        if E < 10:
            continue
        lo_i = max(0, E - LOOKBACK)
        H = pivots(hi, 'H', lo_i, E - 1)
        L = pivots(lo_, 'L', lo_i, E - 1)
        ok = lambda ln, side: want[side] is None or abs(ln.at(E) - want[side]) <= LEVEL_TOL * want[side]
        combos = []
        if 'Channel' in pattern:
            # Channels are parallel: one line through two pivots, the other through one pivot.
            for side, idx, vals, oidx, ovals in (('upper', H, hi, L, lo_), ('lower', L, lo_, H, hi)):
                other = 'lower' if side == 'upper' else 'upper'
                for ln in _pair_lines(idx, vals, E):
                    if not ok(ln, side):
                        continue
                    for p in oidx:
                        if p < E:
                            par = Line(p, ovals[p], slope=ln.slope)
                            if ok(par, other):
                                combos.append((ln, par) if side == 'upper' else (par, ln))
                # Or: a line through one pivot aimed at this side's stored level at E
                # (its slope comes from the level), with the parallel through one pivot.
                if want[side] is not None:
                    for p in idx:
                        if p < E - 2:
                            ln = Line(p, vals[p], slope=(want[side] - vals[p]) / (E - p))
                            ln.derived = True
                            for q in oidx:
                                if q < E:
                                    par = Line(q, ovals[q], slope=ln.slope)
                                    if ok(par, other):
                                        combos.append((ln, par) if side == 'upper' else (par, ln))
        else:
            ups = [ln for ln in _pair_lines(H, hi, E) if ok(ln, 'upper')]
            los = [ln for ln in _pair_lines(L, lo_, E) if ok(ln, 'lower')]
            combos = [(u, l) for u in ups for l in los]
        ref_side = 'upper' if want['upper'] is not None else 'lower'
        ref = want[ref_side]
        for up, lo in combos:
            start = min(a for a in up.anchors + lo.anchors if a is not None)
            h0 = up.at(start) - lo.at(start)
            if abs(h0 - height) > HEIGHT_TOL * ref:
                continue
            if not _shape_ok(pattern, up, lo, start, E):
                continue
            if not _contained(bars, up, lo, start, E):
                continue
            err = abs(h0 - height) / ref
            for side, ln in (('upper', up), ('lower', lo)):
                if want[side] is not None:
                    err += abs(ln.at(E) - want[side]) / want[side]
            inv_err = None
            if inv is not None:
                inv_err = min(abs(lo.at(last) - inv), abs(up.at(last) - inv)) / inv
                err += 0.25 * inv_err
            if getattr(up, 'derived', False) or getattr(lo, 'derived', False):
                # Only one pivot per line: demand tighter agreement, and rank below two-pivot lines.
                if abs(h0 - height) > 0.003 * ref or (inv_err is not None and inv_err > 0.01):
                    continue
                err += 0.002
            if best is None or err < best[0]:
                best = (err, up, lo, start, E, inv_err)
    if best is None:
        return None, "no pivot lines reproduce the stored levels"
    err, up, lo, start, E, inv_err = best
    r = lambda v: round(v, 2)
    lines = [
        {'from': [t[start], r(up.at(start))], 'to': [t[last], r(up.at(last))]},
        {'from': [t[start], r(lo.at(start))], 'to': [t[last], r(lo.at(last))]},
    ]
    info = {'err': err, 'inv_err': inv_err, 'anchors': [t[i] for i in up.anchors + lo.anchors if i is not None]}
    return lines, info


def _lines_ts(lines, indent):
    rows = ''.join(f"{indent}  {{ from: [{json.dumps(l['from'][0])}, {l['from'][1]}], to: [{json.dumps(l['to'][0])}, {l['to'][1]}] }},\n"
                   for l in lines)
    return f"[\n{rows}{indent}]"


stored_lines = pw.stored_lines     # the watchlist module owns the file format
line_value = pw.line_value


def invalidation_line(pattern, direction, stage):
    """Which of [upper, lower] the invalidation sits on, matching the setups' own fail rules.

    A confirmed channel fails back inside the boundary it broke ("back inside the broken
    boundary, above $X") — SPY and QQQ read that way, and so do the other 18 posted channel
    breaks. While a channel is still pending there is nothing to fall back into, so the level
    that kills it is the opposite side of the channel, with the wedge-style follow-through
    wording. A wedge invalidates on the far side either way.
    """
    dn = direction == 'down'
    if 'Channel' in pattern:
        if stage in ('confirmed', 'retest', 'atRisk'):
            return 1 if dn else 0  # the boundary it broke (a retest sits on it; an at-risk break has closed past it)
        return 0 if dn else 1      # still pending: the opposite side
    if 'Wedge' in pattern:
        return 0 if dn else 1      # the far side
    return None


def relevel(apply=False, verbose=True, now_et=None):
    """Re-read each sloped invalidation off its line at the latest completed candle.

    Only setups still in play (forming / signal / confirmed) and only while the stored
    level plainly sits on the line the rule names — if the other line is closer, the
    number came from somewhere else and is left alone and reported. Runs after the bars
    and the fitter, so the levels follow the lines the charts actually draw.
    """
    now_et = now_et or pw._now_et()
    with open(pw.WATCHLIST_FILE) as fh:
        text = fh.read()
    edits, moved, odd = [], [], []
    for e in pw.parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, s, pos in pw._setups(e):
            inv = s.get('invalidation')
            pattern = s.get('pattern') or main.get('pattern') or ''
            if inv is None or 'invalidation' not in pos:
                continue
            if s.get('stage') not in ('forming', 'signal', 'confirmed'):
                continue
            # Auto-detected setups are the detector's own arithmetic and stay consistent with
            # the levels it derived alongside them; it places a pending channel's invalidation
            # on the broken boundary rather than the far side, so re-reading these here would
            # just fight pattern_detect.py every run. They are redone by a rescan instead.
            if s.get('auto') or main.get('auto'):
                continue
            want = invalidation_line(pattern, s.get('direction'), s.get('stage'))
            if want is None:
                continue
            lines = stored_lines(text, pos)
            if not lines or len(lines) < 2:
                continue
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'
            bars = load_bars(main['ticker'], tf)
            if not bars or not bars.get('t'):
                continue
            # The last completed candle: never re-read a level off a session still trading.
            i = pw._completed_count(bars['t'], tf, now_et) - 1
            if i < 0:
                continue
            name = f"{main['ticker']} ({label}, {pattern}, {tf})"
            mine = line_value(lines[want], bars['t'], i)
            other = line_value(lines[1 - want], bars['t'], i)
            # Within a whisker of its line: leave it, so a number entered by hand from the
            # source tool is not fought over every run (our fitted line is close to, but not
            # exactly, the one the tool drew) and the daily diff stays small.
            if abs(mine - inv) <= MIN_MOVE * abs(inv):
                continue
            # Near a wedge's apex the two lines sit on top of each other, so which one a
            # level belongs to is a coin flip: leave those alone.
            if abs(mine - other) < CONVERGED * abs(inv):
                odd.append((name, inv, mine, 'its two lines are within %.0f%% of each other' % (CONVERGED * 100)))
                continue
            # Creep is a line read a few sessions ago; a level far off it was set some other
            # way (or the setup needs a human), so don't quietly move it.
            if abs(mine - inv) > DRIFT * abs(inv):
                odd.append((name, inv, mine, 'that is %.0f%% away — too far to be the same line' % (abs(mine - inv) / abs(inv) * 100)))
                continue
            if abs(mine - inv) > abs(other - inv):
                odd.append((name, inv, mine, 'the other line (%.2f) is nearer' % other))
                continue
            new = pw._fmt_price(mine)
            moved.append((name, inv, float(new), bars['t'][i]))
            edits.append((pos['invalidation'][0], pos['invalidation'][1], new))

    if verbose:
        for name, old, new, when in moved:
            print(f"LEVEL {name}: invalidation {old} → {new} (its line at {when})")
        for name, inv, mine, why in odd:
            print(f"SKIP  {name}: invalidation {inv} vs its line at {mine:.2f} — {why}")
        print(f"\n{len(moved)} invalidation(s) re-read, {len(odd)} left for a human.")
    if apply and edits:
        for a, b, v in sorted(edits, key=lambda x: x[0], reverse=True):
            text = text[:a] + v + text[b:]
        with open(pw.WATCHLIST_FILE, 'w') as fh:
            fh.write(text)
        if verbose:
            print(f"Wrote {len(moved)} invalidation(s) to {os.path.relpath(pw.WATCHLIST_FILE)}.")
    return moved, odd


def freeze_stops(apply=False, verbose=True):
    """Record each confirmed setup's invalidation **as it stood at the break**.

    A sloped invalidation is its line's value at the latest candle, so it walks a little
    every session and `invalidation` says where the setup dies *today*, not what it would
    have cost to be wrong on entry. Measured off the live level, a "tight stop" turns out
    to mean nothing more than a recent break: confirmed setups inside 2% have a median age
    of 10 days against 46 days for those beyond 20%, because right after a break the line
    has not moved yet. Any ranking by risk needs a level frozen where the trade started,
    which is what this writes.

    Only ever added, never re-read: that is the whole point. A setup redrawn by a rescan
    loses the field and gets a fresh one from its new lines on the next run.
    """
    with open(pw.WATCHLIST_FILE) as fh:
        text = fh.read()
    edits, done, skipped = [], [], []
    for e in pw.parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, s, pos in pw._setups(e):
            pattern = s.get('pattern') or main.get('pattern') or ''
            name = f"{main['ticker']} ({label}, {pattern})"
            if s.get('stage') != 'confirmed' or s.get('breakInvalidation') is not None:
                continue
            sd = s.get('stageDate')
            want = invalidation_line(pattern, s.get('direction'), 'confirmed')
            if not sd or want is None or 'invalidation' not in pos:
                continue
            lines = stored_lines(text, pos)
            if not lines or len(lines) < 2:
                skipped.append((name, 'no trendlines'))
                continue
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'
            bars = load_bars(main['ticker'], tf)
            if not bars or not bars.get('t'):
                continue
            # The candle the break was recorded on. Candles only reach back so far, so a
            # setup whose stageDate predates the file cannot have its level recovered.
            i = next((k for k, d in enumerate(bars['t']) if d >= sd), None)
            if i is None or bars['t'][0] > sd:
                skipped.append((name, f'candles do not reach {sd}'))
                continue
            at = pw._fmt_price(line_value(lines[want], bars['t'], i))
            b = pos['invalidation'][1]
            edits.append((b, b, f", breakInvalidation: {at}"))
            done.append((name, s.get('invalidation'), float(at), sd))
    if verbose:
        for name, now, at, sd in done:
            print(f"STOP  {name}: invalidation {now} now, {at} at the break ({sd})")
        for name, why in skipped:
            print(f"SKIP  {name}: {why}")
        print(f"\n{len(done)} break level(s) recorded, {len(skipped)} could not be recovered.")
    if apply and edits:
        for a, b, v in sorted(edits, key=lambda x: x[0], reverse=True):
            text = text[:a] + v + text[b:]
        with open(pw.WATCHLIST_FILE, 'w') as fh:
            fh.write(text)
    return done, skipped


def run(apply=False, refit=False, verbose=True):
    """Fit lines for every setup (only those without lines unless refit). Returns (fitted, missed)."""
    with open(pw.WATCHLIST_FILE) as fh:
        text = fh.read()
    edits, fitted, missed, kept = [], [], [], []
    for e in pw.parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        for label, s, pos in pw._setups(e):
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'
            full = dict(s)  # alt setups carry their own levels; only the pattern name may be inherited
            full['pattern'] = s.get('pattern') or main.get('pattern')
            name = f"{main['ticker']} ({label}, {full['pattern']}, {tf})"
            if 'lines' in pos and not refit:
                kept.append(name)
                continue
            bars = load_bars(main['ticker'], tf)
            if not bars:
                missed.append((name, f"no candles for {tf}"))
                continue
            lines, info = fit_setup(full, bars)
            if not lines:
                missed.append((name, info))
                continue
            fitted.append((name, lines, info))
            # Replace an existing `lines` value, else insert after target / goalDown.
            line_start = text.rfind('\n', 0, pos['stage'][0]) + 1
            indent = text[line_start:pos['stage'][0]][:len(text[line_start:pos['stage'][0]]) - len(text[line_start:pos['stage'][0]].lstrip())]
            value = _lines_ts(lines, indent)
            if 'lines' in pos:
                edits.append((pos['lines'][0], pos['lines'][1], value))
            else:
                anchor = pos.get('target') or pos.get('goalDown')
                edits.append((anchor[1], anchor[1], f",\n{indent}lines: {value}"))

    if verbose:
        for name, lines, info in fitted:
            inv = f", invalidation off {info['inv_err'] * 100:.1f}%" if info['inv_err'] is not None else ''
            print(f"FIT   {name}: anchors {', '.join(info['anchors'])} (level error {info['err'] * 100:.2f}%{inv})")
        for name in kept:
            print(f"KEEP  {name}: already has lines (use --refit to replace)")
        for name, why in missed:
            print(f"MISS  {name}: {why}")
        print(f"\n{len(fitted)} fitted, {len(kept)} kept, {len(missed)} without lines.")

    if apply and edits:
        for a, b, v in sorted(edits, key=lambda x: x[0], reverse=True):
            text = text[:a] + v + text[b:]
        with open(pw.WATCHLIST_FILE, 'w') as fh:
            fh.write(text)
        if verbose:
            print(f"Wrote lines for {len(fitted)} setup(s) to {os.path.relpath(pw.WATCHLIST_FILE)}.")
    return fitted, missed


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--apply', action='store_true', help='write lines into data/patternWatchlist.ts')
    ap.add_argument('--refit', action='store_true', help='also replace lines that already exist')
    ap.add_argument('--relevel', action='store_true',
                    help="re-read sloped invalidations off their lines instead of fitting")
    ap.add_argument('--freeze-stops', action='store_true',
                    help="record each confirmed setup's invalidation as it stood at the break")
    args = ap.parse_args()
    if args.freeze_stops:
        freeze_stops(apply=args.apply)
    elif args.relevel:
        relevel(apply=args.apply)
    else:
        run(apply=args.apply, refit=args.refit)
