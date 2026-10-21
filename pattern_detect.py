#!/usr/bin/env python3
"""
Detect chart-pattern setups from candles, following PATTERN_RULES.md.

For each stock and timeframe (daily, weekly) it looks for the best current
channel or wedge (lines through swing highs / lows that hold price inside),
works out its stage from the candles after it formed (forming → signal →
confirmed; finished or failed patterns are skipped), and derives the levels
the same way as the posted setups. If none is found it checks the latest
candles for a hammer / inverted hammer. Stocks with nothing clear get a
pending "No clear pattern" setup.

Detected setups are marked `auto: true` (shown with a red dot) until reviewed.

  python3 pattern_detect.py --compare            # test against the posted setups
  python3 pattern_detect.py                       # dry run for stocks without a setup
  python3 pattern_detect.py --apply               # add them to data/patternWatchlist.ts
"""

import argparse
import glob
import json
import os
import re
from datetime import date

import pattern_lines as pl
import pattern_watchlist as pw

HEADERS = {"User-Agent": "Mozilla/5.0"}
TIMEFRAMES = ('daily', 'weekly')
WINDOW = {'daily': 160, 'weekly': 150}       # bars searched for a pattern
MIN_SPAN = {'daily': 20, 'weekly': 10}       # bars between the first and last swing point
RECENT = {'daily': 45, 'weekly': 26}         # the pattern must have formed / broken this recently
TOUCH = 0.015                                # a swing point within 1.5% of a line touches it
MAX_HEIGHT = {'daily': 0.6, 'weekly': 1.0}   # pattern height vs price; posted setups top out ~0.5 / ~0.97


def _r(v):
    return round(v, 2)


def _touches(line, idx, vals, lo, hi):
    return sum(1 for i in idx if lo <= i <= hi and abs(vals[i] - line.at(i)) <= TOUCH * line.at(i))


def _classify(up, lo, start, end):
    su, sl = up.slope, lo.slope
    w0, w1 = up.at(start) - lo.at(start), up.at(end) - lo.at(end)
    if w0 <= 0 or w1 <= 0:
        return None
    span = end - start
    mid = (up.at(end) + lo.at(end)) / 2
    trend = (su + sl) / 2 * span / mid           # relative move of the pattern's midline
    parallel = abs(su - sl) * span <= 0.25 * max(w0, w1)
    if parallel:
        if abs(trend) < 0.04:                    # a flat range is not in our pattern list
            return None
        return 'Ascending Channel' if trend > 0 else 'Descending Channel'
    if w1 < 0.75 * w0:
        if sl > 0 and su > -abs(sl) * 0.2 and trend > 0:
            return 'Rising Wedge'
        if su < 0 and sl < abs(su) * 0.2 and trend < 0:
            return 'Falling Wedge'
    return None


