import { defineStock } from './defineStock';

export const LLY = defineStock({
  ticker: 'LLY',
  name: 'Eli Lilly and Company',
  sector: 'Pharmaceuticals / GLP-1',
  themeColor: '#e01933',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 1179.27,
  fairPriceRange: '$930 - $1,600',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 894,          // FY26 guide assumes ~894M shares (Q2 diluted 893.7M)
  rev25: 65200,
  fcfMargin25: 0.137,
  taxRate: 0.14,
  cash: 3200,
  debt: 30000,
  beta: 0.8,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 36.00,        // FY2026E non-GAAP EPS = guide midpoint $35.50-36.50 (Q2 2026: underlying +$2.78 raise offset by a one-time $3.03 acquired-IPR&D charge; guide excludes post-June IPR&D from the 4 deals since). Consensus $35.77; FY27E $47.64 (+33% as IPR&D normalizes). Prior: $36.25 (Q1 guide $35.50-37). Q1 2026 non-GAAP EPS $8.55, rev +56%; FY26 rev guide $82-85B (+28%).
  rsRating: 95,          // IBD RS per user, 10/10/2026 (was 76)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Aug 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $22.97B (+48%: volume +60%, price -13%). US $14.4B (+33%); ex-US
  // $8.6B (+80%; volume +113%, price -36% on Mounjaro's China NRDL listing).
  // Mounjaro $9.94B (+91%), Zepbound $4.93B (+46%), Foundayo (oral
  // orforglipron) $98M in its first launch quarter. Non-GAAP gross margin
  // 86.3% (+1.3pts). R&D $3.8B (+14%), SG&A $3.4B (+25%). Acquired IPR&D
  // $2.78B ($3.03/sh) vs $0.14 y/y. EPS: reported $7.94, non-GAAP $8.38
  // (+33%, incl. the IPR&D hit). Non-GAAP tax 22.2% (vs 16.5%).
  // FY26 GUIDE: revenue $85-87B (from $82-85B, ~+32%), performance margin
  // 49-50.5% (from 47-48.5%), non-GAAP EPS $35.50-36.50 (underlying +$2.78,
  // less $3.03 IPR&D), ~894M shares. PIPELINE: retatrutide — 3 more positive
  // Ph3 obesity trials; package complete for obesity, OSA, knee OA pain; US
  // BLA Q1 2027. Orforglipron filed for T2D. Post-quarter: 3 infectious-
  // disease acquisitions + agreement to buy AtaiBeckley (more IPR&D to come).
  // Street: Buy, PT $930-1,600 (median $1,385); FY26E rev $88.5B, FY27E
  // $102.4B. ~33× FY26E / ~25× FY27E EPS. Net: volume engine accelerating,
  // price erosion is the offset; thesis intact, valuation full but not stretched.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'GLP-1 platform is a metabolic disease franchise comparable in scale and durability to NVDA in AI or ASML in lithography',
    'Tiered therapy stack from oral mass-market to high-efficacy injections maximizes patient lifetime value across every segment',
    'Foundayo (oral orforglipron) now FDA-approved and launching — a hyperscalable pill opening the needle-free mass market (~3/4 of starts are new-to-class)',
    'Retatrutide triple-agonist has a completed positive Phase III package across obesity, sleep apnea and knee pain — a likely third obesity franchise',
    'Manufacturing moat (~$50B committed) and LillyDirect channel create structural barriers that pipeline-only competitors cannot quickly replicate',
  ],

  risksToBuy: [
    'Priced for near-perfect execution — even modest deceleration in GLP-1 penetration triggers significant multiple compression',
    'Novo Nordisk, Amgen, and Pfizer are all aggressively developing competing GLP-1 and oral obesity therapies',
    'Steep realized-price erosion, especially outside the US, means volume must keep surging just to sustain revenue growth',
    'Payer and employer pushback on GLP-1 reimbursement at scale could suppress volume growth well below TAM estimates',
    'Post-2030 patent cliff on tirzepatide creates a revenue overhang that weighs on long-duration valuation assumptions',
  ],

  // Q2 2026: base 12→14, bull 16→18. FY26 base is depressed by the one-time $3.03 IPR&D charge; Street FY27E $47.64 (+33%) then decelerating to low-teens compounds to ~14% from the $36 base. Prior: base 12% landed 5y EPS on Street 2030E ~$63.8.
  epsCagr: [8, 14, 18],
  // Trimmed from [22,28,35]: mega-cap pharma facing the post-2030 tirzepatide patent cliff de-rates ahead of it. Base 22x = premium-pharma norm (AZO 22x, AMZN 27x); GLP-1 peer NVO sits at 15x. 28x bull = today's multiple holding.
  exitPE: [18, 22, 28],
  prob: [20, 45, 35],

  analystConsensus: { rating: 'Buy', targetLow: 930, targetMedian: 1385, targetHigh: 1600, numAnalysts: 30 },  // stockanalysis.com, Oct 9 2026

  revGrowth: [
    [0.29, 0.10, 0.07, 0.05, 0.04],   // Bear: FY26 at low end of $85-87B guide; price erosion + competition
    [0.32, 0.16, 0.12, 0.10, 0.08],   // Base: FY26 guide mid (~$86B), FY27 ≈ consensus $102B
    [0.36, 0.20, 0.17, 0.14, 0.10],   // Bull: FY26 beats to ~$88.5B consensus; retatrutide + oral mass market
  ],
  fcfMargin: [
    [0.12, 0.12, 0.13, 0.13, 0.14],
    [0.14, 0.16, 0.18, 0.20, 0.22],
    [0.16, 0.19, 0.22, 0.24, 0.26],
  ],
  exitMultiple: [14, 18, 22],
  desc: [
    'Price erosion (already -13% in Q2 2026, -36% ex-US) proves stronger than expected, oral GLP-1 launch underwhelms, market growth decelerates. EPS compounds at ~8% from $36.00 as competition from Novo Nordisk, Amgen, and Pfizer intensifies. P/E compresses to 18x toward historical norms. Patent cliff concerns post-2030 weigh on sentiment. 5yr target {target} ({cagr} annualized).',
    'Strong structural growth continues — GLP-1 market expands to $100B+, Zepbound/Mounjaro maintain leadership, orforglipron adds oral optionality. EPS grows ~14% from the IPR&D-depressed $36.00 FY26 base, in line with Street, as revenue scales and the performance margin holds ~50%. Moderate P/E compression to 22x reflects maturing growth phase. 5yr target {target} ({cagr} annualized).',
    'GLP-1 market reaches $250B+ as penetration rises to 15–20% of addressable population. Orforglipron at $149–399 drives mass-market oral adoption, retatrutide (24–29% weight loss) captures $60–80B severe obesity segment as pharma alternative to bariatric surgery. Tiered therapy stack covers full patient spectrum. Two-stage model (inject → oral maintenance) maximizes patient LTV. LLY at 35–40% share = $90–120B GLP-1 revenue alone. EPS compounds at ~18%, premium 28x multiple holds on metabolic disease platform leadership. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.40, 0.45, 0.50],
  debtSafety: {
    netDebt: 26800,
    ebitda: 24000,
    fy: 'FY25',
    note: 'GLP-1 revenue surge pushes EBITDA well past leverage — ratio barely above 1×. Debt largely from manufacturing buildout to meet Mounjaro/Zepbound demand. Deleveraging rapidly as GLP-1 cash flows compound.',
  },
});
