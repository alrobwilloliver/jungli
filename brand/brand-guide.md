# Jungli — Brand Guide

> The look, type, and voice for Jungli AI & Agents teaching materials.
> Colours and fonts are pulled from the live site, [junglithenomad.com](https://junglithenomad.com/),
> so slides sit inside the residency's own branding.

This is Jungli's branding too — keep decks recognisably *theirs*: deep jungle
green, warm cream, a marigold accent, and real people over stock polish.

---

## Colours

| Name        | Hex       | Use                                    |
|-------------|-----------|----------------------------------------|
| Jungle      | `#073801` | Primary slide background               |
| Jungle deep | `#002207` | Title / section slides, code panels    |
| Canopy      | `#0C4605` | Alternate panel (e.g. Trap slides)     |
| Cream       | `#FFFFF5` | Body text — a **warm** white, never `#FFFFFF` |
| Marigold    | `#FBD010` | Headings, links, key accent — use sparingly |
| Pale gold   | `#FCE486` | Code text, soft highlights             |
| Sage        | `#9AC072` | Labels, secondary text                 |

**Rules of thumb**
- Green is the ground; cream is the text; marigold is the *spark* — a little goes a long way.
- Never pure white (`#FFFFFF`) or pure-flat black backgrounds. Warm everything.
- One accent per slide. If everything's highlighted, nothing is.

---

## Type

Three Google Fonts, all loaded automatically by the theme:

| Role     | Font       | Weight   | Where                          |
|----------|------------|----------|--------------------------------|
| Display  | Raleway    | 900      | Big slide titles (`# H1`)      |
| Heading  | Raleway    | 700      | Slide headings (`## H2`)       |
| Body     | Inter      | 400/500/600 | Bullets and paragraphs      |
| Label    | Montserrat | 500      | Eyebrows, pills, page numbers (uppercase, letter-spaced) |

The wordmark is simply **Jungli** set in Raleway 900 — no separate logo file needed.

---

## Voice & tone

Matches the residency and this repo's teaching stance:

- **Plain, encouraging, un-mystical.** The reader may never have opened a terminal.
- **Start from zero.** Never assume prior coding knowledge.
- **Tangible.** Point at what they'll *make*, not abstract theory.
- **Their words:** *"You apply, you don't book."* Warm, a little wry, community-first.

Do: "Watch Claude build this, then make it yours."
Don't: "Leverage agentic paradigms to optimise your workflow."

---

## Slide types

The theme ships six slide layouts. Set one per slide with an HTML comment:
`<!-- _class: NAME -->`. They map to how the track is taught
(`concept → demo → build → trap`, see `curriculum/lesson-plans.md`).

| `_class` | Purpose                        | Look                              |
|----------|--------------------------------|-----------------------------------|
| `title`  | Deck open / close              | Deep bg, centred, huge Raleway    |
| `section`| Divider between parts          | Deep bg, big marigold number      |
| *(none)* | Concept / content              | Standard green slide              |
| `demo`   | "Watch me" moment              | Sage **Live demo** pill           |
| `build`  | Learner does it                | Marigold **Build** pill           |
| `trap`   | Common mistake / gotcha        | Canopy bg, **⚠ Trap** pill        |
| `recap`  | Wrap-up                        | Centred, **Recap** pill           |

See `template-deck.md` for one of each, ready to copy.

---

## Don'ts

- Don't introduce new brand colours — extend the palette above, don't replace it.
- Don't use pure white or grey corporate backgrounds.
- Don't crowd slides — few words, big type; the talk carries the detail.
- Don't put real learner data, CVs, or API keys into decks that get committed.
