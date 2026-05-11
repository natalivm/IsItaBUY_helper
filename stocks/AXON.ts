import { defineStock } from './defineStock';

export const AXON = defineStock({
  ticker: 'AXON',
  name: 'Axon Enterprise',
  sector: 'Public Safety Tech / Government Platform',
  themeColor: '#FFC72C',
  currentPrice: 650,
  fairPriceRange: '$420 - $900',
  shares0: 83,
  rev25: 2780,
  fcfMargin25: 0.07,
  taxRate: 0.18,
  cash: 1200,
  debt: 700,
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.50,
  rsRating: 92,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/10',

  strategicNarrative:
    "Axon is the operating system of modern policing — body cams + Tasers + evidence.com cloud + Records management + AI report-writing (Draft One). FY25 revenue $2.78B (+33% YoY), LTM $2.98B sustaining elite ~30% growth. Recurring software revenue mix has become the structural moat: switching costs are enormous once a department runs evidence + records + cameras through Axon. " +
    "AI tailwind is real: Draft One auto-drafts police reports from body-cam audio, saving hours per officer per shift. International expansion (UK, EU, Australia) opens a >2× US TAM. Government contracts produce multi-year recurring revenue with high gross retention. " +
    "The Burry problem is catastrophic: SBC $629M LTM = **21.1% of revenue**, with operating cash flow only $154M LTM — meaning **SBC is 408% of operating cash flow**. Reported FCF is just $19.5M LTM, so **SBC equals 3,222% of free cash flow**. Essentially the entire 'cash flow generation' narrative is SBC addback; without it, AXON would be deeply cash-negative. " +
    "Working capital is also a current drag: −$617M LTM (rapid government contract growth + receivables stretching). May normalize but adds noise to cash conversion. " +
    "Buybacks $356M LTM = a real shareholder return effort, but only covers 57% of SBC. Diluted shares 66M (FY21) → 83M (LTM) = +24.8% cumulative / +4.5%/yr. " +
    "Valuation: at $650 / ~$54B market cap on $4.50 forward non-GAAP EPS, forward P/E ~145×. Bernstein-style stress test: 30% revenue CAGR for 5y × 20% non-GAAP net margin × 40× exit P/E = ~$1,200 — meaningful upside if execution holds. But 20% net margin requires the eventual operating leverage that hasn't materialized yet (LTM operating margin 0.3%). " +
    "Bull (~30%): Draft One + Records + international = AI-policing super-cycle, operating leverage finally emerges, margins expand to 20%+ → $900-1,100. Base (~45%): 25% revenue growth, SBC ratio improves but slowly, margins reach 12-15% → ~$700. Bear (~25%): SBC structural, AI report tools commoditize, growth halves → $400-500. " +
    "HOLD — best government-tech moat in the market combined with worst cash-flow-quality in our coverage. Burry-cited stock; the framework would flag this as deeply Tragic on a strict accounting view. The bet is essentially: 'eventually operating leverage will emerge and SBC will look small.' Until that inflection, every dollar of headline FCF is mostly stock comp accounting.",

  analystConsensus: { rating: 'Buy', targetLow: 450, targetMedian: 770, targetHigh: 1000, numAnalysts: 18 },

  revGrowth: [
    [0.18, 0.15, 0.12, 0.10, 0.08], // Bear: AI tools commoditize, gov budget pressure
    [0.28, 0.24, 0.20, 0.17, 0.14], // Base: continued moat + AI Draft One scales
    [0.35, 0.30, 0.25, 0.20, 0.16], // Bull: international + software + AI super-cycle
  ],

  fcfMargin: [
    [0.05, 0.07, 0.09, 0.11, 0.13],   // Bear: slow margin expansion, working capital pressure
    [0.10, 0.14, 0.18, 0.22, 0.25],   // Base: software mix shift drives operating leverage
    [0.13, 0.18, 0.24, 0.29, 0.33],   // Bull: full SaaS-like economics emerge by FY29-30
  ],

  exitMultiple: [22, 35, 50],

  desc: [
    'AI report-writing tools (Draft One) get commoditized by Microsoft/Google/startup challengers. Body-cam market saturates in the US, international expansion stumbles on regulatory friction. ' +
      'SBC remains structurally elevated at 18-20% of revenue. Working capital pressure persists. ' +
      'GAAP profitability arrives slowly; FCF margin reaches 13% by FY30 but lags peers. Multiple compresses from 145× to 35× as market reprices Axon as a high-quality but mature gov-tech business. ' +
      '5yr target ~$400-500, roughly -7% annualized as multiple contraction overwhelms EPS growth.',
    'Records + evidence.com + Draft One drive ARPU expansion in the installed base. International contributes ~25% of revenue by FY30. Operating leverage gradually inflects as software mix grows. ' +
      'FCF margin expands from 1% to 22% over 5 years. SBC ratio improves from 21% to 14% but absolute SBC stays elevated. ' +
      'Multiple compresses 145× → 50× through earnings growth. 5yr target ~$700, ~2% annualized — fair value priced to perfection.',
    'AI super-cycle for public safety. Draft One becomes the standard police report tool. Records system displaces incumbent CAD/RMS vendors. International TAM expands aggressively as the US model is replicated globally. ' +
      'Software mix reaches 60%+ of revenue, FCF margin scales to 33%. SBC ratio drops below 14% as revenue outgrows comp. ' +
      'Multiple holds 50× as Axon becomes the structural AI-policing platform. EPS compounds at 28%+. 5yr target $900-1,100, ~8-10% annualized.',
  ],

  thesis: [
    'AI commoditization risk + SBC structural problem + working capital pressure all hit simultaneously. Draft One faces competition from Microsoft Copilot for Government, Google\'s public sector AI, and emerging startups. ' +
      'SBC stays at 20%+ of revenue indefinitely as Axon competes for AI talent. Net dilution continues at 4-5%/yr. Buybacks ($356M LTM) cover only 57% of $629M SBC. ' +
      'At 145× forward P/E with operating leverage that hasn\'t materialized after 3 years of promise, the market loses patience. Multiple compresses severely if AI tools turn out to be cyclical rather than secular advantage.',
    'Axon\'s ecosystem moat continues compounding: each new module (Records, Draft One, Air, real-time crime center) makes the platform more sticky. International expansion adds 15-20% growth contribution by FY28. ' +
      'Government recurring revenue keeps growing at 30%+; gross retention >97%. AI Draft One drives meaningful ARPU expansion across the existing installed base. ' +
      'Operating leverage finally inflects in FY27 as software revenue grows faster than hardware costs. SBC ratio gradually improves. Multiple compresses but earnings growth offsets. Quality compounder at fair price.',
    'Axon becomes the dominant public safety platform globally. Draft One + Records + evidence.com + AI investigations becomes irreplaceable for police departments. International (UK, EU, AU, Latin America) scales to 30%+ of revenue. ' +
      'AI inflection is real: Draft One scales from $100M to $1B+ in standalone AI revenue. Software mix flips to dominate hardware. ' +
      'Operating leverage delivers: margins expand from 0% to 25%+ in 4 years. SBC ratio compresses materially. Multiple holds 50×+ given the platform position. 28%+ EPS CAGR delivers 8-10% annualized returns from current entry.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.003, 0.008, 0.015],
  ebitdaProxy: [0.10, 0.20, 0.30],
  bullMaOptVal: false,

  epsCagr: [12, 25, 35],
  exitPE: [25, 40, 55],
  prob: [25, 45, 30],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.01, 0.01, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
    {
      revPrem: [0.025, 0.025, 0.02, 0.015, 0.015],
      fcfUplift: [0.015, 0.02, 0.025, 0.03, 0.03],
    },
  ],

  burry: {
    sbc: 634,
    gaapNi: 206,
    buyback: 356,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 85,
    overstatementSource: 'estimated',
    note: 'Tragic — Burry explicitly cites AXON. Most extreme SBC-to-cash-flow ratio in our coverage: SBC $634M FY25 (LTM $629M) vs LTM operating cash flow of just $154M = **408%** and vs FCF $19.5M = **3,222%**. Essentially the entire reported FCF is SBC addback. Buybacks $356M LTM are notable (covers 57% of SBC) but still leave net dilution; 5-year cumulative dilution +24.8%. The valuation premium prices in software-economics inflection that hasn\'t happened (LTM operating margin 0.3%). baseEps $4.50 is non-GAAP — material P/E haircut applies. The 85% estimate reflects Burry-cited tier + extreme SBC dependence partially offset by genuine buybacks and elite revenue growth that could eventually justify the structure.',
  },
});
