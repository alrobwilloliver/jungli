# Agentic Second Brain One-Hour Class Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished non-agentic skeleton that beginners can upgrade
into a safe tool-using second-brain agent with four guided prompts in under one
hour, plus a complete instructor reference.

**Architecture:** Keep the existing skeleton's UI, OpenRouter adapter, vault
loader, and all-context behavior working. Refactor that behavior behind a
prepared `runAgent` controller whose marked integration region is the only
controller code learners change. The finished copy implements the same
interface with three validated note tools, a bounded model loop, selected-note
activity and sources, and a fail-closed optional personal-vault configuration.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Zod 4, Vitest,
direct OpenRouter-compatible `fetch`, Markdown files.

**Approved design:**
[`docs/superpowers/specs/2026-07-26-agentic-second-brain-one-hour-class-design.md`](../specs/2026-07-26-agentic-second-brain-one-hour-class-design.md)

---

## Current verified starting point

The feature worktree already contains:

- A complete skeleton UI and all-context API with 82 passing tests.
- A derived finished project with deterministic `listNotes`, `searchNotes`, and
  `readNote` functions.
- 105 passing tests across the finished project.
- An uncommitted red-test draft at
  `projects/agentic-second-brain/finished/tests/tool-schemas.test.ts` from the
  interrupted tool-schema task. Inspect and reuse it if it matches Task 1;
  replace it only if it tests the wrong behavior.

Do not recreate or recopy either project.

## Locked file map

### Shared application support

- `skeleton/lib/vault/config.ts` and `finished/lib/vault/config.ts` own safe
  vault-root and personal-data configuration.
- `skeleton/lib/model/openrouter.ts` and `finished/lib/model/openrouter.ts` own
  provider request constraints.
- `skeleton/lib/agent/controller.ts` is the working all-context baseline plus
  marked learner integration points.
- `finished/lib/agent/controller.ts` is the complete bounded loop.
- `finished/lib/agent/tool-schemas.ts` owns exactly three JSON schemas and Zod
  validators.
- `finished/lib/agent/execute-tool.ts` is the only model-tool dispatcher.

### Classroom material

- `projects/agentic-second-brain/skeleton/PROMPTS.md` contains exactly four
  guided prompts plus the optional personal-vault switch.
- `projects/agentic-second-brain/skeleton/README.md` contains the 60-minute
  learner path.
- `projects/agentic-second-brain/finished/README.md` identifies the instructor
  fallback.
- `projects/agentic-second-brain/MODEL-SETUP.md` documents shared model/privacy
  setup once; skeleton and finished READMEs link to it.
- `projects/agentic-second-brain/INSTRUCTOR-GUIDE.md` contains preparation,
  minute-by-minute delivery, and minute-25/minute-45 cutovers.

Keep production files under roughly 250 lines where practical. Do not add an
agent framework, database, uploads, authentication, streaming, writable
memory, or vector search.

### Task 1: Complete the safe model-tool boundary

**Files:**
- Create: `projects/agentic-second-brain/finished/lib/agent/tool-schemas.ts`
- Create: `projects/agentic-second-brain/finished/lib/agent/execute-tool.ts`
- Test: `projects/agentic-second-brain/finished/tests/tool-schemas.test.ts`

- [ ] **Step 1: Inspect the interrupted red test**

Confirm it covers the exact three names, strict arguments, malformed JSON,
unknown tools, unsafe/missing note paths, unique-read accounting, and untrusted
evidence labels. Remove accidental or speculative assertions.

- [ ] **Step 2: Run the focused test and confirm RED**

```bash
cd projects/agentic-second-brain/finished
npm test -- tests/tool-schemas.test.ts
```

Expected: FAIL because `tool-schemas.ts` and `execute-tool.ts` are absent.

- [ ] **Step 3: Define exactly three strict tools**

Export `NOTE_TOOLS` plus Zod schemas:

```ts
export const listNotesArgsSchema = z
  .object({ folder: z.string().min(1).optional() })
  .strict();
export const searchNotesArgsSchema = z
  .object({ query: z.string().trim().min(1).max(400) })
  .strict();
export const readNoteArgsSchema = z
  .object({ path: z.string().min(1).max(500) })
  .strict();
```

The OpenAI-compatible JSON schemas set `additionalProperties: false`.

- [ ] **Step 4: Implement the closed dispatcher**

```ts
export async function executeTool(input: {
  name: string;
  argumentsJson: string;
  notes: VaultNote[];
  readPaths: Set<string>;
}): Promise<ToolExecutionResult>;
```

Return a classified, serializable result for malformed JSON, invalid
arguments, unknown names, duplicate reads, and unsafe/missing paths. Execute
only the three imported deterministic functions. Label snippets and bodies as
untrusted evidence.

