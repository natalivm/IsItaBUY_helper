import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1439,
  updatedOn: '07/03',
  fairPriceRange: '$1,736 - $3,282',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 41.22,
  rsRating: 21,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder with cyclical tailwind. Q1 FY26 delivered best Scores quarter on record (+29% to $305M), Platform ARR +33%, NRR 122%, ACV bookings +36%, and mortgage revenue +60% — broad-based beat validating the platform transition. RS 17 reflects technical weakness amid broader market rotation, but fundamental/technical divergence creates asymmetric entry for conviction holders. Prob-weighted 5yr target ~$2,807 → 15.8% CAGR at $1,350 entry. Key risks: mortgage cycle reversal, regulatory changes, pricing pressure.",


  analystConsensus: { rating: 'Buy', targetLow: 1600, targetMedian: 2063, targetHigh: 2661, numAnalysts: 12 },
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06],
    [0.15, 0.14, 0.13, 0.12, 0.11],
    [0.18, 0.17, 0.16, 0.14, 0.13],
  ],
  fcfMargin: [
    0.33,
    [0.37, 0.37, 0.38, 0.38, 0.38],
    [0.38, 0.39, 0.40, 0.40, 0.40],
  ],
  exitMultiple: [25, 30, 32],
  bbRate: [0.005, 0.04, 0.02],

  epsCagr: [11, 19, 20],
  exitPE: [25, 30, 32],
  prob: [20, 50, 30],

  desc: [
    'The mortgage cycle reverses and regulatory headwinds slow earnings growth to 11%. The multiple compresses to 25x as the cyclical tailwind fades. ' +
      'Returns from current entry come in around 5% annualized — a deceleration but not a structural break.',
    'Platform recurring revenue and Scores pricing power sustain roughly 15% revenue growth. Combined with margin expansion and buybacks, ' +
      'earnings compound at about 19% annually. The market values FICO at 30x on exit, delivering approximately 17% annualized stock returns.',
    'A mortgage boom, expanding platform net retention, and AI-driven demand for decisioning analytics push earnings growth to 20% annually. ' +
      'The multiple re-rates to 32x as the market rewards the structural platform transition, delivering roughly 19% annualized stock returns.',
  ],
});
