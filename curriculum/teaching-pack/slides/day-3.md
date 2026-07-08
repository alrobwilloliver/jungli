---
marp: true
theme: jungli
paginate: true
---

<!-- _class: title -->
<!-- _paginate: false -->

# Build a chat agent

## Jungli AI & Agents · Day 3

---

<!-- _class: section -->

# 01
## What an app actually is

---

<!-- header: 'Day 3 · Build a chat agent' -->

## Frontend & backend

- **Frontend** — the page you *see* and click.
- **Backend** — the bit doing the work *behind* it.
- **Where code runs:** some in your **browser**, some on a **server**.

Today you cross from *a website* to *an app that does something*.

---

## The data flow

Every app is the same shape:

> **you type → it processes → you get a result**

An **AI feature** is just one kind of "processes":
your app **calls a model** and uses the answer.

---

<!-- _class: demo -->

## See the finished thing

Here's where we're headed — a live chat that answers from
*someone's* real context:

**alanoliver.dev**

Watch it answer, and notice when it *won't* — that honesty is the point.

---

<!-- _class: build -->

## Sketch your data flow

Before any code, draw it **on paper**:

1. What goes **in**? (a question)
2. What **happens**? (call the model with your context)
3. What comes **out**? (a grounded answer)

Three boxes and two arrows. That's your app.

---

<!-- _class: section -->

# 02
## Build the chat, grounded

---

<!-- _class: build -->

## First: start your own copy

> Build in **your own folder**, not the course textbook.

```text
Make a new folder "my-chat-agent" in my home directory — NOT
inside the jungli course folder. Copy the chat-agent skeleton
(with sample-persona/) into it, start a fresh git repo.
```

---

## Choose your context

The chat answers from **documents you give it**. Same build, two flavours:

- **Career bot** (job-seeker) — your CV & projects, or your Day-2 brain.
- **Product bot** (entrepreneur) — your offer, features, FAQ.

Today we use the sample persona, **Sam Rivera**.

---

<!-- _class: demo -->

## Load the context

First, make sure the agent has read the material:

```text
Read the files in sample-persona/. Summarise what you know
about this person so I can check it's complete.
```

If the summary is right, the context is loaded.

---

<!-- _class: build -->

## Build the chat box

```text
Build a one-page web app with a chat box. On send, call the
LLM with the docs in sample-persona/ as context, and answer
using ONLY that context. If it's not there, say so.
```

Ask it about **Sam** — and try a question it *can't* know.

---

<!-- _class: section -->

# 03
## API keys & secrets

---

## What's an API key?

- An **API** = asking another service (the AI model) to do something for you.
- An **API key** = your **password** to that service.
- Calling the model costs money — the key is tied to **your bill**.

So it has to stay **secret**.

---

<!-- _class: build -->

## Wire the key safely

```text
Put the LLM API key in a .env file. Add .env to .gitignore
so it's never committed. Read the key from the environment —
never hardcode it.
```

`.env` holds the secret · `.gitignore` keeps it off GitHub.

---

<!-- _class: trap -->

## Never commit a key

- The classic disaster: a key **pushed to a public repo**.
- Once it's in Git history, it's there **forever** — and bots scan
  public repos for keys and **run up your bill**.
- Leaked one? **Revoke it immediately** and make a new one.

`.env` + `.gitignore`, every time. No exceptions.

---

<!-- _class: section -->

# 04
## Fit-assessment + deploy

---

<!-- _class: build -->

## Add the fit-assessment

```text
Add a box where a recruiter pastes a job description. Return
a structured fit assessment — strengths, gaps, overall — based
only on the CV context.
```

*Entrepreneur version:* a "tell me about your product & pricing" answer.

---

<!-- _class: build -->

## Deploy it

```text
Deploy to Vercel. Add the API key as an environment variable
in the Vercel project settings, not in the code.
```

**The key lives in Vercel's settings — never in the code you push.**

---

<!-- _class: recap -->

## What you can do now

- Explain an app: **frontend, backend, data flow**
- Build a **chat grounded in your context** — honest, not guessing
- Handle an **API key** safely: `.env`, `.gitignore`, Vercel settings
- **Deployed** a real app you can point at your own career or product

Next: **your own project** — scoped and shipped.

---

<!-- _class: title -->
<!-- _paginate: false -->

# Questions?

## You apply, you don't book.
