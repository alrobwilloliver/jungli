# AI & Agents Track — Working Draft

*Updated June 2026. Reflects survey findings (37 responses, June 2026) and the
finalised 5-day curriculum. Earlier drafts targeting a more advanced audience
are in `draft-ai-agentic-track.md` (archived).*

---

## Which track are you applying for?

**AI & Agents — Building Real Software with Claude Code (0→1)**

---

## Who is the ideal person for your programme?

Someone who uses ChatGPT or Claude already — for writing, research, quick
questions — but hasn't built anything with AI yet and is starting to feel like
they're missing something. They have an idea they'd love to turn into a website,
tool, or app, but they've always assumed they'd need to know how to code first.

They might be a **founder, working professional, creator, freelancer, or
student**. The common thread: they have something they want to make real, and
they're not sure where to begin.

The survey (37 respondents, June 2026) made this clearer than expected. 20 of
37 use AI casually; only 6 build with it. The top pain points aren't technical —
they're *"overwhelmed by too many tools"* (17), *"know the tools but don't know
how to use them properly"* (15), and *"don't know where to start"* (7). One in
three said they worry they're *"not technical enough."*

That's exactly who this track is for. **No coding experience required.** If
you've never opened a terminal, you're in the right place.

**Not for:** engineers who already build with AI and want advanced architecture.
That is a different course. This one starts from zero.

---

## How long should the programme run?

**5-day residential sprint — Monday to Friday.**

This is the primary format. There's also a **2-day weekend taster** (Sat+Sun)
covering the first two sessions — a lower-barrier entry point for people who
want to try before committing. The taster feeds into the next 5-day cohort.

The 5-day schedule runs on a **mornings** rhythm, Monday through Friday:

- **Mon–Wed mornings:** ~3-hour sessions, one session per day, each ending with
  something *finished*. Afternoons go to the other two tracks (Creative,
  Automation). No split attention, no leftovers.
- **Thursday (Day 4):** a cross-track day — all three learning tracks run
  simultaneously. Alan is present but shared across tracks. Learners work on
  their own projects in self-directed build time, with instructors available to
  unblock.
- **Friday morning (Day 5):** final session — ship, demo, keep going.

Lunch and dinner every day are the unblocking window — bring the harder
questions there.

The **weekend taster** runs the same Sessions 1–2 content in a compressed
format: Saturday is a full day; Sunday is a shared day across all three tracks
(partial instructor time), which also gives taster participants a first taste
of self-directed project work.

---

## Sketch out a rough syllabus

The spine is **four builds**, each one consuming the previous, across five
sessions:

---

### Session 1 — Zero → a live website *(Monday morning)*

**Goal:** everyone leaves with a real website on the internet. This is the
confidence win the entire week is built on.

**Teach (short — ~30%):**
- What an LLM and an "agent" actually are, without the mysticism
- What Claude Code is and how it works: reads and writes files, runs commands,
  makes a plan, sometimes fails — that's normal
- The core loop: *ask → it builds → you look → you change it*
- Git and GitHub as save-points (plain language, no jargon)

**Build (the rest of the morning):**
- A **landing page** for your offer, portfolio, or waitlist — built with Claude
  Code from a ready, prompt-driven template
- Add a **real email signup form** (a Kit embed — no API keys needed, gentlest
  possible start)
- Push to GitHub and deploy to **Vercel** → a live URL
- Everyone texts the link to a friend

**Leave with:** a live landing page with email capture, and the realisation that
you can make the internet do things.

---

### Session 2 — Driving the agent well + your second brain *(Tuesday morning)*

**Goal:** turn yesterday's "it worked!" into real skill — briefing the agent,
managing context, debugging calmly, saving your work.

**The build that carries it:** a **second brain** — your CV, notes, or product
info turned into a structured set of files the agent reads from. This is how
context and memory become concrete, not abstract.

