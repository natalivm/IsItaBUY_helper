// Every stock's base-case rating and group, in the one order the app navigates by.
//
// Both routes that need it — the detail page's rating badge and next-stock arrow, and the
// legacy grouped home page — live in the lazily loaded half of the app, so this sits beside
// them rather than in App: importing it pulls in `constants` and with it all 95 stock
// definitions. App itself never calls it.
import { ScenarioType, TickerDefinition } from '../types';
import { calculateProjection, getInstitutionalRating } from './projectionService';
import { TICKERS, GROUP_ORDER, StockGroup } from '../constants';
import { classifyStock } from '../utils';

export type UniverseRow = ReturnType<typeof buildUniverse>['universeData'][number];

export function buildUniverse(tickers: Record<string, TickerDefinition> = TICKERS) {
  const universeData = Object.values(tickers).map((t: TickerDefinition) => {
    const proj = calculateProjection(t.ticker, ScenarioType.BASE, tickers, true);
    const rating = getInstitutionalRating(proj.pricePerShare, t.currentPrice, t.ratingOverride, { rsRating: t.rsRating, aiImpact: t.aiImpact });
    const baseCaseUpside = (proj.pricePerShare - t.currentPrice) / t.currentPrice;
    const group = classifyStock(t, rating.label, t.rsRating, baseCaseUpside);

    return { ticker: t.ticker, fairPriceRange: t.fairPriceRange || 'N/A', baseTarget: proj.pricePerShare, baseUpside: baseCaseUpside, rsRating: t.rsRating, active: t.active, ...rating, aiImpact: t.aiImpact, group };
  }).sort((a, b) => a.ticker.localeCompare(b.ticker));

  const groupedData = {
    PRIME_GROWTH: [],
    TURBO_GROWTH: [],
    WATCH_LIST: [],
    AVOID: [],
  } as Record<StockGroup, typeof universeData>;
  universeData.forEach(s => groupedData[s.group].push(s));

  const flatTickerOrder: string[] = [];
  GROUP_ORDER.forEach(groupKey => {
    groupedData[groupKey].forEach(s => flatTickerOrder.push(s.ticker));
  });

  return { universeData, groupedData, flatTickerOrder };
}
