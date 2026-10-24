import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TickerDefinition } from '../types';
import { WEEKLY_FEATURE, HotSetup, EarningsEvent } from '../data/weeklyFeature';
import { PATTERN_STOCKS, PatternStock } from '../data/patternWatchlist';
import { fmt, pct, day, status, Pill } from './PatternWatchlist';
import './Landing.css';

// Landing page — the first thing a visitor sees. Two lists, both rebuilt once a
// week before Monday's open by weekly_feature.py:
//   · the week's hottest setups (max 3), each opening the watchlist pre-filtered
//     to that symbol, and
//   · the covered stocks reporting earnings during the week, each card opening
//     that stock's setup in the watchlist.
// The two lists come from data/weeklyFeature.ts — no scoring here. The setup
// shown beside an earnings card is read live from data/patternWatchlist.ts
// instead: stages move with the daily price run, and this list is only
// rewritten weekly.

const SLOT: Record<EarningsEvent['time'], string> = {
  bmo: 'Before the open',
  amc: 'After the close',
  tbd: 'Time not set',
};

// The weekday columns are too narrow for the full wording.
const SHORT_SLOT: Record<EarningsEvent['time'], string> = {
  bmo: 'BMO',
  amc: 'AMC',
  tbd: 'TBD',
};

const cap = (t: string) => t[0].toUpperCase() + t.slice(1);

// "Mon, Oct 27" — the weekday matters more than the year on a one-week list.
const weekday = (s: string) =>
  new Date(s + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

const span = (from: string, to: string) =>
  new Date(from + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  + ' – ' + day(to);

const Arrow = () => (
  <svg className="arr" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Motion ──

// One shared rhythm so the page resolves top to bottom instead of all at once.
const rise = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
});

/** Counts from 0 to `to` on mount; returns `to` immediately for reduced motion. */
function useCountUp(to: number, ms = 900) {
  const still = useReducedMotion();
  const [n, setN] = useState(still ? to : 0);
  useEffect(() => {
    if (still) { setN(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));   // ease-out
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms, still]);
  return n;
}

// ── Sparkline ──

interface Bars { t: string[]; c: number[] }
const barsCache = new Map<string, Bars | null>();

/** Last ~90 daily closes for a ticker, from the same files the setup charts read. */
function useBars(ticker: string) {
  const [bars, setBars] = useState<Bars | null>(() => barsCache.get(ticker) ?? null);
  useEffect(() => {
    if (barsCache.has(ticker)) { setBars(barsCache.get(ticker) ?? null); return; }
    let live = true;
    fetch(`${import.meta.env.BASE_URL}bars/${ticker}_daily.json`)
      .then(r => (r.ok ? r.json() : null))
      .then((b: Bars | null) => { barsCache.set(ticker, b); if (live) setBars(b); })
      .catch(() => { barsCache.set(ticker, null); });
    return () => { live = false; };
  }, [ticker]);
  return bars;
}

const SPARK_DAYS = 90;

/** Three months of closes as a filled line, drawn in once. Decorative — the
 *  real chart with levels and trendlines is one click away in the watchlist. */
const Sparkline: React.FC<{ ticker: string; dn: boolean }> = ({ ticker, dn }) => {
  const bars = useBars(ticker);
  const still = useReducedMotion();
  const id = `sp-${ticker}`;

  const path = useMemo(() => {
    if (!bars?.c?.length) return null;
    const c = bars.c.slice(-SPARK_DAYS);
    const lo = Math.min(...c), hi = Math.max(...c), range = hi - lo || 1;
    const x = (i: number) => (i / (c.length - 1)) * 100;
    const y = (v: number) => 26 - ((v - lo) / range) * 24;
    const line = c.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ');
    return { line, fill: `${line} L100 28 L0 28 Z`, end: [x(c.length - 1), y(c[c.length - 1])] as const };
  }, [bars]);

  if (!path) return <div className="spark ph" aria-hidden="true" />;

  return (
    <div className={`spark ${dn ? 'dn' : 'up'}`} aria-hidden="true">
      <svg viewBox="0 0 100 28" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={path.fill} fill={`url(#${id})`} stroke="none"
          initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }} />
        <motion.path d={path.line} fill="none" stroke="currentColor" strokeWidth="1.4"
          strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }} />
      </svg>
      <motion.i style={{ left: `${path.end[0]}%`, top: `${(path.end[1] / 28) * 100}%` }}
        initial={still ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: still ? 0 : 1, type: 'spring', stiffness: 420, damping: 18 }} />
    </div>
  );
};

// ── Meters ──

/** How far price has travelled from the level that kills the setup to the one
 *  that pays it: invalidation at 0%, target at 100%. */
