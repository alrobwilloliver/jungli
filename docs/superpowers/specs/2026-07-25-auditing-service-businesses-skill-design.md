# Auditing Service Businesses Skill — Design

**Date:** 2026-07-25  
**Status:** Approved in conversation; specification review pending

## Goal

Create a reusable, repository-owned Codex skill that helps Alan run a
credible 45-minute AI opportunity audit with owners of small service
businesses and consultancies.

The audit should give the prospect immediate value and create a natural path
to a paid AI implementation sprint. It should not give away a full consulting
engagement, manufacture ROI, or recommend AI where straightforward process
improvement would be better.

The first version supports a human-led call:

```text
prepare interview → conduct and transcribe call → analyse transcript
→ produce one-page opportunity snapshot → propose implementation sprint
```

Live AI coaching, an AI-led interview, a multi-interview organizational audit,
and a self-service questionnaire are out of scope.

## Audience and success criteria

The primary prospect is an owner of a small service business or consultancy.
The owner is often central to sales, administration, customer communication,
or delivery, and wants more time, revenue, capacity, consistency, or a better
customer experience.

The skill succeeds when it enables Alan or another consultant to:

- Run a natural, focused 45-minute conversation rather than read a long
  questionnaire.
- Understand the business before suggesting tools.
- Identify and quantify operational bottlenecks from the prospect's evidence.
- Deeply map the one or two processes most likely to produce value.
- Distinguish verified facts, client estimates, and consultant assumptions.
- Rank up to three grounded AI opportunities transparently.
- Recommend one suitably narrow implementation sprint.
- Produce a concise one-page snapshot that the prospect can understand.

## Research foundation

The workflow combines established practices rather than inventing a single
proprietary framework:

- Strategyzer's Business Model Canvas provides the high-level business model
  lens: customers, value proposition, revenue, key activities, resources, and
  relationships.
  <https://www.strategyzer.com/library/what-is-a-business-model>
- SIPOC provides a lightweight way to identify process suppliers, inputs,
  steps, outputs, and customers.
  <https://asq.org/quality-resources/articles/developing-sipoc-diagrams?id=6d0b7d9b494c40efbe3319afaa909d6d>
- Value-stream mapping contributes the current-state and future-state process
  perspective.
  <https://www.lean.org/lexicon-terms/value-stream-mapping/>
- Microsoft's AI Readiness Assessment supplies relevant readiness lenses:
  business strategy, data, governance and security, AI experience, culture,
  infrastructure, and model management.
  <https://learn.microsoft.com/en-us/assessments/94f1c697-9ba7-4d47-ad83-7c6bd94b1505/>
- Impact/effort and RICE-style methods inform transparent prioritization using
  impact, effort, reach, and confidence.
  <https://www.atlassian.com/software/jira/product-discovery/resources/handbook/prioritization>
- NIST's AI Risk Management Framework contributes the govern, map, measure,
  and manage risk perspective.
  <https://airc.nist.gov/airmf-resources/airmf/>

These sources inform the audit but should not be presented to prospects as
certification, legal review, or compliance assurance.

## Recommended audit shape

Use a guided funnel: begin with the owner's outcome, scan the main business
functions, select the highest-value bottleneck, and then investigate that
process in detail.

| Time | Focus | Intended result |
|---|---|---|
| 0–5 minutes | Goal and context | Define what a valuable outcome means |
| 5–12 minutes | Business snapshot | Understand customers, services, revenue model, team, and owner dependence |
| 12–22 minutes | Functional scan | Find pain across marketing, sales, onboarding, delivery, communication, administration, finance, knowledge, and reporting |
| 22–35 minutes | Process deep dive | Map the best one or two candidates, including systems, decisions, handoffs, delays, rework, and exceptions |
| 35–41 minutes | Quantification and readiness | Capture frequency, time, value, data, constraints, risks, and willingness to change |
| 41–45 minutes | Reflection and close | Confirm the consultant's understanding and explain the post-call snapshot |

The times are guidance, not a script. The consultant may shorten a section
when the information is already known or stay longer on a high-value process.

## Interview framework

Use a concise mandatory question set plus conditional follow-ups.

### Owner objective

Establish whether the priority is more time, revenue, capacity, consistency,
or customer experience. Ask what currently prevents that outcome and what
meaningful improvement would look like.

### Business snapshot

Understand:

- Services, customer types, pricing or revenue mechanism, approximate volume,
  and team shape.
- How prospects become paying clients.
- How work is onboarded and delivered.
- Where the owner remains indispensable.

### Functional scan

Briefly examine marketing and lead generation, sales and proposals, client
onboarding, service delivery, customer communication, administration and
finance, and internal knowledge and reporting.

