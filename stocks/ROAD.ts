import { defineStock } from './defineStock';

export const ROAD = defineStock({
  updatedOn: '10/15',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-11',
  ticker: 'ROAD',
  name: 'Construction Partners, Inc.',
  sector: 'Infrastructure Construction · Road & Highway',
  themeColor: '#f59e0b',
  currentPrice: 83.23,
  fairPriceRange: '$115 - $165',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 56.76,              // stockanalysis (Oct 2026)
  rev25: 2810,                 // FY 09/2025 revenue $2.81B (was 2,300); revGrowth[0] = FY26 (consensus $3.67B, +30%), FY27E $4.08B (+11%)
  fcfMargin25: 0.055,          // ~$153M FCF / ~$2.81B revenue
  taxRate: 0.25,
  cash: 95,                    // Jun 2026 (stockanalysis)
  debt: 1890,
  beta: 1.25,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 3.10,               // FY26E (Sep 2026) adj. EPS consensus (range $2.93-3.20; FY25A $2.20; FY27E $3.82 +23%). Prior $2.21 was FY25.

  rsRating: 51,                // IBD RS per user, 10/11/2026 (was 52)
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  // Q3 FY26 UPDATE (Aug 7, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $999.4M (+28.2%, beat ~$973M), adj. EBITDA $163M (+24%, 16.3%
  // margin), adj. EPS ~$1.08 (in line/beat). Record backlog $3.36B. FY26
  // outlook raised. Headwinds: energy cost inflation, very wet May. Stock
  // jumped to ~$120 after the print but has since slid to $86.81 (−31% over
  // 52 weeks). Street: Strong Buy (6-7), PT $115-165 (median $138); FY26E
  // rev $3.67B / EPS $3.10, FY27E $4.08B / $3.82. Stock ~28× FY26E, ~23×
  // FY27E; net debt ~$1.8B (~3× EBITDA). Q4 FY26 reports ~Nov 6.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Road 2030 plan targets a doubling of the business with a credible M&A pipeline described as the most active in a quarter-century',
    'HMA vertical integration and Houston platform create durable local operational moats in Sunbelt markets',
    'Record backlog with strong coverage ratio provides exceptional near-term revenue visibility for a cyclical business',
    'Sunbelt population migration, reshoring, and data center construction create a multi-year demand floor beyond federal highway spend',
    'EBITDA margins expanding toward best-in-class levels as scale and vertical integration benefits compound',
  ],

  risksToBuy: [
    'The stock has fallen sharply since its post-earnings high despite record backlog, signalling the market doubts the cycle\'s durability',
    'Organic growth has been volatile quarter-to-quarter, exposing operating leverage risk on the downside',
    'Leverage elevated from acquisition-driven buildout, constraining flexibility if the infrastructure cycle turns',
    'Infrastructure budgets are politically vulnerable to austerity, partisan gridlock, or reauthorization delays',
    'No recurring revenue or durable moat outside execution quality — the thesis is entirely cycle-dependent',
  ],

  // ── EPS/PE Scenarios (updated post Q1 FY26 call) ──
  epsCagr: [8, 15, 20],        // From the FY26E $3.10 base (re-based Oct 2026; was [10,16,21] off FY25 $2.21)
  exitPE: [17, 24, 30],        // ~28× FY26E today; bear: ordinary construction; base: quality cyclical roll-up; bull: premium consolidator
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Strong Buy', targetLow: 115, targetMedian: 138, targetHigh: 165, numAnalysts: 7 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.28, 0.04, 0.03, 0.02, 0.01],   // Bear: FY26 near consensus, then M&A fades, cycle slows
    [0.30, 0.11, 0.09, 0.08, 0.07],   // Base: FY26 ≈ $3.67B, FY27 ≈ consensus, Road 2030 on track
    [0.32, 0.16, 0.14, 0.12, 0.10],   // Bull: full M&A pipeline + strong public cycle + commercial upside
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
    'M&A integration stumbles or the infrastructure cycle turns: award growth stalls, organic growth drops to low-single digits and leverage stays near 3x, limiting further acquisitions. ' +
      'Margins stagnate short of Road 2030 targets and the market re-rates the stock as ordinary construction at 17x. Earnings grow ~8% from the FY26E $3.10. 5yr target {target} ({cagr} annualized).',
    'Road 2030 is broadly on track: the record $3.36B backlog converts, organic growth runs mid-to-high single digits plus tuck-in M&A, EBITDA margins reach ~16% and leverage trends toward 2.5x. ' +
      'Highway reauthorization provides funding visibility. Earnings compound ~15% and the market values the business as a quality cyclical at 24x. 5yr target {target} ({cagr} annualized).',
    'An infrastructure supercycle unfolds — highway reauthorization, Sunbelt migration, reshoring and data-center commercial work — and the M&A pipeline is fully deployed. ' +
      'Road 2030 targets are met or exceeded; earnings compound ~20% and the market pays a 30x premium. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Cyclical downturn + valuation compression + M&A execution risk. No recurring revenue, operational moat only. ' +
      'Leverage around 3x EBITDA constrains flexibility, energy-cost inflation and weather make quarters volatile, and infrastructure budgets are political.',
    'Best-in-class cyclical operator with an M&A compounding engine: Q3 FY26 revenue +28%, adj. EBITDA +24%, record $3.36B backlog and a raised FY26 outlook. ' +
      'After the slide to the mid-$80s the stock trades ~23x FY27E — a far better entry than the 40x+ of 2025, though leverage must come down.',
    'ROAD as the Sunbelt infrastructure consolidator of choice: HMA vertical integration creates local moats, greenfield plants add capacity, and reauthorization plus Sunbelt and commercial tailwinds provide a multi-year demand floor. ' +
      'If Road 2030 delivers (>$6B revenue, ~17% margin), earnings power far exceeds today\'s.',
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

  debtSafety: {
    netDebt: 1800,         // Jun 2026 (stockanalysis): ~$1.89B debt − ~$0.09B cash
    ebitda: 590,           // FY26E adj. EBITDA approx. (~16% × $3.67B); TTM $507M
    capexToOcf: 0.30,
    interestCoverage: 4.2,
    altmanZ: 2.1,
    fy: 'FY26E',
    note: 'Leverage ~3.0× EBITDA after acquisition-driven buildout — management targeting ~2.5×. Infrastructure construction cash flows are predictable (gov\'t-backed projects, record $3.36B backlog), which mitigates the headline ratio. Red on paper, but structural cash flow visibility reduces real risk.',
  },
});
