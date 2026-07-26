# Build 2 — Your second brain

The second project. Turn a pile of notes, a CV, or product info into a structured
**"second brain"** — a folder of markdown the agent can read, search, and reason
over. This is the body of context that **Build 3's chat agent answers from.**
Pairs with Build 2 in [`../../curriculum/lesson-plans.md`](../../curriculum/lesson-plans.md).

Used two ways: the **5-day course** (Build 2, full flow) and the **weekend taster**
(Day 2 — the gentler _Weekend lite path_ at the top of
[`skeleton/PROMPTS.md`](skeleton/PROMPTS.md)).

> **Two persona angles, same build:**
>
> - **Job-seeker** → your _career brain_ (CV, projects, history) → feeds your recruiter chat bot.
> - **Entrepreneur** → your _product brain_ (offer, features, FAQ) → feeds your customer chat bot.

## What it teaches

**Context & memory management** — made concrete. The vault _is_ external memory:
what's not in a file, the agent doesn't know. Learners feel the context window,
`/clear`, and `CLAUDE.md`-as-standing-memory by managing a real vault.

## Tooling

Plain **markdown files** (`.md`) — Claude Code only needs the files. As an
optional "see it" layer, open the folder as an **Obsidian vault** for a friendly
UI and a **graph view** of your notes and links. Short cross-platform guide (with
an "extra practice" arc): [`OBSIDIAN.md`](OBSIDIAN.md). Obsidian is a bonus, not a
requirement.

## What's here

| Folder      | What it is                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `skeleton/` | Docs-only starter (`README`, `CLAUDE.md`, `PROMPTS.md`) + a one-note sample `vault/`. Learners build their own brain from the prompts. |
| `finished/` | A reference "after" — a small worked career brain for the sample persona **Sam Rivera**.                                               |
| `slides/`   | PPT slides to add.                                                                                                                     |

The sample persona (Sam Rivera) is shared with Build 3, so the two projects connect.

Optional next step: turn this vault into a bounded tool-using app in the
[Agentic Second Brain class](../agentic-second-brain/README.md).
