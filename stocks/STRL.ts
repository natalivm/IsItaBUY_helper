import { defineStock } from './defineStock';

export const STRL = defineStock({
  ticker: 'STRL',
  name: 'Sterling Infrastructure, Inc.',
  sector: 'Infrastructure Services · E-Infrastructure & Transportation',
  themeColor: '#e67e22',
  updatedOn: '05/04',
  currentPrice: 529.49,
  fairPriceRange: '$320 - $560',
  shares0: 30.7,               // ~30.7M diluted shares outstanding (declining via buybacks)
  rev25: 2490,                 // FY2025 actual: $2.49B revenue (+32% YoY adj.)
  fcfMargin25: 0.116,          // ~11.6% FCF margin (FY25 OCF ~$340M less ~$63M capex on $2.49B rev)
  taxRate: 0.24,
  cash: 306,                   // Q4 2025: cash + $150M undrawn revolver
  debt: 295,                   // Q4 2025: ~$295M (near net-cash)
  beta: 1.15,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 10.95,              // FY2025 actual adj. EPS ~$10.95 (+53% YoY); Q4 $3.08 vs $2.52 est.

  rsRating: 96,                 // Elite: $96→$477 52-wk range; 53% EPS growth supports elevated RS
  rsTrend: 'rising',            // Post-Q4 beat held $413-$442 range; ATH $477; FY26 guide $13.45-$14.05 well above Street $11.90
  aiImpact: 'TAILWIND',        // DC is ~70% of E-Infra revenue, +123% YoY segment growth; CEC adds turnkey electrical
  strategicNarrative:
    "Sterling is the undisputed AI data center infrastructure platform — and Q4/FY25 results prove it: " +
    "$2.49B revenue (+32%), adj. EPS $10.95 (+53%), adj. EBITDA $503.8M, EBITDA margins >20% for the first time in company history. " +
    "Fifth consecutive year of 35%+ adj. EPS growth. E-Infrastructure (~70% of revenue) grew 123% YoY; CEC integration adds turnkey electrical capability no competitor matches at scale. " +
    "Record $3.01B backlog (+78% YoY), $3.3B combined pipeline, and FY26 guidance of $13.45-$14.05 adj. EPS crushed Street consensus of $11.90 — the beat-and-raise machine is accelerating, not decelerating. " +
    "Transportation margin transformation (revenue +17%, adj. operating profit +66%) is underappreciated. " +
    "The tension: at ~39x FY25 / ~31x FY26E adj. EPS, markets are pricing in sustained 25%+ compounding. " +
    "If DC capex cycles down or CEC synergies plateau, both earnings AND multiple compress simultaneously — the classic double-whammy risk for high-multiple compounders. " +
    "Building Solutions remains soft (housing affordability), IIJA expires Sept 2026, and skilled labor scarcity could pressure margins at scale. " +
    "Net cash balance sheet, $400M buyback, and geographic expansion (Texas, Southeast, Midwest) provide downside support and optionality. " +
    "BUY thesis intact: 14% EPS CAGR at 25x exit = $500+ base case; but entry at $428 offers thinner margin of safety than $200 — the stock has 5x'd and the next double requires flawless execution.",

  // ── EPS/PE Scenarios ──
  epsCagr: [8, 14, 18],        // bear: E-Infra slows post-2026; base: steady 14% compounding; bull: supercycle extends
  exitPE: [20, 25, 32],        // bear: de-rate from ~39x to quality industrial; base: proven infra compounder; bull: premium secular growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 400, targetMedian: 466, targetHigh: 500, numAnalysts: 5 },
  revGrowth: [
    [0.12, 0.06, 0.04, 0.03, 0.02],   // Bear: DC capex digests, CEC ramp slower, semi fabs delayed
    [0.18, 0.14, 0.11, 0.09, 0.07],   // Base: CEC cross-sell, DC extends, semi fabs start '27
    [0.22, 0.18, 0.15, 0.12, 0.10],   // Bull: Supercycle + new geos + full CEC integration
  ],
  fcfMargin: [
    [0.095, 0.085, 0.080, 0.075, 0.075],   // Bear: CEC integration friction, mix shift headwinds
    [0.116, 0.125, 0.130, 0.135, 0.140],   // Base: E-Infra mix drives margin expansion
    [0.125, 0.140, 0.150, 0.155, 0.160],   // Bull: E-Infra at scale + CEC synergies + operating leverage
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 12, 15],
  bbRate: [0.005, 0.012, 0.020],     // $400M buyback program authorized Nov 2025; ~1% annual at current market cap
  ebitdaProxy: [0.17, 0.205, 0.23],   // FY25 adj. EBITDA margin >20% (first time in history); $503.8M EBITDA; expanding with E-Infra mix shift
  bullMaOptVal: 391 * 30.7 * 0.03,   // M&A optionality in fragmented infrastructure market (lower % at $13B+ market cap)

  desc: [
    'Data center capex cycles down in 2027 as hyperscalers digest the 2024-2026 build-out wave, slowing E-Infrastructure organic growth to low teens. ' +
      'CEC integration delivered in 2025-2026 but the 123% segment growth rate normalizes sharply — skilled labor scarcity caps throughput expansion. ' +
      'Semiconductor megaprojects slip further right. Transportation holds steady on IIJA backlog but Sept 2026 expiry creates reauthorization uncertainty. ' +
      'Building Solutions remains a drag with housing affordability unresolved. Market de-rates Sterling from ~39x to 20x as growth decelerates. ' +
      'Earnings grow at roughly 8% annually but severe multiple compression from ~39x to 20x drives significant downside.',
    'E-Infrastructure growth continues in the mid-teens organically as $3.01B record backlog converts and CEC turnkey electrical cross-selling gains traction in new geographies. ' +
      'FY26 guide of $13.45-$14.05 adj. EPS achievable; $3.3B combined pipeline sustains 25%+ segment margins. ' +
      'Semiconductor megaprojects begin contributing in 2027. Transportation benefits from IIJA successor bill; margins hold at 14-16% on design-build mix. ' +
      'Building Solutions recovers modestly as mortgage rates ease. $400M buyback and net cash balance sheet fund 1-2 tuck-in acquisitions annually. ' +
      'Earnings compound at roughly 14% annually with multiple settling at 25x from current ~39x — upside driven by earnings growth offsetting moderate multiple compression.',
    'AI data center supercycle extends through 2028+ — CEC turnkey electrical + site development bundle becomes the industry standard, ' +
      'pulling Sterling into 2-3 new geographies (Texas expansion, Southeast, Midwest). Project sizes continue scaling (2-2.5x) with increasing underground infrastructure complexity. ' +
      'FY26 guide proves conservative as $3.3B pipeline accelerates; $14+ adj. EPS likely. Semiconductor megaprojects deploy in force in 2027, adding a second growth vector. ' +
      'Transportation margin transformation continues (adj. operating profit +66% in FY25) with large design-build contracts ahead of reauthorization. ' +
      'Margins expand as E-Infra at scale (28%+ operating margin) drives mix higher; EBITDA margins push toward 22-25% by FY27. ' +
      'Earnings compound at roughly 18% annually and the market sustains a 32x premium multiple for execution, secular visibility, and margin durability.',
  ],

  thesis: [
    'E-Infrastructure is cyclical, not structural — 123% segment growth in FY25 is peak growth rate that normalizes as hyperscaler spending matures. ' +
      'CEC integration delivered in FY25 ($129M Q4 revenue, $489M backlog) but ongoing skilled labor shortages cap further throughput scaling. ' +
      'At ~39x FY25 / ~31x FY26E adj. EPS, the stock is priced for sustained 25%+ compounding — any deceleration triggers earnings miss AND multiple compression simultaneously. ' +
      'Building Solutions is a drag (housing softness). IIJA expiry Sept 2026 creates Transportation uncertainty. ' +
      'Peak margins are the biggest risk: FY25 EBITDA margins >20% for the first time may not be sustainable as project mix evolves.',
    'Sterling is a proven beat-and-raise compounder — 5th consecutive year of 35%+ adj. EPS growth, and FY26 guide ($13.45-$14.05) crushed Street at $11.90. ' +
      'CEC creates a turnkey offering (site dev + electrical) that no competitor matches at scale. ' +
      'Backlog visibility is exceptional: $3.01B signed (+78% YoY), $3.3B combined, 80%+ mission-critical, book-to-burn >1.2x. ' +
      'Net cash balance sheet, $400M buyback, and geographic expansion provide M&A optionality and shareholder returns. 53% adj. EPS growth in FY25 proves operating leverage is structural. ' +
      'At 14% EPS CAGR and 25x exit, upside is driven by earnings growth even as multiple compresses from ~39x — thesis is about earnings power, not re-rating.',
    'Sterling as the undisputed E-Infrastructure platform: site development + turnkey electrical + underground utilities = full-service mission-critical partner. ' +
      'Data center project sizes growing exponentially with increasing underground infrastructure complexity (duct banks, high-voltage distribution, cooling infrastructure). ' +
      'Geographic expansion (Texas, Southeast, Midwest) doubles the addressable market — FY26 revenue guide $3.05-$3.20B is just the start. ' +
      'Semiconductor fabs, e-commerce mega-distribution centers, and renewable energy create a multi-vector growth flywheel. ' +
      'Transportation margin transformation (+66% adj. operating profit in FY25) is underappreciated and accelerating. ' +
      'If the supercycle extends and CEC synergies deepen, $26+ adj. EPS power by 2030 at 32x supports $830+ stock price.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.012],
    },
  ],
});
