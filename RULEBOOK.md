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

**A hand-posted setup ends three ways, and a script may reach only two of them.** The
price update may mark it `target` when price gets there, or `failed` when it is
invalidated. Nothing else about it is a script's to change — not its levels, not its
stage, not its slot.

**The third way is replacement by the detector, and only once the setup has gone stale.**
Stale means the reading is no longer live: flagged `update`, dormant, or stranded. A
hand-posted call that is none of those is still a call someone made, and stays untouched.

**A dead stop and too little room are not staleness, and the measurement is conclusive.**
Those two started on the list above and came off it. Taken as replacement triggers they
catch 64 hand-posted setups across 45 stocks, 31 of them holding a visible slot — and
among them PLTR's daily rising wedge, posted hours earlier at the source tool's own
levels; all four AMKR setups, which the user confirmed as right and differing only in
"timeframe of reaching the target"; IOVA's monthly wedge, which this rulebook already
defends by name; and CLS's and DAVE's, verified the same day. A rule whose first run
deletes every call its author validated that week is not a staleness rule.

The reason is a distinction worth keeping: `--deadstops` and `--thin` judge **whether the
trade is worth taking**, `update` / `dormant` / `stranded` judge **whether the reading is
still live**. Only the second kind licenses a replacement. AMKR's direction is right and
its numbers are a long-horizon projection; IOVA's stop cannot fire because the break
already paid. Both are poor trades and correct readings.

**So the rule stands and has nothing to do.** Under the narrowed definition there are 44
candidates: 43 already `dormant` — shelved, invisible, and replacing one would destroy the
path that wakes it when its break re-forms — and one stranded, AMKR's weekly falling
wedge, which the user validated. It stays unwired because there is no work for it, not
because it is hard. The ledger was never stuck on hand-posted setups being unreplaceable;
it was stuck on the fail rule being unreachable, which is a different fix.

This replaces the older rule that a script "may tidy what it drew and may only report on
what a person drew". That rule is what left the ledger with **1 failure in 351 confirmed
calls**: a stuck row could only be replaced by a human, and the human did not come back, so
nothing ever closed. Reporting a stale call and leaving it is not caution, it is a row that
stays wrong forever.

**Replacement archives the prose first.** `archive/handSetups-<date>.json` already stores
the verbatim source of every stored setup; a replaced hand-posted setup goes there before
the detector's own note takes its place. Recoverable rather than preserved in place — a
`note` quoting levels that no longer exist is worse than no note, and the archive is what
makes the swap safe to automate at all.

**Re-read the prose when a setup changes.** `note`, `failRule` and `keyLevel` are
hand-written and quote the numbers that were true when they were written. STRL's keyLevel
said $731.25 — the target of a wedge retired days earlier — while the stock traded at
$355.30.

## The dots: what a check is worth, and when it expires

**A red dot means newly generated and not yet read, nothing else.** It is not a quality
mark and not a permanent label. Once a stock's shown setups have been checked by hand, the
`auto: true` comes off them and the dot goes — that is the documented procedure and it is
the only thing that clears it.

**A check expires on the event that makes it stale, never on a clock, and never on the
earnings print.** The dot was once gated on a future earnings date and that was removed:
it hid the check on every stock with no date on file. A check is a check until something
makes it wrong.

**A price event is what ends one.** If the stock breaks *against*
the reading the check was made on, the check is spent and the row is owed a fresh look —
bring the red dot back. PLTR is the case: it was checked on Oct 25 with a bullish daily
falling wedge as the live read, so a completed close below its $180.41 invalidation plus
the follow-through its `failRule` names is what re-flags it. The check said "I have read
this chart and this is what it says"; once the chart says something else, the check is a
statement about a chart that no longer exists.

**A check also expires the moment any of the stock's setups is replaced by an
auto-generated one.** The check was made against the setups as they stood; swapping one
for a machine drawing nobody has read makes it a check of something that is no longer
there. Clear `checkedOn` in the same edit that writes the replacement — not as a courtesy
but because the green dot would otherwise vouch for a reading the detector produced after
the person stopped looking. This is the second way a check dies, alongside the break
against the reading, and it is the only one a script can cause.

**Apply this to every hand-check from here on.** When you clear a stock's dots, you are
asserting a reading, so note which setup carries it — the fail rule of the checked setup
is the expiry condition. A stock needs no earnings date to carry a green dot, and most do not have one.

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

## A bottom you cannot see yet

**When the indicators disagree, do not resolve it — post a `forming` setup.** IREN is the
case: a turn-up dot three bars ago at z −2.63, which `hlGate` cannot suppress because the
AR(1) fit found no reversion to gate, against Hurst 0.57 and a variance ratio of 1.20
saying the series is persistent. One half says bottoming, the other says fading this
loses. Nothing decides it until the bottom is actually in.

A `forming` stage makes no claim, which is exactly the right claim to make here. An
either-direction setup says it better still: it is watching for a break both ways, which
is the honest description of a stock that can keep falling or turn.

**The trend stays the working hypothesis and the reversion is its invalidation.** The
stock is bearish, so bearish is what we assume; what would prove us wrong is the bottom
forming. That is a setup with a level on each side, not a directional call with a target.

**The half-life time-boxes the hypothesis.** It says how many bars this series has taken
to close half the gap to its mean, and the Pine's own convention is a lookback of about
twice it — so roughly 2× half-life is when a reversion should have shown itself. Past
that, the setup has not been proven wrong, it has stopped being a reversion story.

Where there is no half-life at all (`phi ≥ 1`, the fit finding no pull to the mean) there
is no time-box, and that is worth more than it looks: it is the same statement as "this is
not a reversion story", arriving from the fit rather than from Hurst.

**Do not reconcile a panel reading to a port without checking the timeframe.** IREN read
`phi = 1.0172` on daily candles, no half-life; a 10.5-bar half-life needs `phi ≈ 0.936`.
That is not a rounding gap, it is a different series — an intraday chart, which
`public/bars/` does not carry. Say so rather than tuning a number until the two agree.

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
