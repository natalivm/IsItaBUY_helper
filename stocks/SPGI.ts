import { defineStock } from './defineStock';

export const SPGI = defineStock({
  updatedOn: '10/27',
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 448.95,
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-10-27',
  fairPriceRange: '$477 - $553',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 294.8,      // 294.77M (stockanalysis, Oct 2026)
  rev25: 13650,        // FY2025 PRO FORMA ex-Mobility (~$15.34B reported less ~$1.7B Mobility, spun Jul 1 2026 as MBGL); revGrowth[0] = FY26 (guide RAISED at Q3 to +7.4-8.4%, from +5.9-7.9%)
  fcfMargin25: 0.357,
  taxRate: 0.22,
  cash: 4130,          // stockanalysis (Jun 2026 balance sheet, around the spin)
  debt: 15750,
  beta: 0.9,
  costDebt: 0.05,
  rsRating: 80,        // IBD RS per user, 10/11/2026 (was 21)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 28, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Mobility spun off Jul 1 2026 (Mobility Global, NYSE: MBGL); results now
  // pro forma ex-Mobility. Q2 revenue $3.68B (+11%), adj. EPS $4.83 (+23%;
  // one outlet: miss vs $5.02). Ratings +17%, Indices +20%, Market Intel
  // +6%, Energy +2-3%. FY26 GUIDE (ex-Mobility): revenue +5.9-7.9%, adj.
  // EPS $17.50-17.75; Ratings raised to +5-8%, Indices +12-14%. >$7B of
  // 2026 buybacks planned. Street: Strong Buy (24), PT $477-553 (median
  // $521); FY26E EPS $17.86, FY27E $20.19 (+13%). Stock $407.82 (~23×
  // FY26E), down ~15% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Strong Buy', targetLow: 477, targetMedian: 521, targetHigh: 553, numAnalysts: 24 },  // stockanalysis.com (Oct 8 2026)
  // Q3 2026 (reported Oct 27 2026, bmo) — BEAT, RAISED, AND CAPITAL IQ UP FOR REVIEW
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $3.68B, +7% YoY, against a consensus quoted anywhere from $3.64B to
  // $3.716B depending on the source. Adjusted diluted EPS $4.58 (vs $4.20 LY)
  // against ~$4.42-4.52; GAAP diluted EPS $4.45 — the two get swapped in some
  // coverage, and $4.45 is the GAAP figure, not a miss on the adjusted one.
  // FY26 REVENUE GROWTH OUTLOOK RAISED to +7.4-8.4% from +5.9-7.9%, which is the
  // input this DCF actually uses, so revGrowth[0] moved with it across all three
  // scenarios. FY26 adjusted diluted EPS guided $17.70-17.95. Buybacks stay above
  // $7B for 2026.
  //
  // WATCH ITEM — STRATEGIC REVIEW OF CAPITAL IQ and associated data businesses,
  // including a potential separation; they sit mostly inside Kensho Data &
  // Platforms within Market Intelligence. No timeframe given. If it separates,
  // `rev25` needs the same pro-forma treatment the Mobility spin got on Jul 1
  // 2026 — that is a revenue-base change, which for a DCF is the whole model.
  // Nothing is pre-empted here; the base is unchanged until something is agreed.
  // ─────────────────────────────────────────────────────────────────────────
  revGrowth: [
    [0.074, 0.04, 0.04, 0.04, 0.04],   // Bear: FY26 low end of the RAISED guide, then issuance slump
    [0.079, 0.075, 0.075, 0.07, 0.07], // Base: FY26 mid-guide (ex-Mobility), structural HSD growth
    [0.084, 0.09, 0.09, 0.085, 0.08],  // Bull: ratings + index tailwinds compound
  ],
  fcfMargin: [
    [0.32, 0.31, 0.31, 0.30, 0.30],
    [0.35, 0.35, 0.36, 0.36, 0.37],
    [0.37, 0.38, 0.39, 0.40, 0.41],
  ],
  exitMultiple: [15, 19, 21],
  ebitdaProxy: [0.48, 0.52, 0.55],
  desc: [
    'Credit cycle downturn + issuance slump: ratings revenue falls, growth slips to ~4% and margins stall; the market de-rates the franchise. 5yr target {target} ({cagr} annualized).',
    'Disciplined structural growth per guidance: revenue +6-8% ex-Mobility, steady ~35%+ FCF margins and >$7B/yr buybacks drive low-double-digit EPS growth. 5yr target {target} ({cagr} annualized).',
    'AI margin uplift + index tailwinds + a cleaner post-spin portfolio: revenue grows high-single digits and margins expand toward 40%+. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 417 * 298.8 * 0.07,
  debtSafety: {
    netDebt: 11610,        // Jun 2026 (stockanalysis): ~$15.75B debt − ~$4.13B cash (around the Mobility spin)
    ebitda: 7500,          // ex-Mobility EBITDA approx. (TTM reported $8.14B incl. Mobility)
    fy: 'TTM Q2 2026',
    note: 'GREEN (~1.5×). Modest leverage on a near-monopoly ratings + data business with 35%+ FCF margins; debt from the IHS Markit merger plus buybacks.',
  },
});
