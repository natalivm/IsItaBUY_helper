// Landing-page lists, rebuilt once a week before Monday's open by
// weekly_feature.py (.github/workflows/weekly-feature.yml). Hand edits are
// overwritten by the next run — change the scoring in weekly_feature.py instead.

import type { PatternDirection, PatternStage, PatternTimeframe } from './patternWatchlist';

/** One of the week's featured setups, scored by weekly_feature.score_setup. */
export interface HotSetup {
  ticker: string;
  name: string;
  pattern: string;
  timeframe: PatternTimeframe;
  direction: PatternDirection;
  stage: PatternStage;
  stageDate?: string;
  /** Close the setup's percentages are measured from, and its date. */
  price: number;
  priceDate?: string;
  target: number;
  invalidation?: number;
  /** Daily Wilder RSI-14 at the time of the run. */
  rsi?: number;
  score: number;
  /** Plain-language reasons the setup made the shortlist. */
  why: string[];
}

/** A covered stock reporting earnings during the featured week. */
export interface EarningsEvent {
  ticker: string;
  name: string;
  /** Report date, YYYY-MM-DD. */
  date: string;
  /** Before the open / after the close / not announced. */
  time: 'bmo' | 'amc' | 'tbd';
  /** Yahoo has not confirmed the date — treat it as provisional. */
  estimated?: boolean;
}

export interface WeeklyFeature {
  /** Monday of the featured week, YYYY-MM-DD. */
  weekOf: string;
  /** Friday of the featured week, YYYY-MM-DD. */
  weekEnd: string;
  /** When this file was last rebuilt, YYYY-MM-DD. */
  generatedOn: string;
  hot: HotSetup[];
  earnings: EarningsEvent[];
}

export const WEEKLY_FEATURE: WeeklyFeature = {
  weekOf: "2026-10-26",
  weekEnd: "2026-10-30",
  generatedOn: "2026-10-24",
  hot: [
    {
      ticker: "NOW",
      name: "ServiceNow, Inc.",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-23",
      price: 158.96,
      priceDate: "2026-10-23",
      target: 203.95,
      invalidation: 155.09,
      rsi: 70.1,
      score: 105,
      why: [
        "Break confirmed on the daily chart",
        "Daily RSI 70 backs the upside",
        "The stock's own trend is up",
        "28.3% from here to the target",
        "About 11.6x more room to the target than to invalidation"
      ]
    },
    {
      ticker: "ASTS",
      name: "AST SpaceMobile",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-14",
      price: 39.79,
      priceDate: "2026-10-23",
      target: 25.98,
      invalidation: 46.61,
      rsi: 31.4,
      score: 103.8,
      why: [
        "Break confirmed on the daily chart",
        "Daily RSI 31 backs the downside",
        "The stock's own trend is down",
        "34.7% from here to the target"
      ]
    },
    {
      ticker: "FRSH",
      name: "Freshworks Inc.",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-22",
      price: 15.49,
      priceDate: "2026-10-23",
      target: 19.45,
      invalidation: 14.35,
      rsi: 73,
      score: 103.3,
      why: [
        "Break confirmed on the daily chart",
        "Daily RSI 73 backs the upside",
        "The stock's own trend is up",
        "25.6% from here to the target",
        "About 3.5x more room to the target than to invalidation"
      ]
    }
  ],
  earnings: []
};
