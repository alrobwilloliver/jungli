# Prompts

A build flow for your context-grounded chat agent. Small steps, commit often.

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

```text
Put the LLM API key in an environment variable in a .env file. Add .env to
.gitignore so it is never committed. Read the key from the environment in code —
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
- Each chat message calls the LLM — **watch token cost** (see `prep/claude-plans.md`).
- Never commit real personal data or your API key.
