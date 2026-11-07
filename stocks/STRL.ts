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
  fairPriceRange: '$565 - $834',  // post-Q3 analyst range, Nov 2 2026 (individual cuts since run to $500)
  shares0: 30.5,               // TIKR, Nov 6 2026 (market cap $7,711.65M at $252.82 reproduces to $7,711M)
  rev25: 2490,                 // FY2025 actual $2.49B; revGrowth[0] = FY26 (Q3 guide $4.63-4.73B, ~+88%), FY27E ~$5.6B
  fcfMargin25: 0.116,          // ~11.6% FCF margin (FY25 OCF ~$340M less ~$63M capex on $2.49B rev)
  taxRate: 0.24,               // confirmed: effective rate 24.5% / 23.3% / 24.9% across Q1-Q3 2026 (TIKR)
  cash: 217,                   // Q3 2026 quarter end, per the call. Gross debt fell from $337M because the
  debt: 95,                    // term loan was repaid on Jul 2 out of the expanded $1.5B revolver (now out to
                               // Jul 2031); net cash barely moved, -$127M to -$122M. TIKR reads LTM net debt
                               // -$51M, the difference being leases it counts as debt and the call does not.
  beta: 1.86,                  // TIKR 5-yr beta, Nov 6 2026 (was 1.15). Raises the DCF WACC; STRL rates on
                               // EPS_PE, so this moves the backup model only.
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 21.84,              // FY26E adj. EPS. Q3 guide $21.70-21.96 (midpoint $21.83) and the 8-analyst
                               // consensus $21.84 agree to a cent, which is why this one is not an estimate worth
                               // arguing with. FY25A $10.88, so FY26 is +101%. FY27E $28.10 (9 analysts, $26.24-30.38),
                               // +29% on FY26. Prior $20.04 was the pre-Q3 consensus off the August guide.

  rsRating: 40,                 // IBD RS per user, 11/07/2026 (was 77 on 10/11, 96 before that)
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
  // Neither is the hyperscaler pause the risk bullets describe. The stock still
  // fell on the print.
  //
  // FROM THE CALL (Oct 29) — what the segments and the framework actually say
  // ─────────────────────────────────────────────────────────────────────────
  // E-Infrastructure revenue +212%, adj. operating income +171%, margin 23%.
  // Site development more than DOUBLED organically. CEC (electrical) did $426M
  // in the quarter, roughly quadrupling its pro-forma prior year, and full year
  // "could exceed $1 billion".
  //
  // The margin line needs reading carefully, because the headline falls while
  // both halves improve. Segment margin declined y/y only because CEC went from
  // 10% to a third of segment revenue, and electrical is structurally
  // lower-margin (more pass-through material). Site margins held flat q/q while
  // absorbing the Micron ramp, whose first ~$600M was 4 million cubic yards of
  // purchased rock — material-heavy, low-margin, and rolling into normal phases
  // around Q2 2027. CEC core margin is already +150bps against a 300-500bps
  // commitment, with ~160bps of noncore drag being wound down through 2027.
  // So "margins fell" and "both businesses improved" are both true this quarter.
  //
  // Transportation revenue -3% BY CHOICE — crews redeployed into E-Infra — and
  // adj. operating income still +22% at a 19.7% margin. Q4 implies ~19% group
  // margin against 21.6% in Q3: seasonality, deliberate holiday scheduling, and
  // a weather assumption set against 2025's unusually easy winter.
  //
  // VISIBILITY, which is the actual reason to own this: scoped work ~$8B (+90%),
  // E-Infra scoped ~$7B (+130%). Beyond that, thousands of acres already
  // permitted and POWERED on campuses being worked today — management puts it at
  // more than five further years of work that appears in no backlog number.
  //
  // THE FRAMEWORK, AND WHY epsCagr IS NOT RAISED ON IT. Management now targets
  // 20-30% annual ORGANIC profitability growth "over the next several years",
  // says 2027 "meets or exceeds" it, and frames ~50% a year including M&A
  // against a 48% six-year record. Our base epsCagr is 14 — a deliberate fade
  // from FY27's +29% consensus down to ~10% by year five, i.e. well under
  // management's own organic floor. That gap is a choice, not an oversight:
  // a multiyear target is the weakest input class there is, the rating is
  // already STRONG BUY at the hard 16% threshold, and raising the base would
  // only push an already-extreme $925 target further from a $253 stock without
  // changing a single decision. If 2027 lands inside the organic range, raise it
  // then on the print.
  //
  // THE BINDING CONSTRAINT IS CAPACITY, NOT DEMAND — management says so
  // repeatedly ("more opportunity than we have capacity"), which is why M&A is
  // framed as buying crews rather than buying growth, and why exceeding 20-30%
  // depends on acquisitions landing. Permitting noise is real but unresolved
  // rather than negative: Texas TCEQ is in limbo over automated water permits,
  // and management reports nobody backing off. Building Solutions stays under
  // pressure into 2027. The Q3 receivables spike was collection timing and was
  // largely banked in early October.
  //
  // TWO THINGS THE EPS LINE HIDES, both from the TIKR quarterlies (Nov 6)
  // ─────────────────────────────────────────────────────────────────────────
  // FIRST, FREE CASH FLOW HAS GONE THE OTHER WAY FROM EARNINGS. Quarterly FCF
  // margin reads 21.1% -> 17.7% -> 9.6% -> 3.4% across Q4'25 to Q3'26 while
  // EBITDA margin EXPANDED over the same four quarters, 18.3% -> 21.7%. The
  // whole divergence is working capital: receivables took $344.75M out of Q3
  // alone, so $214.93M of net income converted to $99.07M of operating cash and
  // $53.26M of FCF. (That ties out against the call's "$427M of 9M operating
  // cash flow" to the dollar, so it is the same arithmetic, not a different
  // basis.) TTM FCF margin is 10.9%.
  //
  // Management calls it collection timing and says a major portion was banked in
  // early October, which is credible and is NOT the whole story: a business
  // growing revenue 127% consumes working capital whether or not any single
  // collection slips. The base fcfMargin path here runs 11.6% rising to 14.0%,
  // i.e. it assumes expansion while the actual series is falling hard. STRL
  // rates on EPS_PE so this moves the backup model only, but it is the one
  // genuinely new negative in the data and it is invisible in the EPS line.
  // Worth re-reading at Q4, when the October collections show up.
  //
  // SECOND, Q4 IS GUIDED SHARPLY DOWN AND THE FY NUMBER IS NOT A RUN-RATE.
  // 9M GAAP diluted EPS is $15.01 against a $19.16-19.42 FY guide, so Q4 GAAP
  // is $4.15-4.41 — a 38% sequential FALL from Q3's $6.92. No assumption is
  // needed for that, it is the guide minus the reported quarters. Seasonality,
  // holiday scheduling and the weather assumption are the stated reasons. Anyone
  // annualising Q3 gets a number the company has already said it will not hit.
  //
  // (baseEps is the ADJUSTED figure, $21.84. The adjusted-to-GAAP gap runs about
  // $0.66-0.80 a quarter, ~$2.5 a year, mostly intangible amortisation from CEC
  // and Stone Ridge. exitPE is applied to adjusted EPS, which is the convention
  // across this ledger — just do not compare it to a GAAP P/E screen.)
  // ─────────────────────────────────────────────────────────────────────────

  // STILL NOT REFRESHED:
  //   - nextEarningsOn is now in the past. The Oct note warns against dating
  //     the next one off the old cadence, so it is left rather than guessed.
  //
  // RS CAME IN AT 40 (from 77), and it moves the GROUP but not the rating.
  // The rating is untouched because 29.6% CAGR clears the hard 16% STRONG BUY
  // line, which needs no quality boost — the label holds all the way down to
  // RS 10. The group is a different test: at a $7.7B cap STRL is not large-cap,
  // so it needs momentum, and 40 is under the 70 "good momentum" line while the
  // mid-RS alternative wants rsTrend 'rising' against the actual 'falling'. So
  // TURBO_GROWTH -> WATCH_LIST.
  //
  // That pairing is uncomfortable and it is correct: the cheapest the stock has
  // ever been on forward earnings, rated STRONG BUY by the model, sitting in
  // WATCH_LIST because price momentum is poor. The classifier deliberately wants
  // a reason AND a tape, and right now only the reason is there.
  // ─────────────────────────────────────────────────────────────────────────


  // ── EPS/PE Scenarios ──
  epsCagr: [6, 14, 19],        // From the FY26E $20.04 base (re-based Oct 2026; was [8,14,18] off FY25A $10.95)
  exitPE: [16, 22, 28],        // ~25.6× FY26E today; bear: quality industrial; base: proven infra compounder; bull: premium secular growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  // Nov 2 2026, after the print. The mean $693.43 is corroborated twice — Yahoo's forecast page and
  // the TIKR card of Nov 6 give the same figure to the cent. Every target moved DOWN through a quarter
  // that beat and raised: Cantor $742 -> $565 (Overweight), Oppenheimer $950 -> $775, Stifel $804 -> $742,
  // DA Davidson $700 -> $680, Argus $700 -> $500 — all of them still Buy-equivalent. That is analysts
  // marking the multiple, not the earnings, which is the same move the Oct note described the market making.
  analystConsensus: { rating: 'Buy', targetLow: 565, targetMedian: 693.43, targetHigh: 834, numAnalysts: 8 },
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
  bbRate: [0.008, 0.020, 0.030],     // $123M of stock repurchased in 9M 2026 per the cash flow statement (~2.1% annualized of a $7.7B cap); $267M left on the authorization
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
    netDebt: -122,         // Q3 2026 per the call: $217M cash − $95M debt
    ebitda: 901,           // TTM reported EBITDA through Q3 2026 (TIKR quarterlies); FY26E adj. guide is $970-981M
    fy: 'Q3 2026 / FY26E guide',
    note: 'Net cash $0.12B after CEC and Stone Ridge, plus a $1.5B revolver undrawn to Jul 2031. Step 1 GREEN.',
  },
});
