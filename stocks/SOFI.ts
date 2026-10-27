import { defineStock } from './defineStock';

export const SOFI = defineStock({
  updatedOn: '10/26',
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 14.46,
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-10-27',
  fairPriceRange: '$12 - $30',  // stockanalysis.com analyst target range (Sep 8 2026)
  shares0: 1290,
  rev25: 3586,         // FY2025A adj. net revenue; FY26 guide RAISED to $5.04B at Q3; FY27 outlook $6.4B (+27%)
  fcfMargin25: 0.347,
  taxRate: 0.15,
  cash: 3370,
  debt: 3420,
  beta: 2.3,
  costDebt: 0.055,
  // Switched DCF_ADVANCED → EPS_PE at the Oct 2026 review: SoFi is a bank —
  // its balance-sheet debt/deposits are operational funding, so the decision
  // tree's lender rule applies (like ENVA/NU).
  modelType: 'EPS_PE',
  baseEps: 0.90,       // FY27E EPS = COMPANY OUTLOOK, introduced at Q3 2026. Re-based off FY26
                       // ($0.61, raised from ~$0.60) for the same reason as CLS: a flat epsCagr
                       // cannot express a guided +47.5% then a fade. Growth cut in the same edit.
  rsRating: 32,        // IBD RS per user, 10/11/2026 (was 37)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record adj. net revenue ~$1.2B (+40%), members 15.8M (+35%, record 1.1M
  // adds), record originations $14.8B, adj. EPS $0.12 (beat $0.11). FY26
  // revenue guide RAISED to $4.75-4.85B (+32-35%) but adj. EBITDA (~$1.6B),
  // adj. net income (~$825M) and EPS (~$0.60) HELD — stock fell ~10% on the
  // flat profit outlook. Street: Hold (24), PT $12-30 (median $19); FY26E
  // rev $4.88B / EPS $0.59, FY27E $6.10B / $0.82. Stock $15.80 (~27× FY26E,
  // ~19× FY27E; P/B ~1.8), down ~44% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  // Q3 2026 (reported Oct 27 2026, bmo) — BEAT AND RAISED, 2027 OUTLOOK INTRODUCED
  // ─────────────────────────────────────────────────────────────────────────
  // Q3: adjusted net revenue $1.4B, +44% YoY — a record. Adjusted EBITDA $469.8M
  // (+70%, a 34% margin). GAAP net income $241M. Adjusted EPS $0.18 against a
  // ~$0.16-0.168 consensus. Members +35% to a record 17.1M.
  // FY26 raised: adj. net revenue $5.04B, adj. EBITDA $1.66B, net income $840M,
  // EPS $0.61 (from ~$0.60).
  // FY27 OUTLOOK INTRODUCED: adj. net revenue $6.4B, adj. EBITDA $2.24B,
  // EPS $0.90 — +47.5% on the new FY26 base.
  //
  // SAME SHAPE PROBLEM AS CLS, AND IT BARELY MATTERS HERE. The model's year-one
  // EPS on the FY26 basis is $0.61 x 1.20 = $0.73 against a company-guided
  // $0.90, so the near path is understated. But the base target is ~$27 as it
  // stands and a re-base to $0.90 lands ~$26 at 10%, ~$29 at 12%, ~$33 at 15%,
  // ~$40 if the current 20% is carried over. The 10-12% band reproduces today's
  // number, so unlike CLS the re-base here is a tidying rather than a revaluation.
  // ─────────────────────────────────────────────────────────────────────────
  epsCagr: [5, 11, 18],   // POST-FY27 rates, off the $0.90 FY27 outlook. The +47.5% is in the base
                          // now. 11% reproduces roughly what the model said before the re-base
                          // (~$27), so this is a tidying of the shape rather than a revaluation —
                          // unlike CLS, where the same move is worth hundreds of dollars.
  exitPE: [11, 18, 25],   // Bank-like trough / growth-fintech / platform premium
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Hold', targetLow: 12, targetMedian: 19, targetHigh: 30, numAnalysts: 24 },  // stockanalysis.com (Sep 8 2026)
  revGrowth: [
    [0.32, 0.12, 0.08, 0.05, 0.03],   // Bear: FY26 locked by guide, then credit cycle bites
    [0.35, 0.24, 0.18, 0.12, 0.10],   // Base: FY26 ≈ $4.85B, FY27 ≈ $6.0B, then fade
    [0.37, 0.30, 0.25, 0.18, 0.14],   // Bull: fee platform + crypto rails scale
  ],
  fcfMargin: [
    [0.26, 0.25, 0.24, 0.23, 0.22],
    [0.34, 0.34, 0.35, 0.36, 0.37],
    [0.36, 0.37, 0.38, 0.40, 0.42],
  ],
  exitMultiple: [12, 16, 20],
  ebitdaProxy: [0.22, 0.34, 0.40],
  desc: [
    'The guided FY27 lands but a credit cycle turns straight after; EPS compounds only ~5% from the $0.90 FY27 outlook and the P/E compresses to a bank-like 11x. 5yr target {target} ({cagr} annualized).',
    'FY27 delivers the guided $0.90 on $6.4B of revenue, then growth normalizes as a scaled digital bank; EPS compounds ~11% and the market pays 18x. 5yr target {target} ({cagr} annualized).',
    'Growth holds past 2028 as the fee-platform and crypto optionality materialize; EPS compounds ~18% beyond the FY27 outlook and the P/E holds 25x. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 19 * 1279 * 0.07,

  debtSafety: {
    netDebt: 50,           // Jun 2026 (stockanalysis): ~$3.42B corporate/warehouse debt − ~$3.37B cash
    ebitda: 1600,          // FY26E adj. EBITDA guide
    fy: 'FY26E',
    note: 'Framework largely N/A for a bank — deposits fund the loan book. Corporate/warehouse debt is roughly offset by cash; real safety metrics are capital ratios and credit losses.',
  },
});
