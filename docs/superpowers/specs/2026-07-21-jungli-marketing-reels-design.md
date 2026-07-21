# Jungli Marketing Reels — Design

**Date:** 2026-07-21
**Status:** Approved for implementation planning

## Goal

Create two vertical Instagram Reels promoting Jungli's **Vibe Code with a
View** AI learning residency. Both edits use Alan's talking-head recording as
the narrative spine, show the three learning tracks and life at Jungli through
B-roll, explain the 2-day, 5-day, and 7-day attendance options, and finish with
an application call to action.

All video-editing files must remain local. No raw footage, extracted clips,
transcripts, Remotion source, dependencies, previews, or rendered videos will
be committed to this repository.

## Approved outputs

Two MP4 compositions will be produced from one shared edit system:

1. **Short Reel:** 45–60 seconds, with the strongest hook and only the most
   persuasive parts of the spoken message.
2. **Extended Reel:** 75–90 seconds, retaining more of Alan's explanation and
   allowing longer class, campus, and community moments.

Both outputs use:

- 1080×1920 pixels (9:16)
- 30 frames per second
- H.264 video and AAC audio in an MP4 container
- Instagram-safe caption and title placement

## Local-only workspace

Add `/video-studio/` to the repository root `.gitignore`, then create this
ignored workspace:

```text
video-studio/
├── footage/
│   ├── inbox/
│   │   ├── talking-head/
│   │   └── b-roll/
│   └── selected/
├── transcripts/
├── public/
│   └── media/
├── src/
│   ├── compositions/JungliResidencyReel/
│   ├── components/BrandedCaptions.tsx
│   ├── components/EndCard.tsx
│   └── brand.ts
├── renders/
├── package.json
└── README.md
```

The Remotion project and its media live together in the ignored directory.
The local brand module copies the approved constants from
`brand/brand-guide.md`; the committed guide remains the source of truth.

## Source footage

Copy, rather than move, these AirDropped originals from `~/Downloads` so the
source files remain untouched:

| File | Duration | Role |
|---|---:|---|
| `IMG_3540.MOV` | 2:15 | Talking-head narrative; also shows room, balcony, pool, and jungle view |
| `IMG_3544.MOV` | 0:25 | Arthi teaching the Automation & Productivity track |
| `IMG_3545.MOV` | 0:13 | Arpit showing the finished AI-video edit while Arthi watches |
| `IMG_3534.MOV` | 0:29 | Party, cat on a resident's shoulder, and Divi at the DJ setup |
| `IMG_3539.MOV` | 0:17 | Room/doorway and close jungle view |
| `IMG_3541.MOV` | 0:25 | Green campus walk and zoomed monkey moment |
| `IMG_3542.MOV` | 0:30 | Bright green snake and surrounding jungle |

Source clips are iPhone recordings. Rotation metadata and portrait crops must
be handled explicitly rather than assuming the encoded width and height
describe the intended orientation.

## Editorial structure

### Shared story

1. Open on the strongest self-contained sentence from Alan's recording rather
   than automatically using its first sentence.
2. Tighten the talking-head delivery by removing unnecessary pauses,
   repetitions, and stumbles without making the speech sound rushed or
   unnatural.
3. Replace the talking-head image with full-screen B-roll while Alan's voice
   continues. Do not use split screen or picture-in-picture.
4. Match the learning footage to the narration:
   - Arthi teaching for Automation & Productivity.
   - Arpit's AI-video edit for AI in the Arts / Creative.
   - Alan on camera for AI & Agents / Building.
5. Use the room, balcony, campus, monkey, party, cat, DJ, and optionally the
   snake to establish the residency setting and community. The monkey may
   provide a quick “WiFi meets wildlife” beat. B-roll is selected for relevance
   and visual quality; using every clip is not mandatory.
6. Add a concise branded information beat that was not spoken in the original:
   - **2-Day Weekend Trial**
   - **5-Day Sprint**
   - **7-Day Bundle**
