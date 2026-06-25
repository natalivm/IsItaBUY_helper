import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 50.95,
  updatedOn: '06/25',
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
  rsRating: 37,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Model STRONG BUY (+94%) overstates: the +94% is cumulative ~14% CAGR, and GXO's own base case (desc[base]) pegs returns at "~8% annualized — below the 15% hurdle absent multiple expansion." Weak quality confirms HOLD: RS 37, distribution (ACC/DIS), ~-1% 3yr EPS growth, elevated leverage (Altman Z 1.9, ~2.5x net debt). Street is Strong Buy (+39% median) — revisit if momentum/quality turns.
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
  reasonsToBuy: [
    'Record pipeline and secured incremental revenue provide strong near-term earnings visibility',
    'Wincanton integration synergies tracking on schedule, adding meaningful margin uplift through year-end',
    'Amazon supply-chain overlap is narrow, and the vast majority of the market remains insourced and addressable',
    'Low customer churn reflects long-term contracted revenue that cushions against near-term volume softness',
    'Management raised guidance after Q1, signaling confidence in H2 organic acceleration from signed-but-unstarted wins',
  ],

  risksToBuy: [
    'Amazon\'s expanding supply-chain offering created a sentiment overhang that could persist even if overlap is limited',
    'Elevated leverage constrains capital flexibility; free cash flow is negative in seasonally weak quarters',
    'Organic volume growth is modest and relies on conservative assumptions around existing-customer demand recovery',
    'Business model is operationally intensive with thin margins, leaving earnings exposed to volume and cost surprises',
    'Bull case requires strong macro environment and full pipeline conversion — execution risk remains the key swing factor',
  ],

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

  debtSafety: {
    netDebt: 2200,
    ebitda: 881,
    capexToOcf: 0.28,
    interestCoverage: 3.8,
    altmanZ: 1.9,
    fy: 'FY25',
    note: 'Net debt 2.5× EBITDA — elevated but typical for asset-light logistics after the XPO spinoff. 2026 EBITDA guidance $930-970M should bring leverage toward 2.2×. Long-term customer contracts (avg 3-5yr) provide cash flow visibility. Red on Altman Z but not a distress signal for contract logistics.',
  },
});
