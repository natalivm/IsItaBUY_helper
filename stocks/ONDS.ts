import { defineStock } from './defineStock';

export const ONDS = defineStock({
  ticker: 'ONDS',
  name: 'Ondas Inc.',
  sector: 'Defense Drones / Autonomous Systems',
  themeColor: '#6366f1',
  currentPrice: 6.65,
  updatedOn: '07/16',
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
  rsRating: 62,
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: highly speculative momentum name (RS 99) where the DCF is meaningless — HOLD avoids both the STRONG BUY and OVERVALUED extremes.
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Positioned at the intersection of three converging defense megatrends: drones, counter-UAS, and AI-enabled ISR',
    'American Robotics subsidiary provides a real operational platform for autonomous military and industrial deployment',
    'Top-tier relative strength reflects explosive institutional accumulation and broad momentum across the defense-drone theme',
    'Potential for Tier-1 DoD contract wins that could multiply revenue many times from the current tiny base',
  ],

  risksToBuy: [
    'Valuation prices in a full autonomous warfare adoption scenario that has no fundamental revenue support today',
    'Repeated share issuances and GAAP losses create structural dilution risk with no buyback offset',
    'Contract cadence is lumpy and unpredictable — a single dry quarter can trigger severe re-rating',
    'Defense budget pressure or a shift in procurement priorities could indefinitely delay material contract wins',
    'Bear case reflects a realistic re-rating toward fundamentals that would erase the vast majority of market cap',
  ],

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
