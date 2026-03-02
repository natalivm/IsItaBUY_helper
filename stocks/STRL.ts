import { defineStock } from './defineStock';

export const STRL = defineStock({
  ticker: 'STRL',
  name: 'Sterling Infrastructure, Inc.',
  sector: 'Infrastructure Services · E-Infrastructure & Transportation',
  themeColor: '#e67e22',
  currentPrice: 412,
  fairPriceRange: '$300 - $520',
  shares0: 30.7,               // ~30.7M diluted shares outstanding (declining via buybacks)
  rev25: 2383,                 // FY2025 raised guidance midpoint ($2.375-2.390B)
  fcfMargin25: 0.116,          // ~11.6% FCF margin (9-mo OCF $254M, annualized ~$340M less ~$63M capex)
  taxRate: 0.24,
  cash: 306,                   // Q3 2025: $306.4M cash + $150M undrawn revolver
  debt: 295,                   // Q3 2025: $294.6M (net cash +$11.8M)
  beta: 1.15,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 10.44,              // FY2025 adj. EPS guidance midpoint ($10.35-$10.52)

  rsRating: 97,                 // Elite: +168% 1Y return, $96→$470 range, near ATH; stock has outperformed S&P by 54%+ — overextended tier but supported by 47% EPS growth
  rsTrend: 'rising',            // Sustained uptrend since Jun '25 golden cross; ATH $470 on Feb 12; Q4/FY25 earnings today (Feb 25) could extend or exhaust the move
  aiImpact: 'TAILWIND',        // DC is 75-80% of E-Infra backlog, +125% YoY DC revenue
  strategicNarrative:
    "Sterling has executed brilliantly — the stock has compounded from ~$80 to $435, and the Q3 2025 results confirm the thesis: " +
    "E-Infrastructure (60% of Q3 revenue) grew 58% YoY with record 22% operating margins, record 25% gross margins, and 42% adj. EBITDA growth. " +
    "CEC electrical bundle is working (40% margin uplift), $2.58B backlog (+64% YoY) with 80%+ mission-critical mix, and the company is expanding into new geographies. " +
    "FY25 guidance of $10.35-$10.52 adj. EPS (+47% YoY) and $486-$491M EBITDA (+42% YoY) represents a structurally higher-quality business than 5 years ago. " +
    "The challenge: at ~42x adj. EPS, the market is pricing in sustained 15%+ EPS compounding AND a premium multiple. " +
    "The easy money from the $80→$435 run is made — the bull case target of $400+ has been achieved. " +
    "At these levels, any deceleration in E-Infra growth or DC capex cycling down triggers BOTH earnings miss AND multiple compression. " +
    "Transportation margin expansion (9.6%→15.6% adj.) and semiconductor megaprojects provide additional optionality. " +
    "Net cash balance sheet and $400M buyback authorization offer downside support. " +
    "BUY for 15%+ upside to $500+ base case target over 5 years, but the margin of safety is much thinner than the sub-$200 entry.",

  // ── EPS/PE Scenarios ──
  epsCagr: [8, 14, 18],        // bear: E-Infra slows; base: steady growth; bull: supercycle
  exitPE: [20, 25, 32],        // bear: de-rate from 42x to quality industrial; base: proven infra compounder; bull: premium secular growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 348, targetMedian: 453, targetHigh: 486, numAnalysts: 5 },
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
  ebitdaProxy: [0.17, 0.205, 0.23],   // FY25 adj. EBITDA margin ~20.5%; Q3 record 22.6%; expanding with E-Infra mix shift
  bullMaOptVal: 435 * 30.7 * 0.03,   // M&A optionality in fragmented infrastructure market (lower % at larger market cap)

  desc: [
    'Data center capex cycles down as hyperscalers digest capacity, slowing E-Infrastructure organic growth to low teens. ' +
      'CEC integration friction pressures combined margins — the 40% margin uplift from bundled services proves harder to replicate at scale. ' +
      'Semiconductor megaprojects slip further right. Transportation holds steady on IIJA backlog but reauthorization uncertainty weighs on new awards. ' +
      'Building Solutions remains soft with housing affordability unresolved. The market de-rates Sterling from ~42x back to 20x as a quality industrial. ' +
      'Earnings grow at roughly 8% annually but severe multiple compression from current ~42x to 20x drives significant downside.',
    'E-Infrastructure growth continues in the mid-teens organically as data center demand extends and CEC cross-selling gains traction. ' +
      '$4B+ visibility converts on schedule — 80%+ mission-critical mix sustains 25%+ segment margins and record gross margins. ' +
      'Semiconductor megaprojects begin contributing in 2027. Transportation benefits from IIJA successor bill; margins hold at 14-16% on design-build mix. ' +
      'Building Solutions recovers modestly as mortgage rates ease. $400M buyback program and net cash balance sheet fund 1-2 tuck-in acquisitions annually. ' +
      'Earnings compound at roughly 14% annually with multiple settling at 25x from current ~42x — upside driven by earnings growth offsetting multiple compression.',
    'AI data center supercycle extends through 2028+ — CEC electrical + site development bundle becomes the industry standard, ' +
      'pulling Sterling into new geographies (Texas, Southeast, Midwest). Project sizes continue scaling (2-2.5x) with increasing infrastructure complexity. ' +
      'Semiconductor megaprojects deploy in force in 2026-2027, adding a second growth vector. E-commerce distribution renaissance continues. ' +
      'Transportation wins large design-build contracts ahead of reauthorization. ' +
      'Margins expand as E-Infra at scale (28%+ operating margin) drives mix higher. ' +
      'Earnings compound at roughly 18% annually and the market sustains a 32x premium multiple for execution, secular visibility, and margin durability.',
  ],

  thesis: [
    'E-Infrastructure is cyclical, not structural — data center capex will normalize as hyperscaler spending matures. ' +
      'CEC integration adds execution risk: $484M acquisition needs to deliver on the combined offering promise. ' +
      'At ~42x adj. EPS, the stock is priced for perfection — any deceleration triggers BOTH earnings miss AND multiple compression (double whammy). ' +
      'Building Solutions is a drag (housing softness). IIJA expiry in Sept 2026 creates Transportation uncertainty. ' +
      'Peak margins are the biggest risk: Q3 record 25% gross / 22.6% EBITDA margins may not be sustainable.',
    'Sterling is a proven beat-and-raise compounder executing across AI/data centers, reshoring, and transportation modernization. ' +
      'CEC creates a differentiated offering (site dev + electrical) that no competitor currently matches at scale. ' +
      'Backlog visibility is exceptional: $2.58B backlog, 80%+ mission-critical, book-to-burn >1.2x. ' +
      'Net cash balance sheet and $400M buyback provide M&A optionality and shareholder returns. 47% adj. EPS growth in FY25 proves operating leverage. ' +
      'At 14% EPS CAGR and 25x exit, upside is driven by earnings growth even as multiple compresses from current ~42x — thesis is about earnings, not re-rating.',
    'Sterling as the undisputed E-Infrastructure platform: site development + electrical + underground utilities = full-service mission-critical partner. ' +
      'Data center project sizes are growing exponentially with increasing underground infrastructure complexity (duct banks, EV charging, power distribution). ' +
      'Geographic expansion (Texas now, 2-3 more markets planned) doubles the addressable market. ' +
      'Semiconductor fabs, e-commerce mega-distribution centers, and renewable energy create a multi-vector growth flywheel. ' +
      'Transportation margin transformation (9.6% → 15.6%+) is underappreciated. ' +
      'If the supercycle extends and CEC delivers, $24+ adj. EPS power by 2030 at 32x supports $760+ stock price.',
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
