# Claude Code Instructions — IsItaBUY

See `.github/copilot-instructions.md` for full project conventions, stock definition format, and architecture.

## Updating Stock Prices

Stock prices are hard-coded as `currentPrice` in each `stocks/TICKER.ts` file (line 8). Prices are updated automatically via GitHub Actions and can also be updated manually.

### Automatic Updates (GitHub Actions)

A workflow (`.github/workflows/update-prices.yml`) runs **every weekday at 9:30 PM UTC** (after US market close). It fetches prices from Yahoo Finance, commits changes to `main`, and triggers a site redeploy. You can also trigger it manually from the **Actions** tab on GitHub.

### Manual Update via Script (on your local machine)

The `update_prices.py` script fetches prices from Yahoo Finance. No dependencies needed — just Python 3.

```bash
cd IsItaBUY_gemini
python3 update_prices.py          # dry run — shows what would change
python3 update_prices.py --apply  # writes changes to stock files
```

After applying, commit and push:

```bash
git add stocks/
git commit -m "Update stock prices"
git push
```

### Manual Update via Claude Code (uses credits)

If the script is unavailable, prices can be updated via web search:

1. **Get the ticker list**:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

2. **Fetch live prices via web search** — search in batches of 5-6 tickers at a time:
   ```
   WebSearch: "NVDA NFLX AMAT AVGO MRVL ASML stock price today [month] [year]"
   ```
   Sources that reliably return prices in search snippets: **investing.com, CNBC, Morningstar, TradingView, stockanalysis.com, finviz.com**.

   **Note**: Direct API calls (Yahoo Finance, yfinance Python) and WebFetch to major finance sites are blocked from this environment (403 proxy). WebSearch is the only reliable method from Claude Code.

3. **Update prices** — use `sed` for bulk updates:
   ```bash
   cd stocks
   sed -i 's/currentPrice: OLD,/currentPrice: NEW,/' TICKER.ts
   ```

4. **Verify**:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

### After Any Price Update

Review tiering impact — check if any stocks changed their rating (STRONG BUY / BUY / HOLD / OVERVALUED) or home page group (PRIME GROWTH / TURBO GROWTH / WATCH LIST / AVOID). Run the build to verify:
```bash
npm run build
```
Rating thresholds (base-case upside): >30% STRONG BUY, >15% BUY, <96% OVERVALUED (only if no quality boost, otherwise HOLD), else HOLD. See `.github/copilot-instructions.md` "Rating Logic" for full rules.
Group assignment depends on rating + market cap + RS rating + RS trend (see `classifyStock()` in `App.tsx`).

If a stock's rating or group changed, evaluate whether `rsRating`, `rsTrend`, or `ratingOverride` also need updating to reflect current market conditions.

### Price Format

Keep exact prices from Yahoo Finance (e.g., `348.47`). Trailing zeros are stripped (`348.00` → `348`, `348.40` → `348.4`).

## Burry SBC Indicator

Each stock can carry an optional `burry` block in its `defineStock` call. When present, the home-page row gets a colored `B X%` badge, the detail page renders a full `BurryIndicator` panel + `Burry-Adjusted Read` callout in the verdict, and (for ≥30% overstatement) the strategicNarrative ends with a Burry-context sentence. The model verdict itself is **never** affected — Burry data is parallel/display-only.

### Schema

```ts
burry: {
  sbc: number;              // Annual stock-based compensation in $M
  gaapNi: number;           // Annual GAAP net income in $M (negative = loss)
  buyback?: number;         // Annual gross share repurchases in $M
  epsBasis?: 'GAAP' | 'NON_GAAP';  // Basis of `baseEps` for the multiple-haircut tile
  fy?: string;              // Fiscal year label, e.g. "FY25" or "2025"
  overstatementPct?: number;       // 0-100; preferred over computed SBC/NI when set
  overstatementSource?: 'burry-published' | 'estimated';
  note?: string;            // One-line context shown in the indicator panel
}
```

### Tier thresholds (must match across BurryBadge + BurryIndicator)

| Tier | Overstatement % | Coefficient (1 − pct/100) | Color |
|---|---|---|---|
| Pristine | < 15% | > 0.85 | emerald |
| OK | 15–30% | 0.70–0.85 | lime |
| Critical | 30–70% | 0.30–0.70 | amber |
| Tragic | ≥ 70% (or GAAP loss) | ≤ 0.30 (or any when NI ≤ 0) | rose |

### Setting `overstatementPct` for a new stock

**If on Burry's published chart** (LRCX 49%, AMD 32%, INTU 32%, SNPS 31%, NVDA 29%, NFLX 22%, META 20%, AMZN 21%): use the published value with `overstatementSource: 'burry-published'`.

**Otherwise**, estimate using calibrated heuristic:

