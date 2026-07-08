import { defineStock } from './defineStock';

export const THM = defineStock({
  ticker: 'THM',
  name: 'International Tower Hill Mines',
  sector: 'Gold Mining · Exploration & Development',
  themeColor: '#CA8A04',
  updatedOn: '07/08',
  currentPrice: 2.1,
  fairPriceRange: '$1 - $12',
  shares0: 245,
  rev25: 5,
  fcfMargin25: -2.0,
  taxRate: 0.25,
  cash: 115,
  debt: 0,
  beta: 0.71,
  costDebt: 0.05,

  rsRating: 59,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  analystConsensus: { rating: 'Strong Buy', targetLow: 2, targetMedian: 2, targetHigh: 2, numAnalysts: 1 },
  reasonsToBuy: [
    'One of the largest undeveloped gold reserves in a stable, Tier-1 Alaskan jurisdiction',
    'At elevated gold prices the project margin per ounce is exceptional, creating huge NPV asymmetry',
    'Paulson and Co. is a major and committed institutional backer with meaningful ownership',
    'No debt and enough cash for multi-year feasibility and permitting work without near-term dilution',
    'A streaming deal or major-producer JV at high gold prices could unlock reserve value rapidly',
  ],

  risksToBuy: [
    'Pre-revenue and pre-production — entirely speculative with no operating cash flow to provide a floor',
    'The capex requirement dwarfs current cash, requiring massive external financing or severe dilution',
    'Gold price reversal would collapse project economics and make financing nearly impossible',
    'Permitting in Alaska is a multi-year process with real regulatory and environmental risk',
    'Equity value could fall to near zero if gold weakens and capital markets close for junior miners',
  ],

  revGrowth: [
    [-0.10, -0.15, -0.20, -0.20, -0.20],
    [0.10, 0.15, 0.20, 0.15, 0.10],
    [0.20, 0.30, 0.50, 0.40, 0.30],
  ],
  fcfMargin: [
    [-2.00, -2.00, -1.50, -1.00, -0.50],
    [-1.50, -1.00, -0.30, -0.10, 0.05],
    [-1.00, -0.50, 0.00, 0.10, 0.20],
  ],
  exitMultiple: [1, 3, 5],

  desc: [
    'Gold retreats below $2,500/oz, weakening project economics sharply. NPV drops from $7-10B to marginal territory. ' +
      'Financing becomes impossible or severely dilutive. Permitting delays compound the problem. ' +
      'At worst, gold falls below $2,000 and the project stalls entirely — the call option decays. ' +
      'Equity value reduces to cash on hand minus burn.',
    'Gold maintains $4,000+ levels. Margin of $2,932/oz makes the project compelling. ' +
      'A strategic partner or streaming deal finances the $1.93B capex, limiting dilution. ' +
      'Permitting milestones de-risk the 3-5 year timeline, triggering a re-rating. ' +
      'Reserve optionality and Paulson institutional backing drive valuation to ~$4.50.',
    'Gold supercycle pushes prices to $5,000+. At $4,158/oz margin and $7-10B project NPV, ' +
      'a major gold producer acquires THM at an NPV discount or a premium JV accelerates Livengood development. ' +
      'Full optionality pricing of the 9M oz reserve base targets ~$6.',
  ],

  thesis: [
    'Gold price reversal + $1.93B capex mountain = option decay. No production cash flow floor. ' +
      'Below $2,500 gold, project NPV collapses from $7-10B to under $1B. Financing gap cannot be bridged at low gold. ' +
      'Permitting takes 3-5 years, extending the burn. RS 99 in commodities often precedes volatile reversals.',
    '9.0M oz P+P reserve at $4,000+ gold = compelling project economics with $2.9B+ margin annually at full production. ' +
      'Paulson backing ($40M placement, 38% ownership) + $115M capital provides 2-3 years for feasibility and permitting. ' +
      'Streaming/JV deal highly likely at elevated gold prices. Milestone-driven re-rating as permits advance.',
    'Gold supercycle transforms Livengood from marginal to world-class. NPV $7-10B vs $860M market cap = 8-12x gap. ' +
      'Major producer M&A or premium JV partnership unlocks reserve value at ~$6 per share. ' +
      'Asymmetric payoff structure from $3.51 entry with optionality for higher if gold strengthens further.',
  ],

  termGrowth: [0.005, 0.015, 0.020],
  waccAdj: [0.025, 0.005, -0.005],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0, 0.05, 0.15],
  bullMaOptVal: 1280,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.02, 0.03, 0.03, 0.03],
      fcfUplift: [0, 0, 0.005, 0.01, 0.015],
      bbRate: 0.002,
      maOptVal: 988,
    },
    {
      revPrem: [0.02, 0.04, 0.06, 0.06, 0.06],
      fcfUplift: [0, 0.005, 0.015, 0.02, 0.03],
      bbRate: 0.005,
    },
  ],

  debtSafety: {
    netDebt: -115,
    ebitda: 1,
    fy: 'FY25',
    note: 'Net cash — no debt, ~$115M cash funds Livengood development. Pre-revenue explorer; EBITDA framework not meaningful. Safety is entirely a function of cash runway vs. burn rate and permitting timeline. Watch cash balance quarterly.',
  },
});
