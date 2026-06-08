import { defineStock } from './defineStock';

export const SOFI = defineStock({
  updatedOn: '06/05',
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 16.03,
  fairPriceRange: '$13 - $48',
  shares0: 1279,
  rev25: 3600,
  fcfMargin25: 0.347,
  taxRate: 0.15,
  cash: 3270,
  debt: 3294,
  beta: 1.80,
  costDebt: 0.055,
  rsRating: 37,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Cyclical growth fintech-bank (Type B) with fee-based platform optionality. 2025 actual: Revenue $3.6B (+38% YoY), Adj EBITDA $1.1B (+58%, 31% margin), EPS $0.39. Management guides 2026 revenue ~$4.66B (+30%), EBITDA 34% margin, EPS ~$0.60. Medium-term: revenue CAGR ≥30% and EPS CAGR 38-42% through 2028. Fee-based mix now 44% ($1.8B annualized). Weak moat — lending is commodity, switching costs low, brand awareness only ~9.6%. Exposed to credit cycle (NCO ~2.80%, tolerance 7-8%) and cost of capital. RS 34 = weak institutional demand. Optionality on stablecoin (SoFi USD), crypto rails, business banking (2026 launch). Probability-weighted expected CAGR ~8.5%. Probability of 15%+: ~30-40%. Not a compounder — execution + cycle bet with upside from fee-based platform scaling. ",

  reasonsToBuy: [
    'Fee-based technology platform revenue now approaching half of total, reducing dependence on cyclical lending income',
    'Galileo and Technisio power payments infrastructure for thousands of fintechs, creating a durable B2B revenue base',
    'Bank charter lowers cost of deposits, a structural funding advantage over non-bank fintech competitors',
    'Stablecoin and crypto rail optionality could open an entirely new revenue vertical if regulatory clarity arrives',
    'EPS CAGR guidance through mid-decade implies rapidly accelerating earnings power from a still-small base',
  ],

  risksToBuy: [
    'Lending is a commodity business — SoFi has limited pricing power and thin switching-cost barriers against banks and credit unions',
    'Credit cycle deterioration could push net charge-offs well above tolerance, forcing reserve builds that crush earnings',
    'Brand awareness remains low relative to incumbent banks, making customer acquisition expensive and growth capital-intensive',
    'Weak institutional demand and low RS rating signal the market is not yet convinced the earnings trajectory is durable',
    'Rising cost of capital in a higher-for-longer rate environment squeezes net interest margin on the lending book',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 18, targetMedian: 26, targetHigh: 38, numAnalysts: 15 },
  revGrowth: [
    [0.20, 0.15, 0.10, 0.05, 0.03],
    [0.29, 0.30, 0.30, 0.12, 0.08],
    [0.32, 0.33, 0.32, 0.18, 0.12],
  ],
  fcfMargin: [
    [0.26, 0.25, 0.24, 0.23, 0.22],
    [0.34, 0.34, 0.35, 0.36, 0.37],
    [0.36, 0.37, 0.38, 0.40, 0.42],
  ],
  exitMultiple: [12, 16, 20],
  ebitdaProxy: [0.22, 0.34, 0.40],
  desc: [
    'Credit cycle deterioration + P/E compression to bank-like levels: EPS 2030 ~$0.90-1.10, exit P/E 12-15x. Target ~$13.50. Prob ~20%.',
    'Meets lower-bound guidance (38% EPS CAGR to 2028), then normalizes 15%. EPS 2030 ~$1.36, exit P/E 18-22x. Target ~$27. Prob ~50%.',
    'Executes 42% EPS CAGR to 2028 + fee/crypto optionality materializes. EPS 2030 ~$1.60, P/E 28-30x. Target ~$48. Prob ~30%.',
  ],

  bullMaOptVal: 19 * 1279 * 0.07,
});
