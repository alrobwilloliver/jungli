# Agentic Second Brain — One-Hour Classroom Design

**Date:** 2026-07-26

**Status:** Approved in conversation

**Relationship to the original design:** This document narrows the classroom
path described in
[`2026-07-25-agentic-second-brain-extension-design.md`](2026-07-25-agentic-second-brain-extension-design.md).
It does not remove the robust finished reference. It supersedes the original
90–120 minute workshop sequence and the original eight-prompt guided beginner
path. The application architecture, safety limits, privacy requirements,
finished reference, compatibility checker, and optional embeddings extension
remain in force.

## Goal

A beginner starts with a polished, working chatbot, upgrades it into a small
tool-using agent with guided Claude Code prompts, and observes the agent
choosing and reading relevant Sam Rivera notes within one hour. Switching to a
personal Markdown second brain is an optional final step, not a requirement for
completing the class.

The lesson teaches one contrast:

```text
Before: question + every Sam note → model → answer

After:  question → search notes → read selected notes → answer with sources
```

## Classroom contract

The reliable shared build uses only the fictional Sam Rivera vault. Learners do
not begin by debugging their own filenames, note formats, private data, or
provider-policy choices.

After the Sam build works, learners may copy their own Markdown notes into a
separate `vault-personal/` directory during the final classroom step. The Sam
vault remains untouched as the reversible recovery fixture.

Personal notes are disabled when the application uses `openrouter/free`, an
automatic router alias, or an automatic fallback. Before enabling
`vault-personal/`, the instructor must configure one fixed, currently validated
model/provider, review its current data policy with learners, and disable
automatic fallback for that run. Learners explicitly choose whether they
accept that policy. Anyone who declines, or any class without a validated fixed
provider, completes the lesson with Sam's fictional vault.

## Project shape

### Skeleton

`projects/agentic-second-brain/skeleton/` is a polished and complete
non-agentic application. It already provides:

- A responsive chat interface and setup screen.
- A server-only OpenRouter request boundary.
- A safe Markdown vault loader.
- Sam's five fictional notes.
- The deliberately inefficient all-notes-in-every-request baseline.
- Visible model, source, activity, and context-usage information.
- Fast tests and a production build.

Learners do not create the web application, provider adapter, vault loader, or
visual design during the optional class.

### Learner upgrade

The learner work is limited to four checkpoints and four corresponding Claude
Code prompts:

1. **Inspect:** locate the all-context assembly, observe that all five Sam notes
   are sent, explain the before/after data flow, and make no changes.
2. **Build tools:** implement and test `list_notes`, `search_notes`, and
   `read_note` against the supplied interfaces and fixtures.
3. **Connect controller:** fill only the marked integration points that expose
   the three schemas, dispatch validated tool calls, and append tool results.
4. **Verify:** run the mocked controller test, ask a Sam question, and compare
   the selected evidence and activity with the baseline.

Claude Code prompts state the intended result, files allowed to change,
protected boundaries, verification command, and stop point. The prompts use
plain language and do not require Superpowers or another installed skill.

The controller scaffold lives in `lib/agent/controller.ts`. It exports
`runAgent(input, deps)` and contains clearly marked learner integration points
for:

- Importing the three tool definitions.
- Passing them on each model request.
- Executing validated calls through `executeTool`.
- Appending the assistant tool-call message and matching tool results.

Learners may change only those marked regions during checkpoint 3. The
controller scaffold owns the difficult safety mechanics before class:

- Three model calls at most.
- Four unique note reads at most.
- Known tool names only.
- Validated arguments.
- Bounded question, history, and tool-result sizes.
- One model identity per run.
- Honest failure on exhausted limits or incompatible responses.

Learners connect and inspect this behavior; they do not invent the full
controller under time pressure.

### Finished reference

`projects/agentic-second-brain/finished/` is the complete instructor reference
and recovery point. It contains the same interface and vault plus the working
tools, controller, activity trace, citations, friendly failures, and tests.

