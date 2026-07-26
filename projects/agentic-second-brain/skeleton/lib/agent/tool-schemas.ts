import { z } from "zod";

import type { ModelTool } from "@/lib/model/openrouter";

export type KnownToolName = "list_notes" | "search_notes" | "read_note";

const listNotesArguments = z
  .object({
    folder: z.string().min(1).max(240).optional(),
  })
  .strict();

const searchNotesArguments = z
  .object({
    query: z.string().trim().min(1).max(300),
  })
  .strict();

const readNoteArguments = z
  .object({
    path: z.string().min(1).max(500),
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
            description: "Exact allowlisted path of the note to read.",
          },
        },
        required: ["path"],
        additionalProperties: false,
      },
    },
  },
];
