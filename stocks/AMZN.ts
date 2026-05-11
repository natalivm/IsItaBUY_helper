import { defineStock } from './defineStock';

export const AMZN = defineStock({
  ticker: 'AMZN',
  name: 'Amazon.com',
  sector: 'E-commerce / Cloud / AI Infrastructure',
  themeColor: '#ff9900',
  currentPrice: 272.68,
  fairPriceRange: '$220 - $420',
  shares0: 10800,
  rev25: 716920,
  fcfMargin25: 0.06,
  taxRate: 0.18,
  cash: 100000,
  debt: 60000,
  beta: 1.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 9.50,
  rsRating: 52,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  updatedOn: '05/10',

  strategicNarrative:
    "Amazon is the dominant cloud + e-commerce + ads platform — 2025 revenue $716.9B (+12% YoY), GAAP NI $77.7B (+31%), Q1 2026 EPS $2.78 vs $1.63 estimate (a 70% beat). " +
    "Three engines firing: (1) AWS — leading hyperscaler with structural AI infra demand (Trainium 2/3, Bedrock, agentic AI), (2) Retail — operating margin expanding past 9% on logistics density and automation, (3) Ads — third-largest digital ad platform behind GOOG/META, fastest-growing of the three. " +
    "AI capex bet is massive (~$100B+/yr) but unlike pure software peers, Amazon owns the customers (AWS workloads + Prime + Alexa) — the capex translates more directly to revenue. Q1 2026 13.1% operating margin is a record. " +
    "Capital allocation philosophy: zero buybacks, full reinvestment. SBC $19.5B (~2.7% of revenue) is high in absolute terms but small relative to NI ($77.7B). Burry chart flags 21% overstatement — meaningful but bottom of the Elevated tier. " +
    "Bull (~30%): AWS sustains 17%+ growth, retail margin expands to 11%, ads scale past $80B → $410+. " +
    "Base (~50%): AWS 15%, retail margin 9-10%, ads 25% growth, EPS compounds 22% → $310. " +
    "Bear (~20%): AWS decelerates to single digits, AI capex doesn't ROI, retail margin compresses → $220. " +
    "At $272 / forward P/E ~28× on FY26E EPS ~$10, Amazon screens reasonable for the AI-tailwind cohort. The Burry haircut is real but the underlying earnings growth more than compensates over a 5yr horizon.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 240, targetMedian: 320, targetHigh: 410, numAnalysts: 65 },

  revGrowth: [
    [0.08, 0.07, 0.06, 0.06, 0.05],
    [0.13, 0.12, 0.11, 0.10, 0.09],
    [0.16, 0.15, 0.13, 0.12, 0.11],
  ],
  fcfMargin: [
    [0.05, 0.06, 0.07, 0.08, 0.09],
    [0.07, 0.08, 0.10, 0.11, 0.12],
    [0.09, 0.11, 0.13, 0.14, 0.15],
  ],
  exitMultiple: [14, 18, 24],

  desc: [
    'AI capex bet underwhelms — AWS growth normalizes to high-single digits as enterprise AI adoption is slower than hyped. Retail margin expansion stalls at 8% as labor costs persist. Ads growth slows. ' +
      'EPS compounds at ~12% but the market re-rates AMZN from secular grower to mature platform at 22× P/E. 5yr target ~$220, ~-4% annualized.',
    'AWS sustains 15% growth on durable AI infra demand. Retail operating margin expands to 9-10% on automation and logistics density. Ads scale to $80B+ at 25% YoY. AI capex peaks 2026-27 then moderates, FCF inflects strongly. ' +
      'EPS compounds at ~22%. Multiple compresses 30× → 24× through earnings growth. 5yr target ~$310, ~3% annualized.',
    'AI super-cycle: AWS dominates AI infra (Trainium ramps, Bedrock scales, AGI workloads emerge). Retail margin pushes 11%+ on full automation + Project Kuiper (satellite internet) cross-sell. Ads exceed $100B by FY28. ' +
      'EPS compounds at ~30% on all-three-engines firing. Premium 30× multiple held. 5yr target ~$410+, ~9% annualized.',
  ],

  thesis: [
    'AI capex cycle peaks before AWS sees durable enterprise revenue conversion. Hyperscalers consolidate workloads on Microsoft Azure (OpenAI exclusive) and Google Cloud (Gemini, internal AI), squeezing AWS growth to high-single digits. ' +
      'Retail operating margin expansion slows as wage pressure and tariff costs absorb productivity gains. Ads growth decelerates as TikTok / Meta capture incremental dollars. ' +
      'Massive AI capex ($100B+/yr) without revenue payback compresses FCF for 2-3 years. Multiple re-rates to 22× as Amazon transitions from secular grower to mature platform.',
    'AWS proves to be the de-facto enterprise AI infrastructure provider for the Fortune 1000 — Trainium/Inferentia competitive with NVDA on price/performance, Bedrock as the model marketplace, AgentCore as the agentic AI runtime. ' +
      'Retail margin expansion is real and durable (third-party seller mix + automation + Project Kuiper logistics). Ads becomes a $100B+ business by 2028. ' +
      'AI capex peaks in 2026-2027 then moderates, FCF inflects sharply higher. Quality compounder at fair multiple.',
    'AI super-cycle plays out fully: AWS dominates inference and agentic AI workloads (the larger TAM beyond training). Project Kuiper satellite constellation enables global low-latency cloud + retail + ads in emerging markets. ' +
      'Retail platform becomes the AI-native commerce OS — agents buy on behalf of consumers, dramatically expanding wallet share. Ads at $100B+ approaches Meta\'s scale but with first-party shopper intent data (more valuable). ' +
      'Operating leverage drives margins to 13-15% structurally. EPS compounds 30%+. Premium AI-tailwind multiple holds at 30×.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.0, 0.0, 0.0],
  ebitdaProxy: [0.14, 0.18, 0.22],
  bullMaOptVal: false,

  epsCagr: [12, 22, 30],
  exitPE: [22, 28, 34],
  prob: [20, 50, 30],

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
