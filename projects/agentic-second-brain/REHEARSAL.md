# Rehearsal record

## Automated instructor-equivalent verification — 2026-07-26

Verified in the class worktree:

- skeleton default suite: 12 files and 133 tests passed; formatting, lint,
  typecheck, and production build passed;
- finished default suite: 13 files and 155 tests passed; formatting, lint,
  typecheck, and production build passed;
- finished mocked checkpoints: 8 tool tests and 1 controller test passed;
- the skeleton's intentional learner checkpoints fail only at
  `checkpoint_not_implemented`;
- the compatibility command completes its dry path without HTTP;
- personal vault content is ignored and absent from production tracing config.

These checks establish that the prepared fallback and deterministic classroom
checkpoints run. They do not establish human teaching pace or live-provider
behavior.

## BLOCKED / unverified before teaching

- **Beginner under-45-minute build:** BLOCKED until a beginner-paced human
  rehearsal records elapsed time for prompts 1–3 and the minute-25 recovery.
- **Browser demonstration:** BLOCKED until an instructor starts skeleton on
  port 3000 and finished on port 3001 and verifies the visible activity,
  sources, and cited Sam answer.
- **Live model compatibility:** BLOCKED until an instructor with an approved API
  key runs `npm run check-models -- --live` against the chosen model/provider.
- **Personal-vault policy review:** BLOCKED until the instructor checks the
  current OpenRouter and upstream-provider policies.

Do not mark these complete from automated test evidence alone.
