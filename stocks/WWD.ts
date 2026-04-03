import { defineStock } from './defineStock';

export const WWD = defineStock({
  updatedOn: '04/03',
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 376,
  fairPriceRange: '$290 – $420',
  shares0: 58.5,
  rev25: 3600,          // FY25 actual base; FY26 guide: +14–18% → ~$4.0–4.2B
  fcfMargin25: 0.085,   // FCF guide $300–350M / ~$4.1B rev; constrained by inventory + capex
  taxRate: 0.22,
  cash: 327,
  debt: 550,
  beta: 1.18,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  baseEps: 8.4,         // FY26 mid-guide EPS
  rsRating: 94,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Woodward is an aerospace & industrial controls compounder coming off a monster Q1 — revenue +29%, aero margin +420bps to 23.4%, FY26 guide raised to 14-18% sales growth and $8.20-$8.60 EPS. " +
    "China on-highway wind-down ($60M revenue exiting) is actually a portfolio quality upgrade, and RS 95 confirms elite relative strength. " +
    "The problem: at ~47x forward P/E the stock prices in near-perfect execution while Q1 tailwinds (spare LRUs, China pull-forward) are unlikely to repeat and FCF conversion is constrained by inventory build + rising capex. " +
    "If aero supercycle extends and margin leverage compounds at 18% EPS CAGR, this justifies the premium. If growth normalizes to 7% and P/E compresses to 22x, it's -35% from here. " +
    "~30% probability of 15%+ CAGR — great business, expensive entry.",

  // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
  // revGrowth and fcfMargin are kept for display/yield calculations.
  epsCagr: [7, 12, 18],
  exitPE: [22, 30, 40],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Buy', targetLow: 310, targetMedian: 355, targetHigh: 450, numAnalysts: 14 },
  revGrowth: [
    [0.07, 0.06, 0.05, 0.05, 0.04],
    [0.14, 0.12, 0.11, 0.10, 0.09],
    [0.18, 0.17, 0.15, 0.14, 0.12],
  ],
  fcfMargin: [
    [0.07, 0.07, 0.075, 0.075, 0.08],
    [0.08, 0.085, 0.09, 0.095, 0.10],
    [0.09, 0.095, 0.10, 0.11, 0.12],
  ],
  exitMultiple: [12, 17, 22],
  desc: [
    'The Q1 tailwinds from spare parts and China pull-forward demand fade, and earnings growth decelerates to 7% annually. ' +
      'The market re-rates Woodward from a compounder to a cyclical at 22x. The stock reprices meaningfully lower from current levels.',
    'Fiscal 2026 guidance delivers at the mid-point. Earnings compound at 12% annually, sustained by margin leverage and pricing power. ' +
      'The multiple settles to 30x as free cash flow conversion gradually improves. ' +
      'Modest upside from current levels as the market already prices in solid execution.',
    'The aerospace supercycle extends with aftermarket strength and industrial margin leverage driving 18% annual earnings growth. ' +
      'The market rewards demonstrated execution with a 40x premium. This is the path to 15%+ annualized returns, ' +
      'requiring sustained aerospace demand and continued margin expansion.',
  ],

  bbRate: [0.005, 0.02, 0.03],
  bullMaOptVal: 393 * 58.5 * 0.07,
  driverOverrides: [
    {},
    {},
    { fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02] },
  ],
});
