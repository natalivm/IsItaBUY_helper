import { defineStock } from './defineStock';

export const APH = defineStock({
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  updatedOn: '06/05',
  lastReportTag: 'Q1 2026',
  currentPrice: 138.81,
  fairPriceRange: '$77 - $290',
  shares0: 1278,
  rev25: 31000,
  fcfMargin25: 0.19,
  taxRate: 0.27,
  cash: 4600,
  debt: 18700,
  beta: 1.25,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 4.40,
  rsRating: 89,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Amphenol delivered a blockbuster Q1 2026: $7.6B revenue (+58% YoY, +33% organic), adj EPS $1.06 (+68%), book-to-bill 1.24x with all end markets positive. " +
    "IT Datacom is now 41% of sales with 81% organic growth driven by AI infrastructure; Q2 guided to $8.1–8.2B (+43–45% YoY). " +
    "CommScope (CCS) closed January 2026, adding ~$4.1B in annual revenue and a unique fiber/building-connectivity platform — the combination gives Amphenol the broadest high-speed copper + power + optics suite in the industry. " +
    "Defense adds a second structural tailwind (+25% organic YoY, all geographies). " +
    "At ~$122, the stock trades at roughly 28x FY2026 adj EPS (~$4.40) — a meaningful discount to the 38–40x it commanded at peak. " +
    "Key risk: 41% IT Datacom concentration means an AI-capex pause hits hard, and CommScope margins are still dilutive until integration matures.",

  reasonsToBuy: [
    'Broadest high-speed copper, power, and optics connector suite in the industry after the CommScope acquisition.',
    'AI infrastructure tailwind is driving record organic growth in IT Datacom, now the dominant revenue segment.',
    'Defense electronics exposure adds a durable second growth driver uncorrelated with the tech capex cycle.',
    'Decentralized acquisition model has compounded shareholder value across decades with disciplined bolt-on M&A.',
    'Book-to-bill above one with all end markets positive signals revenue momentum well into the next several quarters.',
  ],

  risksToBuy: [
    'IT Datacom concentration means an AI capex pause would hit revenue and earnings disproportionately hard.',
    'CommScope integration is still maturing and margins remain dilutive until the combination fully absorbs.',
    'Elevated debt load from acquisitions reduces financial flexibility if the cycle softens unexpectedly.',
    'Premium connector hardware faces commoditization risk as hyperscalers develop custom in-house interconnect solutions.',
    'Multiple has de-rated from peak but remains demanding relative to trough earnings power in a downcycle.',
  ],

  epsCagr: [3, 13, 22],
  exitPE: [22, 30, 38],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 135, targetMedian: 173, targetHigh: 210, numAnalysts: 12 },
  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.03],
    [0.12, 0.10, 0.09, 0.08, 0.07],
    [0.20, 0.18, 0.15, 0.13, 0.10],
  ],
  fcfMargin: [
    [0.17, 0.16, 0.15, 0.15, 0.14],
    [0.18, 0.17, 0.17, 0.17, 0.17],
    [0.18, 0.19, 0.19, 0.19, 0.20],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI capex softens meaningfully in 2027, exposing the 41% IT Datacom concentration and CommScope\'s still-dilutive margin profile. ' +
      'Earnings growth decelerates to low single digits as the multiple compresses from 28x to the historical 22x trough. ' +
      'At current entry, this scenario delivers roughly flat 5-year total returns.',
    'AI infrastructure build-out sustains at a moderate pace; CommScope integrates on schedule and approaches company-average margins by 2028. ' +
      'Defense provides a durable second tailwind. Earnings compound at ~13% annually; a slight de-rating to 30x creates a path to solid annualized returns from current levels.',
    'The AI supercycle extends well into the decade with continued 20%+ IT Datacom organic growth. ' +
      'CommScope\'s fiber business sees a pull-forward from next-generation data center architectures and building connectivity demand. ' +
      'Earnings compound at ~22% and the market sustains a 38x premium compounder valuation.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.15, 0.22, 0.28],
  debtSafety: {
    netDebt: 14100,
    ebitda: 8000,
    fy: 'FY25',
    note: 'Managed leverage from acquisition-driven growth (CommScope fiber assets). At 1.76× EBITDA, well within safe bounds. Amphenol consistently generates 19%+ FCF margins to deleverage quickly after each deal.',
  },
});
