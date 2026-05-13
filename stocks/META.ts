import { defineStock } from './defineStock';

export const META = defineStock({
  ticker: 'META',
  name: 'Meta Platforms',
  sector: 'Social Media / Digital Advertising / AI',
  themeColor: '#1877F2',
  currentPrice: 616.63,
  fairPriceRange: '$520 - $820',
  shares0: 2560,
  rev25: 245000,         // FY2026 estimate: Q1 $56.3B + Q2 mid $59.5B + H2 ~$130B
  fcfMargin25: 0.08,     // FY2026 peak capex year: $125-145B CapEx compresses FCF sharply
  taxRate: 0.14,         // Normalized FY2026 rate: 13-16% guided (Q1 was -23% including $8B one-time benefit)
  cash: 81200,           // Q1 2026 end: $81.2B
  debt: 58700,           // Q1 2026 end: $58.7B (up from ~$30B — cloud/infrastructure commitments)
  beta: 1.23,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 34.78,
  rsRating: 42,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '05/13',
  lastReportTag: 'Q1 2026',

  strategicNarrative:
    "Q1 2026: revenue $56.3B (+33% YoY), 41% operating margin (record), normalized EPS $7.31 ($10.44 reported includes $8.03B one-time tax benefit). Q2 guided $58-61B. 3.56B daily active people — slight QoQ dip from Iran/Russia disruptions; underlying trends positive. " +
    "AI product moment arrived: Muse Spark from Meta Superintelligence Labs — first frontier model from a 10-month-old lab; business AIs now 10M weekly conversations (10× since January); AI glasses daily users tripling YoY; Meta AI sessions per user up double-digit % post-Spark. " +
    "Monetization flywheel: ad impressions +19%, price per ad +12%. Value optimization suite >$20B annual run rate (doubled YoY). Partnership ads $10B run rate (doubled YoY). 8M+ advertisers using Gen AI creative tools (+3% conversion lift). WhatsApp paid messaging $885M (+74%). " +
    "Capital intensity is the central debate: CapEx raised to $125-145B FY2026 (from $115-135B) — $107B in new cloud/infrastructure contractual commitments added in Q1 alone. Cash $81.2B; debt $58.7B (up from ~$30B). FY2026 FCF will be severely compressed vs LTM's $48B. FY2026 expense guide unchanged at $162-169B; 10% workforce reduction in May to offset infrastructure spend. " +
    "LTM quality: revenue $215B, 82% gross margin, 41% operating margin, 33% net margin, FCF $48B. Shares outstanding declining: 2,859M (FY21) → 2,567M (LTM) = -10.2% over 5 years. " +
    "At ~$599 / forward P/E 17.2× / analyst target $820, META is the cheapest Mag-7 on quality-adjusted basis. RS 42 falling reflects AI capex anxiety — identical pattern to pre-FY25 selloff before the ad flywheel proved out.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 600, targetMedian: 820, targetHigh: 1000, numAnalysts: 56 },

  // rev25 = FY2026 estimate; year-1 = FY2027 growth rate
  revGrowth: [
    [0.11, 0.08, 0.07, 0.06, 0.05], // Bear: ad saturation, AI capex doesn't ROI
    [0.15, 0.13, 0.11, 0.10, 0.09], // Base: sustained by AI ad flywheel + WhatsApp monetization
    [0.20, 0.17, 0.15, 0.13, 0.11], // Bull: Muse Spark + agentic commerce scale
  ],

  // fcfMargin25 = ~8% (FY2026 peak capex year); year-1 = FY2027 when capex moderates
  fcfMargin: [
    [0.14, 0.16, 0.18, 0.20, 0.22],   // Bear: capex stays elevated, slow recovery
    [0.20, 0.23, 0.25, 0.27, 0.28],   // Base: capex peaks FY26-27, FCF recovers
    [0.26, 0.29, 0.31, 0.33, 0.35],   // Bull: strong AI ROI, capex leverage kicks in
  ],

  exitMultiple: [12, 16, 22],

  desc: [
    '$125-145B FY2026 CapEx generates insufficient incremental ROI. Business AIs (10M weekly conversations) plateau without a monetization model. Revenue decelerates to 6-8% by FY29 as ad market matures. ' +
      'FCF stays compressed as capex fails to moderate. EPS CAGR ~8% from $34.78 base. Multiple compresses from 17× to 14× as market re-rates Meta to mature ad utility. 5yr target ~$700, ~3% annualized.',
    'Q1 2026 validated the flywheel: +33% revenue, 41% margins, value optimization suite >$20B run rate (doubled), partnership ads $10B run rate (doubled), Muse Spark driving double-digit Meta AI session growth. ' +
      'CapEx peaks FY2026-27 then moderates, FCF recovering to 25%+ margins by FY29. WhatsApp paid messaging + business AIs compound into a meaningful third revenue line. ' +
      'EPS compounds at 14% CAGR; share count shrinks 2%/yr. Multiple holds 18×. 5yr target ~$1,100-1,200, ~13% annualized.',
    'Muse Spark family + personal/business agents deliver genuinely new monetizable product categories for billions of people. AI-native creative tools and agentic commerce expand the ad TAM structurally. ' +
      'Reality Labs glasses hit mass market by FY28 — a second platform. CapEx ROI materializes as inference demand justifies the build. EPS compounds at 22% CAGR; 22× multiple. 5yr target ~$2,000+, ~27% annualized.',
  ],

  thesis: [
    '$125-145B capex doesn\'t translate to incremental revenue. Muse Spark model quality falls short of frontier (OpenAI/Anthropic/Google maintain leads). Reality Labs bleeds on with no monetization path. ' +
      'FCF compressed indefinitely; buybacks slow as capex consumes cash (LTM buybacks already dropped from $44B to $26B). Multiple compresses on capex anxiety + deceleration.',
    'Muse Spark + subsequent models drive real product improvements — business AI adoption 10× in one quarter is the signal. WhatsApp paid messaging $885M (+74%) is a structural new revenue stream. ' +
      'Capex peaks and moderates 2027+ per management playbook (same happened with Reels investment). Share count declining 2%/yr compounds EPS. RS recovery from 42 → 60+ as AI ROI becomes visible.',
    'Meta builds the dominant personal + business agent platform. Agentic commerce at scale (shopping, local, health) expands addressable market far beyond display ads. ' +
      'AI glasses (daily users 3× YoY) evolve into a persistent AI companion — the next major platform. LTM economics (82% gross margin, 41% operating margin, $48B FCF even during peak capex) prove the structural advantage.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.012, 0.018, 0.025],
  ebitdaProxy: [0.42, 0.48, 0.54],
  bullMaOptVal: false,

  epsCagr: [8, 14, 22],
  exitPE: [14, 18, 22],
  prob: [25, 50, 25],

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
