import { defineStock } from './defineStock';

export const APH = defineStock({
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  updatedOn: '11/14',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-08',
  currentPrice: 78.23,
  fairPriceRange: '$85 - $116',  // stockanalysis.com analyst target range, Oct 8 2026
  // 2-FOR-1 SPLIT EFFECTIVE SEP 3 2026. This was 1278 — PRE-split — while currentPrice and baseEps
  // were both already post-split, so the file carried a market cap of half the real one ($95.3B
  // against TIKR's $184.2B). Exactly the trap the META file warns about, caught on the other side:
  // update_prices picks up the post-split price automatically and the share count does not follow.
  // APH rates on EPS_PE so the rating was unaffected, but classifyStock sizes the company off this.
  shares0: 2469.26,    // TIKR, Nov 6 2026 ($74.59 x 2,469.26 gives the $184,182M cap)
  rev25: 23095,        // FY2025 revenue $23.1B (was mis-set to $31B); FY26E consensus $35.6B (+54%), FY27E $42.6B (+20%)
  fcfMargin25: 0.19,   // FY25 FCF $4.38B
  taxRate: 0.27,
  cash: 5300,          // Q3 2026 per the call: cash and short-term investments (total liquidity $8.3B)
  debt: 17900,         // Q3 2026 total debt; net debt $12.6B, matching TIKR's LTM $12,569M
  beta: 1.28,          // TIKR 5-yr beta, Nov 6 2026
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 2.83,       // FY2026E adjusted EPS — now the COMPANY'S OWN GUIDE of $2.82-2.84, not a consensus.
                       // Was $2.68, the Oct 8 figure, which the Q3 beat has overtaken. Post-split basis
                       // throughout. TIKR's NTM P/E of 21.39x implies $3.49 for the next twelve months,
                       // which brackets FY27 and sits above the $3.33 FY27E this file carried.
  rsRating: 98,         // IBD RS per user, 10/10/2026 (was 80)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter, above the top of guidance. Sales $8.8B (+55% USD, +30%
  // organic). Orders $10.7B, book-to-bill 1.23. Adj. EPS $1.35 (+67%; incl.
  // ~$80M net IEEPA tariff recovery). Q3 GUIDE: sales $9.3-9.4B (+50-52%),
  // adj. EPS $1.40-1.42 (+51-53%), no further tariff recoveries assumed.
  // Balance sheet (Jun 30): cash $5.4B vs debt $18.8B (net ~$13.4B, post-
  // CommScope). FY25 actuals: revenue $23.1B, NI $4.27B, FCF $4.38B. Street:
  // Strong Buy (19), PT $85-116 (median $100); FY26E EPS $2.68 / rev $35.6B,
  // FY27E $3.33 / $42.6B. ~33× FY26E / ~26× FY27E. NOTE: earlier file inputs
  // (baseEps $4.40, rev $31B, PTs $135-210) were inconsistent with the
  // share price and have been corrected — the prior STRONG BUY was an
  // artifact of that error.
  // ─────────────────────────────────────────────────────────────────────────

  // Q3 2026 (reported Oct 28) — a record on every line
  // ─────────────────────────────────────────────────────────────────────────
  // Sales $10.2B, the first $10B quarter, +65% reported and +37% ORGANIC.
  // Adjusted EPS $0.80, +74%. Adjusted operating margin 29.7%, up 220bps, with
  // ~70bps of the sequential move masked by a larger Q2 tariff recovery. Orders
  // a record $12.17B, +99% y/y, book-to-bill 1.19 and positive in all but one
  // end market. FCF $1.6B, 80% of net income. Everything beat the high end.
  //
  // FY26 GUIDE: sales $36.9-37.1B (~+60%), adjusted EPS $2.82-2.84 (~+70%),
  // excluding three acquisitions not yet closed. baseEps moves to the midpoint.
  // CommScope upgraded to $5.1B of sales and $0.18 of EPS — it was a $3.6B
  // company at signing and $4.1B at close.
  //
  // THE CONCENTRATION IS THE STORY AND MANAGEMENT SAID SO. IT datacom is now
  // 48% of sales, +117% reported and +77% organic, +30% sequentially, and AI is
  // roughly three quarters of it. A company that used to say nothing exceeded
  // 20% of sales now has one market at nearly half. Norwitt's answer, asked
  // directly: the diversity argument was always two things, insulation from one
  // market and presence when each electronics revolution arrives, and the second
  // is working exactly as intended. Ex-AI, organic growth is still high teens.
  //
  // The bear leg already names this and should be read against the new number —
  // it says "41% IT Datacom concentration" and the figure is 48%.
  //
  // ONE MARKET IS ACTUALLY WEAK, and it is worth separating from the noise:
  // communications networks, 8% of sales, +25% reported but -28% ORGANIC on
  // broadband softness, with a further decline guided for Q4. Everything else
  // grew, five of seven markets by more than 20% organic.
  //
  // Capital returns stepped up: dividend +20% to $0.15 from January, a new $4B
  // three-year buyback from Jan 1, and 3M shares bought at ~$81 in the quarter.
  //
  // NOT REFRESHED: rsRating 98 is the Oct 10 read and the stock is +11.5% over
  // twelve months, so it is probably still high — but at 98 there is no room to
  // rise and the quality boost is load-bearing here, since 15.96% sits just under
  // the hard 16% STRONG BUY line and the label rests on the soft 13%.
  // ─────────────────────────────────────────────────────────────────────────


  epsCagr: [3, 13, 22],
  exitPE: [22, 30, 38],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 85, targetMedian: 106.97, targetHigh: 116, numAnalysts: 19 },  // median = TIKR street target Nov 6 2026 (was $100); low/high/count still Oct 8
  revGrowth: [
    // FY26 is no longer an estimate: three actuals plus a guided quarter put sales at $36.9-37.1B,
    // so year one is the guide range rather than the $35.6B consensus that stood here.
    [0.598, 0.04, 0.03, 0.03, 0.03],  // Bear: FY26 at the low end of the guide; AI capex pause from 2027
    [0.602, 0.20, 0.09, 0.08, 0.07],  // Base: FY26 at the midpoint $37.0B, FY27 ≈ $42.6B, then high-single digits
    [0.606, 0.25, 0.15, 0.13, 0.10],  // Bull: FY26 at the high end; AI supercycle extends
  ],
  fcfMargin: [
    [0.17, 0.16, 0.15, 0.15, 0.14],
    [0.18, 0.17, 0.17, 0.17, 0.17],
    [0.18, 0.19, 0.19, 0.19, 0.20],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI capex softens meaningfully in 2027, exposing the 48% IT Datacom concentration and CommScope\'s still-dilutive margin profile. ' +
      'Earnings growth decelerates to low single digits as the multiple compresses from 28x to the historical 22x trough. ' +
      'EPS compounds only ~3% from the $2.68 FY26E base. 5yr target {target} ({cagr} annualized).',
    'AI infrastructure build-out sustains at a moderate pace; CommScope integrates on schedule and approaches company-average margins by 2028. ' +
      'Defense provides a durable second tailwind. Earnings compound at ~13% annually from the $2.68 base; a slight de-rating from ~33x to 30x. 5yr target {target} ({cagr} annualized).',
    'The AI supercycle extends well into the decade with continued 20%+ IT Datacom organic growth. ' +
      'CommScope\'s fiber business sees a pull-forward from next-generation data center architectures and building connectivity demand. ' +
      'Earnings compound at ~22% and the market sustains a 38x premium compounder valuation. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.15, 0.22, 0.28],
  debtSafety: {
    netDebt: 12569,        // TIKR LTM, Nov 6 2026; the call reports $17.9B debt against $5.3B cash
    ebitda: 11123,         // LTM, derived from TIKR's 1.13x net-debt/EBITDA on that net debt
    fy: 'LTM Q3 2026',
    note: 'GREEN at 1.13x, and deleveraging while still buying: four acquisitions announced in Q3 alone, yet net debt fell $13.4B -> $12.6B. Q3 free cash flow was $1.6B, 80% of net income, which is what funds that. Management puts net leverage at 1.1x.',
  },
});
