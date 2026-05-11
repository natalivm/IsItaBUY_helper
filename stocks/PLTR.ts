import { defineStock } from './defineStock';

export const PLTR = defineStock({
  ticker: 'PLTR',
  name: 'Palantir Technologies',
  sector: 'AI Software / Defense & Commercial Analytics',
  themeColor: '#0080FF',
  currentPrice: 170,
  fairPriceRange: '$90 - $220',
  shares0: 2570,
  rev25: 4475,
  fcfMargin25: 0.42,
  taxRate: 0.10,
  cash: 5500,
  debt: 240,
  beta: 2.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 0.85,
  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/10',

  strategicNarrative:
    "Palantir is the dominant AI/data platform serving both government (USG bedrock since 2003) and a rapidly scaling commercial book — FY25 revenue $4.48B (+56% YoY), TTM $5.22B with growth still accelerating. Operating income inflected from $310M FY24 → $1,414M FY25 (+356%) on AIP-driven commercial expansion. " +
    "Margins are now elite: 84% gross, 38% operating, 52% FCF margin. Operating cash flow $2.72B LTM nearly matches GAAP NI $2.28B — earnings quality has transformed from SBC-dependent (2021-2022) to genuine cash generation. " +
    "The valuation problem: at ~$170 / ~$437B market cap on $0.85 forward EPS, forward P/E is ~200×. EV/sales ~85×. Even with 30-40% sustained growth, current valuation prices in many years of perfect execution. Bernstein-style stress test: 30% revenue CAGR for 5 more years × 35% net margin × 30× exit P/E = ~$220 — barely upside from spot. " +
    "Cumulative dilution is the unique scar: diluted shares 1,924M (FY21) → 2,570M (LTM) = +33.6% / +6.0%/yr CAGR. That's transferred ~$110B (at current price) from original owners to employees over 5 years. SBC has stabilized at 14% of revenue (vs 50%+ historically) and recent buybacks ($156M LTM) only cover 21% of SBC issuance. " +
    "Risk decomposition: Bull (~30%): AIP commercial growth extends, defense budget durable, gets to $20B revenue by FY30 at 60× P/E → ~$300. Base (~45%): Growth decelerates to 25-30%, multiple compresses 200× → 50× through earnings expansion → ~$200. Bear (~25%): AI hype cools or AIP commercial growth tops out at $5B run-rate, multiple to 25× → ~$80-100. " +
    "HOLD at $170 — quality compounder priced beyond perfection. Burry-cited stock; despite recent profitability inflection, the cumulative dilution and current valuation extreme make this asymmetrically downside-skewed vs upside. Full size only on a >40% drawdown.",

  analystConsensus: { rating: 'Hold', targetLow: 100, targetMedian: 165, targetHigh: 250, numAnalysts: 22 },

  revGrowth: [
    [0.30, 0.20, 0.15, 0.12, 0.10], // Bear: commercial AIP plateau, government flat
    [0.45, 0.35, 0.28, 0.22, 0.18], // Base: continued AIP commercial momentum, gov stable
    [0.55, 0.45, 0.36, 0.28, 0.22], // Bull: AIP becomes industry standard, gov expands with AI defense
  ],

  fcfMargin: [
    [0.42, 0.43, 0.44, 0.45, 0.45], // Bear: margin stalls
    [0.45, 0.48, 0.50, 0.52, 0.53], // Base: operating leverage on commercial scale
    [0.48, 0.52, 0.55, 0.57, 0.60], // Bull: software dominance economics
  ],

  exitMultiple: [20, 35, 55],

  desc: [
    'AIP commercial momentum plateaus as larger enterprises take longer to deploy and pricing power compresses. ' +
      'Government revenue holds but stops compounding. Heavy SBC continues; dilution stays at ~5% annually. ' +
      'Multiple compresses from 200× to 25-30× as market re-rates Palantir as a mature gov-tech compounder rather than AI hyper-growth. ' +
      '5yr target ~$90-110, roughly -10% to -12% annualized as multiple contraction overwhelms EPS growth.',
    'AIP commercial pipeline converts to durable revenue; government defense AI spending sustains. Operating leverage continues — margins expand to 53% FCF. ' +
      'Revenue compounds at ~28% CAGR. EPS grows to $3-4 by FY30. Multiple compresses naturally to 50× through earnings growth. ' +
      '5yr target ~$200, ~3-4% annualized. Business performs but valuation already priced.',
    'Palantir becomes the de-facto AI operating system for large enterprises + the global defense AI standard. AIP commercial revenue compounds 40%+ for multiple years. ' +
      'Margins reach software dominance (55%+ FCF). Massive operating leverage drives EPS to $6+ by FY30. ' +
      'Market maintains premium 55-60× P/E given platform position. 5yr target ~$300+, ~12% annualized.',
  ],

  thesis: [
    'AIP excitement gives way to enterprise reality: deployments are slow, pricing competition intensifies (MSFT/GOOG/AMZN bundle AI), and many pilots don\'t convert to expansion. ' +
      'Government revenue is durable but doesn\'t scale at hypergrowth rates. SBC remains elevated at 12-14% of revenue. ' +
      'At 200× forward P/E, even modest growth deceleration triggers severe multiple compression. Buybacks ($156M LTM) cover only 21% of $730M SBC — net dilution persists at 5-6%/yr. ' +
      'Cumulative 5y dilution has already cost original shareholders ~25% of their stake; another 5y of similar dilution compounds the problem.',
    'AIP commercial revenue grows from <$1B to $5B+ over 5 years as Fortune 500 enterprises deploy AI ops platforms at scale. ' +
      'Government revenue stays durable and grows mid-teens. Operating leverage drives margins to FCF ~52%. ' +
      'EPS compounds at ~30% from $0.85 base. SBC ratio improves as revenue outgrows comp. Multiple compresses but earnings growth offsets. ' +
      'Real risk: at 200× entry, multiple compression to 50× alone shaves -75% of valuation. Even good execution at this price = modest returns.',
    'Palantir captures the AI-OS opportunity. AIP becomes embedded in every Fortune 500 ops stack. Government AI defense buildout ($150B+/yr) anchors structural defense revenue. ' +
      'Karp/Thiel insider control + AIP boot-camp methodology creates unique sales motion competitors can\'t replicate. ' +
      'Revenue scales toward $20B by FY30 with 55%+ FCF margins. Multiple holds 55-60× as the market accepts Palantir as the AI infrastructure standard. ' +
      'Requires AI capex super-cycle to persist + competition (CRWD/PANW/AI-native startups) to fail to displace AIP — both must be true simultaneously.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.001, 0.005, 0.010],
  ebitdaProxy: [0.38, 0.45, 0.55],
  bullMaOptVal: false,

  epsCagr: [15, 30, 50],
  exitPE: [30, 50, 80],
  prob: [25, 45, 30],

  driverOverrides: [
    {},
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.02],
    },
    {
      revPrem: [0.03, 0.03, 0.025, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 684,
    gaapNi: 1700,
    buyback: 156,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 70,
    overstatementSource: 'estimated',
    note: 'Tragic per our framework — Burry explicitly cites PLTR in his Cassandra Unchained list. TIKR FY25 actuals: SBC $684M (LTM $730M = 14% of revenue), GAAP NI ~$1.7B FY25, buybacks $156M (covers only 21% of SBC). The damage is structural: diluted shares 1,924M (FY21) → 2,570M (LTM) = +33.6% over 5 years = ~$110B of value transferred from original owners to employees at current price. Our 4y-MTM formula breaks down at PLTR\'s ~20× stock multiplier (extreme high-MTM zone), producing implausible >100% overstatement. The 70% estimate reflects Burry-cited tier + recent profitability inflection improving the picture from where it would have been in 2022. Watch the share-count trajectory — current run-rate is +6%/yr dilution, which is still alarming.',
  },
});
