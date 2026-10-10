import { defineStock } from './defineStock';

export const NOW = defineStock({
  ticker: 'NOW',
  name: 'ServiceNow',
  sector: 'Enterprise SaaS / Workflow Platform',
  themeColor: '#62D84E',
  currentPrice: 140.86,
  fairPriceRange: '$72 - $248',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 1030,
  rev25: 13240,          // FY2025 total revenue ≈ $13.2B (approx.; was set to a $14.0B LTM figure); FY26E consensus $16.22B, FY27E $19.26B
  fcfMargin25: 0.35,     // FY2026 FCF margin guide 35% (Q1 2026 was 44%)
  taxRate: 0.20,
  cash: 7906,            // Q1 2026: cash & investments ~$7.906B
  debt: 1491,            // Q1 2026: long-term debt ~$1.491B
  beta: 0.82,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.07,         // FY2026E non-GAAP EPS — stockanalysis consensus (Oct 7 2026; FY27E $5.01, +23%). Prior $4.85 overstated the base (split-adjusted FY26 consensus is ~$4.07).
  rsRating: 97,          // IBD RS per user, 10/10/2026 (was 12) — rebounded ~+40% from the ~$95 AI-fear low
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',

  // Q2 2026 UPDATE (Jul 22, 2026) — first data review since Q1
  // ─────────────────────────────────────────────────────────────────────────
  // Beat the top of guidance. Subscription revenue $3,877M (+24.5%, +23% cc);
  // total revenue $3,987M; cRPO $13.20B. ServiceNow AI crossed $1B ACV.
  // Beat helped by U.S. federal on-prem mix pulled from Q3 into Q2. FY26
  // subscription guide nudged up to $15.76-15.78B (+22.5%, +21% cc). Q3
  // subscription guide $3.975-3.980B (+20.5%, pull-forward headwind).
  // Street: Strong Buy (49), PT $72-248 (median $150); FY26E EPS $4.07 /
  // rev $16.22B, FY27E $5.01 / $19.26B. Stock ~$95 low → $140.86 (~35×
  // FY26E) as AI-disruption fears eased.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Deeply embedded system-of-record for enterprise IT, employee, and customer workflows with genuine switching costs',
    'Net retention above the most durable SaaS benchmarks reflects customers expanding usage organically quarter after quarter',
    'Now Assist GenAI layer can deepen ARPU per customer rather than being displaced, if AI co-pilot adoption accelerates',
    'Best capital allocation in the SaaS cohort — buybacks running well above SBC with nearly flat diluted share count over five years',
    'AI products crossed a billion dollars in contract value, evidence that GenAI is adding to the platform rather than displacing it',
  ],

  risksToBuy: [
    'Microsoft bundling Copilot and Power Platform with M365 at near-zero marginal cost is a real, unresolved commoditization threat',
    'Salesforce Agentforce and SAP expansions directly target the ITSM and workflow automation territory ServiceNow owns',
    'Bear case already has material probability weight — the AI disruption thesis is not a tail risk, it is a live debate',
    'The stock has already rebounded sharply off its AI-fear lows, so the cheap-entry argument has largely played out',
    'Burry flagged SBC overstatement as elevated; reported earnings overstate true owner economics relative to the multiple paid',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 72, targetMedian: 150, targetHigh: 248, numAnalysts: 49 },  // stockanalysis.com, Oct 7 2026

  revGrowth: [
    [0.21, 0.12, 0.11, 0.10, 0.09], // Bear: FY26 ~locked at guide; enterprise SaaS consolidation, growth halves after
    [0.215, 0.18, 0.15, 0.13, 0.12], // Base (+1%/yr revPrem): FY26 ≈ guide (+22.5%), FY27 ≈ consensus $19.3B, normalizes
    [0.225, 0.21, 0.18, 0.16, 0.14], // Bull: Now Assist / agentic AI accelerates platform expansion
  ],

  fcfMargin: [
    [0.32, 0.32, 0.33, 0.33, 0.33], // Bear: margins hold at current
    [0.34, 0.36, 0.37, 0.38, 0.39], // Base: gradual operating leverage from scale + GenAI efficiency
    [0.36, 0.39, 0.42, 0.44, 0.46], // Bull: GenAI-driven productivity + premium pricing
  ],

  exitMultiple: [22, 32, 42],

  desc: [
    'Enterprise SaaS consolidation pressures NOW pricing power as Microsoft Power Platform + Salesforce + SAP all bundle workflow/automation capabilities. Now Assist gets commoditized by hyperscaler-native GenAI — the live AI-disruption risk that crushed the stock. Growth halves to high-single-digits. ' +
      'GAAP operating margin expansion stalls. SBC stays elevated at ~14% of revenue. Buybacks continue but slow on cash-flow pressure. ' +
      'Multiple compresses to ~15×. EPS grows only ~6% from the $4.07 FY26E base. 5yr target {target} ({cagr} annualized).',
    'NOW continues executing as enterprise platform of choice for IT + employee + customer workflow. Now Assist drives meaningful ARPU expansion. Industry Cloud adds verticals — but AI commoditization caps the upside vs the pre-crash thesis. ' +
      'Revenue compounds mid-teens. Operating margins expand gradually. Buybacks at ~$3B/yr keep share count roughly flat. ' +
      'EPS compounds ~15% from $4.07 (FY27E +23%, then mid-teens) at a ~22× exit. 5yr target {target} ({cagr} annualized) — after the rebound to ~35× FY26E, fair value rather than cheap.',
    'Now Assist + Workforce + Industry Cloud + Customer Service combine into the dominant enterprise AI workflow platform; the May 2026 Analyst Day vision ($30–32B 2030 subscription, Rule of 60+) plays out. GenAI-native agents drive new pricing tiers. ' +
      'Operating leverage compounds; buyback program accelerates and share count shrinks. ' +
      'EPS compounds ~20% at a ~26× exit (tempered for AI risk vs the old 42× framing). 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Enterprise SaaS spending consolidates as Microsoft pushes Power Platform + Copilot integration with M365, and Salesforce Agentforce/Data Cloud expands into ITSM territory. NOW\'s premium pricing model gets attacked from above (MSFT bundles) and below (ServiceTitan-style verticals). ' +
      'Now Assist faces commoditization as every SaaS vendor adds GenAI features at minimal cost. Net retention drifts from 120% to 110%. ' +
      'Growth halves to high-single-digits and the market keeps NOW de-rated as a mature SaaS rather than a premium platform. ~30% probability — weighted above consensus because AI commoditization is unresolved.',
    'NOW remains the de-facto enterprise workflow platform. Now Assist drives 5-7% net incremental ARR per customer. Industry Cloud expansion to financial services, healthcare, public sector adds another growth vector. ' +
      'Operating margin expansion compounds. Buyback program (~$3B/yr) keeps diluted share count flat or slightly shrinking. ' +
      'Quality enterprise compounder — ~15% EPS CAGR at a ~22× exit gives {cagr} annualized from {spot}; the ~$95 AI-fear entry is gone.',
    'AI workflow super-cycle for the enterprise — the May 2026 Analyst Day vision. NOW becomes the orchestration layer for Fortune 500 autonomous IT/employee/customer workflows. ' +
      'Now Assist evolves from co-pilot to agents that complete entire workflows autonomously, each commanding its own pricing tier. ' +
      'Operating leverage compounds; buybacks accelerate and share count shrinks. ' +
      'EPS compounds ~20% at a tempered ~26× exit — {target}, {cagr} annualized from {spot}.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.30, 0.38, 0.46],
  bullMaOptVal: false,

  epsCagr: [6, 15, 20],   // Q2 2026: base 12→15, bull 18→20 (FY27E EPS +23%)
  exitPE: [15, 22, 26],   // Was [13, 17, 18], set at the ~$95 AI-fear low (~20× P/E); market now pays ~35× — base assumes compression to 22×
  prob: [30, 45, 25],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.02],
    },
    {
      revPrem: [0.015, 0.015, 0.01, 0.01, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  debtSafety: {
    netDebt: -6415,        // Q1 2026: $1.49B debt − $7.91B cash & investments (not refreshed for Q2)
    ebitda: 5500,          // FY26E: non-GAAP op margin ~31% × $16.2B + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash. The balance-sheet question is SBC, not leverage (and buybacks cover it ~2×).',
  },

  burry: {
    sbc: 1976,
    gaapNi: 1748,
    buyback: 4500,
    epsBasis: 'NON_GAAP',
    fy: "LTM Q1'26",
    overstatementPct: 35,
    overstatementSource: 'estimated',
    note: "Critical per Burry — explicitly cited in Cassandra Unchained list. But uniquely among Burry-cited names, NOW has a GENUINE and now-stronger buyback offset: LTM Q1'26 SBC ~$1,976M (Q1'26 $494M annualized, ~14.2% of revenue) vs LTM gross buybacks ~$4,500M (FY25 $2,610M + Q1'26 ~$2B ASR + Q4'25 $597M, less Q1'25) = ~2.3× coverage, up from FY25's 1.3×. Board added a fresh $5B authorization in Jan 2026. Diluted share count essentially flat: 1,015.84M (FY21) → 1,044.95M (LTM) = +2.9% over 5 years (~+0.6%/yr) vs +24-34% for PLTR/AXON. GAAP NI ~$1,748M LTM (GAAP suppressed by SBC; non-GAAP economics far higher). The 35% estimate already credits the buyback offset; with coverage now ~2.3× and dilution still ~nil, an OK-tier (sub-30%) read is defensible — revisit if the $5B authorization is exercised as expected. NOW deserves to be ranked separately from the broken-SBC-cohort cybersecurity names.",
  },
});
