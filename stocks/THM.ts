import { defineStock } from './defineStock';

export const THM = defineStock({
  ticker: 'THM',
  name: 'International Tower Hill Mines',
  sector: 'Gold Mining · Exploration & Development',
  themeColor: '#CA8A04',
  updatedOn: '10/14',
  currentPrice: 2,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$1 - $12',
  shares0: 261.6,     // stockanalysis (Oct 2026) — up from ~245M after the Jan 2026 Paulson subscription
  rev25: 5,           // placeholder — pre-revenue explorer; the DCF here is an option-value proxy, not a cash-flow forecast
  fcfMargin25: -2.0,
  taxRate: 0.25,
  cash: 110,          // Jun 2026: ~$110.4M cash; working capital $110.1M
  debt: 0,
  beta: 0.71,
  costDebt: 0.05,

  rsRating: 44,       // IBD RS per user, 10/11/2026 (was 59)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Added Oct 2026: pre-revenue, pre-feasibility explorer where the "DCF" is a gold-price option proxy — model STRONG BUY is not underwritable. Pinned HOLD like other pre-profit speculative names (ASTS, RKLB, ONDS).
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Aug 12, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Q2 10-Q filed; working capital $110.1M, no debt; TTM net loss ~$3M (low
  // burn). Paulson subscription in Jan 2026. Feasibility-study team
  // appointed and feasibility drilling program launched (May 2026). No
  // current analyst coverage on stockanalysis (old single-analyst $2 target
  // retained below). Stock $2.40 (~$630M market cap), up ~13% over 52 weeks.
  // Q3 2026 filing ~Nov 6.
  // ─────────────────────────────────────────────────────────────────────────
  analystConsensus: { rating: 'Strong Buy', targetLow: 2, targetMedian: 2, targetHigh: 2, numAnalysts: 1 },  // stale single-analyst target — no current coverage (Oct 2026)
  reasonsToBuy: [
    'One of the largest undeveloped gold reserves in a stable, Tier-1 Alaskan jurisdiction',
    'At elevated gold prices the project margin per ounce is exceptional, creating huge NPV asymmetry',
    'Paulson and Co. is a major and committed institutional backer with meaningful ownership',
    'No debt and enough cash to fund the feasibility study and permitting work now under way without near-term dilution',
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
      'Equity value reduces to cash on hand minus burn. 5yr value proxy {target} ({cagr} annualized).',
    'Gold maintains $4,000+ levels. Margin of $2,932/oz makes the project compelling. ' +
      'A strategic partner or streaming deal finances the $1.93B capex, limiting dilution. ' +
      'Permitting milestones de-risk the 3-5 year timeline, triggering a re-rating. ' +
      'Reserve optionality and Paulson institutional backing drive a re-rating. 5yr value proxy {target} ({cagr} annualized).',
    'Gold supercycle pushes prices to $5,000+. At $4,158/oz margin and $7-10B project NPV, ' +
      'a major gold producer acquires THM at an NPV discount or a premium JV accelerates Livengood development. ' +
      'Full optionality pricing of the 9M oz reserve base. 5yr value proxy {target} ({cagr} annualized).',
  ],

  thesis: [
    'Gold price reversal + $1.93B capex mountain = option decay. No production cash flow floor. ' +
      'Below $2,500 gold, project NPV collapses from $7-10B to under $1B. Financing gap cannot be bridged at low gold. ' +
      'Permitting takes 3-5 years, extending the burn. Momentum in junior miners often precedes volatile reversals.',
    '9.0M oz P+P reserve at $4,000+ gold = compelling project economics with $2.9B+ margin annually at full production. ' +
      'Paulson backing (largest holder; Jan 2026 subscription) + ~$110M cash funds the feasibility study launched in 2026 and early permitting. ' +
      'Streaming/JV deal highly likely at elevated gold prices. Milestone-driven re-rating as permits advance.',
    'Gold supercycle transforms Livengood from marginal to world-class: a multi-billion project NPV vs a ~$630M market cap is a large gap. ' +
      'Major producer M&A or a premium JV partnership unlocks reserve value. ' +
      'Asymmetric payoff from current levels, with optionality for more if gold strengthens further.',
  ],

  termGrowth: [0.005, 0.015, 0.020],
  waccAdj: [0.025, 0.005, -0.005],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0, 0.05, 0.15],
  bullMaOptVal: 1280,

  driverOverrides: [   // base entry carries no revPrem/fcfUplift premium (removed Oct 2026 — the base view lives in revGrowth/fcfMargin)
    {
      bbRate: 0,
    },
    {
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
    netDebt: -110,         // Jun 2026: ~$110M cash, no debt
    ebitda: 1,
    fy: 'Q2 2026',
    note: 'Net cash — no debt, ~$110M cash funds Livengood feasibility work. Pre-revenue explorer; EBITDA framework not meaningful. Safety is entirely a function of cash runway vs. burn rate and permitting timeline. Watch cash balance quarterly.',
  },
});
