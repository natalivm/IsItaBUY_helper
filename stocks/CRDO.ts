import { defineStock } from './defineStock';

export const CRDO = defineStock({
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  updatedOn: '10/09',
  lastReportTag: 'Q1 FY27',
  dataReviewedOn: '2026-10-10',
  currentPrice: 216.55,
  fairPriceRange: '$185 - $315',  // stockanalysis.com analyst target range, Oct 5 2026
  shares0: 197,        // Q1 FY27 diluted (~$236M non-GAAP NI / $1.20)
  rev25: 1311,         // FY26A (Apr 2026) ≈ $1.31B (approx.) — base year; revGrowth[0] = FY27 (consensus $2.50B, FY28E $3.87B)
  fcfMargin25: 0.35,
  taxRate: 0.08,
  cash: 764,           // Aug 1 2026 cash + ST investments (after the DustPhotonics deal)
  debt: 22,
  beta: 2.58,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 6.31,       // FY27E (Apr 2027) non-GAAP EPS — stockanalysis consensus (Oct 5 2026; FY28E $9.69, +54%). Q1 FY27 $1.20. Prior $3.12 was the FY26 basis.
  rsRating: 85,         // NOT refreshed — awaiting user RS (10/10/2026)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q1 FY27 UPDATE (Sep 1, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $479.0M (+115% y/y, +9.6% q/q) vs ~$471.8M consensus. Non-GAAP
  // GM 68.0% (GAAP 64.5%). Non-GAAP EPS $1.20 (vs ~$1.17), GAAP $0.67. Cash
  // + ST investments $764M. Q2 GUIDE: revenue $525-535M, non-GAAP GM 67-69%.
  // Stock fell ~8% on margin concerns despite the beat. Street: Strong Buy
  // (20), PT $185-315 (median $288.50); FY27E EPS $6.31 / rev $2.50B, FY28E
  // $9.69 / $3.87B. Stock $216.55 (~34× FY27E / ~22× FY28E).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'AEC chips are the de facto standard for intra-rack connectivity, giving Credo an entrenched position as AI clusters scale',
    'DustPhotonics acquisition vertically integrates the silicon photonics PIC layer, expanding addressable revenue per deployment',
    'ZeroFlap Optics pulled forward into production validates a new reliability-first optical category with multiple hyperscaler customers',
    'Best-in-class gross margins at scale signal genuine semiconductor IP differentiation rather than commodity assembly value',
    'Four distinct product expansions — ALCs, OmniConnect, ZeroFlap, SiPho PICs — stagger future growth vectors into the next decade',
  ],

  risksToBuy: [
    'Top-three customers represent the vast majority of revenue — a single hyperscaler pause would be severely damaging',
    'Earnout-based DustPhotonics deal creates meaningful dilution risk if silicon photonics integration hits design-win milestones',
    'SBC as a share of revenue is structurally high, and true owner cash flow is a fraction of the headline FCF figure',
    'Extreme beta means the stock experiences sharp drawdowns in any risk-off or AI-spending-doubt environment',
    'FY27 is back-half loaded — near-term sequential growth is modest, leaving little cushion if early quarters disappoint',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 185, targetMedian: 288.5, targetHigh: 315, numAnalysts: 20 },  // stockanalysis.com, Oct 5 2026
  revGrowth: [
    [0.75, 0.20, 0.08, 0.05, 0.05],   // Bear: FY27 below consensus; AI capex cools, top customers pause
    [0.91, 0.45, 0.22, 0.15, 0.12],   // Base: FY27 ≈ consensus $2.50B, FY28 +45% (haircut vs +55% consensus), then fade
    [0.95, 0.60, 0.35, 0.25, 0.18],   // Bull: ZeroFlap/SiPho/ALC all ramp
  ],
  fcfMargin: [
    [0.20, 0.19, 0.18, 0.17, 0.17],
    [0.30, 0.30, 0.28, 0.27, 0.26],
    [0.35, 0.36, 0.37, 0.38, 0.38],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'AI capex cools sharply after the current demand surge. Top-3 customers (88% of Q3 revenue) pause or slow orders, ' +
      'and the AEC market matures faster than expected as CPO gains traction. ZeroFlap Optics and ALC ramps disappoint. ' +
      'Gross margins compress to the low 60s. The binding visibility delays the pain but does not prevent it. ' +
      'EPS compounds only ~10% from the $6.31 FY27E base and the multiple compresses to 18×. 5yr target {target} ({cagr} annualized).',
    'The core AEC and IC business grows steadily as AI infrastructure buildout continues. FY27 roughly doubles revenue (~$2.5B consensus), FY28 grows ~45%, ' +
      'with combined optical >$500M, but growth decelerates more quickly in FY28-29 as the initial hyperscaler deployment wave matures. ZeroFlap Optics contributes meaningfully ' +
      'but ALC, OmniConnect, and stand-alone SiPho PICs ramp slower than hoped. Gross margins normalize to the 63-65% range as Dust integration creates short-term cost noise. ' +
      'Customer diversification improves but top-3 concentration remains above 70%. EPS compounds ~18% from $6.31 at a ~25× exit. 5yr target {target} ({cagr} annualized).',
    'AEC longevity holds as copper remains the reliability and power-efficiency winner through the 200G-per-lane transition. ' +
      'ZeroFlap Optics ramps strongly in FY27 with 4+ customers, proving reliability-first optical is a new category, and the DustPhotonics PIC integration drives margin uplift through vertical integration. ' +
      'Stand-alone SiPho PIC business compounds against a $6B-by-2030 TAM with hyperscaler design wins and a 3.2T roadmap. ' +
      'ALCs bridge the gap to mid-reach optical in FY28, and OmniConnect Weaver unlocks $1,000+ content per GPU in the inference market. ' +
      'The Chimera acquisition accelerates protocol IP across UALink, ESUN, and Ethernet, while Dust positions Credo for CPO/NPO scale-up alongside the micro-LED bet. ' +
      'AI infrastructure spending proves to be a decade-long megatrend. EPS compounds ~28% at a ~30× exit. 5yr target {target} ({cagr} annualized).',
  ],

  epsCagr: [10, 18, 28],   // Q1 FY27: base 20→18 — now compounding off the FY27E base ($6.31): FY28 +54% consensus, then a fade
  exitPE: [18, 25, 30],
  prob: [15, 45, 40],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.15, 0.25, 0.38],

  debtSafety: {
    netDebt: -742,         // ~$22M debt − $764M cash & ST investments (Aug 1 2026)
    ebitda: 1150,          // FY27E: ~46% non-GAAP op margin × ~$2.5B — approximate
    fy: 'FY27E',
    note: 'GREEN by Step 1 — net cash, essentially no debt. The balance-sheet issue is SBC dilution (Tragic Burry tier).',
  },

  burry: {
    sbc: 161,
    gaapNi: 250,
    buyback: 16,
    epsBasis: 'NON_GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 80,
    overstatementSource: 'estimated',
    note: 'Tragic — TIKR LTM actuals: SBC $161M (15.1% of revenue), buybacks just $16M (covers 10% of SBC). Operating leverage just inflected dramatically: -19% margin FY24 → +30% LTM. GAAP NI ~$250M LTM (improving fast). The catch: diluted shares 155M (FY24) → 186M (LTM) = +20% in ONE year, on top of post-IPO baseline of 88M (FY22). SBC = 47% of CFO, 57% of FCF — half of reported FCF is SBC addback (true owner FCF ~11.5% margin vs headline 26.6%). 4y MTM extreme (~13-15× since IPO) breaks the formula. The 80% estimate places CRDO between PLTR (70%, more mature buyback) and the deeply broken cohort. CRDO\'s operational excellence (68% gross margin, 30% operating margin, 107% revenue CAGR) is genuine; the question is whether SBC will normalize as growth matures, or remain structurally elevated. Watch FY27 share count trajectory.',
  },
});
