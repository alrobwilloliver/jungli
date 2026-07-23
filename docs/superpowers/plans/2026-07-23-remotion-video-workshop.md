# Optional Remotion Video Workshop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete optional Jungli workshop that lets Mac and Windows beginners reproduce the existing Remotion nature video through a spec-driven Superpowers workflow.

**Architecture:** A tracked `projects/remotion-video-workshop/` package owns the learner guide, ordered prompts, locked project brief, compressed course media, a clean runnable reference implementation, and a Jungli Marp deck. The working but ignored `video-studio/nature-demo/` remains the source of truth; tracked proxies and cleaned source copies make the workshop cloneable without Git LFS or generated dependencies.

**Tech Stack:** Markdown, Marp, Claude Code Desktop, Superpowers, Remotion 4, React 19, TypeScript, Vitest, FFmpeg/ffprobe.

---

## File map

- `projects/remotion-video-workshop/README.md` — instructor-facing folder overview and quick links.
- `projects/remotion-video-workshop/WORKSHOP-GUIDE.md` — full learner journey, setup, timing, troubleshooting, and completion checklist.
- `projects/remotion-video-workshop/PROMPTS.md` — all prompts in exact workshop order.
- `projects/remotion-video-workshop/PROJECT-BRIEF.md` — locked outcome, editorial timeline, visual system, and acceptance criteria for Superpowers.
- `projects/remotion-video-workshop/media/*.mp4` — four repository-safe course proxies.
- `projects/remotion-video-workshop/assets/captions.json` — corrected caption source of truth.
- `projects/remotion-video-workshop/reference/` — cleaned runnable copy of the finished nature-demo implementation.
- `projects/remotion-video-workshop/reference/reference-output.mp4` — compact visual target.
- `projects/remotion-video-workshop/slides/workshop.md` — presenter deck using the existing Jungli Marp theme.
- `projects/remotion-video-workshop/slides/workshop.html` — generated deck for immediate presenting.
- `projects/remotion-video-workshop/slides/README.md` — deck build command.
- `README.md` and `CLAUDE.md` — add the optional workshop to the repository map/status.

### Task 1: Create the tracked workshop shell

**Files:**
- Create: `projects/remotion-video-workshop/README.md`
- Create: `projects/remotion-video-workshop/WORKSHOP-GUIDE.md`
- Create: `projects/remotion-video-workshop/PROMPTS.md`
- Create: `projects/remotion-video-workshop/PROJECT-BRIEF.md`
- Create: `projects/remotion-video-workshop/assets/captions.json`
- Create: `projects/remotion-video-workshop/slides/README.md`

- [ ] **Step 1: Create the directory tree**

Create `media/`, `assets/`, `reference/`, and `slides/` below
`projects/remotion-video-workshop/`.

- [ ] **Step 2: Copy corrected captions**

Copy `video-studio/nature-demo/src/data/captions.json` unchanged to
`projects/remotion-video-workshop/assets/captions.json`.

- [ ] **Step 3: Validate caption JSON**

Run:

```bash
node -e "const c=require('./projects/remotion-video-workshop/assets/captions.json'); if(!Array.isArray(c)||!c.length) process.exit(1); console.log(c.length)"
```

Expected: a positive caption count.

- [ ] **Step 4: Add the folder README skeleton**

Include outcome, three-hour duration, audience, directory map, fastest path,
reference-output link, and links to guide/prompts/slides.

- [ ] **Step 5: Commit the shell**

```bash
git add projects/remotion-video-workshop
git commit -m "Scaffold optional Remotion video workshop"
```

### Task 2: Produce repository-safe media and target output

**Files:**
- Create: `projects/remotion-video-workshop/media/talking-head.mp4`
- Create: `projects/remotion-video-workshop/media/caterpillar.mp4`
- Create: `projects/remotion-video-workshop/media/deer.mp4`
- Create: `projects/remotion-video-workshop/media/snake.mp4`
- Create: `projects/remotion-video-workshop/reference/reference-output.mp4`

- [ ] **Step 1: Probe every source**

Run `ffprobe` against the four exact files in
`video-studio/nature-demo/public/media/` and record duration, dimensions, fps,
codecs, rotation, and audio presence.

- [ ] **Step 2: Encode the talking-head proxy**

Use FFmpeg to make 720×1280 H.264, 30fps, `yuv420p`, CRF 23, AAC 128 kbps,
`faststart`, retaining the full duration and audio.

- [ ] **Step 3: Encode three silent B-roll proxies**

Use the same video settings, strip audio, and preserve duration for caterpillar,
deer, and snake.

- [ ] **Step 4: Encode the compact reference output**

Transcode the verified full render to 720×1280, 30fps, H.264 CRF 25,
`yuv420p`, AAC 96 kbps, and `faststart`.

- [ ] **Step 5: Verify proxy acceptance criteria**

