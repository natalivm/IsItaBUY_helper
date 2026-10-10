import { defineStock } from './defineStock';

export const ORCL = defineStock({
  ticker: 'ORCL',
  name: 'Oracle Corporation',
  sector: 'Cloud / Enterprise Software',
  themeColor: '#c74634',
  updatedOn: '10/09',
  lastReportTag: 'Q1 FY27',
  dataReviewedOn: '2026-10-10',
  currentPrice: 141.4,
  fairPriceRange: '$110 - $400',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 3000,        // Q1 FY27 diluted 3,000M (+3% y/y; $20B ATM equity sale in Q1)
  rev25: 67000,        // FY26A (May 2026) ≈ $67B (approx.) — base year; revGrowth[0] = FY27 (guide ≥$90B; consensus $90.4B, FY28E $131.7B)
  fcfMargin25: -0.30,  // TTM FCF ≈ -$28.7B (Q1 FY27 capex $28.5B vs OCF $23.1B); FY27 capex ~$70B
  taxRate: 0.19,
  cash: 37077,         // Aug 31 2026 cash + marketable securities (boosted by the $20B ATM)
  debt: 125337,        // Aug 31 2026: $7.6B current + $117.7B non-current
  beta: 1.10,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 8.10,       // FY27E (May 2027) non-GAAP EPS = company guide $8.10 (raised from ~$8.05; consensus $8.14, FY28E $11.00). Q1 FY27 $1.92 (+30%). Prior: $6.03 (FY26 basis).
  rsRating: 60,         // IBD RS per user, 10/10/2026 (was 47)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',  // Q1 FY27: model screens STRONG BUY (~17x FY27E for 30%+ revenue growth and a $664B RPO), but earnings growth is being financed — TTM FCF ≈ -$29B, $125B gross debt, a $20B ATM equity raise, ~$70B FY27 capex and a RED debt-safety tier. Cheap on EPS, not on balance-sheet risk: BUY, not STRONG BUY.
  // Q1 FY27 UPDATE (Sep 10, 2026) — first data review since Q3 FY26
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $19.3B (+30%). Cloud $11.6B (+62%): OCI/IaaS $7.4B (+121%), SaaS
  // $4.2B (+10%); software $5.55B (-3%). Non-GAAP op margin 42%; non-GAAP EPS
  // $1.92 (+30%), GAAP $1.56. RPO $664B (+$209B y/y; >$30B new AI contracts
  // in Q1). Delivered 850MW of capacity / 300K+ GPUs. OCF $23.1B vs capex
  // $28.5B → FCF -$5.4B (TTM ≈ -$28.7B); FY27 capex ~$70B. Sold $20B of stock
  // via ATM; diluted shares 3.0B (+3%). Cash $37.1B vs debt $125.3B (net
  // ~$88B). Dividend $0.50/qtr. GUIDE: Q2 revenue +30-34%, cloud +65-71%,
  // EPS $1.85-1.93; FY27 revenue ≥$90B, non-GAAP EPS $8.10. Street: Buy (43),
  // PT $110-400 (median $240); FY28E EPS $11.00 / rev $132B. Stock $141 —
  // ~17× FY27E / ~13× FY28E: the market is pricing financing risk, not growth.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Oracle Database lock-in is among the deepest moats in enterprise software — migration cost is prohibitive',
    'OCI bare-metal architecture offers a structural cost advantage for large-scale AI training workloads',
    'Multicloud database strategy embeds Oracle directly inside AWS, Azure, and Google ecosystems',
    'RPO of record magnitude provides multi-year revenue visibility that few infrastructure players can match',
    'Cloud infrastructure revenue more than doubling with a record contracted backlog — the inflection is real',
  ],

  risksToBuy: [
    'Heavy AI capex has temporarily destroyed free cash flow and may not convert if OCI stays fourth in cloud',
    'Gross margin compression from infrastructure buildout could persist well beyond the near term',
    'Balance sheet carries substantial debt accumulated through years of buybacks and now capex spending',
    'Capex buildout is now funded by debt and new equity issuance, diluting holders while free cash flow stays deeply negative',
    'SBC overstatement is among the highest in our coverage — real owner earnings are a fraction of reported GAAP',
  ],

  epsCagr: [9, 15, 21],
  exitPE: [15, 20, 24],
  prob: [20, 50, 30],

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 240, targetHigh: 400, numAnalysts: 43 },  // stockanalysis.com, Oct 7 2026
  revGrowth: [
    [0.30, 0.12, 0.08, 0.07, 0.06],   // Bear: FY27 at ~$87B (Q1 +30% locks most of it); RPO converts slowly
    [0.34, 0.35, 0.22, 0.18, 0.15],   // Base: FY27 ≈ $90B guide, FY28 +35% (haircut vs +46% consensus)
    [0.36, 0.45, 0.28, 0.22, 0.18],   // Bull: FY28 at consensus $132B, RPO converts on schedule
  ],
  fcfMargin: [
    [-0.30, -0.10, 0.02, 0.06, 0.10],
    [-0.25, -0.05, 0.05, 0.12, 0.15],
    [-0.20, 0.00, 0.10, 0.15, 0.20],
  ],
  exitMultiple: [12, 18, 22],
  desc: [
    'AI infra cycle cools — OCI stays 4th behind AWS/Azure/GCP. Heavy capex ($21B→$71B) converts poorly to revenue. FCF stays depressed through 2028+. Gross margin compresses to 55% without revenue scale to compensate. EPS growth ~9% CAGR from the $8.10 FY27E base. Market reprices to 15× historical range. 5yr target {target} ({cagr} annualized). Key trigger: AI capex rationalization or OCI contract losses.',
    'Solid execution on the Q1 FY27 momentum (OCI +121%, RPO $664B) — OCI captures meaningful AI workload share, multicloud DB adoption sustains. Revenue hits ≥$90B FY27 per guidance. RPO converts to revenue on schedule. Capex peaks FY28 then moderates, FCF inflects positive FY28-29. EPS compounds ~15% from the $8.10 base on operating leverage + scale. Partner-funded capacity model works. P/E stabilizes at 20× as market reclassifies Oracle from legacy to AI-enabled enterprise platform. 5yr target {target} ({cagr} annualized).',
    'AI infrastructure boom extends multi-year. Oracle wins 3-4 major AI lab training contracts ($1-10B each). OCI bare-metal architecture becomes standard for large-scale training. Multicloud DB revenue sustains 100%+ growth. Revenue approaches $226B by 2030E. Sovereign/regulated cloud wins add durability. EPS ~21% CAGR on massive operating leverage. Market awards 24× as Oracle enters top-3 cloud. 5yr target {target} ({cagr} annualized).',
  ],
  thesis: [
    'AI capex cycle peaks FY27 without sufficient OCI revenue conversion. Hyperscalers consolidate AI workloads on own platforms. Oracle cloud remains niche — enterprise DB customers migrate slowly but AI-native startups choose AWS/Azure. Massive debt ($125B gross) plus equity issuance limits flexibility during a downturn. Gross margins compress to 55% without scale. RPO proves partly "air" — contracted but low utilization. Stock re-rates to historical 12-15× legacy software multiple.',
    'Q3 FY26 proves the inflection is real — first 20%+ organic growth quarter in 15 years followed by sustained execution. Multicloud DB strategy (Azure/AWS/Google) widens moat beyond legacy lock-in into data gravity. OCI 84% cloud infra growth sustains 40%+ through FY28. Partner-funded capacity model ($29B signed) reduces balance sheet risk. AI halo effect drives cross-sell into applications, sovereign cloud. Capex peaks FY28, FCF recovers sharply. Stock re-rates from legacy discount to cloud premium over 2-3 years.',
    'Full AI infrastructure super-cycle over 10+ years. Oracle unique bare-metal GPU architecture wins training workloads that AWS/Azure price out. Gigantic cluster capability (10+ GW secured) becomes structural advantage. Multicloud database evolves into AI Data Platform — system of record + agent layer. Enterprise customers consolidate full stack on Oracle. RPO grows to $200B+. FCF margins expand to 20% as capex normalizes. Oracle becomes the "value hyperscaler" — the Costco of cloud.',
  ],

  bbRate: [0.010, 0.015, 0.020],
  ebitdaProxy: [0.35, 0.42, 0.45],
  termGrowth: [0.015, 0.025, 0.035],

  burry: {
    sbc: 4674,
    gaapNi: 12400,
    buyback: 150,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 65,
    overstatementSource: 'estimated',
    note: 'Estimated ~65% overstatement — naive SBC/NI already at 38% (well above 30% Critical), and AI capex has consumed buyback capacity to ~$150M (vs $4.7B SBC), so dilution is essentially unoffset. Under full-SBC adjustment with MTM at $196 share price (~2.5× 3yr), real owner earnings ~35% of GAAP. Switching baseEps from non-GAAP $6.03 to GAAP $4.34 alone would already trim valuation materially.',
  },
  debtSafety: {
    netDebt: 88260,        // Aug 31 2026: $125.3B debt − $37.1B cash & securities
    ebitda: 38000,         // approx.: non-GAAP op income ~$8.2B/qtr annualized + D&A
    capexToOcf: 1.23,      // Q1 FY27: capex $28.5B / OCF $23.1B
    interestCoverage: 3.7, // FY25 figure — not refreshed
    altmanZ: 2.4,          // FY25 figure — not refreshed
    fy: 'Q1 FY27',
    note: 'RED — net debt ~$88B (~2.3× EBITDA) with capex now exceeding operating cash flow (TTM FCF ≈ -$29B) and a $20B ATM equity raise. Earlier (FY25): CapEx surging from $7B → $21B+, interest coverage weak at 3.7× on $88B debt. High leverage on a still-transitioning cloud business is the core risk — if OCI revenue ramp disappoints, this balance sheet is a trap.',
  },
});
