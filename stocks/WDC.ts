import { defineStock } from './defineStock';

export const WDC = defineStock({
  ticker: 'WDC',
  name: 'Western Digital Corporation',
  sector: 'Data Storage / HDD & AI Infrastructure',
  themeColor: '#0073cf',
  updatedOn: '07/17',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-06-28',
  currentPrice: 477.22,   // Jun 26 2026 close (-13% that day); 52wk $62.65-$799.87 — up ~8x off lows / +250% YTD on the AI-storage HDD super-cycle
  fairPriceRange: '$125 - $490',
  shares0: 385,           // ~385M diluted (Q3 FY26); HDD-only post-Sandisk spin; mkt cap ~$226B
  rev25: 12900,           // FY2026E run-rate (~$12.9B); FY25 actual (HDD-only) $9,520M; Q4 FY26 guide $3.65B (~$14.6B annualized exit)
  fcfMargin25: 0.25,      // Q3 FY26 FCF margin 29%, approaching 30%+ (FCF $978M on $1.1B OCF, $145M CapEx)
  taxRate: 0.16,          // ~16% effective
  cash: 2000,            // ~$2B cash; only $1.6B convertible debt left after a $3.1B paydown — net positive cash
  debt: 1600,
  beta: 1.9,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 13.00,         // Q4 FY26 guide $3.25/qtr -> ~$13 annualized exit run-rate. FY26E full-year ~$9.94 normalized (Q3 $2.72, +97% YoY). TIKR models a steep AI-storage ramp: FY27E ~$18 -> FY30E ~$52 normalized — a super-cycle the price already embeds.
  rsRating: 99,           // IBD RS 99 (Composite 87) — top-of-market RS leader in a #1-ranked group (Industry Group Rank 3/142, Group RS A+); but EPS Rating 68 and ACC/DIS E flag distribution, and it's -13% on the day / ~-27% off its 52wk high
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD', // Pins HOLD (like STX/SIMO): the AI-storage up-cycle is real and arguably structural, but the stock has gone parabolic (~8x off lows), trades ABOVE the $554 analyst median target, and prices in a permanent super-cycle at a cyclical-peak-trajectory multiple. Don't chase; wait for a pullback.

  reasonsToBuy: [
    'AI data economy drives a structural surge in mass-capacity nearline HDD — management sees >25% long-term exabyte CAGR from inference, agentic AI, synthetic and physical-AI data',
    'Rational HDD duopoly with no unit-capacity additions — supply discipline plus a mix-up to higher-capacity drives drives pricing power (ASP/TB +9% YoY, cost/TB ~-10%)',
    'Gross margin broke above 50% and is still expanding (70-75% incremental); ~30% FCF margin with multi-year LTAs now extending into CY28-29 (some requested to 2032)',
    'Balance sheet transformed — net cash, investment-grade (S&P & Fitch), returning essentially all free cash flow via buybacks and a raised dividend',
    'Technology roadmap (40TB ePMR, HAMR with 4 customers in qualification, UltraSMR mix-up) extends capacity leadership toward 100TB+',
  ],

  risksToBuy: [
    'Parabolic — up ~8x off its lows and trading above the analyst median target; priced for a permanent super-cycle',
    'HDD has always been cyclical; the "this time is structural" case echoes prior peaks, and any AI-capex digestion reverses pricing fast',
    'At ~35-45x the current EPS run-rate, the multiple assumes the cycle never turns — severe downside if it does',
    'High beta — outsized drawdowns in any AI-spending scare (already ~-27% off its 52-week high)',
    'Concentrated in a handful of hyperscaler customers; flash cost-downs could encroach on warm storage over time',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 360, targetMedian: 554, targetHigh: 685, numAnalysts: 22 },

  epsCagr: [4, 12, 20],
  exitPE: [8, 11, 15],
  prob: [40, 40, 20],

  revGrowth: [
    [0.10, 0.00, -0.10, -0.05, 0.00],   // Bear: cycle rolls over, pricing and margins give back
    [0.30, 0.20, 0.12, 0.08, 0.05],     // Base: strong multi-year up-cycle, decelerating (haircut from TIKR's ~30%+)
    [0.35, 0.30, 0.20, 0.12, 0.08],     // Bull: AI-storage super-cycle runs for years (TIKR path)
  ],
  fcfMargin: [
    [0.12, 0.10, 0.10, 0.11, 0.12],
    [0.22, 0.25, 0.26, 0.25, 0.24],
    [0.27, 0.30, 0.32, 0.33, 0.34],
  ],
  exitMultiple: [5, 8, 11],
  termGrowth: [0.00, 0.02, 0.03],
  bbRate: [0.01, 0.03, 0.05],
  ebitdaProxy: [0.30, 0.40, 0.48],
  bullMaOptVal: false,

  desc: [
    'The HDD cycle rolls over — AI-capex digestion and renewed supply growth return the industry to its boom-bust playbook. Pricing and margins compress and the market reprices WDC as a cyclical at a trough multiple (~8x). ' +
      'EPS compounds only ~4% from the ~$13 FY26 run-rate base. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 40% — elevated given the parabolic run.',
    'AI nearline demand sustains a strong, multi-year up-cycle and the disciplined duopoly holds; gross margin stays above 50%, FCF compounds and buybacks shrink the share count. EPS compounds ~12% from the ~$13 base, but the multiple normalizes from today\'s ~45x toward a mid-cycle ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The business is genuinely better and arguably structural — but at {spot}, above the Street target, you are paying a peak multiple on a peak trajectory.',
    'AI makes mass-capacity HDD a perpetual hyperscaler line item; >25% exabyte growth runs for years, tight supply and HAMR-class density sustain pricing, and the market keeps awarding a premium. EPS compounds ~20% from the ~$13 base and the multiple holds near ~15x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20% — even this bullish path barely gets back to today\'s price, underscoring how much is already discounted.',
  ],

  thesis: [
    'Bear mechanics: HDD has always been cyclical — supply expands into strong demand, then pricing collapses. After running ~8x to all-time highs at ~35-45x the current earnings run-rate, WDC prices in a permanent up-cycle. ' +
      'Any AI-capex pause or flash encroachment reverses pricing fast, and the multiple de-rates to single digits. High beta deepens the drawdown. At {spot}, the risk/reward is asymmetric to the downside.',
    'The AI-storage demand is real and, management argues, structural: inference, agentic and physical-AI data compound at >25% exabyte CAGR, and ~80% of hyperscaler data lives on HDD. WDC is a focused, net-cash, investment-grade pure-play in a disciplined duopoly that adds no unit capacity, holds 50%+ gross margins and returns nearly all of a ~30% FCF margin. ' +
      'But the stock has gone parabolic and now trades above the consensus target ($554) at a cyclical-peak-trajectory multiple. Like Seagate, being right on the business is not the same as being right on the entry. Verdict: HOLD — a meaningful pullback shifts the setup toward BUY.',
    'The bull case: AI makes mass-capacity HDD a perpetual capex line, tight supply and density leadership sustain pricing for years, and the market keeps paying a premium for the clearest storage pure-play. ' +
      '{target} is achievable only if the super-cycle proves durable. Probability 20% — requires both demand and supply discipline to hold for years against HDD\'s cyclical history, and even then the upside from {spot} is modest.',
  ],

  burry: {
    sbc: 250,
    gaapNi: 3770,
    buyback: 2287,
    epsBasis: 'NON_GAAP',
    fy: 'FY26E',
    overstatementPct: 35,
    overstatementSource: 'estimated',
    note: 'Critical. SBC ~$250M (FY25 $265M, LTM $204M) vs FY26E normalized GAAP NI ~$3.8B = ~6.6% naive; the ~8x stock run adds a large MTM amplifier, but a very large buyback (~$2.3B LTM, ~9x SBC) heavily offsets dilution and is shrinking the share count, capping the estimate around 35%. (Reported GAAP NI is also inflated by a ~$4.3B one-time gain on the SanDisk-stake monetization.)',
  },

  debtSafety: {
    netDebt: -450,
    ebitda: 5000,
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash. After monetizing SanDisk stock to repay $3.1B of debt, only $1.6B of convertible debt remains against ~$2B cash, leaving a net positive cash position (~+$450M at Q3 FY26). Upgraded to investment-grade by S&P and Fitch; ~30% FCF margin. The real risk is HDD cyclicality and the parabolic valuation, not leverage.',
  },
});
