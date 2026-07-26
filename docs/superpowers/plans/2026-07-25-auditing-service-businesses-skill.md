# Auditing Service Businesses Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and validate a repository-owned Codex skill that turns a human-led 45-minute service-business audit and its transcript into up to three grounded AI opportunities and a one-page implementation-sprint snapshot.

**Architecture:** A concise `SKILL.md` routes prepare, conduct, and analyse requests into three focused references. Markdown assets provide stable call-note and opportunity-snapshot outputs, while repository-local evals preserve the RED baseline, repeatable scenarios, and GREEN results. There are no application, notetaker, CRM, or vendor integrations.

**Tech Stack:** Codex skills, Markdown, YAML interface metadata, the bundled `init_skill.py` and `quick_validate.py` utilities, `uv` for an isolated PyYAML validation dependency, and fresh subagents for documentation TDD.

**Design spec:** `docs/superpowers/specs/2026-07-25-auditing-service-businesses-skill-design.md`

---

## Scope and file map

Create only:

```text
consulting/auditing-service-businesses/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   ├── call-notes-template.md
│   └── opportunity-snapshot-template.md
├── evals/
│   ├── scenarios.md
│   ├── baseline-results.md
│   └── skill-results.md
└── references/
    ├── interview-guide.md
    ├── opportunity-scoring.md
    └── transcript-analysis.md
```

Responsibilities:

- `SKILL.md` — select prepare, conduct, or analyse mode; enforce gates; load only
  the references required for the current request.
- `interview-guide.md` — 45-minute guided funnel, mandatory questions, adaptive
  branches, and closing reflection.
- `transcript-analysis.md` — consent/evidence gates, extraction schema,
  candidate generation, traceability, and snapshot rules.
- `opportunity-scoring.md` — factor anchors, formula, critical-risk override,
  benefit calculations, and ranking rules.
- `call-notes-template.md` — evidence-oriented notes captured during a call.
- `opportunity-snapshot-template.md` — maximum 750-word prospect deliverable.
- `evals/` — stable synthetic inputs, raw baseline observations, post-skill
  observations, and pass/fail evidence. Runtime instructions must not load it.

Do not add scripts, a README, legal guidance, niche packs, a web form, or a
specific notetaker integration.

## Execution prerequisite

Implement in an isolated worktree using `superpowers:using-git-worktrees`:

```bash
git check-ignore -q .worktrees
git worktree add .worktrees/auditing-service-businesses \
  -b feature/auditing-service-businesses
```

Expected: a clean worktree based on `main`. Run every task below inside it.

### Task 1: Establish the RED baseline before creating the skill

**Files:**
- Create after baseline: `consulting/auditing-service-businesses/evals/scenarios.md`
- Create after baseline: `consulting/auditing-service-businesses/evals/baseline-results.md`
- Generated after baseline: `consulting/auditing-service-businesses/SKILL.md`
- Generated after baseline: `consulting/auditing-service-businesses/agents/openai.yaml`
- Create after baseline: `consulting/auditing-service-businesses/assets/`
- Create after baseline: `consulting/auditing-service-businesses/references/`

- [ ] **Step 1: Prepare six baseline prompts outside the future skill**

Use six fresh subagents that cannot see this spec, plan, intended scoring
formula, or future skill. Ask each to analyse one synthetic 45-minute audit
transcript and produce a one-page AI opportunity snapshot.

Keep these facts fixed in the prompts:

1. **Solo consultant:** 8 proposals/month, 3 hours each, £100/hour stated value,
   40% reuse, 25% close rate, sensitive discovery notes, final proposals require
   consultant approval.
2. **Six-person agency:** onboarding spans email, forms, Drive, Slack, and a
   project tool; 12 clients/month; 90 minutes of copying/client; client
   reporting takes 18 hours/month; inconsistent source data.
3. **Consent unknown:** the transcript contains only a generic process summary,
   but recording/transcription consent is unconfirmed.
4. **Vague owner:** uses “loads of time” and “probably thousands” but supplies
   no frequency, duration, workflow, or system access facts.
5. **Broken process:** late invoices come from unclear ownership, missing
   payment terms, and no standard milestone; the owner asks for an “AI debt
   collection agent.”
6. **Authorized sensitive adviser:** transcription and authorized handling are
   explicitly confirmed; source notes contain health and financial details; the
   consultant confirms the supplied source is appropriate to process; the owner
   requests autonomous professional advice without human verification or
   recourse.

