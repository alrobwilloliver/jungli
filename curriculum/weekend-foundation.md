# Weekend Foundation — 2-Day Taster Syllabus

*Jungli AI Learning Residency · Dandeli, Karnataka · Lead instructor: Alan Oliver*

## The taster in one paragraph

Two days to go from *"I've never built anything"* to a **real app you built, own,
and shipped** — and to understand the single most important move in modern AI
building: **start fast, then own your work.** Saturday you build a working app in
minutes using a chat-based builder (Lovable), then learn to pull it out and own the
code in **Claude Code**. Sunday you make the whole stack yours, add a real feature,
and put it live on your own URL. No coding, no terminal, no prior experience. It
stands completely on its own — come for the weekend, leave with something you made
and the confidence that you can do this. And if it lights you up, it rolls **straight
into the 5-day course**, which is this same move, all week, going deeper.

## Who this is for

- Total beginners who use AI casually and want to *make* something real, not just chat.
- **Weekend-first people** — the most common thing our survey respondents said they'd
  actually commit to is "I'd come for a weekend first." This is that.
- **Founders, professionals, and freelancers** who want a tangible, *useful* thing —
  the build is a real **booking / client-intake app** they could put to work.
- Anyone who quietly worries they're **"not technical enough."** You are exactly who
  this is built for. We name that fear on Day 1 and put it to bed by shipping.

**No coding experience required.** If you've never opened a terminal, good — you
won't need to.

## What you'll leave with

1. **A real app you built** — a booking/client-intake tool (form → database →
   dashboard), live on the internet.
2. **The whole stack, owned** — the code on your GitHub, running in Claude Code, the
   backend on your own account, deployed to your own URL.
3. **A feature you added yourself** — your app emails you when someone books.
4. **The core mental model** — vibe-code to *start*, Claude Code to *own and grow*;
   and the one loop you use for everything: *ask → it builds → you look → you change it.*
5. **A running start** — if you continue into the 5-day course, you arrive already
   fluent in the moves.

## The shape of the weekend

| Day | When | Theme | You leave with |
|---|---|---|---|
| **Sat** | Full day (most mentored) | **Build it & own it** | A working app, built in Lovable, running in Claude Code on your own machine |
| **Sun** | Shared cross-track day (partial instructor time) | **Make it yours & grow it** | Your own backend, an email feature you added, live on your own URL |

The weekend is a deliberate pair: **Saturday is *ownership*** — build fast, then take
the code and own it. **Sunday is *craft*** — drive the agent to grow and ship what
you own. Together they're the whole loop of building real software with AI.

---

## Day 1 — Build it & own it *(Saturday)*

**Goal:** Everyone builds a real, working app **and pulls it into Claude Code as code
they own.** This is the confidence win the whole weekend is built on.

**We'll teach (short, ~30%):**
- What Claude Code actually is, and the core loop: **ask → it builds → you look → you change it.**
- What a chat-based app builder (Lovable) is, and what it's great at — and its limits
  (metered credits, vendor lock-in).
- **The big idea: own your work.** Why, for anything you'll build for real, you move
  from a hosted builder to Claude Code — better economics, no lock-in, full control.
- The **"not technical enough" fear** — named out loud, and disproved by tonight.

