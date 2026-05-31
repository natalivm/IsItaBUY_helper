import { defineStock } from './defineStock';

export const MU = defineStock({
  ticker: 'MU',
  name: 'Micron Technology',
  sector: 'DRAM / NAND Flash Memory',
  themeColor: '#1a73e8',
  currentPrice: 122.00,
  shares0: 1127,
  rev25: 58119,
  fcfMargin25: 0.15,
  taxRate: 0.138,
  cash: 14589,
  debt: 10798,
  beta: 1.7,
  costDebt: 0.05,
  rsRating: 90,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '31/05',
  lastReportTag: 'LTM Q2 FY26',
  fairPriceRange: '$80 - $280',

  strategicNarrative:
    'Micron is the only US-headquartered DRAM and NAND manufacturer at scale, giving it strategic importance that pure financial analysis understates — CHIPS Act subsidies and government demand for domestic semiconductor supply are structural tailwinds that Samsung and SK Hynix cannot neutralize. The current cycle is exceptional: DRAM pricing has inflected sharply on AI infrastructure demand, with HBM (High Bandwidth Memory) emerging as a structurally superior product commanding 5-8× the ASP of commodity DRAM. Micron\'s HBM3E ramp — now supplying NVIDIA for GB200 systems — represents the single most important inflection in the company\'s 45-year history. HBM is supply-constrained by back-end packaging capacity, not fab capacity, which means Samsung\'s manufacturing scale advantage is partially neutralized.\n\nThe irreducible bull case: HBM becomes a durable oligopoly (SK Hynix, Micron, Samsung only — no new entrants possible at the fab investment required) with pricing power structurally superior to commodity memory. MU\'s CHIPS Act fabs in Idaho and New York, combined with HBM ramp, could sustain 50%+ EBITDA margins through the cycle trough that FY23 demonstrated ($4.1B EBITDA on $15.5B revenue). The bear case is classic: Samsung has structural incentives to subsidize fab utilization regardless of pricing; DRAM oversupply in 2026-27 could compress margins to near-zero even as HBM remains tight. The FY23 cycle trough is the template — the question is whether HBM premium pricing creates a durable floor or just softens the next trough by a few percentage points.',

  modelType: 'EPS_PE',
  baseEps: 21.26,

  revGrowth: [
    [0.00, -0.25, -0.15, 0.05, 0.08],
    [0.15, 0.05, 0.08, 0.08, 0.07],
    [0.30, 0.20, 0.18, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.08, 0.02, -0.02, 0.05, 0.10],
    [0.18, 0.20, 0.22, 0.22, 0.22],
    [0.28, 0.30, 0.30, 0.28, 0.27],
  ],
  exitMultiple: [8, 13, 20],

  epsCagr: [-20, 8, 20],
  exitPE: [7, 12, 18],
  prob: [25, 50, 25],

  desc: [
    'DRAM oversupply as Samsung/SK Hynix defend share through 2027-28. HBM growth insufficient to offset commodity DRAM collapse. EPS mean-reverts sharply toward FY23 trough levels. Stock re-rates to trough multiple (7×). Bear-case target ~$50-70.',
    'HBM ramp sustains above-trough margins through cycle softness. MU gains HBM share from SK Hynix, CHIPS Act fabs deliver cost improvements. EPS compounds modestly on volume + mix. Market assigns mid-cycle 12× on normalized earnings. Target ~$130-180.',
    'HBM becomes structurally dominant AI memory standard — MU achieves 30%+ HBM market share. CHIPS Act tax benefits + domestic premium pricing from hyperscalers sustains peak margins. EPS compounds at 20%+; market re-rates to 18× as cyclicality is structurally impaired by HBM oligopoly pricing. Target ~$350-500.',
  ],

  ebitdaProxy: [0.15, 0.40, 0.58],
  bbRate: [0.002, 0.005, 0.010],
  bullMaOptVal: false,

  burry: {
    sbc: 309,
    gaapNi: 24111,
    buyback: 528,
    epsBasis: 'GAAP',
    fy: 'LTM Q2 FY26',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $309M on $24.1B GAAP NI = 1.3% naive ratio. Buybacks ($528M) = 1.7× SBC. Stock has appreciated ~2× since FY23 trough, limiting MTM amplifier. Estimated 5% overstatement. Watch if stock price continues to compound — unvested awards will mechanically increase overstatement on next cycle peak.',
  },

  debtSafety: {
    netDebt: -5829,
    ebitda: 36803,
    fy: 'LTM Q2 FY26',
    note: 'Net cash of $5.8B at cycle peak — FY23 trough saw net debt of ~$5B, illustrating the violent cash swing. CHIPS Act fab buildout drives CapEx/OCF of ~54% but is funded by government grants and operates from a net-cash position.',
  },
});
