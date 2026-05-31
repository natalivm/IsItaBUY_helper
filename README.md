<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# IsItaBUY

A React + TypeScript stock valuation app that calculates intrinsic fair value using DCF and EPS/PE models.

Live: **https://natalivm.github.io/IsItaBUY_helper/**

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## GitHub Pages Deployment

Deployments are automated via `.github/workflows/deploy-pages.yml` on every push to `main`/`master`.

The workflow:
1. Installs dependencies (`npm ci`)
2. Builds with `--base /IsItaBUY_helper/` so all asset paths resolve correctly under the GitHub Pages subpath
3. Copies `dist/index.html` → `dist/404.html` for SPA deep-link support
4. Uploads the `dist/` directory and deploys to GitHub Pages

`vite.config.ts` sets `base: '/IsItaBUY_helper/'` unconditionally, so local builds and CI builds both produce correct asset URLs.
