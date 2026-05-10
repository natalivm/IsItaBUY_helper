import { defineStock } from './defineStock';

export const CLS = defineStock({
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  updatedOn: '05/08',
  currentPrice: 375.55,
  fairPriceRange: '$160 - $550',
  shares0: 117.9,
  rev25: 12400,
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 596,
  debt: 724,
  beta: 1.35,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 7.16,
  rsRating: 93,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Celestica is a top-tier EMS play on AI infrastructure — 800G/1.6T rack-level solutions for hyperscalers, FY25 adj EPS $7.16 (+56%), guiding $8.75 for FY26 (+22%). " +
    "Unprecedented demand visibility into 2027-28 with 1.6T switching platform win at a third hyperscaler. " +
    "The tension: $1B CapEx in FY26 temporarily depresses FCF while earnings power accelerates — DCF undervalues this profile, so we use EPS × P/E. " +
    "At ~41x trailing P/E, the stock prices in strong execution; risk is 63% top-3 client concentration and CapEx cycle duration. " +
    "RS 94 confirms momentum. Risk/reward is balanced — upside if AI supercycle extends, but multiple compression risk if growth decelerates.",

  epsCagr: [10, 18, 24],
  exitPE: [14, 22, 26],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 330, targetMedian: 387, targetHigh: 440, numAnalysts: 8 },
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
    sbc: 70,
    gaapNi: 823,
    buyback: 200,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 18,
    overstatementSource: 'estimated',
    note: 'Estimated ~18% overstatement — clean for an AI-tailwind stock. Naive SBC/NI just 8.5% (FY25 GAAP EPS $7.16 doubled YoY). Buybacks ~$200M cover SBC ~3×. Lower-margin EMS business model means less stock-based compensation than AI-chip peers; 5× 3yr stock surge is the main MTM amplifier.',
  },
});
