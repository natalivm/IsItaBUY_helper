import { defineStock } from './defineStock';

export const SHOP = defineStock({
  ticker: 'SHOP',
  name: 'Shopify',
  sector: 'E-commerce Infrastructure / Payments',
  themeColor: '#95BF47',
  currentPrice: 170.85,
  fairPriceRange: '$120 - $220',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 1307,
  rev25: 11600,
  fcfMargin25: 0.17,
  taxRate: 0.18,
  cash: 8500,
  debt: 1100,
  beta: 2.10,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 1.91,       // FY2026E non-GAAP EPS — stockanalysis.com consensus (Oct 8 2026, range $1.71-2.16; FY27E $2.45, +28% — matches base epsCagr). Raised from $1.82 after Q2 2026 beat. Prior: ~$1.82 on 06/26 spot-check. Q1 2026 (qtr end Mar 31): rev $3.17B +34% YoY, adj EPS $0.36 (beat), GMV $101B +35%, FCF ~15% margin. Base CAGR (28%) + exit P/E (45) unchanged — already aligned with consensus.
  rsRating: 20,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',

  // Q2 2026 UPDATE (Aug 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // "Monster quarter" — 30%+ growth in GMV, revenue, gross profit AND FCF.
  // GMV ~$115.6B (+32%, 5th straight quarter >30%). Revenue $3.58B (+34%,
  // +33% cc). Gross profit $1.71B (+31%). Operating income $488M (vs $291M,
  // ~13.6% margin). FCF $654M (vs $422M), 18% margin (16% y/y).
  // Q3 GUIDE: revenue growth low-30s %, gross profit $ growth mid-to-high
  // 20s, opex 33-34% of revenue, FCF margin high-teens to low-twenties.
  // Mgmt leaning further into agentic-commerce infrastructure (UCP, selling
  // inside ChatGPT/Copilot/Google). Stock ~$117 (Jul 31) → ~$149 post-print →
  // ~$138 (Sep 21) → $170.85 (Oct 9), now at the analyst mean target. Street:
  // Buy, 54 analysts, PT $120-220 (median $177.5); FY26E rev $15.25B (+31%),
  // FY27E $19.2B (+26%). ~89× FY26E non-GAAP EPS. Net: growth sustaining
  // well above the old base path; valuation is the only real debate.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Universal Commerce Protocol co-developed with Google and adopted by Amazon, Meta, and Microsoft creates near-unbreakable platform lock-in',
    'Only commerce platform powering selling inside ChatGPT, Copilot, and Google from a single system',
    'B2B GMV growing at roughly double the headline rate, opening a massive underpenetrated market',
    'SBC dramatically reformed — buybacks now exceed SBC issuance, with minimal net dilution over five years',
    'GAAP profitable with genuine operating leverage, unlike most high-growth software peers',
  ],

  risksToBuy: [
    'Any deceleration from the current thirty-plus percent growth rate could trigger severe multiple compression',
    'Amazon, Walmart Marketplace, and TikTok Shop intensify direct competition for SMB merchant acquisition',
    'Stripe, Adyen, and Meta-native checkout compete on Shopify Payments take-rate, compressing merchant solutions margins',
    'Premium valuation leaves no margin of safety — the entire stock price is justified by sustained high growth',
    'Agentic AI tools from competing platforms could commoditize the AI commerce edge Shopify currently enjoys',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 120, targetMedian: 177.5, targetHigh: 220, numAnalysts: 54 },  // stockanalysis.com, Oct 8 2026

  revGrowth: [
    [0.28, 0.14, 0.10, 0.09, 0.08], // Bear: FY26 ~locked by H1 +34%; decelerates sharply from 2027
    [0.30, 0.24, 0.17, 0.14, 0.12], // Base: FY26/FY27 ≈ consensus $15.25B / $19.2B (incl. revPrem), normalizes 2028+
    [0.34, 0.28, 0.21, 0.17, 0.14], // Bull: agentic + B2B + international sustain acceleration
  ],

  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19], // Bear: margins hold but don't expand
    [0.18, 0.20, 0.22, 0.23, 0.24], // Base: gradual operating leverage continues
    [0.20, 0.23, 0.26, 0.28, 0.30], // Bull: payments + AI productivity drive margin expansion
  ],

  exitMultiple: [25, 40, 55],

  desc: [
    '2026 momentum fades as macro headwinds dampen SMB formation and Amazon intensifies competition. ' +
      'GenAI agents commoditize Shopify\'s AI edge as competing platforms close the gap. GMV growth slows to low teens; Shopify Payments take-rate compresses. ' +
      'Revenue decelerates sharply from 2027; multiple compresses from ~89× to ~28× as market reprices SHOP toward mature-platform status. EPS growth ~14% from $1.91 base. 5yr target {target} ({cagr} annualized).',
    'Shopify sustains the 2026 trajectory (Q1 +34%, Q2 +34%): FY2026 revenue ~31% growth followed by gradual normalization. B2B, offline and international each add durable growth vectors. ' +
      'UCP becomes the de-facto agentic commerce standard; Shopify Payments penetration climbs past 70%. Operating margins expand from ~17% toward 24% by FY30. ' +
      'EPS compounds at ~28% from the $1.91 FY2026 base. Multiple de-rates ~89× → 45× through earnings growth. 5yr target {target}, {cagr} annualized — solid but valuation-dependent.',
    'Agentic commerce inflects growth above 30% for multiple years. UCP network effects lock in merchants across ChatGPT, Copilot and Google surfaces. ' +
      'B2B scales to $2B+ revenue, Shop Pay becomes the Internet\'s default checkout outside the US, international sustains 45%+ GMV growth. ' +
      'FCF margin reaches 30%+ by FY30. EPS compounds at ~35% from $1.91 base. Multiple holds 60× given platform position. 5yr target {target}, {cagr} annualized.',
  ],

  thesis: [
    'E-commerce TAM saturates. Amazon Multi-Channel Fulfillment + Walmart Marketplace + TikTok Shop erode SMB acquisition. 2026 momentum proves transitory. ' +
      'Merchant solutions take-rate compresses as Stripe, Adyen and Meta-native checkout compete. Operating leverage stalls. ' +
      'At ~89× $1.91 FY2026E EPS (after the run to ~$171), even modest deceleration from 34% triggers severe multiple compression. Growth is the entire valuation justification.',
    'SHOP\'s flywheel keeps spinning off the 2026 base. UCP becomes the agentic commerce standard; Shopify is embedded in ChatGPT/Copilot/Google as the de-facto checkout. ' +
      'Shop Pay approaches 70%+ GMV penetration. Operating leverage delivers 200-300 bps/yr of margin expansion. Buybacks scale as FCF compounds. ' +
      'Quality commerce-infrastructure compounder — returns of {cagr} annualized from {spot} if 28% EPS CAGR materializes.',
    'AI-driven entrepreneurship inflection: Sidekick + agentic tools make starting a commerce business radically easier, expanding the addressable merchant base. ' +
      'UCP network effects lock in Shopify at the center of all AI-native commerce. International + B2B cross the compound threshold simultaneously. ' +
      'Operating margins reach 28%+ by FY30. EPS compounds at 35%+ from $1.91 base. Multiple holds 60×. {cagr} annualized from current entry.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.18, 0.25, 0.32],
  bullMaOptVal: false,

  epsCagr: [14, 28, 35],
  exitPE: [28, 45, 60],
  prob: [20, 45, 35],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
    {
      revPrem: [0.025, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  debtSafety: {
    netDebt: -7400,
    ebitda: 2200,
    fy: 'FY25',
    note: 'Net cash — $8.5B cash vs $1.1B debt = $7.4B net cash. Pristine balance sheet; no leverage concern.',
  },

  burry: {
    sbc: 449,
    gaapNi: 1500,
    buyback: 491,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'OK boundary — Burry cited SHOP in his Cassandra Unchained piece, but the reputation was earned in 2021-2022 era when SBC peaked at $615M (FY23) and the company was GAAP loss-making. TIKR FY25 actuals show a transformed profile: SBC just $449M (3.8% of revenue — the lowest of any Burry-cited name and lower than many Pristine industrials in our coverage). Buybacks $491M LTM just initiated, already > SBC issuance. Diluted shares 1,274M (FY21) → 1,307M (LTM) = +2.6% over 5y (+0.5%/yr) — minimal net dilution. GAAP operating margin 17%, up from -8.5% in FY22. SHOP deserves to be reclassified out of the deeply-Tragic Burry-cited cohort (DDOG/ZS/AXON/CRWD) and into the reformed-compounder cohort with NOW and META.',
  },
});
