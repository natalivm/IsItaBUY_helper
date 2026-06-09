import { defineStock } from './defineStock';

export const CLS = defineStock({
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  updatedOn: '06/09',
  lastReportTag: 'Q1 2026',
  currentPrice: 371.86,
  fairPriceRange: '$200 - $680',
  shares0: 117.9,
  rev25: 12400,
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 378,
  debt: 719,
  beta: 1.35,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 8.75,
  rsRating: 93,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Top-tier EMS partner for hyperscaler AI infrastructure with a third major win on the high-speed switching platform',
    'Demand visibility extends well beyond the current year — backlog and design wins already covering future ramp periods',
    'Earnings compounding at rapid rates as AI infrastructure buildout scales with the rack-level platform transition',
    'Low leverage and substantial credit facility provide financial flexibility to fund the expansion CapEx cycle',
    'Technical momentum confirms institutional accumulation aligned with the AI infrastructure supercycle narrative',
  ],

  risksToBuy: [
    'Extreme hyperscaler client concentration means a single customer pause could collapse near-term revenue sharply',
    'Large capital expenditure cycle temporarily depresses free cash flow, leaving limited margin for error on execution',
    'EMS businesses carry structurally thin margins — any cost inflation or program mis-execution magnifies the impact on profits',
    'The current premium multiple prices in multi-year execution that has yet to fully materialize at the guided rate',
    'AI capex cycle duration is uncertain — a pullback in hyperscaler spending could end growth momentum abruptly',
  ],

  epsCagr: [10, 18, 24],
  exitPE: [14, 22, 26],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 400, targetMedian: 450, targetHigh: 480, numAnalysts: 14 },
  revGrowth: [
    [0.30, 0.15, 0.05, 0.03, 0.02],
    [0.37, 0.35, 0.15, 0.10, 0.08],
    [0.40, 0.43, 0.22, 0.18, 0.15],
  ],
  fcfMargin: [
    [0.022, 0.022, 0.025, 0.028, 0.028],
    [0.029, 0.033, 0.037, 0.040, 0.042],
    [0.032, 0.040, 0.048, 0.052, 0.055],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI CapEx cycle moderates, revenue growth decelerates sharply. EPS growth slows to ~10% as margins plateau. P/E compresses to 14x as market reprices EMS at historical range.',
    'Solid execution on FY26 guide ($8.75 EPS). Earnings compound at ~18% as AI buildout sustains through 2028. Moderate P/E compression to 22x reflects mature growth phase.',
    'Sustained AI infrastructure super-cycle drives 24% EPS CAGR. 1.6T platform ramp and third hyperscaler win extend growth runway. Premium 26x multiple held on structural AI leadership.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.13],

  burry: {
    sbc: 172,
    gaapNi: 833,
    buyback: 56,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic: ~19× stock return (2023→2026) amplifies naive 21% SBC/NI to estimated 100% cap. Minimal buybacks ($56M NCIB, well below $172M SBC).',
  },

  debtSafety: {
    netDebt: 341,
    ebitda: 1200,
    fy: 'Q1 2026',
    note: 'Low leverage: net debt $341M (cash $378M, debt $719M), 0.6× TTM adj EBITDA. $2.5B credit facility upsized April 2026, $2B+ available liquidity.',
  },
});
