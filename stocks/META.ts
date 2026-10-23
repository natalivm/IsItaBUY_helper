import { defineStock } from './defineStock';

export const META = defineStock({
  ticker: 'META',
  name: 'Meta Platforms',
  sector: 'Social Media / Digital Advertising / AI',
  themeColor: '#1877F2',
  currentPrice: 642.62,
  fairPriceRange: '$580 - $1,050',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 2550,
  rev25: 254120,         // FY2026E consensus $254.1B (+26%; Q1 $56.3B + Q2 $60.8B + Q3 guide $61-64B); FY27E $306.5B (+21%)
  fcfMargin25: 0.06,     // FY2026E: $130-145B CapEx squeezes FCF (Q2 FCF only $0.8B)
  taxRate: 0.14,         // Normalized FY2026 rate: 13-16% guided (Q1 was -23% including $8B one-time benefit)
  cash: 90260,           // Jun 2026 (stockanalysis): $90.3B
  debt: 112320,          // Jun 2026: $112.3B incl. leases (up sharply — data-center financing)
  beta: 1.23,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 30.40,        // FY2026E GAAP EPS consensus (Oct 8 2026; range $27.89-32.83; FY27E $34.55, +14%). Includes Q2's $2.4B legal + $1.2B severance charges. Prior: $32.50.
  rsRating: 97,          // IBD RS per user, 10/11/2026 (was 22)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '10/23',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $60.8B (+28%, beat ~$60.2B) but EPS $6.18 vs $7.22 expected
  // (−13% y/y) on $2.4B legal charges + $1.2B severance; expenses +55%. Q3
  // GUIDE $61-64B (below ~$63.2B consensus). FY26 capex $130-145B (narrowed
  // up from $125-145B), total expenses raised to $165-169B. Q2 FCF just
  // $0.8B (capex $31B). Street: Strong Buy (63), PT $580-1,050 (median
  // $800); FY26E rev $254.1B / EPS $30.40, FY27E $306.5B / $34.55. Stock
  // $718.67 (~23.6× FY26E), flat over 52 weeks; now net debt ~$22B.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Dominant social platform with over three and a half billion daily active people and unmatched advertising data flywheel',
    'Muse Spark frontier model signals Meta is now a credible AI lab capable of competing at the top of the capability curve',
    'WhatsApp paid messaging and business AI tools represent a structurally new revenue stream compounding rapidly',
    'Advertising revenue is still growing faster than almost any mega-cap, showing the AI-driven ad engine is working',
    'Declining share count and strong buyback history provide durable EPS tailwind as the AI build matures',
  ],

  risksToBuy: [
    'Massive AI infrastructure capex has nearly wiped out free cash flow and pushed the balance sheet into net debt',
    'Costs are growing much faster than revenue, so earnings are flat this year despite strong sales growth',
    'Reality Labs continues consuming billions in capital with no clear monetization timeline or platform success',
    'Dependence on a single advertising revenue model leaves Meta exposed to any macro-driven ad spending slowdown',
    'Regulatory and antitrust exposure across multiple jurisdictions could structurally constrain the platform\'s growth',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 580, targetMedian: 800, targetHigh: 1050, numAnalysts: 63 },  // stockanalysis.com (Oct 8 2026)

  // rev25 = FY2026 estimate; year-1 = FY2027 growth rate
  revGrowth: [
    [0.13, 0.09, 0.07, 0.06, 0.05], // Bear: ad growth cools, AI capex doesn't ROI
    [0.19, 0.15, 0.12, 0.10, 0.09], // Base: FY27 ≈ $302B (slight haircut vs $306.5B), AI ad flywheel + WhatsApp
    [0.23, 0.19, 0.16, 0.13, 0.11], // Bull: Muse Spark + agentic commerce scale
  ],

  // fcfMargin25 = ~6% (FY2026E); year-1 = FY2027
  fcfMargin: [
    [0.02, 0.05, 0.08, 0.11, 0.14],   // Bear: capex stays elevated, FCF barely recovers
    [0.04, 0.09, 0.12, 0.17, 0.20],   // Base: consensus trajectory — capex caps FCF recovery
    [0.07, 0.13, 0.17, 0.22, 0.26],   // Bull: AI ROI lets capex moderate, FCF leverage kicks in
  ],

  exitMultiple: [12, 16, 22],

  desc: [
    '$130B+/yr CapEx generates insufficient incremental ROI and business AIs plateau without a monetization model. Revenue decelerates to mid-single digits by FY30 as the ad market matures, and FCF stays depressed. ' +
      'EPS compounds ~6% from the FY26E $30.40 base; multiple compresses to ~14x as the market re-rates Meta to a capex-heavy ad utility. 5yr target {target} ({cagr} annualized).',
    'The ad flywheel keeps compounding (Q2 revenue +28%), but AI capex keeps FCF well below the historical 30%+ for years. WhatsApp paid messaging and business AIs become a meaningful third revenue line; capex moderates only gradually. ' +
      'EPS compounds ~13% from $30.40 as FY26 legal/severance charges roll off; share count shrinks ~2%/yr; ~18x exit. 5yr target {target} ({cagr} annualized).',
    'Muse Spark and personal/business agents create new monetizable categories for billions of people; agentic commerce expands the ad TAM and AI glasses scale toward a second platform. ' +
      'CapEx ROI materializes and FCF leverage kicks in. EPS compounds ~17%; ~21x exit. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Capex doesn\'t translate into incremental revenue, frontier-model quality falls short of OpenAI/Anthropic/Google, and Reality Labs bleeds on. ' +
      'FCF stays compressed, buybacks slow as capex consumes cash, and debt keeps rising. Multiple compresses on capex anxiety plus deceleration.',
    'Ad revenue growth in the high-20s proves AI is improving targeting and engagement. WhatsApp paid messaging and business AIs are structural new revenue streams. ' +
      'But the base case assumes capex moderates only slowly — the ad flywheel funds the AI build rather than dropping to FCF. RS recovery is contingent on visible AI ROI and expense discipline.',
    'Meta builds the dominant personal + business agent platform. Agentic commerce at scale expands addressable market far beyond display ads, and AI glasses evolve into a persistent AI companion. ' +
      'Best-in-class gross margins and operating leverage prove the structural advantage once capex intensity peaks.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.012, 0.018, 0.025],
  ebitdaProxy: [0.42, 0.48, 0.54],
  bullMaOptVal: false,

  epsCagr: [6, 13, 17],   // From the FY26E $30.40 base (depressed by one-time charges + D&A ramp)
  exitPE: [14, 18, 21],   // Was [13,16,19]; Meta's 10-yr median P/E is low-20s — 18x base still bakes in capex anxiety
  prob: [35, 45, 20],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  debtSafety: {
    netDebt: 22060,        // Jun 2026: ~$112.3B debt (incl. leases) − ~$90.3B cash (stockanalysis)
    ebitda: 109660,        // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'GREEN (~0.2×). Swung from net cash to modest net debt as data-center financing ramps — watch the trajectory, not the level.',
  },

  burry: {
    sbc: 20427,
    gaapNi: 70587,
    buyback: 26248,
    epsBasis: 'GAAP',
    fy: "LTM Q1'26",
    overstatementPct: 20,
    overstatementSource: 'burry-published',
    note: "Elevated per Burry — 20% overstatement, similar to NFLX tier. LTM Q1'26: SBC $20,427M (9.5% of revenue / 16.5% of op CF), GAAP NI $70,587M, buybacks $26,248M (1.3× SBC — down from prior 2.2× as CapEx escalation crowds out buyback capacity). Diluted shares 2,859M (FY21) → 2,567.5M (LTM) = -10.2% over 5 years at -2.1%/yr. Our formula gives ~70% (MTM amplifier overshoots); Burry's 20% pin correctly credits buybacks for producing real net share reduction. Key watch: if $125-145B FY2026 CapEx permanently crowds out buybacks, the net dilution argument weakens and the tier may need revisiting.",
  },
});
