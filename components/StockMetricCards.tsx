import React from 'react';
import { motion } from 'motion/react';
import { Target, Rocket, Activity } from 'lucide-react';
import { StockMetrics, usd } from '../services/stockMetrics';

interface Props {
  metrics: StockMetrics;
  themeColor: string;
}

const StockMetricCards: React.FC<Props> = ({ metrics, themeColor: tc }) => {
  const { baseTarget, bullTarget, momentumUpside, timeToTarget, probAcceleration } = metrics;

  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-surface-card/80 border border-slate-800 rounded-xl p-3 md:p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">5Y Base Target</span>
        </div>
        <div className="text-xl md:text-3xl font-black text-white">{usd(baseTarget)}</div>
        <div className="text-sm text-slate-400 mt-3 flex items-center gap-1.5">
          Bull Target: <span className="text-amber-500 font-bold">{usd(bullTarget)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-card/80 border border-slate-800 rounded-xl p-3 md:p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Momentum Upside</span>
        </div>
        <div className="text-xl md:text-3xl font-black" style={{ color: momentumUpside >= 0 ? '#22c55e' : '#ef4444' }}>
          {momentumUpside >= 0 ? '+' : ''}{momentumUpside.toFixed(1)}%
        </div>
        <div className="text-sm text-slate-400 mt-3">
          Est. Time to Target: <span className="text-slate-300 font-bold">~{Math.max(0.5, timeToTarget).toFixed(1)}Y</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-card/80 border border-slate-800 rounded-xl p-3 md:p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Prob of Acceleration</span>
        </div>
        <div className="text-xl md:text-3xl font-black" style={{ color: tc }}>{probAcceleration}%</div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${probAcceleration}%`, background: tc }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default StockMetricCards;
