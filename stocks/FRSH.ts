import { defineStock } from './defineStock';

export const FRSH = defineStock({
  updatedOn: '07/16',
  lastReportTag: 'Q1 2026',
  ticker: 'FRSH',
  name: 'Freshworks Inc.',
  sector: 'Enterprise SaaS / ITSM & CX',
  themeColor: '#00B89C',
  currentPrice: 10.95,
  fairPriceRange: '$15 - $53',
  shares0: 276.4,
  rev25: 838.8,
  fcfMargin25: 0.28,
  taxRate: 0.20,
  cash: 780.4,
  debt: 38.8,
  beta: 1.40,
  costDebt: 0.05,
  rsRating: 35,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',

  reasonsToBuy: [
    'Freshservice is the credible affordable alternative to ServiceNow in enterprise ITSM, with net revenue retention above industry averages for multi-product customers',
    'Net cash covers nearly a third of the entire market cap, providing exceptional downside protection and funding a large buyback at depressed prices',
    'Substantial buyback authorization at current price retires a meaningful percentage of the float, directly compounding per-share free cash flow',
    'EX business growing robustly with the first seven-figure ARR enterprise deal already closed, validating the upmarket pivot',
    'Elite gross margins leave ample room for operating leverage once the deliberate EX investment cycle matures',
  ],

  risksToBuy: [
    'CX business faces structural AI-driven headcount deflation, with ARR guided to grow only in low single digits as ticket volume erodes',
    'Non-GAAP margin compressed sharply year-over-year and must recover in coming quarters to validate the restructuring thesis',
    'RS Rating and trend are both deeply negative, reflecting persistent institutional exit well below the IPO price',
    'If EX growth decelerates toward the mid-teens while CX continues to decline, the re-rating thesis collapses entirely',
    'ServiceNow and Atlassian Jira Service Management are well-resourced incumbents that actively contest every enterprise ITSM deal',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 10, targetMedian: 13, targetHigh: 17, numAnalysts: 13 },

  // Targets are engine-computed from these inputs (see scenario cards); narrative uses {tokens} so it never drifts off the live price.
  // Bear: CX declines (worse than guided low-SD growth), EX decelerates below mid-20s, NO re-rating — Rev CAGR ~5%, FCF margin ~22%, 6× exit
  // Base: EX mid-20s, CX low-SD (FY26 guide), FCF/share +20% (mgmt 3yr target) — Rev CAGR ~13%, FCF margin 28-30%, 14× exit
  // Bull: Freshservice captures enterprise ITSM; AI monetization scales — Rev CAGR ~18%, FCF margin 35%, 18× exit
  revGrowth: [
    [0.14, 0.06, 0.03, 0.02, 0.01],
    [0.145, 0.14, 0.13, 0.12, 0.11],
    [0.145, 0.19, 0.18, 0.17, 0.16],
  ],

  fcfMargin: [
    [0.24, 0.23, 0.22, 0.21, 0.21],
    [0.276, 0.28, 0.29, 0.29, 0.30],
    [0.28, 0.30, 0.32, 0.34, 0.35],
  ],

  exitMultiple: [6, 14, 18],

  prob: [30, 50, 20],

  desc: [
    'CX (Freshdesk) ARR declines outright — worse than the prudent low-single-digit growth guide — as AI agents deflect tier-1 tickets, and EX decelerates below the guided mid-20s as ServiceNow and Jira contest every enterprise ITSM deal. ' +
      'Revenue CAGR slows to ~5% and FCF margin slips toward ~21% as continued EX investment outruns eroding CX cash. Critically, the market never re-rates the stock — the multiple stays distressed at ~6× FCF. ' +
      'Target ~{target} ({cagr} CAGR from {spot}); even this is floored mostly by ~$741M net cash (over a quarter of the market cap) plus five years of FCF, not by any re-rating.',
    'EX sustains mid-20s ARR growth toward $1B ARR while CX grows low single digits, with the Freshdesk Omni platform lifting ARPA ~2.5× on new customers. ' +
      'Restructuring (11% headcount cut + AI-assisted code generation) holds FCF margin near 28–30%, and the $400M buyback at ~{spot} retires a meaningful slice of the float. ' +
      'Revenue CAGR ~13%; exit at 14× FCF. Target ~{target} ({cagr} CAGR) — in line with management\'s guide to compound adjusted FCF/share 20%+ annually over the next 3 years.',
    'Freshservice emerges as the genuine "affordable ServiceNow" — enterprise ITSM wins accelerate, Copilot and agentic AI (Agent Studio, MCP Gateway) scale into real monetization, and EX net dollar retention holds ~111%. ' +
      'Adjusted FCF/share compounds well above the 20%/yr management floor as the investment cycle matures and non-GAAP operating margin expands. Revenue CAGR ~18%; 18× exit on platform premium. ' +
      'Target ~{target} ({cagr} CAGR), with ~$741M net cash cushioning the downside throughout.',
  ],

  thesis: [
    'EX deceleration is the key bear catalyst — if Freshservice growth drops toward the mid-teens, the re-rating thesis collapses. CX declines outright, worse than the guided low-single-digit ARR growth, as AI deflects tier-1 tickets. ' +
      'Freddy AI stays a low single-digit share of ARR (strong attach but thin monetization), too small to offset Freshdesk erosion. Non-GAAP margin gains stall after the Q2 2026 restructuring and the multiple stays at a single-digit FCF multiple — no re-rating.',
    'EX/CX divergence plays out as guided: Freshservice compounds mid-20s ARR growth while Freshdesk grows low single digits and lifts ARPA on Omni. Non-GAAP operating margin holds in the high teens, validating the restructuring. ' +
      'The $400M buyback at ~{spot} retires a meaningful slice of the float while the market re-rates from a single-digit FCF multiple toward ~14×. Net cash (~$741M) covers over a quarter of the market cap.',
    'Platform expansion into enterprise ITSM is durably underway: EX net dollar retention ~111%, the first 7-figure EX ARR deal and second-largest land ever both signed, and AI is now core to the pitch in most large deals. ' +
      'Adjusted FCF/share compounding of 20%+ (management\'s explicit 2026–2028 guide) is achievable as EX sustains mid-20s growth and CX stabilizes. Rule of 40 is sustained (mid-teens growth + ~28% FCF margin), supporting an 18–20× FCF multiple. Post-recalibration, even the bear case still returns low double digits — a genuinely cushioned setup.',
  ],

  bbRate: [0.01, 0.025, 0.04],
  ebitdaProxy: [0.16, 0.27, 0.35],
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
