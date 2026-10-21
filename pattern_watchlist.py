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
against their price limits using the latest *close*. A close past either limit
flips the setup to `stage: "update"` ("Needs updating": a new setup has to be
posted) and records `prevStage`, `updateDate` + `updateNote` (`stageDate` is left as it was):
  forming:  invalidation on one side, the signal level (or confirm, if there is
            no signal level) on the other
  signal:   the confirm level on one side, the signal level on the other (a close
            back past it cancels the signal; invalidation if there is no signal level)
  both:     breakUp / breakDown
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

_KEY_RE = re.compile(r'(?<![\w$])(\w+):\s*')
_VAL_RE = re.compile(r'"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?')


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
        val = json.loads(raw) if raw.startswith('"') else float(raw)
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
            entries.append({'fields': f, 'alt': alt})
            i = end
        i += 1
    return entries


def get_watchlist_tickers(path=WATCHLIST_FILE):
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
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range=1mo&interval=1d&includePrePost=false"
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


# ── Update + checks ──

STAGE_LABEL = {
    'forming': 'Waiting for a break', 'signal': 'Break pending', 'confirmed': 'Break confirmed',
    'target': 'Target reached', 'failed': 'Pattern failed', 'update': 'Needs updating',
}


def _fmt_price(p):
    s = f"{p:.2f}"
    return s.rstrip("0").rstrip(".") if "." in s else s


def _setups(entry):
    """[(label, values, positions)] for the main setup and the optional alt setup."""
    f = entry['fields']
    out = [('main', {k: v[2] for k, v in f.items()}, f)]
    if entry['alt']:
        a = {k: v[2] for k, v in entry['alt'].items()}
        out.append((f"{a.get('timeframe', 'alt')} alt", a, entry['alt']))
    return out


def _describe(s, main):
    return f"{s.get('pattern') or main.get('pattern') or 'Setup'} ({s.get('timeframe') or main.get('timeframe') or 'daily'})"


def _target_hit(setup, bars, since, price):
    """First date on/after `since` where a confirmed setup's target was touched, else None."""
    direction, target = setup.get('direction'), setup.get('target')
    if direction not in ('up', 'down') or target is None:
        return None
    for d, high, low, _ in bars:
        if d < since:
            continue
        if (direction == 'down' and low <= target) or (direction == 'up' and high >= target):
            return d
    # No bars (fetch fallback / stored-price check) — fall back to the latest price alone.
    if not bars and price is not None:
        if (direction == 'down' and price <= target) or (direction == 'up' and price >= target):
            return 'today'
    return None


def _pending_break(s, price):
    """Reason string if a forming/signal setup closed past one of its limits, else None."""
    stage, d = s.get('stage'), s.get('direction')
    if stage not in ('forming', 'signal'):
        return None
    p = _fmt_price(price)
    if d == 'both':
        up, dn = s.get('breakUp'), s.get('breakDown')
        if up is not None and price > up:
            return f"closed ${p}, above the ${_fmt_price(up)} break-up level"
        if dn is not None and price < dn:
            return f"closed ${p}, below the ${_fmt_price(dn)} break-down level"
        return None
    if d not in ('up', 'down'):
        return None
    sig, conf, inv = s.get('signal'), s.get('confirm'), s.get('invalidation')
    if stage == 'forming':
        fwd_name, fwd = ('signal', sig) if sig is not None else ('confirm', conf)
        back_name, back = 'invalidation', inv
    else:
        fwd_name, fwd = 'confirm', conf
        back_name, back = ('signal', sig) if sig is not None else ('invalidation', inv)
    down = d == 'down'
    if fwd is not None and ((down and price < fwd) or (not down and price > fwd)):
        return f"closed ${p}, {'below' if down else 'above'} the ${_fmt_price(fwd)} {fwd_name} level"
    if back is not None and ((down and price > back) or (not down and price < back)):
        extra = " (signal cancelled)" if back_name == 'signal' else ""
        return f"closed ${p}, back {'above' if down else 'below'} the ${_fmt_price(back)} {back_name} level{extra}"
    return None


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


