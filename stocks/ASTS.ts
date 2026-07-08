import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 74.95,
  updatedOn: '07/08',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$20 - $250',
  shares0: 370,
  rev25: 71,
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3500,           // Q1 2026 end: $3.5B (inclusive of Feb convertible notes)
  debt: 2500,
  beta: 1.46,
  costDebt: 0.03,
  rsRating: 73,
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: speculative pre-revenue satellite name with falling RS — keep at HOLD regardless of model drift. (Model already HOLD.)
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Only company building space-based broadband for unmodified standard smartphones — the technical moat is years wide.',
    'Nearly sixty MNO partners covering billions of subscribers globally provides enormous distribution without building retail infrastructure.',
    'Custom ASIC chip delivers a generational performance leap over FPGA satellites, dramatically improving unit economics at scale.',
    'Government and defense contracts through prime contractors add a high-value recurring revenue stream beyond consumer mobile.',
    'Cash-funded balance sheet provides runway to execute the constellation build without near-term dilutive financing pressure.',
  ],

  risksToBuy: [
    'Revenue is still negligible for a company carrying a large market cap — execution must convert the guide each remaining quarter.',
    'Satellite launch anomalies (BB7 loss) demonstrate irreversible single-point failures with no insurance on constellation assets.',
    'Extreme share dilution history and ongoing capital intensity mean per-share returns depend on revenue scaling faster than the float.',
    'Q1 revenue miss far below expectations raises legitimate questions about the pace of MNO monetization and subscriber activation.',
    'Even in the base case, sustained profitability is years away and requires flawless execution across launches, ground integration, and partner ramp.',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 43, targetMedian: 70, targetHigh: 137, numAnalysts: 9 },
  revGrowth: [
    [0.97, 2.21, 1.44, 0.70, 0.45],
    [1.46, 4.14, 1.78, 0.90, 0.50],
    [2.52, 4.20, 2.08, 1.15, 0.60],
  ],
  fcfMargin: [
    [-2.50, -0.40, 0.05, 0.20, 0.28],
    [-5.00, -0.88, 0.07, 0.39, 0.49],
    [-3.80, -0.50, 0.15, 0.45, 0.52],
  ],
  exitMultiple: [12, 18, 25],
  desc: [
    'Deployment delays with <30 sats by YE26, stacking issues persist. Revenue reaches ~$140M in 2026, stalls below $2.5B by 2030. Launch cadence misses targets. Margins compressed by hardware-heavy mix and elevated capex ($350-425M/qtr). Dilution accelerates from additional capital raises.',
    'On-plan deployment hitting 45 sats by YE26, stacking validated, continuous coverage live. Revenue ramps from $71M (FY25 actual) through $175M (2026 guidance midpoint) to ~$900M (2027) and $4.8B by 2029. Service revenue reaches 88% of mix. $1.2B contracted backlog provides near-term visibility. 90%+ EBITDA margins at scale as unit economics validate.',
    'Accelerated deployment (60+ sats YE26), government/DoD contracts secured (Golden Dome, SHIELD, SDA prime contractor), L/S-band spectrum monetization live. Revenue exceeds $1.3B by 2027 and $8B+ by 2030. EBITDA margins above 80%, multiple expansion as market re-rates ASTS as dual-use infrastructure monopoly.',
  ],

  burry: {
    sbc: 47.49,
    gaapNi: -341.94,
    buyback: 23.02,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'GAAP loss company — SBC overstatement framework inapplicable; rated Tragic by default. Real risk is constellation capex ($1.06B) and 395% 5-year share dilution, not SBC.',
  },

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.35, 0.55, 0.65],
  bullMaOptVal: 73.65 * 370 * 0.07,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
