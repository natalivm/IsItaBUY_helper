import { defineStock } from './defineStock';

export const DDOG = defineStock({
  ticker: 'DDOG',
  name: 'Datadog',
  sector: 'Observability / Cloud Monitoring',
  themeColor: '#632CA6',
  currentPrice: 202.84,
  fairPriceRange: '$95 - $200',
  shares0: 364,
  rev25: 3427,
  fcfMargin25: 0.29,
  taxRate: 0.18,
  cash: 4200,
  debt: 60,
  beta: 1.45,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 2.10,
  rsRating: 45,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/14',

  strategicNarrative:
    "Datadog is the dominant observability platform — FY25 revenue $3.43B (+28% YoY), LTM $3.67B sustaining ~29% growth. Unit economics are elite: 80% gross margin, 29% FCF margin, 120%+ net revenue retention from cross-product attach (logs, APM, security, RUM). " +
    "AI tailwind is real: more cloud complexity = more telemetry = more Datadog ingestion. GenAI workloads multiply observability spend per workload — DDOG is the picks-and-shovels for the AI cloud build-out. " +
    "The Burry problem: SBC is $783M LTM = 21.3% of revenue and a stunning 73.8% of FCF. The reported $1.06B free cash flow is mostly accounting addback of stock comp, not real cash earned for shareholders. GAAP operating margin is -0.6% LTM and bounces between small profits and losses quarter-to-quarter. " +
    "Zero buybacks — DDOG has never meaningfully offset its SBC issuance. Diluted shares 309M (FY21) → 364M (LTM) = +17.7% cumulative dilution, ~3.3%/yr. Better than Palantir's 6% but still material. " +
    "Valuation: at $140 / ~$51B market cap on $3.67B LTM revenue, forward P/S ~12-14×. On non-GAAP EPS of $2.10, forward P/E ~67×. Premium multiple priced for sustained 25-30% growth + eventual operating leverage. " +
    "Bull (~30%): Observability TAM expands with AI; DDOG captures another 30-40% of new spend; multi-product attach drives operating leverage to 20%+ margins by FY28; multiple sustains 60×+ → $230. " +
    "Base (~45%): Growth decelerates to 22-25% as base scales; margins inflect slowly toward 15%; multiple compresses to 45× → $170. " +
    "Bear (~25%): OpenTelemetry/Splunk-Cisco/Elastic price competition + lack of GAAP profitability triggers re-rating to 30× → $95. " +
    "HOLD — elite operational story, but SBC dependence makes the cash flow reported overstate real owner economics by ~3-4×. Burry-cited name; would be Tragic on a strict accounting view. Wait for $100-110 entry for real margin of safety.",

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
      'GAAP profitability remains elusive; SBC continues at 20%+ of revenue. Operating margin inflection delayed indefinitely. ' +
      'Multiple compresses from 67× to 30×. EPS grows at ~12% from $2.10 base. 5yr target ~$95-110, roughly -7% to -4% annualized.',
    'Observability stays mission-critical and DDOG maintains its premium positioning. AI workloads drive 25% revenue CAGR. Multi-product attach reaches 80%+ for enterprise accounts. ' +
      'Operating leverage gradually delivers: FCF margin expands to 35%, GAAP operating margin inflects to 8-10% by FY28. SBC ratio drops to 15% of revenue. ' +
      'Multiple compresses 67× → 45× through earnings growth. 5yr target ~$170, ~4% annualized — fair value with no margin of safety at current entry.',
    'Datadog becomes the default observability + security platform for the AI cloud era. AI workloads multiply telemetry 3-5× per workload, structurally expanding TAM. ' +
      'Operating leverage finally inflects: FCF margin to 43%, GAAP operating margin to 15%+. SBC ratio falls below 12% as revenue outgrows comp. ' +
      'Multiple holds 50-55× on AI infrastructure premium. EPS compounds at 28%+. 5yr target ~$230+, ~10% annualized.',
  ],

  thesis: [
    'OpenTelemetry standardization commoditizes the bottom of the observability stack; customers move logs/metrics to open standards and only retain DDOG for APM/RUM. ' +
      'Splunk-Cisco bundling and Elastic compete aggressively on price for the bottom 50% of the market. Hyperscalers (CloudWatch, Azure Monitor, GCP Cloud Operations) capture native deployments. ' +
      'Net retention drifts from 120% to 110% as expansion slows. SBC stays at 20%+ of revenue with no buyback offset — net dilution continues at 3-4%/yr. ' +
      'At 67× forward P/E, even modest growth deceleration combined with multiple compression delivers severe drawdown. GAAP operating losses prevent quality investors from owning the stock at scale.',
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
  prob: [25, 45, 30],

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
