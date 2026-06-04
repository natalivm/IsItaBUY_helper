import { defineStock } from './defineStock';

export const DELL = defineStock({
  ticker: 'DELL',
  name: 'Dell Technologies',
  sector: 'Hardware / AI Infrastructure',
  themeColor: '#007DB8',

  currentPrice: 422.05,
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
  updatedOn: '06/04',
  lastReportTag: 'Q1 FY27',

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 212, targetHigh: 290, numAnalysts: 27 },

  strategicNarrative:
    'Q1 FY27 (May 2026): Revenue $43.8B (+88% YoY) · ISG $29.0B (+181%) · AI-Optimized Servers $16.1B (+757%) · GAAP EPS $5.24 (+282%) · Non-GAAP EPS $4.86 (+214%) · Op CF $4.1B (record Q1). Dell booked $24.4B in AI orders in Q1 alone; FY27 guidance raised to $167B midpoint (+47% YoY) with $60B AI server revenue target — backed by $43B of AI backlog entering the year.\n\n' +

    "Dell's moat is distribution, not silicon. Relationships with 98% of Fortune 500 and deep Nvidia Blackwell integration give Dell a reach that pure-play ODMs can't replicate at enterprise scale. The real margin opportunity is in the attach: PowerStore/PowerScale storage, networking, and ProSupport services carry 15–20%+ margins vs ~5% on server hardware. As AI projects mature from pilots to production, services and storage become recurring revenue and the FCF engine improves materially. At ~15× FY27 annualized EPS run-rate on 47% revenue growth, valuation is undemanding for a cyclical infrastructure leader with multi-quarter backlog visibility.\n\n" +

    'Risks: AI servers are thin-margin pass-through — FCF leverage to revenue growth is modest (~10% margin). Hyperscaler AI capex could normalize in FY28–29 faster than Dell\'s supply commitments, creating inventory risk. PC segment (~25% of rev) faces secular headwinds. Debt of $31B limits financial flexibility. Supermicro and HPE compete aggressively on AI server configs. Rating: STRONG BUY. The Q1 earnings quality — 88% revenue growth, $4.1B operating cash flow, and $43B backlog — represents a structural step-change, not a one-quarter beat. The services attach optionality is not in the current multiple.',

  revGrowth: [
    [0.33, 0.10, 0.07, 0.05, 0.04], // Bear: FY27 partial miss, AI capex normalizes fast in FY28
    [0.47, 0.18, 0.12, 0.09, 0.07], // Base: FY27 guide delivers, services attach grows
    [0.55, 0.28, 0.22, 0.16, 0.12], // Bull: AI super-cycle, enterprise + sovereign AI adds new leg
  ],

  fcfMargin: [
    [0.08, 0.08, 0.08, 0.09, 0.09], // Bear: server mix pressure, capex stays elevated
    [0.10, 0.11, 0.12, 0.12, 0.13], // Base: gradual improvement as services mix grows
    [0.12, 0.14, 0.16, 0.17, 0.18], // Bull: services attach accelerates, operating leverage
  ],

  exitMultiple: [8, 11, 15],
  ebitdaProxy: [0.09, 0.12, 0.16],
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
