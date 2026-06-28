import { defineStock } from './defineStock';

export const RDDT = defineStock({
  ticker: 'RDDT',
  name: 'Reddit, Inc.',
  sector: 'Internet / Social Media & Advertising',
  themeColor: '#ff4500',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 155,
  fairPriceRange: '$120 - $300',
  shares0: 185,           // ~185M shares; mkt cap ~$29B
  rev25: 1900,            // FY2025 revenue ~$1.9B; Q1 2026 $663M (+69% YoY)
  fcfMargin25: 0.25,
  taxRate: 0.18,
  cash: 1900,            // ~$1.9B cash, no debt — net cash
  debt: 0,
  beta: 1.7,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 4.92,          // FY2026E EPS consensus (raised from $4.14)
  rsRating: 82,           // Estimated — strong but volatile post-IPO; pulled back from highs
  rsTrend: 'flat',
  aiImpact: 'NEUTRAL',    // Two-sided: AI data-licensing is a tailwind, but AI answer-engines threaten referral traffic

  reasonsToBuy: [
    'Advertising revenue compounding extremely fast as Reddit monetizes a massive, highly-engaged community',
    'High-margin AI data-licensing stream (Google, OpenAI) adds durable, recurring revenue with almost no incremental cost',
    'Improving operating leverage — adjusted-EBITDA margins already strong and expanding as revenue scales',
    'Unique, hard-to-replicate corpus of human conversation that is increasingly valuable in the AI era',
    'Analyst targets sit well above the current price after the recent pullback',
  ],

  risksToBuy: [
    'AI answer-engines and zero-click search could erode the Google referral traffic that drives a big share of users',
    'Richly valued for a company only recently profitable, with earnings still small and volatile',
    'Advertising is cyclical — a downturn would hit ad budgets and the growth narrative quickly',
    'Heavy stock-based compensation dilutes shareholders and overstates reported profitability',
    'Post-IPO volatility and content/moderation/governance risks can drive sharp drawdowns',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 120, targetMedian: 225, targetHigh: 300, numAnalysts: 32 },

  epsCagr: [10, 20, 30],
  exitPE: [16, 22, 30],
  prob: [30, 45, 25],

  revGrowth: [
    [0.18, 0.14, 0.10, 0.08, 0.06],   // Bear: AI-search erodes traffic, ad growth stalls
    [0.35, 0.27, 0.20, 0.16, 0.12],   // Base: ad monetization + data licensing compound
    [0.45, 0.34, 0.26, 0.20, 0.16],   // Bull: international + new ad formats + licensing accelerate
  ],
  fcfMargin: [
    [0.20, 0.21, 0.22, 0.23, 0.24],
    [0.25, 0.28, 0.30, 0.32, 0.33],
    [0.28, 0.32, 0.35, 0.37, 0.39],
  ],
  exitMultiple: [14, 20, 28],
  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.0, 0.0, 0.005],
  ebitdaProxy: [0.25, 0.35, 0.42],
  bullMaOptVal: false,

  desc: [
    'AI answer-engines and zero-click search erode Google referral traffic; daily active uniques stall and ad growth decelerates sharply. ' +
      'EPS compounds only ~10% from the FY2026E $4.92 base and the market reprices Reddit as a sub-scale ad platform at ~16x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — elevated given the structural traffic risk.',
    'Reddit keeps compounding ad revenue (improving ARPU, more ad formats, international) while the AI data-licensing stream scales as a high-margin annuity. Adjusted-EBITDA margins expand toward the mid-30s. ' +
      'EPS compounds ~20% from the $4.92 base while the multiple normalizes toward ~22x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A fast-growing, newly-profitable platform at a reasonable-for-growth multiple — with real upside to the Street target.',
    'Ad monetization and data licensing both accelerate, international scales, and Reddit proves its corpus is a must-have AI training and grounding source. Operating leverage drives margins toward 40%. ' +
      'EPS compounds ~30% from the $4.92 base and the market awards a premium ~28x multiple. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: a large share of Reddit traffic arrives via Google search, and AI answer-engines increasingly satisfy queries without a click-through. If referral traffic erodes, user and ad growth stall just as the stock prices in years of compounding. ' +
      'Earnings are still small and volatile, SBC is heavy, and ads are cyclical. At {spot}, a traffic shock has no valuation floor.',
    'The bull data is real: ad revenue up ~70%, a high-margin AI data-licensing annuity (Google + OpenAI), expanding EBITDA margins, and a one-of-a-kind human-conversation corpus that AI labs need. After the pullback, the consensus target sits well above {spot}. ' +
      'The offsetting risk is the same AI wave — it both pays Reddit for data and threatens its referral traffic. Net: a fast grower at a fair-for-growth multiple with genuine upside. Verdict: BUY — own the monetization ramp, sized for the traffic risk.',
    'The bull case: Reddit becomes a core AI grounding/training source AND a top-tier ad platform, with international and new formats driving ARPU. Margins push toward 40% on operating leverage and {target} is achievable. ' +
      'The risk is the AI-search traffic threat and ad cyclicality. Probability 25% — high reward if the corpus proves indispensable and traffic holds.',
  ],

  burry: {
    sbc: 350,
    gaapNi: 900,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 55,
    overstatementSource: 'estimated',
    note: 'Critical/elevated. As a recent IPO, Reddit carries heavy stock-based comp (~$350M est.) relative to still-small GAAP NI (~$900M FY26E) = ~38% naive, and the post-IPO run amplifies the MTM owner-earnings cost. No buyback to offset. SBC is a genuine drag on per-share economics here — refresh with reported figures.',
  },

  debtSafety: {
    netDebt: -1900,
    ebitda: 700,
    fy: 'FY25',
    note: 'GREEN by Step 1 — net cash. ~$1.9B cash and no debt fund operations comfortably. The real risks for Reddit are traffic/competition and SBC dilution, not the balance sheet.',
  },
});
