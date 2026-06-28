import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScrollText, Newspaper, Sparkles } from 'lucide-react';
import { cn } from '../utils';

export type PanelTab = 'notes' | 'news';

// Bump this whenever a new release note / news item is added. The in-app
// "What's New" toast and the unseen-badge dot fire whenever the user's stored
// seen-version differs from this. (Not a real OS push — same in-app pop-up
// system as the PWA install prompt.)
export const UPDATES_VERSION = '2026-06-28.3';
export const UPDATES_SEEN_KEY = 'isitabuy-updates-seen';
// One-line summary shown in the toast.
export const LATEST_SUMMARY = 'Deep-dive refresh of WDC & RDDT against verified TIKR financials and the latest earnings-call / conference transcripts. WDC holds HOLD (parabolic, above target); RDDT holds BUY (below target, AI-search traffic the key risk). No home-group changes.';

interface ReleaseNote {
  date: string;
  tickers: string[];
  text: string;
}

// Stock-evaluation changes only — kept intentionally terse.
const RELEASE_NOTES: ReleaseNote[] = [
  {
    date: 'Jun 28 2026',
    tickers: ['WDC', 'RDDT'],
    text: 'Deep-dive refinement of two names against verified TIKR financials and the latest earnings-call / conference transcripts (no rating-tier or home-group changes). WDC (Western Digital) HOLD — confirmed the parabolic ~8x run off the lows is real (AI-storage nearline HDD super-cycle, a disciplined duopoly adding no unit capacity, gross margin above 50%, ~30% FCF margin, and a balance sheet transformed to net cash / investment-grade after the SanDisk-stake monetization); base EPS rolled to the ~$13 Q4-FY26 exit run-rate, but every scenario lands below spot — the stock trades above its ~$554 analyst target at a cyclical-peak multiple, so the HOLD override stands. RDDT (Reddit) BUY — revenue/EPS reset to actuals (FY25 $2.2B +69%, FY26E GAAP ~$5.00) with best-in-class ~40% EBITDA / ~47% FCF margins on a $1M-CapEx model, a high-margin AI data-licensing annuity, Reddit Search scaling ~1M→~15M users, net cash ~$2.8B and an active buyback; trades well below the ~$230 target so it stays a clean BUY (no override). Burry SBC overstatement corrected to ~38% (SBC ~12% of revenue, modest dilution).',
  },
  {
    date: 'Jun 28 2026',
    tickers: ['VRT', 'Q', 'HPE', 'SIMO'],
    text: 'Deep-dive refinement of four names against verified TIKR financials, the latest earnings-call / Investor-Day transcripts and IBD relative-strength ratings (no rating-tier or home-group changes). VRT (Vertiv) BUY — base EPS rolled to the raised FY2026E guide and growth set toward the Street\'s ~27% FY26-30 path; verified SBC is tiny (Pristine/OK) and net leverage is ~0.2x exiting Q1. Q (Qnity) HOLD — revenue/EPS reset to actuals (FY25 $4.75B, raised FY26E ~$3.97); a badly overstated SBC estimate corrected to Pristine (~3% naïve, buybacks exceed comp); still ~40x forward, above no clear margin of safety. HPE moved from DCF to the EPS×P/E model and HOLDS BUY — FY26 EPS guidance raised 40%+ (two years ahead of plan), an 8-12% revenue / 12-16% EPS FY27 framework, de-levering to its 2.0x target a year early then returning ≥75% of FCF; the prior estimate had overstated SBC ~2x. SIMO (Silicon Motion) HOLD — confirmed the ~4x run is real (record quarters, structural NAND-controller share gains, MonTitan CMX/KV-cache and boot drives ramping into NVIDIA platforms), but at ~35x peak-cycle earnings it trades above the $274 analyst target. IBD RS synced: SIMO 99, HPE 96, VRT 86.',
  },
  {
    date: 'Jun 28 2026',
    tickers: ['VRT', 'RDDT', 'WDC', 'SIMO', 'Q'],
    text: 'Five new AI-infrastructure / semiconductor names added (EPS×P/E model). VRT (Vertiv) BUY — data-center power & cooling pure-play with a huge AI backlog; rich but the Street target sits above the price. RDDT (Reddit) BUY — fast-growing ad platform plus a high-margin AI data-licensing annuity, with upside to target (AI-search traffic risk is the offset). WDC (Western Digital) HOLD — HDD up-cycle is real but the stock ran to an all-time high and trades above its analyst target at a cyclical-peak multiple (HOLD override, mirroring Seagate). SIMO (Silicon Motion) HOLD — explosive NAND-controller growth, but a small-cap cyclical trading above target after a big run. Q (Qnity Electronics) HOLD — high-quality DuPont semiconductor-materials spin-off, but ~42x forward earnings for a mid-teens grower after a ~65% post-debut run.',
  },
  {
    date: 'Jun 28 2026',
    tickers: ['SEZL', 'DAVE', 'NVO'],
    text: 'Three new names added, all on the EPS×P/E model off their latest quarter. SEZL (Sezzle) HOLD — best-in-class, highly profitable BNPL lender, but it trades above the analyst target range after a parabolic run (Pristine Burry; pursuing an ILC bank charter). DAVE (Dave Inc.) BUY — profitable neobank / cash-advance fintech at a sub-1 PEG, ~22× earnings on ~22% EPS growth with aggressive buybacks shrinking a tiny float (FTC fee-model scrutiny is the lead risk). NVO (Novo Nordisk) HOLD — fallen-angel GLP-1 leader down ~60% from its highs; 2026 adjusted earnings are guided to decline (−4% to −12%) on US "Most Favoured Nations" pricing and Lilly competition, offset by a record oral-Wegovy-pill launch and a deep pipeline.',
  },
  {
    date: 'Jun 28 2026',
    tickers: ['LLY'],
    text: 'LLY re-rated HOLD → BUY on a data correction. The EPS base was rolled from a stale ~FY2025 $24 to the FY2026E ~$36.25 after Lilly RAISED full-year non-GAAP EPS guidance to $35.50-$37 (Q1 2026 EPS $8.55, revenue +56%, FY26 revenue guide $82-85B). Foundayo (oral orforglipron) is now approved and launching, retatrutide posted up to ~30% weight-loss Phase III data (a likely third obesity drug in 2027), and BD/pipeline cadence stays torrid. The prior HOLD reflected the understated trailing EPS base, not the business.',
  },
  {
    date: 'Jun 28 2026',
    tickers: [],
    text: 'New quarterly-earnings badge on each stock row, showing the latest reported quarter the data reflects. It lights up green when the fundamentals were reviewed within the last ~45 days and stays muted when the read is older — a quick freshness cue for how current each evaluation is.',
  },
  {
    date: 'Jun 26 2026',
    tickers: ['NVDA', 'ANET', 'DELL', 'ORCL', 'JPM', 'CLS', 'WWD', 'LLY'],
    text: 'Major rating-engine upgrade: every rating now runs on one consistent measure — expected 5-year CAGR. Previously EPS×P/E names were scored on an undiscounted 5-year-forward price while DCF names used present fair value, which systematically inflated the EPS×P/E ratings. Both now express a 5-year-forward target (DCF compounds fair value at its cost of equity) and rate on annualized return: >16% STRONG BUY, >10% BUY, <3% OVERVALUED. Net effect (28 names re-rate): NVDA → STRONG BUY and ANET & DELL join the top tier (their genuine undervaluation was previously masked); the high-flyers ease to honest CAGRs (AMZN, META, NFLX, NOW, CEG, AZO, VST → BUY); JPM, CLS, WWD, LLY and ENVA step out of the growth tiers, and MLM/ROAD read OVERVALUED. PRIME GROWTH is now AVGO, HPE, NVDA, ORCL, APH, ANET, DELL.',
  },
  {
    date: 'Jun 26 2026',
    tickers: ['RVLV', 'SPGI'],
    text: 'Model engine hardening from a stress-test pass (no home-group changes). Weak-momentum names (RS<30) no longer receive the quality-boost rating bump, so RVLV and SPGI ease STRONG BUY→BUY. Also fixed under the hood: bear-case targets can no longer render negative (floored at 0 when net debt exceeds discounted value), and a legitimate 0% growth/margin year is no longer silently swapped for a default in the EPS×P/E revenue display. The unused fcfMargin25 input was marked deprecated.',
  },
  {
    date: 'Jun 26 2026',
    tickers: ['NU', 'ZS', 'MELI', 'SHOP', 'DDOG'],
    text: 'Evaluation revalidation against current prices. EPS_PE fundamentals refreshed to the latest reported quarters: NU FY26E EPS to ~$0.88 (Street consensus, up from a conservative $0.72); ZS trimmed for management’s FY27 16–17% deceleration (EPS CAGR 18→15, exit P/E 38→35); MELI rolled to Q1 2026 with EPS to ~$41 after the Q1 margin reset (CAGR 22→20); SHOP FY26E EPS to ~$1.82. DDOG keeps its HOLD override and stays in Watch List despite RS spiking to 94 — its EPS×P/E base case is only ~3% annualized, so momentum alone doesn’t earn a growth tier. Stale override-rationale comments also cleaned up (DASH, INCY, PLTR, INTU, CACI, LMT). No rating-tier or home-group changes.',
  },
  {
    date: 'Jun 16 2026',
    tickers: ['GXO', 'KRMN', 'APP', 'NU', 'PAAS', 'RTX', 'SHOP', 'ZS', 'ROAD', 'THM'],
    text: 'Relative-strength refresh from the latest market data — momentum cooled broadly and many names dropped out of the growth tiers into Watch List on weak RS (buy ratings unchanged): APP, NU, PAAS, RTX, SHOP, ZS, ROAD and THM. Two downgrades where weak momentum met soft fundamentals: GXO STRONG BUY→HOLD and KRMN BUY→HOLD — both carry deep model upside that overstates a below-hurdle base case (weak RS, distribution, elevated leverage; KRMN is a recent IPO down ~59% off its highs). LLY, AVGO, APH, HPE, WWD and ENVA retain their growth ratings. KLAC re-based for its 10-for-1 split.',
  },
  {
    date: 'Jun 5 2026',
    tickers: ['CLS', 'ORCL', 'NOW', 'ARRY'],
    text: 'Prices refreshed after broad tech selloff (Nasdaq -4.18%, S&P -2.64%) on strong jobs report pushing 10Y yield above 4.5%. Semis hit hardest: MRVL -16.7%, MU -13.3%, ALAB/SNDK -11.4%, AMD -10.9%. Rating changes: CLS HOLD→BUY (+18.5% upside), ORCL HOLD→BUY (+13.5%), NOW BUY→STRONG BUY (+29.2%), ARRY OVERVALUED→HOLD (-3%).',
  },
  {
    date: 'Jun 2026',
    tickers: ['CRWD'],
    text: 'Q1 FY27: adj EPS $1.10 (+51% YoY), rev $1.39B (+26%), ARR $5.51B (+24%). First ever GAAP-profitable quarter ($0.11 EPS vs -$0.44 prior year). FCF $468M (+68% YoY). FY27 guide raised to $5.91–5.96B rev, EPS $4.88–4.96. 4-for-1 split Jul 2. AH -11–13% on billings miss (18% vs 24% ARR growth).',
  },
  {
    date: 'Jun 2026',
    tickers: ['CRWD'],
    text: 'AIDR structural catalyst: exclusive Anthropic + OpenAI security partner after "Mythos moment" (AI models weaponizing vulnerability discovery). AIDR ARR +250% sequentially; Q2 pipeline >$50M. Management says will exceed EDR scale. 90 AI agents per employee = 90× attack surface vs 1 endpoint. Model: epsCagr/exitPE raised, bull prob 35%→43%.',
  },
  {
    date: 'Jun 2026',
    tickers: ['AVGO'],
    text: 'Q2 FY26: rev $22.2B (+48%), AI semi $10.8B (+143%), EBITDA 68.71% margin (+205bps YoY — expanding). Non-GAAP EPS $2.44 beat $2.40. FCF $10.26B missed estimate by 9.9% (likely H2 working capital build). AH -5–14% on Q3 AI guide $16B vs $17.2B expected.',
  },
  {
    date: 'Jun 2026',
    tickers: ['AVGO'],
    text: 'Call: FY26 AI semi total $56B (+180%), Q4 AI implied ~$20.8B (2× Q3). Signed contracts: Meta 1GW received, Anthropic 5GW for 2027, OpenAI 1.3GW committed, Google multi-gen agreement. Bookings >$30B vs shipments = FY28 visibility. Model: rev25 $73B→$102B, base revGrowth 20%→45%, ebitdaProxy raised to [0.55, 0.65, 0.70].',
  },
  {
    date: 'Jun 2026',
    tickers: ['CLS'],
    text: 'Added Burry SBC indicator — Tragic tier (~19× stock run amplifies dilution).',
  },
  {
    date: 'Jun 2026',
    tickers: ['CLS'],
    text: 'Added Debt Safety check — GREEN (net debt 0.3× EBITDA).',
  },
  {
    date: 'Jun 2026',
    tickers: ['CLS'],
    text: 'Q1 2026 earnings in: adj EPS $2.16 (+80% YoY), rev $4.05B (+53%). FY26 guide raised to $17B rev / $8.75 EPS.',
  },
];

interface NewsItem {
  date: string;
  title: string;
  image?: string;
  text?: string;
}

// Chart updates get posted here.
const NEWS_ITEMS: NewsItem[] = [];

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wide border-b-2 transition-colors',
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
            className="w-full max-w-lg bg-surface-deep border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
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
        <div className="bg-surface-deep/95 backdrop-blur-lg border border-slate-700/60 rounded-2xl p-4 shadow-2xl shadow-black/40">
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
