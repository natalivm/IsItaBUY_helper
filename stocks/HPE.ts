import { defineStock } from './defineStock';

export const HPE = defineStock({
  ticker: 'HPE',
  name: 'Hewlett Packard Enterprise Company',
  sector: 'Networking / AI Infrastructure',
  themeColor: '#01A982',

  currentPrice: 46.8,
  fairPriceRange: '$15 - $85',
  shares0: 1330,
  rev25: 34296,
  fcfMargin25: 0.06,
  taxRate: 0.16,
  cash: 4840,
  debt: 21660,
  beta: 1.30,
  costDebt: 0.045,

  rsRating: 93,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '06/11',
  lastReportTag: 'Q2 FY26',

  analystConsensus: { rating: 'Buy', targetLow: 32, targetMedian: 50, targetHigh: 68, numAnalysts: 25 },

  reasonsToBuy: [
    'Juniper acquisition fundamentally transforms HPE from commodity hardware into a networking-led infrastructure platform',
    'Record gross margin expansion confirms structural shift — synergies are executing ahead of schedule',
    'Networks for AI (Ethernet fabrics, Aruba campus, sovereign AI) positions HPE at the center of enterprise AI buildout',
    'Multi-year financial framework introduced for the first time gives investors unusual forward visibility into FY27',
    'Undemanding valuation relative to revenue growth rate makes the risk-reward compelling if synergies compound',
  ],

  risksToBuy: [
    'Heavy net debt from the Juniper acquisition constrains buyback capacity and amplifies downside in a downturn',
    'Revenue growth is expected to decelerate sharply after FY26, limiting the case for a premium networking multiple',
    'Hardware-heavy model keeps CapEx high and FCF margins well below software peers even in the bull case',
    'AI capex normalization or enterprise budget fatigue could cut into networking orders faster than management expects',
    'High SBC relative to GAAP earnings means reported profitability overstates true owner economics meaningfully',
  ],

  revGrowth: [
    [0.25, 0.07, 0.05, 0.04, 0.03], // Bear: AI capex normalizes fast, Juniper synergies miss, server/storage declines
    [0.31, 0.10, 0.08, 0.07, 0.06], // Base: FY26 guidance delivers, FY27 framework holds
    [0.33, 0.15, 0.12, 0.10, 0.08], // Bull: AI fabric becomes dominant enterprise infrastructure layer
  ],

  fcfMargin: [
    [0.06, 0.07, 0.07, 0.08, 0.08], // Bear: synergy disappointment, hardware mix drag
    [0.08, 0.09, 0.10, 0.11, 0.12], // Base: FCF guidance delivers, margin expands per FY27 framework
    [0.10, 0.13, 0.15, 0.17, 0.18], // Bull: networking mix shift drives software-like FCF leverage
  ],

  exitMultiple: [7, 12, 16],
  ebitdaProxy: [0.10, 0.14, 0.18],
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.003, 0.010, 0.015],

  desc: [
    'AI capex normalizes faster than HPE\'s integration model assumed. Juniper synergies come in below the $600M target; legacy server and storage revenue declines offset networking gains. Net debt ($16.8B) becomes a FCF burden as margins stall. Multiple compresses to 7× as market re-rates HPE as cyclical IT hardware. Bear-case 5yr target ~$12–18.',
    'HPE delivers on FY26 guidance (+31% revenue, FCF ≥$3.5B) and the FY27 framework proves durable (+8–12% growth, FCF ≥$4.5B). Juniper synergies hit the $600M target by FY27. Networks for AI orders expand as enterprise AI buildout moves from pilots to production. FCF margin improves from 8% to 12% on operating leverage and networking mix. Multiple holds at 12× as the networking premium is partially earned. Base-case 5yr target ~$48–55.',
    'AI networking becomes the dominant enterprise infrastructure layer and HPE is the distribution platform for it. Sovereign AI programs, on-prem model hosting, and edge inference drive a second wave of AI fabric demand in FY28–30. Juniper\'s Mist AI becomes the de facto campus AI platform. FCF margin reaches 17–18% as networking mix exceeds 50% of revenue. Multiple expands to 16× as earnings quality justifies a Cisco-tier premium. Bull-case 5yr target ~$80–100.',
  ],

  burry: {
    sbc: 1400,
    gaapNi: 3300,
    buyback: 200,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 95,
    overstatementSource: 'estimated',
    note: 'FY26E SBC ~$1.4B vs GAAP NI ~$3.3B = 42% naive; 2.7× stock rise (2023–2026) → 2.5× MTM amplifier → ~105% pre-cap. Set at 95% (profitable, unlike GAAP-loss peers).',
  },

  debtSafety: {
    netDebt: 16820,
    ebitda: 5800,
    capexToOcf: 0.34,
    interestCoverage: 6.0,
    altmanZ: 2.5,
    fy: 'FY26',
    note: 'Juniper acquisition ($14B, Feb 2024) drives leverage. Net debt ~2.9× EBITDA. CapEx/OCF 34% (hardware model); interest coverage 6× PASSES; Altman Z ~2.5 soft-flag for asset-heavy model.',
  },
});
