# Four classroom prompts

## Prompt 1: Inspect

### Outcome

Explain baseline flow and locate the three learner tool files.

### Files allowed to change

None.

### Do not change

Do not edit code, vault notes, environment files, or tests.

### Verification

Run `npm test` and describe why all five Sam notes are sent.

### Stop after

Stop after reporting the baseline and learner checkpoints.

## Prompt 2: Build tools

### Outcome

Implement deterministic `listNotes`, `searchNotes`, and `readNote`.

### Files allowed to change

Only `lib/vault/list-notes.ts`, `lib/vault/search-notes.ts`, and
`lib/vault/read-note.ts`.

### Do not change

Do not change tests, schemas, dispatcher, UI, route, vault, or environment.

### Verification

Run `npm run test:checkpoint:tools`, then `npm test`.

### Stop after

Stop once both commands pass and summarize the three functions.

## Prompt 3: Connect controller

### Outcome

Connect the prepared bounded search → read → answer loop.

### Files allowed to change

Only the region between `LEARNER CHECKPOINT 3 START` and
`LEARNER CHECKPOINT 3 END` in `lib/agent/controller.ts`.

### Do not change

Do not change limits, prompt, tools, tests, route, UI, vault, or environment.

### Verification

Run `npm run test:checkpoint:controller`, then `npm test`.

### Stop after

Stop when the controller checkpoint and default suite pass.

## Prompt 4: Verify

### Outcome

Demonstrate a cited answer using only relevant Sam notes.

### Files allowed to change

None.

### Do not change

Do not edit code, tests, environment values, or notes.

### Verification

Run both checkpoint commands and ask, “How did Sam grow the newsletter?”
Confirm activity shows search, read, answer and cites the exact path.

### Stop after

Stop after recording the commands and observed evidence.
