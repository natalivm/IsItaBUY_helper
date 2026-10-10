import { defineStock } from './defineStock';

export const FLEX = defineStock({
  ticker: 'FLEX',
  name: 'Flex Ltd.',
  sector: 'Electronics Manufacturing Services (EMS)',
  themeColor: '#0072CE',
  currentPrice: 119.83,
  updatedOn: '10/09',
  lastReportTag: 'Q1 FY27',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$142 - $180',  // stockanalysis.com analyst target range (Sep 28 2026)
  shares0: 356,
  rev25: 25800,        // FY26A (Mar 2026) — base year; revGrowth[0] = FY27 (guide $33.7-35.2B; consensus $34.6B), FY28E $45.0B
  fcfMargin25: 0.04,
  taxRate: 0.21,
  cash: 2250,
  debt: 3000,
  beta: 1.24,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 4.58,       // FY27E (Mar 2027) adj. EPS = guide midpoint $4.42-4.74 (raised at Q1 FY27; consensus $4.71, FY28E $7.06 +50%). Q1 adj. EPS $1.00 (record). Prior $2.65 was a pre-AI-ramp figure.
  rsRating: 88,         // IBD RS per user, 10/10/2026 (was 91)
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  // Q1 FY27 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales ~$7.9B (+21%); record adj. EPS $1.00 (vs ~$0.90), GAAP $0.76.
  // FY27 GUIDE RAISED: revenue $33.7-35.2B, adj. EPS $4.42-4.74. Q2 guide:
  // sales $7.95-8.25B, adj. EPS $1.00-1.07 (above consensus). Cloud & Power
  // Infrastructure capex up to $236M (from $133M) to add data-center
  // capacity. Investor Day Nov 10, 2026. Street: Strong Buy (11), PT
  // $142-180 (median $160); FY27E EPS $4.71 / rev $34.6B, FY28E $7.06 /
  // $45.0B. Stock $119.83 (~26× FY27E / ~17× FY28E) — BELOW the low PT.
  // (No split — the old $73-85 PTs and $2.65 EPS base were simply stale.)
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Embedded power and high-voltage DC expertise puts Flex in a narrow-moat position few EMS competitors can match for AI server builds',
    'Aggressive buyback program has been the primary EPS driver, and at current price continues to compound per-share value efficiently',
    'Data-center power and AI infrastructure demand is now driving strong double-digit revenue growth, not just margin gains',
    'AI server and EV content ramp represent two independent growth vectors that could simultaneously accelerate revenue recovery',
    'Guidance keeps rising and next year\'s earnings are expected to grow far faster than revenue as the AI ramp scales',
  ],

  risksToBuy: [
    'The majority of EPS growth came from buybacks and margin expansion rather than organic revenue growth — a fragile earnings construction',
    'Growth is increasingly concentrated in hyperscaler AI programs, making the business more cyclical than its history suggests',
    'In a cyclical downturn, a derating toward trough contract-manufacturing levels could produce a severe drawdown',
    'Heavy capacity investment for data-center customers raises capex and the cost of any demand air pocket',
    'EMS is a thin-margin, capital-intensive business with intense competition from Asian players on cost and scale',
  ],

  epsCagr: [6, 13, 20],   // Bull 17→20 at Q1 FY27 (FY28E +50% consensus); base 13% = FY28 surge then an EMS-cycle fade
  exitPE: [13, 18, 22],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 142, targetMedian: 160, targetHigh: 180, numAnalysts: 11 },  // stockanalysis.com (Sep 28 2026)

  revGrowth: [
    [0.30, 0.05, 0.00, 0.01, 0.01],   // Bear: FY27 at low end of guide; AI ramp stalls, EMS cycle turns
    [0.34, 0.25, 0.10, 0.06, 0.05],   // Base: FY27 ≈ $34.6B consensus, FY28 +25% (haircut vs +30%), then fade
    [0.36, 0.30, 0.15, 0.08, 0.06],   // Bull: data-center power leadership compounds
  ],
  fcfMargin: [
    [0.030, 0.030, 0.035, 0.035, 0.035],
    [0.040, 0.045, 0.045, 0.050, 0.050],
    [0.045, 0.050, 0.055, 0.060, 0.060],
  ],
  exitMultiple: [10, 13, 16],
  desc: [
    'The AI ramp proves short-lived: after FY27, revenue stalls and margins revert. EPS compounds only ~6% from the $4.58 FY27 guide and P/E compresses to 13x (historical EMS trough). 5yr target {target} ({cagr} annualized).',
    'FY27 lands at the raised guide (~$34.6B), FY28 grows ~25% on data-center power, then growth fades. Buybacks continue. EPS compounds ~13% from $4.58; P/E settles at 18x. 5yr target {target} ({cagr} annualized).',
    'AI server/power buildout sustains: revenue heads well past $45B, margins expand on embedded-power leadership and high-mix shift; EPS compounds ~20%. Premium 22x multiple. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.01, 0.025, 0.035],
  ebitdaProxy: [0.07, 0.09, 0.11],

  debtSafety: {
    netDebt: 750,          // stale balance-sheet figures ($3.0B debt − $2.25B cash) — not refreshed
    ebitda: 2600,          // FY27E: ~$34.6B × ~7.5% — approximate
    fy: 'FY27E',
    note: 'GREEN (~0.3×). Leverage is modest; the risk is EMS cyclicality and AI-customer concentration.',
  },
});
