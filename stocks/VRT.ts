import { defineStock } from './defineStock';

export const VRT = defineStock({
  ticker: 'VRT',
  name: 'Vertiv Holdings Co',
  sector: 'Electrical Equipment / Data Center Power & Cooling',
  themeColor: '#0a9396',
  updatedOn: '07/15',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 304.57,   // Jun 26 2026 close
  fairPriceRange: '$300 - $500',
  shares0: 384,           // 383.95M shares (Finviz); mkt cap ~$116.75B
  rev25: 10230,           // FY2025 revenue $10,229.9M (+27.7% YoY); TTM $10,843M
  fcfMargin25: 0.18,      // FY2025 FCF margin ~18.5% (FCF $1,893.8M); LTM ~21%
  taxRate: 0.23,          // FY2025 effective tax ~23.5% ($409.1M / $1,741.9M pretax)
  cash: 2540,            // ~$2.54B cash (cash/sh $6.62)
  debt: 3270,           // ~$3.27B total debt (Debt/Eq 0.77); net debt ~$0.7B (EV $117.47B − cap $116.75B)
  beta: 2.0,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 6.49,          // FY2026E consensus adj EPS (TIKR) ≈ mgmt guide $6.35 (raised +51% at Q1 2026). TTM GAAP EPS $3.98; adj excludes heavy intangible amortization. Analyst path: $6.49→$8.85→$11.29→$13.62→$17.25 (FY26-30, ~27% CAGR).
  rsRating: 86,           // IBD RS 86 (Composite 92, EPS 99); retook its 10-week line, though ACC/DIS at E flags recent distribution
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Pure-play picks-and-shovels beneficiary of AI data-center buildout — power, thermal management, and liquid cooling all in demand',
    'Enormous and growing backlog gives multi-year revenue visibility as hyperscaler capex scales',
    'Operating margins expanding rapidly as volume leverage and pricing flow through, with management repeatedly raising guidance',
    'Broadest end-to-end portfolio — power, cooling, IT systems, services — lets Vertiv sell converged reference designs (SmartRun, OneCore) and lead emerging 800V DC and liquid-cooling architectures',
    'Analyst targets sit above the current price — the Street still sees upside despite the run',
  ],

  risksToBuy: [
    'Richly valued at a high earnings multiple — priced for sustained hypergrowth, so any deceleration re-rates hard',
    'Revenue is a derivative of hyperscaler AI capex; a spending pause or digestion phase would hit orders sharply',
    'Intensifying competition in cooling and power from Schneider, Eaton, and a wave of liquid-cooling specialists',
    'Supply-chain and component constraints could cap how fast the backlog converts to revenue',
    'High beta — the stock falls harder than the market in any AI-capex scare',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 300, targetMedian: 378, targetHigh: 500, numAnalysts: 26 },

  epsCagr: [14, 24, 30],   // Base toward the analyst ~27% FY26-30 path, haircut for deceleration
  exitPE: [20, 28, 36],
  prob: [25, 50, 25],

  revGrowth: [
    [0.18, 0.14, 0.10, 0.08, 0.06],   // Bear: AI capex digestion slows orders
    [0.32, 0.24, 0.18, 0.14, 0.11],   // Base: guided ~33% FY2026, decelerating
    [0.38, 0.30, 0.24, 0.20, 0.16],   // Bull: liquid-cooling super-cycle, backlog compounds
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
      'EPS compounds ~14% from the FY2026E $6.49 base and the rich multiple re-rates toward ~20x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
    'Vertiv delivers on its raised FY2026 guidance (~33% revenue growth, ~$6.49 adjusted EPS) and decelerates gracefully as the backlog converts. Liquid cooling and high-density power scale with GPU deployments; margins keep expanding. ' +
      'EPS compounds ~24% from the $6.49 base while the multiple normalizes toward ~28x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A premier AI-infrastructure compounder — already priced for a lot, but the backlog backs it.',
    'Liquid-cooling becomes the default for GPU racks and Vertiv captures the thermal-management standard; backlog compounds faster than expected and operating leverage drives margins higher. ' +
      'EPS compounds ~30% from the $6.49 base and the market sustains a premium ~36x multiple. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: Vertiv is a leveraged play on hyperscaler AI capex — a derivative of a derivative. If GPU deployments enter a digestion phase, orders and backlog conversion slow fast. ' +
      'At a high-30s/40s earnings multiple, the stock prices in years of uninterrupted growth, so even a modest air-pocket triggers severe compression. High beta amplifies the drawdown. At {spot}, the margin of safety is thin.',
    'The operating story is excellent: AI data centers need power and cooling, Vertiv leads in both, the backlog gives multi-year visibility, margins are expanding, and guidance keeps rising. ' +
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
    netDebt: 720,
    ebitda: 2400,
    fy: 'FY25',
    note: 'GREEN. Net debt ~$0.72B (debt $3.27B vs cash $2.54B) vs EBITDA ~$2.4B => leverage ~0.3x. Management cited net leverage ~0.2x exiting Q1 2026 (down from 0.54x at FY25 year-end) on surging cash generation — Q1 2026 FCF $653M, +147% YoY. Balance sheet is not the risk — AI-capex cyclicality is.',
  },
});
