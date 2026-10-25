import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// A watchlist entry's extra setups (`alt`, and up to 5 per timeframe in `more: [...]`)
// are only read once a row is expanded, but they were bundled for every visitor: ~464 KB
// of source, 38 KB gzipped. This plugin writes them to public/setups/TICKER.json at build
// start and strips them from the module, so the home page ships only each stock's main
// setup and an expanded row fetches the rest — the same trip it already makes for candles.
//
// The source stays a single .ts file, so pattern_watchlist.py and pattern_detect.py are
// untouched. Every emitted file is JSON.parse'd here: a conversion slip fails the build
// instead of silently shipping an entry whose extra setups never load.
import fs from 'fs';

const WATCHLIST = 'data/patternWatchlist.ts';
const SETUPS_DIR = 'public/setups';

/** The JS object-literal source the Python writer emits, as JSON. */
function toJson(src: string): string {
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"') {                       // copy strings verbatim
      let j = i + 1;
      while (j < src.length && src[j] !== '"') j += src[j] === '\\' ? 2 : 1;
      out += src.slice(i, j + 1);
      i = j;
      continue;
    }
    out += ch;
  }
  return out
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')   // quote bare keys
    .replace(/,(\s*[}\]])/g, '$1');                            // drop trailing commas
}

/** Value starting at `from` (an object or array literal), as [start, end). */
function spanOf(code: string, from: number): [number, number] {
  let i = from, depth = 0;
  for (; i < code.length; i++) {
    const ch = code[i];
    if (ch === '"') { i++; while (i < code.length && code[i] !== '"') i += code[i] === '\\' ? 2 : 1; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (!depth) return [from, i + 1]; }
  }
  return [from, code.length];
}

// The landing page and the ledger need to know *which* stocks have a valuation page and
// what they are called — a count, a name beside a ticker, and whether `#TICKER` is a real
// route. Reaching that through `constants.ts` pulled all 95 stock definitions (555 KB, the
// single biggest thing in the bundle) into the first chunk for a page that renders none of
// them. This serves the same three facts as a ~3 KB virtual module read from the directory
// listing, so the definitions stay in the detail route's own chunk.
//
// Built from the files rather than checked in, for the same reason `stocks/index.ts` globs
// instead of listing: adding a stock is dropping in a file, and a catalog that needs a
// second edit is a catalog that goes stale.
const CATALOG_ID = 'virtual:stock-catalog';

function stockCatalog() {
  return {
    name: 'stock-catalog',
    resolveId(id: string) {
      return id === CATALOG_ID ? '\0' + CATALOG_ID : null;
    },
    load(id: string) {
      if (id !== '\0' + CATALOG_ID) return null;
      const field = (src: string, key: string) =>
        new RegExp(`^\\s*${key}:\\s*(['"])(.*?)\\1`, 'm').exec(src)?.[2];
      const rows = fs.readdirSync('stocks')
        .filter(f => f.endsWith('.ts') && !['index.ts', 'defineStock.ts'].includes(f))
        .map(f => {
          const src = fs.readFileSync(`stocks/${f}`, 'utf8');
          const ticker = field(src, 'ticker');
          const name = field(src, 'name');
          if (!ticker || !name) throw new Error(`stock-catalog: stocks/${f} has no ticker/name`);
          if (ticker !== f.slice(0, -3)) {
            throw new Error(`stock-catalog: stocks/${f} declares ticker "${ticker}" — loadProse() resolves by filename, so they must match`);
          }
          return { ticker, name };
        })
        .sort((a, b) => a.ticker.localeCompare(b.ticker));
      return `export const STOCK_CATALOG = ${JSON.stringify(rows)};\n`;
    },
    // Adding a stock is dropping a file in stocks/, and in dev that has to reach the
    // catalog or the new ticker routes to the landing page until the server restarts.
    handleHotUpdate(ctx: { file: string; server: any; modules: unknown[] }) {
      if (!/[\\/]stocks[\\/][^\\/]+\.ts$/.test(ctx.file)) return;
      const mod = ctx.server.moduleGraph.getModuleById('\0' + CATALOG_ID);
      if (mod) ctx.server.moduleGraph.invalidateModule(mod);
    },
  };
}

function splitStoredSetups() {
  return {
    name: 'split-stored-setups',
    enforce: 'pre' as const,

    buildStart() {
      const code = fs.readFileSync(WATCHLIST, 'utf8');
      fs.rmSync(SETUPS_DIR, { recursive: true, force: true });
      fs.mkdirSync(SETUPS_DIR, { recursive: true });

      const starts: { ticker: string; at: number }[] = [];
      const re = /\n  \{\n    ticker: "([A-Z.]+)"/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(code))) starts.push({ ticker: m[1], at: m.index });

      let written = 0;
      starts.forEach((s, k) => {
        const body = code.slice(s.at, k + 1 < starts.length ? starts[k + 1].at : code.length);
        const extra: Record<string, unknown> = {};
        for (const key of ['alt', 'more'] as const) {
          const hit = new RegExp(`\n    ${key}: ([\\[{])`).exec(body);
          if (!hit) continue;
          const [a, b] = spanOf(body, hit.index + hit[0].length - 1);
          const json = toJson(body.slice(a, b));
          try {
            extra[key] = JSON.parse(json);
          } catch (err) {
            throw new Error(`split-stored-setups: ${s.ticker}.${key} did not convert to JSON (${(err as Error).message})`);
          }
        }
        if (!Object.keys(extra).length) return;
        fs.writeFileSync(`${SETUPS_DIR}/${s.ticker}.json`, JSON.stringify(extra));
        written++;
      });
      this.warn?.(`split-stored-setups: wrote ${written} per-ticker setup files`);
    },

    transform(code: string, id: string) {
      if (!id.replace(/\\/g, '/').endsWith(WATCHLIST)) return null;
      let out = '';
      let i = 0;
      const re = /\n[ \t]*(alt|more):\s*[[{]/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(code))) {
        const [, end] = spanOf(code, m.index + m[0].length - 1);
        let j = end;
        if (code[j] === ',') j++;
        out += code.slice(i, m.index);
        i = j;
        re.lastIndex = j;
      }
      return { code: out + code.slice(i), map: null };
    },
  };
}

export default defineConfig({
  base: '/IsItaBUY_helper/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    stockCatalog(),
    splitStoredSetups(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // We register the SW manually in index.tsx so we can poll for new
      // deploys while a tab/installed app stays open. Disable auto-injection
      // to avoid registering the service worker twice.
      injectRegister: false,
      includeAssets: [
        'favicon.svg',
        'favicon-32x32.png',
        'favicon-16x16.png',
        'apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: 'Is It a BUY?',
        short_name: 'IsItaBUY',
        description: 'Stock valuation app — DCF & EPS/PE fair value for 50+ growth stocks',
        theme_color: '#0a1128',
        background_color: '#020617',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/IsItaBUY_helper/',
        start_url: '/IsItaBUY_helper/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        // Cache versioning — bump to force users to drop the old precache and
        // pick up the new build immediately on next visit. Increment when
        // shipping data changes (e.g. Burry indicator scope) that may otherwise
        // be masked by stale SW cache.
        cacheId: 'isitabuy-v6',
        cleanupOutdatedCaches: true,
        // Precache all static assets built by Vite (JS, CSS, HTML, fonts)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Runtime caching for Google Fonts
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-css',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
