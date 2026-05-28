import { defineStock } from './defineStock';

export const SNOW = defineStock({
  ticker: 'SNOW',
  name: 'Snowflake',
  sector: 'Cloud Data Platform / AI Analytics',
  themeColor: '#29B5E8',
  currentPrice: 176.40,
  fairPriceRange: '$120 - $195',
  shares0: 347,           // ~346.6M diluted shares (Q1 FY27)
  rev25: 4684,            // FY26 total revenue ($4.684B, ended Jan 31, 2026)
  fcfMargin25: 0.23,      // TTM FCF margin ~23% (P/FCF 51.93 at $175.26 pre-earnings)
  taxRate: 0.20,
  cash: 2960,             // Cash/sh $8.53 × 346.6M shares (Q1 FY27 snapshot)
  debt: 2770,             // Convertible notes (Debt/Eq 1.43 × book equity ~$1.94B)
  beta: 1.15,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 2.00,          // FY27E non-GAAP EPS post-Q1 beat. Q1 actuals $0.39 vs $0.32 est (+22% beat). FY27 guided $5.84B product revenue + 12.5% non-GAAP op margin; at ~20% non-GAAP tax + $140M interest income ÷ ~348M shares ≈ $2.00 full year. Pre-earnings FY27 consensus ~$1.88 → raised ~$0.12 on Q1 beat.
  rsRating: 38,
  rsTrend: 'rising',      // Perf Month +21.5%, recovering from -20% YTD; RS improving from lows
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD', // Model says BUY (~17% upside, quality-boost threshold 12%). Override to HOLD: at 88× FY27E non-GAAP EPS with GAAP loss -$1.33B and SBC at 34% of revenue (Tragic Burry tier), base case barely shows real returns. Stock ran +21.5% into earnings; margin of safety absent. Wait for a pullback below $145.
  updatedOn: '05/28',
  lastReportTag: 'Q1 FY27',

  // Q1 FY27 EARNINGS (May 27, 2026 AMC)
  // ─────────────────────────────────────────────────────────────────────────
  // Product revenue $1.33B (+34% YoY) — strongest sequential dollar growth
  // in company history, vs 27% consensus; total revenue $1.391B (+33% YoY,
  // vs $1.32B est). Non-GAAP EPS $0.39 vs $0.32 est (+22% beat). NRR 126%
  // (up from 125%). $1M+ TTM customers: 779 (+29% YoY); 46 added in Q1 vs
  // 26 a year ago — acceleration at the high end. RPO $9.21B (+38% YoY).
  // FY27 product revenue raised to ~$5.84B (from ~$5.66B; +31% guide vs 27%
  // prior guide). Non-GAAP op margin guide 12.5% for FY27.
  // AI: 9,100+ accounts using AI features; Snowflake Intelligence at 2,500
  // accounts (3 months post-launch); Cortex Code at 4,400+ customers.
  // $6B multi-year AWS agreement signed; Natoma (enterprise MCP/AI agent
  // governance platform) acquisition announced. OpenAI partnership deepened.
  // Sridhar Ramaswamy framed the quarter as a "clear inflection point" —
  // SNOW evolving from trusted data foundation into enterprise AI control
  // plane. After-hours spike ~29% (to ~$226), then gave back most of gains
  // in May 28 regular session; closed ~$176. Pre-print thesis validated.
  // ─────────────────────────────────────────────────────────────────────────

  strategicNarrative:
    'Snowflake delivered a milestone Q1 FY27: product revenue $1.33B growing 34% YoY (vs 27% expected), the strongest sequential dollar growth in company history. NRR improved to 126%, $1M+ TTM customers added 46 new members (vs 26 a year ago), and RPO grew 38% YoY to $9.21B — giving forward visibility that underpins the raised $5.84B FY27 product revenue guide. The AI thesis is no longer a bet: 9,100+ accounts use AI features, Snowflake Intelligence reached 2,500 accounts within three months of launch, and Cortex Code is deployed across 4,400+ customers. ' +
    'The $6B multi-year AWS agreement is the most strategically significant disclosure. AWS\'s Redshift was supposed to compete for the same workloads; instead AWS signed a multi-year $6B commitment, signaling the AI data workload pull is large enough to make hyperscalers expand the partnership rather than fight it. The deepened OpenAI partnership extends Cortex AI capability across the enterprise base. The Natoma acquisition (MCP-based AI agent governance platform) positions SNOW at the governance layer of the agentic enterprise — the control plane thesis is now backed by product, partnership, and M&A. ' +
    'The Burry problem is severe and structural: SBC of $1.6B was 34% of FY26 revenue ($4.684B), declining from 41% in FY24 (CEO targets 27% FY27) but still Tragic tier. GAAP net loss was -$1.33B in FY26. FCF of ~$1.07B is nominally positive but almost entirely driven by SBC addback; real owner free cash flow is near breakeven. Buybacks (~$700M est. FY26 under the $2.5B authorization) cover less than half of SBC. Zero buyback offset for owner economics. ' +
    'Competitive risk remains: Databricks aggressively expands into structured data/warehouse with Delta Sharing + Apache Iceberg; Google BigQuery competes hard on price; and hyperscaler-native data tools offer free migration incentives. The $6B AWS deal addresses one flank but Databricks remains the sharpest challenge. ' +
    'Bear (~20%): Databricks + hyperscaler competition erodes SNOW pricing power; revenue decelerates to high-teens by FY29; multiple compresses 88× → 18× on normalization; 5yr target ~$70 (~-14%/yr from $176). ' +
    'Base (~50%): AI-driven data consumption sustains 24-26% EPS CAGR; SBC falls from 34% → 20% of revenue as top line outgrows comp; FCF margin expands to 32%; multiple compresses 88× → 30× through earnings growth; 5yr target ~$190 (~+1.5%/yr — fair value with minimal margin of safety at $176 entry). ' +
    'Bull (~30%): Intelligence + Cortex + Natoma + Iceberg = enterprise AI control plane; RPO doubles to $18B; NRR reaches 130%+; SBC ratio falls below 15%; multiple holds premium 44×; 5yr target ~$320 (~+13%/yr). ' +
    'HOLD — Q1 FY27 validates the AI inflection thesis operationally, but at $176 / 88× FY27E non-GAAP EPS with GAAP losses and SBC at 34% of revenue (Tragic Burry tier), the base case barely generates positive returns. Reported FCF materially overstates owner economics. Wait for a pullback below $145 where base case offers real margin of safety.',

  analystConsensus: { rating: 'Buy', targetLow: 140, targetMedian: 225, targetHigh: 350, numAnalysts: 36 },

  revGrowth: [
    [0.18, 0.15, 0.13, 0.11, 0.09], // Bear: Databricks + hyperscaler competition erodes growth to high-teens
    [0.28, 0.25, 0.22, 0.18, 0.15], // Base: AI-driven data consumption sustained; gradual normalization
    [0.34, 0.30, 0.26, 0.22, 0.18], // Bull: AI agent/data platform supercycle; SNOW = enterprise control plane
  ],

  fcfMargin: [
    [0.20, 0.21, 0.22, 0.22, 0.22], // Bear: competitive pressure limits pricing power; SBC ratio sticky
    [0.25, 0.28, 0.31, 0.33, 0.35], // Base: operating leverage as SBC falls 34% → 20% of revenue
    [0.28, 0.33, 0.38, 0.41, 0.44], // Bull: scale + SBC declining + AI pricing power drives rapid expansion
  ],

  exitMultiple: [18, 28, 42],

  desc: [
    'Databricks expands aggressively into the structured data warehouse with Delta Sharing + Apache Iceberg, eroding SNOW\'s core positioning in mid-market and enterprise. ' +
      'Google BigQuery\'s $0 data-ingress pricing and hyperscaler-native AI integrations make SNOW hard to justify in mixed-cloud environments. Revenue growth decelerates from 34% to high-teens by FY28, then high-single-digits by FY31. ' +
      'FCF margin stalls at 20-22% as competitive pressure limits pricing; SBC ratio stays elevated at 28-30% of slowing revenue. ' +
      'Multiple compresses 88× → 18× as the market reprices SNOW as a decelerating database vendor. 5yr EPS ~$3.87 at 18× exit = ~$70, roughly -14%/yr from $176.',
    'Enterprise data gravity holds: once petabytes of production data live in Snowflake, migration costs (people, time, risk) exceed hyperscaler price advantages. AI consumption via Cortex and Intelligence drives incremental spend above what the core warehouse generates. ' +
      '$6B AWS deal locks in hyperscaler distribution; NRR sustains 125%+ as $1M+ customers deepen platform adoption from warehouse → AI platform. SBC ratio falls from 34% → 20% of revenue over 5 years, delivering real operating leverage. ' +
      'Non-GAAP EPS compounds at ~26% from $2.00 base. Multiple compresses 88× → 30× through earnings growth. 5yr target ~$190, roughly +1.5%/yr — fair value with minimal margin of safety at $176.',
    'Snowflake becomes the enterprise AI control plane: Intelligence handles enterprise UX, Cortex executes AI workflows, Natoma governs AI agents, Iceberg provides the open storage layer. ' +
      'RPO doubles to $18B by FY29; NRR accelerates to 132%; $1M+ customers reach 1,200+. AWS $6B deal seeds $15B+ in total hyperscaler AI-data partnerships. SBC ratio falls below 15% as revenue sustains 30%+ compound; GAAP profitability arrives by FY30. ' +
      'Multiple holds premium 44× as the market awards SNOW the AI enterprise infrastructure label. 5yr EPS ~$7.36 at 44× exit = ~$324, roughly +13%/yr from $176.',
  ],

  thesis: [
    'The AI consumption risk re-emerges from a different angle: enterprises build LLM-native query layers directly over Databricks lakehouses using Delta Sharing + Apache Iceberg, bypassing the proprietary Snowflake storage format. ' +
      'Databricks exploits open-standard positioning to win net-new enterprise data stack deals. Google BigQuery\'s $0 data ingress and native Vertex AI integration make SNOW a harder sell in GCP shops; Redshift Serverless competes in AWS accounts despite the $6B partnership. ' +
      'Revenue growth decelerates faster than the market models. SBC ratio stays sticky at 25-30% of slowing revenue — the CEO\'s 27% FY27 target is missed as headcount is maintained to defend growth. ' +
      'Multiple compression from 88× to 18× is severe as the market accepts SNOW as a mature database vendor, not an AI platform. At current prices, this scenario delivers -14%/yr over 5 years.',
    'Enterprise data gravity is a real moat: the cost of migrating petabytes of production data, rewriting SQL, retraining teams, and losing Snowflake\'s data collaboration features (Data Sharing, Marketplace) exceeds hyperscaler price advantages for most enterprises. ' +
      'AI consumption drives incremental workload expansion: Cortex inference and Snowflake Intelligence queries monetize existing data without requiring new ingestion, extending LTV per customer. ' +
      '$6B AWS deal confirms SNOW\'s multi-cloud neutral positioning is commercially valued — enterprises prefer a data layer that doesn\'t preference any one hyperscaler. $1M+ customer expansion accelerating (46 new in Q1 vs 26 a year ago) signals the high-end enterprise base is still growing. ' +
      'SBC ratio declining ~7pp/year (41% → 34% → 27% target) creates real operating leverage as the top line outgrows comp. Base case is a quality platform at fair value, not cheap, at the $176 entry.',
    'The enterprise AI control plane thesis plays out in full: Snowflake is positioned at the intersection of every major enterprise AI investment theme — data infrastructure for training/RAG/retrieval context, inference execution via Cortex, AI workflow UX via Intelligence, and AI agent governance via Natoma (MCP platform acquired May 2026). ' +
      '$6B AWS commitment is the opening move of a hyperscaler-distribution flywheel — Azure and GCP must follow with similar multi-year commitments to keep SNOW neutral, expanding the addressable market beyond what any single cloud could offer. ' +
      'RPO of $9.21B growing 38% YoY implies contracted revenue visibility far above the current run-rate; as that RPO converts, it supports the $18B target. NRR accelerates to 132% as $1M+ enterprise customers expand from warehouse → AI platform. ' +
      'SBC ratio below 15% by FY30 as $8B+ revenue outgrows the comp structure; GAAP profitability becomes the investor story. Market awards 44× exit on $7.36 5yr EPS = ~$324 target — +13%/yr from $176.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.20, 0.30, 0.40],
  bullMaOptVal: false,

  epsCagr: [14, 26, 32],
  exitPE: [18, 30, 44],
  prob: [20, 50, 30],

  burry: {
    sbc: 1600,
    gaapNi: -1329,
    buyback: 700,    // Estimated FY26 gross repurchases under $2.5B authorization (Aug 2024); ~44% SBC coverage
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic — GAAP net loss -$1.33B (FY26) while SBC = $1.60B (34% of revenue; CEO roadmap: 41% FY24 → 34% FY26 → 27% FY27 target). FCF nominally ~$1.07B FY26 but SBC addback is the primary driver — owner FCF near breakeven. Buybacks (~$700M est. FY26) cover only ~44% of SBC; net dilution persistent. Q1 FY27 confirmed operational inflection (34% product revenue growth, $6B AWS deal, 9,100+ AI accounts) but GAAP earnings gap remains structural. Framework breaks down for GAAP-loss companies; 100% reflects that reported non-GAAP EPS is disconnected from GAAP reality at this SBC level.',
  },
});