def _stage(bars, n, pattern, up, lo, start, A):
    """Walk the completed candles after the pattern formed. Returns a dict or None if finished/failed."""
    t, h, l, c = bars['t'], bars['h'], bars['l'], bars['c']
    channel = 'Channel' in pattern
    height = up.at(start) - lo.at(start)
    if height > MAX_HEIGHT[bars['tf']] * c[A]:
        return None                              # implausibly tall for this timeframe
    sig = None
    for i in range(A + 1, n):
        if sig is None:
            # Channels can break either way; a rising wedge only counts a downward break
            # and a falling wedge only an upward one (the other way ends the pattern).
            up_ok = channel or pattern == 'Falling Wedge'
            dn_ok = channel or pattern == 'Rising Wedge'
            if c[i] > up.at(i):
                if not up_ok:
                    return None
                sig = {'dir': 'up', 'i': i, 'level': up.at(i), 'confirm': h[i]}
            elif c[i] < lo.at(i):
                if not dn_ok:
                    return None
                sig = {'dir': 'down', 'i': i, 'level': lo.at(i), 'confirm': l[i]}
            continue
        d = sig['dir']
        if 'conf' not in sig:
            if (d == 'up' and c[i] > sig['confirm']) or (d == 'down' and c[i] < sig['confirm']):
                sig['conf'] = i
            elif (d == 'up' and c[i] < sig['level']) or (d == 'down' and c[i] > sig['level']):
                sig = None                       # close back inside: signal cancelled
            continue
        target = sig['level'] + height if d == 'up' else sig['level'] - height
        if (d == 'up' and h[i] >= target) or (d == 'down' and l[i] <= target):
            return None                          # target already reached: finished
    last = len(t) - 1
    if sig is None:
        if A < n - 1 - RECENT[bars['tf']] * 2:
            return None                          # old pattern that never broke
        if not (lo.at(last) * 0.97 <= c[last] <= up.at(last) * 1.03):
            return None
        if channel:
            return {'direction': 'both', 'stage': 'forming',
                    'breakUp': _r(up.at(last)), 'breakDown': _r(lo.at(last)),
                    'goalUp': _r(up.at(last) + height), 'goalDown': _r(lo.at(last) - height)}
        d = 'down' if pattern == 'Rising Wedge' else 'up'
        brk, far = (lo, up) if d == 'down' else (up, lo)
        return {'direction': d, 'stage': 'forming', 'signal': _r(brk.at(last)),
                'invalidation': _r(far.at(last)),
                'target': _r(brk.at(last) - height if d == 'down' else brk.at(last) + height)}
    if sig['i'] < n - 1 - RECENT[bars['tf']]:
        return None                              # stale break
    d = sig['dir']
    target = sig['level'] + height if d == 'up' else sig['level'] - height
    if target <= 0:
        return None
    if channel:
        inv = (lo if d == 'down' else up).at(last)          # the broken line now
    else:
        inv = (lo if d == 'up' else up).at(last)            # the pattern's far line now
    out = {'direction': d, 'signal': _r(sig['level']), 'confirm': _r(sig['confirm']),
           'invalidation': _r(inv), 'target': _r(target)}
    if 'conf' in sig:
        broken = up if d == 'up' else lo
        for i in range(sig['conf'] + 1, n):
            if channel:
                # channels fail on one completed close back inside the broken line
                if (d == 'up' and c[i] < broken.at(i)) or (d == 'down' and c[i] > broken.at(i)):
                    return None
            elif i + 1 < n and ((d == 'down' and c[i] > inv and c[i + 1] > h[i]) or (d == 'up' and c[i] < inv and c[i + 1] < l[i])):
                return None                      # wedges: past invalidation + a follow-through close
        out.update(stage='confirmed', stageDate=t[sig['conf']])
    else:
        out.update(stage='signal', stageDate=t[sig['i']])
    return out