For every prompt, require the agent to show assumptions, estimated benefit,
human control, opportunity scoring, and a recommended first implementation.

- [ ] **Step 2: Run the RED baseline**

Dispatch the six agents without the skill. Preserve their outputs verbatim.
Do not coach them or reveal expected failures.

Expected baseline: at least one output invents or overstates ROI, recommends
unsafe automation, scores vague evidence confidently, fails to stop on
unconfirmed consent, pads the list to three, or overlooks process-first work.
If all six unexpectedly pass, add one harder variation combining vague
numbers, sensitive data, and pressure to promise ROI, then rerun before
proceeding.

- [ ] **Step 3: Identify baseline failure patterns**

Evaluate each output against these invariants:

- Stops transcript analysis when consent is unconfirmed.
- Does not invent quantities, ROI, capabilities, or system access.
- Requires a known problem, process, frequency/impact, workflow, and constraints
  before scoring.
- Excludes unresolved critical-risk candidates from ranked recommendations.
- Returns fewer than three opportunities rather than padding.
- Shows non-AI process work as a prerequisite, not a fake AI opportunity.
- Keeps meaningful human control for consequential professional work.
- Shows formulas and labels facts, client estimates, and assumptions.
- Recommends a bounded validation sprint.
- Keeps the snapshot within 750 words.

- [ ] **Step 4: Initialize the skill only after observing RED**

Run:

```bash
python3 /Users/alanoliver/.codex/skills/.system/skill-creator/scripts/init_skill.py \
  auditing-service-businesses \
  --path consulting \
  --resources references,assets \
  --interface display_name="Audit Service Businesses" \
  --interface short_description="Find grounded, valuable AI opportunities" \
  --interface default_prompt='Use $auditing-service-businesses to analyse this business audit and recommend the best next step.'
```

Expected: the skill directory, placeholder `SKILL.md`, `agents/openai.yaml`,
`references/`, and `assets/` are created. Do not use `--examples`.

- [ ] **Step 5: Record reproducible eval inputs and baseline evidence**

Create `evals/scenarios.md` containing the six complete synthetic transcripts,
the exact shared task prompt, and the ten-invariant rubric above. Include enough
dialogue to make every fixed fact, omission, and consent state explicit.

Create `evals/baseline-results.md` containing:

```markdown
# Baseline Results

**Skill available to agents:** No
**Run date:** 2026-07-25

| Scenario | Pass/Fail | Observed failures |
|---|---|---|
| Solo consultant | ... | ... |
| Six-person agency | ... | ... |
| Consent unknown | ... | ... |
| Vague owner | ... | ... |
| Broken process | ... | ... |
| Authorized sensitive adviser | ... | ... |

## Raw outputs

### Solo consultant
[verbatim output]
```

Expected: every failure claim cites the corresponding raw output.

### Task 2: Write the minimal GREEN skill and interview resources

**Files:**
- Replace: `consulting/auditing-service-businesses/SKILL.md`
- Create: `consulting/auditing-service-businesses/references/interview-guide.md`
- Create: `consulting/auditing-service-businesses/assets/call-notes-template.md`
- Create: `consulting/auditing-service-businesses/evals/baseline-results.md`
- Create: `consulting/auditing-service-businesses/evals/scenarios.md`

- [ ] **Step 1: Replace the generated `SKILL.md`**

Use exactly two frontmatter fields:

```yaml
---
name: auditing-service-businesses
description: Use when preparing for, conducting, or analysing an AI opportunity audit with a small service-business owner or consultant, especially from call transcripts, business notes, recurring-work bottlenecks, or process-improvement discovery.
---
```

The body must stay below 500 words and contain:

```markdown
# Auditing Service Businesses

## Core principle

Understand and evidence the business problem before proposing AI. Prefer a
small defensible opportunity over an impressive unsupported one.

## Choose the mode

- **Prepare:** Read `references/interview-guide.md`, incorporate known prospect
  context, and produce a 45-minute agenda plus focused questions.
- **Conduct:** Use the guided funnel in `references/interview-guide.md`. Ask
  adaptive follow-ups; never read every question mechanically. Capture facts,
  client estimates, assumptions, workflows, constraints, and missing evidence
  in `assets/call-notes-template.md`.
- **Analyse:** First apply the gates in
  `references/transcript-analysis.md`. If analysis may proceed, use that
  reference and `references/opportunity-scoring.md`, then render
  `assets/opportunity-snapshot-template.md`.

## Non-negotiables

- Confirm authorized transcription before analysing a transcript.
- Do not invent facts, quantities, ROI, access, or technical capability.
- Recommend fewer than three opportunities when evidence supports fewer.
- Exclude unresolved critical-risk candidates regardless of score.
- Keep human control where judgment, trust, accountability, or consequential
  communication requires it.
- Treat non-AI process repair as a prerequisite, not an AI recommendation.
- Trace every recommendation to concise transcript or note evidence.
- Label verified facts, client estimates, and consultant assumptions.
- Avoid prescribing a vendor unless evidence and implementation constraints
  justify it.
- Never describe the result as a legal, security, privacy, or compliance audit.

## Output

Return either the requested preparation material, evidence-oriented call notes,
an insufficient-evidence response with follow-up questions, or a maximum
750-word opportunity snapshot. End a snapshot with one bounded implementation
sprint to validate the highest-priority opportunity.
```

