# Weekend Day 2 (Sunday) — Give Claude a memory

*Shared cross-track day · partial instructor time (runs from a ready starter) ·
Build: a **second-brain starter** (lite). Goal: the "it actually knows my stuff"
moment — feel how an AI uses context.*

Projects: [`projects/second-brain`](../../projects/second-brain)

> Yesterday was *output* — you made a thing and shipped it. Today is *input* — how
> you give an AI a memory by handing it your own files.

---

## Lesson W2.1 — It only knows what you give it *(concept + demo, ~20 min)*

**Talking points (slides):**
- An AI has no idea who *you* are — unless you tell it. **Context** = the stuff you
  give it to work from.
- The trick: put what you know into **files**, and point Claude at them. If it's not
  in a file, the agent can't use it.
- *Demo:* ask Claude a question about you with no notes (it guesses or declines) →
  give it one note → ask again (now it answers). Same question, different context.
- A **"second brain"** is just a tidy folder of those notes. That's the whole idea —
  and it's the foundation everything else (chat agents, bigger projects) is built on.

**Resources:** this deck · the Claude app · [`second-brain/skeleton`](../../projects/second-brain/skeleton).

**Practical task:** write 4–6 plain sentences about yourself in a note; ask Claude a
question before and after it can see them.

**Questions:** ① What is "context" in your own words? ② Why does putting things in
files matter? ③ What should the agent do if the answer isn't in your notes?

**Base prompt:**
```
Here are a few sentences about me: [paste]. Read them, then answer
"what should someone know about me first?" using only what I gave you.
```

---

## Lesson W2.2 — Build your second brain *(guided build, ~40 min)*

**Talking points:**
- **Atomic notes:** one idea per file, a clear title.
- **Link them** with `[[double brackets]]` so related ideas connect.
- Keep an **`index.md`** that lists and groups the notes.
- Ask it questions — and notice it answers **only** from your vault, and says so when
  something's missing. That honesty is the point.

**Resources:** [`second-brain/skeleton/PROMPTS.md`](../../projects/second-brain/skeleton/PROMPTS.md)
(the **Weekend lite path**) · the [`finished/`](../../projects/second-brain/finished) Sam Rivera vault for shape.

**Practical task:** turn your sentences into a few linked notes + an index; then ask
your brain 3 real questions.

**Questions:** ① Why one idea per note? ② What makes a good `[[link]]`?

**Base prompts (from `PROMPTS.md` → Weekend lite path):**
```
Here are a few sentences about me: [paste]. Turn them into a few short markdown
notes in a vault/ folder — one idea per file, clear titles, with [[links]] between
related notes. Then make vault/index.md that lists them.
```
```
Using ONLY the notes in vault/, answer this: [a question about you]. If it isn't in
the notes, tell me what's missing instead of guessing.
```

---

## Lesson W2.3 — See it & grow it: Obsidian *(optional, guided, ~30 min)*

*The buffer track — for anyone who finishes the core build early. Turns a short
session into a full one, and gives you time to spend with whoever's stuck.*

**Talking points:**
- Your notes are **just files** — and they open beautifully in **Obsidian**, a free
  notes app, with a **graph view** that draws every note and link.
- Same folder, two windows: Claude writes the notes, Obsidian shows them. Nothing
  hidden — that's the lesson.
- **Grow your brain:** add a few more linked notes, refresh the index, give Claude a
  short standing-instructions file, and ask harder questions across notes — watch the
  graph fill in.

**Resources:** [`second-brain/OBSIDIAN.md`](../../projects/second-brain/OBSIDIAN.md)
(full walkthrough) · [obsidian.md](https://obsidian.md) (free).

**Practical task:** open your vault in Obsidian, turn on graph view, then add and link
two more notes and watch the graph grow.

**Questions:** ① What does the graph view show you? ② Name one way giving Claude
standing instructions (a `CLAUDE.md`) helps.

**Base prompt:**
```
Add two more atomic notes to vault/ about [an interest] and [a project], link them
to the right existing notes with [[links]], and update vault/index.md.
```

---

**End of Day 2 — you leave with:** your own second-brain starter, a real feel for how
AI uses context, and (if you did the Obsidian track) a living map of your own
knowledge. Continuing into the course? This is exactly what Day 2 grows into a full
vault — and Day 3 turns into a chat agent.
