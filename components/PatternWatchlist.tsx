import React, { useMemo, useState } from 'react';
import { TickerDefinition } from '../types';
import { PATTERN_STOCKS, PatternStock, PatternAltSetup, PatternStage, PatternAgree } from '../data/patternWatchlist';
import SetupChart, { ChartLevel, ChartMarker } from './SetupChart';
import './PatternWatchlist.css';

// Home page: one scannable ledger of tickers. Clicking the ticker opens the
// stock's valuation page; clicking anywhere else on the row unfolds its
// trading setup (price ladder + rules). Stocks we cover that have no pattern
// data yet are listed with empty fields.

const STAGES: PatternStage[] = ['forming', 'signal', 'confirmed', 'target'];
const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const pct0 = (from: number, to: number) => (to - from) / from * 100;
const pct = (from: number, to: number) => { const p = pct0(from, to); return (p > 0 ? '+' : '') + p.toFixed(1) + '%'; };
const day = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

type IconName = 'down' | 'up' | 'check' | 'x' | 'target' | 'clock' | 'dash' | 'refresh';

const Icon: React.FC<{ name: IconName; color?: string }> = ({ name, color }) => {
  const style = color ? { color } : undefined;
  const knock = { stroke: 'var(--surface)' };
  switch (name) {
    case 'down':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M8 4.5v6.5M5.2 8.3 8 11l2.8-2.7" style={knock} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'up':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M8 11.5V5M5.2 7.7 8 5l2.8 2.7" style={knock} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'check':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="m4.8 8.2 2.2 2.2 4.2-4.4" style={knock} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'x':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="m5.5 5.5 5 5m0-5-5 5" style={knock} strokeWidth="1.7" strokeLinecap="round" /></svg>;
    case 'target':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" /><circle cx="8" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" /><circle cx="8" cy="8" r="1.2" fill="currentColor" /></svg>;
    case 'clock':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
    case 'refresh':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M10.9 6.2A3.3 3.3 0 0 0 5 6.6M5.1 9.8a3.3 3.3 0 0 0 5.9-.4M10.9 4.2v2h-2M5.1 11.8v-2h2" style={knock} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'dash':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 8h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
  }
};

