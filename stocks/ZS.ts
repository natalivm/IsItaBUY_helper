import { defineStock } from './defineStock';

export const ZS = defineStock({
  ticker: 'ZS',
  name: 'Zscaler',
  sector: 'Cybersecurity / Zero Trust',
  themeColor: '#0067D9',
  currentPrice: 144.7,
  fairPriceRange: '$125 - $310',
  shares0: 165,
  rev25: 3330,
  fcfMargin25: 0.23,
  taxRate: 0.20,
  cash: 3500,
  debt: 1700,
  beta: 0.98,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.50,
  rsRating: 62,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '05/27',

  strategicNarrative:
    "Q3 FY26 actuals: Revenue $850M +25% YoY | ARR $3.525B +25% | Non-GAAP op margin 23% (all-time high) | FCF $136M (16% margin) | EPS $1.08 vs $1.01 guide. Beat every metric.\n\n" +

    "FY26 raised guidance: Revenue $3.330B (+24.7%) · EPS $4.10–$4.11 (+25%) · ARR $3.740–3.749B. FY27 preliminary: 16–17% ARR and revenue growth — the headline risk. Core ZS ex-Red Canary net new ARR was only +14% YoY in Q3; Red Canary renewals (~$10M net new ARR) won't repeat in FY27 metrics.\n\n" +

    "FCF headwind: FY26 FCF margin guided 22.8–23.3% (cut from prior 26.5–27%). Cause: ZS is pulling forward data center + branch appliance capex ahead of tariff inflation. FY27 capex guided +200bps vs FY26. Near-term FCF is depressed, not structural, but the 'capital-light SaaS' narrative is strained.\n\n" +

    "AI positioning is real: AI Protect TTM bookings $100M+. Data Security ARR $500M+ (+30% YoY). Zero Trust Everywhere enterprises 700+ (vs 210+ a year ago). Z-Flex TCV $480M in Q3 alone (+60% QoQ) at 4-year average term — multi-year lock-in. Partnerships: Anthropic Project Glasswing + OpenAI Daybreak/GPT-5.5-Cyber. Acquiring Symmetry Systems (identity graph for AI agents).\n\n" +

    "SBC problem accelerating: Q3 SBC $207M → annualized $828M = 25.5% of FY26 revenue. SBC is growing faster than revenue. GAAP net loss Q3: $13.9M. Non-GAAP EPS $1.08 vs GAAP EPS −$0.09 = $1.17/share gap, almost entirely SBC. Zero buybacks across all years. 165M diluted shares.\n\n" +

    "Valuation at $144.70: Forward P/E ~32× on FY27 consensus ~$4.50 EPS. P/ARR ~5.2×. Analyst consensus: 36 analysts, Strong Buy, median target $265 (+83% from $144.70). Weighted fair value ~$208 (28% bear/$130 · 45% base/$195 · 27% bull/$310) = +44% implied upside.\n\n" +

    "Burry read — Tragic (100% overstatement, GAAP loss-maker): the framework fully breaks down here. Annualized SBC ~$828M vs GAAP net income −$55M makes the SBC/NI ratio undefined. Reported non-GAAP FCF ~$760M (FY26E) is almost entirely an SBC accounting addback — true owner FCF is near zero or negative after treating compensation as a real cost. Zero buybacks across all years mean dilution compounds with no offset. The model verdict reflects non-GAAP economics; the Burry lens says the business has not yet demonstrated it can generate cash for owners.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 130, targetMedian: 265, targetHigh: 320, numAnalysts: 36 },

  revGrowth: [
    [0.13, 0.12, 0.11, 0.10, 0.09], // Bear: FY27 guide disappoints, Red Canary churn + competition erode growth further
    [0.17, 0.16, 0.14, 0.13, 0.12], // Base: FY27 plays out at guidance, AI Protect adds 1-2% incremental over time
    [0.22, 0.20, 0.18, 0.16, 0.14], // Bull: AI agent security drives FY27 reaccel above guide; AI Protect → $500M ARR
  ],

  fcfMargin: [
    [0.20, 0.20, 0.21, 0.22, 0.23], // Bear: capex pressure permanent, margin stalls at FY26 floor
    [0.22, 0.24, 0.26, 0.28, 0.31], // Base: capex pull-forward temporary, gradual recovery as D&A absorbs
    [0.24, 0.28, 0.32, 0.36, 0.40], // Bull: capex normalizes, full SaaS operating leverage emerges
  ],

  exitMultiple: [20, 33, 50],

  desc: [
    'FY27 preliminary guide of 16-17% is the ceiling, not the floor. Red Canary churn (MDR businesses have structurally higher churn than core ZS) hits net new ARR harder than expected. PANW Cortex + MSFT Entra bundle attacks mid-market pricing power. ' +
      'Capex pressure proves permanent: data center + branch appliance inflation keeps capex at high single-digits % of revenue indefinitely. FCF margin stays sub-22%. SBC stays 25%+ of revenue; GAAP profitability remains years away. ' +
      'Multiple compresses from 38× to 20-22× as growth rerates toward mid-teens. EPS CAGR ~8% from $4.50. 5yr target ~$105-130, roughly -6% to -7% annualized.',
    'ZS delivers on FY27 guide of 16-17%. AI Protect crosses $250M ARR by FY28, Data Security sustains 25%+ growth. Z-Flex deepens multi-year customer relationships and reduces churn. ' +
      'Capex pull-forward proves temporary; FCF margin recovers to 28-31% by FY29-30. Non-GAAP operating margin expands to 25-26% by FY28. SBC ratio gradually falls from 25% to 20% as revenue base scales. ' +
      'Multiple holds 35-38× — ZS re-rates as a stable compounder. EPS CAGR ~18% from $4.50. 5yr target ~$175-215, ~-1% to +3% annualized.',
    'AI agent security super-cycle: every AI agent, model deployment, and agentic workflow needs zero-trust identity + policy enforcement. ZS becomes the de-facto AI-security infrastructure. Symmetry acquisition + Anthropic/OpenAI partnerships create durable moat. ' +
      'FY27 reaccelerates above guidance: AI Protect → $500M+ ARR by FY28. Capex pull-forward was one-time; FCF margins recover to 36-40%. SBC ratio falls to 18% by FY28 as revenue scales faster than comp. ' +
      'Premium multiple holds at 50-55× on AI platform position. EPS CAGR ~25% from $4.50. 5yr target $310-370, ~11-15% annualized.',
  ],

  thesis: [
    'FY27 guide of 16-17% disappoints in execution. Red Canary MDR churn is higher than modeled; net new ARR ex-Red Canary stays at 10-12%. PANW Cortex bundling + MSFT Entra compress ZS pricing in mid-market. ' +
      'Capex stays structurally elevated (tariffs + data center inflation); FCF margin never recovers above 22%. SBC at 25%+ of revenue means true owner FCF is ~$200M on a ~$24B market cap = FCF yield ~0.8%. ' +
      'At 32× forward P/E for a decelerating 12-13% grower, multiple compression to 20-22× is the dominant return driver. Flat-to-negative annualized return over 5 years.',
    'ZS executes on FY27 guidance. Zero Trust Everywhere momentum (700+ enterprises, growing ~27% QoQ) shows platform stickiness. Z-Flex locks customers into multi-year terms, smoothing revenue and reducing churn. ' +
      'AI Protect + Data Security add $150-200M ARR by FY28 — incremental but meaningful. Operating leverage delivers: non-GAAP operating margin to 25%+ by FY28. Capex normalizes after FY26-27 pull-forward. ' +
      'SBC ratio gradually improves; GAAP operating margin approaches breakeven by FY28. Multiple holds as ZS re-rates from hyperscale to large-scale compounder. Fair return at current price.',
    'AI agents become the dominant security threat vector (CEO Jay Chaudhry: "soon AI agents will be the weakest link"). ZS is architecturally positioned — hide applications, eliminate lateral movement — and is the only platform with network + cloud + endpoint vantage points simultaneously. ' +
      'Anthropic Glasswing + OpenAI Daybreak + Symmetry identity graph = compound AI moat. AI Protect crosses $500M ARR by FY28, drives FY27 reacceleration above 17%. ' +
      'Operating leverage + SBC compression (to 18% by FY28) + possible buyback initiation drives 25%+ EPS CAGR. Premium multiple sustained at 50-55×. Durable 11-15% annualized returns.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.000, 0.003, 0.008],
  ebitdaProxy: [0.18, 0.27, 0.37],
  bullMaOptVal: false,

  epsCagr: [8, 18, 25],
  exitPE: [22, 38, 52],
  prob: [28, 45, 27],

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
    sbc: 828,
    gaapNi: -55,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY26E',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic — framework breaks down entirely; GAAP NI is negative so the SBC/NI ratio is undefined. Q3 FY26 SBC = $207M for one quarter (10-Q, excl. payroll taxes) → annualized ~$828M = 25% of FY26 $3.33B revenue (was 24.6% in FY25). SBC growing faster than revenue. GAAP Q3 net loss $13.9M; FY26E GAAP NI estimated ~-$55M. Non-GAAP EPS $1.08 vs GAAP EPS -$0.09 in Q3 = $1.17/share gap, almost entirely SBC addback. Zero buybacks across all years. Diluted shares 165M (non-GAAP Q3). FCF guided 22.8-23.3% FY26 = ~$760M reported FCF; subtract $828M SBC and true owner FCF is deeply negative.',
  },
});
