import { defineStock } from './defineStock';

export const AMZN = defineStock({
  ticker: 'AMZN',
  name: 'Amazon.com',
  sector: 'E-commerce / Cloud / AI Infrastructure',
  themeColor: '#ff9900',
  currentPrice: 262.43,
  fairPriceRange: '$230 - $405',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 10800,
  rev25: 828400,         // FY2026E consensus $828.4B (Q1 $181.5B + Q2 $200.6B + Q3 guide $197-202B); FY27E $948.4B (+14.5%)
  fcfMargin25: 0.00,     // FY2026 peak capex year — TTM FCF turned NEGATIVE (-$7.6B at Q2) on +$66B y/y capex
  taxRate: 0.18,
  cash: 100000,
  debt: 60000,
  beta: 1.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 8.31,         // FY2026E adjusted EPS — stockanalysis consensus (Oct 7 2026; range $7.65-9.49; FY27E $10.47, +26%). EXCLUDES the one-time Anthropic mark-ups (Q1 $16.8B, Q2 $53.4B pre-tax) that inflate GAAP NI. Prior: $7.85.
  rsRating: 98,          // IBD RS per user, 10/10/2026 (was 64)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',

  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales $200.6B (+20%). AWS $42.2B (+37% — fastest in 18 quarters,
  // ~$169B run-rate), AWS op income $16.6B (vs $10.2B). Total op income
  // $27.5B (vs $19.2B). GAAP NI $62.6B inflated by $53.4B pre-tax Anthropic
  // investment gains. TTM FCF -$7.6B (capex +$66B y/y). Q3 GUIDE: net sales
  // $197-202B (+9-12%), op income $22.5-26.5B (vs $17.4B). Street: Strong Buy
  // (60), PT $230-405 (median $330); FY26E EPS $8.31 / rev $828B, FY27E
  // $10.47 / $948B. ~32× FY26E / ~25× FY27E. Net: AWS re-acceleration
  // validates the capex; FCF is the price of admission.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'AWS is the dominant global cloud platform with AI demand accelerating its growth to the fastest pace in over a decade.',
    'Trainium custom silicon positions Amazon as a credible competitor to NVIDIA in AI compute at hyperscale economics.',
    'Advertising business is a high-margin, rapidly growing engine built on first-party shopper data no competitor can replicate.',
    'Amazon Leo satellite network has anchor commercial deals and government contracts providing a long-duration growth option.',
    'Retail automation and robotics are structurally expanding operating margins while improving delivery speed and customer experience.',
  ],

  risksToBuy: [
    'Peak capex has pushed trailing free cash flow negative, creating valuation sensitivity to any delay in AI monetization.',
    'Azure and Google Cloud are credible AI platform competitors; any AWS share loss would re-rate the multiple immediately.',
    'Amazon Leo is a capital-intensive bet with uncertain consumer adoption timelines and satellite deployment execution risk.',
    'Tariff and trade policy headwinds on physical retail supply chains could pressure unit economics in the core commerce segment.',
    'Regulatory and antitrust scrutiny across e-commerce, cloud, and advertising creates headline risk and potential structural constraints.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 230, targetMedian: 330, targetHigh: 405, numAnalysts: 60 },  // stockanalysis.com, Oct 7 2026

  // rev25 = FY2026 estimate; year-1 = FY2027 growth
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06], // Bear: AWS decelerates to high-single-digits, retail flats
    [0.14, 0.12, 0.11, 0.10, 0.09], // Base: AWS 15-18%, ads 20%+, retail stable
    [0.18, 0.16, 0.14, 0.12, 0.11], // Bull: Trainium/Leo/Rufus all scale; all-three-engines
  ],
  // fcfMargin25 = 4% (FY2026 peak capex); year-1 = FY2027 as capex moderates
  fcfMargin: [
    [0.05, 0.06, 0.07, 0.08, 0.09], // Bear: capex stays elevated, slow FCF recovery
    [0.08, 0.09, 0.10, 0.11, 0.12], // Base: CapEx peaks FY26-27, FCF inflects
    [0.11, 0.13, 0.14, 0.15, 0.16], // Bull: Trainium ROI + Leo early monetization
  ],
  exitMultiple: [14, 18, 24],

  desc: [
    '2026 record margins prove fleeting — AI capex (TTM FCF already negative) fails to generate enough incremental AWS revenue. Enterprise AI slower than hyped; Azure/Google take share. AWS decelerates to high-single digits by FY28. ' +
      'Retail margin stalls at 8% on labor/tariff costs; Amazon Leo burns cash without revenue payback. EPS CAGR ~6% from the $8.31 FY26E base. Multiple 22×. 5yr target {target} ({cagr} annualized).',
    'AWS re-acceleration (+37% in Q2 2026) + Trainium sold-out validates the AI infrastructure thesis. AWS sustains high-teens+ growth through FY28. Retail margin expands to 10-11% on robotics/automation. Ads reaches $80B+ by FY28. ' +
      'Leo commercial Q3 launch + Delta/Apple anchor deals build toward the "many billion-dollar revenue" vision. CapEx peaks FY26-27, FCF inflects sharply. ' +
      'EPS compounds ~13% (FY27E +26% consensus, then ~10%/yr). Multiple 27×. 5yr target {target} ({cagr} annualized).',
    'Trainium becomes the leading AI chip ($50B+ standalone implied) as T3/T4 scale. Leo launches profitably Q3 2026 (Delta, Apple, enterprises) and grows into an AWS-like capital return story. ' +
      'Rufus agentic commerce expands wallet share; ads grow to $100B+ with first-party shopper data advantage. All three engines at full speed. EPS compounds ~18% CAGR. Multiple 30×. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'The capex surge (+$66B y/y, TTM FCF negative) is unsustainable without proportional FCF. Azure (OpenAI exclusive), Google (Gemini + Tensor) take share as AI labs consolidate platforms. ' +
      'Retail wage/tariff headwinds absorb automation productivity gains. Leo launch delays or low adoption add ~$1B/quarter to losses. Multiple re-rates from 27× to 22× on capex anxiety.',
    'Q2 extended it: AWS +37% (fastest in 18 quarters, ~$169B run-rate) with AWS op income +63%. Q1 had validated all three engines: AWS +28%, $364B backlog, Bedrock tokens in Q1 > all prior years combined, Trainium top-3 chip globally on 40% QoQ growth, retail units +15%. ' +
      'Leo Q3 launch + Delta/Apple deals de-risk the satellite bet. Trainium $225B+ commitments + T3 nearly fully subscribed proves pricing power. CapEx investment follows AWS\'s established playbook — big upfront, big returns later.',
    'Trainium\'s $50B implied standalone run rate + $225B commitments puts Amazon at the center of AI compute in a way the market hasn\'t fully priced. Leo + Globalstar + Apple = the direct-to-device platform for the next decade. ' +
      'Rufus agentic commerce disrupts traditional search-to-purchase funnel in Amazon\'s favor. Graviton chosen by Meta for agentic AI proves CPU + GPU chip stack dominance. All TAMs compound simultaneously.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.0, 0.0, 0.0],
  ebitdaProxy: [0.14, 0.18, 0.22],
  bullMaOptVal: false,

  epsCagr: [6, 13, 18],   // Q2 2026: raised from 5/10/14 — base now tracks Street (FY27E +26%, then ~10%/yr); 10% sat well below consensus
  exitPE: [22, 27, 30],
  prob: [20, 50, 30],

  debtSafety: {
    netDebt: -40000,       // approx.: ~$100B cash & securities vs ~$60B long-term debt (excl. leases)
    ebitda: 190000,        // approx. FY26E: op income ~$95B+ + D&A ~$90B+
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash (approximate). Leverage is not the risk; capex-driven negative FCF is the thing to watch. Figures approximate.',
  },

  burry: {
    sbc: 19467,
    gaapNi: 77670,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 21,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — 21% overstatement, similar to NFLX tier. TIKR FY25 actuals: SBC $19,467M (2.7% of revenue — low for scale), zero buybacks (full reinvestment into AI capex). Naive SBC/NI 25%. Diluted shares only +5.4% over 5y (+1.1%/yr) despite zero buyback offset — modest dilution thanks to revenue/profit compounding. AMZN is the opposite of META: same Burry tier (~20%) but achieved by no buybacks + moderate stock appreciation rather than massive buybacks. Our 4y-MTM formula overshoots (32% vs Burry\'s 21%) because the 2.275× MTM multiplier produces noisier results in the 2-4× zone. Trust Burry\'s 21% as the anchor.',
  },
});