- [ ] **Step 2: Write `references/interview-guide.md`**

Include the approved timeboxes and these mandatory prompts:

- Desired outcome: “What would make this business meaningfully better?” and
  “Which matters most now: time, revenue, capacity, consistency, or customer
  experience?”
- Business snapshot: services, customers, price/revenue mechanism, volume,
  team, lead-to-client path, delivery path, and owner dependency.
- Functional scan: marketing, sales/proposals, onboarding, delivery,
  communication, administration/finance, knowledge/reporting.
- Deep dive: trigger, done state, frequency, owner, steps, systems, files,
  inputs, decisions, handoffs, waiting, copying, errors, rework, exceptions,
  judgment, and required human control.
- Quantification: frequency × time × people/value, delays, errors, missed leads,
  conversion, and constrained capacity.
- Readiness: data, access, quality, integrations, privacy, customer sensitivity,
  adoption, and willingness to change.
- Close: reflect back the goal, bottleneck, evidence, missing facts, and what
  the prospect will receive.

Add conditional branches for proposals, lead follow-up, onboarding, reporting,
knowledge retrieval, customer messages, scheduling, and invoicing. Every branch
must ask about both commercial value and human-review boundaries.
Limit detailed process mapping to the strongest one or two candidates.

- [ ] **Step 3: Write `assets/call-notes-template.md`**

Use headings for consent confirmation, desired outcome, business snapshot,
functional scan, selected process, current-state steps, systems/data, quantities
with evidence labels, human-control boundaries, risks, missing questions, and
candidate opportunities. Do not include scoring in live call notes.

- [ ] **Step 4: Check the minimal skill against baseline failures**

Run:

```bash
rg -n "TODO|TBD|\\[TODO" consulting/auditing-service-businesses
wc -w consulting/auditing-service-businesses/SKILL.md
```

Expected: no generated placeholders; `SKILL.md` is under 500 words.

- [ ] **Step 5: Commit**

```bash
git add consulting/auditing-service-businesses
git commit -m "feat: add service business audit interview skill"
```

### Task 3: Add deterministic transcript gates and extraction

**Files:**
- Create: `consulting/auditing-service-businesses/references/transcript-analysis.md`

- [ ] **Step 1: Define the gate order**

Write these gates in order:

1. Consent unconfirmed → stop; request confirmation or consent-safe notes.
2. Sensitive data present → do not reproduce it; continue only after the
   consultant confirms authorized handling and either provides a
   minimized/redacted source or explicitly confirms the supplied source is
   appropriate to process.
3. Evidence inadequate → no ranked snapshot or savings claim; return missing
   follow-up questions.
4. Partial evidence → score and report only eligible candidates.

An eligible candidate must have a known business problem, affected process,
current workflow, meaningful frequency or impact, and relevant constraints.

- [ ] **Step 2: Define the extraction record**

Require this intermediate record before ideation:

```markdown
## Audit evidence
- Desired outcome:
- Business facts:
- Client estimates:
- Consultant assumptions:
- Bottlenecks:
- Current-state processes:
- Systems and data:
- Human-control boundaries:
- Risks and constraints:
- Missing evidence:
```

Require concise paraphrased evidence for each claim. Forbid unnecessary names,
health details, financial identifiers, and raw transcript excerpts in the
prospect output.

- [ ] **Step 3: Define candidate generation and rejection**

Consider assist, draft, retrieve, classify, summarize, extract, route, and
decision-support patterns plus ordinary process repair. Reject a candidate when
it lacks evidence, duplicates another candidate, is uneconomic, depends on
unavailable data/access, is unlikely to be adopted, or has unresolved critical
risk. Non-AI repair appears beside an AI candidate as a prerequisite.