The scan exists to locate bottlenecks, not to generate one recommendation per
department.

### Process deep dive

For each selected process, determine:

- Its trigger, completion condition, frequency, and owner.
- The people, systems, messages, files, and data involved.
- The actual steps, decisions, approvals, and handoffs.
- Waiting, duplication, copying, rework, errors, and common exceptions.
- Which work requires professional judgment, empathy, accountability, or
  customer trust.
- What must remain under human control.

Follow-up questions must respond to evidence. For example, a prospect who
spends six hours per week writing proposals should be asked about proposal
inputs, reusable material, review, conversion, variability, and judgment.

### Quantification

Capture, where available:

- Occurrences per week or month.
- Minutes or hours per occurrence.
- People involved and their approximate cost or commercial value.
- Delays, errors, rework, missed leads, conversion effects, or constrained
  delivery capacity.

Do not force a monetary estimate when the inputs are unreliable. Preserve the
prospect's original units and show calculations.

### Readiness and boundaries

Determine data availability and quality, existing systems, access and
integration constraints, privacy or customer sensitivities, team adoption,
required oversight, and the prospect's willingness to change the process.

## Transcript analysis

After the call, accept a notetaker transcript and optional consultant notes.
The skill must:

1. Check whether transcription consent was obtained and whether the supplied
   material contains unnecessary sensitive information.
2. Extract the business goal, business facts, pains, processes, quantities,
   tools, constraints, and direct evidence.
3. Reconstruct the current state of the strongest candidate processes.
4. Identify missing information that materially affects a recommendation.
5. Generate candidate interventions, including non-AI process improvements
   that may be prerequisites for an AI implementation.
6. Reject candidates that are unsupported, unsafe, uneconomic, or unlikely to
   be adopted.
7. Score the remaining AI candidates and select up to three.
8. Recommend one first implementation sprint.
9. Render the one-page opportunity snapshot.

Every recommendation must trace back to evidence in the transcript or notes.
Do not expose private transcript detail merely to prove traceability; concise
paraphrased evidence is sufficient.

## Opportunity definition and scoring

Each opportunity should specify:

- Current problem and supporting evidence.
- Proposed future workflow.
- Where AI assists, automates, classifies, retrieves, drafts, or supports a
  decision.
- What remains human-controlled.
- Inputs, systems, integrations, and data required.
- Expected benefit, assumptions, confidence, complexity, and risks.
- The smallest useful implementation that could validate the idea.

Score each factor from 1–5:

| Factor | Meaning |
|---|---|
| Business value | Expected time, revenue, capacity, quality, or customer benefit |
| Feasibility | Data availability, tool fit, and integration practicality |
| Time to value | Speed at which a useful result can be tested |
| Evidence confidence | Strength of the supplied facts and quantities |
| Adoption fit | Likelihood that the owner and team will use the workflow |
| Risk control | Strength of privacy, reliability, customer-impact, and oversight controls; 5 means low or well-controlled risk |

Calculate the priority score as:

```text
20 × (
  0.30 × business value
  + 0.20 × feasibility
  + 0.15 × time to value
  + 0.15 × evidence confidence
  + 0.10 × adoption fit
  + 0.10 × risk control
)
```

Round the result to the nearest whole number. This produces a score from
20–100. The scoring reference must define anchors for 1, 3, and 5 for every
factor. Display both the total and all component scores.

Treat any of the following as an unresolved critical concern:

- The workflow requires personal or sensitive data without confirmed authority,
  consent, minimization, and appropriate access controls.
- It can create a consequential customer or professional outcome without
  meaningful human verification or recourse.
- Materially unreliable output cannot be detected before it causes the stated
  harm.
- Implementation would violate a stated client, contractual, or operational
  constraint.

An opportunity with an unresolved critical concern cannot appear in the ranked
recommendations, regardless of its score. It may be reconsidered only when the
proposed implementation sprint explicitly validates and resolves the concern
before operational use.

Savings estimates must show their inputs, formula, period, and confidence.
Label each input as verified fact, client estimate, or consultant assumption.
Do not invent missing values.

## One-page opportunity snapshot

The Markdown snapshot contains:

1. **Desired outcome** — one clear sentence in the prospect's language.
2. **What we heard** — three to five evidence-based observations.
3. **Top AI opportunities** — up to three recommendations covering the current
   problem, future workflow, human role, expected benefit, assumptions,
   confidence, score, and indicative complexity.
4. **Recommended implementation sprint** — one bounded project, the expected
   outcome, what must be validated, and why it is first.
5. **Next step** — a calm invitation to scope and price the sprint.

