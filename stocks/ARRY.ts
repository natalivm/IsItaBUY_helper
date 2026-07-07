import { defineStock } from './defineStock';

export const ARRY = defineStock({
  updatedOn: '07/07',
  ticker: 'ARRY',
  name: 'Array Technologies',
  sector: 'Solar / Industrial Equipment',
  themeColor: '#f59e0b',
  currentPrice: 6.62,
  fairPriceRange: '$4 - $18',
  shares0: 153,
  rev25: 1280,
  fcfMargin25: 0.063,
  taxRate: 0.22,
  cash: 120,
  debt: 750,
  beta: 1.90,
  costDebt: 0.065,
  rsRating: 58,
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'Record order backlog with high Tier 1 customer concentration provides multi-quarter revenue visibility from a strong position.',
    'Domestic manufacturing orientation insulates ARRY from tariff and supply-chain risk hitting overseas competitors.',
    'DuraTrack terrain-following technology and integrated foundation-plus-tracker offer a differentiated product for complex sites.',
    'Emerging software and services layer adds a recurring revenue stream that could improve FCF conversion over time.',
    'Solar build-out secular tailwind driven by data center power demand creates a multi-year industry growth backdrop.',
  ],

  risksToBuy: [
    'Management openly admits pricing competition caps gross margin expansion — the moat is weak relative to the growth multiple.',
    'FCF conversion is chronically weak relative to reported EBITDA, limiting real cash returns to shareholders.',
    'Meaningful debt load against thin FCF creates balance-sheet fragility if the solar cycle turns or projects are delayed.',
    'International expansion is being avoided precisely because of price-war risk, capping the long-term addressable market.',
    'RS reflects the market\'s skepticism — this is a watchlist name, not a high-conviction leader with institutional sponsorship.',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 6, targetMedian: 10, targetHigh: 16, numAnalysts: 10 },
  revGrowth: [
    [0.05, 0.03, 0.01, 0.00, -0.02],
    [0.10, 0.08, 0.06, 0.04, 0.03],
    [0.15, 0.12, 0.10, 0.08, 0.06],
  ],
  fcfMargin: [
    [0.05, 0.05, 0.04, 0.04, 0.04],
    [0.06, 0.07, 0.08, 0.09, 0.10],
    [0.08, 0.10, 0.12, 0.13, 0.14],
  ],
  exitMultiple: [7, 9.5, 12],
  ebitdaProxy: [0.08, 0.13, 0.16],
  desc: [
    'Solar cycle weakens, pricing pressure eats SG&A leverage, FCF stays weak, international fails. EPS 2030 ~$0.55, exit P/E 7x. Target ~$3.85. Prob ~25%.',
    'Backlog converts normally, gross margin flat, FCF conversion mediocre, growth normalizes. EPS ~$1.10, exit P/E 9.5x. Target ~$10.45. Prob ~50%.',
    'Share gains hold, APA synergies deliver, software/services grow, EBITDA margin mid-teens. EPS ~$1.50, exit P/E 12x. Target ~$18. Prob ~25%.',
  ],

  termGrowth: [0.010, 0.020, 0.025],
  waccAdj: [0.015, 0.005, -0.005],

  bullMaOptVal: 6.80 * 153 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.003,
    },
    {
      bbRate: 0.01,
    },
    {
      bbRate: 0.02,
    },
  ],
});
