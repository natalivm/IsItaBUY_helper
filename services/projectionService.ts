
import {
  ScenarioType,
  ProjectionData,
  ScenarioConfig,
  TickerDefinition
} from '../types';
import { CONFIGS, RATING_DEFS, RatingKey } from '../constants';

// ── Named constants ──

const HORIZON = 5;
const PROJECTION_YEARS = ["2026E", "2027E", "2028E", "2029E", "2030E"];

// WACC parameters
const RISK_FREE_RATE = 0.0425;
const EQUITY_RISK_PREMIUM = 0.055;
const DEFAULT_BETA = 1.1;
const DEFAULT_COST_OF_DEBT = 0.05;
const DEFAULT_TERMINAL_GROWTH = 0.025;
const DEFAULT_EXIT_MULTIPLE = 15;
const DEFAULT_EXIT_PE = 25;
const DEFAULT_FCF_MARGIN = 0.08;

// Projection display parameters
const EBIT_MARGIN_PROXY = 0.25;
const NET_INCOME_MARGIN_PROXY = 0.18;
const EPS_FCF_MULTIPLIER = 1.1;
const FCF_YIELD_PRICE_DISCOUNT = 0.8;
const EBITDA_MARGIN_FALLBACK_MULT = 1.5;

// Margin of safety
const MOS_DISCOUNT = 0.75;

// Rating thresholds — expected 5-year CAGR (annualized).
// Both model types feed a 5-year-forward target into getInstitutionalRating
// (EPS_PE = terminalEps×exitPE; DCF = fair value compounded at WACC), so a
// single annualized-return hurdle applies uniformly. See CLAUDE.md "Rating Logic".
const STRONG_BUY_CAGR = 0.16;          // >16%/yr → automatic STRONG BUY
const STRONG_BUY_SOFT_CAGR = 0.13;     // 13-16%/yr → STRONG BUY if quality signals present
const BUY_CAGR = 0.10;                 // >10%/yr → automatic BUY
const BUY_SOFT_CAGR = 0.08;            // 8-10%/yr → BUY if quality signals present
const OVERVALUED_CAGR = 0.03;          // <3%/yr expected return → overvalued (HOLD if quality-boosted)
const RS_QUALITY_THRESHOLD = 80;       // RS rating considered "high"
const RS_OVERVALUED_THRESHOLD = 30;    // RS rating below this → skip quality boost

const ZERO_ARRAY: number[] = [0, 0, 0, 0, 0];

// ── Rating Logic (uses RATING_DEFS from constants.ts) ──

function ratingResult(key: RatingKey) {
  const r = RATING_DEFS[key];
  return { label: key, status: r.status, color: r.color, dot: r.glowDot };
}

/** Optional quality signals that can soften rating thresholds */
export interface QualitySignals {
  rsRating?: number;
  aiImpact?: 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL';
}

function hasQualityBoost(signals?: QualitySignals): boolean {
  if (!signals) return false;
  // Very weak momentum disqualifies the quality boost entirely: a sub-30 RS name
  // shouldn't earn a soft-threshold STRONG BUY/BUY bump, nor have an OVERVALUED
  // read masked into HOLD. (Implements the documented RS_OVERVALUED_THRESHOLD.)
  if (signals.rsRating !== undefined && signals.rsRating < RS_OVERVALUED_THRESHOLD) return false;
  return (signals.rsRating !== undefined && signals.rsRating >= RS_QUALITY_THRESHOLD)
    || signals.aiImpact === 'TAILWIND';
}

export const getInstitutionalRating = (target: number, spot: number, ratingOverride?: string, signals?: QualitySignals) => {
  if (ratingOverride && ratingOverride in RATING_DEFS) {
    return ratingResult(ratingOverride as RatingKey);
  }

  // `target` is the 5-year-forward price for both model types, so rate on the
  // implied annualized return (CAGR). Math.pow(0, 1/H) === 0 → cagr = -1 for a
  // floored/zero target, which correctly lands in OVERVALUED.
  const cagr = Math.pow(target / spot, 1 / HORIZON) - 1;
  const boosted = hasQualityBoost(signals);

  if (cagr > STRONG_BUY_CAGR) return ratingResult('STRONG BUY');
  if (boosted && cagr > STRONG_BUY_SOFT_CAGR) return ratingResult('STRONG BUY');
  if (cagr > BUY_CAGR) return ratingResult('BUY');
  if (boosted && cagr > BUY_SOFT_CAGR) return ratingResult('BUY');
  if (cagr < OVERVALUED_CAGR) return ratingResult(boosted ? 'HOLD' : 'OVERVALUED');
  return ratingResult('HOLD');
};

