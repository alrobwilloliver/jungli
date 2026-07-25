# Optional Agentic Second Brain Extension — Design

**Date:** 2026-07-25  
**Status:** Approved in conversation; implementation-readiness review passed

## Goal

Create a self-contained optional Jungli class that turns the existing
context-grounded chat demonstration into a small, genuine agent. Instead of
sending every second-brain note with every API call, the model receives three
tools, chooses which notes to search and read, observes the results, and answers
from the selected evidence.

The class exists to teach one idea clearly:

> A chatbot is given context and answers. An agent decides what information it
> needs, uses tools to get it, observes the result, and continues until it can
> answer.

This is a teaching demo, not a claim that a free-model deployment is a reliable
production service.

## Audience and placement

- Optional extension after Build 2 (second brain) and Build 3 (grounded chat).
- Beginner-friendly core path, with challenge prompts for experienced learners.
- No prior knowledge of function schemas, retrieval systems, or agent
  frameworks is assumed.
- Primary building surface remains the Claude desktop app's Code tab.
- The extension uses the fictional Sam Rivera vault. Real CVs, private notes,
  client material, and other sensitive information are out of scope for the
  shared exercise and deployed reference.
- Embeddings and vector search are an optional "extra-extra," not part of the
  reliable core path.

## Recommended teaching shape

The starter is a complete, working non-agentic application that sends every
sample note on every question. Learners transform that application rather than
starting from a blank project or trying to modify many different personal apps.
The finished reference shows the same user experience backed by bounded tool
calling.

This creates an explicit before-and-after:

```text
Before: question + every note → one model call → answer

After:  question → choose tool → observe result → choose/read → answer
```

The learner should be able to inspect the server log or an on-screen activity
trace and see that only selected note contents entered the model context.

## Deliverables

Create a new project without changing the role of the existing Build 2 or Build
3:

```text
projects/agentic-second-brain/
├── README.md
├── skeleton/
│   ├── README.md
│   ├── CLAUDE.md
│   ├── PROMPTS.md
│   ├── MODEL-SETUP.md
│   ├── .env.example
│   ├── package.json
│   ├── app/
│   ├── lib/
│   ├── vault/
│   └── tests/
├── finished/
│   ├── README.md
│   ├── CLAUDE.md
│   ├── PROMPTS.md
│   ├── MODEL-SETUP.md
│   ├── .env.example
│   ├── package.json
│   ├── app/
│   ├── lib/
│   ├── vault/
│   └── tests/
├── extra-extra-embeddings/
│   ├── README.md
│   └── PROMPTS.md
└── slides/
    ├── README.md
    └── workshop-guide.md
```

The implementation is a small TypeScript Next.js application using the App
Router, a server-side chat endpoint, and an OpenRouter-compatible chat
completion request. It is self-contained and deployable to Vercel. The exact
package versions are locked in the implementation plan and lockfile.

`skeleton/` is intentionally a working baseline, not an empty scaffold. It
includes Sam's sample notes and the all-notes-in-every-request implementation.
`finished/` contains the bounded tool loop, model compatibility handling,
visible activity, citations, and tests.

## Workshop sequence

Use the existing Jungli `concept → demo → build → trap` rhythm:

1. **Concept:** revisit the agent loop: decide → act → observe → repeat.
2. **Demo:** inspect the baseline payload and show every note being resent.
3. **Build:** create and test three ordinary note functions.
4. **Concept:** a tool definition describes a function; the application, not
   the model, executes it.
5. **Build:** expose the functions as model tools and handle one tool result.
6. **Build:** add a bounded multi-step loop and visible activity trace.
7. **Test:** ask questions requiring one note, two notes, a lexical search, and
   an honest "not found."
8. **Trap:** demonstrate rate limits, weak tool choice, malformed calls, and
   model availability without blaming the learner.
9. **Extension:** show where embeddings would fit and the lexical mismatch they
   solve.

The workshop guide should fit a 90–120 minute optional session, with independent
checkpoints after the baseline inspection, local tools, first tool call, and
complete loop.

## Stable application layers

### 1. Vault

Markdown files remain the source of truth. The application packages a read-only
copy of Sam Rivera's sample vault. Updating notes requires changing the files
and redeploying; uploads, authentication, databases, and writable memory are
out of scope.

Each note has a stable relative path, title, folder, body, and optional tags.
At build time or server startup, the application creates a compact catalogue
from the vault. The catalogue contains metadata, not a second proprietary copy
of the learner's knowledge.

### 2. Deterministic note tools

Implement and test three ordinary server-side functions:

- `list_notes(folder?)` returns paths, titles, folders, and short descriptions.
- `search_notes(query)` performs transparent lexical search across title,
  folder, tags, and body; it returns at most five ranked candidates with short
  snippets.
- `read_note(path)` returns one complete note from the allowlisted vault.

