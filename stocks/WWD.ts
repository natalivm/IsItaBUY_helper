import { defineStock } from './defineStock';

export const WWD = defineStock({
  updatedOn: '10/23',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-11',
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 303.55,
  fairPriceRange: '$380 – $502',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 59.05,       // 59.05M (stockanalysis, Oct 2026) — buybacks
  rev25: 3570,          // FY25 actual base; FY26 guide +20–23% (consensus $4.34B, +21.6%), FY27E $4.71B (+8.6%)
  fcfMargin25: 0.083,   // FCF guide $300–350M / ~$4.35B rev; constrained by ~$290M capex + inventory
  taxRate: 0.22,
  cash: 475,            // Jun 2026 (stockanalysis)
  debt: 1380,
  beta: 1.18,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  baseEps: 9.48,        // FY26E (Sep 2026) adj. EPS consensus; guide raised again at Q3 to $9.30–9.50. FY27E $10.76 (+13.5%). Prior: $9.30.
  rsRating: 67,         // IBD RS per user, 10/11/2026 (was 80)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q3 FY26 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales ~$1.1B (+21%; aerospace +19%, industrial +26%), adj. EPS $2.52
  // (+43%). YTD sales $3.2B (+24%), adj. EPS $6.96 (+45%). FY26 adj. EPS
  // guide RAISED to $9.30-9.50; sales growth held at +20-23%; industrial
  // margin ~19%; FCF $300-350M and capex ~$290M unchanged; ~$700M to be
  // returned to holders. Street: Buy (13), PT $380-502 (median $421.50);
  // FY26E rev $4.34B / EPS $9.48, FY27E $4.71B / $10.76. Stock $335.51 (~35×
  // FY26E, ~31× FY27E). Q4 FY26 reports mid-November.
  // ─────────────────────────────────────────────────────────────────────────


  // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
  // revGrowth and fcfMargin are kept for display/yield calculations.
  epsCagr: [7, 13, 20],
  exitPE: [22, 30, 40],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Buy', targetLow: 380, targetMedian: 421.5, targetHigh: 502, numAnalysts: 13 },  // stockanalysis.com (Oct 2026)
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
      'Multiple compresses from ~35x to 22x as market re-rates from compounder to cyclical. 5yr target {target} ({cagr} annualized).',
    'FY2026 delivers ~$9.48 adj. EPS (raised guide), Commercial Services and data center power gen sustain growth into FY2027. ' +
      'LEAP/GTF MRO partnerships (LHT, Air France KLM, AAR) ramp and expand the service franchise. Earnings compound at 13% annually. ' +
      'Multiple settles to 30x as FCF conversion improves from inventory normalization. 5yr target {target} ({cagr} annualized).',
    'Data center power gen demand triggers a Woodward capacity expansion that extends the industrial growth cycle. ' +
      'Aerospace supercycle continues — LEAP/GTF aftermarket crossover drives margin-rich services mix. ' +
      'New single-aisle content wins at Airbus/Boeing add a decade-long growth vector. Earnings compound at 20%; market sustains 40x. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0.005, 0.02, 0.03],
  bullMaOptVal: 370.25 * 61.5 * 0.07,
  driverOverrides: [
    {},
    {},
    { fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02] },
  ],

  debtSafety: {
    netDebt: 909,          // Jun 2026 (stockanalysis): ~$1.38B debt − ~$0.47B cash
    ebitda: 803,           // TTM EBITDA
    fy: 'TTM Q3 FY26',
    note: 'GREEN (~1.1×). Debt rose with buybacks and the VRM acquisition but remains modest against fast-growing EBITDA.',
  },
});
