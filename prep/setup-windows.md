# Setup Guide — Windows

*Do this at home on good wifi before the residency. ~25–35 minutes. Follow it top
to bottom. You will **not** need the terminal — we use the Claude app's buttons.*

> You need Windows 10 (version 1809+) or Windows 11.

---

## Step 1 — Get a paid Claude plan

The coding features we use need a **paid** Claude plan (the free one won't work).
If you haven't sorted this, read [`claude-plans.md`](claude-plans.md) first, then
come back.

## Step 2 — Install the Claude desktop app

1. Go to **<https://claude.ai/download>** and download the **Windows** app (pick
   **ARM64** only if you have a newer ARM laptop; otherwise the standard x64 one).
2. Run the installer and click through it.
3. Launch Claude and **sign in** with your paid account.
4. Click the **Code** tab at the top. If it lets you in (doesn't ask you to
   upgrade), you're good. This is where we'll work all week.

> The Claude app already includes "Claude Code" — there's nothing else to install
> for Claude itself, and you don't need the terminal. (A terminal version exists
> for power users; ignore it for now.)

## Step 3 — Install Node.js

Node.js lets the websites and apps you build actually run.

1. Go to **<https://nodejs.org>** and click the big button for the **LTS** version
   (the recommended one).
2. Run the downloaded installer and click **Next** through the defaults.

That's it — **one** version of Node, the LTS. You don't need anything fancy like
"nvm"; a single version covers everything we build.

## Step 4 — Install Git for Windows

On Windows, the Claude app needs **Git** to work with your project files locally.

1. Download it from **<https://git-scm.com/downloads/win>**.
2. Run the installer and click **Next** through all the screens (the defaults are
   fine).

> After installing Node and Git, **restart your PC once** — Windows sometimes needs
> that to find newly installed tools.

## Step 5 — Create your accounts

1. **GitHub** (where your code lives): <https://github.com> → **Sign up**. Pick a
   username you're happy to be public; verify your email.
2. **Vercel** (where your site goes live): <https://vercel.com> → **Sign Up** →
   **"Continue with GitHub"** and authorise it. No separate password to remember.

## Step 6 — Run the setup prompt ✅

1. In the Claude app, open the **Code** tab.
2. Choose **Local**, click **Select folder**, and make/pick a folder for the week
   (e.g. a new folder called `jungli-build` in your Documents).
3. Open [`setup-prompt.md`](setup-prompt.md), **copy the whole prompt**, paste it
   into the chat box, and send it.
4. Claude will check Node and Git, set up your details, and create a small test
   file — following along and clicking **Accept** when it asks. When it says
   "you're ready," you're done. 🎉

## If something breaks
- Can't open the **Code** tab / it asks you to upgrade → you need a **paid** plan
  (see [`claude-plans.md`](claude-plans.md)).
- The setup prompt says **Node or Git is missing** → redo Step 3/4, restart your
  PC, and run the prompt again.
- Anything else → screenshot it and bring it to Day 1; we'll fix it in the first hour.