- [ ] **Step 5: Verify GREEN and the full project**

```bash
npm test -- tests/tool-schemas.test.ts
npm test
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Expected: all exit 0.

- [ ] **Step 6: Commit**

```bash
git add projects/agentic-second-brain/finished/lib/agent \
  projects/agentic-second-brain/finished/tests/tool-schemas.test.ts
git commit -m "feat: define safe note tools for the model"
```

### Task 2: Add the classroom controller scaffold and finished bounded loop

**Files:**
- Create: `projects/agentic-second-brain/skeleton/lib/agent/controller.ts`
- Create: `projects/agentic-second-brain/skeleton/lib/agent/system-prompt.ts`
- Modify: `projects/agentic-second-brain/skeleton/app/api/chat/route.ts`
- Test: `projects/agentic-second-brain/skeleton/tests/controller.test.ts`
- Create: `projects/agentic-second-brain/finished/lib/agent/controller.ts`
- Create: `projects/agentic-second-brain/finished/lib/agent/system-prompt.ts`
- Test: `projects/agentic-second-brain/finished/tests/controller.test.ts`

- [ ] **Step 1: Write skeleton parity tests**

Tests prove that `runAgent` currently makes one model call, sends all five Sam
notes, and returns the existing baseline activity/sources/usage contract. The
route delegates to `runAgent` without changing observable behavior.

- [ ] **Step 2: Verify skeleton RED**

```bash
cd projects/agentic-second-brain/skeleton
npm test -- tests/controller.test.ts tests/chat-route.test.ts
```

Expected: FAIL because the controller is absent.

- [ ] **Step 3: Refactor the baseline behind the scaffold**

Export:

```ts
export const AGENT_LIMITS = {
  maxModelCalls: 3,
  maxUniqueNoteReads: 4,
  maxQuestionCharacters: 4_000,
  maxToolResultCharacters: 12_000,
  maxRecentMessages: 6,
  requestTimeoutMs: 25_000,
} as const;

export async function runAgent(
  input: AgentRunInput,
  deps: AgentDependencies,
): Promise<AgentRunResult>;
```

The initial skeleton implementation retains its one-call all-context behavior.
Put the future tools/loop imports and execution inside one clearly marked
`LEARNER CHECKPOINT 3` region. Do not ship commented complete answers in the
skeleton.

- [ ] **Step 4: Verify the skeleton remains a working baseline**

```bash
npm test
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Expected: all exit 0 and baseline tests still report five notes sent.

- [ ] **Step 5: Write finished controller tests before implementation**

Cover:

- Search → read → supported answer.
- Native parallel calls in stable order.
- Malformed/unknown/duplicate calls.
- Four-unique-read and three-model-call limits.
- Tool-result truncation and six-message history bound.
- Router alias pinning after the first actual model.
- Rejection when actual identity changes later.
- Clean one-time fallback only before successful tool execution.
- Timeout/rate-limit/incompatible/step-limit honest failures.
- Sources contain successful reads only.
- Activity exposes actions, never hidden reasoning.
- Full raw unread note bodies never enter a request; bounded search snippets may.

- [ ] **Step 6: Verify finished RED**

```bash
cd ../finished
npm test -- tests/controller.test.ts
```

Expected: FAIL because the finished controller is absent.

- [ ] **Step 7: Implement the minimal bounded loop**

Every model turn includes `NOTE_TOOLS`. Preserve assistant tool-call messages
and matching tool results. Pin the first actual model identity for the run.
Use `executeTool` exclusively and enforce every `AGENT_LIMITS` value in
application code.

- [ ] **Step 8: Verify finished GREEN and both builds**

Run the full Task 1 verification in `finished/`, then the full verification in
`skeleton/`.

- [ ] **Step 9: Commit**

```bash
git add projects/agentic-second-brain/skeleton \
  projects/agentic-second-brain/finished
git commit -m "feat: add classroom agent controller"
```

### Task 3: Connect the finished API and agent activity UI

**Files:**
- Modify: `projects/agentic-second-brain/finished/app/api/chat/route.ts`
- Modify: `projects/agentic-second-brain/finished/app/page.tsx`
- Modify: `projects/agentic-second-brain/finished/app/globals.css`
- Modify: `projects/agentic-second-brain/finished/lib/contracts.ts`
- Test: `projects/agentic-second-brain/finished/tests/chat-route.test.ts`
- Remove: `projects/agentic-second-brain/finished/lib/vault/all-context.ts`
- Remove: `projects/agentic-second-brain/finished/tests/all-context.test.ts`

- [ ] **Step 1: Replace copied baseline route tests**

Assert stable JSON for answer, actual model, successful-read sources, activity,
model-call count, note-read count, and restart status. Assert friendly mappings
for configuration, capacity, unavailable model, incompatible tools, limits,
timeout, and generic application failures.

