# Jungli Marketing Reels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully ignored local Remotion studio that turns the seven AirDropped Jungli videos into verified short and extended Instagram Reels.

**Architecture:** A tracked `.gitignore` rule creates a hard boundary around `video-studio/`; everything else, including code and media, remains local. Inside that boundary, one Remotion project uses source-timed speech captions and declarative edit data to render two compositions through shared voice, B-roll, caption, information-card, and end-card components.

**Tech Stack:** Node.js 23, TypeScript, React, Remotion 4, `@remotion/media`, `@remotion/captions`, Whisper.cpp via `@remotion/install-whisper-cpp`, Vitest, FFmpeg/FFprobe.

---

## Working constraints

- Design spec: `docs/superpowers/specs/2026-07-21-jungli-marketing-reels-design.md`.
- Work in the current checkout because the user explicitly wants the ignored studio inside this repository. A separate worktree would not share ignored files and would make the media workflow harder to find.
- Commit only the root `.gitignore` change. Never force-add anything under `video-studio/`.
- Use `apply_patch` for authored files. CLI scaffolding, package installation, generated transcripts, copied media, and rendered outputs are mechanical/generated writes.
- Any dependency, Whisper.cpp, or model download may require network approval.
- Keep the seven originals in `~/Downloads` untouched.

## File map

### Tracked file

- Modify `.gitignore` — ignore `/video-studio/` from the repository root.

### Local-only files under `video-studio/`

- `README.md` — local workflow, file naming, preview, transcription, and render commands.
- `package.json` — Studio, tests, typecheck, transcription, and render scripts.
- `src/index.ts` — Remotion entry point.
- `src/Root.tsx` — registers `JungliReelShort` and `JungliReelExtended`.
- `src/brand.ts` — Jungli palette, fonts, and numeric Instagram safe-area constants.
- `src/types.ts` — edit, crop, source-media, and composition types.
- `src/lib/timeline.ts` — duration calculation, validation, and source-to-output time mapping.
- `src/lib/captions.ts` — loads corrected Whisper captions, maps them through voice cuts, and groups words for display.
- `src/lib/timeline.test.ts` — validates duration, media bounds, non-overlap, and time mapping.
- `src/lib/captions.test.ts` — validates caption remapping across removed speech.
- `src/data/media.ts` — filenames, measured durations, orientation, and labels for the seven sources.
- `src/data/short-edit.ts` — 45–60 second edit decisions.
- `src/data/extended-edit.ts` — 75–90 second edit decisions.
- `src/components/PortraitVideo.tsx` — subject-aware 9:16 crop for iPhone footage.
- `src/components/VoiceTrack.tsx` — joins retained talking-head ranges and applies short audio fades.
- `src/components/BrollTrack.tsx` — overlays muted full-screen supporting footage.
- `src/components/BrandedCaptions.tsx` — safe-area captions with marigold keyword emphasis.
- `src/components/DurationOptions.tsx` — 2-Day, 5-Day, and 7-Day information beat.
- `src/components/EndCard.tsx` — residency name and link-in-bio CTA.
- `src/compositions/JungliResidencyReel.tsx` — assembles shared layers from an edit definition.
- `scripts/transcribe.mjs` — extracts mono 16 kHz audio, installs/downloads local Whisper assets, and writes source-timed caption JSON.
- `scripts/extract-selected.ts` — makes reviewable B-roll extracts from approved ranges without changing originals.
- `scripts/verify-render.mjs` — calls FFprobe and fails on incorrect dimensions, frame rate, duration band, codec, or missing audio.
- `footage/inbox/talking-head/IMG_3540.MOV` — copied narrative source.
- `footage/inbox/b-roll/*.MOV` — copied supporting sources.
- `public/media/` — render-accessible copies of the seven source files.
- `transcripts/talking-head.raw.json` — generated source-timed Whisper output.
- `transcripts/talking-head.corrected.json` — manually corrected captions.
- `renders/drafts/` and `renders/final/` — draft and final MP4 outputs.

## Task 1: Establish the Git boundary

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Verify the studio is not already ignored**

Run:

```bash
git check-ignore -q video-studio/probe
```

Expected: exit code `1`.

- [ ] **Step 2: Add the root-only ignore rule**

Append this section to `.gitignore`:

```gitignore

# Local Jungli marketing video studio — footage, editing code, and renders
/video-studio/
```

- [ ] **Step 3: Verify the ignore boundary**

Run:

