import { defineStock } from './defineStock';

export const MRVL = defineStock({
  updatedOn: '05/07',
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 160.01,
  fairPriceRange: '$34 - $160',
  shares0: 870,
  rev25: 8195,
  fcfMargin25: 0.24,
  taxRate: 0.15,
  cash: 2640,
  debt: 4470,
  beta: 2.29,
  costDebt: 0.055,
  rsRating: 81,
  aiImpact: 'TAILWIND',
  strategicNarrative: "AI interconnect architect with record FY26 ($8.2B, +42%) and strong FY27 guide (~$11B, +30%). Three engines firing: (1) optical DSP — 70-80% share of 800G, 1.6T in volume production, Celestial AI photonic fabric targets $500M run-rate by Q4 FY28; (2) custom silicon — scaled from near-zero to $1.5B in one year (Amazon Trainium, Microsoft Maia, Google), +20% FY27 with FY28 re-acceleration; (3) switching/CXL — XConn acquisition adds PCIe/CXL depth, 51.2T workhorse + 100T intro. Mgmt targets ~$15B FY28 revenue with non-GAAP EPS 'well over $5'. At $90 entry, stock prices significant growth but not yet the FY28 inflection. Key risks: customer concentration (3 hyperscalers drive bulk of growth), Broadcom competition in optical DSPs, 2nm execution risk, AI capex cyclicality. Prob-weighted 5yr target ~$130 → ~8% CAGR at $90 — asymmetric if FY28 delivers.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 90, targetMedian: 120, targetHigh: 155, numAnalysts: 30 },
  revGrowth: [
    [0.28, 0.08, 0.06, 0.05, 0.05],
    [0.34, 0.30, 0.15, 0.10, 0.08],
    [0.36, 0.36, 0.22, 0.15, 0.12],
  ],
  fcfMargin: [
    [0.24, 0.25, 0.26, 0.27, 0.27],
    [0.26, 0.29, 0.31, 0.32, 0.33],
    [0.27, 0.31, 0.34, 0.36, 0.37],
  ],
  exitMultiple: [18, 26, 32],
  desc: [
    'AI capex pauses mid-FY28. Custom silicon growth stalls at +10-15% as hyperscaler programs delay next-gen XPUs. Optical DSP share erodes to 60% as Broadcom closes gap. Revenue reaches ~$13.5B by FY31 but margins plateau at 27%. Exit at 18x FCF. CAGR ~-2%.',
    'AI capex sustains through FY28 per management guide. Revenue hits ~$15B FY28, then decelerates to low-teens growth. Custom silicon +20% FY27 with moderate FY28 pickup. Celestial photonic fabric on track. EBIT margin expands to 36%. Exit at 26x FCF. CAGR ~9%.',
    'AI boom extends multi-year. Custom FY28 re-accelerates (new XPU customer + NIC/CXL attach doubles). Celestial hits $1B run-rate by FY29. Switching reaches $1B+. Revenue approaches $24B by FY31 with 37% FCF margin. Exit at 32x FCF. CAGR ~22%.',
  ],
  thesis: [
    'AI capex cycle peaks FY27. Hyperscalers rationalize custom silicon spending — one program delay cascades. Broadcom takes 800G/1.6T optical share with integrated switching+optics bundles. Celestial AI integration stumbles, $500M run-rate slips to FY29+. Revenue growth decelerates sharply after FY27. Multiple compresses to 18x as market prices "just a cycle".',
    'FY27 delivers per guide (~$11B). FY28 on track for ~$15B as custom grows +25-30%, Celestial begins contributing, and 1.6T optics scales. Three hyperscaler relationships remain solid. Margin expansion continues (non-GAAP EBIT to 36%). Growth moderates post-FY28 to 8-15% as AI infrastructure buildout matures. P/E holds 22-26x.',
    'Full 10-15yr AI cycle thesis plays out. Custom silicon pipeline expands beyond 3 hyperscalers. Celestial photonic fabric captures scale-up TAM from near-zero ($10B+ by 2030). XConn CXL switching enables memory-disaggregated architectures. 2nm designs win next-gen programs. Revenue compounds 20%+ through FY31. MRVL becomes the dominant AI interconnect platform.',
  ],

  prob: [20, 50, 30],
  termGrowth: [0.025, 0.035, 0.04],

  bbRate: [0.002, 0.005, 0.01],
  ebitdaProxy: [0.30, 0.40, 0.45],
  bullMaOptVal: 90 * 870 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.03, 0.03, 0.02, 0.02, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
  ],
});
