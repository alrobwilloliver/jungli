---
title: "Sunday — Make It Yours & Grow It"
subtitle: "Jungli · Weekend Taster · Day 2"
---

# Sunday — Make It Yours & Grow It

**Yesterday you built an app and pulled it into Claude Code. Today you make it
*fully* yours — your own backend, a new feature you add yourself, and your own live
URL on the internet.**

> **Yesterday was "get it & own the code." Today is "drive it & grow it."** You'll
> direct Claude Code to change a real app — and watch it do things Lovable made you
> pay to unlock. This is the same loop the 5-day course uses all week.

> **A note on today's pace.** Some of this is genuinely deeper than Saturday —
> databases, a bit of backend, deploying. **That's fine.** Claude Code does the
> heavy lifting; you drive in plain English. Your instructor will demo the trickier
> steps live. If you get every step, brilliant. If you get the core — a `CLAUDE.md`,
> one real change, and a live URL — you've won the day. Nobody leaves stuck.

---

## What's inside

1. **Give your app a memory** — a `CLAUDE.md`
2. **Own the backend too** — move to your own database
3. **Grow it** — add "email me when someone books"
4. **When it's quiet, get the log** — how to debug like a pro
5. **Deploy it as yours** — your own live URL
6. **What you leave with**
7. **Command & prompt reference** · 8. **You did it**

