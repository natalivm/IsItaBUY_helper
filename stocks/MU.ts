import { defineStock } from './defineStock';

export const MU = defineStock({
  ticker: 'MU',
  name: 'Micron Technology',
  sector: 'DRAM / NAND Flash Memory',
  themeColor: '#1a73e8',
  currentPrice: 1029,
  shares0: 1149,       // ≈ Q4 FY26 diluted ($37.7B GAAP NI / $32.87 GAAP EPS)
  rev25: 133190,       // FY26A (FYE ~Aug/Sep 2026) $133.2B — base year; revGrowth[0] = FY27 (consensus $275.2B, FY28E $320.6B)
  fcfMargin25: 0.20,
  taxRate: 0.138,
  cash: 14589,         // Q2 FY26 figure — NOT refreshed (cash is surging with ~$38B/qtr net income)
  debt: 10798,         // Q2 FY26 figure — NOT refreshed
  beta: 1.7,
  costDebt: 0.05,
  rsRating: 94,         // IBD RS per user, 10/10/2026 (was 99)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$361 - $3,000',  // stockanalysis.com analyst target range, Oct 8 2026

  // Q4 FY26 UPDATE (Sep 30, 2026) — first data review since Q2
  // ─────────────────────────────────────────────────────────────────────────
  // An unprecedented memory super-cycle. Q4 revenue $54.23B (vs $41.46B in
  // Q3; ~$51.1B consensus). GAAP GM 86.8%. GAAP NI $37.7B ($32.87/sh);
  // non-GAAP $38.4B ($33.42/sh). Core Data Center $18.0B revenue at 90% GM /
  // 85% op margin. FY26 revenue $133.2B. Q1 FY27 GUIDE: revenue ~$61.5B
  // ±$1.5B (above consensus); one analysis puts EPS ~$38 and GM ~86%
  // (unconfirmed). Most 2027 HBM supply already contracted at significantly
  // higher prices; first custom-HBM collaboration with NVIDIA. Street:
  // Strong Buy (49), PT $361-3,000 (median $1,550); FY27E EPS $176.15 / rev
  // $275.2B, FY28E $206.33 / $320.6B. Stock $1,029 — ~6× FY27E EPS.
  // MODEL REBUILD: base = FY27E consensus EPS treated as the cycle PEAK;
  // scenarios model the earnings fade toward mid-cycle by FY32 (base
  // -10%/yr), not growth off a peak. A memory trough has always followed a
  // memory peak — the question is depth and timing, not direction.
  // CALIBRATION (Oct 11 2026): scenarios re-aligned to the InvestAnswers 2030
  // price targets (framework dated Jul 27 2026) — bear $1,400 / expected
  // $2,450 / bull $3,950. That framework treats the HBM era as a structural
  // plateau, not a peak: base EPS now holds/edges up from FY27E (was a
  // -10%/yr fade). Model now: ~$1,435 / ~$2,450 / ~$3,970.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Only US-headquartered DRAM and NAND manufacturer at scale, making it a strategic national-security asset',
    'HBM oligopoly with just three capable producers means structural pricing power unavailable in commodity memory',
    'CHIPS Act fabs in Idaho and New York provide government-subsidized capacity expansion rivals cannot replicate domestically',
    'AI infrastructure buildout is structurally lifting memory content per server far above historical norms',
    'HBM supply constrained by back-end packaging capacity, not fab capacity, partially neutralizing Samsung\'s scale advantage',
  ],

  risksToBuy: [
    'Classic memory cycle risk — Samsung\'s structural incentive to over-supply can compress margins to near zero in a downturn',
    'DRAM oversupply in commodity segments could drag blended ASPs even as HBM remains tight',
    'FY23 trough demonstrated how violently earnings collapse when pricing breaks — the cycle has not been tamed',
    'High capital intensity of CHIPS Act fabs commits billions to fixed costs that amplify downside in a demand air pocket',
    'SK Hynix currently leads in HBM yield and share — any slip in Micron\'s ramp execution risks ceding the premium segment',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 361, targetMedian: 1550, targetHigh: 3000, numAnalysts: 49 },  // stockanalysis.com, Oct 8 2026

  modelType: 'EPS_PE',
  baseEps: 176.15,     // FY27E (Aug 2027) non-GAAP EPS — stockanalysis consensus (Oct 8 2026; FY28E $206.33). Q4 FY26 actual $33.42. Prior $55.00 was an FY26 estimate.

  revGrowth: [
    [0.90, -0.05, -0.15, 0.00, 0.05],   // Bear: FY27 below consensus, then a moderate down-cycle (HBM contracts cushion the fall)
    [1.03, 0.10, -0.03, 0.02, 0.04],    // Base: FY27 ≈ $275B consensus, FY28 ~$300B, then an HBM-supported plateau
    [1.07, 0.18, 0.06, 0.08, 0.08],     // Bull: consensus FY27-28 and beyond, HBM discipline keeps growing the plateau
  ],
  fcfMargin: [
    [0.30, 0.25, 0.18, 0.18, 0.20],
    [0.35, 0.35, 0.33, 0.33, 0.33],
    [0.38, 0.40, 0.40, 0.40, 0.40],
  ],
  exitMultiple: [8, 10, 12],          // Display-only under EPS_PE

  // Earlier: Q2 FY26 EPS $12.20; Q3 FY26 guidance $19.15. Old CAGRs (-8/5/18 off $55) would compound off a PEAK if left
  // unchanged on the $176 base. Sep 2026 rebuild faded EPS from the peak (-25/-10/+5, P/E 8/12/14); Oct 2026 calibration below.
  epsCagr: [-4, 3, 10],     // FY32 EPS ≈ $144 / $204 / $284 vs FY27E $176 (FY28E consensus $206)
  exitPE: [10, 12, 14],     // Down-cycle / mid-cycle / sustained-oligopoly multiples
  prob: [30, 45, 25],

  desc: [
    'Samsung and SK Hynix add capacity into peak pricing and commodity DRAM/NAND ASPs fall, but contracted HBM volumes cushion the down-cycle. EPS slips ~4%/yr from the $176 FY27E level to ~$145 by FY32 — still far above any prior cycle — and the stock trades at ~10×. ' +
      '5yr target {target} ({cagr} annualized).',
    'FY27 lands near consensus (most HBM already contracted), FY28 grows again, then AI memory demand holds earnings on a plateau: EPS edges up ~3%/yr to ~$205 by FY32 as HBM mix offsets commodity pricing. The market pays a mid-cycle ~12×. ' +
      '5yr target {target} ({cagr} annualized).',
    'AI memory demand structurally breaks the cycle: HBM oligopoly discipline holds, custom HBM (NVIDIA) deepens lock-in, and EPS compounds ~10%/yr from FY27 as CHIPS-Act fabs cut costs. The market awards ~14× on structurally de-risked earnings. ' +
      '5yr target {target} ({cagr} annualized).',
  ],

  ebitdaProxy: [0.45, 0.55, 0.62],
  bbRate: [0.002, 0.005, 0.010],
  bullMaOptVal: false,

  burry: {
    sbc: 309,
    gaapNi: 62000,
    buyback: 528,
    epsBasis: 'GAAP',
    fy: 'FY26E',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC ~$309M vs FY26 GAAP NI far above the old ~$62B estimate (Q4 FY26 alone $37.7B) — <1% ratio. Stock ~8× from FY23 trough amplifies unvested award values but annual SBC flow remains minimal. Watch closely — SBC may ratchet up with stock repricing at next grant cycle.',
  },

  debtSafety: {
    netDebt: -5829,
    ebitda: 36803,
    fy: 'LTM Q2 FY26',
    note: 'Q2 FY26 figures, not refreshed — net cash is now far larger after ~$38B of Q4 net income. Net cash of $5.8B at Q2 — FY23 trough saw net debt of ~$5B, illustrating the violent cash swing. CHIPS Act fab buildout drives CapEx/OCF of ~54% but is funded by government grants and operates from a net-cash position.',
  },
});
