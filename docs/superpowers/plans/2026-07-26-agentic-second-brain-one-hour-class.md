# Agentic Second Brain One-Hour Class Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished non-agentic skeleton that beginners can upgrade
into a safe tool-using second-brain agent with four guided prompts in under one
hour, plus a complete instructor reference.

**Architecture:** Skeleton and finished use the same public contracts, UI,
vault fixtures, controller interface, tool module names, and checkpoint tests.
Skeleton tool/controller learner regions contain typed stubs while its default
all-context path remains green; finished contains the completed regions.
Personal notes are a fail-closed development-only mode and can never enter a
production build trace.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Zod 4, Vitest,
direct OpenRouter-compatible `fetch`, Markdown files.

**Approved design:**
[`docs/superpowers/specs/2026-07-26-agentic-second-brain-one-hour-class-design.md`](../specs/2026-07-26-agentic-second-brain-one-hour-class-design.md)

---

## Current verified starting point

The feature worktree already contains:

- A complete skeleton UI and all-context API.
- A derived finished project with tested deterministic `listNotes`,
  `searchNotes`, and `readNote` functions.
- An uncommitted red-test draft at
  `projects/agentic-second-brain/finished/tests/tool-schemas.test.ts`.

Inspect and reuse the interrupted test if it matches the frozen API below.
Update the test before implementation where it does not. Do not recreate or
recopy either project.

## Frozen public contracts

Both projects expose the same browser response:

```ts
export interface ChatResponse {
  mode: "baseline" | "agentic";
  answer: string;
  model: string;
  restarted: boolean;
  sources: string[];
  activity: ActivityEvent[];
  usage: {
    modelCalls: number;
    notesSent: number;
    notesRead: number;
    contextCharacters: number;
  };
}
```

Both projects use these tool exports:

```ts
export const NOTE_TOOL_DEFINITIONS: ModelTool[];
export const NOTE_TOOL_VALIDATORS: Record<KnownToolName, z.ZodType>;

export async function executeToolCall(
  call: ModelToolCall,
  context: ToolExecutionContext,
): Promise<ToolExecutionResult>;
```

The result is:

```ts
export type ToolExecutionResult =
  | {
      ok: true;
      name: KnownToolName;
      output: string;
      readPath?: string;
      duplicate?: boolean;
    }
  | {
      ok: false;
      code:
        | "malformed_arguments"
        | "invalid_arguments"
        | "unknown_tool"
        | "unsafe_path"
        | "missing_note";
      output: string;
    };
```

Both controllers export `AGENT_LIMITS` and:

```ts
export async function runAgent(
  input: AgentRunInput,
  deps: AgentDependencies,
): Promise<AgentRunResult>;
```

`AgentRunInput` carries validated provider constraints. Every call through
`deps.complete` receives those constraints, including retries and restarted
fallback runs.

## Locked file map

### Present in both skeleton and finished

- `lib/contracts.ts` — identical public request/response/activity types.
- `app/page.tsx` and `app/globals.css` — same dual-mode-capable interface.
- `lib/vault/{types,load-vault,list-notes,search-notes,read-note,config}.ts`.
- `lib/model/openrouter.ts` — same request/provider-constraint support.
- `lib/agent/{tool-schemas,execute-tool,system-prompt,controller}.ts`.
- `tests/fixtures/` — same fictional controller transcripts and notes.
- `tests/checkpoint-tools.test.ts` and
  `tests/checkpoint-controller.test.ts` — excluded from the default skeleton
  suite but runnable through checkpoint scripts.

### Finished-only

- `scripts/check-models.ts`.

### Classroom material

- `README.md`, `MODEL-SETUP.md`, `INSTRUCTOR-GUIDE.md`.
- `skeleton/{README,CLAUDE,PROMPTS}.md`.
- `finished/{README,CLAUDE}.md`.
- `extra-extra-embeddings/{README,PROMPTS}.md`.
- `REHEARSAL.md` — reproducible timing evidence.

Keep files under roughly 250 lines where practical. Do not add an agent
framework, database, uploads, authentication, streaming, writable memory, or
vector storage.

