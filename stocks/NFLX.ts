import { defineStock } from './defineStock';

export const NFLX = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  ticker: 'NFLX',
  name: 'Netflix',
  sector: 'Entertainment',
  themeColor: '#ff007f',
  currentPrice: 70.3,
  fairPriceRange: '$57 - $135',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 4222.0,
  rev25: 45180,
  fcfMargin25: 0.209,
  taxRate: 0.137,
  cash: 8500,
  debt: 14000,
  beta: 1.10,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  rsRating: 52,         // IBD RS per user, 10/10/2026 (was 13)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 16, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $12.56B (+13.4%, +12% FX-neutral), in line with guide (ads ~7%
  // below consensus — slower ad ramp). Op income $4.2B (+11%), margin 33.4%
  // (vs 34.1%). FCF $1.53B (-33%). Record $4.7B buyback. FY26 guide narrowed
  // to $51.0-51.4B revenue, 31.5% op margin; Q3 revenue $12.86B, margin
  // 33.2%. Stock -8-10% on the print. WBD: Warner Bros. Discovery
  // terminated the Netflix merger agreement Feb 27 2026 (to merge with
  // Paramount Skydance); Netflix received a $2.8B termination fee — a
  // one-time boost to 2026 EPS. Street: Buy (51), PT $57-135 (median $90);
  // FY26E EPS $3.59 / rev $51.2B, FY27E $3.81 / $57.0B (the small FY27 EPS
  // step-up is consistent with lapping the fee).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Unrivaled global streaming brand with deep content investment moat that new entrants cannot replicate quickly',
    'Ads-supported tier still nascent with advertising revenue per member far below the monetization ceiling of comparable platforms',
    'Sustained pricing power — multiple annual price increases absorbed with minimal churn demonstrates brand loyalty',
    'Operating margin expansion trajectory of roughly two percentage points per year creates durable earnings compounding',
    'Live sports and event content expansion opens a structurally new engagement and monetization surface',
  ],

  risksToBuy: [
    'Valuation already reflects the base-case compounding story — entry at current price leaves limited margin of safety',
    'Advertising revenue is cyclical; a macro slowdown disproportionately compresses the ads tier that drives the margin thesis',
    'Content cost inflation and competitive bidding wars with deep-pocketed studios and tech giants could erode FCF margins',
    'The advertising ramp is running slower than expected, delaying the margin story the bull case depends on',
    'Subscriber saturation in high-ARPU English-language markets limits the geographic runway for premium pricing expansion',
  ],

  // 2026 guide narrowed to $51.0-51.4B (+13%), op margin 31.5%. Ads ~$3B (ramp slower than planned).

  analystConsensus: { rating: 'Buy', targetLow: 57, targetMedian: 90, targetHigh: 135, numAnalysts: 51 },  // stockanalysis.com, Oct 8 2026
  revGrowth: [
    [0.12, 0.05, 0.05, 0.05, 0.04], // Bear: FY26 ~locked at guide; growth halves after, ads cyclical hit
    [0.134, 0.11, 0.10, 0.09, 0.08], // Base: FY26 ≈ $51.2B guide/consensus, FY27 ≈ $57.0B, natural deceleration
    [0.14, 0.15, 0.14, 0.13, 0.12], // Bull: ads momentum + pricing + live
  ],

  // Op margin 31.5% in 2026, expanding +2pp/yr (core +2.5pp ex-M&A drag).
  // TIKR FCF: 2026E $11.5B, 2027E $14.5B, 2028E $17B, 2029E $19.6B, 2030E $21.5B.
  // Content cash-to-expense ratio ~1.1x (stable) supports FCF.
  fcfMargin: [
    [0.195, 0.200, 0.205, 0.205, 0.200], // Bear: margin plateau ~20%, no operating leverage
    [0.225, 0.250, 0.268, 0.283, 0.288], // Base: TIKR FCF trajectory, margin expansion via ads + scale
    [0.245, 0.275, 0.295, 0.310, 0.320], // Bull: ads ARM near parity, 35%+ op margin
  ],

  // Exit multiples (EBITDA): Bear ~P/E 18x, Base ~P/E 23x, Bull ~P/E 28x
  exitMultiple: [14, 18, 22],

  desc: [
    'Ads cyclicality + subscription slowdown. Revenue growth falls to ~5%, margin plateaus, P/E compresses to ~18x. 5yr target {target} ({cagr} annualized).',
    'Executes 2026 guide ($51.2B revenue, 31.5% op margin); ads scale despite the slower ramp. EPS compounds ~15% from the ~$3.05 underlying FY26 base at a ~23x exit. 5yr target {target} ({cagr} annualized).',
    'Structural cash compounder. Ads ARM near parity, margin +2.5pp/yr sustained. 18% EPS CAGR, premium ~28x multiple. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Revenue falls to ~5% growth, ads hit by cycle, multiple to 18x. 5yr price {target} ({cagr} annualized).',
    'Management executes guide. Revenue ~10-11% post-2026, margin expands via ads + leverage. At ~23x underlying FY26 EPS after the post-Q2 sell-off, 5yr price {target} ({cagr} annualized).',
    'Ads ARM gap closes, 35%+ op margin sustained. Revenue 12-15%. 5yr price {target} ({cagr} annualized).',
  ],

  // Terminal growth aligned with DCF analysis: conservative 2%, base 3%, bull 3.5%
  termGrowth: [0.02, 0.03, 0.035],

  baseEps: 3.05,        // FY26E UNDERLYING EPS (est.): stockanalysis consensus $3.59 less ~$0.54/sh for the one-time $2.8B WBD termination fee (after tax, ~4.2B shares). FY27E $3.81 ≈ +25% on this base. Prior: $3.13.
  epsCagr: [8, 15, 18],
  exitPE: [18, 23, 28],
  prob: [25, 45, 30],

  // WBD deal terminated Feb 27 2026 (Netflix received a $2.8B fee) — M&A optionality removed.
  bullMaOptVal: false,

  burry: {
    sbc: 368,
    gaapNi: 10981,
    buyback: 9173,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 22,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — real owner profit ~78% of GAAP. FY25 actuals (TIKR): SBC just $368M (0.78% of revenue — extraordinarily low), buybacks $9,173M = 25× SBC, share count down 5% over 5y. Our 4y-MTM formula reproduces only 11% from these inputs (vs Burry\'s 22%) because (a) SBC has declined sharply since the 2022 peak ($575M), so the vesting cohort carries higher historical SBC than current flow suggests, (b) the Nov 2025 10:1 stock split scrambles single-multiplier MTM math across grant cohorts. Trust Burry\'s 22% as the anchor here.',
  },
  debtSafety: {
    netDebt: 5500,
    ebitda: 14000,
    fy: 'FY25',
    note: 'Balance sheet transformed by the ads + password-sharing crackdown. Massive FCF generation has rendered $14B debt nearly irrelevant at 0.39× EBITDA. Stops at Step 2 with ease.',
  },
});
