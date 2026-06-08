import { defineStock } from './defineStock';

export const SMCI = defineStock({
  updatedOn: '06/05',
  ticker: 'SMCI',
  name: 'Super Micro Computer, Inc.',
  sector: 'AI Infrastructure / Servers',
  themeColor: '#eab308',
  currentPrice: 41.64,
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
  reasonsToBuy: [
    'Direct beneficiary of the AI infrastructure buildout with hypergrowth revenue driven by GPU server demand',
    'Liquid-cooled and direct-liquid-cooling leadership gives SMCI a real engineering edge in high-density GPU clusters',
    'Faster time-to-market on new GPU platforms than larger competitors due to modular server architecture',
    'DCBBS building-block platform positions SMCI to diversify beyond current concentrated client exposure',
  ],

  risksToBuy: [
    'Dangerously high single-client concentration creates existential revenue risk if that relationship shifts',
    'Gross margins at structurally thin levels leave virtually no cushion for pricing pressure or cost surprises',
    'Accounting irregularities and auditor history create a persistent governance discount in institutional sentiment',
    'Dell, HPE, and hyperscaler-direct server programs compete aggressively on price in a commoditizing market',
    'AI capex cycle deceleration would simultaneously hit revenue growth and compress a low-quality hardware multiple',
  ],

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
