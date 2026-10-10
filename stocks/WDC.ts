import { defineStock } from './defineStock';

export const WDC = defineStock({
  ticker: 'WDC',
  name: 'Western Digital Corporation',
  sector: 'Data Storage / HDD & AI Infrastructure',
  themeColor: '#0073cf',
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 397.28,   // 52wk ~$63-$800; ~-27% since late July ($545) and ~-50% off the high, despite a beat-and-raise
  fairPriceRange: '$420 - $1,050',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 388,           // ~388M diluted (Q4 FY26 / Q1 FY27 guide); HDD-only post-Sandisk spin; mkt cap ~$154B
  rev25: 12919,           // FY2026A (FYE Jul 3 2026) $12,919M (+36%) — base year; revGrowth[0] = FY27. FY27E consensus $19.22B, FY28E $26.36B
  fcfMargin25: 0.25,      // Q3 FY26 FCF margin 29%, approaching 30%+ (FCF $978M on $1.1B OCF, $145M CapEx)
  taxRate: 0.16,          // ~16% effective
  cash: 1579,            // Jul 3 2026 cash (excl. the retained Sandisk stake)
  debt: 1052,           // Jul 3 2026, all current (from ~$4.7B a year earlier)
  beta: 1.9,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 20.18,         // FY2027E non-GAAP EPS — stockanalysis consensus (Oct 9 2026; FY28E $32.05). FY26A $10.22 (Q4 $3.56); Q1 FY27 guide $4.00 ±0.15 (~$16 annualized, ramping). No FY guide. Base 12% CAGR = an FY28 surge then a cyclical plateau (FY32E ~$35.6). Prior: $13.00 (Q4 FY26 run-rate). TIKR models a steep AI-storage ramp: FY27E ~$18 -> FY30E ~$52 normalized — a super-cycle the price already embeds.
  rsRating: 74,           // IBD RS per user, 10/10/2026 (was 99) — ~-27% since late July
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // ratingOverride removed at Q4 FY26 review: model reads HOLD on its own (base ≈ spot under the mid-cycle ~11x framework, TAILWIND/RS boost), and the old rationale ("trades ABOVE the $554 analyst median") no longer holds — stock is now below the entire $420-1,050 Street range.

  // Q4 FY26 UPDATE (Aug 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Beat-and-raise. Q4 revenue $3.75B (+44% y/y, +12% q/q) vs $3.65B guide.
  // Non-GAAP gross margin 54.4% (FY26 49.1%). Non-GAAP EPS $3.56 (GAAP $8.21
  // incl. a $2.05B Sandisk-stake mark-to-market gain). FY26: revenue $12.92B
  // (+36%), non-GAAP EPS $10.22 (GAAP $24.28 incl. $6.5B of Sandisk gains),
  // FCF $3.51B (27%), buybacks $2.59B, dividends $184M. Q4 FCF $1.28B.
  // Debt down to $1.05B (from $4.7B) vs $1.58B cash, plus the retained
  // Sandisk stake. Q1 FY27 GUIDE: revenue $4.1B ±$0.1B (+42-49%), GM 55-56%,
  // EPS $4.00 ±$0.15 (vs ~$3.83 consensus) on ~388M shares. CEO: "increasing
  // visibility". Street: Buy (26), PT $420-1,050, median $650; FY27E EPS
  // $20.18, FY28E $32.05. Yet the stock fell ~$545 → $397 since late July
  // (RS 99→74) — ~20× FY27E / ~12× FY28E consensus. Net: the "above target,
  // don't chase" call is gone; the cyclical-peak question remains, so the
  // mid-cycle framework still lands at HOLD — now model-driven, no override.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'AI data economy drives a structural surge in mass-capacity nearline HDD — management sees >25% long-term exabyte CAGR from inference, agentic AI, synthetic and physical-AI data',
    'Rational HDD duopoly with no unit-capacity additions — supply discipline plus a mix-up to higher-capacity drives drives pricing power (ASP/TB +9% YoY, cost/TB ~-10%)',
    'Gross margin broke above 50% and is still expanding (70-75% incremental); ~30% FCF margin with multi-year LTAs now extending into CY28-29 (some requested to 2032)',
    'Balance sheet transformed — net cash, investment-grade (S&P & Fitch), returning essentially all free cash flow via buybacks and a raised dividend',
    'Technology roadmap (40TB ePMR, HAMR with 4 customers in qualification, UltraSMR mix-up) extends capacity leadership toward 100TB+',
  ],

  risksToBuy: [
    'Earnings are surging toward what may be a cyclical peak — consensus already doubles them next year',
    'HDD has always been cyclical; the "this time is structural" case echoes prior peaks, and any AI-capex digestion reverses pricing fast',
    'Even a modest multiple on peak-cycle earnings can collapse if HDD pricing turns — severe downside if it does',
    'High beta — outsized drawdowns in any AI-spending scare, as the post-summer sell-off showed',
    'Concentrated in a handful of hyperscaler customers; flash cost-downs could encroach on warm storage over time',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 420, targetMedian: 650, targetHigh: 1050, numAnalysts: 26 },  // stockanalysis.com, Oct 9 2026

  epsCagr: [4, 12, 20],
  exitPE: [8, 11, 15],
  prob: [40, 40, 20],

  revGrowth: [
    [0.35, -0.05, -0.15, -0.05, 0.00],  // Bear: FY27 below consensus (Q1 guide +42-49% caps the miss), then the cycle rolls over
    [0.45, 0.25, 0.08, 0.00, 0.03],     // Base: FY27 ≈ consensus $19.2B (+49% haircut), FY28 haircut vs consensus +37%, then plateau
    [0.50, 0.37, 0.20, 0.10, 0.06],     // Bull: AI-storage super-cycle runs for years (consensus path)
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
      'EPS compounds only ~4% from the $20.18 FY27E base. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 40% — elevated given the parabolic run.',
    'AI nearline demand sustains a strong, multi-year up-cycle and the disciplined duopoly holds; gross margin stays above 50%, FCF compounds and buybacks shrink the share count. EPS compounds ~12% from the $20.18 FY27E base (an FY28 surge, then a plateau), and the multiple normalizes from ~20x toward a mid-cycle ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The business is genuinely better and arguably structural — but even after the pullback, {spot} prices most of a peak-cycle trajectory.',
    'AI makes mass-capacity HDD a perpetual hyperscaler line item; >25% exabyte growth runs for years, tight supply and HAMR-class density sustain pricing, and the market keeps awarding a premium. EPS compounds ~20% from the $20.18 base and the multiple holds near ~15x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20%.',
  ],

  thesis: [
    'Bear mechanics: HDD has always been cyclical — supply expands into strong demand, then pricing collapses. Even after a ~50% drawdown from the high, WDC at ~20x FY27E prices in a long up-cycle on surging peak earnings. ' +
      'Any AI-capex pause or flash encroachment reverses pricing fast, and the multiple de-rates to single digits. High beta deepens the drawdown. At {spot}, the risk/reward is asymmetric to the downside.',
    'The AI-storage demand is real and, management argues, structural: inference, agentic and physical-AI data compound at >25% exabyte CAGR, and ~80% of hyperscaler data lives on HDD. WDC is a focused, net-cash, investment-grade pure-play in a disciplined duopoly that adds no unit capacity, holds 50%+ gross margins and returns nearly all of a ~30% FCF margin. ' +
      'The pullback has come (~$545 → {spot}) and the stock now sits below every Street target (~$420-1,050), while consensus doubles EPS in FY27. But those are peak-cycle earnings in a historically boom-bust industry, and on a mid-cycle multiple the 5-year math only gets back to roughly today\'s price. Verdict: HOLD — closer to BUY than in June; a further pullback or evidence the cycle extends past FY28 tips it.',
    'The bull case: AI makes mass-capacity HDD a perpetual capex line, tight supply and density leadership sustain pricing for years, and the market keeps paying a premium for the clearest storage pure-play. ' +
      '{target} is achievable only if the super-cycle proves durable. Probability 20% — requires both demand and supply discipline to hold for years against HDD\'s cyclical history.',
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
    netDebt: -527,         // Jul 3 2026: $1.05B debt − $1.58B cash (retained Sandisk stake not counted)
    ebitda: 5000,
    fy: 'FY26',
    note: 'GREEN by Step 1 — net cash (~$0.53B at FY26 year-end; debt cut to $1.05B from $4.7B a year earlier, plus a retained Sandisk stake). Earlier: After monetizing SanDisk stock to repay $3.1B of debt, only $1.6B of convertible debt remains against ~$2B cash, leaving a net positive cash position (~+$450M at Q3 FY26). Upgraded to investment-grade by S&P and Fitch; ~30% FCF margin. The real risk is HDD cyclicality and the parabolic valuation, not leverage.',
  },
});
