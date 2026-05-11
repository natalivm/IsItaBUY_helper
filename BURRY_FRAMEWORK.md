# Burry SBC Framework — Project Context & State

Reference doc for resuming work on the Michael Burry "Cassandra Unchained" SBC dilution indicator. See `CLAUDE.md` for the day-to-day schema reference; this file captures the *why*, the *calibration history*, and the *open decisions*.

## Quick state (as of last update)

- **Coverage**: **20 stocks** have a `burry` block — ONLY those manually TIKR-verified or Burry-published. Hand-estimated values were removed because they proved systematically biased (multiple stocks like APP/MELI/DUOL/ORCL were originally estimated 50-75% Tragic but TIKR data showed 20-50% OK/Critical).
- **UI**: BurryBadge on home rows, BurryIndicator panel + Burry-Adjusted Read callout on detail pages, TradingView mini chart in sidebar (all unchanged; just render for fewer stocks)
- **PR**: [#197](https://github.com/natalivm/IsItaBUY_helper/pull/197) on `claude/stock-valuation-checker-LuPEm` branch
- **Status**: Conservative-coverage stance. Better to show no signal than a wrong signal. Anyone wanting Burry data on a new stock should pull TIKR cash flow data and run the verification recipe below.

### Verified stocks with burry data (20)

| Ticker | overstatement % | Source |
|---|---|---|
| LRCX | 49% | Burry-published |
| AMD | 32% | Burry-published |
| INTU | 32% | Burry-published |
| SNPS | 31% | Burry-published |
| NVDA | 29% | Burry-published |
| NFLX | 22% | Burry-published |
| AMZN | 21% | Burry-published |
| META | 20% | Burry-published |
| CRWD | 100% (GAAP-loss) | TIKR-verified |
| DDOG | 90% | TIKR-verified |
| ZS | 95% | TIKR-verified |
| AXON | 85% | TIKR-verified |
| PLTR | 70% | TIKR-verified |
| ORCL | 50% (data-derived) | TIKR-verified |
| DUOL | 45% | TIKR-verified |
| NOW | 35% | TIKR-verified |
| SHOP | 25% | TIKR-verified |
| APP | 25% | TIKR-verified |
| MELI | 20% | TIKR-verified |
| FICO | 18% | TIKR-verified |

### Why the conservative stance

Original hand-estimates were calibrated against Burry's 8 published values + a heuristic for amplifying naive SBC/NI by stock-return MTM. The heuristic worked well for stocks where MTM >4× (LRCX, AMD, NVDA), but failed badly for:
- Low-MTM stocks (INTU at 0.92× MTM → formula gives −3.7%; Burry says 32%)
- High-buyback stocks (META 3.2× MTM → formula gives 71%; Burry says 20%)
- Stock-split affected (NFLX → formula understates)
- High-quality compounders with low SBC ratio (FICO, APP, MELI → formula overstates)

After 12 TIKR-refreshed stocks, the pattern was clear: hand-estimates were systematically too high for the "reformed compounder" cohort (companies with low SBC + real buybacks). Rather than ship known-biased estimates for 50+ stocks, we cleaned up to only show the 20 we've independently verified.

## What the framework does

The Burry indicator surfaces a parallel view of stock valuation that treats stock-based compensation as a real economic cost rather than a "non-cash" add-back. It is **display-only** — it never modifies the model verdict or rating.

Three layers on each stock detail page:
1. **BurryBadge** (home row): compact `B X%` pill colored by tier
2. **BurryIndicator panel** (detail page): coefficient + tier + buyback comparison + multiple haircut + Burry-Adjusted Target vs Model PW Target
3. **Burry-Adjusted Read callout** (Investment Verdict, ≥30% only): one-sentence summary of how the haircut affects PW target and 5y CAGR

Additionally, for any stock with overstatementPct ≥30, the `strategicNarrative` ends with a standardized Burry sentence.

## The core question this framework answers

Why does Wall Street use non-GAAP earnings, and which is correct?

**Short answer**: GAAP is the economically correct measure of owner earnings. Non-GAAP adds back SBC as if it were "non-cash," but the cash equivalent goes to employees who sell vested shares. Calling SBC non-cash misses the dilution.

**Burry's stricter claim**: even GAAP SBC understates the true cost because it uses grant-date fair value while real dilution happens at vesting-date (current) prices. The gap can be 5-10× for high-flying stocks.

**Why the market ignores it**: companies report non-GAAP, analysts model non-GAAP, every tech firm uses non-GAAP, and pointing out SBC dilution costs analysts their access. The structural blind spot is real.

## Calibration history — 8 anchors

The formula: `overstatement % = (SBC × MTM_multiplier − SBC) / GAAP_NI × 100`
Where `MTM_multiplier = current_price / stock_price_4y_ago`

| Stock | TIKR FY data | 4y MTM | Formula | Burry-published | Error |
|---|---|---|---|---|---|
| **LRCX** | SBC $343M, NI $5,358M, BB $3,422M | 9.7× | 56% | 49% | +7pp ✓ |
| **AMD** | SBC $487M, NI $5,009M, BB $355M | 4.55× | 34.5% | 32% | +2.5pp ✓ |
| **NVDA** | SBC $6,386M, NI $120,067M, BB $48,035M | 6.72× | 30.5% | 29% | +1.5pp ✓ |
| **NFLX** | SBC $368M, NI $10,981M, BB $9,173M | 4.35× (split) | 11% | 22% | −11pp ❌ |
| **SNPS** | SBC $893M, NI $1,336M, BB $306M | 1.72× | 48% | 31% | +17pp ❌ |
| **INTU** | SBC $1,968M, NI $4,340M, BB $3,754M | 0.92× | −3.7% | 32% | −36pp ❌ |
| **META** | SBC $20,427M, NI $63,000M, BB $44,648M | 3.2× | 71% | 20% | +51pp ❌ |
| **AMZN** | SBC $19,467M, NI $77,670M, BB $0 | 2.275× | 32% | 21% | +11pp ⚠️ |

## Formula failure modes (3 distinct types)

### 1. NFLX-style: undershoots
**Pattern**: Low current SBC + recent stock split + SBC declining year-over-year
**Why**: Current SBC charge ≠ trailing vesting cohort. Burry's value reflects historically heavier grants that are now vesting.
**Fix**: Trust Burry-published.

### 2. INTU-style: negative haircut
**Pattern**: Flat-to-down stock + high absolute SBC
**Why**: MTM multiplier <1 produces nonsensical negative adjustment. Real cost floor should be GAAP SBC itself.
**Fix**: Trust Burry-published or floor multiplier at 1.0+.

### 3. META-style: overshoots
**Pattern**: Modest stock appreciation + substantial buybacks
**Why**: Burry credits buybacks more heavily than our pure-MTM formula does.
**Fix**: Trust Burry-published; formula should credit buyback offset.

## When to trust the formula

✅ **Formula reliable** when ALL of:
- Stock has appreciated **>4× over 4 years**
- SBC has been growing or stable (not declining materially)
- No recent stock splits
- Buyback coverage is <3× SBC (formula doesn't credit massive buybacks)

❌ **Trust Burry-published instead** when:
- Stock has appreciated <4× over 4 years (moderate-MTM zone is unreliable)
- Major stock split in past 2 years
- SBC has declined materially
- Buybacks are >3× SBC

## TIKR refresh recipe (5 min/stock)

From TIKR Cash Flow Statement (3 numbers):
- `Stock-Based Compensation` line
- `Repurchase of Common Stock` line
- Net Income (cross-check vs Income Statement)

From price chart (1 number):
- Stock price 4 years ago (approximate is fine)

From Income Statement (already in `shares0`):
- Diluted shares outstanding (current)

Update `stocks/TICKER.ts` `burry` block:
```ts
burry: {
  sbc: <FY value in $M>,
  gaapNi: <FY value in $M>,
  buyback: <FY value in $M>,
  epsBasis: <'GAAP' | 'NON_GAAP'>,
  fy: 'FY25',
  overstatementPct: <number 0-100>,
  overstatementSource: <'burry-published' | 'estimated'>,
  note: '<one-paragraph context>',
},
```

If stock has Burry-published value, use that and label `overstatementSource: 'burry-published'`.
If not, apply formula when MTM ≥4× OR keep current estimate.

## Tier thresholds (must stay consistent across BurryBadge + BurryIndicator)

| Tier | Overstatement % | Coefficient (1 − pct/100) | Color |
|---|---|---|---|
| Pristine | <15% | >0.85 | emerald |
| OK | 15–30% | 0.70–0.85 | lime |
| Critical | 30–70% | 0.30–0.70 | amber |
| Tragic | ≥70% (or GAAP loss) | ≤0.30 | rose |

## Notable decisions made

1. **Display-only**: Burry indicator never overrides model rating. We considered baking it into the DCF/EPS model but the user wanted both views visible.
2. **Buyback offset not credited in our formula**: Burry clearly credits buybacks (see NVDA/META) but we couldn't reverse-engineer the exact crediting weight. Trade-off: simpler formula vs reproducing Burry exactly.
3. **5y vs 4y MTM lookback**: Tested both against LRCX/AMD/NVDA. 4y is the default (typical RSU vesting period). 5y better fits LRCX specifically but overcounts for other stocks.
4. **Loss-makers get overstatementPct: 100 as convention**: Framework breaks for negative GAAP NI; this is a placeholder meaning "real economics deeply negative."
5. **Standard closing sentence appended to all Critical/Tragic narratives**: Script in `/tmp/append_burry_narrative.py` did this — 28 narratives updated. CRWD/INTU/SNPS done manually since they had pre-existing Burry mentions.

## Components added

- `components/BurryIndicator.tsx` — full detail-page panel
- `components/BurryBadge.tsx` — home-row compact pill
- `components/TradingViewMiniChart.tsx` — sidebar embed (related but separate)
- `types.ts` — added `BurryData` interface with optional `overstatementPct` + `overstatementSource`
- `stocks/defineStock.ts` — wired `burry` field through
- `components/InvestmentVerdict.tsx` — added Burry-Adjusted Read callout for ≥30%

## What's next (whenever you resume)

Suggested priorities, in order:

1. **TIKR-refresh stocks you actually hold or are considering buying** — case-by-case, no rush. The 5-min recipe above.
2. **If formula coverage matters**: ~14 high-confidence stocks (MTM ≥4×) could be auto-refreshed if you have TIKR access:
   - AVGO, ORCL (already done), APP, ANET, ALAB, CRDO, SOFI, MELI, SPOT, CAVA, SMCI, MRVL, KLAC, CIEN
3. **If you want methodology hardening**: Build a `services/burryCalculator.ts` function that takes raw TIKR inputs and computes overstatementPct. Make `burry` schema accept either `overstatementPct` (override) OR `raw: BurryRawInputs` (auto-compute). Add unit tests against the 8 Burry-published anchors.
4. **If a new Burry chart drops**: Update the published values for anchored stocks. Re-calibrate the formula constants if needed.
5. **Yearly refresh cadence**: As companies report new fiscal years, refresh the `burry` block + the standardized closing sentence in `strategicNarrative` if numbers shift materially.

## Files most relevant for resuming work

- `CLAUDE.md` — schema reference, tier thresholds, refresh procedure
- `BURRY_FRAMEWORK.md` (this file) — calibration history + project context
- `components/BurryIndicator.tsx` — main UI component
- `components/BurryBadge.tsx` — home-row badge
- `stocks/CRWD.ts`, `LRCX.ts`, `AMD.ts`, `NVDA.ts`, `NFLX.ts`, `INTU.ts`, `META.ts`, `AMZN.ts`, `ORCL.ts` — TIKR-precise reference cases

## Conversation thread reference

Conversation built through ~30+ commits on `claude/stock-valuation-checker-LuPEm`. Key turning points:
1. User shared Burry's "Cassandra Unchained" Ukrainian-language slides showing a chart of 8 companies with overstatement %s
2. We built the BurryIndicator panel with overstatementPct + source labeling
3. Initially populated 64 stocks with hand-tuned estimates calibrated to the 8 chart values
4. User pulled TIKR data for 9 stocks; we discovered the formula has clear validity zones (high-MTM works, low-MTM unreliable)
5. Concluded that simple 4y-MTM formula reliably reproduces Burry within ±10pp ONLY when stock has appreciated >4× over 4 years
6. Documented this in CLAUDE.md + this file for future maintainability
