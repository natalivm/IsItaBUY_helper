import { defineStock } from './defineStock';

export const CRWD = defineStock({
  ticker: 'CRWD',
  name: 'CrowdStrike Holdings',
  sector: 'Cybersecurity / Endpoint Security',
  themeColor: '#e33535',
  currentPrice: 768.95,
  fairPriceRange: '$340 - $1,000',
  shares0: 252,
  rev25: 4810,
  fcfMargin25: 0.32,
  taxRate: 0.15,
  cash: 3800,
  debt: 750,
  beta: 1.15,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 4.92,
  rsRating: 50,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Q1 FY27 (ended Apr 2026): first GAAP-profitable quarter in company history — NI +$27.8M vs -$104.3M prior year, as operating leverage decisively overtakes SBC. " +
    "Revenue $1.39B (+26% YoY), ARR $5.51B (+24% YoY), record Q1 net new ARR $256M (+32%) — re-accelerating above FY26's exit pace while broader SaaS decelerates. " +
    "FCF $468M at 33.7% margin (record Q1; FY26 full-year was 25.8%) — the leverage inflection is real and accelerating. Non-GAAP EPS $1.10 beat $0.88 estimate by 25%. " +
    "FY27 full-year guidance raised: revenue $5.91–5.96B (+23%), non-GAAP EPS $4.88–4.96, NNArr growth +520bps to 27.7% midpoint — structural acceleration while peers decelerate. " +
    "Board approved 4-for-1 stock split (record June 25, trading July 2, 2026). Platform moat: 50%+ customers at 6+ modules; identity (+34%), SIEM (+75%), cloud (+35%) each sustaining strong growth. " +
    "Valuation reality at $769 close / est. ~$823 AH (+7%): EV/ARR ~36×, FY27 P/E ~160× non-GAAP — exceptional beat, but multiples already price perfection. Prob-weighted 5yr model target ~$650. " +
    "Multiple compression remains the dominant risk: 26% growth decelerating to 15% with P/S re-rating 31× → 14× reprices the stock -40–50% while revenue still grows. " +
    "GAAP profitable for the first time but SBC ~$1.1B annually (FY26 basis, ~22% of revenue) — true owner FCF remains distorted until SBC/revenue falls further. " +
    "HOLD — no new entry at current levels; revisit below $550.",

  updatedOn: '06/03',
  lastReportTag: 'Q1 FY27',

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
  prob: [20, 45, 35],

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
    note: 'Burry explicitly cites CRWD. FY26 actuals (basis for this block): SBC $1,097M (22.8% of revenue — extreme), GAAP NI -$162M (loss), buybacks $0. Headline FCF $1.31B drops to TRUE OWNER FCF ~$213M treating SBC as real cost — a 6× distortion. Diluted shares +15% over 5 years (218M → 252M), zero buyback offset. Q1 FY27 UPDATE: GAAP NI turned positive (+$27.8M) for the first time — operating leverage is breaking through. Full FY27 SBC data needed before the Burry block can be updated; 100% overstatement is a placeholder until then.',
  },
});
