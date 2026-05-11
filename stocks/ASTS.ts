import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 82.55,
  updatedOn: '05/11',
  fairPriceRange: '$20 - $250',
  shares0: 370,
  rev25: 71,
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3900,
  debt: 2500,
  beta: 1.46,
  costDebt: 0.03,
  rsRating: 90,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "AST SpaceMobile is the only space-based cellular broadband network for standard smartphones — a category-defining bet with 50+ MNO partnerships (incl. Verizon, AT&T, Vodafone, stc) covering 3B+ subscribers. " +
    "Q4 2025 validated execution: FY25 revenue $71M (top of guidance), BB6 Block 2 (2,400 sq ft) successfully deployed, $1.2B contracted backlog, balance sheet fortified to $3.9B pro forma cash. " +
    "2026 guidance $150-200M revenue with 45-60 sats targeting orbit; 2027 goal approaching $1B as commercial service scales across US, Europe, Japan, Middle East. " +
    "Management targets 90%+ EBITDA margins at scale, $21-23M/sat cost, 95% vertically integrated manufacturing. Government revenue accelerating via Golden Dome, SHIELD, SDA contracts. " +
    "April 2025: a satellite launch failure pressured the stock -10.7% and trimmed RS from 97 to 90. Existing constellation intact; $3.9B cash provides runway to absorb delays. " +
    "Risk remains execution: launch cadence recovery, stacking validation, and dilution from convertibles/ATM. Execution-or-bust thesis intact but bear-case probability elevated near-term. ",

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

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.35, 0.55, 0.65],
  bullMaOptVal: 93.15 * 370 * 0.07,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
