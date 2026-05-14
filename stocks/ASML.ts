import { defineStock } from './defineStock';

export const ASML = defineStock({
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  updatedOn: '05/14',
  currentPrice: 1584.51,
  fairPriceRange: '$420 - $1,400',
  shares0: 384,
  rev25: 34400,
  fcfMargin25: 0.32,
  taxRate: 0.15,
  cash: 6000,
  debt: 5000,
  beta: 1.15,
  costDebt: 0.025,
  rsRating: 94,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "ASML is the highest-quality company in semiconductors — sole EUV supplier with a structural monopoly that's deepening (High-NA, multi-beam inspection, installed base upgrades). " +
    "Record Q4 bookings €13.2B, €38.8B backlog, AI-driven advanced node demand (4nm→2nm), and €12B buyback provide multi-year visibility. " +
    "The tension: at ~42x forward P/E, margin of safety is limited — 2026 mix headwinds (dry DUV, EUV 3600) create near-term noise even as 2027+ looks better. " +
    "Fundamentals = top tier. Valuation = not cheap. Cycle = decides everything. " +
    "55-65% probability of 15%+ CAGR — best entry on cyclical dips or P/E <30x.",

  prob: [30, 40, 30],

  analystConsensus: { rating: 'Strong Buy', targetLow: 1150, targetMedian: 1476, targetHigh: 1911, numAnalysts: 12 },
  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.13, 0.13, 0.12, 0.12],
    [0.19, 0.17, 0.16, 0.15, 0.15],
  ],
  fcfMargin: [
    [0.20, 0.20, 0.22, 0.22, 0.22],
    [0.26, 0.28, 0.30, 0.31, 0.32],
    [0.28, 0.30, 0.33, 0.35, 0.36],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'Capital spending pauses at TSMC and Intel as fab readiness delays persist and AI capex moderates. ' +
      'Margin pressure from the dry DUV and EUV 3600 product mix does not resolve by 2027. ' +
      'Earnings grow at 10% annually but the multiple compresses to its historical floor of 25x. ' +
      'At current valuation this translates to only about 4% annualized returns — essentially dead money.',
    'A normal semiconductor cycle plays out with AI and datacenter demand sustaining EUV dominance. High-NA ramps on schedule. ' +
      'The installed base plus upgrades grow steadily, and the 2026 margin dip recovers by 2027 as the product mix improves. ' +
      'The 12 billion euro buyback program adds 1-2% to annual earnings growth through 2028. ' +
      'Earnings compound at 18% annually with a 30x exit multiple, delivering around 16% annualized returns.',
    'An AI capex supercycle drives massive advanced node buildout at 2nm and below, with High-NA fully adopted after Intel qualification. ' +
      'DRAM EUV intensity accelerates as memory markets tighten and single EUV exposures replace multi-pattern DUV. ' +
      'Metrology and inspection revenues grow significantly, and the buyback program accelerates earnings per share. ' +
      'Earnings compound at 22% annually with a 35x premium multiple, delivering roughly 24% annualized returns.',
  ],

  ebitdaProxy: [0.35, 0.45, 0.55],
  bbRate: [0.01, 0.02, 0.025],
});
