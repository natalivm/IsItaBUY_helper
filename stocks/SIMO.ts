import { defineStock } from './defineStock';

export const SIMO = defineStock({
  ticker: 'SIMO',
  name: 'Silicon Motion Technology',
  sector: 'Semiconductors / NAND Flash Controllers',
  themeColor: '#005bac',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 263.9,   // very volatile; 52wk ~$70-$355
  fairPriceRange: '$325 - $450',  // stockanalysis.com analyst target range, Sep 30 2026
  shares0: 34,            // ~33.7M ADS; mkt cap ~$10.4B
  rev25: 886,             // FY2025 revenue $885.6M (+10.2%); FY26E consensus $1.87B (+111%), FY27E $2.43B (+30%)
  fcfMargin25: 0.08,      // FY25 FCF margin just 0.7% ($6.3M) and LTM negative — heavy inventory build for the ramp; normalizes ~12-15%
  taxRate: 0.14,          // ~12-15% effective
  cash: 211,             // ~$211M cash at Q1 2026 (down from $277M on a dividend + inventory build for the ramp); net cash, minimal debt (fabless)
  debt: 0,
  beta: 1.4,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 11.14,         // FY2026E non-GAAP EPS — stockanalysis consensus (Sep 30 2026; FY27E $15.87, +42%), up from $8.71 (TIKR, Jun) after Q2's beat ($2.43/ADS) and a Q3 guide of +15-20% QoQ. No company EPS guide. Base 10% CAGR = FY27 surge then a cyclical flattening/roll-over (FY31E ~$17.9).
  rsRating: 92,           // IBD RS per user, 10/10/2026 (was 99)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // ratingOverride removed at Q2 2026 review: the model now reads HOLD on its own (base ~1.7% CAGR, TAILWIND/RS boost), and the old rationale ("trading ABOVE the $274 analyst target") no longer holds — Street PTs now $325-450. A pullback toward ~$195 would let the model flip to BUY, which matches the "own it on a pullback" verdict.

  // Q2 2026 UPDATE (Jul 30, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Third straight record quarter. Revenue ~$451M (+127% y/y), well above the
  // $393-411M guide. Gross margin 50.2% (hit the 50% target). Non-GAAP NI
  // $83.1M, $2.43/ADS. Q3 GUIDE: revenue $519-541M (+15-20% q/q, +114-124%
  // y/y), non-GAAP gross margin 50-51%, op margin 27.5-28.5%. FY26 revenue
  // to more than double; op margin targeted >30% exiting the year. Street
  // revisions huge: FY26E EPS $11.14 / FY27E $15.87 (vs TIKR $8.71 / $10.22
  // in June); revenue $1.87B / $2.43B. Strong Buy (12), PT $325-450, median
  // $352.5 — stock $263.90 now BELOW the low target, ~24x FY26E / ~17x
  // FY27E. Net: the "above the Street target" argument is gone; what remains
  // is peak-cycle risk in NAND — model and narrative both HOLD, no override.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Structural share gains as NAND makers outsource more controllers and exit the consumer/edge segment, leaning on Silicon Motion to serve it',
    'MonTitan enterprise/AI controllers ramping fast — CMX/KV-cache compute SSD for AI inference, scaling from 2 to ~7 Tier-1 CSP customers (3 Asia, 2 US) this year',
    'Boot-drive storage ramping into AI GPU platforms (NVIDIA DPU, plus next-gen NVLink/Ethernet switches) with content density up 2-4x',
    'Unmatched NAND-maker partnerships — the only controller maker with active projects across all 7 NAND makers — secure scarce supply, a real moat in a constrained market',
    'Fabless, capital-light, net-cash model with record revenue, expanding margins (50% gross margin targeted) and huge year-over-year leverage',
  ],

  risksToBuy: [
    'Small-cap cyclical semiconductor — earnings swing hard with the NAND/flash pricing cycle, and consensus already models a roll-over after the surge',
    'Earnings are at a cyclical peak — even a moderate multiple on peak earnings can overstate durable value',
    'NAND/DRAM scarcity and tight BGA-substrate supply can cap how much demand converts to revenue, even with secured allocation',
    'Smartphone and PC unit volumes are declining 10%+ in 2026 on high memory costs — share gains must keep outrunning end-market weakness',
    'Customer concentration plus China/Taiwan geopolitical and export-control exposure adds tail risk',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 325, targetMedian: 352.5, targetHigh: 450, numAnalysts: 12 },  // stockanalysis.com, Sep 30 2026

  epsCagr: [4, 10, 18],
  exitPE: [12, 16, 22],
  prob: [35, 45, 20],

  revGrowth: [
    [1.00, -0.05, -0.10, -0.05, 0.00], // Bear: FY26 ~locked (Q1-Q3 ≈ $1.3B+), then the NAND cycle rolls over hard
    [1.10, 0.25, 0.03, -0.05, 0.02],   // Base: FY26 ≈ consensus $1.87B (+111%), FY27 ~$2.3-2.4B, then cyclical flattening
    [1.20, 0.35, 0.12, 0.06, 0.05],    // Bull: AI-storage controller demand compounds
  ],
  fcfMargin: [
    [0.04, 0.08, 0.10, 0.11, 0.12],
    [0.05, 0.10, 0.13, 0.14, 0.15],    // FCF recovers as the inventory/WC build normalizes
    [0.08, 0.13, 0.16, 0.18, 0.20],
  ],
  exitMultiple: [10, 15, 20],
  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.16, 0.22, 0.26],
  bullMaOptVal: false,

  desc: [
    'The NAND cycle rolls over after the surge; controller orders normalize and pricing softens. EPS compounds only ~4% from the FY2026E $11.14 base and the market reprices SIMO as a cyclical small-cap at ~12x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 35%.',
    'Enterprise and AI SSD-controller demand sustains growth off the elevated base for a few years before normalizing, and SIMO holds its design-win franchise. EPS compounds ~10% from the $11.14 base (an FY27 surge, then cyclical flattening) while the ~24x multiple normalizes toward ~16x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality fabless franchise — but the price already discounts most of a peak-cycle earnings stream.',
    'AI-storage controllers turn the surge structural, enterprise SSD scales, and SIMO compounds revenue and margins off a fabless cost base. EPS compounds ~18% from the $11.14 base and the market sustains a premium ~22x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20%.',
  ],

  thesis: [
    'Bear mechanics: SIMO is a small-cap fabless semi whose earnings swing violently with the NAND pricing cycle. The current revenue surge is cycle-driven, not structural — TIKR estimates already model a roll-over after FY28 — and customer concentration amplifies order volatility. ' +
      'At ~24x peak-cycle FY26E earnings, any NAND rollover or AI-capex digestion compresses both earnings and the multiple at {spot}.',
    'The franchise is genuinely good — and the story is more than just the cycle: NAND makers are structurally outsourcing controllers and exiting consumer/edge, handing Silicon Motion durable share, while MonTitan enterprise/AI (CMX/KV-cache) scales from 2 to ~7 CSP customers and boot drives ramp into NVIDIA AI-GPU platforms, all backed by a rare multi-NAND-maker sourcing moat. Record revenue, sequential growth all year, and a 50% gross-margin target. ' +
      'Q2 crushed guidance (revenue +127%, 50% gross margin) and Street estimates jumped ~30%, so the stock at {spot} now sits below every analyst target (~$325-450) at ~24x FY26E / ~17x FY27E. But those are peak-cycle earnings in a notoriously cyclical NAND market. Verdict: HOLD — own the franchise on a pullback toward ~$200, not at a peak-cycle multiple.',
    'The bull case: enterprise and AI SSD-controller demand turns the surge structural, SIMO compounds revenue and margins off a fabless cost base, and the market sustains a premium multiple. ' +
      '{target} is achievable if the cycle stays strong for years. Probability 20% — high reward, but cyclical and concentrated at a rich entry.',
  ],

  burry: {
    sbc: 26,
    gaapNi: 123,
    buyback: 24,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical. FY25 SBC ~$26M vs GAAP NI ~$123M = ~21% naive (TIKR); the ~4-5x stock run off the trough adds a large MTM amplifier on options granted at far lower prices, partly offset by a ~$24M buyback (~= SBC). Absolute comp stays small thanks to the capital-light fabless model, but the parabolic re-rating inflates true owner-earnings cost.',
  },

  debtSafety: {
    netDebt: -211,
    ebitda: 150,
    fy: 'FY25',
    note: 'GREEN by Step 1 — net cash. Fabless model carries ~$211M cash at Q1 2026 (down from $277M on a dividend + inventory build) and minimal debt (LTM EBITDA ~$167M). The real risk is NAND cyclicality and customer concentration, not leverage.',
  },
});
