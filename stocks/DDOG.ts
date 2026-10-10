import { defineStock } from './defineStock';

export const DDOG = defineStock({
  ticker: 'DDOG',
  name: 'Datadog',
  sector: 'Observability / Cloud Monitoring',
  themeColor: '#632CA6',
  currentPrice: 293.26,
  fairPriceRange: '$120 - $270',
  shares0: 376,        // FY26 guide (Q2 2026 update): ~376M weighted-avg diluted shares
  rev25: 3427,
  fcfMargin25: 0.29,
  taxRate: 0.18,
  cash: 5000,          // Q2 2026: $435M cash + $4.55B marketable securities
  debt: 1000,          // 0% convertible notes due 2029 ($1.0B principal)
  beta: 1.45,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 2.52,       // 2026E EPS = FY26 non-GAAP EPS guide midpoint $2.50-$2.54 (raised at Q2 2026 from $2.36-$2.44; FY25 basis $2.10). Q2 2026 revenue +36% (4th straight quarter of acceleration); FY26 revenue guide $4.45-4.47B (~30%). Still non-GAAP — GAAP EPS far lower (SBC); P/E haircut applies (see burry).
  rsRating: 94,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Valuation/SBC-quality driven, NOT operational. Post-Q2 2026 the EPS_PE base case lands ~at spot (~0% 5y CAGR) — model itself reads HOLD only via the TAILWIND quality boost. Stock ran ~$215 → ~$293 in Sep-Oct on accelerating growth, ~116× 2026E non-GAAP EPS. HOLD stands on the rich multiple + high SBC despite RS 94 (rising); the override keeps it out of PRIME_GROWTH if the model ever flips to BUY on a pullback.
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',

  // Q2 2026 UPDATE (Aug 6, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Another beat-and-raise. Revenue $1.12B (+36% YoY — 4th consecutive
  // quarter of acceleration: 25% → 29% → 32% → 36%), vs $1.08B consensus and
  // $1.07-1.08B guide. ARR ~$4.71B (+~36%). $100K+ ARR customers ~4,720
  // (+23% y/y). Non-GAAP gross margin 80%; non-GAAP op income $257M / 23%
  // margin (22% last Q, 20% y/y — first sign of operating leverage). GAAP op
  // income just $5.5M (~0%); GAAP NI $44.6M ($0.12/sh). SBC $220M in the
  // quarter (~20% of revenue, $417M H1). OCF $316M, FCF $279M (25% margin).
  // Cash + securities ~$5.0B vs $1.0B 0% converts due 2029. Non-GAAP EPS
  // $0.65 vs $0.58 consensus. Largest customer cut usage — mgmt says ex-that
  // customer growth is about the same, and guidance is "fully de-risked" for
  // it. Launched Bits AI agents (Code/Chat/Agent Builder) GA, AI Guard, BYOC;
  // acquired Adaptive ML (RL ops); Gartner MQ Leader 6th year.
  // GUIDE: Q3 rev $1.135-1.145B, non-GAAP op income $260-270M (23-24%), EPS
  // $0.63-0.65 on ~378M shares. FY26 rev $4.45-4.47B (from $4.30-4.34B, ~30%
  // growth), op income $1.01-1.03B, EPS $2.50-2.54 (from $2.36-2.44) on ~376M.
  // Stock fell ~17-21% on the print (high bar + largest-customer cut), then
  // rallied from ~$215 (early Sep) to ~$293 (Oct 9) — new highs. Net: the
  // operating thesis keeps strengthening; at ~116× 2026E non-GAAP EPS the
  // base case only reaches spot in 5 years, so HOLD remains a valuation call.
  // ─────────────────────────────────────────────────────────────────────────

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

  reasonsToBuy: [
    'Dominant observability platform with accelerating revenue growth and record new-logo bookings across broad enterprise base',
    'AI training and GPU-monitoring is a brand-new TAM where DDOG is landing landmark hyperscaler deals',
    'Multi-product platform attach deepening — majority of enterprise customers now use many products simultaneously',
    'Net revenue retention recovering above prior levels, confirming durable expansion within the installed base',
    'Picks-and-shovels positioning means DDOG benefits from AI infrastructure spend regardless of which model wins',
  ],

  risksToBuy: [
    'Stock trades well above the model fair-value range, offering no margin of safety at current levels',
    'SBC consumes roughly three-quarters of reported free cash flow, so owner economics are far worse than headline FCF',
    'GAAP operating profitability is barely positive with no clear inflection in sight despite years of rapid growth',
    'OpenTelemetry standardization and aggressive pricing from Elastic and Cisco-Splunk threaten the premium positioning',
    'Zero buyback history means continuous share dilution erodes per-share value at a steady multi-percent annual rate',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 139, targetMedian: 270, targetHigh: 330, numAnalysts: 32 },  // Benzinga/tickzen aggregates, late Aug - early Sep 2026 (pre Sep-Oct rally)

  revGrowth: [
    [0.28, 0.16, 0.12, 0.10, 0.08], // Bear: FY26 ~locked near guide (~30%), then competition + largest-customer churn + macro slowdown
    [0.30, 0.24, 0.20, 0.16, 0.13], // Base: FY26 at raised guide; continued attach + AI workload growth
    [0.33, 0.29, 0.25, 0.21, 0.17], // Bull: FY26 beat-and-raise again; observability super-cycle with AI
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
      'Multiple compresses from ~116× to 25×. EPS grows at ~10% from $2.52 base. 5yr target {target}, {cagr} annualized ({return} vs {spot}).',
    'Observability stays mission-critical and DDOG maintains its premium positioning. AI workloads drive ~22-25% revenue CAGR. Multi-product attach reaches 80%+ for enterprise accounts. ' +
      'Operating leverage gradually delivers: FCF margin expands to 35%, GAAP operating margin inflects to 8-10% by FY29. SBC ratio drops toward 15% of revenue. ' +
      'Multiple compresses ~116× → 40× through earnings growth (EPS ~24% CAGR from $2.52). 5yr target {target}, {cagr} annualized — fair value with no margin of safety at current entry.',
    'Datadog becomes the default observability + security platform for the AI cloud era. AI training + inference workloads multiply telemetry per workload, structurally expanding TAM. ' +
      'Operating leverage finally inflects: FCF margin to 43%, GAAP operating margin to 15%+. SBC ratio falls below 12% as revenue outgrows comp. ' +
      'Multiple holds ~55× on AI infrastructure premium. EPS compounds at ~32%. 5yr target {target}, {cagr} annualized.',
  ],

  thesis: [
    'OpenTelemetry standardization commoditizes the bottom of the observability stack; customers move logs/metrics to open standards and only retain DDOG for APM/RUM. ' +
      'Splunk-Cisco bundling and Elastic compete aggressively on price for the bottom 50% of the market. Hyperscalers (CloudWatch, Azure Monitor, GCP Cloud Operations) capture native deployments. ' +
      'Net retention drifts from 120% to 110% as expansion slows. SBC stays at 20%+ of revenue with no buyback offset — net dilution continues at 3-4%/yr. ' +
      'At ~116× 2026E non-GAAP EPS (after the Sep-Oct 2026 run to ~$293), even modest growth deceleration combined with multiple compression delivers severe drawdown. GAAP operating losses prevent quality investors from owning the stock at scale.',
    'AI workloads expand observability TAM. Cloud-native enterprises continue migrating from on-prem monitoring to DDOG. Multi-product attach drives 120%+ NRR. ' +
      'Operating leverage is real but slow — 5-7 years to reach Salesforce-style margins. SBC ratio gradually improves from 21% to 14-15% of revenue. ' +
      'Buybacks start in 2027-2028 once cash position justifies it. Multiple compresses gradually as growth normalizes. ' +
      'Quality SaaS at fair price; returns mostly from EPS growth, not multiple expansion.',
    'AI super-cycle for observability: every LLM call needs traces, every model deployment needs monitoring, every agent needs telemetry. DDOG captures disproportionate share of the new AI-native workload spend. ' +
      'Cloud security expansion (CSPM, runtime, posture) creates a second growth engine. Datadog Cloud Cost Management + AI-native incident response add net-new revenue streams. ' +
      'Operating leverage inflects in FY27-28 as the existing customer base monetizes 6+ products. GAAP profitability arrives durably. SBC ratio falls below 12%. ' +
      'Market awards 50-60× premium given platform position. ~32% EPS CAGR delivers {cagr} annualized ({target}).',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.000, 0.005, 0.010],
  ebitdaProxy: [0.12, 0.22, 0.32],
  bullMaOptVal: false,

  epsCagr: [10, 24, 32],   // Base 22→24 at Q2 2026: revenue accelerated to 36% and non-GAAP op margin expanded 3pts y/y (20%→23%) — leverage is starting to show
  exitPE: [25, 40, 55],
  prob: [20, 45, 35],     // Unchanged at Q2 2026 (largest-customer usage cut offsets a 4th quarter of acceleration). Post-Q1 2026: accelerating growth (32%, broad-based) + new training/hyperscaler TAM + record new-logo bookings weaken the bear competition/decel case (25→20) and strengthen the bull AI-supercycle case (30→35); base unchanged. Display weighting only — HOLD override (valuation/SBC) is unaffected.

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

  debtSafety: {
    netDebt: -4000,        // $1.0B 0% converts − ~$5.0B cash & securities (Q2 2026)
    ebitda: 1100,          // LTM non-GAAP op income (~$0.95B) + D&A — approximate
    fy: 'LTM Q2 2026',
    note: 'Net cash ~$4B; only debt is $1B of 0% convertible notes due 2029. Leverage is a non-issue.',
  },

  burry: {
    sbc: 751,
    gaapNi: 136,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 90,
    overstatementSource: 'estimated',
    note: 'Tragic — Burry explicitly cites DDOG in his Cassandra Unchained list. TIKR FY25 actuals: SBC $751M (21.3% of revenue — extreme), GAAP NI just $136M LTM (operating margin barely positive). Smoking-gun number: SBC = 73.8% of reported FCF, meaning ~3/4 of the "cash flow" is just adding back the cost of paying employees in stock. Zero buybacks across all years. Diluted shares +17.7% over 5y. Naive SBC/NI = 553% — formula breaks down. baseEps $2.52 (FY26 guide) is non-GAAP (FY25 GAAP EPS was ~$0.37; Q2 2026 GAAP EPS $0.12 vs non-GAAP $0.65); a meaningful P/E haircut applies. The 90% estimate reflects Burry-cited tier + extreme SBC dependence partially offset by elite gross margins and revenue growth that could eventually justify the comp structure if operating leverage inflects.',
  },
});
