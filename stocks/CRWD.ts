import { defineStock } from './defineStock';

export const CRWD = defineStock({
  ticker: 'CRWD',
  name: 'CrowdStrike Holdings',
  sector: 'Cybersecurity / Endpoint Security',
  themeColor: '#e33535',
  currentPrice: 275.04,   // post 4-for-1 split (Jul 2 2026)
  fairPriceRange: '$132 - $325',  // stockanalysis.com analyst target range (split-adjusted), Oct 9 2026
  shares0: 1010,        // split-adjusted: ~252M pre-split × 4 (4-for-1 split, Jul 2 2026)
  rev25: 4810,          // FY26A (Jan 2026); FY27E consensus $6.01B (+25%), FY28E $7.37B (+23%)
  fcfMargin25: 0.32,
  taxRate: 0.15,
  cash: 3800,
  debt: 750,
  beta: 1.15,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 1.26,       // FY27E (Jan 2027) non-GAAP EPS, split-adjusted — stockanalysis consensus (Oct 9 2026; FY28E $1.61, +28%). Prior $4.92 was PRE-split (≈ $1.23 post-split) and was never adjusted when the price bot moved to split prices — inflating the model ~4×.
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 90)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 FY27 UPDATE (Aug 26, 2026) — first data review; 4-FOR-1 SPLIT FIX
  // ─────────────────────────────────────────────────────────────────────────
  // SPLIT: 4-for-1 stock dividend, split-adjusted trading from Jul 2 2026
  // (~$773 → ~$193). Per-share inputs (baseEps, shares0, PTs) are now
  // split-adjusted; the prior STRONG BUY / PRIME_GROWTH was an artifact of
  // pre-split EPS against post-split prices.
  // Q2 FY27: revenue $1.47B (+26%); ending ARR $5.84B (+25%); record net new
  // ARR $333M (+51%, accelerating); Falcon Flex ARR $2.29B (+101%). Record
  // OCF $530M, FCF $377M. FY27 net new ARR growth outlook raised to ~34% at
  // the midpoint (+630bps; +1,150bps since the start of the year). Street:
  // Buy (53), PT $132-325 (median $245); FY27E EPS $1.26 / rev $6.01B, FY28E
  // $1.61 / $7.37B. Stock $275 (~218× FY27E non-GAAP EPS) sits above the
  // median target after a ~+44% run since the split. Net: operations re-
  // accelerating; valuation is extreme.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'AIDR positions CrowdStrike to protect AI agents — a structural expansion of the attackable surface enterprises must defend',
    'Exclusive security partnerships with leading AI labs provide unmatched enterprise credibility for the AI threat narrative',
    'Platform breadth across endpoint, cloud, SIEM, and identity creates consolidation pull that is difficult for competitors to replicate',
    'First GAAP-profitable quarter confirms the operating leverage model works at scale after years of skepticism',
    'Falcon Flex drives significant upsell expansion inside the existing customer base without requiring new logo growth',
  ],

  risksToBuy: [
    'Valuation is extreme even for its growth — the stock trades above the median analyst target after a sharp run',
    'SBC represents a substantial portion of revenue, severely distorting true owner economics versus headline FCF',
    'Microsoft and Palo Alto could replicate AIDR capabilities within existing enterprise suites, commoditizing the new product',
    'Billings have lagged ARR at times, a leading indicator worth watching for revenue deceleration',
    'Premium valuation leaves no room for any execution stumble or softening in enterprise security spending',
  ],

  updatedOn: '10/09',
  lastReportTag: 'Q2 FY27',
  dataReviewedOn: '2026-10-10',

  analystConsensus: { rating: 'Buy', targetLow: 132, targetMedian: 245, targetHigh: 325, numAnalysts: 53 },  // stockanalysis.com (split-adjusted), Oct 9 2026

  revGrowth: [
    [0.22, 0.12, 0.10, 0.08, 0.08], // Bear: FY27 ~locked near +22%; billings slowdown, budget cuts
    [0.25, 0.22, 0.19, 0.17, 0.14], // Base: FY27/FY28 ≈ consensus $6.0B / $7.4B; AIDR adds growth on top of core platform
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
      'Microsoft/Palo Alto replicate AIDR within existing suites. EPS compounds ~15% from the $1.26 FY27E (split-adjusted) base; P/E compresses to 35×. 5yr target {target} ({cagr} annualized).',
    'AIDR matures into a $1.5–2B ARR product over 5 years, stacking on top of the $5.5B ARR core. Q1 billings "miss" is a one-quarter blip as Falcon Flex timing shifts to H2. ' +
      'Exclusive Anthropic/OpenAI partnerships open enterprise sales channels. EPS compounds ~25% from $1.26; P/E compresses from ~218× to 50×. 5yr target {target} ({cagr} annualized).',
    'AIDR reaches EDR scale ($4B+ ARR) as the 90× AI agent attack surface materializes. The Mythos moment is cybersecurity\'s platform inflection — CRWD monopolizes AI workload security. ' +
      'EPS compounds ~32% from $1.26. Market maintains 70× P/E for category-defining growth. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Billings deceleration (18% growth vs 24% ARR) is structural, not seasonal — deal duration shortening and budget pressure compound. AIDR pipeline >$50M is small relative to $5.5B ARR. At ~218× FY27E non-GAAP EPS, any miss triggers severe multiple compression. SBC 22% of revenue still distorts true economics.',
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
    note: 'Burry explicitly cites CRWD. FY26 actuals (basis for this block): SBC $1,097M (22.8% of revenue — extreme), GAAP NI -$162M (loss), buybacks $0. Headline FCF $1.31B drops to TRUE OWNER FCF ~$213M treating SBC as real cost — a 6× distortion. Diluted shares +15% over 5 years (218M → 252M pre-split; ~1.01B post 4-for-1 split), zero buyback offset. Q1 FY27 UPDATE: GAAP NI turned positive (+$27.8M) for the first time — operating leverage is breaking through. Full FY27 SBC data needed before the Burry block can be updated; 100% overstatement is a placeholder until then.',
  },
});
