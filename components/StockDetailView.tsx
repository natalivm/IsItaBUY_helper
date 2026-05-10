
import React, { useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Info, LayoutDashboard } from 'lucide-react';
import { TickerDefinition, ProjectionData, ScenarioType } from '../types';
import { computeStockMetrics, usd, pctFmt } from '../services/stockMetrics';
import { AI_IMPACT_BADGE } from '../constants';
import ScenarioMetricsCard from './ScenarioMetricsCard';
import StockPageHeader from './StockPageHeader';
import StockMetricCards from './StockMetricCards';
import InvestmentVerdict from './InvestmentVerdict';
import BurryIndicator from './BurryIndicator';
import { cn, rsRatingColor } from '../utils';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
  onNext?: () => void;
}

const StockDetailView: React.FC<Props> = ({
  tickerDef,
  currentProjection,
  allProjections,
  investmentConclusion,
  activeStockData,
  onBack,
  onNext
}) => {
  const tc = tickerDef.themeColor;
  const containerRef = useRef<HTMLDivElement>(null);
  useSwipeNavigation(containerRef, { onSwipeLeft: onBack, onSwipeRight: onNext });

  const metrics = useMemo(
    () => computeStockMetrics(tickerDef, currentProjection, allProjections),
    [tickerDef, currentProjection, allProjections]
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-surface-deep text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle at 85% 10%, ${tc} 0%, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at 10% 90%, ${tc} 0%, transparent 70%)` }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${tc}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        <StockPageHeader
          tickerDef={tickerDef}
          currentProjection={currentProjection}
          activeStockData={activeStockData}
          onBack={onBack}
        />

        <StockMetricCards metrics={metrics} themeColor={tc} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">

            {/* Main analysis card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-surface-card/80 shadow-2xl relative overflow-hidden group"
              style={{ borderLeftWidth: '3px', borderLeftColor: tc }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tc}12 0%, transparent 60%)` }}
              />

              <div className="flex flex-col gap-8 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Entry CAGR</span>
                    <span className="text-3xl font-black text-white">{pctFmt(currentProjection.cagrs[4]/100)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Target</span>
                    <span className="text-3xl font-black" style={{ color: tc }}>{usd(currentProjection.pricePerShare)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">WACC</span>
                    <span className="text-3xl font-black text-white">{pctFmt(currentProjection.w)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">RS Rating</span>
                    <div className="flex items-end gap-1">
                      <span className={cn(
                        "text-3xl font-black",
                        rsRatingColor(tickerDef.rsRating)
                      )}>{tickerDef.rsRating}</span>
                      <span className="text-xs text-slate-400 font-bold mb-1.5">/99</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">AI Context</span>
                    <div className={cn(
                      "text-xs font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap",
                      AI_IMPACT_BADGE[tickerDef.aiImpact]
                    )}>
                      {tickerDef.aiImpact.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full" />

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Quant Narrative
                    </h3>
                    <p className="text-lg text-white font-bold leading-snug">{currentProjection.config.desc}</p>
                  </div>
                  <div className="h-px bg-slate-800/50 w-full" />
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                      <LayoutDashboard className="w-3 h-3" />
                      Alpha Strategic View
                    </h3>
                    <div className="space-y-3">
                      {tickerDef.strategicNarrative.split('\n\n').map((para, i, arr) => (
                        <p key={i} className="text-base text-slate-200 font-medium leading-relaxed italic">
                          {i === 0 ? '\u201c' : ''}{para}{i === arr.length - 1 ? '\u201d' : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Burry SBC indicator (renders only when stock has burry data) */}
            <BurryIndicator tickerDef={tickerDef} />

            {/* Scenario cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard data={allProjections.bear} currentPrice={tickerDef.currentPrice} modelType={tickerDef.modelType} />
              <ScenarioMetricsCard data={allProjections.base} currentPrice={tickerDef.currentPrice} modelType={tickerDef.modelType} />
              <ScenarioMetricsCard data={allProjections.bull} currentPrice={tickerDef.currentPrice} modelType={tickerDef.modelType} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-surface-card border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-8 mt-1">Model Verdict</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-xs text-slate-400 uppercase font-black tracking-widest">5Y Prob-Weighted CAGR</span>
                  <span className="text-3xl font-black leading-none text-white">{pctFmt(investmentConclusion.cagr / 100)}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-xs text-slate-400 uppercase font-black tracking-widest">Blended Value</span>
                  <span className="text-3xl font-black leading-none" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InvestmentVerdict
          tickerDef={tickerDef}
          allProjections={allProjections}
          investmentConclusion={investmentConclusion}
          activeStockData={activeStockData}
          metrics={metrics}
        />
      </div>
    </motion.div>
  );
};

export default StockDetailView;
