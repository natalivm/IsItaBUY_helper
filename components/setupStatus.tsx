// The pieces of the ledger that the landing page also renders: a setup's status, the pill
// that shows it, and the three formatters beside it.
//
// They lived in PatternWatchlist.tsx, and importing them from Landing made the ledger a
// static dependency of the landing page — so `data/patternWatchlist.ts` and the whole
// 52 KB component shipped in the first chunk however hard App tried to lazy-load the
// route ("dynamically imported ... but also statically imported", said rollup, and gave
// up on the split). Five helpers in their own module is what the split costs.
import React from 'react';
import type { PatternStage } from '../data/patternWatchlist';
import './PatternWatchlist.css';

export const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
export const pct0 = (from: number, to: number) => (to - from) / from * 100;
export const pct = (from: number, to: number) => { const p = pct0(from, to); return (p > 0 ? '+' : '') + p.toFixed(1) + '%'; };
export const day = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export type IconName = 'down' | 'up' | 'check' | 'x' | 'target' | 'clock' | 'dash' | 'refresh' | 'alert';

export const Icon: React.FC<{ name: IconName; color?: string }> = ({ name, color }) => {
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
    case 'alert':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M8 4.4v4.3" style={knock} strokeWidth="1.8" strokeLinecap="round" /><circle cx="8" cy="11.3" r="1" style={{ fill: 'var(--surface)' }} /></svg>;
    case 'refresh':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M10.9 6.2A3.3 3.3 0 0 0 5 6.6M5.1 9.8a3.3 3.3 0 0 0 5.9-.4M10.9 4.2v2h-2M5.1 11.8v-2h2" style={knock} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'dash':
      return <svg viewBox="0 0 16 16" fill="none" style={style}><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 8h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
  }
};

export type Group = 'confirmed' | 'atrisk' | 'pending' | 'update' | 'target' | 'failed' | 'none';
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
    // The first leg of the failure test has fired: its own timeframe closed back past
    // invalidation and only the follow-through close is outstanding. Amber, not red --
    // the break has not failed, and the levels and the target are unchanged.
    case 'atRisk':    return { label: 'At risk', mid: `${side} at risk`, short: 'At risk', cls: 'st-risk', icon: 'alert', group: 'atrisk' };
    case 'target':    return { label: 'Target reached', mid: 'Target hit', short: 'Target hit', cls: tone, icon: 'target', group: 'target' };
    case 'failed':    return { label: 'Pattern failed', mid: 'Failed', short: 'Failed', cls: 'st-fail', icon: 'x', group: 'failed' };
    case 'update':    return { label: 'Needs updating', mid: 'Needs update', short: 'Update', cls: 'st-upd', icon: 'refresh', group: 'update' };
  }
}

// `text` overrides the sentence-long label for narrow layouts (the landing
// page's weekday columns pass st.mid).
export const Pill: React.FC<{ st: Status; text?: string }> = ({ st, text }) => (
  <span className={`pill ${st.cls}`}><Icon name={st.icon} />{text ?? st.label}</span>
);
