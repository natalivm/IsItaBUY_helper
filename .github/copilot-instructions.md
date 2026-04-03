# Copilot Instructions — IsItaBUY

## Project Overview

A React + TypeScript stock valuation app that calculates intrinsic fair value using DCF and EPS/PE models. Deployed on **Vercel** as a Vite SPA with serverless API functions.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (framer-motion)
- **Deployment**: Vercel (SPA + serverless functions in `api/`)
- **Package manager**: npm
- **No backend/database** — all stock data is static TypeScript files

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server on port 3000
npm run build     # Production build (vite build)
npm run lint      # Type-check (tsc --noEmit)
```

## Project Structure

```
├── components/             # React components
│   ├── StockDetailView.tsx  # Full stock analysis page
│   ├── InvestmentVerdict.tsx # Buy/Hold/Avoid verdict with RS-aware narratives
│   ├── StockPageHeader.tsx
│   ├── StockMetricCards.tsx
│   └── ScenarioMetricsCard.tsx
├── services/
│   ├── projectionService.ts # DCF & EPS/PE valuation engine
│   └── stockMetrics.ts      # Derived metrics (momentum, acceleration, etc.)
├── stocks/                 # Stock definition files (one per ticker)
│   ├── defineStock.ts       # Helper: SimpleStockInput → StockDefinition
│   ├── index.ts             # Auto-discovers all stock files via import.meta.glob
│   ├── ANET.ts, NVDA.ts ... # Individual stock definitions
├── App.tsx                 # Main app (home list + stock detail routing)
├── constants.ts            # Builds TICKERS/CONFIGS from stock files
├── types.ts                # Core TypeScript interfaces
├── utils.ts                # Utility functions (cn, rsRatingStyle, rsRatingColor)
└── vercel.json             # Vercel SPA rewrite + API routing
```

## Adding a New Stock

Create a new file `stocks/TICKER.ts`. The auto-discovery in `stocks/index.ts` picks it up automatically — no imports to add.

Use the `defineStock()` helper with `[bear, base, bull]` tuples:

```typescript
import { defineStock } from './defineStock';

