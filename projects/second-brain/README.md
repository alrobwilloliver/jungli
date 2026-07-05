# Build 2 — Your second brain

The second project. Turn a pile of notes, a CV, or product info into a structured
**"second brain"** — a folder of markdown the agent can read, search, and reason
over. This is the body of context that **Build 3's chat agent answers from.**
Pairs with Build 2 in [`../../curriculum/lesson-plans.md`](../../curriculum/lesson-plans.md).

> **Two persona angles, same build:**
> - **Job-seeker** → your *career brain* (CV, projects, history) → feeds your recruiter chat bot.
> - **Entrepreneur** → your *product brain* (offer, features, FAQ) → feeds your customer chat bot.

## What it teaches

**Context & memory management** — made concrete. The vault *is* external memory:
what's not in a file, the agent doesn't know. Learners feel the context window,
`/clear`, and `CLAUDE.md`-as-standing-memory by managing a real vault.

## Tooling

Plain **markdown files** (`.md`). Optionally open the folder as an **Obsidian
vault** for a nice UI — but Claude Code only needs the files, so Obsidian is a
bonus, not a requirement.

## What's here

| Folder | What it is |
|---|---|
| `skeleton/` | Docs-only starter (`README`, `CLAUDE.md`, `PROMPTS.md`) + a one-note sample `vault/`. Learners build their own brain from the prompts. |
| `finished/` | A reference "after" — a small worked career brain for the sample persona **Sam Rivera**. |
| `slides/` | PPT slides to add. |

The sample persona (Sam Rivera) is shared with Build 3, so the two projects connect.
