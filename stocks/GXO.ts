import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 51.88,
  updatedOn: '05/07',
  fairPriceRange: '$50 - $139',
  shares0: 114.3,
  rev25: 13200,
  fcfMargin25: 0.020,
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.00,
  rsRating: 83,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "GXO is a cyclical logistics operator playing an execution + margin expansion story — not a secular megatrend bet. " +
    "FY26 guide: adj EPS +20% mid ($2.85-$3.15), organic 4-5% on flat volume assumptions (conservative), Wincanton synergy ramping to $60M run-rate by end-2026. " +
    "The problem: at $65.6 the stock trades near bull fair value ($69), not base ($57) — pricing in execution that hasn't fully materialized yet. " +
    "If Wincanton synergies deliver + cycle recovers + margin expands toward 5% EBIT, this is a 15%+ compounder. If volumes stay flat, it's 8% dead money with no pricing power vs DHL/DSV. " +
    "35-45% probability of 15%+ CAGR — ideal entry $50-56 where risk/reward flips.",

  epsCagr: [5, 11, 16],
  exitPE: [16, 19, 22],
  prob: [25, 45, 30],


  analystConsensus: { rating: 'Strong Buy', targetLow: 58, targetMedian: 70, targetHigh: 82, numAnalysts: 13 },
  revGrowth: [
    [0.025, 0.025, 0.02, 0.02, 0.02],
    [0.05, 0.05, 0.05, 0.05, 0.05],
    [0.08, 0.07, 0.07, 0.06, 0.06],
  ],
  fcfMargin: [
    [0.018, 0.018, 0.018, 0.018, 0.018],
    [0.024, 0.026, 0.028, 0.030, 0.030],
    [0.028, 0.030, 0.032, 0.035, 0.035],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'Volume pressure persists with a slow new business ramp and retention challenges. Margins remain stuck around 4% EBIT. ' +
      'Earnings grow at only 5% annually and the multiple compresses to 16x, its historical stress zone. Essentially dead money from current entry.',
    'Guidance-level execution plays out with 4-5% organic growth and margin expansion toward 5% EBIT, driven by Wincanton synergies and productivity improvements. ' +
      'Earnings grow at roughly 11% annually with a 19x exit multiple. Returns come in around 8% annualized — decent but below the 15% hurdle without multiple expansion.',
    'Full execution across the board: margin catch-up, $60M in Wincanton synergies, strong pipeline conversion, and a cyclical recovery. ' +
      'Earnings compound at 16% annually with the market maintaining a 22x multiple on improved profitability. ' +
      'Delivers roughly 16% annualized returns, but requires strong execution and a normal macro environment.',
  ],

  ebitdaProxy: [0.08, 0.12, 0.15],
  bullMaOptVal: 55.50 * 114.3 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.01,
    },
    {
      revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.015,
    },
  ],
});