> **What you'll need:** everything from Saturday (your app running in Claude Code),
> plus free accounts you'll make as you go: **[Supabase](https://supabase.com)**
> (your database) and **[Resend](https://resend.com)** (sends the email), and a
> **[Vercel](https://vercel.com)** account (publishes your app).

---

## 1. Give your app a memory — `CLAUDE.md`

An AI only knows what's in front of it. A **`CLAUDE.md`** file is a note Claude Code
reads **every time** — your app's standing instructions: what it is, how it's built,
how you like to work. It's the single most useful thing you can add.

```text
Look at this project and write a CLAUDE.md that explains, for future sessions: what this app is, its tech stack, how to run it, where the important files are, and any rules for working in it. Keep it short and clear.
```

Read what it writes — it's a surprisingly good summary of your own app. From now on,
every Claude Code session starts already understanding your project. *That's the
"context and memory" idea the whole of AI is built on, made real on your app.*

---

## 2. Own the backend too

Here's a twist worth knowing. Yesterday you owned the **code**. But your app's
**database** may still be sitting on the builder's platform (a "managed" backend),
where you can't fully control it. Owning your app means owning the backend too.

Your instructor will show this live; the shape of it:

1. Make a free project in **your own [Supabase](https://supabase.com)** account.
2. Ask Claude Code to **rebuild your database tables** there (your app already
   carries the recipe — a `migrations` folder — so it's a copy-paste, not a rewrite).
3. Point your app at your new database (a couple of settings in `.env`).

```text
My app's database is on the builder's managed backend and I want it on my own Supabase project instead. Walk me through it step by step: what to create, how to rebuild my tables from the migrations folder, and which settings to change — one step at a time.
```

> **Why this matters:** a real tool you'll run for years shouldn't live on infra you
> can't log into. Now the *whole stack* — code and data — is yours.

> **Beginner-friendly reality:** this is the deepest part of the weekend. Lean on
> your instructor and on Claude Code here. If you'd rather keep the builder's
> backend for the taster and just do steps 1 and 3 below, that's completely fine —
> the point is to *see* how ownership works, not to fight networking.

---

## 3. Grow it — "email me when someone books"

The payoff: a feature you add *yourself*, that the builder wanted to charge you for.
Right now a booking just sits in your dashboard — let's make your app **email you**
the moment one comes in.

The plan (Claude Code builds it; you direct):
- a small **server-side function** sends the email when a booking is created,
- it uses **[Resend](https://resend.com)** (free) to actually send,
- and — the important habit — the Resend **secret key lives server-side**, never in
  the app's browser code or in git.

```text
When someone submits the booking form, I want an email sent to me with the booking details. Set this up using Resend and a server-side function. Tell me exactly what to create in Resend and Supabase, keep the API key as a server-side secret (never in the browser or committed to git), and walk me through it one step at a time.
```

> **🔑 The grown-up version of yesterday's habit.** A Resend key is a *real* secret —
> so it goes in a **server-side secret store**, not the app's `.env` (anything in the
> app's `.env` can end up visible in the browser). Same principle as Saturday, one
> level up.

> **First emails often land in Spam.** When you send from a brand-new setup, Gmail is
> suspicious. Check your **Spam** folder, hit **"Not spam"**, and it learns fast.
> That's normal, not a bug.

---

## 4. When it's quiet, get the log

Sometimes you do everything right and *nothing happens* — no error, no email, just
silence. This is the most useful debugging lesson of the weekend:

> **Don't guess. Get the log.** Every step of a system leaves a trail. When something's
> silent, find the record of what actually happened — then you *know* where it stopped
> instead of guessing.

For the email feature there are two logs worth knowing (your instructor will show them):
- **The webhook log** (in Supabase) — did the booking actually trigger the function,
  and what did it return? A `200` means "sent"; anything else tells you where it broke.
- **Resend's log** — did the email actually go out, and was it *delivered* or *bounced*?

Nine times out of ten the log turns a frustrating mystery into a one-line fix. Learning
to reach for it — instead of poking randomly — is a real developer skill you just picked up.

```text
The email isn't arriving. Don't guess — help me check the logs: whether the booking triggered the function and what it returned, and whether Resend actually sent it. Then we'll fix whatever the logs show.
```

---

## 5. Deploy it as yours — your own live URL

The finale: put your app on the internet on a URL **you** control.

**[Vercel](https://vercel.com)** publishes your app and gives you a live link — and
because your app is on **your** GitHub, every future change you push **redeploys
automatically.**

```text
I want to deploy this app to Vercel on my own account and get a live URL. Walk me through it: connect my GitHub repo, set the environment variables it needs, and deploy. Tell me exactly what to click.
```

In a minute or two you have a real URL like `your-app.vercel.app` — live, public,
yours. Text it to someone.

> **Optional "make it truly yours" — a custom domain.** If you own a domain, Vercel
> lets you put your app on it (e.g. `booking.yourname.com`) with one DNS record.
> Most people won't have a domain yet, and that's fine — the free `*.vercel.app` URL
> is completely real. (Your instructor's demo lives on their own domain — that's the
> ultimate "no lock-in" proof: Saturday you were on *their* platform's URL; now
> you're on one *you* own.)

---

## 6. What you leave with

- Your app with a **`CLAUDE.md`** memory you wrote
- (If you did the deep bit) your **own backend** — the whole stack is yours
- A **feature you added yourself** — booking emails, the thing the builder gated
- Your app **live on your own Vercel URL**, redeploying itself on every change
- The instinct to **read the log**, not guess, when something's quiet

You didn't just use AI to make a thing — you **built it, owned it, grew it, and
shipped it.** That's the entire craft in two days.

**Continuing into the 5-day course?** This is exactly what the week is: driving
Claude Code to build real software you own, going deeper each day — a richer app, a
chat agent grounded in your docs, your own project mentored 1:1, and shipping it.

---

## 7. Command & prompt reference

**Write a memory file**
```text
Write a CLAUDE.md for this project: what it is, its stack, how to run it, key files, and rules for working in it. Short and clear.
```

**Move to your own backend**
```text
Move my app's database from the builder's managed backend to my own Supabase project. Walk me through it one step at a time: what to create, rebuilding tables from the migrations folder, and which settings to change.
```

**Add booking emails**
```text
Email me the booking details when someone submits the form. Use Resend and a server-side function; keep the API key as a server-side secret, never in the browser or git. One step at a time.
```

**Debug with logs**
```text
The email isn't arriving. Help me check the logs — did the booking trigger the function, what did it return, and did Resend send it? Then fix what the logs show.
```

**Deploy to Vercel**
```text
Deploy this app to Vercel on my account: connect my GitHub repo, set the environment variables, and give me a live URL. Tell me what to click.
```

---

## 8. You did it

- [ ] Added a **`CLAUDE.md`** memory to your app
- [ ] Saw (or did) moving the app to **your own backend**
- [ ] Added **email-on-booking** — a real feature, yourself
- [ ] Learned to **read the log** instead of guessing
- [ ] Put your app **live on your own URL**

Two days ago you may have worried you weren't "technical enough." Look what you just
shipped. That feeling — *I can build this* — is the real thing you take home.

*Built for the Jungli AI Learning Residency · Weekend Taster · Day 2.*