**Teach:**
- Tokens and context: what they are, why they matter, why long messy sessions
  go wrong — and how to manage it (the single biggest lever for beginners)
- How to brief the agent like a teammate: specific, contextual, ask it to plan
  before it builds
- CLAUDE.md: standing instructions the agent reads every session
- Debugging when it's stuck: read the error, give it back, revert if lost
- Git as a safety net: commit when things work, go back when they break

**Leave with:** a working second brain + the four core skills (brief, plan,
debug, save) + a real feel for how agents use context.

---

### Session 3 — Building a real app + the agent's powers *(Wednesday morning)*

**Goal:** cross from "a website" to "an app that does something," then get hands
on with skills and MCP — enough to make it real, not enough to drown. Also: scope
your own project so Thursday's self-directed time isn't lost figuring out what to build.

**The group build:** a one-page **chat grounded in your documents**. Everyone
builds the same app first (so nobody gets lost), then points it at their own
material. It's a recruiter bot for your CV, or a customer Q&A bot for your
product — same code, different context.

**Teach:**
- What an app actually is: the page you see vs. the thing doing work behind it
- How to call an external API and handle an API key safely (the big security
  lesson: never commit a key to GitHub — show exactly what that looks like and
  why it's bad)
- Skills and slash commands: one hands-on run together (e.g. a brainstorming
  or code skill) — this is a step change in what the agent can do
- MCP / integrations: connect one simple integration together — everyone does it

**Also:** the **scoping workshop** — each person picks a real use case and we
cut it down to something genuinely buildable. Most failures come from
over-scoped ideas, not bad code. Everyone leaves Wednesday with a one-line
definition of done and a project `CLAUDE.md` ready for Thursday.

**Leave with:** a working, deployed chat agent + a scoped project ready for
Thursday's build day.

---

### Session 4 — Your project: start building *(Thursday — cross-track day)*

**Goal:** begin building something *you* actually want, in self-directed time.
Thursday is a shared day across all three tracks — all instructors are present
and available, but no single track owns the day. Learners drive their own work;
instructors float to unblock.

**How it works:**
- **Kick-off (brief):** revisit your scoped definition of done from Wednesday;
  set a target for what you'll get running today
- **Self-directed build time:** work on your own project using everything from
  Sessions 1–3; instructors move around across all three tracks to help
- **Peer check-ins:** learners pair up at natural break points to show each
  other what they have and catch obvious problems early

For most people this is **personalising Build 3** — swapping the sample persona
for their own career or product. Others build something genuinely new.

**Leave with:** your own project started and in a demoable (even if rough) state.

---

### Session 5 — Ship, demo, keep going *(Friday morning)*

**Goal:** land the plane, celebrate the work, and hand everyone the map so they
can keep going without us.

**How it works:**
- **Final ship:** buffer to get everyone deployed; help stragglers over the line
- **Demo circle:** everyone demos — what it does, who it's for, what's still
  rough, what's next
- **The territory map:** lay out everything they now own (the Core: prompting,
  context, git, apps, deploy, keys, one skill, one MCP) vs. the wider world
  (building your own skills, subagents, evals, the Agent SDK, automation,
  scheduling) — they leave knowing the shape of what they don't yet know
- **Keep going:** managing Claude usage and cost sensibly; where to get unstuck;
  the habits that compound; how to keep building after the jungle
- **Send-off:** next project each person commits to

**Leave with:** a polished, demoed project and a concrete plan to keep building.

---

## What does a day in your programme look like?

**A structured morning (Mon, Tue, Wed, Fri):**

| Time | Block |
|---|---|
| 09:30–10:15 | Lesson — the day's concept, with live demos |
| 10:15–12:15 | Guided build — apply it immediately; instructor moves around helping |
| 12:15–12:30 | Wrap — what you shipped, blockers to raise at lunch |

Short, sharp, self-contained. Every morning ends with something *finished*.
Afternoons belong to the other two tracks; there's no spill-over.

**Thursday (Day 4 — cross-track):**

All three tracks running simultaneously. Learners work on their own projects;
instructors are present across the room. More open, more autonomous — closer to
a hackathon sprint than a structured lesson. The scoping done on Wednesday is
what makes this day productive rather than chaotic.

**A note on lunch and dinner:** the instructor is available at both every day.
The harder questions rarely come up in a formal session — bring them to the table.

Roughly **30% teaching / 70% building** across the week. Monday mornings are
heavily scaffolded (many learners have never opened a terminal); by Thursday
people are driving their own projects and the instructor is advising, not leading.

---

## What interactive or participative elements would you build in?

The programme is built around making things, not listening.

**A concrete thing to ship every day.** Small enough to finish, useful enough to
care about. No session ends without a result.

**Bring-your-own-project from Day 4.** Learners adapt everything to their real
business, audience, or idea — so it doesn't become another folder of tutorial
code that never gets opened again. This was asked for directly in the survey:
*"leaving with something tangible."*

**Debugging clinics.** We take real failures from the room and fix them
together. Bad prompts, broken builds, strange outputs — these aren't
interruptions, they're the curriculum.

**Peer testing.** Learners use each other's apps. This quickly reveals what's
actually usable vs. what only works for the person who built it.

**Demo circles.** Short daily demos so people get used to showing unfinished
work. The Day 5 showcase is the polished version; the daily rhythm keeps
momentum high and nerves low.

**Scoping clinic (Wednesday morning).** The most important practical skill:
cutting a real idea down to something one person can ship in a day. Most
failures aren't bad code — they're over-ambitious scope. Getting this right on
Wednesday is what makes Thursday's self-directed day productive.

**Shared build log.** Everyone notes what they built, what broke, what they
learnt. By the end the group has a real library of patterns and fixes.

**Lunch and dinner: instructor grabbable.** The hardest questions rarely come
up in a formal session. Mealtimes are explicitly the unblocking window.

---

## What channels and communities do you have access to?

Instagram: ~700 followers. Some Indian contacts with 20k+ Instagram followings
who may be able to share — possible but not guaranteed. Most likely path is
direct outreach via the 32 survey respondents who asked to be contacted when
applications open (32 of 37 said yes; 19 said "very likely" or "definitely").

---

## How would you package and present this programme to sell it?

Survey insight: price is the #1 blocker (21 of 37). The second-biggest fear is
*"not sure I'm technical enough"* (10). The pitch has to speak directly to both.

---

**Five days to go from zero to building real things with AI.**

You don't need to know how to code. You don't need a technical background. You
need an idea you want to make real — a website, a tool, a bot — and five days
to focus on it properly.

By Tuesday you'll have a live landing page and a working "second brain" you can
actually use. Wednesday you'll build a chat agent grounded in your own documents
— a recruiter bot for your career, or a customer Q&A bot for your product.
Thursday you start building something entirely your own, at your own pace, with
all the instructors in the room. Friday morning: demo it, ship it, know how to
keep going.

The setting matters. Being in the jungle, away from Slack and meetings and the
usual chaos, is what makes it possible to actually finish things. A small group,
real focus, a few days.

**What you leave with:**
- A live landing page with email capture (shipped Day 1)
- A second brain — your notes or product info, structured for an AI to use
- A working chat agent (career bot or customer bot), deployed live
- Your own project, started on Thursday and shipped on Friday
- Real Claude Code fluency: brief it, plan with it, debug it, ship with it —
  skills you can use immediately after you go home

**Who it's for:** founders, professionals, creators, freelancers, students —
anyone with ideas they want to turn into working tools. No coding required.

**Price:** see current cohort page for pricing in INR. Early-cohort and
team/company rates available — [see `prep/claude-plans.md` for Claude plan
options including cost-sharing approaches for price-sensitive applicants].
