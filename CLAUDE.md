# CLAUDE.md — Jungli AI & Agents Track

> Context for any Claude session working in this repo. Read this first.

## What this is

This repo is the **teaching material for the "AI & Agents" track** of the
**Jungli AI Learning Residency** — a residential program held in rural India
(Dandeli, Karnataka / Jungli Nomad Village). It is owned by **Alan Oliver**,
the lead instructor for this track.

The residency runs **three tracks** with three educators:
1. **Creative** — AI video, content, storytelling (another teacher)
2. **Automation** — productivity, workflows, no/low-code automation (another teacher)
3. **AI & Agents — this repo** — building real software with **Claude Code**, taught 0→1 (Alan)

This repo eventually becomes the **GitHub teaching repo** that residents on
Alan's track clone and work from. Everything here is Markdown so Claude Code
and the residents can read it directly.

## Who the learners actually are (from the survey)

37 prospective applicants were surveyed (June 2026). Full extract +
aggregates: [`source/survey-responses.md`](source/survey-responses.md).
Headline findings that drive every design decision:

- **Beginner-to-intermediate, not advanced.** 20/37 use AI "casually"; only
  ~6 build anything and only 4 call themselves advanced. → Teach from **zero**.
- **Pain is orientation, not optimisation:** "overwhelmed by too many tools"
  (17), "know tools but don't know how to use them properly" (15), "don't know
  where to start" (7).
- **Low coding appetite:** the largest group wants **no-code** (10); few want
  advanced projects (8). Many fear they're **"not technical enough"** (10).
- **Price is the #1 blocker (21).** Most are price-sensitive (₹15k–25k or less).
- **They want tangible outcomes:** an automation/project they can use, plus
  confidence and clarity.

## Locked design decisions

| Decision | Choice | Why |
|---|---|---|
| Format | **5-day residential sprint** | Matches the residency + a top-picked format |
| Formats (dual) | **2-day weekend Foundation + 5-day course = a 7-day path** | Two *standalone* products, stackable (Sat+Sun taster, then Mon–Fri course). **Weekend REDESIGNED 2026-07 (supersedes the old "basic landing page → second-brain lite"):** the weekend now teaches **"vibe-code it, then own it."** Sat: build a **booking/intake app in Lovable** → GitHub-sync → pull into Claude Code (own the code). Sun: give it a `CLAUDE.md`, move the backend to your own Supabase, add an **email-on-booking** feature (Resend + edge function), deploy to your own Vercel URL. This is genuinely *different* content from course Days 1–2 (not a subset) — a standalone "tool graduation" story that also motivates why the course lives in Claude Code. 7-day overlap = **reinforcement of the core moves** (build, own, give-it-memory, ship), not a repeated build. Obsidian dropped from the weekend (stays in the course second-brain). Design spec: `docs/superpowers/specs/2026-07-11-weekend-taster-redesign-design.md`. See `curriculum/weekend-foundation.md` + `curriculum/weekend/`. |
| Schedule | **Mon→Fri sprint + Sat/Sun taster** | 5-day sprint = Mon–Fri. Mon–Wed are structured morning sessions (Alan teaches); Thu = cross-track day (all 3 tracks simultaneously, learners self-direct their own project, instructors float); Fri morning = ship + demo. Weekend taster = Sat (full day) + Sun (shared cross-track day, partial instructor time). Alan has a full-time job — mornings only on weekdays. *Pending team confirmation of exact dates.* |
| Level | **Claude Code spine, taught 0→1** | Audience is mostly beginners; assume no terminal/GitHub |
| Tool surface | **Claude desktop app (Code tab), not the terminal** | Beginners use buttons; the app bundles Claude Code; terminal/web are power-user surfaces. Onboarding = paste `setup-prompt.md` into the app |
| Capstone | **Two trophies + a foundation** | (1) a live personal site everyone ships, (2) each learner's own real project, mentored — underpinned by genuine Claude Code fluency |
| Deploy host | **Vercel** | One beginner-friendly account that carries static sites → real apps |
| Pedagogy | **Just-in-time concepts, two tiers (Core hands-on / Map awareness), `concept→demo→build→trap` beat** | Going 0→1 with agents needs structured concept teaching, not "watch me vibe." See `curriculum/lesson-plans.md` |
| Agent layer (skills/MCP) | **Guided demo: one skill + one MCP hands-on (Wed/Session 3), deeper only per Thu project** | Exciting but time-hungry; breadth without drowning beginners |
| Build spine | **Four asset-backed projects: landing page (Kit) → second brain → chat agent → own project**, each as `skeleton/`+`finished/`+`slides/` | Reuses Alan's real demos; serves both job-seeker and entrepreneur personas; each build consumes the previous |
| Prep scope | **Shared baseline + this track** | Common onboarding reusable by all 3 tracks, plus Claude Code/GitHub specifics |

**Considered & dropped:** a Telegram cohort "course brain" agent (instructor-built
Hermes). Explored thoroughly, but Alan decided against it — don't resurface unless
he raises it. The **lesson-plan schedule & in-depth structure are under Alan's own
review** for delivery; leave them for him to shape.

The original, more advanced draft (vector DBs, Hermes Agent, idempotency) was
**deliberately re-levelled down** — it targeted the ~15% advanced tail. See
[`source/draft-ai-agentic-track.md`](source/draft-ai-agentic-track.md) for the
original, preserved for reference.

## Repo map

