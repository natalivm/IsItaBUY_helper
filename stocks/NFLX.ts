import { defineStock } from './defineStock';

export const NFLX = defineStock({
  updatedOn: '06/05',
  ticker: 'NFLX',
  name: 'Netflix',
  sector: 'Entertainment',
  themeColor: '#ff007f',
  currentPrice: 82.18,
  fairPriceRange: '$56 - $200',
  shares0: 4222.0,
  rev25: 45180,
  fcfMargin25: 0.209,
  taxRate: 0.137,
  cash: 8500,
  debt: 14000,
  beta: 1.10,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  rsRating: 29,
  aiImpact: 'TAILWIND',
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
    'RS and institutional momentum signals are negative, suggesting near-term technical headwinds against a position',
    'Subscriber saturation in high-ARPU English-language markets limits the geographic runway for premium pricing expansion',
  ],

  // 2026E guide: ~$51B (+14% YoY). Drivers: membership + pricing + ads.
  // Ads ~$3B in 2026 (~6% of revenue). Content amortization +~10% YoY.

  analystConsensus: { rating: 'Buy', targetLow: 94, targetMedian: 119, targetHigh: 151, numAnalysts: 34 },
  revGrowth: [
    [0.07, 0.06, 0.05, 0.05, 0.04], // Bear: revenue growth halved from guide, ads cyclical hit
    [0.14, 0.12, 0.10, 0.09, 0.08], // Base: 2026 guide $51B, then natural deceleration
    [0.16, 0.15, 0.14, 0.13, 0.12], // Bull: sustained execution + ads momentum + pricing
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
    'Ads cyclicality + subscription slowdown. Revenue growth ~7%, margin plateau, P/E compresses to ~18x. M&A integration risk.',
    'Executes 2026E guide: $51B rev, 31.5% op margin. Ads scale to $3B+. 15% EPS CAGR. DCF ≈ fair value.',
    'Structural cash compounder. Ads ARM near parity, margin +2.5pp/yr sustained. 18% EPS CAGR, premium multiple.',
  ],

  thesis: [
    'Revenue falls to ~7% growth, ads hit by cycle, multiple to 18x. FCF CAGR ~10%. 5yr price ~$83, ~1% annual return.',
    'Management executes guide. Revenue 10-12% post-2027, margin expands via ads + leverage. 5yr price ~$145, ~13% CAGR.',
    'Ads ARM gap closes, 35%+ op margin sustained. Revenue 12-16%. 5yr price ~$200, ~20.6% CAGR.',
  ],

  // Terminal growth aligned with DCF analysis: conservative 2%, base 3%, bull 3.5%
  termGrowth: [0.02, 0.03, 0.035],

  // Probability-weighted expected return: (0.30×20.6%) + (0.45×13%) + (0.25×1%) = 12.3%
  // Expected 5yr price: (0.30×200) + (0.45×145) + (0.25×83) = $146
  baseEps: 3.13,
  epsCagr: [8, 15, 18],
  exitPE: [18, 23, 28],
  prob: [25, 45, 30],

  // M&A optionality: WB/HBO transaction pending but no deal parameters available.
  // Standalone valuation is base; M&A case kept as separate layer.
  bullMaOptVal: 78.67 * 4222.0 * 0.07,

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