def update_watchlist(quotes, apply=False, path=WATCHLIST_FILE, news_path=NEWS_FILE,
                     snapshot_path=SNAPSHOT_FILE, today=None, now_et=None):
    """
    quotes: {sym: {'price', 'date', 'bars'}}; pass None to re-check against the stored prices.
    Returns a dict: price_changes [(sym, old, new)], target_hits, needs_update, review, news.
    """
    now_et = now_et or _now_et()
    today = today or now_et.date().isoformat()
    with open(path) as fh:
        text = fh.read()
    entries = parse_watchlist(text)
    edits, price_changes, target_hits, needs_update, review = [], [], [], [], []
    bot_notes = {}  # "TICKER|label" → (date, news text) for changes this run made

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

        for label, s, pos in _setups(e):
            stage, direction = s.get('stage'), s.get('direction')
            key, what = f"{sym}|{label}", _describe(s, main)

            if stage == 'confirmed' and direction in ('up', 'down'):
                since = max(old_date, s.get('stageDate') or old_date)
                hit = _target_hit(s, q['bars'], since, price)
                if hit:
                    hit_date = date if hit == 'today' else hit
                    target_hits.append((sym, label, s['target'], hit_date))
                    edits += _stage_edits(text, pos, 'target', hit_date)
                    word = 'Downward' if direction == 'down' else 'Upward'
                    bot_notes[key] = (hit_date, f"{what}: {word.lower()} break reached its ${_fmt_price(s['target'])} target on {_display_date(hit_date)}.")
                    continue
                inv = s.get('invalidation')
                if is_close and inv is not None and ((direction == 'down' and price > inv) or (direction == 'up' and price < inv)):
                    review.append(f"{sym} ({label}): closed ${new_price} beyond invalidation ${_fmt_price(inv)} — check for follow-through / mark failed")

            reason = _pending_break(s, price)
            tf = s.get('timeframe') or main.get('timeframe') or 'daily'
            if reason and not is_close:
                review.append(f"{sym} ({label}): trading at ${new_price} past a limit — market still open; only the close counts, re-check after 16:00 ET")
                continue
            if reason and not _period_closed(tf, date):
                review.append(f"{sym} ({label}): {reason} — not a {tf} close yet; check at the {tf} close")
                continue
            if reason:
                note = f"{reason} on {_display_date(date)}."
                needs_update.append((sym, label, stage, note))
                # stageDate keeps the date of the stage it was in; the flag date goes in updateDate.
                edits += _stage_edits(text, pos, 'update', None, {'prevStage': stage, 'updateDate': date,
                                                                   'updateNote': note[0].upper() + note[1:]})
                bot_notes[key] = (date, f"{what}: the {STAGE_LABEL[stage].lower()} setup {note} A new setup needs to be posted.")

    new_text = text
    for start, end, new in sorted(edits, key=lambda x: (x[0], x[1]), reverse=True):
        new_text = new_text[:start] + new + new_text[end:]

    news = sync_news(text, new_text, bot_notes, today, apply=apply, news_path=news_path, snapshot_path=snapshot_path)

    if apply and new_text != text:
        with open(path, 'w') as fh:
            fh.write(new_text)

    return {'price_changes': price_changes, 'target_hits': target_hits, 'needs_update': needs_update,
            'review': review, 'news': news}


# ── News feed ──

def _display_date(iso):
    try:
        return datetime.strptime(iso, "%Y-%m-%d").strftime("%b %-d %Y")
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


def sync_news(old_text, new_text, bot_notes, today, apply=False, news_path=NEWS_FILE, snapshot_path=SNAPSHOT_FILE):
    """Post one News item per status change since the last snapshot. Returns the items."""
    if os.path.exists(snapshot_path):
        with open(snapshot_path) as fh:
            before = json.load(fh)
    else:  # first run: baseline on the file as it was, so only this run's changes post
        before = status_map(old_text)
    after = status_map(new_text)

    items = []
    for key in sorted(set(before) | set(after), key=lambda k: (k.split('|')[0], k)):
        old, new = before.get(key), after.get(key)
        if old and new and old['stage'] == new['stage']:
            continue
        ref = new or old
        t, label = ref['ticker'], ref['label']
        when, text = bot_notes.get(key, (today, None))
        if new is None:
            title, stage = f"{t} · setup removed", 'removed'
            text = text or f"{old['setup']} is no longer tracked."
        elif old is None:
            stage = new['stage']
            title = f"{t} · new setup"
            text = text or f"{new['setup']}: {STAGE_LABEL.get(stage, stage).lower()}."
        else:
            stage = new['stage']
            title = f"{t} · {STAGE_LABEL.get(stage, stage).lower()}"
            text = text or f"{new['setup']}: {STAGE_LABEL.get(old['stage'], old['stage']).lower()} → {STAGE_LABEL.get(stage, stage).lower()}."
        if label != 'main':
            title += f" ({label.replace(' alt', '')} setup)"
        items.append({
            'id': f"{when}-{t}-{label.replace(' ', '-')}-{stage}",
            'date': _display_date(when), 'tickers': [t], 'title': title, 'text': text,
        })

    items.sort(key=lambda it: it['tickers'][0])
    items.sort(key=lambda it: it['id'][:10], reverse=True)  # newest first; id starts with the ISO date
    if apply:
        if items:
            _prepend_news(items, news_path)
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


# ── Report ──

def print_watchlist_report(result, missing, apply):
    print(f"\n{'='*72}\nPATTERN WATCHLIST ({os.path.relpath(WATCHLIST_FILE)})\n")
    mode = "Updated" if apply else "Would update"
    print(f"{mode} {len(result['price_changes'])} watchlist price(s).")
    if result['target_hits']:
        print(f"\n🎯 Target reached ({'marked' if apply else 'would mark'} stage → target):")
        for sym, label, target, d in result['target_hits']:
            print(f"  {sym:<6} {label:<12} target ${_fmt_price(target)}  on {d}")
    if result['needs_update']:
        print(f"\n🔄 Needs updating ({'marked' if apply else 'would mark'} stage → update):")
        for sym, label, stage, note in result['needs_update']:
            print(f"  {sym:<6} {label:<12} {stage:<8} {note}")
    if result['review']:
        print("\n⚠ Needs review:")
        for line in result['review']:
            print(f"  {line}")
    if result['news']:
        print(f"\n📰 News feed ({'posted' if apply else 'would post'} {len(result['news'])}):")
        for it in result['news']:
            print(f"  {it['date']}  {it['title']} — {it['text']}")
    if missing:
        print(f"\nNo watchlist price for: {', '.join(missing)}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Re-check watchlist setups against their stored prices and post status changes to the News feed (no network).")
    ap.add_argument("--apply", action="store_true", help="write changes (default is a dry run)")
    args = ap.parse_args()
    res = update_watchlist(None, apply=args.apply)
    print_watchlist_report(res, [], args.apply)
    if not args.apply and (res['news'] or res['needs_update'] or res['target_hits']):
        print("\nRun with --apply to write these changes.")
