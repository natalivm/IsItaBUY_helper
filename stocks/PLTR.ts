import { defineStock } from './defineStock';

export const PLTR = defineStock({
  ticker: 'PLTR',
  name: 'Palantir Technologies',
  sector: 'AI / Data Analytics Software',
  themeColor: '#0ea5e9',
  updatedOn: '05/15',
  currentPrice: 133.99,
  fairPriceRange: '$95 - $230',
  shares0: 2300,
  rev25: 4480,
  fcfMargin25: 0.45,
  taxRate: 0.15,
  cash: 7700,
  debt: 240,
  beta: 1.51,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 0.89,
  rsRating: 72,
  rsTrend: 'falling',
  ratingOverride: 'HOLD',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Palantir is the highest-quality, highest-multiple AI software story in the market. " +
    "FY25 revenue $4.48B (+56% YoY, accelerating), 84% gross margin, 38% operating margin, 43% net margin, ~45% FCF margin, $7.7B net cash, debt/equity 0.03 — pristine. " +
    "US Commercial revenue compounding 70%+ as AIP becomes the operational layer for Fortune 500 enterprise AI; Government remains a structural moat with multi-decade contract durability. " +
    "Consensus 5Y EPS CAGR 56.7%, FY26 EPS expected to roughly double from $0.89 TTM to ~$1.70-$2.00 — the growth is real and the unit economics are elite. " +
    "Valuation reality at $137.80 / ~$330B mkt cap: trailing P/E 155×, forward P/E 68×, P/S 63×, EV/Sales 62×, P/FCF 123× — pricing PLTR as the operating system for enterprise AI, the highest bar in software. " +
    "Even on bull-case execution (50%+ rev growth, 60% exit P/E on FY30 EPS ~$8) the math compounds at ~25% — but the bear case (deceleration to 25%, multiple compression to 30×) goes to ~$120 even with strong execution. " +
    "Risk is asymmetric and reflexive: PLTR trades on momentum + narrative more than fundamentals. RS faded from 99 to 72 with -22% YTD and -34% from highs; the unwind has started but the multiple is still nowhere near 'cheap.' " +
    "Quality is unimpeachable — wait for a real reset (sub-$110, P/S below 35×) before a full position. HOLD: own a starter, add aggressively only on multiple compression, not on price weakness alone.",

  analystConsensus: { rating: 'Hold', targetLow: 95, targetMedian: 186, targetHigh: 280, numAnalysts: 24 },

  revGrowth: [
    [0.30, 0.22, 0.18, 0.14, 0.12], // Bear: enterprise AI hype cools, growth halves
    [0.42, 0.35, 0.28, 0.22, 0.18], // Base: AIP scales, government stable, natural deceleration
    [0.55, 0.48, 0.40, 0.32, 0.25], // Bull: AIP becomes Fortune 500 standard, govt re-acceleration
  ],

  fcfMargin: [
    [0.42, 0.42, 0.41, 0.40, 0.39], // Bear: margin stalls, reinvestment continues
    [0.45, 0.47, 0.48, 0.49, 0.50], // Base: scale economics, operating leverage
    [0.48, 0.51, 0.54, 0.56, 0.58], // Bull: software unit economics fully expressed
  ],

  exitMultiple: [22, 32, 45],

  desc: [
    'Enterprise AI spending normalizes as ROI proof-points lag deployment hype. AIP boot-camps convert to pilots but not full operational rollouts. Revenue growth halves from 56% to ~15% by FY30. ' +
      'EBIT margin stalls in the high-30s as PLTR continues investing in forward deployed engineers. Forward P/S re-rates from 63× toward 18×, P/E compresses from 155× to ~30×. ' +
      'GAAP EPS reaches ~$4.50 by FY30 (from $0.89 TTM). 5yr price ~$110, roughly -3% to -5% annual return — multiple compression overwhelms strong absolute growth.',
    'AIP scales steadily, US Commercial sustains 50%+ growth through FY27 then decelerates gracefully. Government modernization continues with stable double-digit growth. ' +
      'Operating margin expands from 38% to mid-40s, FCF margin reaches ~50%. EPS compounds at ~45% annually to ~$5.80 by FY30. ' +
      'Multiple compresses naturally from 155× to 32× through earnings growth. 5yr price ~$185, ~6% CAGR — quality compounds but you pay the multiple-compression tax.',
    'AIP becomes the default enterprise AI orchestration layer. Revenue sustains 40%+ growth through FY28 as Fortune 500 standardize on Foundry + AIP. ' +
      'Government wins on AI-enabled defense modernization (Maven, TITAN, NGC2). Operating margin reaches 50%+, FCF margin ~58%. EPS reaches ~$11 by FY30. ' +
      'Market awards 45× exit P/E for durable 25%+ growth + structural moat. 5yr price ~$495, ~29% CAGR.',
  ],

  thesis: [
    'AI spending hype-cycle peaks; enterprises pull back on big-platform commitments and favor point-solutions. AIP pilots fail to convert to production at scale. ' +
      'Government budget cycle tightens. At 155× trailing P/E, multiple compression dominates returns even with continued revenue growth. RS 72 (from 99) signals momentum unwind has started.',
    'AIP boot-camps continue to convert to multi-million dollar contracts. US Commercial growth remains 50%+ through FY27. Net cash $7.7B funds aggressive buybacks if needed. ' +
      'Operating margin expansion validates software unit economics. EPS compounds 40%+ annually but multiple compression caps total return at high-single-digits.',
    'AIP becomes the operating system for enterprise AI — every Fortune 500 builds on Foundry/AIP. Government wins TITAN, Maven, NGC2 expansions plus international defense. ' +
      'Revenue sustains 40%+ growth through FY28. The "enterprise AI infrastructure layer" thesis re-rates the multiple permanently above software peers.',
  ],

  termGrowth: [0.02, 0.03, 0.035],

  epsCagr: [38, 50, 65],
  exitPE: [25, 38, 55],
  prob: [30, 50, 20],

  bbRate: [0.00, 0.005, 0.01],
  ebitdaProxy: [0.40, 0.48, 0.55],
  bullMaOptVal: false,

  burry: {
    sbc: 700,
    gaapNi: 1449,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 90,
    overstatementSource: 'estimated',
    note: 'Naive SBC/NI is ~48% (FY25 SBC ~$700M on $1.45B GAAP NI). PLTR has compounded ~20× in 3 years ($7 → $137), which under full-SBC adjustment makes mark-to-market dilution cost on vested awards a multiple of the GAAP charge. No buyback to offset. Real owner economics materially below GAAP — Tragic tier.',
  },
});
