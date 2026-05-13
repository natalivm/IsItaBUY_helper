import { defineStock } from './defineStock';

export const FTNT = defineStock({
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 117.69,
  updatedOn: '05/13',
  fairPriceRange: '$80 - $135',
  shares0: 756,
  rev25: 6800,
  fcfMargin25: 0.34,
  taxRate: 0.18,
  cash: 2224,
  debt: 995,
  beta: 0.96,
  costDebt: 0.048,
  rsRating: 95,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Fortinet is the quality compounder of cybersecurity. FY25 revenue $6.80B (+14% YoY, TTM $7.11B), 80% gross margin, **31% GAAP operating margin**, 27% net margin, 131% ROIC — extraordinary capital efficiency. Net income $1.95B TTM. " +
    "Real shareholder economics: diluted shares 839M (2017) → 734M (current) = **−12.5% net retirement over 8 years** thanks to consistent buybacks. EPS compounded from $0.38 (FY18) to $2.59 (TTM), a 6.8× in 7 years. " +
    "ASIC-driven SASE platform creates a cost/performance edge that cloud-native peers can't match. Three growth vectors: SASE (40%+ billings growth), AI security across data centers + SecOps, and OT security (25%+ growth). " +
    "Momentum confirmed: stock +43% YTD, +41% in the past month, RSI 84 (overbought near-term but RS 95 means institutional accumulation is real). Up +169% over 5 years, +1,683% over 10 years. " +
    "Valuation: at $114.07 / $84.4B market cap on $3.42 forward EPS, forward P/E ~33×. Forward P/S ~12×. EV/EBITDA 35×. Premium multiple but on a 27% net margin business with $3.3B cash and a buyback engine. " +
    "Analyst median target $107 (Recom 2.71 = Hold/Buy boundary) implies the rally has run ahead of consensus targets — wait for a 10-15% pullback for a cleaner entry, or trim into strength.",


  analystConsensus: { rating: 'Hold', targetLow: 85, targetMedian: 107, targetHigh: 130, numAnalysts: 25 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    0.27625,
    0.325,
    0.37375,
  ],
  exitMultiple: [15, 28, 35],
  bullMaOptVal: 80 * 743.6 * 0.07,
  ebitdaProxy: [0.18, 0.26, 0.38],

  desc: [
    'SASE adoption stalls as cloud-native competitors (Zscaler, Palo Alto) win enterprise consolidation deals. Firewall refresh cycle is muted — revenue growth decelerates to mid-single digits. ' +
      'FCF margins compress to ~28% as R&D spend fails to translate into share gains. Multiple compresses to 15x as market treats Fortinet as a legacy security vendor. RS 27 confirms institutional apathy.',
    'Firewall refresh cycle drives near-term demand while SASE convergence sustains high-single to low-double-digit growth. ASIC cost/performance advantage defends share but doesn\'t expand it meaningfully. ' +
      'FCF margins hold at ~32.5% on proprietary silicon leverage. P/E compresses naturally to 28x through earnings growth. $4.6B net cash fortress funds steady buybacks.',
    'SASE inflection — ASIC-driven performance edge wins enterprise platform consolidation over cloud-native peers. Revenue sustains low-teens growth as firewall + SASE converge into a single budget line. ' +
      'FCF margins expand to ~37% on operating leverage and software attach. Net cash funds aggressive buybacks. Market re-rates to 35x as cybersecurity compounder with structural margin advantage.',
  ],

  burry: {
    sbc: 286,
    gaapNi: 1955,
    buyback: 3223,
    epsBasis: 'GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 20,
    overstatementSource: 'estimated',
    note: 'Ok — FTNT is actually one of the cleanest profiles in our entire coverage, despite being in the cybersec sector that\'s otherwise dominated by Tragic-tier names (CRWD/ZS/DDOG/AXON). TIKR LTM actuals: SBC just $286M (**4.0% of revenue** — lowest among all verified cybersec, only AMZN/MELI/SHOP are lower), buybacks **$3,222M = 11.3× SBC** (similar to FICO 12× and NFLX 25×). Diluted shares 835M (FY21) → 756M (LTM) = **−9.5% over 5 years** (comparable to META −10.2%). SBC = 12% of FCF. GAAP genuinely profitable: 27.5% net margin, 31% operating margin, $1.95B GAAP NI. Adjusted FCF after SBC: $2.15B = 30.2% margin (still elite). FTNT belongs in the reformed-compounder cohort with META/FICO/SHOP/APP/AMAT — not the broken-SaaS cohort with the rest of cybersec.',
  },
});
