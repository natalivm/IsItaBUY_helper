import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'pwa-install-dismissed';

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
}

function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already installed or previously dismissed this session
    if (isInStandaloneMode()) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show after 5 seconds to not interrupt initial experience
    const timer = setTimeout(() => {
      if (isIos() && !isInStandaloneMode()) {
        setShowIosPrompt(true);
        setVisible(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  // Show when deferredPrompt becomes available (Android/Chrome)
  useEffect(() => {
    if (deferredPrompt) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [deferredPrompt]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setVisible(false);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, '1');
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
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#ff007f]/10 flex items-center justify-center">
              {showIosPrompt ? (
                <Share className="w-5 h-5 text-[#ff007f]" />
              ) : (
                <Download className="w-5 h-5 text-[#ff007f]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-100">
                Install Is It a BUY?
              </p>
              {showIosPrompt ? (
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Tap <Share className="w-3 h-3 inline -mt-0.5" />{' '}
                  <span className="text-slate-300">Share</span> then{' '}
                  <span className="text-slate-300">"Add to Home Screen"</span> for the full app experience.
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-1">
                  Add to your home screen for offline access and a native feel.
                </p>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 -mt-1 -mr-1 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!showIosPrompt && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="mt-3 w-full py-2.5 rounded-xl bg-[#ff007f] hover:bg-[#ff007f]/90 text-white text-sm font-bold transition-colors"
            >
              Install App
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
