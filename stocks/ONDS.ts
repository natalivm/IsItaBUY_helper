import { defineStock } from './defineStock';

export const ONDS = defineStock({
  ticker: 'ONDS',
  name: 'Ondas Inc.',
  sector: 'Defense Drones / Autonomous Systems',
  themeColor: '#6366f1',
  currentPrice: 10.43,
  updatedOn: '06/05',
  lastReportTag: 'FY2025',
  fairPriceRange: '$4 - $32',
  shares0: 496,
  rev25: 50.7,
  fcfMargin25: -0.20,
  taxRate: 0.21,
  cash: 275,
  debt: 25,
  beta: 2.56,
  costDebt: 0.065,
  rsRating: 99,
  rsTrend: 'rising',
  ratingOverride: 'HOLD',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Ondas is a speculative-grade, narrative-driven defense-drone and autonomous-systems company trading at ~130× trailing sales ($6.6B market cap vs. $50.7M FY2025 revenue). " +
    "The thesis rests on three converging defense megatrends: autonomous drone proliferation via its American Robotics subsidiary, counter-drone / anti-UAS systems, and AI-enabled battlefield ISR platforms. " +
    "The stock has appreciated ~10× in 12 months on a string of military and industrial contract announcements; RS Rating of 99 reflects explosive institutional accumulation. " +
    "The fundamental tension: essentially all of the $6.6B valuation is a call option on future contract wins — current revenue supports none of it. " +
    "WACC of 18.3% (beta 2.56) imposes heavy DCF discounting; even under aggressive base assumptions (120% revenue growth in FY26 decelerating to 25% by FY30, FCF margins expanding from 0% to 18%), the base DCF lands at only ~$15.50 — barely above spot. " +
    "Bull case ($32) requires sustained hypergrowth (2.5× in Year 1), Tier-1 DoD contract wins, and FCF margins reaching 25%+ — achievable in a world where autonomous warfare becomes a primary military platform category, but not yet evidenced by contract flow. " +
    "Bear case ($4.50) is a realistic re-rating scenario: contract cadence slows, defense budget pressure mounts, and the market reprices toward fundamentals. " +
    "Dilution is the structural risk: ONDS has a history of repeated share issuances, no buyback program, GAAP losses, and SBC that is high relative to revenue. The Burry coefficient of 0.20 (Tragic tier) signals severe earnings overstatement risk. " +
    "Analyst consensus is Strong Buy ($16–$25 range, 9 analysts) — our base case ($15.50) and PW target ($16.88) sit near the low end, consistent with fundamental discipline. " +
    "Rating: HOLD (Speculative). This is a venture-style public equity bet on autonomous warfare adoption. Size it for total-loss tolerance. Do not add on weakness without fresh contract catalysts — downside to the bear case is severe.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 16, targetMedian: 20, targetHigh: 25, numAnalysts: 9 },

  revGrowth: [
    [0.40, 0.35, 0.30, 0.25, 0.20],
    [1.20, 0.70, 0.50, 0.35, 0.25],
    [2.50, 1.00, 0.70, 0.50, 0.35],
  ],
  fcfMargin: [
    [-0.10, 0.00, 0.05, 0.08, 0.10],
    [ 0.00, 0.05, 0.10, 0.15, 0.18],
    [ 0.05, 0.12, 0.18, 0.22, 0.25],
  ],
  exitMultiple: [8, 14, 22],
  desc: [
    'Contract cadence slows; defense-budget pressure and intensifying UAS competition erode growth to 20–40% per year. FCF remains thin or negative in early years. Market re-rates toward fundamentals; intrinsic value collapses to $4–5 range.',
    'Steady drone-platform adoption with consistent military and industrial contract wins. Revenue grows 120% in FY26 and decelerates to 25% by FY30. FCF margins build as infrastructure scales. Base intrinsic value ~$15.50 with high execution requirements.',
    'Ondas emerges as a dominant autonomous defense platform. DoD and allied Tier-1 contracts surge; ONDS becomes a primary vendor for battlefield ISR and counter-drone. Revenue 2.5× in FY26, sustained growth through FY30. FCF margins reach 25%+ at scale. Bull target $32.',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 15,
    gaapNi: -40,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 80,
    overstatementSource: 'estimated',
    note: 'High SBC relative to $50.7M revenue; GAAP-loss company with repeated share dilution — structural investor risk. Burry-adjusted target ~$3.38.',
  },

  debtSafety: {
    netDebt: -250,
    ebitda: -20,
    fy: 'FY25',
    note: 'Net cash ~$250M; pre-profitability defense-drone expansion. Step 1 GREEN (net cash position).',
  },
});
