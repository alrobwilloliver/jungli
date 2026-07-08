---
marp: true
theme: jungli
paginate: true
---

<!-- _class: title -->
<!-- _paginate: false -->

# Ship a live site

## Jungli AI & Agents · Day 1

---

<!-- _class: section -->

# 01
## What's an agent?

---

<!-- header: 'Day 1 · Ship a live site' -->

## Chatbot answers. Agent *does*.

- The AI you've used (ChatGPT) **answers questions**.
- An **agent** does *tasks*: it **plans → acts → checks → repeats**, using tools.
- Same kind of AI underneath — but it can actually *go and do the work*.

By the weekend you'll have **built and shipped real things** — with no prior coding. That's what **0 → 1** means.

---

## Meet Claude Code

- An **agent that reads and writes files** on your computer and **runs commands**.
- This week it lives in the Claude app's **Code tab** — buttons, no terminal.
- No terminal or GitHub knowledge assumed. We start from `zero`.

Think of it as a **fast junior teammate** that needs clear instructions.

---

## The loop you'll use all week

1. **You ask** — describe what you want in plain language
2. **It plans & edits files** — you watch it work
3. **You review** — **Accept** or **Reject** each change
4. **You refine** — steer it closer

**You direct. It builds.**

---

<!-- _class: trap -->

## It's not magic

- It will **sometimes get things wrong** — that's normal.
- It's **not Google** and it's **not magic**.
- When it slips, you don't start over — you **re-steer it**.

Getting it wrong *is* the loop. Re-steering is the skill you're here to learn.

---

<!-- _class: build -->

## Say hello

Prove your setup works. In the **Code tab**, paste:

```text
Create a file called hello.txt that says hello,
then tell me what you just did and why.
```

~2 minutes. Watch it plan, act, and explain itself.

---

<!-- _class: section -->

# 02
## Build your landing page

---

## Start with the offer

Before you prompt, get clear on three things:

- **Who** is it for?
- **What's the offer?**
- **What's the *one* call-to-action?**

Say it in one line:

> I help **[who]** get **[result]** through **[offer]**.

---

<!-- _class: demo -->

## Watch me build one

I'll take that one-line offer, hand it to Claude Code, and we'll go
from a prompt to a **real landing page** together.

- The **page** appears
- The **files** it wrote
- **Accept / Reject** on each change

Then it's your turn.

---

## Anatomy of a good prompt

```text
Build a responsive one-page landing site for this offer.
Audience: […]  Offer: […]  Outcome: […]  Primary CTA: […]
Tone: [3 adjectives]  Style: [direction]
Sections: hero, problem, offer, benefits, about, FAQ, signup, footer
Constraints: plain HTML/CSS/JS, mobile-first, simple to deploy.
Leave a clear placeholder for an email signup form.
```

Be specific about **what**. Let Claude handle the **how**.

---

<!-- _class: build -->

## Build your own landing page

1. Write your offer line — real or pretend
2. Paste the build prompt from `PROMPTS.md`
3. **Read what it made** — the page, the files
4. **Make it yours** — your words, your style, change a colour

Shout if you get stuck.

---

<!-- _class: build -->

## Add the email form

A **Kit** embed — drop-in, **no API key needed**:

```text
Integrate this email signup embed into the signup section
cleanly, keeping the layout simple and responsive:
[paste Kit embed].
```

Now the page can actually **capture signups**.

---

<!-- _class: section -->

# 03
## Save it & put it live

---

## Save points: Git & GitHub

- **Why save points?** You never lose work, and you can always go back.
- **Git** = local save points (**commits**).
- **GitHub** = your code, **online and backed up**.

```text
Initialise git in this project and commit everything with the
message "My landing page". Explain each step simply as you go.
```

---

## Deploy with Vercel

- **Deploy** = put it on the internet.
- **Vercel** watches your GitHub repo and **publishes it automatically**.

The whole flow:

> **commit → push to GitHub → import to Vercel → live URL**

---

<!-- _class: build -->

## Put it live & share your URL

```text
Walk me through pushing this to a new GitHub repo and
connecting it to Vercel so it's live. Tell me exactly what
to click at each step.
```

Then **drop your live link in the group chat.** 🎉

---

<!-- _class: recap -->

## What you can do now

- Describe a build and **watch Claude Code make it**
- **Read and change** the files it creates
- Put a real page **live on the internet** with a shareable URL

You started at zero this morning. You have a live site tonight.

---

<!-- _class: title -->
<!-- _paginate: false -->

# Questions?

## You apply, you don't book.
