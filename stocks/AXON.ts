import { defineStock } from './defineStock';

export const AXON = defineStock({
  ticker: 'AXON',
  name: 'Axon Enterprise',
  sector: 'Public Safety Tech / Government Platform',
  themeColor: '#FFC72C',
  currentPrice: 424.77,
  fairPriceRange: '$440 - $830',  // stockanalysis.com analyst target range (Sep 29 2026)
  shares0: 81.24,        // stockanalysis (Oct 2026)
  rev25: 3700,           // FY2026E base year: guide raised to +32-34% on $2.78B FY25 (consensus $3.70B); revGrowth[0] = FY27 (consensus $4.79B, +29%)
  fcfMargin25: 0.122,    // FCF guide ~$450M / ~$3.7B revenue
  taxRate: 0.18,
  cash: 693,             // stockanalysis (Jun 2026)
  debt: 1850,            // convertible notes
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 7.65,         // FY2026E adj. EPS consensus (Sep 29 2026; range $6.32-8.80; FY27E $10.54 +38%). Prior: $7.00.
  rsRating: 45,          // IBD RS per user, 10/11/2026 (was 13)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // RS collapsed to 13 (from 92), now recovering (45, Oct 2026) but not yet strong; the stock is down ~42% in a year. Model STRONG BUY (~17% base CAGR) rests on 25% EPS compounding for a Burry-Tragic SBC name (~16% of rev, thin GAAP NI) at ~55× FY26E with no margin for error; HOLD until momentum confirms (RS 70+). (Street median +65%.)
  updatedOn: '10/26',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $904M (+35%; software & services $398M +36%, devices $507M
  // +35%), ARR $1.6B (+39%), NRR 126%. GAAP op income $47M / NI $29M
  // (down y/y). FY26 revenue growth guide RAISED to +32-34%; adj. EBITDA
  // margin ~25.5% and FCF ~$450M held; component-cost margin pressure
  // flagged. Street: Buy (21), PT $440-830 (median $700); FY26E rev $3.70B
  // / EPS $7.65, FY27E $4.79B / $10.54. Stock $422.89 (~55× FY26E, ~40×
  // FY27E), down ~42% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────



  analystConsensus: { rating: 'Buy', targetLow: 440, targetMedian: 700, targetHigh: 830, numAnalysts: 21 },  // stockanalysis.com (Sep 29 2026)

  revGrowth: [
    [0.18, 0.14, 0.11, 0.09, 0.08], // Bear: FY27 deceleration as AI tools commoditize, gov budget pressure
    [0.27, 0.21, 0.17, 0.14, 0.12], // Base: FY27 slight haircut vs +29% consensus, then natural deceleration
    [0.30, 0.26, 0.22, 0.18, 0.15], // Bull: international + software + defense (Dedrone) all accelerate
  ],

  fcfMargin: [
    [0.12, 0.14, 0.16, 0.18, 0.20],   // Bear: modest improvement from FY26 12.5% base, SBC drag persists
    [0.14, 0.18, 0.22, 0.25, 0.27],   // Base: software mix drives operating leverage, FCF inflects
    [0.17, 0.22, 0.27, 0.31, 0.34],   // Bull: full SaaS-like economics emerge by FY29-30
  ],

  exitMultiple: [22, 35, 50],

  desc: [
    'Government budgets tighten, international expansion hits regulatory friction in Europe, and Microsoft and Google AI tools chip away at Draft One and Assistant. The $14.3B backlog converts to revenue slower than hoped, and Axon keeps paying up in stock to retain AI talent — SBC stays stubborn at 15–17% of revenue and the <2.5% dilution target slips. FCF improves but never makes the leap investors expected. The market loses patience with a mid-50s multiple and re-rates Axon as a normal govtech vendor at 25×. EPS compounds at 12% from the FY26E $7.65. 5yr target {target} ({cagr} annualized).',
    'H1 2026 sets the template (Q2 revenue +35%, ARR +39%) and Axon executes against it. ~30% growth holds through FY27 and naturally decelerates to mid-teens by FY30 as the base gets bigger. International sustains above 25% of revenue. Dedrone and enterprise wins keep opening new adjacencies beyond law enforcement. Management hits the <2.5% dilution target — for the first time, buybacks actually absorb SBC. FCF margin walks from 12.5% to 25%+ by FY29. The market normalizes the multiple from ~55× to 40× as Axon graduates from "premium growth" to "premium compounder." EPS compounds ~25%. 5yr target {target} ({cagr} annualized).',
    'The $14.3B backlog turns out to be the engine, and the AI Era Plan upgrades (+140% bookings) prove customers will pay up for new modules without being pushed. International reaches 35% of revenue. Dedrone\'s 500% bookings growth becomes a real defense business. AI product revenue keeps compounding — Vision, Guardian, Assistant become the operating system for modern policing and corrections, and switching costs harden. SBC ratio drops below 12% as revenue outruns it and buybacks scale aggressively. FCF margin reaches 34% by FY30. The market refuses to compress the multiple — Axon isn\'t "govtech" anymore, it\'s critical AI infrastructure. EPS compounds ~35%. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Government budgets tighten and AI commoditization risk rises — Draft One, BriefOne, Assistant all face Microsoft/Google competition. SBC <2.5% dilution target gets missed. ' +
      'International regulatory friction (EU data privacy, local procurement rules) slows the 100%+ growth rate. ' +
      'The backlog ($14.3B) is real but slow-converting — recognition lags booking velocity. At 56× forward P/E, any growth scare triggers severe multiple compression.',
    'Q1 2026 delivered 9 consecutive 30%+ growth quarters with FCF finally inflecting ($450M guide = 12.5% margin vs. 7% FY25). NRR 125% + ARR $1.5B confirm the moat. ' +
      'International +100%+ and Dedrone +500% bookings open structural new TAMs. AI Era Plan bookings +140% — existing customers upgrading voluntarily. ' +
      '<2.5% dilution target is achievable: implies $600M+ buybacks against $600M SBC, which Q1 FCF trajectory supports. Platform is de-risked from the "pure SBC story" narrative.',
    'The $14.3B future contracted bookings (+44% YoY) is a multi-year revenue lock-in unlike anything in govtech. International + defense (Dedrone) + enterprise double the addressable market. ' +
      'AI product revenue +700% YoY proves the monetization cycle is early, not late. Axon Vision, Guardian, Assistant are platform extensions that increase switching costs further. ' +
      'FCF structurally inflecting from ~7% to 12.5% in one year — the operating leverage skeptics doubted is materializing. If margins reach 25%+ by FY29, SBC ratio becomes manageable.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.003, 0.008, 0.015],
  ebitdaProxy: [0.10, 0.20, 0.30],
  bullMaOptVal: false,

  epsCagr: [12, 25, 35],
  exitPE: [25, 40, 55],
  prob: [20, 45, 35],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.01, 0.01, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
    {
      revPrem: [0.025, 0.025, 0.02, 0.015, 0.015],
      fcfUplift: [0.015, 0.02, 0.025, 0.03, 0.03],
    },
  ],

  debtSafety: {
    netDebt: 1160,         // Jun 2026 (stockanalysis): ~$1.85B convertible debt − ~$0.69B cash
    ebitda: 940,           // FY26E adj. EBITDA (~25.5% × ~$3.7B); GAAP TTM EBITDA only ~$165M (SBC-heavy)
    fy: 'FY26E',
    note: 'GREEN on adj. EBITDA (~1.2×). Debt is low-coupon convertible notes; on GAAP EBITDA (SBC-burdened) leverage would look far higher.',
  },

  burry: {
    sbc: 605,
    gaapNi: 150,
    buyback: 450,
    epsBasis: 'NON_GAAP',
    fy: 'FY26 est',
    overstatementPct: 85,
    overstatementSource: 'estimated',
    note: 'Tragic — Burry explicitly cites AXON. FY26 estimates: SBC $590-620M guide (mid $605M) = ~16% of revenue. GAAP NI ~$150M → naive SBC/NI = 403%, caps at 100% even before MTM amplifier — math supports moving to 100% but 85% pin retained since Burry published it (tier unchanged). Key improvement: FCF guide $450M vs LTM $19.5M — SBC-to-FCF ratio drops from 3,222% to ~135%. Management targets <2.5% dilution (was +4.5%/yr FY25), implying buybacks scale to cover SBC. Still structurally Tragic, but the trajectory is clearly better.',
  },
});
