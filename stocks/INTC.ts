import { defineStock } from './defineStock';

export const INTC = defineStock({
  ticker: 'INTC',
  name: 'Intel Corporation',
  sector: 'Semiconductors / CPU & Foundry',
  themeColor: '#0071c5',
  updatedOn: '05/31',
  lastReportTag: 'Q1 FY26',
  currentPrice: 114.68,
  fairPriceRange: '$20 - $145',
  shares0: 5080,          // ~5.08B diluted shares (Q1 FY26)
  rev25: 52500,           // FY2025 revenue ~$52.5B
  fcfMargin25: -0.02,     // FCF negative — massive foundry CapEx cycle
  taxRate: 0.10,
  cash: 24000,
  debt: 44000,
  beta: 1.5,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 0.90,          // FY2026E non-GAAP EPS estimate (Q1 $0.29 + Q2 guide $0.20 + H2 ~$0.41)
  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  strategicNarrative:
    "Intel is 2026's most dramatic semiconductor comeback story — the stock +225% YTD, April alone +114% (best month in the company's 55-year Nasdaq history), driven by a perfect storm of narrative catalysts. " +
    "(1) CHIPS Act anchoring: in August 2025, the Trump administration took a 10% equity stake via $8.9B in grants, with NVIDIA and SoftBank following with strategic equity investments — validating the foundry thesis at the highest institutional level. " +
    "(2) Apple-Intel foundry deal: a preliminary agreement for Intel to manufacture Apple device chips in US fabs. If completed at scale, Apple's chip volumes would rival TSMC's entire top-5 customer base combined — potentially $20-30B in annual foundry revenue. " +
    "(3) Data center CPU recovery: Q1 FY26 DC revenue +22% YoY to $5.1B on AI server demand; Q2 FY26 guidance $13.8-14.8B; EPS Est % Chg current quarter +309% (from very low base). " +
    "IBD technical picture is near-perfect: RS Rating 99, Acc/Dist A-, Industry Group Rank #8/142 (A+), Up/Down Volume 1.73, funds owning +4% over 3 consecutive quarters of increasing institutional accumulation. 10 straight quarters of EPS acceleration. " +
    "But the fundamentals behind the story remain challenged: Annual Pre-Tax Margin -29, ROE -3, 3-yr Sales Growth -1.0%, SMR Rating D. FY2025 GAAP EPS $(0.06), non-GAAP just $0.42. " +
    "Q1 FY26 non-GAAP $0.29, Q2 FY26 guide only $0.20 — Intel Foundry loses $7-12B/year at operating line, crushing the product segment's economics. The entire thesis hinges on foundry achieving scale and breakeven by 2028-2030. " +
    "The stock at $114.68 sits 41% above its 50-day MA and -13.6% off its 52-week high, pricing in near-perfect execution of a multi-year foundry transformation. " +
    "EPS model (baseEps $0.90 FY26E non-GAAP): bear ($1.45 × 12x = $17), base ($2.75 × 18x = $50), bull ($5.77 × 25x = $144) — probability-weighted ~$67, implying -42% from current levels. " +
    "Only the bull scenario — Apple at full production scale by 2028, additional hyperscaler wins, foundry breakeven, 45% EPS CAGR for 5 years — justifies $115+. " +
    "HOLD: the foundry narrative is real, government-backed, and institutionally validated, but buying at current levels (41% above 50-day MA, -42% model downside) offers no fundamental margin of safety. " +
    "Best entry zone $70-85, where the base-case EPS path approaches fair value. Strong momentum argues against shorting; the key downside triggers are Apple deal delays/downsizing or a foundry margin update below expectations.",

  analystConsensus: { rating: 'Hold', targetLow: 20, targetMedian: 88, targetHigh: 150, numAnalysts: 48 },

  epsCagr: [10, 25, 45],
  exitPE: [12, 18, 25],
  prob: [20, 55, 25],

  revGrowth: [
    [0.02, 0.02, 0.03, 0.03, 0.03],   // Bear: products stagnate, foundry marginal wins
    [0.07, 0.09, 0.11, 0.10, 0.08],   // Base: products stabilize, foundry ramps slowly
    [0.10, 0.18, 0.25, 0.22, 0.18],   // Bull: Apple deal adds massive foundry revenue from 2028
  ],

  fcfMargin: [
    [-0.02, 0.00, 0.01, 0.02, 0.02],  // Bear: CapEx stays heavy, breakeven not achieved
    [0.01, 0.03, 0.05, 0.07, 0.08],   // Base: CapEx normalizes, FCF turns positive by 2028
    [0.04, 0.07, 0.11, 0.14, 0.16],   // Bull: foundry scale drives margin expansion
  ],

  exitMultiple: [7, 12, 18],

  desc: [
    'Foundry fails to win meaningful commercial customers — Apple deal is delayed, scoped down, or falls through. Products face increasing ARM competition in client computing and AMD pressure in data center. ' +
      'Intel Foundry CapEx ($15-18B/yr) continues without commensurate revenue growth; non-GAAP EPS compounds at only ~10% annually from the FY26 base. ' +
      'Market reprices Intel as a challenged legacy chipmaker at 12× FY31E non-GAAP EPS ~$1.45. 5-yr target: ~$17 (-85% from current), roughly -28% annualized. ' +
      'Probability: 20% — requires the Apple deal to materially disappoint AND the government narrative to lose market credibility.',
    'Foundry achieves modest but real scale: Apple preliminary agreement enters limited production by 2028-2029, Google Cloud adds volume, but breakeven pushed to 2030. ' +
      'Products segment stabilizes — Xeon holds data center position, AI PC provides modest tailwind, ARM attrition is gradual rather than sudden. ' +
      'Restructuring savings + volume leverage compound non-GAAP EPS at ~25% from the FY26 base, reaching ~$2.75 by FY31. P/E compresses as turnaround premium fades. ' +
      '5-yr target: ~$50 (-56% from current), roughly -15% annualized. Intel executes the roadmap; the stock simply priced in too much, too fast.',
    'Apple deal enters full production by 2028: iPhone A-series and Mac M-series manufactured at Intel US fabs, adding $18-25B in high-margin foundry revenue annually. ' +
      'Google Cloud and NVIDIA training chips follow, creating a credible US-based TSMC alternative with government contracts as anchor. ' +
      'Foundry reaches breakeven by 2028, profitability 2029+. Non-GAAP EPS compounds at ~45% from FY26 base to ~$5.77 by FY31; market awards 25× on confirmed foundry leadership. ' +
      '5-yr target: ~$144 (+25% from current), roughly +5% annualized — barely rewarding given the execution risk required over 5 years. ' +
      'Probability: 25% — requires both perfect execution AND the Apple deal to materialize at full volume.',
  ],

  thesis: [
    'Bear mechanics: foundry contracts require 2-3 year qualification cycles; Apple deal has no confirmed start date or volume. ' +
      'Intel 18A process node delays have historically slipped 6-12 months — each slip extends the foundry loss period. ' +
      'ARM-based PCs (Apple Silicon, Qualcomm Snapdragon) already command 15%+ of the thin-and-light market; if ARM reaches 25-30%, Intel client margins compress materially. ' +
      'The $40B+ gross debt load and negative FCF constrain financial flexibility if the turnaround extends beyond 2030. ' +
      'At $115, even a base-case execution delivers 15% annual losses — bear case is catastrophic. The margin of safety is entirely narrative-dependent.',
    'Post Q1 FY26 update, the recovery trajectory is real: DC CPU +22%, 10 consecutive quarters of EPS acceleration, Q2 guide above consensus. ' +
      'CHIPS Act backing + NVIDIA/SoftBank equity investments means Intel has the financial runway to execute the 2028 foundry roadmap. ' +
      'Lip-Bu Tan (CEO since 2024) is one of Silicon Valley\'s most respected operators — he rebuilt Cadence; his restructuring credibility is the key intangible. ' +
      'The base case delivers real EPS growth (~25% CAGR) but the stock already prices it and more — 5-yr probability-weighted target ~$67 vs $115 implies the market is pricing partial-bull execution at base-case probability. ' +
      'Verdict: business is on the right track; entry price is not.',
    'The bull case requires two simultaneous wins: Apple production volume (not just a pilot) AND foundry margin expansion above zero. ' +
      'Apple historically captures 50-60% of TSMC\'s top revenue tier. If Intel gets even half that volume at 20% foundry margins, that\'s $8-12B in annual foundry profit by 2030. ' +
      'Combined with products at $3-4B non-GAAP, EPS of $5-7 by FY31 is achievable; at 25x P/E → $125-175 stock. ' +
      'The risk: TSMC has a 5-year lead in process technology, yields, and customer trust. Intel 18A at 1.8nm must prove yield economics at Apple-scale volumes — never done before. ' +
      'Probability 25% — a genuine strategic optionality worth owning, but not at $115 where you are already paying for most of the bull case.',
  ],

  termGrowth: [0.015, 0.020, 0.025],
  bbRate: [0.002, 0.005, 0.010],
  ebitdaProxy: [0.10, 0.18, 0.28],
  bullMaOptVal: false,

  burry: {
    sbc: 3500,
    gaapNi: -300,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'GAAP-loss year (NI $(0.3)B) — Burry framework inapplicable. Employee SBC ~$3.5B vs non-GAAP NI $1.9B = ~184% naive ratio; even at 1× MTM amplifier (stock near multi-year lows in FY24-25), real owner earnings are deeply negative. The dramatic 2026 re-rating amplifies future MTM cost substantially.',
  },

  debtSafety: {
    netDebt: 22000,
    ebitda: 15000,
    fy: 'FY25',
    note: 'Net debt ~$22B (gross debt $44B − cash $22B). EBITDA est. ~$15B (OCF $9.7B + D&A ~$14B approx). Leverage ~1.5× GREEN. Negative FCF from foundry CapEx is the real risk — not leverage ratio.',
  },
});
