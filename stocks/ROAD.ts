import { defineStock } from './defineStock';

export const ROAD = defineStock({
  updatedOn: '05/05',
  ticker: 'ROAD',
  name: 'Construction Partners, Inc.',
  sector: 'Infrastructure Construction · Road & Highway',
  themeColor: '#f59e0b',
  currentPrice: 131.62,
  fairPriceRange: '$112 - $270',
  shares0: 56.5,               // ~56.5M shares (market cap $7.45B / $131.9)
  rev25: 2300,                 // FY 09/2025 revenue ($M)
  fcfMargin25: 0.067,          // ~$153M FCF / ~$2,300M revenue
  taxRate: 0.25,
  cash: 200,
  debt: 800,
  beta: 1.25,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 2.21,               // Trailing EPS FY 09/2025

  rsRating: 77,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Construction Partners is a compounding-through-M&A infrastructure play — revenue +44% YoY, record EBITDA margins, $3.09B backlog with 80-85% coverage, and Road 2030 targeting >$6B revenue / 17% EBITDA margin (doubling the business). " +
    "M&A pipeline is 'most active in 25 years' with Houston platform build-out creating local operational moats via HMA vertical integration. " +
    "The problem: at ~44x forward P/E, the stock prices in near-perfect execution while organic growth floats quarterly (Q1 only 3.5% vs 7-8% guide) and operating leverage amplifies both ways. " +
    "If infra cycle extends (Sunbelt + reshoring + data centers) and Road 2030 delivers, this looks like a compounder. If P/E compresses to 25x, it's -45% downside regardless of EPS growth. " +
    "40-50% probability of 15%+ CAGR — a bet on execution + infra cycle, not eternal moat.",

  // ── EPS/PE Scenarios (updated post Q1 FY26 call) ──
  epsCagr: [10, 16, 21],       // bear 8-12% mid / base 15-17% mid / bull 20-22% mid
  exitPE: [23, 30, 36],        // bear 22-25x / base 28-32x / bull 35-38x
  prob: [20, 50, 30],          // upgraded: ~40-50% prob of 15%+ CAGR (base+bull)

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Strong Buy', targetLow: 110, targetMedian: 123, targetHigh: 150, numAnalysts: 5 },
  revGrowth: [
    [0.30, 0.08, 0.04, 0.02, 0.01],   // Bear: M&A rollover fades, cycle slows, organic 3-4%
    [0.38, 0.15, 0.10, 0.08, 0.07],   // Base: M&A continues, organic 7-8%, Road 2030 on track
    [0.44, 0.20, 0.15, 0.12, 0.10],   // Bull: full M&A pipeline + strong public cycle + commercial upside
  ],
  fcfMargin: [
    [0.060, 0.055, 0.050, 0.048, 0.048],   // Bear: margin stagnates, integration friction
    [0.067, 0.080, 0.090, 0.095, 0.100],   // Base: 75-85% EBITDA→CFO, margin toward 16%
    [0.070, 0.090, 0.100, 0.110, 0.115],   // Bull: Road 2030 17% EBITDA, strong CFO conversion
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 12, 15],         // EBITDA exit multiples — upgraded base/bull on backlog visibility
  bbRate: [0.002, 0.005, 0.008],     // Minimal buybacks — deleveraging + reinvestment focused
  ebitdaProxy: [0.14, 0.16, 0.17],   // FY26 guide 15.3-15.5%, Road 2030 target 17%
  bullMaOptVal: 131.9 * 56.5 * 0.05, // Higher M&A optionality — 'most active pipeline in 25 years'

  desc: [
    'M&A integration stumbles or the infrastructure cycle turns. Award growth stalls and organic growth drops to 3-4%. ' +
      'Leverage stays elevated above 3x, limiting further acquisition capacity. EBITDA margins stagnate in the 14-15% range, ' +
      'falling short of Road 2030 targets. The market re-rates the stock as ordinary construction at 22-25x. ' +
      'Earnings grow at roughly 10% but returns are negative to flat from current entry. In a stress scenario, downside reaches about 45%.',
    'Road 2030 is broadly on track with an active M&A pipeline, 7-8% organic growth, and backlog coverage above 80%. ' +
      'EBITDA margins reach the 15-16% range as fiscal 2026 guidance confirms. Leverage comes down to 2.5x by late 2026. ' +
      'Highway reauthorization provides five-year visibility for federal and state funding. The market values the business as a quality cyclical at 28-32x. ' +
      'Earnings compound at roughly 16% annually, though returns from current entry are modest at 1-3% annualized.',
    'An infrastructure supercycle unfolds driven by highway reauthorization, Sunbelt migration, reshoring, and data center commercial demand. ' +
      'The M&A pipeline is fully deployed with the Houston platform, greenfield plants, and geographic expansion all contributing. ' +
      'Road 2030 targets are achieved or exceeded with over $6B in revenue and 17% EBITDA margins. ' +
      'The market rewards execution with a 35-38x premium. Earnings compound at roughly 21% annually, ' +
      'delivering 9-12% annualized returns from current entry.',
  ],

  thesis: [
    'Cyclical downturn + valuation compression + M&A execution risk. No recurring revenue, operational moat only. ' +
      'At P/E 23x, downside is severe from current 44x forward. Leverage at 3.18x constrains flexibility. ' +
      'Organic growth volatile (Q1 only 3.5% vs 7-8% guide) — operating leverage cuts both ways. ' +
      'Infrastructure budgets are political: vulnerable to austerity, partisan shifts, reauthorization delays.',
    'Best-in-class cyclical operator with M&A compounding engine. Q1 FY26 confirms: +44% rev, +63% EBITDA, ' +
      'record margins, $3.09B backlog. Deleveraging on track. Road 2030 visibility is real. ' +
      'But 16% EPS CAGR at 44x entry = limited stock CAGR unless multiple holds above 30x. ' +
      'Needs either cheaper entry (~$85-95) or sustained bull conditions for 15%+ total return.',
    'ROAD as the Sunbelt infrastructure consolidator of choice. M&A pipeline "most active in 25 years", ' +
      'HMA vertical integration creates local moats, greenfield expansion adds capacity. ' +
      'Reauthorization + Sunbelt tailwinds + commercial (data centers, reshoring) provide multi-year demand floor. ' +
      'If Road 2030 delivers (>$6B rev, 17% margin, >$1B EBITDA), current valuation is justified and upside remains.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.012],
    },
  ],
});
