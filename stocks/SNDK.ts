import { defineStock } from './defineStock';

export const SNDK = defineStock({
  ticker: 'SNDK',
  name: 'SanDisk Corporation',
  sector: 'NAND Flash Memory / AI Storage',
  themeColor: '#c0392b',
  currentPrice: 1759.68,
  shares0: 148,
  rev25: 13200,
  fcfMargin25: 0.25,
  taxRate: 0.13,
  cash: 3735,
  debt: 207,
  beta: 1.9,
  costDebt: 0.05,
  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '06/04',
  lastReportTag: 'Q3 FY26',
  fairPriceRange: '$1,500 - $4,500',

  strategicNarrative:
    'SanDisk emerged from Western Digital\'s February 2025 spinoff as the world\'s only pure-play publicly traded NAND flash company — combining the SanDisk brand (35+ years of flash dominance) with a world-class Kioxia manufacturing JV and near-zero reported CapEx via the fab-lite model. The spinoff timing was extraordinary: NAND pricing inflected from a historic trough (EBITDA -$847M in FY23) to a super-cycle driven by AI infrastructure demand. Model weight storage, inference caching, and vector database indexing require orders of magnitude more NAND per GPU cluster than prior computing generations — enterprise SSD is now a strategic input alongside GPUs for hyperscalers.\n\nThe structural bull case is a permanent demand floor that prior NAND cycles never had, with AI workloads sustaining 35-45% EBITDA margins even as client/consumer normalizes. SNDK\'s fab-lite structure amplifies FCF at cycle peaks while limiting downside capex exposure. The irreducible bear case is that NAND supply always responds: Samsung, SK Hynix, and Kioxia all have structural incentives to run fabs at full utilization regardless of price. FY23\'s negative EBITDA on $6B revenue is the template, not an outlier — the question is whether AI demand creates a floor or just raises the next trough by a few percentage points.',

  analystConsensus: { rating: 'Buy', targetLow: 1000, targetMedian: 1460, targetHigh: 3250, numAnalysts: 22 },

  modelType: 'EPS_PE',
  baseEps: 162,

  revGrowth: [
    [0.10, -0.30, -0.20, 0.05, 0.10],
    [0.25, 0.08, 0.07, 0.07, 0.06],
    [0.40, 0.28, 0.20, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.15, 0.02, -0.01, 0.06, 0.12],
    [0.25, 0.22, 0.20, 0.20, 0.21],
    [0.32, 0.30, 0.28, 0.27, 0.26],
  ],
  exitMultiple: [9, 14, 22],

  epsCagr: [-15, 5, 18],
  exitPE: [7, 11, 18],
  prob: [25, 50, 25],

  desc: [
    'NAND oversupply returns as Samsung/SK Hynix/Kioxia accelerate bit output through 2027-28. ASPs collapse toward variable cost — EBITDA margin reverts to near-zero as in FY23. EPS mean-reverts sharply. Stock re-rates to trough multiple (7×). Bear-case target ~$400-550.',
    'AI storage provides a structural demand floor, moderating the typical NAND cycle severity. Enterprise SSD mix-shift sustains above-trough margins. EPS compounds modestly on volume growth. Market assigns mid-cycle 11× on normalized earnings. Target ~$1,800-2,400.',
    'AI infrastructure becomes the dominant NAND demand driver — persistent supply/demand tightness sustains 35%+ EBITDA margins through the decade. SNDK captures premium enterprise SSD pricing as hyperscalers treat NAND as strategic. EPS compounds at 18%+; market re-rates to 18× as cyclicality is structurally impaired. Target ~$5,000-7,000.',
  ],

  ebitdaProxy: [0.12, 0.30, 0.46],
  bbRate: [0.003, 0.008, 0.015],
  bullMaOptVal: false,

  burry: {
    sbc: 54,
    gaapNi: 4507,
    buyback: 102,
    epsBasis: 'GAAP',
    fy: 'LTM Q3 FY26',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC is extraordinarily low for a $250B company ($54M LTM vs $4.5B GAAP NI = 1.2% naive ratio). Buybacks ($102M) nearly 2× SBC. Stock has appreciated ~36× since Feb 2025 spinoff, creating large unvested award values, but annual SBC flow remains minimal. Estimated 10% overstatement using MTM amplifier (6×) partially offset by buyback credit. Watch closely as SBC ratchets up with stock re-pricing.',
  },

  debtSafety: {
    netDebt: -3528,
    ebitda: 5632,
    fy: 'LTM Q3 FY26',
    note: 'Net cash of $3.5B — spinoff did not inherit WD debt. Fab-lite model via Kioxia JV avoids balance sheet capex exposure. Financially invulnerable at current cycle.',
  },
});
