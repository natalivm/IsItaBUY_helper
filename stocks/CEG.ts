import { defineStock } from './defineStock';

export const CEG = defineStock({
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '07/24',
  lastReportTag: 'Q1 2026',
  currentPrice: 274.35,
  fairPriceRange: '$200 - $540',
  shares0: 358,
  rev25: 25200,
  fcfMargin25: 0.051,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,
  beta: 1.83,
  costDebt: 0.0525,
  modelType: 'EPS_PE',
  baseEps: 11.50,
  rsRating: 17,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'America\'s largest clean-firm nuclear fleet uniquely positioned to meet AI data center around-the-clock power demand',
    'Management guidance of strong base EPS growth through the decade is underpinned by long-term contracted generation',
    'Calpine acquisition adds gas-fleet optionality and substantially expands the total megawatt footprint at accretive economics',
    'PJM colocation precedents and FERC regulatory progress are unlocking hyperscaler power purchase agreements',
    'Nuclear scarcity premium is durable — new build timelines are measured in decades, not years',
  ],

  risksToBuy: [
    'ERCOT forward pricing weakness and merchant power exposure mean earnings are partly cyclical, not purely contracted',
    'Calpine lockup expiration creates near-term share overhang and potential selling pressure',
    'Nuclear infrastructure requires substantial ongoing capex, limiting near-term free cash flow conversion',
    'Capacity price sustainability depends on PJM market design remaining supportive — regulatory changes are a real risk',
    'Altman Z and debt metrics reflect the capital-intensive nature of the business, which scores poorly on traditional leverage screens',
  ],

  epsCagr: [8, 15, 22],
  exitPE: [16, 22, 27],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 347, targetMedian: 403, targetHigh: 462, numAnalysts: 14 },
  revGrowth: [
    [0.05, 0.04, 0.04, 0.04, 0.03],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.18, 0.16, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    [0.040, 0.045, 0.050, 0.055, 0.060],
    [0.055, 0.062, 0.070, 0.075, 0.080],
    [0.065, 0.075, 0.085, 0.095, 0.105],
  ],
  exitMultiple: [13, 17, 21],
  desc: [
    'PJM regulatory clarity arrives slower than promised and customer pauses extend. ERCOT forward weakness persists through 2028. Calpine integration friction and capacity-price normalization from elevated 2025 levels compress merchant margins. EPS growth lands at ~8% — below the >20% base-case management framework. Market reprices to 16× as cyclicality reasserts.',
    'Management hits the guided framework: FY26 lands in the $11–$12 range, Calpine delivers ~$2/sh of accretion, PJM backstop framework finalizes per the June FERC submission timeline. Powered-land deals close at Crane (CIR transfer approved for 2027 credit) and at additional sites in PJM and ERCOT. Capacity prices stabilize at structurally higher levels but do not surge further. EPS compounds at ~15% — short of the >20% base case but well above utility peers. P/E settles at 22× reflecting durable premium clean-firm status.',
    'Full execution on all levers — Byron/Braidwood uprates plus Calvert/Limerick path, Crane on 2027 capacity timeline, multiple hyperscaler PPAs across PJM and ERCOT, optionality on additional uprates, gas-fleet utilization rises with around-the-clock demand. Nuclear PTC inflation gearing kicks in. FCF before growth reaches the high end of the $11.5–13B 2028–29 range, funding aggressive buybacks and dividend at 10%/yr. EPS compounds at 22%+; business reclassifies as contracted infrastructure compounder at 27×.',
  ],

  bbRate: [0.01, 0.018, 0.030],

  burry: {
    sbc: 50,
    gaapNi: 3791,
    buyback: 335,
    epsBasis: 'NON_GAAP',
    fy: 'LTM Q1 26',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC is immaterial for a large-scale power-generation platform. LTM GAAP NI $3.79B on $29.87B revenue (12.7% net margin, 26.6% EBITDA margin). 5-year diluted share count is flat-to-down (329M → 324M, -1.5%) — virtually no dilution, very different from the SBC-heavy growth-software cohort. $5B buyback authorization with $335M (1.2M shares @ ~$285 avg) executed in early Q2 26 after the business update. Naive SBC/NI is near zero; even applying a 4× MTM amplifier for the post-spin rerating (~5× since 2022 spin) keeps the estimate well inside the Pristine band. The Burry framework barely registers here — CEG is a real-asset infrastructure compounder where the debate is power-pricing durability, nuclear-scarcity premium, and Calpine integration, not accounting quality.',
  },
  debtSafety: {
    netDebt: 15400,
    ebitda: 7500,
    capexToOcf: 0.38,
    interestCoverage: 7.0,
    altmanZ: 2.6,
    fy: 'LTM Q1 26',
    note: 'Nuclear infrastructure is inherently CapEx-heavy and utilities score low on Altman Z (a metric calibrated for manufacturers). Strong interest coverage (7×) from long-term contracted generation reflects genuine financial strength. RED tier reflects framework mismatch more than distress — same structural caveat as VST.',
  },
});
