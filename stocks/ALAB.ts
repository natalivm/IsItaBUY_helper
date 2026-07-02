import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  updatedOn: '07/02',
  currentPrice: 406.42,
  fairPriceRange: '$100 - $260',
  shares0: 169,
  rev25: 1345,
  fcfMargin25: 0.288,
  taxRate: 0.12,
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 1.84,
  rsRating: 98,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Scorpio X positions Astera as the fabric layer between GPUs and memory — a critical choke point in AI scale-up clusters.',
    'Amazon warrant and strategic partnership provide deep hyperscaler validation and near-term revenue visibility.',
    'Protocol-agnostic design (UALink, NVLink Fusion, CXL) means Astera benefits regardless of which interconnect standard wins.',
    'Elite gross margins and a rapidly scaling FCF base give the business genuine financial quality beneath the growth story.',
  ],

  risksToBuy: [
    'Revenue growth is decelerating sharply from hypergrowth toward single digits, compressing the multiple over time.',
    'Hyperscalers could internalize connectivity solutions, eliminating the need for a dedicated fabric vendor.',
    'Concentrated customer risk — the Amazon warrant is both the bull case and the ceiling if other hyperscalers don\'t adopt.',
    'Extraordinary share dilution from post-IPO RSU vesting is running well ahead of any buyback offset.',
    'Valuation already prices the optimistic path, leaving little margin of safety if Scorpio X ramp disappoints.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 80, targetMedian: 192, targetHigh: 225, numAnalysts: 16 },
  revGrowth: [
    [0.25, 0.10, 0.02, -0.08, -0.15],
    [0.37, 0.27, 0.10, 0.05, -0.05],
    [0.42, 0.35, 0.20, 0.12, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.29, 0.32, 0.35, 0.37, 0.38],
    [0.30, 0.34, 0.38, 0.42, 0.44],
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'The AI capex cycle peaks early and a semiconductor downturn hits by 2028. Scorpio X is delayed or displaced by competing solutions from NVLink and ESUN. ' +
      'Hyperscalers begin internalizing their connectivity, and the operating expense step-up compresses margins without generating payback. ' +
      'Operating leverage works in reverse with earnings falling 30-40%, and the multiple compresses to 20x as the growth premium evaporates.',
    'AI infrastructure spending sustains at moderate levels through 2028. Scorpio X ramps on schedule in 2027 with two to three hyperscaler customers. ' +
      'UALink adoption provides meaningful protocol diversification, and operating margins expand to around 45%. ' +
      'Revenue growth decelerates naturally from the high-30s toward single digits as the business matures. ' +
      'Earnings compound at roughly 27% annually, though from current valuation the stock return is more modest at 7-8% annualized.',
    'The AI supercycle extends and Scorpio X becomes the standard scale-up switching layer across major hyperscalers. ' +
      'Optical products ramp in 2028 and UALink adoption accelerates broadly. The company transitions from a cyclical play to an architectural infrastructure layer. ' +
      'Operating margins reach 50% as multi-protocol optionality across CXL, UALink, and NVLink Fusion captures an expanding market. ' +
      'Earnings grow at roughly 35% annually, delivering 17-18% annualized stock returns.',
  ],
  thesis: [
    'AI scale-up protocol shifts away from merchant silicon. NVLink/ESUN displaces PCIe/CXL path. ' +
      'Hyperscalers build internal connectivity (like Google TPU interconnect). ' +
      'Aggressive OpEx step-up eats into margins during cycle downturn. ' +
      '$6.5B Amazon warrant is a ceiling, not a floor — concentrated customer risk. ' +
      'RS 60 reflects market scepticism. Semiconductor cycle hits 2028-2029.',
    'Amazon warrant secures strategic position. Scorpio X ramp validates scale-up switching TAM. ' +
      'PCIe 6 first-to-volume advantage holds. Software-defined fabric creates stickiness. ' +
      'AI capex sustains but growth decelerates naturally. EBIT margin expansion to 45% offsets revenue slowdown. ' +
      'Company remains cyclical growth (type B) with improving moat. RS stays mediocre but fundamentals deliver.',
    'Scorpio X + optical + UALink = triple growth engine. Company becomes the architectural connectivity layer ' +
      'for AI scale-up infrastructure. 2-3 hyperscaler adoption creates switching costs approaching SaaS levels. ' +
      'TAM expansion from $25B to $50B+ with optical. Moat transitions from technical to structural. ' +
      'Type B → Type A reclassification. Market cap re-rates as "AI fabric infrastructure platform".',
  ],

  epsCagr: [15, 27, 35],
  exitPE: [20, 30, 35],
  prob: [30, 40, 30],

  bbRate: [0.002, 0.008, 0.015],
  ebitdaProxy: [0.25, 0.40, 0.50],
  bullMaOptVal: false,

  burry: {
    sbc: 167,
    gaapNi: 170,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 75,
    overstatementSource: 'estimated',
    note: 'Tragic — TIKR FY25 actuals: SBC $167M (16.6% of revenue — high), buybacks $0, recently turned GAAP-profitable (operating margin 22% LTM, +20pp swing from -29% FY24). The good news: elite 76% gross margins, 132% 3y revenue CAGR, FCF $343M ($176M after SBC adjustment). The bad news: post-IPO RSU wave is ongoing — diluted shares 131M (FY24) → 180M (FY26 LTM) = +37% in one year. Zero buyback offset. SBC = 49% of reported FCF (true owner FCF is half headline). 4y MTM at extreme high end (~5× since IPO grants) breaks the formula. 75% estimate reflects: recent profitability inflection (better than pure broken-SaaS), but elite-tier dilution velocity (worse than typical Critical). Watch the share-count trajectory — if dilution slows in FY27 as IPO vesting completes, ALAB could reclassify down to Critical 50%.',
  },
});
