# Slides — Build 3 (chat agent)

**Learner handout:** [`workshop-guide.md`](workshop-guide.md) — the branded,
step-by-step Day-3 take-home (what an app is · build the grounded chat · API keys
& secrets · fit-assessment · deploy). Rendered to `workshop-guide.pdf` with the
Jungli document theme:

```bash
npx md-to-pdf --stylesheet ../../../brand/theme/jungli-doc.css \
  --pdf-options '{"printBackground":true,"format":"A4"}' \
  projects/chat-agent/slides/workshop-guide.md
```

PPT slides for this build go here. Suggested beats to cover:

1. What an app is (frontend / backend / data flow) — the un-mystical version.
2. Calling an LLM API, and grounding answers in provided context.
3. API keys & secrets — env vars, `.gitignore`, never commit a key.
4. The fit-assessment feature (job-seeker) vs product Q&A (entrepreneur).
5. Deploy to Vercel; set the key in project settings.
6. Cost awareness — every message is an API call.
