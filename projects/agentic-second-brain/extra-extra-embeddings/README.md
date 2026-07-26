# Extra-extra: embeddings

This optional extension is explicitly outside the 60-minute core. Lexical
search misses synonyms; embeddings can retrieve semantically similar chunks.
The safe flow is chunk → embedding → candidate paths → normal `read_note`.

Keep source paths and chunk metadata, rebuild stale indexes after note changes,
and evaluate retrieval with known questions. Embeddings disclose note content
to whichever model/provider computes them, so apply the same privacy review.
No provider or database is required for the core class.

See [`PROMPTS.md`](PROMPTS.md) for a conceptual follow-up.
