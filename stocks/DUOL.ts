import { defineStock } from './defineStock';

export const DUOL = defineStock({
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 131.95,
  updatedOn: '07/07',
  fairPriceRange: '$52 - $311',
  shares0: 46.23,
  rev25: 1040,
  fcfMargin25: 0.35,
  taxRate: 0.15,
  cash: 1040,
  debt: 0,
  beta: 0.85,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 3.40,
  rsRating: 33,
  aiImpact: 'DISRUPTION_RISK',
  reasonsToBuy: [
    'Dominant language-learning network with tens of millions of daily active users and deep habit-forming engagement loops',
    'Zero-debt balance sheet with substantial cash reserves provides a durable runway for the growth reinvestment phase',
    'AI-first product suite — Max tier, Video Call, and rapid content generation — positions DUOL as a beneficiary rather than a victim of AI',
    'Reaching a hundred million DAUs would unlock a monetization base that could justify a major re-rating of the stock',
    'Deliberate friction-removal strategy is a rare case of management sacrificing near-term profits to compound the long-term user base',
  ],

  risksToBuy: [
    'Management is deliberately compressing margins to reinvest, so near-term earnings momentum is intentionally soft',
    'RS Rating is extremely weak, signaling persistent institutional selling pressure since the all-time high',
    'AI-native tutors from large tech platforms represent a genuine substitution threat for casual language learners',
    'The binary DAU growth bet either justifies the reinvestment or leaves shareholders with slow growth and depressed margins',
    'Reported net income is materially inflated by a one-time tax benefit, obscuring the true earnings baseline',
  ],

  epsCagr: [5, 15, 25],
  exitPE: [12, 22, 30],
  prob: [35, 40, 25],

  analystConsensus: { rating: 'Buy', targetLow: 160, targetMedian: 250, targetHigh: 347, numAnalysts: 17 },
  revGrowth: [
    [0.15, 0.10, 0.06, 0.04, 0.02],
    [0.16, 0.20, 0.22, 0.18, 0.15],
    [0.18, 0.25, 0.28, 0.25, 0.22],
  ],
  fcfMargin: [
    [0.22, 0.20, 0.18, 0.16, 0.14],
    [0.22, 0.26, 0.30, 0.33, 0.35],
    [0.24, 0.28, 0.33, 0.37, 0.40],
  ],
  exitMultiple: [8, 18, 25],
  desc: [
    'Strategic reset fails: reinvestment does not reignite DAU growth and the 100M DAU target slips well beyond 2028. ' +
      'AI-native tutors from ChatGPT, Apple, and Meta accelerate substitution of casual learners. ' +
      'Revenue growth stalls at mid-single digits as even the guided 15-18% 2026 target is missed. ' +
      'Margins stay compressed with no payoff, and the stock re-rates to 12x on deteriorating earnings power.',
    'The deliberate 2026 slowdown proves temporary. Reduced friction and the expanded free tier drive DAU re-acceleration in 2027-2028, with 100M DAUs on schedule. ' +
      'Paid subscriber conversion improves on the larger base, earnings compound at 15% annually from the recurring $3.40 base, and the multiple re-expands as growth reignites. ' +
      'A patient 3-5 year hold from current depressed levels delivers solid returns.',
    'Duolingo hits 100M DAUs ahead of schedule, unlocking a massive monetization base as ARPU recovers post-friction-removal. ' +
      'Subject expansion into math, test prep, and corporate training adds premium revenue streams, while Max tier and Video Call prove AI is a tailwind not a threat. ' +
      'Platform re-rating as a dominant AI-native education company drives 30x earnings multiples and 25% EPS compounding.',
  ],

  termGrowth: [0.01, 0.025, 0.035],
  waccAdj: [0.015, 0, -0.01],
  ebitdaProxy: [0.10, 0.25, 0.35],
  bullMaOptVal: 91.63 * 46.23 * 0.10,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.01, 0.01],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.015,
    },
    {
      revPrem: [0.03, 0.03, 0.03, 0.03, 0.03],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
      bbRate: 0.02,
    },
  ],

  burry: {
    sbc: 137,
    gaapNi: 120,
    buyback: 42,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical (downgraded from original Tragic 75% estimate after TIKR refresh). FY25 actuals: SBC $137M (just 12.8% of revenue — much lower than my $300M estimate; in NOW/PLTR territory rather than DDOG/ZS), buybacks $42M (covers 31% of SBC — partial offset). FCF margin 37.9% is genuinely elite — cash generation is real, not just SBC addback (SBC = 32.6% of CFO vs DDOG 70%, ZS 66%). The dilution story is post-IPO normalization: 23M (FY21) → 48M shares (LTM) = +107% but mostly from IPO + 2022 follow-ons. Post-IPO from FY22→LTM = +22.7% / +7.1%/yr (still elevated). GAAP just turned profitable (operating margin 14.8% LTM). Elite consumer-subscription economics + improving capital allocation = reclassified out of broken-SaaS cohort.',
  },
});
