import { z } from "zod";

import type { ModelTool } from "@/lib/model/openrouter";

export type KnownToolName = "list_notes" | "search_notes" | "read_note";

const normalizedString = (maxLength: number) =>
  z
    .string()
    .min(1)
    .max(maxLength)
    .refine(
      (value) => /\S/.test(value),
      "Must contain a non-whitespace character.",
    )
    .transform((value) => value.trim());

const listNotesArguments = z
  .object({
    folder: normalizedString(240).optional(),
  })
  .strict();

const searchNotesArguments = z
  .object({
    query: normalizedString(300),
  })
  .strict();

const readNoteArguments = z
  .object({
    path: normalizedString(500),
  })
  .strict();

export const NOTE_TOOL_VALIDATORS: Record<KnownToolName, z.ZodType> = {
  list_notes: listNotesArguments,
  search_notes: searchNotesArguments,
  read_note: readNoteArguments,
};

export const NOTE_TOOL_DEFINITIONS: ModelTool[] = [
  {
    type: "function",
    function: {
      name: "list_notes",
      description: "List note metadata, optionally within one folder.",
      parameters: {
        type: "object",
        properties: {
          folder: {
            type: "string",
            minLength: 1,
            maxLength: 240,
            pattern: "\\S",
            description: "Exact vault folder to list.",
          },
        },
        required: [],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_notes",
      description: "Search note metadata and bounded snippets.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            minLength: 1,
            maxLength: 300,
            pattern: "\\S",
            description: "Words to search for in the vault.",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "read_note",
      description: "Read one note using an exact path returned by the vault.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            minLength: 1,
            maxLength: 500,
            pattern: "\\S",
            description: "Exact allowlisted path of the note to read.",
          },
        },
        required: ["path"],
        additionalProperties: false,
      },
    },
  },
];