Keep it to a genuinely scannable one-page equivalent: target 500–700 words and
do not exceed 750 words, excluding short table labels. Put unresolved questions
next to the affected recommendation rather than hiding them.

Non-AI process improvements do not occupy the ranked AI opportunity slots.
Show a necessary process improvement as a prerequisite beside the affected
opportunity. When fewer than three AI opportunities are defensible, return
fewer than three and explain why; never pad the snapshot with weak ideas.

## Skill structure

Create the skill at:

```text
consulting/auditing-service-businesses/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── evals/
│   ├── scenarios.md
│   ├── baseline-results.md
│   └── skill-results.md
├── references/
│   ├── interview-guide.md
│   ├── transcript-analysis.md
│   └── opportunity-scoring.md
└── assets/
    ├── call-notes-template.md
    └── opportunity-snapshot-template.md
```

`SKILL.md` coordinates the prepare, conduct, and analyse modes. Detailed
questions, extraction rules, and scoring anchors belong in references so the
main skill remains concise. Assets are output templates, not explanatory
documentation. `evals/` preserves the pressure scenarios, observed baseline
failures, and post-skill results; runtime instructions do not load it.

Initialize the folder using the standard skill creation tooling and validate
its metadata after implementation. The skill remains owned by this repository;
automatic installation into a personal Codex skill directory is a separate,
optional future action.

## Safeguards and failure handling

- Require the consultant to confirm transcription consent. The skill provides
  a reminder, not jurisdiction-specific legal advice.
- Minimize, redact, or omit unnecessary personal and sensitive information.
- Never invent business facts, quantities, technical compatibility, or ROI.
- Mark missing material and lower confidence rather than filling gaps.
- Recommend ordinary process redesign when it is the better intervention.
- Keep human approval where professional judgment, trust, accountability, or
  consequential customer communication requires it.
- Flag an incomplete or poor transcript before producing a confident report.
- Avoid prescribing a specific vendor unless the evidence and implementation
  constraints justify it.
- Do not describe the output as a security, privacy, legal, or compliance
  audit.

Apply these explicit gates:

- **Consent unconfirmed:** stop transcript analysis and ask the consultant to
  confirm authorized transcription or provide consent-safe notes instead.
- **Sensitive data present:** do not reproduce it in outputs. Continue only
  after the consultant confirms authorized handling and either supplies a
  minimized/redacted source or explicitly confirms that the supplied source is
  appropriate to process.
- **Evidence inadequate:** do not create a ranked snapshot or savings claim.
  Return an insufficient-evidence note listing the missing follow-up questions.
- **Evidence adequate for only some candidates:** produce a limited snapshot
  containing only the defensible opportunities, clearly marked with their
  confidence and unresolved questions.

An opportunity is eligible for scoring only when the evidence establishes its
business problem, affected process, current workflow, meaningful frequency or
impact, and relevant constraints. Missing monetary data prevents a monetary ROI
claim but does not prevent a well-supported time or qualitative benefit.

## Validation

Skill development follows a documentation TDD cycle. Before writing the skill,
run realistic audit tasks without it and record the baseline failures in
`evals/baseline-results.md`. Then run equivalent tasks with the skill, record
the results in `evals/skill-results.md`, and close demonstrated gaps. Store the
reusable prompts, input transcripts, and pass/fail rubric in
`evals/scenarios.md`.

Use at least these scenarios:

- A solo consultant overwhelmed by proposals and follow-ups.
- A small agency struggling with onboarding and client reporting.
- A privacy-sensitive professional service with restricted automation.
- An owner who gives vague answers and unreliable estimates.
- A business whose real problem is process design rather than missing AI.

Validation should check that the skill:

- Asks adaptive, relevant follow-ups.
- Separates facts, client estimates, and assumptions.
- Does not invent missing numbers or capabilities.
- Produces reproducible component scores from the same evidence.
- Does not let a high total score conceal a critical risk.
- Keeps human control in consequential work.
- Recommends non-AI improvement when appropriate.
- Selects a bounded implementation sprint.
- Produces a concise and persuasive one-page snapshot.

Run the skill metadata validator and inspect generated artifacts before
claiming completion.

## Out of scope

- Live transcript monitoring or real-time follow-up suggestions.
- An autonomous or customer-facing AI interviewer.
- A web form, CRM, database, dashboard, or proposal automation.
- Tool-specific notetaker integrations.
- Niche-specific question packs.
- Multi-stakeholder or enterprise readiness assessments.
- Legal, compliance, privacy, or security certification.
- Pricing the implementation sprint.
- Installing or publishing the skill outside this repository.
