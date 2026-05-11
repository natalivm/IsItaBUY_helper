import { StockDefinition, ScenarioType, RsTrend, AnalystConsensus, BurryData } from '../types';

/**
 * Simplified stock input format.
 * All scenario fields use [bear, base, bull] tuples instead of verbose
 * Record<ScenarioType, T> objects. Sensible defaults are applied for
 * drivers, waccAdj, and termGrowth.
 *
 * BEFORE (80+ lines):
 *   export const ACME: StockDefinition = { ticker: 'ACME', ..., scenarios: {
 *     revGrowth: { [ScenarioType.BEAR]: [...], [ScenarioType.BASE]: [...], ... },
 *     drivers: { [ScenarioType.BEAR]: { revPrem: [0,0,0,0,0], ... }, ... },
 *     ...
 *   }};
 *
 * AFTER (~35 lines):
 *   export const ACME = defineStock({
 *     ticker: 'ACME', ...,
 *     revGrowth: [[...bear], [...base], [...bull]],
 *     fcfMargin: [0.18, 0.22, 0.26],       // single number = flat 5yr
 *     exitMultiple: [12, 16, 19],
 *     desc: ['bear desc', 'base desc', 'bull desc'],
 *   });
 */

type Trio<T> = [T, T, T]; // [bear, base, bull]

export interface SimpleStockInput {
  // ── Identity ──
  ticker: string;
  name: string;
  sector: string;
  themeColor: string;

  // ── Financials ──
  currentPrice: number;
  shares0: number;
  rev25: number;
  fcfMargin25: number;
  taxRate: number;
  cash?: number;
  debt?: number;
  beta?: number;
  costDebt?: number;

  // ── Display ──
  fairPriceRange?: string;
  active?: boolean;
  rsRating: number;
  /** RS trend direction. Default: 'flat' */
  rsTrend?: RsTrend;
  aiImpact: 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL';
  /**
   * Alpha Strategic View: override the quantitative model rating when
   * narrative assessment disagrees. The model rating is still shown as
   * "Model: X" in the Investment Verdict for monitoring.
   */
  ratingOverride?: 'STRONG BUY' | 'BUY' | 'HOLD' | 'OVERVALUED';
  strategicNarrative: string;

  // ── Model type (default: DCF_ADVANCED) ──
  modelType?: 'DCF_ADVANCED' | 'EPS_PE';

  // ── Scenarios [bear, base, bull] ──

  /** 5-year revenue growth paths per scenario */
  revGrowth: Trio<number[]>;

  /**
   * FCF margin per scenario.
   * - number   → flat for all 5 years
   * - number[] → year-by-year progression
   */
  fcfMargin: Trio<number | number[]>;

  /** EBITDA exit multiple per scenario */
  exitMultiple: Trio<number>;

  /** Scenario descriptions */
  desc: Trio<string>;

  /** Optional thesis per scenario */
  thesis?: Trio<string>;

  // ── Optional overrides (sensible defaults applied) ──

  /** Terminal growth rate. Default: [0.015, 0.025, 0.03] */
  termGrowth?: Trio<number>;

  /** WACC adjustment. Default: [0.01, 0, -0.005] */
  waccAdj?: Trio<number>;

  /** Buyback rate. Default: [0.005, 0.015, 0.03] */
  bbRate?: Trio<number>;

  /** EBITDA margin proxy. Default: [0.15, 0.22, 0.35] */
  ebitdaProxy?: Trio<number>;

  /**
   * Bull-case M&A option value.
   * - true (default) → auto-calc as currentPrice * shares0 * 0.07
   * - number → explicit value
   * - false → no M&A option value
   */
  bullMaOptVal?: boolean | number;

  /**
   * Custom driver overrides per scenario. Merged on top of the standard
   * driver template. Use this only when a stock needs non-standard
   * revPrem or fcfUplift patterns.
   */
  driverOverrides?: Trio<Record<string, number | number[]>>;

  // ── EPS_PE model fields ──
  baseEps?: number;
  epsCagr?: Trio<number>;
  exitPE?: Trio<number>;
  prob?: Trio<number>;

  // ── Analyst consensus (optional) ──
  analystConsensus?: AnalystConsensus;

  /** Date of last manual data refresh, e.g. '26/02' */
  updatedOn?: string;
  /** Earnings report last used to refresh this stock, e.g. 'Q1 2026' */
  lastReportTag?: string;

