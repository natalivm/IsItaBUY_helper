import { defineStock } from './defineStock';

export const MLM = defineStock({
  updatedOn: '10/09',
  ticker: 'MLM',
  name: 'Martin Marietta Materials',
  sector: 'Building Materials · Aggregates & Heavy Construction Materials',
  themeColor: '#5b7f3b',
  currentPrice: 478.35,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$496 - $800',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 71.02,              // stockanalysis (Oct 2026) — up from ~60.3M after stock-funded acquisitions
  rev25: 6150,                 // Revenue 2025A ($M); revGrowth[0] = FY26 (guide raised to $7.2-7.4B incl. acquisitions; consensus $7.8B), FY27E $9.6B
  fcfMargin25: 0.08,           // ~$490M est. FCF / $6.15B rev (trough year, high CAPEX)
  taxRate: 0.22,
  cash: 112,                   // Jun 2026 (stockanalysis)
  debt: 6350,
  beta: 0.90,
  costDebt: 0.045,

  modelType: 'EPS_PE',
  baseEps: 16.96,              // FY26E adj. EPS consensus (range $15.11-18.10) — depressed by acquired-inventory step-up charges and energy costs; FY25A $18.77, FY27E $21.61 (+27%)

  rsRating: 21,                // IBD RS per user, 10/11/2026 (was 38)
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $1,947M (+21%), adj. EPS $5.00 (+3%; beat ~$4.76), GAAP
  // $4.26 (−12%). Aggregates shipments 61.6M tons (+17%; organic +2.3%,
  // 4th straight organic gain); reported ASP −2% on acquisition mix,
  // organic mix-adjusted +3.7%. Gross profit/ton $6.78 (vs $8.15) incl.
  // $0.84/ton acquired-inventory charge + energy costs. FY26 revenue guide
  // RAISED to $7.2-7.4B; adj. EBITDA held at $2.36-2.50B. Stock fell on
  // margins. Street: Buy (24), PT $496-800 (median $639.50); FY26E EPS
  // $16.96, FY27E $21.61. Stock $478.35 (~28× FY26E, ~22× FY27E), down
  // ~25% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Quarry and logistics oligopoly with near-impenetrable permitting barriers creating a lasting geographic moat',
    'Infrastructure bill with half its funds still unspent provides a multi-year government demand runway',
    'Data center and energy construction emerging as a fast-growing new demand driver beyond traditional infrastructure',
    'Recent acquisitions add significant scale, and earnings should rebound sharply once one-time acquisition accounting charges roll off',
    'Disciplined pricing with sustained positive price-to-cost spread demonstrates genuine aggregates pricing power',
  ],

  risksToBuy: [
    'Premium valuation on trough-year earnings leaves substantial downside if the construction cycle disappoints',
    'Housing remains a persistent drag and any broader economic slowdown would accelerate volume weakness',
    'Data center and energy demand is still a small share of volume — too small to offset a broad cyclical turn',
    'Acquisitions pushed debt higher and diluted the share count, while margins are currently being squeezed by energy costs',
    'Cyclical business priced as a secular compounder — the multiple compresses sharply if growth stalls',
  ],

  // ── EPS/PE Scenarios (updated post-earnings call) ──
  epsCagr: [6, 12, 15],        // From the depressed FY26E $16.96 base (FY27E +27% as acquisition charges roll off); was [5,10,14] off FY25A $18.77
  exitPE: [18, 22, 26],        // bear: historical trough; base: quality cyclical; bull: premium for infra visibility
  prob: [30, 45, 25],          // ~25-30% prob of 15%+ CAGR (bull only, and barely)

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 496, targetMedian: 639.5, targetHigh: 800, numAnalysts: 24 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.17, 0.05, 0.03, 0.03, 0.03],        // Bear: FY26 at guide low end (acquisitions), then housing drag persists
    [0.20, 0.15, 0.06, 0.06, 0.05],        // Base: FY26 ≈ $7.4B guide, FY27 full-year acquisitions (haircut vs consensus), then normalizes
    [0.24, 0.20, 0.08, 0.07, 0.07],        // Bull: IIJA runway + DC/energy demand sustains above-consensus growth
  ],
  fcfMargin: [
    [0.10, 0.10, 0.10, 0.09, 0.09],         // Bear: some capex relief but margin normalization offsets
    [0.16, 0.18, 0.19, 0.20, 0.20],         // Base: capex -29% drives FCF uplift, margins stabilize
    [0.18, 0.20, 0.21, 0.22, 0.22],         // Bull: capex discipline + network optimization + pricing power
  ],
  termGrowth: [0.015, 0.020, 0.025],
  exitMultiple: [10, 14, 17],               // EV/EBITDA: aggregates trade 10-17x
  bbRate: [0.005, 0.01, 0.015],             // Moderate buybacks, leverage 2.3x — not aggressive
  ebitdaProxy: [0.32, 0.36, 0.37],          // EBITDA margin: 2026 guide ~$2.49B / ~$6.81B ≈ 36.6%
  bullMaOptVal: false,                       // Not an M&A-driven story at this stage

  desc: [
    'The construction cycle turns down despite infrastructure tailwinds: housing stays weak, organic volume stalls and energy costs keep squeezing margins while acquisition integration disappoints. ' +
      'Earnings grow only ~6% from the depressed FY26E $16.96 and the multiple compresses toward its trough (~18x). 5yr target {target} ({cagr} annualized).',
    'Organic volumes keep growing modestly, mid-single-digit organic pricing holds and acquisition accounting charges roll off, so FY27 earnings rebound sharply; infrastructure funding and data-center/energy projects add demand. ' +
      'Earnings compound ~12% and the market values MLM as a quality cyclical at 22x. 5yr target {target} ({cagr} annualized).',
    'An infrastructure supercycle plays out as government spending extends and data-center and energy construction keep scaling; acquisition synergies and network optimization drive margins higher. ' +
      'Earnings compound ~15% and the market pays a 26x premium for visibility. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Cyclical downturn materializes despite infrastructure funding: housing recovery fails, energy costs stay high and acquisitions dilute returns. ' +
      'Data center + energy demand is still too small a share of volume to offset broad cyclical weakness, and higher post-acquisition leverage limits flexibility.',
    'Solid aggregates operator with genuine barriers (permits, quarries, logistics). Q2 2026: record revenue, fourth straight quarter of organic volume growth and mid-single-digit organic pricing. ' +
      'Headline margins are temporarily depressed by acquired-inventory charges and energy costs; the stock is down ~25% in a year, a better entry than the 30x+ of 2025.',
    'Best-in-class aggregates franchise with acquisitions adding scale: if infrastructure funding, data centers and energy all deliver alongside a housing recovery, MLM approaches compounder territory — but even then EPS growth is low-to-mid teens, not a secular engine.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.008, 0.008, 0.008],  // Upgraded for capex -29% + network optimization
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.010],  // DC/energy + network optimization upside
    },
  ],

  debtSafety: {
    netDebt: 6240,         // Jun 2026 (stockanalysis): ~$6.35B debt − ~$0.11B cash
    ebitda: 2430,          // FY26 adj. EBITDA guide midpoint ($2.36-2.50B)
    capexToOcf: 0.45,      // approximate — quarry/plant capex is heavy by design
    interestCoverage: 6,   // approximate
    altmanZ: 2.6,          // approximate
    fy: 'FY26E',
    note: '~2.6× EBITDA after acquisitions → step 3. Fails the asset-light test by design (aggregates are capital-intensive), so RED on the strict rule despite comfortable interest coverage and investment-grade credit. Step-3 inputs are estimates.',
  },
});
