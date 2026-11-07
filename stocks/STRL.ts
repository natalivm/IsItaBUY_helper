import { defineStock } from './defineStock';

export const STRL = defineStock({
  ticker: 'STRL',
  name: 'Sterling Infrastructure, Inc.',
  sector: 'Infrastructure Services · E-Infrastructure & Transportation',
  themeColor: '#e67e22',
  updatedOn: '11/06',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-07',
  nextEarningsOn: '2026-10-28',   // Q3 2026, after the close (per user, Oct 25 2026); Yahoo has no date for STRL
  currentPrice: 252.82,
  fairPriceRange: '$700 - $1,000',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 30.59,              // stockanalysis (Oct 2026)
  rev25: 2490,                 // FY2025 actual $2.49B; revGrowth[0] = FY26 (Q3 guide $4.63-4.73B, ~+88%), FY27E ~$5.6B
  fcfMargin25: 0.116,          // ~11.6% FCF margin (FY25 OCF ~$340M less ~$63M capex on $2.49B rev)
  taxRate: 0.24,
  cash: 464,                   // Jun 2026 (stockanalysis)
  debt: 337,
  beta: 1.15,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 21.84,              // FY26E adj. EPS. Q3 guide $21.70-21.96 (midpoint $21.83) and the 8-analyst
                               // consensus $21.84 agree to a cent, which is why this one is not an estimate worth
                               // arguing with. FY25A $10.88, so FY26 is +101%. FY27E $28.10 (9 analysts, $26.24-30.38),
                               // +29% on FY26. Prior $20.04 was the pre-Q3 consensus off the August guide.

  rsRating: 77,                 // IBD RS per user, 10/11/2026 (was 96)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',        // Data centers + semiconductor campuses drive E-Infrastructure; CEC adds turnkey electrical
  // Q2 2026 UPDATE (Aug 3, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter: revenue +90% (~50% organic), adj. EPS $5.80 (+116%),
  // adj. net income +118%. Backlog $4.33B (+116%; +50% organic), combined
  // backlog $5.62B (+150%); book-to-burn 1.4x. FY26 GUIDE RAISED (incl.
  // Stone Ridge acquisition): midpoint implies revenue +64%, adj. EPS +84%,
  // adj. EBITDA +79%. Street: Strong Buy (8/8), PT $700-1,000 (median $754);
  // FY26E rev $4.12B / EPS $20.04, FY27E $4.93B / $25.41. Stock $513 (~25.6×
  // FY26E, ~20× FY27E) — well below the lowest analyst target.
  // ─────────────────────────────────────────────────────────────────────────

  // OCT 2026 — THE FIRST RISK BULLET IS BEING PRICED, WITHOUT A PRINT
  // ─────────────────────────────────────────────────────────────────────────
  // $355.30, -65% from the $1,005.68 high and -30.6% in a month, and NO
  // earnings has happened. The October sessions gap -0.9% to -4.4% and close
  // -4.7% to -9.7%: intraday selling, not a results reaction. Q2 on Aug 4
  // gapped -13.3% for comparison — earnings gap, de-ratings grind. Q3 lands
  // OCT 28 2026 after the close, three sessions from this note — earlier than
  // the Feb/May/Aug gap cadence suggested, so do not date the next one off
  // that pattern either.
  //
  // So this is multiple compression on forward expectations, which is exactly
  // risksToBuy[0]: "a hyperscaler spending pause would simultaneously crush
  // earnings and compress the elevated multiple". The compression half has run
  // — 50.2× FY26E at the high to 17.7× now, 14.0× on FY27E. The earnings half
  // is untested and Q3 is the test.
  //
  // What the price implies: at 25× FY27E, $355 needs EPS of $14.21 against the
  // modelled $25.41 — a 44% cut. That is a buildout stalling, not slowing.
  // Which means Oct 28 is not a routine print: the market has already marked
  // the multiple down to a level that needs estimates cut almost in half, and
  // the guide is what the company either defends or withdraws that evening.
  // MODEL INPUTS ARE DELIBERATELY UNCHANGED. baseEps $20.04 and epsCagr
  // [6,14,19] are Q2 numbers and a guide the company has not withdrawn;
  // re-cutting them from a chart would be marking to the tape. Q3 is what
  // settles it — refresh then and set dataReviewedOn to that date.
  // analystConsensus ($700-1,000, median $754) is Oct 8 and predates most of
  // this; treat it as stale rather than as upside.
  // ─────────────────────────────────────────────────────────────────────────

  // Q3 2026 (reported Oct 28, after the close) — THE TEST ABOVE, ANSWERED
  // ─────────────────────────────────────────────────────────────────────────
  // The earnings half did not break. Revenue +127%, adj. diluted EPS $7.58
  // (+118%), E-Infrastructure adj. operating margin 23%, combined backlog
  // $6.14B and scoped work near $8B. The FY26 guide was RAISED a third time,
  // to adj. EPS $21.70-21.96 from $19.70-20.30 — the company defended it
  // rather than withdrawing it, which is exactly what the Oct note said the
  // evening would decide.
  //
  // So the "44% cut" the price implied has not arrived. At $252.82 this is
  // 11.6x FY26E and 9.0x FY27E ($28.10) on a business that just grew earnings
  // 118%. The de-rating ran from 50.2x FY26E at the high to 11.6x now, and
  // it did it through a quarter that beat.
  //
  // What did show up is smaller and real: Building Solutions revenue -5% on a
  // slower homebuilder, and a guide that assumes heavier Q4 weather than 2025.
  // Neither is the hyperscaler pause risksToBuy[0] describes. The stock still
  // fell on the print.
  //
  // NOT REFRESHED, and each needs a number this review could not source:
  //   - rsRating 77 is the Oct 11 IBD read, before most of the fall. RS gates
  //     the quality boost below 30, so a collapsed reading would change the
  //     rating. It needs your IBD number, not a guess from the chart.
  //   - analystConsensus and fairPriceRange are Oct 8 and predate the print
  //     and most of the de-rating. Treat as stale, not as upside.
  //   - cash/debt are Jun 2026; the Q3 balance sheet is not in this file yet.
  //   - nextEarningsOn is now in the past. The Oct note warns against dating
  //     the next one off the old cadence, so it is left rather than guessed.
  // ─────────────────────────────────────────────────────────────────────────


  // ── EPS/PE Scenarios ──
  epsCagr: [6, 14, 19],        // From the FY26E $20.04 base (re-based Oct 2026; was [8,14,18] off FY25A $10.95)
  exitPE: [16, 22, 28],        // ~25.6× FY26E today; bear: quality industrial; base: proven infra compounder; bull: premium secular growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Strong Buy', targetLow: 700, targetMedian: 754, targetHigh: 1000, numAnalysts: 8 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.86, 0.05, 0.02, 0.02, 0.02],   // Bear: FY26 at the low end of the Q3 guide, then DC capex digests
    [0.88, 0.18, 0.10, 0.08, 0.07],   // Base: FY26 ≈ $4.68B (guide midpoint), FY27 ≈ consensus, then fade
    [0.90, 0.25, 0.15, 0.12, 0.10],   // Bull: Supercycle + new geos + full CEC/Stone Ridge integration
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
  bullMaOptVal: 391 * 30.7 * 0.03,   // M&A optionality in fragmented infrastructure market (lower % at $15B+ market cap)

  desc: [
    'Data center capex cycles down in 2027 as hyperscalers digest the build-out wave, and E-Infrastructure organic growth slows sharply; skilled labor scarcity caps throughput and semiconductor megaprojects slip. ' +
      'Earnings grow only ~6% from the FY26E $21.84 and the market de-rates Sterling to 16x as growth decelerates. 5yr target {target} ({cagr} annualized).',
    'E-Infrastructure keeps growing as the record $4.3B backlog converts and CEC turnkey electrical plus Stone Ridge broaden the offering; semiconductor campuses add a second vector. ' +
      'Earnings compound ~14% from $21.84 (FY27 +29% consensus, then fade) and the multiple settles at 22x. 5yr target {target} ({cagr} annualized).',
    'The AI data center supercycle extends through 2028+ and the site-development-plus-electrical bundle becomes the industry standard across new geographies; project sizes keep scaling and margins expand. ' +
      'Earnings compound ~19% and the market sustains a 28x premium for execution and visibility. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'E-Infrastructure is cyclical, not structural — 2026\'s extraordinary growth (revenue +88%, EPS +101%) is a peak growth rate that will normalize as hyperscaler spending matures. ' +
      'Skilled labor shortages cap throughput, Building Solutions remains a drag, and federal transportation funding faces reauthorization uncertainty. Peak margins are the biggest risk.',
    'Sterling is a proven beat-and-raise compounder: Q3 2026 adj. EPS +118%, revenue +127%, combined backlog $6.14B, scoped work near $8B, and FY26 guidance raised a third time. ' +
      'CEC plus Stone Ridge create a turnkey offering few competitors match at scale, and a net-cash balance sheet funds buybacks and M&A. At ~9x FY27E the thesis needs no re-rating at all — it needs the guide to hold.',
    'Sterling as the undisputed E-Infrastructure platform: site development + turnkey electrical + underground utilities for data centers, semiconductor fabs and mega-distribution centers. ' +
      'Geographic expansion multiplies the addressable market and transportation margins keep improving; if the supercycle extends, earnings power keeps compounding well above consensus.',
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
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.010],
    },
  ],

  debtSafety: {
    netDebt: -128,         // Jun 2026 (stockanalysis): ~$464M cash − ~$337M debt
    ebitda: 714,           // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$0.13B even after the CEC and Stone Ridge acquisitions. Step 1 GREEN.',
  },
});