- [ ] **Step 2: Verify RED**

```bash
cd projects/agentic-second-brain/finished
npm test -- tests/chat-route.test.ts
```

Expected: FAIL because the route still calls the all-context builder.

- [ ] **Step 3: Connect `runAgent` and remove baseline-only files**

Validate the bounded browser request, call `runAgent`, return its stable
contract, and log only status/model/tool names. Never log keys or note bodies.

- [ ] **Step 4: Update the copied UI**

Change the badge to `Agentic demo`. Show:

- Searching, reading, and answered activity.
- Successful source chips.
- Actual model and restart notice.
- Model-call and notes-read counts.
- Fictional-data and shared-capacity notices.
- Friendly retryable failure cards.

Do not label activity as chain-of-thought.

- [ ] **Step 5: Verify**

```bash
npm test
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Expected: all exit 0; no finished source or test imports `all-context.ts`.

- [ ] **Step 6: Commit**

```bash
git add projects/agentic-second-brain/finished
git commit -m "feat: show the second brain agent at work"
```

### Task 4: Add the fail-closed personal-vault switch

**Files:**
- Create: `projects/agentic-second-brain/skeleton/lib/vault/config.ts`
- Create: `projects/agentic-second-brain/finished/lib/vault/config.ts`
- Modify: both `lib/model/openrouter.ts`
- Modify: both `app/api/chat/route.ts`
- Modify: both `.env.example`
- Modify: both `.gitignore`
- Modify: both `next.config.ts`
- Test: both `tests/vault-config.test.ts`
- Test: both `tests/chat-route.test.ts`
- Test: both `tests/openrouter.test.ts`

- [ ] **Step 1: Write unsafe-configuration tests**

Cover:

- Default `vault/` with Sam works without personal settings.
- Vault directory rejects absolute paths and traversal.
- `vault-personal` rejects `openrouter/free` and other router aliases.
- `vault-personal` requires a fixed model, one provider slug, no fallback, and
  `PERSONAL_VAULT_POLICY_ACCEPTED=true`.
- Unsafe configuration fails before `loadVault` or the model adapter is called.
- Safe personal requests include provider `only`, `allow_fallbacks: false`,
  `data_collection: "deny"`, and `zdr: true`.

- [ ] **Step 2: Verify RED in both projects**

```bash
npm test -- tests/vault-config.test.ts tests/chat-route.test.ts tests/openrouter.test.ts
```

Expected: FAIL because configuration support is absent.

- [ ] **Step 3: Implement shared behavior in each self-contained project**

Use:

```ts
interface VaultConfiguration {
  directory: string;
  isPersonal: boolean;
  provider?: {
    only: [string];
    allow_fallbacks: false;
    data_collection: "deny";
    zdr: true;
  };
}
```

Validate before loading notes. Keep `vault-personal/` ignored. Package only the
selected safe project-relative Markdown directory for local classroom use;
deploying personal notes remains out of scope.

- [ ] **Step 4: Verify GREEN and both complete projects**

Run focused tests, full tests, format, lint, typecheck, and build in both
directories.

- [ ] **Step 5: Commit**

```bash
git add projects/agentic-second-brain/skeleton \
  projects/agentic-second-brain/finished
git commit -m "feat: add safe personal vault switch"
```

### Task 5: Author the four-prompt classroom path

**Files:**
- Create: `projects/agentic-second-brain/README.md`
- Create: `projects/agentic-second-brain/MODEL-SETUP.md`
- Create: `projects/agentic-second-brain/INSTRUCTOR-GUIDE.md`
- Create: `projects/agentic-second-brain/skeleton/README.md`
- Create: `projects/agentic-second-brain/skeleton/CLAUDE.md`
- Create: `projects/agentic-second-brain/skeleton/PROMPTS.md`
- Create: `projects/agentic-second-brain/finished/README.md`
- Create: `projects/agentic-second-brain/finished/CLAUDE.md`
- Modify: `projects/second-brain/README.md`
- Modify: `projects/chat-agent/README.md`
- Test: `projects/agentic-second-brain/skeleton/tests/classroom-materials.test.ts`

- [ ] **Step 1: Write the classroom-material contract test**

Assert exactly four numbered guided prompts and required headings in each:

```text
Outcome:
Files allowed to change:
Do not change:
Verification:
Stop after:
```

Also assert the 60-minute sequence, minute-25/minute-45 cutovers, Sam-first
language, optional personal switch, and fixed-provider privacy gate.

- [ ] **Step 2: Verify RED**

```bash
cd projects/agentic-second-brain/skeleton
npm test -- tests/classroom-materials.test.ts
```

Expected: FAIL because the classroom documents are absent.

- [ ] **Step 3: Write exactly four ordinary Claude Code prompts**

Map them exactly to Inspect, Build tools, Connect controller, and Verify from
the approved design. Each prompt explains the concept in plain language and
stops at its checkpoint. Do not invoke Superpowers.

- [ ] **Step 4: Write the instructor and model guides**

The instructor guide includes prepared state, concept → demo → build → trap,
mock-first reliability, rehearsal rubric, and cutovers. The model guide links
current official OpenRouter provider routing/privacy documentation and dates
time-sensitive facts.

- [ ] **Step 5: Document the optional personal switch**

Learners create `vault-personal/`, set the five required environment values,
restart locally, and may revert by removing `VAULT_DIRECTORY`. State that
personal deployment is out of scope and Sam remains a complete success.

- [ ] **Step 6: Link from Builds 2 and 3**

Add one short optional-next-step link without relabeling the existing grounded
chat as agentic.

- [ ] **Step 7: Verify**

```bash
npm test -- tests/classroom-materials.test.ts
rg -n "openrouter/free|vault-personal|PERSONAL_VAULT_POLICY_ACCEPTED|minute 25|minute 45" \
  projects/agentic-second-brain
