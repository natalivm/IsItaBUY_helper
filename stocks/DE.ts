import { defineStock } from './defineStock';

export const DE = defineStock({
  ticker: 'DE',
  name: 'Deere & Company',
  sector: 'Machinery',
  themeColor: '#10b981',
  currentPrice: 578.39,
  updatedOn: '05/04',
  fairPriceRange: '$370 - $775',
  shares0: 270.0,
  rev25: 38900,
  fcfMargin25: 0.155,
  taxRate: 0.22,
  cash: 5200,
  debt: 65953,
  beta: 0.78,
  costDebt: 0.0497,
  rsRating: 85,
  aiImpact: 'TAILWIND',
  strategicNarrative: "High-quality cyclical growth with real moat (precision ag, switching costs, #1 brand). RS 87 confirms strong institutional momentum. However, P/E ~35x on declining EPS (FY25: 18.50, FY26E: 17.83) is expensive for a cyclical. EBIT margin at ~15.5% vs peak >20%. Only ~20-25% probability of 15%+ CAGR from current price. This is a bet on agro-cycle recovery and tech transformation, not a structural compounder entry.",


  analystConsensus: { rating: 'Buy', targetLow: 458, targetMedian: 575, targetHigh: 793, numAnalysts: 18 },
  revGrowth: [
    [0.03, 0.04, 0.04, 0.03, 0.03],
    [0.06, 0.09, 0.08, 0.07, 0.07],
    [0.08, 0.11, 0.10, 0.09, 0.09],
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.10, 0.10],
    [0.155, 0.15, 0.15, 0.15, 0.15],
    [0.16, 0.17, 0.18, 0.18, 0.18],
  ],
  exitMultiple: [12, 16, 17.5],
  desc: [
    'Agro downcycle with commodity price weakness, P/E compression to historical lows (~18x), and margin squeeze.',
    'Moderate agro recovery with consensus revenue growth (~7-9% CAGR), stable FCF margins near 15%.',
    'Strong agro supercycle return with precision ag monetization driving margin expansion and P/E re-rating.',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.22, 0.28],
});
