import { defineStock } from './defineStock';

export const MNST = defineStock({
  updatedOn: '10/26',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  ticker: 'MNST',
  name: 'Monster Beverage Corp',
  sector: 'Consumer Staples / Beverages',
  themeColor: '#22c55e',
  currentPrice: 46.44,
  fairPriceRange: '$35 - $57',  // stockanalysis.com analyst target range (Oct 5 2026; split-adjusted)
  // 2-for-1 split effective Aug 11 2026 — shares were NOT adjusted before this review (967M → 1,960M);
  // the price had already halved, so the model was double-counting upside.
  shares0: 1960,
  rev25: 8290,         // FY2025A $8.29B; revGrowth[0] = FY26 (consensus $9.73B, +17%), FY27E $10.66B (+10%)
  fcfMargin25: 0.215,
  taxRate: 0.22,
  cash: 3420,          // Jun 2026 (stockanalysis)
  debt: 93,
  beta: 0.85,
  costDebt: 0.04,
  rsRating: 89,        // IBD RS per user, 10/11/2026 (was 82)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Aug 6, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales $2.54B (+20.2%; +17.9% FX-neutral), GM 55.9% (+20bp; pricing
  // and mix offset aluminum/freight), EPS $0.59 (+19%), adj. $0.60 (+15%;
  // beat). International +34.6% (~46% of sales). Monster Energy segment
  // +21.6%; Alcohol Brands −15%. Marketing spend up (selling 10.6% of
  // sales). 2-for-1 split effective Aug 11 2026. Street: Buy (25), PT
  // $35-57 (median $50); FY26E rev $9.73B / EPS $1.15, FY27E $10.66B /
  // $1.31. Stock $43.64 (~38× FY26E), up ~27% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 35, targetMedian: 50, targetHigh: 57, numAnalysts: 25 },  // stockanalysis.com (Oct 5 2026; split-adjusted)
  revGrowth: [
    [0.15, 0.06, 0.06, 0.05, 0.05],   // Bear: FY26 near consensus, then category maturation
    [0.17, 0.09, 0.09, 0.09, 0.08],   // Base: FY26 ≈ $9.7B, FY27 ≈ consensus, steady HSD
    [0.19, 0.12, 0.11, 0.11, 0.10],   // Bull: international + foodservice accelerate
  ],
  fcfMargin: [
    [0.20, 0.20, 0.19, 0.19, 0.19],
    [0.215, 0.215, 0.22, 0.22, 0.22],
    [0.23, 0.24, 0.24, 0.25, 0.25],
  ],
  exitMultiple: [18, 22, 28],
  desc: [
    'Category maturation, GLP-1 behavioral shifts and competition slow growth to mid-single digits; international mix drags margins and the multiple compresses sharply from today\'s high-30s P/E. 5yr target {target} ({cagr} annualized).',
    'Steady execution as a quality compounder: high-single-digit revenue growth after a ~17% FY26, stable low-30s EBIT margins and low-teens EPS growth; international and zero-sugar tailwinds offset gradual P/E compression. 5yr target {target} ({cagr} annualized).',
    'International runway accelerates, foodservice penetration expands and zero-sugar margins lift profitability; the market keeps paying a premium-compounder multiple. 5yr target {target} ({cagr} annualized).',
  ],
  thesis: [
    'At ~38x FY26E earnings after a ~27% run, any growth stall or margin miss triggers a de-rating. GLP-1 behavioral shift and functional beverage competition remain structural overhangs, and marketing spend is rising.',
    'Q2 2026 delivered ~20% sales growth, international +35% and steady ~56% gross margins. The business is executing; valuation is the limiter — returns roughly track mid-teens EPS growth minus some multiple compression.',
    'Structural compounder with under-modeled levers: foodservice penetration, an emerging-market affordable-energy engine and a deepening Coca-Cola relationship. Sustained margin expansion and mid-teens EPS growth would justify a premium multiple for years.',
  ],

  termGrowth: [0.02, 0.025, 0.03],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.28, 0.32, 0.38],
  bullMaOptVal: 83.6 * 967 * 0.05,

  driverOverrides: [   // base entry carries no revPrem/fcfUplift premium (removed Oct 2026 — the base view lives in revGrowth/fcfMargin)
    {},
    {},
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],

  debtSafety: {
    netDebt: -3330,        // Jun 2026 (stockanalysis): ~$3.42B cash − ~$0.09B debt
    ebitda: 2930,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$3.3B, essentially debt-free. Step 1 GREEN.',
  },
});
