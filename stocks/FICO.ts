import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 988.44,
  updatedOn: '04/13',
  fairPriceRange: '$1,100 - $2,200',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 4200,
  beta: 1.03,
  costDebt: 0.055,
  rsRating: 11,
  rsTrend: 'falling',
  ratingOverride: 'OVERVALUED',
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Monopoly under siege — April 2026 crash (-40% from highs) signals market is repricing competitive and regulatory risk as real, not hypothetical. VantageScore 4.0 backed by aggressive Experian/Equifax pricing and FHFA regulatory support now actively threatens FICO's mortgage scoring monopoly. RS 9 reflects severe institutional distribution. Platform ARR +33% and NRR 122% provide diversification but Scores still drives majority of high-margin revenue. $4.2B debt with no near-term buyback capacity limits capital return. Technical picture broken across all timeframes — RSI 16 (hourly) suggests short-term bounce possible, but 50-day ($1,057) and 200-day ($1,730) MAs are far overhead. At $922, market prices in meaningful VantageScore adoption. Key question: is this capitulation or the start of a structural de-rating?",


  analystConsensus: { rating: 'Buy', targetLow: 1600, targetMedian: 2063, targetHigh: 2661, numAnalysts: 12 },
  revGrowth: [
    [0.07, 0.05, 0.04, 0.03, 0.02],
    [0.15, 0.14, 0.13, 0.12, 0.11],
    [0.18, 0.17, 0.16, 0.14, 0.13],
  ],
  fcfMargin: [
    0.30,
    [0.37, 0.37, 0.38, 0.38, 0.38],
    [0.38, 0.39, 0.40, 0.40, 0.40],
  ],
  exitMultiple: [17, 25, 30],
  bbRate: [0, 0.04, 0.02],

  termGrowth: [0.015, 0.03, 0.035],
  ebitdaProxy: [0.44, 0.55, 0.60],
  prob: [40, 40, 20],

  desc: [
    'VantageScore gains meaningful GSE adoption, FHFA mandates pricing caps, and the mortgage cycle stalls. ' +
      'Scores revenue growth decelerates to mid-single digits as lenders switch to cheaper alternatives. $4.2B debt load forces cash toward debt service, eliminating buybacks. FCF margins compress to 30% with EBITDA exit at 17x as market de-rates the monopoly thesis.',
    'FICO retains dominant market share but pricing growth moderates under regulatory scrutiny. Platform ARR continues growing but cannot fully offset Scores deceleration. ' +
      'FCF margins expand modestly to 38% with EBITDA exit at 25x as the market prices in a less certain monopoly.',
    'VantageScore adoption stalls (data quality/lender inertia), FICO maintains pricing power, and a mortgage recovery boosts volumes. ' +
      'Platform transition accelerates with AI-driven decisioning demand. FCF margins reach 40% with EBITDA exit at 30x.',
  ],
});
