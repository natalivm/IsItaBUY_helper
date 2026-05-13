import { defineStock } from './defineStock';

export const WWD = defineStock({
  updatedOn: '05/12',
  lastReportTag: 'Q2 FY26',
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 367.45,
  fairPriceRange: '$290 – $420',
  shares0: 61.5,
  rev25: 3600,          // FY25 actual base; FY26 guide raised to +20–23% → ~$4.3–4.4B
  fcfMargin25: 0.083,   // FCF guide $300–350M / ~$4.35B rev; constrained by $290M capex + inventory
  taxRate: 0.22,
  cash: 327,
  debt: 550,
  beta: 1.18,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  baseEps: 9.30,        // FY26 mid-guide adj EPS ($9.15–$9.45, raised from $8.20–$8.60)
  rsRating: 94,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Woodward crossed $1B in quarterly sales for the first time in Q2 FY2026 — revenue $1.1B (+23% YoY), adj EPS $2.27 (+34%), record results in both Aerospace ($703M, +25%) and Industrial ($387M, +20%). " +
    "Management raised FY2026 guidance sharply to 20-23% sales growth and adj EPS $9.15-$9.45 (was $8.20-$8.60). Commercial Services +36% (LEAP/GTF + legacy), Commercial OEM +30%, Defense OEM +9%. " +
    "New catalyst: data center power gen demand is accelerating beyond prior capacity plans — multiple OEM customers sent capacity-study requests for 2030+; Woodward previously said existing facilities were sufficient and is now reconsidering expansion. Glatten expansion (diesel injectors for backup power) just completed. " +
    "Portfolio quality improving: China on-highway wind-down ($30M Q3, minimal Q4), acquired VRM solenoids (next-gen single-aisle content), sold pilot controls line. New LEAP/GTF MRO partnerships with Lufthansa Technik, Air France KLM, and AAR add service network scale. " +
    "At ~$370 / ~40x FY2026 guided EPS ($9.30 mid), valuation is still demanding. FCF guide $300-350M unchanged despite higher earnings — $290M capex + inventory build constrain conversion. RS 94 near elite; bull case requires sustained aero supercycle + data center capacity expansion.",

  // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
  // revGrowth and fcfMargin are kept for display/yield calculations.
  epsCagr: [7, 13, 20],
  exitPE: [22, 30, 40],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Buy', targetLow: 310, targetMedian: 355, targetHigh: 450, numAnalysts: 14 },
  revGrowth: [
    [0.18, 0.07, 0.06, 0.05, 0.04],  // Bear: FY26 delivers guidance low end, then decelerates
    [0.21, 0.12, 0.11, 0.10, 0.09],  // Base: FY26 mid-guidance, sustained by aero + data center
    [0.23, 0.17, 0.15, 0.14, 0.12],  // Bull: FY26 top end + data center capacity expansion upside
  ],
  fcfMargin: [
    [0.07, 0.07, 0.075, 0.075, 0.08],
    [0.08, 0.085, 0.09, 0.095, 0.10],
    [0.09, 0.095, 0.10, 0.11, 0.12],
  ],
  exitMultiple: [12, 17, 22],
  desc: [
    'FY2026 delivers at guidance but aftermarket softens in FY2027 as higher fuel prices force airline capacity reductions. ' +
      'Data center capacity expansion does not materialize and industrial growth normalizes. Earnings CAGR decelerates to 7%. ' +
      'Multiple compresses from ~40x to 22x as market re-rates from compounder to cyclical.',
    'FY2026 guidance delivers at mid-point ($9.30 adj EPS), Commercial Services and data center power gen sustain growth into FY2027. ' +
      'LEAP/GTF MRO partnerships (LHT, Air France KLM, AAR) ramp and expand the service franchise. Earnings compound at 13% annually. ' +
      'Multiple settles to 30x as FCF conversion improves from H2 2026 inventory normalization.',
    'Data center power gen demand triggers a Woodward capacity expansion that extends the industrial growth cycle. ' +
      'Aerospace supercycle continues — LEAP/GTF aftermarket crossover drives margin-rich services mix. ' +
      'New single-aisle content wins at Airbus/Boeing add a decade-long growth vector. Earnings compound at 20%; market sustains 40x.',
  ],

  bbRate: [0.005, 0.02, 0.03],
  bullMaOptVal: 370.25 * 61.5 * 0.07,
  driverOverrides: [
    {},
    {},
    { fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02] },
  ],
});
