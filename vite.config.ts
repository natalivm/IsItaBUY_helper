import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// The watchlist data keeps up to 5 detected setups per timeframe in `more: [...]` for the
// Python scripts. The site shows up to KEEP_PER_TF of them per timeframe, so the rest are
// stripped from the bundle rather than the whole array (which is what this used to do, back
// when only the best weekly + daily setup was shown).
const KEEP_PER_TF = 3;

function stripStoredSetups() {
  return {
    name: 'strip-stored-setups',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.replace(/\\/g, '/').endsWith('data/patternWatchlist.ts')) return null;
      let out = '';
      let i = 0;
      const key = /\n[ \t]*more:\s*\[/g;
      let m: RegExpExecArray | null;
      while ((m = key.exec(code))) {
        const open = m.index + m[0].length;
        let j = open, depth = 1;
        // Object spans inside this `more: [...]`, so we can keep the first few per timeframe.
        const objs: [number, number][] = [];
        let objStart = -1;
        while (j < code.length && depth) {
          const ch = code[j];
          if (ch === '"') { j++; while (j < code.length && code[j] !== '"') j += code[j] === '\\' ? 2 : 1; }
          else if (ch === '[') depth++;
          else if (ch === '{') { if (depth === 1) objStart = j; depth++; }
          else if (ch === '}') { depth--; if (depth === 1 && objStart >= 0) { objs.push([objStart, j + 1]); objStart = -1; } }
          else if (ch === ']') depth--;
          j++;
        }
        const close = j - 1;                       // the ']' that ends the array
        const seen: Record<string, number> = {};
        const keep = objs.filter(([a, b]) => {
          const tf = /timeframe:\s*"(\w+)"/.exec(code.slice(a, b))?.[1] ?? '?';
          seen[tf] = (seen[tf] ?? 0) + 1;
          return seen[tf] <= KEEP_PER_TF;
        });
        out += code.slice(i, open);
        out += keep.map(([a, b]) => '\n      ' + code.slice(a, b) + ',').join('');
        out += '\n    ';
        i = close;                                  // resume at ']' so the array stays closed
        key.lastIndex = close;
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
    stripStoredSetups(),
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