### Task 1: Create green classroom seams and project parity

**Files:**
- Modify: both `lib/contracts.ts`
- Modify: both `app/page.tsx`
- Modify: both `app/globals.css`
- Modify: both `app/api/chat/route.ts`
- Modify: both `tests/contracts.test.ts`
- Modify: both `tests/chat-route.test.ts`
- Create: both `lib/agent/{tool-schemas,execute-tool}.ts`
- Create: both `tests/tool-schemas.test.ts`
- Create: both `tests/project-parity.test.ts`

- [ ] **Step 1: Write failing parity and contract tests**

Assert identical public contract fields, UI activity/source/usage fields, vault
fixtures, and the frozen schema/dispatcher exports. Align the interrupted
finished test with the frozen API, then copy the same behavioral test to
skeleton. The schemas and validated dispatcher are prepared support code, not
learner work.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/project-parity.test.ts tests/tool-schemas.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/tool-schemas.test.ts
```

Expected: both fail because the prepared support modules are absent.

- [ ] **Step 3: Implement identical prepared support**

Implement the strict three schemas and complete validated closed dispatcher in
both projects using the frozen API. Dispatch only to imported deterministic
tool dependencies supplied through `ToolExecutionContext`; use the same
dependency-injection model in both projects. The skeleton functions do not
exist until Task 2. Label all results as untrusted evidence.

- [ ] **Step 4: Prepare the shared dual-mode UI**

Render baseline or agentic badges from `response.mode`; always support activity,
sources, model, restart, model calls, notes sent/read, and context characters.
Keep existing loading, rollback, history bounds, errors, and accessibility.
Migrate both existing baseline routes and their contract/route fixtures to
return `mode: "baseline"`, `restarted: false`, and `usage.notesRead: 0` without
changing all-context behavior.

- [ ] **Step 5: Verify both projects are green**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0, including the previously red tool-schema test.

- [ ] **Step 6: Commit**

```bash
git add projects/agentic-second-brain/skeleton projects/agentic-second-brain/finished
git commit -m "chore: add one-hour classroom support"
```

### Task 2: Prepare the three-function learner checkpoint

**Files:**
- Modify: both `package.json`
- Modify: both `vitest.config.ts`
- Modify: both `tsconfig.json`
- Create: skeleton `lib/vault/{list-notes,search-notes,read-note}.ts`
- Create: both `tests/checkpoint-tools.test.ts`
- Create: both `vitest.checkpoint.config.ts`
- Modify: both `tests/project-parity.test.ts`

- [ ] **Step 1: Write the checkpoint test**

Use the same fixtures and assertions in both projects: metadata-only listing;
title > tag/folder > body ranking; five-result and 320-character snippet caps;
exact allowlisted read; unsafe/encoded traversal rejection; and opaque path
round trips.

- [ ] **Step 2: Add typed skeleton learner stubs**

Create the same named exports as finished. Each of the three skeleton functions
throws `checkpoint_not_implemented`. Do not include finished algorithms.

- [ ] **Step 3: Isolate checkpoint tests**

Default `npm test` excludes `tests/checkpoint-*.test.ts`. Add:

```json
{
  "test:checkpoint:tools": "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-tools.test.ts",
  "test:checkpoint:controller": "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-controller.test.ts"
}
```

Add `vitest.checkpoint.config.ts`; exclude checkpoint tests from TypeScript's
default project only if necessary, while keeping the stub modules typechecked.
Before learner changes, the skeleton checkpoint fails for
`checkpoint_not_implemented`; the finished checkpoint passes.

- [ ] **Step 4: Verify green defaults and checkpoint behavior**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/skeleton run test:checkpoint:tools
npm --prefix projects/agentic-second-brain/finished run test:checkpoint:tools
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: skeleton default checks and every finished command exit 0; skeleton
checkpoint fails only with `checkpoint_not_implemented`.

- [ ] **Step 5: Commit**

```bash
git add projects/agentic-second-brain/skeleton projects/agentic-second-brain/finished
git commit -m "chore: add one-hour classroom seams"
```

### Task 3: Build the controller in test-first slices

**Files:**
- Create: both `lib/agent/system-prompt.ts`
- Create: both `lib/agent/controller.ts`
- Modify: both `app/api/chat/route.ts`
- Test: both `tests/controller.test.ts`
- Test: both `tests/chat-route.test.ts`
- Create: both `tests/checkpoint-controller.test.ts`
- Modify: both `tests/project-parity.test.ts`
- Remove after finished route conversion: finished `lib/vault/all-context.ts`
- Remove after finished route conversion: finished `tests/all-context.test.ts`

#### Slice A: Preserve the working skeleton baseline

- [ ] **Step 1: Write skeleton controller parity tests**

Assert one call, all five notes, `mode: "baseline"`, and the frozen response.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/controller.test.ts tests/chat-route.test.ts
```

