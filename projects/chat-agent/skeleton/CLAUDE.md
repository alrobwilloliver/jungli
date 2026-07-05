# CLAUDE.md — chat agent (repo-local guidance)

This project builds a **web chat app** that answers questions **only** from a set
of context documents (the files in `sample-persona/`, or the learner's own brain).

Rules when building here:

- The agent must answer **only from the provided context.** If something isn't in
  the context, it says so — it never invents facts about the person or product.
- Keep the LLM **API key in an environment variable** (`.env`), add `.env` to
  `.gitignore`, and **never hardcode or commit** the key.
- Keep the build simple and deployable to **Vercel**. Prefer the least machinery
  that works.
- Support two modes:
  1. **Open Q&A** — visitor asks anything; answer from context.
  2. **Fit assessment** (job-seeker) — visitor pastes a job description; return a
     structured read (strengths, gaps, overall fit) based only on the CV context.

Context is small (one person / one product), so it goes **directly in the prompt** —
no vector database needed.
