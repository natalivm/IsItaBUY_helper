import { defineStock } from './defineStock';

export const CACI = defineStock({
  ticker: 'CACI',
  name: 'CACI International Inc.',
  sector: 'Defense IT / National Security Services',
  themeColor: '#1d4ed8',
  updatedOn: '10/23',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-11',
  currentPrice: 619.22,
  fairPriceRange: '$540 - $892',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 22.1,
  rev25: 9570,           // FY2026A (Jun 2026) $9.57B (+10.9%) — base year; revGrowth[0] = FY27 (guide ~+12.4% mid; consensus $10.78B)
  fcfMargin25: 0.077,    // FY2026A FCF $735M / $9.57B
  taxRate: 0.21,
  cash: 193,             // Jun 2026 (stockanalysis)
  debt: 5380,            // post-ARKA (stockanalysis)
  beta: 0.58,
  costDebt: 0.045,
  modelType: 'EPS_PE',    // Converted from DCF: low beta (0.58) made the Gordon perpetuity explode (base ~$1,616 vs ~$620 prose). Defense-IT has clean, stable adjusted EPS — EPS×P/E is the right frame and lands targets on the street.
  // ratingOverride 'BUY' dropped per user 10/11/2026 — the model's HOLD (base ~6% 5yr CAGR at 16× exit) stands.

  rsRating: 92,          // IBD RS per user, 10/11/2026 (was 28)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Q4 revenue $2.71B (+17.6%, +11.6% organic), adj. EPS $8.91 (beat
  // ~$7.26). FY26: revenue ~$9.57B (+10.9%, 7.2% organic), adj. EPS $29.83
  // (+12.7%), FCF $735M, awards $10.2B (book-to-bill 1.1). FY27 GUIDE:
  // revenue ~+12.4% at midpoint, EBITDA margin high-12%s, FCF ≥$900M; on
  // track to meet/exceed 3-year targets. Street: Buy (16), PT $540-892
  // (median $715); FY27E rev $10.78B / EPS $33.60, FY28E $11.50B / $37.67.
  // Stock $610.65 (~18× FY27E). Net debt ~$5.2B post-ARKA (~4.4× EBITDA).
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'National security and DoD revenue concentration provides a ring-fence that DOGE civilian cuts have consistently exempted',
    'ARKA acquisition adds hypersonics, electronic warfare, and space capabilities receiving accelerated bipartisan funding',
    'Massive contracted backlog and bid pipeline deliver multi-year revenue visibility well above typical defense IT peers',
    'Free cash flow is guided to jump next year as ARKA contributes and the software-defined mix grows',
    'Pristine SBC profile and consistent share buybacks make CACI one of the cleanest cash-flow stories in defense tech',
  ],

  risksToBuy: [
    'Post-ARKA leverage is substantial and requires sustained FCF execution to deleverage without financial strain',
    'New interest expense from acquisition financing is diluting near-term EPS, creating institutional selling pressure',
    'The stock has re-rated with momentum, so the valuation now leans on execution against a higher bar',
    'Integrating a multi-billion acquisition while managing an existing large backlog introduces meaningful operational complexity',
    'Any DOGE-driven scope creep into national-security-adjacent IT contracts beyond the current exemption ring-fence would be a surprise negative',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 540, targetMedian: 715, targetHigh: 892, numAnalysts: 16 },  // stockanalysis.com (Oct 7 2026)

  revGrowth: [
    [0.10, 0.04, 0.04, 0.04, 0.04],  // Bear: FY27 includes ARKA; then DOGE pressure on federal IT, integration friction
    [0.125, 0.07, 0.07, 0.07, 0.06], // Base: FY27 ≈ guide (+12.4%, ARKA full year), then mid/high-single digits
    [0.14, 0.13, 0.12, 0.10, 0.09],  // Bull: cyber/AI/hypersonics acceleration, major new IC wins
  ],

  fcfMargin: [
    [0.06, 0.07, 0.07, 0.07, 0.08],  // Bear: integration costs weigh, margin pressure
    [0.08, 0.09, 0.09, 0.10, 0.10],  // Base: software-defined mix shift, scale benefits
    [0.10, 0.11, 0.12, 0.12, 0.13],  // Bull: full software premium + operating leverage
  ],

  exitMultiple: [8, 12, 16],
  ebitdaProxy: [0.10, 0.12, 0.14],

  // EPS_PE model — baseEps is FY27E (Jun 2027) adjusted EPS consensus $33.60 (FY26A $29.83; FY28E $37.67 +12%). Prior $27 was an old FY26 estimate.
  baseEps: 33.6,
  epsCagr: [3, 9, 12],
  exitPE: [13, 16, 18],
  prob: [25, 50, 25],

  desc: [
    'DOGE budget pressure reaches national-security-adjacent IT contracts and ARKA integration runs over schedule. Revenue growth decelerates to ~4% after FY27 and adjusted EPS barely grows (~3%/yr from the FY27E $33.60). Post-ARKA leverage becomes a concern and the multiple compresses to ~13×. 5yr target {target} ({cagr} annualized).',
    'National security contracts remain ring-fenced; FY27 lands near the ~+12% guide with ARKA, then organic growth runs high-single digits. FCF steps up to $900M+ and deleverages the balance sheet. Adjusted EPS compounds ~9%/yr and the multiple holds near 16×. 5yr target {target} ({cagr} annualized).',
    'DoD cyber, AI, hypersonics and space budgets accelerate; CACI wins flagship AI-enabled intelligence contracts and scales ARKA. Rapid deleveraging frees capital for buybacks; adjusted EPS compounds ~12%/yr and the market pays ~18×. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'DOGE efficiency drive hits IT modernization contracts lacking a direct warfighting nexus. Post-ARKA leverage (~4–5× EBITDA) creates financial fragility if FCF disappoints. Integrating a $2.6B acquisition while managing a large backlog is operationally complex.',
    'DoD and IC concentration (80%+) shields revenue from civilian-agency cuts. FY26 awards of $10.2B (book-to-bill 1.1) and a large backlog provide multi-year visibility. FCF guided to ≥$900M in FY27 deleverages rapidly — CACI has a clean track record of post-acquisition deleveraging.',
    'Hypersonics, EW, and space (ARKA capabilities) receive bipartisan Congressional support regardless of DOGE. CACI becomes a rare large-cap pure-play on defense AI and next-gen weapons systems. Software-defined revenue mix structurally expands margins above legacy IT services peers.',
  ],

  bbRate: [0.005, 0.012, 0.02],
  bullMaOptVal: false,

  burry: {
    sbc: 59,
    gaapNi: 500,
    buyback: 240,
    epsBasis: 'NON_GAAP',   // baseEps is now FY26E adjusted EPS, so the multiple-haircut tile uses the non-GAAP basis
    fy: 'FY25',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine: SBC $59M on $500M GAAP NI (11.8% naive ratio). $240M/yr buybacks at 4× SBC nearly eliminates net dilution — share count is shrinking. Defense IT compensation culture is conservative vs. software peers.',
  },

  debtSafety: {
    netDebt: 5190,          // Jun 2026 (stockanalysis): ~$5.38B debt − ~$0.19B cash, post-ARKA
    ebitda: 1190,           // TTM EBITDA (FY27E ~$1.38B at high-12% margin on ~$10.8B)
    capexToOcf: 0.05,       // Services-focused: <2% capex/revenue ≈ 5% of OCF
    interestCoverage: 3.5,  // Est. EBIT ~$1.0B / ~$290M interest on ~$5.4B debt — approximate
    altmanZ: 3.3,           // Altman Z less reliable for asset-light services; treat as soft flag
    fy: 'FY26',
    note: 'Post-ARKA leverage ~4.4× TTM EBITDA (~3.8× on FY27E) with estimated interest coverage below 5× → RED on the strict 3-step test. Mitigant: FY27 FCF guide ≥$900M and a strong post-deal deleveraging track record; re-check after FY27 deleveraging.',
  },
});