**We'll build (the rest of the day):**
- A **booking / client-intake app** in Lovable from a chat prompt — a form that saves
  to a database, with a private dashboard. (Full-stack — the thing a static page can't do.)
- **GitHub-sync** it → pull it **local** → open and run it in **Claude Code**. *You now
  own the code.*
- Learn the one safety habit: **secrets stay out of git** (`.env`).

**Leave with:** an app live on Lovable *and* running on your own machine in Claude
Code — plus the realisation that you can own and change it.

**Learner guide:** [`weekend/saturday-build-and-own-your-first-app.md`](weekend/saturday-build-and-own-your-first-app.md)
· prompts: [`weekend/saturday-lovable-prompts.md`](weekend/saturday-lovable-prompts.md)

## Day 2 — Make it yours & grow it *(Sunday)*

**Goal:** Turn "I own the code" into "I own the whole thing and can grow it." Give the
app a memory, add a real feature, and ship it to your own URL.

**We'll teach:**
- **Context & memory:** a `CLAUDE.md` is the app's standing instructions — the single
  idea everything else in AI is built on, applied to *your* app.
- **Owning the backend**, not just the code — moving your database to your own account.
- **Secrets, the grown-up version** — real API keys live server-side, never in the browser or git.
- **Debugging like a pro** — when it's quiet, *get the log*, don't guess.

**We'll build (guided, instructor demos the deep parts):**
- A **`CLAUDE.md`** for the app.
- Move the backend to **your own Supabase**.
- Add **"email me when someone books"** (via Resend) — a feature the builder gated.
- **Deploy to your own Vercel URL** (optional custom domain).

**Leave with:** your app, fully owned end-to-end, emailing you, live on the internet —
and the instinct to read the log when something breaks.

**Learner guide:** [`weekend/sunday-grow-your-app.md`](weekend/sunday-grow-your-app.md)

---

## How the weekend is scheduled

Part of a **blended three-track residency**, so the two days have different rhythms:

- **Saturday = the anchored build day.** The most instructor time of the weekend. A
  short teach up front, then hands-on building with the instructor moving around the
  room. Nobody leaves without their app running in Claude Code.
- **Sunday = a shared cross-track day** with **partial instructor time** — so it runs
  from a ready guide, guided not open-ended. The instructor demos the deeper steps
  (backend, email, deploy) live; learners follow with mentor help.

Roughly **30% teaching / 70% building** across both days.

## The 7-day path — how this connects to the course

The weekend is complete on its own. It's also the **on-ramp to the 5-day course**:

- **Do just the weekend (2 days):** you leave with a real app you built, own, and
  shipped, and genuine confidence. A whole experience.
- **Continue into the course (5 more days = 7 total):** the course *is* this same move
  — driving Claude Code to build software you own — on escalating builds: a landing
  page with email capture, a linked knowledge vault, a chat agent grounded in your
  docs, your own project mentored 1:1, and shipping it. See
  [`ai-agents-track.md`](ai-agents-track.md).

For a 7-day learner the weekend is **reinforcement, not repetition**: the course
doesn't rebuild the weekend's app — it takes the *same core moves* (build, own, give it
memory, ship) onto new, richer projects. You meet the moves twice, deeper each time.

## Facilitator notes (Alan)

- **Protect the Saturday win.** If anyone leaves Day 1 without their app running in
  Claude Code, the weekend hasn't fully landed. Pre-arrival setup (see
  [`../prep/prerequisites.md`](../prep/prerequisites.md)) exists so Saturday isn't lost to installs. Add a **free
  Lovable account** to the pre-arrival checklist.
- **Name the "not technical enough" fear on Day 1** — it's real for ~1 in 3 learners
  (per the survey). Normalising it early is half the battle; shipping disproves it.
- **The build is real and useful.** A booking/intake app serves the founders and
  professionals in the room — and the instructor's demo can be a genuine tool (e.g.
  taking signups for the 5-day course).
- **Sunday's deep parts are instructor-demoed.** Backend-porting, the email function,
  and deploy are the trickier steps — demo them live; the guaranteed learner outcome is
  a `CLAUDE.md`, one real change, and a live URL. Nobody should leave stuck.
- **Teach the ownership story honestly.** Lovable (and tools like it) are a genuinely
  great on-ramp, not a villain — the lesson is *graduate to owning your work*, and the
  economics/lock-in points are real, not sales pitch.
- **Sell the continuation honestly.** The weekend is genuinely whole; the course is
  *more*, not the "real" version they missed. Both are real.
