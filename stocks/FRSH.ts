import { defineStock } from './defineStock';

export const FRSH = defineStock({
  updatedOn: '05/16',
  lastReportTag: 'Q1 FY2026 (3/31/26)',
  ticker: 'FRSH',
  name: 'Freshworks Inc.',
  sector: 'Enterprise SaaS / ITSM & CX',
  themeColor: '#00B89C',
  currentPrice: 8.50,
  fairPriceRange: '$15 - $53',
  shares0: 276.4,
  rev25: 838.8,
  fcfMargin25: 0.28,
  taxRate: 0.20,
  cash: 780.4,
  debt: 38.8,
  beta: 1.40,
  costDebt: 0.05,
  rsRating: 32,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',

  strategicNarrative:
    "Freshworks is executing a deliberate pivot away from its SMB helpdesk roots toward mid-market and enterprise ITSM, where it positions Freshservice as the \"affordable ServiceNow.\" " +
    "The EX business ($540M+ ARR, growing 27%) is now the primary growth engine — NRR 119% for multi-product customers, first $1M+ ARR deal closed, and management targets $1B+ Freshservice ARR by 2028. " +
    "CX (Freshdesk, ~55% of ARR) faces structural AI headwinds: ARR guided to grow only low single digits as AI agents deflect tier-1 ticket volume, even as the Omni replatform is 80% complete. " +
    "The financial picture is distorted: FY2025 GAAP net income of $183M includes a $130M deferred-tax asset benefit; normalized NI ex-DTA is closer to $50M. Non-GAAP op margin compressed from 23.6% to 17.9% YoY in Q1 2026 as EX investment accelerates. " +
    "At $8.50, the stock trades at ~6× 2026E adj. FCF of $265M — a near-distressed multiple for a business with 85% gross margins, $741M net cash (31% of market cap), 14–16% revenue growth, and a $400M buyback authorization that at current price retires ~17% of the float. " +
    "Key risk: EX decelerates toward 15% while CX never recovers, melting the premium. Key opportunity: EX crosses $1B ARR by 2028 and FCF compounds at 20%+/yr per management guidance — at which point 6× FCF is deeply mispriced. " +
    "Upgrade trigger: EX ARR sustains >25% growth and non-GAAP margin recovers above 22%. Downgrade trigger: EX growth falls below 15% or CX ARR turns negative. Watch Q2 2026 (est. July 27) for non-GAAP margin recovery above 20% post-restructuring.",

  analystConsensus: { rating: 'Buy', targetLow: 10, targetMedian: 13, targetHigh: 17, numAnalysts: 13 },

  // Bear: CX contracts; EX decelerates to 12%; AI disruption prices in — Rev CAGR ~8%, FCF margin 25%, 10× exit → $14.80
  // Base: EX at 20%, CX +3%; 2028 targets roughly met; layoff savings show — Rev CAGR ~13.5%, FCF margin 30%, 14× exit → $28.80
  // Bull: Freshservice captures enterprise ITSM; AI copilot >15% of ARR — Rev CAGR ~18%, FCF margin 35%, 18× exit → $52.80
  revGrowth: [
    [0.145, 0.10, 0.08, 0.07, 0.06],
    [0.145, 0.14, 0.13, 0.12, 0.11],
    [0.145, 0.19, 0.18, 0.17, 0.16],
  ],

  fcfMargin: [
    [0.25, 0.25, 0.25, 0.25, 0.25],
    [0.276, 0.28, 0.29, 0.29, 0.30],
    [0.28, 0.30, 0.32, 0.34, 0.35],
  ],

  exitMultiple: [10, 14, 18],

  prob: [30, 50, 20],

  desc: [
    'CX (Freshdesk) ARR turns negative as AI agents fully deflect tier-1 tickets; EX decelerates to ~12% as enterprise ITSM competition intensifies from ServiceNow and Jira. ' +
      '11% workforce reduction savings absorbed by continued EX investment. Revenue CAGR ~8%; FCF margin holds at 25% but multiple compresses to 10× on slow-growth narrative. ' +
      'Target ~$14.80 — bear still returns ~11.7% CAGR from $8.50, reflecting how cheap current pricing is even in the downside.',
    'EX sustains ~20% ARR growth toward $1B ARR by 2028; CX declines low single digits but stabilizes as Omni platform retains mid-market accounts. ' +
      'Restructuring (11% headcount cut + AI-driven code generation) expands FCF margin from 27.6% toward 30%. Buyback program ($400M at ~$8.50 = 17% of float) provides structural support. ' +
      'Revenue CAGR ~13.5%; exit at 14× FCF. Target ~$28.80 (~27.6% CAGR) — blended probability-weighted value ~$29.39.',
    'Freshservice emerges as the genuine "affordable ServiceNow" — enterprise ITSM wins accelerate, AI copilot contributes >15% of ARR, and NDR for multi-product customers sustains >115%. ' +
      'FCF compounds at 20%+/yr per management guidance. Non-GAAP op margin recovers to 23%+ as investment cycle matures. Revenue CAGR ~18%; 18× exit on platform premium. ' +
      'Target ~$52.80 (~44% CAGR) with $741M net cash providing downside cushion throughout.',
  ],

  thesis: [
    'EX deceleration is the key bear catalyst — if Freshservice growth drops to 12-15%, the stock\'s entire re-rating thesis collapses. CX structural decline accelerates beyond guided low-single-digit ARR growth. ' +
      'Freddy AI remains at ~3% of ARR (too small to offset Freshdesk ticket deflation). Non-GAAP margin compression persists past Q2 2026 restructuring, triggering multiple contraction to single-digit FCF multiples.',
    'EX/CX divergence plays out as guided: Freshservice continues 20%+ ARR growth while Freshdesk stabilizes. Q2 2026 non-GAAP margin recovers above 20%, validating restructuring thesis. ' +
      'Buyback at $8.50 ($400M = 47M shares = 17% of float) provides meaningful capital return while market re-rates from distressed 6× FCF to fair 14×. Net cash ($741M) covers nearly 32% of market cap.',
    'Platform expansion into enterprise ITSM is durably underway: NRR 119% for multi-product Freshservice customers, first $1M+ ARR deal signed, and AI copilot is the wedge into CISO/IT budgets previously owned by ServiceNow. ' +
      'FCF / share CAGR of 20%+ (mgmt guidance 2026-2028) is achievable if EX sustains 20%+ and CX stabilizes at flat. Rule of 50 by 2028 ($1.3B rev + 27.6% FCF margin) justifies 18-20× FCF. Stock is one of the few BUYs that even the bear case returns double digits.',
  ],

  bbRate: [0.01, 0.025, 0.04],
  ebitdaProxy: [0.18, 0.27, 0.35],
  bullMaOptVal: true,

  burry: {
    sbc: 139,
    gaapNi: 180,
    buyback: 368,
    epsBasis: 'NON_GAAP',
    fy: 'FY2025',
    overstatementPct: 65,
    overstatementSource: 'estimated',
    note: 'Critical — LTM SBC $139M vs DTA-inflated GAAP NI $180M (includes $130M deferred-tax benefit; normalized NI ex-DTA ~$50M). Burry-adj (NI + SBC − buybacks) = −$49M because LTM buybacks ($368M, including large Q2-Q3 2025 ASR) dwarf SBC-adjusted earnings. This negative figure is atypical: aggressive buybacks at depressed prices are net-positive for long-term owners, not a Burry red flag. FCF lens ($237M LTM adj. FCF) is more representative — SBC/FCF = 59%, but $400M buyback authorization (spread over 2+ yrs) structurally retires dilution. Est. 65% reflects thin normalized earnings relative to SBC ($139M vs $50M ex-DTA) partially offset by buybacks exceeding SBC. Stock has declined ~76% from IPO ($36 → $8.50), so no MTM amplifier applies. Freshworks is an unusual case where buyback discipline reduces the Burry concern considerably over the next 2 years.',
  },
});
