import { defineStock } from './defineStock';

export const ZS = defineStock({
  ticker: 'ZS',
  name: 'Zscaler',
  sector: 'Cybersecurity / Zero Trust',
  themeColor: '#0067D9',
  currentPrice: 126.41,
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
  updatedOn: '05/28',
  lastReportTag: 'Q3 FY26',

  strategicNarrative:
    "Q3 FY26: Rev $850M (+25%) · ARR $3.525B (+25%) · Op margin 23% (record) · FCF $136M (16%) · EPS $1.08. Beat every metric.\n\n" +

    "Guide: FY26 raised to $3.33B rev / $4.10 EPS. FY27 preliminary 16–17% — the deceleration risk. Ex-Red Canary net new ARR only +14% in Q3.\n\n" +

    "FCF cut: FY26 margin 22.8–23.3% (from 26.5–27%). Capex pull-forward ahead of tariffs; FY27 capex +200bps.\n\n" +

    "AI traction: AI Protect TTM bookings $100M+ · Data Security ARR $500M+ (+30%) · Zero Trust Everywhere 700+ enterprises (vs 210+ a year ago) · Z-Flex Q3 TCV $480M (+60% QoQ).\n\n" +

    "Burry: SBC $828M = 25% of revenue, growing faster than rev. GAAP Q3 net loss $13.9M. Zero buybacks ever. True owner FCF near zero after SBC.\n\n" +

    "Valuation @ $144.70: Forward P/E ~32× on FY27 $4.50 EPS · P/ARR 5.2× · Consensus target $265 (+83%).",

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