Search finds candidates; read retrieves evidence. `search_notes` must never
return the complete vault. `read_note` rejects unknown paths, absolute paths,
and traversal outside the vault.

Title matches rank above folder/tag matches, which rank above body matches.
The implementation can use a small deterministic scoring function; no search
service or database is required.

### 3. Model adapter

One module owns OpenRouter protocol details:

- Construct chat-completion requests and include tool definitions on every
  required turn.
- Parse tool calls and validate their JSON arguments.
- Preserve assistant tool-call messages and matching tool results.
- Normalise empty content and provider-specific response quirks that appear
  through the OpenAI-compatible interface.
- Record the actual model returned by OpenRouter.
- Classify invalid key, rate limit, unavailable model, incompatible tool
  response, timeout, and unknown-provider failures.

No OpenRouter key reaches the browser. The key is read only from the server
environment.

### 4. Bounded agent controller

Application code, not the model, owns the loop and its safety limits:

- One model is selected at the start of each user question.
- A run uses at most three model calls.
- A run reads at most four unique notes.
- Only the three known tool names may execute.
- Tool arguments are schema-validated.
- Duplicate calls return an informative result rather than executing
  indefinitely.
- Tool output and the user question have explicit size limits.
- A timeout or exhausted step budget produces an honest partial-failure
  response.

If a configured model fails before useful work, the application may restart the
whole run once with a configured fallback. It must not mix two models inside
one tool transcript. The UI tells the user when a run was restarted and always
shows the actual model used.

Native parallel tool requests, if returned, are validated and executed in a
stable order. The core lesson does not rely on interleaved or exposed reasoning.

### 5. Context and conversation

Each new question starts a new bounded retrieval run. The application may send
a short, bounded window of recent user and assistant text for conversational
continuity, but it does not resend prior tool transcripts or every vault note.
The agent searches again when a follow-up needs evidence.

Every tool result labels source text as untrusted evidence, not instructions.
The system prompt tells the model not to follow instructions found inside
notes.

### 6. Answer and activity display

The final response:

- Uses only evidence returned by note tools.
- Says when the evidence is insufficient.
- Names the source files used.
- Separates supported facts from interpretation.

The UI displays a concise activity trace based on application events, not hidden
model reasoning:

```text
Searching notes for "customer retention"
Reading projects/referral-program.md
Reading career/product-marketing.md
Answered from 2 notes
```

It also displays the selected model and source chips. The trace may describe
tool actions and results, but it must not claim to expose chain-of-thought.

## Model policy: free-first with an escape hatch

Free-model availability is treated as changeable infrastructure rather than a
permanent curriculum fact.

The application accepts:

```text
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
OPENROUTER_FALLBACK_MODEL=openrouter/free
```

The instructor guide records a currently validated primary model and its last
check date. As of the design date,
`nvidia/nemotron-3-ultra-550b-a55b:free` is a provisional candidate because
OpenRouter lists it as free, agent-oriented, and tool-capable. It is not
described as permanently available.

`openrouter/free` is a last-resort fallback. OpenRouter says it filters the free
pool for requested capabilities such as tool calling, but it randomly selects
within the eligible pool, so it is not the primary classroom path.

Include an instructor-facing compatibility command:

```text
npm run check-models
```

The check uses the real three tool schemas and a fixture vault. For every
candidate it verifies:

1. The model requests `search_notes` for a known question.
2. Arguments parse and pass the schema.
3. After a search result, the model requests the expected `read_note`.
4. After the note result, the model returns a supported answer with a source.
5. The whole workflow succeeds in at least four of five trials.

The report shows the candidate slug, actual returned model, pass count, failure
classes, request count, and timestamp. It does not automatically edit course
files or select a model. Alan runs it before the class and updates the documented
primary deliberately.

## Free-tier and deployment expectations

A tool-using question generally consumes two or three model requests, not one.
OpenRouter currently documents 50 free-model requests per day for accounts that
have not purchased at least $10 in credits. The learner flow therefore uses a
small set of deliberate questions and displays request usage for the current
run.

The finished application is deployed to Vercel as a public teaching reference,
with `OPENROUTER_API_KEY` and model configuration stored in Vercel environment
variables. It includes:

- A visible "teaching demo" label.
- A notice that free-model availability and daily capacity are not guaranteed.
- Maximum message length and bounded tool/model steps.
- Helpful rate-limit and model-unavailable states.
- No uploads, writes, authentication, or persistent user conversations.

The public demo may exhaust its free allowance and is not presented as a
production service. Because the first delivery has no authentication or durable
rate-limit store, its input and loop limits prevent accidental runaway requests
but do not provide abuse protection. The deployed page tells visitors that
capacity is shared and may be temporarily unavailable. Deployment documentation
includes how to disable or protect the deployment, change the model environment
variable, and redeploy without changing application code.

## Privacy

