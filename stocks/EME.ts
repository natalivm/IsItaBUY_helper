import { defineStock } from './defineStock';

export const EME = defineStock({
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  updatedOn: '06/16',
  lastReportTag: 'Q1 2026',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 834.77,
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
  rsRating: 83,
  ratingOverride: 'HOLD',  // Model STRONG BUY (~+36%) but a cyclical electrical contractor near peak margins on the data-center build; consensus Buy. HOLD on cycle/valuation risk.
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'AI data center mechanical scope is structurally larger than prior cloud builds, driving outsized backlog growth for EMCOR\'s mechanical segment',
    'Record remaining performance obligations provide exceptional multi-year revenue visibility for a construction-services business',
    'Pristine capital allocation — buybacks vastly exceed SBC and a net-cash balance sheet funds an active M&A pipeline',
    'Nine consecutive quarters of EPS acceleration demonstrate repeatable execution across complex, large-scale projects',
    'Prefabrication and virtual design capabilities create a productivity moat that competitors cannot replicate quickly at scale',
  ],

  risksToBuy: [
    'Data center capex digestion or hyperscaler spending slowdown could rapidly deflate the elevated backlog and growth premium',
    'Institutional distribution near the prior high is a caution flag, with Acc/Dist at its weakest reading and a potential topping pattern forming',
    'Construction services margins are thin and highly sensitive to labor cost inflation or union contract renegotiations',
    'HOLD override reflects valuation at a full cyclical premium — fundamentals are strong but the entry price is demanding',
    'Acquisition integration risk grows as EMCOR pursues larger M&A to sustain the data center growth trajectory',
  ],

  verdictNarrative:
    'The fundamental case remains strong — Q1 2026 record revenue +19.7%, EPS +30%, RPO $15.62B (+33%), and raised FY2026 guidance. Long-term base-case target ~$1,143 implies 38% upside. ' +
    'However the chart is flashing warning signs that override the model rating. A potential head-and-shoulders pattern is forming: left shoulder ~$850, head ~$965, right shoulder currently building ~$827. MACD has crossed bearish with a widening red histogram (-11.98). Acc/Dist rated E — institutions were selling into the $950–965 head. ' +
    'HOLD. Do not add here. The key level is the neckline at ~$780–810 — a break on volume would confirm the H&S and open a measured move toward $600–620. A reclaim of the 50-day MA ($833) with improving Acc/Dist would flip this back to BUY.',

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
