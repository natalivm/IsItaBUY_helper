import { defineStock } from './defineStock';

export const CACI = defineStock({
  ticker: 'CACI',
  name: 'CACI International Inc.',
  sector: 'Defense IT / National Security Services',
  themeColor: '#1d4ed8',
  updatedOn: '07/15',
  lastReportTag: 'FY2025',
  currentPrice: 471.83,
  fairPriceRange: '$400 - $840',
  shares0: 22.4,
  rev25: 9550,           // FY2026 guidance midpoint ($9,500–$9,600M, +11% YoY)
  fcfMargin25: 0.074,    // FY2026 guided: $710M+ FCF / $9.55B revenue
  taxRate: 0.21,
  cash: 106,             // FY2025 end: $106.2M
  debt: 3200,            // Q2 FY2026 (Sep 2025); ARKA acquisition (Mar 2026, $2.6B) raises this further
  beta: 0.58,
  costDebt: 0.045,
  modelType: 'EPS_PE',    // Converted from DCF: low beta (0.58) made the Gordon perpetuity explode (base ~$1,616 vs ~$620 prose). Defense-IT has clean, stable adjusted EPS — EPS×P/E is the right frame and lands targets on the street.
  ratingOverride: 'BUY',  // EPS_PE model now reads HOLD (base ~4.7% 5yr CAGR) — reasonable for a low-growth gov-IT name, and weak/falling RS (28, <30) disables the quality boost. Held at BUY to match consensus Buy + the constructive defense ring-fence / ARKA case; revisit if momentum stays weak.

  rsRating: 28,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'National security and DoD revenue concentration provides a ring-fence that DOGE civilian cuts have consistently exempted',
    'ARKA acquisition adds hypersonics, electronic warfare, and space capabilities receiving accelerated bipartisan funding',
    'Massive contracted backlog and bid pipeline deliver multi-year revenue visibility well above typical defense IT peers',
    'FCF set to leap dramatically as the software-defined strategy matures and ARKA integration normalizes',
    'Pristine SBC profile and consistent share buybacks make CACI one of the cleanest cash-flow stories in defense tech',
  ],

  risksToBuy: [
    'Post-ARKA leverage is substantial and requires sustained FCF execution to deleverage without financial strain',
    'New interest expense from acquisition financing is diluting near-term EPS, creating institutional selling pressure',
    'Technical picture is deteriorating — severe distribution, below key moving averages, and falling RS signal near-term risk',
    'Integrating a multi-billion acquisition while managing an existing large backlog introduces meaningful operational complexity',
    'Any DOGE-driven scope creep into national-security-adjacent IT contracts beyond the current exemption ring-fence would be a surprise negative',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 513, targetMedian: 645, targetHigh: 787, numAnalysts: 28 },

  revGrowth: [
    [0.04, 0.04, 0.04, 0.04, 0.04],  // Bear: DOGE pressure on federal IT, ARKA integration friction
    [0.10, 0.09, 0.08, 0.07, 0.07],  // Base: defense ring-fenced, ARKA synergies, steady decel
    [0.14, 0.13, 0.12, 0.10, 0.09],  // Bull: cyber/AI/hypersonics acceleration, major new IC wins
  ],

  fcfMargin: [
    [0.06, 0.07, 0.07, 0.07, 0.08],  // Bear: integration costs weigh, margin pressure
    [0.08, 0.09, 0.09, 0.10, 0.10],  // Base: software-defined mix shift, scale benefits
    [0.10, 0.11, 0.12, 0.12, 0.13],  // Bull: full software premium + operating leverage
  ],

  exitMultiple: [8, 12, 16],
  ebitdaProxy: [0.10, 0.12, 0.14],

  // EPS_PE model — baseEps is FY26E adjusted EPS (~$27; current price ~19× fwd, matching the desc).
  // Bear ~$405 (0.79× street low), Base ~$635 (~street median $645), Bull ~$855 (~1.09× street high).
  baseEps: 27,
  epsCagr: [3, 8, 12],
  exitPE: [13, 16, 18],
  prob: [25, 50, 25],

  desc: [
    'DOGE budget pressure reaches national-security-adjacent IT contracts. ARKA integration runs over schedule. Revenue growth decelerates to ~4% annually and adjusted EPS barely grows (~3%/yr). Post-ARKA leverage becomes a concern as FCF disappoints. Multiple compresses from ~19× to ~13× adj EPS. Bear target ~$405.',
    'National security contracts remain ring-fenced. ARKA on track — $150M FY2026 revenue contribution, hypersonics/EW prime work accelerating. Revenue grows 7–10% annually, FCF margins expand from 7.4% to 10% as software mix rises. Adjusted EPS compounds ~8%/yr and the multiple holds near 16×. Base target ~$635 (right on the street median).',
    'DoD cyber, AI, and hypersonics budgets accelerate. CACI wins flagship AI-enabled intelligence contracts and expands ARKA platform internationally. Revenue grows 9–14% annually, FCF margins reach 13%. Rapid deleveraging frees capital for buybacks; adjusted EPS compounds ~12%/yr and the market pays ~18×. Bull target ~$855.',
  ],

  thesis: [
    'DOGE efficiency drive hits IT modernization contracts lacking a direct warfighting nexus. Post-ARKA leverage (~4–5× EBITDA) creates financial fragility if FCF disappoints. Integrating a $2.6B acquisition while managing a $31B backlog is operationally complex.',
    'DoD and IC concentration (80%+) shields revenue from civilian-agency cuts. $31.4B backlog and $17B bid pipeline provide multi-year visibility. $710M+ FY2026 FCF deleverages rapidly — CACI has a clean track record of post-acquisition deleveraging.',
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
    netDebt: 3100,          // Q2 FY2026 (Sep 2025): $3,200M debt − ~$100M cash; pre-ARKA close
    ebitda: 967,            // FY2025 actual ($966.8M); FY2026E ~$1,130M at 11.85% margin
    capexToOcf: 0.05,       // Services-focused: <2% capex/revenue ≈ 5% of OCF
    interestCoverage: 5.5,  // Est. EBIT ~$790M / ~$144M interest ($3.2B × 4.5%)
    altmanZ: 3.3,           // Altman Z less reliable for asset-light services; treat as soft flag
    fy: 'FY26E',
    note: 'Pre-ARKA leverage ~3.2× EBITDA; ARKA acquisition (Mar 2026, $2.6B) raises near-term leverage to ~4–5×. Mitigant: $710M+ FY2026 FCF implies rapid deleveraging — historical post-deal track record is strong. Interest coverage ~5.5× adequate; monitor post-ARKA debt load.',
  },
});
