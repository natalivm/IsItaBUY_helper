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

      // Where each stock's entry begins, so a count can be left behind once per stock
      // rather than once per removed block.
      const entryAt: number[] = [];
      const reTicker = /\n  \{\n    ticker: "[A-Z.]+"/g;
      let e: RegExpExecArray | null;
      while ((e = reTicker.exec(code))) entryAt.push(e.index);

      const cuts: { from: number; to: number; auto: number; entry: number }[] = [];
      const re = /\n[ \t]*(alt|more):\s*[[{]/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(code))) {
        const [, end] = spanOf(code, m.index + m[0].length - 1);
        let j = end;
        if (code[j] === ',') j++;
        // The ledger row has to be able to say "this stock is owed a look" without
        // fetching the file these setups are moving into, so carry the tally across.
        const auto = (code.slice(m.index, j).match(/\bauto:\s*true\b/g) || []).length;
        let entry = 0;
        while (entry + 1 < entryAt.length && entryAt[entry + 1] < m.index) entry++;
        cuts.push({ from: m.index, to: j, auto, entry });
        re.lastIndex = j;
      }

      const hidden = new Map<number, number>();
      for (const c of cuts) hidden.set(c.entry, (hidden.get(c.entry) || 0) + c.auto);

      let out = '';
      let i = 0;
      cuts.forEach((c, k) => {
        out += code.slice(i, c.from);
        const last = k + 1 === cuts.length || cuts[k + 1].entry !== c.entry;
        const n = hidden.get(c.entry) || 0;
        if (last && n > 0) out += `\n    autoHidden: ${n},`;
        i = c.to;
      });
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
