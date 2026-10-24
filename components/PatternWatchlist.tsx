import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TickerDefinition } from '../types';
import { PATTERN_STOCKS, PatternStock, PatternAltSetup, PatternHistoryEntry, PatternStage, PatternAgree, PatternDirection } from '../data/patternWatchlist';
import SetupChart, { ChartLevel, ChartMarker } from './SetupChart';
import './PatternWatchlist.css';

// Home page: one scannable ledger of tickers. Clicking the ticker opens the
// stock's valuation page; clicking anywhere else on the row unfolds its
// trading setups — every setup tracked on the stock listed on the left, the
// selected one's chart, stage and rules on the right. Stocks we cover that
// have no pattern data yet are listed with empty fields.

const STAGES: PatternStage[] = ['forming', 'signal', 'confirmed', 'target'];
export const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const pct0 = (from: number, to: number) => (to - from) / from * 100;
export const pct = (from: number, to: number) => { const p = pct0(from, to); return (p > 0 ? '+' : '') + p.toFixed(1) + '%'; };
export const day = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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

// Momentum: a lightning bolt, used on the sort control and the row badge.
const Bolt = () => (
  <svg className="bolt" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9 1.5 3.5 9.2h3.3L7 14.5 12.5 6.8H9.2L9 1.5Z" fill="currentColor" /></svg>
);

const Cross = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m6 6 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

type Group = 'confirmed' | 'pending' | 'update' | 'target' | 'failed' | 'none';
// `mid` sits between `short` (ledger pill) and `label` (panel heading): it names
// the direction without the sentence, for the setup cards in the expanded row.
export interface Status { label: string; mid: string; short: string; cls: string; icon: IconName; group: Group }