Expected: FAIL because the controller is absent.

- [ ] **Step 3: Refactor all-context behavior behind `runAgent`**

Add `AGENT_LIMITS` from the approved design. Put future schema/dispatcher/loop
work inside one marked `LEARNER CHECKPOINT 3` region. Route delegates to
`runAgent`; behavior remains non-agentic.

- [ ] **Step 4: Verify Slice A**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
```

Expected: all exit 0.

#### Slice B: Grounding prompt and one search/read transcript

- [ ] **Step 5: Write finished RED tests**

In both projects, assert the prepared prompt says notes are untrusted evidence,
note instructions must not be followed, claims require successfully returned
evidence, paths are cited, and insufficient evidence is stated honestly. The
system prompt is complete prepared support and is never a learner TODO.

Add one transcript: `search_notes` → bounded result → `read_note` → cited
answer. Assert assistant tool calls and matching results remain ordered.
Include one-note, two-note, lexical body-match, malicious-note, and absent-answer
fixtures in the finished controller test.

- [ ] **Step 6: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- tests/controller.test.ts
```

Expected: FAIL because prompt/controller are absent.

- [ ] **Step 7: Implement identical prompts and one transcript**

Copy the same complete grounding prompt implementation to skeleton and
finished, then expand the parity test to compare it. Every model call receives
all three definitions. Execute only through `executeToolCall`.

- [ ] **Step 8: Verify Slice B**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/project-parity.test.ts
```

Expected: both exit 0.

#### Slice C: Malformed, unknown, duplicate, and parallel calls

- [ ] **Step 9: Add RED tests**

Cover malformed arguments, unknown names, duplicate calls, and stable-order
parallel calls.

- [ ] **Step 10: Verify Slice C RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: FAIL on the newly added malformed/duplicate/parallel behavior.

- [ ] **Step 11: Implement minimal handling and verify GREEN**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: exit 0.

#### Slice D: Application bounds and retrieval minimisation

- [ ] **Step 12: Add RED tests**

Cover three model calls, four unique reads, six recent messages, 4,000-character
question, 12,000-character tool output, every search snippet within its
configured bound, successful-read-only sources, and honest step exhaustion.
Inspect every request: complete raw unread bodies must be absent; bounded search
snippets may be present.

- [ ] **Step 13: Verify Slice D RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: FAIL on at least one newly added bound or retrieval-minimisation
assertion.

- [ ] **Step 14: Implement bounds and verify GREEN**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: exit 0 with the one-note, two-note, lexical, absent-answer,
successful-source-only, bounded-snippet, and unread-body assertions passing.

#### Slice E: Model identity, fallback, and provider failures

- [ ] **Step 15: Add RED tests**

Cover router alias first-model pinning, later identity mismatch, clean fallback
only before successful tool work, no transcript-ID mixing, timeout, rate limit,
unavailable model, incompatible response, and accurate total calls/restart.

- [ ] **Step 16: Verify Slice E RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: FAIL on at least one new identity, fallback, or failure-class
assertion.

- [ ] **Step 17: Implement and verify GREEN**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts
```

Expected: exit 0.

#### Slice F: Finished route and shared UI contract

- [ ] **Step 18: Replace copied finished route expectations**

Assert `mode: "agentic"`, selected sources/activity, actual model, restart,
model-call/read counts, and friendly error mappings.