```
CLAUDE.md                      ← you are here
README.md                      ← human-facing overview
brand/                         ← Jungli slide branding: Marp theme + brand guide + starter deck
curriculum/
  ai-agents-track.md           ← the 5-day syllabus (learner-facing)
  weekend-foundation.md        ← the 2-day weekend taster syllabus (learner-facing)
  lesson-plans.md              ← instructor teaching script: concept→demo→build→trap per session
  teaching-pack/               ← slide-ready lessons: talking points + tasks + base prompts (day-1..5 + weekend-day-1..2 + README)
projects/                      ← build-along projects (each: skeleton/ + finished/ + slides/)
  email-landing-page/          ← Build 1: landing page + Kit email capture (from Alan's demo)
  second-brain/                ← Build 2: context/memory as a markdown vault (+ OBSIDIAN.md optional frontend)
  chat-agent/                  ← Build 3: chat grounded in your docs (career/product bot)
prep/
  prerequisites.md             ← SHARED baseline for all residents (pre-arrival)
  setup-mac.md                 ← Claude desktop app + Node + GitHub on macOS
  setup-windows.md             ← Claude desktop app + Node + Git + GitHub on Windows
  setup-prompt.md              ← copy-paste prompt: Claude checks Node/Git + makes a test file
  claude-plans.md              ← which Claude plan; the running-out-of-credit problem
source/
  draft-ai-agentic-track.md    ← Alan's original draft (archive)
  survey-responses.md          ← survey extract + aggregates
  *.docx / *.xlsx              ← untouched originals
```

## Working conventions

- **Tone:** plain, encouraging, un-mystical. The reader may have never opened a
  terminal. Never assume prior coding knowledge in learner-facing docs.
- **Cross-platform always:** every setup instruction must cover **macOS AND
  Windows**. Don't write Mac-only steps.
- **Verify fast-moving facts.** Claude Code install steps and plan limits change
  often; check official docs (docs.anthropic.com, anthropic.com/pricing) before
  asserting versions, prices, or commands rather than relying on training data.
- **Markdown only** for deliverables; keep originals in `source/` untouched.
- **Currency:** prices in ₹ (INR) for participants; Claude plans in USD.

## Status

- [x] Source materials extracted to Markdown (`source/`)
- [x] Design agreed (see "Locked design decisions")
- [x] `CLAUDE.md`, `curriculum/ai-agents-track.md`, `README.md`
- [x] `prep/` guides — install steps + plan facts verified against official docs (June 2026)
- [x] `curriculum/lesson-plans.md` — detailed instructor teaching script (concept spine)
- [x] `curriculum/teaching-pack/` — all 16 lessons fleshed out (talking points, resources, practical tasks, questions, base prompts), re-fit to **~2h structured/day** (~10–15h total). Personal project: scoped Day 4, built in open time, planning method taught Day 5. Alan to turn each day into slides + edit.
- [x] `projects/` scaffolded — Build 1 (email-landing-page, **Kit**) copied from Alan's demo; Build 2 (second-brain) + Build 3 (chat-agent) skeletons authored with a shared sample persona (**Sam Rivera**). ⚠️ Do NOT copy real CV / personal data into the repo.
- [ ] Confirm Mon→Fri calendar + Sat/Sun taster format with the other two teachers (Thu cross-track day needs coordination)
- [ ] Build `finished/` references for second-brain & chat-agent (chat-agent: privacy-safe, sample persona; live ref = alanoliver.dev)
- [ ] Pick + test the demo skill (superpowers) and the demo MCP for Saturday
- [ ] Copy the remaining real project files in (clean working builds for each project) when ready
- [x] `git init` + pushed **private** to `github.com/alrobwilloliver/jungli` (2026-07-05); survey `.xlsx` gitignored (applicant PII). Commits use repo-local identity `Alan Oliver <49719658+alrobwilloliver@users.noreply.github.com>`. Making it **public** for residents = later (recheck survey extract first).
- [x] `brand/` slide kit — Marp theme + brand guide + starter deck, extracted from junglithenomad.com. Build decks: `npx @marp-team/marp-cli DECK.md --theme-set brand/theme/jungli.css -o out.html`.
- [x] **Weekend REDESIGNED + authored (2026-07):** `curriculum/weekend-foundation.md` (syllabus) + `curriculum/weekend/` learner guides (`saturday-build-and-own-your-first-app.md`, `sunday-grow-your-app.md`, `saturday-lovable-prompts.md`) + `teaching-pack/weekend-day-1..2.md` (instructor scripts) — all around the Lovable → own-it arc. Alan **dogfooded the entire flow** (real booking app at `~/alan-s-appointment-book`: Lovable → GitHub → Claude Code → own Supabase → email-on-booking → live on Vercel). Obsidian dropped from the weekend; stale second-brain cross-links fixed.
- [ ] **Next up (weekend): build the Sat + Sun slide decks** in `curriculum/weekend/slides/` using the Jungli Marp theme.

### Verified facts baked into `prep/` (June 2026 — re-check before each cohort)
- **Primary surface = the Claude desktop app's Code tab** (GUI, buttons), NOT the terminal CLI. Download: `https://claude.ai/download`. The app **bundles Claude Code** — no separate CLI install. (Terminal CLI + web are power-user surfaces; CLI install still exists: Win `irm https://claude.ai/install.ps1 | iex`, Mac `curl -fsSL https://claude.ai/install.sh | bash`.)
- **Paid plan required for the Code tab** — Free does NOT include Claude Code. Pro ($20/mo) is the floor; Max 5× from $100/mo.
- **Node.js**: install **one current LTS** via nodejs.org (NOT nvm — needless complexity for beginners). Needed only so the web projects run, not for the Claude app itself.
- **Git**: present on Mac by default; on Windows install Git for Windows (the desktop app needs it for local sessions).
- **Onboarding** = a copy-paste `setup-prompt.md` users run in the Code tab; it *detects-and-guides* (won't attempt risky OS installs).
- Helping price-sensitive participants: Team seats or Console/API keys (NOT login sharing — against ToS).
- Docs at **`code.claude.com`**; pricing at `claude.com/pricing`.
