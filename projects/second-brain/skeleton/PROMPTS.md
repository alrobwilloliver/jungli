# Prompts

A simple build flow for your second brain. Work in small steps and commit often.

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
