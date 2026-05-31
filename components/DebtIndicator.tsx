import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { TickerDefinition } from '../types';
import { cn } from '../utils';
import { analyzeDebt, DebtTierKey } from '../services/debtTier';

interface Props {
  tickerDef: TickerDefinition;
}

const TIER_ICON: Record<DebtTierKey, React.ComponentType<{ className?: string }>> = {
  GREEN: ShieldCheck,
  YELLOW: ShieldAlert,
  RED: AlertTriangle,
};

const fmt$M = (v: number) => {
  const abs = Math.abs(v);
  if (abs >= 1000) return `${v < 0 ? '-' : ''}$${(abs / 1000).toFixed(2)}B`;
  return `${v < 0 ? '-' : ''}$${abs.toFixed(0)}M`;
};

const STEP_LABELS: Record<number, string> = {
  1: 'Stopped at Step 1 — Net Cash',
  2: 'Stopped at Step 2 — Low Leverage',
  3: 'Reached Step 3 — Deep Analysis',
};

const DebtIndicator: React.FC<Props> = ({ tickerDef }) => {
  const d = tickerDef.debtSafety;
  if (!d) return null;

  const analysis = analyzeDebt(d);
  const { tier, step, leverageRatio, conditions, missingData } = analysis;
  const Icon = TIER_ICON[tier.key];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
      className={cn(
        'p-6 rounded-2xl border bg-surface-card/80 shadow-2xl relative overflow-hidden',
        tier.border
      )}
    >
      <div className={cn('absolute top-0 left-0 right-0 h-[2px]', tier.bgStrong)} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-black text-sky-400 uppercase tracking-[0.4em] flex items-center gap-2 mb-2">
            <ShieldCheck className="w-3 h-3" />
            Debt Safety Check
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            3-step leverage framework: Net Cash → Low Leverage → Deep Analysis (CapEx/OCF, Interest Coverage,
            Altman Z-Score). Display-only — does not feed the valuation model.
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border ring-1 shrink-0',
            tier.bg,
            tier.border,
            tier.ring
          )}
        >
          <Icon className={cn('w-4 h-4', tier.color)} />
          <span className={cn('text-sm font-black tracking-wider', tier.color)}>{tier.label}</span>
        </div>
      </div>

      {/* Step summary + top-level metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Net Debt
          </span>
          <span className={cn(
            'text-3xl font-black leading-none',
            d.netDebt <= 0 ? 'text-emerald-400' : 'text-white'
          )}>
            {d.netDebt <= 0 ? fmt$M(d.netDebt) : fmt$M(d.netDebt)}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {d.netDebt <= 0 ? 'net cash position' : 'debt exceeds cash'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Net Debt / EBITDA
          </span>
          <span className={cn(
            'text-3xl font-black leading-none',
            leverageRatio === null ? 'text-slate-500' :
            leverageRatio <= 0 ? 'text-emerald-400' :
            leverageRatio <= 2 ? 'text-emerald-400' :
            leverageRatio <= 4 ? 'text-yellow-300' : 'text-rose-400'
          )}>
            {leverageRatio === null ? 'N/A' : leverageRatio <= 0 ? `${leverageRatio.toFixed(2)}×` : `${leverageRatio.toFixed(2)}×`}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {fmt$M(d.ebitda)} EBITDA · threshold 2.0×
          </span>
        </div>

        <div className="flex flex-col col-span-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Analysis Depth
          </span>
          <span className="text-lg font-black leading-none text-white mt-1">
            {STEP_LABELS[step]}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {step < 3 ? 'No further analysis required' : missingData ? 'Some data missing — assumed best case' : 'All 3 conditions evaluated'}
          </span>
        </div>
      </div>

      {/* Step 3 condition table */}
      {step === 3 && conditions.length > 0 && (
        <div className="mb-6 p-4 rounded-lg border border-slate-800 bg-slate-900/40">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">
            Step 3 Conditions
          </div>
          <div className="space-y-3">
            {conditions.map((c) => {
              const PassIcon = c.passes === null ? HelpCircle : c.passes ? CheckCircle2 : XCircle;
              const iconColor = c.passes === null ? 'text-slate-500' : c.passes ? 'text-emerald-400' : 'text-rose-400';
              return (
                <div key={c.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <PassIcon className={cn('w-4 h-4 shrink-0', iconColor)} />
                    <span className="text-sm text-slate-300">{c.label}</span>
                  </div>
                  <span className={cn(
                    'text-sm font-black tabular-nums',
                    c.passes === null ? 'text-slate-500' : c.passes ? 'text-emerald-400' : 'text-rose-400'
                  )}>
                    {c.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verdict blurb */}
      <div className={cn('p-4 rounded-lg border', tier.bg, tier.border)}>
        <p className={cn('text-sm font-bold leading-relaxed', tier.color)}>{tier.blurb}</p>
        {d.note && (
          <p className="text-sm text-slate-300 leading-relaxed mt-2 italic">{d.note}</p>
        )}
        {d.fy && (
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-3">
            Source period: {d.fy}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default DebtIndicator;
