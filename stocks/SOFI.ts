import { defineStock } from './defineStock';

export const SOFI = defineStock({
  updatedOn: '10/15',
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 15.09,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$12 - $30',  // stockanalysis.com analyst target range (Sep 8 2026)
  shares0: 1290,
  rev25: 3586,         // FY2025A adj. net revenue; revGrowth[0] = FY26 (guide $4.75-4.85B raised, +32-35%; consensus $4.88B), FY27E $6.10B (+25%)
  fcfMargin25: 0.347,
  taxRate: 0.15,
  cash: 3370,
  debt: 3420,
  beta: 2.3,
  costDebt: 0.055,
  // Switched DCF_ADVANCED → EPS_PE at the Oct 2026 review: SoFi is a bank —
  // its balance-sheet debt/deposits are operational funding, so the decision
  // tree's lender rule applies (like ENVA/NU).
  modelType: 'EPS_PE',
  baseEps: 0.59,       // FY26E adj. EPS — guide ~$0.60 (held at Q2), consensus $0.59 (range $0.56-0.63); FY27E $0.82 (+39%)
  rsRating: 32,        // IBD RS per user, 10/11/2026 (was 37)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record adj. net revenue ~$1.2B (+40%), members 15.8M (+35%, record 1.1M
  // adds), record originations $14.8B, adj. EPS $0.12 (beat $0.11). FY26
  // revenue guide RAISED to $4.75-4.85B (+32-35%) but adj. EBITDA (~$1.6B),
  // adj. net income (~$825M) and EPS (~$0.60) HELD — stock fell ~10% on the
  // flat profit outlook. Street: Hold (24), PT $12-30 (median $19); FY26E
  // rev $4.88B / EPS $0.59, FY27E $6.10B / $0.82. Stock $15.80 (~27× FY26E,
  // ~19× FY27E; P/B ~1.8), down ~44% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Fee-based technology platform revenue now approaching half of total, reducing dependence on cyclical lending income',
    'Galileo and Technisio power payments infrastructure for thousands of fintechs, creating a durable B2B revenue base',
    'Bank charter lowers cost of deposits, a structural funding advantage over non-bank fintech competitors',
    'Stablecoin and crypto rail optionality could open an entirely new revenue vertical if regulatory clarity arrives',
    'Revenue and member growth keep accelerating, and next year\'s earnings are expected to grow far faster than this year\'s',
  ],

  risksToBuy: [
    'Lending is a commodity business — SoFi has limited pricing power and thin switching-cost barriers against banks and credit unions',
    'Credit cycle deterioration could push net charge-offs well above tolerance, forcing reserve builds that crush earnings',
    'Brand awareness remains low relative to incumbent banks, making customer acquisition expensive and growth capital-intensive',
    'Revenue guidance keeps rising while profit guidance stays flat, so growth is costing more than investors expected',
    'Rising cost of capital in a higher-for-longer rate environment squeezes net interest margin on the lending book',
  ],

  epsCagr: [8, 20, 27],   // From the FY26E $0.59 base; base = FY27 +39% consensus then a fade to mid-teens (haircut vs mgmt's 38-42% to 2028)
  exitPE: [11, 18, 25],   // Bank-like trough / growth-fintech / platform premium
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Hold', targetLow: 12, targetMedian: 19, targetHigh: 30, numAnalysts: 24 },  // stockanalysis.com (Sep 8 2026)
  revGrowth: [
    [0.32, 0.12, 0.08, 0.05, 0.03],   // Bear: FY26 locked by guide, then credit cycle bites
    [0.35, 0.24, 0.18, 0.12, 0.10],   // Base: FY26 ≈ $4.85B, FY27 ≈ $6.0B, then fade
    [0.37, 0.30, 0.25, 0.18, 0.14],   // Bull: fee platform + crypto rails scale
  ],
  fcfMargin: [
    [0.26, 0.25, 0.24, 0.23, 0.22],
    [0.34, 0.34, 0.35, 0.36, 0.37],
    [0.36, 0.37, 0.38, 0.40, 0.42],
  ],
  exitMultiple: [12, 16, 20],
  ebitdaProxy: [0.22, 0.34, 0.40],
  desc: [
    'Credit cycle deterioration forces reserve builds and growth slows sharply; EPS compounds only ~8% from the FY26E $0.59 and the P/E compresses to a bank-like 11x. 5yr target {target} ({cagr} annualized).',
    'FY27 lands near the +39% consensus as operating leverage arrives, then growth normalizes toward mid-teens; EPS compounds ~20% and the market pays 18x for a scaled digital bank. 5yr target {target} ({cagr} annualized).',
    'Management\'s high-30s/low-40s EPS CAGR plays out through 2028 and fee-platform plus crypto optionality materializes; EPS compounds ~27% and the P/E holds 25x. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 19 * 1279 * 0.07,

  debtSafety: {
    netDebt: 50,           // Jun 2026 (stockanalysis): ~$3.42B corporate/warehouse debt − ~$3.37B cash
    ebitda: 1600,          // FY26E adj. EBITDA guide
    fy: 'FY26E',
    note: 'Framework largely N/A for a bank — deposits fund the loan book. Corporate/warehouse debt is roughly offset by cash; real safety metrics are capital ratios and credit losses.',
  },
});
