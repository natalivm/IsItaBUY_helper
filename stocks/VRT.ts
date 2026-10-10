import { defineStock } from './defineStock';

export const VRT = defineStock({
  ticker: 'VRT',
  name: 'Vertiv Holdings Co',
  sector: 'Electrical Equipment / Data Center Power & Cooling',
  themeColor: '#0a9396',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 242.78,
  fairPriceRange: '$236 - $427',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 393,           // Q2 2026 diluted shares 392.7M; mkt cap ~$95B
  rev25: 10230,           // FY2025 revenue $10,229.9M (+27.7% YoY); FY26 guide $13.8-14.2B (+37% incl. M&A), FY27E consensus $18.27B
  fcfMargin25: 0.18,      // FY2025 FCF margin ~18.5% (FCF $1,893.8M); LTM ~21%
  taxRate: 0.23,          // FY2025 effective tax ~23.5% ($409.1M / $1,741.9M pretax)
  cash: 3111,            // Jun 30 2026: $2.81B cash + $0.30B short-term investments
  debt: 2940,           // Jun 30 2026 long-term debt; now NET CASH (~$0.17B)
  beta: 2.0,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 6.70,          // FY2026E adj EPS = guide midpoint $6.65-6.75 (raised at Q2 2026 from $6.30-6.40; consensus $6.74, FY27E $9.18 +37%). GAAP EPS guide $5.82-5.92. Prior: $6.49 (TIKR). TTM GAAP EPS $3.98; adj excludes heavy intangible amortization. Analyst path: $6.49→$8.85→$11.29→$13.62→$17.25 (FY26-30, ~27% CAGR).
  rsRating: 71,           // IBD RS per user, 10/10/2026 (was 86) — stock range-bound ~$237-257 since July
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',

  // Q2 2026 UPDATE (Jul 29, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Profit beat, sales light. Net sales $3,274M (+24%, organic +18%) — below
  // ~$3.39B consensus as supply-chain delays pushed some sales into H2.
  // Americas +21% organic, APAC +26%, EMEA -2%. Adj. op profit $738M (+51%),
  // margin 22.6% (+410bps). Adj. EPS $1.52 (+60%), GAAP $1.27 (+53%). OCF
  // $1.10B, adj. FCF $925M (+234%). Cash $3.11B vs debt $2.94B → NET CASH.
  // Deferred revenue doubled to $3.63B (from $1.81B at YE25) — strong
  // prepayments/backlog signal. $278M spent on acquisitions in Q2.
  // FY26 GUIDE RAISED: net sales $13.8-14.2B (organic +30-32%), adj. op margin
  // 23.3-24.3%, adj. EPS $6.65-6.75 (from $6.30-6.40), adj. FCF $2.4-2.6B.
  // Q3: sales $3.65-3.85B (organic +34-36%), adj. EPS $1.77-1.83 (+43-48%).
  // Street: Strong Buy (30), PT $236-427, median $340; FY27E EPS $9.18.
  // Stock ~flat at ~$243 since July (RS cooled 86→71); ~36× FY26E / ~26×
  // FY27E. Net: execution + margin story intact; H2-weighted delivery is
  // the watch item.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Pure-play picks-and-shovels beneficiary of AI data-center buildout — power, thermal management, and liquid cooling all in demand',
    'Enormous and growing backlog gives multi-year revenue visibility as hyperscaler capex scales',
    'Operating margins expanding rapidly as volume leverage and pricing flow through, with management repeatedly raising guidance',
    'Broadest end-to-end portfolio — power, cooling, IT systems, services — lets Vertiv sell converged reference designs (SmartRun, OneCore) and lead emerging 800V DC and liquid-cooling architectures',
    'Analyst targets sit above the current price — the Street still sees upside despite the run',
  ],

  risksToBuy: [
    'Premium earnings multiple — priced for sustained hypergrowth, so any deceleration re-rates hard',
    'Revenue is a derivative of hyperscaler AI capex; a spending pause or digestion phase would hit orders sharply',
    'Intensifying competition in cooling and power from Schneider, Eaton, and a wave of liquid-cooling specialists',
    'Supply-chain constraints already pushed some sales into later quarters — the year is back-half weighted',
    'High beta — the stock falls harder than the market in any AI-capex scare',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 236, targetMedian: 340, targetHigh: 427, numAnalysts: 30 },  // stockanalysis.com, Oct 7 2026

  epsCagr: [14, 24, 30],   // Kept at Q2 2026 (FY27E +37% then decelerating). Base toward the analyst ~27% FY26-30 path, haircut for deceleration
  exitPE: [20, 28, 36],
  prob: [25, 50, 25],

  revGrowth: [
    [0.33, 0.12, 0.10, 0.08, 0.06],   // Bear: FY26 at low end of guide ($13.8B, H2 slips); then AI capex digestion slows orders
    [0.37, 0.28, 0.18, 0.14, 0.11],   // Base: FY26 guide mid $14.0B (+37% incl. M&A), FY27 ≈ consensus $18.3B, decelerating
    [0.40, 0.32, 0.24, 0.20, 0.16],   // Bull: liquid-cooling super-cycle, backlog compounds
  ],
  fcfMargin: [
    [0.10, 0.11, 0.12, 0.12, 0.13],
    [0.12, 0.14, 0.15, 0.16, 0.17],
    [0.14, 0.16, 0.18, 0.19, 0.20],
  ],
  exitMultiple: [16, 22, 30],
  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.18, 0.24, 0.30],
  bullMaOptVal: false,

  desc: [
    'AI data-center capex digests after a torrid build-out; hyperscalers pause orders and backlog conversion slows. Competition from Schneider and Eaton compresses pricing. ' +
      'EPS compounds ~14% from the FY2026E $6.70 base and the rich multiple re-rates toward ~20x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
    'Vertiv delivers on its twice-raised FY2026 guidance (~$14B sales, organic +31%, ~$6.70 adjusted EPS) and decelerates gracefully as the backlog converts. Liquid cooling and high-density power scale with GPU deployments; margins keep expanding. ' +
      'EPS compounds ~24% from the $6.70 base while the multiple normalizes toward ~28x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A premier AI-infrastructure compounder — already priced for a lot, but the backlog backs it.',
    'Liquid-cooling becomes the default for GPU racks and Vertiv captures the thermal-management standard; backlog compounds faster than expected and operating leverage drives margins higher. ' +
      'EPS compounds ~30% from the $6.70 base and the market sustains a premium ~36x multiple. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: Vertiv is a leveraged play on hyperscaler AI capex — a derivative of a derivative. If GPU deployments enter a digestion phase, orders and backlog conversion slow fast. ' +
      'At ~36x FY26E earnings, the stock prices in years of uninterrupted growth, so even a modest air-pocket triggers severe compression. High beta amplifies the drawdown. At {spot}, the margin of safety is thin.',
    'The operating story is excellent: AI data centers need power and cooling, Vertiv leads in both, deferred revenue doubled in H1, margins expanded 410bps in Q2, the balance sheet flipped to net cash, and guidance keeps rising. ' +
      'Unlike the richly-valued storage names, the consensus target sits above {spot}, so the Street still sees upside. The catch is valuation — you are paying a premium multiple for a cyclical-capex beneficiary. Verdict: BUY — own the AI-infrastructure leader, but size for the volatility.',
    'The bull case: liquid cooling becomes mandatory for next-gen GPU racks and Vertiv owns the thermal-and-power stack at hyperscale. The backlog compounds, operating leverage lifts margins, and the market keeps paying a premium for the clearest AI-infrastructure pure-play. ' +
      '{target} is achievable if the capex super-cycle runs for years. Probability 25% — requires AI spending to stay torrid without a digestion phase.',
  ],

  burry: {
    sbc: 45.9,
    gaapNi: 1332.8,
    buyback: 11,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 18,
    overstatementSource: 'estimated',
    note: 'OK tier (near Pristine). FY25 total stock-comp ~$45.9M (TIKR; Finviz options-only line $36.26M) vs $1,332.8M GAAP NI = ~3.4% naive — genuinely small. The extreme ~12x stock run over 3 years adds a large MTM amplifier, lifting the estimate to ~18%, but absolute SBC is tiny and modest buybacks (~$11M) partly offset. Vertiv is not a meaningful net share reducer.',
  },

  debtSafety: {
    netDebt: -171,         // Jun 30 2026: $2.94B debt − $3.11B cash & ST investments → net cash
    ebitda: 3600,          // FY26E: adj. op profit guide $3.29-3.37B + D&A — approximate
    fy: 'Q2 2026',
    note: 'GREEN by Step 1 — net cash (~$0.17B) at Q2 2026 after adj. FCF of $925M in the quarter. Earlier: net debt ~$0.72B (debt $3.27B vs cash $2.54B) vs EBITDA ~$2.4B => leverage ~0.3x at FY25. Management cited net leverage ~0.2x exiting Q1 2026 (down from 0.54x at FY25 year-end) on surging cash generation — Q1 2026 FCF $653M, +147% YoY. Balance sheet is not the risk — AI-capex cyclicality is.',
  },
});
