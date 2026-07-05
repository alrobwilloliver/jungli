# Day 4 — The agent's powers + start your own

*~2 hours structured · meet skills + MCP, then scope your own project. Goal: see
how agents gain new abilities, and turn it loose on something you care about.*

> Building your own project continues into the **open/weekend time** — today is
> about giving the agent powers and getting your project **scoped and started**.

---

## Lesson 4.1 — Skills & slash commands *(guided demo, ~30 min)*

**Talking points:**
- A **skill** = a packaged capability/workflow the agent can use — a reusable
  recipe (e.g. a review checklist, a build flow).
- **Slash commands** as shortcuts to invoke them.
- *Demo:* install/use **superpowers**; run one skill together.
- Why it's a step-change: you're **giving the agent new abilities**, not just
  asking nicely.

**Resources:** the **superpowers** plugin · the Claude app's skills/commands menu
(type `/`).

**Practical task:** run one skill on your own project and see what it does.

**Questions:** ① What's a skill, in your own words? ② When would you reach for one
instead of just prompting?

**Base prompt:**
```
/[skill-name] — then follow its prompts on my current project.
```

---

## Lesson 4.2 — MCP / integrations *(guided demo, ~30 min)*

**Talking points:**
- **MCP** = a standard way to plug the agent into **outside tools and data** (your
  files, a service, an app).
- *Demo:* connect **one** simple MCP; watch the agent use it.
- The big picture: this is how an agent reaches into your real workflow — and it's
  the doorway to the **Automation track**.
- ⚠️ Don't treat it as magic — it's still the same agent loop, now with a new tool.

**Resources:** one simple, pre-tested MCP server · the Claude app's connectors.

**Practical task:** connect one MCP and ask the agent to use it for something real.

**Questions:** ① What does MCP let the agent do that it couldn't before? ② Name a
tool you'd want to connect to *your* work.

**Base prompt:**
```
Using the [connected tool], find [X] and [do Y with it]. Show me what you used.
```

---

## Lesson 4.3 — Scope your own project *(workshop, ~50 min)*

**Talking points:**
- Pick a **real use case** (work or life). Easiest path: **personalise Build 3**
  (your career bot / your product bot). Or something new.
- **Cut it down:** what's the *one* useful thing it does? (Not "an app like Uber"
  → "the one page that does the useful bit.")
- **Define "done"** in a single sentence.
- Start a project `CLAUDE.md` with your rules and context.

**Resources:** your second brain / chat agent as a base · the scoping questions
below · a project `CLAUDE.md` to start.

**Practical task:** write your one-line "done", start a project folder, and begin
building (continues in open time, lightly mentored).

**Questions:** ① What's the one useful thing your project does? ② Who is it for?
③ What's the **smallest** version you could ship?

**Base prompt:**
```
Here's my idea: [describe it]. Act as a scoping partner: ask me questions first,
then help me cut it down to the smallest version I can build and deploy, and list
the steps.
```

---

**End of Day 4 — students leave with:** one skill and one MCP tried hands-on, and
their own project scoped and underway.
