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
  shares0: 2300,
  rev25: 4480,         // FY2025; FY26 guide $8.530-8.534B (+90%) after Q3, FY27E consensus ~$12.39B (+45%)
  fcfMargin25: 0.45,
  taxRate: 0.15,
  cash: 7700,
  debt: 240,
  beta: 1.51,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 1.62,       // FY2026E adjusted EPS — stockanalysis consensus (Oct 8 2026; range $1.51-1.75; FY27E $2.35, +45%). Prior $0.89 was trailing GAAP and understated the base (the old 38/50/65% EPS CAGRs compounded off it).
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 19)
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
  // baseEps IS DELIBERATELY LEFT AT $1.62, and the reason is a threshold.
  // There is no published post-Q3 FY26 EPS consensus yet; $1.62 is the pre-print
  // number. The three reported quarters are $0.33 + $0.41 + $0.44 = $1.18, so
  // FY26 lands wherever Q4 does, and Palantir guides revenue and operating
  // income rather than EPS — any Q4 EPS here would be my arithmetic, not an
  // estimate anyone published.
  //
  // That matters more than the usual 2-3%, because the rating sits right on the
  // line. PLTR is quality-boosted (RS 99 + TAILWIND), so BUY needs only a soft
  // 8% CAGR and the stock reads 7.34% today. Solving it: HOLD flips to BUY at
  // baseEps $1.6702 — which, against $1.18 of reported quarters, is Q4 adjusted
  // EPS of $0.49.
  //
  // So the whole call is one quarter's operating leverage. $0.49 is +11.4% q/q
  // on revenue the company has guided +14.6% q/q, i.e. it needs EPS to grow
  // nearly as fast as revenue. Last quarter it did not: Q2 to Q3, revenue rose
  // +19.5% and adjusted EPS only +7.3%. Carry that same ratio into Q4 and it gives
  // $0.46, a base of $1.64 and still a HOLD; assume margin expansion
  // instead and it is a BUY. Picking between those by hand is deciding the
  // rating by choosing an assumption, which is why this is left alone.
  //
  // earnings_sync.py exists to fetch exactly this from published consensus and
  // open a PR carrying the before/after rating in its body. Let it — then the
  // flip, if it comes, is a number someone published rather than one I inferred.
  //
  // NOT REFRESHED: cash $7.7B is pre-Q3 and will have grown with $4.8-5.0B of
  // guided FY FCF; nextEarningsOn is now in the past (Q4 lands early Feb 2027
  // on the usual cadence, but it is left unguessed).
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 80, targetMedian: 215, targetHigh: 265, numAnalysts: 32 },  // stockanalysis.com, Oct 8 2026

  revGrowth: [
    [0.90, 0.30, 0.18, 0.14, 0.12], // Bear: FY26 locked at the Q3 guide; enterprise AI hype cools, growth falls fast
    [0.90, 0.42, 0.30, 0.22, 0.18], // Base: FY26 at guide (~$8.53B), FY27 +42% (vs ~+45% consensus), natural deceleration
    [0.90, 0.52, 0.40, 0.32, 0.25], // Bull: AIP becomes Fortune 500 standard, govt re-acceleration
  ],

  fcfMargin: [
    [0.42, 0.42, 0.41, 0.40, 0.39], // Bear: margin stalls, reinvestment continues
    [0.45, 0.47, 0.48, 0.49, 0.50], // Base: scale economics, operating leverage
    [0.48, 0.51, 0.54, 0.56, 0.58], // Bull: software unit economics fully expressed
  ],

  exitMultiple: [22, 32, 45],

  desc: [
    'Enterprise AI spending normalizes as ROI proof-points lag deployment hype; AIP boot-camps convert to pilots but not full rollouts. Revenue growth falls from ~80% to the low teens by FY30. ' +
      'EPS compounds ~20% from the $1.62 FY26E base while the multiple compresses from ~99× toward 25×. 5yr target {target} ({cagr} annualized) — multiple compression overwhelms strong absolute growth.',
    'AIP scales: US commercial sustains triple-digit growth into FY27 then decelerates gracefully; government modernization continues. FY26 lands at the raised ~$8.15B guide. ' +
      'EPS compounds ~30% from the $1.62 base as margins expand. The multiple compresses from ~99× to ~38× through earnings growth. 5yr target {target} ({cagr} annualized) — quality compounds but you pay the multiple-compression tax.',
    'AIP becomes the default enterprise AI orchestration layer; revenue sustains 40%+ growth through FY28 and government wins AI-enabled defense modernization (Maven, TITAN, NGC2). ' +
      'EPS compounds ~40% from the $1.62 base and the market awards a 55× exit P/E for durable growth + structural moat. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'AI spending hype-cycle peaks; enterprises pull back on big-platform commitments and favor point-solutions. AIP pilots fail to convert to production at scale. ' +
      'Government budget cycle tightens. At ~99× FY26E EPS, multiple compression dominates returns even with continued revenue growth.',
    'Q2 2026 (revenue +93%, US commercial +149%, record $2.1B US commercial TCV, the largest guide raise in company history) shows AIP converting at scale. ' +
      'Margins and FCF validate the software unit economics. EPS compounds ~30% annually, but from ~99× FY26E the multiple compression caps total return. Verdict: HOLD — extraordinary business, fully priced.',
    'AIP becomes the operating system for enterprise AI — every Fortune 500 builds on Foundry/AIP. Government wins TITAN, Maven, NGC2 expansions plus international defense. ' +
      'Revenue sustains 40%+ growth through FY28. The "enterprise AI infrastructure layer" thesis re-rates the multiple permanently above software peers.',
  ],

  termGrowth: [0.02, 0.03, 0.035],

  epsCagr: [20, 30, 40],   // Re-based at Q2 2026 (was 38/50/65 off a $0.89 trailing-GAAP base): FY27E +45% then decelerating ≈ 30% from $1.62
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
    netDebt: -7460,
    ebitda: 900,
    fy: 'FY25',
    note: 'Net cash of $7.46B dwarfs $240M debt. Balance sheet is fortress-grade; no leverage risk.',
  },
});
