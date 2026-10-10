import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 667.58,
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$490 - $1,750',  // stockanalysis.com analyst target range, Oct 7 2026 (post-FHFA cuts still filtering in; BofA $700)
  shares0: 22.5,        // approx.: 23.72M less ~1.75M repurchased (at ~$1,149 avg — far above today's price)
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 162,
  debt: 3640,          // FY25-era figure — NOT refreshed; likely higher after ~$1.96B of FY26 buybacks
  beta: 1.24,
  costDebt: 0.055,
  rsRating: 40,         // IBD RS per user, 10/10/2026 (was 27)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',

  // MONOPOLY BREAK — FHFA, SEPTEMBER 2026 (the thesis-changing event)
  // ─────────────────────────────────────────────────────────────────────────
  // • Sep 4 2026: FHFA directive lets ALL approved mortgage lenders use
  //   VantageScore 4.0 for GSE loans (Pulte: Fannie/Freddie can use FICO,
  //   VantageScore, or both; VantageScore ~13% of the scoring market; FICO
  //   asked for "competitive pricing" on 10T).
  // • Sep 28-29 2026: Fannie and Freddie move to ONE pricing grid that
  //   includes VantageScore — removing the LLPA penalty that had forced
  //   lenders to price VantageScore loans worse. FICO -26% in a day (worst
  //   since 1989); ~-65% from the ATH ($1,859).
  // • Rocket Mortgage (largest US originator) names VantageScore its
  //   preferred model; TransUnion holds VantageScore 4.0 at $0.99/score
  //   through Dec 2028 — vs FICO, which roughly doubled mortgage score
  //   prices in recent years. BofA downgraded to Neutral (PT $700).
  // • Implication: FICO's mortgage-origination pricing power — the engine of
  //   FY24-26 Scores growth (Q3 FY26 B2B +49% on unit price) — is now
  //   contestable. The question is no longer IF but HOW MUCH price and share
  //   FICO gives up. Non-mortgage scores (cards/auto/personal), B2C and the
  //   Platform software business are not directly affected.
  // ─────────────────────────────────────────────────────────────────────────

  // Q3 FY26 (Jul 29, 2026): revenue $674M (+26%); Scores $459M (+41%; B2B
  // +49% on higher mortgage unit price, B2C +5%); non-GAAP EPS $12.18 (vs
  // $8.57), GAAP $10.45. Platform ARR $413M (+62%), now above non-platform;
  // NRR 148%. Repurchased ~$1.96B (1.75M shares at ~$1,149). FY26 guide
  // raised (~$2.53B revenue, ~$42.4 non-GAAP EPS per call summaries). Mgmt
  // then: no meaningful volume loss to VantageScore yet; mortgage Direct
  // Licensing Program awaiting one GSE's certification. Street (Oct 7): Buy
  // (21), PT $490-1,750 (median $1,100); FY26E EPS $42.85 / rev $2.54B,
  // FY27E $50.20 / $2.80B (likely not yet fully cut for Sep 29).

  reasonsToBuy: [
    'Still the default score across credit cards, auto and personal lending, where the mortgage rule changes do not apply',
    'After a historic sell-off the stock trades at a low multiple of current earnings, pricing in heavy damage already',
    'Exceptional free cash flow conversion well above most software peers, with margins at record highs and still expanding',
    'Aggressive share buyback program has reduced share count materially over five years, creating powerful per-share earnings compounding',
    'Platform software provides a durable second engine that could accelerate once AI-driven decisioning demand scales',
  ],

  risksToBuy: [
    'Revenue is dangerously concentrated in mortgage-cycle volumes — any origination slowdown hits earnings disproportionately hard',
    'The mortgage monopoly is broken — regulators now let lenders use a far cheaper VantageScore with equal pricing treatment',
    'Large lenders are already switching their preferred score, so price cuts and share loss in mortgage scores look likely',
    'Debt-funded buybacks were executed far above today\'s price, leaving more leverage against a now-shrinking profit engine',
    'Software segment\'s non-platform ARR is eroding, and legacy replacement risk grows if competitors land enterprise decisioning contracts',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 490, targetMedian: 1100, targetHigh: 1750, numAnalysts: 21 },  // stockanalysis.com, Oct 7 2026 — several PTs not yet reset after Sep 29
  // Rebuilt Oct 2026 for the FHFA monopoly break. FY26 (Sep 2026) is locked at ~$2.54B (+27.6%);
  // FY27+ now reflects mortgage-score price cuts / share loss to VantageScore.
  revGrowth: [
    [0.27, -0.10, -0.05, 0.02, 0.02], // Bear: forced deep mortgage-score price cuts + major lender defections; Scores shrinks
    [0.27, 0.04, 0.03, 0.06, 0.06],   // Base: FICO cuts mortgage pricing to defend share; non-mortgage + Platform carry growth
    [0.28, 0.09, 0.08, 0.08, 0.08],   // Bull: lender inertia/GSE frictions slow VantageScore; modest price concessions
  ],
  // Mortgage scores are the highest-margin revenue — price cuts hit margin disproportionately.
  fcfMargin: [
    [0.38, 0.30, 0.27, 0.27, 0.27],
    [0.39, 0.36, 0.35, 0.36, 0.36],
    [0.40, 0.40, 0.40, 0.41, 0.41],
  ],
  exitMultiple: [10, 15, 20],         // Was [17, 25, 30]: a contestable franchise no longer earns monopoly multiples
  bbRate: [0, 0.04, 0.02],

  termGrowth: [0.01, 0.025, 0.03],
  ebitdaProxy: [0.42, 0.50, 0.56],
  prob: [40, 45, 15],  // Bear weight held at 40%; bull trimmed — the policy direction is clearly against FICO

  desc: [
    'The FHFA single pricing grid plus $0.99 VantageScore pricing triggers a price war in mortgage scores: large originators follow Rocket, and FICO must cut mortgage score prices deeply to keep share. ' +
      'Scores revenue shrinks for two years before non-mortgage and Platform growth stabilize it. Margins compress as the highest-margin revenue erodes, and debt-funded buybacks done far above today\'s price leave the balance sheet stretched. ' +
      'Market treats FICO as a contested scoring vendor at ~10x EBITDA. 5yr target {target} ({cagr} annualized).',
    'FICO keeps most mortgage share but gives back a meaningful slice of the price increases of recent years; VantageScore takes share at the margin. Non-mortgage scores, B2C and Platform software (ARR +62%) carry low-to-mid single-digit growth. ' +
      'FCF margin settles mid-30s; buybacks continue at a slower pace. The market prices a still-dominant but no-longer-monopoly franchise at ~15x EBITDA. 5yr target {target} ({cagr} annualized).',
    'Lender inertia, GSE implementation frictions and FICO\'s brand/data quality keep VantageScore adoption slow; FICO makes modest price concessions (Direct Licensing Program goes live) and pricing power partly survives. ' +
      'Platform ARR keeps compounding. FCF margins hold ~40% and the multiple recovers toward 20x EBITDA as the worst case fails to materialize. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: the September 2026 FHFA actions removed the two structural supports of FICO\'s mortgage monopoly — exclusivity and pricing-grid preference. With VantageScore at $0.99 and Rocket already switched, FICO\'s recent mortgage price hikes become the target. Price cuts land on the highest-margin revenue, and the company levered up to buy back stock at ~$1,149.',
    'The franchise is damaged, not destroyed: FICO remains the default in cards, auto and personal lending, lenders face switching costs (models, investors, MBS buyers), and Platform software is growing fast. But the mortgage pricing engine that drove FY24-26 earnings is now contestable, so the old monopoly multiple is gone. Verdict: HOLD — cheap on trailing EPS, but trailing EPS overstates the forward earnings power.',
    'The bull case: VantageScore adoption proves slow in practice (dual-score requirements, investor preference, data-quality concerns), FICO defends share with targeted price concessions, and Platform software becomes a real second engine. If mortgage pricing power largely survives, today\'s price embeds far too much damage.',
  ],

  ratingOverride: 'HOLD',  // Oct 2026: thesis broken by the FHFA single pricing grid + VantageScore at $0.99. The DCF still screens BUY off historically strong cash flows, but trailing EPS overstates forward earnings power while the extent of mortgage price cuts/share loss is unknown. HOLD until the pricing response is visible in results.

  debtSafety: {
    netDebt: 3478,         // FY25-era figures ($3.64B debt − $0.16B cash) — NOT refreshed; likely higher after FY26 buybacks
    ebitda: 1450,          // FY26E: ~$2.54B revenue × ~57% — approximate; at risk if mortgage pricing is cut
    fy: 'FY26E',
    note: 'Leverage ~2.4× looks manageable today, but the EBITDA it sits on is the mortgage pricing now under regulatory and competitive attack. Debt was raised to fund buybacks at ~$1,149/share. Step-3 checks not populated — refresh after FY26 10-K.',
  },

  burry: {
    sbc: 157,
    gaapNi: 652,
    buyback: 1619,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 18,
    overstatementSource: 'estimated',
    note: 'Oct 2026 note: FY26 buybacks (~$1.96B at ~$1,149/share) were executed ~70% above today\'s price after the FHFA crash — excellent SBC coverage, poor capital allocation timing. Ok (downgraded from original 22% after TIKR refresh confirms even cleaner profile). FY25 TIKR actuals: SBC $157M (7.3% of revenue — excellent), buybacks $1,619M (LTM $1,923M = **12× SBC coverage** — best ratio in our entire coverage). Diluted shares 29.26M (FY21) → 24.11M (LTM) = **−17.6% over 5 years** at −3.8%/yr. This is the strongest net buyback profile in our 70-stock universe. SBC = 18% of CFO (elite); SBC = 18% of FCF — far cleaner than DDOG/ZS/AXON (66-3,222%). Model behaves like Moody\'s/SPGI/VeriSign-style monopoly compounder rather than dilution-dependent SaaS. Risk note: FICO funds buybacks partly with debt issuance, which adds modest financial risk but is manageable given 50%+ operating margins.',
  },
});
