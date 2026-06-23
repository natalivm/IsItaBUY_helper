import { defineStock } from './defineStock';

export const DELL = defineStock({
  ticker: 'DELL',
  name: 'Dell Technologies',
  sector: 'Hardware / AI Infrastructure',
  themeColor: '#007DB8',

  currentPrice: 427.78,
  fairPriceRange: '$230 - $460',
  shares0: 650,
  rev25: 113500,
  fcfMargin25: 0.10,
  taxRate: 0.20,
  cash: 11578,
  debt: 31161,
  beta: 1.35,
  costDebt: 0.045,

  rsRating: 92,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '06/23',
  lastReportTag: 'Q1 FY27',

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 212, targetHigh: 290, numAnalysts: 27 },

  reasonsToBuy: [
    'Unmatched Fortune 500 distribution reach that pure-play ODMs cannot replicate at enterprise scale',
    'Massive multi-quarter AI server backlog gives rare revenue visibility for a hardware business',
    'High-margin services and storage attach to AI deployments is an underpriced earnings-quality upgrade',
    'Deep Nvidia Blackwell integration positions Dell as the default on-prem AI infrastructure vendor',
    'Valuation remains undemanding relative to the scale of revenue and cash flow growth being delivered',
  ],

  risksToBuy: [
    'AI server hardware is a thin-margin pass-through, so explosive revenue growth does not translate equally to free cash flow',
    'Hyperscaler capex normalization in coming years could unwind backlog faster than supply commitments allow',
    'PC segment faces ongoing secular decline and contributes meaningfully to overall revenue mix',
    'Debt load of tens of billions limits financial flexibility and amplifies cyclical downside risk',
    'Supermicro and HPE compete aggressively on liquid-cooled Blackwell configurations, pressuring share',
  ],

  revGrowth: [
    [0.33, 0.10, 0.07, 0.05, 0.04], // Bear: FY27 partial miss, AI capex normalizes fast in FY28
    [0.47, 0.15, 0.10, 0.07, 0.06], // Base: FY27 guide delivers Y1, growth tapers as backlog ships
    [0.55, 0.28, 0.22, 0.16, 0.12], // Bull: AI super-cycle, enterprise + sovereign AI adds new leg
  ],

  fcfMargin: [
    [0.08, 0.08, 0.08, 0.09, 0.09], // Bear: server mix pressure, capex stays elevated
    [0.09, 0.09, 0.10, 0.10, 0.11], // Base: thin AI-server mix keeps FCF margin modest
    [0.12, 0.14, 0.16, 0.17, 0.18], // Bull: services attach accelerates, operating leverage
  ],

  exitMultiple: [8, 9, 15],
  ebitdaProxy: [0.09, 0.10, 0.16],
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.005, 0.015, 0.025],

  desc: [
    'FY27 disappoints against the $167B guide — AI server backlog slips as hyperscaler CapEx normalizes faster than expected. Supermicro captures share on liquid-cooled Blackwell configs. PC segment contracts further. Server mix keeps FCF margins at 8%. Multiple compresses to 8–9× EBITDA as market re-rates Dell as cyclical hardware. Bear-case 5yr target ~$180–210.',
    'Dell delivers on FY27 guidance and the $60B AI server target. Services attach rates improve as enterprise deployments scale from PoC to production infrastructure; storage and networking mix rises. FCF margin expands from 10% to 12–13% by FY30 on operating leverage. Multiple holds at 11× as Dell earns a partial infrastructure premium. Base-case 5yr target ~$380–430.',
    'AI becomes the dominant enterprise infrastructure layer and Dell is the distribution channel. Sovereign AI programs, on-prem model hosting, and edge inference drive a second AI server wave in FY29–30. Services ARR grows 20%+/yr. FCF margin reaches 17–18%. Multiple expands to 14–15× as earnings quality improves. Bull-case 5yr target ~$560–650.',
  ],

  burry: {
    sbc: 785,
    gaapNi: 4000,
    buyback: 3500,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 55,
    overstatementSource: 'estimated',
    note: 'Critical — estimated. FY26 SBC $785M vs est. GAAP NI ~$4B = naive 20%. DELL stock ~6× over 3 years (from ~$50 in 2023 to $305 post-Q1-FY27 surge); MTM amplifier ~4×. Offset partially by ~$3.5B in estimated buybacks (4.5× SBC, 20% offset). Estimated overstatement ~55%. FY26 GAAP NI is an estimate pending full 10-K review.',
  },
  debtSafety: {
    netDebt: 19583,
    ebitda: 7500,
    capexToOcf: 0.12,
    interestCoverage: 3.6,
    altmanZ: 2.8,
    fy: 'FY26',
    note: 'Hardware distribution model keeps CapEx low (PASS), but interest coverage at 3.6× and Altman Z at 2.8 both fall short of thresholds. High leverage on a thin-margin business is the core risk.',
  },
});
