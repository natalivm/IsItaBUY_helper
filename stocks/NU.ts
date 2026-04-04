import { defineStock } from './defineStock';

export const NU = defineStock({
  ticker: 'NU',
  name: 'Nu Holdings',
  sector: 'FinTech / Digital Banking · LatAm',
  themeColor: '#8b5cf6',
  currentPrice: 14.15,
  updatedOn: '04/03',
  fairPriceRange: '$18 - $45',
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
  baseEps: 0.72,       // 2026E EPS (Q4 2025 net income $895M = ~$0.68 annualized; ~6% lift for 2026E despite investment year)
  // Q4 2025 CALL UPDATE (Feb 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Operational snapshot: 131M customers (+17M net new in 2025), activity 83%.
  // Brazil 113M (86% active) — now largest private bank by customer count.
  // Mexico 14M customers, banking license process ongoing. Colombia 4M+.
  // ARPAC $15 (+27% YoY FX-neutral, +9% QoQ). Q4 revenue $4.9B (+45% YoY).
  // Net income $895M (+50% YoY). ROE 33% (record). Efficiency ratio 19.9%
  // (new methodology, below 20% for first time). Credit book $32.7B (+40% YoY).
  // Deposits $41.9B (+29% YoY). Risk-adjusted NIM 10.5% (ex-Prosofipo one-off).
  // Early-stage NPLs (15-90 day) improved for 4th consecutive quarter → 4.1%;
  // 90+ NPLs declined to 6.6%. Capital: $3B unrestricted cash at Holdings,
  // $2.2B excess in operating entities, $3.6B covering regulatory requirements.
  // nuFormer AI in production for Brazil credit decisioning; deploying to
  // lending (Brazil) and credit cards (Mexico) in 2026. Unused credit limits
  // expanded ~60% YoY ($18B → $29B) — purchase volume market share gain of
  // 50bps in Q4, largest in 10+ quarters; IBB translation still ahead.
  // Super-core segment (BRL 5K-12K/mo) growing ~100% YoY; high-income +40% YoY.
  // US OCC conditional bank charter approval received Jan 2026.
  // 2026 is deliberate "investment year": RTO (July 2026, +80-100bps efficiency),
  // AI/GPU infra, US groundwork. Efficiency ratio to rise near term, then compress.
  // Classification: A- (Structural Compounder with EM premium).
  // Probability of 15%+ CAGR: ~75% (upgraded from ~70% post-Q3 2025).
  // ─────────────────────────────────────────────────────────────────────────
  strategicNarrative: "Type A- Structural Compounder: LatAm digital banking platform at scale inflection. Q4 2025 record quarter — 131M customers (83% active), ROE 33%, efficiency ratio <20% for first time, risk-adjusted NIM 10.5%. nuFormer AI in production for Brazil credit; expanding to lending and Mexico credit cards in 2026. Mexico second S-curve: 14M customers, banking license in process — LDR expansion unlocks next credit phase. Super-core (BRL 5K-12K/mo) growing 100% YoY; high-income +40% YoY. US OCC conditional charter Jan 2026 opens global optionality. 2026 is deliberate investment year (RTO + AI infra + US groundwork) — efficiency ratio rises ~80-100bps near term before structural operating leverage reasserts. Risks: Brazil macro, SELIC, credit cycle, Mexico regulation, FX.",


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
    'Q4 2025 momentum (ROE 33%, NPLs improving, efficiency <20%) sustains into 2026 despite investment year headwinds. nuFormer AI rolls out to lending and Mexico credit cards, moderately improving risk-adjusted NIM. Mexico LDR scales after banking license clears. ARPAC continues growing as super-core and high-income segments deepen. US charter provides optionality without near-term P&L contribution. Sustainable 25-28% EPS compounding.',
    'nuFormer AI proves structurally transformative across all geographies — $29B unused credit limit pool converts to IBB at meaningfully lower loss rates, driving ARPAC beyond $20+. Mexico banking license clears, LDR expands rapidly to rival Brazil. Super-core growing 100% YoY compounds into material P&L. US fintech launch captures a profitable niche. ROE sustains 35%+, P/E re-rates toward premium global digital bank comps. NU graduates to undisputed type A structural compounder.',
  ],

  epsCagr: [19, 27, 34],  // Bear $1.72 / Base $2.43 / Bull $3.37 in 2031E (from 2026E base of $0.72)
  exitPE: [15, 20, 25],
  prob: [15, 45, 40],     // Upgraded after Q4 2025 call — record ROE, 4th consecutive NPL improvement, US charter, super-core 100% growth

  termGrowth: [0.020, 0.030, 0.035],
  waccAdj: [0.020, 0.010, 0.000],   // EM risk premium: highest in bear
  bbRate: [0.0, 0.0, 0.0],          // No buybacks — growth reinvestment
  ebitdaProxy: [0.22, 0.28, 0.36],  // Bull upgraded: AI efficiency + op leverage
  bullMaOptVal: false,               // Regulatory complexity limits M&A optionality
});
