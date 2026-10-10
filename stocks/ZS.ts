import { defineStock } from './defineStock';

export const ZS = defineStock({
  ticker: 'ZS',
  name: 'Zscaler',
  sector: 'Cybersecurity / Zero Trust',
  themeColor: '#0067D9',
  currentPrice: 233.73,
  fairPriceRange: '$165 - $298',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 173,        // FY27 guide: ~173M non-GAAP diluted shares
  rev25: 3352.5,       // FY26A (FYE Jul 31, 2026) — base year; revGrowth[0] = FY27
  fcfMargin25: 0.23,
  taxRate: 0.20,
  cash: 3474,          // Jul 31, 2026: $928M cash + $2.55B ST investments
  debt: 1696,          // convertible senior notes (carrying value)
  beta: 0.98,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.88,       // FY27E non-GAAP EPS = FY27 guide midpoint $4.86-$4.90 (Sep 3 2026; consensus $4.91, FY28E $5.62). FY26A $4.21. Prior: $4.40 forward (06/26 spot-check). Q3 FY26 (reported May 26): rev $850.5M +25% YoY, non-GAAP EPS $1.08, ARR $3.525B +25%.
  rsRating: 8,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',

  // Q4 FY26 UPDATE (Sep 3, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Solid close to FY26. Q4 revenue $898.2M (+25%); ARR $3.771B (+25%), net
  // new ARR $246M — ex-Red Canary ($141M ARR) ARR +20% to $3.63B, net new ARR
  // $232M (+17%). Non-GAAP op income $218M (+37%), record 24.3% margin (+220
  // bps). Non-GAAP EPS $1.19; GAAP net loss $3.4M. Q4 FCF only $61M (7%) on
  // heavy capex; FY26 FCF $779M (23%), OCF $1.13B (34%). FY26: revenue $3.35B
  // (+25%), non-GAAP EPS $4.21, GAAP NI -$63M, SBC $842M incl. payroll taxes
  // (~25% of revenue). Deferred revenue $2.93B (+19%). Cash $3.47B vs $1.70B
  // converts. No buyback.
  // FY27 GUIDE: revenue $3.908-3.938B (~17%), ARR $4.396-4.426B (~17% — a
  // sharp decel from 25%, partly lapping Red Canary), non-GAAP op income
  // $924-932M (+21%), EPS $4.86-4.90 on ~173M shares, FCF margin 23-23.5%.
  // Q1 FY27: revenue $935-939M (~19%), EPS $1.15-1.16.
  // Stock ~$170 post-print → $233.73 (Oct 9), +55% since late July, now AT
  // the analyst mean target ($233). ~48× FY27E EPS. Net: margins expanding
  // as promised; growth decelerating as guided — the re-rating has already
  // priced in the good news.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Zero Trust architecture is uniquely suited to securing AI agents, the fastest-growing enterprise attack surface',
    'Z-Flex multi-year agreements deepen customer lock-in and reduce the churn risk inherent in annual renewals',
    'AI Protect and Data Security are crossing meaningful ARR thresholds with rapid enterprise adoption',
    'Record non-GAAP operating margin expansion shows genuine platform operating leverage kicking in',
    'Operating cash flow above a third of revenue funds the heavy data-center buildout internally, with a large net cash cushion',
  ],

  risksToBuy: [
    'SBC exceeds annual revenue from a meaningful portion of business, making true owner FCF deeply negative',
    'FY27 guidance implies a sharp growth deceleration as the Red Canary acquisition laps and organic growth slows',
    'PANW Cortex bundling and MSFT Entra are compressing pricing power in the mid-market segment',
    'Red Canary MDR churn is structurally higher than core ZS business and weighs on net new ARR',
    'Capex pulled forward ahead of tariffs may prove stickier than guided, permanently capping FCF margins',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 165, targetMedian: 242.5, targetHigh: 298, numAnalysts: 46 },  // stockanalysis.com, Oct 9 2026

  revGrowth: [
    [0.14, 0.11, 0.10, 0.09, 0.08], // Bear: FY27 lands below the ~17% guide, Red Canary churn + competition erode growth further
    [0.16, 0.16, 0.14, 0.13, 0.12], // Base: FY27 at guide (~17% incl. revPrem) / FY28 ≈ consensus $4.58B; AI Protect adds 1-2% over time
    [0.20, 0.20, 0.18, 0.16, 0.14], // Bull: AI agent security drives FY27 reaccel above guide; AI Protect → $500M ARR
  ],

  fcfMargin: [
    [0.20, 0.20, 0.21, 0.22, 0.23], // Bear: capex pressure permanent, margin stalls at FY26 floor
    [0.22, 0.24, 0.26, 0.28, 0.31], // Base: capex pull-forward temporary, gradual recovery as D&A absorbs
    [0.24, 0.28, 0.32, 0.36, 0.40], // Bull: capex normalizes, full SaaS operating leverage emerges
  ],

  exitMultiple: [20, 33, 50],

  desc: [
    'FY27 guide of ~17% is the ceiling, not the floor. Red Canary churn (MDR businesses have structurally higher churn than core ZS) hits net new ARR harder than expected. PANW Cortex + MSFT Entra bundle attacks mid-market pricing power. ' +
      'Capex pressure proves permanent: data center + branch appliance inflation keeps capex at high single-digits % of revenue indefinitely. FCF margin stays sub-22%. SBC stays 25%+ of revenue; GAAP profitability remains years away. ' +
      'Multiple compresses from ~48× to 22× as growth rerates toward low-teens. EPS CAGR ~8% from $4.88. 5yr target {target}, {cagr} annualized.',
    'ZS delivers on FY27 guide of ~17%. AI Protect crosses $250M ARR by FY28, Data Security sustains 25%+ growth. Z-Flex deepens multi-year customer relationships and reduces churn. ' +
      'Capex pull-forward proves temporary; FCF margin recovers to 28-31% by FY29-30. Non-GAAP operating margin expands to 25-26% by FY28. SBC ratio gradually falls from 25% to 20% as revenue base scales. ' +
      'Multiple settles ~35× — ZS re-rates as a stable compounder. EPS CAGR ~15% from $4.88. 5yr target {target}, {cagr} annualized.',
    'AI agent security super-cycle: every AI agent, model deployment, and agentic workflow needs zero-trust identity + policy enforcement. ZS becomes the de-facto AI-security infrastructure. Symmetry acquisition + Anthropic/OpenAI partnerships create durable moat. ' +
      'FY27 reaccelerates above guidance: AI Protect → $500M+ ARR by FY28. Capex pull-forward was one-time; FCF margins recover to 36-40%. SBC ratio falls to 18% by FY28 as revenue scales faster than comp. ' +
      'Premium multiple holds ~52× on AI platform position. EPS CAGR ~25% from $4.88. 5yr target {target}, {cagr} annualized.',
  ],

  thesis: [
    'FY27 guide of ~17% disappoints in execution. Red Canary MDR churn is higher than modeled; net new ARR ex-Red Canary stays at 10-12%. PANW Cortex bundling + MSFT Entra compress ZS pricing in mid-market. ' +
      'Capex stays structurally elevated (tariffs + data center inflation); FCF margin never recovers above 22%. SBC at 25%+ of revenue means true owner FCF is roughly zero (FY26 FCF $779M vs SBC $842M) on a ~$40B market cap. ' +
      'At ~48× FY27E P/E for a decelerating 12-13% grower, multiple compression to 20-22× is the dominant return driver. Flat-to-negative annualized return over 5 years.',
    'ZS executes on FY27 guidance. Zero Trust Everywhere momentum (700+ enterprises, growing ~27% QoQ) shows platform stickiness. Z-Flex locks customers into multi-year terms, smoothing revenue and reducing churn. ' +
      'AI Protect + Data Security add $150-200M ARR by FY28 — incremental but meaningful. Operating leverage delivers: non-GAAP operating margin to 25%+ by FY28. Capex normalizes after FY26-27 pull-forward. ' +
      'SBC ratio gradually improves; GAAP operating margin approaches breakeven by FY28. Multiple holds as ZS re-rates from hyperscale to large-scale compounder. Fair return at current price.',
    'AI agents become the dominant security threat vector (CEO Jay Chaudhry: "soon AI agents will be the weakest link"). ZS is architecturally positioned — hide applications, eliminate lateral movement — and is the only platform with network + cloud + endpoint vantage points simultaneously. ' +
      'Anthropic Glasswing + OpenAI Daybreak + Symmetry identity graph = compound AI moat. AI Protect crosses $500M ARR by FY28, drives FY27 reacceleration above 17%. ' +
      'Operating leverage + SBC compression (to 18% by FY28) + possible buyback initiation drives 25%+ EPS CAGR. Premium multiple sustained at 50-55×. {cagr} annualized returns ({target}).',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.000, 0.003, 0.008],
  ebitdaProxy: [0.18, 0.27, 0.37],
  bullMaOptVal: false,

  epsCagr: [8, 15, 25],   // Base trimmed 18→15 on 06/26: mgmt guided FY27 ARR/revenue growth to 16-17% (explicit deceleration) + rising capex pressures margin leverage.
  exitPE: [22, 35, 52],   // Base trimmed 38→35 — slightly rich for ~16% decelerating growth.
  prob: [28, 45, 27],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  debtSafety: {
    netDebt: -1778,        // $1.70B converts − $3.47B cash & ST investments (Jul 31, 2026)
    ebitda: 950,           // FY26 non-GAAP op income $767M + D&A — approximate
    fy: 'FY26',
    note: 'Net cash ~$1.8B; only debt is convertible notes. Leverage is a non-issue — the balance-sheet question is SBC dilution, not debt.',
  },

  burry: {
    sbc: 842,
    gaapNi: -63,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic — framework breaks down entirely; GAAP NI is negative so the SBC/NI ratio is undefined. FY26 ACTUALS (Sep 3 2026): SBC $842M incl. payroll taxes (25% of $3.35B revenue), GAAP net loss $63M (-$0.39/sh) vs non-GAAP EPS $4.21; FCF $779M < SBC. Earlier read — Q3 FY26 SBC = $207M for one quarter (10-Q, excl. payroll taxes) → annualized ~$828M = 25% of FY26 $3.33B revenue (was 24.6% in FY25). SBC growing faster than revenue. GAAP Q3 net loss $13.9M; FY26E GAAP NI estimated ~-$55M. Non-GAAP EPS $1.08 vs GAAP EPS -$0.09 in Q3 = $1.17/share gap, almost entirely SBC addback. Zero buybacks across all years. Diluted shares 165M (non-GAAP Q3). FCF guided 22.8-23.3% FY26 = ~$760M reported FCF; subtract $828M SBC and true owner FCF is deeply negative.',
  },
});