const TargetMeter: React.FC<{ h: HotSetup }> = ({ h }) => {
  const still = useReducedMotion();
  const inval = h.invalidation;
  if (inval == null || inval === h.target) return null;
  const k = Math.min(1, Math.max(0, (h.price - inval) / (h.target - inval)));
  return (
    <div className="meter" title={`${(k * 100).toFixed(0)}% of the way from invalidation to target`}>
      <div className="track">
        <motion.span className="fill"
          initial={still ? false : { width: 0 }} animate={{ width: `${k * 100}%` }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
        <motion.span className="knob"
          initial={still ? false : { left: 0 }} animate={{ left: `${k * 100}%` }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <div className="ends">
        <span className="dn">{fmt(inval)}<em>invalidation</em></span>
        <span className="tg">{fmt(h.target)}<em>target</em></span>
      </div>
    </div>
  );
};

const RSI_BULL = 60;
const RSI_BEAR = 40;

/** RSI 0-100 with the 40/60 regime bands marked. Lit when it backs the setup. */
const RsiBar: React.FC<{ rsi: number; dn: boolean }> = ({ rsi, dn }) => {
  const backs = dn ? rsi <= RSI_BEAR : rsi >= RSI_BULL;
  return (
    <div className={`rsi${backs ? ' on' : ''}`} title={`Daily RSI ${rsi.toFixed(1)}${backs ? ' — backs this setup' : ''}`}>
      <span className="k">RSI</span>
      <span className="bar"><i style={{ left: `${Math.min(100, Math.max(0, rsi))}%` }} /></span>
      <span className="v num">{Math.round(rsi)}</span>
    </div>
  );
};

// ── Hottest setups ──

const HotCard: React.FC<{ h: HotSetup; rank: number; onOpenWatchlist: (ticker: string) => void }> = ({ h, rank, onOpenWatchlist }) => {
  const st = status(h);
  const dn = h.direction === 'down';
  return (
    <motion.article className={`hot ${dn ? 'dn' : 'up'}`} {...rise(rank)}
      whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}>
      <span className="rank" aria-hidden="true">{rank + 1}</span>

      <div className="hot-top">
        <div className="sym">
          <b>{h.ticker}</b>
          <span>{h.name}</span>
        </div>
        <Pill st={st} text={st.mid} />
      </div>

      <Sparkline ticker={h.ticker} dn={dn} />

      <div className="hot-move">
        <span className="now num">{fmt(h.price)}</span>
        <Arrow />
        <span className="tgt num">{fmt(h.target)}</span>
        <span className={`delta ${dn ? 'dn' : 'up'}`}>{pct(h.price, h.target)}</span>
      </div>

      <TargetMeter h={h} />

      <div className="hot-meta">
        <span className="pat">{h.pattern} · {cap(h.timeframe)}</span>
        {h.rsi != null && <RsiBar rsi={h.rsi} dn={dn} />}
      </div>

      <ul className="hot-why">
        {h.why.map(w => <li key={w}>{w}</li>)}
      </ul>

      <button className="go" onClick={() => onOpenWatchlist(h.ticker)}>
        See {h.ticker} in the watchlist<Arrow />
      </button>
    </motion.article>
  );
};

// ── Reporting this week ──

const EarningsRow: React.FC<{
  e: EarningsEvent;
  setup?: PatternStock;
  onOpenWatchlist: (ticker: string) => void;
}> = ({ e, setup, onOpenWatchlist }) => {
  const st = status(setup ?? null);
  return (
    <li>
      <button className="erow" onClick={() => onOpenWatchlist(e.ticker)}
        title={`Open ${e.ticker}'s setup in the watchlist`}>
        <span className="etop">
          <b>{e.ticker}</b>
          <span className="slot" title={SLOT[e.time] + (e.estimated ? ' (date not confirmed)' : '')}>
            {SHORT_SLOT[e.time]}{e.estimated && '*'}
          </span>
        </span>
        <span className="ename">{e.name}</span>
        <Pill st={st} text={st.mid} />
        <span className="epat">
          {setup ? `${setup.pattern} · ${cap(setup.timeframe)}` : 'No setup posted yet'}
          {setup?.auto && <i className="auto-dot" title="Auto-detected: check by hand" />}
        </span>
      </button>
    </li>
  );
};

// Days left until a report, as a label — the week reads differently on Thursday.
function countdown(iso: string): string | null {
  const today = new Date();
  const d = Math.round(
    (Date.parse(iso + 'T12:00:00') - Date.parse(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T12:00:00`
    )) / 86_400_000,
  );
  if (d < 0) return 'Reported';
  if (d === 0) return 'Today';
  if (d === 1) return 'Tomorrow';
  return `In ${d} days`;
}

// ── Page ──

interface LandingProps {
  tickers: Record<string, TickerDefinition>;
  /** Open the watchlist, optionally pre-filtered to one symbol. */
  onOpenWatchlist: (ticker?: string) => void;
  headerControls?: React.ReactNode;
}

const Stat: React.FC<{ n: number; label: string; tone?: string }> = ({ n, label, tone }) => {
  const shown = useCountUp(n);
  return (
    <div className={`stat${tone ? ' ' + tone : ''}`}>
      <b className="num">{shown}</b>
      <span>{label}</span>
    </div>
  );
};

const Landing: React.FC<LandingProps> = ({ tickers, onOpenWatchlist, headerControls }) => {
  const { weekOf, weekEnd, hot, earnings } = WEEKLY_FEATURE;
  const still = useReducedMotion();

  const setups = useMemo(() => new Map(PATTERN_STOCKS.map(s => [s.ticker, s])), []);

  const stats = useMemo(() => {
    let tracked = 0, confirmed = 0;
    PATTERN_STOCKS.forEach(s => {
      tracked += 1 + (s.alt ? 1 : 0);
      if (s.stage === 'confirmed') confirmed += 1;
      if (s.alt?.stage === 'confirmed') confirmed += 1;
    });
    return { covered: Object.keys(tickers).length, tracked, confirmed, reporting: earnings.length };
  }, [tickers, earnings]);

  // Every featured setup is scored off the same run, so one date covers them all.
  const pricedOn = hot.find(h => h.priceDate)?.priceDate;

  const byDay = useMemo(() => {
    const monday = new Date(weekOf + 'T12:00:00');
    return [0, 1, 2, 3, 4].map(i => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      return { iso, evs: earnings.filter(e => e.date === iso) };
    });
  }, [earnings, weekOf]);

  return (
    <div className="pbw lnd">
      <div className="aura" aria-hidden="true" />
      <div className="wrap">
        <header>
          <div className="intro">
            <motion.div className="kicker" {...rise(0)}>Week of {span(weekOf, weekEnd)}</motion.div>
            <motion.h1 {...rise(1)}>Is It a <em>BUY</em>?</motion.h1>
            <motion.p {...rise(2)}>
              Chart setups and five-year valuations, refreshed every session.
              Here is what the week looks like.
            </motion.p>
            <motion.button className="all" onClick={() => onOpenWatchlist()} {...rise(3)}
              whileHover={still ? undefined : { x: 3 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}>
              Open the full watchlist<Arrow />
            </motion.button>
          </div>
          {headerControls && <div className="hdr-ctl">{headerControls}</div>}
        </header>

        <motion.div className="stats" {...rise(4)}>
          <Stat n={stats.covered} label="stocks covered" />
          <Stat n={stats.tracked} label="setups tracked" />
          <Stat n={stats.confirmed} label="breaks confirmed" tone="hot" />
          <Stat n={stats.reporting} label="reporting this week" />
        </motion.div>

        <section>
          <div className="sec-head">
            <h2><span className="flame" aria-hidden="true" />Hottest setups</h2>
            <p>
              The most actionable breaks on the watchlist, ranked on stage, momentum,
              trend agreement and the room left to target.
            </p>
            {pricedOn && <div className="asof">Prices as of {day(pricedOn)} · 90-day history shown</div>}
          </div>
          {hot.length === 0 ? (
            <div className="empty">No setup cleared the bar this week. The full watchlist is still there.</div>
          ) : (
            <div className="hot-grid">
              {hot.map((h, i) => (
                <HotCard key={h.ticker} h={h} rank={i} onOpenWatchlist={onOpenWatchlist} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="sec-head">
            <h2>Reporting this week</h2>
            <p>
              Earnings between {span(weekOf, weekEnd)}, by the day they report, each
              with the setup it carries into the print. A card opens that setup.
              <b>BMO</b> before the open, <b>AMC</b> after the close; <b>*</b> marks a
              date Yahoo has not confirmed.
            </p>
          </div>
          {earnings.length === 0 ? (
            <div className="empty">No reports scheduled this week.</div>
          ) : (
            <div className="earn">
              {byDay.map(({ iso, evs }, i) => {
                const left = countdown(iso);
                return (
                  <motion.div className={`eday${left === 'Today' ? ' now' : ''}${left === 'Reported' ? ' past' : ''}`}
                    key={iso} {...(still ? {} : rise(i))}>
                    <h3>
                      {weekday(iso)}
                      {left && <em>{left}</em>}
                    </h3>
                    {evs.length === 0
                      ? <p className="enone">Nothing we cover</p>
                      : (
                        <ul>
                          {evs.map(e => (
                            <EarningsRow key={e.ticker} e={e} setup={setups.get(e.ticker)}
                              onOpenWatchlist={onOpenWatchlist} />
                          ))}
                        </ul>
                      )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        <p className="foot">
          Both lists refresh every week before Monday's open. Targets are projections,
          not promises. Nothing here is financial advice.
        </p>
      </div>
    </div>
  );
};

export default Landing;
