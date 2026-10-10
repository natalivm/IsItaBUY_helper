import { defineStock } from './defineStock';

export const CAVA = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  ticker: 'CAVA',
  name: 'CAVA Group, Inc.',
  sector: 'Restaurants · Fast-Casual · Mediterranean',
  themeColor: '#c8553d',
  currentPrice: 53.64,
  fairPriceRange: '$18 - $110',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 118,
  rev25: 1180,         // FY2025 revenue $1.18B (was mis-set to $1.08B); FY26E consensus $1.50B (+27%), FY27E $1.82B (+21%)
  fcfMargin25: 0.022,  // FY25 FCF $26M
  taxRate: 0.27,
  cash: 393,
  debt: 0,
  beta: 1.50,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 0.55,       // FY2026E adjusted EPS — stockanalysis consensus (Oct 8 2026; range $0.52-0.60; FY27E $0.75, +36%). FY25 EPS $0.54 (flattered by a low tax rate; FY26 absorbs tax normalization).
  rsRating: 16,         // IBD RS per user, 10/10/2026 (was 76) — ~$73 (Aug 19) → $53.64
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  // ratingOverride 'OVERVALUED' removed at Q2 2026 review: its premise ("spot ~30% above base case") no longer holds —
  // after the slide to ~$54 the base case sits above spot. RS 16 already disables the quality boost, so the model rates honestly.

  // Q2 2026 UPDATE (Aug 11, 2026) — first data review since Q4 FY25
  // ─────────────────────────────────────────────────────────────────────────
  // Beat. Revenue $365.4M (+31.3%) vs $360.5M consensus. Same-restaurant
  // sales +9.0% (vs 7.6% consensus) incl. traffic +5.3%. Restaurant-level
  // margin 25.7%. Adj. EBITDA $54.7M (+30%); net income $23.0M (vs $18.4M).
  // 17 net new units → 476 (+19.6%). July cyclospora scare (Taylor Farms
  // iceberg lettuce — CAVA doesn't use it or the supplier) still dented
  // sales; comps dipped to ~flat then recovered to mid-single digits by
  // quarter-end. FY26 GUIDE HELD: SRS +4.5-6.5% (low end implies slightly
  // negative H2 comps), 75-77 openings, adj. EBITDA $181-191M. Stock
  // ~$73 (Aug 19) → $53.64 (Oct 9); cause of the Sep-Oct slide not
  // confirmed here. Street: Buy (28), PT $18-110 (median $85); FY26E EPS
  // $0.55 / rev $1.50B, FY27E $0.75 / $1.82B. ~98× FY26E / ~72× FY27E.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Only national fast-casual Mediterranean brand with genuine whitespace to expand from hundreds to thousands of locations',
    'Zero debt and substantial cash reserves eliminate financial risk and fund the unit expansion runway',
    'New restaurant volumes consistently above brand-level averages signal the concept travels well to new markets',
    'Loyalty and digital channels are early-stage, meaning a meaningful monetization layer has barely been tapped',
    'Brand awareness still well below leading fast-casual peers, leaving a large organic growth opportunity ahead',
  ],

  risksToBuy: [
    'Even after the sell-off the earnings multiple is very high, and a food-safety scare showed how quickly traffic can wobble',
    'Tax rate normalization from a very low base will hit reported EPS hard even if operations execute on plan',
    'Salmon menu addition adds margin headwind before traffic lift materializes, compressing near-term restaurant profitability',
    'FCF already heavily consumed by expansion capex — the business generates minimal owner cash at this stage',
    'Guidance implies flat-to-negative comparable sales in the back half, leaving little room for another traffic shock',
  ],

  epsCagr: [13, 27, 37],
  exitPE: [25, 35, 50],
  prob: [30, 40, 30],


  analystConsensus: { rating: 'Buy', targetLow: 18, targetMedian: 85, targetHigh: 110, numAnalysts: 28 },  // stockanalysis.com, Oct 8 2026
  revGrowth: [
    [0.24, 0.12, 0.10, 0.08, 0.06],   // Bear: FY26 ~locked by H1; comps turn negative, unit growth slows
    [0.26, 0.20, 0.15, 0.12, 0.10],   // Base (+1%/yr revPrem): FY26/FY27 ≈ consensus $1.50B / $1.82B
    [0.27, 0.24, 0.20, 0.18, 0.16],   // Bull (+2%/yr revPrem): unit growth accelerates, catering adds
  ],
  fcfMargin: [
    [0.025, 0.025, 0.03, 0.03, 0.03],
    [0.027, 0.035, 0.045, 0.055, 0.07],
    [0.03, 0.045, 0.06, 0.08, 0.10],
  ],
  exitMultiple: [15, 25, 35],
  desc: [
    'The H2 2026 comp softness the guide allows for (slightly negative at the low end) persists as the younger demo pulls back and food-safety scares linger. ' +
      'New-market productivity slips, tax normalization caps EPS, and salmon/AGM investments add cost without payback. EPS compounds only ~13% from the $0.55 FY26E base and the multiple compresses to 25x. ' +
      '5yr target {target} ({cagr} annualized). A good business at a price that still assumes too much.',
    'Unit expansion continues at 75+/yr (476 units at Q2 2026, new cohorts productive), driving ~20%+ revenue growth; comps settle mid-single digits after the cyclospora dip. ' +
      'Restaurant-level margins hold mid-20s. EPS compounds ~27% from $0.55 as tax normalization laps. The multiple compresses from ~98x to ~35x. ' +
      '5yr target {target} ({cagr} annualized) — after the sell-off, a reasonable but not compelling setup.',
    'Comps re-accelerate above 5%, catering launches successfully, unit growth heads toward 100+/yr on the path to 1,000 restaurants by 2032, and brand awareness climbs. ' +
      'EPS compounds ~37% and the market re-rates CAVA as a proven restaurant compounder at 50x. 5yr target {target} ({cagr} annualized).',
  ],
  thesis: [
    'Bear mechanics: CAVA still trades at a very high multiple of FY26E EPS that is itself depressed by tax normalization. Guidance already allows for negative H2 comps, the July food-safety scare showed traffic fragility, and FCF is consumed by expansion capex. ' +
      'If comps stay soft and the multiple compresses toward 25x, {target} from {spot} is a steep loss.',
    'Fundamentals are better than the stock: Q2 comps +9% with traffic +5.3%, 25.7% restaurant-level margin, zero debt, units +20%. The sell-off from ~$73 to {spot} removed much of the valuation excess the old OVERVALUED call flagged. ' +
      'But ~98x FY26E and an RS of 16 argue for patience. Verdict: HOLD — watch H2 comps, traffic and new-unit productivity.',
    'Bull: salmon, catering and loyalty drive comps above 5%, unit growth sustains 75-100/yr and margins expand on leverage. ' +
      'Requires macro normalization, no further food-safety shocks and sustained new-market success — then {target} is reachable from {spot}.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0.06, 0.10, 0.14],

  debtSafety: {
    netDebt: -393,         // zero debt; cash from FY25-era balance sheet — not refreshed
    ebitda: 186,           // FY26 adj. EBITDA guide midpoint ($181-191M)
    fy: 'FY26E',
    note: 'GREEN by Step 1 — no debt, net cash. Lease obligations not included.',
  },
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.002,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.005,
    },
  ],
});
