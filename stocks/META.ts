import { defineStock } from './defineStock';

export const META = defineStock({
  ticker: 'META',
  name: 'Meta Platforms',
  sector: 'Social Media / Digital Advertising / AI',
  themeColor: '#1877F2',
  currentPrice: 614.23,
  fairPriceRange: '$520 - $900',
  shares0: 2560,
  rev25: 245000,         // FY2026 estimate: Q1 $56.3B + Q2 mid $59.5B + H2 ~$130B
  fcfMargin25: 0.01,     // FY2026 ~0.7% per consensus: $133B+ CapEx all but eliminates FCF
  taxRate: 0.14,         // Normalized FY2026 rate: 13-16% guided (Q1 was -23% including $8B one-time benefit)
  cash: 81200,           // Q1 2026 end: $81.2B
  debt: 58700,           // Q1 2026 end: $58.7B (up from ~$30B — cloud/infrastructure commitments)
  beta: 1.23,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 32.50,
  rsRating: 42,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '05/15',
  lastReportTag: 'Q1 2026',

  strategicNarrative:
    "Q1 2026: revenue $56.3B (+33% YoY), 41% operating margin (record), normalized EPS $7.31 ($10.44 reported includes $8.03B one-time tax benefit). Q2 guided $58-61B. 3.56B daily active people — slight QoQ dip from Iran/Russia disruptions; underlying trends positive. " +
    "AI product moment arrived: Muse Spark from Meta Superintelligence Labs — first frontier model from a 10-month-old lab; business AIs now 10M weekly conversations (10× since January); AI glasses daily users tripling YoY; Meta AI sessions per user up double-digit % post-Spark. " +
    "Monetization flywheel: ad impressions +19%, price per ad +12%. Value optimization suite >$20B annual run rate (doubled YoY). Partnership ads $10B run rate (doubled YoY). 8M+ advertisers using Gen AI creative tools (+3% conversion lift). WhatsApp paid messaging $885M (+74%). " +
    "Capital intensity is the central debate: CapEx raised to $125-145B FY2026 (from $115-135B) — $107B in new cloud/infrastructure contractual commitments added in Q1 alone. Cash $81.2B; debt $58.7B (up from ~$30B). FY2026 FCF will be severely compressed vs LTM's $48B. FY2026 expense guide unchanged at $162-169B; 10% workforce reduction in May to offset infrastructure spend. " +
    "LTM quality: revenue $215B, 82% gross margin, 41% operating margin, 33% net margin, FCF $48B. Shares outstanding declining: 2,859M (FY21) → 2,567M (LTM) = -10.2% over 5 years. " +
    "AI capex risk is now baked into the BASE case, not just the bear: consensus (TIKR) models FCF margin collapsing to ~0.7% FY26E and recovering only to ~12% FY29 / ~17% FY30 as CapEx runs $133-189B/yr — the prior 25%+ FY29 FCF assumption was ~2× consensus and has been removed. " +
    "At ~$614 / forward P/E ~18.9× (on consensus FY26E EPS ~$32.5) / analyst median $820, META is still the cheapest Mag-7 on a quality-adjusted basis, but the de-rating is the market pricing real, unresolved capex-ROI risk — not pure overreaction. RS 42 falling reflects that anxiety.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 600, targetMedian: 820, targetHigh: 1000, numAnalysts: 56 },

  // rev25 = FY2026 estimate; year-1 = FY2027 growth rate
  revGrowth: [
    [0.11, 0.08, 0.07, 0.06, 0.05], // Bear: ad saturation, AI capex doesn't ROI
    [0.15, 0.13, 0.11, 0.10, 0.09], // Base: sustained by AI ad flywheel + WhatsApp monetization
    [0.20, 0.17, 0.15, 0.13, 0.11], // Bull: Muse Spark + agentic commerce scale
  ],

  // fcfMargin25 = ~1% (FY2026 ~0.7% per consensus); year-1 = FY2027
  fcfMargin: [
    [0.02, 0.05, 0.08, 0.11, 0.14],   // Bear: capex stays elevated, FCF barely recovers
    [0.04, 0.09, 0.12, 0.17, 0.20],   // Base: consensus trajectory — capex caps FCF recovery
    [0.07, 0.13, 0.17, 0.22, 0.26],   // Bull: AI ROI lets capex moderate, FCF leverage kicks in
  ],

  exitMultiple: [12, 16, 22],

  desc: [
    '$133-189B/yr CapEx generates insufficient incremental ROI. Business AIs (10M weekly conversations) plateau without a monetization model. Revenue decelerates to 6-8% by FY29 as ad market matures. ' +
      'FCF stays near-zero as capex never moderates (consensus FCF margin still ~14% by FY30). EPS CAGR ~6% from the $32.50 base. Multiple compresses to ~13× as market re-rates Meta to a capex-heavy ad utility. 5yr target ~$565, ~-2%/yr.',
    'Q1 2026 validated the ad flywheel (+33% revenue, 41% margins), but AI capex risk is in the base case: per consensus, $133-189B/yr CapEx holds FCF margin to ~0.7% FY26 → ~12% FY29 → ~17% FY30 — it does NOT snap back to the historical 30%+. ' +
      'WhatsApp paid messaging + business AIs compound into a meaningful third revenue line; CapEx moderates only gradually. ' +
      'EPS compounds at ~12% CAGR (capex D&A drags GAAP EPS); share count shrinks ~2%/yr; ~16× exit. 5yr target ~$900, ~+8%/yr (near analyst median).',
    'Muse Spark family + personal/business agents deliver genuinely new monetizable categories for billions of people; AI-native creative tools and agentic commerce expand the ad TAM. ' +
      'Reality Labs glasses scale toward a second platform. CapEx ROI materializes as inference demand justifies the build, letting FCF leverage finally kick in. EPS compounds at ~16% CAGR; ~19× exit. 5yr target ~$1,300, ~+16%/yr.',
  ],

  thesis: [
    '$125-145B capex doesn\'t translate to incremental revenue. Muse Spark model quality falls short of frontier (OpenAI/Anthropic/Google maintain leads). Reality Labs bleeds on with no monetization path. ' +
      'FCF compressed indefinitely; buybacks slow as capex consumes cash (LTM buybacks already dropped from $44B to $26B). Multiple compresses on capex anxiety + deceleration.',
    'Muse Spark + subsequent models drive real product improvements — business AI adoption 10× in one quarter is the signal. WhatsApp paid messaging $885M (+74%) is a structural new revenue stream. ' +
      'But the base case now assumes capex moderates only slowly: per consensus FCF margin is still ~12% in FY29 / ~17% FY30, well below the historical 30%+ — the ad flywheel funds the AI build rather than dropping to FCF. Share count declining ~2%/yr compounds EPS. RS recovery from 42 → 60+ contingent on visible AI ROI.',
    'Meta builds the dominant personal + business agent platform. Agentic commerce at scale (shopping, local, health) expands addressable market far beyond display ads. ' +
      'AI glasses (daily users 3× YoY) evolve into a persistent AI companion — the next major platform. LTM economics (82% gross margin, 41% operating margin, $48B FCF even during peak capex) prove the structural advantage.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.012, 0.018, 0.025],
  ebitdaProxy: [0.42, 0.48, 0.54],
  bullMaOptVal: false,

  epsCagr: [6, 12, 16],
  exitPE: [13, 16, 19],
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
