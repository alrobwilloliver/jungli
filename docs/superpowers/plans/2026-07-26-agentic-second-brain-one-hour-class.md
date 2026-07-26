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
- Modify: both `package.json`
- Modify: both `vitest.config.ts`
- Modify: both `tsconfig.json`
- Create: skeleton `lib/vault/{list-notes,search-notes,read-note}.ts`
- Create: skeleton `lib/agent/{tool-schemas,execute-tool}.ts`
- Create: skeleton `tests/checkpoint-tools.test.ts`
- Create: skeleton `tests/checkpoint-controller.test.ts`
- Create: both `tests/project-parity.test.ts`

- [ ] **Step 1: Write failing parity and contract tests**

Assert identical public contract fields, UI activity/source/usage fields, vault
fixtures, module paths, controller signature, and checkpoint filenames.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- tests/project-parity.test.ts
```

Expected: FAIL because skeleton lacks the learner seams and shared contract.

- [ ] **Step 3: Add typed skeleton stubs**

Create the same named exports as finished. Each learner function throws a
classified `checkpoint_not_implemented` error. Do not include completed
algorithm bodies or finished tool dispatch logic in skeleton.

- [ ] **Step 4: Isolate checkpoint tests**

Default `npm test` excludes `tests/checkpoint-*.test.ts`. Add:

```json
{
  "test:checkpoint:tools": "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-tools.test.ts",
  "test:checkpoint:controller": "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-controller.test.ts"
}
```

Add `vitest.checkpoint.config.ts`; exclude checkpoint tests from TypeScript's
default project only if necessary, while keeping the stub modules typechecked.
Before learner changes, each checkpoint command fails for
`checkpoint_not_implemented`; the default suite remains green.

- [ ] **Step 5: Prepare the shared dual-mode UI**

Render baseline or agentic badges from `response.mode`; always support activity,
sources, model, restart, model calls, notes sent/read, and context characters.
Keep existing loading, rollback, history bounds, errors, and accessibility.

- [ ] **Step 6: Verify GREEN default and intentional checkpoint RED**

```bash
npm --prefix projects/agentic-second-brain/skeleton test
npm --prefix projects/agentic-second-brain/skeleton run format:check
npm --prefix projects/agentic-second-brain/skeleton run lint
npm --prefix projects/agentic-second-brain/skeleton run typecheck
npm --prefix projects/agentic-second-brain/skeleton run build
npm --prefix projects/agentic-second-brain/skeleton run test:checkpoint:tools
```

Expected: first five exit 0; final command fails only with
`checkpoint_not_implemented`.

- [ ] **Step 7: Verify finished remains green**

```bash
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0.

- [ ] **Step 8: Commit**

```bash
git add projects/agentic-second-brain/skeleton projects/agentic-second-brain/finished
git commit -m "chore: add one-hour classroom seams"
```

### Task 2: Complete and validate the three note tools

**Files:**
- Modify: finished `lib/agent/tool-schemas.ts`
- Modify: finished `lib/agent/execute-tool.ts`
- Test: finished `tests/tool-schemas.test.ts`
- Test: finished `tests/checkpoint-tools.test.ts`
- Modify only during rehearsal: skeleton learner-region tool files

- [ ] **Step 1: Align the interrupted test with the frozen API**

Cover exactly three strict definitions, strict Zod arguments, malformed JSON,
extra arguments, unknown tools, unsafe/missing paths, duplicate reads,
unique-read accounting, and untrusted evidence labels.

