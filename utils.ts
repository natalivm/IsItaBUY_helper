import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TickerDefinition } from './types';
import { StockGroup } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rsRatingStyle(rsRating: number): string {
  if (rsRating >= 80) return 'text-green-400 border-green-700';
  if (rsRating >= 40) return 'text-white border-slate-600';
  return 'text-red-400 border-red-800';
}

export function rsRatingColor(rsRating: number): string {
  if (rsRating >= 80) return 'text-green-500';
  if (rsRating >= 40) return 'text-white';
  return 'text-red-500';
}

// ── Stock Classification ──

const LARGE_CAP_THRESHOLD_M = 10_000;
const GOOD_MOMENTUM_RS = 70;
const MID_RS_RISING_THRESHOLD = 40;

export function classifyStock(t: TickerDefinition, rating: string, rsRating: number, baseCaseUpside: number): StockGroup {
  const marketCapM = t.currentPrice * t.shares0;
  const isLargeCap = marketCapM >= LARGE_CAP_THRESHOLD_M;
  const isBuyOrAbove = rating === 'STRONG BUY' || rating === 'BUY';
  const hasGoodMomentum = rsRating >= GOOD_MOMENTUM_RS;
  const hasMidRsRising = rsRating >= MID_RS_RISING_THRESHOLD && t.rsTrend === 'rising';

  if (baseCaseUpside < 0) return 'AVOID';
  if (isLargeCap && isBuyOrAbove && (hasGoodMomentum || hasMidRsRising)) return 'PRIME_GROWTH';
  if (!isLargeCap && isBuyOrAbove && (hasGoodMomentum || hasMidRsRising)) return 'TURBO_GROWTH';
  return 'WATCH_LIST';
}