// ── WACC ──

const calculateWacc = (t: TickerDefinition, sc: ScenarioConfig) => {
  const beta = t.beta || DEFAULT_BETA;
  const ke = RISK_FREE_RATE + beta * EQUITY_RISK_PREMIUM;

  const modelPrice = t.basePrice || t.currentPrice;
  const mktCap = modelPrice * t.shares0;
  const totalDebt = t.debt || 0;
  const eqW = mktCap / (mktCap + totalDebt);
  const debtW = 1 - eqW;

  const taxEffect = (1 - t.taxRate);
  const kd = (t.costDebt || DEFAULT_COST_OF_DEBT) * taxEffect;

  const rawWacc = (eqW * ke) + (debtW * kd);
  return rawWacc + (sc.waccAdj || 0);
};

// ── Shared return builder ──

function buildProjectionData(params: {
  ticker: string;
  w: number;
  pricePerShare: number;
  currentPrice: number;
  revs: number[];
  fcfs: number[];
  shareHistory: number[];
  eps: number[];
  price: number[];
  netIncome: number[];
  config: ScenarioConfig;
}): ProjectionData {
  const { ticker, w, pricePerShare, currentPrice, revs, fcfs, shareHistory, eps, price, netIncome, config } = params;
  const cagrValue = (Math.pow(pricePerShare / currentPrice, 1 / HORIZON) - 1) * 100;
  const cumReturnValue = (pricePerShare / currentPrice - 1) * 100;

  return {
    ticker,
    years: PROJECTION_YEARS,
    revs,
    shares: shareHistory,
    w,
    pricePerShare,
    ebit: revs.map(r => r * EBIT_MARGIN_PROXY),
    netIncome,
    fcf: fcfs,
    eps,
    price,
    cagrs: Array(HORIZON).fill(cagrValue),
    cumReturns: Array(HORIZON).fill(cumReturnValue),
    fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / (pricePerShare * FCF_YIELD_PRICE_DISCOUNT) * 100),
    config,
    mosPrice: pricePerShare * MOS_DISCOUNT,
    mosUpside: (pricePerShare * MOS_DISCOUNT / currentPrice - 1),
  };
}

// ── DCF Advanced ──

const calculateDCF = (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
  const w = calculateWacc(t, sc);

  const revPremium = (showEnhancements && sc.drivers?.revPrem as number[]) || ZERO_ARRAY;
  const fcfUplift = (showEnhancements && sc.drivers?.fcfUplift as number[]) || ZERO_ARRAY;
  const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0;
  const maOptionality = (showEnhancements ? (sc.drivers?.maOptVal as number || 0) : 0);
  const ebitdaMargin = sc.drivers?.ebitdaProxy as number || sc.fcfMargin[4] * EBITDA_MARGIN_FALLBACK_MULT;

  let currentRev = t.rev25;
  let currentShares = t.shares0;

  const revs: number[] = [];
  const fcfs: number[] = [];
  const pvFCFs: number[] = [];
  const shareHistory: number[] = [];

  for (let i = 0; i < HORIZON; i++) {
    currentRev *= (1 + sc.revGrowth[i] + revPremium[i]);
    const currentFcf = currentRev * (sc.fcfMargin[i] + fcfUplift[i]);
    revs.push(currentRev);
    fcfs.push(currentFcf);
    pvFCFs.push(currentFcf / Math.pow(1 + w, i + 1));
    if (buybackRate > 0) currentShares *= (1 - buybackRate);
    shareHistory.push(currentShares);
  }

  const sumPVFCF = pvFCFs.reduce((a, b) => a + b, 0);
  const tg = sc.termGrowth || DEFAULT_TERMINAL_GROWTH;
  const lastFcf = fcfs[4];
  // Guard the Gordon-growth denominator: if WACC ever sits at/below terminal
  // growth, (w - tg) would flip negative/explode. Floor it to a sane spread.
  const tvSpread = Math.max(w - tg, 0.01);
  const tvPerp = (lastFcf * (1 + tg)) / tvSpread;
  const lastRev = revs[4];
  const tvExit = (lastRev * ebitdaMargin) * (sc.exitMultiple || DEFAULT_EXIT_MULTIPLE);
  const blendedTV = (tvPerp + tvExit) / 2;
  const pvTV = blendedTV / Math.pow(1 + w, HORIZON);

  const netDebt = (t.debt || 0) - (t.cash || 0);
  const equityVal = sumPVFCF + pvTV - netDebt + maOptionality;
  // Floor at 0: a deeply negative bear case (net debt > discounted value) means
  // equity is wiped, not worth a negative price. Don't render a sub-zero target.
  const presentValue = Math.max(0, equityVal / shareHistory[4]);
  // Express as a 5-year-forward target (fair value compounding at the cost of
  // equity) so DCF and EPS_PE names rate on the same expected-CAGR basis.
  const pricePerShare = presentValue * Math.pow(1 + w, HORIZON);
  const priceTrajectory = shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i));

  return buildProjectionData({
    ticker: t.ticker,
    w,
    pricePerShare,
    currentPrice: t.currentPrice,
    revs,
    fcfs,
    shareHistory,
    eps: fcfs.map((f, i) => (f * EPS_FCF_MULTIPLIER) / shareHistory[i]),
    price: priceTrajectory,
    netIncome: revs.map(r => r * NET_INCOME_MARGIN_PROXY),
    config: sc,
  });
};

