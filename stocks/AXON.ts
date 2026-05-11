import { defineStock } from './defineStock';

export const AXON = defineStock({
  ticker: 'AXON',
  name: 'Axon Enterprise',
  sector: 'Public Safety Tech / Government Platform',
  themeColor: '#FFC72C',
  currentPrice: 394.36,
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
  updatedOn: '05/11',
  lastReportTag: 'Q1 2026',

  strategicNarrative:
    "Q1 2026: revenue $807M (+34% YoY), the 9th consecutive quarter of 30%+ growth. Software & services $355M (+35%), AI product revenue +700% YoY. ARR $1.5B (+35%), NRR 125%. Future contracted bookings $14.3B (+44% YoY) — the most important forward indicator in the model. " +
    "International is the breakout: +100%+ YoY, now 20% of revenue. Dedrone revenue +300%+ YoY, bookings +500% — counter-drone adds a defense vertical. AI Era Plan bookings +140% YoY. $40M telco enterprise deal (Fusus + Body Mini + Outpost) shows expansion beyond law enforcement. " +
    "FY2026 guidance RAISED to 30-32% growth (~$3.6B), adj EBITDA margin 25.5%, FCF ~$450M (12.5% of revenue vs. FY25's ~7%) — structural FCF inflection happening now. New product velocity is high: Axon Vision, Guardian, Assistant (1M+ monthly uses), Form One, BriefOne. " +
    "SBC remains the core challenge: FY2026 guide $590-620M (~16% of revenue). But management now targets <2.5% annual dilution — implying buybacks will be scaled up to cover. This is an improvement from FY25's +4.5%/yr net dilution; execution will be the test. " +
    "At ~$394 / ~56x FY2026 non-GAAP EPS (~$7.00), premium is still demanding. But with $14.3B backlog (+44%), 125% NRR, and FCF finally inflecting, the quality trajectory is clearer than it was a year ago. " +
    "HOLD — best government-tech moat in the market combined with worst cash-flow-quality in our coverage. The framework flags this as Tragic on strict Burry accounting. The bet: operating leverage + buyback discipline compress SBC dilution, eventually vindicating the premium.",

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
    'The $14.3B backlog proves hollow — government budget cycles tighten and international expansion stumbles on regulatory friction. AI Era Plan upgrades slow. ' +
      'SBC stays at 15-17% of revenue as Axon competes for AI talent; management misses the <2.5% dilution target. FCF margin inches up from 12.5% but never reaches the inflection investors expected. ' +
      'Multiple compresses from 56× to 25× as AI tools face credible competition. EPS CAGR ~12% from $7.00 base; 5yr target ~$500, roughly flat annualized.',
    'Q1 2026 set the template: 34% revenue growth, adj EBITDA at 25%, FCF finally inflecting to $450M+ guidance. ARR $1.5B at 125% NRR compounds the installed base. ' +
      'International sustains above 25% annual contribution through FY28. Dedrone + enterprise deals (telco, $40M+) open non-law-enforcement TAM. ' +
      'Management hits <2.5% dilution target; SBC ratio compresses to ~12% by FY28. FCF margin reaches 25%+ by FY29. Multiple normalizes from 56× to 40×. ' +
      'EPS CAGR ~25% from $7.00 base; 5yr target ~$700-750, ~12-13% annualized.',
    'The $14.3B backlog (+44% YoY) and 125% NRR are the compounding engine — every department that runs evidence + records + AI tools adds modules and never leaves. ' +
      'International reaches 35%+ of revenue by FY29 (Dedrone bookings +500% signals defense vertical is real). AI product revenue +700% YoY inflects into core platform economics. ' +
      'SBC ratio compresses below 12%, buybacks ramp. FCF margin scales to 34%. Multiple holds at 55×+ as market prices a structural AI-policing platform. ' +
      'EPS CAGR ~35% from $7.00 base; 5yr target $950-1,100, ~18-22% annualized.',
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
    note: 'Tragic — Burry explicitly cites AXON. FY26 estimates: SBC $590-620M guide (mid $605M) = ~16% of revenue. Management now targets <2.5% dilution implying buybacks ~$600M+ — a structural improvement from FY25 57% SBC coverage. GAAP NI estimate ~$150M (down from FY25 $206M as SBC stays high). FCF inflecting: $450M FY26 guide vs $19.5M LTM — the core SBC-to-FCF ratio improves dramatically. Still Tragic tier, but trajectory is better. baseEps $7.00 is non-GAAP; P/E haircut still material.',
  },
});