def detect_lines(bars, tf, n, all_found=None):
    """Best current channel / wedge on these candles, or None. Every valid one is appended to all_found."""
    t, h, l = bars['t'], bars['h'], bars['l']
    last = len(t) - 1
    lo_i = max(0, last - WINDOW[tf])
    H = pl.pivots(h, 'H', lo_i, last - 1, ks=(2, 3))
    L = pl.pivots(l, 'L', lo_i, last - 1, ks=(2, 3))
    H1 = pl.pivots(h, 'H', lo_i, last - 1, ks=(1,))
    L1 = pl.pivots(l, 'L', lo_i, last - 1, ks=(1,))
    ups = [ln for ln in pl._pair_lines(H, h, last) if ln.anchors[1] - ln.anchors[0] >= 3]
    los = [ln for ln in pl._pair_lines(L, l, last) if ln.anchors[1] - ln.anchors[0] >= 3]
    # Candidate (upper, lower) pairs: wedges use two swing points per line; channels use
    # one line through two swing points and a parallel through one opposite swing point.
    combos = [(u, d) for u in ups for d in los]
    for ln in ups:
        combos += [(ln, pl.Line(p, l[p], slope=ln.slope)) for p in L1 if ln.anchors[0] - 20 <= p < last]
    for ln in los:
        combos += [(pl.Line(p, h[p], slope=ln.slope), ln) for p in H1 if ln.anchors[0] - 20 <= p < last]
    best = None
    for u, d in combos:
        anchors = [a for a in u.anchors + d.anchors if a is not None]
        start, A = min(anchors), max(anchors)
        if A - start < MIN_SPAN[tf] or A < last - RECENT[tf] * 2:
            continue
        pattern = _classify(u, d, start, A)
        if not pattern:
            continue
        two_pairs = None not in u.anchors and None not in d.anchors
        if 'Wedge' in pattern and not two_pairs:
            continue
        if not pl._contained(bars, u, d, start, A + 1, tol=0.01, allowed=1):
            continue
        touches = _touches(u, H1, h, start, A) + _touches(d, L1, l, start, A)
        if touches < 4:
            continue
        st = _stage(bars, n, pattern, u, d, start, A)
        if not st:
            continue
        # The clearest pattern wins (most touches, then longest); its stage is whatever the
        # candles say. Many stocks are honestly still forming.
        rank = {'confirmed': 2, 'signal': 1, 'forming': 0}[st['stage']]
        score = (touches + (A - start) / 15, rank)
        if all_found is not None:
            all_found.append(dict(st, pattern=pattern, timeframe=tf))
        if best is None or score > best[0]:
            best = (score, pattern, u, d, start, st)
    if not best:
        return None
    _, pattern, u, d, start, st = best
    setup = {'pattern': pattern, 'timeframe': tf, **st,
             'lines': [{'from': [t[start], _r(u.at(start))], 'to': [t[last], _r(u.at(last))]},
                       {'from': [t[start], _r(d.at(start))], 'to': [t[last], _r(d.at(last))]}]}
    return setup


def detect_hammer(bars, tf, n):
    """Hammer / inverted hammer among the last few completed candles, after a decline."""
    t, o, h, l, c = bars['t'], bars['o'], bars['h'], bars['l'], bars['c']
    for i in range(n - 1, max(15, n - 4), -1):
        body, rng = abs(c[i] - o[i]), h[i] - l[i]
        if rng <= 0:
            continue
        lower, upper = min(o[i], c[i]) - l[i], h[i] - max(o[i], c[i])
        prior = max(c[i - 15:i])
        if c[i] > prior * 0.92:
            continue                             # needs a decline first
        kind = None
        # long wick at least 2x the body; the opposite wick small (<= 30% of the candle's range)
        if lower >= 2 * max(body, rng * 0.05) and upper <= 0.3 * rng:
            kind = 'Hammer'
        elif upper >= 2 * max(body, rng * 0.05) and lower <= 0.3 * rng:
            kind = 'Inverted Hammer'
        if not kind:
            continue
        later = range(i + 1, n)
        if any(c[j] < l[i] for j in later):
            return None                          # broke the candle's low: failed
        target = h[i] + rng
        if any(h[j] >= target for j in later):
            return None
        conf = next((j for j in later if c[j] > h[i]), None)
        s = {'pattern': kind, 'timeframe': tf, 'direction': 'up',
             'confirm': _r(h[i]), 'invalidation': _r(l[i]), 'target': _r(target)}
        s.update({'stage': 'confirmed', 'stageDate': t[conf]} if conf else {'stage': 'forming'})
        return s
    return None


def detect(ticker, bars_by_tf, now_et):
    """One setup per timeframe, weekly first (steadier), then daily."""
    rank = {'confirmed': 2, 'signal': 1, 'forming': 0}
    found = []
    for tf in ('weekly', 'daily'):
        bars = bars_by_tf.get(tf)
        if not bars or len(bars['t']) < 40:
            continue
        bars['tf'] = tf
        n = pw._completed_count(bars['t'], tf, now_et)
        cands = [x for x in (detect_lines(bars, tf, n), detect_hammer(bars, tf, n)) if x]
        if cands:
            # the further-along setup wins; on a tie the channel / wedge beats the single candle
            found.append(max(cands, key=lambda x: (rank[x['stage']], 'Hammer' not in x['pattern'])))
    return found


