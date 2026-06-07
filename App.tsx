
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
import ReleaseNotesPanel, { WhatsNewToast, PanelTab, UPDATES_VERSION, UPDATES_SEEN_KEY } from './components/ReleaseNotesPanel';

import { motion, AnimatePresence } from 'motion/react';
import { ScrollText, Newspaper } from 'lucide-react';

// ── Main App ──

const App: React.FC = () => {
  const tickers = TICKERS;

  const getTickerFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    return hash && tickers[hash] ? hash : 'home';
  }, [tickers]);

  const [activeTicker, setActiveTicker] = useState<string>(getTickerFromHash);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'upside' | 'rs'>('default');

  // Release Notes / News panel + in-app "What's New" notification (no OS push).
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTab, setPanelTab] = useState<PanelTab>('notes');
  const [updatesSeen, setUpdatesSeen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(UPDATES_SEEN_KEY) === UPDATES_VERSION;
    } catch {
      return true;
    }
  });

  const markUpdatesSeen = useCallback(() => {
    setUpdatesSeen(true);
    try {
      localStorage.setItem(UPDATES_SEEN_KEY, UPDATES_VERSION);
    } catch { /* storage unavailable — non-fatal */ }
  }, []);

  const openPanel = useCallback((tab: PanelTab) => {
    setPanelTab(tab);
    setPanelOpen(true);
    markUpdatesSeen();
  }, [markUpdatesSeen]);

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

      return { ticker: t.ticker, fairPriceRange: t.fairPriceRange || 'N/A', baseTarget: proj.pricePerShare, baseUpside: baseCaseUpside, rsRating: t.rsRating, active: t.active, ...rating, aiImpact: t.aiImpact, group };
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

  const filteredGroupedData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    type Row = (typeof universeData)[0];
    const sortFn =
      sortBy === 'upside' ? (a: Row, b: Row) => b.baseUpside - a.baseUpside
      : sortBy === 'rs'   ? (a: Row, b: Row) => b.rsRating - a.rsRating
      : null;

    const filtered: Record<StockGroup, typeof universeData> = {
      PRIME_GROWTH: [],
      TURBO_GROWTH: [],
      WATCH_LIST: [],
      AVOID: [],
    };
    (Object.keys(groupedData) as StockGroup[]).forEach(group => {
      let items = q
        ? groupedData[group].filter(s => {
            const def = tickers[s.ticker];
            return (
              s.ticker.toLowerCase().includes(q) ||
              def.name.toLowerCase().includes(q) ||
              (def.sector && def.sector.toLowerCase().includes(q))
            );
          })
        : groupedData[group];
      filtered[group] = sortFn ? [...items].sort(sortFn) : items;
    });
    return filtered;
  }, [groupedData, searchQuery, sortBy, tickers]);

  const flatTickerOrder = useMemo(() => {
    const list: string[] = [];
    GROUP_ORDER.forEach(groupKey => {
      groupedData[groupKey].forEach(s => list.push(s.ticker));
    });
    return list;
  }, [groupedData]);

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
                <div className="flex items-center justify-between mb-6 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1">Sort</span>
                    {(['default', 'upside', 'rs'] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors",
                          sortBy === opt
                            ? "bg-amber-500/20 border-amber-500/60 text-amber-400"
                            : "border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                        )}
                      >
                        {opt === 'default' ? 'A–Z' : opt === 'upside' ? 'Upside %' : 'RS Rating'}
                      </button>
                    ))}
                    <span className="w-px h-4 bg-slate-700 mx-1" />
                    <button
                      onClick={() => openPanel('notes')}
                      className="relative flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors"
                    >
                      <ScrollText className="w-3 h-3" />
                      Notes
                      {!updatesSeen && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                      )}
                    </button>
                    <button
                      onClick={() => openPanel('news')}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors"
                    >
                      <Newspaper className="w-3 h-3" />
                      News
                    </button>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by ticker, name, or sector…"
                    className="w-full bg-surface-card border border-slate-700/60 rounded-lg pl-9 pr-9 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/40 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="space-y-0">
                {(() => {
                  let globalIdx = 0;
                  const rows = GROUP_ORDER.map(groupKey => {
                    const stocks = filteredGroupedData[groupKey];
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
                  const hasResults = rows.some(r => r !== null);
                  if (!hasResults && searchQuery.trim()) {
                    return (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <p className="text-sm">No stocks match <span className="text-slate-300 font-mono">"{searchQuery}"</span></p>
                      </div>
                    );
                  }
                  return rows;
                })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <ReleaseNotesPanel
          open={panelOpen}
          tab={panelTab}
          onTabChange={setPanelTab}
          onClose={() => setPanelOpen(false)}
        />
        {!isLoading && !updatesSeen && !panelOpen && (
          <WhatsNewToast
            onView={() => openPanel('notes')}
            onDismiss={markUpdatesSeen}
          />
        )}
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