```bash
mkdir -p video-studio
touch video-studio/probe
git check-ignore -v video-studio/probe
git status --short
```

Expected: `git check-ignore` names the new rule; `git status` lists only `.gitignore`.

- [ ] **Step 4: Commit the only tracked implementation change**

```bash
git add .gitignore
git commit -m "Ignore local Jungli video studio"
```

Expected: one-file commit; no `video-studio/` paths are staged.

## Task 2: Scaffold Remotion and ingest the seven sources

**Files:**
- Create: `video-studio/package.json`
- Create: `video-studio/src/index.ts`
- Create: `video-studio/src/Root.tsx`
- Create: `video-studio/README.md`
- Copy: seven files into `video-studio/footage/inbox/`

- [ ] **Step 1: Remove the ignore-rule probe and scaffold outside the Git repository**

Run:

```bash
rm video-studio/probe
cd /tmp
npx create-video@latest --yes --blank --no-tailwind jungli-video-studio-scaffold
```

Expected: a blank TypeScript Remotion project in `/tmp/jungli-video-studio-scaffold`. If network access fails, retry with approval. Do not initialize another Git repository.

- [ ] **Step 2: Copy the scaffold into the ignored workspace**

Run:

```bash
rsync -a --exclude .git /tmp/jungli-video-studio-scaffold/ /Users/alanoliver/jungli/video-studio/
mkdir -p video-studio/footage/inbox/talking-head video-studio/footage/inbox/b-roll video-studio/footage/selected video-studio/transcripts video-studio/public/media video-studio/renders/drafts video-studio/renders/final video-studio/scripts
```

Expected: the Remotion project exists only below the ignored directory.

- [ ] **Step 3: Copy the originals without altering Downloads**

Run:

```bash
cp -p ~/Downloads/IMG_3540.MOV video-studio/footage/inbox/talking-head/
cp -p ~/Downloads/IMG_3534.MOV ~/Downloads/IMG_3539.MOV ~/Downloads/IMG_3541.MOV ~/Downloads/IMG_3542.MOV ~/Downloads/IMG_3544.MOV ~/Downloads/IMG_3545.MOV video-studio/footage/inbox/b-roll/
cp -p video-studio/footage/inbox/talking-head/IMG_3540.MOV video-studio/public/media/
cp -p video-studio/footage/inbox/b-roll/*.MOV video-studio/public/media/
```

Expected: seven copied files in the inbox and seven render-accessible copies in
`public/media/`; matching byte counts across Downloads, inbox, and public media.

- [ ] **Step 4: Add the required Remotion packages and test tooling**

Run from `video-studio/`:

```bash
npx remotion add @remotion/media @remotion/captions @remotion/google-fonts @remotion/install-whisper-cpp
npm install --save-dev vitest tsx
```

Expected: every `remotion` and `@remotion/*` package is pinned to the same exact version; `vitest` and `tsx` are dev dependencies.

- [ ] **Step 5: Set the local scripts**

Ensure `package.json` contains:

```json
{
  "scripts": {
    "studio": "remotion studio",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "transcribe": "node scripts/transcribe.mjs",
    "extract": "tsx scripts/extract-selected.ts",
    "render:short:draft": "remotion render JungliReelShort renders/drafts/jungli-reel-short.mp4 --scale=0.5 --codec=h264",
    "render:extended:draft": "remotion render JungliReelExtended renders/drafts/jungli-reel-extended.mp4 --scale=0.5 --codec=h264",
    "render:short": "remotion render JungliReelShort renders/final/jungli-reel-short.mp4 --codec=h264 --audio-codec=aac",
    "render:extended": "remotion render JungliReelExtended renders/final/jungli-reel-extended.mp4 --codec=h264 --audio-codec=aac",
    "verify": "node scripts/verify-render.mjs"
  }
}
```

- [ ] **Step 6: Confirm Git cannot see the studio**

Run `git status --short --ignored | rg 'video-studio'`.

Expected: a single `!! video-studio/` entry and no untracked `video-studio` files.

## Task 3: Inventory and transcribe locally

**Files:**
- Create: `video-studio/src/data/media.ts`
- Create: `video-studio/scripts/transcribe.mjs`
- Generate: `video-studio/transcripts/talking-head.raw.json`
- Create: `video-studio/transcripts/talking-head.corrected.json`

- [ ] **Step 1: Record authoritative media metadata**

Run FFprobe over every inbox file with:

