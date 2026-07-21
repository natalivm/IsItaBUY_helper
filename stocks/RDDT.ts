import { defineStock } from './defineStock';

export const RDDT = defineStock({
  ticker: 'RDDT',
  name: 'Reddit, Inc.',
  sector: 'Internet / Social Media & Advertising',
  themeColor: '#ff4500',
  updatedOn: '07/21',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 185.84,   // Jun 26 2026 close (+5.6% that day); pulled back ~27% from the Dec-25 close ($229.87), still well below the ~$230 analyst target
  fairPriceRange: '$140 - $475',
  shares0: 206,           // ~206.4M diluted shares (Q1 2026); modest dilution (+0.2% YoY); mkt cap ~$34B
  rev25: 2202,            // FY2025 revenue $2,202.5M (+69.4%); Q1 2026 $663M (+69% YoY), 7th straight quarter >60%; Q2 guide $715-725M (+44%)
  fcfMargin25: 0.35,      // FY25 FCF margin 31%; Q1 2026 hit 47% on a capital-light model ($1M CapEx)
  taxRate: 0.12,          // ~0% now on NOLs; TIKR forward steps to ~15%
  cash: 2800,            // ~$2.8B cash & investments, no debt — net cash
  beta: 1.6,
  debt: 0,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 5.00,          // FY2026E GAAP EPS ~$4.97 (TIKR) — conservative vs normalized ~$7.10 given heavy-ish SBC. Q1 2026 GAAP EPS $1.01 (+7x YoY). GAAP path: ~$5.0->$6.5->$8.3->$10.6->$13.1 (FY26-30), ~27% CAGR as operating leverage builds.
  rsRating: 45,           // IBD RS 45 (Composite 65, EPS 84, SMR A) — momentum has cooled hard, off ~27% from its Dec high; its internet group is weak too (Group Rank 131/142, Group RS E)
  rsTrend: 'flat',
  aiImpact: 'NEUTRAL',    // Two-sided: data-licensing + "most-cited AI source" + human-perspective demand are tailwinds, while AI answer-engines threaten referral traffic

  reasonsToBuy: [
    'Hyper-growth ad platform — revenue +69% (7th straight quarter >60%) on 91% gross margins, with ARPU +44% and active advertisers +75%',
    'Best-in-class financial model: ~40% adjusted-EBITDA and ~47% free-cash-flow margins on a capital-light base ($1M quarterly CapEx), now GAAP-profitable',
    'High-margin AI data-licensing annuity (Google, OpenAI) on a one-of-a-kind human-conversation corpus — the most-cited source in AI answers, with 2027 renewals a potential step-up',
    'Large user runway — only ~50M of ~200M US weeklies are dailies; ML/feed personalization, onboarding and Reddit Search (~1M -> ~15M users in a quarter, +30% YoY) target 100M US DAU toward a 1B global ambition',
    'Net-cash balance sheet (~$2.8B), no debt, and a $1B buyback the company is actively using (~1M shares last quarter); trades well below the ~$230 analyst median target after the pullback',
  ],

  risksToBuy: [
    'Traffic depends heavily on Google search referrals — AI Overviews / answer-engines and algorithm changes could erode top-of-funnel users',
    'Still richly valued (~33x GAAP earnings) for a decelerating grower; high beta and very volatile (off ~27% from its year-end level)',
    'User frequency is the unproven lever — converting once-a-week visitors into daily users is the core growth bet and not yet won',
    'Stock-based comp (~12% of revenue) still dilutes holders and flatters adjusted profitability',
    'Advertising is cyclical and some buyers are planning month-to-month; a budget pullback would hit the growth narrative quickly',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 120, targetMedian: 230, targetHigh: 300, numAnalysts: 32 },

  epsCagr: [12, 20, 26],
  exitPE: [16, 24, 30],
  prob: [30, 45, 25],

  revGrowth: [
    [0.30, 0.20, 0.14, 0.10, 0.08],   // Bear: AI-search erodes referral traffic, ad growth decelerates fast
    [0.44, 0.32, 0.25, 0.20, 0.18],   // Base: ad monetization + data licensing compound (TIKR path; Q2 guide +44%)
    [0.50, 0.38, 0.30, 0.25, 0.20],   // Bull: DAU inflects, international scales, licensing re-rates higher
  ],
  fcfMargin: [
    [0.30, 0.32, 0.34, 0.35, 0.36],
    [0.37, 0.40, 0.42, 0.43, 0.44],
    [0.42, 0.45, 0.48, 0.50, 0.52],
  ],
  exitMultiple: [18, 28, 38],
  termGrowth: [0.03, 0.04, 0.045],
  bbRate: [0.00, 0.005, 0.01],
  ebitdaProxy: [0.38, 0.45, 0.50],
  bullMaOptVal: false,

  desc: [
    'AI answer-engines and zero-click search erode Google referral traffic; daily-user growth stalls and ad growth decelerates sharply. ' +
      'EPS compounds only ~12% from the FY2026E $5.00 GAAP base and the market reprices Reddit as a sub-scale ad platform at ~16x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — the structural traffic risk is the key swing factor.',
    'Reddit keeps compounding ad revenue (rising ARPU, Reddit Max automation, DPA shopping, international) while the AI data-licensing stream scales as a high-margin annuity, and best-in-class ~40% EBITDA / ~47% FCF margins drive earnings. ' +
      'EPS compounds ~20% from the $5.00 base while the multiple normalizes toward ~24x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A rare growth-plus-profitability-plus-cash-flow combination, trading below the Street target — own the monetization ramp, sized for the traffic risk.',
    'The DAU lever finally inflects (50M -> 100M US), international scales on machine translation and native communities, and Reddit cements itself as a must-have AI grounding/training source with data-licensing re-rating higher. Operating leverage pushes margins toward 50%. ' +
      'EPS compounds ~26% from the $5.00 base and the market awards a premium ~30x. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: a large share of Reddit traffic arrives via Google search, and AI answer-engines increasingly satisfy queries without a click-through. If referral traffic erodes before daily-user frequency inflects, user and ad growth stall just as the stock prices in years of compounding. ' +
      'SBC is meaningful and ads are cyclical. At {spot}, a traffic shock has limited valuation support.',
    'The bull data is exceptional: revenue +69% on 91% gross margins, ~40% EBITDA and ~47% FCF margins on $1M of quarterly CapEx, GAAP-profitable, net cash, and a one-of-a-kind human-conversation corpus that AI labs cite more than any other source and pay to license. After the ~27% pullback the stock sits well below the ~$230 consensus target. ' +
      'The offsetting risk is the same AI wave — it both pays Reddit for data and threatens its referral traffic — plus an unproven daily-frequency lever. Net: a best-in-class grower at a reasonable-for-growth multiple with real upside. Verdict: BUY — own the ramp, sized for the traffic risk.',
    'The bull case: Reddit becomes a core AI grounding/training source AND a top-tier ad platform, US DAU doubles toward 100M, international scales, and ARPU keeps climbing on Reddit Max and shopping formats. Margins push toward 50% and {target} is achievable. ' +
      'The risk is the AI-search traffic threat and ad cyclicality. Probability 25% — high reward if the corpus proves indispensable and the daily-user lever finally turns.',
  ],

  burry: {
    sbc: 385,
    gaapNi: 1019,
    buyback: 150,
    epsBasis: 'GAAP',
    fy: 'FY26E',
    overstatementPct: 38,
    overstatementSource: 'estimated',
    note: 'Critical (improving). SBC ran ~$79M in Q1 2026 (~12% of revenue, down sequentially and guided to grow ~half the rate of revenue) -> ~$385M/yr vs FY26E GAAP NI ~$1.0B = ~38% naive. Dilution is modest (fully-diluted shares +0.2% YoY) and the $1B buyback is now being used (~1M shares repurchased last quarter), so per-share economics are far better managed than typical recent IPOs — the SBC drag is real but shrinking as a share of revenue.',
  },

  debtSafety: {
    netDebt: -2800,
    ebitda: 1019,
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash. ~$2.8B cash and investments and no debt against a ~40% EBITDA margin and ~47% FCF margin. The real risks for Reddit are referral-traffic/competition and SBC dilution, not the balance sheet.',
  },
});
