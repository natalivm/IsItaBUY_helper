// The `stock-catalog` plugin in vite.config.ts serves this at build time: one row per
// file in stocks/, so a route can name a stock without loading its definition.
declare module 'virtual:stock-catalog' {
  export const STOCK_CATALOG: { ticker: string; name: string }[];
}
