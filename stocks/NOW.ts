import { defineStock } from './defineStock';

export const NOW = defineStock({
  ticker: 'NOW',
  name: 'ServiceNow',
  sector: 'Enterprise SaaS / Workflow Platform',
  themeColor: '#62D84E',
  currentPrice: 95.07,
  fairPriceRange: '$85 - $185',
  shares0: 1030,
  rev25: 14000,          // LTM total revenue after Q1 2026 ($3.8B Q1, +22% YoY)
  fcfMargin25: 0.35,     // FY2026 FCF margin guide 35% (Q1 2026 was 44%)
  taxRate: 0.20,
  cash: 7906,            // Q1 2026: cash & investments ~$7.906B
  debt: 1491,            // Q1 2026: long-term debt ~$1.491B
  beta: 0.82,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.85,         // FY2026 non-GAAP EPS estimate (Q1 2026 $0.97, +20% YoY)
  rsRating: 18,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '05/16',
  lastReportTag: 'Q1 2026',

  strategicNarrative:
    "The stock has been cut in half — down ~53% in a year, from $211 to the low $90s — and the reason is one big fear: that AI lets Microsoft and others bundle workflow tools for free and commoditize what ServiceNow sells. That fear is doing the pricing here, not the fundamentals. " +
    "Because the fundamentals didn't break. Q1 2026 actually accelerated: revenue +22%, subscription +19%, FCF margin 44%, and management raised the full-year guide. Net retention is still north of 120%, and once NOW becomes the system of record for a company's IT, employee and customer workflows, ripping it out is genuinely hard. This is still a high-quality, sticky, growing business. " +
    "Capital allocation is the cleanest part of the story — and it matters here because Burry explicitly flagged NOW on his Cassandra Unchained list. At a ~0.65 coefficient it lands in his 'real-earnings haircut' zone, where the rule is to discount the multiple for inflated reported earnings. But NOW is the rare name that earns a pass: it buys back ~2.3× what it pays out in stock comp, diluted share count has barely moved in five years (+0.6%/yr vs +24–34% for PLTR/AXON), and a fresh $5B authorization landed in January. The 35% haircut already credits that offset; an OK-tier read is defensible, and NOW deserves to be ranked apart from the broken-SBC cohort. " +
    "So you're paying ~20× forward earnings for a 20%+ grower with great economics — historically cheap for this business. The honest catch: the de-rating isn't pure panic. Whether GenAI commoditizes ITSM is a real, unresolved question, and May's Analyst Day bull case ($30B+ 2030 subscription, Rule of 60) is management talking up a beaten-down stock, so we lean more cautious than consensus. " +
    "Net: a BUY, but a tempered one. The base case (~$150 in 5 years, near the analyst median) is a quality compounder at a fair price; the bear case (AI eats the moat, ~$90) is live enough that we weight it at 30%. Best capital allocation in the cohort and a decade-worst valuation for the same company — just not the slam-dunk it would have been without the AI overhang.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 75, targetMedian: 144, targetHigh: 180, numAnalysts: 40 },

  revGrowth: [
    [0.13, 0.12, 0.11, 0.10, 0.09], // Bear: enterprise SaaS consolidation, growth halves
    [0.19, 0.17, 0.15, 0.13, 0.12], // Base: continued execution, normalizes
    [0.23, 0.21, 0.18, 0.16, 0.14], // Bull: Now Assist GenAI inflection accelerates platform expansion
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
      'Multiple stays compressed ~13×. EPS grows only ~6% from the $4.85 base to ~$6.5 by FY30. 5yr target ~$85, roughly flat-to-down (~-2%/yr).',
    'NOW continues executing as enterprise platform of choice for IT + employee + customer workflow. Now Assist drives meaningful ARPU expansion. Industry Cloud adds verticals — but AI commoditization caps the upside vs the pre-crash thesis. ' +
      'Revenue compounds mid-teens. Operating margins expand gradually. Buybacks at ~$3B/yr keep share count roughly flat. ' +
      'EPS compounds at ~12% to ~$8.9 by FY30 at a ~17× exit. 5yr target ~$150 (~+10%/yr, near the analyst median).',
    'Now Assist + Workforce + Industry Cloud + Customer Service combine into the dominant enterprise AI workflow platform; the May 2026 Analyst Day vision ($30–32B 2030 subscription, Rule of 60+) plays out. GenAI-native agents drive new pricing tiers. ' +
      'Operating leverage compounds; buyback program accelerates and share count shrinks. ' +
      'EPS compounds at ~18% to ~$11.6 by FY30 at a tempered ~18× exit (trimmed for AI risk vs the old 42× framing). 5yr target ~$208 (~+17%/yr).',
  ],

  thesis: [
    'Enterprise SaaS spending consolidates as Microsoft pushes Power Platform + Copilot integration with M365, and Salesforce Agentforce/Data Cloud expands into ITSM territory. NOW\'s premium pricing model gets attacked from above (MSFT bundles) and below (ServiceTitan-style verticals). ' +
      'Now Assist faces commoditization as every SaaS vendor adds GenAI features at minimal cost. Net retention drifts from 120% to 110%. ' +
      'Growth halves to high-single-digits and the market keeps NOW de-rated as a mature SaaS rather than a premium platform. ~30% probability — weighted above consensus because AI commoditization is unresolved.',
    'NOW remains the de-facto enterprise workflow platform. Now Assist drives 5-7% net incremental ARR per customer. Industry Cloud expansion to financial services, healthcare, public sector adds another growth vector. ' +
      'Operating margin expansion compounds. Buyback program (~$3B/yr) keeps diluted share count flat or slightly shrinking. ' +
      'Quality enterprise compounder at a fair multiple — ~12% EPS CAGR at a ~17× exit, ~+10%/yr from the ~$95 entry.',
    'AI workflow super-cycle for the enterprise — the May 2026 Analyst Day vision. NOW becomes the orchestration layer for Fortune 500 autonomous IT/employee/customer workflows. ' +
      'Now Assist evolves from co-pilot to agents that complete entire workflows autonomously, each commanding its own pricing tier. ' +
      'Operating leverage compounds; buybacks accelerate and share count shrinks. ' +
      'EPS compounds ~18% at a tempered ~18× exit (trimmed from the old 42× for AI risk), ~+17%/yr from the ~$95 entry.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.30, 0.38, 0.46],
  bullMaOptVal: false,

  epsCagr: [6, 12, 18],
  exitPE: [13, 17, 18],
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
