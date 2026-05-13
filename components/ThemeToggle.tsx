import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'isitabuy-theme';

const readInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isLight = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all duration-200"
    >
      {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      {isLight ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;
