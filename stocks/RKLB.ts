import { defineStock } from './defineStock';

export const RKLB = defineStock({
  ticker: 'RKLB',
  name: 'Rocket Lab USA, Inc.',
  sector: 'Space Launch / Defense Space Infrastructure',
  themeColor: '#a855f7',
  updatedOn: '07/14',
  lastReportTag: 'Q1 2026',
  currentPrice: 78.81,
  fairPriceRange: '$52 - $340',  // from independent DCF using revenue-multiple exit; see narrative
  shares0: 534,
  rev25: 602,             // FY2025 actual revenue
  fcfMargin25: -0.10,     // FCF deeply negative; Neutron capex + opex in full burn
  taxRate: 0.21,
  cash: 575,              // ~$575M net cash (gross cash minus ~$200M debt)
  debt: 200,              // minimal; Debt/Equity ~15% per IBD
  beta: 1.95,
  costDebt: 0.05,
  ratingOverride: 'HOLD',  // Pins HOLD: pre-profit space name where the DCF is deeply negative but RS 98 momentum is extreme — HOLD splits the difference.

  rsRating: 98,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Only publicly traded pure-play covering launch, satellites, and defense space infrastructure under one roof',
    'Backlog growing rapidly with defense contracts providing durable, high-switching-cost revenue visibility',
    'Neutron medium-lift vehicle would multiply addressable market by an order of magnitude if successfully fielded',
    'Elite relative strength with accelerating fund ownership and top-grade accumulation signals broad institutional conviction',
    'Anduril hypersonics deal and Space Force programs anchor the company in the fastest-growing defense segment',
  ],

  risksToBuy: [
    'Valuation implies a SpaceX-level outcome — base-case DCF offers only modest upside from current levels',
    'Neutron development carries substantial execution, cost overrun, and timeline risk for a capital-intensive vehicle',
    'SBC on a GAAP-loss company plus a large equity distribution program create persistent dilution for shareholders',
    'Bear case is severe: a single Neutron setback could reprice the stock dramatically from current extended levels',
    'Price is extended far above the fifty-day moving average — initiating here offers poor risk-reward even in base case',
  ],

  verdictNarrative:
    "If you own RKLB from a prior base entry: respect the IBD 8-week hold rule triggered at $93.10 — the stock has earned the right to be held. Do not sell into momentum, but also do not add at 60% above the 50-day MA. " +
    "If you are considering a new position: the entry risk at $143 is poor. The base-case DCF target ($158) is only 10% above current price — you are buying a 10% base-case return for a company burning cash, carrying 128× revenue multiple, and needing Neutron to succeed to justify the valuation. The bear case ($52) is -64% from here. " +
    "The right setup: watch for Neutron milestones and a constructive base pattern (price consolidating near or above 50-day MA at lower RS-adjusted risk). An entry in the $90–110 range on a technical reset would offer compelling risk/reward. Until then, HOLD — the thesis is intact but the entry is not.",

  analystConsensus: { rating: 'Buy', targetLow: 50, targetMedian: 97, targetHigh: 150, numAnalysts: 20 },

  revGrowth: [
    [0.35, 0.30, 0.25, 0.20, 0.15],  // Bear: Neutron delays, launch market competition
    [0.60, 0.45, 0.35, 0.25, 0.20],  // Base: Neutron milestones hit, defense contracts compound
    [0.90, 0.70, 0.50, 0.35, 0.25],  // Bull: Neutron operational, SpaceX-alternative thesis confirmed
  ],

  fcfMargin: [
    [-0.10, -0.05, 0.00, 0.05, 0.08],  // Bear: prolonged burn, margins slow to develop
    [-0.05, 0.00, 0.05, 0.10, 0.15],   // Base: FCF positive by year 3, scaling to 15% by year 5
    [ 0.00, 0.05, 0.12, 0.18, 0.22],   // Bull: rapid FCF inflection as Neutron scales
  ],

  exitMultiple: [10, 18, 28],
  termGrowth: [0.015, 0.025, 0.030],

  ebitdaProxy: [0.40, 0.55, 0.70],
  bbRate: [0, 0, 0],
  bullMaOptVal: false,

  desc: [
    'Neutron faces repeated delays and cost overruns. Electron market share erodes as SpaceX rideshare captures more small-sat demand. Revenue growth decelerates to ~15% by year 5. FCF barely breaks even, dilution continues. Market re-rates from infrastructure premium to launch commodity. Bear target ~$52 (independent DCF; model output reflects more severe overvaluation at current price).',
    'Neutron achieves first flight by 2027–2028. Defense and commercial backlog compounds at 20–25% annually. FCF turns positive in year 3, reaching 15% margin by year 5. Revenue hits ~$2.8B by year 5. The market sustains a significant infrastructure premium. Base target ~$158 (+10% from current price — limited upside even in base case).',
    'Neutron becomes operational and wins major launch contracts from DoD, NASA, and commercial operators. Satellite systems business scales with the Anduril/hypersonics pipeline. Revenue ~$5B by year 5 at 22% FCF margin. RKLB is re-rated as a space infrastructure platform. Bull target ~$340.',
  ],

  thesis: [
    'At 128× trailing revenue, a single execution miss on Neutron re-rates the stock dramatically. Competes in both small- and medium-launch with well-funded incumbents (SpaceX, RocketX). SBC $120–150M on a GAAP-loss company with a $3B equity distribution program filed creates persistent dilution. 15% WACC severely penalizes the distant FCF inflection.',
    'Defense exposure (Anduril, Space Force, $190M launch award) provides durable revenue with high switching costs. $2.2B backlog supports near-term visibility. Q1 2026 +63.5% YoY confirms acceleration. Neutron has the potential to multiply TAM and FCF per launch by 6–10×.',
    'If Neutron succeeds, RKLB becomes the only public pure-play on launch + satellites + defense space infrastructure. Space Force budget >$30B annually, Golden Dome backdrop. The SpaceX analog thesis: one company owns the stack from launch to payload to orbit. RS 98 and A+ ACC/DIS confirm institutions are positioning for this outcome.',
  ],

  burry: {
    sbc: 135,
    gaapNi: -120,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 65,
    overstatementSource: 'estimated',
    note: 'Critical tier: SBC $120–150M on a GAAP-loss company with zero buybacks. Recent filings introduced a potential $3B equity distribution program. Stock +438% over prior year — MTM amplifier is extreme. GAAP framework technically mandates Tragic (NI < 0), but unlike pure pre-revenue names, RKLB has $600M+ real revenue and a visible FCF inflection path. Burry-adjusted PW target: $177 × 0.35 ≈ $62.',
  },

  debtSafety: {
    netDebt: -375,         // ~$575M cash − ~$200M debt; net cash position
    ebitda: -65,           // FY2025 approx: EBITDA negative while scaling; moot given net cash
    fy: 'FY25',
    note: 'GREEN by net cash. ~$375M net cash funds operational losses and Neutron capex. Minimal debt (~$200M, Debt/Equity 15%). No solvency risk near-term; cash runway is the watch item as Neutron spend accelerates.',
  },
});
