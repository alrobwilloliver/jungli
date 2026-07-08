# Prompts

A build flow for your context-grounded chat agent. Small steps, commit often.

## 0. Start your own copy — do this first

> **Don't build inside the course folder.** The `jungli` repo you cloned is a
> read-only textbook: you can't push to it, and you don't want to. Your work
> lives in its own folder that *you* own and will deploy.

Paste this into the Code tab to spin up your own project:

```text
Make a new folder called "my-chat-agent" in my home directory — NOT inside the
jungli course folder. Copy the starter files from the chat-agent skeleton in the
course repo into it (including the sample-persona/ folder). Then initialise a fresh
git repo there and make a first commit ("Start my chat agent"). Confirm we're now
working in my-chat-agent, not in the course repo.
```

You'll push this to your *own* new GitHub repo and deploy it on Vercel. It stays yours.

## 1. Choose your persona

- **Job-seeker:** context = your career (CV, projects) from your Build-2 brain.
- **Entrepreneur:** context = your product (offer, features, FAQ).

## 2. Load the context

```text
Read the files in sample-persona/ (or my brain vault). Summarise what you know
about this person/product so I can check it's complete.
```

## 3. Build the chat UI

```text
Build a simple one-page web app with a chat box. When the user sends a message,
call the LLM with the documents in [folder] as context, and return an answer that
uses ONLY that context. If the answer isn't in the context, say so.
```

## 4. API key & secrets (the real lesson here)

**First get a free key:** [`MODEL-SETUP.md`](MODEL-SETUP.md) walks you through a
free **OpenRouter** account, an API key, and picking a `:free` model — so this
costs nothing. Then wire it in safely:

```text
Put the OpenRouter API key in an OPENROUTER_API_KEY variable in a .env file. Add
.env to .gitignore so it's never committed. Read the key from the environment —
never hardcode it.
```

## 5. Add the "fit assessment" feature (job-seeker version)

```text
Add a second box where a recruiter pastes a job description. Return a structured
fit assessment — strengths, gaps, and an overall fit rating — based only on the
CV context.
```

## 6. Deploy

```text
Deploy to Vercel. Add the API key as an environment variable in the Vercel project
settings (not in the code).
```

## 7. Guardrails

- Answer **only** from context; if unknown, say so.
- Each chat message is a real **API call**. We use a **free OpenRouter model**
  ([`MODEL-SETUP.md`](MODEL-SETUP.md)) — mind the **~50 requests/day** free limit
  (add $10 of credits for 1,000/day if you need more).
- Never commit real personal data or your API key.