const Chev = () => (
  <svg className="chev" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

type Group = 'confirmed' | 'pending' | 'update' | 'target' | 'failed' | 'none';
interface Status { label: string; short: string; cls: string; icon: IconName; group: Group }

function status(s: { direction: string; stage: PatternStage } | null): Status {
  if (!s) return { label: 'No pattern data yet', short: 'No data', cls: 'st-fail', icon: 'dash', group: 'none' };
  const dn = s.direction === 'down', word = dn ? 'Downward' : 'Upward';
  const tone = dn ? 'st-down' : 'st-up';
  switch (s.stage) {
    case 'forming':   return { label: 'Waiting for a break', short: 'Waiting', cls: 'st-wait', icon: 'clock', group: 'pending' };
    case 'signal':    return { label: `${word} break pending`, short: 'Pending', cls: 'st-wait', icon: dn ? 'down' : 'up', group: 'pending' };
    case 'confirmed': return { label: `${word} break confirmed`, short: 'Confirmed', cls: tone, icon: 'check', group: 'confirmed' };
    case 'target':    return { label: 'Target reached', short: 'Target hit', cls: tone, icon: 'target', group: 'target' };
    case 'failed':    return { label: 'Pattern failed', short: 'Failed', cls: 'st-fail', icon: 'x', group: 'failed' };
    case 'update':    return { label: 'Needs updating', short: 'Update', cls: 'st-upd', icon: 'refresh', group: 'update' };
  }
}

const GROUPS: [Group | 'all', string][] = [['all', 'All'], ['confirmed', 'Confirmed'], ['pending', 'Pending'], ['update', 'Needs update'], ['target', 'Target reached'], ['failed', 'Failed'], ['none', 'No data']];

// A setup flagged "update" still renders its levels as of the stage it was in.
function asPrev<T extends { stage: PatternStage; prevStage?: PatternStage }>(x: T): T {
  return x.stage === 'update' ? { ...x, stage: x.prevStage ?? 'forming' } : x;
}

// Chart levels + stage marker for a single-direction setup (main or alt).
function chartSpec(s: { direction: string; stage: PatternStage; stageDate?: string; signal?: number; confirm?: number; invalidation?: number; target?: number }) {
  const dn = s.direction === 'down';
  const levels: ChartLevel[] = [];
  if (s.target != null) levels.push({ price: s.target, label: s.stage === 'target' ? 'Reached' : 'Target', tone: 'up' });
  if (s.confirm != null) levels.push({ price: s.confirm, label: 'Confirm', tone: dn ? 'down' : 'up' });
  if (s.signal != null) levels.push({ price: s.signal, label: 'Signal', tone: 'muted' });
  if (s.invalidation != null) levels.push({ price: s.invalidation, label: 'Invalidation', tone: 'down', solid: true });
  const word: Partial<Record<PatternStage, string>> = { signal: 'Signal', confirmed: 'Confirmed', target: 'Target' };
  const marker: ChartMarker | undefined = s.stageDate && word[s.stage]
    ? { date: s.stageDate, text: word[s.stage]!, tone: dn ? 'down' : 'up', above: dn }
    : undefined;
  return { levels, marker };
}

// Prices & Rules sit behind a button so the expanded row stays compact.
const PricesRules: React.FC<{ label?: string; children: React.ReactNode }> = ({ label = 'Prices & Rules', children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="pr-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span>{label}</span><Chev />
      </button>
      {open && <div className="pr-grid">{children}</div>}
    </>
  );
};

// Several stored setups pointing to the same target (within 5%) mean more confidence.
// The scripts precompute this as `agree` on the shown setups.
const Agreement: React.FC<{ agree?: PatternAgree }> = ({ agree }) => {
  if (!agree || agree.n < 2) return null;
  const range = agree.lo === agree.hi ? fmt(agree.lo) : `${fmt(agree.lo)}–${fmt(agree.hi)}`;
  return (
    <div className="agree-note">
      <b>{agree.n} patterns agree.</b> {agree.with.join(', ')} {agree.with.length > 1 ? 'point' : 'points'} to a similar target ({range}).
    </div>
  );
};

const AutoNote: React.FC<{ on?: boolean }> = ({ on }) => on
  ? <div className="auto-note"><i className="auto-dot" />Auto-detected: check the lines and levels by hand.</div>
  : null;

const UpdateBanner: React.FC<{ note?: string }> = ({ note }) => (
  <div className="upd-banner">
    <Icon name="refresh" />
    <span><b>Needs updating.</b> {note}</span>
  </div>
);

interface Rung { k: string; cls: string; pcls?: string; v: number; p?: boolean; now?: boolean }

// 'YYYY-MM-DD' → 'MM/DD', matching the `upd` tag on the stock pages.
const updTag = (d: string) => d.slice(5, 7) + '/' + d.slice(8, 10);

const Ladder: React.FC<{ rungs: Rung[]; price: number; priceDate: string }> = ({ rungs, price, priceDate }) => (
  <div className="ladder">
    {rungs.map(r => (
      <div key={r.k} className={`rung ${r.now ? 'now' : ''}`}>
        <span className="kw">
          <span className={`k ${r.cls}`}>{r.k}</span>
          {r.now && <span className="upd" title={`Price updated ${day(priceDate)}`}>upd {updTag(priceDate)}</span>}
        </span>
        <span className="v">{r.p && <small className={r.pcls || r.cls}>{pct(price, r.v)}</small>}<b>{fmt(r.v)}</b></span>
      </div>
    ))}
  </div>
);

const Pill: React.FC<{ st: Status }> = ({ st }) => (
  <span className={`pill ${st.cls}`}><Icon name={st.icon} />{st.label}</span>
);

// "Daily / Weekly / Monthly close pending" is shown only while that candle is still open
// (New York time): a setup on that timeframe is provisional until the close validates it.
function nyNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: false, weekday: 'short',
  }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, mins: (+p.hour % 24) * 60 + +p.minute, wd: p.weekday };
}
function closePending(tf: string): boolean {
  const n = nyNow();
  const weekend = n.wd === 'Sat' || n.wd === 'Sun';
  const afterClose = n.mins >= 16 * 60;
  if (tf === 'weekly') return !weekend && !(n.wd === 'Fri' && afterClose);
  if (tf === 'monthly') {
    const lastDay = new Date(Date.UTC(n.y, n.m, 0));
    while ([0, 6].includes(lastDay.getUTCDay())) lastDay.setUTCDate(lastDay.getUTCDate() - 1);
    return !(n.d > lastDay.getUTCDate() || (n.d === lastDay.getUTCDate() && afterClose));
  }
  return !weekend && n.mins >= 9 * 60 + 30 && !afterClose;
}
function flagFor(timeframe: string | undefined, stored?: string) {
  const tf = timeframe || 'daily';
  if (stored && !/close pending/i.test(stored)) return stored;
  if (tf === 'daily' && !stored) return undefined;
  return closePending(tf) ? `${cap(tf)} close pending` : undefined;
}

