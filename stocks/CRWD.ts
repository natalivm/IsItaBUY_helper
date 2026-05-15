import { defineStock } from './defineStock';

export const CRWD = defineStock({
  ticker: 'CRWD',
  name: 'CrowdStrike Holdings',
  sector: 'Cybersecurity / Endpoint Security',
  themeColor: '#e33535',
  currentPrice: 594.08,
  fairPriceRange: '$320 - $900',
  shares0: 252,
  rev25: 4810,
  fcfMargin25: 0.258,
  taxRate: 0.15,
  cash: 3800,
  debt: 750,
  beta: 1.15,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 4.84,
  rsRating: 22,
  rsTrend: 'falling',
  ratingOverride: 'BUY',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "FY26 (ended Jan 2026) is the inflection: ARR $5.25B (+24% YoY), Net New ARR re-accelerating to $1.01B (first $1B+ year, Q4 $331M +47% YoY). " +
    "Q4 turned GAAP-profitable ($38.7M NI), FY26 FCF $1.24B at ~26% margin, Rule of 40 = 47 — elite SaaS economics. " +
    "Platform moat compounding: 50% of customers run 6+ modules, 34% run 7+, 24% run 8+. Next-Gen SIEM +75%, Cloud +35%, Identity +34% YoY extend the growth runway. " +
    "FY27 guide: ARR $6.47–6.52B (+23–24%), revenue $5.87–5.93B, non-GAAP EPS $4.78–4.90 — durable, not decaying. " +
    "Valuation reality at $526 / ~$133B mkt cap: forward P/S ~22×, EV/ARR ~20×, FCF yield <1%, FY27 P/E ~109× — pricing CRWD as 'the cybersecurity OS of the AI era,' a high bar. " +
    "Operationally cleaner than PANW (faster growth) and on par with ZS, but PANW/FTNT offer better margin of safety today. " +
    "Multiple-compression is the dominant risk: if growth steps from 24% → 18% and P/S re-rates 22× → 14×, the stock can drop ~30% while revenue still grows. " +
    "FY26 GAAP NI still -$162M and SBC ~$1.1B (~22% of revenue) keeps Burry coefficient negative until earnings convert. " +
    "Quality compounder transitioning out of story-stock phase, but no margin of safety at current price. BUY rating maintained for phased entry; full size below $400. " +
    "Burry full-SBC adjustment (estimated): 100% overstatement (Tragic) — real owner economics ~0% of GAAP after MTM dilution; non-GAAP optics flatter the picture significantly.",

  updatedOn: '05/15',

  analystConsensus: { rating: 'Buy', targetLow: 353, targetMedian: 524, targetHigh: 640, numAnalysts: 40 },

  revGrowth: [
    [0.15, 0.12, 0.10, 0.08, 0.08], // Bear: enterprise budget cuts, growth halves
    [0.22, 0.19, 0.17, 0.15, 0.13], // Base: FY26E guide executes, natural deceleration
    [0.25, 0.24, 0.22, 0.20, 0.18], // Bull: sustained platform expansion, new modules
  ],

  fcfMargin: [
    [0.28, 0.28, 0.27, 0.27, 0.26], // Bear: margin stalls, growth investment continues
    [0.35, 0.37, 0.38, 0.39, 0.40], // Base: operating leverage drives FCF expansion
    [0.37, 0.39, 0.41, 0.43, 0.45], // Bull: scale economics, 30%+ EBIT margin
  ],

  exitMultiple: [18, 24, 30],

  desc: [
    'Growth decelerates from 24% → 12-15% as enterprise cybersecurity budgets tighten and Microsoft/PANW pressure intensifies. EBIT margin stalls at 22-24% — operating leverage disappears without top-line acceleration. ' +
      'Forward P/S re-rates from 22× toward 12-14×, P/E compresses from ~109× to 35×. EPS reaches $9-10 by FY30. 5yr price ~$320, roughly -3% to 0% annual return — multiple compression overwhelms revenue growth.',
    'Revenue compounds at ~17% with EBIT margin expanding to 28-30%. Platform consolidation (endpoint → XDR → cloud → identity) drives net dollar retention above 120%. ' +
      'EPS reaches ~$12 by FY30. P/E compresses naturally from 80x to 45x through earnings growth. 5yr price ~$540, ~6-7% CAGR.',
    'Cybersecurity supercycle — AI threat acceleration drives structural budget increases. CrowdStrike wins consolidation as platform of choice. Revenue sustains 20%+ growth, ' +
      'EBIT margin reaches 30%+. EPS reaches $14-15 by FY30. Market maintains premium at 60x P/E. 5yr price ~$900, ~18-20% CAGR.',
  ],

  thesis: [
    'Enterprise budget cuts + competition from Microsoft/Palo Alto erode growth. July 2024 outage residual trust issues persist. ' +
      'At 80x P/E, any execution miss triggers severe multiple compression. Revenue growth halves to 10%, margin expansion stalls.',
    'Cybersecurity is a structural necessity — 78% gross margin confirms pricing power and moat. Platform expansion drives ' +
      'land-and-expand with 120%+ NDR. EBIT margin trajectory from 21% → 30% validates operating leverage thesis.',
    'AI threat landscape accelerates cybersecurity spend structurally above GDP growth. CrowdStrike becomes the consolidation winner ' +
      'in endpoint + XDR + cloud security. FCF compounds at 30%+ enabling M&A optionality and buyback initiation.',
  ],

  termGrowth: [0.015, 0.025, 0.03],

  epsCagr: [15, 22, 28],
  exitPE: [35, 45, 60],
  prob: [25, 45, 30],

  bbRate: [0.00, 0.005, 0.01],
  ebitdaProxy: [0.25, 0.32, 0.38],
  bullMaOptVal: false,

  burry: {
    sbc: 1097,
    gaapNi: -162,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Burry explicitly cites CRWD. TIKR LTM actuals: SBC $1,097M (22.8% of revenue — extreme), GAAP NI -$162M (loss), buybacks $0. The most damning single number: SBC = 83.7% of reported FCF. Headline FCF $1.31B drops to TRUE OWNER FCF of just $213M once you treat SBC as the real cash cost it is — a 6× distortion. Diluted shares +15% over 5 years (218M → 251M), zero buyback offset, so all dilution lands on shareholders directly. Loss-making stocks like CRWD break the overstatement % math; the 100% label is a placeholder meaning real owner economics are deeply negative.',
  },
});
