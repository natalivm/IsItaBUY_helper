import { ProjectionData, ScenarioType } from '../types';
import { usd, pctFmt } from './stockMetrics';

/**
 * Live-value templating for analyst narratives.
 *
 * Narratives (strategicNarrative, scenario desc/thesis) are hand-written prose,
 * but any number that is *relative to the live spot price* — targets, "% from
 * current", annualized CAGR — drifts the moment prices update. To prevent the
 * text from contradicting the computed cards (e.g. a narrative quoting an old
 * $114.68 spot while the header shows $99.17), authors use `{token}` placeholders
 * that bind to the same projections the cards render from.
 *
 * Unknown tokens are left untouched, so plain prose passes through unchanged and
 * existing narratives keep working.
 */
export type NarrativeTokens = Record<string, string>;

const signedPct = (ratio: number) => (ratio >= 0 ? '+' : '') + (ratio * 100).toFixed(1) + '%';

export function applyNarrativeTokens(text: string, tokens: NarrativeTokens): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in tokens ? tokens[key] : match));
}

/**
 * Tokens scoped to a single scenario — for that scenario's own desc/thesis,
 * where `{target}`, `{return}` and `{cagr}` refer to this path specifically.
 */
export function scenarioNarrativeTokens(spot: number, proj: ProjectionData): NarrativeTokens {
  return {
    spot: usd(spot),
    target: usd(proj.pricePerShare),
    return: signedPct(proj.pricePerShare / spot - 1),
    cagr: pctFmt(proj.cagrs[4] / 100),
  };
}