```bash
ffprobe -v error -show_entries format=filename,duration,size -show_entries stream=index,codec_type,width,height,r_frame_rate:stream_side_data=rotation -of json FILE
```

Expected: seven readable videos, all nominally 30 fps, with audio confirmed for `IMG_3540.MOV`. Record measured durations and rotation/crop behavior in `src/data/media.ts`.

- [ ] **Step 2: Inspect representative frames before choosing ranges**

Use FFmpeg to create an eight-frame contact sheet for each source at evenly
spaced timestamps. Inspect all seven sheets and then inspect full-resolution
frames around the class, AI-edit, monkey, cat, DJ, room/balcony, and snake
moments. Record promising in/out points and portrait crop focus notes in
`transcripts/footage-notes.md`.

- [ ] **Step 3: Implement the local transcription script**

Write `scripts/transcribe.mjs` to:

1. call FFmpeg with `-vn -ac 1 -ar 16000` and create `transcripts/talking-head.wav`;
2. install Whisper.cpp `1.5.5` into `whisper.cpp/` if absent;
3. download `small.en` if absent;
4. call `transcribe()` with token-level timestamps;
5. convert with `toCaptions()`; and
6. write formatted JSON to `transcripts/talking-head.raw.json`.

The script must stop on errors and must not call a paid API.

- [ ] **Step 4: Run the transcription**

Run `npm run transcribe`.

Expected: a local Whisper/model download on the first run and source-timed caption JSON covering the talking-head clip.

- [ ] **Step 5: Correct the transcript while preserving timings**

Copy raw JSON to `talking-head.corrected.json`, then correct wording and punctuation. Explicitly check `Arthi`, `Arpit`, `Divi`, `Jungli`, and `Vibe Code with a View` against the audio.

- [ ] **Step 6: Write a readable edit transcript**

Create `transcripts/talking-head-edit.md` with timestamped paragraphs and mark candidate hook, essential claims, repeated ideas, stumbles, and natural cut points.

Expected: enough evidence to select 45–60 and 75–90 second spoken cuts without guessing.

## Task 4: Build the edit data model with tests

**Files:**
- Create: `video-studio/src/types.ts`
- Create: `video-studio/src/lib/timeline.ts`
- Create: `video-studio/src/lib/timeline.test.ts`

- [ ] **Step 1: Write failing tests for timeline validation**

Cover these cases:

```ts
it('calculates output duration from retained voice ranges');
it('rejects reversed or overlapping voice ranges');
it('rejects b-roll outside the output duration');
it('rejects source ranges beyond measured media duration');
it('maps source speech time into compacted output time');
```

Use a minimal fixture with two retained ranges: `0–10s` and `15–25s`; assert a 20-second output and that source time `18s` maps to output time `13s`.

- [ ] **Step 2: Run the tests and verify failure**

Run `npm test -- src/lib/timeline.test.ts`.

Expected: FAIL because timeline functions do not exist.

- [ ] **Step 3: Implement minimal typed timeline utilities**

Define:

```ts
export type VoiceRange = {sourceStartSec: number; sourceEndSec: number};
export type Crop = {xPercent: number; yPercent: number; scale: number};
export type BrollRange = {
  id: string;
  source: string;
  outputStartSec: number;
  outputEndSec: number;
  sourceStartSec: number;
  sourceEndSec: number;
  crop: Crop;
};
export type EditDefinition = {
  id: 'JungliReelShort' | 'JungliReelExtended';
  targetDuration: [number, number];
  voiceRanges: VoiceRange[];
  broll: BrollRange[];
  optionsDurationSec: number;
  endCardDurationSec: number;
};
```

Implement pure `getVoiceDuration()`, `getOutputDuration()`, `mapSourceTimeToOutput()`, and `validateEdit()` functions. The information card always follows the compacted voice timeline and the end card always follows the information card. `getOutputDuration()` therefore adds information-card and end-card durations to retained speech, and B-roll must end no later than the voice duration.

- [ ] **Step 4: Run the tests and typecheck**

Run `npm test -- src/lib/timeline.test.ts && npm run typecheck`.

Expected: PASS.

## Task 5: Remap captions through the speech cuts

**Files:**
- Create: `video-studio/src/lib/captions.ts`
- Create: `video-studio/src/lib/captions.test.ts`

- [ ] **Step 1: Write failing caption-remapping tests**

Use captions before, inside, and after a removed `10–15s` gap. Assert that removed captions disappear, retained captions preserve text, and captions after the gap shift five seconds earlier.

