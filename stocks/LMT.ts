import { defineStock } from './defineStock';

export const LMT = defineStock({
  ticker: 'LMT',
  name: 'Lockheed Martin Corp.',
  sector: 'Aerospace & Defense',
  themeColor: '#4b8ef5',
  currentPrice: 589.91,
  updatedOn: '10/23',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$503 - $756',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 230.8,
  rev25: 75050,        // FY2025A (was 72,600); revGrowth[0] = FY26 (guide $79.75-81.75B raised; consensus $81.0B, +8%), FY27E $85.6B (+6%)
  fcfMargin25: 0.085,
  taxRate: 0.17,
  cash: 3790,
  debt: 20540,
  beta: 0.52,
  costDebt: 0.045,
  rsRating: 51,        // IBD RS per user, 10/11/2026 (was 38)
  rsTrend: 'rising',
  // ratingOverride removed Oct 2026: re-based to FY26E EPS the model itself reads HOLD (base CAGR ~6%), matching the narrative.
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Jul 23, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Sales $20.1B (+11%), EPS $7.94 (beat ~$7.22), FCF $2.9B (vs −$0.15B).
  // Record backlog $230B incl. a 7-year, $35B THAAD contract (quadrupling
  // interceptor output); orders $65B, book-to-bill 3.2. FY26 GUIDE RAISED:
  // sales $79.75-81.75B, EPS $29.95-30.65, FCF $7.0-7.2B, segment op profit
  // $8.5-8.7B. Street: Buy (23; 13 Hold), PT $503-756 (median $620); FY26E
  // rev $81.0B / EPS $30.48, FY27E $85.6B / $32.65. Stock $509.59 (~16.7×
  // FY26E). Q3 2026 reports ~Oct 21.
  // ─────────────────────────────────────────────────────────────────────────

  verdictNarrative:
    "Lockheed Martin currently looks materially more attractive on a risk-adjusted basis than many speculative defense names that have rallied over the past year. Unlike KRMN or ONDS, the valuation is supported by enormous existing cash flows, entrenched defense programs, and decades-long government relationships. The company also benefits from some of the strongest geopolitical tailwinds in the industrial sector — NATO spending acceleration, Indo-Pacific buildup, and sustained US missile defense investment. " +
    "The fundamental case is solid — a record $230B backlog anchored by the THAAD multiyear award, ~$7B of FCF, low beta and Pristine SBC — and Q2 2026 brought a beat-and-raise. But at ~17x earnings with mid-to-high single-digit EPS growth, the expected return is modest, and relative strength has only just recovered into the low 50s after a long stretch of weakness as capital rotated into faster-growing defense-tech names. " +
    "HOLD. The valuation is reasonable, the geopolitical tailwinds are real and momentum is turning, but the model's ~6% base-case return keeps this a HOLD. Upgrade trigger: RS sustaining above 50 plus a higher earnings trajectory (e.g. FY27 guidance well above consensus).",

  reasonsToBuy: [
    'Dominant defense prime with unmatched entrenchment across F-35, missile defense, and classified programs',
    'Sustained geopolitical tailwinds — NATO expansion and Indo-Pacific buildup drive multi-decade budget growth',
    'Best-in-class SBC profile among large-cap defense primes with minimal earnings dilution',
    'Low beta and highly visible multi-year government contract cash flows offer defensive positioning',
    'Record backlog after a massive multiyear interceptor award gives unusual multi-year revenue visibility',
  ],

  risksToBuy: [
    'F-35 procurement timing and Pentagon cost scrutiny keep program margins under pressure',
    'Earnings growth is modest, so returns depend heavily on dividends and buybacks rather than expansion',
    'Capital rotating into faster-growing missile, drone, and AI-defense names ahead of LMT',
    'Large fixed-price development programs have produced repeated charges in recent years',
    'Elevated debt load relative to peers limits financial flexibility if defense budgets shift',
  ],

  modelType: 'EPS_PE',
  baseEps: 30.48,      // FY26E EPS consensus (guide $29.95-30.65 raised at Q2; FY27E $32.65 +7%). Prior $27.2 was LTM FCF/share.
  epsCagr: [2, 6, 9],
  exitPE: [14, 17, 19],
  prob: [25, 50, 25],

  revGrowth: [
    [0.07, 0.02, 0.02, 0.02, 0.02],
    [0.08, 0.055, 0.05, 0.04, 0.04],
    [0.09, 0.08, 0.07, 0.07, 0.06],
  ],
  fcfMargin: [
    [0.08, 0.08, 0.08, 0.08, 0.08],
    [0.085, 0.09, 0.095, 0.10, 0.10],
    [0.09, 0.10, 0.11, 0.11, 0.12],
  ],
  exitMultiple: [10, 13, 16],
  termGrowth: [0.015, 0.025, 0.030],
  waccAdj: [0.008, 0, -0.008],
  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.13, 0.17, 0.22],
  bullMaOptVal: false,

  desc: [
    'F-35 procurement delays, new program charges and Pentagon cost scrutiny slow LMT to ~2% growth after FY26; EPS barely grows from the FY26E $30.48 and the multiple compresses to 14×. 5yr target {target} ({cagr} annualized), before dividends.',
    'NATO spending, Indo-Pacific buildup and the THAAD ramp sustain mid-single-digit revenue growth; EPS compounds ~6% with buybacks and the multiple settles at 17×. 5yr target {target} ({cagr} annualized), plus a ~2.7% dividend.',
    'Defense budget acceleration and missile-defense demand (THAAD, PAC-3, next-gen interceptors) drive high-single-digit EPS growth and margin recovery; the multiple expands to 19×. 5yr target {target} ({cagr} annualized).',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 503, targetMedian: 620, targetHigh: 756, numAnalysts: 23 },  // stockanalysis.com (Oct 2026)

  burry: {
    sbc: 600,
    gaapNi: 6900,
    buyback: 3000,
    epsBasis: 'GAAP',
    fy: 'LTM',
    overstatementPct: 9,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $600M is 8.7% of GAAP NI $6.9B. Buybacks ~5× SBC. One of the cleanest large-cap SBC profiles in the defense sector.',
  },

  debtSafety: {
    netDebt: 16750,        // Jun 2026 (stockanalysis): ~$20.5B debt − ~$3.8B cash
    ebitda: 9680,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net leverage ~1.7× EBITDA — manageable for a defense prime with a record backlog and highly visible multi-year government cash flows.',
  },
});