7. Finish with a 2–4 second end card:
   - `Vibe Code with a View`
   - `AI learning residency at Jungli`
   - `Apply — link in bio`

The information labels and residency positioning align with the live program
page at `https://junglithenomad.com/programs/vibe-code/` as checked on
2026-07-21. Do not include the page's expired first-cohort application date.

### Differences between the cuts

The short cut prioritizes pace: brief B-roll, only essential spoken claims,
and a compact duration-options card. The extended cut preserves more of
Alan's personality and explanation, holds on the classes and setting for
longer, and gives the three attendance options more reading time.

## Visual and audio system

Use the existing Jungli brand rules:

- Jungle `#073801` and Jungle Deep `#002207` as graphic grounds.
- Cream `#FFFFF5` for primary text, never pure white.
- Marigold `#FBD010` for selective emphasis.
- Sage `#9AC072` for secondary labels where needed.
- Raleway 900 for display text, Inter for captions, and Montserrat for small
  uppercase labels.

Captions use short, readable phrases in cream Inter with no more than a small
number of marigold-highlighted keywords. They remain inside Instagram's safe
area and are legible over both bright jungle footage and indoor footage using
a restrained shadow or dark translucent backing when necessary.

Alan's cleaned original voice is the primary audio throughout. Supporting
clip audio is muted unless a very brief ambient moment materially improves the
party or nature sequence. No third-party music is added in the first draft;
music can be added later only from a supplied or appropriately licensed track.

## Transcription and edit data

Use Remotion's local Whisper.cpp integration to produce token-level timings
from `IMG_3540.MOV`. Store the raw transcript and corrected Remotion caption
JSON inside the ignored workspace. Manually correct transcription errors,
especially `Arthi`, `Arpit`, `Divi`, `Jungli`, and `Vibe Code with a View`.

Keep editorial timing separate from presentation components. A single edit
data module defines:

- talking-head keep ranges;
- B-roll source, in-point, out-point, and crop focus;
- caption timing and corrected text;
- information-card timing; and
- end-card timing.

The short and extended compositions consume different timing data but reuse
the same video, caption, information-card, and end-card components.

## Workflow

1. Add the ignore rule and scaffold the local Remotion workspace.
2. Copy the seven original videos into the appropriate inbox directories.
3. Inspect orientation, duration, audio streams, and representative frames.
4. Transcribe the talking-head clip locally and correct the transcript.
5. Mark spoken keep ranges and B-roll ranges before encoding the compositions.
6. Build and preview the shared branded components.
7. Render low-resolution draft versions of both cuts.
8. Review the complete drafts and revise editorial timings, crops, captions,
   and audio transitions.
9. Render and verify the two final MP4 files.

## Error handling and quality checks

- Preserve all original AirDropped files; derived media is disposable.
- If local Whisper installation or model download fails, report the failure
  rather than switching to a paid cloud transcription service without
  approval.
- Correct iPhone rotation and use subject-aware portrait cropping so faces,
  the monkey, class activity, screens, and the DJ setup remain visible.
- Use short audio crossfades around removed speech ranges to prevent clicks or
  abrupt ambience changes.
- Do not let captions overlap Instagram's interface-heavy top and bottom
  regions.
- Run type checking and Remotion validation before final rendering.
- Render representative frames from the opening, each track, the attendance
  options, and the end card for visual inspection.
- Inspect both final files with `ffprobe` to confirm dimensions, frame rate,
  duration, codecs, and audio presence.
- Watch the rendered drafts end to end before calling either edit final.

## Success criteria

- Both Reels feel like variants of one campaign rather than unrelated edits.
- Alan's message remains accurate and natural after tightening.
- Viewers can distinguish the three learning tracks and understand that 2-,
  5-, and 7-day options are available.
- The footage communicates both serious learning and the distinctive Jungli
  environment/community.
- Captions are accurate, branded, legible, and correctly timed.
- The final CTA clearly tells viewers to apply through the link in bio.
- `git status` shows no raw footage, local editing source, or rendered media.