- [ ] **Step 2: Run the test and verify failure**

Run `npm test -- src/lib/captions.test.ts`.

Expected: FAIL because `remapCaptions()` does not exist.

- [ ] **Step 3: Implement caption remapping**

Implement `remapCaptions(captions, voiceRanges)` by intersecting each source caption with a retained voice range and mapping `startMs`/`endMs` into compacted output time. Use `createTikTokStyleCaptions()` only after remapping, with a readable page duration near 1.2 seconds.

- [ ] **Step 4: Run all local tests**

Run `npm test && npm run typecheck`.

Expected: all tests PASS.

## Task 6: Select both editorial timelines and extract review clips

**Files:**
- Create: `video-studio/src/data/short-edit.ts`
- Create: `video-studio/src/data/extended-edit.ts`
- Create: `video-studio/scripts/extract-selected.ts`
- Generate: `video-studio/footage/selected/*.mp4`

- [ ] **Step 1: Choose the short voice ranges from the timestamped transcript**

Select a self-contained hook and the minimum ranges needed to explain the residency and CTA. Keep spoken content plus cards within 45–60 seconds. Cut only at phrase boundaries.

- [ ] **Step 2: Choose the extended voice ranges**

Retain more personality and explanation while keeping the complete composition within 75–90 seconds. Reuse the same hook when it remains the strongest opening.

- [ ] **Step 3: Map B-roll to claims and residency beats**

Define ranges for Arthi teaching, Arpit's AI edit, the room/balcony, campus/monkey, party/cat/Divi, and optional snake. B-roll replaces the picture but remains muted under Alan's continuous voice. Set per-shot crop focus values.

- [ ] **Step 4: Add information and end-card timing**

Reserve 3–5 seconds for the duration-options beat and 2–4 seconds for the end card. The short edit uses the lower end; the extended edit may use the upper end. Both cards are appended after the compacted speech: options first, end card second. They never interrupt or overlap voice, captions, or B-roll.

- [ ] **Step 5: Validate both definitions**

Add fixtures to `timeline.test.ts` that import both real edits and call `validateEdit()`.

Run `npm test`.

Expected: both definitions pass duration, bounds, and non-overlap checks.

- [ ] **Step 6: Extract selected B-roll for quick review**

Implement `extract-selected.ts` to import both TypeScript edit definitions directly (the package script uses `tsx`) and call FFmpeg with `-ss`, `-t`, `-c:v libx264`, `-c:a aac` for each unique selected range. Never overwrite inbox files.

Run `npm run extract` and inspect the selected clips.

## Task 7: Build the shared branded composition

**Files:**
- Create: `video-studio/src/brand.ts`
- Create: `video-studio/src/components/PortraitVideo.tsx`
- Create: `video-studio/src/components/VoiceTrack.tsx`
- Create: `video-studio/src/components/BrollTrack.tsx`
- Create: `video-studio/src/components/BrandedCaptions.tsx`
- Create: `video-studio/src/components/DurationOptions.tsx`
- Create: `video-studio/src/components/EndCard.tsx`
- Create: `video-studio/src/compositions/JungliResidencyReel.tsx`
- Modify: `video-studio/src/Root.tsx`

- [ ] **Step 1: Encode brand and safe-area constants**

Use:

```ts
export const COLORS = {
  jungle: '#073801',
  jungleDeep: '#002207',
  canopy: '#0C4605',
  cream: '#FFFFF5',
  marigold: '#FBD010',
  paleGold: '#FCE486',
  sage: '#9AC072',
} as const;

export const SAFE_AREA = {top: 220, right: 96, bottom: 340, left: 96} as const;
```

Load Raleway, Inter, and Montserrat from `@remotion/google-fonts`, with system fallbacks if font loading fails.

- [ ] **Step 2: Implement subject-aware portrait video**

Use `<Video>` from `@remotion/media`, `staticFile()`, `objectFit: 'cover'`, crop focus from the edit data, and explicit rotation/crop behavior discovered in Task 3. Supporting footage is muted.

- [ ] **Step 3: Implement the voice track**

Render retained talking-head ranges sequentially. Use `trimBefore`/`trimAfter` and a two-frame volume ramp at internal cuts to prevent clicks while avoiding audible gaps.

- [ ] **Step 4: Implement B-roll overlays**

Place each B-roll range in an absolute `<Sequence>` above the voice picture. Keep the underlying voice track mounted so speech stays continuous.

