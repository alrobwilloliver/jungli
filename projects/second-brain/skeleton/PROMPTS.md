# Prompts

A simple build flow for your second brain. Work in small steps and commit often.

## 0. Start your own copy — do this first

> **Don't build inside the course folder.** The `jungli` repo you cloned is a
> read-only textbook: you can't push to it, and you don't want to. Your work
> lives in its own folder that *you* own.

Paste this into the Code tab to spin up your own project:

```text
Make a new folder called "my-second-brain" in my home directory — NOT inside the
jungli course folder. Copy the starter files from the second-brain skeleton in the
course repo into it (including the vault/ folder). Then initialise a fresh git repo
there and make a first commit ("Start my second brain"). Confirm we're now working
in my-second-brain, not in the course repo.
```

You'll push this to your *own* new GitHub repo later. It stays yours.

## Quick start — from a few sentences

New to this? **Start here** — a gentler version of the full flow below. You don't
need a CV; a few sentences about yourself is plenty.

**1. Capture (from a few sentences):**
```text
Here are a few sentences about me: [paste 4–6 sentences]. Turn them into a few
short markdown notes in a vault/ folder — one idea per file, clear titles, with
[[links]] between related notes. Then make vault/index.md that lists them.
```

**2. Ask it something (the payoff):**
```text
Using ONLY the notes in vault/, answer this: [a question about you]. If it isn't in
the notes, tell me what's missing instead of guessing.
```

**3. Grow it (optional):** add a few more linked notes, then open the vault in
Obsidian to *see* the graph — see [`OBSIDIAN.md`](../OBSIDIAN.md).

The full, course-level flow follows.

---

## 1. Intake — what is this brain about?

- Whose / what knowledge is this? (you, for a job hunt — or your product, for customers)
- What questions should it eventually answer?
- What source material do you have? (CV, notes, a website, product docs)

## 2. Capture prompt

```text
Read [paste text, or point to a file]. Break it into atomic markdown notes in
vault/, one idea per file, with clear titles. Add [[wikilinks]] between related
notes. Then create vault/index.md listing and grouping the notes.
```

## 3. Organise prompt

```text
Review vault/. Merge duplicate notes, fix broken links, and group the notes under
clear headings in index.md. Keep each note to one idea.
```

## 4. Query prompt (the payoff)

```text
Using ONLY the notes in vault/, answer this the way I'd want a [recruiter /
customer] to hear it: [their likely question]. If the answer isn't in the vault,
tell me what's missing instead of guessing.
```

## 5. Context-management lessons (the point of this build)

- Run `/clear` between unrelated tasks so the agent isn't dragging old context.
- The vault is the agent's **memory** — if it's not in a file, the agent can't use it.
- `CLAUDE.md` holds the *standing* instructions for how to treat the vault.
- Notice how a tighter, well-organised vault gives better answers than a big messy one.

## 6. Git rhythm

```text
git add . && git commit -m "Capture initial notes"
# organise
git add . && git commit -m "Organise and link vault"
```
