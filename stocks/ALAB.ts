import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  updatedOn: '04/20',
  currentPrice: 175.8,
  fairPriceRange: '$100 - $260',
  shares0: 169,
  rev25: 1345,
  fcfMargin25: 0.288,
  taxRate: 0.12,
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 1.84,
  rsRating: 75,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Astera is building the connectivity control plane for AI scale-up — not GPUs, not memory, but the fabric layer between them. " +
    "$6.5B Amazon warrant + Scorpio X (2027 volume ramp) + protocol-agnostic positioning (UALink + NVLink Fusion) make the bull case structural, not just cyclical. " +
    "The problem: revenue decelerating fast (85% 3Y CAGR → +8% by 2028E), margins peak 2029E then compress, and at ~53x forward P/E the market already prices the optimistic path. " +
    "If Scorpio X becomes standard in 2–3 hyperscalers, this transitions from cycle play to architectural moat (type B → A). If not, it's another AI silicon story with a semiconductor downturn ahead. " +
    "35–40% probability of 15%+ CAGR — a tactical bet on AI infrastructure positioning, not a compounder.",


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
});
