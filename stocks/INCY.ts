import { defineStock } from './defineStock';

export const INCY = defineStock({
  ticker: 'INCY',
  name: 'Incyte Corporation',
  sector: 'Biopharmaceuticals / Oncology & Dermatology',
  themeColor: '#00a3a1',
  currentPrice: 112.79,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$86 - $157',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 202.7,
  rev25: 5140,         // FY2025A; revGrowth[0] = FY26 (net sales guide raised to $5.13-5.26B; total revenue consensus $5.94B incl. one-time CMS benefit), FY27E $6.26B
  fcfMargin25: 0.20,
  taxRate: 0.19,
  cash: 3300,          // ~$4.54B cash/investments at Jun 30 (stockanalysis) less ~$1.25B est. for the Vega Therapeutics acquisition (Q3) — estimate
  debt: 38,
  beta: 0.65,
  costDebt: 0.04,
  rsRating: 91,        // IBD RS per user, 10/11/2026 (was 65)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',  // Model screens BUY but the Jakafi loss-of-exclusivity overhang (~2028) caps the multiple and the Street is split (15 of 28 Hold). HOLD.
  // Q2 2026 UPDATE (Jul 28, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Total revenue $1.67B (+38%), net sales $1.49B (+40%; +17% ex one-time
  // $246M CMS-settlement benefit to Opzelura). Jakafi $817M (+7%); Opzelura
  // $204M underlying (+24%). FY26 net sales guide RAISED to $5.13-5.26B
  // (Opzelura $1.05-1.10B; Niktimvo, Monjuvi, Zynyz strong). Opex guide up
  // on the Vega Therapeutics acquisition (~$1.27B IPR&D charge in Q3 —
  // depresses FY26 EPS). Street: Buy (28; 15 Hold), PT $86-157 (median
  // $129); FY26E EPS $3.24 (IPR&D-hit), FY27E $8.73. Stock $112.79 (~13×
  // FY27E), up ~32% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Cheap valuation relative to earnings power reflects overstated fear about the Jakafi patent cliff',
    'Fortress balance sheet with substantial net cash and zero long-term debt funds the R&D transition with no dilution risk',
    'Opzelura in vitiligo and atopic dermatitis is a multi-year growth franchise still in early commercial penetration',
    'Niktimvo and povorcitinib represent credible pipeline diversification beyond the Jakafi-dependent revenue base',
    'Standing M&A target optionality — profitable, debt-free, and undervalued relative to large-cap pharma acquirers',
  ],

  risksToBuy: [
    'Jakafi loss of exclusivity creates a revenue cliff that the pipeline must overcome with unproven commercial execution',
    'Pipeline readouts are binary events where trial failures could materially reset revenue expectations post-2028',
    'Large acquisitions and in-licensing to refill the pipeline consume cash and add integration and execution risk',
    'Revenue is heavily concentrated in one aging asset, making the business unusually vulnerable until diversification proves out',
    'Analysts are split, with more than half at Hold, implying the valuation already reflects much of the optionality',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 86, targetMedian: 129, targetHigh: 157, numAnalysts: 28 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.10, 0.00, -0.08, -0.05, 0.00],   // Bear: FY26 near guide low end; Jakafi LOE bites hard from 2028
    [0.13, 0.05, 0.00, 0.03, 0.05],     // Base: FY26 ≈ guide mid + royalties (incl. one-time CMS benefit), then LOE trough
    [0.16, 0.10, 0.06, 0.08, 0.10],     // Bull: pipeline outruns the cliff
  ],
  fcfMargin: [
    [0.18, 0.16, 0.13, 0.13, 0.14],
    [0.20, 0.20, 0.20, 0.21, 0.22],
    [0.22, 0.23, 0.24, 0.25, 0.26],
  ],
  exitMultiple: [8, 11, 14],
  desc: [
    'Jakafi loss of exclusivity around 2028 bites hard as generic ruxolitinib floods the myelofibrosis/polycythemia vera market, and the pipeline fails to fill the gap. Revenue declines mid-single digits, FCF margin compresses toward 13%, and the market re-rates to a value-trap 8× EBITDA on a shrinking-franchise narrative. 5yr target {target} ({cagr} annualized).',
    'The diversified pipeline cushions the Jakafi cliff: Opzelura keeps compounding in dermatology, Niktimvo and Monjuvi add scale, and povorcitinib/oncology readouts offset the generic erosion. Revenue holds roughly flat through the LOE trough then resumes mid-single-digit growth. FCF margin stabilizes near 20%; an 11× EBITDA reflects a steady, cash-generative specialty pharma. 5yr target {target} ({cagr} annualized).',
    'Pipeline execution outruns the cliff — Opzelura reaches blockbuster scale, Niktimvo/povorcitinib launches exceed expectations, and the oncology/MRGPRX2 programs deliver. Revenue compounds high-single to low-double digits, FCF margin pushes past 25%, and the debt-free balance sheet plus standing M&A optionality drive a re-rate to 14× EBITDA. 5yr target {target} ({cagr} annualized).',
  ],
  termGrowth: [0.01, 0.02, 0.025],
  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.24, 0.28, 0.32],
  burry: {
    sbc: 249,
    gaapNi: 1300,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'FY25 SBC $249.3M (10-K) on GAAP NI ~$1.3B = naive SBC/NI ~19%, typical for biopharma. Range-bound/down stock keeps the MTM amplifier low (~1.3×) → ~25%. No buyback offset in FY25 — the $2.0B/$1.67B Dutch-auction tender was a 2024 event; in 2025 cash built from $2.2B to $3.6B with no material repurchases. OK tier — owner profit ~75% of GAAP.',
  },
  debtSafety: {
    netDebt: -3260,        // ~$3.3B cash after the Vega deal (estimate) − ~$0.04B debt; $4.5B net cash at Jun 30
    ebitda: 1940,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash fortress — multi-billion cash/securities and essentially no debt even after the Vega acquisition. No leverage risk; balance sheet funds the Jakafi-cliff transition.',
  },
});