- [ ] **Step 5: Implement captions**

Render remapped caption pages above the bottom safe inset. Use cream Inter, a restrained dark translucent backing or shadow, and marigold only for selected keywords. Do not obscure faces when crop data permits a better placement.

- [ ] **Step 6: Implement the two graphic beats**

`DurationOptions` shows `2-Day Weekend Trial`, `5-Day Sprint`, and `7-Day Bundle`. `EndCard` shows `Vibe Code with a View`, `AI learning residency at Jungli`, and `Apply — link in bio` on Jungle Deep with Raleway display type.

- [ ] **Step 7: Assemble the shared composition**

Implement `JungliResidencyReel.tsx` as the single layer coordinator. For the compacted voice duration, render `VoiceTrack`, `BrollTrack`, and `BrandedCaptions` together. Starting exactly at `getVoiceDuration(edit)`, sequence `DurationOptions` for `optionsDurationSec`; immediately after it, sequence `EndCard` for `endCardDurationSec`. Accept an `EditDefinition` prop so both outputs reuse the same assembly.

- [ ] **Step 8: Register both compositions**

Register `JungliReelShort` and `JungliReelExtended` at 1080×1920 and 30 fps. Derive `durationInFrames` from each validated edit definition.

- [ ] **Step 9: Run structural verification**

Run:

```bash
npm test
npm run typecheck
npx remotion compositions
```

Expected: tests and typecheck pass; both compositions appear with correct size, fps, and duration bands.

## Task 8: Preview and refine both edits

**Files:**
- Modify: local edit data and components as review requires
- Generate: `video-studio/renders/drafts/*.mp4`

- [ ] **Step 1: Open Remotion Studio**

Run `npm run studio` and inspect with @browser:control-in-app-browser if the in-app browser can reach the local URL.

- [ ] **Step 2: Review mandatory frames**

Inspect the opening, Automation track, Creative track, AI & Agents talking head, monkey/wildlife beat, duration options, and end card in both compositions.

- [ ] **Step 3: Render half-resolution drafts**

Run:

```bash
npm run render:short:draft
npm run render:extended:draft
```

Expected: two playable 540×960 drafts.

- [ ] **Step 4: Watch both drafts end to end**

Check hook strength, natural speech cuts, crop focus, caption correctness, caption safe area, reading time, audio continuity, and CTA clarity. Prefer the strongest footage; do not force every clip into both cuts.

- [ ] **Step 5: Apply editorial corrections and rerender drafts**

Repeat until both drafts meet the spec and no known caption, crop, timing, or audio defects remain.

## Task 9: Render and verify final MP4s

**Files:**
- Create: `video-studio/scripts/verify-render.mjs`
- Generate: `video-studio/renders/final/jungli-reel-short.mp4`
- Generate: `video-studio/renders/final/jungli-reel-extended.mp4`

- [ ] **Step 1: Write a failing render-verification check**

Make `verify-render.mjs` fail when a fixture path is missing, dimensions are not 1080×1920, video is not H.264, audio is absent/not AAC, fps differs from 30, or duration falls outside its composition band.

- [ ] **Step 2: Run it before final rendering**

Run `npm run verify`.

Expected: FAIL because final outputs do not exist yet.

- [ ] **Step 3: Render both full-resolution finals**

Run:

```bash
npm run render:short
npm run render:extended
```

Expected: two 1080×1920 H.264/AAC MP4 files.

- [ ] **Step 4: Verify technical output**

Run `npm run verify`.

Expected: PASS for both files, including duration bands and audio presence.

- [ ] **Step 5: Perform final visual QA**

Render or extract representative frames for the opening, each learning track, attendance options, and end card. Watch both final files end to end and confirm no blank frames, clipped subjects, caption errors, or audible edit clicks.

- [ ] **Step 6: Confirm repository cleanliness**

Run:

```bash
git status --short
git check-ignore -v video-studio/renders/final/jungli-reel-short.mp4
git check-ignore -v video-studio/renders/final/jungli-reel-extended.mp4
```

Expected: clean tracked worktree; both final outputs match `/video-studio/` ignore rule.

## Completion handoff

Provide clickable local paths to both final MP4 files, their verified durations and technical properties, a concise summary of how the cuts differ, and any remaining subjective choice for the user (for example, which version to post first). Do not claim completion until tests, renders, FFprobe checks, representative-frame inspection, and end-to-end playback review have all succeeded.
