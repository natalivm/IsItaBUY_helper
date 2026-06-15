import { defineStock } from './defineStock';

export const CRWD = defineStock({
  ticker: 'CRWD',
  name: 'CrowdStrike Holdings',
  sector: 'Cybersecurity / Endpoint Security',
  themeColor: '#e33535',
  currentPrice: 692.91,
  fairPriceRange: '$340 - $1,000',
  shares0: 252,
  rev25: 4810,
  fcfMargin25: 0.32,
  taxRate: 0.15,
  cash: 3800,
  debt: 750,
  beta: 1.15,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 4.92,
  rsRating: 50,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'AIDR positions CrowdStrike to protect AI agents — a structural expansion of the attackable surface enterprises must defend',
    'Exclusive security partnerships with leading AI labs provide unmatched enterprise credibility for the AI threat narrative',
    'Platform breadth across endpoint, cloud, SIEM, and identity creates consolidation pull that is difficult for competitors to replicate',
    'First GAAP-profitable quarter confirms the operating leverage model works at scale after years of skepticism',
    'Falcon Flex drives significant upsell expansion inside the existing customer base without requiring new logo growth',
  ],

  risksToBuy: [
    'Billings growth lagging ARR growth is a leading indicator of potential revenue deceleration in coming quarters',
    'SBC represents a substantial portion of revenue, severely distorting true owner economics versus headline FCF',
    'Microsoft and Palo Alto could replicate AIDR capabilities within existing enterprise suites, commoditizing the new product',
    'Stock is near the prob-weighted model target even after the post-earnings selloff — limited upside margin of safety at current price',
    'Premium valuation leaves no room for any execution stumble or softening in enterprise security spending',
  ],

  updatedOn: '06/15',

  analystConsensus: { rating: 'Buy', targetLow: 353, targetMedian: 524, targetHigh: 640, numAnalysts: 40 },

  revGrowth: [
    [0.15, 0.12, 0.10, 0.08, 0.08], // Bear: billings slowdown persists, budget cuts
    [0.24, 0.21, 0.19, 0.17, 0.14], // Base: AIDR adds growth on top of core platform
    [0.30, 0.28, 0.25, 0.22, 0.20], // Bull: AIDR reaches EDR scale, 90× attack surface monetizes
  ],

  fcfMargin: [
    [0.28, 0.28, 0.27, 0.27, 0.26], // Bear: margin stalls, AIDR investment drag
    [0.35, 0.37, 0.38, 0.39, 0.40], // Base: operating leverage continues; Q1 actual 33.8%
    [0.38, 0.40, 0.42, 0.44, 0.46], // Bull: AIDR high-margin ARR compounds FCF
  ],

  exitMultiple: [18, 24, 30],

  desc: [
    'Billings slowdown (Q1: 18% vs ARR 24%) persists, signaling pipeline weakness. AIDR monetizes as a bundled feature rather than a paid platform — enterprises treat it as included, not purchased. ' +
      'Microsoft/Palo Alto replicate AIDR within existing suites. EPS ~$9 by FY31 at 15% CAGR from $4.92. P/E compresses 35×. 5yr price ~$315.',
    'AIDR matures into a $1.5–2B ARR product over 5 years, stacking on top of the $5.5B ARR core. Q1 billings "miss" is a one-quarter blip as Falcon Flex timing shifts to H2. ' +
      'Exclusive Anthropic/OpenAI partnerships open enterprise sales channels. EPS ~$14 by FY31 at 25% CAGR. P/E compresses naturally to 50×. 5yr price ~$700.',
    'AIDR reaches EDR scale ($4B+ ARR) as the 90× AI agent attack surface materializes. The Mythos moment is cybersecurity\'s platform inflection — CRWD monopolizes AI workload security. ' +
      'EPS ~$22 by FY31 at 32% CAGR. Market maintains 70× P/E for category-defining growth. 5yr price ~$1,540.',
  ],

  thesis: [
    'Billings deceleration (18% growth vs 24% ARR) is structural, not seasonal — deal duration shortening and budget pressure compound. AIDR pipeline >$50M is small relative to $5.5B ARR. At 160× P/E, any miss triggers severe multiple compression. SBC 22% of revenue still distorts true economics.',
    'AIDR structurally broadens the TAM: 90 AI agents per employee vs 1 endpoint is a mathematical 90× expansion. Falcon Flex near $2B ARR (+99% YoY) with 26% Reflex uplift validates platform stickiness. First GAAP profitable Q1 confirms the leverage model works at scale.',
    'The Mythos moment — AI models weaponizing vulnerability discovery — is cybersecurity\'s Y2K: a non-discretionary emergency. Exclusive Anthropic + OpenAI partnerships are the enterprise credentialing mechanism no competitor can replicate. AIDR becoming larger than EDR is management\'s base case, not bull case.',
  ],

  termGrowth: [0.015, 0.025, 0.03],

  epsCagr: [15, 25, 32],
  exitPE: [35, 50, 70],
  prob: [15, 42, 43],

  bbRate: [0.00, 0.005, 0.01],
  ebitdaProxy: [0.25, 0.32, 0.38],
  bullMaOptVal: false,

  burry: {
    sbc: 1097,
    gaapNi: -162,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Burry explicitly cites CRWD. FY26 actuals (basis for this block): SBC $1,097M (22.8% of revenue — extreme), GAAP NI -$162M (loss), buybacks $0. Headline FCF $1.31B drops to TRUE OWNER FCF ~$213M treating SBC as real cost — a 6× distortion. Diluted shares +15% over 5 years (218M → 252M), zero buyback offset. Q1 FY27 UPDATE: GAAP NI turned positive (+$27.8M) for the first time — operating leverage is breaking through. Full FY27 SBC data needed before the Burry block can be updated; 100% overstatement is a placeholder until then.',
  },
});
