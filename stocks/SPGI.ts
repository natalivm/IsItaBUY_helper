import { defineStock } from './defineStock';

export const SPGI = defineStock({
  updatedOn: '10/15',
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 424.81,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$477 - $553',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 294.8,      // 294.77M (stockanalysis, Oct 2026)
  rev25: 13650,        // FY2025 PRO FORMA ex-Mobility (~$15.34B reported less ~$1.7B Mobility, spun Jul 1 2026 as MBGL); revGrowth[0] = FY26 (guide +5.9-7.9% ex-Mobility)
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
  reasonsToBuy: [
    'Ratings and index businesses are regulatory-embedded monopolies — issuers and fund managers have no credible alternative',
    'CapIQ and Platts are workflow systems-of-record that AI models augment rather than replace, deepening rather than disrupting the moat',
    'AI-driven efficiency program targeting meaningful cost reduction creates a structural margin uplift not yet priced in',
    'Over half a century of consecutive dividend increases reflects the earnings durability of a near-monopoly data franchise',
    'Passive investing growth structurally benefits the index business as trillions in AUM track S&P-branded benchmarks',
  ],

  risksToBuy: [
    'Credit cycle slowdown sharply reduces debt issuance volume, which directly compresses the ratings segment revenue',
    'Antitrust and regulatory scrutiny on index monopoly power could constrain pricing or force structural changes',
    'Debt-funded buybacks keep leverage elevated relative to the pre-IHS Markit balance sheet',
    'A premium multiple already reflects the franchise quality, leaving returns dependent on steady earnings growth rather than re-rating',
    'After the Mobility spin the company is more concentrated in ratings and indices, which swing with credit issuance and markets',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 477, targetMedian: 521, targetHigh: 553, numAnalysts: 24 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.06, 0.04, 0.04, 0.04, 0.04],   // Bear: FY26 low end of guide, then issuance slump
    [0.07, 0.075, 0.075, 0.07, 0.07], // Base: FY26 mid-guide (ex-Mobility), structural HSD growth
    [0.08, 0.09, 0.09, 0.085, 0.08],  // Bull: ratings + index tailwinds compound
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
