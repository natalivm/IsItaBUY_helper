import { defineStock } from './defineStock';

export const SPOT = defineStock({
  updatedOn: '07/06',
  ticker: 'SPOT',
  name: 'Spotify Technology S.A.',
  sector: 'Interactive Media / Audio',
  themeColor: '#C5A572',
  currentPrice: 483.01,
  fairPriceRange: '$430 - $660',
  shares0: 206,
  rev25: 17186,
  fcfMargin25: 0.167,
  taxRate: 0.17,
  cash: 9500,
  debt: 3360,
  beta: 1.35,
  costDebt: 0.042,
  rsRating: 16,
  aiImpact: 'DISRUPTION_RISK',
  reasonsToBuy: [
    'Dominant global audio platform with a listener base and content library that is nearly impossible to replicate from scratch',
    'FCF margin expansion from low-teens toward the mid-twenties is a multi-year structural story with clear operating leverage',
    'Podcast and audiobook verticals diversify beyond music, reducing label dependency and expanding the monetizable content surface',
    'Advertising business provides a second revenue engine that scales with DAUs without requiring incremental content spend',
    'Pricing power demonstrated through multiple successful premium tier increases with minimal subscriber churn',
  ],

  risksToBuy: [
    'Apple Music, YouTube Music, and Amazon Music are deeply integrated into their respective hardware ecosystems, making switching frictionless for users',
    'Record labels retain disproportionate bargaining power over music licensing costs, capping gross margin expansion potential',
    'Podcast advertising market is more cyclical than subscription revenue, creating earnings volatility in ad-softness periods',
    'AI-generated music could commoditize content costs but also disrupts the catalog relationships that underpin the platform\'s appeal',
    'Current valuation already prices in the FCF compounding story — a multiple re-rate toward mature-media levels would offset earnings growth',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 420, targetMedian: 667, targetHigh: 900, numAnalysts: 27 },
  revGrowth: [
    [0.10, 0.10, 0.09, 0.07, 0.07],
    [0.14, 0.14, 0.13, 0.10, 0.11],
    [0.18, 0.18, 0.17, 0.13, 0.14],
  ],
  fcfMargin: [
    [0.16, 0.17, 0.17, 0.19, 0.20],
    [0.183, 0.197, 0.206, 0.227, 0.233],
    [0.20, 0.22, 0.23, 0.25, 0.26],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'Ads growth stalls, FCF margins plateau at ~20%, valued as mature media streamer (Netflix-like 20x).',
    'Consensus FCF path holds — margin expansion to ~23%, valued as quality compounder at 25x.',
    'Premium platform with runway — superior personalization + pricing power drives 26% FCF margins at 30x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  ebitdaProxy: [0.17, 0.25, 0.38],
  bullMaOptVal: 496 * 206 * 0.07,
});
