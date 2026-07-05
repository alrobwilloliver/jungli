# Build 3 — Chat agent grounded in your docs

The third project, and the flagship. A web page with a **chat** where a visitor
asks questions and gets answers grounded in a body of context — the **Build 2
brain**. Pairs with Build 3 in [`../../curriculum/lesson-plans.md`](../../curriculum/lesson-plans.md).

> **Two personas, identical build:**
> - **Job-seeker** → a recruiter chats with your *career agent*; paste a job
>   description → a **fit assessment**. Live reference: **[alanoliver.dev](https://alanoliver.dev)**.
> - **Entrepreneur** → a customer chats with your *product agent* about your offer/FAQ.

It builds on **Build 1** (the site it lives on) and **Build 2** (the brain it
answers from).

## Why it's 0→1-feasible

**One person's CV — or one small product — fits in the context window.** No vector
database, no embeddings, no RAG infrastructure: you just put the documents into the
model's context. That keeps it buildable for beginners *and* ties straight back to
the Build-2 context lesson.

## ⚠️ Privacy

The real alanoliver.dev uses Alan's actual CV. **This skeleton uses a made-up
persona, Sam Rivera**, so it's safe in a public repo. Never commit real personal
data (CVs, salary goals, client info) here — swap in your own only in your private
copy.

## What it teaches

What an app is (frontend/backend, data flow) · calling an **LLM API** · **API keys
& secrets** · grounding answers in provided context · deploy to Vercel.

## What's here

| Folder | What it is |
|---|---|
| `skeleton/` | Docs-only starter + `sample-persona/` (Sam Rivera) to build against. |
| `slides/` | PPT slides to add. |
| *(live)* | **[alanoliver.dev](https://alanoliver.dev)** is the working reference build. |
