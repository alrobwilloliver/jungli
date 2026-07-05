# Day 1 — Ship a live site

*~2 hours structured · Build 1 (landing page + email). Goal: everyone ends with a
real website live on the internet.*

Projects: [`projects/email-landing-page`](../../projects/email-landing-page)

---

## Lesson 1.1 — What's an agent, and what is Claude Code? *(concept, ~20 min)*

**Talking points (slides):**
- AI you've used (ChatGPT) *answers questions*. An **agent** *does tasks*: it
  plans → acts → checks → repeats, using tools.
- **Claude Code** is an agent that can read and write files on your computer and
  run commands. This week it lives in the Claude app's **Code tab** (buttons).
- **The loop you'll use all week:** you ask → it plans & edits files → you review
  (Accept/Reject) → you refine. *You direct; it builds.*
- It will sometimes get things wrong — that's normal, you just re-steer it. It's
  not Google and it's not magic; it's a fast junior teammate that needs clear
  instructions.
- What "0 → 1" means here: by the weekend you'll have built and shipped real
  things, with no prior coding.

**Resources:** this deck · the Claude app open on a folder (Code tab) · *(curious?)*
`code.claude.com/docs` overview.

**Practical task:** a 2-minute "say hello" to prove your setup works.

**Questions:** ① In your own words, what's the difference between a chatbot and an
agent? ② What are the four steps of the loop? ③ What should you do when the agent
gets something wrong?

**Base prompt:**
```
Create a file called hello.txt that says hello, then tell me what you just did and why.
```

---

## Lesson 1.2 — Build your landing page *(demo + guided build, ~50 min)*

**Talking points:**
- Define the **offer** first: who is it for, what's the offer, what's the *one*
  call-to-action. (Use the intake questions.)
- Watch me build one from a prompt — then you build yours.
- **Reading what it made:** the page, the files, Accept/Reject on each change.
- **Personalise it:** your words, your style — make it yours.
- Add the **email form** — a Kit embed (drop-in; no API key needed).

**Resources:** [`email-landing-page/skeleton/PROMPTS.md`](../../projects/email-landing-page/skeleton/PROMPTS.md)
· the [`finished/`](../../projects/email-landing-page/finished) reference · a Kit
embed code.

**Practical task:** build your own landing page for a real (or pretend) offer; add
the Kit signup form.

**Questions:** ① Your offer in one line — *"I help [who] get [result] through
[offer]"*? ② What's your single call-to-action?

**Base prompts (from `PROMPTS.md`):**
```
I help [audience] get [result] through [offer].
```
```
Build a responsive one-page landing site for this offer.
Audience: […]  Offer: […]  Outcome: […]  Primary CTA: […]
Tone: [3 adjectives]  Style: [direction]
Sections: hero, problem, offer, benefits, about, FAQ, signup, footer
Constraints: plain HTML/CSS/JS, mobile-first, simple to deploy.
Leave a clear placeholder for an email signup form.
```
```
Integrate this email signup embed into the signup section cleanly, keeping the
layout simple and responsive: [paste Kit embed].
```

---

## Lesson 1.3 — Save it & put it live: git + Vercel *(concept + do, ~40 min)*

**Talking points:**
- **Why save points:** you never lose work, and you can always go back.
- **Git** = local save points (commits). **GitHub** = your code, online and backed up.
- **Deploy** = put it on the internet. **Vercel** watches your GitHub repo and
  publishes it automatically.
- The flow: **commit → push to GitHub → import to Vercel → live URL.**
- Your live link is shareable — text it to someone. 🎉

**Resources:** a GitHub account · a Vercel account · the Claude app (it can run the
git steps for you) · `vercel.com`.

**Practical task:** commit your page, push to GitHub, deploy on Vercel, and share
your **live URL** in the group chat.

**Questions:** ① What's the difference between a commit and a push? ② What does
Vercel do for you? ③ Where would you go to find your live link again?

**Base prompts:**
```
Initialise git in this project and commit everything with the message
"My landing page". Explain each step simply as you go.
```
```
Walk me through pushing this to a new GitHub repo and connecting it to Vercel so
it's live. Tell me exactly what to click at each step.
```

---

**End of Day 1 — students leave with:** a live landing page with email capture, on
a real URL, and a feel for the core loop.
