# `brand/` — Jungli slide branding

Everything needed to make slides that look like Jungli. Built from the live
site ([junglithenomad.com](https://junglithenomad.com/)) so decks sit inside
the residency's own branding.

Slides are **Marp**: you write them in Markdown, one theme file styles them.
No slide app, no new account — Claude Code can generate a whole deck, and you
edit the words like any text.

```
brand/
├── README.md          ← you are here
├── brand-guide.md     ← colours, type, voice, do's & don'ts
├── theme/
│   ├── jungli.css      ← the Marp **slide** theme (dark, for decks)
│   └── jungli-doc.css  ← the **document** theme (light, for printable handouts/guides)
└── template-deck.md   ← starter deck with every slide type — copy this to begin
```

**Two themes, one palette.** Use `jungli.css` for **slides** (dark jungle background,
via Marp). Use `jungli-doc.css` for **documents** — workshop guides, handouts, anything
meant to be read or printed (cream background, jungle-green headings, marigold accents).
Render a doc to a branded PDF:

```bash
npx md-to-pdf --stylesheet brand/theme/jungli-doc.css \
  --pdf-options '{"printBackground":true,"format":"A4"}' path/to/guide.md
```

## Make a deck (3 steps)

1. **Copy the starter.** Duplicate `template-deck.md` to where the deck lives,
   e.g. `curriculum/teaching-pack/day-1-slides.md`. Or just ask Claude Code:
   *"Make a slide deck from `curriculum/teaching-pack/day-1.md` using the Jungli
   template."*

2. **Write your slides.** Each `---` starts a new slide. Set a layout with
   `<!-- _class: demo -->` (see the types in `brand-guide.md`). Keep the front
   matter at the top:

   ```markdown
   ---
   marp: true
   theme: jungli
   paginate: true
   ---
   ```

3. **Preview / export.** In the Code tab, run:

   ```bash
   # HTML — open the file in any browser, present from there
   npx @marp-team/marp-cli path/to/deck.md --theme-set brand/theme/jungli.css -o deck.html

   # PDF (needs Chrome/Edge installed — usually already there)
   npx @marp-team/marp-cli path/to/deck.md --theme-set brand/theme/jungli.css --pdf -o deck.pdf
   ```

   The first run downloads Marp via `npx` — that's normal. Fonts load from
   Google Fonts, so keep internet on for a correct preview.

> **Tip:** the [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
> extension gives a live side-by-side preview if you'd rather see slides update
> as you type. The CLI above is the no-extension path.

## Editing the look

All styling lives in `theme/jungli.css`. Change a colour there once and every
deck updates. Start from `brand-guide.md` for what each colour and slide type is
for.
