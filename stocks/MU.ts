import { defineStock } from './defineStock';

export const MU = defineStock({
  ticker: 'MU',
  name: 'Micron Technology',
  sector: 'DRAM / NAND Flash Memory',
  themeColor: '#1a73e8',
  currentPrice: 1133.99,
  shares0: 1127,
  rev25: 95440,
  fcfMargin25: 0.20,
  taxRate: 0.138,
  cash: 14589,
  debt: 10798,
  beta: 1.7,
  costDebt: 0.05,
  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '06/18',
  lastReportTag: 'Q2 FY26',
  fairPriceRange: '$500 - $1,800',

  reasonsToBuy: [
    'Only US-headquartered DRAM and NAND manufacturer at scale, making it a strategic national-security asset',
    'HBM oligopoly with just three capable producers means structural pricing power unavailable in commodity memory',
    'CHIPS Act fabs in Idaho and New York provide government-subsidized capacity expansion rivals cannot replicate domestically',
    'AI infrastructure buildout is structurally lifting memory content per server far above historical norms',
    'HBM supply constrained by back-end packaging capacity, not fab capacity, partially neutralizing Samsung\'s scale advantage',
  ],

  risksToBuy: [
    'Classic memory cycle risk — Samsung\'s structural incentive to over-supply can compress margins to near zero in a downturn',
    'DRAM oversupply in commodity segments could drag blended ASPs even as HBM remains tight',
    'FY23 trough demonstrated how violently earnings collapse when pricing breaks — the cycle has not been tamed',
    'High capital intensity of CHIPS Act fabs commits billions to fixed costs that amplify downside in a demand air pocket',
    'SK Hynix currently leads in HBM yield and share — any slip in Micron\'s ramp execution risks ceding the premium segment',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 400, targetMedian: 703, targetHigh: 1750, numAnalysts: 30 },

  modelType: 'EPS_PE',
  baseEps: 55.00,

  revGrowth: [
    [-0.30, -0.25, -0.10, 0.05, 0.08],
    [0.40, -0.10, 0.05, 0.10, 0.08],
    [0.50, 0.20, 0.18, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.05, 0.02, -0.02, 0.05, 0.10],
    [0.22, 0.18, 0.20, 0.22, 0.22],
    [0.35, 0.38, 0.38, 0.36, 0.34],
  ],
  exitMultiple: [8, 14, 22],

  // baseEps: FY26 annualized estimate (~$12.20 Q2 + $19.15 Q3 guidance trajectory = ~$55-60 FY26E)
  // Q2 FY26 actual: $12.20 EPS (+41.86% beat). Q3 FY26 guidance: $19.15 EPS, $33.5B rev, 81% GM.
  epsCagr: [-40, 5, 18],
  exitPE: [6, 12, 18],
  prob: [25, 50, 25],

  desc: [
    'HBM oversupply hits in 2027 as Samsung regains packaging yield; commodity DRAM follows. Revenue collapses 30% from the $95B+ run-rate. EPS craters toward $5-10 range (FY23 analog). Stock re-rates to trough multiple (6×). Bear-case target ~$300-500.',
    'HBM maintains oligopoly discipline through 2028; MU holds ~30% share. Revenue normalizes around $90-100B with mid-cycle margins. EPS stabilizes near $45-55 on a 5yr view as the cycle moderates. Market assigns 12× on normalized earnings. Target ~$900-1,400.',
    'HBM pricing power persists — 81%+ gross margins sustained as AI compute buildout structurally lifts memory content per server. MU reaches 35%+ HBM share, CHIPS Act fabs cut costs, domestic premium pricing locked in. EPS compounds at 18%+ from $55 base; market re-rates to 18× as cyclicality is structurally impaired. Target ~$2,000-3,000.',
  ],

  ebitdaProxy: [0.15, 0.40, 0.58],
  bbRate: [0.002, 0.005, 0.010],
  bullMaOptVal: false,

  burry: {
    sbc: 309,
    gaapNi: 62000,
    buyback: 528,
    epsBasis: 'GAAP',
    fy: 'FY26E',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC ~$309M on ~$62B estimated FY26 GAAP NI (<1% ratio). Stock ~8× from FY23 trough amplifies unvested award values but annual SBC flow remains minimal. Watch closely — SBC may ratchet up with stock repricing at next grant cycle.',
  },

  debtSafety: {
    netDebt: -5829,
    ebitda: 36803,
    fy: 'LTM Q2 FY26',
    note: 'Net cash of $5.8B at cycle peak — FY23 trough saw net debt of ~$5B, illustrating the violent cash swing. CHIPS Act fab buildout drives CapEx/OCF of ~54% but is funded by government grants and operates from a net-cash position.',
  },
});
