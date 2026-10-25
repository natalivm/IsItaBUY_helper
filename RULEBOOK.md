# Rulebook

Decision rules for working on the ledger. `CLAUDE.md` says how the machinery works and
`PATTERN_RULES.md` says how a pattern is drawn; this says what to do when you have to
choose. Every rule names the case that produced it, because the case is the argument —
if a new case contradicts one, the rule is what changes.

## Changing a setup

**Redraw on current candles; do not delete.** A stale setup is a drawing that has gone out
of date, not a wrong one. D's weekly falling wedge came from the source tool confirmed in
June above $68.97 — a level price has since fallen away from and failed at. The same
pattern run on today's candles signals in the week of Oct 19 and confirms 0.7% from spot.
The redraw is the better setup every time, so reach for it before reaching for a delete.

**`auto: true` is the only thing protecting a hand-written setup.** A stored setup without
the flag is never rewritten, whatever it looks like — some unflagged ones are plainly
machine-drawn and they stay anyway. Guessing against the flag is how hand-written prose
gets eaten.

**A setup the fresh scan no longer finds is left alone.** Not finding it again is not the
same as it being wrong.

**Replacing a hand-posted call is a decision, not a clean-up.** `--thin`, `--deadstops`
and `--dormant` all drop the auto-detected ones and *list* the rest. Keep that split in
anything new: a script may tidy what it drew, and may only report on what a person drew.

**Re-read the prose when a setup changes.** `note`, `failRule` and `keyLevel` are
hand-written and quote the numbers that were true when they were written. STRL's keyLevel
said $731.25 — the target of a wedge retired days earlier — while the stock traded at
$355.30.

## Taking levels from the source tool

**Reproduce every level from our own candles before writing it.** Their signal candle's
high or low has to equal their confirm, and the confirming close has to land on the date
they give. ASTS, ENPH (Sep 9 high $39.54), UMAC (Jul 29 low $17.16) and D (week of May 18,
high $68.97) all matched exactly. That check is what makes an import safe rather than a
transcription.

**If the fitter cannot reproduce the levels from pivots, draw the lines from the levels.**
Anchor them on a real touch — ENPH's boundary on the Sep 9 swing high, to the cent — and
say in the note that is what you did. Leaving a setup without lines costs it the chart and
the relevel; inventing a pattern to fit is worse.

**A tall or long-horizon drawing is not a defect report.** AMKR's weekly channel reads
243% of the close it starts from and is a setup the source tool and a human both call
valid; it differs by *horizon*, not correctness. Read the geometry report as a horizon
label.

## Targets

**Test `confirm ± height` before blaming the target.** If the arithmetic reproduces, the
construction is wrong and the number is only its symptom. D's $94.09 reproduced to the
cent, which located the fault in a lower boundary extrapolating to $25.77 against an
all-time low of $55.85.

**If the measured move is unusable in both directions, use a level and say so.** On D the
full span gives $94.09 and the span holding the move gives $64.06, below spot. The target
is the prior high. Write in the note that it is a level rather than a projection, and show
both numbers the measured move gave.

**Check the boundary that sets the height, not just the one that sets the stop.**
`stop_fault` tests the invalidation and `geometry_faults` tests the height ratio; a channel
whose *far* boundary has walked out of the traded range passes both and still inflates the
target. 102 setups currently have lines running more than 15% outside every price their
stock has traded.

**An inflated target does not just mislead, it wins.** Room-to-target is a positive term in
both `slot_score` and `weekly_feature.score_setup`, so a bad number buys the row and the
landing page. D's fix dropped it from the #2 bullish card to below the cutoff.

## A price the stock has never traded

**Which side it is on decides whether it is a fault.** A level beyond the whole traded
range is normal in one direction and fatal in the other, and the two must not be checked
the same way.

**A bearish setup's stop above the all-time high cannot fire.** The failure rule needs a
close past it, so the setup can only be wrong if the stock makes a new high — which means
it is not wrong at any price it has ever traded. META's weekly channel sat on $1052.30
against a $796.25 high, confirmed in November 2025, carrying a $475.78 target no price
could ever retire. Across the ledger 60 bearish setups have a stop that needs a new high,
many of them holding a visible slot. Redraw them.

**A bullish setup's target above the all-time high is the point.** A breakout goes to new
highs by definition, so reaching past the range is what a measured move on a stock with
momentum behind it should do. 80 setups are in that shape and none is a defect. Do not
apply the stop test to them.

