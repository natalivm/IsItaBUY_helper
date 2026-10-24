
import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { STOCK_CATALOG } from 'virtual:stock-catalog';
import Landing from './components/Landing';
import ThemeToggle from './components/ThemeToggle';
import InstallPrompt from './components/InstallPrompt';
import { PanelTab, UPDATES_VERSION, UPDATES_SEEN_KEY, LATEST_TAB } from './components/releaseNotes';

import { ScrollText, Newspaper, ArrowLeft } from 'lucide-react';

// Routes beyond the landing page load on navigation. Between them they carry the stock
// definitions, the valuation model and the watchlist ledger — none of which the landing
// page renders, and all of which used to ship in its first chunk.
const PatternWatchlist = lazy(() => import('./components/PatternWatchlist'));
const StockPage = lazy(() => import('./components/StockPage'));
const LegacyHomePage = lazy(() => import('./components/LegacyHomePage'));
// The notes drawer and its toast: mounted on first use, not on first paint. Between them
// they carry `cn` (and tailwind-merge) and the panel's own markup.
const ReleaseNotesPanel = lazy(() => import('./components/ReleaseNotesPanel'));
const WhatsNewToast = lazy(() => import('./components/WhatsNewToast').then(m => ({ default: m.WhatsNewToast })));

// Which hashes are a stock page. The catalog is one row per file in stocks/ (ticker and
// name, ~3 KB) rather than the definitions themselves — see `stockCatalog()` in
// vite.config.ts.
const STOCK_TICKERS = new Set(STOCK_CATALOG.map(s => s.ticker));

// Set to true to bring back the grouped stock list (components/LegacyHome.tsx)
// in place of the Pattern Break Watchlist on the #watchlist route.
const USE_LEGACY_HOME = false;

// Hash routes: '' → landing, '#watchlist' (optionally '#watchlist/NVDA', which
// opens the list filtered to that symbol) → the stock list, '#TICKER' → a stock
// page. `view` doubles as the ticker on a stock page, which is what the
// projection memos key off.
const WATCHLIST = 'watchlist';
interface Route { view: string; query: string }

// Shown while a route's chunk is in flight. Deliberately bare: the chunks are served from
// the same origin and usually precached by the service worker, so a spinner would flash.
const RouteFallback: React.FC = () => <div className="min-h-screen bg-slate-950" />;

// ── Main App ──

const App: React.FC = () => {
  const getRouteFromHash = useCallback((): Route => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash === WATCHLIST) return { view: WATCHLIST, query: '' };
    if (hash.startsWith(WATCHLIST + '/')) return { view: WATCHLIST, query: hash.slice(WATCHLIST.length + 1) };
    return { view: hash && STOCK_TICKERS.has(hash) ? hash : 'home', query: '' };
  }, []);

  const [route, setRoute] = useState<Route>(getRouteFromHash);
  const activeTicker = route.view;
  // Where "Back" on a stock page returns to: whichever list the visitor came from.
  const listRoute = useRef<string>('home');
  if (activeTicker === 'home' || activeTicker === WATCHLIST) listRoute.current = activeTicker;

  // Release Notes / News panel + in-app "What's New" notification (no OS push).
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelEverOpened, setPanelEverOpened] = useState(false);
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
    setPanelEverOpened(true);
    setPanelOpen(true);
    markUpdatesSeen();
  }, [markUpdatesSeen]);

  const navigateTo = useCallback((view: string, query = '') => {
    if (view === 'home') {
      history.pushState(null, '', location.pathname + location.search);
    } else {
      history.pushState(null, '', '#' + view + (query ? '/' + encodeURIComponent(query) : ''));
    }
    setRoute({ view, query });
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(getRouteFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [getRouteFromHash]);

  useEffect(() => {
    if (activeTicker !== 'home') {
      window.scrollTo(0, 0);
    }
  }, [activeTicker]);

  if (activeTicker === 'home' || activeTicker === WATCHLIST) {
    const panelControls = (
      <>
        <button className="ctl" onClick={() => openPanel('notes')}>
          <ScrollText />
          Notes
          {!updatesSeen && LATEST_TAB === 'notes' && <span className="badge" />}
        </button>
        <button className="ctl" onClick={() => openPanel('news')}>
          <Newspaper />
          News
          {!updatesSeen && LATEST_TAB === 'news' && <span className="badge" />}
        </button>
        <ThemeToggle />
      </>
    );

    return (
      <>
        {activeTicker === 'home' ? (
          <Landing
            covered={STOCK_CATALOG.length}
            onOpenWatchlist={ticker => navigateTo(WATCHLIST, ticker)}
            headerControls={panelControls}
          />
        ) : (
          <Suspense fallback={<RouteFallback />}>
            {USE_LEGACY_HOME ? (
              <LegacyHomePage
                updatesSeen={updatesSeen}
                openPanel={openPanel}
                navigateTo={navigateTo}
              />
            ) : (
              <PatternWatchlist
                catalog={STOCK_CATALOG}
                onOpenStock={navigateTo}
                initialQuery={route.query}
                headerControls={
                  <>
                    <button className="ctl" onClick={() => navigateTo('home')}>
                      <ArrowLeft />
                      Home
                    </button>
                    {panelControls}
                  </>
                }
              />
            )}
          </Suspense>
        )}
        <Suspense fallback={null}>
          {/* Mounted once opened and kept mounted, so the drawer still animates shut. */}
          {panelEverOpened && (
            <ReleaseNotesPanel
              open={panelOpen}
              tab={panelTab}
              onTabChange={setPanelTab}
              onClose={() => setPanelOpen(false)}
            />
          )}
          {!updatesSeen && !panelOpen && (
            <WhatsNewToast
              onView={() => openPanel(LATEST_TAB)}
              onDismiss={markUpdatesSeen}
            />
          )}
        </Suspense>
        <InstallPrompt />
      </>
    );
  }

  return (
    <Suspense fallback={<RouteFallback />}>
      <StockPage
        ticker={activeTicker}
        onBack={() => navigateTo(listRoute.current)}
        onNavigate={navigateTo}
        onUnknown={() => navigateTo('home')}
      />
    </Suspense>
  );
};

export default App;