  /** Burry SBC dilution indicator data (display-only). */
  burry?: BurryData;
}

// Standard driver templates (identical across almost all stocks)
const DRIVER_TEMPLATES = {
  revPrem: [
    [0, 0, 0, 0, 0],
    [0.01, 0.01, 0.01, 0.01, 0.01],
    [0.015, 0.02, 0.02, 0.02, 0.02],
  ] as Trio<number[]>,
  fcfUplift: [
    [0, 0, 0, 0, 0],
    [0.005, 0.005, 0.01, 0.01, 0.01],
    [0.01, 0.01, 0.01, 0.015, 0.015],
  ] as Trio<number[]>,
};

function expandMargin(v: number | number[]): number[] {
  return typeof v === 'number' ? [v, v, v, v, v] : v;
}

function toRecord<T>(trio: Trio<T>): Record<ScenarioType, T> {
  return {
    [ScenarioType.BEAR]: trio[0],
    [ScenarioType.BASE]: trio[1],
    [ScenarioType.BULL]: trio[2],
  };
}

export function defineStock(input: SimpleStockInput): StockDefinition {
  const {
    // Identity & financials
    ticker, name, sector, themeColor, currentPrice, shares0,
    rev25, fcfMargin25, taxRate, cash, debt, beta, costDebt,
    fairPriceRange, active = true,
    rsRating, rsTrend = 'flat', aiImpact, ratingOverride, strategicNarrative,
    modelType = 'DCF_ADVANCED',

    // Scenarios
    revGrowth, fcfMargin, exitMultiple, desc, thesis,

    // Defaults
    termGrowth = [0.015, 0.025, 0.03],
    waccAdj = [0.01, 0, -0.005],
    bbRate = [0.005, 0.015, 0.03],
    ebitdaProxy = [0.15, 0.22, 0.35],
    bullMaOptVal = true,
    driverOverrides,

    // EPS_PE
    baseEps, epsCagr, exitPE, prob,

    // Analyst consensus
    analystConsensus,

    // Updated date
    updatedOn,
    lastReportTag,

    // Burry indicator
    burry,
  } = input;

  // Build drivers for each scenario
  const maOptVal = bullMaOptVal === true
    ? currentPrice * shares0 * 0.07
    : bullMaOptVal === false ? undefined : bullMaOptVal;

  const drivers = toRecord(([0, 1, 2] as const).map(i => {
    const base: Record<string, number | number[]> = {
      revPrem: DRIVER_TEMPLATES.revPrem[i],
      fcfUplift: DRIVER_TEMPLATES.fcfUplift[i],
      bbRate: bbRate[i],
      ebitdaProxy: ebitdaProxy[i],
    };
    if (i === 2 && maOptVal !== undefined) {
      base.maOptVal = maOptVal;
    }
    if (driverOverrides?.[i]) {
      Object.assign(base, driverOverrides[i]);
    }
    return base;
  }) as Trio<Record<string, number | number[]>>);

  const stock: StockDefinition = {
    ticker,
    name,
    sector,
    themeColor,
    currentPrice,
    fairPriceRange,
    active,
    shares0,
    rev25,
    fcfMargin25,
    taxRate,
    cash,
    debt,
    beta,
    costDebt,
    modelType,
    rsRating,
    rsTrend,
    aiImpact,
    ratingOverride,
    strategicNarrative,
    baseEps,
    analystConsensus,
    updatedOn,
    lastReportTag,
    burry,
    scenarios: {
      revGrowth: toRecord(revGrowth),
      fcfMargin: toRecord([
        expandMargin(fcfMargin[0]),
        expandMargin(fcfMargin[1]),
        expandMargin(fcfMargin[2]),
      ] as Trio<number[]>),
      termGrowth: toRecord(termGrowth),
      exitMultiple: toRecord(exitMultiple),
      waccAdj: toRecord(waccAdj),
      desc: toRecord(desc),
      ...(thesis ? { thesis: toRecord(thesis) } : {}),
      drivers,
      ...(epsCagr ? { epsCagr: toRecord(epsCagr) } : {}),
      ...(exitPE ? { exitPE: toRecord(exitPE) } : {}),
      ...(prob ? { prob: toRecord(prob) } : {}),
    },
  };

  return stock;
}