const Flag: React.FC<{ text?: string; keyFlag?: boolean }> = ({ text, keyFlag }) =>
  text ? <span className={`flag${keyFlag ? ' key' : ''}`}>{text}</span> : null;

// ── Expanded detail: either direction ("both") ──

const DetailBoth: React.FC<{ s: PatternStock; st: Status }> = ({ s, st }) => {
  const tf = s.timeframe || 'daily';
  if (s.breakUp == null || s.breakDown == null || s.goalUp == null || s.goalDown == null) {
    // Pending with no clear pattern yet: just the candles.
    return (
      <div className="detail" style={{ '--tone': 'var(--wait)' } as React.CSSProperties}>
        <div className="dhead"><Pill st={st} /><span>{s.pattern} · {cap(tf)} chart</span></div>
        <AutoNote on={s.auto} />
        <SetupChart ticker={s.ticker} timeframe={tf} levels={[]} />
        {s.note && <p className="note">{s.note}</p>}
      </div>
    );
  }
  const rungs: Rung[] = [
    { k: 'Goal up', cls: 'k-tgt', v: s.goalUp!, p: true },
    { k: 'Breaks up', cls: 'k-tgt', v: s.breakUp!, p: true },
    { k: 'Now', cls: '', v: s.price, now: true },
    { k: 'Breaks down', cls: 'k-inv', v: s.breakDown!, p: true },
    { k: 'Goal down', cls: 'k-tgt', pcls: 'k-inv', v: s.goalDown!, p: true },
  ];
  return (
    <div className="detail" style={{ '--tone': 'var(--wait)' } as React.CSSProperties}>
      <div className="dhead"><Pill st={st} /><span>{s.pattern} · {cap(tf)} chart · Either direction</span><Flag text={flagFor(tf, s.flag)} /></div>
      <AutoNote on={s.auto} />
      {s.stage === 'update' && <UpdateBanner note={s.updateNote} />}
      <div className="stepper" aria-label="Pattern stage">
        {['Forming', 'Signal', 'Confirmed', 'Target'].map((l, i) => (
          <div key={l} className={`step ${i === 0 ? 'now' : ''}`}><i></i><span>{l}</span></div>
        ))}
      </div>
      <SetupChart ticker={s.ticker} timeframe={tf} lines={s.lines} levels={[
        { price: s.goalUp!, label: 'Goal up', tone: 'up' },
        { price: s.breakUp!, label: 'Breaks up', tone: 'up' },
        { price: s.breakDown!, label: 'Breaks down', tone: 'down' },
        { price: s.goalDown!, label: 'Goal down', tone: 'up' },
      ]} />
      <PricesRules>
      <div>
        <h3>Prices that matter</h3>
        <Ladder rungs={rungs} price={s.price} priceDate={s.priceDate} />
        <p className="note">Latest close {fmt(s.price)} on {day(s.priceDate)}. Goals are projections, not promises.</p>
      </div>
      <div>
        <h3>Rules</h3>
        <ul className="rules" style={{ color: 'var(--fg)' }}>
          <li><Icon name="up" color="var(--up)" /><span><b>Breaks up:</b> a completed {tf} close above {fmt(s.breakUp!)} starts a signal.</span></li>
          <li><Icon name="down" color="var(--down)" /><span><b>Breaks down:</b> a completed {tf} close below {fmt(s.breakDown!)} starts a signal.</span></li>
          <li><Icon name="check" color="var(--muted)" /><span><b>Confirms:</b> a later completed {tf} close beyond that signal candle's extreme.</span></li>
        </ul>
        {s.note && <p className="thesis">{s.note}</p>}
      </div>
      </PricesRules>
    </div>
  );
};