export const TICKER = defineStock({
  // Identity
  ticker: 'TICKER',
  name: 'Company Name',
  sector: 'Sector',
  themeColor: '#hex',

  // Financials (all dollar amounts in millions)
  currentPrice: 100,
  shares0: 500,          // shares outstanding in millions
  rev25: 5000,           // FY25 revenue in millions
  fcfMargin25: 0.20,     // FY25 FCF margin
  taxRate: 0.21,
  cash: 1000,            // optional
  debt: 2000,            // optional
  beta: 1.2,             // optional
  costDebt: 0.05,        // optional

  // Display
  rsRating: 75,          // IBD Relative Strength 1-99
  rsTrend: 'rising',     // 'rising' | 'falling' | 'flat' (default: 'flat')
  aiImpact: 'TAILWIND',  // 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL'
  strategicNarrative: 'Why this stock matters...',
  fairPriceRange: '$80 - $150',

  // Alpha Strategic View — override when narrative disagrees with model
  // ratingOverride: 'HOLD',  // 'STRONG BUY' | 'BUY' | 'HOLD' | 'AVOID'

  // Model type (default: 'DCF_ADVANCED')
  modelType: 'DCF_ADVANCED',  // or 'EPS_PE'

  // Scenarios [bear, base, bull] — 5-year revenue growth paths
  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.02],   // bear
    [0.10, 0.09, 0.08, 0.07, 0.06],   // base
    [0.15, 0.14, 0.13, 0.12, 0.11],   // bull
  ],

  // FCF margin: number (flat) or number[] (year-by-year)
  fcfMargin: [0.15, 0.20, 0.25],

  // EBITDA exit multiple
  exitMultiple: [12, 16, 20],

  // Scenario descriptions
  desc: [
    'Bear case description...',
    'Base case description...',
    'Bull case description...',
  ],

  // Optional fields with sensible defaults:
  // termGrowth: [0.015, 0.025, 0.03],
  // waccAdj: [0.01, 0, -0.005],
  // bbRate: [0.005, 0.015, 0.03],
  // ebitdaProxy: [0.15, 0.22, 0.35],
  // bullMaOptVal: true,  // auto-calc M&A option value
  // thesis: ['bear thesis', 'base thesis', 'bull thesis'],

  // For EPS_PE model, add:
  // baseEps: 5.00,
  // epsCagr: [8, 12, 16],
  // exitPE: [15, 20, 25],
  // prob: [25, 50, 25],
});
```

## Key Conventions

1. **Trio pattern**: Scenario data always uses `[bear, base, bull]` tuples
2. **Dollar amounts in millions**: `rev25`, `cash`, `debt`, `shares0` are all in millions
3. **`defineStock()` is required**: All new stocks must use the helper, not raw `StockDefinition`
4. **Auto-discovery**: `stocks/index.ts` uses `import.meta.glob` — just export a `StockDefinition` from any `.ts` file in `stocks/`
5. **Two valuation models**:
   - `DCF_ADVANCED` (default): Uses revGrowth, fcfMargin, exitMultiple, termGrowth
   - `EPS_PE`: Uses baseEps, epsCagr, exitPE, prob
6. **Model selection rule** — use the decision tree below to pick the right model for each new stock
7. **RS Rating tiers**: <15 very low, 15-39 low, 40-79 neutral, 80-90 strong, >90 overextended
7. **Investment verdicts**: STRONG BUY / BUY / HOLD / AVOID — see "Rating Logic" section below for full rules
8. **Prices**: Static `currentPrice` in each stock file — updated manually by request (no live price fetching)
9. **`prob` and `epsCagr` must be integer percentages**: Use `[25, 50, 25]` not `[0.25, 0.50, 0.25]`. The model divides by 100 internally.

## Model Selection Decision Tree

When adding a new stock, use `EPS_PE` if **any** of these conditions is true:

1. **FCF is temporarily depressed by heavy CapEx** — the company is in a major investment cycle (nuclear restarts, data center buildout, factory expansion) that compresses FCF margins below normal levels while adjusted earnings power is clear.
   - *Examples: CLS (EMS, $1B CapEx cycle), CEG (nuclear uprates + Calpine), TLN (ECP gas plant acquisition)*

2. **Debt is operational, not corporate** — for banks, lenders, and financial companies where the balance sheet "debt" is loan portfolio funding / securitization, not traditional corporate leverage. DCF subtracts net debt from enterprise value, which is conceptually wrong for lending businesses.
   - *Examples: ENVA (securitization facilities), NU (digital banking deposits)*

3. **FCF margin is structurally thin (<5%)** for the sector — EMS, contract manufacturers, and similar low-margin businesses where DCF systematically undervalues because thin FCF margins crush the present value of cash flows and the perpetuity terminal value.
   - *Examples: CLS (EMS, 2.9-4.2% FCF margins)*

4. **Massive debt on tiny float** — when debt is very large relative to market cap and share count, small changes in enterprise value create huge per-share swings. DCF bear cases can go negative.
   - *Examples: TLN ($9.25B debt on 45.96M shares)*

5. **GAAP earnings are distorted** by hedging, accounting, or one-time items — but adjusted EPS clearly shows the earnings trajectory. The EPS_PE model cuts through accounting noise.
   - *Examples: TLN (trailing P/E 77x is hedging distortion)*

6. **The investment thesis is explicitly framed in P/E terms** — the strategic narrative references forward P/E, EPS CAGR, or earnings multiples as the primary valuation framework.

Use `DCF_ADVANCED` (default) when:
- The company has healthy, representative FCF margins (>8-10%)
- Debt is traditional corporate leverage (not operational/securitization)
- The balance sheet is not distorted (debt < 2x market cap)
- The investment thesis is about cash flow generation and intrinsic value

**Important**: When using `DCF_ADVANCED`, always set `ebitdaProxy` explicitly. The defaults `[0.15, 0.22, 0.35]` are too low for high-margin businesses (SaaS, cybersecurity, software). Check the company's actual EBITDA margin and set accordingly.

### Validation checklist for new stocks:
- [ ] Model type matches the decision tree above
- [ ] If DCF: `ebitdaProxy` is explicitly set (not relying on defaults)
- [ ] If DCF: debt < 2x market cap (otherwise consider EPS_PE)
- [ ] If DCF: FCF margin > 5% (otherwise consider EPS_PE)
- [ ] If EPS_PE: `baseEps`, `epsCagr`, `exitPE` are all provided
- [ ] Bear case produces a positive, plausible stock price (not negative)
- [ ] Weighted average is directionally aligned with analyst consensus (within 50%)

## Rating Logic

Rating is determined automatically in `getInstitutionalRating()` (`services/projectionService.ts`) based on base-case upside and quality signals.

### Thresholds

| Condition | Rating |
|-----------|--------|
| RS rating < 30 | **AVOID** (hard cap — weak institutional support) |
| Base-case upside > 30% | **STRONG BUY** |
| Upside > 25% + quality boost | **STRONG BUY** |
| Base-case upside > 15% | **BUY** |
| Upside > 12% + quality boost | **BUY** |
| Target < 96% of spot (overvalued) + **no** quality boost | **AVOID** |
| Target < 96% of spot (overvalued) + quality boost | **HOLD** |
| Everything else | **HOLD** |

### Quality boost

A stock has a "quality boost" when RS rating >= 80 **or** aiImpact is TAILWIND. This softens thresholds in two ways:
- **Lowers the BUY/STRONG BUY entry points** (12% instead of 15%, 25% instead of 30%)
- **Prevents AVOID when overvalued** — stocks with strong fundamentals and institutional momentum that happen to trade above model fair value get HOLD, not AVOID

### Why AVOID requires weak quality signals

AVOID is a strong verdict that implies "sell / don't touch." It should be reserved for stocks where:
- The model says overvalued **AND** fundamentals are lagging (no quality boost), or
- RS rating is below 30 (institutions are actively exiting)

Stocks like TER (RS 98, AI TAILWIND) that trade above model fair value are simply at fair price or mildly extended — not broken. These get HOLD, signaling "don't add here, wait for a pullback" rather than "stay away."

## Alpha Strategic View

The narrative assessment in `strategicNarrative` is the **authoritative rating** and always overrides the quantitative model when they disagree.

### Rules for every stock addition or update:

1. **Write the `strategicNarrative` first** — it must include a clear verdict (BUY, HOLD, WAIT, AVOID) with reasoning
2. **Compare the narrative verdict to the quantitative model output** (base-case upside thresholds: >30% STRONG BUY, >15% BUY, <96% AVOID, else HOLD)
3. **If they disagree, set `ratingOverride`** to match the narrative assessment:
   ```typescript
   ratingOverride: 'HOLD',  // narrative says WAIT, model says STRONG BUY
   ```
4. **If they agree, omit `ratingOverride`** — let the model speak for itself
5. **The quantitative model rating is always preserved** and shown as "Model: X" in the Investment Verdict section when an override is active, so changes in conditions can be monitored

### Common mismatch patterns:
- Model says STRONG BUY/BUY but CAGR is below 15% threshold → override to HOLD
- Model says AVOID but narrative is bullish on structural thesis → override to BUY
- Model says STRONG BUY but narrative flags existential risk → override to HOLD or AVOID

## Vercel Deployment

- **Framework**: Vite (auto-detected by Vercel)
- **Build command**: `vite build` (default)
- **Output directory**: `dist` (default)
- **SPA routing**: `vercel.json` rewrites all routes to `index.html`

## Style Guide

- Tailwind CSS v4 (imported via `@tailwindcss/vite` plugin, no `tailwind.config`)
- Dark theme backgrounds use CSS theme variables defined in `index.css`:
  - `bg-surface-deep` (`#0a1128`) — page-level backgrounds
  - `bg-surface-card` (`#0d1630`) — cards and panels (supports opacity: `bg-surface-card/80`)
- Text colors: `slate-300/400/500`
- Theme color per stock (used for accents): `tickerDef.themeColor`
- Animation: `motion/react` (framer-motion v12+)
- Utilities from `utils.ts`: `cn()` (clsx + tailwind-merge), `rsRatingStyle()`, `rsRatingColor()`
- Formatting helpers from `services/stockMetrics.ts`: `usd()`, `pctFmt()`
