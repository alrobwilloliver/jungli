---
title: "Saturday Prompt Guide — Build a Booking App in Lovable"
subtitle: "Jungli · Weekend Taster · Day 1 (Saturday)"
---

# Saturday Prompt Guide — Build a Booking App in Lovable

**Copy-paste prompts to build a real client intake / booking app in
[Lovable](https://lovable.dev) — a form that saves bookings, a dashboard to see
them, and (later) an email when someone books. No coding needed.**

> **What you're making:** a small *full-stack* app — a public **booking page**
> plus a private **dashboard**. It's a genuinely useful tool (take signups for
> your work), and it shows off the thing Lovable is great at: it builds the
> front *and* the back (database included) from plain English.

> **Two things before you start**
> - A free **Lovable** account ([lovable.dev](https://lovable.dev)). The free tier
>   gives you a few credits a day — enough to build today. *(Each prompt ≈ 1
>   credit; a first build ≈ 5–15. You'll feel the meter — that's part of the
>   lesson.)*
> - No setup, no terminal. You describe; Lovable builds.

---

## How Lovable likes to be prompted

- **Be specific** — say what pages exist, what fields the form has, and what
  happens on submit.
- **Build once, then refine one change at a time.** Run the big prompt first,
  look at the result, *then* make small requests. Don't stack five changes into
  one message.
- **Preview after every change.** Read what it made before asking for the next thing.
- **It's a teammate, not a genie.** If it goes the wrong way, tell it plainly what
  to fix.

---

## 1. The main build prompt

Paste this first. It creates the whole app in one go.

```text
Build a client booking app for my consulting/advisory work.

PUBLIC BOOKING PAGE
- A clean hero: a short heading ("Book a call"), one line of intro, and a
  "Book a call" button that scrolls to the form.
- A booking form with fields: name, email, company (optional), what they want to
  talk about (short paragraph), preferred date, and preferred time.
- On submit: save the booking to a database and show a friendly confirmation
  message ("Thanks — I'll be in touch to confirm.").

ADMIN DASHBOARD (separate page, behind a simple login)
- A table of all bookings, newest first: name, email, preferred date/time,
  message, and a status (new / confirmed / cancelled).
- Let me change a booking's status and delete spam.

Keep the code clean and simple so I can extend it later. Make it fully
mobile-friendly.
```

When it's done, **click Preview** and try booking a call yourself — then check the
dashboard to see your booking land. That round trip (form → database → dashboard)
is the full-stack magic.

---

## 2. Give it a look *(optional)*

Run this **after** the first build. You don't need a website or a brand — pick
whichever fits you:

**Most people — describe the vibe you want.** Just tell Lovable the feeling:

```text
Restyle the app to feel [clean and minimal / warm and friendly / bold and modern].
Use [one accent colour you like], generous whitespace, and readable type. Apply it
consistently across the booking page and the dashboard.
```

Or paste this ready style block and tweak the words:

```text
Restyle the app to this look:
- Background: clean white / off-white
- Text: dark charcoal, high contrast
- Accent (links, buttons): a single colour you like
- Type: modern sans-serif; bold, generously-sized headings; readable body
- Feel: minimal, professional, clarity over decoration
- Layout: generous whitespace, left-aligned text, clear content blocks
Apply it consistently across the booking page and the dashboard.
```

> **Already have a website?** *(Optional — skip if not.)* You can ask Lovable to
> match it:
> ```text
> Restyle this app to match my existing website [your website URL] — same colours,
> fonts, and feel. If you can't read the site, I'll paste a style guide.
> ```

> **Prefer to let Lovable lead?** Totally fine — skip this whole step and use
> Lovable's own theme/edit suggestions. You're learning the tool; every path is valid.

---

## 3. Email me when someone books — and the wall you'll hit

A booking you don't hear about is a booking you'll miss. So the natural next ask is
an email alert. Try it:

```text
When someone submits the booking form, email me at [your email] with all the
booking details (name, email, company, preferred date/time, and their message).
```

**Here's the interesting part — and the whole point of this weekend.** Lovable
*can* send email (it's built in — no API key to paste). But to send from **your
own domain** it asks you to upgrade to **Lovable Pro** ($25/month):

> *"Set up email domain — not available in your plan. Upgrade to the Pro plan to
> send emails from your own domain."*

That's the wall. And it's not a problem — it's the lesson:

> **This is exactly why you graduate to owning the code.** You do **not** need to
> pay Lovable Pro to get booking emails. Once you take this app into **Claude Code**
> (§5), you wire the email yourself with a **free** email service — verify your
> domain for free and send from something like `notify@yourdomain.com` straight to
> your inbox. Same result, no monthly platform fee, and *you* own the integration.
>
> So **skip email in Lovable today.** Your app still saves every booking to the
> dashboard. You'll add the email in Claude Code on **Sunday** — for free — and
> that's the graduation moment made real.
>
> **🔑 When you do add it,** keep any secret in the right place (an environment
> variable) — **never commit a key to GitHub or paste it anywhere public.**

---

## 4. Refine it *(one at a time, preview after each)*

```text
Make the booking form feel calmer and more premium — more spacing, a clearer
single call-to-action, and a subtle success animation on submit.
```

```text
Add basic validation: require name, a valid email, and a date that isn't in the
past. Show friendly inline errors.
```

```text
On the dashboard, add a search box that filters bookings by name or email, and
show a count of new bookings.
```

---

## 5. Now own it — take it out of Lovable

This is the whole point of the weekend. Your app is real code, and you can take it
with you.

1. In Lovable, open the **GitHub** menu (top-right of the editor) and **connect /
   sync** your project to a new GitHub repo. Lovable pushes the full codebase to a
   repo **you** own.
2. Pull that repo to your computer and open it in **Claude Code**.

> **Why bother, when it already works in Lovable?**
> - **Economics:** Lovable's credits are metered and run out; your Claude
>   subscription gives far more runway for a build day.
> - **No lock-in:** the code is yours — deploy it anywhere, change anything.
> - **More control:** in Claude Code you can grow it as far as you like.
>
> Lovable is a brilliant *on-ramp*. **Claude Code is where you own and grow.**
> That's Sunday: give the app a memory (`CLAUDE.md`), add the email feature, and
> deploy it to your own live URL.

---

## Prompt reference

Everything above, in order, to copy fast.

**Build**
```text
Build a client booking app: a public booking page (hero + a form for name, email,
company, topic, preferred date and time; on submit save to a database and show a
confirmation) and a private admin dashboard (login-gated table of bookings with a
status I can change). Clean, simple, mobile-friendly.
```

**Give it a look**
```text
Restyle the app to feel [clean and minimal / warm / bold], with one accent colour I
like, generous whitespace, and readable type. Apply it across both pages.
```
*(Already have a website? Add: "match my existing site [your website URL]".)*

**Email alerts**
```text
Email me at [your email] with the full details whenever someone books. Make it
work from the deployed app; tell me what to provide and keep any secret safe.
```

**Refine** (one at a time)
```text
Make the form feel calmer and more premium — more spacing, one clear CTA, a subtle
success animation.
```
```text
Add validation: require name, valid email, and a future date, with inline errors.
```
```text
Add a dashboard search (by name/email) and a count of new bookings.
```

**Own it**
> In Lovable: **GitHub → connect/sync** to your own repo → pull it local → open in
> **Claude Code**.

---

*Built for the Jungli AI Learning Residency · Weekend Taster · Day 1.*