// ── Expanded detail: second timeframe / opposing setup ──

const AltBlock: React.FC<{ s: PatternStock; a: PatternAltSetup }> = ({ s, a: raw }) => {
  if (raw.direction === 'both') {
    // Either-direction second setup: same panel as a main one, on its own timeframe.
    const view = { ...raw, ticker: s.ticker, name: s.name, price: s.price, priceDate: s.priceDate,
                   pattern: raw.pattern ?? s.pattern } as PatternStock;
    return <div className="altwrap"><DetailBoth s={view} st={status(raw)} /></div>;
  }
  const a = asPrev(raw) as PatternAltSetup & { invalidation: number; target: number };
  const st = status(raw), up = a.direction === 'up', hit = a.stage === 'target';
  const tone = up ? 'var(--up)' : 'var(--down)', tf = a.timeframe, T = cap(tf);
  const side = up ? 'above' : 'below';
  const rungs = ([
    { k: hit ? 'Reached' : 'Target', cls: 'k-tgt', pcls: a.target < s.price ? 'k-inv' : 'k-tgt', v: a.target, p: !hit },
    a.stage === 'forming' && a.signal != null ? { k: 'Signal ' + side, cls: up ? 'k-tgt' : 'k-inv', v: a.signal, p: true } : null,
    a.confirm != null ? { k: (a.stage === 'signal' ? 'Confirm ' : 'Confirmed ') + side, cls: 'k-lvl', v: a.confirm } : null,
    { k: 'Now', cls: '', v: s.price, now: true },
    { k: 'Invalidation', cls: 'k-inv', v: a.invalidation, p: true },
  ].filter(Boolean) as Rung[]).sort((x, y) => y.v - x.v);
  const confirming = a.stage === 'forming' || a.stage === 'signal';
  return (
    <div className="altwrap" style={{ '--tone': tone } as React.CSSProperties}>
      {s.keyLevel && (
        <div className="callout">
          <div className="cl-k">Key level <b className="num">{fmt(s.keyLevel.price)}</b> <span>{pct(s.price, s.keyLevel.price)} from now</span></div>
          <p>{s.keyLevel.text}</p>
        </div>
      )}
      <div className="dhead"><Pill st={st} /><span>{a.pattern ? a.pattern + ' · ' : ''}{T} chart{a.stageDate ? ' · ' + day(a.stageDate) : ''}</span><Flag text={flagFor(a.timeframe, a.flag)} /></div>
      <Agreement agree={raw.agree} />
      <AutoNote on={raw.auto} />
      {raw.stage === 'update' && <UpdateBanner note={raw.updateNote} />}
      <SetupChart ticker={s.ticker} timeframe={tf} lines={a.lines} {...chartSpec(a)} />
      <PricesRules label={`${T} prices & rules`}>
        <div><h3>{T} prices</h3><Ladder rungs={rungs} price={s.price} priceDate={s.priceDate} /></div>
        <div>
          <h3>{T} rules</h3>
          <ul className="rules">
            {a.signal != null && <li><Icon name={up ? 'up' : 'down'} color={tone} /><span><b>Signal:</b> a completed {tf} close {side} {fmt(a.signal)}.</span></li>}
            <li><Icon name="check" color={tone} /><span><b>{confirming ? 'Confirms' : 'Confirmed'}:</b> {a.confirm != null
              ? `a later completed ${tf} close ${side} ${fmt(a.confirm)}, beyond the signal candle's ${up ? 'high' : 'low'}.`
              : `a later completed ${tf} close beyond that signal candle's ${up ? 'high' : 'low'}.`}</span></li>
            {hit
              ? <li><Icon name="target" color="var(--up)" /><span><b>Reached:</b> {fmt(a.target)} was hit. A completed move, not a new entry.</span></li>
              : <li><Icon name="target" color={tone} /><span><b>Target:</b> projected move to {fmt(a.target)}, {pct(s.price, a.target)} from the latest close.</span></li>}
            {!hit && <li><Icon name="x" color="var(--down)" /><span><b>Fails:</b> {a.failRule || `a completed ${tf} close back inside the broken boundary, ${up ? 'below' : 'above'} ${fmt(a.invalidation)}.`}</span></li>}
          </ul>
          {a.note && <p className="thesis">{a.note}</p>}
        </div>
      </PricesRules>
    </div>
  );
};