// ── EPS x P/E ──

/**
 * EPS x P/E valuation model.
 * Better suited for companies where FCF is temporarily depressed
 * (heavy capex cycle, working-capital build) but earnings power is clear.
 *
 * Projects EPS forward at a scenario-specific CAGR, then applies an exit P/E
 * to derive a target price. Buyback-driven share reduction is modelled via
 * the same `bbRate` driver used in DCF_ADVANCED.
 */
const calculateEPS_PE = (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
  const baseEps = t.baseEps!;
  const epsCagrRate = (sc.epsCagr || 0) / 100;
  const exitPE = sc.exitPE || DEFAULT_EXIT_PE;
  const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0;

  let currentShares = t.shares0;
  let currentRev = t.rev25;

  const epsArr: number[] = [];
  const revs: number[] = [];
  const fcfs: number[] = [];
  const shareHistory: number[] = [];
  const priceArr: number[] = [];

  for (let i = 0; i < HORIZON; i++) {
    const yearEps = baseEps * Math.pow(1 + epsCagrRate, i + 1);
    epsArr.push(yearEps);

    currentRev *= (1 + (sc.revGrowth[i] ?? epsCagrRate));  // ?? not || — a legit 0% growth year must not fall back to epsCagr
    revs.push(currentRev);

    fcfs.push(currentRev * (sc.fcfMargin[i] ?? DEFAULT_FCF_MARGIN));  // ?? not || — preserve a legit 0 margin

    if (buybackRate > 0) currentShares *= (1 - buybackRate);
    shareHistory.push(currentShares);

    const currentFwdPE = t.currentPrice / baseEps;
    const blendPE = currentFwdPE + ((exitPE - currentFwdPE) * (i + 1) / HORIZON);
    priceArr.push(yearEps * blendPE);
  }

  const terminalEps = epsArr[HORIZON - 1];
  const pricePerShare = terminalEps * exitPE;
  const w = calculateWacc(t, sc);

  return buildProjectionData({
    ticker: t.ticker,
    w,
    pricePerShare,
    currentPrice: t.currentPrice,
    revs,
    fcfs,
    shareHistory,
    eps: epsArr,
    price: priceArr,
    netIncome: epsArr.map((e, i) => e * shareHistory[i]),
    config: sc,
  });
};

// ── Public API ──

export const calculateProjection = (tickerId: string, type: ScenarioType, tickers: Record<string, TickerDefinition>, showEnhancements = true): ProjectionData => {
  const t = tickers[tickerId];
  const sc = CONFIGS[tickerId][type];
  if (t.modelType === 'EPS_PE') {
    return calculateEPS_PE(t, sc, showEnhancements);
  }
  return calculateDCF(t, sc, showEnhancements);
};
