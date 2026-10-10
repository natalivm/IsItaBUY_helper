import { defineStock } from './defineStock';

export const MELI = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  // Q2 2026 UPDATE (Aug 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Growth ever faster, profit still going backwards. Net revenue $10.17B
  // (+50% YoY, +43% FXN); GMV $21.9B (+44%), TPV $101B (+56%), items sold
  // 795M (+45%), unique buyers 89M (+26%), fintech MAUs 88M (+30%). But gross
  // profit only +34% — gross margin fell 2.8pts QoQ on Brazil PIX/take-rate
  // discounts, higher shipping costs and Mexico acquiring/POS-device costs.
  // Op income $683M (-17% YoY, 6.7% margin); NI $466M (-11%, 3rd straight y/y
  // decline); EPS $9.19 vs $10.31. Adj. EBITDA $975M (vs $1,024M). Credit
  // book >$16B (+75%); NIMAL 20.7% (vs 23.0%), credit-card NIMAL -2.5%;
  // provisions $1.28B (vs $690M); 15-90d NPL 7.0% (cards 4.6%). Adj. FCF
  // $214M in Q2 ($158M H1 vs $512M). Net debt $6.4B (from $4.7B at YE25).
  // By country: Brazil FXN rev +42% with margin up QoQ on credit recovery;
  // Mexico margin -4pts QoQ on acquiring investment; Argentina slowing on
  // soft consumption. Mgmt explicitly prioritises "long-term value creation
  // over short-term profitability"; no margin guidance. Street: Benchmark
  // trimmed PT, Jefferies downgraded to Hold; consensus FY26 EPS cut to
  // ~$38.4. Stock ~flat ($1,888 pre-print → $1,890 now). Net: top-line thesis
  // intact and accelerating; the earnings recovery is pushed into 2027 and
  // depends on credit-card cohorts maturing and Brazil discounts paying off.
  // ─────────────────────────────────────────────────────────────────────────
  ticker: 'MELI',
  name: 'MercadoLibre',
  sector: 'E-Commerce / Fintech',
  themeColor: '#f59e0b',
  currentPrice: 1889.85,
  fairPriceRange: '$1,750 - $2,800',  // stockanalysis.com analyst target range, Oct 6 2026
  shares0: 50.7,       // 50.70M shares outstanding at Jun 30, 2026
  rev25: 28900,
  fcfMargin25: 0.085,
  taxRate: 0.20,
  cash: 6751,          // Q2 2026 available cash, investments & digital assets
  debt: 13176,         // Q2 2026 total debt incl. leases — mostly fintech credit funding (operational, not corporate leverage; EPS_PE model ignores it)
  beta: 1.35,
  costDebt: 0.065,
  modelType: 'EPS_PE',
  baseEps: 38.41,      // FY2026E EPS — stockanalysis.com consensus (Oct 6 2026, range $34.11-45.36), cut from $41.42 after Q2 2026's 3rd straight y/y NI decline (H1 EPS $17.42 vs $20.05). FY27E consensus $56.16 (+46% recovery). Prior: cut from ~$48 to ~$41 after Q1 2026's NIMAL compression + Brazil provisions. Q1 2026 (reported May 7): rev $8.85B +49% YoY, EPS $8.23 (down YoY), TPV $87.2B +50%. Q2 2026 (Aug 5): rev $10.17B +50% (+43% FXN), EPS $9.19 (beat ~$8.7-9.0, but -11% YoY), op margin 6.7%.
  rsRating: 20,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Dominant LATAM e-commerce and fintech infrastructure with deep network effects across payments, lending, and logistics',
    'Top-line growth accelerating to around fifty percent year-over-year while building out a credit card cohort with maturing loss curves',
    'Vast underpenetrated market — LATAM digital commerce and financial inclusion remain in early innings of multi-decade adoption',
    'Fintech flywheel (Mercado Pago) increasingly cross-sells lending, insurance, and savings across the existing commerce base',
    'Elite cash conversion and minimal share dilution despite the investment cycle separates MELI from most EM growth peers',
  ],

  risksToBuy: [
    'Net income has fallen year-over-year for three straight quarters as heavy margin investment depresses earnings',
    'Rapidly expanding credit portfolio raises provisions and increases sensitivity to a Brazil macroeconomic shock',
    'Intensifying competition from local and global players in Brazilian e-commerce and digital payments',
    'Extended margin-investment period could suppress EPS for additional quarters, testing investor patience',
    'Currency and political risks across Brazil, Mexico, and Argentina are embedded in every financial line',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 1750, targetMedian: 2275, targetHigh: 2800, numAnalysts: 26 },  // stockanalysis.com, Oct 6 2026
  revGrowth: [
    [0.38, 0.20, 0.16, 0.14, 0.12],  // FY26 ~locked by H1 +50%; then sharp deceleration
    [0.43, 0.28, 0.26, 0.24, 0.22],  // FY26/FY27 ≈ consensus $41.8B / $54.0B (incl. revPrem)
    [0.46, 0.33, 0.30, 0.28, 0.26],
  ],
  fcfMargin: [
    [0.06, 0.065, 0.07, 0.075, 0.08],
    [0.075, 0.085, 0.095, 0.10, 0.11],
    [0.09, 0.10, 0.12, 0.13, 0.14],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'Deceleration + multiple compression. Revenue growth halves, P/E re-rates to 30x on extended margin investment period.',
    'Execution holds, margin delay. Revenue growth follows TIKR consensus curve, credit card cohort maturation begins showing in 2027.',
    'Margin inflection + re-rating. Fintech and logistics flywheel accelerates, cost/shipment efficiencies compound, P/E expands on earnings beats.',
  ],
  thesis: [
    'Extended investment mode depresses EPS for 4-8 more quarters while competition intensifies in Brazil. Market loses patience.',
    'Management executes on the reinvestment playbook. Margins recover gradually as credit card cohorts mature and shipping costs decline.',
    'LATAM e-commerce penetration accelerates, fintech dominance deepens, and operating leverage inflects — driving both earnings beats and multiple expansion.',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  waccAdj: [0.015, 0, -0.01],

  epsCagr: [14, 20, 27],  // Kept at Q2 2026 review: base 20% from the lower $38.41 FY26 base is below the +46% FY27 consensus rebound, leaving room for slower out-years. Base trimmed 22→20 on 06/26 to reflect near-term margin drag (FY26 ~flat on the Q1 reset; growth back-loaded). NI still forecast +24% next year.
  exitPE: [30, 38, 45],
  prob: [30, 45, 25],

  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.12, 0.18, 0.25],
  bullMaOptVal: 2035 * 50.4 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.015, 0.015, 0.02],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.015],
    },
    {
      revPrem: [0.02, 0.025, 0.03, 0.03, 0.03],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.03],
    },
  ],

  debtSafety: {
    netDebt: 6425,         // company-reported net debt, Q2 2026 (incl. fintech credit funding)
    ebitda: 4000,          // LTM adjusted EBITDA ≈ $4.0B (Q2 2026 $975M) — approximate
    fy: 'LTM Q2 2026',
    note: 'Most of the debt funds the >$16B credit book (operational, like a lender), so net debt/EBITDA overstates corporate leverage. Even on the gross view it sits ~1.6× — inside GREEN.',
  },

  burry: {
    sbc: 303,
    gaapNi: 1997,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 20,
    overstatementSource: 'estimated',
    note: 'Ok (major downgrade from original Tragic 50% after TIKR refresh). FY25 TIKR actuals: SBC just $303M (2.6× lower than my $793M estimate — apparently I had used a wrong figure), revenue $28.89B = SBC just **1.0% of revenue** (one of the lowest ratios across our entire 70-stock coverage, alongside AMZN 2.7%). SBC = 2.5% of operating cash flow, 2.8% of FCF — elite cash quality. GAAP NI $2.0B FY25 (confirmed). No buyback program (capital reinvested in fintech + logistics expansion), but share count nearly flat: 49.80M (FY21) → 50.70M (LTM) = just +1.8% over 5 years (+0.4%/yr). Formula at 2.33× MTM gives 20% overstatement — clean match. MELI is genuinely a reformed-cohort name (like META/SHOP/NOW/APP) operating in a high-growth EM commerce + fintech market with elite cash conversion (37% FCF margin, $10.8B annual FCF).',
  },
});
