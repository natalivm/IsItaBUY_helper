import { defineStock } from './defineStock';

export const KRMN = defineStock({
  ticker: 'KRMN',
  name: 'Karman Holdings Inc.',
  sector: 'Aerospace, Defense, Hypersonics & Space Systems',
  themeColor: '#0d9488',
  currentPrice: 57.50,
  updatedOn: '05/31',
  lastReportTag: 'FY2025',
  fairPriceRange: '$42 - $155',
  shares0: 132.5,
  rev25: 471.5,
  fcfMargin25: 0.08,
  taxRate: 0.21,
  cash: 180,
  debt: 400,
  beta: 1.27,
  costDebt: 0.060,
  rsRating: 88,
  rsTrend: 'falling',
  ratingOverride: 'BUY',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Karman is a real-revenue, real-contract defense growth company that got caught in a classic post-IPO momentum unwind. " +
    "The stock ran from ~$30 IPO to $110+ on defense-drone and hypersonics enthusiasm, then fell to the high $50s — not because the business broke, but because investors stopped paying 80–100× forward earnings for it. " +
    "At $57.50, the setup is materially more interesting: FY2025 revenue of $471.5M grew +51% YoY, management raised FY2026 guidance to $720–735M (+53% at midpoint), and Karman sits at the intersection of three structurally-funded defense themes: hypersonic propulsion, missile systems, and space launch infrastructure. " +
    "The 'priced for perfection' dynamic explains the selloff: a slight EPS miss alongside a beat-and-raise quarter was enough to trigger a sharp re-rating when expectations were sky-high. An upsized secondary offering added to the pressure — investors interpreted it as insiders monetizing, not a sign of fundamental weakness. " +
    "WACC is a manageable 11.2% (beta 1.27) — far more DCF-friendly than speculative defense names. Base case projects $92 at 16× exit; even the bear case ($42) reflects a decelerated-but-profitable scenario. Bull case ($32 is the bear; $155 is the bull) requires sustained 20–50% growth with FCF margins expanding to 22% — consistent with a scaled defense systems integrator. " +
    "Key risks: concentration in a small number of large defense programs, continued dilution risk (no buybacks, moderate SBC), and dependency on DoD budget cycle. Debt at ~$400M (net leverage ~1.3×) is manageable given normalized EBITDA well above $150M. " +
    "Rating: BUY. The selloff created a buying opportunity in one of the most compelling new defense growth platforms. Model would say STRONG BUY at 60% base upside; we temper to BUY reflecting IPO-stock uncertainty, still-elevated multiples, and execution risk in a complex defense manufacturing backlog. Add in tranches — do not chase a gap-up.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 80, targetMedian: 103, targetHigh: 125, numAnalysts: 9 },

  revGrowth: [
    [0.15, 0.12, 0.10, 0.08, 0.07],
    [0.35, 0.25, 0.20, 0.15, 0.12],
    [0.50, 0.40, 0.30, 0.25, 0.20],
  ],
  fcfMargin: [
    [0.08, 0.09, 0.10, 0.10, 0.10],
    [0.10, 0.12, 0.14, 0.15, 0.16],
    [0.12, 0.15, 0.18, 0.20, 0.22],
  ],
  exitMultiple: [10, 16, 22],
  desc: [
    'Defense budget pressure and program delays slow growth to 7–15% per year. FCF margins stabilize near 10%. Re-rating toward normal defense multiples; bear target $42.',
    'Hypersonics and missile production ramp as contracted. Revenue grows 35% in FY26 to ~$637M, decelerating to 12% by FY30. FCF margins expand from 10% to 16% as scale offsets fixed overhead. Base target $92.',
    'Karman becomes a Tier-1 defense systems supplier. Hypersonic prime contracts land, launch platform volume accelerates. Revenue 50% in FY26, sustained growth through FY30 with FCF margins reaching 22%. Bull target $155.',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 30,
    gaapNi: 95,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 27,
    overstatementSource: 'estimated',
    note: 'New IPO with short MTM history; SBC ~6% of revenue vs. $90M+ normalized GAAP NI — manageable dilution, OK tier.',
  },

  debtSafety: {
    netDebt: 220,
    ebitda: 175,
    fy: 'FY25',
    note: 'Net leverage ~1.3× EBITDA; elevated from IPO/acquisition activity but well within manageable range for a defense manufacturer.',
  },
});
