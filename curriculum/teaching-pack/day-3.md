# Day 3 — Build a chat agent

*~2 hours structured · Build 3 (chat grounded in your docs). Goal: cross from "a
website" to "an app that does something" — a chat that answers from your context.*

Projects: [`projects/chat-agent`](../../projects/chat-agent) · live reference:
[alanoliver.dev](https://alanoliver.dev)

---

## Lesson 3.1 — What an app actually is *(concept, ~20 min)*

**Talking points:**
- The **page you see** (frontend) vs the **bit doing work behind it** (backend).
- **Data flow:** you type → it processes → you get a result.
- **Where code runs:** in your browser vs on a server.
- An **AI feature** = your app calls a model and uses the answer.

**Resources:** this deck · a whiteboard for the data-flow diagram · alanoliver.dev
as a live example of the finished thing.

**Practical task:** sketch (on paper) the data flow of the chat app you're about to
build: input → what happens → output.

**Questions:** ① Frontend vs backend, one line each. ② What's the path from typing
a question to seeing an answer?

---

## Lesson 3.2 — Build the chat grounded in your docs *(guided build, ~50 min)*

**Talking points:**
- **Load the context** — the sample persona (Sam Rivera) or your own brain.
- Build a **chat box**; on send, call the model **with that context**.
- **Keep it honest:** answer only from the context; say so if it doesn't know.
- Two flavours, same build: a *career* bot (job-seeker) or a *product* bot
  (entrepreneur).

**Resources:** [`chat-agent/skeleton/PROMPTS.md`](../../projects/chat-agent/skeleton/PROMPTS.md)
· [`sample-persona/persona.md`](../../projects/chat-agent/skeleton/sample-persona/persona.md)
· alanoliver.dev.

**Practical task:** build the chat on the sample persona and ask it questions about
"Sam."

**Questions:** ① What context are you giving the model? ② How do you stop it making
things up?

**Base prompts (from `PROMPTS.md`):**
```
Read the files in sample-persona/. Summarise what you know about this person so I
can check it's complete.
```
```
Build a simple one-page web app with a chat box. When the user sends a message,
call the LLM with the documents in sample-persona/ as context, and answer using
ONLY that context. If the answer isn't there, say so.
```

---

## Lesson 3.3 — API keys & secrets *(concept + do, ~30 min)*

**Talking points:**
- An **API** = asking another service (here, the AI model) to do something for you.
- An **API key** = your password to that service. Keep it secret.
- We use a **free OpenRouter model** — so the key is **free** (no cost barrier),
  but the secret-handling is identical. Get one via `MODEL-SETUP.md`.
- Store it in an **environment variable** / `.env`; add `.env` to `.gitignore`.
- ⚠️ **The classic disaster:** committing a key to a public repo — what happens and
  why it's bad.
- Name the **free-tier limit** out loud: ~50 requests/day per account (failed tries
  count) — wait, switch `:free` model, or add $10 for 1,000/day.

**Resources:** [`chat-agent/skeleton/MODEL-SETUP.md`](../../projects/chat-agent/skeleton/MODEL-SETUP.md)
(free OpenRouter key + `:free` model) · `.env` + `.gitignore` · this deck.

**Practical task:** put your key in `.env`, confirm `.gitignore` excludes it, and
wire the real call so the chat answers from the context.

**Questions:** ① What is an API key and why keep it secret? ② Where should a key
live, and where should it **never** go? ③ What does `.gitignore` do?

**Base prompt (from `PROMPTS.md`):**
```
Put the LLM API key in an environment variable in a .env file. Add .env to
.gitignore so it is never committed. Read the key from the environment in code —
never hardcode it.
```

---

## Lesson 3.4 — Fit-assessment + deploy *(guided, ~20 min)*

**Talking points:**
- Add the **fit-assessment**: paste a job description → a structured fit read
  (strengths, gaps, overall), grounded only in the CV.
- Entrepreneur version: a "tell me about your product/pricing" answer instead.
- **Deploy:** set the API key in **Vercel's settings**, not in the code.

**Resources:** `PROMPTS.md` (fit-assessment + deploy prompts) · Vercel project
settings.

**Practical task:** add the feature, deploy, and share the link.

**Questions:** ① Where do you put the API key when deploying? ② What's the
entrepreneur version of this app?

**Base prompts (from `PROMPTS.md`):**
```
Add a box where a recruiter pastes a job description. Return a structured fit
assessment — strengths, gaps, and an overall fit rating — based only on the CV context.
```
```
Deploy to Vercel. Add the API key as an environment variable in the Vercel project
settings, not in the code.
```

---

**End of Day 3 — students leave with:** a working, deployed chat agent on the
sample persona — and the skills to point it at their own career or product.
