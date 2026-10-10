import { defineStock } from './defineStock';

export const FTNT = defineStock({
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 194.75,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$104 - $220',  // stockanalysis.com analyst target range, Oct 7 2026 (old $80-135 was stale)
  shares0: 756,
  rev25: 6800,         // FY2025; FY26 guide $8.02-8.18B (+19%), FY27E consensus $9.04B (+11%)
  fcfMargin25: 0.34,
  taxRate: 0.18,
  cash: 2224,          // stale figure — not refreshed
  debt: 995,           // stale figure — not refreshed
  beta: 0.96,
  costDebt: 0.048,
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 95)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Beat on every line. Revenue $2.05B (+26%) vs ~$1.89B; product revenue
  // +52% (firewall refresh + AI infrastructure); billings $2.37B (+33%); OT
  // billings +55%. Non-GAAP op margin 38%; non-GAAP EPS $0.90 vs ~$0.75. Q2
  // FCF $966M. FY26 GUIDE RAISED: billings $9.35-9.55B, revenue $8.02-8.18B,
  // non-GAAP EPS $3.41-3.47. Q3: revenue $2.01-2.10B, EPS $0.83-0.87.
  // Stock ~$153 pre-print → ~$162 (Jul 31) → $194.75. Street: Hold (44), PT
  // $104-220 (median $165) — stock is ABOVE the median; FY26E EPS $3.45 /
  // rev $8.12B, FY27E $3.78 / $9.04B (growth slows as refresh laps). ~56×
  // FY26E. (No split — the old $80-135 PTs were simply stale.)
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'ASIC-driven SASE platform delivers a cost and performance edge that cloud-native peers cannot replicate',
    'Extraordinary capital efficiency with industry-leading ROIC and consistent net share retirement over many years',
    'Three durable growth vectors: SASE expansion, AI security across data centers, and OT industrial security',
    'Pristine SBC profile — one of the cleanest shareholder economics in the entire cybersecurity sector',
    'Firewall refresh and OT security demand are driving the fastest product growth in years, with billings accelerating',
  ],

  risksToBuy: [
    'Stock has rallied sharply and trades well ahead of analyst consensus targets, limiting near-term upside',
    'Cloud-native SASE competitors Zscaler and Palo Alto aggressively pursue enterprise platform consolidation deals',
    'Firewall refresh cycle remains muted, and any deceleration in SASE adoption hits the growth narrative hard',
    'Premium valuation leaves little room for execution misses or macro-driven IT budget cuts',
    'Significant overbought technical condition increases the risk of a sharp pullback before the next leg up',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 104, targetMedian: 165, targetHigh: 220, numAnalysts: 44 },  // stockanalysis.com, Oct 7 2026
  revGrowth: [
    [0.17, 0.05, 0.05, 0.04, 0.04],   // Bear: FY26 ~locked; refresh cycle ends abruptly, SASE share losses
    [0.19, 0.11, 0.10, 0.09, 0.08],   // Base: FY26 ≈ $8.1B guide, FY27 ≈ consensus $9.0B (+11%)
    [0.20, 0.15, 0.14, 0.13, 0.12],   // Bull: SASE + OT + AI-security convergence
  ],
  fcfMargin: [
    0.27625,
    0.325,
    0.37375,
  ],
  exitMultiple: [15, 28, 35],
  bullMaOptVal: 80 * 743.6 * 0.07,
  ebitdaProxy: [0.18, 0.26, 0.38],

  desc: [
    'SASE adoption stalls as cloud-native competitors (Zscaler, Palo Alto) win enterprise consolidation deals. Firewall refresh cycle is muted — revenue growth decelerates to mid-single digits. ' +
      'FCF margins compress to ~28% as R&D spend fails to translate into share gains. Multiple compresses to 15x as market treats Fortinet as a legacy security vendor once the refresh cycle laps. 5yr target {target} ({cagr} annualized).',
    'Firewall refresh cycle drives near-term demand while SASE convergence sustains high-single to low-double-digit growth. ASIC cost/performance advantage defends share but doesn\'t expand it meaningfully. ' +
      'FCF margins hold at ~32.5% on proprietary silicon leverage. Multiple compresses from ~56× FY26E P/E through earnings growth; net-cash balance sheet funds steady buybacks. 5yr target {target} ({cagr} annualized).',
    'SASE inflection — ASIC-driven performance edge wins enterprise platform consolidation over cloud-native peers. Revenue sustains low-teens growth as firewall + SASE converge into a single budget line. ' +
      'FCF margins expand to ~37% on operating leverage and software attach. Net cash funds aggressive buybacks. Market holds ~35x EBITDA as a cybersecurity compounder with structural margin advantage. 5yr target {target} ({cagr} annualized).',
  ],

  debtSafety: {
    netDebt: -1229,        // stale balance-sheet figures (debt $995M − cash $2,224M); actual net cash likely larger
    ebitda: 3100,          // FY26E: non-GAAP op margin ~36% × ~$8.1B + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash. Fortinet\'s balance sheet is a non-issue.',
  },

  burry: {
    sbc: 286,
    gaapNi: 1955,
    buyback: 3223,
    epsBasis: 'GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 20,
    overstatementSource: 'estimated',
    note: 'Ok — FTNT is actually one of the cleanest profiles in our entire coverage, despite being in the cybersec sector that\'s otherwise dominated by Tragic-tier names (CRWD/ZS/DDOG/AXON). TIKR LTM actuals: SBC just $286M (**4.0% of revenue** — lowest among all verified cybersec, only AMZN/MELI/SHOP are lower), buybacks **$3,222M = 11.3× SBC** (similar to FICO 12× and NFLX 25×). Diluted shares 835M (FY21) → 756M (LTM) = **−9.5% over 5 years** (comparable to META −10.2%). SBC = 12% of FCF. GAAP genuinely profitable: 27.5% net margin, 31% operating margin, $1.95B GAAP NI. Adjusted FCF after SBC: $2.15B = 30.2% margin (still elite). FTNT belongs in the reformed-compounder cohort with META/FICO/SHOP/APP/AMAT — not the broken-SaaS cohort with the rest of cybersec.',
  },
});
