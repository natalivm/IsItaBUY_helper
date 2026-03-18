import { defineStock } from './defineStock';

export const TER = defineStock({
  updatedOn: '07/03',
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 325,
  fairPriceRange: '$140 - $200',
  shares0: 157,
  rev25: 3190,
  fcfMargin25: 0.141,
  taxRate: 0.20,
  cash: 900,
  debt: 100,
  beta: 1.45,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 6.25,
  rsRating: 98,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Type B — cyclical growth on AI capex wave, not a structural compounder. CEO conference (post-earnings) was the most candid signal: " +
    "'We're in the middle of a 4-quarter boom (Q3'25→Q2'26) … then there'll be a digestion.' This is textbook semicap mini-cycle language. " +
    "AI raised test intensity structurally (HBM, AI accelerators, networking = expensive/complex/high-power chips → more testers). " +
    "BUT critical insight: ATE growth = derivative of chip revenue GROWTH rate, not revenue. As soon as AI growth slows, ATE spending drops sharply even if AI revenue still grows. " +
    "AI wave broader than mobile boom (data centers + HBM + networking + co-packaged optics + edge AI = longer cycle with multiple waves). " +
    "GPU opportunity: 2026 qualification → 2H26 production → targeting 30% share (3+ year process, currently near-zero vs Advantest dominance). " +
    "HBM: >50% share in stack/performance test, TAM structurally rising (8→12-high stacks, HBM3→HBM4E). " +
    "VIP compute: only 2 hyperscaler ASIC programs at scale = extreme concentration risk. " +
    "Mgmt target model: ATE TAM $12-14B, TER ~$6B rev, EPS $9.5-11, op margin 30-34%. " +
    "Current phase: 'earnings expansion' — typical semicap pattern: earnings explode → investors extrapolate → multiple expands → digestion → correction. " +
    "Amazing business, amazing cycle, expensive stock. Probability of 15%+ CAGR: ~25-30%. Fair entry: $180-$200. Deep cycle buy: $140-$160.",

  epsCagr: [2, 9, 14],
  exitPE: [18, 22, 28],
  prob: [20, 50, 30],

  analystConsensus: { rating: 'Buy', targetLow: 150, targetMedian: 250, targetHigh: 320, numAnalysts: 22 },
  revGrowth: [
    [0.22, 0.05, 0.00, -0.05, 0.03],
    [0.22, 0.15, 0.12, 0.08, 0.07],
    [0.22, 0.20, 0.18, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.09, 0.10],
    [0.14, 0.16, 0.18, 0.19, 0.20],
    [0.16, 0.19, 0.22, 0.24, 0.25],
  ],
  exitMultiple: [12, 18, 24],
  desc: [
    'CEO-confirmed "4-quarter boom → digestion" plays out. 1H26 strong then ATE spending drops as AI chip revenue growth rate decelerates ' +
      '(ATE demand = derivative of growth rate, not revenue level). VIP compute concentration (only 2 ASIC programs at scale) means one socket delay collapses revenue. ' +
      'GPU penetration stalls at low single digits vs Advantest. P/E compresses to 18x. EPS ~$7 by 2030. Target ~$126, CAGR ~-14%.',
    'AI waves (accelerators → HBM → co-packaged optics → edge AI) elongate cycle beyond single 4-quarter boom. Digestion periods shorter and shallower. ' +
      'ATE TAM reaches $10-12B (below mgmt $12-14B target). TER revenue ~$5B. HBM test TAM rises structurally (8→12-high stacks, HBM3→HBM4E). ' +
      'GPU qualification succeeds, initial production revenue 2H26. EPS ~$9.5 by 2030. P/E 22x. Target ~$209, CAGR ~-5%.',
    'Full mgmt target model validates: ATE TAM $12-14B, TER ~$6B revenue, EPS $9.5-11, op margin 30-34%. Multiple AI waves sustain demand. ' +
      'GPU share reaches 30% (3-year ramp from qualification). HBM >50% share compounds as stacks grow. Networking test benefits from 3 main players. ' +
      'EPS ~$12 by 2030. P/E 28x. Target ~$336, CAGR ~4-5%. This is the ceiling — even bull case barely approaches 15% hurdle.',
  ],
  thesis: [
    'CEO himself said: "4-quarter boom then digestion." ATE growth = derivative of chip revenue growth rate — when AI growth slows, ATE drops sharply ' +
      'even if AI revenue still grows. VIP compute = only 2 hyperscaler ASIC programs at scale (extreme concentration). ' +
      'GPU opportunity is 3+ year penetration story against Advantest dominance (currently near-zero share). ' +
      'Forward P/E 43x in "earnings expansion phase" of semicap cycle = classic setup for post-peak correction.',
    'AI raised test intensity structurally: HBM + AI accelerators + networking chips = expensive/complex/high-power → more testers per wafer. ' +
      'Multiple waves (accelerators → memory → co-packaged optics → edge AI) make this longer than mobile boom. ' +
      'HBM test TAM structurally rising (>50% share, stack complexity increasing). GPU qualification in 2026 opens $2B+ addressable market. ' +
      'Operating leverage strong (EBIT 22%→30%+). Cycle elongated but digestion still inevitable.',
    'AI supercycle extends 5+ years with overlapping waves. GPU share ramp hits 30% by 2029 (from near-zero). ' +
      'HBM4/4E + 12-high stacks double memory test TAM. Co-packaged optics creates new test category. ' +
      'Edge AI devices (wave 4) provide demand floor when data center wave matures. ' +
      'Mgmt $6B revenue / $9.5-11 EPS / 30-34% op margin target proves achievable. Even so, from $272 entry only ~4-5% CAGR.',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.25, 0.35],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
