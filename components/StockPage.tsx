// The `#TICKER` route, split out of App so that reaching it — and only reaching it —
// loads the stock definitions.
//
// Everything here needs the full valuation model: `TICKERS` for the active stock's inputs,
// and the whole universe for the rating badge and the next-stock arrow, which walk the same
// grouped order the legacy home page used. That is 555 KB of definitions plus the
// projection service, and the landing page and the ledger render none of it. App now keeps
// only the ~3 KB `virtual:stock-catalog` and pulls this chunk in on navigation.
import React, { useMemo } from 'react';
import { AnimatePresence } from 'motion/react';

import { ScenarioType } from '../types';
import { calculateProjection } from '../services/projectionService';
import { buildUniverse } from '../services/universe';
import { TICKERS, weightedScenarioAverage } from '../constants';
import StockDetailView from './StockDetailView';

interface StockPageProps {
  ticker: string;
  onBack: () => void;
  onNavigate: (ticker: string) => void;
  /** `#TICKER` is routed optimistically — App has the catalog, not the definitions, so a
   *  hash that survives routing can still turn out not to be a stock once they load. */
  onUnknown: () => void;
}

const StockPage: React.FC<StockPageProps> = ({ ticker, onBack, onNavigate, onUnknown }) => {
  const tickers = TICKERS;
  const tickerDef = tickers[ticker] ?? null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(ticker, ScenarioType.BEAR, tickers, true),
      [ScenarioType.BASE]: calculateProjection(ticker, ScenarioType.BASE, tickers, true),
      [ScenarioType.BULL]: calculateProjection(ticker, ScenarioType.BULL, tickers, true),
    };
  }, [ticker, tickerDef, tickers]);

  const currentProjection = allProjections ? allProjections[ScenarioType.BASE] : null;

  const { universeData, flatTickerOrder } = useMemo(() => buildUniverse(tickers), [tickers]);

  const investmentConclusion = useMemo(() => {
    if (!allProjections || !tickerDef) return null;
    const { bear, base, bull } = allProjections;
    const probWeights =
      bear.config.prob != null && base.config.prob != null && bull.config.prob != null
        ? { bear: bear.config.prob, base: base.config.prob, bull: bull.config.prob }
        : undefined;
    const pwAvg = weightedScenarioAverage(
      bear.pricePerShare,
      base.pricePerShare,
      bull.pricePerShare,
      probWeights,
    );
    const cagr = (Math.pow(pwAvg / tickerDef.currentPrice, 1 / 5) - 1) * 100;
    return { pwAvg, cagr };
  }, [allProjections, tickerDef]);

  // A hash the catalog accepted but the definitions do not know. Routing back has to wait
  // for the commit, or App sets state while this is still rendering.
  React.useEffect(() => {
    if (!tickerDef) onUnknown();
  }, [tickerDef, onUnknown]);

  if (!tickerDef || !allProjections || !currentProjection || !investmentConclusion) return null;

  const activeStockData = universeData.find(s => s.ticker === tickerDef.ticker);

  return (
    <AnimatePresence mode="wait">
      <StockDetailView
        key={tickerDef.ticker}
        tickerDef={tickerDef}
        currentProjection={currentProjection}
        allProjections={allProjections}
        investmentConclusion={investmentConclusion}
        activeStockData={activeStockData}
        onBack={onBack}
        onNext={() => {
          const idx = flatTickerOrder.indexOf(ticker);
          onNavigate(flatTickerOrder[idx + 1] ?? flatTickerOrder[0]);
        }}
      />
    </AnimatePresence>
  );
};

export default StockPage;
