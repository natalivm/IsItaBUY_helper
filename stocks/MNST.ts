import { defineStock } from './defineStock';

export const MNST = defineStock({
  updatedOn: '07/03',
  ticker: 'MNST',
  name: 'Monster Beverage Corp',
  sector: 'Consumer Staples / Beverages',
  themeColor: '#22c55e',
  currentPrice: 77.11,
  fairPriceRange: '$60 - $100',
  shares0: 967,
  rev25: 8200,
  fcfMargin25: 0.215,
  taxRate: 0.22,
  cash: 2000,
  debt: 750,
  beta: 0.85,
  costDebt: 0.04,
  rsRating: 82,
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative: "Monster is a rare, high-quality structural compounder. Q3 2025 confirmed the margin recovery thesis: record quarterly net sales of $2.20B (+16.8%), operating income +40.7%, net income +41.4%, with EBITDA margins recovering sharply from 26.8% in 2024 toward a street-projected 31.9% in 2025. Business quality is not in question — 56% gross margins, 21.5% FCF margins, Coke relationship deepening, and international runway (APAC $33B TAM, 158 countries). Analyst targets cluster $79–$98 (JP Morgan $79, Morgan Stanley $96, HSBC $98), and the stock's 64% run from its 52-week low reflects the market pricing in the bull case. At $80, MNST trades at ~41x forward P/E on a 12-13% EPS grower — you're paying compounder prices for above-average but not elite growth. Q4 2025 earnings (Feb 26) are a near-term binary: sustained margin expansion and constructive guidance could push toward $95–100; any guidance disappointment has $60–70 to fall through. HOLD with a materially better entry near $72–76.",


  analystConsensus: { rating: 'Buy', targetLow: 60, targetMedian: 79, targetHigh: 96, numAnalysts: 24 },
  revGrowth: [
    [0.07, 0.07, 0.06, 0.06, 0.05],
    [0.10, 0.10, 0.09, 0.09, 0.08],
    [0.12, 0.12, 0.11, 0.11, 0.10],
  ],
  fcfMargin: [
    [0.20, 0.20, 0.19, 0.19, 0.19],
    [0.215, 0.215, 0.22, 0.22, 0.22],
    [0.23, 0.24, 0.24, 0.25, 0.25],
  ],
  exitMultiple: [18, 22, 28],
  desc: [
    'Category maturation, multiple compression to 25x P/E, and growth deceleration to 8% EPS CAGR. International mix drag weighs on margins. GLP-1 and competitive disruption create headwinds.',
    'Steady execution as a quality compounder: 9-10% revenue growth, stable 31-32% EBIT margins, and 12-13% EPS CAGR. International expansion and zero sugar tailwinds offset modest P/E compression to 30x.',
    'International runway accelerates (APAC $33B TAM), foodservice penetration expands, zero-sugar margins lift profitability. 16% EPS CAGR with P/E sustaining at 35x on premium compounder status.',
  ],
  thesis: [
    'Q4 2025 (Feb 26) is the first gating test after a 64% run from lows. Soft guidance or margin stall triggers derating from 41x fwd P/E — $60–70 is realistic downside. GLP-1 behavioral shift and functional beverage competition remain structural overhangs.',
    'Margin recovery from 26.8% to ~31.9% EBITDA is the key inflection the market is rewarding. At 41x fwd P/E on 12-13% EPS growth, valuation remains the limiter. Q4 earnings confirm or deny the story — constructive print extends re-rating; miss compresses multiple. Base: mid-to-high single digit returns as P/E normalizes toward 30x.',
    'Structural compounder with under-modeled levers: foodservice (70% vs 98% penetration), EM affordable engine, and Coke relationship deepening. Sustained margin expansion to 35%+ EBITDA and 16% EPS CAGR justify analyst targets of $96–98. Premium multiple sustained.',
  ],

  termGrowth: [0.02, 0.025, 0.03],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.28, 0.32, 0.38],
  bullMaOptVal: 83.6 * 967 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
