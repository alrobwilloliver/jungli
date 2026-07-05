# The Setup Prompt

After you've installed the Claude app, got a paid plan, installed Node (and Git on
Windows), and opened the **Code** tab on a folder — **copy the whole block below,
paste it into the chat, and send it.** Claude walks you through the rest and
checks everything works.

> It will **not** install big things behind your back. If something's missing
> (like Node), it stops and tells you exactly what to click. You stay in control —
> click **Accept** when it asks to make a change.

---

```text
You are helping me set up my laptop for an AI & Agents coding residency. I am a
complete beginner — explain each step in plain language and don't assume I know
anything technical. Work through this checklist ONE step at a time, and pause if I
need to click or install something myself. Do not move on until the current step
works.

1. Check my tools. Run `node --version` and `git --version`.
   - If Node is missing, or older than version 20: STOP and tell me to install the
     latest "LTS" version from https://nodejs.org (the big green button), then say
     I should run this prompt again afterwards.
   - If Git is missing: tell me how to install it for my operating system, then stop.

2. Set up my Git identity. Ask me for my name and the email address I used to sign
   up for GitHub, then configure git with them.

3. Create a tiny test project in this folder: a single index.html file with a
   friendly page that says "Hello from <my name> — I'm set up for Jungli!"

4. Start version control: initialise git in this folder and make a first commit
   with the message "Initial setup".

5. Confirm everything works. Show me the output of `node --version` and
   `git --version`, show me the test file you created, and give me a short,
   encouraging "you're ready for Day 1" summary listing what's now set up.

If anything fails at any step, explain what went wrong in simple terms and tell me
exactly what to click or do to fix it. Be patient and friendly throughout.
```

---

## What this does (and doesn't) do

- ✅ Confirms Node and Git are installed and working.
- ✅ Sets up your name/email for saving work.
- ✅ Creates and commits a first test file — proof the whole loop works.
- ⏭️ **Connecting GitHub and deploying to a live URL happens on Day 1**, together —
  you don't need to do that part now.

If Claude reports everything green, you're ready. If not, screenshot what it says
and bring it to Day 1.
