import { defineStock } from './defineStock';

export const APP = defineStock({
  ticker: 'APP',
  name: 'AppLovin Corporation',
  sector: 'Ad-Tech / AI Monetization',
  themeColor: '#f97316',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 277.04,
  fairPriceRange: '$325 - $790',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 337,         // Q2 2026 diluted 337.0M (335M outstanding)
  rev25: 8090,          // FY2026E consensus $8.09B (Q1 $1.84B + Q2 $1.92B + Q3 guide $2.07B) — base year; revGrowth[0] = FY27 (consensus $10.23B, +26%)
  fcfMargin25: 0.68,    // FY2026: FCF guide ~75% of EBITDA (84-85%) ≈ 63-64% of revenue
  taxRate: 0.127,
  cash: 3053,           // Jun 30 2026
  debt: 3515,           // Jun 30 2026 long-term debt
  beta: 2.22,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 16.67,       // FY2026E EPS — stockanalysis consensus (Oct 9 2026; range $15.65-17.78; FY27E $20.78, +25%). Q2 diluted EPS $3.76. Prior: $14.50 (EBITDA × FCF-conversion estimate).
  rsRating: 41,         // IBD RS per user, 10/10/2026 (was 58)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // A rare miss. Revenue $1,924M (+53%) — just under the $1,915-1,945M guide
  // midpoint; adj. EBITDA $1,614M (+58%, 84% margin) — just BELOW the
  // $1,615-1,645M range. Mgmt blamed timing of model improvements, not
  // demand/competition. Net income $1,267M, EPS $3.76. Q2 OCF/FCF only
  // ~$0.87B (vs $1.6B EBITDA — tax/working-capital timing). Buybacks $551M
  // (1.1M shares). SBC $86M. Cash $3.05B vs debt $3.52B. Q3 GUIDE: revenue
  // $2,055-2,085M (~0.6% below consensus), adj. EBITDA $1,710-1,740M (83%).
  // Stock fell as much as ~21% on the print and kept sliding: ~$396 (Jul 31)
  // → $277 (Oct 9). Street: Buy (33), PT $325-790 (median $470) — stock now
  // below the LOW target; ~17× FY26E / ~13× FY27E EPS. Net: fundamentals
  // still elite, but the "never misses" premium is gone and momentum broke.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'AXON AI engine delivers mobile advertisers measurably better ROAS, creating compounding lock-in as spend scales up.',
    'Best-in-class EBITDA margins with a high-fixed-cost model mean every incremental revenue dollar is nearly pure profit.',
    'Self-serve platform launch opens the long tail of SMB advertisers, dramatically expanding the potential customer base.',
    'Lead-gen expansion into auto, health, and fintech diversifies away from pure gaming and reduces cyclicality.',
    'Aggressive buyback program with share count effectively flat demonstrates rare capital discipline at this growth rate.',
  ],

  risksToBuy: [
    'Revenue growth IS the valuation — any deceleration will compress the multiple severely given the premium entry price.',
    'Algorithmic black-box nature keeps institutional buyers cautious and makes advertiser trust fragile during any miss.',
    'Meta\'s competing AI ad platform is expanding the bid density pie but also intensifying competition for the same budgets.',
    'Self-serve conversion rate must scale efficiently or the TAM expansion thesis stalls at the onboarding bottleneck.',
    'Ad spend is highly cyclical — a macro slowdown or consumer pullback would hit revenue with no cost cushion to absorb it.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 325, targetMedian: 470, targetHigh: 790, numAnalysts: 33 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.12, 0.08, 0.06, 0.05, 0.05],  // Bear: Q2 miss was the start of a slowdown; self-serve disappoints, consumer stalls
    [0.26, 0.18, 0.16, 0.15, 0.14],  // Base: FY27 ≈ consensus +26%; self-serve ramps, consumer + lead-gen expand
    [0.30, 0.27, 0.23, 0.20, 0.18],  // Bull: consumer + lead-gen + CTV all scale
  ],
  fcfMargin: [
    [0.68, 0.65, 0.62, 0.60, 0.58],
    [0.72, 0.72, 0.71, 0.70, 0.70],
    [0.72, 0.74, 0.75, 0.76, 0.76],
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'June self-serve launch stalls — onboarding friction persists despite video creative tools. The consumer vertical loses momentum as macro cuts e-commerce ad budgets. ' +
      'Revenue growth decelerates from ~50% to single digits within 2 years (the Q2 2026 miss as the first crack). At ~84% EBITDA margins there is zero cushion — every revenue miss flows straight through. ' +
      'Multiple compresses from ~17x to 12x. Earnings grow only ~5% from the $16.67 FY26E base. 5yr target {target} ({cagr} annualized).',
    'June self-serve launch ramps efficiently: <30-day breakeven and near-zero churn confirm the cohort economics. Consumer vertical sustains April record momentum through 2026. ' +
      'Lead-gen model (auto/health/fintech) rolls out in 2027 as the next TAM expansion. Revenue compounds at ~22% annually; 85% EBITDA margins hold. ' +
      'EPS grows ~21% from the $16.67 base; the multiple recovers toward 22x as execution resumes. 5yr target {target} ({cagr} annualized).',
    'Self-serve + consumer + lead-gen + CTV all compound simultaneously. 100K+ new advertisers per year at $70K+ LTV creates a flywheel where more demand density raises publisher ROAS, which attracts more supply. ' +
      'Revenue sustains 28-30% growth for 3+ years. Buybacks accelerate on $5B+ FCF. ' +
      'EPS grows ~37% from the $16.67 base; market re-rates from cyclical to structural at 25x. 5yr target {target} ({cagr} annualized).',
  ],
  thesis: [
    'Ad cycle turns down — macro cuts budgets. Meta captures no-ID traffic, TikTok takes share. ' +
      'Margin at 82-84% EBITDA has zero room to expand — revenue miss flows straight to EPS. ' +
      '"Black box" narrative keeps an institutional discount, and the Q2 2026 miss broke the "never misses" premium. ' +
      'Self-serve qualified leads → go-live at 57% shows conversion bottleneck (lack of creatives for format).',
    'Q1 guide (+5-7% QoQ despite seasonality) validates growth engine intact. ' +
      'Self-serve GA 1H26 broadens advertiser base. CAC/LTV 30-day breakeven = scalable growth loop. ' +
      'MAX lock-in (>50% of publisher UA spend) sustains moat. Platform broadening reduces cyclicality. ' +
      'GenAI creative tools remove key bottleneck. Buybacks + $3.28B auth provide EPS floor.',
    'AppLovin becomes the default monetization + creative platform for mobile ecosystem. ' +
      'Self-serve + GenAI tools + e-comm solve advertiser diversity problem → conversion rate expansion. ' +
      'Network effects compound: more advertisers → better auction → higher publisher ROAS → more publishers. ' +
      'CTV, web, lead-gen open new TAM. $4B+ FCF funds aggressive buybacks. ' +
      'Meta competition expands pie (bid density) rather than taking share.',
  ],

  epsCagr: [5, 21, 37],   // Bear 15→5 at Q2 2026 review: the old bear (15% at 18x) still returned ~17%/yr — not a bear case
  exitPE: [12, 22, 25],   // Bear 18→12 to match a de-rating on decelerating growth
  prob: [20, 45, 35],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.70, 0.78, 0.82],
  bullMaOptVal: false,

  burry: {
    sbc: 210,
    gaapNi: 3420,
    buyback: 2584,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'Ok (major downgrade from original Tragic 50% after TIKR refresh). FY25 TIKR actuals dramatically cleaner than estimated: SBC just $210M (was $660M est, 3× too high), buybacks $2,584M (was $1,000M est, 2.5× too low). Key metrics put APP in elite-compounder territory: SBC just 3.8% of revenue (matches FICO 7%, SHOP 3.8% range), Buyback/SBC ~12× (matches FICO 12× — highest tier), diluted share count actually **-0.7% over 5 years** (342.76M FY21 → 340.43M LTM). SBC = 5.2% of CFO — among the cleanest in our coverage. The ~16× MTM amplifier (stock $30 → $469) suggests Burry-style methodology should apply some haircut, but aggressive buybacks at current prices are literally paying the MTM cost upfront — that\'s the right way to handle dilution. 77% operating margin + 73% FCF margin at 70% revenue growth is genuinely extraordinary. APP should be classified alongside META/SHOP/NOW as a reformed-compounder, not the broken-SaaS cohort.',
  },

  debtSafety: {
    netDebt: 462,        // Jun 30 2026: debt $3,515M − cash $3,053M
    ebitda: 6800,        // FY2026E: ~84% adj EBITDA margin × ~$8.1B revenue
    fy: 'FY26E',
    note: 'Net leverage ~0.07× — effectively debt-free relative to earnings power. $5B+ annual FCF rapidly deleverages; $3.28B buyback authorization provides capital return floor.',
  },
});