- [ ] **Step 19: Connect finished route**

Remove finished all-context production/test files together. The shared UI
already renders agent fields.

- [ ] **Step 20: Create and verify controller checkpoints**

Both checkpoint tests use the same mocked transcript. Finished passes. Skeleton
fails only because its marked `LEARNER CHECKPOINT 3` region still returns
`checkpoint_not_implemented`. Expand parity tests to cover controller
signature, checkpoint file, prompt, public contracts, UI, fixtures, and vault.

```bash
npm --prefix projects/agentic-second-brain/finished run \
  test:checkpoint:controller
npm --prefix projects/agentic-second-brain/skeleton run \
  test:checkpoint:controller
```

Expected: finished exits 0; skeleton fails only with
`checkpoint_not_implemented`.

- [ ] **Step 21: Verify both full projects**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0.

- [ ] **Step 22: Commit**

```bash
git add projects/agentic-second-brain/skeleton projects/agentic-second-brain/finished
git commit -m "feat: add classroom agent controller"
```

### Task 4: Add fail-closed development-only personal vaults

**Files:**
- Create: both `lib/vault/config.ts`
- Modify: both `lib/model/openrouter.ts`
- Modify: both `lib/agent/controller.ts`
- Modify: both `app/api/chat/route.ts`
- Modify: both `.env.example`
- Modify: both `.gitignore`
- Test: both `tests/vault-config.test.ts`
- Test: both `tests/openrouter.test.ts`
- Test: both `tests/controller.test.ts`
- Test: both `tests/chat-route.test.ts`
- Test: both `tests/project-parity.test.ts`

#### Slice A: Directory and environment gate

- [ ] **Step 1: Write RED configuration tests**

Default `vault/` works. Reject absolute/traversal roots. `vault-personal`
requires development runtime, fixed non-router model, one provider slug, empty
fallback, and exact policy acknowledgement.

- [ ] **Step 2: Verify RED in both projects**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/vault-config.test.ts tests/chat-route.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/vault-config.test.ts tests/chat-route.test.ts
```

Expected: both fail because config support is absent.

- [ ] **Step 3: Implement fail-before-load behavior**

Unsafe personal config returns HTTP 400 with exact code
`unsafe_personal_vault_configuration` before `loadVault` or `runAgent`.

- [ ] **Step 4: Verify Slice A GREEN**

Repeat Step 2. Expected: pass.

#### Slice B: Every provider request is pinned

- [ ] **Step 5: Write RED adapter/controller tests**

Every call, retry, and restarted run must contain:

```json
{
  "only": ["<fixed endpoint slug>"],
  "allow_fallbacks": false,
  "data_collection": "deny",
  "zdr": true
}
```

- [ ] **Step 6: Verify Slice B RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/openrouter.test.ts tests/controller.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/openrouter.test.ts tests/controller.test.ts
```

Expected: both fail because provider constraints are not threaded to every
request.

- [ ] **Step 7: Thread validated constraints through `AgentRunInput`**

The controller passes them to every `deps.complete` invocation. Adapter
serialises them as OpenRouter's `provider` request object.

- [ ] **Step 8: Verify Slice B GREEN**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/openrouter.test.ts tests/controller.test.ts tests/chat-route.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/openrouter.test.ts tests/controller.test.ts tests/chat-route.test.ts
```

Expected: all pass.

#### Slice C: Prove personal notes cannot enter builds

- [ ] **Step 9: Write tracing/privacy tests**

Assert both `next.config.ts` files trace only `vault/**/*.md`, never
`vault-personal`. Assert personal mode rejects `NODE_ENV=production`, Vercel,
and build-time contexts. Assert `.gitignore` ignores `vault-personal/`.

- [ ] **Step 10: Verify Slice C RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/vault-config.test.ts tests/project-parity.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/vault-config.test.ts tests/project-parity.test.ts
```

Expected: both fail because production/build rejection and tracing assertions
are not yet implemented.

- [ ] **Step 11: Implement local-only loading**

Do not modify output tracing to include a dynamic/personal directory. Personal
notes are available only to the local development server at request time.

