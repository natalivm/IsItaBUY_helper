import { defineStock } from './defineStock';

export const NU = defineStock({
  ticker: 'NU',
  name: 'Nu Holdings',
  sector: 'FinTech / Digital Banking · LatAm',
  themeColor: '#8b5cf6',
  currentPrice: 16.12,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$26 - $80',
  // ~$84.9B market cap / $16.15 = ~5,254M shares
  shares0: 5254,
  rev25: 16500,        // $16.5B 2025A (Q4 revenue $4.9B; full-year ~$16.5B). FY26E consensus $22.8B, FY27E $28.2B (stockanalysis, Oct 2026)
  fcfMargin25: 0.20,   // Approx from ~24% EBIT margin 2024 * (1 - tax)
  taxRate: 0.18,
  cash: 3000,          // $3B unrestricted at Nu Holdings level (Q4 2025 disclosure)
  debt: 3200,
  beta: 1.55,
  costDebt: 0.07,      // EM premium
  rsRating: 35,         // Estimated 10/10 (no IBD print): ~flat vs a year ago, but sharp recovery $12.66 (Sep 30) → $16.12 (Oct 9) after Q2 beat (+11% on print) + $1B buyback
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',  // nuFormer: in production for credit decisioning Brazil; expanding to lending + Mexico credit cards 2026
  modelType: 'EPS_PE',
  baseEps: 0.89,       // FY2026E EPS — stockanalysis.com consensus (Oct 6 2026, range $0.81-0.97; FY27E $1.13, +27%). H1 2026 NI $1.93B (~$0.40/sh). Prior: raised to ~$0.88 on 06/26 spot-check; prior $0.72 was set conservatively below consensus. Q1 2026 (reported May 14) NI $871M (Q1 record, +41% YoY FX-neutral), $0.18 EPS; guided ~$0.22-0.27/qtr Q2-Q3 → FY26 ~$0.85-0.95. IFRS/GAAP basis; ETR normalizes 15-20% through 2026.
  // Q2 2026 UPDATE (Aug 13, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Milestone quarter: first-ever $1B+ net income ($1.06B, +49% YoY FXN, +17%
  // QoQ), ROE 33%. Revenue ~$5.9B (+39%); gross profit $2.4B (+43% YoY, +25%
  // QoQ). The Q1 seasonal credit dip reversed hard: NIM 22.9% (+180bps QoQ),
  // risk-adjusted NIM 12.4% (+290bps from 9.5%), cost of credit $1.7B (-9%
  // QoQ). NPL 15-90 4.8% (-16bps); NPL 90+ 6.9% (+35bps — late-stage edged up,
  // still below the 7% Q3'24 peak; watch item). Credit book $39.4B (+37% YoY:
  // cards $26B, unsecured $10.3B, secured $3.1B); deposits $45.3B (+18%), cost
  // 88% of interbank. Customers 138.9M (+4M QoQ; Brazil ~118M, Mexico 15.8M →
  // 16M in July, Colombia >5M); activity 83.5% (Brazil >86%); ARPAC ~$17.1
  // (+22% YoY). Efficiency ratio 19.5% (vs 17.6% Q1 on real-estate/marketing
  // timing + international build; still inside the ~20% FY envelope). MEXICO
  // bank launched Aug 2026 — largest digital bank in the country; ARPAC $12.3
  // (vs Brazil's $5.6 at the same stage), LDR 35%. Stock +11% on the print;
  // ~Sep 2 a $1B share repurchase program + PT raises/upgrades. Then slid to
  // $12.66 by Sep 30 (Brazil election-season risk) and rebounded to $16.12 by
  // Oct 9. Street: Buy, 22 analysts, PT $12-23 (median $19). Net: thesis
  // re-confirmed on every line except a small 90+ NPL uptick.
  // ─────────────────────────────────────────────────────────────────────────

  // Q1 2026 CALL UPDATE (May 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Operational snapshot: 135M+ customers (Brazil 115M+, Mexico 15M+, Colombia
  // ~5M). Consolidated activity 83% (expanded QoQ); Brazil approaching 100M MAC.
  // ARPAC ~$16 (up QoQ — every quarter since reporting). Record revenue $5.0B
  // (first time ever). Net income $871M — Q1 record, +41% YoY FX-neutral (vs
  // Q4's +50%: expected investment-year decel; $871M < Q4's $895M on seasonal
  // CLA). Efficiency ratio 17.6% reported / 16.6% core (record low <18%; ~2/3
  // timing, 1/3 structural — FY2026 still guided ~20%). Credit book $37.2B
  // (+40% YoY FX-neutral, +7% QoQ): cards +36%, unsecured +53% ($10B), secured
  // +38% (8% mix). Deposits $42.4B (+22% YoY); cost of deposits 88% of
  // interbank. NII record $3.25B (+12% QoQ); NIM 21.1%. CLA $1.79B (+33% QoQ)
  // — seasonality + growth + mix, NOT asset-quality degradation. Risk-adjusted
  // NIM 9.5% (-100bps QoQ from 10.5%; reverts toward 2H'25 as Q1 normalizes).
  // NPL 15-90 5.0% (seasonal peak, +89bps; 65bps pure seasonality); 90+ NPL
  // 6.5% (-10bps QoQ, below 7% Q3'24 peak — late-stage still easing). Total
  // exposure $70.7B (+44% YoY); ECL allowance $6.1B (+$800M, 86% from
  // growth+seasonality). Coverage 16.2% (~2.5x 90+); gross CLA/new 90+ 153.8%.
  // Gross profit $1.88B (+27% YoY). IFRS ETR 8.7% — structural (guided 15-20%
  // remainder 2026; managerial 30-35%) — a net-income tailwind offsetting
  // investment-year OpEx. MEXICO: 15M customers, 3rd largest FI; FIRST quarter
  // of IFRS profitability — AHEAD of internal plan; ARPAC ~2x, efficiency
  // -78pts since launch (bull-case second S-curve inflecting). AI now in
  // PRODUCTION not pilots: ~100% employee tool utilization, eng throughput
  // +50% YoY, testing 90% faster; nuFormer models live for card decisioning
  // (Brazil+Mexico) + Brazil unsecured lending; real-time AI loan valuation
  // <1s; AI Private Banker 15M+ MAU. SME: ~5M customers at ~0 CAC, 2M+ cards.
  // Carl Rivera named CPO. Brazil profit pool >$100B GP (NU ~7% share); Mexico
  // >$40B GP (NU <1%). US framed as bounded "call option": max OpEx headwind
  // <100bps efficiency in EACH of 2026 & 2027, inside the ~20% FY envelope.
  // Classification: A- (Structural Compounder with EM premium).
  // Probability of 15%+ CAGR: ~75% (held — Mexico IFRS profitability + AI-in-
  // production confirm thesis; YoY NI decel + seasonal CLA cap further upgrade).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Most efficient digital bank in the world by cost — record-low efficiency ratio achieved at massive and growing scale',
    'Mexico second S-curve hit IFRS profitability ahead of plan, validating the multi-country expansion playbook',
    'Massive Brazilian financial inclusion runway — over a hundred million customers yet still deepening ARPU through credit and services',
    'nuFormer AI now in production for credit decisioning and loan valuation, improving underwriting economics structurally',
    'Pristine SBC profile plus a newly authorized buyback — owner earnings essentially equal GAAP earnings',
  ],

  risksToBuy: [
    'Brazil macro shock — elevated SELIC rates and household debt-service stress could trigger a sharp delinquency cycle',
    'Rapid credit-book expansion into unsecured lending increases sensitivity to any deterioration in Brazilian consumer credit',
    'Mexico banking regulation could impose capital requirements or product restrictions that slow the second S-curve',
    'FX volatility across Brazil, Mexico, and Colombia directly compresses dollar-reported earnings without any operational change',
    'Valuation reflects compounding expectations already — any growth deceleration or credit scare would re-rate the multiple sharply',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 12, targetMedian: 19, targetHigh: 23, numAnalysts: 22 },  // stockanalysis.com, Oct 6 2026
  revGrowth: [
    [0.30, 0.15, 0.12, 0.10, 0.08],  // Bear: FY26 ~locked by H1 (+~39%); then credit stress + regulation hit
    [0.38, 0.24, 0.19, 0.15, 0.12],  // Base: FY26/FY27 ≈ consensus $22.8B / $28.2B, then deceleration curve
    [0.42, 0.30, 0.25, 0.21, 0.17],  // Bull: Mexico S-curve + AI-driven ARPU
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.18],        // Bear: credit stress limits margin
    [0.20, 0.23, 0.25, 0.26, 0.27],        // Base: steady expansion to ~27%
    [0.24, 0.27, 0.30, 0.32, 0.34],        // Bull: AI underwriting + op leverage
  ],
  exitMultiple: [12, 18, 24],

  desc: [
    'Brazil macro shock triggers delinquency spike past 7-8% — 4 consecutive quarters of NPL improvement reverse sharply. SELIC holding high combined with Brazil corporate tax rate hike to 45% compress net income. Mexico banking license delayed, blocking credit scale-up. 2026 investment year costs hit without revenue payback. Multiple re-rates to traditional EM bank comps (10-12x P/E).',
    'Q2 2026 momentum sustains — first $1B+ net-income quarter, ROE 33%, risk-adjusted NIM rebounding to 12.4% — despite investment-year headwinds. nuFormer AI, now in production for card decisioning (Brazil+Mexico) and Brazil unsecured lending, moderately improves risk-adjusted NIM as Q1 seasonality normalizes. Mexico inflects after its first IFRS-profitable quarter and the Aug 2026 bank launch; LDR (35%) scales as the second S-curve matures. ARPAC keeps climbing (~$17, +22% YoY) as super-core and high-income deepen. Structural ETR decline offsets investment-year OpEx without touching the core trajectory. US optionality without near-term P&L drag. Sustainable 25-28% EPS compounding.',
    'nuFormer AI proves structurally transformative across all geographies — $29B unused credit limit pool converts to IBB at meaningfully lower loss rates, driving ARPAC beyond $20+. Mexico banking license clears, LDR expands rapidly to rival Brazil. Super-core growing 100% YoY compounds into material P&L. US fintech launch captures a profitable niche. ROE sustains 35%+, P/E re-rates toward premium global digital bank comps. NU graduates to undisputed type A structural compounder.',
  ],

  epsCagr: [19, 25, 34],  // Base trimmed 27→25 on 06/26 (Street long-run ~21-25%; file's own "25-28%" language). Bear $2.10 / Base $2.69 / Bull $3.80 in 2031E (from 2026E base of $0.88)
  exitPE: [15, 20, 25],
  prob: [15, 45, 40],     // Held post-Q2 2026 too (record quarter vs 90+ NPL uptick + Brazil election risk). Held post-Q1 2026 — Mexico's first IFRS-profitable quarter + AI in production confirm the bull S-curve, but YoY NI decel (50%→41%) and seasonal CLA cap further upgrade; quarter confirms the existing distribution

  termGrowth: [0.020, 0.030, 0.035],
  waccAdj: [0.020, 0.010, 0.000],   // EM risk premium: highest in bear
  bbRate: [0.0, 0.004, 0.006],      // $1B repurchase program announced ~Sep 2026 (~1.2% of mkt cap) — share-count display only in EPS_PE
  ebitdaProxy: [0.22, 0.28, 0.36],  // Bull upgraded: AI efficiency + op leverage
  bullMaOptVal: false,               // Regulatory complexity limits M&A optionality

  debtSafety: {
    netDebt: 200,          // $3.2B corporate debt − $3.0B holdco cash (deposits fund the credit book — operational)
    ebitda: 5000,          // proxy: LTM pre-tax income (~$4.6B IFRS) — banks have no meaningful EBITDA
    fy: 'LTM Q2 2026',
    note: 'Digital bank: $45B of deposits fund the loan book (operational, not corporate leverage). Holdco debt roughly offset by holdco cash; tier is GREEN by construction — the real risk is credit quality (90+ NPL 6.9%), not leverage.',
  },

  burry: {
    sbc: 63.27,
    gaapNi: 2868.89,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — the Burry SBC framework barely registers here. FY25 actuals: SBC just $63.27M = 2.2% of $2,868.89M GAAP NI (0.9% of $6,991M revenue), zero buybacks in FY25 (a $1B program was announced ~Sep 2026 — refresh `buyback` once executed). Naive SBC/NI ~2.2%; even applying a ~1.5x MTM amplifier for NU\'s modest ~1.7x 3-year stock return keeps the estimate deep inside the Pristine band (~3-5%). The headline 206% 5-year diluted-share increase (1,602M FY21 → 4,907M FY25) is NOT SBC dilution — it is IPO transition / capitalization / conversion effects; from 2023 onward the share count is nearly flat (4,858M → 4,907M, ~+1%/yr). Owner earnings ≈ GAAP earnings here. The real NU debate is EM credit-cycle risk, LatAm regulation, FX, and a ~28x earnings multiple — not accounting quality.',
  },
});
