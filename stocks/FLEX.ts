import { defineStock } from './defineStock';

export const FLEX = defineStock({
  ticker: 'FLEX',
  name: 'Flex Ltd.',
  sector: 'Electronics Manufacturing Services (EMS)',
  themeColor: '#0072CE',
  currentPrice: 162.07,
  updatedOn: '06/30',
  lastReportTag: 'Q3 FY26',
  fairPriceRange: '$45 - $128',
  shares0: 356,
  rev25: 25800,
  fcfMargin25: 0.04,
  taxRate: 0.21,
  cash: 2250,
  debt: 3000,
  beta: 1.24,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 2.65,
  rsRating: 91,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Embedded power and high-voltage DC expertise puts Flex in a narrow-moat position few EMS competitors can match for AI server builds',
    'Aggressive buyback program has been the primary EPS driver, and at current price continues to compound per-share value efficiently',
    'FY26 guidance raise signals the operating margin expansion cycle is intact despite a challenging revenue environment',
    'AI server and EV content ramp represent two independent growth vectors that could simultaneously accelerate revenue recovery',
    'Record adjusted operating margin in Q3 FY26 demonstrates management\'s ability to expand profitability even on flat revenue',
  ],

  risksToBuy: [
    'The majority of EPS growth came from buybacks and margin expansion rather than organic revenue growth — a fragile earnings construction',
    'Three-month price momentum has stalled, suggesting institutional accumulation has paused near current levels',
    'In a cyclical downturn, a derating toward trough contract-manufacturing levels could produce a severe drawdown',
    'Revenue declined meaningfully over recent years — demand recovery depends on external inventory restocking cycles, not internal execution',
    'EMS is a thin-margin, capital-intensive business with intense competition from Asian players on cost and scale',
  ],

  epsCagr: [6, 13, 17],
  exitPE: [13, 18, 22],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 73, targetMedian: 77, targetHigh: 85, numAnalysts: 7 },

  revGrowth: [
    [0.02, 0.01, 0.01, 0.01, 0.01],
    [0.06, 0.04, 0.03, 0.02, 0.02],
    [0.08, 0.06, 0.05, 0.04, 0.03],
  ],
  fcfMargin: [
    [0.030, 0.030, 0.035, 0.035, 0.035],
    [0.040, 0.045, 0.045, 0.050, 0.050],
    [0.045, 0.050, 0.055, 0.060, 0.060],
  ],
  exitMultiple: [10, 13, 16],
  desc: [
    'Cyclical downturn persists, revenue stays flat. EPS growth slows to ~6% as margin expansion exhausts. P/E compresses to 13x as market reprices EMS at historical trough multiples.',
    'Moderate revenue recovery to ~$30B by FY2030. Buybacks continue at current pace. Earnings compound at ~13% on margin stability and share count reduction. P/E holds at 18x.',
    'AI server buildout + EV content ramp drive revenue recovery to $32B+. Margin expansion continues beyond 6.5% on embedded power leadership and high-mix shift. Premium 22x multiple reflects structural AI supply chain positioning.',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.01, 0.025, 0.035],
  ebitdaProxy: [0.07, 0.09, 0.11],
});
