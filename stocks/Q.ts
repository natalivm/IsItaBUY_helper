import { defineStock } from './defineStock';

export const Q = defineStock({
  ticker: 'Q',
  name: 'Qnity Electronics, Inc.',
  sector: 'Specialty Materials / Semiconductor & Electronics',
  themeColor: '#00857c',
  updatedOn: '07/10',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 143.8,   // Jun 27 2026 close (52wk range $70.50-$177.28); DuPont electronics spin-off, listed Nov 2025
  fairPriceRange: '$130 - $250',
  shares0: 209,           // ~209.6M shares (1 Qnity per 2 DuPont); mkt cap ~$33B
  rev25: 4754,            // FY2025 revenue $4,754M (+9.7% YoY); Q1 2026 sales $1.315B (+18% YoY, +17% organic)
  fcfMargin25: 0.15,      // FY2025 FCF margin ~14.9% (FCF $706M); FY26E dips to ~8% on elevated capacity capex
  taxRate: 0.22,          // FY2026E effective tax ~22.2% (TIKR), trending toward ~20.5% by FY30
  cash: 850,             // ~$850M cash & ST investments at Q1 2026 (FY25 year-end $915M)
  debt: 4000,            // ~$4.0B total debt allocated at spin-off; net debt ~$3.1B
  beta: 1.2,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 3.97,          // FY2026E adjusted EPS — raised guidance midpoint $3.80-$4.14 (TIKR normalized $4.11). Q1 2026 adj EPS $1.08 (+33%). GAAP EPS ~$3.57E. Analyst path: $3.97→$4.79→$5.24→$5.90→$6.81 (FY26-30, ~14% CAGR).
  rsRating: 84,           // Strong — ran from ~$70 to a $177 high then to $158; near highs, consolidating
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Only true end-to-end materials pure-play — pattern, polish, protect and connect, from chip fab through advanced packaging, interconnect, thermal and AI PCBs',
    '"Shrink-to-stack" inflection multiplies materials intensity per device — more CMP steps and Qnity content as architectures move from 2D to 3D',
    'Interconnect Solutions is a structural upgrade — advanced packaging, thermal and AI PCBs are the fastest-growing, highest-margin lines, riding data-center demand',
    'OEMs like NVIDIA and Apple now pull Qnity in early on material selection — deeper, stickier partnerships and earlier process-of-record wins',
    'Local-for-local model and qualified-in positions create high switching costs and agility through tariff and geopolitical shocks',
  ],

  risksToBuy: [
    'Richly valued at a high earnings multiple (PEG well above 1) for a mid-teens grower — limited margin of safety',
    'Semiconductor materials demand is cyclical — a chip-capex or memory-pricing downturn would pressure volumes, pricing and mix',
    'Capital-intensive buildout (new Taiwan and Delaware capacity) and elevated near-term CapEx weigh on free cash flow',
    'Leadership still forming — interim CFO and an open Head of Semiconductor at a young standalone company',
    'Customer concentration among a handful of large chipmakers and OEMs amplifies order volatility; carries ~$4B of spin-off debt',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 140, targetMedian: 173, targetHigh: 200, numAnalysts: 7 },

  epsCagr: [9, 15, 21],   // Base toward the TIKR ~14% FY26-30 adj-EPS path; bull captures content/share-gain upside
  exitPE: [18, 26, 34],
  prob: [30, 45, 25],

  revGrowth: [
    [0.06, 0.05, 0.04, 0.04, 0.03],   // Bear: chip-capex downturn slows materials demand
    [0.12, 0.11, 0.10, 0.09, 0.09],   // Base: ~11-12% guided FY26, decelerating with AI/advanced-packaging mix
    [0.18, 0.16, 0.14, 0.12, 0.11],   // Bull: AI leading-edge + packaging super-cycle
  ],
  fcfMargin: [
    [0.08, 0.11, 0.12, 0.13, 0.13],
    [0.10, 0.14, 0.15, 0.15, 0.16],   // FY26 capex dip then recovery toward ~15%
    [0.12, 0.16, 0.18, 0.19, 0.20],
  ],
  exitMultiple: [14, 20, 26],
  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.28, 0.31, 0.34],
  bullMaOptVal: false,

  desc: [
    'A semiconductor capex downturn slows materials demand; volumes and pricing soften and the spin-off premium fades. EPS compounds only ~9% from the FY2026E $3.97 base and the market reprices Qnity as a cyclical materials supplier at ~18x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Qnity delivers mid-teens earnings growth as the "shrink-to-stack" shift lifts materials intensity and Interconnect Solutions (advanced packaging, thermal, AI PCBs) drives the fastest, highest-margin growth, with operating leverage as the standalone cost base matures. EPS compounds ~15% from the $3.97 base while the rich ~40x multiple normalizes toward ~26x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality semi-materials compounder — but the multiple already prices much of the growth.',
    'AI-driven demand for advanced materials and packaging compounds faster than expected; Qnity wins content and share across logic and memory roadmaps and expands margins on a sharpened cost base. EPS compounds ~21% from the $3.97 base and the market awards a premium ~34x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: semiconductor materials demand is ultimately cyclical, tied to fab utilization and chip capex. As a fresh spin-off with a short track record, an interim CFO and elevated growth capex, Qnity could disappoint on free cash flow, and a chip-capex or memory air-pocket would hit volumes and mix. ' +
      'At ~40x forward on a mid-teens grower, the {spot} entry leaves little cushion if the cycle turns.',
    'The franchise is genuinely strong: Qnity is the only end-to-end materials pure-play — pattern, polish, protect, connect — and the move from shrink to stack multiplies its content per device, with NVIDIA and Apple now pulling it into design early. Interconnect (advanced packaging, thermal, AI PCBs) is a structural upgrade, the fastest-growing and highest-margin part of the book, and data center is already ~20% of the mix. ' +
      'The catch is valuation: ~40x forward earnings for ~15% growth is a PEG well above 1, and the stock has roughly doubled off its lows. Verdict: HOLD — own the quality on a pullback, not at a premium multiple.',
    'The bull case: advanced packaging, thermal and AI PCBs become a durable AI-driven growth engine, Qnity gains content and share as a focused standalone, and the market keeps paying a premium for the semi-materials "arms dealer" that touches the whole stack. ' +
      '{target} is achievable if the cycle stays strong and execution is clean. Probability 25% — high quality, but cyclical and richly priced.',
  ],

  burry: {
    sbc: 20,
    gaapNi: 692,
    buyback: 30,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine. FY2025 GAAP stock-comp was just $20M vs $692M GAAP NI = ~2.9% naive (TIKR). Buybacks (~$30M, to offset dilution) exceed SBC, so net dilution is slightly negative, and the short trading history limits MTM amplification. Genuinely minimal comp — an industrial-heritage (DuPont) cost structure, not a tech-style SBC machine.',
  },

  debtSafety: {
    netDebt: 3100,
    ebitda: 1580,
    fy: 'FY26E',
    note: 'GREEN. Net debt ~$3.1B vs FY2026E EBITDA guidance midpoint ~$1.58B => ~2.0x (2.2x on trailing FY25 EBITDA). Rapidly de-levering — TIKR models a path to net cash by FY30 — on strong free cash flow (FY26 guide $500-600M) and ~15x+ interest coverage. The real risk is semiconductor cyclicality, not leverage.',
  },
});
