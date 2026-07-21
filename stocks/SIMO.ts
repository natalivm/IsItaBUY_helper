import { defineStock } from './defineStock';

export const SIMO = defineStock({
  ticker: 'SIMO',
  name: 'Silicon Motion Technology',
  sector: 'Semiconductors / NAND Flash Controllers',
  themeColor: '#005bac',
  updatedOn: '07/21',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 278.17,   // Jun 26 2026 close (prev close $336.90 — very volatile); 52wk $70-$355
  fairPriceRange: '$130 - $440',
  shares0: 34,            // ~33.7M ADS; mkt cap ~$10.4B
  rev25: 886,             // FY2025 revenue $885.6M (+10.2%); LTM $1,061M as the AI/enterprise-SSD surge ramps
  fcfMargin25: 0.08,      // FY25 FCF margin just 0.7% ($6.3M) and LTM negative — heavy inventory build for the ramp; normalizes ~12-15%
  taxRate: 0.14,          // ~12-15% effective
  cash: 211,             // ~$211M cash at Q1 2026 (down from $277M on a dividend + inventory build for the ramp); net cash, minimal debt (fabless)
  debt: 0,
  beta: 1.4,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 8.71,          // FY2026E normalized EPS (TIKR) — a +145% surge year off FY25 ~$3.55 on the AI/enterprise-SSD controller wave. Path: $8.71->$10.22->$11.73 (FY26-28) then TIKR models a cyclical roll-over (rev declines FY29-30).
  rsRating: 99,           // IBD RS 99 (Composite 99, industry group rank 3); ran ~4x off the memory trough on the AI-storage surge
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD', // Pins HOLD (like STX/WDC): explosive growth is real but this is a small-cap cyclical semi at ~35x peak-cycle earnings, trading ABOVE the analyst consensus target ($274 median vs ~$305). Own the franchise on a pullback.

  reasonsToBuy: [
    'Structural share gains as NAND makers outsource more controllers and exit the consumer/edge segment, leaning on Silicon Motion to serve it',
    'MonTitan enterprise/AI controllers ramping fast — CMX/KV-cache compute SSD for AI inference, scaling from 2 to ~7 Tier-1 CSP customers (3 Asia, 2 US) this year',
    'Boot-drive storage ramping into AI GPU platforms (NVIDIA DPU, plus next-gen NVLink/Ethernet switches) with content density up 2-4x',
    'Unmatched NAND-maker partnerships — the only controller maker with active projects across all 7 NAND makers — secure scarce supply, a real moat in a constrained market',
    'Fabless, capital-light, net-cash model with record revenue, expanding margins (50% gross margin targeted) and huge year-over-year leverage',
  ],

  risksToBuy: [
    'Small-cap cyclical semiconductor — earnings swing hard with the NAND/flash pricing cycle, and consensus already models a roll-over after the surge',
    'Richly valued at ~35x peak-cycle earnings, trading above the analyst consensus target',
    'NAND/DRAM scarcity and tight BGA-substrate supply can cap how much demand converts to revenue, even with secured allocation',
    'Smartphone and PC unit volumes are declining 10%+ in 2026 on high memory costs — share gains must keep outrunning end-market weakness',
    'Customer concentration plus China/Taiwan geopolitical and export-control exposure adds tail risk',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 145, targetMedian: 274, targetHigh: 450, numAnalysts: 10 },

  epsCagr: [4, 10, 18],
  exitPE: [12, 16, 22],
  prob: [35, 45, 20],

  revGrowth: [
    [0.30, 0.05, 0.02, -0.05, 0.00],   // Bear: surge fades and the NAND cycle rolls over
    [0.55, 0.12, 0.08, 0.04, 0.03],    // Base: huge FY26 surge, then normalizes off the elevated base
    [0.80, 0.18, 0.12, 0.08, 0.05],    // Bull: AI-storage controller demand compounds
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
    'The NAND cycle rolls over after the surge; controller orders normalize and pricing softens. EPS compounds only ~4% from the FY2026E $8.71 base and the market reprices SIMO as a cyclical small-cap at ~12x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 35%.',
    'Enterprise and AI SSD-controller demand sustains growth off the elevated base for a few years before normalizing, and SIMO holds its design-win franchise. EPS compounds ~10% from the $8.71 base while the multiple normalizes toward ~16x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality fabless franchise — but at ~35x peak-cycle earnings the price already discounts much of the surge and sits above the Street target.',
    'AI-storage controllers turn the surge structural, enterprise SSD scales, and SIMO compounds revenue and margins off a fabless cost base. EPS compounds ~18% from the $8.71 base and the market sustains a premium ~22x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20%.',
  ],

  thesis: [
    'Bear mechanics: SIMO is a small-cap fabless semi whose earnings swing violently with the NAND pricing cycle. The current revenue surge is cycle-driven, not structural — TIKR estimates already model a roll-over after FY28 — and customer concentration amplifies order volatility. ' +
      'At ~35x peak-cycle earnings, any NAND rollover or AI-capex digestion compresses both earnings and the multiple. At {spot}, above the Street target, the downside is asymmetric.',
    'The franchise is genuinely good — and the story is more than just the cycle: NAND makers are structurally outsourcing controllers and exiting consumer/edge, handing Silicon Motion durable share, while MonTitan enterprise/AI (CMX/KV-cache) scales from 2 to ~7 CSP customers and boot drives ramp into NVIDIA AI-GPU platforms, all backed by a rare multi-NAND-maker sourcing moat. Record revenue, sequential growth all year, and a 50% gross-margin target. ' +
      'But the stock has roughly quadrupled off its lows to ~35x peak earnings and trades above the consensus target ($274), pricing in much of the up-cycle. Verdict: HOLD — own the franchise on a pullback, not at a cyclical-peak multiple.',
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
