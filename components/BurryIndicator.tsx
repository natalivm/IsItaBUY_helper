import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, ShieldAlert, Skull } from 'lucide-react';
import { TickerDefinition } from '../types';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  /** Probability-weighted blended target from the main model (used to compute Burry-adjusted target). */
  pwTarget?: number;
  /** 5-year probability-weighted CAGR % from the main model (used to derive Burry-adjusted CAGR). */
  pwCagr?: number;
}

interface Tier {
  label: string;
  color: string;
  bg: string;
  border: string;
  ring: string;
  Icon: React.ComponentType<{ className?: string }>;
  blurb: string;
}

const PRISTINE: Tier = {
  label: 'PRISTINE',
  color: 'text-emerald-300',
  bg: 'bg-emerald-500/10',
  border: 'border-emerald-500/30',
  ring: 'ring-emerald-500/40',
  Icon: ShieldCheck,
  blurb: 'SBC is a small share of GAAP profit and buybacks more than offset dilution. Burry-approved.',
};
const OK: Tier = {
  label: 'OK',
  color: 'text-lime-300',
  bg: 'bg-lime-500/10',
  border: 'border-lime-500/30',
  ring: 'ring-lime-500/40',
  Icon: ShieldCheck,
  blurb: 'Coefficient above the 0.70 threshold. SBC dilution exists but stays within manageable bounds.',
};
const WARNING: Tier = {
  label: 'WARNING',
  color: 'text-amber-300',
  bg: 'bg-amber-500/10',
  border: 'border-amber-500/40',
  ring: 'ring-amber-500/40',
  Icon: ShieldAlert,
  blurb: 'Coefficient below 0.70 — Burry flags this as a "real-earnings haircut" zone. Apply discount to multiples.',
};
const TRAGIC: Tier = {
  label: 'TRAGIC',
  color: 'text-rose-300',
  bg: 'bg-rose-500/10',
  border: 'border-rose-500/40',
  ring: 'ring-rose-500/50',
  Icon: Skull,
  blurb: 'SBC equals or exceeds GAAP profit. Real economic earnings are zero or negative regardless of non-GAAP optics.',
};

function pickTier(coef: number, niPositive: boolean): Tier {
  if (!niPositive) return TRAGIC;
  if (coef <= 0) return TRAGIC;
  if (coef < 0.70) return WARNING;
  if (coef < 0.85) return OK;
  return PRISTINE;
}

const fmt$M = (v: number) => {
  const abs = Math.abs(v);
  if (abs >= 1000) return `${v < 0 ? '-' : ''}$${(abs / 1000).toFixed(2)}B`;
  return `${v < 0 ? '-' : ''}$${abs.toFixed(0)}M`;
};

