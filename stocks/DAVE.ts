import { defineStock } from './defineStock';

export const DAVE = defineStock({
  ticker: 'DAVE',
  name: 'Dave Inc.',
  sector: 'FinTech / Neobank & Cash Advance',
  themeColor: '#16a34a',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 368.42,
  fairPriceRange: '$350 - $500',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 12.7,          // ~12.7M shares (TIKR LTM) and falling fast — $231.73M repurchased LTM ($195M in Q1 2026 alone); float only ~9.8M; $300M authorization ($94.1M left after Q2 2026's $19.1M; Q2 diluted weighted shares 13.7M incl. converts/warrants)
  rev25: 554.18,          // FY2025 total revenue $554.18M (+60% YoY); TTM $604.62M (TIKR)
  fcfMargin25: 0.30,      // FY2025 net margin ~35% (NI $195.87M / rev $554.18M); FY25 FCF margin actually ~52% — held conservative
  taxRate: 0.25,          // Normalizing UP — FY2025 booked a tax BENEFIT (eff. rate −16.6%, DTA release); a full cash-tax rate resumes as DTAs exhaust
  cash: 254,             // Jun 30 2026: $254.4M cash, restricted cash & investments
  debt: 268,            // Jun 30 2026: $193.1M convertible notes (net) + $75M debt facility; (prior: ~$268M TIKR LTM incl a $175M 0% convertible + facility; net debt ~$88M LTM (was net CASH $46M at YE2025 before the convertible raise)
  beta: 2.8,            // Modeled; trailing Finviz beta 3.81 (artifact of the parabolic +6,700% 3-yr move)
  costDebt: 0.04,       // Blended low — the largest tranche is a 0% coupon convertible
  modelType: 'EPS_PE',
  baseEps: 17.25,       // FY2026E adjusted EPS = guide midpoint $17.00-17.50 (raised at Q2 2026 from $16.25-16.75; consensus $17.38, FY27E $22.26). ADJUSTED basis — GAAP EPS is distorted by non-cash warrant/earnout fair-value swings (Q2 GAAP $0.49 vs adj $4.12). DCF distorted because the facility funds member cash advances, not corporate operations — neobank/lender => EPS_PE.
  rsRating: 82,        // IBD RS per user, 10/10/2026 (was 92 in Jun 2026)
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',  // CashAI powers underwriting, but the business is consumer cash advances, not an AI beneficiary

  // Q2 2026 UPDATE (Aug 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Another beat-and-raise (guidance raised again). Revenue $170.8M (+30%);
  // adj. EBITDA $75.5M (+48%, 44% margin); adj. EPS $4.12 (+48%). GAAP NI just
  // $6.7M ($0.49) — non-cash fair-value losses on warrants ($25.6M) and
  // earnouts ($11.3M), plus SBC $16.4M. New members 951K (+32%, CAC $19);
  // MTMs 3.08M (+17%); ExtraCash originations $2.3B (+27%); monetization net
  // of losses 4.8%; 28-day DPD 2.12% (-14bps y/y); provision $28.8M (vs
  // $25.2M). Non-GAAP gross margin 72%. Cash $254M (from $178M at Mar 31)
  // vs $193M converts + $75M facility. Q2 buyback $19.1M ($94.1M left).
  // FY26 GUIDE: revenue $725-735M (from $710-720M; +31-33%), adj. EBITDA
  // $315-325M (from $305-315M), adj. EPS $17.00-17.50 (from $16.25-16.75).
  // Street PTs raised post-print (KBW $490, others $475); consensus Buy, PT
  // $350-500 (median $450). Stock range-bound ~$350-380 since July (RS
  // cooling 92→82). ~21× FY26E adj. EPS. Net: fundamentals keep beating;
  // stock now BELOW the Street target rather than above it.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Genuinely cheap for the growth — a sub-1 PEG and ~22x earnings against ~20%+ EPS growth, rare among profitable fintech',
    'Elite profitability — high-30s net margins, 40%+ adjusted-EBITDA margins, and strong free cash flow funding buybacks',
    'Serial guidance raiser, again at Q2 2026 — CashAI underwriting holds delinquencies at record lows as monetization expands',
    'Aggressive buybacks on a tiny float — share count is shrinking fast, compounding per-share earnings on top of operating growth',
    'New flat-fee model and expanding products (Dave Card, ExtraCash) deepen engagement and improve unit economics',
  ],

  risksToBuy: [
    'Cash-advance economics face regulatory scrutiny (FTC/CFPB) — fee-model or disclosure changes could pressure monetization',
    'Reported GAAP earnings swing sharply on non-cash warrant and earnout revaluations, clouding the true earnings picture',
    'Subprime-leaning member base is acutely exposed to a consumer downturn that would lift delinquencies and curb advances',
    'Competitive neobank/earned-wage space — Chime, MoneyLion, Cash App, and banks all chase the same customers',
    'Very small float, high short interest, and high volatility mean sharp drawdowns when momentum reverses',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 350, targetMedian: 450, targetHigh: 500, numAnalysts: 15 },  // stockanalysis.com, Oct 9 2026

  epsCagr: [11, 20, 28],
  exitPE: [11, 15, 21],
  prob: [25, 50, 25],

  revGrowth: [
    [0.28, 0.14, 0.10, 0.08, 0.06],   // Bear: FY26 ~locked by H1; then regulation + consumer stress slow growth
    [0.32, 0.23, 0.19, 0.15, 0.12],   // Base: FY26 at raised guide (+31-33%), FY27 ≈ consensus $899M, decelerating
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
      'Competition from Chime, MoneyLion, and Cash App pressures member growth. EPS compounds at only ~11% from the FY2026E $17.25 base to ~$29 by FY31, and the market reprices Dave as a cyclical lender at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
    'Dave delivers on its twice-raised FY2026 guidance (31-33% revenue growth, ~$17.25 adjusted EPS) and decelerates gracefully thereafter. CashAI keeps delinquencies at record lows, the flat-fee model holds monetization near recent highs, and the Dave Card deepens engagement. ' +
      'Margins stay in the low-30s and an aggressive buyback shrinks the tiny share count, compounding EPS ~20% from the $17.25 base to ~$43 by FY31. The multiple normalizes toward ~15x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The rare profitable fintech still growing fast — and at a sub-1 PEG, reasonably priced.',
    'Product expansion (Dave Card, new credit and banking features) and CashAI monetization compound faster than expected, member growth reaccelerates, and operating leverage lifts margins toward 40%. ' +
      'EPS compounds ~28% from the $17.25 base to ~$59 by FY31, and the market awards ~21x on proven, profitable hypergrowth. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25% — requires sustained growth without a regulatory or credit setback.',
  ],

  thesis: [
    'Bear mechanics: cash advances are unsecured consumer credit, and the fee model has already drawn FTC scrutiny — adverse action could reset monetization. ' +
      'A consumer downturn hits delinquencies and origination volume together, and the neobank space is crowded. ' +
      'At {spot}, after a parabolic multi-year run, the valuation still prices in continued execution, so any stumble re-rates the multiple. The bear case delivers losses from here.',
    'The operating story is excellent and, unlike most fintech, reasonably priced: revenue and EPS keep beating (guidance raised again at Q2 2026), adjusted-EBITDA margins top 40%, and the forward P/E is ~21x against ~20%+ EPS growth. ' +
      'Aggressive buybacks on a ~10M-share float turbocharge per-share earnings. The consensus target (~$450, raised after Q2) now sits well above {spot}, and the 5-year compounding case is intact and the price is not demanding. Verdict: BUY — quality and valuation both line up; size for the volatility.',
    'The bull case needs CashAI monetization and new products (Dave Card, banking, credit) to compound while delinquencies stay low and margins push toward 40%. ' +
      'If Dave sustains mid-20s EPS growth and keeps shrinking the share count, it earns a premium multiple as a profitable neobank leader, and {target} is achievable. ' +
      'The risk: regulation of the cash-advance model and consumer-credit cyclicality. Probability 25% — genuine upside, with execution and policy as the swing factors.',
  ],

  burry: {
    sbc: 29.90,
    gaapNi: 195.87,
    buyback: 57.05,
    epsBasis: 'NON_GAAP',   // baseEps is ADJUSTED EPS (excludes SBC + warrant/earnout MTM) since the Q2 2026 review
    fy: 'FY25',
    overstatementPct: 55,
    overstatementSource: 'estimated',
    note: 'FY25 stock-based comp $29.90M (TIKR cash-flow line; higher than the $23.62M Finviz "options only" figure) vs $195.87M GAAP NI = ~15% naive. The extreme MTM amplifier (stock +~6,700% over 3 years off SPAC lows) would push the mechanical estimate toward the Tragic tier, but two factors keep it Critical: modern SBC is mostly RSUs granted near market (not deep-ITM legacy options), and Dave is an aggressive net share REDUCER — $57M repurchased in FY25, $231.73M over the LTM ($195M in Q1 2026 alone, ~7% of shares; $300M authorization) — so share count is actually FALLING and real per-share dilution is negative. Pct estimated.',
  },

  debtSafety: {
    netDebt: 14,           // Jun 30 2026: $268M ($193M converts + $75M facility) − $254M cash & investments
    ebitda: 255,           // LTM adj. EBITDA ≈ $255M (FY26 guide $315-325M) — approximate
    capexToOcf: 0.05,
    interestCoverage: 30,
    altmanZ: 8,
    fy: 'Q2 2026',
    note: 'Framework partially N/A for a neobank — the advance-funding facility supports member cash advances, and the largest debt tranche is a $175M 0% convertible (no cash interest). Net debt $88M LTM (TIKR) — was net CASH $46M at YE2025 before the convertible raise — vs EBITDA ~$205M (FY25 $192M / LTM $217M) => leverage ~0.4x, GREEN. Backed by very strong FCF (~52% margin, FY25 $290M). Quick & current ratios 3.86; real risk metric is advance credit quality (28-day DPD ~1.69%, a record low) and regulatory exposure, not leverage.',
  },
});
