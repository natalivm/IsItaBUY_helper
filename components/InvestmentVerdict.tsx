import React from 'react';
import { motion } from 'motion/react';
import { TickerDefinition, ProjectionData, ScenarioType, AnalystRating } from '../types';
import { StockMetrics, usd, pctFmt } from '../services/stockMetrics';
import { getInstitutionalRating } from '../services/projectionService';
import { RATING_DEFS, RatingKey } from '../constants';
import { cn } from '../utils';
import { Lightbulb, AlertTriangle } from 'lucide-react';

interface Props {
  tickerDef: TickerDefinition;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  metrics: StockMetrics;
  narrativeOverride?: string;
  extraMetrics?: { label: string; value: React.ReactNode; subtext: string }[];
}

const InvestmentVerdict: React.FC<Props> = ({
  tickerDef,
  allProjections,
  investmentConclusion,
  activeStockData,
  metrics,
  narrativeOverride,
  extraMetrics,
}) => {
  const tc = tickerDef.themeColor;
  const { momentumUpside, timeToTarget, probAcceleration } = metrics;
  const rs = tickerDef.rsRating;

  // RS tiers: very low (<15), low (15-39), neutral (40-79), strong (80-90), overextended (>90)
  const rsVeryLow = rs < 15;
  const rsLow = rs >= 15 && rs < 40;
  const rsStrong = rs >= 80 && rs <= 90;
  const rsOverextended = rs > 90;

  const buildNarrative = () => {
    const ticker = tickerDef.ticker;
    const baseTarget = usd(allProjections.base.pricePerShare);
    const pwBlended = usd(investmentConclusion.pwAvg);
    const spot = usd(tickerDef.currentPrice);
    const cagr = pctFmt(investmentConclusion.cagr / 100);
    const upside = momentumUpside.toFixed(1);

    if (activeStockData?.label === 'STRONG BUY') {
      if (rsVeryLow) {
        return `Our model assigns ${ticker} a STRONG BUY on fundamentals — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} is compelling on paper. However, RS ${rs} reflects severe institutional distribution and a broken technical structure. At this level, even fundamentally sound names can take quarters to base and repair. Do not rush to build a full position — wait for RS to recover above 30 and a visible base pattern to form before committing meaningful capital. A small starter position (10–15% of intended size) is acceptable for conviction holders, with the remainder reserved for confirmation of trend reversal.`;
      }
      if (rsLow) {
        return `Our model assigns ${ticker} a STRONG BUY on fundamentals — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} supports compelling long-term risk/reward. However, RS ${rs} signals a sustained downtrend and weak institutional momentum. This fundamental/technical divergence suggests phased accumulation rather than a full position: consider building in 3–4 tranches, scaling in as RS recovers above 40–50 to confirm institutional re-engagement. The ${cagr} probability-weighted CAGR rewards patience, but catching a falling knife at full size is unnecessary when you can let price action confirm the thesis.`;
      }
      if (rsOverextended) {
        return `Our model assigns ${ticker} a STRONG BUY on fundamentals — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} supports the thesis. That said, RS ${rs} indicates the stock is in the top decile of momentum — historically a zone where mean reversion risk is elevated. Consider waiting for a 10–15% pullback or consolidation before establishing new positions, or use limit orders below current levels. Existing holders should maintain positions but avoid chasing the extended move. The ${cagr} CAGR is attractive, but entry price discipline matters when momentum is stretched.`;
      }
      if (rsStrong) {
        return `Our model assigns ${ticker} a STRONG BUY rating. The base-case target of ${baseTarget} implies ${upside}% upside from spot, and the probability-weighted blended value of ${pwBlended} supports a compelling risk/reward. RS ${rs} confirms strong institutional accumulation — momentum and fundamentals are aligned. With a ${cagr} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup favors buyers at current levels.`;
      }
      return `Our model assigns ${ticker} a STRONG BUY rating. The base-case target of ${baseTarget} implies ${upside}% upside from spot, and the probability-weighted blended value of ${pwBlended} supports a compelling risk/reward. With a ${cagr} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup favors buyers at current levels.`;
    }

    if (activeStockData?.label === 'BUY') {
      if (rsVeryLow) {
        return `Our model assigns ${ticker} a BUY rating — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} supports a favorable risk/reward profile. However, RS ${rs} reflects severe institutional distribution. The fundamental case is solid, but the technical structure needs repair. Consider a small starter position (15–20% of intended size) and scale in as RS recovers above 30–40. Patience here will be rewarded — let the base form before committing full capital.`;
      }
      if (rsLow) {
        return `Our model assigns ${ticker} a BUY rating — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} presents attractive long-term risk/reward. RS ${rs} signals weak momentum, suggesting a phased entry strategy: build the position in 2–3 tranches as RS recovers above 40–50. The ${cagr} probability-weighted CAGR is compelling, but scaling in with technical confirmation reduces drawdown risk.`;
      }
      if (rsOverextended) {
        return `Our model assigns ${ticker} a BUY rating — the base-case target of ${baseTarget} implies ${upside}% upside, and the probability-weighted value of ${pwBlended} supports the thesis. However, RS ${rs} is in overextended territory where pullbacks are common. Consider waiting for a 5–10% pullback or consolidation to establish new positions at better risk/reward. Existing holders should maintain, but avoid adding at the current stretched level. The ${cagr} CAGR is attractive at a better entry.`;
      }
      if (rsStrong) {
        return `Our model assigns ${ticker} a BUY rating. The base-case target of ${baseTarget} implies ${upside}% upside from spot, and the probability-weighted blended value of ${pwBlended} supports favorable risk/reward. RS ${rs} confirms strong institutional accumulation — momentum aligns with fundamentals. With a ${cagr} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup supports building a position at current levels.`;
      }
      return `Our model assigns ${ticker} a BUY rating. The base-case target of ${baseTarget} implies ${upside}% upside from spot, and the probability-weighted blended value of ${pwBlended} supports favorable risk/reward. With a ${cagr} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the fundamentals support building a position.`;
    }

    if (activeStockData?.label === 'OVERVALUED') {
      if (rsOverextended) {
        return `Our model flags ${ticker} as OVERVALUED. The base-case target of ${baseTarget} shows limited upside from ${spot}, and RS ${rs} signals the stock is overextended in the top decile of momentum. This combination of stretched valuation and stretched technicals creates elevated downside risk — a pullback from these levels is likely. Consider waiting for a meaningful pullback before initiating or adding to positions.`;
      }
      return `Our model flags ${ticker} as OVERVALUED. The base-case target of ${baseTarget} shows limited upside from the current spot of ${spot}, and the probability-weighted blended value of ${pwBlended} does not justify entry risk at this price. Risk/reward is unfavorable — consider waiting for a better entry or allocating capital elsewhere.`;
    }

    // HOLD cases
    if (rsVeryLow) {
      return `Our model rates ${ticker} as a HOLD. The base-case target of ${baseTarget} offers moderate upside from ${spot}, but RS ${rs} signals severe technical damage — the stock is in deep distribution with no visible floor. The probability-weighted value of ${pwBlended} suggests long-term potential, but do not add to positions until RS recovers above 30 and a base pattern forms. Existing holders should assess conviction: if the thesis is intact, hold with a tight mental stop; otherwise, use rallies to reduce exposure.`;
    }
    if (rsLow) {
      return `Our model rates ${ticker} as a HOLD. The base-case target of ${baseTarget} offers moderate upside from ${spot}, but RS ${rs} indicates technical weakness that may delay convergence to fair value. The probability-weighted value of ${pwBlended} suggests reasonable long-term potential, but momentum headwinds warrant caution. Wait for RS to stabilize above 40 before adding, or use weakness to dollar-cost-average into a starter position.`;
    }
    if (rsOverextended) {
      return `Our model rates ${ticker} as a HOLD at fair value, but RS ${rs} indicates the stock is overextended — trading in the top decile of momentum where mean reversion is common. New entries at this level carry poor risk/reward: limited fundamental upside combined with elevated pullback probability. Wait for a 10–15% correction to improve the entry, or set limit orders below spot. Existing holders may hold but should avoid adding at current levels.`;
    }

    return `Our model rates ${ticker} as a HOLD. The base-case target of ${baseTarget} offers moderate upside from ${spot}, and the probability-weighted blended value of ${pwBlended} suggests fair valuation. Existing holders may stay the course, while new entrants should wait for a more attractive entry point or a catalyst to shift the risk/reward in their favor.`;
  };

  const defaultNarrative = buildNarrative();

  const defaultMetrics = [
    {
      label: 'PW Blended Target',
      value: <span className="text-2xl font-black" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>,
      subtext: `vs ${usd(tickerDef.currentPrice)} spot`,
    },
    {
      label: '5Y CAGR',
      value: <span className="text-2xl font-black text-white">{pctFmt(investmentConclusion.cagr / 100)}</span>,
      subtext: 'probability-weighted',
    },
    {
      label: 'Upside to Base',
      value: (
        <span className={cn("text-2xl font-black", momentumUpside >= 0 ? 'text-green-400' : 'text-red-400')}>
          {momentumUpside >= 0 ? '+' : ''}{momentumUpside.toFixed(1)}%
        </span>
      ),
      subtext: `~${Math.max(0.5, timeToTarget).toFixed(1)}Y to target`,
    },
    {
      label: 'Acceleration Odds',
      value: <span className="text-2xl font-black" style={{ color: tc }}>{probAcceleration}%</span>,
      subtext: 'composite score',
    },
  ];

  const metricsToShow = extraMetrics || defaultMetrics;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-16 p-8 rounded-2xl border border-slate-800 bg-surface-card/80 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />

      <div className="text-xs font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-amber-500/50" />
        Investment Verdict
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Is it a Buy?</span>
          {(() => {
            const ourLabel = activeStockData?.label || 'HOLD';
            const rd = RATING_DEFS[ourLabel as RatingKey] || RATING_DEFS['HOLD'];
            const v = { text: rd.verdictText, color: rd.color, subtextColor: rd.subtextColor };
            const quantRating = tickerDef.ratingOverride
              ? getInstitutionalRating(allProjections.base.pricePerShare, tickerDef.currentPrice)
              : null;
            const modelDiffers = quantRating && quantRating.label !== ourLabel;
            return (
              <>
                <div className={cn("text-6xl lg:text-7xl font-black tracking-tighter leading-none", v.color)}>
                  {v.text}
                </div>
                {/* Only show sub-label when it adds info (YES→BUY, NO→OVERVALUED); skip when same as big text (HOLD→HOLD) */}
                {v.text !== ourLabel && (
                  <div className={cn("text-xs font-black uppercase tracking-widest mt-1", v.subtextColor)}>
                    {ourLabel}
                  </div>
                )}
                {/* Only show model rating when it disagrees with our assessment */}
                {modelDiffers && (
                  <div className="text-xs font-medium text-slate-400 mt-1">
                    Model: <span className={quantRating.color}>{quantRating.label}</span>
                  </div>
                )}
              </>
            );
          })()}
        </div>

        <div className="w-px h-20 bg-slate-800 hidden lg:block" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          {metricsToShow.map((m, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
              {m.value}
              <span className="text-xs text-slate-400">{m.subtext}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800/80">
        <p className="text-base text-slate-200 leading-relaxed">
          {narrativeOverride || defaultNarrative}
        </p>
      </div>

      {(() => {
        const b = tickerDef.burry;
        if (!b || b.overstatementPct == null || b.overstatementPct < 30) return null;
        const coef = 1 - b.overstatementPct / 100;
        if (coef <= 0 || coef >= 1) return null;
        const adjustedPw = investmentConclusion.pwAvg * coef;
        // 5y target shrinks by coef → new CAGR = (1 + pwCagr) × coef^(1/5) − 1
        const adjustedCagr = ((1 + investmentConclusion.cagr / 100) * Math.pow(coef, 1 / 5) - 1) * 100;
        const haircut = b.overstatementPct;
        const tierColor = b.overstatementPct >= 70
          ? 'text-rose-300'
          : b.overstatementPct >= 30
            ? 'text-amber-300'
            : 'text-lime-300';
        const tierBg = b.overstatementPct >= 70
          ? 'bg-rose-500/10 border-rose-500/40'
          : 'bg-amber-500/10 border-amber-500/40';
        const sourceLabel = b.overstatementSource === 'burry-published'
          ? 'Burry-published'
          : 'estimated full-SBC adjustment';
        return (
          <div className={cn('mt-6 pt-6 border-t border-slate-800/80')}>
            <div className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Burry-Adjusted Read</span>
            </div>
            <div className={cn('p-4 rounded-lg border', tierBg)}>
              <p className="text-sm text-slate-200 leading-relaxed">
                Applying the {sourceLabel} overstatement of{' '}
                <span className={cn('font-black', tierColor)}>{haircut}%</span>{' '}
                to the model's PW target trims it from{' '}
                <span className="font-black text-white">{usd(investmentConclusion.pwAvg)}</span> to{' '}
                <span className={cn('font-black', tierColor)}>{usd(adjustedPw)}</span>{' '}
                and the 5Y CAGR from{' '}
                <span className="font-black text-white">{pctFmt(investmentConclusion.cagr / 100)}</span> to{' '}
                <span className={cn('font-black', tierColor)}>{pctFmt(adjustedCagr / 100)}</span>.{' '}
                The model verdict above is unchanged — this is a parallel read, not a model override.
              </p>
            </div>
          </div>
        );
      })()}

      {tickerDef.keyTakeaways && tickerDef.keyTakeaways.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            <span>What This Means For You</span>
          </div>
          <ul className="space-y-3">
            {tickerDef.keyTakeaways.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tc }} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tickerDef.analystConsensus && (() => {
        const ac = tickerDef.analystConsensus;
        const ourLabel = activeStockData?.label || 'HOLD';

        const analystColor: Record<AnalystRating, string> = {
          'Strong Buy': 'text-green-400',
          'Buy': 'text-emerald-400',
          'Hold': 'text-blue-400',
          'Sell': 'text-orange-400',
          'Strong Sell': 'text-red-400',
        };

        const analystBg: Record<AnalystRating, string> = {
          'Strong Buy': 'bg-green-400/10 border-green-400/30',
          'Buy': 'bg-emerald-400/10 border-emerald-400/30',
          'Hold': 'bg-blue-400/10 border-blue-400/30',
          'Sell': 'bg-orange-400/10 border-orange-400/30',
          'Strong Sell': 'bg-red-400/10 border-red-400/30',
        };

        // Map both systems to a 1-5 scale for agreement comparison
        const ourScale: Record<string, number> = { 'STRONG BUY': 5, 'BUY': 4, 'HOLD': 3, 'OVERVALUED': 1 };
        const analystScale: Record<AnalystRating, number> = {
          'Strong Buy': 5, 'Buy': 4, 'Hold': 3, 'Sell': 2, 'Strong Sell': 1,
        };
        const diff = Math.abs((ourScale[ourLabel] || 3) - analystScale[ac.rating]);
        const agreement = diff === 0 ? 'Aligned' : diff === 1 ? 'Close' : 'Divergent';
        const agreementColor = diff === 0 ? 'text-green-400' : diff === 1 ? 'text-yellow-400' : 'text-red-400';

        const spotMedianUpside = ((ac.targetMedian - tickerDef.currentPrice) / tickerDef.currentPrice * 100).toFixed(1);

        return (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-slate-600" />
              Wall Street Consensus
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Analyst rating badge */}
              <div className={cn("px-4 py-2 rounded-lg border text-sm font-black", analystBg[ac.rating])}>
                <span className={analystColor[ac.rating]}>{ac.rating}</span>
                <span className="text-slate-500 font-medium ml-2">({ac.numAnalysts} analysts)</span>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-slate-800 hidden sm:block" />

              {/* Target range */}
              <div className="flex gap-5 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Low</span>
                  <span className="text-slate-400 font-semibold">{usd(ac.targetLow)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Median</span>
                  <span className="text-white font-black">{usd(ac.targetMedian)}</span>
                  <span className="text-[10px] text-slate-500">{Number(spotMedianUpside) >= 0 ? '+' : ''}{spotMedianUpside}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">High</span>
                  <span className="text-slate-400 font-semibold">{usd(ac.targetHigh)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-slate-800 hidden sm:block" />

              {/* Agreement indicator */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">vs Our Model</span>
                <span className={cn("text-sm font-black", agreementColor)}>{agreement}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
};

export default InvestmentVerdict;
