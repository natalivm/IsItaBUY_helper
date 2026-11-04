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
  weekOf: "2026-11-02",
  weekEnd: "2026-11-06",
  generatedOn: "2026-11-04",
  hot: [
    {
      ticker: "KKR",
      name: "KKR & Co. Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-29",
      price: 101.34,
      priceDate: "2026-11-04",
      target: 144.54,
      invalidation: 90.46,
      rsi: 64.7,
      score: 106
    },
    {
      ticker: "CAR",
      name: "Avis Budget Group, Inc.",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "signal",
      stageDate: "2026-11-04",
      price: 119.81,
      priceDate: "2026-11-04",
      target: 183.46,
      invalidation: 94.42,
      rsi: 64.3,
      score: 92.9
    },
    {
      ticker: "JPM",
      name: "JPMorgan Chase & Co.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-16",
      price: 352.11,
      priceDate: "2026-11-04",
      target: 450.81,
      invalidation: 325.96,
      rsi: 63.1,
      score: 92.4
    },
    {
      ticker: "XOP",
      name: "SPDR S&P Oil & Gas E&P ETF",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-09-21",
      price: 179.29,
      priceDate: "2026-11-04",
      target: 112.63,
      invalidation: 231.55,
      rsi: 34.9,
      score: 97.4
    },
    {
      ticker: "ANET",
      name: "Arista Networks",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 178.48,
      priceDate: "2026-11-04",
      target: 126.57,
      invalidation: 188.52,
      rsi: 44.9,
      score: 95.8
    },
    {
      ticker: "NU",
      name: "Nu Holdings",
      pattern: "Rising Wedge",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-05-11",
      price: 11.99,
      priceDate: "2026-11-04",
      target: 7.05,
      invalidation: 19.78,
      rsi: 35.6,
      score: 95.5
    }
  ],
  earnings: [
    {
      ticker: "CIFR",
      name: "Cipher Mining Inc.",
      date: "2026-11-02",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "TEM",
      name: "Tempus AI, Inc.",
      date: "2026-11-02",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "AEHR",
      name: "Aehr Test Systems",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "FN",
      name: "Fabrinet",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "LIFE",
      name: "Ethos Technologies Inc.",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ON",
      name: "ON Semiconductor Corporation",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      date: "2026-11-02",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ETN",
      name: "Eaton Corporation plc",
      date: "2026-11-03",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "FISV",
      name: "Fiserv, Inc.",
      date: "2026-11-03",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "PFE",
      name: "Pfizer Inc.",
      date: "2026-11-03",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "SHOP",
      name: "Shopify",
      date: "2026-11-03",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "ALAB",
      name: "Astera Labs",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "AMD",
      name: "Advanced Micro Devices",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ANET",
      name: "Arista Networks",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "BKNG",
      name: "Booking Holdings",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "CAR",
      name: "Avis Budget Group, Inc.",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "OUST",
      name: "Ouster, Inc.",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "SMCI",
      name: "Super Micro Computer, Inc.",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "CRCL",
      name: "Circle Internet Group, Inc.",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "CVS",
      name: "CVS Health Corporation",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "DDOG",
      name: "Datadog",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "NVO",
      name: "Novo Nordisk A/S",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "RIOT",
      name: "Riot Platforms, Inc.",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "UBER",
      name: "Uber Technologies",
      date: "2026-11-04",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "APP",
      name: "AppLovin Corporation",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ARM",
      name: "Arm Holdings plc",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "CAVA",
      name: "CAVA Group, Inc.",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "COHR",
      name: "Coherent Corp.",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "QCOM",
      name: "QUALCOMM Incorporated",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "CELH",
      name: "Celsius Holdings, Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "EOSE",
      name: "Eos Energy Enterprises, Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "IOVA",
      name: "Iovance Biotherapeutics, Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "U",
      name: "Unity Software Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "AAOI",
      name: "Applied Optoelectronics, Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "IREN",
      name: "IREN Limited",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "KTOS",
      name: "Kratos Defense & Security Solutions",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "LITE",
      name: "Lumentum Holdings Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "MP",
      name: "MP Materials Corp.",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "NET",
      name: "Cloudflare, Inc.",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "TEAM",
      name: "Atlassian Corporation",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "OKLO",
      name: "Oklo Inc.",
      date: "2026-11-06",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "WULF",
      name: "TeraWulf Inc.",
      date: "2026-11-06",
      estimated: true,
      time: "bmo"
    }
  ]
};
