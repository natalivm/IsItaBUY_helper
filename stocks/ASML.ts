import { defineStock } from './defineStock';

export const ASML = defineStock({
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  updatedOn: '06/12',
  currentPrice: 1863.55,
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
  reasonsToBuy: [
    'Sole supplier of EUV lithography globally — no credible competitor exists, making this a structural monopoly for decades.',
    'High-NA transition deepens the moat as the most advanced nodes below two nanometers require next-generation ASML machines.',
    'Massive installed base generates a growing, high-margin service and upgrade revenue stream largely independent of new-tool cycles.',
    'AI-driven advanced node buildout (two nanometer and below) is pulling forward chipmaker capex and filling the order backlog.',
    'Multi-billion euro buyback program consistently reduces share count, compounding per-share earnings growth on top of revenue gains.',
  ],

  risksToBuy: [
    'At a premium forward multiple, even a modest cycle pause or TSMC capex delay translates directly into painful downside.',
    'Near-term product mix headwinds from dry DUV and EUV 3600 transitions create earnings noise before 2027 improves.',
    'Export restrictions on China sales could remove a significant revenue chunk with little warning or offsetting volume.',
    'High-NA ramp depends on Intel qualification proceeding on schedule — delays would defer a key multi-year growth driver.',
    'Best risk-adjusted entry is materially below current levels — patience is required to achieve an attractive return from here.',
  ],

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
  debtSafety: {
    netDebt: -1000,
    ebitda: 10500,
    fy: 'FY25',
    note: 'Slight net cash position ($6B cash vs $5B debt). EUV monopoly generates strong cash flows; balance sheet is conservatively managed.',
  },
});
