import { defineStock } from './defineStock';

export const MLM = defineStock({
  updatedOn: '05/04',
  ticker: 'MLM',
  name: 'Martin Marietta Materials',
  sector: 'Building Materials · Aggregates & Heavy Construction Materials',
  themeColor: '#5b7f3b',
  currentPrice: 603.29,
  fairPriceRange: '$420 - $1120',
  shares0: 60.3,               // ~60.3M shares (market cap $41.4B / $686)
  rev25: 6150,                 // Revenue 2025A ($M)
  fcfMargin25: 0.08,           // ~$490M est. FCF / $6.15B rev (trough year, high CAPEX)
  taxRate: 0.22,
  cash: 300,
  debt: 5000,
  beta: 0.90,
  costDebt: 0.045,

  modelType: 'EPS_PE',
  baseEps: 18.77,              // Trailing EPS 2025A GAAP (down -42% from 2024A peak $32.41)

  rsRating: 60,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Type B — Cyclical Growth (confirmed post-earnings). Quality infrastructure player with real geographic + " +
    "vertical integration moat (quarries + logistics oligopoly, high permitting barriers).\n\n" +
    "Earnings call update: Aggregates 2025 — +6.9% pricing, +3.8% volume, +239 bps price/cost spread, " +
    "gross margin 34%. 2026 guide: volume +1-3%, pricing ~5%, COGS ~3%, low double-digit gross profit growth, " +
    "EBITDA ~$2.49B (incl disc ops). Capex down 29% → strong FCF uplift.\n\n" +
    "Three new structural positives: (1) Data centers growing ~60%, warehousing ~40% — new demand driver " +
    "(currently ~3% of volume but accelerating); (2) IIJA peak reimbursements in 2026, 50% of funds still unspent; " +
    "(3) Network optimization potential for COGS reduction (not in guidance = upside).\n\n" +
    "However, classification unchanged: this is cyclical growth, not a compounder. " +
    "Trailing P/E ~36-37x on trough-year EPS (2025A: $18.77 vs 2024A peak: $32.41, -42%). " +
    "Forward P/E 2026E ~32-33x, 2027E ~28-29x. Revenue CAGR 5-8% long-term but cyclical. " +
    "EBIT margin ~23% (cycles 19-28%), EBITDA margin ~33-36%. Housing remains weak drag. " +
    "Even with data center + energy tailwinds, Revenue CAGR ~7-8%, EPS CAGR ~10-13% — not 18-20% secular engine. " +
    "RS 77 — above average but not momentum leader, confirms not a momentum phase.\n\n" +
    "Stress test: P/E 22x × EPS $21 = $462 (-33% downside). If volume growth 0% → EPS CAGR ~6-7%, fair P/E 22-24x, IRR ~0-4%. " +
    "Probability of 15%+ CAGR: ~25-30%. Market prices MLM as compounder, but it's a well-managed cyclical business. " +
    "At P/E >30x you're betting the cycle stays strong for years. That is the core bet.",

  // ── EPS/PE Scenarios (updated post-earnings call) ──
  epsCagr: [5, 10, 14],        // bear: cycle stalls; base: moderate recovery; bull: infra boom + DC/energy
  exitPE: [20, 24, 28],        // bear: historical trough; base: quality cyclical; bull: premium for infra visibility
  prob: [30, 45, 25],          // ~25-30% prob of 15%+ CAGR (bull only, and barely)

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 605, targetMedian: 684, targetHigh: 780, numAnalysts: 16 },
  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.03],        // Bear: slow recovery, housing drag persists, infra plateaus
    [0.108, 0.073, 0.06, 0.06, 0.05],       // Base: consensus recovery (2026 +10.8%, 2027 +7.3%), then normalizes
    [0.12, 0.09, 0.08, 0.07, 0.07],         // Bull: IIJA runway + DC/energy demand sustains above-consensus growth
  ],
  fcfMargin: [
    [0.10, 0.10, 0.10, 0.09, 0.09],         // Bear: some capex relief but margin normalization offsets
    [0.16, 0.18, 0.19, 0.20, 0.20],         // Base: capex -29% drives FCF uplift, margins stabilize
    [0.18, 0.20, 0.21, 0.22, 0.22],         // Bull: capex discipline + network optimization + pricing power
  ],
  termGrowth: [0.015, 0.020, 0.025],
  exitMultiple: [10, 14, 17],               // EV/EBITDA: aggregates trade 10-17x
  bbRate: [0.005, 0.01, 0.015],             // Moderate buybacks, leverage 2.3x — not aggressive
  ebitdaProxy: [0.32, 0.36, 0.37],          // EBITDA margin: 2026 guide ~$2.49B / ~$6.81B ≈ 36.6%
  bullMaOptVal: false,                       // Not an M&A-driven story at this stage

  desc: [
    'The construction cycle turns down despite infrastructure bill tailwinds. Housing stays weak and volume growth stalls. ' +
      'Margins normalize from peak levels with gross margin drifting from 34% toward the 28-30% range. ' +
      'The multiple compresses to its historical trough around 20x. Earnings grow at only about 5% annually, ' +
      'resulting in negative to flat returns from current entry. In a stress scenario, downside reaches roughly -33%.',
    'A moderate infrastructure recovery unfolds, supported by the infrastructure bill with 50% of funds still unspent. ' +
      'Volume grows 1-3% per guidance with pricing around 5% and a positive price-to-cost spread. Data center and energy projects provide incremental demand. ' +
      'Capital expenditure declining 29% drives free cash flow normalization. Earnings grow at roughly 10% annually, ' +
      'but the market already prices this scenario, leaving only 1-2% annualized stock returns from current entry.',
    'An infrastructure supercycle plays out as government spending extends, data center construction grows at 60% sustained for years, and energy capex runs at high levels. ' +
      'Network optimization delivers cost savings beyond guidance. Pricing power, volume growth, and capital discipline all drive margin expansion. ' +
      'Earnings compound at roughly 14% annually, delivering 8-10% annualized stock returns. Even in this optimistic scenario, 15%+ returns would require a lower entry price.',
  ],

  thesis: [
    'Cyclical downturn materializes despite IIJA. Housing recovery fails, infrastructure spending plateaus after 2026. ' +
      'Commodity-like business faces pricing pressure as demand weakens. ' +
      'Data center + energy demand (~3% of volume) too small to offset broad cyclical weakness. ' +
      'At 36x trailing P/E, significant downside risk if cycle turns. Leverage 2.3x limits flexibility.',
    'Solid infrastructure operator with genuine barriers (permits, quarries, logistics). ' +
      'Post-earnings positives: strong pricing (+6.9%), positive price/cost spread (+239 bps), capex -29% FCF uplift. ' +
      'IIJA runway (50% unspent) + data center/energy growth provide multi-year demand visibility. ' +
      'But cyclical earnings at premium valuation (P/E >30x) = limited upside from current price. ' +
      'Network optimization upside not in guidance — potential incremental positive.',
    'Best-in-class aggregates franchise at inflection point. Three structural catalysts: ' +
      '(1) Data centers + energy — growing 60%+, currently small but scaling rapidly; ' +
      '(2) IIJA with 50% funds remaining — peak reimbursements 2026 with multi-year runway; ' +
      '(3) Network optimization — potential COGS leverage not yet in guidance. ' +
      'If all three deliver simultaneously with housing recovery, MLM approaches compounder territory. ' +
      'But even then, EPS CAGR ~10-13%, not 18-20% secular engine.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.008, 0.008, 0.008],  // Upgraded for capex -29% + network optimization
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.010],  // DC/energy + network optimization upside
    },
  ],
});