- [ ] **Step 2: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- tests/tool-schemas.test.ts
```

Expected: FAIL because production modules are absent.

- [ ] **Step 3: Implement strict schemas**

Use `additionalProperties: false`. Arguments:

```ts
list_notes: { folder?: string }
search_notes: { query: string /* trimmed, 1..400 */ }
read_note: { path: string /* 1..500 */ }
```

- [ ] **Step 4: Implement the closed dispatcher**

Execute only imported deterministic tools. Never resolve a model path against
the filesystem. Label catalogue/search/read outputs as untrusted evidence.
Return the frozen result union for every malformed or rejected call.

- [ ] **Step 5: Verify tool GREEN**

```bash
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/note-tools.test.ts tests/tool-schemas.test.ts tests/checkpoint-tools.test.ts
```

Expected: all pass.

- [ ] **Step 6: Run the complete finished gate**

```bash
npm --prefix projects/agentic-second-brain/finished test
npm --prefix projects/agentic-second-brain/finished run format:check
npm --prefix projects/agentic-second-brain/finished run lint
npm --prefix projects/agentic-second-brain/finished run typecheck
npm --prefix projects/agentic-second-brain/finished run build
```

Expected: all exit 0.

- [ ] **Step 7: Commit**

```bash
git add projects/agentic-second-brain/finished
git commit -m "feat: define safe note tools for the model"
```

### Task 3: Build the controller in test-first slices

**Files:**
- Create: both `lib/agent/system-prompt.ts`
- Create: both `lib/agent/controller.ts`
- Modify: both `app/api/chat/route.ts`
- Test: both `tests/controller.test.ts`
- Test: both `tests/chat-route.test.ts`
- Test: finished `tests/checkpoint-controller.test.ts`
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

Run skeleton full tests, format, lint, typecheck, and build. Expected: all pass.

#### Slice B: Grounding prompt and one search/read transcript

- [ ] **Step 5: Write finished RED tests**

Assert the prompt says notes are untrusted evidence, note instructions must not
be followed, claims require successfully returned evidence, paths are cited,
and insufficient evidence is stated honestly. Include a malicious note fixture
and an unanswerable question.

Add one transcript: `search_notes` → bounded result → `read_note` → cited
answer. Assert assistant tool calls and matching results remain ordered.

- [ ] **Step 6: Verify RED**

```bash
npm --prefix projects/agentic-second-brain/finished test -- tests/controller.test.ts
```

Expected: FAIL because prompt/controller are absent.

- [ ] **Step 7: Implement prompt and one transcript**

Every model call receives all three definitions. Execute only through
`executeToolCall`.

- [ ] **Step 8: Verify Slice B**

Run the focused controller test. Expected: pass.

#### Slice C: Malformed, unknown, duplicate, and parallel calls

- [ ] **Step 9: Add RED tests**

Cover malformed arguments, unknown names, duplicate calls, and stable-order
parallel calls.

- [ ] **Step 10: Implement minimal handling and verify GREEN**

Run focused controller tests. Expected: pass.

#### Slice D: Application bounds and retrieval minimisation

- [ ] **Step 11: Add RED tests**

Cover three model calls, four unique reads, six recent messages, 4,000-character
question, 12,000-character tool output, every search snippet within its
configured bound, successful-read-only sources, and honest step exhaustion.
Inspect every request: complete raw unread bodies must be absent; bounded search
snippets may be present.

- [ ] **Step 12: Implement bounds and verify GREEN**

Run focused controller tests. Expected: pass.

#### Slice E: Model identity, fallback, and provider failures

- [ ] **Step 13: Add RED tests**

Cover router alias first-model pinning, later identity mismatch, clean fallback
only before successful tool work, no transcript-ID mixing, timeout, rate limit,
unavailable model, incompatible response, and accurate total calls/restart.

- [ ] **Step 14: Implement and verify GREEN**

Run focused controller tests. Expected: pass.

#### Slice F: Finished route and shared UI contract

- [ ] **Step 15: Replace copied finished route expectations**

Assert `mode: "agentic"`, selected sources/activity, actual model, restart,
model-call/read counts, and friendly error mappings.

- [ ] **Step 16: Connect finished route**

Remove finished all-context production/test files together. The shared UI
already renders agent fields.

- [ ] **Step 17: Verify both full projects**

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

- [ ] **Step 18: Commit**

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

- [ ] **Step 6: Thread validated constraints through `AgentRunInput`**

The controller passes them to every `deps.complete` invocation. Adapter
serialises them as OpenRouter's `provider` request object.

- [ ] **Step 7: Verify Slice B GREEN**

```bash
npm --prefix projects/agentic-second-brain/skeleton test -- \
  tests/openrouter.test.ts tests/controller.test.ts tests/chat-route.test.ts
npm --prefix projects/agentic-second-brain/finished test -- \
  tests/openrouter.test.ts tests/controller.test.ts tests/chat-route.test.ts
```

Expected: all pass.

#### Slice C: Prove personal notes cannot enter builds

- [ ] **Step 8: Write tracing/privacy tests**

Assert both `next.config.ts` files trace only `vault/**/*.md`, never
`vault-personal`. Assert personal mode rejects `NODE_ENV=production`, Vercel,
and build-time contexts. Assert `.gitignore` ignores `vault-personal/`.

- [ ] **Step 9: Implement local-only loading**

Do not modify output tracing to include a dynamic/personal directory. Personal
notes are available only to the local development server at request time.

- [ ] **Step 10: Verify complete green projects**

Run full tests, format, lint, typecheck, and build in both projects using the
exact ten commands from Task 3 Step 17.

- [ ] **Step 11: Commit**

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
lib/agent/tool-schemas.ts
lib/agent/execute-tool.ts
```

Provide a cross-platform Claude Code prompt to perform and verify the copy;
never copy `.env`, vault content, UI, or deployment metadata.

At minute 45:

```bash
npm --prefix projects/agentic-second-brain/finished run dev
```

Learners open the finished reference and continue the demo.

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

Expected: commands exit 0 and required phrases are present. Open every new
relative Markdown link target.

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
git ls-files | rg '(^|/)(\\.env$|vault-personal/|\\.vercel/)'
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

- [ ] **Step 5: Automate acceptance assertions**

Tests must cover one-note, two-note, lexical, and absent-answer fixtures;
successful-read-only sources; every bounded snippet; full raw unread-body
absence in every request; malicious note instructions; and unsafe personal
configuration failing before load/model call.

- [ ] **Step 6: Browser-check**

Use `browser:control-in-app-browser` for desktop/narrow layouts, missing-key,
mocked success, activity/sources, and friendly failures. Request port approval
once if required and report any remaining limitation.

- [ ] **Step 7: Review**

Invoke `superpowers:verification-before-completion` and
`superpowers:requesting-code-review`. Fix Critical/Important findings with a
failing regression test first.

- [ ] **Step 8: Commit only if files changed**

If `REHEARSAL.md` or verified corrections changed:

```bash
git add projects/agentic-second-brain \
  projects/second-brain/README.md projects/chat-agent/README.md
git commit -m "chore: verify one-hour agentic second brain class"
```

Otherwise require `git status --short` to be empty and do not create an empty
commit.

Do not deploy, push, merge, or remove the worktree in this plan. Those are
separate handoff decisions after the local classroom build is approved.
