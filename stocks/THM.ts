import { defineStock } from './defineStock';

export const THM = defineStock({
  ticker: 'THM',
  name: 'International Tower Hill Mines',
  sector: 'Gold Mining · Exploration & Development',
  themeColor: '#CA8A04',
  currentPrice: 2.86,
  fairPriceRange: '$1 - $12',
  shares0: 245,
  rev25: 5,
  fcfMargin25: -2.0,
  taxRate: 0.25,
  cash: 115,
  debt: 0,
  beta: 0.71,
  costDebt: 0.05,

  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'BUY',
  strategicNarrative:
    "THM is a long-dated call option on gold staying above ~$2,000/oz. The Livengood project holds 9.0M oz P+P reserves at 0.65 g/t — 317k oz/yr over a 20.3-year mine life with AISC of $1,068/oz. " +
    "At today's $5,226 gold, margin is $4,158/oz and project NPV (5%) is $7-10B vs ~$700M market cap — massive asymmetry if gold holds. " +
    "However, $1.93B capex is the mountain: $115M raised covers only 6% of needs, requiring a major JV or streaming deal. " +
    "RS 99, Paulson & Co. backing ($40M private placement, ~38% ownership), and Alaska Tier-1 jurisdiction are positives. " +
    "But this is pre-revenue, pre-production, no earnings, no operating cash flow — purely speculative. " +
    "Probability-weighted EV: $6.90 (+141% vs $2.86 entry). High-convexity macro bet. 3-5x if right, -50-70% if wrong. Size as speculation only.",

  revGrowth: [
    [-0.10, -0.15, -0.20, -0.20, -0.20],
    [0.20, 0.50, 1.00, 2.00, 4.00],
    [0.50, 1.00, 3.00, 6.00, 10.00],
  ],
  fcfMargin: [
    [-2.00, -2.00, -1.50, -1.00, -0.50],
    [-1.50, -1.00, -0.30, 0.10, 0.25],
    [-1.00, -0.50, 0.10, 0.35, 0.55],
  ],
  exitMultiple: [2, 8, 15],

  desc: [
    'Gold retreats below $2,500/oz, weakening project economics sharply. NPV drops from $7-10B to marginal territory. ' +
      'Financing becomes impossible or severely dilutive at $1.50-2.00/share. Permitting delays compound the problem. ' +
      'At worst, gold falls below $2,000 and the project stalls entirely — the call option decays. ' +
      'Weighted target ~$2.30 from $1.00 (10% stall probability) and $3.00 (20% gold retreat).',
    'Gold maintains $4,000+ levels. Margin of $2,932/oz makes the project compelling. ' +
      'A strategic partner or streaming deal finances the $1.93B capex, limiting dilution. ' +
      'Permitting milestones de-risk the 3-5 year timeline, triggering a re-rating. ' +
      'With Paulson institutional backing and strong gold fundamentals, THM re-rates to ~$7.00.',
    'Gold supercycle pushes prices to $5,000+. At $4,158/oz margin and $7-10B project NPV, ' +
      'a major gold producer acquires THM at an NPV discount — acquisition price $10-15+/share. ' +
      'Alternatively, a premium JV accelerates Livengood development, unlocking multi-bagger returns. Target: $12.00.',
  ],

  thesis: [
    'Gold price reversal + $1.93B capex mountain = option decay. No production cash flow floor. ' +
      'Below $2,500 gold, project NPV collapses from $7-10B to under $1B. Financing gap cannot be bridged at low gold. ' +
      'Permitting takes 3-5 years, extending the burn. RS 99 in commodities often precedes volatile reversals.',
    '9.0M oz P+P reserve at $4,000+ gold = compelling project economics with $2.9B+ margin annually at full production. ' +
      'Paulson backing ($40M placement, 38% ownership) + $115M capital provides 2-3 years for feasibility and permitting. ' +
      'Streaming/JV deal highly likely at elevated gold prices. Milestone-driven re-rating as permits advance.',
    'Gold supercycle transforms Livengood from marginal to world-class. NPV $7-10B vs $700M market cap = 10-14x gap. ' +
      'Major producer M&A at $10-15+ or company develops with partner for 3-5x from $2.86 entry. ' +
      '30% probability of 300%+ returns — asymmetric payoff structure is the entire thesis.',
  ],

  termGrowth: [0.005, 0.015, 0.025],
  waccAdj: [0.025, 0.005, -0.010],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0, 0.10, 0.35],
  bullMaOptVal: true,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.02, 0.03, 0.03, 0.03],
      fcfUplift: [0, 0, 0.005, 0.01, 0.015],
      bbRate: 0.002,
    },
    {
      revPrem: [0.02, 0.04, 0.06, 0.06, 0.06],
      fcfUplift: [0, 0.005, 0.015, 0.02, 0.03],
      bbRate: 0.005,
    },
  ],
});
