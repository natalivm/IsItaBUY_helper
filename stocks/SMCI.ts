import { defineStock } from './defineStock';

export const SMCI = defineStock({
  updatedOn: '05/06',
  ticker: 'SMCI',
  name: 'Super Micro Computer, Inc.',
  sector: 'AI Infrastructure / Servers',
  themeColor: '#eab308',
  currentPrice: 34.66,
  fairPriceRange: '$22 - $65',
  shares0: 700,
  rev25: 23500,
  fcfMargin25: 0.03,
  taxRate: 0.20,
  cash: 1800,
  debt: 2100,
  beta: 1.85,
  costDebt: 0.055,
  rsRating: 19,
  aiImpact: 'TAILWIND',
  strategicNarrative: "SMCI is a high-volume, low-margin AI server assembler riding the GPU infrastructure wave. Revenue is hypergrowth (~$40B FY26E) but gross margins sit at 6.4% with 63% single-client concentration. The bull case requires margin recovery to 8%+ and client diversification. Post-earnings verdict: revenue story strong, quality story weak. This is a controlled cyclical bet, not a compounder.",


  analystConsensus: { rating: 'Hold', targetLow: 26, targetMedian: 42, targetHigh: 70, numAnalysts: 17 },
  revGrowth: [
    [0.07, 0.07, 0.07, 0.07, 0.07],
    [0.13, 0.13, 0.13, 0.13, 0.13],
    [0.18, 0.18, 0.18, 0.18, 0.18],
  ],
  fcfMargin: [
    [0.030, 0.035, 0.035, 0.035, 0.035],
    [0.035, 0.040, 0.045, 0.050, 0.050],
    [0.040, 0.050, 0.060, 0.065, 0.070],
  ],
  exitMultiple: [9, 13, 17],
  desc: [
    'AI capex cycle slows, margins stuck at 4.5%, valued as low-quality hardware at 8-10x.',
    'Revenue growth 13% CAGR with gradual margin recovery to 6%, valued at 12-14x.',
    'Margin recovery to 7.5%+, DCBBS contribution, client diversification — valued at 16-18x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.005],
  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.045, 0.06, 0.075],
  bullMaOptVal: false,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
