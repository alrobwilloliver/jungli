# Working on Your Own Projects

*How to use this repo without getting tangled up. Read this once — it takes two
minutes and saves a lot of confusion on Day 1.*

---

## The one idea: this repo is a textbook, not your workbook

You'll **clone** this repo (the `jungli` course folder) so you have all the
lessons, slides, and project starters on your laptop. Think of it as a **printed
textbook**: you read from it, you copy exercises out of it — but you don't
scribble your homework in the margins of the textbook itself.

So there are always **two kinds of folders**:

| | The course repo (`jungli`) | Your own project (e.g. `my-landing-page`) |
|---|---|---|
| What it is | The textbook — lessons + starters | Your homework — the thing *you* build |
| Who owns it | The instructor | **You** |
| Can you commit to it? | **No** (it's read-only to you) | **Yes** — it's yours |
| Where it goes live | Nowhere — it's reference | Your GitHub → your live Vercel URL |

**Why you can't just build inside the course folder:** it belongs to the
instructor's account, so GitHub won't let you push your changes to it — and even
if it could, you wouldn't want 20 people's homework in one shared textbook. Each
build gets its **own** folder and its **own** repo that you own.

---

## The move you'll make for every project

Every project's `PROMPTS.md` starts with a **Step 0** that does this for you. The
shape is always the same — you paste a prompt into the Code tab and Claude sets up
a fresh folder *outside* the course repo:

```text
Make a new folder called "my-project-name" in my home directory — NOT inside the
jungli course folder. Copy the starter files from the <project> skeleton in the
course repo into it. Then initialise a fresh git repo there and make a first
commit. Confirm we're now working in my-project-name, not in the course repo.
```

That's it. From then on you're working in **your** folder, on **your** repo.

---

## The lifecycle of one project

1. **Spin out** — paste Step 0; Claude makes your own folder + repo from the starter.
2. **Build** — follow the rest of that project's `PROMPTS.md`. Commit as you go.
3. **Publish your code** — push your folder to a **new GitHub repo under your
   account** (Claude walks you through the clicks).
4. **Go live** — connect that GitHub repo to **Vercel** for a real, shareable URL.
5. **Keep going** — every push auto-updates your live site. The repo stays yours
   forever.

You'll do this three times across the week (landing page → second brain → chat
agent), plus your own personal project. Same five steps each time — by the third
one it's muscle memory.

---

## Common mix-ups

- **"I can't push!"** — Check which folder you're in. If it's `jungli/…`, you're
  in the textbook. Run Step 0 to start your own project folder, then push *that*.
- **"Where did my starter files go?"** — Step 0 *copies* them into your new folder;
  the originals stay put in the course repo. That's normal.
- **"Do I need a new GitHub repo each time?"** — Yes, one per project. Claude
  creates it for you; it's a 20-second step, and it keeps each live site clean.

---

*Next: open a project's `PROMPTS.md` and start at Step 0. See the projects in
[`../projects/`](../projects/).*
