import { defineStock } from './defineStock';

export const PLTR = defineStock({
  ticker: 'PLTR',
  name: 'Palantir Technologies',
  sector: 'AI / Data Analytics Software',
  themeColor: '#0ea5e9',
  updatedOn: '11/06',
  nextEarningsOn: '2026-11-02',   // Q3 2026, after the close; per Benzinga Oct 2026 and
                                  // unconfirmed by Palantir IR. Yahoo overrides this when it has a date.
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-07',
  currentPrice: 160.38,
  fairPriceRange: '$80 - $265',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 2409.5,     // Shares outstanding, TIKR Nov 6 2026 ($160.38 x 2,409.5 gives the $386,435M cap).
                       // Was 2300, which was simply stale -- NOT dilution. Diluted share count is FLAT:
                       // 2,573.50 -> 2,570.92 -> 2,568.69 -> 2,573.93 over the last four quarters, +0.02%,
                       // on basic +0.79%. $319M a quarter of stock comp and the count does not move.
  rev25: 4480,         // FY2025; FY26 guide $8.530-8.534B (+90%) after Q3, FY27E consensus ~$12.39B (+45%)
  fcfMargin25: 0.45,
  taxRate: 0.15,
  cash: 10400,         // Q3 2026 per the call: cash, equivalents and US Treasuries (was $7.7B)
  debt: 240,           // unchanged; TIKR reads LTM net debt -$10,336M against the -$10,160M these two imply
  beta: 1.61,          // TIKR 5-yr beta, Nov 6 2026
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 1.69,       // FY2026E adjusted EPS, rebuilt from three reported quarters plus the Q4 guide — see
                       // the Q3 note below for the bridge. Was $1.62, the pre-print consensus, which is now
                       // falsified on the low side: it implies a Q4 of exactly $0.44, flat on Q3, against
                       // revenue guided +14.6% q/q. FY27E consensus ~$2.35 (+39% on this base).
  rsRating: 92,         // IBD RS per user, 11/07/2026 (was 99 on 10/10, 19 before that)
  rsTrend: 'rising',
  // ratingOverride removed at Q2 2026 review: after re-basing EPS ($1.62 FY26E) and CAGRs, the model reads HOLD on its own (~2% base CAGR at ~130× FY26E), and the old rationale (RS ~19 and falling) no longer holds.
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 3, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // "Otherworldly" quarter. Revenue ~$1.935B (+93%) vs ~$1.80B consensus. US
  // commercial $764M (+149% y/y, +28% q/q); US government $809M (+90%).
  // GAAP op income $912M (47% margin). US commercial TCV $2.13B (+153%,
  // ~$800M above the prior record). GUIDE (largest raise ever): FY26 revenue
  // $8.150-8.158B (+82%), US commercial >$3.424B (≥+134%, from ≥+120%), adj.
  // FCF $4.5-4.7B; Q3 revenue $2.160-2.164B. Street: Buy (32), PT $80-265
  // (median $215); FY26E EPS $1.62 / rev $8.21B, FY27E $2.35 / $12.31B.
  // Stock $209 (~130× FY26E / ~89× FY27E), RS back to 99.
  // ─────────────────────────────────────────────────────────────────────────

  // Q3 2026 (reported Nov 2, after the close)
  // ─────────────────────────────────────────────────────────────────────────
  // Another beat and another raise. Revenue $2.313B (+96% y/y, +20% q/q) vs
  // ~$2.183B consensus; adj. EPS $0.44 vs $0.41. US commercial $984M passed US
  // government $953M FOR THE FIRST TIME — the commercial thesis stops being a
  // growth rate and becomes the larger half of the business. FY26 guide raised
  // to revenue $8.530-8.534B (from $8.150-8.158B), adj. income from operations
  // $5.245-5.249B, adj. FCF $4.8-5.0B; Q4 revenue $2.649-2.653B. The stock
  // fell on it.
  //
  // REBUILDING baseEps: $1.62 IS NOT A NEUTRAL PLACE TO STAND ANY MORE.
  // That was the pre-print consensus and no post-Q3 FY26 EPS consensus has been
  // published. But FY26 is now three reported quarters plus a tightly guided one:
  // adjusted EPS of $0.33 + $0.41 + $0.44 = $1.18 banked, so holding $1.62 is
  // asserting a Q4 of exactly $0.44 — FLAT on Q3 — against revenue guided +14.6%
  // q/q and adjusted operating income guided +15.1%. Keeping a number because the
  // correction happens to cross a rating threshold is choosing the input to get
  // the output, which is the same error as marking to the tape, pointed the other
  // way. So it is rebuilt.
  //
  // THE BRIDGE IS EXACT, which is what makes this arithmetic rather than opinion.
  // In Q3, adjusted income from operations $1,427M less GAAP operating income
  // $1,084.85M is $342.15M, against stock comp $318.89M plus employer payroll tax
  // $23M = $341.89M. The adjusted-to-GAAP gap is those two items and nothing else.
  // Q4 adjusted operating income is guided to $1,640-1,644M, so:
  //
  //   adj op $1,642M - SBC ~$357M - payroll ~$25M = GAAP op ~$1,260M (47.5%,
  //   against 46.2 / 47.1 / 46.9 in the three reported quarters)
  //   + interest ~$95M (62.7 -> 66.4 -> 77.5 -> 88.9 and rising with the cash pile)
  //   - tax ~$18M - minority ~$6M = ~$1,331M on 2,576M diluted = ~$0.52
  //
  // FY26 adjusted EPS ~ $1.70. Set to $1.69, a notch under the central estimate.
  // Cross-check: TIKR's LTM P/E of 112.98x at $160.38 implies LTM EPS $1.4195,
  // and the four reported quarters sum to $1.42 — the basis matches to the cent.
  //
  // THIS FLIPS THE RATING, and the file should say so rather than bury it. PLTR is
  // quality-boosted (RS 92 + TAILWIND) so BUY needs only a soft 8% CAGR; the stock
  // read 7.34% at $1.62 and reads 8.25% at $1.69, crossing at $1.6702. HOLD -> BUY,
  // and at a $386B cap with RS 92 the group goes WATCH_LIST -> PRIME_GROWTH. The
  // sensitivity is a Q4 stock-comp assumption: SBC has run 196 -> 202 -> 265 -> 319
  // and if Q4 lands near $420M rather than $357M the base is $1.67 and it stays a
  // HOLD. That is the whole error bar, and it sits on the threshold.
  // earnings_sync.py should overwrite this the moment a real consensus prints.
  //
  // DILUTION IS NOT THE PROBLEM, which is worth saying because it looks like it
  // should be. Diluted shares went 2,573.50 -> 2,573.93 across four quarters while
  // the company expensed over $1B of stock comp. Adjusted EPS tracks GAAP EPS
  // almost exactly ($0.41/$0.41, $0.44/$0.44) because Palantir adds SBC back and
  // then applies a normalized tax rate, and the two roughly cancel.
  //
  // THE REAL UNMODELLED RISK IS TAX. Effective GAAP tax was 1.2% in Q3 ($13.56M on
  // $1,148M of pre-tax income) and $9.8M / $12.2M / $15.4M / $13.6M across the four
  // quarters — call it 1-2% throughout. epsCagr [20, 30, 40] compounds five years
  // off a base that pays essentially no tax. Normalizing to even 15-20% is a
  // one-off 15-19% cut to EPS, roughly 3-4 points a year off a five-year CAGR, and
  // nothing in this model expresses it. It is the single largest thing standing
  // between the modelled path and the realized one.
  //
  // NOT REFRESHED: nextEarningsOn is now in the past (Q4 lands early Feb 2027 on
  // the usual cadence, left unguessed). The burry block is still FY25, correctly —
  // FY26 is not a complete fiscal year — but the trajectory is worth knowing at the
  // close: Q3 SBC $318.89M against $1,128M of GAAP net income is a naive ~28%,
  // improved from FY25's ~48%, because earnings are growing faster than stock comp.
  // ─────────────────────────────────────────────────────────────────────────

  // BOOKINGS ARE DECELERATING WHILE REVENUE ACCELERATES, and this is the thing to
  // watch. Revenue grew 96% y/y and 20% q/q, both company records. Over the same
  // quarter: total TCV bookings $2.918B, +6% y/y. US commercial TCV $1.463B, +11%
  // y/y — against US commercial REVENUE of +148%. RPO $4.9B, +88% y/y but FLAT
  // sequentially. Total remaining deal value $13.4B, +55% y/y but +2% sequentially.
  //
  // Put the two series together: book-to-bill was ~2.33x a year ago and is ~1.26x
  // now. Still above 1, so contracted value is still growing — but the cushion has
  // roughly halved while reported growth hit a record.
  //
  // Management's explanation is specific and testable: multiple 8-figure sovereign
  // AI deals signed at SHORTER duration than usual, with duration and size expected
  // to rise as the product matures. Net dollar retention supports it at 165%, up
  // 800bps. Short-duration deals genuinely do depress TCV while lifting near-term
  // revenue, so the story is coherent — and it is also exactly what the data would
  // look like if growth were about to roll over. One more quarter distinguishes
  // them; nothing else in this file will.
  //
  // (Gross margin is also drifting down, 86.8% -> 84.7% -> 83.4% over three
  // quarters, as delivery-heavy sovereign work scales. Cash conversion is not a
  // concern, unlike STRL: TTM FCF margin is 55.6% and Q3 absorbed a $409.64M
  // receivables build and still converted 52% of revenue to operating cash.)
  // ─────────────────────────────────────────────────────────────────────────


  // The median is TIKR's street target of Nov 6; low/high are still the Oct 8 range. Note the direction:
  // the street target went UP (215 -> 222.25) while the stock fell, the exact opposite of STRL, where every
  // target was cut through a quarter that beat. Analysts are raising PLTR's numbers and selling the stock.
  analystConsensus: { rating: 'Buy', targetLow: 80, targetMedian: 222.25, targetHigh: 265, numAnalysts: 32 },

  revGrowth: [
    [0.90, 0.30, 0.18, 0.14, 0.12], // Bear: FY26 locked at the Q3 guide; enterprise AI hype cools, growth falls fast
    [0.90, 0.42, 0.30, 0.22, 0.18], // Base: FY26 at guide (~$8.53B), FY27 +42% (vs ~+45% consensus), natural deceleration
    [0.90, 0.52, 0.40, 0.32, 0.25], // Bull: AIP becomes Fortune 500 standard, govt re-acceleration
  ],

  fcfMargin: [
    // FY26 is no longer a guess: adj. FCF is guided to $4.8-5.0B on $8.532B, i.e. 56-59%, against the 45%
    // this path used to start from. CAVEAT, and it is a big one: that is Palantir's ADJUSTED figure, which
    // adds back stock comp. Q3 SBC was $319M, 13.8% of revenue, so a full-SBC owner margin is ~15 points
    // lower — roughly 42% where the headline says 57%. The burry block below is the same point priced.
    [0.56, 0.54, 0.52, 0.50, 0.48], // Bear: FY26 locked at guide, then margin gives way as growth slows
    [0.57, 0.58, 0.58, 0.58, 0.58], // Base: FY26 at guide, scale economics hold it roughly flat
    [0.58, 0.61, 0.63, 0.64, 0.65], // Bull: software unit economics fully expressed
  ],

  exitMultiple: [22, 32, 45],

  desc: [
    'Enterprise AI spending normalizes as ROI proof-points lag deployment hype; AIP boot-camps convert to pilots but not full rollouts. Revenue growth falls from ~80% to the low teens by FY30. ' +
      'EPS compounds ~20% from the $1.69 FY26E base while the multiple compresses from ~95× toward 25×. 5yr target {target} ({cagr} annualized) — multiple compression overwhelms strong absolute growth.',
    'AIP scales: US commercial sustains triple-digit growth into FY27 then decelerates gracefully; government modernization continues. FY26 lands at the raised ~$8.15B guide. ' +
      'EPS compounds ~30% from the $1.69 base as margins expand. The multiple compresses from ~95× to ~38× through earnings growth. 5yr target {target} ({cagr} annualized) — quality compounds but you pay the multiple-compression tax.',
    'AIP becomes the default enterprise AI orchestration layer; revenue sustains 40%+ growth through FY28 and government wins AI-enabled defense modernization (Maven, TITAN, NGC2). ' +
      'EPS compounds ~40% from the $1.69 base and the market awards a 55× exit P/E for durable growth + structural moat. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'AI spending hype-cycle peaks; enterprises pull back on big-platform commitments and favor point-solutions. AIP pilots fail to convert to production at scale. ' +
      'Government budget cycle tightens. At ~95× FY26E EPS, multiple compression dominates returns even with continued revenue growth.',
    'Q2 2026 (revenue +93%, US commercial +149%, record $2.1B US commercial TCV, the largest guide raise in company history) shows AIP converting at scale. ' +
      'Margins and FCF validate the software unit economics. EPS compounds ~30% annually, and from ~95× FY26E the multiple compression still eats most of it. Verdict: BUY, barely — the Q3 guide lifted the base just past the line, and the whole margin is one quarter\'s stock-comp assumption.',
    'AIP becomes the operating system for enterprise AI — every Fortune 500 builds on Foundry/AIP. Government wins TITAN, Maven, NGC2 expansions plus international defense. ' +
      'Revenue sustains 40%+ growth through FY28. The "enterprise AI infrastructure layer" thesis re-rates the multiple permanently above software peers.',
  ],

  termGrowth: [0.02, 0.03, 0.035],

  epsCagr: [20, 30, 40],   // Re-based at Q2 2026 (was 38/50/65 off a $0.89 trailing-GAAP base): FY27E ~+39% then decelerating ≈ 30% from $1.69
  exitPE: [25, 38, 55],
  prob: [30, 50, 20],

  bbRate: [0.00, 0.005, 0.01],
  ebitdaProxy: [0.40, 0.48, 0.55],
  bullMaOptVal: false,

  burry: {
    sbc: 700,
    gaapNi: 1449,
    buyback: 0,
    epsBasis: 'NON_GAAP',   // baseEps is the adjusted consensus since the Q2 2026 review
    fy: 'FY25',
    overstatementPct: 90,
    overstatementSource: 'estimated',
    note: 'Naive SBC/NI is ~48% (FY25 SBC ~$700M on $1.45B GAAP NI). PLTR has compounded ~20× in 3 years ($7 → $137), which under full-SBC adjustment makes mark-to-market dilution cost on vested awards a multiple of the GAAP charge. No buyback to offset. Real owner economics materially below GAAP — Tragic tier.',
  },
  debtSafety: {
    netDebt: -10336,       // TIKR LTM net debt, Nov 6 2026; the call reports $10.4B of cash and Treasuries
    ebitda: 3400,          // LTM, from TIKR's 45.6% LTM EBIT margin on ~$7.2B LTM revenue (D&A is small here)
    fy: 'LTM Q3 2026',
    note: 'Net cash over $10B against trivial debt, and FY26 adj. FCF is guided at $4.8-5.0B. Step 1 GREEN.',
  },
});
