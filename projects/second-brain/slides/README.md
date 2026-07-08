# Slides — Build 2 (second brain)

**Learner handout:** [`workshop-guide.md`](workshop-guide.md) — the branded,
step-by-step Day-2 take-home (tokens & context · driving the agent · build your
second brain · models & limits). Rendered to `workshop-guide.pdf` with the Jungli
document theme:

```bash
npx md-to-pdf --stylesheet ../../../brand/theme/jungli-doc.css \
  --pdf-options '{"printBackground":true,"format":"A4"}' \
  projects/second-brain/slides/workshop-guide.md
```

PPT slides for this build go here. Suggested beats to cover:

1. What a "second brain" is, and why agents need external memory.
2. The context window — what the agent can and can't see.
3. Atomic notes + links (and why messy vaults give worse answers).
4. `/clear`, and `CLAUDE.md` as standing memory.
5. The payoff: querying your brain — and how it feeds Build 3.
