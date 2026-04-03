import { defineStock } from './defineStock';

export const JPM = defineStock({
  updatedOn: '08/03',
  ticker: 'JPM',
  name: 'JPMorgan Chase & Co.',
  sector: 'Diversified Banking',
  themeColor: '#065f46',
  currentPrice: 297,
  fairPriceRange: '$250 - $555',
  shares0: 2674,
  rev25: 182400,
  fcfMargin25: 0.30,
  taxRate: 0.21,
  cash: 30000,
  debt: 400000,
  beta: 1.10,
  costDebt: 0.045,
  baseEps: 21.9,
  modelType: 'EPS_PE',
  rsRating: 51,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "D+ quality financial ecosystem compounder — best bank in the world, but still a bank. " +
    "2025 actual: Revenue $182B, Net income $56B, EPS $20.02. Forward: EPS 2026E $21.9 → 2030E $29.8 (~7-8% CAGR). " +
    "CFO confirmed through-cycle ROTCE ≈ 17% (sometimes 20%+, sometimes below) — this caps long-term EPS growth at 7-9%. " +
    "Incremental investments may yield ~14% ROE (below 17%), rational vs buybacks at 3x TBV but ROE won't expand. " +
    "Structural tailwinds: markets wallet structurally larger post-COVID (more volatility, derivatives, hedging, financing); " +
    "payments ($12T daily) + custody ($4.8T AUM) = stable but mid-single-digit growth. Private credit target $50B (ecosystem defense, not mega growth). " +
    "AI: ~400 CIB projects, ~40% cost reduction in some ops, but 'cannot charge clients for AI advantage' — margin support, not revenue explosion. " +
    "Tech spend $19.8B (+10% YoY), partly defensive. Card charge-offs ~3.4%, credit clean but late-cycle stress expected in private credit. " +
    "Dimon: 'asset prices high increases risk, my anxiety is high.' Capital markets cycle (M&A boom possible but not guaranteed) is main upside catalyst. " +
    "RS 51 falling, below 50MA. Prob 15%+ CAGR: ~20-25%. Realistic total return: earnings 7-9% + dividends/buybacks 3-4% = 10-13% long-term ceiling without multiple expansion.",

  analystConsensus: { rating: 'Buy', targetLow: 220, targetMedian: 300, targetHigh: 380, numAnalysts: 20 },
  revGrowth: [
    [0.03, 0.02, 0.02, 0.01, 0.01],
    [0.05, 0.05, 0.04, 0.04, 0.03],
    [0.08, 0.07, 0.06, 0.05, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.24, 0.23, 0.22, 0.21],
    [0.30, 0.30, 0.30, 0.30, 0.30],
    [0.32, 0.33, 0.33, 0.34, 0.34],
  ],
  exitMultiple: [8, 11, 14],
  desc: [
    'Rates fall, credit cycle turns (private credit stress spreads broader), markets revenue declines. ' +
      'Through-cycle ROTCE drops below 17%. EPS CAGR ~3%, EPS 2031 ~$25, exit P/E 10x. Target ~$250. Return ~-3% CAGR. ' +
      'Dimon warning materialized: high asset prices + late-cycle stress compress earnings and multiple simultaneously.',
    'Through-cycle ROTCE holds at ~17% as confirmed by CFO. EPS CAGR ~8% from mid-single-digit revenue growth, ' +
      'stable ~30% margins, buyback boost ~3%. Markets wallet structurally larger but M&A/IPO cycles normalize, not boom. ' +
      'AI delivers margin support (~40% cost reduction in select ops) but no revenue uplift. ' +
      'EPS 2031 ~$32, exit P/E 13x. Target ~$416. Total return ~10-11% (7.5% price + dividends). Solid but below 15%.',
    'Simultaneous M&A boom + IPO cycle + elevated volatility + private credit expansion + aggressive buybacks. ' +
      'Sponsor exit pipeline ($40-50B organic capital deployment) fully activates. Markets revenue stays structurally elevated. ' +
      'EPS CAGR ~11%, EPS 2031 ~$37, exit P/E 15x. Target ~$555. Return ~14% CAGR. ' +
      'Requires sustained macro tailwinds — cycle peak scenario, not new normal.',
  ],

  epsCagr: [3, 8, 11],
  exitPE: [10, 13, 15],
  prob: [20, 55, 25],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.35, 0.46, 0.50],
});
