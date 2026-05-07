import { defineStock } from './defineStock';

export const EME = defineStock({
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  updatedOn: '05/07',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 924.06,
  fairPriceRange: '$560 - $1350',
  shares0: 44.7,
  rev25: 16990,             // Revenue 2025A ($M); FY2025 actual; +18.5% YoY (record)
  fcfMargin25: 0.058,       // ~5.8% FCF margin; OCF $1.3B / $16.99B rev
  taxRate: 0.245,
  cash: 1100,               // Q4'25 actual cash on hand ($M); up from $650M modeled
  debt: 800,
  beta: 1.08,
  costDebt: 0.052,
  baseEps: 25.87,           // 2025A adj. EPS (record; +20% YoY); 2026E guided $27.25–29.25
  modelType: 'EPS_PE',
  rsRating: 92,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "EMCOR is a B+ quality cyclical grower with a confirmed productivity moat — FY2025 actuals: $16.99B revenue (+18.5%), $25.87 adj. EPS (+20%), record 9.4% operating margin. " +
    "RPOs hit a record $13.25B (+31% YoY, up from $10.1B), with network/communications alone at $4.46B (+60% YoY). " +
    "AI data centers carry a 1.5–2x mechanical scope multiplier vs. cloud-era builds — an underappreciated tailwind baked into mechanical RPOs. Revenue grew 2x faster than headcount in FY2025. " +
    "Management confirmed no change in hyperscaler CapEx plans and 2–3 year demand visibility. 2026 guided at $17.75–18.5B revenue, $27.25–29.25 EPS, 9.0–9.4% op. margins. " +
    "At $726 (down from prior $811 model price), prob-weighted CAGR improves to ~9.5% — getting more interesting but still below the 15% BUY hurdle. Base case target ~$1,143 (57% upside); bear floor ~$653 (10% downside). Entry zone for a high-confidence BUY: ~$560–665. Holding here is defensible; adding on weakness below $700 is rational.",

  // ── Scenarios ──
  epsCagr: [7, 13, 17],        // bear: DC slows; base: DC normalizes; bull: DC high-teens + M&A
  exitPE: [18, 24, 28],        // bear: ordinary industrial; base: quality cyclical; bull: premium for DC visibility
  prob: [20, 50, 30],       // nudged bull after DC RPO +60% YoY and AI mechanical multiplier confirmed


  analystConsensus: { rating: 'Buy', targetLow: 675, targetMedian: 759, targetHigh: 900, numAnalysts: 12 }, // pre-Q4'25; likely revised up post-earnings
  revGrowth: [
    [0.08, 0.05, 0.03, -0.02, 0.03],
    [0.14, 0.10, 0.09, 0.08, 0.07],
    [0.16, 0.14, 0.12, 0.10, 0.10],
  ],
  fcfMargin: [
    [0.048, 0.045, 0.042, 0.040, 0.042],
    [0.058, 0.058, 0.060, 0.060, 0.060],
    [0.060, 0.062, 0.065, 0.068, 0.070],
  ],
  termGrowth: [0.02, 0.03, 0.035],
  exitMultiple: [12, 16, 20],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.12],
  bullMaOptVal: 706 * 44.7 * 0.04,

  desc: [
    'Data center demand drops sharply, cutting about 12% of revenue despite starting 2026 with record $13.25B RPOs. Variable union labor absorbs some of the pain, but margins drift down to the 8-8.5% range. ' +
      'The market re-rates EMCOR as an ordinary industrial at 18x. Earnings still grow at about 7% annually from the $25.87 FY2025 base, but multiple compression drives roughly -4% annualized stock returns. ' +
      'The downside is driven by valuation reset, not bankruptcy risk. Managed but painful.',
    'Data center demand normalizes but holds at healthy levels. Organic growth runs in the high-single to low-double digits, backed by confirmed productivity gains (revenue 2x headcount growth). ' +
      'Capital allocation balanced: M&A pipeline strong, 60% dividend increase, $500M incremental buyback. The market values EMCOR as a quality cyclical at 24x. ' +
      'Earnings grow at roughly 13% annually from the $25.87 FY2025 base, delivering about 7% annualized stock returns. Good company, not cheap entry.',
    'The AI data center supercycle extends through 2031. The 1.5–2x mechanical scope multiplier on AI vs. cloud-era data centers drives disproportionate revenue growth in the Mechanical segment. ' +
      'Prefab/VDC/BIM productivity moat pushes margins toward 10%+. Acquisitions execute well from the strong M&A pipeline. The market pays a 28x premium for execution and visibility. ' +
      'Earnings compound at roughly 17% annually from the $25.87 FY2025 base, delivering about 14% annualized stock returns.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.003, 0.003, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
  ],
});
