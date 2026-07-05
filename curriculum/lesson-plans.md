# AI & Agents Track — Instructor Lesson Plans

*The teaching script for the 5-day track. Pairs with the learner-facing
[`ai-agents-track.md`](ai-agents-track.md). This is where the **concepts** live —
sequenced, just-in-time, anchored to each build.*

---

## How to use this document

The whole track runs on three teaching rules. Hold them and the firehose of
concepts becomes teachable for true beginners.

1. **Just-in-time.** Never teach a concept as abstract theory. Teach it at the
   exact moment a build needs it. By the time you explain git, they've already
   lost an edit and *want* save-points.

2. **Two tiers — Core vs Map.** This is how we beat *"they won't know what they
   won't know."*
   - 🟢 **Core** — taught **and practised hands-on** until they can do it alone.
   - 🗺️ **Map** — named, demo'd once, and placed on a map of the territory, so
     they know it *exists* and roughly when to reach for it, even without mastery.

3. **The micro-beat.** Every mini-build follows the same four moves, so it's
   structured teaching, never "watch me vibe":

   > **Concept** (why it exists) → **Demo** (you build it, narrating the
   > technique) → **You build** (they do it) → **Trap** (the thing you've
   > internalised that they'd never notice).

**Timings are a guide, not a script** — they assume a ~3-hour weekday morning and
a full weekend day. Adjust to the room; protect the end-of-session shippable.

**Legend:** 🟢 Core · 🗺️ Map · ⚠️ Trap to name out loud · 🧰 Prep needed

---

## The four builds (asset-backed)

The spine is **four projects that each consume the previous one.** Each lives in
[`/projects`](../projects) as `skeleton/` (start here) + `finished/` (reference) +
`slides/`. The same arc serves two personas — **job-seeker** and **entrepreneur**.

| # | Build · folder | Teaches | Persona payoff |
|---|---|---|---|
| 1 | **Landing page + email** · `projects/email-landing-page` | the loop (build → git → deploy → live URL) + a real **Kit** signup | an offer / portfolio page |
| 2 | **Second brain** · `projects/second-brain` | **context & memory** — the agent reading files | the context Build 3 answers from |
| 3 | **Chat agent (grounded)** · `projects/chat-agent` | apps · **LLM API + keys** · grounding answers in context | recruiter bot *or* product bot |
| 4 | **Your own project** · *(theirs)* | scoping + just-in-time depth | usually a personalised Build 3 |

**Order:** landing page first — it ships live on Day 1 via the Kit *embed* (**no
API key**), the gentlest possible start; the **API-key** lesson lands properly in
Build 3. Each build's `skeleton/PROMPTS.md` is the in-class script.

---

## Two formats: a weekend taster & the 5-day

This track is **one foundation in two formats** — the 2-day taster isn't a separate
course, it's the foundational core of the 5-day.

- **🌱 Foundation (the weekend taster).** The core Claude Code skills + **Build 1
  (landing page)** and **Build 2 (second brain)**, plus token/context/limit
  literacy. Learners leave able to drive the agent and ship a simple site. This is
  **Sessions 1–2's material**, delivered over a compressed weekend.
- **🚀 Extension (5-day only).** **Build 3 (chat agent)**, the skills/MCP demo, and
  the **mentored personal-project** weekend build — **Sessions 3–5**. This is where
  the 5-day goes beyond the taster.

**Focus for now: the 5-day** (below). The taster can be carved out of the Foundation
later — likely co-designed with the Automation and Arts instructors so all three
tracks share one taster. Foundation beats are usable as-is for it.

---

## Session 1 — Zero → a live website
*Thursday morning · ~09:30–12:30*

**Goal:** every learner has a website live on a real URL **by the end of the
morning**. This is the confidence keystone — protect it.

**By the end they can:** open a terminal and start Claude Code · ask it to build
something and review what it did · save to GitHub · deploy to a live URL.

🧰 **Prep:** everyone has completed `prep/` (Claude **app** + paid plan, Node,
GitHub + Vercel, setup prompt run). Have a backup plan for 1–2 broken setups
(pair them up; fix at lunch).

| Time | Beat | Content |
|---|---|---|
| 09:30–09:50 | **Concept** 🟢 | **What's an agent, and why Claude Code is one.** An LLM predicts text; an *agent* loops: **plan → act → observe → repeat**, using tools (it reads/writes files on your computer and runs commands). Claude Code is that agent — this week it lives in the **Claude app's Code tab** (buttons, not the terminal). Demystify failure: it tries, sometimes gets it wrong, you correct it — that's normal, not you breaking it. ⚠️ Name now: *"It is not Google and it is not magic. It's a junior teammate who types fast and needs clear instructions."* |
| 09:50–10:10 | **Demo** 🟢 | Instructor builds a one-page site live. Narrate **the core loop**: *prompt → it edits files → you read the result → you refine.* Include a deliberate "that's not what I meant → here's how I re-steer it" moment. Introduce the **Code tab**: pick a folder, type a request, and use **Accept** on each change. |
| 10:10–11:00 | **You build** 🟢 | From `projects/email-landing-page/skeleton`, each learner runs the **offer intake** (`PROMPTS.md`) → Claude Code generates their landing page → drop in the **Kit email-signup embed** (no API key). Paired; instructor floats. ⚠️ Trap: *vague prompts.* Coach "be specific, give context." |
| 11:00–11:15 | **Concept** 🟢 | **Git & GitHub = save-points.** Why version control exists (so you never lose work and can always go back). What a commit is, what "pushing to GitHub" means — in plain words, no jargon. |
| 11:15–11:40 | **You build** 🟢 | Claude Code does the git for them, **but they say what each step is for**: commit ("save point"), push ("copy to GitHub"). They see their code appear on github.com. |
| 11:40–12:00 | **Concept + Demo** 🟢 | **Deployment = putting it on the internet.** What "live" means; how Vercel watches your GitHub repo and publishes it. Demo connecting one repo. |
| 12:00–12:25 | **You build** 🟢 | Deploy to Vercel → **live URL**. Everyone shares their link in the group chat. 🎉 The keystone moment. |
| 12:25–12:30 | **Wrap + Traps** | Recap the loop. ⚠️ Traps to name: not *reading* what the agent did; forgetting to commit before a big change. Blockers to bring to lunch. |

🗺️ **Map (mention, don't teach):** permission modes (Ask vs Auto-accept) exist;
the **terminal CLI** and **web** versions are the same tool on other surfaces (power-user options).

---

## Session 2 — Driving the agent well
*Friday morning · ~09:30–12:30*

**Goal:** turn yesterday's "it worked!" into **control** — the agent does what
they mean, and they can recover when it gets stuck. **The build that carries it:
your second brain** (`projects/second-brain`), which makes context and memory concrete.

**By the end they can:** brief the agent and ask for a plan first · manage context
· use CLAUDE.md · review/accept deliberately · commit & revert as a safety net ·
debug calmly.

| Time | Beat | Content |
|---|---|---|
| 09:30–09:55 | **Concept + Demo** 🟢 | **Tokens & context — the agent's working memory.** Start with **what a token is**: paste text into the **OpenAI tokenizer** (`platform.openai.com/tokenizer`) and watch words split into tokens — the unit the model reads *and* the unit your plan is billed in. Then the **context window**: the agent only "knows" what's in front of it, measured in tokens, so long messy sessions fill up and degrade. **Manage it:** `/clear` between unrelated tasks; keep requests focused. The single biggest lever for beginners. ⚠️ Trap: *the bloated mega-session that slowly goes senile.* |
| 09:55–10:15 | **Concept + Demo** 🟢 | **Brief it like a teammate + plan first.** Asking for a **plan** before it builds (plan mode); reading the plan; steering and interrupting mid-task instead of letting it run off. |
| 10:15–10:35 | **Concept + Demo** 🟢 | **CLAUDE.md & memory.** Give the project standing instructions the agent reads every time (your style, your stack, your rules). Show how it changes behaviour. |
| 10:35–11:20 | **You build** 🟢 | From `projects/second-brain/skeleton`: capture source material (CV/notes, or product info) into **atomic linked notes** + an index. Practise the full beat: *brief → plan → build → review the diff → commit*; `/clear` between tasks. ⚠️ Trap: *accepting changes blindly* — make them actually read a diff. |
| 11:20–11:45 | **Concept + Demo** 🟢 | **Debugging when it's stuck.** The calm method: read the actual error → give it *back* to the agent → narrow it down → if lost, **revert** to the last good commit. Do a deliberate break-and-fix live. |
| 11:45–12:05 | **You build** 🟢 | **Query the brain** using only the vault — gaps and broken links surface immediately; practise debugging them, and `revert` if a reorganise goes wrong. The point: *the vault is the agent's memory.* |
| 12:05–12:20 | **Concept** 🟢 | **Models, limits & managing state — surviving a full build day.** Which model when: a **lighter model** (Haiku/Sonnet) for simple, repetitive work; a **heavier one** (Opus) for genuinely hard problems — using the big model for everything burns your limits fast. On **Pro ($20)**, usage is shared with chat and resets on a **~5-hour window + a weekly cap**, so across a day of many sessions, **manage your state**: start a fresh session (`/clear`) per new task, lean on files + `CLAUDE.md` as durable memory rather than one endless chat, and don't leave the agent running idle. ⚠️ Trap: *burning the day's limit on Opus for trivial edits.* See `prep/claude-plans.md`. |
| 12:20–12:30 | **Wrap + weekend setup** | Recap the four skills (brief, plan, debug, save). Seed the weekend: *"Start noticing one real thing in your work or life you wish existed."* |

---

## Session 3 — Building a real app (+ the agent's powers)
*Saturday · full day · ~09:30–17:30 (lunch 12:00–13:00)*

**Goal:** cross from "a website" to "an app that *does* something," then meet the
agent-extension layer with **one skill and one MCP, hands-on** — enough to make it
real, not enough to drown.

**By the end they can:** explain what an app is made of · call an external API ·
handle an **API key safely** · add an AI feature · run a prebuilt skill · connect
one MCP integration · have a **scoped project** ready for Sunday.

🧰 **Prep:** have the **chat-agent build** ready (`projects/chat-agent`), an **LLM
API key** for the demo, and the sample persona to hand. Have `superpowers` (or your
chosen skill/plugin) and one simple MCP server picked and tested.

> **The group build = the chat agent (`projects/chat-agent`).** Everyone builds the
> same thing: a one-page **chat grounded in a set of documents** (the sample
> persona, **Sam Rivera**) — open Q&A plus a **fit-assessment** box (paste a job
> description → a structured fit read). It hits every teaching target: input → **LLM
> API + key** → answer grounded in context → output → deploy. Same app for everyone
> so nobody gets lost; on Sunday they swap in *their own* brain (career or product).

| Time | Beat | Content |
|---|---|---|
| 09:30–10:00 | **Concept** 🟢 | **What an app actually is.** The page you see (frontend) vs the bit doing work behind it (backend); how data flows: *you type → it processes → you get a result*; where code runs. Whiteboard it. |
| 10:00–10:20 | **Demo** 🟢 | Instructor scaffolds the chat app from `projects/chat-agent/skeleton`, narrating choices. |
| 10:20–11:30 | **You build** 🟢 | Everyone builds the same chat app, grounded in `sample-persona/` (Sam Rivera), step by step. Instructor sets the pace so the room stays together. |
| 11:30–12:00 | **Concept + You build** 🟢 | **APIs, keys & secrets.** What an API is (asking another service for data); get a key; **store it safely** — environment variable / `.env`, and `.gitignore` so it never hits GitHub. ⚠️ **The big one:** *committing a secret key to a public repo.* Show what that looks like and why it's bad. Then wire the real **LLM call** so the chat answers from the persona's context. |
| 12:00–13:00 | **Lunch** | Instructor grabbable. |
| 13:00–13:40 | **Concept + You build** 🟢 | **Add the fit-assessment feature** (paste a job description → a structured fit read, grounded only in the CV) and **deploy** to a live URL. Now it's a real, shareable thing. |
| 13:40–14:30 | **Guided demo** 🗺️→🟢 | **Skills & slash commands — the agent's power-ups.** What a skill is (a packaged capability/workflow the agent can use). Install/run **superpowers**; everyone runs **one** skill hands-on (e.g. brainstorming or a code task). Name *why* this is a step-change. |
| 14:30–15:15 | **Guided demo** 🗺️→🟢 | **MCP / integrations.** What MCP is (a standard way to plug the agent into external tools and data). Connect **one** simple MCP together; show the agent using it. Everyone connects it. ⚠️ Trap: *treating skills/MCP as magic* — keep tying back to the agent loop. |
| 15:15–16:30 | **Scoping workshop** 🟢 | The most important hour. Each person names a real use case (work or life); instructor helps **cut it down** to one-day-buildable. They write a one-line "definition of done" + start a project `CLAUDE.md`. ⚠️ Trap: *over-scoping* — "an app like Uber" → "a page that does the one useful bit." |
| 16:30–17:30 | **Open build** | Start building tomorrow's project; unblock; set up for Sunday. |

🗺️ **Map:** plugins (skills bundled together), subagents — name them as "next."

---

## Session 4 — Your project: 0 → 1
*Sunday · full day · ~09:30–17:30 (lunch 12:00–13:00)*

**Goal:** each learner builds **their own real project** with you mentoring — and
**concepts are taught per-person, just-in-time**, as their specific project
demands them. This is where the depth lands, personalised. For many, that's
**personalising Build 3** — swapping the sample persona for their own career or
product — while others build something new.

**By the end they can:** scope, build, and ship their own thing, and reach for the
right concept/tool for their problem.

| Time | Beat | Content |
|---|---|---|
| 09:30–10:00 | **Kick-off** 🟢 | Recap scoping. Set the day's frame: *deploy something small early, then improve it.* Define "done for today" with each person. |
| 10:00–12:00 | **Build block 1** 🟢 | Everyone builds; instructor floats **1:1**. This is where you teach *per person, in context*: whoever needs an **API/integration** learns MCP/keys properly now; whoever needs **data** learns where it lives; etc. Just-in-time, on their real problem. |
| 12:00–13:00 | **Lunch** | Grabbable. |
| 13:00–13:30 | **Patterns clinic** 🟢 | Pause the room. Surface the **common failures** that came up this morning — better prompts, when to start a piece over, cutting scope mid-build. Turn individual struggles into shared lessons. |
| 13:30–16:00 | **Build block 2** 🟢 | Deep build. Keep protecting scope. ⚠️ Trap: *rabbit-holing one feature* and *gold-plating instead of shipping.* |
| 16:00–17:00 | **Polish + deploy** 🟢 | Everyone gets their project to a deployed, demoable state. |
| 17:00–17:30 | **Soft demos / peer testing** | Small groups try each other's projects — the fastest way to find what's actually usable. |

**Facilitation:** resist building it *for* them — guide, don't grab the keyboard.
The win is *they* did it. 🗺️ As advanced needs appear (auth, databases, multi-step
agents), name the tool and place it on the map rather than rabbit-holing.

---

## Session 5 — Ship, demo & the map
*Monday morning · ~09:30–12:30*

**Goal:** land the plane, celebrate the work, and hand them **the map of the whole
territory + a learning path** — the real cure for "they won't know what they won't
know."

| Time | Beat | Content |
|---|---|---|
| 09:30–10:00 | **Final ship** 🟢 | Buffer to get everyone deployed. Help stragglers over the line. |
| 10:00–11:00 | **Demo circle** | Each person demos: what it does · who it's for · what's still fragile · what's next. Short, supportive, real. Peer testing. |
| 11:00–11:40 | **The territory map** 🗺️ | The payoff. Lay out **everything**: what they now own (the Core — prompting, context, git, apps, deploy, keys, one skill, one MCP) vs the wider world (advanced MCP, **building your own skills**, plugins, subagents, evals, the Agent SDK, automation/scheduling). *"Here's what you can do, here's what's out there, here's the path to it."* They leave knowing the shape of what they don't yet know. Name the **"agent as teammate" paradigm** (Karpathy's third UIUX shift — the LLM as a persistent teammate, not a website or app) as where this all heads. |
| 11:40–12:10 | **Keep going** 🟢 | **Managing Claude usage & cost** — recap tokens → limits → **model choice** (light model for simple work, heavy for hard) and managing state across sessions to stretch a Pro plan (point to `prep/claude-plans.md`) · where to get unstuck (docs, communities) · the habits that compound · how to keep learning after the jungle. |
| 12:10–12:30 | **Send-off** | Next project each person commits to · staying in touch · the door's open for the hard stuff. |

---

## Concept coverage map (at a glance)

Quick check that every concept from the inventory has a home and a tier.

| Concept | First taught | Tier |
|---|---|---|
| Agent loop / Claude Code as agent | S1 | 🟢 |
| Core loop (prompt→diff→iterate) | S1 | 🟢 |
| Prompting / briefing | S1→S2 | 🟢 |
| Terminal / CLI basics | S1 | 🟢 |
| Files & projects | S1 | 🟢 |
| Git & GitHub | S1→S2 | 🟢 |
| Deployment (Vercel) | S1 | 🟢 |
| Context window & management | S2 | 🟢 |
| Plan mode / steering | S2 | 🟢 |
| CLAUDE.md & memory | S2 | 🟢 |
| Reviewing diffs / permissions | S2 | 🟢 |
| Debugging method | S2 | 🟢 |
| Tokens (what they are + cost) | S2 | 🟢 |
| Models & choosing one for the task | S2→S5 | 🟢 |
| Usage limits & managing state (Pro) | S2→S5 | 🟢 |
| What an app is (frontend/backend) | S3 | 🟢 |
| Calling APIs | S3 | 🟢 |
| API keys & secrets | S3 | 🟢 |
| Adding an AI feature | S3 | 🟢 |
| Skills & slash commands (superpowers) | S3 | 🗺️→🟢 (one, hands-on) |
| MCP / integrations | S3 | 🗺️→🟢 (one, hands-on) |
| Scoping | S3→S4 | 🟢 |
| Per-project depth (auth, data, etc.) | S4 | 🟢 (just-in-time) |
| Plugins · subagents · evals · Agent SDK · automation | S4→S5 | 🗺️ |

If a future edit adds a concept, give it a session and a tier here first.
