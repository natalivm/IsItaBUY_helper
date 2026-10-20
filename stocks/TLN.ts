import { defineStock } from './defineStock';

export const TLN = defineStock({
  ticker: 'TLN',
  name: 'Talen Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '10/20',
  currentPrice: 349.43,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$307 - $560',  // stockanalysis.com analyst target range (Sep 30 2026)
  shares0: 47.91,  // stockanalysis (Oct 2026)
  rev25: 2630,     // FY2025A (was 2,430); revGrowth[0] = FY26 (consensus $4.53B, +72% with ECP + Cornerstone plants), FY27E $5.24B
  fcfMargin25: 0.20,
  taxRate: 0.21,
  cash: 232,       // Jun 2026 (stockanalysis)
  debt: 9570,      // pre-acquisition debt + ECP and Cornerstone financing
  beta: 1.0,       // Elevated post-acquisition leverage raises equity beta from 0.85
  costDebt: 0.07,
  modelType: 'EPS_PE',
  baseEps: 26.6,    // FY26 adj. FCF/share: guide $1.20-1.35B (raised at Q2) / ~47.9M shares. Mgmt targets ~$37 (FY27) and ~$48 (FY28) FCF/share. Street FY26E adj. EPS $22.26. Prior $10.50 was pre-ECP/Cornerstone. GAAP is distorted by hedging marks.
  rsRating: 52,     // IBD RS per user, 10/11/2026 (was 72)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $747M (vs $630M), adj. EBITDA $374M, adj. FCF $212M; GAAP net
  // loss $92M (derivative marks + interest). FY26 GUIDE RAISED: adj. EBITDA
  // $2,025-2,225M, adj. FCF $1,200-1,350M (Cornerstone acquisition — three
  // plants closed June 2026 — plus stronger markets). Mgmt: FCF/share ~$37
  // (2027) and ~$48 (2028), ≥70% returned via buybacks; $200M repurchased in
  // Q2, $1.7B capacity left through 2028. Street: Buy (17), PT $307-560
  // (median $470); FY26E EPS $22.26, FY27E $30.75. Stock $378.57 (~14×
  // FY26E FCF/share, ~10× mgmt's FY27 target).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    '24/7 carbon-free nuclear baseload is genuinely scarce and cannot be replicated at hyperscale',
    'Amazon Susquehanna co-location deal proves hyperscalers will pay a structural premium for nuclear power',
    'Gas plant acquisition was priced well below peer comps, providing immediate value accretion',
    'Acquisitions have roughly doubled the cash-flow base, and management targets steep per-share free-cash-flow growth through 2028',
    'AI-driven data center electricity demand represents a multi-decade structural tailwind for power generators',
  ],

  risksToBuy: [
    'One of the most leveraged balance sheets in the portfolio after debt-funded gas plant acquisitions',
    'Entire investment thesis depends on AI power demand driving rapid EBITDA expansion to service debt',
    'PJM geographic concentration with no ERCOT diversification unlike major peers',
    'FERC regulatory scrutiny on nuclear-to-data-center co-location could delay or cap co-location deals',
    'Gas plant integration execution risk on a complex multi-gigawatt acquisition at elevated leverage',
  ],

  epsCagr: [4, 13, 18],   // FCF/share CAGR from the FY26 $26.6 base — base is a deliberate haircut to mgmt's FY27-28 targets (~$37/$48) for leverage + merchant risk
  exitPE: [10, 14, 18],   // P/FCF exits for a levered IPP (was [13,18,24] on a lower base)
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 307, targetMedian: 470, targetHigh: 560, numAnalysts: 17 },  // stockanalysis.com (Sep 30 2026)
  revGrowth: [
    [0.55, 0.05, 0.03, 0.03, 0.03],  // Bear: acquisitions consolidate, then PJM reform headwinds + soft power prices
    [0.70, 0.15, 0.08, 0.07, 0.06],  // Base: FY26 ≈ $4.5B with ECP + Cornerstone, FY27 ≈ consensus
    [0.80, 0.22, 0.15, 0.12, 0.10],  // Bull: AI power surge + nuclear co-location premium + hyperscaler deals
  ],
  fcfMargin: [0.16, 0.21, 0.26],
  exitMultiple: [11, 16, 22],
  desc: [
    'Regulatory setback on nuclear co-location and PJM capacity market reforms pressure revenues; gas plant integration disappoints and elevated leverage absorbs cash. FCF/share barely grows from the FY26 ~$26.6 and the stock trades at 10x FCF. 5yr target {target} ({cagr} annualized).',
    'ECP and Cornerstone integrate on schedule and buybacks shrink the share count, but FCF/share lands well short of management\'s FY28 target; growth averages ~13% and the market pays 14x FCF. 5yr target {target} ({cagr} annualized).',
    'AI-driven electricity demand lifts PJM capacity prices and the Susquehanna co-location model expands to more hyperscaler deals; management\'s FCF/share targets are met and exceeded and the stock re-rates to 18x. 5yr target {target} ({cagr} annualized).',
  ],
  debtSafety: {
    netDebt: 9340,         // Jun 2026 (stockanalysis): ~$9.57B debt − ~$0.23B cash
    ebitda: 2125,          // FY26 adj. EBITDA guide midpoint ($2,025-2,225M, incl. acquired plants)
    capexToOcf: 0.44,
    interestCoverage: 2.6,  // est. EBIT ~$1.7B / ~$650M interest — approximate
    altmanZ: 1.6,
    fy: 'FY26E',
    note: '~4.4× FY26E EBITDA (was ~9.6× on the pre-acquisition FY25 base) with thin interest coverage → RED. Leverage is falling as acquired EBITDA comes in, but the thesis still depends on sustained PJM pricing; if capacity prices disappoint, this balance sheet is the weak point.',
  },
});
