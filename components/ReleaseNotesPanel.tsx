import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScrollText, Newspaper } from 'lucide-react';
import { cn } from '../utils';
import { NEWS_ITEMS } from '../data/newsFeed';
import { RELEASE_NOTES, PanelTab } from './releaseNotes';

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors',
      active
        ? 'border-amber-500 text-amber-400'
        : 'border-transparent text-slate-500 hover:text-slate-300'
    )}
  >
    {icon}
    {label}
  </button>
);

interface Props {
  open: boolean;
  tab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
  onClose: () => void;
}

const ReleaseNotesPanel: React.FC<Props> = ({ open, tab, onTabChange, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="w-full max-w-lg bg-surface-deep border border-slate-700/60 rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700/60 px-2 pr-3">
              <div className="flex items-center">
                <TabButton active={tab === 'notes'} onClick={() => onTabChange('notes')} icon={<ScrollText className="w-3.5 h-3.5" />} label="Release Notes" />
                <TabButton active={tab === 'news'} onClick={() => onTabChange('news')} icon={<Newspaper className="w-3.5 h-3.5" />} label="News" />
              </div>
              <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300 transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
              {tab === 'notes' ? (
                <ul className="space-y-3">
                  {RELEASE_NOTES.map((note, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex-shrink-0 flex flex-col items-center pt-0.5">
                        <span className="text-[10px] font-bold text-slate-500 mono">{note.date}</span>
                      </div>
                      <div className="flex-1 border-l border-slate-700/50 pl-3">
                        <div className="flex flex-wrap gap-1 mb-1">
                          {note.tickers.map(t => (
                            <span key={t} className="text-[10px] font-black mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">{t}</span>
                          ))}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{note.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : NEWS_ITEMS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Newspaper className="w-8 h-8 mb-3 opacity-40" />
                  <p className="text-sm">No news yet — chart updates will appear here.</p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {NEWS_ITEMS.map((item, i) => (
                    <li key={i}>
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-slate-500 mono">{item.date}</span>
                        <h3 className="text-sm font-bold text-slate-200">{item.title}</h3>
                      </div>
                      {item.tickers && item.tickers.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {item.tickers.map(t => (
                            <span key={t} className="text-[10px] font-black mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">{t}</span>
                          ))}
                        </div>
                      )}
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full rounded-lg border border-slate-700/50 mb-2" />
                      )}
                      {item.text && <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReleaseNotesPanel;

// ── "What's New" in-app toast ──
// Mirrors the PWA InstallPrompt pattern: a non-blocking bottom pop-up that
// surfaces when the stored seen-version is stale. Not an OS push notification.