def _note(s):
    tf, p = s['timeframe'], s['pattern'].lower()
    if s['stage'] == 'confirmed':
        side = 'above' if s['direction'] == 'up' else 'below'
        return f"Auto-detected {p} on the {tf} chart. The break was confirmed with a {tf} close {side} ${s['confirm']:,.2f} on {pw._short_date(s['stageDate'])}."
    if s['stage'] == 'signal':
        return f"Auto-detected {p} on the {tf} chart. A {tf} close beyond the line on {pw._short_date(s['stageDate'])} gave a signal; it needs a close beyond ${s['confirm']:,.2f} to confirm."
    if s['direction'] == 'both':
        return f"Auto-detected {p} on the {tf} chart. No break yet: a {tf} close above ${s['breakUp']:,.2f} or below ${s['breakDown']:,.2f} would start a signal."
    if 'Hammer' in s['pattern']:
        return f"Auto-detected {p} on the {tf} chart. A {tf} close above ${s['confirm']:,.2f} would confirm it."
    return f"Auto-detected {p} on the {tf} chart. No break yet."


FIELD_ORDER = ['pattern', 'timeframe', 'flag', 'direction', 'stage', 'stageDate', 'signal', 'confirm',
               'invalidation', 'target', 'breakUp', 'breakDown', 'goalUp', 'goalDown', 'lines', 'note']


def _ts_setup(s, indent):
    out = []
    for k in FIELD_ORDER:
        if k not in s:
            continue
        v = s[k]
        if k == 'lines':
            out.append(f"{indent}lines: {pl._lines_ts(v, indent)},")
        else:
            out.append(f"{indent}{k}: {json.dumps(v)},")
    return out


def _ts_entry(ticker, name, price, price_date, setups):
    main = dict(setups[0]) if setups else {'pattern': 'No clear pattern', 'timeframe': 'daily',
                                            'direction': 'both', 'stage': 'forming',
                                            'note': 'Auto-scan found no clear channel, wedge or reversal candle yet.'}
    if setups:
        main.setdefault('note', _note(main))
        if main['timeframe'] == 'weekly':
            main['flag'] = 'Weekly close pending'
    lines = ["  {", f"    ticker: {json.dumps(ticker)},", f"    name: {json.dumps(name)},", "    auto: true,"]
    body = _ts_setup(main, '    ')
    # price / priceDate go after stageDate, like the posted setups
    at = next((i for i, x in enumerate(body) if x.strip().startswith(('signal', 'confirm', 'invalidation', 'target', 'breakUp', 'lines', 'note'))), len(body))
    body[at:at] = [f"    price: {pw._fmt_price(price)},", f"    priceDate: {json.dumps(price_date)},"]
    lines += body
    if len(setups) > 1:
        alt = dict(setups[1])
        alt.setdefault('note', _note(alt))
        if alt['timeframe'] == 'weekly':
            alt['flag'] = 'Weekly close pending'
        lines.append("    alt: {")
        lines += _ts_setup(alt, '      ')
        lines.append("    },")
    lines.append("  },")
    return "\n".join(lines) + "\n"


def stock_universe():
    """Our valued stocks: {ticker: name} from stocks/*.ts."""
    out = {}
    for path in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'stocks', '*.ts'))):
        src = open(path).read()
        m, n = re.search(r"ticker:\s*'([^']+)'", src), re.search(r"name:\s*'([^']+)'", src)
        if m and n:
            out[m.group(1)] = n.group(1)
    return out


