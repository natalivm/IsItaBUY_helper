import React, { useRef, useEffect, useCallback } from 'react';

const MIN_SWIPE_DISTANCE = 80;
const MAX_SWIPE_TIME = 400;
const MAX_VERTICAL_RATIO = 0.75;

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useSwipeNavigation(
  ref: React.RefObject<HTMLElement | null>,
  handlers: SwipeHandlers,
) {
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      const dt = Date.now() - touchStart.current.t;
      touchStart.current = null;

      if (dt > MAX_SWIPE_TIME) return;
      if (Math.abs(dx) < MIN_SWIPE_DISTANCE) return;
      if (Math.abs(dy) / Math.abs(dx) > MAX_VERTICAL_RATIO) return;

      if (dx > 0) {
        handlers.onSwipeRight?.();
      } else {
        handlers.onSwipeLeft?.();
      }
    },
    [handlers],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onTouchStart, onTouchEnd]);
}
