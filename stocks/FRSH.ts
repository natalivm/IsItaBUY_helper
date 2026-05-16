import { defineStock } from './defineStock';

export const FRSH = defineStock({
  updatedOn: '05/16',
  lastReportTag: 'Q1 2026',
  ticker: 'FRSH',
  name: 'Freshworks Inc.',
  sector: 'SaaS / CX & ITSM Software',
  themeColor: '#16a34a',
  currentPrice: 8.50,
  fairPriceRange: '$15 - $53',
  shares0: 276.4,
  rev25: 838.8,
  fcfMargin25: 0.28,
  taxRate: 0.20,
  cash: 780,
  debt: 39,
  beta: 1.2,
  rsRating: 32,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'BUY',
  strategicNarrative:
    "Freshworks is executing a deliberate pivot away from its SMB helpdesk roots toward mid-market and enterprise ITSM, where it positions Freshservice as the \"affordable ServiceNow.\" " +
    "The EX business ($540M+ ARR, growing 27%, NDR 119% on multi-product, first-ever $1M+ deal signed) is now the primary growth engine and the legitimate case for owning the stock. " +
    "CX (helpdesk, ~$480M ARR) faces structural AI headwinds — the Freshdesk Omni replatforming is complete (80% migrated), but ARR is guided to grow only low single digits as AI agents deflect tier-1 volume. " +
    "At $8.50 the stock trades at ~6× 2026E adj. FCF of $265M — a near-distressed multiple typically reserved for slow-growth legacy software, not a 14% topline grower with 85% gross margins, $741M net cash (31% of market cap), and a $400M buyback that retires ~17% of float at this price. " +
    "The selloff is driven by a Q1 non-GAAP EPS miss ($0.11 vs $0.12), non-GAAP op-margin compression (17.9% vs 23.6% YoY) as EX investment is front-loaded, and a FY2026 revenue guide midpoint of $961M below the ~$975M street. " +
    "Core risk: if EX decelerates toward 15% and CX never recovers, the multiple stays compressed. Core opportunity: if Freshservice crosses $1B ARR by 2028 (as guided) and FCF compounds 20%+/yr, the current price is deeply mispriced — even the bear case still returns ~12% CAGR over 5 years. " +
    "Burry full-SBC adjustment (estimated): ~60% overstatement (Critical) — GAAP NI is DTA-inflated and SBC is a real-earnings haircut, but $368M LTM buybacks (2.6× SBC) materially offset dilution and the ~$237M LTM adj. FCF lens is the more representative read.",

  analystConsensus: { rating: 'Buy', targetLow: 10, targetMedian: 13, targetHigh: 17, numAnalysts: 13 },

  // Revenue: FY2025 $838.8M base. CX (~55% of ARR) growing low single digits as
  // AI deflects tickets; EX (Freshservice/ITSM) is the +27% growth engine.
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06],        // Bear: CX contracts, EX decelerates to ~12%
    [0.135, 0.13, 0.125, 0.12, 0.115],      // Base: EX ~20%, CX +3%, 2028 targets roughly met
    [0.175, 0.17, 0.165, 0.16, 0.155],      // Bull: Freshservice captures enterprise ITSM
  ],

  // Adj. FCF margin: FY2025 ~28%, FY2026 guide $265M / ~27.6%. Margin recovers
  // post-restructuring (11% workforce cut + AI code generation lower cost base).
  fcfMargin: [
    [0.245, 0.25, 0.25, 0.25, 0.25],        // Bear: margin stalls ~25% on EX investment drag
    [0.275, 0.285, 0.29, 0.295, 0.30],      // Base: layoff savings flow through to ~30%
    [0.30, 0.32, 0.33, 0.34, 0.35],         // Bull: operating leverage scales to ~35%
  ],

  // FCF exit multiples (EV / FCF). 6× today is near-distressed for an 85%
  // gross-margin grower; re-rates toward quality SaaS as EX proves durable.
  exitMultiple: [10, 14, 18],

  ebitdaProxy: [0.25, 0.30, 0.35],

  prob: [30, 50, 20],

  // $400M buyback authorization; at $8.50 that is ~17% of float, spread over
  // 2+ years and well-funded by $741M net cash.
  bbRate: [0.02, 0.035, 0.05],

  bullMaOptVal: true,

  desc: [
    'CX contracts as AI agents deflect tier-1 helpdesk volume; EX decelerates to ~12% and the AI-disruption narrative fully prices in. Revenue compounds ~8%, adj. FCF margin holds ~25%, exit ~10× FCF.',
    'EX sustains ~20% ARR growth with NDR 119%, CX stabilizes at low-single-digit growth, and the 2028 $1B+ Freshservice ARR / Rule-of-50 targets are roughly met as restructuring savings show through. Revenue ~13.5% CAGR, FCF margin ~30%, exit 14× FCF.',
    'Freshservice captures enterprise ITSM share against ServiceNow, Freddy AI copilot crosses 15% of ARR, and operating leverage drives best-in-class economics. Revenue ~18% CAGR, FCF margin ~35%, exit 18× FCF.',
  ],

  thesis: [
    'Even with structural CX decline and EX deceleration, $741M net cash + a 6× FCF starting multiple put a high floor under the stock — the bear path still compounds ~12% as buybacks shrink the share count.',
    'The legitimate base case: EX is a credible "affordable ServiceNow" at 27% ARR growth with a path to $1B+ by 2028; restructuring resets the cost base and FCF/share compounds 20%+ off a deeply discounted entry.',
    'If Freshservice wins enterprise ITSM and Freddy AI monetization inflects, a 14% grower with 85% gross margins and 35% FCF margins re-rates from 6× to 18× FCF — a multi-bagger from a distressed-multiple base.',
  ],

  burry: {
    sbc: 139,
    gaapNi: 180,
    buyback: 368,
    epsBasis: 'NON_GAAP',
    fy: 'FY2025 LTM',
    overstatementPct: 60,
    overstatementSource: 'estimated',
    note: 'LTM ending Q1 2026: SBC ~$139M (~16% of $871M LTM revenue — moderate, well below CRWD/RBRK extremes), reported GAAP NI $180M but inflated by a one-time ~$130M deferred-tax-asset benefit in Q4 2025; normalized ex-DTA GAAP NI is ~$50M, against which SBC looks severe. Estimated ~60% overstatement (Critical): the DTA distortion is exactly the GAAP-flattering Burry warns about, but the stock is down sharply from its 2021 IPO so there is little mark-to-market amplification, and $368M LTM gross buybacks (2.6× SBC, including a large Q2–Q3 2025 ASR) more than offset dilution. Burry-adj (NI + SBC − buybacks) = −$49M, but the negative figure is driven by buyback timing under the new $400M authorization, not by SBC bloat; the ~$237M LTM adj. FCF lens is the more representative measure of owner economics.',
  },
});
