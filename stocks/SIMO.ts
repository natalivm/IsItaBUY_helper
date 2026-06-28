import { defineStock } from './defineStock';

export const SIMO = defineStock({
  ticker: 'SIMO',
  name: 'Silicon Motion Technology',
  sector: 'Semiconductors / NAND Flash Controllers',
  themeColor: '#005bac',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 319,      // Jun 23 2026
  fairPriceRange: '$160 - $450',
  shares0: 34,            // ~34M ADS; mkt cap ~$10.8B
  rev25: 800,             // FY2025 revenue ~$0.8B; Q1 2026 $342M (+105% YoY)
  fcfMargin25: 0.15,
  taxRate: 0.16,
  cash: 350,             // Net cash, minimal debt (fabless)
  debt: 0,
  beta: 1.4,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 8.50,          // FY2026E EPS est. — Q1 2026 $1.58 ramping; consensus implies a large step-up on AI/enterprise SSD controllers
  rsRating: 90,           // Estimated — ran hard on the AI-storage controller wave
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD', // Pins HOLD: explosive growth is real but small-cap cyclical semi at a rich multiple, trading above the analyst target after a big run.

  reasonsToBuy: [
    'Explosive revenue growth as AI and enterprise demand lifts the NAND-controller cycle off its trough',
    'Fabless, capital-light model with a strong net-cash balance sheet and high incremental margins',
    'Designed-in across SSD and UFS controllers for major NAND makers and device OEMs — a sticky franchise',
    'Enterprise/data-center SSD controllers open a higher-value market beyond consumer flash',
    'Recovery from a deep memory downturn gives strong year-over-year earnings leverage',
  ],

  risksToBuy: [
    'Small-cap cyclical semiconductor — earnings swing hard with the NAND/flash pricing cycle',
    'Richly valued after a big run, trading above the analyst consensus target',
    'Customer concentration among a handful of NAND makers and OEMs amplifies order volatility',
    'A NAND down-cycle or AI-capex digestion would reverse the current earnings surge quickly',
    'China/Taiwan geopolitical and export-control exposure adds tail risk',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 145, targetMedian: 274, targetHigh: 450, numAnalysts: 10 },

  epsCagr: [6, 12, 20],
  exitPE: [12, 18, 24],
  prob: [30, 45, 25],

  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.02],   // Bear: NAND cycle rolls over after the surge
    [0.20, 0.15, 0.12, 0.09, 0.07],   // Base: enterprise SSD controllers sustain growth off a high base
    [0.30, 0.24, 0.18, 0.14, 0.11],   // Bull: AI-storage controller demand compounds
  ],
  fcfMargin: [
    [0.12, 0.12, 0.13, 0.13, 0.14],
    [0.15, 0.16, 0.18, 0.19, 0.20],
    [0.18, 0.20, 0.22, 0.23, 0.24],
  ],
  exitMultiple: [10, 15, 20],
  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.18, 0.24, 0.30],
  bullMaOptVal: false,

  desc: [
    'The NAND cycle rolls over after the surge; controller orders normalize and pricing softens. EPS compounds only ~6% from the FY2026E $8.50 base and the market reprices SIMO as a cyclical small-cap at ~12x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Enterprise and AI SSD-controller demand sustains growth off the elevated base, and SIMO holds its design-win franchise. EPS compounds ~12% from the $8.50 base while the multiple normalizes toward ~18x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A high-quality fabless franchise — but the post-surge multiple already discounts much of the recovery.',
    'AI-storage controllers become a durable growth driver, enterprise SSD scales, and SIMO compounds revenue and margins. EPS compounds ~20% from the $8.50 base and the market awards ~24x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: SIMO is a small-cap fabless semi whose earnings swing violently with the NAND pricing cycle. The +100%+ revenue surge is cycle-driven, not structural, and customer concentration amplifies order volatility. ' +
      'At a rich multiple on a cyclical-peak base, any NAND rollover or AI-capex digestion compresses both earnings and the multiple. At {spot}, above the Street target, the downside is asymmetric.',
    'The franchise is genuinely good: capital-light, net-cash, sticky controller design-wins, and a real move up-market into enterprise/AI SSD controllers. The recovery off the memory trough delivers huge year-over-year leverage. ' +
      'But the stock has run hard and trades above the consensus target ($274), pricing in much of the up-cycle. Verdict: HOLD — own the franchise on a pullback, not at a cyclical-peak multiple.',
    'The bull case: enterprise and AI SSD-controller demand turns the surge structural, SIMO compounds revenue and margins off a fabless cost base, and the market sustains a premium multiple. ' +
      '{target} is achievable if the cycle stays strong. Probability 25% — high reward, but cyclical and concentrated.',
  ],

  burry: {
    sbc: 30,
    gaapNi: 290,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 30,
    overstatementSource: 'estimated',
    note: 'OK/Critical boundary. SBC ~$30M vs FY-base GAAP NI ~$290M = ~10% naive; the stock run amplifies the MTM cost modestly. Capital-light fabless model keeps absolute SBC small. Refresh with reported figures.',
  },

  debtSafety: {
    netDebt: -350,
    ebitda: 200,
    fy: 'FY25',
    note: 'GREEN by Step 1 — net cash. Fabless model carries ~$350M cash and minimal debt. The real risk is NAND cyclicality and customer concentration, not leverage.',
  },
});