def get_bars(ticker, tf, refresh):
    path = os.path.join(pw.BARS_DIR, f"{ticker}_{tf}.json")
    if refresh or not os.path.exists(path):
        bars = pw.fetch_chart_bars(ticker, tf, HEADERS)
        data = {"t": [b[0] for b in bars], "o": [_r(b[1]) for b in bars], "h": [_r(b[2]) for b in bars],
                "l": [_r(b[3]) for b in bars], "c": [_r(b[4]) for b in bars]}
        os.makedirs(pw.BARS_DIR, exist_ok=True)
        with open(path, 'w') as fh:
            json.dump(data, fh, separators=(',', ':'))
    with open(path) as fh:
        return json.load(fh)


def compare(now_et):
    """How often the detector agrees with the setups posted from the source tool."""
    text = open(pw.WATCHLIST_FILE).read()
    same_pattern = same_dir = total = in_pool = 0
    for e in pw.parse_watchlist(text):
        main = {k: v[2] for k, v in e['fields'].items()}
        if main.get('auto'):
            continue
        posted = [dict(s, pattern=s.get('pattern') or main.get('pattern'), timeframe=s.get('timeframe') or main.get('timeframe'))
                  for _, s, _ in pw._setups(e)]
        found = detect(main['ticker'], {tf: pl.load_bars(main['ticker'], tf) for tf in TIMEFRAMES}, now_et)
        for p in posted:
            if p['timeframe'] not in TIMEFRAMES:
                continue
            total += 1
            f = next((x for x in found if x['timeframe'] == p['timeframe']), None)
            ok_p = f and f['pattern'] == p['pattern']
            ok_d = f and f['direction'] == p['direction'] and f['stage'] == (p.get('prevStage') if p['stage'] == 'update' else p['stage'])
            same_pattern += bool(ok_p)
            same_dir += bool(ok_p and ok_d)
            # Is the posted setup among every valid setup the rules produce (not just the top pick)?
            pool = []
            b = pl.load_bars(main['ticker'], p['timeframe'])
            if b:
                b['tf'] = p['timeframe']
                detect_lines(b, p['timeframe'], pw._completed_count(b['t'], p['timeframe'], now_et), pool)
            ps = p.get('prevStage') if p['stage'] == 'update' else p['stage']
            lvl = p.get('signal') or p.get('breakUp')
            inpool = any(x['pattern'] == p['pattern'] and x['direction'] == p['direction'] and x['stage'] == ps
                         and (lvl is None or abs((x.get('signal') or x.get('breakUp') or 0) - lvl) <= 0.03 * lvl) for x in pool)
            in_pool += inpool
            mark = 'OK  ' if ok_p and ok_d else ('POOL' if inpool else ('PAT ' if ok_p else 'DIFF'))
            got = f"{f['pattern']} {f['direction']} {f['stage']}" if f else 'nothing'
            print(f"{mark} {main['ticker']:<5} {p['timeframe']:<6} posted: {p['pattern']} {p['direction']} {p['stage']:<9} | detected: {got}")
    print(f"\nTop pick same pattern: {same_pattern}/{total}; same pattern + direction + stage: {same_dir}/{total}")
    print(f"Posted setup found among all valid detections (pattern, direction, stage, signal within 3%): {in_pool}/{total}")


def fetch_name(ticker):
    """Company name from Yahoo's chart metadata (for watchlist-only symbols)."""
    import urllib.request
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?range=5d&interval=1d"
    try:
        meta = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=10).read())["chart"]["result"][0]["meta"]
        return meta.get("longName") or meta.get("shortName") or ticker
    except Exception:
        return ticker


def scan_targets(text):
    """{ticker: (name, entry span or None)}: our stocks without a setup, plus placeholder entries."""
    todo = {}
    have = set()
    for e in pw.parse_watchlist(text):
        m = {k: v[2] for k, v in e['fields'].items()}
        have.add(m['ticker'])
        if m.get('pattern') == pw.NO_PATTERN:
            todo[m['ticker']] = (m.get('name', m['ticker']), e['span'])
    for t, n in stock_universe().items():
        if t not in have:
            todo[t] = (n, None)
    return todo


