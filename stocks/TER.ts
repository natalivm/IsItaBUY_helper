import { defineStock } from './defineStock';

export const TER = defineStock({
  updatedOn: '07/03',
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 272,
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
    "Type B — cyclical growth on AI capex wave, not a structural compounder. Post-earnings update: Q4 revenue +41% q/q, non-GAAP EPS >100% q/q. Q1'26 guide $1.15-1.25B revenue, EPS $1.89-2.25. " +
    "AI = 40-50% of Q3 revenue → 60%+ Q4 → 70%+ Q1'26E — TER sitting in epicenter of AI capex wave. Mgmt new target model: ATE TAM $12-14B, TER at ~$6B revenue, EPS $9.5-11, operating margin 30-34%. " +
    "BUT mgmt explicitly confirmed cyclicality: sees '2-3 quarter surge' followed by 'shorter period of digestion'. 2H26 visibility weak. Demand more lumpy and less predictable. " +
    "Customer concentration very high: 2 specifying customers >10%, 1 purchasing >10%. VIP compute segment extremely concentrated — one socket can shift a quarter. " +
    "AI makes TER MORE cyclical, not less: shifted from mobile-driven to compute/AI infra-driven = more capital-intensive, burstier cycle. " +
    "Call strengthens bull case quality but simultaneously confirms this is a cycle trade, not a safe compounder. RS 98 = hot phase of cycle, not structural quality signal. " +
    "Expected CAGR ~0-3% base case. Probability of 15%+ CAGR: ~25-35% (up from 20-25% pre-call). Fair entry: $180-$200. Deep cycle buy: $140-$160.",

  epsCagr: [5, 15, 22],
  exitPE: [18, 24, 30],
  prob: [20, 45, 35],

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
    'Mgmt-warned "2-3 quarter surge" plays out exactly — strong 1H26 followed by digestion in 2H26/2027 as hyperscaler AI capex pauses. ' +
      'High customer concentration (2 specifying >10%) means one socket shift collapses a quarter. Revenue turns negative post-surge. ' +
      'EBIT margins compress back to ~22%. P/E compresses to historical semicap trough (18x). EPS ~5% CAGR. Target ~$120, CAGR ~-15%.',
    'AI demand sustains beyond the initial 2-3 quarter surge but growth decelerates. ATE TAM reaches $10-12B (below mgmt $12-14B target). ' +
      'TER revenue approaches $5B (below $6B target). EBIT margin expands to ~28-30% on operating leverage. ' +
      'Digestion periods are shorter and shallower than historical cycles due to structural AI test complexity. ' +
      'EPS ~15% CAGR to ~$10-11 by 2030. P/E compresses from ~43x to ~24x. Target ~$260, CAGR ~0-3%.',
    'AI supercycle extends — mgmt target model validates: ATE TAM $12-14B, TER at ~$6B revenue, EPS $9.5-11, op margin 30-34%. ' +
      'AI mix at 70%+ proves structural, not cyclical. Advanced packaging + HBM + chiplets create test content multiplier. ' +
      'Robotics inflects. GPU share gains accelerate. EPS ~22% CAGR to $15+ by 2030. Target ~$450, CAGR ~10-11%.',
  ],
  thesis: [
    'Mgmt themselves warn of digestion after surge. 2H26 visibility is weak. AI makes TER MORE cyclical (compute/infra = burstier than mobile). ' +
      'Customer concentration extreme — VIP compute segment dominated by 2-3 customers. One socket delay shifts entire quarter. ' +
      'Advantest competition intensifies. Forward P/E 43x offers zero margin of safety. Historical pattern: $4.25 EPS → $3.47 in 3 years.',
    'Q4 +41% q/q revenue and Q1 guide ($1.15-1.25B, EPS $1.89-2.25) validate near-term strength. AI at 60-70% of revenue = real structural demand floor. ' +
      'Test complexity at 3nm/2nm, chiplets, HBM increases content per device. Automotive adds cyclical buffer. ' +
      'Operating leverage drives margin expansion. Digestion periods shorter due to AI structural demand. Cycle elongated but not eliminated.',
    'Full mgmt target model plays out: ATE TAM expands to $12-14B driven by AI chip proliferation, advanced packaging, inference scaling. ' +
      'TER captures ~$6B revenue with 30-34% op margin. AI at 70%+ of revenue proves this is a structural shift, not just a cycle. ' +
      'Universal Robots achieves breakout ($1B+). Memory test (HBM4) and GPU test share gains compound. ' +
      'This is the only scenario approaching 15% hurdle — requires AI capex cycle to extend 5+ years.',
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
