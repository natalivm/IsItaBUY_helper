import React, { useMemo } from 'react';
import { TickerDefinition } from '../types';
import { WEEKLY_FEATURE, HotSetup, EarningsEvent } from '../data/weeklyFeature';
import { fmt, pct, day, status, Pill } from './PatternWatchlist';
import './Landing.css';

// Landing page — the first thing a visitor sees. Two lists, both rebuilt once a
// week before Monday's open by weekly_feature.py:
//   · the week's hottest setups (max 3), each opening the watchlist pre-filtered
//     to that symbol, and
//   · the covered stocks reporting earnings during the week.
// Everything it renders comes from data/weeklyFeature.ts — no scoring here.

const SLOT: Record<EarningsEvent['time'], string> = {
  bmo: 'Before the open',
  amc: 'After the close',
  tbd: 'Time not set',
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

interface LandingProps {
  tickers: Record<string, TickerDefinition>;
  /** Open the watchlist, optionally pre-filtered to one symbol. */
  onOpenWatchlist: (ticker?: string) => void;
  onOpenStock: (ticker: string) => void;
  headerControls?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ tickers, onOpenWatchlist, onOpenStock, headerControls }) => {
  const { weekOf, weekEnd, hot, earnings } = WEEKLY_FEATURE;

  // Every featured setup is scored off the same run, so one date covers them all.
  const pricedOn = hot.find(h => h.priceDate)?.priceDate;

  // Earnings read as a week, so they are grouped by the day they land on.
  const byDay = useMemo(() => {
    const days = new Map<string, EarningsEvent[]>();
    earnings.forEach(e => days.set(e.date, [...(days.get(e.date) ?? []), e]));
    return [...days.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [earnings]);

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
            <p>Stocks we cover with earnings between {span(weekOf, weekEnd)}.</p>
          </div>
          {byDay.length === 0 ? (
            <div className="empty">No covered stock reports this week.</div>
          ) : (
            <div className="earn">
              {byDay.map(([date, evs]) => (
                <div className="eday" key={date}>
                  <h3>{weekday(date)}</h3>
                  <ul>
                    {evs.map(e => (
                      <li key={e.ticker}>
                        <button
                          className="erow"
                          disabled={!tickers[e.ticker]}
                          onClick={() => onOpenStock(e.ticker)}
                        >
                          <span className="sym"><b>{e.ticker}</b><span>{e.name}</span></span>
                          <span className="slot">
                            {SLOT[e.time]}
                            {e.estimated && <em title="Yahoo has not confirmed this date yet"> · estimated</em>}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
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