```

Open every new relative Markdown link target.

- [ ] **Step 8: Commit**

```bash
git add projects/agentic-second-brain \
  projects/second-brain/README.md projects/chat-agent/README.md
git commit -m "docs: add one-hour agentic second brain class"
```

### Task 6: Add the instructor compatibility command

**Files:**
- Create: `projects/agentic-second-brain/finished/scripts/check-models.ts`
- Test: `projects/agentic-second-brain/finished/tests/check-models.test.ts`
- Modify: `projects/agentic-second-brain/finished/package.json`

- [ ] **Step 1: Write report tests**

Inject a fake model caller. Verify five trials, four-of-five threshold, actual
model, request count, failure classes, timestamp, per-trial router identity,
and no file edits.

- [ ] **Step 2: Verify RED**

```bash
npm test -- tests/check-models.test.ts
```

Expected: FAIL because the checker is absent.

- [ ] **Step 3: Implement the explicit live gate**

Add:

```json
"check-models": "tsx scripts/check-models.ts"
```

The script accepts configured models plus optional CLI candidates, prints
request cost before running, and performs HTTP calls only with `--live`.

- [ ] **Step 4: Verify GREEN without consuming requests**

```bash
npm test -- tests/check-models.test.ts
npm run check-models
```

Expected: tests pass; command explains `--live` and makes no HTTP call.

- [ ] **Step 5: Commit**

```bash
git add projects/agentic-second-brain/finished
git commit -m "feat: add classroom model compatibility check"
```

### Task 7: Final local classroom verification

**Files:**
- Modify if needed: files from Tasks 1–6 only
- Do not create: tracked `.env`, `vault-personal/`, `.vercel/`, provider logs

- [ ] **Step 1: Run clean-install gates**

In both `skeleton/` and `finished/`:

```bash
npm ci
npm test
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Expected: all exit 0.

- [ ] **Step 2: Run repository checks**

```bash
git diff --check
git status --short
git ls-files | rg '(^|/)(\\.env($|\\.)|vault-personal/|\\.vercel/)'
```

Expected: no secret/personal/deployment files; only `.env.example` may match
after manual inspection.

- [ ] **Step 3: Exercise the four prompts from a clean skeleton copy**

Use a temporary copy outside the tracked project. Record wall time for each
checkpoint. Mocked provider tests count as completion. Expected: Sam core in 45
minutes or less.

- [ ] **Step 4: Verify the classroom behavior**

Confirm:

- Skeleton reports all five notes sent.
- Finished search activity uses bounded snippets.
- Only successful `read_note` bodies enter complete evidence context.
- One-note, two-note, lexical, and absent-answer fixtures produce correct
  sources/activity.
- Unsafe personal configuration fails before vault load/model call.
- Safe personal configuration applies the fixed-provider privacy constraints.

- [ ] **Step 5: Browser-check locally**

Use `browser:control-in-app-browser` for desktop and narrow layouts, missing-key
state, mocked success activity, and friendly failures. If local port binding
requires approval, request it once and report any remaining limitation.

- [ ] **Step 6: Review against the approved one-hour design**

Invoke `superpowers:verification-before-completion`, then
`superpowers:requesting-code-review`. Address all Critical/Important findings
with a failing regression test first.

- [ ] **Step 7: Commit verification-only corrections**

```bash
git add projects/agentic-second-brain \
  projects/second-brain/README.md projects/chat-agent/README.md
git commit -m "chore: verify one-hour agentic second brain class"
```

Do not deploy, push, merge, or remove the worktree in this plan. Those are
separate handoff decisions after the local classroom build is approved.
