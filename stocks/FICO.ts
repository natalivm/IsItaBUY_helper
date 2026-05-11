import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1092,
  updatedOn: '05/11',
  fairPriceRange: '$1,100 - $2,200',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 162,
  debt: 3640,
  beta: 1.24,
  costDebt: 0.055,
  rsRating: 6,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Q2 FY2026 (Mar quarter) materially refuted the bear thesis: Revenue $691.7M (+38.7% YoY), Adj. EPS $12.50 (+60.1%), Operating margin 58.2% (+893bps YoY), FCF $214.3M (+227% YoY). Mgmt raised FY26 guide to $2.45B revenue (from $2.35B) and Non-GAAP EPS $40.45 (from $38.17). Scores segment $475M (+60% YoY) — driven by +72% B2B growth on mortgage origination pricing power and volume recovery. So far, VantageScore competitive threat has not materialized in the numbers — FICO's pricing power survived the regulatory overhang. Caveats: Software grew only +7.4% (non-platform ARR -8% — legacy erosion); Scores now 68.7% of revenue (concentration risk on mortgage cycle); long-term debt rose to $3.64B (from $2.66B at FY25-end), deepening stockholders' deficit to -$2.10B as debt-funded shareholder returns continue. RS 6 still reflects severe institutional distribution coming into the print — re-rating potential if momentum reverses. At $1,015, market is paying ~25x revised FY26 Non-GAAP EPS — discount remains for VantageScore/regulatory tail risk. Risks: mortgage cycle reversal, FHFA pricing caps, VantageScore GSE adoption inflection, debt service burden.",


  analystConsensus: { rating: 'Buy', targetLow: 1600, targetMedian: 1556, targetHigh: 2661, numAnalysts: 12 },
  // FY26 guide raised to $2.45B = +23% off rev25 $1,990. Year 1 in all cases reflects guide is largely locked in (Q2 +38.7% already booked).
  revGrowth: [
    [0.20, 0.06, 0.04, 0.03, 0.02],   // Bear: meet most of FY26 guide, then mortgage cycle rolls + VantageScore wins
    [0.23, 0.13, 0.11, 0.10, 0.09],   // Base: hit raised guide, normalize off mortgage cycle peak
    [0.25, 0.17, 0.15, 0.13, 0.12],   // Bull: beat raised guide, mortgage cycle has further to run, Platform re-accel
  ],
  // Q2 FY26 op margin 58.2% (+893bps), FCF tripled. Operating leverage demonstrated.
  fcfMargin: [
    0.32,
    [0.40, 0.40, 0.40, 0.41, 0.41],
    [0.41, 0.42, 0.42, 0.43, 0.43],
  ],
  exitMultiple: [17, 25, 30],
  bbRate: [0, 0.04, 0.02],

  termGrowth: [0.015, 0.03, 0.035],
  ebitdaProxy: [0.44, 0.55, 0.60],
  prob: [40, 40, 20],

  desc: [
    'FY26 guide gets met (Q2 already locked it in), but the mortgage origination cycle peaks late-2026 and rolls over. VantageScore gains meaningful GSE adoption and FHFA mandates pricing caps. ' +
      'Scores growth craters from +60% YoY to mid-single digits as lenders switch to cheaper alternatives. Software remains stuck at HSD with non-platform ARR continuing to erode. ' +
      '$3.64B debt load and rising interest costs crowd out reinvestment. FCF margins compress to ~32% with EBITDA exit at 17x as market de-rates the monopoly thesis.',
    'Q2 FY26 set the tone: revenue +38.7%, op margin +893bps, FCF tripled. Mgmt raised FY26 guide to $2.45B revenue and $40.45 Non-GAAP EPS. ' +
      'Scores pricing power and mortgage volume recovery sustain through 2026, then normalize to LDD growth. Software stabilizes at ~10% as Platform offsets non-platform decline. ' +
      'FCF margins hold at ~40% — operating leverage is structural, not cyclical. EBITDA exits at 25x as the market prices a discounted-but-still-dominant franchise.',
    'Mortgage cycle has more room to run than consensus expects, and FICO\'s 72% B2B growth rate proves Scores pricing power is still inflecting. VantageScore threat fades to noise (data quality, lender inertia, GSE delays). ' +
      'Platform ARR re-accelerates with AI-driven decisioning demand; non-platform erosion is fully absorbed. FCF margins reach 43% on continued operating leverage. ' +
      'Multiple re-rates back toward 30x EBITDA as the bear case dissolves.',
  ],

  burry: {
    sbc: 157,
    gaapNi: 652,
    buyback: 1619,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 18,
    overstatementSource: 'estimated',
    note: 'Ok (downgraded from original 22% after TIKR refresh confirms even cleaner profile). FY25 TIKR actuals: SBC $157M (7.3% of revenue — excellent), buybacks $1,619M (LTM $1,923M = **12× SBC coverage** — best ratio in our entire coverage). Diluted shares 29.26M (FY21) → 24.11M (LTM) = **−17.6% over 5 years** at −3.8%/yr. This is the strongest net buyback profile in our 70-stock universe. SBC = 18% of CFO (elite); SBC = 18% of FCF — far cleaner than DDOG/ZS/AXON (66-3,222%). Model behaves like Moody\'s/SPGI/VeriSign-style monopoly compounder rather than dilution-dependent SaaS. Risk note: FICO funds buybacks partly with debt issuance, which adds modest financial risk but is manageable given 50%+ operating margins.',
  },
});
