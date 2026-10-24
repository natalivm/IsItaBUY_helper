import React, { useMemo } from 'react';
import { TickerDefinition } from '../types';
import { WEEKLY_FEATURE, HotSetup, EarningsEvent } from '../data/weeklyFeature';
import { PATTERN_STOCKS, PatternStock } from '../data/patternWatchlist';
import { fmt, pct, day, status, Pill } from './PatternWatchlist';
import './Landing.css';

// Landing page — the first thing a visitor sees. Two lists, both rebuilt once a
// week before Monday's open by weekly_feature.py:
//   · the week's hottest setups (max 3), each opening the watchlist pre-filtered
//     to that symbol, and
//   · the covered stocks reporting earnings during the week, each row opening
//     that stock's setup in the watchlist.
// The two lists come from data/weeklyFeature.ts — no scoring here. The setup
// shown beside an earnings row is read live from data/patternWatchlist.ts
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

const HotCard: React.FC<{ h: HotSetup; onOpenWatchlist: (ticker: string) => void }> = ({ h, onOpenWatchlist }) => {
  const st = status(h);
  const dn = h.direction === 'down';
  return (
    <article className="hot">
      <div className="hot-top">
        <div className="sym">
          <b>{h.ticker}</b>
          <span>{h.name}</span>
        </div>
        <Pill st={st} />
      </div>

      <div className="hot-pat">
        {h.pattern} · {cap(h.timeframe)} chart
        {h.stageDate && <em> · {day(h.stageDate)}</em>}
      </div>

      <dl className="hot-lvl">
        <div>
          <dt>Last close</dt>
          <dd className="num">{fmt(h.price)}</dd>
        </div>
        <div>
          <dt>Target</dt>
          <dd className="num">{fmt(h.target)}<small className={dn ? 'dn' : 'up'}>{pct(h.price, h.target)}</small></dd>
        </div>
        {h.invalidation != null && (
          <div>
            <dt>Invalidation</dt>
            <dd className="num">{fmt(h.invalidation)}<small>{pct(h.price, h.invalidation)}</small></dd>
          </div>
        )}
      </dl>

      <ul className="hot-why">
        {h.why.map(w => <li key={w}>{w}</li>)}
      </ul>

      <button className="go" onClick={() => onOpenWatchlist(h.ticker)}>
        See {h.ticker} in the watchlist<Arrow />
      </button>
    </article>
  );
};

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

interface LandingProps {
  tickers: Record<string, TickerDefinition>;
  /** Open the watchlist, optionally pre-filtered to one symbol. */
  onOpenWatchlist: (ticker?: string) => void;
  headerControls?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ tickers, onOpenWatchlist, headerControls }) => {
  const { weekOf, weekEnd, hot, earnings } = WEEKLY_FEATURE;

  const setups = useMemo(() => new Map(PATTERN_STOCKS.map(s => [s.ticker, s])), []);

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
      <div className="wrap">
        <header>
          <div>
            <h1>Is It a BUY?</h1>
            <p>
              Chart setups and five-year valuations on {Object.keys(tickers).length} stocks.
              Here is what the week looks like.
            </p>
            <div className="asof">Week of {span(weekOf, weekEnd)}</div>
          </div>
          {headerControls && <div className="hdr-ctl">{headerControls}</div>}
        </header>

        <section>
          <div className="sec-head">
            <h2>Hottest setups</h2>
            <p>
              The most actionable breaks on the watchlist, ranked on stage, momentum,
              trend agreement and the room left to target.
            </p>
            {pricedOn && <div className="asof">Prices as of {day(pricedOn)}</div>}
          </div>
          {hot.length === 0 ? (
            <div className="empty">No setup cleared the bar this week. The full watchlist is still there.</div>
          ) : (
            <div className="hot-grid">
              {hot.map(h => <HotCard key={h.ticker} h={h} onOpenWatchlist={onOpenWatchlist} />)}
            </div>
          )}
        </section>

        <section>
          <div className="sec-head">
            <h2>Reporting this week</h2>
            <p>
              Stocks we cover with earnings between {span(weekOf, weekEnd)}, by the day
              they report, with the setup each one carries into it. A card opens that
              setup in the watchlist. <b>BMO</b> before the open, <b>AMC</b> after the
              close; <b>*</b> marks a date Yahoo has not confirmed.
            </p>
          </div>
          {earnings.length === 0 ? (
            <div className="empty">No covered stock reports this week.</div>
          ) : (
            <div className="earn">
              {byDay.map(({ iso, evs }) => (
                <div className="eday" key={iso}>
                  <h3>{weekday(iso)}</h3>
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
                </div>
              ))}
            </div>
          )}
        </section>

        <button className="all" onClick={() => onOpenWatchlist()}>
          Open the full watchlist<Arrow />
        </button>

        <p className="foot">
          Both lists refresh every week before Monday's open. Targets are projections,
          not promises. Nothing here is financial advice.
        </p>
      </div>
    </div>
  );
};

export default Landing;
