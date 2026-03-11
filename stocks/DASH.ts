import { defineStock } from './defineStock';

export const DASH = defineStock({
  ticker: 'DASH',
  name: 'DoorDash, Inc.',
  sector: 'Internet / Consumer Logistics',
  themeColor: '#ff3008',
  currentPrice: 169,
  updatedOn: '07/03',
  fairPriceRange: '$120 - $215',
  shares0: 430,
  rev25: 13700,
  fcfMargin25: 0.131,
  taxRate: 0.18,
  cash: 4400,
  debt: 2700,
  beta: 1.60,
  costDebt: 0.048,
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative: "DoorDash is an execution compounder — $13.7B revenue and $935M GAAP net income in 2025. Post Q4'25: NV unit economics positive 2H'26, ads scaling (2× advertisers, 3× spend), and tech stack consolidation (3→1) provide three EPS levers above consensus. Thesis is execution-driven earnings growth, not P/E rerating.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 222, targetMedian: 278, targetHigh: 360, numAnalysts: 33 },
  revGrowth: [
    [0.14, 0.13, 0.13, 0.12, 0.12],
    [0.238, 0.238, 0.238, 0.238, 0.238],
    [0.25, 0.24, 0.23, 0.22, 0.20],
  ],
  fcfMargin: [
    [0.045, 0.055, 0.065, 0.075, 0.087],
    [0.055, 0.075, 0.095, 0.110, 0.125],
    [0.065, 0.085, 0.105, 0.125, 0.145],
  ],
  exitMultiple: [18, 25, 30],
  desc: [
    'Revenue growth slows to 12-14%, margin stalls ~12% EBIT. Multiple compresses to 20x. EPS ~$8.5.',
    'TIKR consensus: 23.8% revenue CAGR, margin ramp to ~20% EBIT by 2030. EPS ~$13.7 at 25x.',
    'All three levers fire: NV margin ≥8%, ads ≥6% of revenue, tech stack savings. EPS ≥$17.5.',
  ],

  termGrowth: [0.025, 0.035, 0.04],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0.005, 0.015, 0.01],
  ebitdaProxy: [0.15, 0.20, 0.25],
  bullMaOptVal: 180 * 430 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
  ],
});