**A break that has already paid is the exception.** IOVA's monthly falling wedge confirmed
at $4.76 and price is $14.09 — 196% up, 57% of the way to its $21.26 target — on a $0.23
invalidation at the base of the wedge. The stop cannot fire, but this is not a drawing
waiting to be wrong; it is a call that is working, and the source tool draws it identically.
On a bullish break out of a multi-year base the unreachable floor *is* the base, and what
matters instead is where the consolidation holds. Keep it, say so in the note, and let it
keep appearing on the dead-stop list — that list is for review, not for deletion.

**Distance still decides, direction only says where to look.** `STOP_BEYOND` (15%) exists
because a stop just outside the range is *correct* on a stock at its highs: QQQ's $764.44
against a $762.86 high is 0.2% out and perfectly tradeable, while DAVE's is 11% out and a
level price has no reason to visit. Without the margin the check flagged 204 setups, nearly
all of them fine.

**A rising boundary buys time, not a fix.** Replacing one walking stop with another only
defers the fault: META's redrawn daily channel has a stop inside the range today and
climbing $4.93 a bar, so it leaves the range in about three weeks. Where every bearish
reading on a chart hangs off a rising line, say so in the note rather than pretending the
redraw settled it.

**`breakInvalidation` is write-once, so a hand redraw must clear it.** A rescan drops the
field and the next run writes a fresh one; editing a setup's levels in place does not, so
the frozen stop stays behind from the setup that used to be there. META's redraw kept
$685.31 and read as a short's stop below its own entry until the field was removed.

## Thresholds and scores

**Measure the population before moving a threshold.** `TARGET_TOL` missed D's head and
shoulders by 13 cents, which looks like a clear case for widening it — until you count: 70
setups sit within 5% of their target unreached, and the distribution is smooth. 8 inside
0.75%, 11 inside 1%, 23 inside 1.5%. There is no gap, so there is no principled stopping
point, and the case has to be decided by hand instead.

**A near-miss that reverted is a hand call.** What made D different was not the distance —
NUE, META, CVX and KO are all the same distance out — but that price turned there. No
tolerance can see that.

**Never override a score to match a read.** UMAC's bottoming signal scores −31 against the
down setups' 94: it fights trend and momentum and risks a channel width for a 0.39 reward.
That is the scoring working. Post the setup, leave the rank, and say why it sits where it
does.

**Corroboration between independent readings is evidence; agreement with yourself is not.**
D's $73.45 is believable because the source tool's weekly wedge and our daily channel
arrive there separately. Five of our own setups projecting $19-22 on FRSH was one read
drawn five ways.

## What a script may delete

**Only what it can replace.** A scan may redraw what it drew. Nothing else.

**Never a flag that asks for a human.** `prune_finished` dropped stored setups marked
`update` as if they were cancelled, so the request for a replacement was gone by the next
run — LITE's and TEAM's were flagged on Oct 23 and deleted on Oct 25. The run that asks
cannot be the run that forgets.

**Never corroboration.** `dedupe_setups` deleted stored setups matching "same direction,
any timeframe, target within 5%" — word for word the test `annotate_agreement` uses to
*count* them. Dedupe guards the two visible slots, which is the fault it was written for;
a stored copy costs no slot.

**Tidying the ledger must not cost the training set.** `pattern_reproduce` trains on
completed calls, so anything finished is written to `data/completedCalls.json` before it
leaves. Capping CVX would otherwise have removed 11% of the evidence behind every tuning
decision on record.

## Derived values

**A stored level read off a line is a cache — recompute it where it is used.**
`breakUp` / `breakDown` decide a stage on every run, so `_live_breaks` reads them from the
lines at the break test rather than trusting the stored pair. TEAM's $226.80 against a
$227.61 close read as a break while the line stood at $237.65.

**Distance cannot tell stale from wrong; age can.** A level far from its line is either an
old reading of that line or a reading of a different one, and the gap looks identical.
`_lines_dated` searches backwards along the same lines: UMAC's stored pair matched its own
lines four bars back, so it was stale, and the values the relevel wanted were the ones the
source tool publishes.

**Compare a level to its own contemporary.** A live invalidation walks with its line, so
testing it against the entry flags every trailing stop that has passed breakeven.
`stop_fault` compares the entry against `breakInvalidation`, frozen on the break day.

## When to ask

**A judgement you have put to the user is theirs to close.** D's wedge was folded while
that exact question was open. Raising a question and then answering it by acting is worse
than not raising it.

**Say what you did not do.** ENPH's monthly channel was left out rather than imported,
UMAC's signal was left at its rank rather than promoted, and the `update_watchlist`
ordering was documented rather than claimed fixed. A reviewer should not have to find
those in the diff.
