import { defineStock } from './defineStock';

export const MNST = defineStock({
  updatedOn: '06/12',
  lastReportTag: 'Q4 2025',
  ticker: 'MNST',
  name: 'Monster Beverage Corp',
  sector: 'Consumer Staples / Beverages',
  themeColor: '#22c55e',
  currentPrice: 92.83,
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
  reasonsToBuy: [
    'Best-in-class energy drink brand with dominant shelf positioning and deep Coca-Cola distribution partnership',
    'International runway still vast — APAC and emerging market penetration remains far below North American levels',
    'Margin recovery well underway with EBITDA margins inflecting sharply back toward historical levels from a trough',
    'Zero-sugar and functional beverage tailwinds structurally favor Monster\'s core portfolio over sugary alternatives',
    'Foodservice channel significantly underpenetrated relative to traditional retail, offering a durable long-term growth vector',
  ],

  risksToBuy: [
    'Valuation prices in sustained compounder execution on earnings growth that is above-average but not elite',
    'GLP-1 drug adoption and rising health consciousness create a structural behavioral headwind for energy drink volumes',
    'Intensifying competition from Red Bull, Celsius, and emerging functional beverage brands pressures shelf space',
    'A single disappointing earnings print or guidance cut can rapidly unwind the multiple from elevated levels',
    'Concentration in a single beverage category limits diversification if consumer tastes shift away from energy drinks',
  ],

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
