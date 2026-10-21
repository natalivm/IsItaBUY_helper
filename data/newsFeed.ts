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
