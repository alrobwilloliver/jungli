# Email Capture Demo

Docs-only starter repo for building a simple email-capture landing page with Claude Code.

## Purpose

Use this repo as a clean starting point when you want to:

- build a one-page landing page from prompts
- keep the stack plain HTML/CSS/JS
- integrate a real email signup flow with Kit
- demo the workflow live without framework overhead

This repo intentionally starts without site files. The point is to test how easily Claude Code can generate the project from a small set of prompts and constraints.

## What Is In Here

- `README.md`: repo purpose and workflow
- `CLAUDE.md`: repo-local guidance for Claude Code
- `PROMPTS.md`: prompts, intake questions, and a simple build flow
- `.gitignore`: minimal ignores

## Suggested Workflow

1. Start in this repo with Claude Code.
2. Read `PROMPTS.md`.
3. Use the intake questions to define the offer.
4. Ask Claude Code to generate the site files.
5. Refine copy, layout, and CTA.
6. Add a Kit form embed.
7. Deploy the static site.

## Git Flow For A Real Build

If you use this as a starter for a new project:

1. Copy the project files to a new folder.
2. If the new folder does not already contain `.git`, run `git init`.
3. Run `git status` to confirm the starting state.
4. Make the first docs or scaffold changes.
5. Run `git add .`
6. Run `git commit -m "Initial landing page scaffold"`
7. Continue iterating in small commits as the site takes shape.

If you stay in this repo, it is already initialized with git.

## Notes

- Prefer plain static files unless there is a clear reason to add tooling.
- Keep the first version narrow: one offer, one audience, one CTA.
- Treat the email signup as a real part of the product, not a placeholder.
