import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 49.92,
  updatedOn: '05/13',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$50 - $139',
  shares0: 114.3,
  rev25: 13200,
  fcfMargin25: 0.020,
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.05,       // 2026E EPS = raised FY26 guide midpoint $2.90-$3.20 (+22% YoY mid; prior guide $2.85-$3.15 / +20% → $3.00). Q1 2026 adj EPS $0.50 (+72% YoY) beat, but part was contract-termination-cost timing shifting into later quarters — anchor to guide midpoint, not annualized Q1.
  rsRating: 83,
  aiImpact: 'TAILWIND',
  // Q1 2026 CALL UPDATE (May 6, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $3.3B (+10.8% YoY; organic +4.1%, every region positive). Adj
  // EBITDA $200M (+22.7%), margin 6.1% (+60bps). GAAP NI just $5M (Wincanton
  // integration/amortization noise) — adj NI $58M (+70.6%), adj diluted EPS
  // $0.50 (+72.4%). Part of the Q1 beat = contract-termination costs that
  // were expected in Q1 now shifting into the rest of the year (timing).
  // OCF $31M; FCF -$31M (normal Q1 seasonality). Cash $794M, liquidity
  // $1.6B, leverage 2.5x. New wins $227M; record pipeline $2.7B (+20% QoQ;
  // NA pipeline +35% QoQ); $870M 2026 incremental revenue secured (+19% YoY);
  // 2027 wins $168M so far (timing). Wincanton $60M run-rate synergies on
  // track end-2026. Churn <5%. RAISED FY26 guide: adj EBITDA $935-975M, adj
  // EPS $2.90-$3.20 (+22% mid), organic 4-5% maintained (existing-customer
  // volume assumed ~flat — conservative), FCF conversion 30-40%. H1 organic
  // ~4% (low end), accelerating to high end in H2 on signed-but-not-yet-
  // implemented wins. Amazon's expanded supply-chain offering hit the stock
  // (~$66 → ~$50): mgmt frames clear differentiation — Amazon sells access
  // to its own SC vs GXO's bespoke, data-secure, vendor-agnostic contract
  // solutions; only GXO Direct (~6% of revenue) directly overlaps; ~$0.5T
  // market still ~70% insourced. GXO IQ scaling (target >50 sites by YE);
  // GXO Way operating framework rolling out. Investor Day after Q3 (3-yr
  // strategy + SG&A glide path). Net: thesis tracking slightly ahead; the
  // de-rating restored the favorable risk/reward the prior thesis flagged.
  // ─────────────────────────────────────────────────────────────────────────
  strategicNarrative:
    "GXO is a cyclical contract-logistics operator playing an execution + margin-expansion story — not a secular megatrend bet. " +
    "Q1 2026 beat: revenue $3.3B (+10.8%, organic +4.1%), adj EBITDA $200M (+22.7%, margin 6.1% +60bps), adj EPS $0.50 (+72%) — though part of the beat was contract-termination-cost timing shifting into later quarters. " +
    "Management RAISED FY26 guide: adj EBITDA $935-975M, adj EPS $2.90-$3.20 (+22% mid, prior +20%/$3.00), organic 4-5% maintained on conservative ~flat-volume assumptions; record $2.7B pipeline (+20% QoQ), $870M 2026 revenue secured (+19% YoY), Wincanton $60M synergies on track. " +
    "Amazon's expanded supply-chain offering knocked the stock from ~$66 to ~$50, but the overlap is narrow (GXO Direct ~6% of revenue) — GXO sells bespoke, data-secure, contract-driven solutions with <5% churn into a ~$0.5T market still ~70% insourced. " +
    "If Wincanton synergies land + margins expand toward 5% EBIT + the cycle firms, this is a 15%+ compounder; if volumes stay flat it's ~8% with limited multiple support. " +
    "~40% probability of 15%+ CAGR — and at ~$50 the stock has dropped back into the entry zone where risk/reward flips favorably.",

  epsCagr: [5, 11, 16],
  exitPE: [16, 19, 22],
  prob: [22, 45, 33],     // Modest nudge post-Q1 2026: guidance raise + record $2.7B pipeline + $870M secured strengthen base/bull; bear trimmed (25→22) because the ~24% Amazon-driven de-rating already priced much of the downside. Not a re-tune — execution still the swing factor.


  analystConsensus: { rating: 'Strong Buy', targetLow: 58, targetMedian: 70, targetHigh: 82, numAnalysts: 13 },
  revGrowth: [
    [0.025, 0.025, 0.02, 0.02, 0.02],
    [0.05, 0.05, 0.05, 0.05, 0.05],
    [0.08, 0.07, 0.07, 0.06, 0.06],
  ],
  fcfMargin: [
    [0.018, 0.018, 0.018, 0.018, 0.018],
    [0.024, 0.026, 0.028, 0.030, 0.030],
    [0.028, 0.030, 0.032, 0.035, 0.035],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'Volume pressure persists with a slow new-business ramp and retention challenges, while Amazon\'s supply-chain push pressures sentiment and industry pricing. Margins stay stuck near 4% EBIT. ' +
      'Earnings grow only ~5% annually and the multiple compresses to 16x, its historical stress zone. Essentially dead money even from the de-rated ~$50 entry.',
    'Raised FY26 guidance plays out — adj EPS $2.90-$3.20 (+22% mid), 4-5% organic, margin expansion toward 5% EBIT from Wincanton $60M synergies and GXO Way productivity. ' +
      'Earnings compound ~11% annually at a 19x exit multiple. Returns ~8% annualized — decent but below the 15% hurdle absent multiple expansion; the record $2.7B pipeline is the main upside swing factor.',
    'Full execution across the board: margin catch-up, $60M in Wincanton synergies, strong pipeline conversion, and a cyclical recovery. ' +
      'Earnings compound at 16% annually with the market maintaining a 22x multiple on improved profitability. ' +
      'Delivers roughly 16% annualized returns, but requires strong execution and a normal macro environment.',
  ],

  ebitdaProxy: [0.08, 0.12, 0.15],
  bullMaOptVal: 55.50 * 114.3 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.01,
    },
    {
      revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.015,
    },
  ],
});
