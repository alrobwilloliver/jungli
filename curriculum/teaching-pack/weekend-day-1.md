# Weekend Day 1 (Saturday) — Ship a live site

*Full day · the most-mentored day of the weekend · Build: a **basic** personal
landing page. Goal: everyone leaves with a real website live on the internet — no
exceptions.*

Projects: [`projects/email-landing-page`](../../projects/email-landing-page)

> The taster version of the course's Day 1 — deliberately simpler (no email form
> yet). Today's win is *"it's live, and it's mine."*

---

## Lesson W1.1 — What is Claude Code, and the loop *(concept, ~20 min)*

**Talking points (slides):**
- The AI you've used (ChatGPT) *answers questions*. **Claude Code** *does tasks* —
  it reads and writes files on your computer and runs things for you. This weekend
  it lives in the Claude app's **Code tab** (buttons, not a terminal).
- **The one loop you'll use all weekend:** you ask → it makes a change → you look →
  you refine. *You direct; it builds.*
- It will sometimes get things wrong — that's normal, you just re-steer it. It's a
  fast junior teammate that needs clear instructions, not magic.
- **The "not technical enough" worry** — name it out loud. You will not write code
  today. If you can describe what you want, you can build it. By tonight you'll have
  proof.

**Resources:** this deck · the Claude app open on a new folder (Code tab).

**Practical task:** a 2-minute "say hello" to prove your setup works.

**Questions:** ① What's one thing Claude Code can do that a normal chatbot can't?
② What are the four steps of the loop? ③ What do you do when it gets something wrong?

**Base prompt:**
```
Create a file called hello.txt that says hello, then tell me what you just did and why.
```

---

## Lesson W1.2 — Build a basic personal site *(demo + guided build, ~50 min)*

**Talking points:**
- Decide the **one thing** the page is about first: who you are, and what you want a
  visitor to know. Keep it small.
- Watch me build one from a single prompt — then you build yours.
- **Reading what it made:** the page, the files, Accept/Reject on each change.
- **Make it yours:** your words, your colours — ask for small changes and watch them happen.
- *No email form today — that's the course version. Today = simple and live.*

**Resources:** [`email-landing-page/skeleton/PROMPTS.md`](../../projects/email-landing-page/skeleton/PROMPTS.md)
(use the simple build prompt below) · the [`finished/`](../../projects/email-landing-page/finished) reference for ideas.

**Practical task:** build your own one-page personal site; change at least the
headline, one section, and one colour.

**Questions:** ① In one line, what's your page about? ② What's one change you asked
for that worked — and one that didn't the first time?

**Base prompts:**
```
Build me a simple one-page personal website with plain HTML and CSS.
Include: my name and a short tagline, a short "about me" paragraph, a list of
3 things I've done or care about, and a footer with my email.
Make it clean, mobile-friendly, and easy to change. Keep the code simple.
```
```
Change the headline to "[your words]" and make the colours warmer. Show me the
result and wait for my OK before doing anything else.
```

---

## Lesson W1.3 — Save it & put it live: git + Vercel *(concept + do, ~40 min)*

**Talking points:**
- **Save points:** you never lose work, and you can always go back.
- **Git** = local save points (commits). **GitHub** = your work, online and backed up.
- **Deploy** = put it on the internet. **Vercel** publishes your GitHub repo and
  gives you a live link.
- The flow: **commit → push to GitHub → import to Vercel → live URL.**
- Your live link is shareable — text it to someone. 🎉

**Resources:** a GitHub account · a Vercel account · the Claude app (it runs the git
steps for you) · `vercel.com`.

**Practical task:** commit your page, push to GitHub, deploy on Vercel, and share
your **live URL** in the group chat.

**Questions:** ① What's a commit, in your words? ② What does Vercel do for you?
③ Where do you find your live link again?

**Base prompts:**
```
Initialise git in this project and commit everything with the message
"My first site". Explain each step simply as you go.
```
```
Walk me through pushing this to a new GitHub repo and connecting it to Vercel so
it's live. Tell me exactly what to click at each step.
```

---

**End of Day 1 — you leave with:** a basic personal site **live on a real URL**, and
a feel for the core loop. Tomorrow: give Claude a memory.
