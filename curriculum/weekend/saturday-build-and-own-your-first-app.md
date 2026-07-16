---
title: "Saturday — Build an App, Then Own It"
subtitle: "Jungli · Weekend Taster · Day 1"
---

# Saturday — Build an App, Then Own It

**Go from an idea in a chat box to a real, working app you fully own — in one
day. No coding experience needed.**

> **The one-line story of today:** start in the *easiest* possible tool (a
> chat-based app builder), get an instant win, then learn *why and how* to take
> your work out and own it in **Claude Code**. That "own it" move is the whole
> reason the 5-day course lives in Claude Code — today you feel why for yourself.

> You'll build a small **booking / client-intake app** — a form that saves
> requests to a database, with a private dashboard to see them. It's genuinely
> useful (take signups for your work), and it shows off what these tools do best.
> By tonight it's running **on your own computer**, in code that's **yours**.

---

## What's inside

1. **The magic** — build your app in Lovable from a chat box
2. **The catch** — why you don't want to *stay* there
3. **Graduate it** — pull your app into Claude Code and own the code
4. **Tidy up** — the one habit that keeps your secrets safe
5. **What you leave with** — and where Sunday picks up
6. **Command & prompt reference**
7. **You did it** — the checklist

> **What you'll need** *(all free except the Claude plan — do the setup at home
> on good wifi)*
> - A laptop — **macOS** or **Windows**
> - The **Claude desktop app** ([claude.ai/download](https://claude.ai/download)),
>   on a **paid plan** (Pro, from $20/mo) — the free plan doesn't include the Code tab
> - A free **GitHub** account ([github.com](https://github.com))
> - A free **Lovable** account ([lovable.dev](https://lovable.dev))
> - **Node.js** LTS ([nodejs.org](https://nodejs.org)) — so your app can run locally
> - Full pre-arrival setup: [`prep/prerequisites.md`](../../prep/prerequisites.md)

---

## 1. The magic — build your app in Lovable

**[Lovable](https://lovable.dev)** builds a real, full-stack web app from a
description you type into a chat box. No setup, no terminal — you describe, it
builds, and it's live on the internet in minutes. This is the gentlest possible
on-ramp, and it's a genuine "whoa" moment.

Open Lovable, start a new project, and follow the
**[Saturday Prompt Guide](saturday-lovable-prompts.md)** — it walks you through:
- the **main build prompt** (your booking page + a private dashboard),
- an optional **look-and-feel** pass,
- and the standout feature to notice: it builds a **database and a backend**, not
  just a pretty page.

> **You'll feel the meter.** Lovable's free plan gives you a few credits a day, and
> each build spends some. That's not a nuisance — it's **the first lesson**. Hold
> onto that feeling; it's exactly *why* we graduate to Claude Code in a moment.

When your app looks right, **you're live on a `*.lovable.app` URL.** Celebrate
that — you just built a working app. Now let's make it truly yours.

---

## 2. The catch — a great start, not a home

Lovable is a brilliant place to *start*. It's not where you want to *stay*, and
it's honest to know why:

- **Credits run out.** The free tier is metered; heavy days cost money ($25/mo for
  more). Your Claude subscription, by contrast, is a flat rate with far more runway.
- **It's their platform.** Your project lives on Lovable, with a Lovable badge, and
  you have limited control over it.
- **Lock-in is real.** (You'll actually *see* this today: while your project is
  synced to Lovable, even simple things — like cleaning up your own code history —
  are restricted until you disconnect. A tool that limits what you can do to your
  own work is a tool you want to be able to walk away from.)

The fix isn't to complain about Lovable — it's to **take your code and own it.**

---

## 3. Graduate it — pull your app into Claude Code

This is the heart of the day. Your Lovable app is real code, and you can take it
with you.

### 3.1 — Push it to GitHub (your copy)
In Lovable, open the **GitHub** menu (top-right of the editor) → **Connect GitHub**
→ install/authorise the Lovable GitHub app → it creates a **new repository under
your account** with your full codebase. *Your* copy, on *your* GitHub.

Then, on the new GitHub repo, click the green **Code** button and copy the **HTTPS**
link (`https://github.com/you/your-app.git`).

### 3.2 — Pull it into Claude Code
Open the **Claude desktop app → Code tab**, open a folder in your home directory
(*not* inside any course folder), and paste:

```text
Clone my GitHub repo https://github.com/you/your-app.git into a new folder in my home directory. Then install its dependencies and run it locally so I can see it in my browser. Walk me through anything I need to click, and tell me if it needs any environment variables to run.
```

Claude clones it, installs, and starts it — usually at something like
`http://localhost:8080`. **Open that, and there's your app, running on your own
machine, in code you own.** 🎉 *That's the moment the whole weekend is built on.*

> **A couple of real things you'll hit** (and what they mean):
> - **It uses "Bun", not "npm".** Lovable ships apps that run with a tool called
>   **Bun** — Claude knows this; you don't have to. If a command needs it, Claude
>   uses it.
> - **It might already run.** Lovable includes the app's settings, so it often works
>   the moment it's cloned — connected to the database Lovable set up for you.

### 3.3 — Why bother, when it already worked in Lovable?
Because now:
- **The code is yours** — deploy it anywhere, change anything, no monthly platform fee.
- **Your Claude subscription** gives you far more building runway than metered credits.
- **You're in control** — this is where you *grow* it (that's Sunday).

> **The lesson in one line:** vibe-coding tools are a fantastic **on-ramp**;
> **Claude Code is where you own and grow.** You didn't just hear that — you did it.

---

## 4. Tidy up — the one habit that keeps you safe

When Claude opened your project, you might spot a file called **`.env`**. It holds
your app's settings, and Lovable sometimes **commits it to git** by mistake. Today
that's harmless (those particular keys are safe to be public), which makes it the
*perfect* moment to build the habit — **before** you ever have a real secret.

Ask Claude:

```text
Is my .env file tracked by git? If so, stop tracking it (keep my local copy), add it to .gitignore, and commit that. Explain why in one line.
```

> **The rule to remember:** **secrets never go in git.** A `.env` file with a real
> password or API key must be *ignored* by git, always. (And if a real secret ever
> *does* slip in, you don't just delete it — you **change the key** at the source,
> because git remembers everything.) You'll use this exact habit tomorrow when your
> app sends email.

---

## 5. What you leave with — and where Sunday goes

Tonight you have:
- An app **live on Lovable** (`*.lovable.app`) — your instant win, and
- **the same app running on your own computer, in Claude Code** — code you own.

**Tomorrow (Sunday) you make it fully yours and grow it:**
- give the app a **memory** (a `CLAUDE.md` of standing instructions),
- add a real feature — **"email me whenever someone books"**,
- and **deploy it to your own live URL** (no lock-in, no badge, no metered credits).

That "own it and keep building" is exactly what the **5-day course** does all week —
so if today lit you up, you already know what the week feels like.

---

## 6. Command & prompt reference

**Build in Lovable** → follow [`saturday-lovable-prompts.md`](saturday-lovable-prompts.md).

**Pull your app into Claude Code**
```text
Clone my GitHub repo [your repo URL] into a new folder in my home directory, install its dependencies, and run it locally so I can see it. Walk me through anything I click, and tell me if it needs environment variables.
```

**Fix the `.env` habit**
```text
Is my .env tracked by git? If so, stop tracking it (keep my local copy), add it to .gitignore, and commit. Explain why in one line.
```

**Save your progress any time**
```text
Commit the current changes with a short, clear message.
```

---

## 7. You did it

If you followed today, you now have:

- [ ] An app **built in Lovable** from a chat box, live on a `*.lovable.app` URL
- [ ] The same app **cloned to your computer and running in Claude Code**
- [ ] Real understanding of **why you own the code** (economics, no lock-in, control)
- [ ] The **secrets-stay-out-of-git** habit, practised on a safe example

**Total cost:** a paid Claude plan (from $20/mo). Everything else today is free.

The best part? This move — *build fast, then own it* — works for **any** app idea
you'll ever have. Tomorrow, you make it truly yours.

*Built for the Jungli AI Learning Residency · Weekend Taster · Day 1.*
