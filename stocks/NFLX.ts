import { defineStock } from './defineStock';

export const NFLX = defineStock({
  updatedOn: '05/06',
  ticker: 'NFLX',
  name: 'Netflix',
  sector: 'Entertainment',
  themeColor: '#ff007f',
  currentPrice: 88.27,
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
  strategicNarrative:
    "Netflix is a structural compounder — scale, brand, global distribution, and a nascent ads business doubling to ~$3B in 2026 give it compounding levers few media companies possess. " +
    "2026E guide: $51B revenue (+14%), 31.5% op margin (+2pp YoY), with pricing power and ads scaling as the dual margin engines. " +
    "The problem: at current price, base DCF roughly equals fair value (~6% upside) and RS 13 signals no institutional momentum — quality business at fair price, not asymmetric opportunity. " +
    "If ads ARM approaches parity and margin sustains +2.5pp/yr expansion, this is an 18%+ compounder. If ads cycle breaks or multiple compresses, returns are single-digit. " +
    "Prob-weighted return ~12-13% — WAIT for entry at ~$65-70 where expected CAGR crosses 15%.",

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
});
