# Build 1 — Landing page with email capture

The first project in the track. A plain **HTML/CSS/JS** landing page with a real
**email signup**, deployed live. Pairs with Build 1 in
[`../../curriculum/lesson-plans.md`](../../curriculum/lesson-plans.md).

> **Why it's a great opener:** the offer-building intake makes it personal, the
> stack is the simplest possible (no framework, no Node), and it ends with a live
> URL — the Day-1 confidence keystone.

## What's here

| Folder | What it is |
|---|---|
| `skeleton/` | The **starting point** — docs only (`README`, `CLAUDE.md`, `PROMPTS.md`). Learners begin here and build the site *from the prompts*, so they generate it themselves rather than copy it. |
| `finished/` | A **reference build** — the same page completed, using a **Kit embed form** (no API key needed). For the instructor and for learners who get stuck. |
| `slides/` | `workshop-guide.pdf` (the step-by-step) + PPT slides to add. |

## Email provider: Kit (formerly ConvertKit)

- `finished/` uses a **Kit embed script** (`*.kit.com`) — drop-in, **no API key**,
  perfect for beginners.
- The original workflow demo used the **ConvertKit API** (`api.convertkit.com`),
  which needs an API key — keep that as the *advanced* variant once API keys are
  taught in Build 3, not Day 1.

## Deploy

Target **Vercel** (static site) for consistency with the rest of the track.

## Teaching flow (from `skeleton/PROMPTS.md`)

1. Intake questions → reduce to *"I help [audience] get [result] through [offer]."*
2. First build prompt → generate the page.
3. Refine copy/layout/CTA in small commits.
4. Add the Kit embed form.
5. Deploy → live URL.
