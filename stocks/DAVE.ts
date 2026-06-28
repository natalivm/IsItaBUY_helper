import { defineStock } from './defineStock';

export const DAVE = defineStock({
  ticker: 'DAVE',
  name: 'Dave Inc.',
  sector: 'FinTech / Neobank & Cash Advance',
  themeColor: '#16a34a',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 348.71,   // Jun 26 2026 (+8% on the day)
  fairPriceRange: '$290 - $400',
  shares0: 12.0,          // ~11-12.7M shares and falling fast — ~$195M buyback in Q1 2026 (~7% of shares); float only ~9.8M; $300M authorization
  rev25: 554.18,          // FY2025 total revenue $554.2M (+60% YoY); TTM $604.6M
  fcfMargin25: 0.30,      // FY2025 net margin ~35% (NI $195.9M / rev $554.2M); held conservative (FY25 had a one-time tax benefit)
  taxRate: 0.25,          // Normalizing UP — FY2025 booked a tax BENEFIT (DTA release); a full cash-tax rate resumes as DTAs exhaust
  cash: 158,             // ~$158M cash (cash/sh $13.84)
  debt: 241,            // ~$241M total (Debt/Eq 1.32) incl a $175M 0% convertible note + the advance-funding facility; net debt ~$90M (EV $4.53B − cap $4.43B)
  beta: 2.8,            // Modeled; trailing Finviz beta 3.81 (artifact of the parabolic +6,700% 3-yr move)
  costDebt: 0.04,       // Blended low — the largest tranche is a 0% coupon convertible
  modelType: 'EPS_PE',
  baseEps: 16.00,       // FY2026E — GAAP consensus ~$15.93 ≈ mgmt adjusted-EPS guidance $16.25-$16.75. DCF distorted because the facility funds member cash advances, not corporate operations — neobank/lender => EPS_PE.
  rsRating: 92,        // IBD Relative Strength Rating (Jun 2026); composite 94, EPS rating 80
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',  // CashAI powers underwriting, but the business is consumer cash advances, not an AI beneficiary

  reasonsToBuy: [
    'Genuinely cheap for the growth — a sub-1 PEG and ~22x earnings against ~20%+ EPS growth, rare among profitable fintech',
    'Elite profitability — high-30s net margins, 40%+ adjusted-EBITDA margins, and strong free cash flow funding buybacks',
    'Eighth straight quarter of raising guidance — CashAI underwriting holds delinquencies at record lows as monetization expands',
    'Aggressive buybacks on a tiny float — share count is shrinking fast, compounding per-share earnings on top of operating growth',
    'New flat-fee model and expanding products (Dave Card, ExtraCash) deepen engagement and improve unit economics',
  ],

  risksToBuy: [
    'Cash-advance economics face regulatory scrutiny (FTC/CFPB) — fee-model or disclosure changes could pressure monetization',
    'Stock has multiplied off its lows and now trades above the consensus price target, capping near-term upside',
    'Subprime-leaning member base is acutely exposed to a consumer downturn that would lift delinquencies and curb advances',
    'Competitive neobank/earned-wage space — Chime, MoneyLion, Cash App, and banks all chase the same customers',
    'Very small float, high short interest, and high volatility mean sharp drawdowns when momentum reverses',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 250, targetMedian: 336, targetHigh: 425, numAnalysts: 11 },

  epsCagr: [11, 20, 28],
  exitPE: [11, 15, 21],
  prob: [25, 50, 25],

  revGrowth: [
    [0.18, 0.14, 0.10, 0.08, 0.06],   // Bear: regulation + consumer stress slow growth
    [0.29, 0.24, 0.19, 0.15, 0.12],   // Base: mgmt guided ~28-30% FY2026, decelerating
    [0.35, 0.30, 0.25, 0.21, 0.17],   // Bull: product expansion + CashAI monetization compounds
  ],
  fcfMargin: [
    [0.24, 0.24, 0.25, 0.25, 0.26],       // Bear: higher loss rates compress margin
    [0.30, 0.31, 0.32, 0.33, 0.33],       // Base: stable low-30s margin
    [0.33, 0.35, 0.37, 0.38, 0.40],       // Bull: operating leverage as platform scales
  ],
  exitMultiple: [11, 15, 21],
  termGrowth: [0.02, 0.03, 0.035],
  waccAdj: [0.02, 0.005, -0.005],
  bbRate: [0.01, 0.025, 0.04],          // Aggressive buybacks — among the fastest share-count reducers
  ebitdaProxy: [0.32, 0.41, 0.48],
  bullMaOptVal: false,

  desc: [
    'Regulatory action against cash-advance economics (FTC/CFPB) forces fee-model changes just as a consumer downturn lifts delinquencies and curbs ExtraCash originations. ' +
      'Competition from Chime, MoneyLion, and Cash App pressures member growth. EPS compounds at only ~11% from the FY2026E $16.00 base to ~$27 by FY31, and the market reprices Dave as a cyclical lender at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
    'Dave delivers on its raised FY2026 guidance (28-30% revenue growth, ~$16.50 adjusted EPS) and decelerates gracefully thereafter. CashAI keeps delinquencies at record lows, the flat-fee model holds monetization near recent highs, and the Dave Card deepens engagement. ' +
      'Margins stay in the low-30s and an aggressive buyback shrinks the tiny share count, compounding EPS ~20% from the $16.00 base to ~$40 by FY31. The multiple normalizes toward ~15x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The rare profitable fintech still growing fast — and at a sub-1 PEG, reasonably priced.',
    'Product expansion (Dave Card, new credit and banking features) and CashAI monetization compound faster than expected, member growth reaccelerates, and operating leverage lifts margins toward 40%. ' +
      'EPS compounds ~28% from the $16.00 base to ~$55 by FY31, and the market awards ~21x on proven, profitable hypergrowth. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25% — requires sustained growth without a regulatory or credit setback.',
  ],

  thesis: [
    'Bear mechanics: cash advances are unsecured consumer credit, and the fee model has already drawn FTC scrutiny — adverse action could reset monetization. ' +
      'A consumer downturn hits delinquencies and origination volume together, and the neobank space is crowded. ' +
      'At {spot}, above the Street price target after a parabolic multi-year run, the valuation prices in continued execution, so any stumble re-rates the multiple. The bear case delivers losses from here.',
    'The operating story is excellent and, unlike most fintech, reasonably priced: revenue and EPS keep beating (eight straight guidance raises), net margins are high-30s, adjusted-EBITDA margins top 40%, and the forward P/E is ~22x against ~20%+ EPS growth (PEG 0.83). ' +
      'Aggressive buybacks on a ~10M-share float turbocharge per-share earnings. The consensus target ($336) sits just below {spot} after today\'s pop, so near-term upside is limited, but the 5-year compounding case is intact and the price is not demanding. Verdict: BUY — quality and valuation both line up; size for the volatility.',
    'The bull case needs CashAI monetization and new products (Dave Card, banking, credit) to compound while delinquencies stay low and margins push toward 40%. ' +
      'If Dave sustains mid-20s EPS growth and keeps shrinking the share count, it earns a premium multiple as a profitable neobank leader, and {target} is achievable. ' +
      'The risk: regulation of the cash-advance model and consumer-credit cyclicality. Probability 25% — genuine upside, with execution and policy as the swing factors.',
  ],

  burry: {
    sbc: 23.62,
    gaapNi: 195.87,
    buyback: 195,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 50,
    overstatementSource: 'estimated',
    note: 'FY25 stock-comp $23.62M (verified, from FY25 financials) vs $195.87M GAAP NI = ~12% naive. The extreme MTM amplifier (stock +~6,700% over 3 years off SPAC lows) drives the Burry overstatement to the Critical tier despite low absolute SBC. Dave is a strong net share REDUCER — ~$195M repurchased in Q1 2026 alone (~7% of shares; $300M authorization) dwarfs SBC ~8:1 — which materially offsets real per-share dilution. Pct estimated via the MTM heuristic.',
  },

  debtSafety: {
    netDebt: 90,
    ebitda: 200,
    capexToOcf: 0.05,
    interestCoverage: 30,
    altmanZ: 8,
    fy: 'FY25',
    note: 'Framework partially N/A for a neobank — the advance-funding facility supports member cash advances, and the largest debt tranche is a $175M 0% convertible (no cash interest). Net debt ~$90M (EV $4.53B − cap $4.43B) vs EBITDA ~$200M (FY25 $194M / TTM $219M) => leverage ~0.45x, GREEN. Quick & current ratios 3.86; real risk metric is advance credit quality (28-day DPD ~1.69%, a record low) and regulatory exposure, not leverage.',
  },
});
