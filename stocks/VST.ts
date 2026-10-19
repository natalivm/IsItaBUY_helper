import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 149.7,
  fairPriceRange: '$106 - $305',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 335.6,
  rev25: 17740,        // FY2025A (was 19,600); revGrowth[0] = FY26 (consensus $22.5B, +27% incl. Lotus plants), FY27E $24.1B (+7%)
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 435,           // Jun 2026 (stockanalysis)
  debt: 20510,
  beta: 1.43,
  costDebt: 0.056,
  modelType: 'EPS_PE',
  baseEps: 8.78,       // FY26E adj. EPS consensus (Oct 7 2026; range $8.11-9.45; FY27E $10.42 +19%). Prior $10.0 was above the FY26 consensus.
  rsRating: 77,        // IBD RS per user, 10/11/2026 (was 26)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '10/19',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  // Q2 2026 UPDATE (Aug 7, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Ongoing ops adj. EBITDA $1,767M (vs $1,349M; higher realized prices +
  // Lotus plants), GAAP NI $305M. FY26 guide REAFFIRMED: adj. EBITDA
  // $6.8-7.6B (tracking at/above midpoint), adj. FCFbG $3.925-4.725B. 2027
  // opportunity range $7.4-7.8B midpoint ex-Cogentrix and ex-Meta PPA
  // (Meta nuclear deal could add ~$700M). FERC approved Cogentrix; updated
  // guidance after close. Hedged ~100% of 2026, ~94% of 2027, ~72% of 2028.
  // Street: Strong Buy (21), PT $106-305 (median $211); FY26E EPS $8.78,
  // FY27E $10.42. Stock $161.48 (~18× FY26E), down ~22% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Signed long-term Meta and Amazon nuclear PPAs lock in contracted cash flows at premium prices',
    'Cogentrix gas acquisition adds scale and was priced well below comparable asset transactions',
    'Fitch investment-grade upgrade unlocks better financing terms and signals improving balance-sheet quality',
    'Vistra\'s nuclear and gas fleet is well-positioned for AI data center electricity demand over the next decade',
    'Aggressive buyback program at historically low average cost is compounding per-share value rapidly',
  ],

  risksToBuy: [
    'About half of earnings remain exposed to merchant power prices with no contracted floor',
    'Cogentrix integration execution risk on a large multi-gigawatt gas portfolio at elevated leverage',
    'Commodity and capacity-price exposure can reprice the stock sharply even with near-term volumes hedged',
    'High structural debt load typical of capital-intensive power generation requires sustained EBITDA growth',
    'Data center load growth impact on markets may not be material for years, delaying the re-rating',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 106, targetMedian: 211, targetHigh: 305, numAnalysts: 21 },  // stockanalysis.com (Oct 7 2026)
  revGrowth: [
    [0.20, 0.02, 0.03, 0.03, 0.03],   // Bear: FY26 below consensus, power prices soften
    [0.26, 0.07, 0.07, 0.06, 0.06],   // Base: FY26 ≈ $22.4B, FY27 ≈ consensus, then contracted growth
    [0.28, 0.12, 0.10, 0.09, 0.08],   // Bull: Cogentrix + Meta PPA + tight markets
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 12, 18],
  exitPE: [14, 17, 20],
  prob: [15, 45, 40],

  desc: [
    'Power prices crash and Cogentrix integration disappoints. Contracted nuclear PPAs provide a floor, but ~50% merchant exposure bleeds earnings. ' +
      'Earnings grow at only 5% annually from the FY26E $8.78 and the multiple compresses to 14x. 5yr target {target} ({cagr} annualized).',
    'Power prices normalize in a stable range. Cogentrix closes with mid-single-digit AFCF accretion and the Meta nuclear PPA is finalized, pushing more of EBITDA into contracted/stable sources. ' +
      'Earnings compound at 12% with a 17x exit on improved visibility; buybacks at ~$1B/yr remain a core per-share driver. 5yr target {target} ({cagr} annualized).',
    'Tight power markets amplify contracted earnings through 2027–28 data center ramp. All remaining PPAs (Beaver Valley, Comanche Peak uprate) get signed. ' +
      'Cogentrix delivers high-single-digit accretion. Cash deployed to buybacks drives AFCF/share toward $22–25 by 2030 as guided. ' +
      'Market re-rates to 20x on contracted earnings quality. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 158.00 * 339.0 * 0.07,
  debtSafety: {
    netDebt: 20075,        // Jun 2026 (stockanalysis): ~$20.5B debt − ~$0.4B cash (post-Lotus)
    ebitda: 6650,          // TTM EBITDA (FY26 guide $6.8-7.6B)
    capexToOcf: 0.42,
    interestCoverage: 3.5,
    altmanZ: 2.1,
    fy: 'TTM Q2 2026',
    note: 'High leverage is structural for power generation — capital-intensive assets (nuclear, gas) are debt-financed against long-term contracted cash flows. CapEx/OCF fails the asset-light test by design. Monitor whether contracted PPA coverage remains sufficient to service debt through the data center ramp.',
  },
});