1. Compute naive SBC/NI = `sbc / gaapNi` × 100
2. Apply MTM amplifier based on 3-year stock return:
   - 1×–2× return → multiplier ~1.5
   - 2×–4× return → multiplier ~2.5
   - 4×–8× return → multiplier ~4.0
   - 8×+ return → multiplier ~6.0
3. Subtract buyback offset: `min(20%, (buyback / sbc - 1) × 10)` if buyback > SBC, else 0
4. Cap at 100%; round to nearest 5%

Examples (calibration check against published values):
- LRCX naive 6%, 4.8× stock, modest buyback → est. ~50% (matches published 49%)
- NVDA naive 5%, 7.2× stock, $40B buyback (6× SBC) → est. ~30% (matches published 29%)
- NFLX naive 7.5%, 2.6× stock, 10× SBC buyback → est. ~22% (matches published 22%)

Use `overstatementSource: 'estimated'` for these.

### When to refresh Burry data

Update the `burry` block when:
1. A company reports a new fiscal year (refresh `sbc`, `gaapNi`, `buyback`, `fy`)
2. SBC growth deviates significantly from prior years (>20% change)
3. A buyback authorization is materially exercised or paused
4. Burry publishes new chart data and the stock appears on it

After any update:
- Verify the badge tier changes haven't broken expected groupings
- Re-read the strategicNarrative if its appended Burry sentence references stale numbers
- Run `npm run build` to confirm no TypeScript errors

### Loss-makers and edge cases

- For GAAP-loss stocks (e.g., RBRK, ASTS, ARRY, SMWB, THM): set `overstatementPct: 100` with a note explaining the framework breaks down for negative NI
- For pre-revenue companies (THM): `gaapNi` should be negative, `overstatementPct: 100`
- For stocks with no `baseEps` (DCF/FCF model): `epsBasis` can be `'GAAP'` since there's no non-GAAP P/E haircut to apply
- Coefficient ≤ 0 always falls into Tragic tier regardless of percentage

### Source data

Always cite specific FY when entering data. Useful sources for SBC + buybacks:
- **macrotrends.net** — annual SBC time series
- **financecharts.com** — buybacks + SBC quarterly/annual
- Company 10-K filings (cash flow statement: "Stock-based compensation" line)
- Quarterly press releases for buyback dollar amounts

## Debt Safety Indicator

Each stock can carry an optional `debtSafety` block in its `defineStock` call. When present, the detail page renders a **Debt Safety Check** panel below the Burry Indicator. Display-only — does not affect the model verdict or rating.

### Schema

```ts
debtSafety: {
  netDebt: number;          // Total debt − cash, $M. Negative = net cash.
  ebitda: number;           // Annual EBITDA, $M (for leverage ratio).
  capexToOcf?: number;      // CapEx / Operating Cash Flow (0–1). Only needed if netDebt/ebitda > 2.0.
  interestCoverage?: number; // EBIT / Interest Expense. Only needed if netDebt/ebitda > 2.0.
  altmanZ?: number;         // Altman Z-Score. Only needed if netDebt/ebitda > 2.0.
  fy?: string;              // Fiscal year label, e.g. "FY25"
  note?: string;            // One-line context shown in the panel
}
```

### 3-Step Logic (tier thresholds must stay aligned with `services/debtTier.ts`)

| Step | Condition | Tier |
|---|---|---|
| 1 | Net Debt ≤ 0 (net cash) | GREEN |
| 2 | Net Debt / EBITDA ≤ 2.0 | GREEN |
| 3a | All three pass: CapEx/OCF < 20%, Interest Coverage > 5×, Altman Z > 3.0 | YELLOW |
| 3b | Any condition fails | RED |

- **GREEN**: Financially safe — no further action needed.
- **YELLOW**: Debt elevated but justified (e.g., MSCI). Can invest, monitor leverage trajectory.
- **RED**: Dangerous — high default risk, skip or heavy discount.

### When to add/update `debtSafety`

Add it for **every new stock**. Update when:
1. Company reports a new fiscal year (refresh `netDebt`, `ebitda`)
2. A large acquisition or debt paydown materially changes leverage
3. Interest coverage or Altman Z crosses a tier boundary

### Setting Step-3 fields

Step-3 fields (`capexToOcf`, `interestCoverage`, `altmanZ`) are only needed when `netDebt / ebitda > 2.0`. For net-cash or low-leverage stocks you can omit them entirely.

**Altman Z-Score note**: the classic Z-Score was designed for manufacturing companies and can give misleading results for asset-light tech/SaaS businesses. For software/SaaS names, treat Z < 3.0 as a soft flag rather than a hard red — use `note` to document the caveat.

### Sources

- **macrotrends.net** — Net Debt time series, EBITDA
- **wisesheets.io / stockanalysis.com** — Interest coverage, CapEx/OCF
- Company 10-K filings — balance sheet (debt, cash), income statement (EBIT, interest expense), cash flow (CapEx, OCF)
- Altman Z-Score calculators: **wisesheets.io**, **gurufocus.com**