def run(apply=False, refresh=False, bulk=False, extra=None, verbose=True):
    """Detect setups for stocks that have none (or only a placeholder).

    bulk: post one summary News item instead of one per stock (first big scan).
    extra: {ticker: name} of watchlist-only symbols to (re)add, e.g. after a closed setup.
    """
    now_et = pw._now_et()
    text = open(pw.WATCHLIST_FILE).read()
    todo = scan_targets(text)
    for t, n in (extra or {}).items():
        todo.setdefault(t, (n, None))
    if verbose:
        print(f"Scanning {len(todo)} stocks without a setup...\n")
    cuts, block, summary = [], '', []
    for ticker, (name, span) in sorted(todo.items()):
        try:
            bars = {tf: get_bars(ticker, tf, refresh) for tf in TIMEFRAMES}
        except Exception as e:
            if verbose:
                print(f"  {ticker}: candles failed ({e})")
            continue
        if name == ticker:
            name = fetch_name(ticker)
        found = detect(ticker, bars, now_et)
        d = bars['daily']
        if span is not None and not found:
            continue                              # still nothing: leave the placeholder
        entry = _ts_entry(ticker, name, d['c'][-1], d['t'][-1], found)
        if span is not None:
            cuts.append((span[0], span[1] + 1, entry.strip().rstrip(',')))
        else:
            block += entry
        desc = '; '.join(f"{s['timeframe']} {s['pattern']} {s['direction']} {s['stage']}" for s in found) or 'no clear pattern'
        summary.append((ticker, desc))
        if verbose:
            print(f"  {ticker:<5} {desc}")
    new_text = text
    for a, b, repl in sorted(cuts, reverse=True):
        new_text = new_text[:a] + repl + new_text[b:]
    if block:
        end = new_text.rindex('\n];')
        head = new_text[:end].rstrip()
        new_text = head + (',' if head.endswith('}') else '') + '\n' + block.rstrip(',\n') + '\n' + new_text[end + 1:]
    if not apply or new_text == text:
        return summary
    today = now_et.date().isoformat()
    if bulk:
        with open(pw.WATCHLIST_FILE, 'w') as fh:
            fh.write(new_text)
        with open(pw.SNAPSHOT_FILE, 'w') as fh:
            json.dump(pw.status_map(new_text), fh, indent=1, sort_keys=True)
            fh.write('\n')
        found_n = sum(1 for _, d in summary if d != 'no clear pattern')
        pw._prepend_news([{
            'id': f"{today}-auto-scan", 'date': pw._display_date(today), 'tickers': [],
            'title': f"Auto-detected setups for {len(summary)} stocks",
            'text': f"{found_n} with a channel, wedge or reversal candle, {len(summary) - found_n} with no clear pattern yet. "
                    "Marked with a red dot until checked by hand.",
        }], pw.NEWS_FILE)
    else:
        pw.sync_news(text, new_text, {}, today, apply=True)
        with open(pw.WATCHLIST_FILE, 'w') as fh:
            fh.write(new_text)
    return summary


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--apply', action='store_true', help='add the detected setups to the watchlist')
    ap.add_argument('--bulk', action='store_true', help='one summary News post instead of one per stock')
    ap.add_argument('--compare', action='store_true', help='compare against the posted setups (no changes)')
    ap.add_argument('--refresh', action='store_true', help='re-download candles even if cached')
    ap.add_argument('--add', nargs='*', default=[], help='extra watchlist-only tickers to scan (e.g. CBRS LIFE)')
    args = ap.parse_args()
    if args.compare:
        compare(pw._now_et())
        return
    run(apply=args.apply, refresh=args.refresh, bulk=args.bulk, extra={t: t for t in args.add})
    if not args.apply:
        print("\nDry run. Use --apply to add these setups.")


if __name__ == '__main__':
    main()
