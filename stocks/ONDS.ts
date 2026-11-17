import { defineStock } from './defineStock';

export const ONDS = defineStock({
  ticker: 'ONDS',
  name: 'Ondas Inc.',
  sector: 'Defense Drones / Autonomous Systems',
  themeColor: '#6366f1',
  currentPrice: 4.71,
  updatedOn: '11/17',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-17',
  fairPriceRange: '$13 - $25',  // stockanalysis.com analyst target range, Nov 2026
  shares0: 590.2,      // 590.16M issued and outstanding, Sep 30 2026 (Q3 release) — was 570.5M
  rev25: 50.7,         // FY2025; FY26 guide raised to at least $550M (from $525-550M; consensus $556M), FY27 target at least $1.1B ex-new acquisitions (consensus $1.10B)
  fcfMargin25: -0.20,
  taxRate: 0.21,
  cash: 820,           // Sep 30 2026 (Q3 release): $820.3M = $262.8M cash + $31.5M restricted + $526.1M ST investments. Was ~$1.38B — spent on six closed acquisitions (DZYNE, Cyberhawk, Gate/Bron, Ottopia, Insignito, Caribou Labs)
  debt: 6,             // Sep 30 2026: notes payable $1.1M + convertible notes $5.0M (was 41)
  beta: 2.56,
  costDebt: 0.065,
  rsRating: 8,          // IBD RS per user, 10/10/2026 (was 62)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: speculative, pre-profit roll-up (adj. EBITDA loss still widening in Q3 2026) where the DCF is highly sensitive to margin assumptions — HOLD avoids both extremes.
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 12, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $167.5M (vs $83.8M Q2, $10.1M y/y). $214M of new orders;
  // backlog $835M (+36% q/q). GAAP gross margin 21.8% (adjusted 34.8%);
  // operating loss $189.5M; net loss $64.7M / -$0.10. Adj. EBITDA loss
  // WIDENED to $59.7M on temporary gross-margin pressure — Q2 was not the
  // peak after all (Q2 restated to -$46.2M under a new definition; three new
  // add-backs worth ~$77M flatter Q3). SBC ~$58M in the quarter alone.
  // GUIDE: FY26 revenue at least $550M (was $525-550M); Q4 > $250M; FY27 at
  // least $1.1B excluding further acquisitions. Operating-platform adj.
  // EBITDA break-even still Q4 2026; company-wide pulled in to Q3 2027 (from
  // Q4 2027). Six acquisitions closed; Stemme announced. Cash + investments
  // $820M (from ~$1.38B), 590.2M shares. Street: Strong Buy (10), PT $13-25,
  // median cut to $14.50 (from $18.50); FY26E rev $556M / EPS -$0.28, FY27E
  // $1.10B / -$0.16.
  // Sources: SEC 8-K ex. 99.1 (0001193125-26-457088); stockanalysis.com.
  // ─────────────────────────────────────────────────────────────────────────

  // Q2 2026 UPDATE (Aug 13, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $83.8M (vs $50.1M Q1, $6.3M y/y; organic +85%). ~$175M of
  // bookings in Q2 + ~$105M more into early August. Backlog ~$613M (~$757M
  // pro forma for DZYNE + Cyberhawk). FY26 GUIDE RAISED to $525-550M; Q3
  // $140-155M. Adj. EBITDA loss widened to $50.6M — mgmt calls Q2 the peak
  // loss and targets operating-platform adj. EBITDA profitability by Q4
  // 2026. Stock dipped on higher opex. Street: Strong Buy (10), PT $13-25
  // (median $18.50); FY26E rev $537M / EPS -$0.21, FY27E $1.01B / -$0.02.
  // Market cap ~$3.8B at $6.73, EV ~$2.5B (net cash ~$1.34B). (No split —
  // the price/target gap is real.)
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Strong Buy', targetLow: 13, targetMedian: 14.5, targetHigh: 25, numAnalysts: 10 },  // stockanalysis.com, Nov 2026 (median was 18.5)

  revGrowth: [
    [9.85, 0.40, 0.20, 0.15, 0.12],   // Bear: FY26 ~$550M (guide floor; 9M $301M + Q4 > $250M); acquired growth fades, contract cadence slows
    [9.97, 0.98, 0.35, 0.25, 0.20],   // Base: FY26 ≈ $556M consensus (guide ≥ $550M), FY27 ≈ $1.10B target/consensus, decelerating
    [10.07, 1.10, 0.50, 0.35, 0.25],  // Bull: FY26 ~$561M (top of consensus range); major DoD / allied counter-UAS programs scale
  ],
  fcfMargin: [
    [-0.15, -0.05, 0.02, 0.05, 0.08], // Bear: integration costs persist, profitability slips
    [-0.10,  0.02, 0.08, 0.12, 0.15], // Base: operating-platform adj. EBITDA breakeven Q4 2026, company-wide Q3 2027; FCF builds with scale (path not re-cut at Q3 2026)
    [-0.05,  0.08, 0.14, 0.18, 0.22], // Bull: operating leverage on a $1B+ revenue base
  ],
  exitMultiple: [8, 14, 22],
  desc: [
    'The FY26 step-up is mostly acquired; organic contract cadence slows and integration costs keep FCF negative longer. Market re-rates toward fundamentals. 5yr target {target} ({cagr} annualized).',
    'FY26 lands just above the raised $550M floor and FY27 reaches the ~$1.1B target on backlog conversion; adj. EBITDA turns positive company-wide during 2027 and FCF margins build toward mid-teens. 5yr target {target} ({cagr} annualized) — high execution requirements.',
    'Ondas emerges as a dominant autonomous defense platform. DoD and allied Tier-1 contracts surge; revenue more than doubles again in FY27 and FCF margins reach 20%+ at scale. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 15,
    gaapNi: -40,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 80,
    overstatementSource: 'estimated',
    note: 'High SBC relative to $50.7M revenue; GAAP-loss company with repeated share dilution — structural investor risk. Burry-adjusted target ~$3.38.',
  },

  debtSafety: {
    netDebt: -814,         // Sep 30 2026: ~$6M debt − $820M cash, restricted cash & ST investments
    ebitda: -120,          // FY26E adj. EBITDA loss — approximate and NOT refreshed: Q2 -$46.2M (restated) + Q3 -$59.7M alone are -$106M, so the full year will be worse. Tier is set by net cash.
    fy: 'FY26E',
    note: 'Net cash ~$0.81B at Sep 30 2026, down from ~$1.34B as acquisitions were paid for in cash; pre-profitability defense-drone roll-up. Step 1 GREEN (net cash position).',
  },
});
