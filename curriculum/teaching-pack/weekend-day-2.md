# Weekend Day 2 (Sunday) — Make it yours & grow it

*Shared cross-track day · partial instructor time (runs from a ready guide) · Build:
give the app a memory, own the backend, add an email feature, deploy it. Goal: turn
"I own the code" into "I own the whole thing and shipped it."*

Learner guide: [`weekend/sunday-grow-your-app.md`](weekend/sunday-grow-your-app.md)

> Yesterday was *get it & own the code*. Today is *drive it & grow it* — and ship.
> **Pace note:** the deep parts (backend, email, deploy) are **instructor-demoed**;
> the guaranteed learner outcome is a `CLAUDE.md`, one real change, and a live URL.
> Nobody leaves stuck.

---

## Lesson W2.1 — Give your app a memory: `CLAUDE.md` *(concept + demo, ~20 min)*

**Talking points (slides):**
- An AI only knows what's in front of it. **Context** = what you give it to work from.
- A **`CLAUDE.md`** is the app's standing instructions — a note Claude Code reads
  *every time*: what the app is, how it's built, how you like to work.
- *Demo:* ask Claude to write a `CLAUDE.md` for yesterday's app → read it → point out
  it now "remembers" the project on every future session.
- This is the **context & memory** idea — the foundation everything else in AI is built
  on — made real on *their own* app.

**Resources:** this deck · the Claude app on yesterday's project.

**Practical task:** have Claude write a `CLAUDE.md` for your app; read it and correct
one thing.

**Questions:** ① What is "context" in your own words? ② What does a `CLAUDE.md` save
you from repeating? ③ Name one rule you'd put in yours.

**Base prompt:**
```
Write a CLAUDE.md for this project: what it is, its stack, how to run it, key files, and rules for working in it. Keep it short and clear.
```

---

## Lesson W2.2 — Own the backend & grow it: add booking emails *(guided build, ~45 min)*

**Talking points:**
- **Own the backend too.** Yesterday they owned the code; the *database* may still be on
  the builder's managed platform. Demo moving it to their **own Supabase** (the app
  carries its schema in a `migrations` folder, so it's a rebuild, not a rewrite).
  *(Optional for learners — instructor demos; slower rooms can keep the managed backend.)*
- **Grow it:** add **"email me when someone books"** — a server-side function + **Resend**
  (free). The booking already saves; this adds the notification.
- **Secrets, grown-up version:** the Resend key is a *real* secret → it lives **server-side**
  (a function secret), never in the app's `.env` or git. Same habit as Saturday, one level up.
- **Deliverability reality:** first emails often hit **Spam** — mark "Not spam," it learns.

**Resources:** the learner guide §2–3 · free Supabase + Resend accounts.

**Practical task (guided):** add the email feature; send yourself a test booking email.
*(If backend-porting stalls, keep the managed backend and still add the feature.)*

**Questions:** ① Why own the backend, not just the code? ② Where does a real API key
live — and where must it never? ③ Why did the first email hit spam?

**Base prompt:**
```
When someone submits the booking form, email me the details. Use Resend and a server-side function; keep the API key as a server-side secret, never in the browser or git. One step at a time.
```

---

## Lesson W2.3 — Debug with logs, then deploy *(concept + do, ~35 min)*

**Talking points:**
- **When it's quiet, get the log.** The best debugging lesson of the weekend: don't
  guess — every step leaves a trail. For the email: the **webhook log** (did the booking
  trigger the function, what did it return?) and **Resend's log** (sent? delivered?
  bounced?). Nine times in ten the log turns a mystery into a one-line fix.
- **Deploy it as yours:** **Vercel** publishes the app from *their* GitHub → a live URL
  they control, that **redeploys on every push**. Optional custom domain for anyone who
  owns one (instructor's demo shows the branded version).
- **Close the loop:** they built it, own it, grew it, and shipped it — the whole craft.

**Resources:** the learner guide §4–5 · a Vercel account.

**Practical task:** deploy your app to your own Vercel URL; share it in the group chat.
(Stretch: read the webhook/Resend logs to confirm your email fired.)

**Questions:** ① When something's silent, what do you do *instead of guessing*? ② What
does Vercel do on every future push? ③ What's the difference between your Lovable URL
(Saturday) and your Vercel URL (today)?

**Base prompts:**
```
The email isn't arriving. Don't guess — help me check the logs: did the booking trigger the function, what did it return, and did Resend send it? Then fix what the logs show.
```
```
Deploy this app to Vercel on my account: connect my GitHub repo, set the environment variables, and give me a live URL. Tell me what to click.
```

---

**End of Day 2 — they leave with:** a fully-owned app (code + backend), an email feature
they added, live on their own URL — and the instinct to read the log. Continuing into
the course? This is exactly what the week is, on bigger builds.