For each output, use `ffprobe` and `stat`/`du` to confirm:

- portrait 720×1280;
- 30fps;
- H.264;
- talking-head/reference audio present and B-roll audio absent;
- full source duration retained within 0.1 seconds;
- every file below 95 MB.

- [ ] **Step 6: Commit media**

```bash
git add projects/remotion-video-workshop/media projects/remotion-video-workshop/reference/reference-output.mp4
git commit -m "Add Remotion workshop media"
```

### Task 3: Create the clean runnable reference project

**Files:**
- Create: `projects/remotion-video-workshop/reference/package.json`
- Create: `projects/remotion-video-workshop/reference/package-lock.json`
- Create: `projects/remotion-video-workshop/reference/remotion.config.ts`
- Create: `projects/remotion-video-workshop/reference/tsconfig.json`
- Create: `projects/remotion-video-workshop/reference/eslint.config.mjs`
- Create: `projects/remotion-video-workshop/reference/vitest.config.ts`
- Create: `projects/remotion-video-workshop/reference/src/**`
- Create: `projects/remotion-video-workshop/reference/scripts/**`
- Create: `projects/remotion-video-workshop/reference/README.md`
- Create: `projects/remotion-video-workshop/reference/.gitignore`

- [ ] **Step 1: Copy only source-controlled implementation files**

Copy configuration, `src/`, and relevant `scripts/` from
`video-studio/nature-demo/`. Exclude `node_modules`, `build`, renders other than
the compact output, Whisper source/model, transcripts, WAV files, and local
media.

- [ ] **Step 2: Adapt media import**

Make the reference import command default to `../media`, accept an override,
copy the four workshop MP4s into `public/media`, and copy
`../assets/captions.json` into `src/data/captions.json`. It must report all
missing files before copying and preserve source assets.

- [ ] **Step 3: Align filenames and metadata**

Update the reference media table and any source paths from `.MOV` to the tracked
`.mp4` proxy names while preserving approved timing/crops.

- [ ] **Step 4: Write reference README**

Document `npm install`, `npm run import-media`, `npm run dev`, tests, bundle,
render, and verification. Explain that the compact output is the target, not a
required learner deliverable.

- [ ] **Step 5: Install and test from a clean dependency state**

Run:

```bash
npm ci
npm test
npm run lint
npm run check:versions
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 6: Start Studio and inspect the composition**

Run `npm run dev`, confirm `JungliNatureDemo` appears, then stop the server.

- [ ] **Step 7: Render a representative still**

Run:

```bash
npx remotion still JungliNatureDemo renders/review/opening.png --frame=60
```

Inspect `renders/review/opening.png` and confirm that media, captions, and
branding load from the proxy assets.

- [ ] **Step 8: Commit the reference**

```bash
git add projects/remotion-video-workshop/reference
git commit -m "Add runnable Remotion workshop reference"
```

### Task 4: Write the locked project brief and prompt sequence

**Files:**
- Modify: `projects/remotion-video-workshop/PROJECT-BRIEF.md`
- Modify: `projects/remotion-video-workshop/PROMPTS.md`

- [ ] **Step 1: Write the project brief**

Include the 1080×1920, 30fps, 1,899-frame composition; exact opening, B-roll,
crossfade, close, end-card, caption, crop, brand, audio, and render acceptance
criteria from the approved nature-demo spec.

- [ ] **Step 2: Write prompts 1–5: preflight and project creation**

Cover read-only machine inspection; consent-gated installation guidance; a new
folder outside the course repo; media/caption copy; blank Remotion scaffold and
official Remotion skills.

- [ ] **Step 3: Write prompts 6–9: specification and plan**

Explicitly invoke Superpowers brainstorming, specification review, writing-plans,
and recommended task execution. Tell the agent the brief is locked so it asks
only genuine blockers.

- [ ] **Step 4: Write prompts 10–12: preview and render**

Open Studio, review named frames/transitions, correct visual issues, render, and
verify the MP4 with ffprobe.

- [ ] **Step 5: Add optional prompts**

Add local Whisper regeneration and a learner-media remix without making either
part of the core completion path.

- [ ] **Step 6: Check every prompt**

Each prompt must state one purpose, avoid Mac-only commands, preserve course
media, request approval for system changes, and end with a visible success
condition.

- [ ] **Step 7: Commit brief and prompts**

```bash
git add projects/remotion-video-workshop/PROJECT-BRIEF.md projects/remotion-video-workshop/PROMPTS.md
git commit -m "Add spec-driven Remotion workshop prompts"
```

### Task 5: Write the learner workshop guide

**Files:**
- Modify: `projects/remotion-video-workshop/WORKSHOP-GUIDE.md`
- Modify: `projects/remotion-video-workshop/README.md`

- [ ] **Step 1: Write the promise and prerequisites**

State the target artifact, audience, three-hour format, paid Claude plan
requirement, and pre-work downloads with official source links.

- [ ] **Step 2: Write Mac and Windows setup**

Use Claude Desktop Code tab as primary. Cover Git for Windows, current Node LTS,
restart/PATH checks, Remotion skills, Superpowers install, and consent-gated
FFmpeg. Avoid terminal-only framing even when the agent runs commands.

- [ ] **Step 3: Write the timed workshop flow**

Use `concept → demo → build → trap`, reference each numbered prompt, and put
clear stop/checkpoints after spec, plan, base video, B-roll, captions, Studio
review, and render.

- [ ] **Step 4: Add troubleshooting**

Cover missing Code tab, Git unavailable on Windows, stale PATH, port 3000 in use,
missing media/captions, package version mismatch, slow render, Whisper/model
download, and FFmpeg absence.

- [ ] **Step 5: Add completion and remix checklists**

Make the core definition of done a verified MP4. Keep transcription and media
replacement as explicit stretch goals.

- [ ] **Step 6: Finalise README navigation**

Make the folder understandable without reading the root repo documentation.

- [ ] **Step 7: Validate links**

Run a local Markdown-link checker or a focused script against the workshop tree.

- [ ] **Step 8: Commit the guide**

```bash
git add projects/remotion-video-workshop/README.md projects/remotion-video-workshop/WORKSHOP-GUIDE.md
git commit -m "Write Remotion video workshop guide"
```

### Task 6: Create and render the instructor slides

**Files:**
- Create: `projects/remotion-video-workshop/slides/workshop.md`
- Create: `projects/remotion-video-workshop/slides/workshop.html`
- Modify: `projects/remotion-video-workshop/slides/README.md`

- [ ] **Step 1: Draft the slide story**

Create roughly 22–26 low-density slides: target, video anatomy, spec-driven loop,
preflight, brief, specification, plan, build checkpoints, Studio, review,
render, traps, remix, recap.

- [ ] **Step 2: Apply Jungli slide grammar**

Use the existing `jungli` Marp theme and `title`, `section`, `demo`, `build`,
`trap`, and `recap` layouts. Keep visible copy audience-facing and avoid internal
planning notes.

- [ ] **Step 3: Add presenter notes where useful**

Keep spoken detail out of dense slide content. Reference prompt numbers rather
than pasting long prompts repeatedly.

- [ ] **Step 4: Render HTML**

Run:

```bash
npx @marp-team/marp-cli projects/remotion-video-workshop/slides/workshop.md \
  --theme-set brand/theme/jungli.css \
  -o projects/remotion-video-workshop/slides/workshop.html