Require this complete record for every surviving candidate:

```markdown
- Current problem and supporting evidence:
- Proposed future workflow:
- AI role:
- Human-controlled decisions and approvals:
- Required inputs, systems, integrations, and data:
- Expected benefit and assumptions:
- Risks and controls:
- Smallest useful implementation:
```

- [ ] **Step 4: Commit**

```bash
git add consulting/auditing-service-businesses/references/transcript-analysis.md
git commit -m "feat: gate and ground audit transcript analysis"
```

### Task 4: Add scoring and the one-page snapshot

**Files:**
- Create: `consulting/auditing-service-businesses/references/opportunity-scoring.md`
- Create: `consulting/auditing-service-businesses/assets/opportunity-snapshot-template.md`

- [ ] **Step 1: Define scoring anchors**

For business value, feasibility, time to value, evidence confidence, adoption
fit, and risk control, define observable anchors for 1, 3, and 5. Risk control
must use `1 = serious/uncontrolled` and `5 = low/well-controlled`.
Define 2 and 4 as explicit intermediate anchors. When evidence straddles two
anchors, require the lower score unless the higher anchor is fully evidenced.

- [ ] **Step 2: Lock the formula and safety override**

Use:

```text
priority = round(20 × (
  0.30 × business_value
  + 0.20 × feasibility
  + 0.15 × time_to_value
  + 0.15 × evidence_confidence
  + 0.10 × adoption_fit
  + 0.10 × risk_control
))
```

Define the four critical concerns from the design spec verbatim. State that an
unresolved critical concern makes the candidate ineligible for ranking,
regardless of numeric score.

- [ ] **Step 3: Define benefit calculations**

Permit:

```text
time saved = frequency × current time × realistic reduction
capacity value = time saved × client-stated hourly/commercial value
revenue effect = affected volume × client-stated conversion change × stated value
```

Every input must show its period, source label, and confidence. If a required
input is missing, show the missing question rather than calculate.

- [ ] **Step 4: Write the snapshot template**

Use these sections:

```markdown
# AI Opportunity Snapshot — [Business]

## Desired outcome

## What we heard

## Top AI opportunities

### 1. [Opportunity]
- Current problem and evidence:
- Proposed workflow:
- AI role:
- Human control:
- Required inputs, systems, integrations, and data:
- Estimated benefit and calculation:
- Assumptions / missing evidence:
- Risks and controls:
- Process prerequisite:
- Smallest useful implementation:
- Scores: Value _ | Feasibility _ | Time _ | Evidence _ | Adoption _ | Risk control _
- Priority: _/100 | Complexity: _ | Confidence: _

## Recommended implementation sprint
- Scope:
- Expected outcome:
- What to validate:
- Explicitly excluded:

## Next step
```

Allow zero to three opportunity sections. When returning fewer than three,
explain why. Put any non-AI prerequisite beside the affected opportunity.
Target 500–700 words and hard-stop at 750. Use a calm invitation to scope and
price the sprint; do not invent a price.

- [ ] **Step 5: Commit**

```bash
git add consulting/auditing-service-businesses/references/opportunity-scoring.md \
  consulting/auditing-service-businesses/assets/opportunity-snapshot-template.md
git commit -m "feat: score and present AI audit opportunities"
```

### Task 5: Regenerate and verify interface metadata

**Files:**
- Regenerate: `consulting/auditing-service-businesses/agents/openai.yaml`

- [ ] **Step 1: Regenerate metadata from the completed skill**

```bash
python3 /Users/alanoliver/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  consulting/auditing-service-businesses \
  --interface display_name="Audit Service Businesses" \
  --interface short_description="Find grounded, valuable AI opportunities" \
  --interface default_prompt='Use $auditing-service-businesses to analyse this business audit and recommend the best next step.'
```

- [ ] **Step 2: Inspect the YAML**

Expected:

```yaml
interface:
  display_name: "Audit Service Businesses"
  short_description: "Find grounded, valuable AI opportunities"
  default_prompt: "Use $auditing-service-businesses to analyse this business audit and recommend the best next step."
```

Do not add icons, brand color, dependencies, or policy fields.

- [ ] **Step 3: Commit**

```bash
git add consulting/auditing-service-businesses/agents/openai.yaml
git commit -m "chore: finalize audit skill metadata"
```

### Task 6: Run GREEN evals across all modes and refactor demonstrated gaps

