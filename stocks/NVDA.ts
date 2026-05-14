import { defineStock } from './defineStock';

export const NVDA = defineStock({
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  sector: 'Semiconductors / AI Infrastructure',
  themeColor: '#76b900',
  currentPrice: 235.74,
  fairPriceRange: '$180 - $350',
  shares0: 24400,
  rev25: 215900,
  fcfMargin25: 0.41,
  taxRate: 0.12,
  cash: 60600,
  debt: 10800,
  beta: 1.65,
  costDebt: 0.035,
  rsRating: 82,
  aiImpact: 'TAILWIND',
  strategicNarrative: "NVDA is a structural AI infrastructure monopolist priced near perfection. Q4 FY26 revenue hit $68.1B (+73% YoY); full-year FY26 $215.9B (+65% YoY) beat estimates. Data center $62.3B (+75% YoY, 91% of sales). Q1 FY27 guided at ~$78B ex-China, implying ~$312B+ FY27 run-rate. Vera Rubin AI platform in full production (2H 2026 deployment), Meta multiyear partnership locks in hyperscaler demand visibility across CPUs, networking, and millions of Blackwell+Rubin GPUs. 41% FCF margin, 75% gross margins, CUDA ecosystem lock-in. The stress floor (~$175–180 at 25× FY27E EPS) sits just below current price — P/E compression risk largely absorbed, all upside is EPS execution. Content/GW rising Hopper ($22.5B) → Blackwell ($30B) → Rubin ($40B est) signals structural pricing power.",


  updatedOn: '05/14',
  analystConsensus: { rating: 'Strong Buy', targetLow: 140, targetMedian: 254, targetHigh: 352, numAnalysts: 37 },
  revGrowth: [
    [0.25, 0.08, 0.05, 0.03, 0.02],
    [0.48, 0.22, 0.16, 0.12, 0.09],
    [0.55, 0.28, 0.22, 0.17, 0.13],
  ],
  fcfMargin: [
    [0.38, 0.35, 0.33, 0.32, 0.30],
    [0.41, 0.43, 0.44, 0.45, 0.46],
    [0.44, 0.47, 0.49, 0.51, 0.53],
  ],
  exitMultiple: [16, 24, 30],
  desc: [
    'AI capex digestion arrives early, hyperscaler spend plateaus, enterprise adoption stalls — revenue growth halves to 10-15% and multiple compresses from 64x trailing to 20x as market re-rates NVDA as cyclical.',
    'Consensus FY27E $316B+ revenue validates on $0.5T Blackwell+Rubin backlog — FCF scales to 45%+ margin, EPS compounds at 25% CAGR, P/E naturally compresses through earnings growth while structural AI capex cycle persists 5-7 years.',
    'Rubin super-cycle in 2H 2026 accelerates content/GW expansion, sovereign AI + inference wave broadens TAM beyond hyperscalers, networking revenue (+162% YoY) becomes second growth engine — FCF exceeds $150B by FY28.',
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
});