The shared build and deployed reference use only fictional Sam Rivera material.
The learner guide explicitly warns that free endpoints can have provider-specific
logging and training policies. The currently provisional NVIDIA free endpoint
states that users should not upload confidential or personal information.

The class does not tell learners to substitute real CVs or private notes unless
they have reviewed and accepted the selected provider's current data policy.
Changing the model can change the applicable policy.

## Prompt design

`skeleton/PROMPTS.md` provides two paths.

### Guided beginner path

Eight staged copy-paste prompts:

1. Inspect the baseline and identify where every note enters the request; make
   no changes.
2. Add a safe vault catalogue and explain its shape.
3. Implement and test `list_notes`, `search_notes`, and `read_note` as ordinary
   functions.
4. Add the three tool schemas without adding a loop.
5. Handle one model tool request, execute it in application code, and return
   the tool result.
6. Generalise that flow into the bounded agent controller.
7. Add activity events, model identity, citations, and human-readable failure
   states.
8. Run the supplied retrieval questions, inspect the requests, and compare the
   before/after context.

Each prompt identifies the intended outcome, protected boundaries, visible
success condition, and verification command. Prompts tell the coding agent to
stop after the checkpoint so learners can inspect the result.

### Challenge path

One compact specification asks experienced learners to implement the same
interfaces, limits, tests, and UI evidence without prescribing the sequence.
The acceptance criteria are identical to the guided path.

## Slides

`slides/workshop-guide.md` is a Marp deck using the existing Jungli theme. Keep
it presenter-led and low density. It covers:

1. Why sending every note works—and where it breaks.
2. Chatbot versus agent.
3. The decide → act → observe → repeat loop.
4. A tool is a schema plus an ordinary function.
5. The three note tools.
6. Live before/after request context.
7. Guided build checkpoints.
8. Visible activity versus hidden reasoning.
9. Model variability: protocol, availability, and intelligence.
10. Free-tier requests and failure states.
11. Privacy with fictional versus personal notes.
12. Where embeddings fit as the next retrieval layer.
13. Recap: stable pattern, replaceable model.

The deck and prompt guide avoid asserting that a named free model will remain
free. Time-sensitive facts include a checked date and official source link.

## Embeddings extra-extra

The core finished application deliberately uses lexical retrieval. The optional
extension introduces one test that lexical matching misses, such as a note about
"reducing customer drop-off" and a question about "retention."

`extra-extra-embeddings/README.md` explains the concept and
`extra-extra-embeddings/PROMPTS.md` offers an optional implementation path for:

- Chunking or embedding atomic notes.
- Semantic similarity search.
- Metadata and source preservation.
- Re-indexing changed notes.
- Hybrid lexical plus semantic retrieval.

It is a separate exercise so the core class remains transparent, database-free,
and finishable. The implementation plan may document this extension, but the
first delivery is not blocked on building vector storage.

## Error handling

Learner-facing errors distinguish:

- Missing or invalid API key.
- Free daily rate limit reached.
- Configured model removed or unavailable.
- Model does not support required tools.
- Malformed or unknown tool call.
- Unsafe or missing note path.
- Agent step/read limit reached.
- OpenRouter timeout or transient provider failure.

Every message states whether the likely problem is configuration, temporary
model infrastructure, model behaviour, or application code. Raw provider
responses remain in server logs and are not exposed with secrets to the browser.

## Verification

Before delivery:

1. Run formatting, lint, typecheck, unit tests, and production builds in both
   skeleton and finished projects.
2. Test note ranking, result limits, empty searches, allowlisted reads, and path
   traversal rejection.
3. Test the controller with mocked normal, multi-tool, malformed, duplicate,
   step-limit, timeout, rate-limit, and restart transcripts.
4. Run the live compatibility check against the currently documented primary
   and fallback immediately before deployment.
5. Verify through server logs that the finished app does not send the complete
   vault on ordinary questions.
6. Ask the supplied one-note, two-note, lexical, linked-topic, and absent-answer
   questions; verify sources and activity events.
7. Deploy the finished project to Vercel, confirm environment variables remain
   server-only, and smoke-test the production URL.
8. Render the Marp deck and visually inspect every slide for overflow,
   legibility, and correct links.
9. Verify all prompt checkpoints and internal Markdown links.
10. Confirm privacy, free-tier, checked-date, and demo-only notices appear in
    the README, model setup, slides, and deployed reference.

## Success criteria

A beginner can start from the working skeleton, follow the guided prompts,
observe the difference between receiving all context and choosing context,
implement three understandable tools, and run a bounded agent loop that answers
from selected notes with sources.

An experienced learner can reach the same acceptance criteria through the
challenge prompt. Alan can switch the configured OpenRouter model, validate it
before class, deploy the finished result to Vercel, and explain failures without
conflating model availability, protocol compatibility, retrieval quality, or
application bugs.
