import { defineStock } from './defineStock';

export const DDOG = defineStock({
  ticker: 'DDOG',
  name: 'Datadog',
  sector: 'Observability / Cloud Monitoring',
  themeColor: '#632CA6',
  currentPrice: 202.84,
  fairPriceRange: '$95 - $200',
  shares0: 372,        // FY26 guide: ~372M weighted-avg diluted shares
  rev25: 3427,
  fcfMargin25: 0.29,
  taxRate: 0.18,
  cash: 4200,
  debt: 60,
  beta: 1.45,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 2.40,       // 2026E EPS = FY26 non-GAAP EPS guide midpoint $2.36-$2.44 (prior FY25 basis $2.10). Q1 2026 revenue +32% accelerating; FY26 revenue guide 25-27%. Still non-GAAP — GAAP EPS far lower (SBC); P/E haircut applies (see burry).
  rsRating: 45,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Valuation + SBC-quality driven, NOT operational. Stock re-rated ~$140 → ~$203 (above $95-200 fair range); model would say STRONG BUY on baseEps $2.40 (+28% cumulative + quality boost) so the override is MORE necessary post-Q1, not less.
  updatedOn: '05/14',
  lastReportTag: 'Q1 2026',

  // Q1 2026 CALL UPDATE (May 7, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Exceptional operational quarter. Revenue $1.01B (+32% YoY — ACCELERATING
  // from 29% last Q, 25% year-ago; first $1B quarter), above guide high end.
  // QoQ +$53M (record Q1 add), +6% QoQ (best Q1 since 2022). Total ARR >$4B
  // (record sequential ARR add). Non-AI customer revenue accelerated to
  // mid-20s% (from 23%, 19%) — broad-based, not just AI. NRR low-120s (up
  // from ~120%); gross retention mid-high 90s. Customers ~33,200 (30,500
  // y/y); $100K+ ARR ~4,550 (3,770 y/y, 90% of ARR). New-logo annualized
  // bookings: all-time record, >2x y/y; avg land size record, >2x y/y.
  // Platform attach deepening: 56% use 4+ products, 35% 6+, 20% 8+. 26
  // products (5 >$100M ARR, 3 $50-100M). NEW: training market opening —
  // landed 7-fig + 8-fig annualized deals with AI research divisions at 2 of
  // the world's largest tech cos (hyperscaler super-intelligence labs) for
  // GPU/training-workload monitoring; previously inference-only. 6,500+
  // customers on AI integrations (20% of customers, 80% of ARR). FedRAMP
  // High cert; UK data center planned; bring-your-own-cloud product traction.
  // FINANCIALS (non-GAAP): gross margin 80.2% (81.4% last Q, 80.3% y/y),
  // op income $223M / 22% margin (24% last Q — OpEx +31% y/y, no leverage
  // inflection yet). FCF $289M, 29% margin. Cash $4.8B. Billings $1.03B
  // (+37%); RPO $3.48B (+51%), cRPO mid-40s%. GUIDE: Q2 rev $1.07-1.08B
  // (29-31%), non-GAAP EPS $0.57-0.59; FY26 rev $4.3-4.34B (25-27%),
  // non-GAAP op margin 22-23%, non-GAAP EPS $2.36-2.44, 21% tax, capex
  // 4-5% of rev. Extra conservatism applied to largest customer (unchanged
  // methodology). Net: thesis operationally validated; HOLD is now a
  // valuation/SBC call, not an execution doubt — stock above fair range.
  // ─────────────────────────────────────────────────────────────────────────

  strategicNarrative:
    "Datadog is the dominant observability platform. Q1 2026 was exceptional: revenue $1.01B (+32% YoY, ACCELERATING from 29% and 25%; first $1B quarter), total ARR >$4B, NRR back up to low-120s, record new-logo bookings (>2x y/y). Critically, non-AI revenue also re-accelerated to mid-20s% — strength is broad-based, not just AI. " +
    "AI tailwind is real and widening: a NEW training/GPU-monitoring market is opening — DDOG landed 7- and 8-figure annualized deals with the AI research divisions of two of the world's largest tech companies (hyperscaler super-intelligence labs), a category it explicitly did not serve a year ago. Picks-and-shovels for the AI cloud build-out. " +
    "The Burry problem is unchanged: SBC ~$780M LTM (~21% of revenue, ~3/4 of reported FCF). Reported FCF is mostly an accounting addback of stock comp, not owner cash. GAAP operating margin hovers near breakeven; non-GAAP op margin actually slipped to 22% (from 24% QoQ) on +31% OpEx — no operating-leverage inflection yet. " +
    "Zero buybacks — DDOG has never meaningfully offset its SBC issuance. Diluted shares 309M (FY21) → ~372M (FY26E) ≈ +20% cumulative, ~3.7%/yr. " +
    "Valuation is the binding constraint: at ~$203 / ~$75B market cap on FY26 revenue ~$4.32B, forward P/S ~17×; on FY26 non-GAAP EPS $2.40, forward P/E ~85×. The stock has re-rated well above the $95–200 fair range — priced for sustained 25-30% growth AND a margin inflection that has not started. " +
    "Bull (~35%): AI super-cycle + training TAM; DDOG captures disproportionate new spend; attach drives leverage to 20%+ margins; multiple holds 55× → ~$530 (5yr). " +
    "Base (~45%): growth decelerates to 22-25% as base scales; margins inflect slowly; multiple compresses to 40× → ~$260 (~5%/yr). " +
    "Bear (~20%): OpenTelemetry/Splunk-Cisco/Elastic competition + persistent non-GAAP-only profitability triggers re-rating to 25× → ~$97 (~-14%/yr). " +
    "HOLD — operationally the thesis is now validated, but SBC dependence overstates owner economics ~3-4× and the post-run valuation removes any margin of safety. Burry-cited name; Tragic on a strict accounting view. Wait for a meaningful pullback for real margin of safety.",

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 170, targetHigh: 230, numAnalysts: 38 },

  revGrowth: [
    [0.18, 0.15, 0.12, 0.10, 0.08], // Bear: competition + macro slowdown
    [0.25, 0.22, 0.18, 0.15, 0.13], // Base: continued attach + AI workload growth
    [0.32, 0.28, 0.24, 0.20, 0.17], // Bull: observability super-cycle with AI
  ],

  fcfMargin: [
    [0.27, 0.26, 0.25, 0.25, 0.24], // Bear: margins compress as competition intensifies
    [0.30, 0.32, 0.34, 0.35, 0.36], // Base: gradual operating leverage
    [0.32, 0.35, 0.38, 0.41, 0.43], // Bull: scale benefits + SBC ratio improves
  ],

  exitMultiple: [20, 30, 45],

  desc: [
    'OpenTelemetry standardization + Splunk-Cisco bundling + Elastic price competition erode DDOG\'s premium. Customer expansion slows to mid-teens. ' +
      'GAAP profitability remains elusive; SBC continues at ~21% of revenue. Operating margin inflection delayed indefinitely. ' +
      'Multiple compresses from ~85× to 25×. EPS grows at ~10% from $2.40 base. 5yr target ~$95-100, roughly -14% annualized from the re-rated ~$203 entry.',
    'Observability stays mission-critical and DDOG maintains its premium positioning. AI workloads drive ~22-25% revenue CAGR. Multi-product attach reaches 80%+ for enterprise accounts. ' +
      'Operating leverage gradually delivers: FCF margin expands to 35%, GAAP operating margin inflects to 8-10% by FY29. SBC ratio drops toward 15% of revenue. ' +
      'Multiple compresses ~85× → 40× through earnings growth. 5yr target ~$260, ~5% annualized — fair value with no margin of safety at current entry.',
    'Datadog becomes the default observability + security platform for the AI cloud era. AI training + inference workloads multiply telemetry per workload, structurally expanding TAM. ' +
      'Operating leverage finally inflects: FCF margin to 43%, GAAP operating margin to 15%+. SBC ratio falls below 12% as revenue outgrows comp. ' +
      'Multiple holds ~55× on AI infrastructure premium. EPS compounds at ~32%. 5yr target ~$530, ~21% annualized.',
  ],

  thesis: [
    'OpenTelemetry standardization commoditizes the bottom of the observability stack; customers move logs/metrics to open standards and only retain DDOG for APM/RUM. ' +
      'Splunk-Cisco bundling and Elastic compete aggressively on price for the bottom 50% of the market. Hyperscalers (CloudWatch, Azure Monitor, GCP Cloud Operations) capture native deployments. ' +
      'Net retention drifts from 120% to 110% as expansion slows. SBC stays at 20%+ of revenue with no buyback offset — net dilution continues at 3-4%/yr. ' +
      'At ~85× forward P/E (post Q1 2026 re-rating to ~$203), even modest growth deceleration combined with multiple compression delivers severe drawdown. GAAP operating losses prevent quality investors from owning the stock at scale.',
    'AI workloads expand observability TAM. Cloud-native enterprises continue migrating from on-prem monitoring to DDOG. Multi-product attach drives 120%+ NRR. ' +
      'Operating leverage is real but slow — 5-7 years to reach Salesforce-style margins. SBC ratio gradually improves from 21% to 14-15% of revenue. ' +
      'Buybacks start in 2027-2028 once cash position justifies it. Multiple compresses gradually as growth normalizes. ' +
      'Quality SaaS at fair price; returns mostly from EPS growth, not multiple expansion.',
    'AI super-cycle for observability: every LLM call needs traces, every model deployment needs monitoring, every agent needs telemetry. DDOG captures disproportionate share of the new AI-native workload spend. ' +
      'Cloud security expansion (CSPM, runtime, posture) creates a second growth engine. Datadog Cloud Cost Management + AI-native incident response add net-new revenue streams. ' +
      'Operating leverage inflects in FY27-28 as the existing customer base monetizes 6+ products. GAAP profitability arrives durably. SBC ratio falls below 12%. ' +
      'Market awards 50-60× premium given platform position. 28%+ EPS CAGR delivers 8-12% annualized returns.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.000, 0.005, 0.010],
  ebitdaProxy: [0.12, 0.22, 0.32],
  bullMaOptVal: false,

  epsCagr: [10, 22, 32],
  exitPE: [25, 40, 55],
  prob: [20, 45, 35],     // Post-Q1 2026: accelerating growth (32%, broad-based) + new training/hyperscaler TAM + record new-logo bookings weaken the bear competition/decel case (25→20) and strengthen the bull AI-supercycle case (30→35); base unchanged. Display weighting only — HOLD override (valuation/SBC) is unaffected.

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 751,
    gaapNi: 136,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 90,
    overstatementSource: 'estimated',
    note: 'Tragic — Burry explicitly cites DDOG in his Cassandra Unchained list. TIKR FY25 actuals: SBC $751M (21.3% of revenue — extreme), GAAP NI just $136M LTM (operating margin barely positive). Smoking-gun number: SBC = 73.8% of reported FCF, meaning ~3/4 of the "cash flow" is just adding back the cost of paying employees in stock. Zero buybacks across all years. Diluted shares +17.7% over 5y. Naive SBC/NI = 553% — formula breaks down. baseEps $2.10 is non-GAAP (GAAP EPS is ~$0.37); a meaningful P/E haircut applies. The 90% estimate reflects Burry-cited tier + extreme SBC dependence partially offset by elite gross margins and revenue growth that could eventually justify the comp structure if operating leverage inflects.',
  },
});