const HistBlock: React.FC<{ s: PatternStock }> = ({ s }) => (
  <div className="hist">
    <h3>History</h3>
    {s.history!.map((h, i) => (
      <div key={i} className="hrow">
        <span className="pill st-fail"><Icon name="target" />{h.stage === 'target' ? 'Target hit' : cap(h.stage)}</span>
        <span className="hmeta">{h.pattern} · {cap(h.timeframe)} · {h.direction === 'down' ? 'Downward' : 'Upward'} break · {day(h.stageDate)}</span>
        <span className="hnums num">Confirmed {h.direction === 'down' ? 'below' : 'above'} {fmt(h.confirm)} → reached {fmt(h.target)}</span>
        {h.note && <p>{h.note}</p>}
      </div>
    ))}
  </div>
);

// ── Expanded detail: single-direction setup ──

const Detail: React.FC<{ s: PatternStock; st: Status }> = ({ s: raw, st }) => {
  if (raw.direction === 'both') return <DetailBoth s={raw} st={st} />;
  const s = asPrev(raw);
  const dn = s.direction === 'down';
  const tone = s.stage === 'failed' ? 'var(--fail)' : (dn ? 'var(--down)' : 'var(--up)');
  const hasSig = s.signal != null;
  const SL = hasSig ? ['Forming', 'Signal', 'Confirmed', 'Target'] : ['Forming', 'Confirmed', 'Target'];
  const SK: PatternStage[] = hasSig ? STAGES : ['forming', 'confirmed', 'target'];
  const idx = s.stage === 'failed' ? -1 : SK.indexOf(s.stage === 'signal' && !hasSig ? 'forming' : s.stage);
  const pending = s.stage === 'forming' || s.stage === 'signal';
  const target = s.target!, invalidation = s.invalidation!;

  const rungs = ([
    { k: 'Invalidation', cls: 'k-inv', v: invalidation, p: true },
    hasSig ? { k: 'Signal ' + (dn ? 'below' : 'above'), cls: s.stage === 'forming' ? (dn ? 'k-inv' : 'k-tgt') : 'k-lvl', v: s.signal!, p: s.stage === 'forming' } : null,
    s.confirm != null ? { k: (pending ? 'Confirm ' : 'Confirmed ') + (dn ? 'below' : 'above'), cls: pending ? (dn ? 'k-inv' : 'k-tgt') : 'k-lvl', v: s.confirm, p: pending } : null,
    { k: 'Now', cls: '', v: s.price, now: true },
    { k: s.stage === 'target' ? 'Reached' : 'Target', cls: 'k-tgt', pcls: target < s.price ? 'k-inv' : 'k-tgt', v: target, p: s.stage !== 'target' },
  ].filter(Boolean) as Rung[]).sort((a, b) => b.v - a.v);

  const sideWord = dn ? 'below' : 'above', backWord = dn ? 'above' : 'below', tf = s.timeframe || 'daily';
  const reached = (i: number) => s.stage !== 'failed' && idx >= i;

  return (
    <div className="detail" style={{ '--tone': tone } as React.CSSProperties}>
      <div className="dhead"><Pill st={st} /><span>{s.pattern} · {cap(tf)} chart{s.stageDate ? ' · ' + day(s.stageDate) : ''}</span><Flag text={flagFor(tf, s.flag)} /></div>
      <Agreement agree={raw.agree} />
      <AutoNote on={raw.auto} />
      {raw.stage === 'update' && <UpdateBanner note={raw.updateNote} />}
      <div className="stepper" aria-label="Pattern stage" style={{ gridTemplateColumns: `repeat(${SL.length},1fr)` }}>
        {SL.map((l, i) => {
          const c = s.stage === 'failed' ? '' : i < idx ? 'done' : i === idx ? 'now' : '';
          return (
            <div key={l} className={`step ${c}`}><i></i><span>{l}</span>{i === idx && s.stageDate && <em>{day(s.stageDate)}</em>}</div>
          );
        })}
      </div>
      <SetupChart ticker={s.ticker} timeframe={tf} lines={s.lines} {...chartSpec(s)} />
      <PricesRules>
      <div>
        <h3>Prices that matter</h3>
        <Ladder rungs={rungs} price={s.price} priceDate={s.priceDate} />
        <p className="note">Latest close {fmt(s.price)} on {day(s.priceDate)}. Target is a projection, not a promise.</p>
      </div>
      <div>
        <h3>Rules</h3>
        <ul className="rules" style={{ color: 'var(--fg)' }}>
          {hasSig ? (
            <>
              <li className={reached(1) ? '' : 'off'}><Icon name={dn ? 'down' : 'up'} color={tone} /><span><b>Signal:</b> {s.signalRule || `a completed ${tf} close ${sideWord} ${fmt(s.signal!)}.`}</span></li>
              <li className={reached(2) ? '' : 'off'}><Icon name="check" color={tone} /><span><b>{reached(2) ? 'Confirmed' : 'Confirms'}:</b> {s.confirmRule || `a later completed ${tf} close ${sideWord} ${fmt(s.confirm!)}, beyond the signal candle's ${dn ? 'low' : 'high'}.`}</span></li>
            </>
          ) : (
            <li className={reached(1) ? '' : 'off'}><Icon name="check" color={tone} /><span><b>{reached(1) ? 'Confirmed' : 'Confirms'}:</b> a completed {tf} close {sideWord} {fmt(s.confirm!)}.</span></li>
          )}
          {s.stage === 'target' ? (
            <li><Icon name="target" color={tone} /><span><b>Reached:</b> {fmt(target)} was hit. A completed move, not a new entry.</span></li>
          ) : (
            <>
              <li><Icon name="target" color={tone} /><span><b>Target:</b> projected move to {fmt(target)}, {pct(s.price, target)} from the latest close.</span></li>
              <li><Icon name="x" color={tone} /><span><b>Fails:</b> {s.failRule || `a completed ${tf} close back inside the broken boundary, ${backWord} ${fmt(invalidation)}.`}</span></li>
            </>
          )}
        </ul>
        {s.note && <p className="thesis">{s.note}</p>}
      </div>
      </PricesRules>
      {s.alt && <AltBlock s={s} a={s.alt} />}
      {s.history && <HistBlock s={s} />}
    </div>
  );
};

