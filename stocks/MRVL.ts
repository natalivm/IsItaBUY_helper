import { defineStock } from './defineStock';

export const MRVL = defineStock({
  updatedOn: '07/03',
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 87.48,
  fairPriceRange: '$90 - $160',
  shares0: 870,
  rev25: 5770,
  fcfMargin25: 0.243,
  taxRate: 0.15,
  cash: 1000,
  debt: 5100,
  beta: 2.29,
  costDebt: 0.055,
  rsRating: 81,
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',
  strategicNarrative: "Type B — cyclical growth on AI capex wave. Post-Barclays (Dec 2025): mgmt frames AI as 10–15yr cycle with ups/downs, record bookings Q2→Q3→Q4 accelerating. Three engines: (1) optics/interconnect — 80–90% intra-DC traffic migration from copper, TAM from near-zero; (2) switching — $300M FY26 → $500M+ FY27, 51.2T ramp + 100T intro + scale-up UALink sampling 2H FY27; (3) custom XPU + attach (NIC+CXL) — FY27 base +20%, FY28 re-acceleration via new XPU customer + attach doubling. Moat moderate (design-win concentration). EBIT margin 29%→36%. Probability of 15%+ CAGR: ~60–65% (up from 55–60% pre-Barclays). Key risk: spending pause in FY27H2/FY28H1 hits MRVL harder than AVGO. MRVL beats AVGO only if FY28 re-accelerates + attach scales + P/E holds ≥22x.",


  analystConsensus: { rating: 'Buy', targetLow: 67, targetMedian: 119, targetHigh: 156, numAnalysts: 31 },
  revGrowth: [
    [0.20, 0.05, 0.05, 0.05, 0.05],
    [0.42, 0.22, 0.30, 0.10, 0.08],
    [0.42, 0.25, 0.32, 0.18, 0.15],
  ],
  fcfMargin: [
    [0.18, 0.20, 0.21, 0.21, 0.22],
    [0.215, 0.27, 0.29, 0.31, 0.32],
    [0.23, 0.29, 0.32, 0.34, 0.36],
  ],
  exitMultiple: [18, 26, 32],
  desc: [
    'AI capex pause hits FY27H2/FY28H1. Switching stalls at ~$300M, custom FY28 re-acceleration fails. P/E compresses to 18x. EPS CAGR ~8%. Target ~$92, CAGR ~3–4%.',
    'AI capex sustains through 2028. Switching hits $500M+ FY27. EBIT margin expands to 35–36%. Custom base +20% FY27. EPS CAGR ~16%, P/E ~22x. Target ~$160, CAGR ~15%.',
    'AI boom extends. Switching reaches $1B run-rate by FY28. Custom FY28 re-accelerates (new XPU customer + NIC/CXL attach doubles). Scale-up optics TAM materializes. EPS CAGR ~22%. Target ~$266, CAGR ~27%.',
  ],
  thesis: [
    'Spending pause 2–3 quarters in FY27H2/FY28H1. 51.2T switch ramp slows, scale-up UALink slips to FY29. Custom "next XPU customer" delays. Optics follows capex (no outgrowth). P/E compresses to 18–20x as market prices "just a cycle".',
    'Barclays-confirmed bookings sustain through FY27. Switching: $300M→$500M on schedule, 51.2T is workhorse. Custom +20% base FY27, modest FY28 pickup. Optics grows above capex (1.6T ramp). Margin expansion to 35–36% EBIT. P/E holds 22–24x.',
    'Full Barclays thesis plays out: 10–15yr AI cycle without major pause. Switching: $500M→$1B+ (51.2T + 100T + scale-up UALink volume FY28). Custom: FY28 doubling via new XPU + attach (NIC+CXL → ~$2B potential by decade end). Scale-up optics/CPO = TAM from zero. Celestial AI: $500M run-rate exiting FY28 (bull timing). MRVL beats AVGO on 5yr basis.',
  ],

  prob: [25, 45, 30],
  termGrowth: [0.025, 0.035, 0.04],

  bbRate: [0.003, 0.01, 0.015],
  ebitdaProxy: [0.25, 0.35, 0.42],
  bullMaOptVal: 79.50 * 870 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.03, 0.03, 0.02, 0.02, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
  ],
});
