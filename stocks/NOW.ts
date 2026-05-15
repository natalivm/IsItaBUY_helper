import { defineStock } from './defineStock';

export const NOW = defineStock({
  ticker: 'NOW',
  name: 'ServiceNow',
  sector: 'Enterprise SaaS / Workflow Platform',
  themeColor: '#62D84E',
  currentPrice: 95.07,
  fairPriceRange: '$70 - $150',
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
  updatedOn: '05/15',

  strategicNarrative:
    "ServiceNow has been crushed — down −53% over 1Y, −40% YTD (from a 52w high of $211 to $91), one of the worst large-cap tech drawdowns of the cycle. The crash reflects AI-spending-consolidation fears: enterprises pull SaaS budgets toward Microsoft Copilot / Power Platform bundles, and GenAI threatens to commoditize ITSM workflow tools. " +
    "But the underlying business is still elite: FY25 revenue $13.3B (+21% YoY), LTM $13.96B (+22% YoY) at $94B market cap. GAAP operating margin 14.8% LTM expanded from 5% FY22 → 9% FY23 → 13% FY24 → 15% LTM. Real GAAP profitability that keeps compounding even through the stock crash. " +
    "Workflow + ITSM + Now Assist (GenAI) + Industry Cloud + Workforce platform all driving >25% RPO growth. Deferred revenue +$1B+ per year. Net retention 120%+. Switching costs enormous once NOW becomes the system of record for IT + employee + customer workflows. " +
    "Burry profile is the cleanest in the cited-software cohort: SBC $1,955M FY25 (14.6% of revenue), buybacks $2,610M FY25 = **1.3× SBC coverage**. Diluted shares essentially flat 1,016M (FY21) → 1,030M (LTM). Net dilution is minimal. SBC = 37% of operating cash flow (vs ZS 66%, DDOG 70%, AXON 408%) — meaningfully better than peers. " +
    "Valuation: at $91.18 / ~$94B market cap on $5.06 forward non-GAAP EPS, forward P/E **18×** — a multiple usually reserved for mature SaaS, not 22% growers. Forward P/S 6.7×. EV/Sales 6.5×. Cheapest quality-software valuation we've seen in years. PEG 0.86. " +
    "Analyst median target $144 (+58% upside from $91). Recom 1.35 (Strong Buy). " +
    "Bull (~35%): GenAI fears overblown, growth sustains 20%+ + margin expansion to 22% GAAP operating margin → $150+. Base (~45%): Growth normalizes to 18%, margins to 20%, multiple re-rates to 24× → ~$115. Bear (~20%): SaaS spending consolidates with hyperscaler bundles, growth halves, multiple stays at 18× → $70. " +
    "BUY at $91 — best capital allocation in the Burry-cited cohort + worst valuation drawdown in a decade for the same business. Quality compounder being thrown out with the AI-fear bathwater. Asymmetric setup vs the original $200+ thesis.",

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
    'Enterprise SaaS consolidation pressures NOW pricing power as Microsoft Power Platform + Salesforce + SAP all bundle workflow/automation capabilities. Now Assist gets commoditized by hyperscaler-native GenAI. Growth halves to low-teens. ' +
      'GAAP operating margin expansion stalls at 16-17%. SBC stays elevated at 14-15% of revenue. Buybacks continue but slow on cash flow pressure. ' +
      'Multiple compresses from 53× to 30×. EPS grows at ~14% from $17.50 base. 5yr target ~$680-750, ~-4% to -1% annualized.',
    'NOW continues executing as enterprise platform of choice for IT + employee + customer workflow. Now Assist drives meaningful ARPU expansion. Industry Cloud expansion adds new verticals. ' +
      'Revenue compounds at 18% CAGR. Operating margins expand to 20-22% by FY29. Buybacks continue at $3B+/yr keeping share count flat. ' +
      'EPS compounds at ~22% to $48 by FY30. Multiple compresses 53× → 40× through earnings growth. 5yr target ~$1,000, ~2-3% annualized.',
    'Now Assist + Workforce + Industry Cloud + Customer Service combine into the dominant enterprise AI workflow platform. RPO compounds 25%+. GenAI-native customer agents drive new pricing tiers. ' +
      'Operating leverage compounds: FCF margin to 46%, GAAP operating margin to 25%+. Buyback program accelerates as cash piles up. Share count starts to actually shrink. ' +
      'EPS compounds at 28% to $60 by FY30. Multiple holds 42× given the platform position. 5yr target ~$1,200, ~5-7% annualized.',
  ],

  thesis: [
    'Enterprise SaaS spending consolidates as Microsoft pushes Power Platform + Copilot integration with M365, and Salesforce Agentforce/Data Cloud expands into ITSM territory. NOW\'s premium pricing model gets attacked from above (MSFT bundles) and below (ServiceTitan-style verticals). ' +
      'Now Assist faces commoditization as every SaaS vendor adds GenAI features at minimal cost. Net retention drifts from 120% to 110%. ' +
      'Growth decelerates to 12-14% and the market reprices NOW as a mature SaaS rather than premium platform.',
    'NOW remains the de-facto enterprise workflow platform. Now Assist drives 5-7% net incremental ARR per customer. Industry Cloud expansion to financial services, healthcare, public sector adds another growth vector. ' +
      'Operating margin expansion compounds: 15% → 22% by FY29. Buyback program ($3B+/yr) keeps diluted share count flat or slightly shrinking. ' +
      'Quality enterprise compounder at fair multiple — returns mostly from EPS growth, ~2-3% annualized at $920 entry.',
    'AI workflow super-cycle for the enterprise. NOW becomes the orchestration layer for every Fortune 500 enterprise (autonomous IT ops, autonomous employee experience, autonomous customer service). ' +
      'Now Assist evolves from co-pilot to AI agents that complete entire workflows autonomously. Each AI agent commands its own premium pricing tier. ' +
      'Operating leverage compounds dramatically as GenAI does the work humans used to do. FCF margin to 46%, operating margin to 25%+. Multiple holds premium 42×. ' +
      'EPS compounds at 28%+, delivering 5-7% annualized from current entry.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.30, 0.38, 0.46],
  bullMaOptVal: false,

  epsCagr: [14, 22, 28],
  exitPE: [25, 38, 50],
  prob: [20, 50, 30],

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
