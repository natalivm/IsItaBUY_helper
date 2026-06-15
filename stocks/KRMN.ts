import { defineStock } from './defineStock';

export const KRMN = defineStock({
  ticker: 'KRMN',
  name: 'Karman Holdings Inc.',
  sector: 'Aerospace, Defense, Hypersonics & Space Systems',
  themeColor: '#0d9488',
  currentPrice: 48.27,
  updatedOn: '06/15',
  lastReportTag: 'FY2025',
  fairPriceRange: '$42 - $155',
  shares0: 132.5,
  rev25: 471.5,
  fcfMargin25: 0.08,
  taxRate: 0.21,
  cash: 180,
  debt: 400,
  beta: 1.27,
  costDebt: 0.060,
  rsRating: 88,
  rsTrend: 'falling',
  ratingOverride: 'BUY',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Sits at the intersection of three structurally-funded defense themes: hypersonic propulsion, missile systems, and space launch',
    'Revenue growing at exceptional rates with management raising guidance alongside the beat, not cutting it',
    'Post-IPO momentum unwind created a materially cheaper entry into an unchanged and accelerating business',
    'Defense contracts provide long-duration revenue visibility that typical growth companies cannot offer investors',
    'WACC is far more DCF-friendly than speculative defense names, anchoring the base-case valuation above current price',
  ],

  risksToBuy: [
    'Concentration in a small number of large defense programs makes revenue highly sensitive to individual contract delays',
    'No buybacks and ongoing dilution from SBC means shareholders bear the cost of growth without capital return offset',
    'IPO-stage stock with limited public track record raises execution uncertainty in a complex defense manufacturing backlog',
    'DoD budget cycle dependency means any sequestration or continuing resolution could abruptly slow program funding',
    'Still-elevated multiples relative to the defense sector mean any earnings miss triggers outsized re-rating risk',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 80, targetMedian: 103, targetHigh: 125, numAnalysts: 9 },

  revGrowth: [
    [0.15, 0.12, 0.10, 0.08, 0.07],
    [0.35, 0.25, 0.20, 0.15, 0.12],
    [0.50, 0.40, 0.30, 0.25, 0.20],
  ],
  fcfMargin: [
    [0.08, 0.09, 0.10, 0.10, 0.10],
    [0.10, 0.12, 0.14, 0.15, 0.16],
    [0.12, 0.15, 0.18, 0.20, 0.22],
  ],
  exitMultiple: [10, 16, 22],

  modelType: 'EPS_PE',
  baseEps: 0.72,        // GAAP NI/share ($95M / 132.5M shares)
  epsCagr: [18, 26, 35],
  exitPE: [25, 40, 48],
  prob: [25, 50, 25],

  desc: [
    'Defense budget pressure and program delays slow growth to 7–15% per year. FCF margins stabilize near 10%. Re-rating toward normal defense multiples; bear target $42.',
    'Hypersonics and missile production ramp as contracted. Revenue grows 35% in FY26 to ~$637M, decelerating to 12% by FY30. FCF margins expand from 10% to 16% as scale offsets fixed overhead. Base target $92.',
    'Karman becomes a Tier-1 defense systems supplier. Hypersonic prime contracts land, launch platform volume accelerates. Revenue 50% in FY26, sustained growth through FY30 with FCF margins reaching 22%. Bull target $155.',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 30,
    gaapNi: 95,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 27,
    overstatementSource: 'estimated',
    note: 'New IPO with short MTM history; SBC ~6% of revenue vs. $90M+ normalized GAAP NI — manageable dilution, OK tier.',
  },

  debtSafety: {
    netDebt: 220,
    ebitda: 175,
    fy: 'FY25',
    note: 'Net leverage ~1.3× EBITDA; elevated from IPO/acquisition activity but well within manageable range for a defense manufacturer.',
  },
});
