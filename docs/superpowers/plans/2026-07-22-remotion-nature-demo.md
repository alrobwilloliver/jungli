# Remotion Nature Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a cross-platform Remotion demo that combines a talking-head base with timed nature B-roll and local Whisper captions.

**Architecture:** A fresh project lives at `video-studio/nature-demo`. Pure timeline and caption utilities own timing behavior; small React components consume declarative edit data. A Node script owns local transcription and setup checks, while the README documents reproduction on macOS and Windows.

**Tech Stack:** React 19, TypeScript, Remotion 4, `@remotion/captions`, `@remotion/install-whisper-cpp`, Vitest, FFmpeg/ffprobe.

---

### Task 1: Scaffold and media inventory

**Files:**
- Create: `video-studio/nature-demo/` from the official blank Remotion template
- Create: `video-studio/nature-demo/public/media/*`
- Create: `video-studio/nature-demo/src/data/media.ts`
- Create: `video-studio/nature-demo/scripts/import-media.mjs`
- Create: `video-studio/nature-demo/scripts/setup.mjs`

- [ ] Check Node, npm, Git, FFmpeg, and the host OS.
- [ ] Scaffold the blank Remotion project and install official agent skills.
- [ ] Copy the four known source files without changing Downloads originals.
- [ ] Add a configurable import script that defaults to the current user's Downloads directory, reports every missing source before copying, and refuses partial imports.
- [ ] Add a non-destructive reproduction setup script that requires an explicit empty target directory, refuses non-empty destinations, detects macOS/Windows, checks prerequisites, scaffolds/configures the equivalent blank Remotion project, and prints permission-gated fallback instructions without silently installing system software.
- [ ] Inspect each copied file with ffprobe and encode the verified inventory in `media.ts`.
- [ ] Confirm Remotion Studio can enumerate the starter composition.

### Task 2: Timeline behavior via TDD

**Files:**
- Create: `video-studio/nature-demo/src/lib/timeline.test.ts`
- Create: `video-studio/nature-demo/src/lib/timeline.ts`
- Create: `video-studio/nature-demo/src/data/edit.ts`

- [ ] Write failing tests for seconds-to-frames ceiling; 1,899-frame duration; opening frames 12–144; caterpillar 1317–1476; deer 1470–1632; snake 1626–1782; exact six-frame adjacent overlaps; snake-to-base fade 1776–1782; talking-head close 1776–1830; end card 1830–1899; and captions ending at frame 1830.
- [ ] Run the targeted tests and confirm expected failures.
- [ ] Implement the minimum timing helpers and edit definition.
- [ ] Run the targeted tests and full suite until green.

### Task 3: Local transcription and caption behavior via TDD

**Files:**
- Create: `video-studio/nature-demo/scripts/transcribe.mjs`
- Create: `video-studio/nature-demo/src/lib/captions.test.ts`
- Create: `video-studio/nature-demo/src/lib/captions.ts`
- Create: `video-studio/nature-demo/src/data/captions.json`

- [ ] Align `remotion` and every `@remotion/*` dependency to the same exact installed version, including captions, Google Fonts, media, and Whisper; add an automated alignment check.
- [ ] Write failing tests for 1,800ms phrase grouping, two-line presentation data, timestamp preservation after text correction, and clear missing-caption errors.
- [ ] Run tests and verify the intended failures.
- [ ] Implement caption grouping and the cross-platform local transcription script with constants fixed to Whisper.cpp `1.5.5`, model `small.en`, and English; test those configuration values.
- [ ] Extract 16kHz mono WAV, install the pinned Whisper.cpp/model through Remotion, and generate token-timed JSON with all five Remotion `Caption[]` fields: `text`, `startMs`, `endMs`, `timestampMs`, and `confidence`, allowing `null` only where the type permits it.
- [ ] Correct obvious transcript errors while preserving timestamps.
- [ ] Run tests, load generated JSON through the composition's caption parser, and validate schema plus caption bounds against composition duration.

### Task 4: Composition and branded components

**Files:**
- Create: `video-studio/nature-demo/src/JungliNatureDemo.tsx`
- Create: `video-studio/nature-demo/src/components/BaseVideo.tsx`
- Create: `video-studio/nature-demo/src/components/NatureBroll.tsx`
- Create: `video-studio/nature-demo/src/components/AnimatedCaptions.tsx`
- Create: `video-studio/nature-demo/src/components/OpeningTitle.tsx`
- Create: `video-studio/nature-demo/src/components/EndCard.tsx`
- Create: `video-studio/nature-demo/src/brand.ts`
- Modify: `video-studio/nature-demo/src/Root.tsx`

- [ ] Register a 1080×1920, 30fps composition with duration derived from edit data.
- [ ] Render the talking-head source as cover-fit base picture and continuous audio.
- [ ] Fail clearly when any expected media or caption asset is missing.
- [ ] Overlay caterpillar (`50% 64%`), deer (`42% 58%`), and snake (`50% 62%`) with the approved six-frame crossfades.
- [ ] Render phrase captions inside vertical-video safe areas.
- [ ] Add the four exact brand colors, bundled Raleway/Inter fonts, restrained marigold keyword emphasis, an opening naming Claude + Remotion, and a closing invitation to learn at Jungli while narration continues.
- [ ] Run tests, lint, typecheck, and a Remotion bundle.

### Task 5: Cross-platform documentation and commands

**Files:**
- Modify: `video-studio/nature-demo/package.json`
- Create: `video-studio/nature-demo/README.md`

- [ ] Add scripts for Studio, test, typecheck, transcription, draft render, final render, and verification.
- [ ] Document empty-folder reproduction on macOS and Windows, including the non-overwriting setup script, configurable media source, Node/Git checks, Remotion skills, Whisper behavior, permission gates, and manual fallbacks.
- [ ] Document the four expected filenames and the accepted monkey/snake mismatch.
- [ ] Run all documented non-render setup commands that apply to this Mac.

### Task 6: Visual review, render, and verification

**Files:**
- Create: `video-studio/nature-demo/renders/review/*.png`
- Create: `video-studio/nature-demo/renders/final/jungli-nature-demo.mp4`
- Create: `video-studio/nature-demo/scripts/verify-render.mjs`

- [ ] Render opening, talking-head, each animal, and closing representative frames.
- [ ] Inspect the images for crop, caption position, contrast, and transition artifacts.
- [ ] Correct visible issues and rerun tests, lint, typecheck, and bundle.
- [ ] Render the complete H.264/AAC MP4.
- [ ] Run ffprobe verification for 1080×1920, 30fps, expected duration, H.264 video, AAC audio, and audio presence.
- [ ] Run the exact-version dependency alignment check.
- [ ] Run the full verification command and record its fresh output.
