// The "What's New" toast, split from the drawer it opens.
//
// A first-time visitor sees this on the landing page, so whatever module it lives in is
// fetched on first paint. In ReleaseNotesPanel.tsx that meant the drawer's `cn` import and
// with it tailwind-merge — 27 KB for a toast that uses neither. It needs only its summary
// line, which comes from the metadata module.
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { LATEST_SUMMARY } from './releaseNotes';

interface ToastProps {
  onView: () => void;
  onDismiss: () => void;
}

export const WhatsNewToast: React.FC<ToastProps> = ({ onView, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-surface-deep/95 backdrop-blur-lg border border-slate-700/60 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-100">What's New</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{LATEST_SUMMARY}</p>
            </div>
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 -mt-1 -mr-1 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={onView}
            className="mt-3 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-500/90 text-slate-950 text-sm font-bold transition-colors"
          >
            See what changed
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
