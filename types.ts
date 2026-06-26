
export enum ScenarioType {
  BEAR = 'bear',
  BASE = 'base',
  BULL = 'bull'
}

export type ValuationModelType = 'DCF_ADVANCED' | 'EPS_PE';
export type RsTrend = 'rising' | 'falling' | 'flat';

export type AnalystRating = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

export interface AnalystConsensus {
  rating: AnalystRating;
  targetLow: number;
  targetMedian: number;
  targetHigh: number;
  numAnalysts: number;
}

export interface ScenarioConfig {
  label: string;
  color: string;
  bg: string;
  revGrowth: number[];
  fcfMargin: number[];
  exitMultiple?: number;
  termGrowth?: number;
  waccAdj?: number;
  desc: string;
  thesis?: string;
  drivers?: Record<string, number | number[]>;
  // EPS_PE model fields
  epsCagr?: number;
  exitPE?: number;
  prob?: number;
}

export interface StockScenarioParams {
  revGrowth: Record<ScenarioType, number[]>;
  fcfMargin: Record<ScenarioType, number[]>;
  termGrowth: Record<ScenarioType, number>;
  exitMultiple: Record<ScenarioType, number>;
  waccAdj?: Record<ScenarioType, number>;
  desc: Record<ScenarioType, string>;
  thesis?: Record<ScenarioType, string>;
  drivers: Record<ScenarioType, Record<string, number | number[]>>;
  // EPS_PE model fields
  epsCagr?: Record<ScenarioType, number>;
  exitPE?: Record<ScenarioType, number>;
  prob?: Record<ScenarioType, number>;
}

export interface StockDefinition extends TickerDefinition {
  scenarios: StockScenarioParams;
}

export interface TickerDefinition {
  ticker: string;
  name: string;
  sector: string;
  themeColor: string;
  currentPrice: number;
  basePrice?: number;
  fairPriceRange?: string;
  active?: boolean;
  shares0: number;
  rev25: number;
  /** @deprecated Stored but NOT read by the projection engine — the per-year scenario `fcfMargin` arrays are used instead. Kept for back-compat. */
  fcfMargin25: number;
  taxRate: number;
  modelType: ValuationModelType;
  rsRating: number;
  rsTrend?: RsTrend;
  aiImpact: 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL';
  ratingOverride?: 'STRONG BUY' | 'BUY' | 'HOLD' | 'OVERVALUED';
  /** @deprecated No longer rendered — replaced by reasonsToBuy / risksToBuy. Kept for back-compat. */
  strategicNarrative?: string;
  /** Alpha Strategic View — concise, qualitative reasons to own the stock (no precise numbers). */
  reasonsToBuy?: string[];
  /** Alpha Strategic View — concise, qualitative risks of owning the stock (no precise numbers). */
  risksToBuy?: string[];
  verdictNarrative?: string;
  /** Optional "what this quarter's numbers mean" bullets, rendered in the Investment Verdict. */
  keyTakeaways?: string[];
  cash?: number;
  debt?: number;
  beta?: number;
  costDebt?: number;
  // EPS_PE model fields
  baseEps?: number;
  // Analyst consensus
  analystConsensus?: AnalystConsensus;
  /** Last price-touch date (MM/DD) — auto-stamped by update_prices.py on every price run, so NOT a fundamentals-freshness signal. */
  updatedOn?: string;
  /** Earnings report that was last used to update this stock, e.g. 'Q1 2026' */
  lastReportTag?: string;
  /** Date fundamentals/RS/overrides were last manually reviewed (YYYY-MM-DD). The price bot never touches this — it's the real staleness signal. See review_status.py. */
  dataReviewedOn?: string;
  /**
   * Michael Burry "Cassandra Unchained" SBC dilution check.
   * Dollar values in millions ($M).
   * Coefficient = 1 - sbc / gaapNi. <0.70 = warning, ≤0 = "tragic level".
   * Display-only — does not feed the valuation model.
   */
  burry?: BurryData;
  debtSafety?: DebtData;
}

export interface BurryData {
  /** Annual stock-based compensation, $M (cash-flow statement) */
  sbc: number;
  /** Annual GAAP net income, $M (negative = loss) */
  gaapNi: number;
  /** Annual share buybacks, $M (gross repurchases of common stock) */
  buyback?: number;
  /** Whether the model's baseEps / FCF basis is GAAP-equivalent or non-GAAP */
  epsBasis?: 'GAAP' | 'NON_GAAP';
  /** Fiscal year label, e.g. "FY25" or "2025" */
  fy?: string;
  /** Optional one-line context */
  note?: string;
  /**
   * "Full SBC adjustment" overstatement %, applying Burry's methodology
   * (payroll tax + mark-to-market dilution cost beyond the GAAP SBC line).
   * When set, the indicator uses this directly instead of the naive
   * SBC/NI ratio. Range 0–100.
   */
  overstatementPct?: number;
  /**
   * Source of overstatementPct — distinguishes Burry's published values
   * from our own estimates so the UI can label appropriately.
   */
  overstatementSource?: 'burry-published' | 'estimated';
}

/**
 * Debt safety check using the 3-step flowchart.
 * Dollar values in millions ($M). Display-only — does not feed the valuation model.
 */
export interface DebtData {
  /** Net Debt = total debt − cash, $M. Negative means net cash. */
  netDebt: number;
  /** EBITDA $M — used for the Net Debt / EBITDA leverage ratio. */
  ebitda: number;
  /** CapEx / Operating Cash Flow (0–1). Asset-light threshold: < 0.20. */
  capexToOcf?: number;
  /** Interest Coverage = EBIT / Interest Expense. Strong threshold: > 5.0. */
  interestCoverage?: number;
  /** Altman Z-Score. Safe zone: > 3.0. */
  altmanZ?: number;
  /** Fiscal year label, e.g. "FY25" */
  fy?: string;
  /** Optional one-line context shown in the indicator panel. */
  note?: string;
}

export interface ProjectionData {
  ticker: string;
  years: string[];
  revs: number[];
  ebit: number[];
  netIncome: number[];
  fcf: number[];
  shares: number[];
  eps: number[];
  price: number[];
  cagrs: number[];
  cumReturns: number[];
  fcfYield: number[];
  config: ScenarioConfig;
  w: number;
  pricePerShare: number;
  mosPrice: number;
  mosUpside: number;
}
