import { defineStock } from './defineStock';

export const AXON = defineStock({
  ticker: 'AXON',
  name: 'Axon Enterprise',
  sector: 'Public Safety Tech / Government Platform',
  themeColor: '#FFC72C',
  currentPrice: 393.66,
  fairPriceRange: '$420 - $900',
  shares0: 85,
  rev25: 3600,           // FY2026 estimate: $2.78B FY25 × guided 30-32% growth
  fcfMargin25: 0.125,    // FCF guide ~$450M / ~$3.6B revenue
  taxRate: 0.18,
  cash: 1300,
  debt: 700,
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 7.00,         // FY2026 estimate: 25.5% adj EBITDA on $3.6B → ~$600M NI / 85M shares
  rsRating: 92,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/12',
  lastReportTag: 'Q1 2026',

  strategicNarrative:
    "Q1 2026 was the kind of quarter that resets the conversation. Revenue grew 34% — the ninth straight quarter above 30% — and software is now driving the bus. AI product revenue jumped 700% year-over-year. International doubled and already accounts for 20% of the business. Dedrone bookings exploded 500%, quietly opening a defense vertical nobody had in their model. A $40M telco deal (Fusus + Body Mini + Outpost) is the first serious crack outside law enforcement.\n\n" +
    "The signal that matters most: future contracted bookings hit $14.3B, up 44% YoY. That's not pipeline — it's signed, multi-year revenue waiting to be recognized. ARR is $1.5B at 125% net retention. Every department that adopts Axon's evidence + records + AI stack adds modules and never leaves. This is a moat compounding in real time.\n\n" +
    "Management raised FY26 guidance to 30–32% growth with FCF inflecting to ~$450M — 12.5% of revenue versus FY25's ~7%. After years of skeptics arguing the cash flow would never show up, it's showing up. The catch, and it's a big one, is SBC: guided at $590–620M, or roughly 16% of revenue. Burry called Axon out by name. Management's new commitment to <2.5% annual dilution means buybacks finally have to absorb SBC instead of letting share count drift higher. That's the bet.\n\n" +
    "The verdict: this is the best government-tech moat in our coverage paired with one of the worst cash-flow-quality profiles. At ~56× FY26 non-GAAP EPS, the premium prices in execution that hasn't fully happened yet. We HOLD until SBC dilution actually compresses — but the trajectory is finally pointing the right way.",

  analystConsensus: { rating: 'Buy', targetLow: 450, targetMedian: 770, targetHigh: 1000, numAnalysts: 18 },

  revGrowth: [
    [0.18, 0.14, 0.11, 0.09, 0.08], // Bear: FY27 deceleration as AI tools commoditize, gov budget pressure
    [0.25, 0.21, 0.17, 0.14, 0.12], // Base: platform + international compound from FY26 base
    [0.30, 0.26, 0.22, 0.18, 0.15], // Bull: international + software + defense (Dedrone) all accelerate
  ],

  fcfMargin: [
    [0.12, 0.14, 0.16, 0.18, 0.20],   // Bear: modest improvement from FY26 12.5% base, SBC drag persists
    [0.14, 0.18, 0.22, 0.25, 0.27],   // Base: software mix drives operating leverage, FCF inflects
    [0.17, 0.22, 0.27, 0.31, 0.34],   // Bull: full SaaS-like economics emerge by FY29-30
  ],

  exitMultiple: [22, 35, 50],

  desc: [
    'Government budgets tighten, international expansion hits regulatory friction in Europe, and Microsoft and Google AI tools chip away at Draft One and Assistant. The $14.3B backlog converts to revenue slower than hoped, and Axon keeps paying up in stock to retain AI talent — SBC stays stubborn at 15–17% of revenue and the <2.5% dilution target slips. FCF improves but never makes the leap investors expected. The market loses patience with a 56× multiple and re-rates Axon as a normal govtech vendor at 25×. EPS compounds at 12% and the stock trades roughly flat over five years.',
    'Q1 2026 sets the template and Axon executes against it. 30%+ growth holds through FY27 and naturally decelerates to mid-teens by FY30 as the base gets bigger. International sustains above 25% of revenue. Dedrone and enterprise wins keep opening new adjacencies beyond law enforcement. Management hits the <2.5% dilution target — for the first time, buybacks actually absorb SBC. FCF margin walks from 12.5% to 25%+ by FY29. The market normalizes the multiple from 56× to 40× as Axon graduates from "premium growth" to "premium compounder." EPS compounds ~25%; the stock returns 12–13% annualized — solid, but short of the heroic case.',
    'The $14.3B backlog turns out to be the engine, and the AI Era Plan upgrades (+140% bookings) prove customers will pay up for new modules without being pushed. International reaches 35% of revenue. Dedrone\'s 500% bookings growth becomes a real defense business. AI product revenue keeps compounding — Vision, Guardian, Assistant become the operating system for modern policing and corrections, and switching costs harden. SBC ratio drops below 12% as revenue outruns it and buybacks scale aggressively. FCF margin reaches 34% by FY30. The market refuses to compress the multiple — Axon isn\'t "govtech" anymore, it\'s critical AI infrastructure. EPS compounds ~35%; the stock returns 18–22% annualized.',
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
