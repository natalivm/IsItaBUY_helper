import { defineStock } from './defineStock';

export const CEG = defineStock({
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '11/17',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-17',
  currentPrice: 277.82,
  fairPriceRange: '$240 - $399',  // stockanalysis.com analyst target range, Nov 16 2026
  shares0: 354,        // Q3 2026 diluted weighted average (was 358; $3.0B repurchased in 9M 2026)
  rev25: 25200,        // FY2025; FY26E consensus $36.5B (+43% with Calpine), FY27E $36.85B (stockanalysis, Nov 16 2026)
  fcfMargin25: 0.051,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,         // pre-Calpine-close figure — NOT refreshed (debt rose with the $21.8B Calpine deal; EPS_PE model ignores it)
  beta: 1.83,
  costDebt: 0.0525,
  modelType: 'EPS_PE',
  baseEps: 12.65,      // FY26E adjusted operating EPS = guide midpoint $12.50-12.80 (raised and narrowed at Q3 2026 from $11.50-12.50; consensus $12.51, FY27E $13.43). Q3 $5.06 (vs $3.04). Prior: $12.00.
  rsRating: 90,         // IBD RS per user, 10/10/2026 (was 17)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 9, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Adj. operating EPS $5.06 (vs $3.04, +66%; consensus ~$3.7-3.9); GAAP $5.19
  // (vs $2.97). Revenue $9.55B. Drivers: favourable market/portfolio
  // conditions + Calpine, partly offset by interest and nuclear PTC dynamics.
  // Nuclear capacity factor 97.2%. FY26 adj. EPS guide raised AND narrowed to
  // $12.50-12.80 (second raise this year). 9M GAAP NI $3.95B; 9M buybacks
  // $3.0B; diluted shares 354M. NEW: 20-year Google PPA enabling >$4.3B of
  // investment across 11 nuclear units (IL/PA/NJ), ~890 MW of uprates, first
  // in 2028, plus a 15-year 2,700 MW load-following agreement in PJM;
  // agreement to buy the 609 MW Rhode Island State Energy Center (ISO-NE gas
  // CCGT) from Shell for $715M. Balance sheet Sep 30: cash $0.6B, LT debt
  // $19.0B, ST borrowings $4.0B (post-Calpine). Street: Buy (25), PT
  // $240-399 (median $346); FY26E EPS $12.51, FY27E $13.43.
  // epsCagr cut one point per scenario so the higher FY26 base does not lift
  // the 2031 endpoint that FY27E consensus (only ~+6% on the new midpoint)
  // does not support.
  // Sources: SEC 8-K ex. 99.1 (ceg-20261109991); stockanalysis.com.
  // ─────────────────────────────────────────────────────────────────────────

  // Q2 2026 UPDATE (Aug 6, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Adj. operating EPS $2.55 (vs $1.91; beat ~$2.36); GAAP $1.42 (vs $2.67).
  // Calpine ($21.8B) closed — +23 GW generation and a large retail platform;
  // required divestitures underway. Nuclear outages and Illinois ZEC timing
  // weighed on the quarter (not on the full year). FY26 adj. EPS guide raised
  // to $11.50-12.50. Street: Buy (22), PT $290-395 (median $345.50); FY26E
  // EPS $12.14 / rev $35.5B, FY27E $13.32 / $36.7B. ~25× FY26E.
  // ─────────────────────────────────────────────────────────────────────────


  epsCagr: [7, 12, 19],   // Q3 2026: each −1 (was [8, 13, 20]) because baseEps rose 5.4% while FY27E consensus barely moved ($13.32 → $13.43) — the raise pulled FY26 up, not the out-years. One point lower from $12.65 lands on the same 2031E EPS as before (~$17.7 / $22.3 / $30.2). Q2 2026: base 15→13, bull 22→20.
  exitPE: [16, 22, 27],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 240, targetMedian: 346, targetHigh: 399, numAnalysts: 25 },  // stockanalysis.com, Nov 16 2026
  revGrowth: [
    [0.35, 0.00, 0.03, 0.03, 0.03],   // Bear: Calpine step-up only; power prices soften
    [0.41, 0.04, 0.08, 0.08, 0.07],   // Base: FY26/FY27 ≈ Q2-era consensus $35.5B / $36.7B (now $36.5B / $36.85B; Calpine consolidated), then organic
    [0.45, 0.10, 0.12, 0.12, 0.11],   // Bull: hyperscaler PPAs + uprates + gas utilization
  ],
  fcfMargin: [
    [0.040, 0.045, 0.050, 0.055, 0.060],
    [0.055, 0.062, 0.070, 0.075, 0.080],
    [0.065, 0.075, 0.085, 0.095, 0.105],
  ],
  exitMultiple: [13, 17, 21],
  desc: [
    'PJM regulatory clarity arrives slower than promised and customer pauses extend. ERCOT forward weakness persists through 2028. Calpine integration friction and capacity-price normalization from elevated 2025 levels compress merchant margins. EPS growth lands at ~7% from the $12.65 FY26E base. Market reprices to 16× as cyclicality reasserts. 5yr target {target} ({cagr} annualized).',
    'Management hits the twice-raised framework: FY26 lands in the $12.50–$12.80 range with Calpine consolidated, the Google nuclear uprate agreement proceeds toward first capacity in 2028, and the PJM backstop framework finalizes per the June FERC submission timeline. Powered-land deals close at Crane (CIR transfer approved for 2027 credit) and at additional sites in PJM and ERCOT. Capacity prices stabilize at structurally higher levels but do not surge further. EPS compounds at ~12% — above utility peers. P/E settles at 22× reflecting durable premium clean-firm status. 5yr target {target} ({cagr} annualized).',
    'Full execution on all levers — Byron/Braidwood uprates plus Calvert/Limerick path, Crane on 2027 capacity timeline, multiple hyperscaler PPAs across PJM and ERCOT, optionality on additional uprates, gas-fleet utilization rises with around-the-clock demand. Nuclear PTC inflation gearing kicks in. FCF before growth reaches the high end of the $11.5–13B 2028–29 range, funding aggressive buybacks and dividend at 10%/yr. EPS compounds at ~19%; business reclassifies as contracted infrastructure compounder at 27×. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0.01, 0.018, 0.030],

  burry: {
    sbc: 50,
    gaapNi: 3791,
    buyback: 335,
    epsBasis: 'NON_GAAP',
    fy: 'LTM Q1 26',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC is immaterial for a large-scale power-generation platform. LTM GAAP NI $3.79B on $29.87B revenue (12.7% net margin, 26.6% EBITDA margin). 5-year diluted share count is flat-to-down (329M → 324M, -1.5%) — virtually no dilution, very different from the SBC-heavy growth-software cohort. $5B buyback authorization with $335M (1.2M shares @ ~$285 avg) executed in early Q2 26 after the business update. Naive SBC/NI is near zero; even applying a 4× MTM amplifier for the post-spin rerating (~5× since 2022 spin) keeps the estimate well inside the Pristine band. The Burry framework barely registers here — CEG is a real-asset infrastructure compounder where the debate is power-pricing durability, nuclear-scarcity premium, and Calpine integration, not accounting quality.',
  },
  debtSafety: {
    netDebt: 15400,
    ebitda: 7500,
    capexToOcf: 0.38,
    interestCoverage: 7.0,
    altmanZ: 2.6,
    fy: 'LTM Q1 26',
    note: 'Nuclear infrastructure is inherently CapEx-heavy and utilities score low on Altman Z (a metric calibrated for manufacturers). Strong interest coverage (7×) from long-term contracted generation reflects genuine financial strength. RED tier reflects framework mismatch more than distress — same structural caveat as VST.',
  },
});
