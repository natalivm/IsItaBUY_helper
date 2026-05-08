import { defineStock } from './defineStock';

export const ORCL = defineStock({
  ticker: 'ORCL',
  name: 'Oracle Corporation',
  sector: 'Cloud / Enterprise Software',
  themeColor: '#c74634',
  updatedOn: '05/08',
  currentPrice: 195.95,
  fairPriceRange: '$140 - $380',
  shares0: 2870,
  rev25: 57400,
  fcfMargin25: 0.005,
  taxRate: 0.19,
  cash: 17000,
  debt: 88000,
  beta: 1.10,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 6.03,
  rsRating: 16,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Strong enterprise moat business entering AI-fueled cyclical/secular acceleration phase, paying for it with very heavy capex. " +
    "Q3 FY26 was the first quarter in 15+ years where both organic revenue and organic non-GAAP EPS grew 20%+ in USD — real acceleration, not just narrative. " +
    "OCI breakout: cloud infra revenue +84% to $4.9B (accelerating from +68%), multicloud DB revenue +531% YoY, AI infra revenue +243% YoY. RPO = $130B. FY27 revenue guidance raised to $90B. " +
    "Moat expanding beyond legacy DB: (1) Oracle Database lock-in — mission-critical enterprise data, extremely expensive migration; (2) enterprise contracts with massive switching costs; " +
    "(3) OCI cost advantage — 30-40% cheaper GPU clusters than AWS, bare-metal architecture ideal for AI training; (4) NEW: multicloud database@Azure/AWS/Google + AI Data Platform + agent layer near system of record. " +
    "Supply-side execution improving: 10+ GW power/DC capacity secured for next 3 years, 90% capacity funded by partners, rack-to-revenue time reduced 60%, $29B contracts under new financing model. " +
    "Revenue: $57B → $226B by 2030E (~21% CAGR). EPS: 6.03 → 20.78E (TIKR consensus ~28% CAGR, realistic base ~15%). " +
    "BUT: FCF temporarily destroyed by AI capex ($21B → $71B by 2030E). Same capex pattern as Amazon (2013), Microsoft (2016), Google (2017) during hyperscale buildout. " +
    "Partner-funded model helps but this is NOT asset-light compounder. Need to prove capex converts to large recurring cash flow in 2-4 years. " +
    "Key risks: (1) AI capex may not convert if OCI stays 4th behind AWS/Azure/GCP; (2) gross margin compression 71% → 55%; (3) RS 16 — market aggressively selling, -51% from $346 ATH. " +
    "P(15% CAGR) ≈ 45-55% post-Q3 call (raised from ~45% pre-call). Bet decomposition: 50% execution, 35% structural AI/cloud trend, 15% cycle/sentiment. " +
    "Not a structural compounder yet, but no longer a mature dinosaur. One of the most serious 'non-obvious AI infrastructure + enterprise software' bets in the market.",

  epsCagr: [9, 15, 21],
  exitPE: [15, 20, 24],
  prob: [20, 50, 30],

  analystConsensus: { rating: 'Buy', targetLow: 185, targetMedian: 276, targetHigh: 345, numAnalysts: 33 },
  revGrowth: [
    [0.12, 0.10, 0.08, 0.07, 0.06],
    [0.17, 0.32, 0.22, 0.20, 0.18],
    [0.25, 0.38, 0.28, 0.22, 0.18],
  ],
  fcfMargin: [
    [0.005, 0.02, 0.05, 0.08, 0.10],
    [0.005, 0.03, 0.08, 0.12, 0.15],
    [0.01, 0.05, 0.10, 0.15, 0.20],
  ],
  exitMultiple: [12, 18, 22],
  desc: [
    'AI infra cycle cools — OCI stays 4th behind AWS/Azure/GCP. Heavy capex ($21B→$71B) converts poorly to revenue. FCF stays depressed through 2028+. Gross margin compresses to 55% without revenue scale to compensate. EPS growth ~9% CAGR mostly from buybacks. Market reprices to 15× historical range. Price target ~$139, CAGR ~-4%. Key trigger: AI capex rationalization or OCI contract losses.',
    'Solid execution on Q3 FY26 momentum — OCI captures meaningful AI workload share, multicloud DB adoption sustains. Revenue hits $90B FY27 per raised guidance. RPO converts to revenue on schedule. Capex peaks FY28 then moderates, FCF inflects positive FY28-29. EPS compounds ~15% on operating leverage + scale. Partner-funded capacity model works. P/E stabilizes at 20× as market reclassifies Oracle from legacy to AI-enabled enterprise platform. Price target ~$242, CAGR ~8%.',
    'AI infrastructure boom extends multi-year. Oracle wins 3-4 major AI lab training contracts ($1-10B each). OCI bare-metal architecture becomes standard for large-scale training. Multicloud DB revenue sustains 100%+ growth. Revenue approaches $226B by 2030E. Sovereign/regulated cloud wins add durability. EPS ~21% CAGR on massive operating leverage. Market awards 24× as Oracle enters top-3 cloud. Price target ~$375, CAGR ~17%.',
  ],
  thesis: [
    'AI capex cycle peaks FY27 without sufficient OCI revenue conversion. Hyperscalers consolidate AI workloads on own platforms. Oracle cloud remains niche — enterprise DB customers migrate slowly but AI-native startups choose AWS/Azure. Massive debt ($88B) limits flexibility during downturn. Gross margins compress to 55% without scale. RPO proves partly "air" — contracted but low utilization. Stock re-rates to historical 12-15× legacy software multiple.',
    'Q3 FY26 proves the inflection is real — first 20%+ organic growth quarter in 15 years followed by sustained execution. Multicloud DB strategy (Azure/AWS/Google) widens moat beyond legacy lock-in into data gravity. OCI 84% cloud infra growth sustains 40%+ through FY28. Partner-funded capacity model ($29B signed) reduces balance sheet risk. AI halo effect drives cross-sell into applications, sovereign cloud. Capex peaks FY28, FCF recovers sharply. Stock re-rates from legacy discount to cloud premium over 2-3 years.',
    'Full AI infrastructure super-cycle over 10+ years. Oracle unique bare-metal GPU architecture wins training workloads that AWS/Azure price out. Gigantic cluster capability (10+ GW secured) becomes structural advantage. Multicloud database evolves into AI Data Platform — system of record + agent layer. Enterprise customers consolidate full stack on Oracle. RPO grows to $200B+. FCF margins expand to 20% as capex normalizes. Oracle becomes the "value hyperscaler" — the Costco of cloud.',
  ],

  bbRate: [0.010, 0.015, 0.020],
  ebitdaProxy: [0.35, 0.42, 0.45],
  termGrowth: [0.015, 0.025, 0.035],
});