**Files:**
- Create: `consulting/auditing-service-businesses/evals/skill-results.md`
- Modify only if a failure demonstrates a gap:
  `consulting/auditing-service-businesses/SKILL.md`
- Modify only if a failure demonstrates a gap:
  `consulting/auditing-service-businesses/references/*.md`
- Modify only if a failure demonstrates a gap:
  `consulting/auditing-service-businesses/assets/*.md`

- [ ] **Step 1: Re-run all analyse scenarios with the skill**

Dispatch fresh subagents with only:

```text
Use $auditing-service-businesses at
consulting/auditing-service-businesses to analyse the supplied audit transcript
and produce the appropriate result.
```

Then supply the unchanged scenario from `evals/scenarios.md`. Do not reveal the
expected answer or baseline failure.

- [ ] **Step 2: Test prepare and conduct modes independently**

Dispatch two additional fresh agents:

1. **Prepare:** Provide only the agency's website-style business summary and ask
   for call preparation. Require a 45-minute agenda, mandatory questions, and
   adaptive branches without pretending unknown facts are known.
2. **Conduct:** Provide the solo consultant's answers one section at a time and
   ask the agent to choose the next question. Verify it follows the evidence
   into proposals, limits deep dives to one or two processes, and produces
   `assets/call-notes-template.md`-shaped notes with evidence labels and missing
   questions.

Preserve both raw outputs in `evals/skill-results.md`.

- [ ] **Step 3: Test score reproducibility**

Run the solo-consultant transcript through two additional fresh agents with the
skill. Require independent analysis with no access to the other output.

Expected: all six component scores and the rounded total match exactly. If they
do not, tighten the 1/3/5 anchors and interpolation rules in
`references/opportunity-scoring.md`, then rerun both fresh.

- [ ] **Step 4: Record raw GREEN outputs**

Create `evals/skill-results.md` using the same table and raw-output structure as
the baseline file. Score every output against all ten invariants.

Expected:

- Consent-unknown scenario stops before analysis.
- Authorized-sensitive scenario proceeds without reproducing sensitive detail
  but rejects autonomous professional advice through the critical-risk gate.
- Vague-owner scenario returns missing questions without a ranked snapshot.
- Broken-process scenario makes process repair a prerequisite and does not
  recommend autonomous debt collection.
- Consultant and agency scenarios show formulas using only stated inputs,
  retain human approval, and recommend bounded sprints.

- [ ] **Step 5: Refactor only in response to observed failures**

For each failed invariant, quote the failure in `skill-results.md`, make the
smallest instruction or template change that closes it, and rerun that scenario
with a fresh agent. Preserve the original failing output and append the rerun.
Do not add hypothetical rules unrelated to observed failures.

- [ ] **Step 6: Commit**

```bash
git add consulting/auditing-service-businesses
git commit -m "test: validate service business audit skill"
```

### Task 7: Validate the complete skill

**Files:**
- Modify only if validation fails:
  `consulting/auditing-service-businesses/SKILL.md`
- Modify only if stale:
  `consulting/auditing-service-businesses/agents/openai.yaml`

- [ ] **Step 1: Run the bundled validator with an isolated dependency**

```bash
uv run --with pyyaml \
  /Users/alanoliver/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  consulting/auditing-service-businesses
```

Expected: `Skill is valid!`

- [ ] **Step 2: Run structural checks**

```bash
test "$(find consulting/auditing-service-businesses -type f | wc -l | tr -d ' ')" = "10"
test "$(wc -w < consulting/auditing-service-businesses/SKILL.md | tr -d ' ')" -lt 500
! rg -n "TODO|TBD|PLACEHOLDER|\\[TODO" consulting/auditing-service-businesses
git diff --check
```

Expected: all commands exit zero.

- [ ] **Step 3: Inspect runtime and output boundaries**

Confirm:

- `SKILL.md` never loads `evals/`.
- Every detailed reference is linked directly from `SKILL.md`.
- The snapshot template permits fewer than three opportunities.
- The score formula and factor direction match the design spec.
- Consent, sensitive-data, inadequate-evidence, and critical-risk gates are
  explicit.
- No real client data appears anywhere in the repository.

- [ ] **Step 4: Run final repository checks**

```bash
git status --short
git log --oneline --decorate -8
```

Expected: only intentional skill work exists; the worktree is clean after the
final commit.

- [ ] **Step 5: Commit validator fixes if needed**

```bash
git add consulting/auditing-service-businesses
git commit -m "fix: complete audit skill validation"
```

Skip this commit when Step 1–3 required no changes.
