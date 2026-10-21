
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS, GROUP_ORDER, StockGroup, weightedScenarioAverage } from './constants';
import { classifyStock } from './utils';
import StockDetailView from './components/StockDetailView';
import PatternWatchlist from './components/PatternWatchlist';
import LegacyHome from './components/LegacyHome';
import ThemeToggle from './components/ThemeToggle';
import InstallPrompt from './components/InstallPrompt';
import ReleaseNotesPanel, { WhatsNewToast, PanelTab, UPDATES_VERSION, UPDATES_SEEN_KEY } from './components/ReleaseNotesPanel';

import { AnimatePresence } from 'motion/react';
import { ScrollText, Newspaper } from 'lucide-react';

// Set to true to bring back the previous grouped home page (components/LegacyHome.tsx).
const USE_LEGACY_HOME = false;

// ── Main App ──

const App: React.FC = () => {
  const tickers = TICKERS;

  const getTickerFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    return hash && tickers[hash] ? hash : 'home';
  }, [tickers]);

  const [activeTicker, setActiveTicker] = useState<string>(getTickerFromHash);

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
        {USE_LEGACY_HOME ? (
          <LegacyHome
            tickers={tickers}
            groupedData={groupedData}
            updatesSeen={updatesSeen}
            openPanel={openPanel}
            navigateTo={navigateTo}
          />
        ) : (
          <PatternWatchlist
            tickers={tickers}
            onOpenStock={navigateTo}
            headerControls={
              <>
                <button className="ctl" onClick={() => openPanel('notes')}>
                  <ScrollText />
                  Notes
                  {!updatesSeen && <span className="badge" />}
                </button>
                <button className="ctl" onClick={() => openPanel('news')}>
                  <Newspaper />
                  News
                </button>
                <ThemeToggle />
              </>
            }
          />
        )}
        <ReleaseNotesPanel
          open={panelOpen}
          tab={panelTab}
          onTabChange={setPanelTab}
          onClose={() => setPanelOpen(false)}
        />
        {!updatesSeen && !panelOpen && (
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
