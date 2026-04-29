import { defineStock } from './defineStock';

export const KLAC = defineStock({
  ticker: 'KLAC',
  name: 'KLA Corporation',
  sector: 'Semiconductor Equipment · Process Control & Inspection',
  themeColor: '#00539b',
  currentPrice: 1816.21,
  fairPriceRange: '$1,200 - $3,300',
  shares0: 132,              // ~132M diluted shares (market cap ~$199.8B)
  rev25: 11100,              // FY25 revenue ~$11.1B
  fcfMargin25: 0.34,         // FCF $3.75B / rev $11.1B ≈ 34%
  taxRate: 0.12,
  cash: 5200,
  debt: 6500,
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 36.45,            // FY26E forward EPS
  rsRating: 94,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "KLAC is the dominant leader in semiconductor process control and inspection — a critical, monopolistic position in yield management with extremely high switching costs and a real data/analytics 'network effect' moat. Customers include TSMC, Samsung, and Intel. " +
    "Earnings call confirms structural demand: WFE 2026 total mid-$130B (core low $120B + AP ~$12B), 1H26 virtually sold out with growing lead times, 2H26 acceleration. HBM intensity, advanced packaging (facility-constrained), and EUV layers all drive process control intensity higher. " +
    "Revenue CAGR ~13.6% (FY25–30E) with EPS growing faster at ~14–16% CAGR via margin expansion, buybacks, and operating leverage. Service business targets 12–14% long-term growth (upper end). GM ~62% in 2026, long-term 63%+. " +
    "Near-term headwinds: DRAM chip costs (~75–100 bps) and tariffs (~50–100 bps) pressure 2026 gross margins. China exposure mid/high-20% of revenue — any tightening of restrictions is a material risk. " +
    "At ~50x trailing P/E and ~41x forward, the stock prices in the strong phase of the semicap cycle. Expected total return ~8–10% CAGR. Probability of 15%+ CAGR: ~20%. " +
    "High-quality cyclical champion at full price. Best entry on cycle correction below $1,100.",

  epsCagr: [10, 14, 22],
  exitPE: [25, 28, 40],
  prob: [25, 55, 20],

  analystConsensus: { rating: 'Buy', targetLow: 1200, targetMedian: 1600, targetHigh: 2000, numAnalysts: 20 },
  revGrowth: [
    [0.06, 0.05, 0.04, 0.04, 0.03],  // bear: cycle breaks, ~7% CAGR (half of base)
    [0.18, 0.15, 0.12, 0.11, 0.10],  // base: AI + EUV sustain, ~13% CAGR
    [0.22, 0.18, 0.15, 0.13, 0.12],  // bull: AI supercycle extends, ~16% CAGR
  ],
  fcfMargin: [
    [0.30, 0.30, 0.31, 0.31, 0.32],  // bear: margin pressure from cycle downturn
    [0.34, 0.35, 0.37, 0.38, 0.39],  // base: operating leverage drives expansion
    [0.36, 0.38, 0.40, 0.42, 0.44],  // bull: full leverage + services attach rate
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'Semicap cycle rolls over earlier than expected as AI capex moderates and fab buildout timelines slip. ' +
      'Supply constraints that currently limit 1H26 delivery shift from tailwind to demand destruction as orders get cancelled or deferred. ' +
      'China restrictions tighten further, cutting mid/high-20% revenue exposure. Tariff + DRAM cost headwinds persist beyond 2026. ' +
      'Revenue growth halves to ~7% CAGR. EPS grows at only 10% annually vs 20% consensus. ' +
      'P/E compresses to historical average of 25x. Target: ~$49 × 25 = $1,225 — roughly −4% annualized. ' +
      'Stress test: FY26 EPS $36.45 × 22x = $802 — a −48% drawdown from a normal cycle pause.',
    'Normal semicap cycle plays out: WFE grows to mid-$130B in 2026 per management guidance, with 2H26 acceleration. ' +
      'Memory WFE (DRAM) grows 15–20%, Foundry/Logic 10–15%. HBM + advanced packaging drive process control intensity higher. ' +
      'EBIT margins expand from 43% toward 47–49% by 2030. GM headwinds from DRAM costs and tariffs normalize by mid-2027. ' +
      'Blended scenario: EPS compounds at ~14% annually to ~$62–70 by 2030. At 28x exit, target ~$1,750–1,960. ' +
      'Multiple compression from 41x to 28–30x limits total return to ~5–8% annualized. The market already prices most of the earnings trajectory.',
    'AI supercycle extends through 2028–2029: EUV, advanced packaging (facility-constrained per call), and HBM drive disproportionate inspection demand. ' +
      'Service business grows at upper end of 12–14% target, share gains in reticle, e-beam, AP, and BBP segments. ' +
      'EBIT margins expand aggressively toward 49%+, buybacks accelerate EPS growth beyond revenue. Long-term GM reaches 63%+. ' +
      'EPS compounds at 22% to ~$83 by 2030. At 40x premium multiple, target $3,320 — roughly 17–18% annualized. ' +
      'This is the only scenario that clears the 15% CAGR hurdle from current entry.',
  ],

  thesis: [
    'The main risk is cycle, not competition. Semicap equipment follows classic 2–3 year capex cycles. ' +
      'Management confirms 1H26 virtually sold out with late-26/27 delivery backlogs — classic peak-cycle signal. ' +
      'If AI capex moderates in 2027–2028, inspection volumes plateau and the 50x multiple rapidly compresses to 20–22x. ' +
      'China exposure (mid/high-20% of revenue) adds geopolitical risk; tariffs + DRAM cost headwinds pressure 2026 GM by ~1–2pp. ' +
      'KLA has $6.5B debt — manageable at 0.25x net debt/EBITDA, but limits buyback capacity in a downturn. ' +
      'Even a normal mid-cycle pause (not a crash) delivers double-digit losses from the current 50x entry.',
    "KLAC's process control monopoly is real — yield management is the last thing fabs cut. The data/analytics/uptime 'network effect' " +
      'creates genuine switching costs beyond just hardware. Process control intensity rises on leading-edge, HBM, and advanced packaging. ' +
      'Revenue CAGR ~13.6% supported by WFE growing to mid-$130B in 2026 (Memory 15–20%, Foundry/Logic 10–15%). ' +
      'EPS outgrows revenue at ~14–16% via operating leverage + buybacks. GM ~62% targeting 63%+ long-term, EBIT ~43%, ROE >100%. ' +
      'But the market prices this trajectory: forward P/E compresses from 41x (FY26) to 28x (FY30). ' +
      'Returns limited by multiple compression. Expected total return ~8–10% CAGR, P(15%+) ~20%. For 12% CAGR, entry below $1,200 needed.',
    'AI capex extends beyond 2028: HBM intensity (less redundancy, more metallization, EUV layers), advanced packaging ' +
      '(facility-constrained per call — demand > supply), and 2nm/below create entirely new inspection TAM. ' +
      'Share gains confirmed in reticle, e-beam, AP, and BBP. Service business targets upper end of 12–14% growth. ' +
      'EPS compounds at 22% — the highest realistic scenario for a semicap equipment leader. ' +
      "At 40x exit the stock delivers 17–18% CAGR. Key requirements: the cycle doesn't break AND the premium multiple holds. " +
      'For 15%+ CAGR at current price, you need EPS CAGR ≥25% — aggressive even for the bull case.',
  ],

  ebitdaProxy: [0.40, 0.47, 0.55],
  bbRate: [0.01, 0.02, 0.025],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  updatedOn: '04/29',
});
