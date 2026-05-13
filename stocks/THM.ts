import { defineStock } from './defineStock';

export const THM = defineStock({
  ticker: 'THM',
  name: 'International Tower Hill Mines',
  sector: 'Gold Mining · Exploration & Development',
  themeColor: '#CA8A04',
  updatedOn: '05/13',
  currentPrice: 2.79,
  fairPriceRange: '$1 - $12',
  shares0: 245,
  rev25: 5,
  fcfMargin25: -2.0,
  taxRate: 0.25,
  cash: 115,
  debt: 0,
  beta: 0.71,
  costDebt: 0.05,

  rsRating: 98,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  analystConsensus: { rating: 'Strong Buy', targetLow: 2, targetMedian: 2, targetHigh: 2, numAnalysts: 1 },
  strategicNarrative:
    "THM is a long-dated call option on gold staying above ~$2,000/oz. The Livengood project holds 9.0M oz P+P reserves at 0.65 g/t — 317k oz/yr over a 20.3-year mine life with AISC of $1,068/oz. " +
    "At today's $5,226 gold, margin is $4,158/oz and project NPV (5%) is $7-10B vs ~$860M market cap — massive asymmetry if gold holds. " +
    "However, $1.93B capex is the mountain: $115M raised covers only 6% of needs, requiring a major JV or streaming deal. " +
    "RS 99, Paulson & Co. backing ($40M private placement, ~38% ownership), and Alaska Tier-1 jurisdiction are positives. " +
    "But this is pre-revenue, pre-production, no earnings, no operating cash flow — purely speculative. " +
    "Bull case ~$6 driven by gold reserve optionality; bear case ~$0.40 (cash floor minus burn). Size as speculation only. ",

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
});
