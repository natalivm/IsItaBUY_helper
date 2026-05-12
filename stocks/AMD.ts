import { defineStock } from './defineStock';

export const AMD = defineStock({
  ticker: 'AMD',
  name: 'Advanced Micro Devices',
  sector: 'Semiconductors / AI Compute',
  themeColor: '#ed1c24',
  currentPrice: 448.29,
  fairPriceRange: '$280 - $650',
  shares0: 1620,
  rev25: 34600,
  fcfMargin25: 0.13,
  taxRate: 0.13,
  cash: 5500,
  debt: 1700,
  beta: 1.85,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 5.50,
  rsRating: 97,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/12',

  strategicNarrative:
    "AMD is no longer a turnaround story — it is a high-expectation AI infrastructure bet. Q1 FY26 delivered $10.3B revenue (+38% YoY), GAAP EPS $0.84 (+91%), non-GAAP $1.37 (+43%), record FCF $2.6B, gross margin 53% GAAP / 55% non-GAAP — operating leverage finally working. " +
    "Data Center is now the engine: $5.8B (+57% YoY), driven by Instinct MI300/MI450 ramp, EPYC server CPU share gains, and hyperscaler adoption (AWS, Azure, Google, Meta partnership). " +
    "Client + Gaming $3.6B (+23%) is healthy but secondary; Embedded $873M (+6%) is stable. Q2'26 guide: $11.2B revenue, ~56% gross margin — momentum holding. " +
    "The catch: stock is +112% YTD / +347% 1Y, RSI ~80, forward P/E ~35× on FY27E EPS ~$13 (Bernstein bull-target $525) — market is pricing high-base + partial-bull. Operating expenses +34% YoY signal aggressive AI spend; if growth slows, margins get hit fast. " +
    "Single-engine concentration risk: ~56% of revenue is data center; the entire AI-capex cycle pause scenario hits AMD harder than diversified peers. NVDA still dominates margins, ecosystem (CUDA), and scale — AMD share gains have to be real and durable, not pilot-program one-offs. " +
    "Bull (~30%): DC +50% sustains, MI300/450 ramps clean, share from NVDA, margins 58-60%, EPS $5-6 forward → $550-650. Base (~50%): DC +30-40%, margins 55-57%, EPS $4-5, multiple compresses 25-30× → $400-520. Bear (~20%): AI digestion, NVDA software moat widens, multiple compresses to 20-25× → $280-380. " +
    "Risk/reward no longer asymmetric in your favor at $455. Quality AI bet, but valuation already reflects continued perfection. HOLD; full-size add only on a >25% pullback or fresh data-center inflection. " +
    "Burry full-SBC adjustment (Burry-published): 32% overstatement (Critical) — real owner profit ~68% of GAAP; apply discount when comparing multiples to peers.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 265, targetMedian: 478, targetHigh: 650, numAnalysts: 38 },

  revGrowth: [
    [0.20, 0.12, 0.10, 0.08, 0.07], // Bear: AI digestion, DC growth halves
    [0.32, 0.22, 0.18, 0.15, 0.12], // Base: DC +30-40% sustains, normalizes
    [0.45, 0.30, 0.25, 0.20, 0.15], // Bull: DC +50% sustains 2-3yr, share gains accelerate
  ],

  fcfMargin: [
    [0.13, 0.14, 0.15, 0.16, 0.17],   // Bear: opex growth stalls margin expansion
    [0.16, 0.19, 0.22, 0.24, 0.26],   // Base: gradual mix shift to high-margin AI
    [0.20, 0.24, 0.28, 0.31, 0.34],   // Bull: AI mix dominates, margins toward NVDA territory
  ],

  exitMultiple: [14, 20, 26],

  desc: [
    'AI capex pauses for digestion as hyperscalers slow deployments. NVDA software moat (CUDA) widens; AMD MI300/450 ramps disappoint. ' +
      'Data center growth drops to <25%, margins stall at 50-52%, opex creep (+34% YoY current) eats into profit. ' +
      'EPS misses, multiple compresses from 35× to 20-22×. 5yr target: ~$280-380, roughly -8% to -4% annualized.',
    'Data center stays strong but normalizes: +30-40% YoY through 2027 then mid-teens. AMD wins meaningful AI share but NVDA still dominates training. ' +
      'Margins improve but cap at 55-57% — gap to NVDA persists. EPS compounds at ~22% to ~$15 by FY30. ' +
      'Multiple compresses 35× → 25-28× as cycle matures. 5yr target: ~$400-520, ~1-3% annualized — business performs, stock already prices it.',
    'AI super-cycle extends 2027-2029. AMD captures durable hyperscaler share with MI450/Helios, OpenAI partnership scales, Meta deal expands. ' +
      'Margins push toward 58-60% (mix shift to AI dominance). EPS compounds at ~32% to ~$22-25 by FY30. ' +
      'Market maintains premium 30-32× given structural AI position. 5yr target: $550-650, ~6-8% annualized — requires near-perfect execution.',
  ],

  thesis: [
    'AI demand cycle digests faster than expected. Hyperscaler optimization commentary (MSFT/AMZN/GOOG) replaces capacity expansion. ' +
      'NVDA software ecosystem (CUDA, NIM, NVLink) proves harder to displace than AMD\'s ROCm gains suggest. ' +
      'Operating expense growth (+34% YoY) becomes structural — when revenue growth halves, margins compress fast. ' +
      'Stock already +347% over 1Y at RSI 80 — even mild disappointment triggers severe multiple compression. ' +
      'Single-engine concentration: 56% of revenue in DC means an AI capex pause halves the entire growth story.',
    'Data center growth proves durable but normalizes. AMD genuinely wins share at hyperscalers (Meta, OpenAI, AWS Trainium-2 alternative) but NVDA stays #1 by wide margin. ' +
      'EPYC server CPU continues taking share from Intel — that part is structural, not cyclical. ' +
      'MI300/MI450 ramps cleanly but the ecosystem gap means premium pricing stays compressed vs NVDA. ' +
      'Margins improve to 55-57% via mix shift, but the 5-7pt gap to NVDA persists due to software moat. ' +
      'EPS compounds healthily but the $455 entry already prices most of this — stock returns ~base = mostly EPS growth, not multiple expansion.',
    'AI super-cycle extends through 2028-2029 and AMD becomes a durable #2 platform with real software ecosystem (ROCm matures, AMD-native frameworks). ' +
      'MI450/Helios delivers competitive performance at attractive pricing → repeat orders, not pilots. ' +
      'OpenAI partnership scales to multi-billion-dollar revenue, Meta partnership expands. Custom silicon (Pensando, Xilinx) cross-sells. ' +
      'Margins push toward NVDA-like 58-60% on AI mix dominance. EPS compounds at 32%+, market awards a sustained 30× premium. ' +
      'Probability: ~30% — requires both execution + AI hype to hold simultaneously.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.20, 0.28, 0.36],
  bullMaOptVal: false,

  epsCagr: [10, 22, 32],
  exitPE: [20, 25, 30],
  prob: [25, 50, 25],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
    },
    {
      revPrem: [0.025, 0.025, 0.02, 0.02, 0.02],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 487,
    gaapNi: 5009,
    buyback: 355,
    epsBasis: 'NON_GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 32,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 32% overstatement. FY25 LTM actuals (TIKR): SBC $487M, GAAP NI $5.0B, buybacks just $355M = 0.73× SBC. Real dilution is the story: diluted share count grew from 1,229M (FY21) to 1,642M (LTM) = +33.6% over 5 years (+6%/yr CAGR). Unlike LRCX (which shrinks the float but at 10× MTM cost), AMD has not yet inflected to net buybacks. Stock +4-5× since 2021 grants amplifies the MTM cost; calibrated formula reproduces 34.5% from these inputs, within 2.5pp of Burry\'s 32%.',
  },
});