export function status(s: { direction: string; stage: PatternStage } | null): Status {
  if (!s) return { label: 'No pattern data yet', mid: 'No data', short: 'No data', cls: 'st-fail', icon: 'dash', group: 'none' };
  const dn = s.direction === 'down', word = dn ? 'Downward' : 'Upward', side = dn ? 'Down' : 'Up';
  const tone = dn ? 'st-down' : 'st-up';
  switch (s.stage) {
    case 'forming':   return { label: 'Waiting for a break', mid: 'Forming', short: 'Waiting', cls: 'st-wait', icon: 'clock', group: 'pending' };
    case 'signal':    return { label: `${word} break pending`, mid: `${side} pending`, short: 'Pending', cls: 'st-wait', icon: dn ? 'down' : 'up', group: 'pending' };
    case 'confirmed': return { label: `${word} break confirmed`, mid: `${side} confirmed`, short: 'Confirmed', cls: tone, icon: 'check', group: 'confirmed' };
    // A confirmed break back on its boundary: still confirmed, grouped and coloured as such.
    case 'retest':    return { label: 'Retest in progress', mid: `${side} retest`, short: 'Retest', cls: tone, icon: 'check', group: 'confirmed' };
    case 'target':    return { label: 'Target reached', mid: 'Target hit', short: 'Target hit', cls: tone, icon: 'target', group: 'target' };
    case 'failed':    return { label: 'Pattern failed', mid: 'Failed', short: 'Failed', cls: 'st-fail', icon: 'x', group: 'failed' };
    case 'update':    return { label: 'Needs updating', mid: 'Needs update', short: 'Update', cls: 'st-upd', icon: 'refresh', group: 'update' };
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
  if (s.target != null) levels.push({ price: s.target, label: s.stage === 'target' ? 'Reached' : 'Target', tone: 'target' });
  if (s.confirm != null) levels.push({ price: s.confirm, label: 'Confirm', tone: dn ? 'down' : 'up' });
  if (s.signal != null) levels.push({ price: s.signal, label: 'Signal', tone: 'muted' });
  if (s.invalidation != null) levels.push({ price: s.invalidation, label: 'Invalidation', tone: 'down', solid: true });
  const word: Partial<Record<PatternStage, string>> = { signal: 'Signal', confirmed: 'Confirmed', target: 'Target' };
  const marker: ChartMarker | undefined = s.stageDate && word[s.stage]
    ? { date: s.stageDate, text: word[s.stage]!, tone: dn ? 'down' : 'up', above: dn }
    : undefined;
  return { levels, marker };
}

// Prices & Rules open in a dialog from the panel header, so the numbers are a
// click away without pushing the chart down the page.
const PricesRules: React.FC<{ label?: string; children: React.ReactNode }> = ({ label = 'Prices & Rules', children }) => {
  const [open, setOpen] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    card.current?.focus();
    // Capture phase: Escape closes this dialog without also closing the row behind it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  // Into the .pbw root rather than <body>: the dialog keeps the page's theme
  // variables, and sits outside the ledger's clipped box.
  const host = typeof document === 'undefined' ? null : document.querySelector('.pbw');

  return (
    <>
      <button ref={trigger} type="button" className="pr-btn" aria-haspopup="dialog"
        onClick={e => { e.stopPropagation(); setOpen(true); }}>
        Prices &amp; rules
      </button>
      {open && host && createPortal(
        <div className="pr-modal" onClick={() => setOpen(false)}>
          <div ref={card} className="pr-card" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
            onClick={e => e.stopPropagation()}>
            <div className="pr-top">
              <h2>{label}</h2>
              <button type="button" className="pr-done" onClick={() => setOpen(false)}>Done</button>
            </div>
            <div className="pr-grid">{children}</div>
          </div>
        </div>, host)}
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

// `text` overrides the sentence-long label for narrow layouts (the landing
// page's weekday columns pass st.mid).
export const Pill: React.FC<{ st: Status; text?: string }> = ({ st, text }) => (
  <span className={`pill ${st.cls}`}><Icon name={st.icon} />{text ?? st.label}</span>
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

/** How far price has retraced back past the level that confirmed the break, as a %, or null.
 *
 *  A confirmed break only *fails* on a close past invalidation plus a follow-through close,
 *  and on a wide pattern that level can sit 50-90% away -- so a break can give back
 *  everything it gained and still read "Break confirmed". A third of the confirmed setups
 *  on the ledger are in that state. This says so on the row; it changes no stage and no
 *  level, and the setup is still the one the rules say it is. */
export function undoneBy(
  a: { direction: string; stage: PatternStage; confirm?: number } | null | undefined,
  price?: number,
): number | null {
  if (!a || price == null || a.confirm == null) return null;
  if (a.stage !== 'confirmed' && a.stage !== 'retest') return null;
  if (a.direction !== 'up' && a.direction !== 'down') return null;
  const past = a.direction === 'up' ? a.confirm - price : price - a.confirm;
  return past > 0 ? (past / a.confirm) * 100 : null;
}

const Undone: React.FC<{ pct: number | null; tf?: string }> = ({ pct, tf }) =>
  pct == null ? null : (
    <span
      className="flag undone"
      title={`Price has given back the whole break — it sits ${pct.toFixed(1)}% back past the ${tf || 'daily'} close that confirmed it. The setup has not formally failed, but it is not working.`}
    >
      Break undone {pct.toFixed(0)}%
    </span>
  );

// ── Expanded row: the stock's setups on the left, the selected one on the right ──

// Main setup and alt setups share these fields; the main one also carries
// hand-written signal / confirm rules.
type AnySetup = PatternAltSetup & { signalRule?: string; confirmRule?: string };

const PanelHead: React.FC<{
  s: PatternStock; st: Status; pattern: string; tf: string; date?: string; extra?: string; flag?: string;
  undone?: number | null; right?: React.ReactNode;
}> = ({ s, st, pattern, tf, date, extra, flag, undone, right }) => (
  <div className="ptop">
  <div className="phead">
    <div className="ph-top"><b className="ph-tk">{s.ticker}</b><span className="ph-name">{s.name}</span></div>
    <div className={`ph-st ${st.cls}`}><Icon name={st.icon} />{st.label}</div>
    <div className="ph-sub">
      {pattern} · {cap(tf)} chart{date ? ` · ${day(date)}` : ''}{extra ? ` · ${extra}` : ''}
    </div>
    <Flag text={flag} />
    <Undone pct={undone ?? null} tf={tf} />
  </div>
  {right}
  </div>
);

// ── Panel: either-direction setup ("both") ──

const BothBody: React.FC<{ s: PatternStock; a: AnySetup; st: Status }> = ({ s, a, st }) => {
  const tf = a.timeframe || 'daily';
  const pattern = a.pattern ?? s.pattern;
  if (a.breakUp == null || a.breakDown == null || a.goalUp == null || a.goalDown == null) {
    // Pending with no clear pattern yet: just the candles.
    return (
      <div className="detail" style={{ '--tone': 'var(--wait)' } as React.CSSProperties}>
        <PanelHead s={s} st={st} pattern={pattern} tf={tf} flag={flagFor(tf, a.flag)} />
        <AutoNote on={a.auto} />
        <SetupChart ticker={s.ticker} timeframe={tf} levels={[]} />
        {a.note && <p className="note">{a.note}</p>}
      </div>
    );
  }
  const rungs: Rung[] = [
    { k: 'Goal up', cls: 'k-tgt', v: a.goalUp!, p: true },
    { k: 'Breaks up', cls: 'k-tgt', v: a.breakUp!, p: true },
    { k: 'Now', cls: '', v: s.price, now: true },
    { k: 'Breaks down', cls: 'k-inv', v: a.breakDown!, p: true },
    { k: 'Goal down', cls: 'k-tgt', pcls: 'k-inv', v: a.goalDown!, p: true },
  ];
  return (
    <div className="detail" style={{ '--tone': 'var(--wait)' } as React.CSSProperties}>
      <PanelHead s={s} st={st} pattern={pattern} tf={tf} extra="Either direction" flag={flagFor(tf, a.flag)}
        right={<PricesRules label={`${cap(tf)} prices & rules`}>
      <div>
        <h3>Prices that matter</h3>
        <Ladder rungs={rungs} price={s.price} priceDate={s.priceDate} />
        <p className="note">Latest close {fmt(s.price)} on {day(s.priceDate)}. Goals are projections, not promises.</p>
      </div>
      <div>
        <h3>Rules</h3>
        <ul className="rules" style={{ color: 'var(--fg)' }}>
          <li><Icon name="up" color="var(--up)" /><span><b>Breaks up:</b> a completed {tf} close above {fmt(a.breakUp!)} starts a signal.</span></li>
          <li><Icon name="down" color="var(--down)" /><span><b>Breaks down:</b> a completed {tf} close below {fmt(a.breakDown!)} starts a signal.</span></li>
          <li><Icon name="check" color="var(--muted)" /><span><b>Confirms:</b> a later completed {tf} close beyond that signal candle's extreme.</span></li>
        </ul>
        {a.note && <p className="thesis">{a.note}</p>}
      </div>
        </PricesRules>} />
      <Agreement agree={a.agree} />
      <AutoNote on={a.auto} />
      {a.stage === 'update' && <UpdateBanner note={a.updateNote} />}
      <div className="stepper" aria-label="Pattern stage">
        {['Forming', 'Signal', 'Confirmed', 'Target'].map((l, i) => (
          <div key={l} className={`step ${i === 0 ? 'now' : ''}`}><i></i><span>{l}</span></div>
        ))}
      </div>
      <SetupChart ticker={s.ticker} timeframe={tf} lines={a.lines} levels={[
        { price: a.goalUp!, label: 'Goal up', tone: 'target' },
        { price: a.breakUp!, label: 'Breaks up', tone: 'up' },
        { price: a.breakDown!, label: 'Breaks down', tone: 'down' },
        { price: a.goalDown!, label: 'Goal down', tone: 'target' },
      ]} />
    </div>
  );
};

// ── Panel: single-direction setup ──

const DirBody: React.FC<{ s: PatternStock; a: AnySetup; st: Status }> = ({ s, a: raw, st }) => {
  const a = asPrev(raw);
  const dn = a.direction === 'down';
  const tone = a.stage === 'failed' ? 'var(--fail)' : (dn ? 'var(--down)' : 'var(--up)');
  const hasSig = a.signal != null;
  const SL = hasSig ? ['Forming', 'Signal', 'Confirmed', 'Target'] : ['Forming', 'Confirmed', 'Target'];
  const SK: PatternStage[] = hasSig ? STAGES : ['forming', 'confirmed', 'target'];
  // A retest sits on the Confirmed node of the rail -- it is the break being tested, not a step past it.
  const railStage = a.stage === 'retest' ? 'confirmed' : a.stage === 'signal' && !hasSig ? 'forming' : a.stage;
  const idx = a.stage === 'failed' ? -1 : SK.indexOf(railStage);
  const pending = a.stage === 'forming' || a.stage === 'signal';
  const target = a.target!, invalidation = a.invalidation!;
  const tf = a.timeframe || 'daily', T = cap(tf);
  const pattern = a.pattern ?? s.pattern;

  const rungs = ([
    { k: 'Invalidation', cls: 'k-inv', v: invalidation, p: true },
    hasSig ? { k: 'Signal ' + (dn ? 'below' : 'above'), cls: a.stage === 'forming' ? (dn ? 'k-inv' : 'k-tgt') : 'k-lvl', v: a.signal!, p: a.stage === 'forming' } : null,
    a.confirm != null ? { k: (pending ? 'Confirm ' : 'Confirmed ') + (dn ? 'below' : 'above'), cls: pending ? (dn ? 'k-inv' : 'k-tgt') : 'k-lvl', v: a.confirm, p: pending } : null,
    { k: 'Now', cls: '', v: s.price, now: true },
    { k: a.stage === 'target' ? 'Reached' : 'Target', cls: 'k-tgt', pcls: target < s.price ? 'k-inv' : 'k-tgt', v: target, p: a.stage !== 'target' },
  ].filter(Boolean) as Rung[]).sort((x, y) => y.v - x.v);

  const sideWord = dn ? 'below' : 'above', backWord = dn ? 'above' : 'below';
  const reached = (i: number) => a.stage !== 'failed' && idx >= i;

  return (
    <div className="detail" style={{ '--tone': tone } as React.CSSProperties}>
      <PanelHead s={s} st={st} pattern={pattern} tf={tf} date={a.stageDate} flag={flagFor(tf, a.flag)}
        undone={undoneBy(a, s.price)}
        right={<PricesRules label={`${T} prices & rules`}>
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
              <li className={reached(1) ? '' : 'off'}><Icon name={dn ? 'down' : 'up'} color={tone} /><span><b>Signal:</b> {a.signalRule || `a completed ${tf} close ${sideWord} ${fmt(a.signal!)}.`}</span></li>
              <li className={reached(2) ? '' : 'off'}><Icon name="check" color={tone} /><span><b>{reached(2) ? 'Confirmed' : 'Confirms'}:</b> {a.confirmRule || (a.confirm != null
                ? `a later completed ${tf} close ${sideWord} ${fmt(a.confirm)}, beyond the signal candle's ${dn ? 'low' : 'high'}.`
                : `a later completed ${tf} close beyond that signal candle's ${dn ? 'low' : 'high'}.`)}</span></li>
            </>
          ) : (
            <li className={reached(1) ? '' : 'off'}><Icon name="check" color={tone} /><span><b>{reached(1) ? 'Confirmed' : 'Confirms'}:</b> a completed {tf} close {sideWord} {fmt(a.confirm!)}.</span></li>
          )}
          {a.stage === 'target' ? (
            <li><Icon name="target" color={tone} /><span><b>Reached:</b> {fmt(target)} was hit. A completed move, not a new entry.</span></li>
          ) : (
            <>
              <li><Icon name="target" color={tone} /><span><b>Target:</b> projected move to {fmt(target)}, {pct(s.price, target)} from the latest close.</span></li>
              <li><Icon name="x" color={tone} /><span><b>Fails:</b> {a.failRule || `a completed ${tf} close back inside the broken boundary, ${backWord} ${fmt(invalidation)}.`}</span></li>
            </>
          )}
        </ul>
        {a.note && <p className="thesis">{a.note}</p>}
      </div>
        </PricesRules>} />
      <Agreement agree={raw.agree} />
      <AutoNote on={raw.auto} />
      {raw.stage === 'update' && <UpdateBanner note={raw.updateNote} />}
      <div className="stepper" aria-label="Pattern stage" style={{ gridTemplateColumns: `repeat(${SL.length},1fr)` }}>
        {SL.map((l, i) => {
          const c = a.stage === 'failed' ? '' : i < idx ? 'done' : i === idx ? 'now' : '';
          return (
            <div key={l} className={`step ${c}`}><i></i><span>{l}</span>{i === idx && a.stageDate && <em>{day(a.stageDate)}</em>}</div>
          );
        })}
      </div>
      <SetupChart ticker={s.ticker} timeframe={tf} lines={a.lines} {...chartSpec(a)} />
    </div>
  );
};

// ── Panel: a finished setup from the stock's history ──

const HistPanel: React.FC<{ s: PatternStock; h: PatternHistoryEntry; st: Status }> = ({ s, h, st }) => (
  <div className="detail" style={{ '--tone': h.direction === 'down' ? 'var(--down)' : 'var(--up)' } as React.CSSProperties}>
    <PanelHead s={s} st={st} pattern={h.pattern} tf={h.timeframe} date={h.stageDate}
      extra={`${h.direction === 'down' ? 'Downward' : 'Upward'} break`} />
    <SetupChart ticker={s.ticker} timeframe={h.timeframe} {...chartSpec(h)} />
    <p className="hnums num">Confirmed {h.direction === 'down' ? 'below' : 'above'} {fmt(h.confirm)} → reached {fmt(h.target)}</p>
    {h.note && <p className="thesis">{h.note}</p>}
  </div>
);

// ── Left pane: every setup tracked on this stock ──

type Entry =
  | { kind: 'setup'; key: string; a: AnySetup; st: Status; pattern: string; tf: string; auto?: boolean }
  | { kind: 'hist'; key: string; h: PatternHistoryEntry; st: Status; pattern: string; tf: string; auto?: boolean };

// Setups shown per timeframe in the left list. The data stores up to 5 per timeframe and
// public/setups/TICKER.json carries all of them, so this can be raised on its own.
const MAX_PER_TF = 3;

// Daily RSI-14 regime, the same thresholds the scripts use (pattern_watchlist.RSI_BULL/BEAR).
// Cardwell's convention: an uptrend tends to hold RSI 40-80 and a downtrend 20-60, so
// clearing 60 is bullish and losing 40 bearish. RSI confirms a direction, it never sets one --
// above 60 backs a long setup and argues against a short, and below 40 the reverse.
const RSI_BULL = 60;
const RSI_BEAR = 40;

type Momentum = 'with' | 'against' | 'neutral';
const momentumOf = (rsi: number | undefined, dir: PatternDirection | undefined): Momentum => {
  if (rsi == null || (dir !== 'up' && dir !== 'down')) return 'neutral';
  if (rsi >= RSI_BULL) return dir === 'up' ? 'with' : 'against';
  if (rsi <= RSI_BEAR) return dir === 'down' ? 'with' : 'against';
  return 'neutral';
};

type Bucket = 'confirmed' | 'pending' | 'update' | 'finished';
const BUCKETS: [Bucket, string][] = [
  ['confirmed', 'Confirmed'], ['pending', 'Watching for a break'],
  ['update', 'Needs updating'], ['finished', 'Finished'],
];
const bucketOf = (g: Group): Bucket =>
  g === 'confirmed' ? 'confirmed' : g === 'update' ? 'update' : g === 'pending' || g === 'none' ? 'pending' : 'finished';

const SetupList: React.FC<{ ticker: string; entries: Entry[]; sel: string; onSel: (k: string) => void }> = ({ ticker, entries, sel, onSel }) => (
  <div className="slist">
    <div className="sl-head">Setups on {ticker} · {entries.length}</div>
    {BUCKETS.map(([b, title]) => {
      const items = entries.filter(e => bucketOf(e.st.group) === b);
      if (!items.length) return null;
      return (
        <div key={b} className="sl-group">
          <div className="sl-gh"><Icon name={items[0].st.icon} />{title} · {items.length}</div>
          {items.map(e => (
            <button key={e.key} type="button" className={`sl-card${sel === e.key ? ' on' : ''}`}
              aria-pressed={sel === e.key} onClick={() => onSel(e.key)}>
              <span className="sl-r1">
                <b>{ticker}</b>
                {e.auto && <i className="auto-dot" title="Auto-detected: check by hand" />}
                <span className="sl-tf">{cap(e.tf)}</span>
                <Chev />
              </span>
              <span className="sl-r2">
                <span className={e.st.cls}><Icon name={e.st.icon} />{e.st.mid}</span>
                <span className="sl-pat">· {e.pattern}</span>
              </span>
            </button>
          ))}
        </div>
      );
    })}
  </div>
);

// ── Expanded row ──

// A stock's extra setups are not in the bundle; vite.config.ts writes them to
// public/setups/TICKER.json and an expanded row fetches them, like the candles.
type Extra = { alt?: PatternAltSetup; more?: PatternAltSetup[] };
const extraCache = new Map<string, Extra>();

const Detail: React.FC<{ s: PatternStock; st: Status }> = ({ s, st }) => {
  // In dev the data is served unsplit, so fall back to whatever is already on `s`.
  const inline: Extra = { alt: s.alt, more: s.more };
  const [extra, setExtra] = useState<Extra>(() => extraCache.get(s.ticker) ?? inline);

  useEffect(() => {
    if (s.alt || s.more) return;                 // unsplit build: nothing to fetch
    const hit = extraCache.get(s.ticker);
    if (hit) { setExtra(hit); return; }
    let live = true;
    setExtra({});
    fetch(`${import.meta.env.BASE_URL}setups/${s.ticker}.json`)
      .then(r => (r.ok ? r.json() : {}))
      .then((d: Extra) => { extraCache.set(s.ticker, d); if (live) setExtra(d); })
      .catch(() => { /* the main setup still renders without them */ });
    return () => { live = false; };
  }, [s.ticker, s.alt, s.more]);

  const entries = useMemo<Entry[]>(() => {
    const live: Entry[] = [{
      kind: 'setup', key: 'main', a: s as AnySetup, st: status(s),
      pattern: s.pattern, tf: s.timeframe || 'daily', auto: s.auto,
    }];
    if (extra.alt) live.push({
      kind: 'setup', key: 'alt', a: extra.alt, st: status(extra.alt),
      pattern: extra.alt.pattern ?? s.pattern, tf: extra.alt.timeframe, auto: extra.alt.auto,
    });
    (extra.more ?? []).forEach((m, i) => live.push({
      kind: 'setup', key: 'm' + i, a: m, st: status(m),
      pattern: m.pattern ?? s.pattern, tf: m.timeframe, auto: m.auto,
    }));

    // more[] can repeat a setup that is already the main one or the alt.
    const seen = new Set<string>();
    const unique = live.filter(e => {
      const a = e.kind === 'setup' ? e.a : null;
      const sig = [e.pattern, e.tf, a?.direction, a?.stage, a?.confirm ?? a?.breakUp].join('|');
      return seen.has(sig) ? false : (seen.add(sig), true);
    });

    // Setups pointing the same way as the stock's own trend come first, so a
    // falling stock leads with its short setups and a rising one with its longs.
    // A 'both' setup sits between the two; on a flat or unknown trend nothing
    // is reordered and the stored order stands.
    const rank = (e: Entry) => {
      const d = e.kind === 'setup' ? e.a.direction : undefined;
      if (s.trend === 'up') return d === 'up' ? 0 : d === 'both' ? 1 : 2;
      if (s.trend === 'down') return d === 'down' ? 0 : d === 'both' ? 1 : 2;
      return 1;
    };

    const order: string[] = [];
    const byTf = new Map<string, Entry[]>();
    unique.forEach(e => {
      const k = e.tf || 'daily';
      if (!byTf.has(k)) { byTf.set(k, []); order.push(k); }
      byTf.get(k)!.push(e);
    });

    const out: Entry[] = [];
    order.forEach(tf => {
      const list = byTf.get(tf)!;
      out.push(...list
        .map((e, i) => ({ e, i, r: rank(e) }))
        .sort((a, b) => a.r - b.r || a.i - b.i)   // ties keep the stored order
        .slice(0, MAX_PER_TF)
        .map(x => x.e));
    });

    (s.history ?? []).forEach((h, i) => out.push({
      kind: 'hist', key: 'h' + i, h, st: status(h), pattern: h.pattern, tf: h.timeframe,
    }));
    return out;
  }, [s, extra]);

  const [sel, setSel] = useState(entries[0].key);
  const cur = entries.find(e => e.key === sel) ?? entries[0];

  const panel = cur.kind === 'hist'
    ? <HistPanel s={s} h={cur.h} st={cur.st} />
    : cur.a.direction === 'both'
      ? <BothBody s={s} a={cur.a} st={cur.st} />
      : <DirBody s={s} a={cur.a} st={cur.st} />;

  return (
    <div className="dsplit">
      <SetupList ticker={s.ticker} entries={entries} sel={cur.key} onSel={setSel} />
      <div className="dpanel">
        {panel}
        {s.keyLevel && (
          <div className="callout">
            <div className="cl-k">Key level <b className="num">{fmt(s.keyLevel.price)}</b> <span>{pct(s.price, s.keyLevel.price)} from now</span></div>
            <p>{s.keyLevel.text}</p>
          </div>
        )}
      </div>
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

const LedgerRow: React.FC<{ row: Row; hasPage: boolean; open: boolean; onToggle: () => void; onOpenPage: (ticker: string) => void }> = ({ row, hasPage, open, onToggle, onOpenPage }) => {
  const s = row.setup, st = status(s), id = 'd-' + row.ticker;
  const item = useRef<HTMLDivElement>(null);
  const dash = <span className="lvl"><b className="faintb">—</b></span>;

  // Opening lifts the row to the top of the screen so its panel is whole;
  // the row header then sticks there, keeping the close control in reach.
  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const id = requestAnimationFrame(() => item.current?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }));
    return () => cancelAnimationFrame(id);
  }, [open]);

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
    <div className={`item${open ? ' open' : ''}`} ref={item}>
      <div
        className="row-btn"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        onKeyDown={e => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
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
          {s?.auto && <i className="auto-dot" title="Auto-detected: check by hand" aria-label="Auto-detected" />}
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
          <Undone pct={undoneBy(s, s?.price)} tf={s?.timeframe} />
          {s?.agree && s.agree.n > 1 && <span className="flag agree" title="Stored setups pointing to a similar target">{s.agree.n} agree</span>}
          {s?.rsi != null && (() => {
            // The reading is on every row so the RSI sort reads as an order;
            // the bolt and the accent are kept for the ones momentum backs.
            const m = momentumOf(s.rsi, s.direction);
            return (
              <span className={`flag mom${m === 'with' ? '' : ' off'}`}
                title={m === 'with'
                  ? `Daily RSI ${s.rsi!.toFixed(1)} backs this ${s.direction === 'up' ? 'long' : 'short'} — actionable now`
                  : `Daily RSI ${s.rsi!.toFixed(1)}`}>
                {m === 'with' && <Bolt />}RSI {Math.round(s.rsi!)}
              </span>
            );
          })()}
        </span>
        {levels}
        {open
          ? <button type="button" className="closex" title={`Close ${row.ticker}`} aria-label={`Close ${row.ticker} setups`}
              onClick={e => { e.stopPropagation(); onToggle(); }}><Cross /></button>
          : <Chev />}
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
  /** Pre-fill the search box — the landing page links here filtered to one symbol. */
  initialQuery?: string;
}

const PatternWatchlist: React.FC<PatternWatchlistProps> = ({ tickers, onOpenStock, headerControls, initialQuery = '' }) => {
  const [filter, setFilter] = useState<string>(() => readPref('pbw-filter', 'all'));
  const [sortBy, setSortBy] = useState<'default' | 'target' | 'momentum'>(() => {
    const p = readPref('pbw-sort', 'default');
    return p === 'target' || p === 'momentum' ? p : 'default';
  });
  const [query, setQuery] = useState(initialQuery);
  // One row open at a time: opening another closes the last, so the ledger
  // never turns into a stack of panels.
  const [openTicker, setOpenTicker] = useState<string | null>(null);

  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);

  // Escape closes the open row, wherever focus happens to be.
  useEffect(() => {
    if (!openTicker) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenTicker(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openTicker]);

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
  // How many setups RSI currently backs -- shown on the momentum chip when it is off.
  const hotCount = useMemo(
    () => allRows.filter(r => momentumOf(r.setup?.rsi, r.setup?.direction) === 'with').length,
    [allRows],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = allRows.filter(r =>
      (activeFilter === 'all' || status(r.setup).group === activeFilter) &&
      (!q || r.ticker.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)));
    if (sortBy === 'target') out.sort((a, b) => toTarget(b.setup) - toTarget(a.setup));
    if (sortBy === 'momentum') {
      // Straight RSI, strongest first; stocks with no reading go last. Whether
      // momentum backs a setup's direction still shows on the row's bolt badge,
      // so the ranking stays a plain, readable number.
      out.sort((a, b) => (b.setup?.rsi ?? -1) - (a.setup?.rsi ?? -1));
    }
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
            <button className="chip momchip" aria-pressed={sortBy === 'momentum'}
              title="Sort by daily RSI, highest first. The bolt marks setups RSI backs (≥60 for a long, ≤40 for a short)"
              onClick={() => { const next = sortBy === 'momentum' ? 'default' : 'momentum'; setSortBy(next); writePref('pbw-sort', next); }}>
              <Bolt /><span className="n">{sortBy === 'momentum' ? '↓' : hotCount || ''}</span>
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
              : rows.map(r => (
                <LedgerRow key={r.ticker} row={r} hasPage={!!tickers[r.ticker]}
                  open={openTicker === r.ticker}
                  onToggle={() => setOpenTicker(t => t === r.ticker ? null : r.ticker)}
                  onOpenPage={onOpenStock} />
              ))}
          </div>
        </div>

        <p className="foot">Percentages are measured from the latest close shown for each stock. Targets are projections, not promises. Nothing here is financial advice.</p>
      </div>
    </div>
  );
};

export default PatternWatchlist;
