# Day 2 — Drive the agent + your second brain

*~2 hours structured · Build 2 (second brain). Goal: real control over the agent,
plus a second brain that makes context & memory concrete.*

Projects: [`projects/second-brain`](../../projects/second-brain)

---

## Lesson 2.1 — Tokens & context (+ managing state) *(concept + demo, ~30 min)*

**Talking points:**
- **What a token is:** words and word-pieces. *Demo:* paste text into the
  **OpenAI tokenizer** and watch it split into tokens.
- Tokens are the unit the model **reads** *and* the unit your plan is **billed and
  limited** in.
- The **context window** = everything the agent can "see" right now, measured in
  tokens. It's finite.
- Long, messy chats fill it up → the agent gets vaguer and slower.
- **Managing state:** `/clear` to start fresh for a new task. What *persists* =
  your files + `CLAUDE.md`. What *doesn't* = the chat history.
- Rule of thumb: **one task = one focused session.**

**Resources:** OpenAI tokenizer — `platform.openai.com/tokenizer` · a sample block
of text (e.g. a CV) to paste · this deck.

**Practical task:** paste your own text into the tokenizer and see how many tokens
it is; practise `/clear` between two unrelated tasks.

**Questions:** ① What is a token? ② Why do long chats get worse over time? ③ Name
two things that persist when you `/clear`, and one that doesn't.

**Base prompt:**
```
Summarise what we've done so far in 3 bullets so I can keep it, then I'll /clear
and start fresh on the next task.
```

---

## Lesson 2.2 — Brief, plan, debug *(concept + demo, ~30 min)*

**Talking points:**
- **Brief like a teammate:** be specific, give context, say what "done" looks like.
- **Plan first:** ask for a plan before it builds; read it; steer or interrupt if
  it's heading the wrong way.
- **Read the diff** and Accept deliberately — never blindly.
- **Debug calmly:** read the actual error → give it *back* to the agent → narrow
  it down → if lost, **revert** to the last good commit.

**Resources:** this deck · the Claude app (plan mode) · a deliberately-broken
example to fix live.

**Practical task:** take a small change, ask for a plan first, then build it; then
break something on purpose and practise debugging + revert.

**Questions:** ① What three things make a good brief? ② What's the first thing you
do when something breaks? ③ When should you revert instead of pushing on?

**Base prompts:**
```
Before you change anything, give me a short plan for how you'll do this, and wait
for my OK.
```
```
This is the exact error I'm seeing: [paste]. Don't guess — find the cause, explain
it to me simply, then fix it.
```

---

## Lesson 2.3 — Build your second brain *(guided build, ~40 min)*

**Talking points:**
- A **second brain** = a folder of notes the agent can read and answer from.
- Job-seeker: your **career** (CV, projects, history). Others: your **product** or
  notes.
- **Atomic notes** (one idea each) + `[[links]]` + an `index`.
- The agent answers **only** from the vault — if it's not there, it says so.
- This is the **context** your Day-3 chat agent will answer from.

**Resources:** [`second-brain/skeleton/PROMPTS.md`](../../projects/second-brain/skeleton/PROMPTS.md)
· the [`finished/`](../../projects/second-brain/finished) Sam Rivera vault · *(optional)* Obsidian.

**Practical task:** build your own second brain from your CV/notes; then ask it 3
real questions and see if it answers only from your notes.

**Questions:** ① Why one idea per note? ② What should the agent do if the answer
isn't in your vault?

**Base prompts (from `PROMPTS.md`):**
```
Read [paste text or point to a file]. Break it into atomic markdown notes in
vault/, one idea per file, with [[links]] between related notes. Add a vault/index.md.
```
```
Using ONLY the notes in vault/, answer this the way I'd want a recruiter to hear
it: [question]. If it isn't in the vault, tell me what's missing.
```

---

## Lesson 2.4 — Models & limits on Pro *(concept, ~20 min)*

**Talking points:**
- Different models: **lighter** (Haiku/Sonnet) = fast, good for simple/repetitive
  work; **heavier** (Opus) = for genuinely hard problems.
- Using the big model for *everything* burns your limit fast.
- **Pro ($20):** usage is shared with chat and resets on a **~5-hour window + a
  weekly cap.**
- Surviving a full build day: right model for the job · `/clear` per task · don't
  leave it idle · lean on files instead of one endless chat.

**Resources:** [`prep/claude-plans.md`](../../prep/claude-plans.md) · the model
picker in the Claude app.

**Practical task:** look back at today's work — which tasks needed a heavy model,
and which would a lighter one have handled?

**Questions:** ① When would you pick a lighter model? ② What two limits apply on
Pro? ③ Name one habit that makes your plan last longer.

**Base prompt:**
```
This is a simple, repetitive edit. Which model should I use to save my usage, and why?
```

---

**End of Day 2 — students leave with:** their own second brain, the four core
skills (brief, plan, debug, save), and a real feel for tokens, context, and limits.
