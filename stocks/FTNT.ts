import { defineStock } from './defineStock';

export const FTNT = defineStock({
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 107.97,
  updatedOn: '05/07',
  fairPriceRange: '$70 - $105',
  shares0: 743.6,
  rev25: 6800,
  fcfMargin25: 0.325,
  taxRate: 0.18,
  cash: 4600,
  debt: 995,
  beta: 1.05,
  costDebt: 0.048,
  rsRating: 30,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Fortinet owns the ASIC-driven SASE platform play in cybersecurity — proprietary silicon gives a cost/performance edge that cloud-native peers can't match, with 32.5% FCF margins and a $4.6B net cash fortress. " +
    "SASE inflection is showing early signs (40% billings growth Q4), AI is driving incremental demand across data centers and SecOps, and OT security (25% growth) adds a fast-growing third vector. " +
    "The risk: RS 27 signals institutions aren't buying yet, and the stock needs sustained execution to justify its premium. " +
    "Hold for existing positions; entry improves on a pullback or if RS trend turns up confirming institutional accumulation.",


  analystConsensus: { rating: 'Hold', targetLow: 70, targetMedian: 84, targetHigh: 100, numAnalysts: 25 },
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
});