- [ ] **Step 12: Verify complete green projects**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

- [ ] **Step 13: Commit**

```bash
git add projects/agentic-second-brain/skeleton projects/agentic-second-brain/finished
git commit -m "feat: add safe local personal vault switch"
```

### Task 5: Author the exact one-hour classroom path

**Files:**
- Create: `projects/agentic-second-brain/README.md`
- Create: `projects/agentic-second-brain/MODEL-SETUP.md`
- Create: `projects/agentic-second-brain/INSTRUCTOR-GUIDE.md`
- Create: `projects/agentic-second-brain/skeleton/{README,CLAUDE,PROMPTS}.md`
- Create: `projects/agentic-second-brain/finished/{README,CLAUDE}.md`
- Create: `projects/agentic-second-brain/extra-extra-embeddings/{README,PROMPTS}.md`
- Modify: `projects/second-brain/README.md`
- Modify: `projects/chat-agent/README.md`
- Test: skeleton `tests/classroom-materials.test.ts`

- [ ] **Step 1: Write RED material tests**

Assert exactly four numbered prompts with `Outcome`, `Files allowed to change`,
`Do not change`, `Verification`, and `Stop after`.

Assert ordered personal-vault headings/text:

1. Instructor validates OpenRouter and upstream policies.
2. Learner opts in.
3. Only then create/copy `vault-personal` and set environment values.

Assert Sam fallback, 60-minute rhythm, and cutovers.
The same test extracts every relative Markdown link in the new classroom files,
resolves it from the containing file, and asserts the target exists.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/classroom-materials.test.ts
```

Expected: FAIL because documents are absent.

- [ ] **Step 3: Write the four prompts**

Map exactly to Inspect, Build tools, Connect controller, and Verify. Prompt 2
runs `npm run test:checkpoint:tools`; Prompt 3 changes only marked learner
regions and runs `npm run test:checkpoint:controller`. Prompts are ordinary
Claude Code instructions and stop after each checkpoint.

- [ ] **Step 4: Make cutovers executable**

At minute 25, copy only these completed finished files into skeleton:

```text
lib/vault/list-notes.ts
lib/vault/search-notes.ts
lib/vault/read-note.ts
```

Provide a cross-platform Claude Code prompt to perform and verify the copy;
never copy `.env`, vault content, prepared schemas/dispatcher, UI, or deployment
metadata.

At minute 45:

```bash
npm --prefix projects/agentic-second-brain/finished run dev -- --port 3001
```

Stop the skeleton development server first, or leave it on port 3000 for the
before comparison. Learners open `http://localhost:3001` for the finished
reference. Rehearse this exact command and URL.

- [ ] **Step 5: Write model/privacy and instructor guides**

Include prepared state, concept → demo → build → trap, mock-first completion,
rehearsal rubric, fixed-provider setup before class, and checked official links.

- [ ] **Step 6: Add the inherited embeddings extra-extra**

Explain lexical mismatch, chunk → embedding → candidates → normal `read_note`,
stale indexes, metadata, privacy, and evaluation. Keep it explicitly outside
the 60-minute core and require no provider/database.

- [ ] **Step 7: Link Builds 2 and 3**

Add one optional-next-step link without calling existing Build 3 agentic.

- [ ] **Step 8: Verify materials and both complete projects**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
rg -n "vault-personal|PERSONAL_VAULT_POLICY_ACCEPTED|minute 25|minute 45" \
  projects/agentic-second-brain
```

Expected: commands exit 0, required phrases are present, and
`classroom-materials.test.ts` reports every relative Markdown link target
exists.

- [ ] **Step 9: Commit**

```bash
git add projects/agentic-second-brain \
  projects/second-brain/README.md projects/chat-agent/README.md
git commit -m "docs: add one-hour agentic second brain class"
```

### Task 6: Add the instructor compatibility command

**Files:**
- Create: finished `scripts/check-models.ts`
- Test: finished `tests/check-models.test.ts`
- Modify: finished `package.json`

- [ ] **Step 1: Write RED report tests**

Inject a fake model caller. Cover five trials, four-of-five threshold, actual
model, request count, failure classes, timestamp, per-trial router identity,
valid search/read/cited flow, and no file edits.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/check-models.test.ts
```

