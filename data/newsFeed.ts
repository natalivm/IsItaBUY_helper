// News feed (Notes / News panel → News tab), newest first.
// Pattern Break Watchlist status changes are posted here automatically by
// update_prices.py / pattern_watchlist.py: new setups, breaks confirmed,
// targets reached, setups that need updating. Hand-written posts can be added
// too; keep each `id` unique (the bot uses it to avoid double-posting).

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  tickers?: string[];
  image?: string;
  text?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "2026-10-21-auto-scan-133",
    date: "Oct 21 2026",
    tickers: [],
    title: "Auto-detected setups updated for 133 stocks",
    text: "Every valid pattern per stock is now listed (weekly and daily); 1056 setups added. Auto-detected ones carry a red dot until checked by hand.",
  },
  {
    id: "2026-10-21-auto-scan",
    date: "Oct 21 2026",
    tickers: [],
    title: "Auto-detected setups for 67 stocks",
    text: "67 with a channel, wedge or reversal candle, 0 with no clear pattern yet. Marked with a red dot until checked by hand.",
  },
  {
    id: "2026-10-21-CBRS-main-removed",
    date: "Oct 21 2026",
    tickers: ["CBRS"],
    title: "CBRS · setup closed",
    text: "Target reached Oct 20.",
  },
  {
    id: "2026-10-21-CRWD-main-removed",
    date: "Oct 21 2026",
    tickers: ["CRWD"],
    title: "CRWD · setup closed",
    text: "Target reached Jul 1.",
  },
  {
    id: "2026-10-20-LIFE-main-removed",
    date: "Oct 20 2026",
    tickers: ["LIFE"],
    title: "LIFE · target reached",
    text: "Hit target $41.17.",
  },
  {
    id: "2026-10-21-AGCO-main-confirmed",
    date: "Oct 21 2026",
    tickers: ["AGCO"],
    title: "AGCO · new setup",
    text: "Ascending Channel (daily), break confirmed.",
  },
  {
    id: "2026-10-20-NFLX-main-update",
    date: "Oct 20 2026",
    tickers: ["NFLX"],
    title: "NFLX · needs updating",
    text: "Closed $68.69 back below signal $70.22, signal cancelled.",
  },
  {
    id: "2026-10-19-HTFL-main-update",
    date: "Oct 19 2026",
    tickers: ["HTFL"],
    title: "HTFL · needs updating",
    text: "Closed $51.02 back above signal $50.93, signal cancelled.",
  },
];
