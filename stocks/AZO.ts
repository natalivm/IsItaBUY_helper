import { defineStock } from './defineStock';

export const AZO = defineStock({
  ticker: 'AZO',
  name: 'AutoZone',
  sector: 'Specialty Retail',
  themeColor: '#e74c3c',
  currentPrice: 3637,
  shares0: 16.6,
  rev25: 17500,
  fcfMargin25: 0.10,
  taxRate: 0.23,
  cash: 350,
  debt: 8500,
  beta: 0.80,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 144.9,
  rsRating: 28,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "AutoZone is the dominant US auto parts retailer with a deep operational moat — unmatched logistics network, SKU depth, and DIY + Pro customer base. " +
    "Growth is steady but moderate: revenue at 6–7% CAGR, with EPS compounding at 12–14% powered by aggressive share buybacks and financial discipline. " +
    "This is not a growth rocket — it's a mature cash machine optimized for capital return. At ~25x trailing P/E vs. 21–22x historical average, the stock prices in solid execution. " +
    "Key risk is P/E compression to historical lows (17x), which implies ~30% downside. RS Rating 28 confirms weak relative performance — the market sees no near-term catalyst. " +
    "Best suited as a steady 9–12% compounder; 15%+ returns require bull-case execution.",

  epsCagr: [7, 12, 15],
  exitPE: [18, 22, 25],
  prob: [25, 50, 25],

  revGrowth: [
    [0.05, 0.04, 0.035, 0.03, 0.03],
    [0.07, 0.065, 0.06, 0.06, 0.055],
    [0.08, 0.075, 0.07, 0.07, 0.065],
  ],
  fcfMargin: [
    [0.09, 0.085, 0.08, 0.08, 0.075],
    [0.10, 0.105, 0.11, 0.115, 0.12],
    [0.11, 0.115, 0.12, 0.125, 0.13],
  ],
  exitMultiple: [12, 15, 18],
  desc: [
    'Consumer spending weakens, vehicle miles driven plateau. Revenue growth decelerates to low single digits as same-store sales stagnate. ' +
      'Buyback pace slows as rising interest costs constrain debt-funded repurchases. EPS compounds at ~7%. P/E compresses to 18x — historical trough range.',
    'Aging US auto fleet sustains steady demand. Revenue grows 6–7% on SSS + new store openings + Pro segment expansion. ' +
      'Aggressive buybacks continue reducing share count ~4–5% annually, driving 12% EPS CAGR despite moderate revenue growth. P/E normalizes to 22x — historical median.',
    'Pro segment accelerates, international expansion gains traction. Revenue growth sustains near 7–8%. ' +
      'Buyback machine runs at full capacity — share count declines 5–6% per year. EPS compounds at 15%. Market maintains 25x premium on best-in-class capital allocator.',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.03, 0.045, 0.055],
  ebitdaProxy: [0.20, 0.22, 0.24],
  bullMaOptVal: false,
});
