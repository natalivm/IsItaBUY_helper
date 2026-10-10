import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 342.21,
  fairPriceRange: '$190 - $500',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 185,        // Q3 2026 guide ~185M diluted (Q2 183.3M)
  rev25: 852.5,        // FY2025 revenue $852.5M (was mis-set to $1,345M); FY26E consensus $1.91B (+124%), FY27E $2.97B
  fcfMargin25: 0.33,   // FY25 FCF $281.8M
  taxRate: 0.12,       // non-GAAP ~12%
  cash: 1253,          // Jun 30 2026: $111.5M cash + $1,141.5M marketable securities
  debt: 0,
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 4.03,       // FY2026E non-GAAP EPS — stockanalysis consensus (Oct 9 2026; FY27E $6.39, +59%). H1 non-GAAP EPS ~$1.36 (Q2 $0.80) + Q3 guide $1.16-1.21. No FY guide. Prior: $1.84 (stale).
  rsRating: 88,        // IBD RS per user, 10/10/2026 (was 98)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Hypergrowth re-accelerating. Revenue $392.4M (+27% q/q, +104% y/y).
  // Non-GAAP GM 73.7%; non-GAAP op margin 39.1%; non-GAAP EPS $0.80, GAAP
  // $0.83 (GAAP NI $153M). SBC $64M in Q2 ($113M H1). H1 OCF $162M, FCF
  // $134M. Cash + securities $1.25B, no debt. Amazon warrants: $12.3M contra-
  // revenue in H1. Q3 GUIDE: revenue $540-560M (+40% q/q; consensus was
  // ~$410M), non-GAAP GM ~72% (hardware-heavy switch mix), non-GAAP EPS
  // $1.16-1.21 on ~185M shares — Scorpio X 320-lane fabric switch ramp makes
  // Scorpio the largest product family a quarter early. Street: Buy (26), PT
  // $190-500 (median $425); FY26E rev $1.91B / EPS $4.03, FY27E $2.97B /
  // $6.39. Stock $342 (~85× FY26E / ~54× FY27E). Net: the old "decelerating
  // toward single digits" framing is obsolete; valuation is the debate.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Scorpio X positions Astera as the fabric layer between GPUs and memory — a critical choke point in AI scale-up clusters.',
    'Amazon warrant and strategic partnership provide deep hyperscaler validation and near-term revenue visibility.',
    'Protocol-agnostic design (UALink, NVLink Fusion, CXL) means Astera benefits regardless of which interconnect standard wins.',
    'Elite gross margins and a rapidly scaling FCF base give the business genuine financial quality beneath the growth story.',
  ],

  risksToBuy: [
    'Growth is shifting to hardware-heavy switches, lowering gross margins and raising cyclicality and customer-capex exposure.',
    'Hyperscalers could internalize connectivity solutions, eliminating the need for a dedicated fabric vendor.',
    'Concentrated customer risk — the Amazon warrant is both the bull case and the ceiling if other hyperscalers don\'t adopt.',
    'Extraordinary share dilution from post-IPO RSU vesting is running well ahead of any buyback offset.',
    'Valuation already prices the optimistic path, leaving little margin of safety if Scorpio X ramp disappoints.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 190, targetMedian: 425, targetHigh: 500, numAnalysts: 26 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [1.18, 0.15, 0.00, -0.08, -0.15],   // Bear: FY26 ~locked (H1 + Q3 guide ≈ $1.25B); AI capex peaks, Scorpio displaced
    [1.24, 0.50, 0.15, 0.08, 0.00],     // Base: FY26/FY27 ≈ consensus $1.91B / $2.97B, then normalizes
    [1.30, 0.60, 0.25, 0.15, 0.08],     // Bull: Scorpio X + optical + UALink compound
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.29, 0.32, 0.35, 0.37, 0.38],
    [0.30, 0.34, 0.38, 0.42, 0.44],
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'The AI capex cycle peaks early and a semiconductor downturn hits by 2028. Scorpio X is delayed or displaced by competing solutions from NVLink and ESUN. ' +
      'Hyperscalers begin internalizing their connectivity, and the operating expense step-up compresses margins without generating payback. ' +
      'Operating leverage works in reverse, EPS compounds only ~15% from the $4.03 FY26E base, and the multiple compresses to 20x as the growth premium evaporates. 5yr target {target} ({cagr} annualized).',
    'AI infrastructure spending sustains at moderate levels through 2028. Scorpio X ramps on schedule in 2027 with two to three hyperscaler customers. ' +
      'UALink adoption provides meaningful protocol diversification, and operating margins expand to around 45%. ' +
      'Revenue roughly doubles in 2026, grows ~50% in 2027, then normalizes as the business matures. ' +
      'Earnings compound at roughly 27% annually from the $4.03 base, but from ~85x FY26E the stock return is far more modest: 5yr target {target}, {cagr} annualized.',
    'The AI supercycle extends and Scorpio X becomes the standard scale-up switching layer across major hyperscalers. ' +
      'Optical products ramp in 2028 and UALink adoption accelerates broadly. The company transitions from a cyclical play to an architectural infrastructure layer. ' +
      'Operating margins reach 50% as multi-protocol optionality across CXL, UALink, and NVLink Fusion captures an expanding market. ' +
      'Earnings grow at roughly 35% annually: 5yr target {target}, {cagr} annualized.',
  ],
  thesis: [
    'AI scale-up protocol shifts away from merchant silicon. NVLink/ESUN displaces PCIe/CXL path. ' +
      'Hyperscalers build internal connectivity (like Google TPU interconnect). ' +
      'Aggressive OpEx step-up eats into margins during cycle downturn. ' +
      '$6.5B Amazon warrant is a ceiling, not a floor — concentrated customer risk. ' +
      'At ~85x FY26E earnings, any air-pocket compresses the multiple hard. Semiconductor cycle hits 2028-2029.',
    'Amazon warrant secures strategic position. Scorpio X ramp validates scale-up switching TAM. ' +
      'PCIe 6 first-to-volume advantage holds. Software-defined fabric creates stickiness. ' +
      'AI capex sustains but growth decelerates naturally. EBIT margin expansion to 45% offsets revenue slowdown. ' +
      'Company remains cyclical growth (type B) with improving moat. Fundamentals deliver, but the entry multiple caps returns.',
    'Scorpio X + optical + UALink = triple growth engine. Company becomes the architectural connectivity layer ' +
      'for AI scale-up infrastructure. 2-3 hyperscaler adoption creates switching costs approaching SaaS levels. ' +
      'TAM expansion from $25B to $50B+ with optical. Moat transitions from technical to structural. ' +
      'Type B → Type A reclassification. Market cap re-rates as "AI fabric infrastructure platform".',
  ],

  epsCagr: [15, 27, 35],
  exitPE: [20, 30, 35],
  prob: [30, 40, 30],

  bbRate: [0.002, 0.008, 0.015],
  ebitdaProxy: [0.25, 0.40, 0.50],
  bullMaOptVal: false,

  debtSafety: {
    netDebt: -1253,        // no debt; $1.25B cash & securities (Jun 30 2026)
    ebitda: 780,           // FY26E: non-GAAP op margin ~39% × $1.91B + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash, no debt. The balance-sheet risk is SBC dilution, not leverage.',
  },

  burry: {
    sbc: 167,
    gaapNi: 219,        // FY25 GAAP NI $219M (stockanalysis); 2026 run-rate far higher (Q2 $153M) — refresh at FY26
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 75,
    overstatementSource: 'estimated',
    note: 'Tragic — TIKR FY25 actuals: SBC $167M (16.6% of revenue — high), buybacks $0, recently turned GAAP-profitable (operating margin 22% LTM, +20pp swing from -29% FY24). The good news: elite 76% gross margins, 132% 3y revenue CAGR, FCF $343M ($176M after SBC adjustment). The bad news: post-IPO RSU wave is ongoing — diluted shares 131M (FY24) → 180M (FY26 LTM) = +37% in one year. Zero buyback offset. SBC = 49% of reported FCF (true owner FCF is half headline). 4y MTM at extreme high end (~5× since IPO grants) breaks the formula. 75% estimate reflects: recent profitability inflection (better than pure broken-SaaS), but elite-tier dilution velocity (worse than typical Critical). Watch the share-count trajectory — if dilution slows in FY27 as IPO vesting completes, ALAB could reclassify down to Critical 50%.',
  },
});
