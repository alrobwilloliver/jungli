# Optional — see your second brain in Obsidian

Your second brain is just a folder of markdown files. Claude Code writes and
reads them, and that's all it needs. But those same files open beautifully in
**[Obsidian](https://obsidian.md)** — a free notes app — which gives you a
friendly window onto your brain and a **graph view** that draws every note and
the links between them.

Nothing changes for Claude: **same files, two windows onto them.** That's the
whole point — your context is *just files*, nothing hidden.

> **Optional.** Skip it and your second brain still works perfectly. This is the
> "see it" bonus — and a great way to spend extra time once the core build is done.

## Why bother

- **See the shape of your knowledge** — the graph draws each note as a dot and
  every `[[wikilink]]` as a line between them.
- **Browse and edit** with a real UI — search, click links, live preview.
- **Reinforce the big idea** — Claude writes the notes, Obsidian shows them, and
  it's the *same folder*. Context isn't magic; it's files.

## Get Obsidian (Mac & Windows)

1. Go to **[obsidian.md](https://obsidian.md)** and click **Download**. It's free
   for personal use.
2. **Mac:** open the downloaded file and drag Obsidian into Applications.
   **Windows:** run the installer and follow the prompts.
3. Open Obsidian. *(If you can, install it before the weekend so Sunday isn't
   spent downloading.)*

## Open your vault

1. On the Obsidian welcome screen, choose **Open folder as vault**.
2. Pick your `vault/` folder — the one holding your notes and `index.md`.
3. Trust the folder when asked. Your notes appear in the left sidebar.

A "vault" is just a folder of markdown. Obsidian adds a hidden `.obsidian/`
folder for its own settings — that's normal, and this repo keeps it out of git.

## See the graph

- Click the **graph view** icon in the left ribbon (the connected-dots icon), or
  open the command palette (**Cmd/Ctrl-P**) and type "Graph view".
- Each note is a dot; each `[[wikilink]]` is a line. Hover a dot to highlight what
  it connects to.
- Add a note, and watch the graph grow.

## Make it a fuller session — grow your brain

Once you can *see* your second brain, make it richer. A natural order:

1. **Add more notes.** Ask Claude Code for two or three more atomic notes (an
   interest, a project, someone you admire) — or type them straight into Obsidian.
   Link them with `[[double brackets]]`.
2. **Refresh the map.** Ask Claude to update `index.md` so it lists and groups the
   new notes.
3. **Teach Claude your style.** Add a short `CLAUDE.md` of standing instructions so
   it always writes notes the way you like (one idea per file, always linked).
4. **Interrogate it.** Ask harder questions that span several notes — and notice it
   says *"that's not in the vault"* when it genuinely doesn't know. That honesty is
   the point of a grounded second brain.
5. **Watch the graph fill in** after each round.

## Nice combo — watch it build live

Keep Obsidian open on your vault while you prompt Claude Code. As Claude adds and
edits notes, Obsidian updates in real time — you literally watch your second brain
being built. Two windows, one folder.
