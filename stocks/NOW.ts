import { defineStock } from './defineStock';

export const NOW = defineStock({
  ticker: 'NOW',
  name: 'ServiceNow',
  sector: 'Enterprise SaaS / Workflow Platform',
  themeColor: '#62D84E',
  currentPrice: 95.07,
  fairPriceRange: '$85 - $185',
  shares0: 1030,
  rev25: 13960,
  fcfMargin25: 0.34,
  taxRate: 0.20,
  cash: 5180,
  debt: 1500,
  beta: 0.82,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 5.06,
  rsRating: 18,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '05/16',

  strategicNarrative:
    "ServiceNow has been crushed — down −53% over 1Y, −40% YTD (from a 52w high of $211 to $91), one of the worst large-cap tech drawdowns of the cycle. The crash reflects AI-spending-consolidation fears: enterprises pull SaaS budgets toward Microsoft Copilot / Power Platform bundles, and GenAI threatens to commoditize ITSM workflow tools. " +
    "But the underlying business is still elite: FY25 revenue $13.3B (+21% YoY), LTM $13.96B (+22% YoY) at $94B market cap. GAAP operating margin 14.8% LTM expanded from 5% FY22 → 9% FY23 → 13% FY24 → 15% LTM. Real GAAP profitability that keeps compounding even through the stock crash. " +
    "Workflow + ITSM + Now Assist (GenAI) + Industry Cloud + Workforce platform all driving >25% RPO growth. Deferred revenue +$1B+ per year. Net retention 120%+. Switching costs enormous once NOW becomes the system of record for IT + employee + customer workflows. " +
    "Burry profile is the cleanest in the cited-software cohort: SBC $1,955M FY25 (14.6% of revenue), buybacks $2,610M FY25 = **1.3× SBC coverage**. Diluted shares essentially flat 1,016M (FY21) → 1,030M (LTM). Net dilution is minimal. SBC = 37% of operating cash flow (vs ZS 66%, DDOG 70%, AXON 408%) — meaningfully better than peers. " +
    "Valuation: at ~$95 / ~$98B market cap on $5.06 forward non-GAAP EPS, forward P/E **~19×** — a multiple usually reserved for mature SaaS, not a mid-teens grower. Forward P/S ~7×. PEG ~1.4 on a tempered ~12% EPS CAGR. Still the cheapest quality-software valuation in years, but the de-rating is the market pricing real AI-disruption risk, not pure overreaction. " +
    "Analyst median target $144 (~+51% from $95). Recom Strong Buy. The May 2026 Analyst Day reaffirmed the bull case (AI as tailwind, $30–32B 2030 subscription target, Rule of 60+, SBC to sub-10% by 2029) — but that is management talking its book into a beaten-down stock, so we weight the bear more heavily than consensus does. " +
    "Bull (~25%): GenAI fears overblown, growth holds high-teens + margin expansion, multiple re-rates → ~$200 5yr (~+17%/yr). Base (~45%): growth normalizes to mid-teens, multiple ~17×, ~$150 5yr (~+10%/yr, near analyst median). Bear (~30%): hyperscaler bundles + GenAI commoditize ITSM, growth halves, multiple stays compressed → ~$90 5yr (flat-to-down). " +
    "BUY-leaning at ~$95 — best capital allocation in the Burry-cited cohort + a decade-worst valuation drawdown for the same business. But AI commoditization is a genuine, unresolved forward risk, so this is a tempered BUY, not the original $200+ slam-dunk thesis.",

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
      'Multiple stays compressed ~13×. EPS grows only ~6% from the $5.06 base to ~$6.8 by FY30. 5yr target ~$90, roughly flat-to-down (~-1%/yr).',
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
    sbc: 1955,
    gaapNi: 1760,
    buyback: 2610,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 35,
    overstatementSource: 'estimated',
    note: 'Critical per Burry — explicitly cited in Cassandra Unchained list. But uniquely among Burry-cited names, NOW has GENUINE buyback offset: FY25 buybacks $2,610M > SBC $1,955M = 1.33× coverage. Diluted share count nearly flat (1,016M FY21 → 1,030M LTM = +1.4% over 5 years vs +24-34% for PLTR/AXON). SBC/CFO of 37% is materially better than ZS/DDOG/AXON (66-408%). GAAP NI $1.76B LTM, operating margin 14.8% and rising. The 35% estimate reflects: high absolute SBC ($2B/yr) and 14.6% of revenue (still elevated for mature SaaS), partially offset by aggressive buybacks and genuine operating leverage. NOW deserves to be ranked separately from the broken-SBC-cohort cybersecurity names — and at $91 the valuation finally reflects this.',
  },
});
