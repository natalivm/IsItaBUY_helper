import { defineStock } from './defineStock';

export const CRWD = defineStock({
  ticker: 'CRWD',
  name: 'CrowdStrike Holdings',
  sector: 'Cybersecurity / Endpoint Security',
  themeColor: '#e33535',
  currentPrice: 399,
  fairPriceRange: '$320 - $900',
  shares0: 248,
  rev25: 3950,
  fcfMargin25: 0.268,
  taxRate: 0.15,
  cash: 3800,
  debt: 750,
  beta: 1.15,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 3.93,
  rsRating: 23,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "CrowdStrike is a structural compounder in cybersecurity — high switching costs, endpoint + XDR ecosystem lock-in, and AI-native threat detection create a durable moat with 78% gross margins. " +
    "EBIT margin expanding from 21% → 30%E shows strong operating leverage on ~27% 3yr revenue CAGR. " +
    "The problem: at ~109x forward P/E you're paying for flawless execution with zero margin of safety. RS recovering from 19 to 34 but still weak — not yet a momentum phase. " +
    "Need 25-27% FCF CAGR for 15%+ annual returns; historically achieved but harder from a larger base. " +
    "If growth decelerates to 10-15%, operating leverage vanishes and multiple compression could deliver -30-40% drawdown. " +
    "Prob-weighted CAGR ~8-9% — quality business at a premium price. Wait for entry near $280-320 or next growth acceleration cycle.",

  updatedOn: '07/03',

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
    'Growth decelerates to 10-12% as enterprise cybersecurity budgets tighten. EBIT margin stalls at 22-24% — operating leverage disappears without top-line acceleration. ' +
      'P/E compresses from 80x to 35x as market re-rates from growth to value. EPS reaches $9-10 by FY30. 5yr price ~$320, roughly -3% to 0% annual return.',
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
});
