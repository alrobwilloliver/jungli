# Instructor guide

## 60-minute sequence

- Minutes 0–10: concept and Sam baseline demo.
- Minutes 10–25: prompts 1–2; build and test the three note tools.
- Minutes 25–45: prompt 3; connect the bounded controller.
- Minutes 45–52: prompt 4; verify search → read → cited answer.
- Minutes 52–60: optional personal-vault switch.

Teach concept → demo → build → trap. The trap is treating retrieved text as
trusted instructions. Mocked checkpoints define completion; a live model is a
demo, not the acceptance test.

## Minute 25 recovery

Ask Claude Code: “Copy exactly `lib/vault/list-notes.ts`,
`lib/vault/search-notes.ts`, and `lib/vault/read-note.ts` from `finished` to
`skeleton`, then run `npm run test:checkpoint:tools`. Do not copy environment
files, vaults, schemas, UI, or deployment files.”

## Minute 45 recovery

Keep skeleton on port 3000 for comparison, or stop it. Run:

```bash
npm --prefix projects/agentic-second-brain/finished run dev -- --port 3001
```

Open `http://localhost:3001`.

## Personal notes: ordered privacy sequence

1. The instructor validates both policies: OpenRouter and the selected upstream
   provider.
2. The learner opts in after understanding what leaves their computer.
3. Only then create/copy `vault-personal`, set the values in
   [`MODEL-SETUP.md`](MODEL-SETUP.md), and restart local development.

Never use personal mode in a hosted demo. Rehearse Sam's question, both
checkpoints, the minute-25 copy prompt, and the finished port-3001 fallback.
