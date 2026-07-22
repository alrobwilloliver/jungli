# Remotion Nature Demo — Design

**Date:** 2026-07-22
**Status:** Approved by user for implementation

## Goal

Build a self-contained technical demo in `video-studio/nature-demo` showing how
Claude can turn a talking-head recording and three nature clips into a polished
vertical video using Remotion. The result should be suitable for a live teaching
demonstration and straightforward to reproduce on macOS or Windows.

## Source media

Copy, never move or modify, these AirDropped originals from `~/Downloads`:

| File | Role |
|---|---|
| `IMG_3549.MOV` | 63.27-second base picture, narration, and audio |
| `IMG_3539 2.MOV` | Caterpillar B-roll |
| `IMG_3538.MOV` | Deer B-roll |
| `IMG_3542 2.MOV` | Snake B-roll |

The talking-head recording says “monkeys” while the available third clip is a
snake. This mismatch is accepted for this technical demo; the snake will appear
during that final animal mention.

## Output

- One 1080×1920, 30fps composition called `JungliNatureDemo`.
- Duration follows the 63.27-second talking-head source.
- The talking-head video and its original audio form the base track.
- Full-screen nature B-roll appears only during the nature section, while the
  base narration continues uninterrupted.
- The rendered deliverable is H.264/AAC MP4.

Convert the probed source duration with `Math.ceil(durationSec * 30)`, so 63.27
seconds becomes 1,899 frames (63.3 seconds). Final verification accepts a
duration difference of at most 0.1 seconds from 63.3 seconds.

## Editorial design

The talking head remains visible from the opening through the invitation to
learn with Claude and Remotion. Every range below is half-open: the start frame
is inclusive and the end frame is exclusive. The edit decision list is:

| Layer | Start frame | End frame | Behavior |
|---|---:|---:|---|
| Opening title | 12 | 144 | Overlay on talking head |
| Caterpillar | 1317 | 1476 | Full-screen B-roll |
| Deer | 1470 | 1632 | Full-screen B-roll |
| Snake | 1626 | 1782 | Full-screen B-roll |
| Talking-head close | 1776 | 1830 | Base picture restored after fade |
| End card | 1830 | 1899 | Replaces picture; narration continues |

Adjacent B-roll clips overlap by exactly six frames for linear opacity
crossfades. The snake fades to the always-present base video during frames
1776–1782. Crops are manual rather than automated: caterpillar uses
`object-position: 50% 64%`, deer `42% 58%`, and snake `50% 62%`, all cover-fit.
Automated subject detection is out of scope.

Whisper.cpp 1.5.5 with the `small.en` model generates English token-timed
captions locally. Every Caption JSON object has all five Remotion `Caption`
fields: `text`, `startMs`, `endMs`, `timestampMs`, and `confidence`;
`timestampMs` and `confidence` may be `null`. Tokens are grouped by
`createTikTokStyleCaptions({combineTokensWithinMilliseconds: 1800})` and
display on at most two lines.
Manual correction may change `text` only; timestamps remain unchanged.
Captions remain visible over the talking head and B-roll, then yield to the end
card at frame 1830.

## Visual system

Use Jungli branding: deep jungle green (`#002207`), jungle green (`#073801`),
cream (`#FFFFF5`), and marigold (`#FBD010`). Use Raleway for display copy and
Inter for captions, bundled through exact-version `@remotion/google-fonts`. Add:

- a short animated opening title identifying the Claude + Remotion demo;
- readable phrase-based animated captions with restrained keyword emphasis;
- smooth full-screen B-roll transitions; and
- a compact closing card inviting viewers to learn at Jungli.

## Architecture

Keep timeline data independent of rendering. Pure functions define duration,
caption grouping, B-roll timing, and validation, with Vitest coverage. Focused
React components render the base video, B-roll, captions, opening title, and end
card. A Node transcription script installs and runs the supported local
Whisper.cpp package and writes caption JSON.

## Cross-platform setup

The runnable implementation is the demo project. A reproduction setup script
creates or configures an equivalent project only in an explicitly supplied
empty directory and refuses overwrites. The README and script detect rather
than assume the OS. They check
Node.js and Git, use the official blank Remotion scaffold and Remotion agent
skills commands for a fresh reproduction, and use
`@remotion/install-whisper-cpp` for platform-specific Whisper installation.
System-level installation must not occur silently. macOS and Windows manual
fallback guidance must be explicit. Media is external and excluded from version
control. The import command accepts a configurable source directory, defaults
to the current user's Downloads folder, requires the four filenames above, and
reports all missing inputs before copying anything.

## Error handling and verification

- Preserve original Downloads media and copy into `public/media`.
- Inspect duration, rotation/orientation, codecs, and audio before editing.
- Fail clearly if expected media or generated captions are absent.
- Keep all `remotion` and `@remotion/*` packages on the same exact version.
- Test pure timing/caption logic, then run lint/typecheck and bundle checks.
- Inspect representative frames and render the full MP4.
- Use `ffprobe` to verify dimensions, fps, duration, codecs, and audio.

## Success criteria

The video opens and closes cleanly, retains continuous intelligible narration,
shows all three nature clips in the nature section, displays accurate readable
captions, follows Jungli branding, renders reproducibly, and includes clear
macOS/Windows setup instructions appropriate for beginners.
