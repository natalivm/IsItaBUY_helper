import { defineStock } from './defineStock';

export const NVDA = defineStock({
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  sector: 'Semiconductors / AI Infrastructure',
  themeColor: '#76b900',
  currentPrice: 194.97,
  fairPriceRange: '$210 - $400',
  shares0: 24400,
  rev25: 215900,
  fcfMargin25: 0.41,
  taxRate: 0.17,
  cash: 60600,
  debt: 10800,
  beta: 1.65,
  costDebt: 0.035,
  rsRating: 76,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'De facto monopoly on AI training infrastructure with every major hyperscaler locked into the Blackwell platform',
    'Data center networking growing faster than compute — a second structural growth engine emerging',
    'Vera Rubin architecture extends the upgrade cycle well beyond current-generation GPU demand',
    'Inference, sovereign AI, and enterprise adoption broadening the buyer base beyond hyperscalers',
    'Massive net cash position and accelerating capital return via buybacks and dividend growth',
  ],

  risksToBuy: [
    'China revenue permanently zeroed out by export controls, removing a previously meaningful growth segment',
    'Hyperscaler AI capex cycle could plateau or reverse, triggering abrupt demand digestion',
    'Custom silicon from Google, Amazon, and Microsoft could displace Blackwell at the margin over time',
    'Valuation already prices in a multi-year supercycle — any deceleration compresses the multiple sharply',
    'Cyclicality risk: the market re-rates NVDA as a chip company, not a software-moat compounder, on any miss',
  ],

  updatedOn: '06/29',
  lastReportTag: 'Q1 FY27',
  analystConsensus: { rating: 'Strong Buy', targetLow: 140, targetMedian: 254, targetHigh: 352, numAnalysts: 37 },
  revGrowth: [
    [0.55, 0.05, 0.02, 0.02, 0.01],
    [0.75, 0.25, 0.17, 0.12, 0.09],
    [0.85, 0.32, 0.24, 0.18, 0.13],
  ],
  fcfMargin: [
    [0.42, 0.38, 0.34, 0.32, 0.30],
    [0.50, 0.49, 0.48, 0.47, 0.46],
    [0.54, 0.53, 0.52, 0.52, 0.52],
  ],
  exitMultiple: [16, 24, 30],
  desc: [
    'AI capex digestion lands in late FY27 — even with H1 FY27 already locked at ~$172.6B, hyperscaler spend plateaus into FY28, sovereign/enterprise AI fails to compensate, and multiple compresses to 20x as market re-rates NVDA as cyclical.',
    'Q1 FY27 actuals + Q2 guide put FY27 on a ~$370–400B path ex-China — FCF margin holds near 50% on operating leverage, Vera Rubin Q3 ramp extends content/GW expansion, EPS compounds at 25%+ CAGR, P/E naturally compresses through earnings growth while structural AI capex cycle persists 5-7 years.',
    'Rubin super-cycle in H2 FY27 accelerates content/GW expansion, sovereign AI + inference wave broadens TAM beyond hyperscalers, agentic AI / RL drive new CPU (Grace) growth, networking becomes second growth engine — FCF exceeds $200B by FY28.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.01, 0.02, 0.025],
  ebitdaProxy: [0.55, 0.62, 0.66],
  bullMaOptVal: 187 * 24400 * 0.04,

  driverOverrides: [
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.03, 0.03, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  burry: {
    sbc: 6386,
    gaapNi: 120067,
    buyback: 48035,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 29,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — real owner profit ~71% of GAAP. FY26 actuals (TIKR): SBC $6,386M, GAAP NI $120,067M, buybacks $48,035M (+18% YoY from $40,638M FY25). Naive SBC/NI is only 5.3%, but with NVDA stock 6.7× since 2022 grants, the true MTM economic cost is ~$43B/yr — buybacks ($48B) more than cover it on a cash basis, but Burry still recognizes the SBC adjustment because the dilution is real regardless of how the buybacks are spent. Calibrated 4y-MTM formula reproduces 30.5% from these inputs, within 1.5pp of Burry\'s 29%.',
  },
  debtSafety: {
    netDebt: -49800,
    ebitda: 90000,
    fy: 'FY26',
    note: 'Massive net cash position ($60.6B cash vs $10.8B debt). Zero leverage concern.',
  },
});