If a learner falls behind, they can open the finished reference and still
participate in the demonstration and personal-vault step.

## Sixty-minute sequence

| Time | Classroom activity | Visible checkpoint |
|---|---|---|
| 0–5 min | **Concept:** chatbot context versus agent choice | Learner can explain the before/after arrows |
| 5–10 min | **Demo:** run the skeleton and inspect the request | UI reports all five notes sent |
| 10–25 min | **Build:** add and test the three note functions | Focused tool tests pass |
| 25–30 min | **Concept:** schema describes; application executes | Learner identifies both halves of a tool |
| 30–45 min | **Build:** connect tools to the prepared controller | Mocked agent-loop test passes |
| 45–52 min | **Demo:** ask the supplied Sam question | Activity shows search, read, answer, and sources |
| 52–55 min | **Trap:** malformed call, free capacity, and privacy | Learner can classify the failure |
| 55–60 min | Optional personal-vault switch or instructor recap | Sam core remains a complete success |

The prepared start state is a repository clone with dependencies installed,
the skeleton tests passing, and either a working class API configuration or
the supplied mocked provider fixtures. Mocked operation counts as completion
for every coding checkpoint; live inference is a demonstration, not a build
gate.

The instructor dry-runs the four prompts from a clean skeleton before class and
records elapsed wall time. One rehearsal by a beginner-level tester must finish
the Sam core in 45 minutes or less. At minute 25, learners without passing tool
tests switch to the finished tool files. At minute 45, learners without a
passing controller test switch to the finished reference. These cutovers
protect the final concept, trap, and optional-vault time.

## Data flow

```text
Browser question
  → server chat route
  → bounded controller
  → model requests one of three known tools
  → application validates and executes the tool
  → selected, labelled note evidence returns to the model
  → answer + source paths + observable activity return to the browser
```

The browser never receives an API key. Note bodies are never returned by
`list_notes`, search results remain short, and `read_note` resolves only exact
paths from the loaded catalogue.

## Error handling

The learner-facing path distinguishes:

- Missing or invalid API configuration.
- Temporary free-tier capacity or model availability.
- A model that does not produce compatible tool calls.
- Invalid or unsafe note paths.
- Agent call/read limits.
- A question the selected evidence cannot answer.

The interface offers a safe retry where appropriate. It never exposes provider
payloads, API keys, or hidden model reasoning.

## Personal-vault switch

The default server-side vault root is `vault/`. The optional classroom switch
uses:

```dotenv
VAULT_DIRECTORY=vault-personal
```

The application accepts only a safe project-relative directory, rejects
absolute paths and traversal, recursively loads Markdown files, and requires a
server restart after the variable changes. The learner copies notes into
`vault-personal/`; they do not append them to Sam's vault or delete the recovery
fixture. Removing the variable and restarting returns to Sam without code
changes.

The personal directory is local-only by default and remains ignored by Git.
Deploying personal notes is outside the one-hour exercise.

## Verification and success criteria

The classroom path is ready only when:

- Skeleton and finished projects both pass tests, formatting, lint, typecheck,
  and production builds.
- The skeleton visibly sends all five Sam notes.
- For the supplied question, only note bodies returned by successful
  `read_note` calls enter model context. A controller test inspects every model
  request and proves that unselected note bodies are absent.
- Tool tests cover ranking, result limits, and unsafe paths.
- Controller tests cover a normal run, malformed calls, duplicates, limits,
  model pinning, and honest failure.
- The four guided prompts can be followed from the prepared start state in 45
  minutes or less under the dry-run rubric, leaving time for the trap and
  optional learner-vault step.
- A learner can switch to and from a separate personal vault without changing
  application code or deleting Sam's recovery fixture.
- The personal-vault instructions present the provider-policy decision before
  asking learners to copy private notes.

The live provider is useful for the final demonstration but is not required to
prove that the learner completed each coding checkpoint.
