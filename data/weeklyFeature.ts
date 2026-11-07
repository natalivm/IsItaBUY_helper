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
  weekOf: "2026-11-09",
  weekEnd: "2026-11-13",
  generatedOn: "2026-11-06",
  hot: [
    {
      ticker: "LMT",
      name: "Lockheed Martin Corp.",
      pattern: "Descending Channel",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 567.08,
      priceDate: "2026-11-06",
      target: 697.97,
      invalidation: 528.28,
      rsi: 79,
      score: 102.2
    },
    {
      ticker: "CAR",
      name: "Avis Budget Group, Inc.",
      pattern: "Falling Wedge",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-11-06",
      price: 118.83,
      priceDate: "2026-11-06",
      target: 150.18,
      invalidation: 95.35,
      rsi: 62,
      score: 101.8
    },
    {
      ticker: "KKR",
      name: "KKR & Co. Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-29",
      price: 96.48,
      priceDate: "2026-11-06",
      target: 144.54,
      invalidation: 89.55,
      rsi: 53.8,
      score: 100.3
    },
    {
      ticker: "HPE",
      name: "Hewlett Packard Enterprise Company",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-11-05",
      price: 44.77,
      priceDate: "2026-11-06",
      target: 34.14,
      invalidation: 49.39,
      rsi: 30.9,
      score: 102
    },
    {
      ticker: "MRVL",
      name: "Marvell Technology, Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-11-06",
      price: 141.2,
      priceDate: "2026-11-06",
      target: 93.01,
      invalidation: 238.78,
      rsi: 26.8,
      score: 101.9
    },
    {
      ticker: "ANET",
      name: "Arista Networks",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 170.8,
      priceDate: "2026-11-06",
      target: 126.57,
      invalidation: 190.95,
      rsi: 34.1,
      score: 100.6
    }
  ],
  earnings: [
    {
      ticker: "B",
      name: "Barrick Mining Corporation",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CEG",
      name: "Constellation Energy",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "KKR",
      name: "KKR & Co. Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "NRG",
      name: "NRG Energy, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "ACHR",
      name: "Archer Aviation Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ASTS",
      name: "AST SpaceMobile",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "HIMS",
      name: "Hims & Hers Health, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "MARA",
      name: "MARA Holdings, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "OXY",
      name: "Occidental Petroleum Corporation",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "PLUG",
      name: "Plug Power Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "RKLB",
      name: "Rocket Lab USA, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "TTD",
      name: "The Trade Desk, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "TTWO",
      name: "Take-Two Interactive Software, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ZETA",
      name: "Zeta Global Holdings Corp.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "LQDA",
      name: "Liquidia Corporation",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "SE",
      name: "Sea Limited",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "WIX",
      name: "Wix.com Ltd.",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CRWV",
      name: "CoreWeave, Inc.",
      date: "2026-11-10",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "RGTI",
      name: "Rigetti Computing, Inc.",
      date: "2026-11-10",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NBIS",
      name: "Nebius Group N.V.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "ONDS",
      name: "Ondas Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "TE",
      name: "T1 Energy Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "AMAT",
      name: "Applied Materials, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ARWR",
      name: "Arrowhead Pharmaceuticals, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CBRS",
      name: "Cerebras Systems Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CSCO",
      name: "Cisco Systems, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "DLO",
      name: "DLocal Limited",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NU",
      name: "Nu Holdings",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    }
  ]
};
