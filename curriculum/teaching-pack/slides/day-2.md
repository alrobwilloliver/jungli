---
marp: true
theme: jungli
paginate: true
---

<!-- _class: title -->
<!-- _paginate: false -->

# Drive the agent + your second brain

## Jungli AI & Agents · Day 2

---

<!-- _class: section -->

# 01
## Tokens & context

---

<!-- header: 'Day 2 · Drive the agent + your second brain' -->

## What's a token?

- A **token** is a word or a word-piece — the chunks the model reads.
- It's the unit the model **reads**, *and* the unit your plan is
  **billed and limited** in.

Tokens are the "money" and the "memory" of the whole system. Worth a feel for.

---

<!-- _class: demo -->

## See it: the tokenizer

Paste a block of text into the **OpenAI tokenizer** and watch it
split into tokens.

`platform.openai.com/tokenizer`

Try a paragraph of your CV — notice how many tokens it becomes.

---

## The context window

- The **context window** = everything the agent can see *right now*, in tokens.
- It's **finite**.
- Long, messy chats fill it up → the agent gets **vaguer and slower**.

More isn't better. A focused window is a sharp agent.

---

## Managing state: `/clear`

- Starting a new task? **`/clear`** to wipe the chat and start fresh.
- **Persists:** your **files** + `CLAUDE.md`.
- **Doesn't persist:** the **chat history**.

```text
Summarise what we've done in 3 bullets so I can keep it,
then I'll /clear and start fresh on the next task.
```

**One task = one focused session.**

---

<!-- _class: section -->

# 02
## Brief, plan, debug

---

## Brief like a teammate

To get good work, give a good brief:

- Be **specific** about what you want
- Give the **context** it needs
- Say what **"done"** looks like

Vague in, vague out. You're the senior here.

---

<!-- _class: demo -->

## Plan first

Ask for a **plan before it builds**. Read it. Steer or interrupt
if it's heading the wrong way.

```text
Before you change anything, give me a short plan for how
you'll do this, and wait for my OK.
```

Cheaper to fix a plan than to unpick a wrong build.

---

<!-- _class: trap -->

## Accept deliberately

- **Read the diff** — the changes it wants to make.
- **Accept** on purpose, never blindly.
- If it's not what you meant, say so *before* accepting.

You approve every step. That's the job.

---

## Debug calmly

When something breaks, don't panic — work it:

1. **Read** the actual error
2. **Give it back** to the agent
3. **Narrow it down** together
4. Still lost? **Revert** to the last good commit

```text
This is the exact error: [paste]. Don't guess — find the
cause, explain it simply, then fix it.
```

---

<!-- _class: section -->

# 03
## Build your second brain

---

<!-- _class: build -->

## First: start your own copy

> Build in **your own folder**, not the course textbook.

```text
Make a new folder "my-second-brain" in my home directory —
NOT inside the jungli course folder. Copy the second-brain
skeleton (with vault/) into it, start a fresh git repo.
```

---

## What's a second brain?

- A **folder of notes** the agent can read and answer from.
- **Atomic notes** — one idea per file — with `[[links]]` and an `index`.
- Yours might be your **career** (CV, projects) or your **product**.

This becomes the **context** your Day-3 chat agent answers from.

---

<!-- _class: demo -->

## Capture: CV → notes

Watch me turn a document into a linked vault:

```text
Read my CV. Break it into atomic markdown notes in vault/ —
one idea per file, with [[links]] between related notes.
Add a vault/index.md.
```

One messy document becomes a tidy, linked brain.

---

<!-- _class: build -->

## Your turn: build it, then ask it

1. Build your brain from your **CV or notes**
2. Ask it **3 real questions**:

```text
Using ONLY the notes in vault/, answer this: [question].
If it isn't in the vault, tell me what's missing.
```

Does it answer only from *your* notes?

---

<!-- _class: trap -->

## Only from the vault

- The agent answers **only** from what's in your notes.
- If the answer **isn't there**, it should **say so** — not invent it.

Grounded answers you can trust beat confident guesses.

---

<!-- _class: section -->

# 04
## Models & limits

---

## Right model for the job

- **Lighter** (Haiku / Sonnet) — fast, great for simple or repetitive work.
- **Heavier** (Opus) — for genuinely hard problems.
- Using the big model for *everything* **burns your limit** fast.

```text
This is a simple, repetitive edit. Which model should I use
to save my usage, and why?
```

---

## Limits on Pro

- **Pro ($20):** usage is **shared** with your normal Claude chats.
- It resets on a **rolling window** *plus* a **weekly cap**.
- Make it last: right model · `/clear` per task · don't leave it idle ·
  lean on **files**, not one endless chat.

---

<!-- _class: recap -->

## What you can do now

- **Drive** the agent: brief → plan → read the diff → debug → revert
- Manage **tokens, context, and limits** so it stays sharp
- Built your **second brain** — notes the agent answers from

Next: a **chat agent** grounded in your brain.

---

<!-- _class: title -->
<!-- _paginate: false -->

# Questions?

## You apply, you don't book.
