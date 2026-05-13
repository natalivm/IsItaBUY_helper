
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS, GROUP_ORDER, GROUP_META, StockGroup, SPLASH_DURATION_MS, weightedScenarioAverage } from './constants';
import { classifyStock, cn } from './utils';
import StockDetailView from './components/StockDetailView';
import LoadingSplash from './components/LoadingSplash';
import StockRow from './components/StockRow';
import ThemeToggle from './components/ThemeToggle';
import InstallPrompt from './components/InstallPrompt';

import { motion, AnimatePresence } from 'motion/react';

// ── Main App ──

const App: React.FC = () => {
  const tickers = TICKERS;

  const getTickerFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    return hash && tickers[hash] ? hash : 'home';
  }, [tickers]);

  const [activeTicker, setActiveTicker] = useState<string>(getTickerFromHash);
  const [isLoading, setIsLoading] = useState(true);

  const navigateTo = useCallback((ticker: string) => {
    if (ticker === 'home') {
      history.pushState(null, '', location.pathname + location.search);
    } else {
      history.pushState(null, '', '#' + ticker);
    }
    setActiveTicker(ticker);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPopState = () => setActiveTicker(getTickerFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [getTickerFromHash]);

  useEffect(() => {
    if (activeTicker !== 'home') {
      window.scrollTo(0, 0);
    }
  }, [activeTicker]);

  const tickerDef = activeTicker !== 'home' ? tickers[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, tickers, true),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, tickers, true),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, tickers, true),
    };
  }, [activeTicker, tickerDef, tickers]);

  const currentProjection = allProjections ? allProjections[ScenarioType.BASE] : null;

  const universeData = useMemo(() => {
    return Object.values(tickers).map((t: TickerDefinition) => {
      const proj = calculateProjection(t.ticker, ScenarioType.BASE, tickers, true);
      const rating = getInstitutionalRating(proj.pricePerShare, t.currentPrice, t.ratingOverride, { rsRating: t.rsRating, aiImpact: t.aiImpact });
      const baseCaseUpside = (proj.pricePerShare - t.currentPrice) / t.currentPrice;
      const group = classifyStock(t, rating.label, t.rsRating, baseCaseUpside);

      return { ticker: t.ticker, fairPriceRange: t.fairPriceRange || 'N/A', active: t.active, ...rating, aiImpact: t.aiImpact, group };
    }).sort((a, b) => a.ticker.localeCompare(b.ticker));
  }, [tickers]);

  const groupedData = useMemo(() => {
    const groups: Record<StockGroup, typeof universeData> = {
      PRIME_GROWTH: [],
      TURBO_GROWTH: [],
      WATCH_LIST: [],
      AVOID: [],
    };
    universeData.forEach(s => groups[s.group].push(s));
    return groups;
  }, [universeData]);

  const flatTickerOrder = useMemo(() => {
    const list: string[] = [];
    GROUP_ORDER.forEach(groupKey => {
      groupedData[groupKey].forEach(s => list.push(s.ticker));
    });
    return list;
  }, [groupedData]);

  const investmentConclusion = useMemo(() => {
    if (!allProjections || !tickerDef) return null;
    const pwAvg = weightedScenarioAverage(
      allProjections.bear.pricePerShare,
      allProjections.base.pricePerShare,
      allProjections.bull.pricePerShare,
    );
    const cagr = (Math.pow(pwAvg / tickerDef.currentPrice, 1 / 5) - 1) * 100;
    return { pwAvg, cagr };
  }, [allProjections, tickerDef]);

  if (activeTicker === 'home') {
    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSplash />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-surface-card overflow-y-auto px-4 lg:px-24 pt-20 pb-24 scrollbar-hide"
            >
              <div className="max-w-4xl mx-auto mb-12">
                <div className="flex justify-end mb-6 pt-1">
                  <ThemeToggle />
                </div>

                <div className="space-y-0">
                {(() => {
                  let globalIdx = 0;
                  return GROUP_ORDER.map(groupKey => {
                    const stocks = groupedData[groupKey];
                    if (stocks.length === 0) return null;
                    const meta = GROUP_META[groupKey];
                    return (
                      <div key={groupKey}>
                        <div className={cn("flex items-center gap-3 px-4 py-3 mt-6 first:mt-0 border-l-2", meta.border, meta.bg)}>
                          <span className={cn("text-xs font-black uppercase tracking-[0.2em]", meta.accent)}>{meta.label}</span>
                          <span className={cn("text-xs font-bold mono px-1.5 py-0.5 rounded bg-white/5", meta.accent)}>{stocks.length}</span>
                          <span className="flex-1 h-px bg-slate-700/40"></span>
                          <span className="text-xs text-slate-400 tracking-wide">{meta.desc}</span>
                        </div>
                        {stocks.map(stock => {
                          const idx = globalIdx++;
                          return (
                            <StockRow
                              key={stock.ticker}
                              stock={stock}
                              tickerDef={tickers[stock.ticker]}
                              animationIndex={idx}
                              onSelect={navigateTo}
                            />
                          );
                        })}
                      </div>
                    );
                  });
                })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <InstallPrompt />
      </>
    );
  }

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
        onBack={() => navigateTo('home')}
        onNext={() => {
          const idx = flatTickerOrder.indexOf(activeTicker);
          const next = flatTickerOrder[idx + 1] ?? flatTickerOrder[0];
          navigateTo(next);
        }}
      />
    </AnimatePresence>
  );
};

export default App;
