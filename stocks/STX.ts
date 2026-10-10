import { defineStock } from './defineStock';

export const STX = defineStock({
  ticker: 'STX',
  name: 'Seagate Technology Holdings',
  sector: 'Data Storage / AI Infrastructure',
  themeColor: '#00a651',
  currentPrice: 783,
  fairPriceRange: '$700 - $1,600',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 231,        // Q4 FY26 non-GAAP diluted (incl. exchangeable-note dilution)
  rev25: 12195,        // FY26A (FYE Jul 3 2026) $12.2B (+34%) — base year; revGrowth[0] = FY27 (consensus $18.97B, FY28E $25.5B)
  fcfMargin25: 0.255,  // FY26 FCF $3.1B
  taxRate: 0.15,
  cash: 1704,          // Jul 3 2026
  debt: 3565,          // Jul 3 2026 ($1.4B retired in FY26)
  beta: 1.98,
  costDebt: 0.045,
  rsRating: 85,         // IBD RS per user, 10/10/2026 (was 98) — ~$922 (Sep 29) → $783
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // ratingOverride removed at Q4 FY26 review: after moving to the WDC-style EPS framework the model reads HOLD on its own.
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',

  // Q4 FY26 UPDATE (Jul 28, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Q4 revenue $3.63B (vs ~$3.49B consensus); non-GAAP GM 52.7% (from 37.9%),
  // op margin 44.6%; non-GAAP EPS $5.71 (vs ~$5.09), GAAP $5.58. FY26: revenue
  // $12.2B (+34%), non-GAAP EPS $15.58 (GAAP $13.90), FCF $3.1B, $1.4B debt
  // retired, dividends $634M + buybacks $176M. SBC only $213M. Cash $1.7B vs
  // debt $3.6B. Q1 FY27 GUIDE: revenue $4.1B ±$0.1B (vs ~$3.75B consensus),
  // non-GAAP EPS $7.30 ±$0.20 (vs ~$5.87). CEO: momentum continuing into
  // 2027 on cloud demand; HAMR/Mozaic roadmap. Street: Strong Buy (25), PT
  // $700-1,600 (median $1,150); FY27E EPS $35.94 / rev $19.0B, FY28E $56.93 /
  // $25.5B. Stock $783 — ~22× FY27E / ~14× FY28E, below the low PT.
  // MODEL: switched from FCF/share × P/FCF (41-54×) to the WDC framework —
  // FY27E consensus EPS, ~12% base CAGR (FY28 surge then plateau) and a
  // mid-cycle ~11× exit — so the two HDD names are rated consistently.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'HAMR technology gives Seagate a hard-disk density edge no rival can yet match at scale',
    'AI data creation demands orders of magnitude more raw storage per compute dollar than prior eras',
    'Hyperscalers are locked in to HDD for cold storage — flash parity is many years away',
    'FCF is genuine and growing, backed by real cash conversion at scale',
    'Lean balance sheet with net debt well below one times EBITDA, limiting financial risk',
  ],

  risksToBuy: [
    'Stock already priced for years of hypercycle growth after a massive multi-year run',
    'ATE demand is a derivative of growth rates — any AI slowdown hits HDD capex sharply',
    'Flash / NAND cost-per-bit improvement could encroach on warm-storage use cases faster than expected',
    'High beta means the stock falls harder than the market in any risk-off environment',
    'Multiple compression is a structural headwind even if the underlying business executes well',
  ],

  verdictNarrative:
    'Seagate is printing peak-cycle numbers: Q1 FY27 guided to $7.30 EPS and consensus has FY27 at ~$36 and FY28 at ~$57. At ~$783 the stock is ~22× FY27E and below every Street target. ' +
    'But HDD is a historically boom-bust industry. On a mid-cycle ~11× multiple applied to earnings that plateau after FY28, the 5-year math lands near today\'s price — the same read as WDC. ' +
    'HOLD. The old "pullback to $650–750 shifts toward BUY" line still roughly applies; evidence the cycle extends beyond FY28 would tip it.',

  analystConsensus: { rating: 'Strong Buy', targetLow: 700, targetMedian: 1150, targetHigh: 1600, numAnalysts: 25 },  // stockanalysis.com, Oct 9 2026

  revGrowth: [
    [0.35, -0.05, -0.15, -0.05, 0.00], // Bear: FY27 below consensus, then the HDD cycle rolls over
    [0.45, 0.25, 0.08, 0.00, 0.03],    // Base: FY27 ~$17.7B (haircut vs $19.0B consensus), FY28 haircut, then plateau
    [0.55, 0.34, 0.20, 0.10, 0.06],    // Bull: consensus path; HAMR dominates hyperscale cold storage
  ],

  fcfMargin: [
    [0.16, 0.16, 0.15, 0.15, 0.15],
    [0.19, 0.20, 0.21, 0.21, 0.22],
    [0.22, 0.24, 0.25, 0.25, 0.26],
  ],

  exitMultiple: [8, 12, 16],

  modelType: 'EPS_PE',
  baseEps: 35.94,      // FY27E non-GAAP EPS — stockanalysis consensus (Oct 9 2026; FY28E $56.93). Q1 FY27 guide $7.30. FY26A $15.58. Was FCF/share $10.60 with P/FCF exits.
  epsCagr: [4, 12, 20],  // WDC-consistent: FY28 surge then cyclical plateau
  exitPE: [8, 11, 15],   // Mid-cycle multiples (was P/FCF 41/46/54)
  prob: [25, 50, 25],

  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.005, 0.012, 0.020],
  ebitdaProxy: [0.22, 0.28, 0.34],
  bullMaOptVal: false,

  desc: [
    'The HDD cycle rolls over after FY27 — AI-capex digestion and renewed supply growth return the industry to its boom-bust playbook; flash encroaches on warm storage. EPS compounds only ~4% from the $35.94 FY27E base and the market reprices STX at a trough-like ~8×. ' +
      '5yr target {target} ({cagr} annualized).',
    'AI nearline demand sustains a strong multi-year up-cycle and the disciplined HDD duopoly holds; HAMR drives ASP and density gains, FCF compounds and debt keeps falling. EPS compounds ~12% from $35.94 (an FY28 surge, then a plateau) while the multiple normalizes from ~22× toward a mid-cycle ~11×. ' +
      '5yr target {target} ({cagr} annualized) — the business is better and arguably structural, but the price embeds most of a peak-cycle trajectory.',
    'HAMR becomes the definitive hyperscale cold-storage standard; AI data growth keeps exabyte demand compounding for years and the market awards ~15× on near-infrastructure cash flows. EPS compounds ~20% from $35.94. ' +
      '5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: HDD has always been cyclical — supply expands into strong demand, then pricing collapses. NAND cost-per-bit gains encroach on warm storage, hyperscalers over-build when flash is cheap, and the HAMR premium narrows as WD closes the gap. With a ~2.0 beta, a cycle turn de-rates the multiple to single digits from {spot}.',
    'Structural AI storage demand is genuine and FY26-27 prove it: gross margin from ~38% to ~53% in a year, FY26 FCF $3.1B, Q1 FY27 guided far above consensus, debt being paid down. HDD remains the cost leader for exabyte-scale storage. But on a mid-cycle multiple the 5-year math returns roughly {cagr} annualized from {spot} — HOLD, consistent with WDC.',
    'Bull mechanics: AI data creation follows a power law, HAMR at 30TB+ sustains a cost advantage, and hyperscalers treat cold storage as a perpetual capex line. If the cycle extends well beyond FY28, {target} is achievable from {spot}.',
  ],

  burry: {
    sbc: 213,
    gaapNi: 3180,        // FY26: GAAP EPS $13.90 × ~229M diluted shares
    buyback: 176,
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical — FY26 actuals: SBC $213M vs GAAP NI ~$3.2B = ~7% naive, but the stock is up ~8-10× over 3 years so the MTM amplifier is large (~6×), and FY26 buybacks were only $176M (capital went to $1.4B of debt paydown + $634M dividends). Estimate held at 45% pending a fuller recalc. (Earlier estimate used SBC $520M / NI $1.3B, which overstated SBC.)',
  },

  debtSafety: {
    netDebt: 1861,         // Jul 3 2026: $3.57B debt − $1.70B cash
    ebitda: 5000,          // FY26: non-GAAP op income ~$4.45B + D&A — approximate
    fy: 'FY26',
    note: 'Net Debt ~$1.9B / EBITDA ~$5.0B ≈ 0.4× — well within the 2× threshold after $1.4B of FY26 debt paydown. HDD manufacturing CapEx is manageable at this leverage level.',
  },
});