```

Expected: exit 0 and generated HTML.

- [ ] **Step 5: Inspect every slide**

Review the rendered deck for overflow, small text, poor contrast, awkward wraps,
and inconsistent headers/pagination. Fix all visible issues and rerender.

- [ ] **Step 6: Document deck rebuild**

Add the exact command and source/output explanation to `slides/README.md`.

- [ ] **Step 7: Commit slides**

```bash
git add projects/remotion-video-workshop/slides
git commit -m "Add Remotion workshop slides"
```

### Task 7: Integrate the workshop into the teaching repository

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add the optional workshop to the root map**

Describe it as a standalone three-hour extra using Remotion, supplied media, and
spec-driven Superpowers.

- [ ] **Step 2: Add status and maintenance notes**

Record the new workshop, its media size constraint, current official-link
verification date, and the reference project boundary.

- [ ] **Step 3: Check for conflicting old references**

Search for statements that imply the repository contains only three projects or
that Superpowers is demo-only.

- [ ] **Step 4: Commit integration**

```bash
git add README.md CLAUDE.md
git commit -m "Add optional Remotion workshop to curriculum map"
```

### Task 8: Final verification

**Files:**
- Verify all files under: `projects/remotion-video-workshop/`

- [ ] **Step 1: Verify working tree scope**

Run `git status --short` and confirm no unrelated user files changed.

- [ ] **Step 2: Verify workshop assets**

Check JSON validity, file names, durations, codecs, dimensions, audio presence,
and every tracked file under 100 MB.

- [ ] **Step 3: Verify the reference project fresh**

Run tests, lint/typecheck, version alignment, bundle, and a representative still
from `projects/remotion-video-workshop/reference`.

- [ ] **Step 4: Verify documents**

Check internal links, prompt numbering, Mac/Windows coverage, official citations,
and consistency between brief, prompts, guide, deck, and reference timings.

- [ ] **Step 5: Verify slides**

Rebuild the Marp HTML and inspect the final deck.

- [ ] **Step 6: Review the final diff**

Run `git diff --check` and inspect `git diff HEAD~N --stat` plus the important
Markdown/source diffs.

- [ ] **Step 7: Commit final corrections**

```bash
git add projects/remotion-video-workshop README.md CLAUDE.md
git commit -m "Verify optional Remotion video workshop"
```
