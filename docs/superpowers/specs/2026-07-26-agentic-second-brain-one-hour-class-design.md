# Agentic Second Brain — One-Hour Classroom Design

**Date:** 2026-07-26

**Status:** Approved in conversation

**Relationship to the original design:** This document narrows the classroom
path described in
[`2026-07-25-agentic-second-brain-extension-design.md`](2026-07-25-agentic-second-brain-extension-design.md).
It does not remove the robust finished reference, but it replaces the original
90–120 minute learner sequence with a hard 60-minute core build.

## Goal

A beginner starts with a polished, working chatbot, upgrades it into a small
tool-using agent with guided Claude Code prompts, observes the agent choosing
and reading relevant notes, and then asks one question against their own
Markdown second brain within one hour.

The lesson teaches one contrast:

```text
Before: question + every Sam note → model → answer

After:  question → search notes → read selected notes → answer with sources
```

## Classroom contract

The reliable shared build uses only the fictional Sam Rivera vault. Learners do
not begin by debugging their own filenames, note formats, private data, or
provider-policy choices.

After the Sam build works, learners may copy their own Markdown notes into the
vault during the final classroom step. Before doing so, the guide explicitly
states that note contents are sent to the configured model provider and asks
learners to review and accept that provider's current data policy. Learners who
do not want to send personal notes keep using Sam's fictional vault.

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

The learner work is limited to four checkpoints:

1. Inspect the baseline and observe that all five Sam notes are sent.
2. Add and test `list_notes`, `search_notes`, and `read_note`.
3. Connect those functions to a prepared bounded-controller scaffold.
4. Ask a Sam question and observe search → read → sourced answer.

Claude Code prompts state the intended result, files allowed to change,
protected boundaries, verification command, and stop point. The prompts use
plain language and do not require Superpowers or another installed skill.

The controller scaffold owns the difficult safety mechanics before class:

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
| 0–10 min | Run the skeleton and inspect the request | UI reports all five notes sent |
| 10–25 min | Add and test the three note functions | Focused tool tests pass |
| 25–45 min | Connect tools to the prepared controller | Mocked agent-loop test passes |
| 45–52 min | Ask the supplied Sam question | Activity shows search, read, answer, and sources |
| 52–60 min | Optionally copy in the learner's Markdown notes | One grounded question works against their vault |

The instructor demonstrates rather than waits on live free-model
infrastructure when capacity or model compatibility is poor. Mocked tests make
the build checkpoint reliable without consuming API requests.

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

## Verification and success criteria

The classroom path is ready only when:

- Skeleton and finished projects both pass tests, formatting, lint, typecheck,
  and production builds.
- The skeleton visibly sends all five Sam notes.
- The finished application reads only selected notes for the supplied question.
- Tool tests cover ranking, result limits, and unsafe paths.
- Controller tests cover a normal run, malformed calls, duplicates, limits,
  model pinning, and honest failure.
- The four guided prompts can be followed from a clean skeleton in 45 minutes
  or less, leaving at least 8 minutes for the learner-vault step.
- A learner can replace the vault contents without changing application code.
- The personal-vault instructions present the provider-policy decision before
  asking learners to copy private notes.

The live provider is useful for the final demonstration but is not required to
prove that the learner completed each coding checkpoint.
