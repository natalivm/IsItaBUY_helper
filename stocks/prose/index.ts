import type { StockProse } from '../../types';

/**
 * Detail-page prose, kept out of the main bundle.
 *
 * reasonsToBuy / risksToBuy / verdictNarrative / keyTakeaways are only ever
 * rendered on a stock's detail page, but they were the single largest removable
 * thing in the bundle: 932 strings, ~37 KB gzipped, downloaded by everyone who
 * opened the home page. Vite gives each file below its own chunk, so a detail
 * page now fetches only that one stock's prose.
 *
 * `eager: false` is what makes this work — contrast stocks/index.ts, which stays
 * eager because the home page needs every stock's model inputs to rate and group
 * it.
 */
const modules = import.meta.glob<{ prose: StockProse }>('./*.ts', { eager: false });

const cache = new Map<string, StockProse>();

/** Prose for one ticker. Resolves to {} when a stock has none. */
export async function loadProse(ticker: string): Promise<StockProse> {
  const hit = cache.get(ticker);
  if (hit) return hit;
  const load = modules[`./${ticker}.ts`];
  if (!load) return {};
  try {
    const mod = await load();
    const prose = mod.prose ?? {};
    cache.set(ticker, prose);
    return prose;
  } catch {
    return {};                 // a missing prose chunk must never break the page
  }
}
