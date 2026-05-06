import { defineStock } from './defineStock';

export const SPOT = defineStock({
  updatedOn: '05/06',
  ticker: 'SPOT',
  name: 'Spotify Technology S.A.',
  sector: 'Interactive Media / Audio',
  themeColor: '#C5A572',
  currentPrice: 425.25,
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
  strategicNarrative: "At $496: Spotify is a legitimate ~12% CAGR cash compounder — market-beating, but not enough margin of safety for a full-conviction position. The FCF story (CAGR ~20%, margin 17%→23%) is real, but you're paying ~35x for it. At $400–420 it becomes a comfortable accumulate (implied P/FCF ~28x fwd, CAGR 14–15% at 25x exit). Below $380 it's aggressive buy territory — 15%+ returns even with conservative multiple. Risk: if SPOT converges to Netflix-like 20–25x FCF as it matures, $496 delivers only ~7%. RS 14 confirms the market isn't in a hurry to reprice higher.",


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