// ── Rows ──

interface Row { ticker: string; name: string; setup: PatternStock | null }

const toTarget = (s: PatternStock | null) => !s ? -Infinity : s.direction === 'both' && s.goalUp == null ? -Infinity : s.direction === 'both'
  ? Math.max(Math.abs(pct0(s.price, s.goalUp!)), Math.abs(pct0(s.price, s.goalDown!)))
  : Math.abs(pct0(s.price, s.target!));

const readPref = (key: string, fallback: string) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};
const writePref = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable — non-fatal */ }
};

const LedgerRow: React.FC<{ row: Row; hasPage: boolean; onOpenPage: (ticker: string) => void }> = ({ row, hasPage, onOpenPage }) => {
  const [open, setOpen] = useState(false);
  const s = row.setup, st = status(s), id = 'd-' + row.ticker;
  const toggle = () => setOpen(o => !o);
  const dash = <span className="lvl"><b className="faintb">—</b></span>;

  let levels: React.ReactNode;
  if (!s || (s.direction === 'both' && s.goalUp == null)) {
    levels = <>{dash}{dash}</>;
  } else if (s.direction === 'both') {
    levels = (
      <>
        <span className="lvl two"><b className="k-tgt">↑{fmt(s.goalUp!)}</b><b className="k-inv">↓{fmt(s.goalDown!)}</b></span>
        <span className="lvl"><small>no side yet</small><b className="faintb">—</b></span>
      </>
    );
  } else {
    const tCls = s.target! < s.price ? 'k-inv' : 'k-tgt';
    levels = (
      <>
        <span className="lvl"><small className={tCls}>{pct(s.price, s.target!)}</small><b className={tCls}>{fmt(s.target!)}</b></span>
        <span className="lvl"><small className="k-inv">{pct(s.price, s.invalidation!)}</small><b>{fmt(s.invalidation!)}</b></span>
      </>
    );
  }

  return (
    <div className="item">
      <div
        className="row-btn"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        onKeyDown={e => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        }}
      >
        <span className="tk">
          {/* Only the ticker itself opens the valuation page; the rest of the row expands. */}
          {hasPage ? (
            <button
              type="button"
              className="tk-link"
              title={`Open ${row.ticker} valuation`}
              onClick={e => { e.stopPropagation(); onOpenPage(row.ticker); }}
            >
              <b>{row.ticker}</b>
            </button>
          ) : <b>{row.ticker}</b>}
          {(s?.auto || s?.alt?.auto) && <i className="auto-dot" title="Auto-detected: check by hand" aria-label="Auto-detected" />}
          <span>{row.name}</span>
        </span>
        <span className="stcell">
          <span className={`pill ${st.cls}`} title={st.label}>
            <Icon name={!s ? 'dash' : s.stage === 'update' ? 'refresh' : s.direction === 'both' ? 'clock' : s.direction === 'down' ? 'down' : 'up'} />{st.short}
          </span>
        </span>
        <span className="meta">
          {s && <span className="txt">{s.pattern} · {cap(s.timeframe || 'daily')}</span>}
          <Flag text={s ? flagFor(s.timeframe, s.flag) : undefined} />
          <Flag text={s?.tag} keyFlag />
          {s?.agree && s.agree.n > 1 && <span className="flag agree" title="Stored setups pointing to a similar target">{s.agree.n} agree</span>}
        </span>
        {levels}
        <Chev />
      </div>
      <div id={id} hidden={!open}>
        {open && (s
          ? <Detail s={s} st={st} />
          : <div className="empty-detail">No trading setup tracked for {row.ticker} yet.</div>)}
      </div>
    </div>
  );
};

