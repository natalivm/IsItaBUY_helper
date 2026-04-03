import { defineStock } from './defineStock';

export const DUOL = defineStock({
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 101,
  updatedOn: '07/03',
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
  rsRating: 3,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Post-earnings WAIT — 2025 was elite ($1.04B revenue +39%, 52.7M DAUs +30%, $360M FCF, $1.04B cash, zero debt) but that's not the story anymore. " +
    "Management is deliberately stepping off the gas: 2026 guides only 15-18% revenue growth with EBITDA margins compressing from 29.5% to ~25% as they spend ~$50M reducing friction to chase 100M DAUs by 2028. " +
    "Key nuance: $414M reported 2025 net income includes a $256.7M one-time tax benefit — recurring EPS is ~$3.40. " +
    "At $91.63 (down 79% from ATH), EV/FCF is ~9x on 2025 actuals — priced for zero growth. " +
    "Near-term: expect analyst estimate cuts, multiple compression, and continued volatility as the market digests a growth-to-reinvestment narrative shift. " +
    "The binary bet: 100M DAUs by 2028 unlocks a monetization base that justifies massive re-rating — or the strategy fails and slow growth + declining margins gets punished hard. " +
    "AI disruption risk is real but DUOL is also AI-first (Video Call, Max tier, 18x content acceleration). WAIT for 2026 guidance stabilization or first evidence of DAU re-acceleration before adding aggressively.",


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
});
