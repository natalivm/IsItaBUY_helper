import { defineStock } from './defineStock';

export const TLN = defineStock({
  ticker: 'TLN',
  name: 'Talen Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '05/12',
  currentPrice: 374.61,
  fairPriceRange: '$230 - $690',
  shares0: 45.96,
  rev25: 2430,
  fcfMargin25: 0.20,
  taxRate: 0.21,
  cash: 650,
  debt: 9250,      // $5,800M pre-acquisition + $3,450M ECP gas plant financing
  beta: 1.0,       // Elevated post-acquisition leverage raises equity beta from 0.85
  costDebt: 0.07,
  modelType: 'EPS_PE',
  baseEps: 10.50,   // Adjusted earnings power (~FCF/share); GAAP P/E of 77x is hedging distortion
  rsRating: 64,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  strategicNarrative: "Nuclear moat meets AI infrastructure premium. The January 2026 acquisition of 2.6 GW of PJM gas capacity from Energy Capital Partners at 6.6x EBITDA — well below peer comps of 9–11x — transforms TLN into a scale power platform with a compounding FCF engine. The trailing P/E of 77x is an accounting distortion from hedging; the real thesis is >15% annual adjusted FCF/share growth through 2030 as legacy hedges roll off and AI-driven electricity demand accelerates. The Amazon Susquehanna co-location deal is the template: 24/7 carbon-free nuclear baseload cannot be replicated at scale, and hyperscalers will pay a structural premium for it. TLN's low hedge ratios give it the highest leverage to rising power prices among peers — it's a leveraged bet on electricity pricing embedded in a nuclear moat. 12-analyst consensus rates it Strong Buy at a $435 average 12-month target; Scotiabank raised its target to $463 post-acquisition. Key risks: PJM concentration (no ERCOT diversification unlike peers), integration execution on the ECP gas plants, and regulatory exposure to FERC scrutiny on nuclear-to-data-center co-location. Any macro softening or policy setback could reprice this sharply given how much forward value is already baked in. For investors with conviction on the AI power supercycle, TLN is the purest nuclear moat play in the market — but it demands near-perfect execution. ",


  epsCagr: [8, 15, 22],
  exitPE: [13, 18, 24],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 314, targetMedian: 438, targetHigh: 576, numAnalysts: 12 },
  revGrowth: [
    [0.10, 0.06, 0.05, 0.05, 0.04],  // Bear: slow gas plant integration, PJM reform headwinds, soft power prices
    [0.30, 0.12, 0.11, 0.10, 0.09],  // Base: ECP acquisition step-up + 15%+ FCF/share compounding through 2030
    [0.40, 0.18, 0.17, 0.16, 0.14],  // Bull: AI power surge + nuclear co-location premium + hyperscaler deals
  ],
  fcfMargin: [0.16, 0.21, 0.26],
  exitMultiple: [11, 16, 22],
  desc: [
    'Regulatory setback on nuclear co-location and PJM capacity market reforms pressure revenues; gas plant integration disappoints and elevated leverage weighs on FCF.',
    'ECP acquisition integrates on schedule and drives >15% FCF/share growth through 2030; nuclear scarcity premium holds as hyperscalers compete for 24/7 carbon-free baseload power.',
    'AI-driven electricity demand accelerates PJM capacity prices; Susquehanna co-location model expands to additional hyperscaler agreements, unlocking AI-infrastructure multiples across the full asset base.',
  ],
});
