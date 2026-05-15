import { defineStock } from './defineStock';

export const NU = defineStock({
  ticker: 'NU',
  name: 'Nu Holdings',
  sector: 'FinTech / Digital Banking · LatAm',
  themeColor: '#8b5cf6',
  currentPrice: 12.93,
  updatedOn: '05/14',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$26 - $80',
  // ~$84.9B market cap / $16.15 = ~5,254M shares
  shares0: 5254,
  rev25: 16500,        // $16.5B 2025A (Q4 revenue $4.9B; full-year ~$16.5B)
  fcfMargin25: 0.20,   // Approx from ~24% EBIT margin 2024 * (1 - tax)
  taxRate: 0.18,
  cash: 3000,          // $3B unrestricted at Nu Holdings level (Q4 2025 disclosure)
  debt: 3200,
  beta: 1.55,
  costDebt: 0.07,      // EM premium
  rsRating: 58,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',  // nuFormer: in production for credit decisioning Brazil; expanding to lending + Mexico credit cards 2026
  modelType: 'EPS_PE',
  baseEps: 0.72,       // 2026E EPS — held post Q1 2026: Q1 NI $871M (Q1 record, +41% YoY FX-neutral) annualizes ~$0.66; came in BELOW Q4's $895M on seasonally-peak CLA, and Q1 ETR 8.7% rises to 15-20% IFRS for rest of year. Recovering risk-adj NIM + revenue growth offset tax normalization → FY2026 ~$0.68-0.74. Confirming quarter, not an upgrade.
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
  strategicNarrative: "Type A- Structural Compounder: LatAm digital banking platform compounding through its scale inflection. Q1 2026 — first-ever $5.0B revenue quarter, Q1-record net income $871M (+41% YoY FX-neutral), record-low efficiency ratio 17.6% / 16.6% core. 135M+ customers (Brazil 115M+, Mexico 15M+, Colombia ~5M). Mexico hit its FIRST quarter of IFRS profitability ahead of internal plan — the second S-curve is inflecting. AI is now in production, not pilots: nuFormer models live for card decisioning (Brazil+Mexico) and Brazil unsecured lending, real-time sub-second loan valuation, engineering throughput +50% YoY. Higher Q1 CLA (+33% QoQ) and NPL 15-90 (5.0%) are seasonality + growth + mix, not credit degradation — risk-adjusted NIM (9.5%) reverts toward 2H'25 as Q1 normalizes; 90+ NPL eased to 6.5%. Structural IFRS ETR drop (8.7%, guided 15-20%) offsets deliberate investment-year OpEx; FY2026 efficiency still ~20%. US treated as a bounded call option (<100bps efficiency headwind, fully absorbable). A confirming quarter — thesis and STRONG BUY model rating intact. Risks: Brazil macro/SELIC, household debt-service, credit cycle, Mexico regulation, FX.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 16, targetMedian: 19, targetHigh: 22, numAnalysts: 9 },
  revGrowth: [
    [0.22, 0.17, 0.13, 0.10, 0.08],  // Bear: credit stress + regulation hit
    [0.32, 0.26, 0.20, 0.15, 0.12],  // Base: consensus deceleration curve
    [0.38, 0.31, 0.26, 0.21, 0.17],  // Bull: Mexico S-curve + AI-driven ARPU
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.18],        // Bear: credit stress limits margin
    [0.20, 0.23, 0.25, 0.26, 0.27],        // Base: steady expansion to ~27%
    [0.24, 0.27, 0.30, 0.32, 0.34],        // Bull: AI underwriting + op leverage
  ],
  exitMultiple: [12, 18, 24],

  desc: [
    'Brazil macro shock triggers delinquency spike past 7-8% — 4 consecutive quarters of NPL improvement reverse sharply. SELIC holding high combined with Brazil corporate tax rate hike to 45% compress net income. Mexico banking license delayed, blocking credit scale-up. 2026 investment year costs hit without revenue payback. Multiple re-rates to traditional EM bank comps (10-12x P/E).',
    'Q1 2026 momentum sustains — record $5.0B revenue, Q1-record net income, efficiency at record lows — despite investment-year headwinds. nuFormer AI, now in production for card decisioning (Brazil+Mexico) and Brazil unsecured lending, moderately improves risk-adjusted NIM as Q1 seasonality normalizes. Mexico inflects after its first IFRS-profitable quarter; LDR scales as the second S-curve matures. ARPAC keeps climbing (~$16) as super-core and high-income deepen. Structural ETR decline offsets investment-year OpEx without touching the core trajectory. US optionality without near-term P&L drag. Sustainable 25-28% EPS compounding.',
    'nuFormer AI proves structurally transformative across all geographies — $29B unused credit limit pool converts to IBB at meaningfully lower loss rates, driving ARPAC beyond $20+. Mexico banking license clears, LDR expands rapidly to rival Brazil. Super-core growing 100% YoY compounds into material P&L. US fintech launch captures a profitable niche. ROE sustains 35%+, P/E re-rates toward premium global digital bank comps. NU graduates to undisputed type A structural compounder.',
  ],

  epsCagr: [19, 27, 34],  // Bear $1.72 / Base $2.43 / Bull $3.37 in 2031E (from 2026E base of $0.72)
  exitPE: [15, 20, 25],
  prob: [15, 45, 40],     // Held post-Q1 2026 — Mexico's first IFRS-profitable quarter + AI in production confirm the bull S-curve, but YoY NI decel (50%→41%) and seasonal CLA cap further upgrade; quarter confirms the existing distribution

  termGrowth: [0.020, 0.030, 0.035],
  waccAdj: [0.020, 0.010, 0.000],   // EM risk premium: highest in bear
  bbRate: [0.0, 0.0, 0.0],          // No buybacks — growth reinvestment
  ebitdaProxy: [0.22, 0.28, 0.36],  // Bull upgraded: AI efficiency + op leverage
  bullMaOptVal: false,               // Regulatory complexity limits M&A optionality
});
