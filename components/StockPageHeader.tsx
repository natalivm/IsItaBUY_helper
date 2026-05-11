import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { TickerDefinition, ProjectionData } from '../types';
import { cn, rsRatingStyle } from '../utils';
import { usd } from '../services/stockMetrics';

interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
  children?: React.ReactNode;
}

const StockPageHeader: React.FC<Props> = ({
  tickerDef,
  currentProjection,
  activeStockData,
  onBack,
  children,
}) => {
  const tc = tickerDef.themeColor;

  return (
    <>
      <motion.button
        whileHover={{ x: -5 }}
        onClick={onBack}
        className="mb-12 flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700"
        style={{ color: tc }}
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Universe
      </motion.button>

      <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tc }}>
        <div className="text-xs font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
          <span className="w-12 h-[2px] bg-amber-500/50" />
          {tickerDef.name.toUpperCase()} {tickerDef.modelType.replace('_', ' ')}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-end gap-4 flex-wrap">
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
              {tickerDef.ticker}
            </h1>
            <span className={cn(
              "text-base font-black border rounded px-2 py-1 mb-1 flex-shrink-0",
              rsRatingStyle(tickerDef.rsRating)
            )}>RS {tickerDef.rsRating}</span>
            {tickerDef.lastReportTag && (
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 border border-emerald-600/50 bg-emerald-950/50 rounded-full px-3 py-1 mb-1 flex-shrink-0">
                {tickerDef.lastReportTag} ✓
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'SPOT', value: usd(tickerDef.currentPrice), icon: <TrendingUp className="w-4 h-4 text-amber-500" />, valueClass: 'text-white', subValue: tickerDef.updatedOn ? `upd ${tickerDef.updatedOn}` : undefined },
              { label: 'RATING', value: activeStockData?.label || 'HOLD', icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, valueClass: activeStockData?.color || 'text-blue-400', subValue: undefined },
              { label: 'FAIR VALUE', value: usd(currentProjection.pricePerShare), icon: <Zap className="w-4 h-4 text-amber-500" />, valueClass: 'text-white', subValue: undefined },
            ].map((m, i) => (
              <div
                key={i}
                className="px-5 py-3 bg-surface-card rounded-xl flex items-center gap-3 border"
                style={{ borderColor: `${tc}40` }}
              >
                {m.icon}
                <div className="flex flex-col">
                  <span className="text-amber-500 font-black text-xs uppercase tracking-widest leading-none mb-1">{m.label}</span>
                  <span className={cn("text-lg font-bold leading-none", m.valueClass)}>{m.value}</span>
                  {m.subValue && <span className="text-slate-500 text-[10px] font-medium mt-0.5 leading-none">{m.subValue}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {children}
      </header>
    </>
  );
};

export default StockPageHeader;
