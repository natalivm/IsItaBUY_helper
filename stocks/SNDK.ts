import { defineStock } from './defineStock';

export const SNDK = defineStock({
  ticker: 'SNDK',
  name: 'SanDisk Corporation',
  sector: 'NAND Flash Memory / AI Storage',
  themeColor: '#c0392b',
  currentPrice: 1403.34,
  shares0: 146.4,     // 146.42M (stockanalysis, Oct 2026)
  rev25: 20250,       // FY26A (Jun 2026) $20.25B (+175%) — base year; revGrowth[0] = FY27 (consensus $49.1B, +143%), FY28E $58.4B
  fcfMargin25: 0.57,  // TTM FCF $11.49B / rev $20.25B
  taxRate: 0.13,
  cash: 6541,         // cash + ST investments (net cash $6.34B per stockanalysis, Oct 2026)
  debt: 201,
  beta: 1.9,
  costDebt: 0.05,
  rsRating: 85,       // IBD RS per user, 10/11/2026 (was 99)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '10/14',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$1,000 - $3,600',  // stockanalysis.com analyst target range (Oct 9 2026)
  // Q4 FY26 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $8.97B (+51% q/q; ~2/3 price, ~1/3 volume), non-GAAP EPS $39.25
  // (GAAP $43.97). FY26 revenue $20.25B (+175%), non-GAAP EPS $70.88. Q1 FY27
  // GUIDE: revenue $10.3-10.8B (slightly below consensus), EPS $44-46, adj.
  // GM 83-85% (!). New $14B buyback ($15.5B remaining). Street: Buy (25), PT
  // $1,000-3,600 (median $2,150); FY27E rev $49.1B / EPS $214.82, FY28E
  // $58.4B / $266.30. Stock $1,581.82 (~7.4× FY27E), up ~11× in 52 weeks.
  // Peak-cycle NAND pricing — modeled like MU (FY27E base, negative base CAGR).
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'World\'s only pure-play publicly traded NAND company — unique asset with no direct listed comps',
    'AI infrastructure demand for enterprise SSD (model weights, inference caching, vector indexing) creates a structurally higher demand floor than prior cycles',
    'Fab-lite model via Kioxia JV amplifies FCF at cycle peaks while limiting balance-sheet CapEx exposure',
    'Record pricing has turned the business into a cash machine, funding a very large new buyback from a net-cash balance sheet',
    'Pristine Burry profile with extraordinarily low SBC relative to earnings, rare among large-cap technology names',
  ],

  risksToBuy: [
    'NAND is inherently cyclical — Samsung, SK Hynix, and Kioxia all have incentives to run fabs regardless of price',
    'Gross margins are at unprecedented levels for NAND — history says pricing this extreme draws in supply and eventually reverses',
    'Enterprise SSD AI demand floor is unproven over a full cycle — prior AI-demand thesis cycles have disappointed',
    'No direct CapEx control means SNDK cannot unilaterally cut supply to defend pricing in a downturn',
    'Client and consumer NAND demand remains cyclically soft, and any AI capex pause amplifies the inventory correction risk',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 1000, targetMedian: 2150, targetHigh: 3600, numAnalysts: 25 },  // stockanalysis.com (Oct 9 2026)

  modelType: 'EPS_PE',
  baseEps: 214.82,    // FY27E (Jun 2027) non-GAAP EPS consensus (range $187-238; FY26A $70.88, FY28E $266.30). Q1 FY27 guide $44-46. Prior $162 was an older estimate.

  revGrowth: [
    [1.15, -0.25, -0.35, -0.05, 0.05],  // Bear: FY27 below consensus, then a classic NAND price collapse
    [1.40, 0.10, -0.25, -0.10, 0.05],   // Base: FY27 ≈ $48.6B, FY28 peak, then prices normalize
    [1.55, 0.20, 0.00, 0.05, 0.08],     // Bull: AI storage demand absorbs new supply; plateau, no bust
  ],
  fcfMargin: [
    [0.50, 0.30, 0.10, 0.08, 0.12],
    [0.55, 0.50, 0.35, 0.25, 0.25],
    [0.58, 0.55, 0.45, 0.38, 0.35],
  ],
  exitMultiple: [9, 14, 22],

  epsCagr: [-25, -8, 5],   // MU-consistent peak-cycle framing: FY32 EPS ≈ $51 / $142 / $274 vs FY27E $215
  exitPE: [8, 12, 14],     // Trough / mid-cycle / sustained-tightness multiples
  prob: [30, 45, 25],

  desc: [
    'NAND oversupply returns as Samsung, SK Hynix, Kioxia and Chinese suppliers chase record margins with new bit output. Prices fall sharply from the FY27 peak, margins collapse and EPS shrinks roughly three-quarters by FY32; the stock de-rates to a trough ~8x multiple. 5yr target {target} ({cagr} annualized).',
    'FY27 lands near the ~$49B / $215 EPS consensus and FY28 is the peak; pricing then normalizes as supply catches up. AI enterprise-SSD demand keeps margins above prior troughs, and buybacks shrink the share count. EPS ends ~a third below the FY27 peak at a mid-cycle 12x. 5yr target {target} ({cagr} annualized).',
    'AI inference and storage become the dominant NAND demand driver; supply discipline holds and pricing plateaus rather than collapses. EPS grows modestly from the FY27 peak and the market pays ~14x for a structurally less cyclical NAND business. 5yr target {target} ({cagr} annualized).',
  ],

  ebitdaProxy: [0.12, 0.30, 0.46],
  bbRate: [0.003, 0.008, 0.015],
  bullMaOptVal: false,

  burry: {
    sbc: 54,
    gaapNi: 4507,
    buyback: 102,
    epsBasis: 'GAAP',
    fy: 'LTM Q3 FY26',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC is extraordinarily low for a $250B company ($54M LTM vs $4.5B GAAP NI = 1.2% naive ratio). Buybacks ($102M) nearly 2× SBC. Stock has appreciated ~36× since Feb 2025 spinoff, creating large unvested award values, but annual SBC flow remains minimal. Estimated 10% overstatement using MTM amplifier (6×) partially offset by buyback credit. Watch closely as SBC ratchets up with stock re-pricing.',
  },

  debtSafety: {
    netDebt: -6340,        // Jun 2026 (stockanalysis)
    ebitda: 12620,         // TTM EBITDA
    fy: 'FY26',
    note: 'Net cash of $6.3B — spinoff did not inherit WD debt. Fab-lite model via Kioxia JV avoids balance sheet capex exposure. Financially invulnerable at current cycle.',
  },
});
