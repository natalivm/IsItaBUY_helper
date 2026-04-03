import { defineStock } from './defineStock';

export const SPGI = defineStock({
  updatedOn: '07/03',
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 447,
  fairPriceRange: '$470 - $1000',
  shares0: 298.8,
  rev25: 15340,
  fcfMargin25: 0.357,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 0.9,
  costDebt: 0.05,
  rsRating: 21,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "S&P Global is a structural compounder with a triple-layer moat — regulatory embedded (ratings/indices), workflow lock-in (CapIQ/Platts as system-of-record that LLMs work on top of, not replace), and data control (95% revenue tied to proprietary benchmarks). " +
    "Execution is clean: FCF $5.48B (35% margin), 113% of FCF returned via buybacks, 53rd consecutive dividend raise, and AI as a structural tailwind (20% cost reduction by 2027 via EDO). " +
    "The problem: RS 16 signals no institutional momentum, and at current valuation the base case delivers only ~11-13% CAGR — premium quality but not explosive growth. " +
    "If AI margin uplift + Mobility spin + index tailwinds compound, this is a 16-18% compounder. If credit cycle slows issuance, EPS growth halves and you own a 2-4% CAGR at current price. " +
    "35-40% probability of 15%+ CAGR — the highest-quality compounder in the portfolio, waiting for a better entry.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 480, targetMedian: 623, targetHigh: 698, numAnalysts: 26 },
  revGrowth: [
    [0.04, 0.04, 0.04, 0.04, 0.04],
    [0.075, 0.08, 0.08, 0.08, 0.07],
    [0.10, 0.10, 0.09, 0.09, 0.08],
  ],
  fcfMargin: [
    [0.32, 0.31, 0.31, 0.30, 0.30],
    [0.35, 0.35, 0.36, 0.36, 0.37],
    [0.37, 0.38, 0.39, 0.40, 0.41],
  ],
  exitMultiple: [15, 19, 21],
  ebitdaProxy: [0.48, 0.52, 0.55],
  desc: [
    'Credit cycle downturn + issuance slump: EPS CAGR ~6-7%, EPS 2030 ~$26-28, exit P/E 18x. Target ~$470-500. CAGR ~2-4%.',
    'Disciplined structural growth per guidance: revenue +6-8%, EPS CAGR ~11%, EPS 2030 ~$33-35, exit P/E 22x. Target ~$730-770. CAGR ~11-12%.',
    'AI margin uplift + index tailwinds + Mobility spin catalyst: EPS CAGR ~14-15%, EPS 2030 ~$37-40, exit P/E 25x. Target ~$950-1000. CAGR ~16-18%.',
  ],

  bullMaOptVal: 417 * 298.8 * 0.07,
});
