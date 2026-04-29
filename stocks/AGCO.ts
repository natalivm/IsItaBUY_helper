import { defineStock } from './defineStock';

export const AGCO = defineStock({
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  updatedOn: '04/29',
  currentPrice: 114.43,
  fairPriceRange: '$54 - $225',
  shares0: 72.4,
  rev25: 10080,
  fcfMargin25: 0.073,
  taxRate: 0.23,
  cash: 884,
  debt: 2800,
  beta: 1.16,
  costDebt: 0.06,
  rsRating: 82,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Higher-quality cyclical, not a compounder. Post-Citi: base case is flat at $138 over 5 years. Structural floor genuinely higher than 2016 (~7.7% vs 3–4% op margin), but NA remains loss-making and PTx is sub-10% of revenue. RS 85 signals cycle-turn momentum. Core bet: 2025/26 is the trough and 2027–2029 normalises. 15% CAGR probability ~35% — a timing bet, not a structural compounder.",


  analystConsensus: { rating: 'Hold', targetLow: 93, targetMedian: 123, targetHigh: 138, numAnalysts: 12 },
  revGrowth: [
    [-0.02, -0.01, 0.01, 0.02, 0.02],
    [-0.01, 0.00, 0.01, 0.02, 0.03],
    [0.02, 0.04, 0.06, 0.07, 0.06],
  ],
  fcfMargin: [
    [0.055, 0.06, 0.065, 0.065, 0.07],
    [0.063, 0.07, 0.075, 0.08, 0.085],
    [0.068, 0.08, 0.09, 0.095, 0.10],
  ],
  exitMultiple: [7, 8, 8],
  desc: [
    'Cycle stalls, NA margins negative — EPS stuck $6–7, P/E compresses to 9x. Bear target $54–63.',
    'Slow cycle normalization — EPS ~$10, P/E ~14x. Base case is flat over 5 years at current price.',
    'Full ag upcycle + PTx scaling to $2B — EPS ~$15, share gains + buybacks re-rate to ~$225.',
  ],

  termGrowth: [0.010, 0.025, 0.020],
  ebitdaProxy: [0.075, 0.10, 0.10],
  bullMaOptVal: 123.88 * 72.4 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.015,
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.03,
    },
  ],
});
