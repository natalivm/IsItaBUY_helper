import { defineStock } from './defineStock';

export const SNOW = defineStock({
  ticker: 'SNOW',
  name: 'Snowflake',
  sector: 'Cloud Data Platform / AI Analytics',
  themeColor: '#29B5E8',
  currentPrice: 368.89,
  fairPriceRange: '$110 - $525',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 344,           // 343.9M shares outstanding at Jan 31, 2026 (10-K)
  rev25: 4684,            // FY26 total revenue ($4.684B, ended Jan 31, 2026); FY27E consensus $6.32B (+35%), FY28E $8.10B (+28%)
  fcfMargin25: 0.23,      // TTM FCF margin ~23% (P/FCF 51.93 at $175.26 pre-earnings)
  taxRate: 0.20,
  cash: 4030,             // Cash $2,828M + short-term investments $1,202M (10-K, Jan 31, 2026)
  debt: 2645,             // Long-term debt / convertible notes (MacroTrends, Q3 FY26)
  beta: 1.15,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 2.22,          // FY27E non-GAAP EPS — stockanalysis consensus (Oct 7 2026; FY28E $3.01, +36%). Q2 FY27 raised FY27 product revenue to $6.07B and op margin to 14.5%. Earlier (post-Q1): Q1 actuals $0.39 vs $0.32 (+22% beat). FY27 guided $5.84B product revenue + 13.5% non-GAAP op margin (raised from 12.5%); at ~20% non-GAAP tax + ~$180M interest income on $4B liquid ÷ ~348M diluted shares ≈ $2.20 full year.
  rsRating: 98,          // IBD RS per user, 10/10/2026 (was 72)
  rsTrend: 'rising',      // +24% post-Q1, +23% post-Q2; ~$218 (late May) → ~$369
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q2 FY27',
  dataReviewedOn: '2026-10-10',

  // Q2 FY27 EARNINGS (Sep 2, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Third straight quarter of acceleration. Revenue $1.55B (+35%); product
  // revenue $1.49B (+37%). NRR 126%. $1M+ customers 828 (+27%). AI: CoCo
  // >9,100 accounts, CoWork 5,800. GUIDE RAISED: FY27 product revenue $6.07B
  // (from $5.84B; +36% vs +31%), non-GAAP op margin 14.5% (from 13.5%; gross
  // margin guided down to fund AI). Q3 product revenue $1.588-1.593B
  // (+37-38%). Stock +23% on the print. Street: Buy (52), PT $110-525
  // (median $443.50); FY27E EPS $2.22 / rev $6.32B, FY28E $3.01 / $8.10B.
  // Stock $369 — ~166× FY27E non-GAAP EPS.
  // ─────────────────────────────────────────────────────────────────────────

  // Q1 FY27 EARNINGS (May 27, 2026 AMC)
  // ─────────────────────────────────────────────────────────────────────────
  // Product revenue $1.33B (+34% YoY) — strongest sequential dollar growth
  // in company history, vs 27% consensus; total revenue $1.391B (+33% YoY,
  // vs $1.32B est). Non-GAAP EPS $0.39 vs $0.32 est (+22% beat). NRR 126%
  // (up from 125%). $1M+ TTM customers: 779 (+29% YoY); 46 added in Q1 vs
  // 26 a year ago — acceleration at the high end. RPO $9.21B (+38% YoY).
  // FY27 product revenue raised to ~$5.84B (from ~$5.66B; +31% guide vs 27%
  // prior guide). Non-GAAP op margin guidance raised to 13.5% (from 12.5%).
  // Q2 FY27 product revenue guided $1.415-$1.42B (+30% YoY).
  // AI: 9,100+ accounts using AI features; Snowflake Intelligence at 2,500
  // accounts (3 months post-launch); Cortex Code at 4,400+ customers.
  // Total customers 13,912; net new +616 (+38% YoY in net adds).
  // $6B multi-year AWS agreement signed; Natoma (enterprise MCP/AI agent
  // governance platform) acquisition announced. OpenAI partnership deepened.
  // Stock +24% post-earnings to ~$218 (settled from ~$226 after-hours peak).
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Enterprise data gravity makes migration away from Snowflake prohibitively expensive for petabyte-scale customers',
    'A major multi-year AWS agreement signals hyperscalers are expanding the partnership rather than competing against it',
    'AI product adoption accelerating — Snowflake Intelligence, Cortex Code, and Natoma governance platform all showing rapid uptake',
    'RPO growing well ahead of revenue, providing exceptional multi-year forward visibility and contracted backlog',
    'NRR inflecting higher with large-customer additions accelerating, signaling the enterprise expansion motion is intact',
  ],

  risksToBuy: [
    'SBC remains a catastrophically large share of revenue — reported FCF is almost entirely a non-cash addback illusion',
    'Databricks aggressively expanding into structured data with open-standard positioning that undercuts Snowflake\'s proprietary format',
    'At current valuation the base case falls short of today\'s price — there is no margin of safety',
    'Google BigQuery and hyperscaler-native data tools offer free migration incentives that are increasingly hard to resist',
    'GAAP losses are structural at current SBC levels, meaning real owner economics are far worse than headline metrics suggest',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 110, targetMedian: 443.5, targetHigh: 525, numAnalysts: 52 },  // stockanalysis.com, Oct 7 2026

  revGrowth: [
    [0.32, 0.15, 0.13, 0.11, 0.09], // Bear: FY27 ~locked by H1 + Q3 guide; Databricks + hyperscaler competition erodes growth after
    [0.35, 0.28, 0.22, 0.18, 0.15], // Base: FY27/FY28 ≈ consensus $6.32B / $8.10B; gradual normalization
    [0.37, 0.32, 0.26, 0.22, 0.18], // Bull: AI agent/data platform supercycle; SNOW = enterprise control plane
  ],

  fcfMargin: [
    [0.20, 0.21, 0.22, 0.22, 0.22], // Bear: competitive pressure limits pricing power; SBC ratio sticky
    [0.25, 0.28, 0.31, 0.33, 0.35], // Base: operating leverage as SBC falls 34% → 20% of revenue
    [0.28, 0.33, 0.38, 0.41, 0.44], // Bull: scale + SBC declining + AI pricing power drives rapid expansion
  ],

  exitMultiple: [18, 28, 42],

  desc: [
    'Databricks expands aggressively into the structured data warehouse with Delta Sharing + Apache Iceberg, eroding SNOW\'s core positioning in mid-market and enterprise. ' +
      'Google BigQuery\'s $0 data-ingress pricing and hyperscaler-native AI integrations make SNOW hard to justify in mixed-cloud environments. Revenue growth decelerates from ~35% to high-teens by FY29, then high-single-digits by FY31. ' +
      'FCF margin stalls at 20-22% as competitive pressure limits pricing; SBC ratio stays elevated at 28-30% of slowing revenue. ' +
      'Multiple compresses ~166× → 18× as the market reprices SNOW as a decelerating database vendor. EPS compounds ~14% from the $2.22 FY27E base. 5yr target {target} ({cagr} annualized).',
    'Enterprise data gravity holds: once petabytes of production data live in Snowflake, migration costs (people, time, risk) exceed hyperscaler price advantages. AI consumption via Cortex and Intelligence drives incremental spend above what the core warehouse generates. ' +
      '$6B AWS deal locks in hyperscaler distribution; NRR sustains 125%+ as $1M+ customers deepen platform adoption from warehouse → AI platform. SBC ratio falls from 34% → 20% of revenue over 5 years, delivering real operating leverage. ' +
      'Non-GAAP EPS compounds at ~26% from the $2.22 base. Multiple compresses ~166× → 30× through earnings growth. 5yr target {target} ({cagr} annualized) — after the run to {spot}, the base case no longer covers the price.',
    'Snowflake becomes the enterprise AI control plane: Intelligence handles enterprise UX, Cortex executes AI workflows, Natoma governs AI agents, Iceberg provides the open storage layer. ' +
      'RPO doubles to $18B by FY29; NRR accelerates to 132%; $1M+ customers reach 1,200+. AWS $6B deal seeds $15B+ in total hyperscaler AI-data partnerships. SBC ratio falls below 15% as revenue sustains 30%+ compound; GAAP profitability arrives by FY30. ' +
      'Multiple holds premium 44× as the market awards SNOW the AI enterprise infrastructure label. EPS compounds ~32% from $2.22. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'The AI consumption risk re-emerges from a different angle: enterprises build LLM-native query layers directly over Databricks lakehouses using Delta Sharing + Apache Iceberg, bypassing the proprietary Snowflake storage format. ' +
      'Databricks exploits open-standard positioning to win net-new enterprise data stack deals. Google BigQuery\'s $0 data ingress and native Vertex AI integration make SNOW a harder sell in GCP shops; Redshift Serverless competes in AWS accounts despite the $6B partnership. ' +
      'Revenue growth decelerates faster than the market models. SBC ratio stays sticky at 25-30% of slowing revenue — the CEO\'s 27% FY27 target is missed as headcount is maintained to defend growth. ' +
      'Multiple compression from ~166× to 18× is severe as the market accepts SNOW as a mature database vendor, not an AI platform. At {spot}, this scenario delivers {cagr} annualized.',
    'Enterprise data gravity is a real moat: the cost of migrating petabytes of production data, rewriting SQL, retraining teams, and losing Snowflake\'s data collaboration features (Data Sharing, Marketplace) exceeds hyperscaler price advantages for most enterprises. ' +
      'AI consumption drives incremental workload expansion: Cortex inference and Snowflake Intelligence queries monetize existing data without requiring new ingestion, extending LTV per customer. ' +
      '$6B AWS deal confirms SNOW\'s multi-cloud neutral positioning is commercially valued — enterprises prefer a data layer that doesn\'t preference any one hyperscaler. $1M+ customer expansion accelerating (46 new in Q1 vs 26 a year ago) signals the high-end enterprise base is still growing. ' +
      'SBC ratio declining ~7pp/year (41% → 34% → 27% target) creates real operating leverage as the top line outgrows comp. At {spot} (~166× FY27E EPS) the base case returns {cagr} annualized — quality platform, priced beyond the base case.',
    'The enterprise AI control plane thesis plays out in full: Snowflake is positioned at the intersection of every major enterprise AI investment theme — data infrastructure for training/RAG/retrieval context, inference execution via Cortex, AI workflow UX via Intelligence, and AI agent governance via Natoma (MCP platform, May 2026). ' +
      '$6B AWS commitment is the opening move of a hyperscaler-distribution flywheel — Azure and GCP must follow with similar multi-year commitments to keep SNOW neutral, expanding the addressable market beyond what any single cloud could offer. ' +
      'RPO of $9.21B growing 38% YoY implies contracted revenue visibility far above the current run-rate; as that RPO converts, it supports the $18B target. NRR accelerates to 132% as $1M+ enterprise customers expand from warehouse → AI platform. ' +
      'SBC ratio below 15% by FY30 as $8B+ revenue outgrows the comp structure; GAAP profitability becomes the investor story. Market awards 44× exit — 5yr target {target}, {cagr} annualized from {spot}.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.20, 0.30, 0.40],
  bullMaOptVal: false,

  epsCagr: [14, 26, 32],
  exitPE: [18, 30, 44],
  prob: [20, 50, 30],

  debtSafety: {
    netDebt: -1385,        // $2.645B converts − $4.03B cash & ST investments (Jan 31 2026; not refreshed)
    ebitda: 1000,          // FY27E: non-GAAP op margin 14.5% × ~$6.3B + D&A — approximate
    fy: 'FY27E',
    note: 'GREEN by Step 1 — net cash. The balance-sheet issue is SBC dilution (Tragic Burry tier), not leverage.',
  },

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
