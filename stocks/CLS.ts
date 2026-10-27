import { defineStock } from './defineStock';

export const CLS = defineStock({
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  updatedOn: '10/26',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-10-27',
  currentPrice: 246.25,
  fairPriceRange: '$375 - $550',  // stockanalysis.com analyst target range (Sep 30 2026)
  shares0: 117.9,
  rev25: 12400,        // FY2025; FY26 guide RAISED to $21.0B at Q3 (from $20.5B); FY27 guided ~$40.0B (+90%)
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 378,
  debt: 719,
  beta: 1.35,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 21.50,      // FY27E adj. EPS = COMPANY GUIDE, introduced at Q3 2026. Re-based off FY26
                       // ($11.55 raised from $11.30, from $8.75 at Q1) because a flat epsCagr cannot
                       // express a guided +86% followed by a fade — on the FY26 basis the model's
                       // year one read $13.86 against that $21.50. The growth rate was cut in the
                       // same edit, which is the whole lesson of EME: a forward re-base with the
                       // rate left alone inflates the target by construction.
  rsRating: 95,         // IBD RS per user, 10/10/2026 (was 92)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 27, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Above the top of guidance. Revenue $4.70B (+62%) vs ~$4.39B consensus;
  // adj. EPS $2.54 (vs $1.39; ~$2.30 consensus); adj. op margin 8.2%
  // (record). FY26 GUIDE RAISED: revenue $20.5B (+65%), adj. EPS $11.30
  // (+87%; vs ~$10.15 consensus at the time) on strong H1, stronger H2
  // customer forecasts and improved component supply. FY27: revenue growth
  // expected to accelerate beyond 65%, adj. EPS to grow faster than
  // revenue. Street: Strong Buy (22), PT $375-550 (median $480); FY26E EPS
  // $11.21 / rev $20.6B. Stock $362 (~32× FY26E, ~19× an FY27 that grows
  // 65%+) — below the low PT.
  // ─────────────────────────────────────────────────────────────────────────


  // Q3 2026 (reported Oct 26 2026, amc) — BEAT AND RAISED, AND THE SHAPE CHANGED
  // ─────────────────────────────────────────────────────────────────────────
  // Q3: revenue $5.83B (+83% YoY from $3.19B) vs $5.25-5.55B guided and $5.48B
  // consensus. Adjusted EPS $3.30 (vs $1.58 LY) against $2.88-3.08 guided and
  // $2.99 consensus; GAAP $3.26. Adjusted operating margin 8.5%, a company high.
  // Q4 guide: revenue $6.275-6.575B, adj. EPS $3.37-3.57.
  // FY26 raised: revenue $21.0B (from $20.5B), adj. EPS $11.55 (from $11.30).
  // FCF guide CUT to $460M from $600M — working capital to fund 2027 growth,
  // which is a real cash cost rather than a miss, but it is a cut.
  // FY27 FIRST GUIDE: revenue ~$40.0B (+90%), adj. EPS $21.50, adj. op margin
  // 9.0%, capex $1.5-2.0B. EPS came in slightly under the ~$22.17 estimate while
  // revenue beat ~$37.98B. Mgmt says 2028 customer demand forecasts are
  // meaningfully higher than the 2027 outlook, with no formal 2028 guidance.
  // Stock ~$284 after hours, +9%.
  //
  // THE MODEL'S SHAPE NO LONGER FITS, AND THAT IS NOT FIXED HERE.
  // A single `epsCagr` cannot express "+86% in FY27, then fade". On the FY26
  // basis kept above, the model's year-one EPS is $11.55 x 1.20 = $13.86 against
  // a company-guided $21.50 — it understates the near path badly. Re-basing to
  // the FY27 guide fixes that and moves the target a long way, so it is a
  // decision rather than a data refresh: at baseEps $21.50 the base case reads
  // ~$762 at 10%, ~$833 at 12%, ~$951 at 15% and ~$1,177 if 20% is carried over
  // unchanged, against ~$632 as it stands. Carrying the rate over unchanged is
  // exactly the EME mistake (see stocks/EME.ts) — a forward re-base with the
  // growth rate left alone inflates the target by construction.
  // ─────────────────────────────────────────────────────────────────────────
  epsCagr: [5, 12, 20],    // POST-FY27 rates, off the $21.50 FY27 guide. The surge is in the base
                           // now, so these are the fade. 12% is a judgement and not corroborated:
                           // unlike EME there is NO published 2028+ consensus for Celestica, only
                           // the CEO citing visibility into 2028 and demand forecasts running above
                           // the 2027 outlook. Reasoning: not 20%, which carries the surge rate past
                           // the surge; not 10%, too low while 2028 is guided higher; 12% is "still
                           // growing, no longer doubling" for a contract manufacturer whose 9.0%
                           // FY27 operating margin is already exceptional for EMS (peers 3-5%). The
                           // uncertainty lives in the spread — if the AI cycle runs through 2029
                           // this base is far too low, which is what the 20% bull is for.
  exitPE: [14, 22, 26],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 375, targetMedian: 480, targetHigh: 550, numAnalysts: 22 },  // stockanalysis.com (Sep 30 2026)
  revGrowth: [
    [0.62, 0.20, 0.00, -0.05, 0.00],  // Bear: FY26 ~locked; FY27 ramp falls well short, AI capex digestion after
    [0.65, 0.60, 0.12, 0.06, 0.05],   // Base: FY26 at guide ($20.5B), FY27 near mgmt's 65%+ outlook, then fade
    [0.67, 0.75, 0.20, 0.15, 0.10],   // Bull: FY27 acceleration exceeds plan, 1.6T + new hyperscaler programs
  ],
  fcfMargin: [
    [0.022, 0.022, 0.025, 0.028, 0.028],
    [0.029, 0.033, 0.037, 0.040, 0.042],
    [0.032, 0.040, 0.048, 0.052, 0.055],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'The guided FY27 lands but the cycle turns straight after; EPS compounds only ~5% from the $21.50 FY27 guide and the P/E compresses to 14x as the market reprices EMS at its historical range. 5yr target {target} ({cagr} annualized).',
    'FY27 delivers the guided $21.50 on ~$40B of revenue, then growth fades to a rate a contract manufacturer can hold; EPS compounds ~12% and the market pays 22x. 5yr target {target} ({cagr} annualized).',
    'The AI infrastructure super-cycle runs past 2028 as management\'s demand visibility suggests; EPS compounds ~20% beyond the FY27 guide and a premium 26x holds on structural AI leadership. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.13],

  burry: {
    sbc: 172,
    gaapNi: 833,
    buyback: 56,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic: ~19× stock return (2023→2026) amplifies naive 21% SBC/NI to estimated 100% cap. Minimal buybacks ($56M NCIB, well below $172M SBC).',
  },

  debtSafety: {
    netDebt: 341,
    ebitda: 1200,
    fy: 'Q1 2026',
    note: 'Low leverage: net debt $341M (cash $378M, debt $719M), 0.6× TTM adj EBITDA. $2.5B credit facility upsized April 2026, $2B+ available liquidity.',
  },
});
