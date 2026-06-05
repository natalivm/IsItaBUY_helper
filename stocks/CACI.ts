import { defineStock } from './defineStock';

export const CACI = defineStock({
  ticker: 'CACI',
  name: 'CACI International Inc.',
  sector: 'Defense IT / National Security Services',
  themeColor: '#1d4ed8',
  updatedOn: '06/05',
  lastReportTag: 'FY2025',
  currentPrice: 531.41,
  fairPriceRange: '$400 - $840',
  shares0: 22.4,
  rev25: 9550,           // FY2026 guidance midpoint ($9,500–$9,600M, +11% YoY)
  fcfMargin25: 0.074,    // FY2026 guided: $710M+ FCF / $9.55B revenue
  taxRate: 0.21,
  cash: 106,             // FY2025 end: $106.2M
  debt: 3200,            // Q2 FY2026 (Sep 2025); ARKA acquisition (Mar 2026, $2.6B) raises this further
  beta: 0.58,
  costDebt: 0.045,
  ratingOverride: 'BUY',

  rsRating: 29,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',

  strategicNarrative:
    "CACI is the quiet compounder of defense IT: $8.63B FY2025 revenue (+13% YoY), 12–14% multi-year organic CAGR, $31.4B backlog (+9.8% YoY), and FY2026 guidance of $9.55B revenue + $710M+ FCF (60%+ growth). " +
    "The ARKA Group acquisition ($2.6B, closed March 2026) is the biggest strategic move in a decade — ARKA deepens CACI's position in hypersonics, EW, and space, areas receiving accelerated DoD funding regardless of broader DOGE debates. " +
    "Software-defined strategy is yielding results: EBITDA margin guiding 11.8–11.9% in FY2026, and FCF margin set to leap from 5.4% to 7.4%+ as ARKA integration normalizes. " +
    "The DOGE risk is overstated for CACI specifically: ~80%+ of revenue comes from DoD and IC — the national security ring-fence DOGE has consistently exempted. Civilian agency exposure is limited. " +
    "Technical picture is the problem: RS 29 (severe distribution), stock -24.87% off 52-week highs, below both 50-day and 200-day MAs, ACC/DIS C-. FY2026 EPS estimates revised down -13% — likely ARKA near-term EPS dilution from ~$130M in new interest expense. EPS Rating 90 confirms earnings quality is intact; institutions are selling the multiple, not the business. " +
    "Post-ARKA leverage is the real watch item: pre-acquisition net debt ~$3.1B (~3.2× FY2025 EBITDA), and ARKA adds ~$2.5B more. CACI must execute on a $700M+ FCF trajectory to deleverage — historical precedent is reassuring. " +
    "At $513 / ~19× FY2025 adj EPS, CACI trades at a substantial discount to defense peers. Analyst consensus target $645 (+26%), 28 analysts, 11 buys vs 3 holds, 0 sells. Do not buy into the falling knife — wait for RS to recover above 40–50 and price to reclaim the 50-day MA before establishing a position.",

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

  desc: [
    'DOGE budget pressure reaches national-security-adjacent IT contracts. ARKA integration runs over schedule. Revenue growth decelerates to ~4% annually. Post-ARKA leverage becomes a concern as FCF growth disappoints. Multiple compresses from 19× to ~14× adj EPS. Bear target ~$400.',
    'National security contracts remain ring-fenced. ARKA on track — $150M FY2026 revenue contribution, hypersonics/EW prime work accelerating. Revenue grows 7–10% annually, FCF margins expand from 7.4% to 10% as software mix rises. 12× EBITDA exit on FY2030 earnings. Base target ~$620.',
    'DoD cyber, AI, and hypersonics budgets accelerate. CACI wins flagship AI-enabled intelligence contracts and expands ARKA platform internationally. Revenue grows 9–14% annually, FCF margins reach 13%. Rapid deleveraging frees capital for buybacks. Bull target ~$840.',
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
    epsBasis: 'GAAP',
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