// ── Page ──

interface PatternWatchlistProps {
  tickers: Record<string, TickerDefinition>;
  onOpenStock: (ticker: string) => void;
  headerControls?: React.ReactNode;
}

const PatternWatchlist: React.FC<PatternWatchlistProps> = ({ tickers, onOpenStock, headerControls }) => {
  const [filter, setFilter] = useState<string>(() => readPref('pbw-filter', 'all'));
  const [sortBy, setSortBy] = useState<'default' | 'target'>(() => readPref('pbw-sort', 'default') === 'target' ? 'target' : 'default');
  const [query, setQuery] = useState('');

  // Pattern stocks first (in curated order), then every covered stock that has no setup yet.
  const allRows = useMemo<Row[]>(() => {
    const seen = new Set(PATTERN_STOCKS.map(s => s.ticker));
    const withSetup = PATTERN_STOCKS.map(s => ({ ticker: s.ticker, name: tickers[s.ticker]?.name ?? s.name, setup: s }));
    const missing = (Object.values(tickers) as TickerDefinition[])
      .filter(t => !seen.has(t.ticker))
      .sort((a, b) => a.ticker.localeCompare(b.ticker))
      .map(t => ({ ticker: t.ticker, name: t.name, setup: null }));
    return [...withSetup, ...missing];
  }, [tickers]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allRows.length };
    allRows.forEach(r => { const g = status(r.setup).group; c[g] = (c[g] || 0) + 1; });
    return c;
  }, [allRows]);

  const activeFilter = filter === 'all' || counts[filter] ? filter : 'all';

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = allRows.filter(r =>
      (activeFilter === 'all' || status(r.setup).group === activeFilter) &&
      (!q || r.ticker.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)));
    if (sortBy === 'target') out.sort((a, b) => toTarget(b.setup) - toTarget(a.setup));
    return out;
  }, [allRows, activeFilter, query, sortBy]);

  const asOf = useMemo(() => PATTERN_STOCKS.map(s => s.priceDate).sort().pop(), []);

  return (
    <div className="pbw">
      <div className="wrap">
        <header>
          <div>
            {asOf && <div className="asof">Prices as of {day(asOf)}</div>}
          </div>
          {headerControls && <div className="hdr-ctl">{headerControls}</div>}
        </header>

        <div className="tools">
          <div className="summary" role="group" aria-label="Filter by status">
            {GROUPS.map(([k, l]) => {
              const n = counts[k] || 0;
              if (k !== 'all' && !n) return null;
              return (
                <button key={k} className="chip" aria-pressed={activeFilter === k}
                  onClick={() => { setFilter(k); writePref('pbw-filter', k); }}>
                  {l}<span className="n">{n}</span>
                </button>
              );
            })}
            <button className="chip pctchip" aria-pressed={sortBy === 'target'} title="Sort by highest % to target"
              onClick={() => { const next = sortBy === 'target' ? 'default' : 'target'; setSortBy(next); writePref('pbw-sort', next); }}>
              %<span className="n">{sortBy === 'target' ? '↓' : ''}</span>
            </button>
          </div>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search ticker or company" aria-label="Search ticker or company" />
        </div>

        <div className="ledger">
          <div className="head" aria-hidden="true">
            <span>Stock</span><span>Status</span><span className="pc">Pattern</span><span className="r">Target</span><span className="r">Invalidation</span><span></span>
          </div>
          <div className="rows">
            {rows.length === 0
              ? <div className="empty">No stocks match this filter.</div>
              : rows.map(r => <LedgerRow key={r.ticker} row={r} hasPage={!!tickers[r.ticker]} onOpenPage={onOpenStock} />)}
          </div>
        </div>

        <p className="foot">Percentages are measured from the latest close shown for each stock. Targets are projections, not promises. Nothing here is financial advice.</p>
      </div>
    </div>
  );
};

export default PatternWatchlist;