const BurryIndicator: React.FC<Props> = ({ tickerDef, pwTarget, pwCagr }) => {
  const b = tickerDef.burry;
  if (!b) return null;

  const niPositive = b.gaapNi > 0;
  const usePublished = b.overstatementPct != null;
  // When Burry has published an overstatement %, prefer it (covers payroll
  // tax + mark-to-market dilution beyond the GAAP SBC line).
  const coef = usePublished
    ? 1 - (b.overstatementPct as number) / 100
    : niPositive ? 1 - b.sbc / b.gaapNi : -1;
  const sbcPctNi = usePublished
    ? (b.overstatementPct as number)
    : niPositive ? (b.sbc / b.gaapNi) * 100 : Infinity;
  const buybackVsSbc = b.buyback != null && b.sbc > 0 ? b.buyback / b.sbc : null;
  const tier = pickTier(coef, usePublished ? true : niPositive);
  const Icon = tier.Icon;

  // P/E haircut effect: only meaningful if model uses non-GAAP EPS and we have a positive coefficient
  const haircutApplies = b.epsBasis === 'NON_GAAP' && coef > 0;
  const reportedPe = tickerDef.baseEps && tickerDef.baseEps > 0
    ? tickerDef.currentPrice / tickerDef.baseEps
    : null;
  const adjustedPe = haircutApplies && reportedPe ? reportedPe / coef : null;

  // Burry-adjusted target: scale model PW target by the coefficient.
  // Only meaningful when we actually have a positive coefficient and a model target.
  const showAdjustedTarget = pwTarget != null && coef > 0 && coef < 1;
  const adjustedTarget = showAdjustedTarget ? pwTarget * coef : null;
  const targetDeltaPct = showAdjustedTarget && adjustedTarget != null
    ? ((adjustedTarget - pwTarget) / pwTarget) * 100
    : null;
  // Adjusted CAGR: if 5y target shrinks by factor `coef`, the CAGR shifts by
  // (coef^(1/5) - 1) on top of (1 + pwCagr). Only show if we have pwCagr.
  const adjustedCagr = showAdjustedTarget && pwCagr != null
    ? ((1 + pwCagr / 100) * Math.pow(coef, 1 / 5) - 1) * 100
    : null;
  const adjustedTargetVsSpot = adjustedTarget != null
    ? ((adjustedTarget - tickerDef.currentPrice) / tickerDef.currentPrice) * 100
    : null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={cn(
        'p-6 rounded-2xl border bg-surface-card/80 shadow-2xl relative overflow-hidden',
        tier.border
      )}
    >
      <div className={cn('absolute top-0 left-0 right-0 h-[2px]', tier.bg.replace('/10', '/60'))} />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-black text-amber-500 uppercase tracking-[0.4em] flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3 h-3" />
            Burry SBC Indicator
            {usePublished && (
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300/80 normal-case ml-2">
                · {b.overstatementSource === 'estimated' ? 'estimated full-SBC adjustment' : 'Burry published value'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            {usePublished
              ? (b.overstatementSource === 'estimated'
                  ? 'Estimated using Burry\'s full-SBC-adjustment methodology — naive SBC/NI scaled by mark-to-market amplifier, payroll-tax adder, and buyback offset. Calibrated against Burry\'s published values for LRCX/NVDA/NFLX. Display-only.'
                  : "Burry's full-SBC-adjustment methodology — includes payroll tax and mark-to-market dilution cost beyond the GAAP SBC line. Display-only.")
              : 'Michael Burry\'s "Cassandra Unchained" check: how much of GAAP profit is consumed by stock-based compensation, and whether buybacks offset the resulting dilution. Display-only — does not feed the model.'}
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border ring-1',
            tier.bg,
            tier.border,
            tier.ring
          )}
        >
          <Icon className={cn('w-4 h-4', tier.color)} />
          <span className={cn('text-sm font-black tracking-wider', tier.color)}>{tier.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Burry Coefficient
          </span>
          <span className={cn('text-3xl font-black leading-none', tier.color)}>
            {usePublished || niPositive ? coef.toFixed(2) : 'N/A'}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {usePublished ? 'real / GAAP profit · target ≥ 0.70' : '1 − SBC/NI · target ≥ 0.70'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {usePublished ? 'Profit Overstatement' : 'SBC / GAAP NI'}
          </span>
          <span className="text-3xl font-black leading-none text-white">
            {usePublished || niPositive ? `${sbcPctNi.toFixed(0)}%` : '∞'}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {fmt$M(b.sbc)} SBC · {niPositive ? fmt$M(b.gaapNi) : fmt$M(b.gaapNi)} NI
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Buyback vs SBC
          </span>
          {buybackVsSbc != null ? (
            <>
              <span
                className={cn(
                  'text-3xl font-black leading-none',
                  buybackVsSbc >= 1 ? 'text-emerald-300' : 'text-amber-300'
                )}
              >
                {buybackVsSbc.toFixed(2)}×
              </span>
              <span className="text-xs text-slate-500 mt-1">
                {buybackVsSbc >= 1 ? 'buyback offsets dilution' : 'shortfall — net dilution'}
              </span>
            </>
          ) : (
            <>
              <span className="text-3xl font-black leading-none text-rose-300">0×</span>
              <span className="text-xs text-slate-500 mt-1">no offset to dilution</span>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Multiple Haircut
          </span>
          {haircutApplies && reportedPe && adjustedPe ? (
            <>
              <span className="text-3xl font-black leading-none text-white">
                {reportedPe.toFixed(0)}× <span className="text-slate-500">→</span>{' '}
                <span className={tier.color}>{adjustedPe.toFixed(0)}×</span>
              </span>
              <span className="text-xs text-slate-500 mt-1">
                non-GAAP P/E adjusted by 1/coef
              </span>
            </>
          ) : niPositive && b.epsBasis === 'GAAP' ? (
            <>
              <span className="text-3xl font-black leading-none text-emerald-300">none</span>
              <span className="text-xs text-slate-500 mt-1">model already on GAAP basis</span>
            </>
          ) : (
            <>
              <span className="text-3xl font-black leading-none text-rose-300">N/A</span>
              <span className="text-xs text-slate-500 mt-1">no positive earnings to discount</span>
            </>
          )}
        </div>
      </div>

      {showAdjustedTarget && adjustedTarget != null && targetDeltaPct != null && (
        <div className="mb-6 p-4 rounded-lg border border-slate-800 bg-slate-900/40">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">
            Burry-Adjusted Valuation
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Model PW Target
              </span>
              <span className="text-2xl font-black leading-none text-white">
                ${pwTarget!.toFixed(0)}
              </span>
              <span className="text-xs text-slate-500 mt-1">unadjusted blended value</span>
            </div>

            <div className="text-2xl text-slate-600 hidden sm:block">→</div>

            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Burry-Adjusted Target
              </span>
              <span className={cn('text-3xl font-black leading-none', tier.color)}>
                ${adjustedTarget.toFixed(0)}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                target × ({coef.toFixed(2)}) ·{' '}
                <span className={adjustedTargetVsSpot != null && adjustedTargetVsSpot >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {adjustedTargetVsSpot != null && adjustedTargetVsSpot >= 0 ? '+' : ''}
                  {adjustedTargetVsSpot?.toFixed(1)}% vs spot
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Haircut
              </span>
              <span className="text-2xl font-black leading-none text-amber-300">
                {targetDeltaPct.toFixed(1)}%
              </span>
              <span className="text-xs text-slate-500 mt-1">vs unadjusted</span>
            </div>

            {adjustedCagr != null && pwCagr != null && (
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Adjusted 5Y CAGR
                </span>
                <span
                  className={cn(
                    'text-2xl font-black leading-none',
                    adjustedCagr >= 0 ? 'text-emerald-300' : 'text-rose-300'
                  )}
                >
                  {adjustedCagr >= 0 ? '+' : ''}
                  {adjustedCagr.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  vs {pwCagr.toFixed(1)}% model
                </span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Applies Burry's overstatement % directly to the model's probability-weighted target.
            Side-by-side comparison only — does not change the model verdict above.
          </p>
        </div>
      )}

      <div className={cn('p-4 rounded-lg border', tier.bg, tier.border)}>
        <p className={cn('text-sm font-bold leading-relaxed', tier.color)}>{tier.blurb}</p>
        {b.note && (
          <p className="text-sm text-slate-300 leading-relaxed mt-2 italic">{b.note}</p>
        )}
        {b.fy && (
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-3">
            Source period: {b.fy}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BurryIndicator;