Expected: FAIL because checker is absent.

- [ ] **Step 3: Implement explicit live gate**

Add `check-models: "tsx scripts/check-models.ts"`. No HTTP occurs without
`--live`; print expected request consumption first.

- [ ] **Step 4: Verify focused and full project**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/check-models.test.ts
npm --prefix projects/agentic-second-brain/finished run check-models
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0; dry command explains `--live` and makes no request.

- [ ] **Step 5: Commit**

```bash
git add projects/agentic-second-brain/finished
git commit -m "feat: add classroom model compatibility check"
```

### Task 7: Verify software and record classroom rehearsals

**Files:**
- Create: `projects/agentic-second-brain/REHEARSAL.md`
- Modify if needed: files from Tasks 1–6 only
- Never create tracked `.env`, `vault-personal/`, `.vercel/`, or provider logs

- [ ] **Step 1: Run clean-install gates**

```bash
npm --prefix projects/agentic-second-brain/skeleton ci
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/finished ci
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0.

- [ ] **Step 2: Run repository/privacy checks**

```bash
git diff --check
git ls-files \
  | rg '(^|/)\.env($|\.)|vault-personal/|(^|/)\.vercel/' \
  | rg -v '(^|/)\.env\.example$'
rg -n "vault-personal" \
  projects/agentic-second-brain/skeleton/next.config.ts \
  projects/agentic-second-brain/finished/next.config.ts
```

Expected: first exits 0; second and third produce no output.

- [ ] **Step 3: Record instructor rehearsal**

In a temporary clean copy, record starting commit, Node version, dependency/API
prepared state, per-prompt wall times, checkpoint results, and whether each
cutover command works. Mock completion counts; live inference is optional.

- [ ] **Step 4: Record beginner rehearsal**

A beginner-level tester repeats the clean-copy Sam core. Record the same data.
Classroom-ready requires 45 minutes or less. If a tester is unavailable or time
exceeds 45 minutes, mark the classroom timing gate `BLOCKED`; do not claim the
one-hour class is validated.

- [ ] **Step 5: Re-run the automated acceptance matrix**

The assertions were created in Tasks 3 and 4. Run them without adding new
late-stage behavior:

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/controller.test.ts tests/chat-route.test.ts tests/vault-config.test.ts
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/controller.test.ts tests/chat-route.test.ts tests/vault-config.test.ts
```

Expected: both exit 0, covering one-note, two-note, lexical, absent-answer,
successful-read-only sources, bounded snippets, unread-body absence, malicious
note instructions, and unsafe personal configuration before load/model call.

- [ ] **Step 6: Browser-check**

Use `browser:control-in-app-browser` for desktop/narrow layouts, missing-key,
mocked success, activity/sources, and friendly failures. Request port approval
once if required and report any remaining limitation.

- [ ] **Step 7: Review**

Invoke `superpowers:verification-before-completion` and
`superpowers:requesting-code-review`. Fix Critical/Important findings with a
failing regression test first.

- [ ] **Step 8: Re-verify any post-review change**

If browser work or review changes code or docs, repeat the complete clean gates
from Step 1, privacy checks from Step 2, acceptance commands from Step 5, and
the affected browser/link check. Expected: all required commands pass before
staging.

- [ ] **Step 9: Record and commit rehearsal evidence**

Always commit `REHEARSAL.md` after an attempted validation. If beginner
rehearsal is unavailable or exceeds 45 minutes, record `BLOCKED` and the
evidence without claiming readiness. If verification corrections also changed,
include them:

```bash
git add projects/agentic-second-brain \
  projects/second-brain/README.md projects/chat-agent/README.md
git commit -m "chore: verify one-hour agentic second brain class"
```

If no rehearsal was attempted and no file changed, require
`git status --short` to be empty and do not create an empty commit.

Do not deploy, push, merge, or remove the worktree in this plan. Those are
separate handoff decisions after the local classroom build is approved.
