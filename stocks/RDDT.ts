import { defineStock } from './defineStock';

export const RDDT = defineStock({
  ticker: 'RDDT',
  name: 'Reddit, Inc.',
  sector: 'Internet / Social Media & Advertising',
  themeColor: '#ff4500',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 159.91,   // fell ~10% on the Q2 print (choppy search referrals); below the ~$210 analyst median target
  fairPriceRange: '$130 - $300',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 207,           // 207.0M fully diluted (Q2 2026, +0.2% YoY); mkt cap ~$33B
  rev25: 2202,            // FY2025 revenue $2,202.5M (+69.4%); Q1 2026 $663M (+69%), Q2 $805M (+61%), Q3 guide $860-870M; FY26E consensus $3.39B (+54%), FY27E $4.47B
  fcfMargin25: 0.35,      // FY25 FCF margin 31%; Q1 2026 hit 47% on a capital-light model ($1M CapEx)
  taxRate: 0.12,          // ~0% now on NOLs; TIKR forward steps to ~15%
  cash: 2790,            // Jun 30 2026: $1.49B cash + $1.30B securities, no debt — net cash
  beta: 1.6,
  debt: 0,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 5.30,          // FY2026E GAAP EPS — est. $1.01 (Q1) + $1.25 (Q2) + ~$1.40 (Q3 at guided ~$390M EBITDA) + ~$1.65 (Q4 seasonal). GAAP basis kept deliberately: Street consensus $7.68 (FY27E $9.69) is non-GAAP (adds back SBC). Prior: $5.00 (TIKR ~$4.97). GAAP path: ~$5.0->$6.5->$8.3->$10.6->$13.1 (FY26-30), ~27% CAGR as operating leverage builds.
  rsRating: 72,           // IBD RS per user, 10/10/2026 (was 45 in Jun 2026)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',    // Two-sided: data-licensing + "most-cited AI source" + human-perspective demand are tailwinds, while AI answer-engines threaten referral traffic

  // Q2 2026 UPDATE (Jul 30, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Strong numbers, nervous stock. Revenue $804.9M (+61%): ads $762M (+64%),
  // other (data licensing) $43M (+24%). Gross margin 91.3%. Net income $253M
  // (31% margin, +183%); GAAP EPS $1.25. Adj. EBITDA $343M (42.6% margin, from
  // 33.4%). SBC + taxes $107M (13% of revenue, +12%). FCF $261M on $1.1M
  // capex. Cash $2.8B, no debt. Bought back 1.5M shares for ~$235M ($157.57
  // avg). USERS: DAUq 130.3M (+18%) — US 53.2M (+6%), intl 77.1M (+28%);
  // logged-in DAUq 52.6M (+7%), logged-out 77.7M (+27%). WAUq 514.6M (+24%).
  // ARPU $6.18 (+36%; US $11.85 +51%). Mgmt: search referrals "choppy",
  // traffic more volatile late in the quarter, visibility "remains low".
  // Q3 GUIDE: revenue $860-870M (above consensus), adj. EBITDA $385-395M.
  // Stock fell ~10% on the print (US user growth only +6%). Street: Buy (34),
  // PT $130-300, median $210; FY26E rev $3.39B, non-GAAP EPS $7.68.
  // Net: monetization is carrying the story while US user growth stalls —
  // the bull/bear debate is exactly the search-traffic risk.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Hyper-growth ad platform — revenue still growing well above fifty percent on software-like gross margins, driven by rapidly rising ARPU',
    'Best-in-class financial model — expanding EBITDA and free-cash-flow margins on almost zero capex, and solidly GAAP-profitable',
    'High-margin AI data-licensing annuity (Google, OpenAI) on a one-of-a-kind human-conversation corpus — the most-cited source in AI answers, with 2027 renewals a potential step-up',
    'Large user runway — only a quarter of US weekly users visit daily, and international users are growing far faster than the US',
    'Net-cash balance sheet with no debt, and an accelerating buyback that already exceeds stock-comp dilution',
  ],

  risksToBuy: [
    'Traffic depends heavily on Google search referrals — AI Overviews / answer-engines and algorithm changes could erode top-of-funnel users',
    'Premium GAAP multiple for a decelerating grower; high beta and very volatile around earnings',
    'US daily-user growth has slowed to a crawl — converting weekly visitors into daily users is the core bet and not yet won',
    'Stock-based comp remains a meaningful cost that flatters adjusted profitability',
    'Advertising is cyclical and some buyers are planning month-to-month; a budget pullback would hit the growth narrative quickly',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 130, targetMedian: 210, targetHigh: 300, numAnalysts: 34 },  // stockanalysis.com, Oct 9 2026

  epsCagr: [12, 20, 26],
  exitPE: [16, 24, 30],
  prob: [30, 45, 25],

  revGrowth: [
    [0.45, 0.18, 0.14, 0.10, 0.08],   // Bear: FY26 ~locked by Q1-Q3 (+45% even with a flat Q4); then AI-search erodes referral traffic
    [0.54, 0.32, 0.25, 0.20, 0.18],   // Base: FY26/FY27 ≈ consensus $3.39B / $4.47B; ad monetization + data licensing compound
    [0.57, 0.38, 0.30, 0.25, 0.20],   // Bull: DAU inflects, international scales, licensing re-rates higher
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
      'EPS compounds only ~12% from the FY2026E $5.30 GAAP base and the market reprices Reddit as a sub-scale ad platform at ~16x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — the structural traffic risk is the key swing factor.',
    'Reddit keeps compounding ad revenue (rising ARPU, Reddit Max automation, DPA shopping, international) while the AI data-licensing stream scales as a high-margin annuity, and best-in-class ~43% EBITDA / ~32% FCF margins drive earnings. ' +
      'EPS compounds ~20% from the $5.30 base while the multiple normalizes toward ~24x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A rare growth-plus-profitability-plus-cash-flow combination, trading below the Street target — own the monetization ramp, sized for the traffic risk.',
    'The DAU lever finally inflects (50M -> 100M US), international scales on machine translation and native communities, and Reddit cements itself as a must-have AI grounding/training source with data-licensing re-rating higher. Operating leverage pushes margins toward 50%. ' +
      'EPS compounds ~26% from the $5.30 base and the market awards a premium ~30x. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: a large share of Reddit traffic arrives via Google search, and AI answer-engines increasingly satisfy queries without a click-through. If referral traffic erodes before daily-user frequency inflects, user and ad growth stall just as the stock prices in years of compounding. ' +
      'SBC is meaningful and ads are cyclical. At {spot}, a traffic shock has limited valuation support.',
    'The bull data is exceptional: revenue +61% on 91% gross margins, ~43% EBITDA margin on ~$1M of quarterly CapEx, a 31% GAAP net margin, net cash, an accelerating buyback, and a one-of-a-kind human-conversation corpus that AI labs cite more than any other source and pay to license. The stock sits well below the ~$210 consensus target after the post-Q2 drop. ' +
      'The offsetting risk is the same AI wave — it both pays Reddit for data and threatens its referral traffic (search referrals were "choppy" in Q2, US DAU only +6%) — plus an unproven daily-frequency lever. Net: a best-in-class grower at a reasonable-for-growth multiple with real upside. Verdict: BUY — own the ramp, sized for the traffic risk.',
    'The bull case: Reddit becomes a core AI grounding/training source AND a top-tier ad platform, US DAU doubles toward 100M, international scales, and ARPU keeps climbing on Reddit Max and shopping formats. Margins push toward 50% and {target} is achievable. ' +
      'The risk is the AI-search traffic threat and ad cyclicality. Probability 25% — high reward if the corpus proves indispensable and the daily-user lever finally turns.',
  ],

  burry: {
    sbc: 430,           // Q2 2026 SBC + taxes $107M → ~$430M/yr
    gaapNi: 1095,       // FY26E ≈ $5.30 GAAP EPS × ~207M shares
    buyback: 600,       // FY26E est.: ~1M shares in Q1 + $235M in Q2, accelerating
    epsBasis: 'GAAP',
    fy: 'FY26E',
    overstatementPct: 38,
    overstatementSource: 'estimated',
    note: 'Critical (improving). Q2 2026 refresh: SBC + taxes $107M (13% of revenue), GAAP NI $253M in the quarter, buyback stepped up to ~$235M (1.5M shares) — now above SBC run-rate. Earlier: SBC ran ~$79M in Q1 2026 (~12% of revenue, down sequentially and guided to grow ~half the rate of revenue) -> ~$385M/yr vs FY26E GAAP NI ~$1.0B = ~38% naive. Dilution is modest (fully-diluted shares +0.2% YoY) and the $1B buyback is now being used (~1M shares repurchased last quarter), so per-share economics are far better managed than typical recent IPOs — the SBC drag is real but shrinking as a share of revenue.',
  },

  debtSafety: {
    netDebt: -2790,
    ebitda: 1420,          // FY26E adj. EBITDA est. (Q1 ~$0.26B + Q2 $0.34B + Q3 guide ~$0.39B + Q4 est.)
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash. ~$2.8B cash and investments and no debt against a ~40% EBITDA margin and ~47% FCF margin. The real risks for Reddit are referral-traffic/competition and SBC dilution, not the balance sheet.',
  },
});
