import { defineStock } from './defineStock';

export const EME = defineStock({
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  updatedOn: '05/31',
  lastReportTag: 'Q1 2026',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 826.82,
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
  rsRating: 76,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Q1 2026 (April 29): quarterly record — $4.63B revenue (+19.7% YoY, +16.8% organic), EPS $6.84 (+30%), operating margin 8.7% (up from 8.2%). RPO hit a new record $15.62B (+32.9% YoY). Guidance raised: FY2026 revenue $18.5–19.25B, EPS $28.25–29.75 (midpoint $29.00). " +
    "AI data center mechanical scope multiplier (1.5–2× vs. cloud-era builds) continues to drive outsized RPO growth. 9 consecutive quarters of EPS acceleration. " +
    "At $827, the stock is just below the IBD cup breakout point ($835, as of 05/15/2026) with RS 76 and Acc/Dist E — strong fundamentals but institutional distribution near the prior high is a caution flag. Base-case target ~$1,143 still implies 38% upside from current levels.",

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

  debtSafety: {
    netDebt: -300,
    ebitda: 1750,
    fy: 'FY25',
    note: 'Net cash — $1.1B cash vs $800M debt. Strong FCF supports M&A pipeline and $500M+ annual buyback program.',
  },

  burry: {
    sbc: 60,
    gaapNi: 1100,
    buyback: 580,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $60M is 5.5% of GAAP NI ~$1.1B. Construction companies structurally have minimal SBC vs. tech peers. Buybacks ($580M) are ~10× SBC — exceptional offset.',
  },

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
