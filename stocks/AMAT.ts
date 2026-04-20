import { defineStock } from './defineStock';

export const AMAT = defineStock({
  ticker: 'AMAT',
  name: 'Applied Materials, Inc.',
  sector: 'Semiconductor Equipment · Deposition & Etch',
  themeColor: '#1a5f7a',
  updatedOn: '04/20',
  currentPrice: 391.62,
  fairPriceRange: '$210 - $750',
  shares0: 800,           // ~800M diluted shares (market cap ~$293B / $366)
  rev25: 28370,           // FY25 revenue $28.37B
  fcfMargin25: 0.20,      // FCF $5.7B / rev $28.37B ≈ 20%
  taxRate: 0.12,
  cash: 6500,
  debt: 5000,
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 11.09,         // FY26E consensus (TIKR); Q1 actual $2.38 + Q2 guide $2.64 mid + "2H stronger"
  rsRating: 95,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "AMAT is the largest semiconductor equipment company by revenue — dominant in CVD, PVD, ALD, and etch with 49% gross margins and an AGS services segment (~25% of revenue) that is genuinely recurring: 2/3 under multi-year contracts (~2.9yr avg), ~90% renewal rate, growing 12-15% YoY. " +
    "Q1 FY26: $2.38 EPS actual; Q2 guided $2.64 mid. Equipment segment growing >20% in CY2026 (2H-weighted), momentum into 2027. Equipment GM ~54% disclosed separately. " +
    "TIKR consensus EPS trajectory: $11.09 (2026E) → $13.78 (2027E) → $15.38 (2028E) → $18.84 (2029E) → $21.02 (2030E). This is a wave-like supercycle, not a one-year spike. " +
    "But the market already prices the full trajectory — implied P/E compresses from 33x (2026) → 27x → 24x → 19.6x → 17.6x (2030). EPS grows, multiple falls. " +
    "Probability-weighted 5-year return: ~6-7% CAGR. For 12% CAGR, you need the base case to work AND P/E to hold at 30x — or you need to buy at $270-290. " +
    "Probability of 15%+ CAGR from $366: ~30-35%. Strong business, full price. Best entry on cycle reset below $300.",

  epsCagr: [4, 11, 17],
  exitPE: [17, 23, 29],
  prob: [30, 45, 25],


  analystConsensus: { rating: 'Buy', targetLow: 380, targetMedian: 428, targetHigh: 470, numAnalysts: 27 },
  revGrowth: [
    [0.04, 0.02, 0.03, 0.04, 0.04],  // bear: cycle breaks early, ICAPS/NAND drag
    [0.12, 0.11, 0.09, 0.08, 0.07],  // base: CY26-27 strong, normalization after
    [0.20, 0.18, 0.15, 0.13, 0.11],  // bull: AI supercycle, cleanroom capacity added
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19],  // bear: capex drag persists, margin pressure
    [0.19, 0.20, 0.21, 0.22, 0.22],  // base: FCF rebounds 2027-28 as EPIC normalizes
    [0.21, 0.23, 0.24, 0.25, 0.26],  // bull: volume leverage + services attach
  ],
  exitMultiple: [14, 21, 27],
  desc: [
    'The WFE cycle breaks ahead of schedule — capex digestion arrives before FY27, NAND stays sub-10% of WFE, and China mix (30% of revenue) drags margins without offsetting volume. ' +
      'FY26 EPS lands near ~$10.2 (Q2 at the guidance floor of $2.44, Q3 ~$2.60, Q4 ~$2.75). ' +
      'EPS grows at only 4% annually from this base; the multiple reverts toward 17x as cycle visibility shrinks. ' +
      'Stress-test: $11.09 × 18x = ~$200. At P/E 20, even the bear EPS path gives ~$210. Roughly -7% to -10% annualized from $366.',
    'The next two years play out as management guided — equipment revenue grows over 20% (back-half loaded), and the services business keeps compounding at 12–13% per year with 90% of customers renewing. ' +
      'FY26 EPS lands around $10.80 per share. FY27 jumps 24% to ~$13.78, then growth gradually slows: ~$15.38 in 2028, ~$21 by 2030. ' +
      'The problem: the stock already reflects all of this. Today you pay 33× this year\'s earnings, and by 2030 the market would only pay ~23× — the valuation steadily shrinks even as earnings grow. ' +
      'Earnings compound at ~11% per year, but the shrinking multiple eats into returns. Net result: ~5–6% annual return. Earnings grow to ~$18.70 by 2030, at 23× that\'s a ~$430 stock — decent but not exciting from $348.',
    'AI supercycle extends to 2028-2029: GAA at 2nm and below, HBM memory buildout, and advanced packaging (CoWoS, 3D-IC) all require disproportionately more AMAT deposition and etch steps per wafer. ' +
      'FY26 EPS lands ~$11.4 (Q2 at $2.84 guidance top, Q3 ~$2.95, Q4 ~$3.20 — a clear exit-rate into FY27). ' +
      'FY27 run-rate implies $14+ EPS; with +10% expansion FY27 hits $14-14.5. Cleanroom constraints get solved, AGS attaches at 30%+ of revenue. ' +
      'EPS compounds at 17% from FY26 base with a 29x exit multiple — stock returns approach 12-16% annualized. The only scenario that clears the 15% hurdle.',
  ],

  thesis: [
    'Bear mechanics: capex cycles historically run 2-3 strong years before digestion. ICAPS already flat, NAND sub-10% of WFE. ' +
      'Physical constraints cited on the Q1 call (cleanroom, supply chain, service engineers) can become bottlenecks that limit upside AND become magnified on the downside. ' +
      'EPIC capacity capex compresses near-term FCF — if the cycle softens before FCF recovers, the setup deteriorates fast. ' +
      'Multiple sensitivity dominates: at P/E 20 (historical zone), bear EPS ~$13 → price ~$260 (-29%); at P/E 18 → ~$230 (-37%). ' +
      'No macro shock needed — a normal WFE pause is sufficient to deliver -30% to -45% from current valuation.',
    'Post Q1\'26, the base case has more concrete support: equipment >20% CY2026, 2H-weighted, momentum into 2027 per management. ' +
      'TIKR consensus: FY26E $11.09, FY27E $13.78 (+24%), FY28E $15.38 (+12%), FY29E $18.84 (+22%), FY30E $21.02 (+12%). A wave-cycle, not a spike. ' +
      'AGS is a genuine recurring anchor: 2/3 under contract, ~2.9yr avg duration, ~90% renewal, growing 12-15% YoY. ' +
      'The problem: the market already prices this. Implied P/E by year: 33x (2026) → 27x (2027) → 24x (2028) → 19.6x (2029) → 17.6x (2030). ' +
      'EPS grows robustly, but multiple compression offsets returns. Probability-weighted CAGR: ~6-7%. ' +
      'For 12% CAGR in the base case, fair entry is $270-290 (base target $483 / 1.76 ≈ $274).',
    'Bull case requires two things to be true simultaneously: EPS trajectory exceeds consensus AND the multiple holds. ' +
      'Q4\'26 exit-rate ~$3.20 → FY27 run-rate ~$12.8, +10-15% expansion → FY27 $14-14.5 EPS. ' +
      'At 29x exit on $11.09 × (1.17)^5 ≈ $24.3, target price ≈ $705. Around 14-15% CAGR — near the 15% hurdle. ' +
      'For 15%+ CAGR at $366: need either ~20% EPS CAGR (very aggressive for a WFE business) or P/E to stay at 36-37x in 2031 (unlikely). ' +
      'The cleaner path to 15%: enter at $270-290 where the base-case EPS trajectory already gets you there at 23x exit. ' +
      'At $366, this is an AI-cycle bet with limited margin of safety — strong execution at full price.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.28, 0.35, 0.42],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],
});
