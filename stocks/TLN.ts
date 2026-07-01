import { defineStock } from './defineStock';

export const TLN = defineStock({
  ticker: 'TLN',
  name: 'Talen Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '07/01',
  currentPrice: 360.79,
  fairPriceRange: '$230 - $690',
  shares0: 45.96,
  rev25: 2430,
  fcfMargin25: 0.20,
  taxRate: 0.21,
  cash: 650,
  debt: 9250,      // $5,800M pre-acquisition + $3,450M ECP gas plant financing
  beta: 1.0,       // Elevated post-acquisition leverage raises equity beta from 0.85
  costDebt: 0.07,
  modelType: 'EPS_PE',
  baseEps: 10.50,   // Adjusted earnings power (~FCF/share); GAAP P/E of 77x is hedging distortion
  rsRating: 72,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    '24/7 carbon-free nuclear baseload is genuinely scarce and cannot be replicated at hyperscale',
    'Amazon Susquehanna co-location deal proves hyperscalers will pay a structural premium for nuclear power',
    'Gas plant acquisition was priced well below peer comps, providing immediate value accretion',
    'Low hedge ratios give maximum exposure to rising electricity prices among power peers',
    'AI-driven data center electricity demand represents a multi-decade structural tailwind for power generators',
  ],

  risksToBuy: [
    'Most alarming leverage profile in the portfolio — interest coverage barely above one times',
    'Entire investment thesis depends on AI power demand driving rapid EBITDA expansion to service debt',
    'PJM geographic concentration with no ERCOT diversification unlike major peers',
    'FERC regulatory scrutiny on nuclear-to-data-center co-location could delay or cap co-location deals',
    'Gas plant integration execution risk on a complex multi-gigawatt acquisition at elevated leverage',
  ],

  epsCagr: [8, 15, 22],
  exitPE: [13, 18, 24],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 314, targetMedian: 438, targetHigh: 576, numAnalysts: 12 },
  revGrowth: [
    [0.10, 0.06, 0.05, 0.05, 0.04],  // Bear: slow gas plant integration, PJM reform headwinds, soft power prices
    [0.30, 0.12, 0.11, 0.10, 0.09],  // Base: ECP acquisition step-up + 15%+ FCF/share compounding through 2030
    [0.40, 0.18, 0.17, 0.16, 0.14],  // Bull: AI power surge + nuclear co-location premium + hyperscaler deals
  ],
  fcfMargin: [0.16, 0.21, 0.26],
  exitMultiple: [11, 16, 22],
  desc: [
    'Regulatory setback on nuclear co-location and PJM capacity market reforms pressure revenues; gas plant integration disappoints and elevated leverage weighs on FCF.',
    'ECP acquisition integrates on schedule and drives >15% FCF/share growth through 2030; nuclear scarcity premium holds as hyperscalers compete for 24/7 carbon-free baseload power.',
    'AI-driven electricity demand accelerates PJM capacity prices; Susquehanna co-location model expands to additional hyperscaler agreements, unlocking AI-infrastructure multiples across the full asset base.',
  ],
  debtSafety: {
    netDebt: 8600,
    ebitda: 900,
    capexToOcf: 0.44,
    interestCoverage: 1.1,
    altmanZ: 1.6,
    fy: 'FY25',
    note: 'Most alarming leverage profile in the portfolio — 9.6× EBITDA with interest coverage barely above 1×. The $3.45B ECP gas plant acquisition piled onto existing debt against a sub-$1B EBITDA base. Entire investment thesis depends on AI power demand driving rapid EBITDA expansion. If capacity pricing disappoints, this balance sheet breaks.',
  },
});
