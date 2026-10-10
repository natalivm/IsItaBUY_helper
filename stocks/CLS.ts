import { defineStock } from './defineStock';

export const CLS = defineStock({
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 362.16,
  fairPriceRange: '$375 - $550',  // stockanalysis.com analyst target range (Sep 30 2026)
  shares0: 117.9,
  rev25: 12400,        // FY2025; FY26 guide $20.5B (+65%); mgmt expects FY27 growth to ACCELERATE beyond 65%
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 378,
  debt: 719,
  beta: 1.35,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 11.30,      // FY26E adj. EPS = company guide $11.30 (raised at Q2 2026 from $8.75; consensus $11.21). Mgmt: FY27 adj. EPS to grow faster than revenue (>65%).
  rsRating: 95,         // IBD RS per user, 10/10/2026 (was 92)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 27, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Above the top of guidance. Revenue $4.70B (+62%) vs ~$4.39B consensus;
  // adj. EPS $2.54 (vs $1.39; ~$2.30 consensus); adj. op margin 8.2%
  // (record). FY26 GUIDE RAISED: revenue $20.5B (+65%), adj. EPS $11.30
  // (+87%; vs ~$10.15 consensus at the time) on strong H1, stronger H2
  // customer forecasts and improved component supply. FY27: revenue growth
  // expected to accelerate beyond 65%, adj. EPS to grow faster than
  // revenue. Street: Strong Buy (22), PT $375-550 (median $480); FY26E EPS
  // $11.21 / rev $20.6B. Stock $362 (~32× FY26E, ~19× an FY27 that grows
  // 65%+) — below the low PT.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Top-tier EMS partner for hyperscaler AI infrastructure with a third major win on the high-speed switching platform',
    'Demand visibility extends well beyond the current year — backlog and design wins already covering future ramp periods',
    'Earnings compounding at rapid rates as AI infrastructure buildout scales with the rack-level platform transition',
    'Low leverage and substantial credit facility provide financial flexibility to fund the expansion CapEx cycle',
    'Management expects growth to accelerate again next year, with earnings rising even faster than revenue',
  ],

  risksToBuy: [
    'Extreme hyperscaler client concentration means a single customer pause could collapse near-term revenue sharply',
    'Large capital expenditure cycle temporarily depresses free cash flow, leaving limited margin for error on execution',
    'EMS businesses carry structurally thin margins — any cost inflation or program mis-execution magnifies the impact on profits',
    'The current premium multiple prices in multi-year execution that has yet to fully materialize at the guided rate',
    'AI capex cycle duration is uncertain — a pullback in hyperscaler spending could end growth momentum abruptly',
  ],

  epsCagr: [10, 20, 28],   // Q2 2026: base 18→20, bull 24→28 — FY27 guided to >65% EPS growth, then a cyclical fade
  exitPE: [14, 22, 26],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 375, targetMedian: 480, targetHigh: 550, numAnalysts: 22 },  // stockanalysis.com (Sep 30 2026)
  revGrowth: [
    [0.62, 0.20, 0.00, -0.05, 0.00],  // Bear: FY26 ~locked; FY27 ramp falls well short, AI capex digestion after
    [0.65, 0.60, 0.12, 0.06, 0.05],   // Base: FY26 at guide ($20.5B), FY27 near mgmt's 65%+ outlook, then fade
    [0.67, 0.75, 0.20, 0.15, 0.10],   // Bull: FY27 acceleration exceeds plan, 1.6T + new hyperscaler programs
  ],
  fcfMargin: [
    [0.022, 0.022, 0.025, 0.028, 0.028],
    [0.029, 0.033, 0.037, 0.040, 0.042],
    [0.032, 0.040, 0.048, 0.052, 0.055],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'The FY27 acceleration fails to materialize and AI capex moderates; EPS compounds only ~10% from the $11.30 FY26 guide. P/E compresses to 14x as the market reprices EMS at its historical range. 5yr target {target} ({cagr} annualized).',
    'Execution on the raised FY26 guide ($11.30 EPS) and a 65%+ FY27; then growth fades with the AI cycle. EPS compounds ~20% from $11.30; P/E compresses to 22x. 5yr target {target} ({cagr} annualized).',
    'Sustained AI infrastructure super-cycle drives ~28% EPS CAGR. 1.6T platform ramp and additional hyperscaler wins extend the runway. Premium 26x multiple held on structural AI leadership. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.13],

  burry: {
    sbc: 172,
    gaapNi: 833,
    buyback: 56,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic: ~19× stock return (2023→2026) amplifies naive 21% SBC/NI to estimated 100% cap. Minimal buybacks ($56M NCIB, well below $172M SBC).',
  },

  debtSafety: {
    netDebt: 341,
    ebitda: 1200,
    fy: 'Q1 2026',
    note: 'Low leverage: net debt $341M (cash $378M, debt $719M), 0.6× TTM adj EBITDA. $2.5B credit facility upsized April 2026, $2B+ available liquidity.',
  },
});
