import { defineStock } from './defineStock';

export const Q = defineStock({
  ticker: 'Q',
  name: 'Qnity Electronics, Inc.',
  sector: 'Specialty Materials / Semiconductor & Electronics',
  themeColor: '#00857c',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 158.20,   // Jun 26 2026 close (DuPont electronics spin-off, listed Nov 2025)
  fairPriceRange: '$110 - $215',
  shares0: 209,           // ~209M shares (1 Qnity per 2 DuPont); mkt cap ~$33B
  rev25: 4400,            // FY2025 revenue ~$4.4B; Q1 2026 sales $1.315B (+17.7% YoY)
  fcfMargin25: 0.16,
  taxRate: 0.22,
  cash: 500,
  debt: 3000,            // debt allocated at spin-off; net debt ~$2.3B
  beta: 1.2,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 3.75,          // FY2026E adjusted EPS guidance midpoint ($3.55-$3.95)
  rsRating: 84,           // Estimated — up ~65% since the Nov 2025 debut, consolidating (RSI ~50)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Picks-and-shovels supplier of materials into semiconductor fabs — recurring, high-margin revenue that scales with chip output',
    'Direct beneficiary of AI-driven leading-edge and advanced-packaging demand (Interconnect Solutions growing fastest)',
    'Spin-off "hidden gem" dynamic — a focused electronics-materials pure-play freed from the DuPont conglomerate discount',
    'Sticky, qualified-in positions across the supply chain create high switching costs and durable share',
    'Steady mid-teens revenue growth with operating leverage as a newly independent company sharpens its cost base',
  ],

  risksToBuy: [
    'Richly valued at a high earnings multiple (PEG well above 1) for a mid-teens grower — limited margin of safety',
    'Semiconductor materials demand is cyclical — a chip-capex downturn would pressure volumes and pricing',
    'Short trading history as a recent spin-off, with thin analyst coverage and an unproven standalone track record',
    'Carries spin-off debt and ongoing separation/standup costs that can weigh on near-term margins',
    'Customer concentration among a handful of large chipmakers amplifies order volatility',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 165, targetHigh: 215, numAnalysts: 8 },

  epsCagr: [8, 16, 22],
  exitPE: [18, 26, 34],
  prob: [30, 45, 25],

  revGrowth: [
    [0.06, 0.05, 0.04, 0.04, 0.03],   // Bear: chip-capex downturn slows materials demand
    [0.16, 0.14, 0.12, 0.10, 0.08],   // Base: ~15-18% growth with AI/advanced-packaging mix
    [0.22, 0.19, 0.16, 0.13, 0.11],   // Bull: AI leading-edge + packaging super-cycle
  ],
  fcfMargin: [
    [0.13, 0.14, 0.14, 0.15, 0.15],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.18, 0.20, 0.22, 0.23, 0.24],
  ],
  exitMultiple: [14, 20, 26],
  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.22, 0.28, 0.32],
  bullMaOptVal: false,

  desc: [
    'A semiconductor capex downturn slows materials demand; volumes and pricing soften and the spin-off premium fades. EPS compounds only ~8% from the FY2026E $3.75 base and the market reprices Qnity as a cyclical materials supplier at ~18x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Qnity delivers mid-teens revenue growth as AI leading-edge and advanced-packaging mix (Interconnect Solutions) drives the highest growth, with operating leverage as the standalone cost base matures. EPS compounds ~16% from the $3.75 base while the multiple normalizes toward ~26x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality semi-materials compounder — but the multiple already prices much of the growth.',
    'AI-driven demand for advanced materials and packaging compounds faster than expected; Qnity gains share and expands margins on a sharpened cost base. EPS compounds ~22% from the $3.75 base and the market awards a premium ~34x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: semiconductor materials demand is ultimately cyclical, tied to fab utilization and chip capex. As a fresh spin-off with a short track record and standup costs, Qnity could disappoint on margins, and a chip-capex air-pocket would hit volumes and pricing. ' +
      'At a rich multiple on a mid-teens grower, the {spot} entry leaves little cushion if the cycle turns.',
    'The franchise is genuinely good: Qnity sells qualified-in, high-margin materials into the chip supply chain — recurring revenue that compounds with AI-driven leading-edge and advanced-packaging demand, now freed from the DuPont conglomerate discount. ' +
      'The catch is valuation: ~42x forward earnings for ~16% growth is a PEG well above 1, and the spin-off has run ~65% since debut. Verdict: HOLD — own the quality on a pullback, not at a premium multiple.',
    'The bull case: advanced packaging and leading-edge materials become a durable AI-driven growth engine, Qnity gains share and expands margins as a focused standalone, and the market keeps paying a premium for a semi-cap "arms dealer." ' +
      '{target} is achievable if the cycle stays strong and execution is clean. Probability 25% — high quality, but cyclical and richly priced.',
  ],

  burry: {
    sbc: 80,
    gaapNi: 600,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'OK tier. SBC ~$80M vs GAAP NI ~$600M = ~13% naive; the ~65% post-spin run adds a modest MTM amplifier. As a recent industrial spin-off, comp is moderate and GAAP NI is depressed by separation/amortization. Refresh with reported figures.',
  },

  debtSafety: {
    netDebt: 2300,
    ebitda: 1400,
    capexToOcf: 0.25,
    interestCoverage: 7,
    altmanZ: 3.0,
    fy: 'FY25',
    note: 'GREEN. Net debt ~$2.3B (debt ~$3.0B allocated at spin-off, cash ~$0.5B) vs EBITDA ~$1.4B => leverage ~1.6x, within the 2x threshold. Manageable; the real risk is semiconductor cyclicality, not leverage.',
  },
});
