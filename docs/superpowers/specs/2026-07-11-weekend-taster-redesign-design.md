# Weekend Taster Redesign — "Vibe-code it, then own it"

*Design doc · 2026-07-11 · Jungli AI Learning Residency · AI & Agents track (Alan Oliver)*

## Problem

The weekend taster (2-day Foundation) was originally designed as a *lighter clone*
of course Days 1–2 — Saturday: a basic landing page; Sunday: a second-brain lite.
On review, Alan decided the weekend should teach **something genuinely different**,
not a stripped-down subset. This overrides the locked decision in
[`CLAUDE.md`](../../../CLAUDE.md) ("Weekend = Sat: basic landing page → Sun:
second-brain lite").

The weekend also needs proper **learner-facing, in-depth guides** — beginners
currently have only instructor scripts and a syllabus, no take-home handout of the
kind the 5-day course ships (`projects/*/slides/workshop-guide.md`).

## Who it's for (unchanged)

Total beginners who use AI casually and fear they're "not technical enough."
Price-sensitive. Want a tangible outcome and confidence. The weekend is a
**standalone product** — some learners do only the weekend, some only the 5-day,
some all 7 days. It must not depend on the `projects/` course folders.

## The new concept: tool graduation

Instead of a smaller version of the course, the weekend tells a **story about
graduating tools**:

> Start in the easiest possible tool (a chat-based app builder), get an instant
> win, then learn *why and how* to own your work — which is exactly why the 5-day
> course lives in Claude Code.

This reframes the two foundational moves (**ship a thing** / **give it a memory**)
around **owning your stack**, so a 7-day learner gets *conceptual reinforcement,
not a repeated build*.

**Concept spine across the weekend:**
vibe-coding → ownership → economics & lock-in → driving the agent →
context/memory (`CLAUDE.md`) → deploy anywhere.

## Verified facts (2026-07-11 — re-check before each cohort)

Lovable (`lovable.dev`), the Saturday tool:
- **Free tier:** 5 credits/day (~150/month), cloud hosting, up to 5 `lovable.app`
  domains. Free projects are **public** and carry a **Lovable badge**. Each prompt
  ≈ 1 credit; a basic app ≈ 5–15 credits — so the meter is *felt* quickly.
- **Paid:** Pro from **$25/month** (100 credits). Metered credits = the concrete
  contrast against a flat Claude subscription.
- **GitHub sync:** exports the full codebase to a repo the user controls
  (bidirectional). From there: deploy anywhere (Vercel/Netlify/etc.), edit freely
  in Claude Code. This makes the whole "port it out and own it" arc real.
- **Email is Pro-gated (confirmed live 2026-07-11).** Lovable has built-in email
  (no API key to paste), BUT sending from *your own domain* requires **Lovable Pro**
  ($25/mo): *"Set up email domain — not available in your plan."* This paywall is a
  **teaching asset**, not an obstacle — it's the cleanest live demonstration of the
  weekend's thesis (the free platform meters you → own the code and do it yourself).
  The design deliberately does **not** send email in Lovable; email is added **free
  in Claude Code on Sunday** via a self-owned email service (verify your own domain
  free, send from `notify@yourdomain`).

## Day-by-day design

### Saturday — Get it & own it

1. **The magic (Lovable):** describe a **client intake / booking app** in a chat
   box → it builds a *full-stack* app (form → database → a dashboard of
   submissions) → **live** on a `lovable.app` URL in minutes. Zero setup. The
   confidence win; name the "not technical enough" fear here.
2. **The catch:** you feel the meter (5 free credits/day, an app eats 5–15). Your
   project lives on their platform, with their badge, limited control.
3. **The graduation:** turn on **GitHub sync** → full codebase in a repo *you* own
   → pull it **local**, open in **Claude Code**. You now own the code.
4. **The lesson:** vibe-coding tools are a great *on-ramp*; **Claude Code is where
   you own and grow** — flat subscription vs. metered credits, no vendor lock-in,
   deploy anywhere.

**Leave with:** an app **live** (on Lovable) *and* the same code **owned locally**
in Claude Code.

**Build target — grounded in the survey.** The room is majority
**founders/entrepreneurs (13) + working professionals (10)**, whose top wants are
*automate repetitive work (24), business operations (21), build apps (19)* and who
ask to "leave with something **tangible** they can use." So the build is a small
**business/work tool**, not a personal page (which would also overlap course
Build 1) or a hobby toy:

- **Default:** a **client intake / booking app** — a form saved to a database with
  a simple list/dashboard of submissions. Instantly useful to freelancers,
  consultants, coaches, and founders. Showcases Lovable's **full-stack** strength
  (the thing a static page can't show).
- **Menu (same build process, different content):** lead/waitlist tracker,
  feedback/testimonial collector, event RSVP. Learners pick the one closest to
  their real work; a lightly-mentored room stays manageable because only the
  *content* differs.

**Instructor demo is real, not pretend.** Alan builds the actual **residency
intake/booking app** live — the one that takes signups for the 5-day track — then
ports *that* into Claude Code so Sunday's "drive & grow" runs on a genuine tool with
real context. The demo being real (not a toy) is part of the lesson: this is how you
actually make something you'll use.

> **No personal data in the repo.** The committed learner guide sends the
> notification to `[your email]`. Do **not** hardcode Alan's personal address
> (`alanoliver.dev@gmail.com`) — the repo goes public for residents. Alan wires his
> real email into his own demo build only.

### Sunday — Drive it & grow it

1. **You own a real codebase now** — today you learn to *direct* Claude Code on it.
2. **Give Claude a memory:** add a `CLAUDE.md` of standing instructions — the
   foundational context/memory idea, applied to *your* app.
3. **Grow it — add "email me when someone books":** the concrete Sunday payoff.
   Drive Claude Code to add an email notification to the intake app: brief it →
   read the diff → accept deliberately → test. A real, exciting feature that shows
   *owning the code* lets you extend it beyond what you first vibe-coded.
4. **Deploy it as yours:** push to **Vercel** → your *own* live URL, no lock-in.
   The ownership payoff made concrete.
   - **Optional "make it truly yours" stretch — custom domain.** Vercel supports
     custom domains in a few clicks. The guaranteed learner path stays the free
     `*.vercel.app` URL (most beginners won't own a domain); a custom domain is an
     optional callout. **Instructor demo:** Alan points `booking.alanoliver.dev`
     (a subdomain of his own `alanoliver.dev`) at the deployed app — the ultimate
     "no lock-in" proof: Saturday you're on `*.lovable.app` (their platform, their
     badge), Sunday you're on a domain *you own*. His intake form emails him and/or
     links to his calendar.
5. **The bridge:** "own it and keep building" is what the 5-day course does all week.

**Leave with:** your app on your *own* Vercel URL, a `CLAUDE.md` you wrote, an email
notification you added yourself, and the core Claude Code loop.

**Complexity note (email) — the paywall is the point.** In Lovable, own-domain email
is **Pro-gated** (see Verified facts). So learners *deliberately* hit that wall on
Saturday and add email **free in Claude Code on Sunday** using a self-owned email
service (e.g. verify your domain free, send from `notify@yourdomain`). This is the
weekend thesis made concrete: don't keep paying the platform — own the code and wire
it yourself. Keep the **guaranteed** Sunday outcome achievable even if email gets
fiddly — `CLAUDE.md` + one real change + deploy to Vercel; the app already saves
every booking to its dashboard without email. When a key is involved, teach the
light env-var / "never commit secrets" habit in passing (the course goes deep in
Build 3). Instructor demo: Alan can either upgrade Lovable Pro OR (on-message) add
the email himself in Claude Code — the latter is the honest demo for a
price-sensitive room.

**Sunday scheduling reality (unchanged):** shared cross-track day, partial
instructor time → runs from a ready guide, guided not open-ended. The Vercel deploy
is the anchored payoff; growing the app absorbs faster finishers.

## Deliverables & file changes (full-redesign scope)

**New — learner guides** (self-contained, house-style of
`projects/*/slides/workshop-guide.md`: front-matter, "What's inside", "What you'll
need" callout, numbered sections with copy-paste prompt blocks, blockquote
callouts, prompt reference, final checklist, Jungli footer; cross-platform; names
the fear; honest "what's next → 5-day course"):

- `curriculum/weekend/saturday-build-and-own-your-first-app.md`
- `curriculum/weekend/sunday-grow-your-app.md`

**Independence requirement:** these must not require anything from `projects/`.
A weekend-only learner lives entirely in `curriculum/weekend/`. The one external
pointer allowed is the optional Obsidian note — dropped in this redesign unless it
earns a place (see Open questions).

**Updated:**

- `curriculum/weekend-foundation.md` — rewrite the syllabus around the new arc
  (magic → catch → graduation on Sat; drive → grow → deploy on Sun). Keep the
  standalone-product + 7-day-path framing; replace the "output/input" pairing with
  the "get it & own it / drive it & grow it" pairing.
- `CLAUDE.md` — update the locked-decision table row for the weekend and the
  "Weekend Foundation" status line to reflect the Lovable-based design + rationale;
  note it supersedes the earlier second-brain-lite weekend.
- `curriculum/teaching-pack/weekend-day-1.md` — rewrite instructor script
  (concept→demo→build→trap beat) for the Lovable → own-it Saturday.
- `curriculum/teaching-pack/weekend-day-2.md` — rewrite for the drive-&-grow Sunday.

**Fix stale cross-links** (they claim the weekend builds a second brain):
- `projects/email-landing-page/slides/workshop-guide.md:12`
- `projects/second-brain/slides/workshop-guide.md:13`
- Any "weekend lite path" references in `projects/second-brain/skeleton/PROMPTS.md`
  and `curriculum/weekend-foundation.md` that assume the old design.

**Out of scope (dropped from the taster; still taught in the 5-day course):**
email/Kit capture, the API bonus, the tokens deep-dive, the CV-based full vault,
models/usage-limits depth.

## Prerequisites impact

Saturday now needs the local toolchain **earlier** than the old design (the port
happens Saturday, not built-from-scratch locally). Pre-arrival setup already covers
the Claude app, Node, Git, GitHub, Vercel (`prep/`). New addition: learners create
a **Lovable free account** before Saturday. The guide's "What you'll need" section
must list it; `prep/` may need a one-line mention (flag for follow-up, not
necessarily this pass).

## Risks & mitigations

- **Port-to-local is the hard part for beginners.** Saturday is the most-mentored
  day and setup is done pre-arrival, so it's feasible — but the guide must make the
  GitHub-sync + clone steps click-by-click, and the instructor floats. If a learner
  stalls, they still leave **live on Lovable** (the win is preserved).
- **Lovable free-tier limits / badge / public projects** may frustrate. The guide
  should set expectations up front and frame the limits as *the very reason* to
  graduate to Claude Code — turning a constraint into the lesson.
- **Fast-moving facts** (Lovable pricing, credits, GitHub-sync UI). Guide writes
  facts as "check current" where they may drift; re-verify before each cohort.
- **Two live URLs may confuse** (Lovable URL Sat, Vercel URL Sun). Frame clearly:
  Saturday = live on *their* platform; Sunday = live on *yours*. The contrast is
  the point, not an accident.
- **Assume no existing website or domain.** Most learners won't have either, so
  anything that presumes one is an **optional extra, never the main path**: brand-
  matching defaults to "describe a vibe / let Lovable style it" (matching an existing
  site is an opt-in aside), and the guaranteed deploy target is a free `*.vercel.app`
  URL (custom domain is the optional "make it truly yours" stretch). The **instructor
  demo** carries the branded + custom-domain version (`booking.alanoliver.dev`); the
  learner path never requires owning a site or domain.

## Open questions (resolve during writing)

1. **Obsidian:** RESOLVED — dropped from the weekend. It belonged to the
   second-brain build; the new Sunday buffer is "grow the app further" (extra
   features / polish the dashboard).
2. **Saturday build:** RESOLVED — client intake / booking app (default) + menu
   (lead/waitlist tracker, feedback collector, event RSVP). Email notification is
   Sunday's grow-it feature, not Saturday.
3. **Exact learner-guide filenames** (proposed above; confirm on write).
4. **PDF generation:** main-track guides ship `.md` + `.pdf`. User had no
   preference. Default: markdown first; generate PDFs later once content is
   reviewed.
5. **`prep/` Lovable account:** DECIDE in the plan — add a one-line "create a free
   Lovable account" to `prep/prerequisites.md` this pass, or file as a tracked
   follow-up. Saturday now depends on a Lovable account existing pre-arrival.

## Success criteria

- A weekend-only beginner can follow `curriculum/weekend/` end-to-end with no
  reference to `projects/`, and leave Saturday **live** and Sunday **owning +
  deploying** their app.
- Repo is internally consistent: no doc claims the weekend builds a second brain.
- `CLAUDE.md` records the superseded decision and the new rationale.
- The weekend honestly motivates the 5-day course (why Claude Code) without
  creating a dependency on it.
