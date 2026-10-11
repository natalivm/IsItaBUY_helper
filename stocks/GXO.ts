import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 46.56,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$55 - $90',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 114.7,
  rev25: 13180,        // FY2025A; revGrowth[0] = FY26 (organic +4-5%; consensus $13.95B, +5.9%), FY27E $14.68B (+5%)
  fcfMargin25: 0.020,
  taxRate: 0.23,
  cash: 769,           // Jun 2026 (stockanalysis)
  debt: 3170,          // funded debt ≈ company net debt $2.4B + cash (stockanalysis $6.1B total includes leases)
  beta: 1.15,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.05,       // 2026E EPS = FY26 guide midpoint (narrowed at Q2 to $2.95-3.15, midpoint held; consensus $3.02, FY27E $3.54 +17%).
  rsRating: 48,        // IBD RS per user, 10/11/2026 (was 37)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Model STRONG BUY (~14% base CAGR from a ~15× P/E) overstates a thin-margin, levered (~2.5× net debt, Altman Z ~1.9) contract logistician with only middling RS (48, recovering from 37) and an Amazon sentiment overhang. Street is Strong Buy (+40% median) — revisit after the Nov 16 Investor Day or if momentum/quality turns.
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $3.4B (+4.3%; organic +3.4%), adj. EBITDA $219M (vs $212M),
  // adj. EPS $0.59 (vs $0.57), GAAP $0.22; FCF +$12M. FY26 guide NARROWED
  // with midpoints held: organic +4-5%, adj. EBITDA $945-965M, adj. EPS
  // $2.95-3.15, FCF conversion 30-40%. New wins $410M (+34%), ~$1B 2026
  // incremental revenue secured (+29%). Net debt $2.4B. Investor Day Nov 16
  // 2026. Street: Strong Buy (17), PT $55-90 (median $65); FY26E $3.02,
  // FY27E $3.54. Stock $46.56 (~15× FY26E).
  // ─────────────────────────────────────────────────────────────────────────
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
    'New business wins accelerated sharply and most of next year\'s incremental revenue is already secured, supporting second-half acceleration',
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


  analystConsensus: { rating: 'Strong Buy', targetLow: 55, targetMedian: 65, targetHigh: 90, numAnalysts: 17 },  // stockanalysis.com (Oct 7 2026)
  revGrowth: [
    [0.045, 0.025, 0.02, 0.02, 0.02],
    [0.059, 0.05, 0.05, 0.05, 0.05],
    [0.065, 0.07, 0.07, 0.06, 0.06],
  ],
  fcfMargin: [
    [0.018, 0.018, 0.018, 0.018, 0.018],
    [0.024, 0.026, 0.028, 0.030, 0.030],
    [0.028, 0.030, 0.032, 0.035, 0.035],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'Volume pressure persists with a slow new-business ramp and retention challenges, while Amazon\'s supply-chain push pressures sentiment and industry pricing. Margins stay stuck near 4% EBIT. ' +
      'Earnings grow only ~5% annually from the FY26 ~$3.05 and the multiple settles at 16x, its historical stress zone. 5yr target {target} ({cagr} annualized).',
    'FY26 guidance plays out — adj. EPS ~$3.05 (+20%), 4-5% organic, margin expansion toward 5% EBIT from Wincanton synergies and GXO Way productivity; accelerating new wins sustain growth. ' +
      'Earnings compound ~11% annually at a 19x exit multiple. 5yr target {target} ({cagr} annualized) — the pipeline conversion is the main upside swing factor.',
    'Full execution across the board: margin catch-up, $60M in Wincanton synergies, strong pipeline conversion, and a cyclical recovery. ' +
      'Earnings compound at 16% annually with the market maintaining a 22x multiple on improved profitability. ' +
      '5yr target {target} ({cagr} annualized) — requires strong execution and a normal macro environment.',
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
    netDebt: 2400,         // Jun 2026 (company): net debt $2.4B, excluding leases
    ebitda: 955,           // FY26 adj. EBITDA guide midpoint ($945-965M)
    capexToOcf: 0.28,
    interestCoverage: 3.8,
    altmanZ: 1.9,
    fy: 'FY26E',
    note: 'Net debt ~2.5× EBITDA — elevated but typical for asset-light logistics after the XPO spinoff; should drift toward ~2.2× as EBITDA grows. Long-term customer contracts (avg 3-5yr) provide cash flow visibility. Red on Altman Z but not a distress signal for contract logistics.',
  },
});
