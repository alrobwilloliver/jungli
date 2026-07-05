# Chat agent — skeleton (start here)

A docs-only starting point. You build the chat app *from the prompts*, grounded in
a set of context documents.

## How to use

1. Start Claude Code in this folder.
2. Read `PROMPTS.md`.
3. Use `sample-persona/` (Sam Rivera) as your context to build against — or point
   it at **your own** Build-2 brain (your career, or your product).
4. Build the chat UI, wire it to an LLM with the context, add the fit-assessment
   feature, then deploy.

## Stack & keys

A simple web app (the track shows one approach; alanoliver.dev uses Next.js). It
calls an **LLM API**, so you'll set up an **API key** — and learn to keep it in an
environment variable, never committed. This is where the API-keys/secrets lesson
becomes real.

## Swap personas

- **Job-seeker:** context = your CV/bio/projects → recruiter Q&A + JD fit check.
- **Entrepreneur:** context = your product/offer/FAQ → customer Q&A.
