# Optional Remotion Video Workshop — Design

**Date:** 2026-07-23  
**Status:** Approved for immediate implementation

## Goal

Create a self-contained optional Jungli workshop that lets a beginner on macOS
or Windows reproduce Alan's 63-second vertical nature video with Claude Code,
Remotion, the four supplied videos, animated captions, branded titles, B-roll
crossfades, and a final MP4.

The workshop also teaches spec-driven development through Superpowers. Learners
do not begin by asking the agent to "make a video." They move through a visible
workflow:

> idea → brief → approved specification → implementation plan → build → visual
> review → verified render

## Audience and format

- Beginner-to-intermediate Jungli residents; no coding assumed.
- Optional three-hour workshop after the core track.
- Primary interface: the Claude desktop app's Code tab.
- One instructor build-along with short independent checkpoints.
- Mac and Windows are first-class paths.
- Tone and pacing match the existing Jungli workshops: plain, encouraging,
  tangible, and organised around `concept → demo → build → trap`.

## Recommended workshop shape

### Before the workshop: setup and download

Learners install or verify:

1. Claude desktop and access to the Code tab.
2. Git (required for local Code sessions on Windows).
3. One current Node.js LTS release and npm.
4. Superpowers through the Claude Code plugin manager.
5. Remotion's official agent skills.
6. FFmpeg only if it is missing and the learner approves the system change.

A copy-paste preflight prompt detects the operating system and installed tools,
explains missing prerequisites, and asks before any system-level installation.
The guide uses current official download pages rather than hard-coded package
versions that will go stale.

### Core three-hour session

1. **See the target (10 min):** play Alan's finished video and identify the base
   talking-head track, continuous audio, B-roll, captions, title, and end card.
2. **Why a spec first (20 min):** contrast a vague "make this polished" request
   with a locked editorial brief and acceptance criteria.
3. **Create the project and specification (35 min):** copy the supplied media,
   create a blank Remotion project, install Remotion skills, and use
   Superpowers brainstorming to turn the workshop brief into a written spec.
4. **Create the plan (20 min):** use the Superpowers writing-plans workflow to
   split timing logic, captions, composition, branding, and rendering into
   testable tasks.
5. **Build in checkpoints (65 min):** execute the plan, opening Remotion Studio
   after the base track, after B-roll, and after captions/branding.
6. **Review and render (20 min):** inspect representative frames, fix visible
   issues, render MP4, and verify dimensions, frame rate, duration, codecs, and
   audio.
7. **Recap and remix (10 min):** identify which parts are content, specification,
   code, and rendering; show how to replace the footage and timings.

## Deliverables

Create `projects/remotion-video-workshop/` with:

```text
projects/remotion-video-workshop/
├── README.md
├── WORKSHOP-GUIDE.md
├── PROMPTS.md
├── PROJECT-BRIEF.md
├── media/
│   ├── talking-head.mp4
│   ├── caterpillar.mp4
│   ├── deer.mp4
│   └── snake.mp4
├── reference/
│   ├── README.md
│   ├── package.json
│   ├── package-lock.json
│   ├── remotion.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── vitest.config.ts
│   ├── scripts/
│   ├── src/
│   └── reference-output.mp4
└── slides/
    ├── README.md
    ├── workshop.md
    └── workshop.html
```

The reference project is the cleaned, reproducible source of the working nature
demo. It excludes `node_modules`, build output, Whisper binaries/models,
intermediate WAV files, and full-resolution local renders.

## Media strategy

The original local sources and render exceed GitHub's normal per-file limits.
Create visually faithful H.264/AAC workshop proxies from the four originals.
Each tracked file must stay below 100 MB, and the total should remain reasonable
for a workshop clone. Preserve portrait orientation, audio on the talking-head
clip, and enough quality for a 1080×1920 render.

Include a compact reference MP4 so learners can see the intended outcome without
rendering first. The learner project copies media into `public/media`; the
reference implementation must clearly document the same step.

## Core versus extension path

The reliable core path uses the supplied, corrected `Caption[]` JSON so every
learner can finish without waiting for a model download or native compilation.

An optional extension regenerates captions locally with Remotion's supported
Whisper tooling. The guide makes the download size, setup time, and possible
platform-specific FFmpeg/Whisper issues explicit. Generated speech data remains
local.

## Prompt design

`PROMPTS.md` contains every learner prompt in order:

1. Preflight the machine without changing it.
2. Install only missing prerequisites, with approval.
3. Create a personal workshop folder outside the course repo.
4. Copy and verify supplied media.
5. Install Remotion skills and scaffold a blank project.
6. Read `PROJECT-BRIEF.md` and use Superpowers brainstorming to write the spec.
7. Review the spec against a checklist.
8. Use Superpowers to write the implementation plan.
9. Execute the plan in small verified tasks.
10. Open Remotion Studio and inspect named frames.
11. Render and verify the MP4.
12. Optional: regenerate captions locally.
13. Optional: remix the video with the learner's own media.

Prompts state the intended outcome and constraints, while leaving implementation
details to the agent and installed Remotion skills. Destructive actions and
system installs always require explicit approval.

## Slides and learner guide

The Marp deck uses the existing Jungli theme and slide grammar:

- `title`: outcome and promise
- `concept`: video as layers and time
- `demo`: finished video and Remotion Studio
- `build`: learner checkpoints and prompts
- `trap`: vague prompting, unverified timings, giant downloads, and rendering
  before previewing
- `recap`: the spec-driven loop and what learners own

The deck is low-density and presenter-led. `WORKSHOP-GUIDE.md` carries detailed
steps, Mac/Windows notes, troubleshooting, and the completion checklist.
`PROMPTS.md` remains the single copy-paste reference.

## Error handling

- Preflight prompts distinguish Terminal on macOS from PowerShell on Windows.
- Missing tools produce links and restart instructions instead of silent
  installs.
- Media checks report all missing files before copying.
- The guide explains Windows PATH refresh after installing Node or Git.
- Remotion packages remain on one exact version within the reference project.
- The agent must not modify the supplied course media.
- Build steps stop on missing captions, media, failing tests, or bundle errors.
- Rendering follows representative-frame review, not the reverse.

## Verification

Before delivery:

1. Check all internal Markdown links.
2. Confirm every prompt has one clear purpose and a visible success condition.
3. Verify both OS paths against current official documentation.
4. Run the reference project's tests, lint, typecheck, dependency alignment,
   and bundle.
5. Start Remotion Studio and confirm the composition loads.
6. Render or verify the compact reference output.
7. Render the Marp deck and inspect every slide for overflow and readability.
8. Check tracked media and output files are below 100 MB each.

## Success criteria

A learner can start from the workshop folder on macOS or Windows, follow the
prompts in order, see why the specification comes before implementation, open a
working Remotion composition, reproduce the editorial structure of Alan's demo,
and leave with a verified MP4 plus a repeatable method for future agent-built
projects.
