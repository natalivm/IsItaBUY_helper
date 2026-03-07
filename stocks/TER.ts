import { defineStock } from './defineStock';

export const TER = defineStock({
  updatedOn: '07/03',
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 272,
  fairPriceRange: '$140 - $200',
  shares0: 157,
  rev25: 3190,
  fcfMargin25: 0.141,
  taxRate: 0.20,
  cash: 900,
  debt: 100,
  beta: 1.45,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 6.25,
  rsRating: 98,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Type B — cyclical growth, classic semiconductor equipment cycle play. TER is a leading ATE vendor with narrow moat from switching costs, qualification cycles, and technical complexity. " +
    "Oligopoly with Advantest as primary competitor. Revenue essentially flat 2022-2025 ($3.16B→$3.19B, ~0% CAGR), EPS declined $4.25→$3.47 — extreme cyclicality. " +
    "Forward estimates price massive cycle recovery: EPS $3.47→$6.25E (FY26)→$8.11E (FY27). EBIT margin expanding from ~22% to ~33% on operating leverage. " +
    "Growth decomposition: ~50% revenue expansion (AI/HPC + automotive + advanced nodes) + ~45% margin expansion + ~5% financial engineering. " +
    "Forward P/E ~43x is very expensive for semicap historically (typical range 15-25x). RS 98 = top momentum but often a cycle-peak indicator for semicap. " +
    "Expected CAGR ~0-3% base case. Probability of 15%+ CAGR: ~20-25%. Fair entry: $180-$200. Deep cycle buy: $140-$160.",

  epsCagr: [5, 15, 20],
  exitPE: [18, 24, 30],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 150, targetMedian: 250, targetHigh: 320, numAnalysts: 22 },
  revGrowth: [
    [0.22, 0.05, 0.00, -0.05, 0.03],
    [0.22, 0.15, 0.12, 0.08, 0.07],
    [0.22, 0.20, 0.18, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.09, 0.10],
    [0.14, 0.16, 0.18, 0.19, 0.20],
    [0.16, 0.19, 0.22, 0.24, 0.25],
  ],
  exitMultiple: [12, 18, 24],
  desc: [
    'Semiconductor capex cycle peaks in 2026-27, then collapses as TSMC/Intel/Samsung cut spending. Late-cycle ATE demand evaporates. ' +
      'Revenue turns negative as chip demand normalizes. EBIT margins compress back to ~22%. ' +
      'P/E compresses to historical semicap trough (18x). Historical pattern repeats: EPS $4.25→$3.47 over 3 years. ' +
      'EPS grows only ~5% CAGR. Target ~$120, CAGR ~-15%.',
    'AI/HPC test demand sustains through 2028. Advanced packaging (CoWoS, chiplets) drives incremental ATE content per chip. ' +
      'Automotive semi recovery adds cyclical support. EBIT margin expands to ~30% on operating leverage. ' +
      'Universal Robots contributes modest growth. P/E compresses from ~43x to ~24x as cycle matures. ' +
      'EPS ~15% CAGR to ~$10-11 by 2030. Target ~$250, CAGR ~0-3%.',
    'AI supercycle extends — advanced node proliferation, chiplet architectures, HBM testing create structural ATE demand uplift. ' +
      'Robotics (UR/MiR) inflects with collaborative automation adoption. Revenue sustains 15%+ growth. ' +
      'EBIT margin reaches ~33%. EPS ~20% CAGR to $14-16 by 2030. Target ~$450, CAGR ~10%.',
  ],
  thesis: [
    'Semiconductor capex cycle turns down sharply in 2027-28. TSMC/Intel cut wafer fab capex as AI chip demand normalizes and inventory correction begins. ' +
      'TER as late-cycle supplier gets hit hardest. Advantest competition intensifies on HBM and advanced packaging test. ' +
      'Robotics growth disappoints. Forward P/E of 43x offers zero margin of safety for a cyclical business.',
    'AI/HPC chips drive sustained ATE demand. Test complexity at 3nm/2nm, chiplets, and HBM increases test time and content per device. ' +
      'Automotive recovery adds volume. Operating leverage drives EBIT margin from 22% to ~30%. ' +
      'Universal Robots grows mid-teens. Cycle elongated by structural AI demand but not eliminated.',
    'Full AI infrastructure thesis: every AI chip needs testing, complexity increases with each node shrink and packaging innovation. ' +
      'TER captures disproportionate share of advanced packaging test. Universal Robots achieves breakout ($1B+ revenue). ' +
      'Memory test (HBM3E/HBM4) becomes meaningful. This is the only scenario approaching 15% hurdle.',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.25, 0.35],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
