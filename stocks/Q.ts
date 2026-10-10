import { defineStock } from './defineStock';

export const Q = defineStock({
  ticker: 'Q',
  name: 'Qnity Electronics, Inc.',
  sector: 'Specialty Materials / Semiconductor & Electronics',
  themeColor: '#00857c',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 126.6,   // 52wk range ~$70-$177; DuPont electronics spin-off, listed Nov 2025
  fairPriceRange: '$150 - $189',  // stockanalysis.com analyst target range, Oct 1 2026
  shares0: 209,           // ~209.6M shares (1 Qnity per 2 DuPont); mkt cap ~$33B
  rev25: 4754,            // FY2025 revenue $4,754M (+9.7% YoY); Q1 2026 sales $1.315B (+18% YoY, +17% organic)
  fcfMargin25: 0.15,      // FY2025 FCF margin ~14.9% (FCF $706M); FY26E dips to ~8% on elevated capacity capex
  taxRate: 0.22,          // FY2026E effective tax ~22.2% (TIKR), trending toward ~20.5% by FY30
  cash: 961,             // Jun 30 2026 cash & equivalents
  debt: 4020,            // Jun 30 2026: ~$4.0B (spin-off debt); net debt ~$3.06B
  beta: 1.2,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 4.50,          // FY2026E adjusted EPS = guide midpoint $4.40-4.60 (raised at Q2 2026 from $3.80-4.14; consensus $4.59, FY27E $5.38 +17%). Q2 adj EPS $1.19 (+53%), Q1 $1.08. Prior: $3.97 (Q1 guide mid).
  rsRating: 56,           // IBD RS per user, 10/10/2026 (was 84) — stock drifted ~$131 → $117-132 range since July despite the guide raise
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',  // Post-Q2 2026 the base case is ~13.2% CAGR — a hair over the 13% soft STRONG-BUY line (TAILWIND boost), so the model would flip BUY↔STRONG BUY on small price moves. BUY is the real read: valuation de-rated to ~28× FY26E on a big guide raise, but semi-materials are cyclical and RS has cooled (84→56).

  // Q2 2026 UPDATE (Aug 4, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Big beat-and-raise. Net sales $1.429B (+22%, organic +22%) vs ~$1.36B
  // consensus. Semiconductor Technologies $744M (+17% organic); Interconnect
  // Solutions $685M (+28% organic). Adj. op EBITDA $431M (+24%, 30.2%
  // margin). Adj. EPS $1.19 (+53%) vs $1.07 consensus; GAAP EPS $0.59. Adj.
  // FCF $259M. Cash $961M vs ~$4.0B debt (net ~$3.06B, ~1.8× FY26E EBITDA).
  // H1: $50M buybacks, $34M dividends. Interim CFO still in place.
  // FY26 GUIDE RAISED: net sales $5.55-5.65B (from $5.225-5.375B, ~+18%),
  // adj. op EBITDA $1.675-1.725B, adj. EPS $4.40-4.60 (from $3.80-4.14), adj.
  // FCF $600-700M. CEO: "shrink and stack" adding materials intensity; AI,
  // HPC and connectivity reshaping demand. Street: Strong Buy (8), PT
  // $150-189 (median $177.5); FY27E rev $6.30B, EPS $5.38. Yet the stock is
  // ~flat since July (~$127) — now ~28× FY26E / ~24× FY27E, down from ~40×.
  // Net: fundamentals and valuation both improved; verdict HOLD → BUY.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Only true end-to-end materials pure-play — pattern, polish, protect and connect, from chip fab through advanced packaging, interconnect, thermal and AI PCBs',
    '"Shrink-to-stack" inflection multiplies materials intensity per device — more CMP steps and Qnity content as architectures move from 2D to 3D',
    'Interconnect Solutions is a structural upgrade — advanced packaging, thermal and AI PCBs are the fastest-growing, highest-margin lines, riding data-center demand',
    'OEMs like NVIDIA and Apple now pull Qnity in early on material selection — deeper, stickier partnerships and earlier process-of-record wins',
    'Local-for-local model and qualified-in positions create high switching costs and agility through tariff and geopolitical shocks',
  ],

  risksToBuy: [
    'Still a premium multiple for a cyclical materials business — a chip downturn would compress it quickly',
    'Semiconductor materials demand is cyclical — a chip-capex or memory-pricing downturn would pressure volumes, pricing and mix',
    'Capital-intensive buildout (new Taiwan and Delaware capacity) and elevated near-term CapEx weigh on free cash flow',
    'Leadership still forming — interim CFO and an open Head of Semiconductor at a young standalone company',
    'Customer concentration among a handful of large chipmakers and OEMs amplifies order volatility; carries ~$4B of spin-off debt',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 150, targetMedian: 177.5, targetHigh: 189, numAnalysts: 8 },  // stockanalysis.com, Oct 1 2026

  epsCagr: [9, 15, 21],   // Kept at Q2 2026: FY27E +17% then decelerating ≈ 15% base. Base toward the TIKR ~14% FY26-30 adj-EPS path; bull captures content/share-gain upside
  exitPE: [18, 26, 34],
  prob: [30, 45, 25],

  revGrowth: [
    [0.15, 0.04, 0.04, 0.04, 0.03],   // Bear: FY26 near low end of raised guide (H1 locked); then chip-capex downturn slows materials demand
    [0.18, 0.12, 0.10, 0.09, 0.09],   // Base: FY26 guide mid ~$5.6B (+18%), FY27 ≈ consensus $6.3B, decelerating
    [0.20, 0.16, 0.14, 0.12, 0.11],   // Bull: AI leading-edge + packaging super-cycle
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
    'A semiconductor capex downturn slows materials demand; volumes and pricing soften and the spin-off premium fades. EPS compounds only ~9% from the FY2026E $4.50 base and the market reprices Qnity as a cyclical materials supplier at ~18x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Qnity delivers mid-teens earnings growth as the "shrink-to-stack" shift lifts materials intensity and Interconnect Solutions (advanced packaging, thermal, AI PCBs) drives the fastest, highest-margin growth, with operating leverage as the standalone cost base matures. EPS compounds ~15% from the $4.50 base while the ~28x multiple eases toward ~26x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality semi-materials compounder at a now-reasonable multiple.',
    'AI-driven demand for advanced materials and packaging compounds faster than expected; Qnity wins content and share across logic and memory roadmaps and expands margins on a sharpened cost base. EPS compounds ~21% from the $4.50 base and the market awards a premium ~34x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: semiconductor materials demand is ultimately cyclical, tied to fab utilization and chip capex. As a fresh spin-off with a short track record, an interim CFO and elevated growth capex, Qnity could disappoint on free cash flow, and a chip-capex or memory air-pocket would hit volumes and mix. ' +
      'Even at ~28x FY26E after the de-rating, the {spot} entry assumes the cycle holds.',
    'The franchise is genuinely strong: Qnity is the only end-to-end materials pure-play — pattern, polish, protect, connect — and the move from shrink to stack multiplies its content per device, with NVIDIA and Apple now pulling it into design early. Interconnect (advanced packaging, thermal, AI PCBs) is a structural upgrade, the fastest-growing and highest-margin part of the book, and data center is already ~20% of the mix. ' +
      'Valuation was the catch at ~40x; after a big Q2 guide raise (FY26 EPS to $4.40-4.60) with the stock flat, it now trades ~28x FY26E / ~24x FY27E for mid-teens growth. Verdict: BUY — quality at a fair price, sized for semiconductor cyclicality.',
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
    netDebt: 3059,         // Jun 30 2026: ~$4.02B debt − $961M cash
    ebitda: 1700,          // FY26E adj. op EBITDA guide midpoint ($1.675-1.725B, raised at Q2)
    fy: 'FY26E',
    note: 'GREEN. Net debt ~$3.06B vs raised FY2026E EBITDA guidance midpoint ~$1.70B => ~1.8x (was ~2.0x on the prior $1.58B guide). Rapidly de-levering — TIKR models a path to net cash by FY30 — on strong free cash flow (FY26 guide $500-600M) and ~15x+ interest coverage. The real risk is semiconductor cyclicality, not leverage.',
  },
});
