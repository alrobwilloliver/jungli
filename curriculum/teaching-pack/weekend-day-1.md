# Weekend Day 1 (Saturday) — Build it & own it

*Full day · the most-mentored day of the weekend · Build: a **booking / client-intake
app** in Lovable, then pull it into Claude Code. Goal: everyone leaves with a working
app running on their own machine, in code they own — no exceptions.*

Learner guide: [`weekend/saturday-build-and-own-your-first-app.md`](weekend/saturday-build-and-own-your-first-app.md)
· Prompts: [`weekend/saturday-lovable-prompts.md`](weekend/saturday-lovable-prompts.md)

> Today's story: **start in the easiest tool, then own your work.** The "own it"
> move is why the whole 5-day course lives in Claude Code — today they feel why.

---

## Lesson W1.1 — Claude Code, the loop, and "own your work" *(concept, ~20 min)*

**Talking points (slides):**
- Two kinds of AI tool: a **chatbot answers**; **Claude Code does tasks** — reads and
  writes files, runs things, builds real software. This weekend it lives in the Claude
  app's **Code tab** (buttons, not a terminal).
- **The one loop you'll use all weekend:** ask → it builds → you look → you refine.
- Today has two halves: **the magic** (build fast in a chat-based builder) and **the
  point** (take it out and own it in Claude Code).
- **Name the "not technical enough" fear.** You won't write code today. If you can
  describe what you want, you can build it — and own it. Proof by tonight.

**Resources:** this deck · the Claude app open on a fresh folder (Code tab).

**Practical task:** a 2-minute "say hello" in the Code tab to prove setup works.

**Questions:** ① What can Claude Code do that a chatbot can't? ② What are the four
steps of the loop? ③ In a sentence: why *own* your work instead of leaving it in a builder?

**Base prompt:**
```
Create a file called hello.txt that says hello, then tell me what you just did and why.
```

---

## Lesson W1.2 — The magic: build a booking app in Lovable *(demo + guided build, ~50 min)*

**Talking points:**
- Demo Lovable live: describe a **booking / client-intake app** in the chat box →
  watch it build a *full-stack* app (form → database → dashboard) → it's live on a
  `*.lovable.app` URL in minutes. (Instructor's demo can be a *real* tool — e.g. taking
  signups for the 5-day course.)
- Point out what's special: it built a **backend and a database**, not just a page.
- **Let them feel the credit meter** — free tier is a few credits/day. That feeling is
  the setup for W1.3 (*why* we own it).
- Then they build their own, following the prompt guide. Booking/intake is the default;
  a lead tracker / feedback collector / event RSVP are fine variations.

**Resources:** [`weekend/saturday-lovable-prompts.md`](weekend/saturday-lovable-prompts.md)
· a free Lovable account.

**Practical task:** build your own booking/intake app in Lovable; get it live on a
`*.lovable.app` URL; make one styling change.

**Questions:** ① What did Lovable build *besides* the page? ② What happened to your
credits as you built? ③ In one line, what's your app for?

**Base prompts:** see the prompt guide (main build → look-and-feel → refine).

---

## Lesson W1.3 — Graduate it: own the code in Claude Code *(concept + do, ~40 min)*

**Talking points:**
- **The catch:** metered credits, a platform you don't control, vendor lock-in. Show
  the lock-in for real if you can (a synced Lovable project restricts even cleaning your
  own git history until you disconnect) — a tool that limits what you can do to your own
  work is one to be able to walk away from.
- **The graduation:** Lovable **GitHub-sync** → your codebase lands in *your* repo →
  pull it **local** → open and run in **Claude Code**. *You own the code now.*
- Two real things they'll hit: it runs with **Bun** (Claude handles it), and it often
  **just runs** because Lovable includes the settings.
- **The one safety habit:** secrets stay out of git. Lovable sometimes commits `.env`;
  today it's harmless, which makes it the perfect moment to build the habit.
- **The lesson:** builders are a great *on-ramp*; **Claude Code is where you own and grow.**

**Resources:** a GitHub account · the Claude app (Code tab) · the learner guide §3–4.

**Practical task:** GitHub-sync your Lovable app → clone it into Claude Code → run it
locally → fix the `.env` habit → confirm it's running on `localhost`.

**Questions:** ① What are two reasons to own the code instead of staying in Lovable?
② Where do secrets belong — and where do they *never* belong? ③ What does "it's yours"
let you do that Lovable didn't?

**Base prompts:**
```
Clone my GitHub repo [URL] into a new folder in my home directory, install its dependencies, and run it locally so I can see it. Tell me if it needs any environment variables.
```
```
Is my .env tracked by git? If so, stop tracking it (keep my local copy), add it to .gitignore, and commit. Explain why in one line.
```

---

**End of Day 1 — they leave with:** a booking app live on Lovable *and* running in
Claude Code on their own machine, plus a real grasp of *why* you own your work.
Tomorrow: make it fully yours and grow it.
