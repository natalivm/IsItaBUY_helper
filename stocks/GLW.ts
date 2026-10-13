import { defineStock } from './defineStock';

export const GLW = defineStock({
  ticker: 'GLW',
  name: 'Corning Inc',
  sector: 'Optical Fiber · Specialty Glass',
  themeColor: '#005daa',
  updatedOn: '10/13',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-12',
  currentPrice: 148.54,
  fairPriceRange: '$129 - $238',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 875,        // Q2 2026 diluted shares
  rev25: 16410,        // FY2025 core sales $16.41B (GAAP $15.63B); FY26E consensus $19.31B (+18%), FY27E $23.10B (+20%)
  fcfMargin25: 0.105,  // FY25 adjusted FCF $1.72B on core sales
  taxRate: 0.20,
  cash: 2504,          // Jun 30 2026
  debt: 8424,          // Jun 30 2026: $0.67B current + $7.76B long-term
  beta: 1.18,
  costDebt: 0.045,
  // EPS_PE: Springboard capex cycle compresses FCF, GAAP EPS is distorted by
  // non-cash MTM on translated-earnings hedges, and the plan is framed in core EPS.
  modelType: 'EPS_PE',
  baseEps: 3.29,       // FY2026E core EPS — stockanalysis consensus (Oct 9 2026; FY27E $4.37, +33%). H1 core EPS ~$1.48 (Q2 $0.78, +30%); Q3 guide $0.85-0.89. FY25 core EPS $2.52.
  rsRating: 78,        // IBD RS per user, 10/12/2026
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 28, 2026) — initial coverage
  // ─────────────────────────────────────────────────────────────────────────
  // Core sales $4.74B (+17%), core EPS $0.78 (+30%) vs $0.75 est. GAAP sales
  // $4.51B, GAAP EPS $0.64. Optical Communications $2.07B (+32%; Enterprise
  // Networks +65% on AI data-center fiber), Glass Innovations $1.46B (+1%),
  // Automotive $471M (+2%), Solar $438M (+90%), Life Sciences $294M (−15%).
  // Q2 adj. FCF $1.42B (H1 $1.61B); capex $422M; no buybacks in H1.
  // Q3 GUIDE: core sales $4.9-5.0B (+16%), core EPS $0.85-0.89 (+28%) —
  // only in line with the Street, stock fell ~20% on the print. Springboard
  // upgraded: $20B annualized sales run rate by end-2026, $30B by end-2028,
  // $40B by end-2030 (~19% CAGR). Stock ran from ~$77 to ~$272 over the past
  // year before a sharp AI-trade pullback. Street: Buy (18), PT $129-238
  // (median $182); FY26E EPS $3.29 / rev $19.31B, FY27E $4.37 / $23.10B.
  // ~44× FY26E / ~34× FY27E at $146. Next report Oct 27 2026 (BMO).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Dominant optical fiber and connectivity supplier riding the AI data-center buildout inside and between server racks.',
    'Springboard plan targets doubling sales again by decade-end with operating leverage driving faster earnings growth.',
    'Hyperscaler supply agreements and US-made fiber capacity give unusual multi-year demand visibility.',
    'Solar wafer and polysilicon business is scaling quickly on domestic-content demand, adding a second growth engine.',
    'Century-long materials science moat in specialty glass that competitors struggle to replicate at scale.',
  ],

  risksToBuy: [
    'Valuation has re-rated from a cyclical glass multiple to an AI-growth multiple, leaving little room for disappointment.',
    'Recent guidance merely in line with the Street triggered a severe sell-off, showing how crowded the trade is.',
    'Display, automotive, and life sciences remain flat or shrinking, so growth leans heavily on optical and solar.',
    'Heavy capacity investment raises the risk of overbuilt fiber supply if hyperscaler capex slows.',
    'GAAP earnings sit well below core results due to hedge and currency adjustments, muddying earnings quality.',
  ],

  epsCagr: [8, 20, 26],
  exitPE: [16, 25, 32],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 129, targetMedian: 182, targetHigh: 238, numAnalysts: 18 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.16, 0.05, 0.04, 0.03, 0.03],   // Bear: FY26 ~locked (H1 + Q3 guide); AI fiber digestion from 2027
    [0.18, 0.19, 0.15, 0.13, 0.11],   // Base: FY26/FY27 ≈ consensus $19.3B / $23.1B, then decelerates below Springboard
    [0.19, 0.23, 0.21, 0.19, 0.17],   // Bull: Springboard $40B run rate by end-2030 achieved
  ],
  fcfMargin: [
    [0.09, 0.09, 0.09, 0.10, 0.10],
    [0.11, 0.12, 0.13, 0.13, 0.14],
    [0.12, 0.14, 0.15, 0.16, 0.17],
  ],
  exitMultiple: [10, 15, 20],
  desc: [
    'Hyperscaler fiber orders digest in 2027 after the capacity build; Optical growth stalls while Glass Innovations, Automotive, and Life Sciences stay flat. ' +
      'Springboard targets slip and the market reprices Corning back toward its historical cyclical multiple. ' +
      'Core EPS compounds only ~8% from the $3.29 FY26E base at a 16× exit. 5yr target {target} ({cagr} annualized).',
    'AI data-center fiber demand stays strong through 2027 (FY27 ≈ consensus $23.1B sales / $4.37 EPS), then growth decelerates to low-teens as builds mature. ' +
      'Operating leverage and solar scale-up keep core EPS compounding at ~20%, but the multiple compresses from ~44× FY26E to 25×. 5yr target {target} ({cagr} annualized).',
    'Springboard is delivered in full — a $40B sales run rate by end-2030 with expanding operating margins as fiber, solar, and co-packaged optics glass scale together. ' +
      'Core EPS compounds at ~26% and the market keeps a 32× premium-growth multiple. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.002, 0.005, 0.01],
  ebitdaProxy: [0.24, 0.28, 0.31],
  bullMaOptVal: false,

  burry: {
    sbc: 286,              // FY25 share-based compensation (10-K)
    gaapNi: 1590,          // FY25 GAAP EPS $1.83 × ~870M diluted shares (approx.)
    buyback: 163,          // FY25 treasury purchases; none in H1 2026
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 70,
    overstatementSource: 'estimated',
    note: 'Naive SBC/GAAP NI ~18% × 4.0 MTM amplifier (~5× 3-yr stock return); buyback below SBC, no offset. GAAP NI is depressed by non-cash hedge MTM — on core NI the estimate would be ~50% (Critical).',
  },

  debtSafety: {
    netDebt: 5920,         // Jun 30 2026: $8.42B debt − $2.50B cash
    ebitda: 5400,          // FY26E approx.: core op income ~$3.9B + D&A ~$1.5B
    fy: 'FY26E',
    note: 'Net debt ~1.1× FY26E EBITDA (GREEN). Leverage is modest; the larger drag is Springboard capex, though FCF is rising with core sales.',
  },
});
