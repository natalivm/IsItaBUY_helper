import { defineStock } from './defineStock';

export const AMD = defineStock({
  ticker: 'AMD',
  name: 'Advanced Micro Devices',
  sector: 'Semiconductors / AI Compute',
  themeColor: '#ed1c24',
  currentPrice: 608.1,
  fairPriceRange: '$365 - $1,250',  // stockanalysis.com analyst target range, Oct 6 2026
  shares0: 1659,        // Q2 2026 diluted
  rev25: 34600,         // FY2025; FY26E consensus $50.95B (+47%), FY27E $88.94B (+75%)
  fcfMargin25: 0.13,
  taxRate: 0.13,
  cash: 13111,          // Jun 2026 cash + ST investments
  debt: 3226,
  beta: 1.85,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 7.59,        // FY2026E non-GAAP EPS — stockanalysis consensus (Oct 6 2026; range $7.00-8.20; FY27E $15.72, +107% on the MI450/Helios ramp). Q2 $1.66. Prior: $5.50.
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 97)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // ratingOverride 'HOLD' removed Oct 11 2026: it floored a ~1% base CAGR; after calibrating to the InvestAnswers 2030 targets the base case reads STRONG BUY on its own.
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',

  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter. Revenue $11.5B (+50%): Data Center $6.72B (+107%, op inc
  // $2.1B, 58% of revenue); Client $3.06B (+23%); Gaming $779M (-31%);
  // Embedded $977M (+19%). Non-GAAP GM 56%, op income $3.09B; non-GAAP EPS
  // $1.66, GAAP $1.38. SBC $503M. FCF $1.56B (14%). Cash $13.1B vs debt
  // $3.2B. Diluted shares 1,659M; buybacks only $221M H1 (no Q2 buyback).
  // Q3 GUIDE: revenue ~$13.0B ±$0.3B (+41% y/y, +13% q/q), GM ~56%. MI400 /
  // MI455X and Helios rack launched, ramping H2; deployers include OpenAI,
  // Anthropic (up to 2GW of MI450), Meta, Microsoft, Oracle. Street: Strong
  // Buy (55), PT $365-1,250 (median $635.5); FY26E EPS $7.59 / rev $51B,
  // FY27E EPS $15.72 / rev $89B. Net: the AI #2 platform is real and the
  // FY27 step-up is enormous — but at $608 the stock already prices it.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Helios rack-scale systems and MI450 are landing gigawatt-scale commitments from OpenAI, Anthropic, Meta and Microsoft — not just pilots.',
    'EPYC server CPU is taking durable share from Intel across cloud and enterprise, adding a structural revenue leg.',
    'Operating leverage is finally materializing — gross margins expanding and record FCF proving the model works at scale.',
    'Data center revenue doubled year over year and now drives the majority of sales and profit.',
    'As the credible alternative AI accelerator platform, AMD benefits from hyperscalers\' strategic desire to avoid NVIDIA dependency.',
  ],

  risksToBuy: [
    'Data center concentration means an AI capex digestion cycle hits AMD disproportionately hard versus diversified peers.',
    'NVIDIA\'s CUDA software ecosystem remains a deep moat that ROCm has not yet credibly displaced at scale.',
    'Operating expense growth is running at a pace that would compress margins rapidly if revenue growth decelerates.',
    'Valuation already reflects near-perfect execution — even modest disappointment risks severe multiple compression.',
    'Share gains must be durable repeat orders, not one-time pilots, to justify the premium the market is assigning today.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 365, targetMedian: 635.5, targetHigh: 1250, numAnalysts: 55 },  // stockanalysis.com, Oct 6 2026

  // CALIBRATION (Oct 11 2026): scenarios aligned to the InvestAnswers 2030
  // price targets (framework dated Jul 27 2026) — bear $750 / expected $1,500 /
  // bull $2,300. Model now: ~$760 / ~$1,480 / ~$2,310.
  revGrowth: [
    [0.44, 0.60, 0.25, 0.18, 0.14],   // Bear: FY26 ~locked (H1 + Q3 guide); FY27 Helios ramp below consensus, then AI digestion
    [0.47, 0.72, 0.35, 0.28, 0.22],   // Base: FY26 ≈ consensus $51B, FY27 ≈ consensus $89B, MI450/MI500 share gains sustain 20%+
    [0.47, 0.80, 0.42, 0.35, 0.28],   // Bull: FY27 above consensus, durable #2 platform share gains accelerate
  ],

  fcfMargin: [
    [0.14, 0.17, 0.20, 0.22, 0.24],   // Bear: opex growth slows margin expansion
    [0.16, 0.22, 0.26, 0.28, 0.30],   // Base: mix shift to high-margin AI
    [0.20, 0.26, 0.30, 0.33, 0.36],   // Bull: AI mix dominates, margins toward NVDA territory
  ],

  exitMultiple: [20, 26, 30],         // Display-only under EPS_PE

  desc: [
    'AI capex pauses for digestion as hyperscalers slow deployments. NVDA software moat (CUDA) widens; AMD MI300/450 ramps disappoint. ' +
      'Data center growth drops to <25%, margins stall at 50-52%, opex creep (+34% YoY current) eats into profit. ' +
      'The FY27 Helios step-up comes in below the doubling consensus expects; EPS compounds ~32% from the $7.59 FY26E base and the multiple compresses to ~25×. 5yr target {target} ({cagr} annualized).',
    'The Helios/MI450 ramp roughly doubles EPS in FY27, then data center growth stays in the 20s as MI500 follows. AMD wins meaningful AI share but NVDA still dominates training. ' +
      'Margins improve but cap near 57% — gap to NVDA persists. EPS compounds ~41% from the $7.59 base. ' +
      'Multiple compresses ~80× FY26E → 35× as the cycle matures. 5yr target {target} ({cagr} annualized).',
    'AI super-cycle extends 2027-2029. AMD captures durable hyperscaler share with MI450/Helios, OpenAI partnership scales, Meta deal expands. ' +
      'Margins push toward 58-60% (mix shift to AI dominance). EPS compounds ~50% from the $7.59 base. ' +
      'Market maintains a premium ~40× given structural AI position. 5yr target {target} ({cagr} annualized) — requires near-perfect execution.',
  ],

  thesis: [
    'AI demand cycle digests faster than expected. Hyperscaler optimization commentary (MSFT/AMZN/GOOG) replaces capacity expansion. ' +
      'NVDA software ecosystem (CUDA, NIM, NVLink) proves harder to displace than AMD\'s ROCm gains suggest. ' +
      'Operating expense growth (+34% YoY) becomes structural — when revenue growth halves, margins compress fast. ' +
      'At ~80× FY26E, the stock prices a flawless FY27 ramp — even mild disappointment triggers severe multiple compression. ' +
      'Single-engine concentration: ~58% of revenue in DC means an AI capex pause halves the entire growth story.',
    'Data center growth proves durable but normalizes. AMD genuinely wins share at hyperscalers (Meta, OpenAI, AWS Trainium-2 alternative) but NVDA stays #1 by wide margin. ' +
      'EPYC server CPU continues taking share from Intel — that part is structural, not cyclical. ' +
      'MI300/MI450 ramps cleanly but the ecosystem gap means premium pricing stays compressed vs NVDA. ' +
      'Margins improve to 55-57% via mix shift, but the 5-7pt gap to NVDA persists due to software moat. ' +
      'EPS growth far outruns the multiple compression from the {spot} entry — returns come from earnings, not re-rating.',
    'AI super-cycle extends through 2028-2029 and AMD becomes a durable #2 platform with real software ecosystem (ROCm matures, AMD-native frameworks). ' +
      'MI450/Helios delivers competitive performance at attractive pricing → repeat orders, not pilots. ' +
      'OpenAI partnership scales to multi-billion-dollar revenue, Meta partnership expands. Custom silicon (Pensando, Xilinx) cross-sells. ' +
      'Margins push toward NVDA-like 58-60% on AI mix dominance. EPS compounds at ~50%, market awards a sustained 40× premium. ' +
      'Probability: ~30% — requires both execution + AI hype to hold simultaneously.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.20, 0.28, 0.36],
  bullMaOptVal: false,

  epsCagr: [32, 41, 50],   // Oct 2026 calibration (was 15/28/36): FY26E $7.59 → FY31 EPS ≈ $30 / $42 / $58; consensus FY27E is +107% on the Helios ramp
  exitPE: [25, 35, 40],
  prob: [25, 50, 25],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
    },
    {
      revPrem: [0.025, 0.025, 0.02, 0.02, 0.02],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 2000,          // Q2 2026 SBC $503M → ~$2.0B/yr run-rate (FY25 LTM was $487M per TIKR — likely understated)
    gaapNi: 5009,
    buyback: 355,
    epsBasis: 'NON_GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 32,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 32% overstatement. FY25 LTM actuals (TIKR): SBC $487M, GAAP NI $5.0B, buybacks just $355M = 0.73× SBC. Real dilution is the story: diluted share count grew from 1,229M (FY21) to 1,642M (LTM) = +33.6% over 5 years (+6%/yr CAGR). Unlike LRCX (which shrinks the float but at 10× MTM cost), AMD has not yet inflected to net buybacks. Stock +4-5× since 2021 grants amplifies the MTM cost; calibrated formula reproduces 34.5% from these inputs, within 2.5pp of Burry\'s 32%.',
  },
  debtSafety: {
    netDebt: -9885,        // Jun 2026: $3.2B debt − $13.1B cash & ST investments
    ebitda: 15000,         // FY26E: non-GAAP op income run-rate (~$3.1B Q2, rising) + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash (~$9.9B at Q2 2026). No leverage concern.',
  },
});
