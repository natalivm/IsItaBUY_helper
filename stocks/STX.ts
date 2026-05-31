import { defineStock } from './defineStock';

export const STX = defineStock({
  ticker: 'STX',
  name: 'Seagate Technology Holdings',
  sector: 'Data Storage / AI Infrastructure',
  themeColor: '#00a651',
  currentPrice: 879.80,
  fairPriceRange: '$520 - $1,420',
  shares0: 224,
  rev25: 12500,
  fcfMargin25: 0.19,
  taxRate: 0.15,
  cash: 1200,
  debt: 4200,
  beta: 1.98,
  costDebt: 0.045,
  rsRating: 98,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/31',
  lastReportTag: 'Q3 FY26',

  strategicNarrative:
    'The AI storage thesis is real: HAMR technology gives Seagate a density edge that hyperscalers are paying for, and AI data creation requires orders of magnitude more raw storage per compute dollar than prior generations. FCF is genuine at $2.4B (19% margin) and growing. ' +
    "The problem is that the market already knows all of this. After a 600%+ run, STX trades at ~83× FCF — pricing in years of hypercycle growth before it happens. The probability-weighted target is $938, only fractionally above today's price ($879.80). " +
    'Multiple compression is the hidden risk in every scenario. The current P/FCF at $880 is ~83× — even the bull case assumes compression from 83× → 54× while FCF compounds at 20%/yr. That is actually a coherent and conservative framing of the AI hypercycle: the business grows fast, but the multiple normalizes as the narrative matures. In the base case, 13% FCF growth after a 45% multiple haircut yields roughly flat performance. Being right on the business does not guarantee being right on the investment. ' +
    'HOLD. A pullback to $650–750 would materially improve the setup. At $880, you are already paying for the bull case. ' +
    'Burry (estimated): 45% overstatement (Critical), adjusted target ~$516.',

  analystConsensus: { rating: 'Buy', targetLow: 545, targetMedian: 814, targetHigh: 1140, numAnalysts: 24 },

  revGrowth: [
    [0.04, 0.04, 0.03, 0.03, 0.02],  // Bear: hyperscalers pivot to compute/flash, HAMR adoption slows
    [0.10, 0.10, 0.09, 0.08, 0.07],  // Base: AI storage sustains, HAMR drives moderate upgrade cycle
    [0.18, 0.16, 0.15, 0.12, 0.10],  // Bull: HAMR dominates hyperscale cold storage, AI data growth accelerates
  ],

  fcfMargin: [
    [0.16, 0.16, 0.15, 0.15, 0.15],
    [0.19, 0.20, 0.21, 0.21, 0.22],
    [0.22, 0.24, 0.25, 0.25, 0.26],
  ],

  exitMultiple: [8, 12, 16],

  modelType: 'EPS_PE',
  baseEps: 10.60,      // FCF per share ($2.375B FCF / 224M shares); exitPE = P/FCF multiples
  epsCagr: [4, 13, 20],
  exitPE: [41, 46, 54],
  prob: [25, 50, 25],

  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.005, 0.012, 0.020],
  ebitdaProxy: [0.22, 0.28, 0.34],
  bullMaOptVal: false,

  desc: [
    "Storage demand disappointment: hyperscalers shift capex toward compute and flash as AI inference latency requirements grow. HAMR adoption slows as cloud providers delay HDD capacity refresh. Traditional cycle dynamics return — pricing pressure from WD and Toshiba, FCF margins compress below 16%. Exit multiple re-rates to 8× EBITDA, reflecting commoditized storage economics. 5yr target ~$520, roughly -10% annualized.",
    "AI storage tailwind is real but the market already knows it. HAMR upgrade cycle proceeds steadily, driving modest ASP uplift and volume growth. FCF grows from $2.4B to ~$3.8B by Year 5 as margins gradually expand. Revenue compounds at 7-10% annually. Exit at 12× EBITDA reflects a quality storage franchise with moderate growth. 5yr target ~$905 — essentially flat to today's price; business performs, stock already prices it.",
    "HAMR becomes the definitive hyperscale cold-storage standard. AI training datasets and inference caches grow faster than projected; STX is uniquely positioned as the capacity and cost leader. ASP and volume both expand simultaneously — a rare HDD supercycle. FCF margins push toward 26% on operating leverage. Exit at 16× EBITDA reflects near-infrastructure-quality cash flows. 5yr target ~$1,420, roughly +10% annualized — requires AI data growth to sustain and flawless HAMR execution.",
  ],

  thesis: [
    "Bear mechanics: NAND/flash continues its cost-per-bit improvement trajectory, encroaching on warm-storage use cases currently served by HDD. Hyperscalers have demonstrated willingness to over-build flash when pricing is favorable. AI inference moves toward SSD-heavy architectures; cold-storage datasets get compressed and tiered more aggressively. HAMR premium disappears as WD closes the technology gap. Traditional HDD cycle playbook: supply expands → pricing collapses → margins crater. Beta of 1.98 means the stock falls harder than the market in any risk-off environment. From near ATH after a 600%+ run, even mild disappointment triggers severe multiple compression.",
    "Structural AI storage demand is genuine: foundation model training requires exabytes of raw storage, inference caching scales with deployed model count, and video/multimodal AI data grows geometrically. Hyperscalers cannot substitute HDD with flash at petabyte scale — cost parity is 5-10 years away at minimum. HAMR achieves density milestones that extend HDD's cost-per-bit advantage for the foreseeable future. FCF is real and growing: $2.4B on $12.5B revenue. Net debt of $3B is only 0.86× EBITDA — no balance sheet risk. The problem: a 600%+ run has already discounted most of this. Intrinsic base value $905 vs. current price $879 — thin margin of safety. Hold, don't add at this level.",
    "Bull mechanics: AI data creation follows a power-law that dwarfs prior computing eras. HAMR at 30TB+ per drive creates a fundamental cost advantage that sustains multi-year pricing power. AWS, Azure, Google, and Meta treat multi-exabyte cold storage as a perpetual infrastructure capex line — STX captures the economics as the only HAMR-scale vendor. Operating leverage: fixed-cost manufacturing + growing ASP = margin expansion toward 26%+ FCF. At $1,420 (+10% annualized), STX trades at roughly 35× trailing FCF — justified only if HAMR becomes a multi-decade standard and AI storage capex compounds indefinitely. Probability 25% — requires both the technology bet and the demand cycle to work simultaneously for five years.",
  ],

  burry: {
    sbc: 520,
    gaapNi: 1300,
    buyback: 600,
    epsBasis: 'GAAP',
    fy: 'FY26 run-rate',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical — SBC $520M vs. GAAP NI $1.3B = 40% naive ratio. MTM amplifier applied for >5× stock appreciation over 3 years. Buybacks ($600M) modestly exceed SBC (1.15× ratio) — not enough to provide significant offset. Burry-adjusted blended target ~$516.',
  },

  debtSafety: {
    netDebt: 3000,
    ebitda: 3500,
    fy: 'FY26',
    note: 'Net Debt $3.0B / EBITDA ~$3.5B = 0.86× — well within the 2× threshold. Cash $1.2B vs. total debt $4.2B. HDD manufacturing CapEx is manageable at this leverage level.',
  },
});
