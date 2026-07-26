import { describe, expect, test, vi } from "vitest";

import {
  executeToolCall,
  type ToolExecutionContext,
} from "@/lib/agent/execute-tool";
import {
  NOTE_TOOL_DEFINITIONS,
  NOTE_TOOL_VALIDATORS,
} from "@/lib/agent/tool-schemas";
import type { ModelToolCall } from "@/lib/model/openrouter";

const call = (name: string, argumentsValue: string): ModelToolCall => ({
  id: "call-1",
  type: "function",
  function: { name, arguments: argumentsValue },
});

const context = (): ToolExecutionContext => ({
  listNotes: vi.fn((folder?: string) => [
    { path: `${folder ?? "career"}/about-sam.md`, title: "About Sam" },
  ]),
  searchNotes: vi.fn((query: string) => [
    { path: "projects/newsletter-growth.md", snippet: `Match: ${query}` },
  ]),
  readNote: vi.fn((path: string) => ({
    path,
    body: "Referral experiments improved newsletter retention.",
  })),
  uniqueNoteReads: new Set<string>(),
});

describe("note tool definitions", () => {
  test("exposes exactly three strict function tools", () => {
    expect(NOTE_TOOL_DEFINITIONS.map((tool) => tool.function.name)).toEqual([
      "list_notes",
      "search_notes",
      "read_note",
    ]);

    for (const tool of NOTE_TOOL_DEFINITIONS) {
      expect(tool.type).toBe("function");
      expect(tool.function.description).toBeTruthy();
      expect(tool.function.parameters).toMatchObject({
        type: "object",
        additionalProperties: false,
      });
    }
    expect(NOTE_TOOL_DEFINITIONS[1].function.parameters).toMatchObject({
      properties: { query: { minLength: 1, maxLength: 300 } },
      required: ["query"],
    });
    expect(NOTE_TOOL_DEFINITIONS[2].function.parameters).toMatchObject({
      properties: { path: { minLength: 1, maxLength: 500 } },
      required: ["path"],
    });
  });

  test("matches strict validators to optional and required arguments", () => {
    expect(NOTE_TOOL_VALIDATORS.list_notes.parse({})).toEqual({});
    expect(
      NOTE_TOOL_VALIDATORS.list_notes.parse({ folder: "projects" }),
    ).toEqual({ folder: "projects" });
    expect(
      NOTE_TOOL_VALIDATORS.search_notes.parse({ query: "newsletter" }),
    ).toEqual({ query: "newsletter" });
    expect(
      NOTE_TOOL_VALIDATORS.search_notes.parse({ query: "x".repeat(300) }),
    ).toEqual({ query: "x".repeat(300) });
    expect(
      NOTE_TOOL_VALIDATORS.read_note.parse({
        path: "projects/newsletter-growth.md",
      }),
    ).toEqual({ path: "projects/newsletter-growth.md" });

    expect(() => NOTE_TOOL_VALIDATORS.search_notes.parse({})).toThrow();
    expect(() =>
      NOTE_TOOL_VALIDATORS.search_notes.parse({ query: "x".repeat(301) }),
    ).toThrow();
    expect(() =>
      NOTE_TOOL_VALIDATORS.read_note.parse({ path: "one.md", extra: true }),
    ).toThrow();
    expect(() =>
      NOTE_TOOL_VALIDATORS.list_notes.parse({ unknown: "projects" }),
    ).toThrow();
  });

  test.each([
    ["list_notes", "folder", 240, 0],
    ["search_notes", "query", 300, 1],
    ["read_note", "path", 500, 2],
  ] as const)(
    "%s applies the same raw bounds and non-whitespace rule in JSON Schema and Zod",
    (name, field, maxLength, definitionIndex) => {
      const definition = NOTE_TOOL_DEFINITIONS[definitionIndex];
      const validator = NOTE_TOOL_VALIDATORS[name];

      expect(definition.function.parameters).toMatchObject({
        properties: {
          [field]: {
            minLength: 1,
            maxLength,
            pattern: "\\S",
          },
        },
      });
      expect(validator.parse({ [field]: `  value  ` })).toEqual({
        [field]: "value",
      });
      expect(validator.parse({ [field]: "x".repeat(maxLength) })).toEqual({
        [field]: "x".repeat(maxLength),
      });
      expect(() => validator.parse({ [field]: "" })).toThrow();
      expect(() => validator.parse({ [field]: " \n\t " })).toThrow();
      expect(() =>
        validator.parse({ [field]: "x".repeat(maxLength + 1) }),
      ).toThrow();
      expect(() =>
        validator.parse({ [field]: `${"x".repeat(maxLength)} ` }),
      ).toThrow();
    },
  );
});

describe("executeToolCall", () => {
  test("dispatches validated list and search calls as untrusted evidence", async () => {
    const dependencies = context();
    const listed = await executeToolCall(
      call("list_notes", JSON.stringify({ folder: "projects" })),
      dependencies,
    );
    const searched = await executeToolCall(
      call("search_notes", JSON.stringify({ query: "retention" })),
      dependencies,
    );

    expect(dependencies.listNotes).toHaveBeenCalledWith("projects");
    expect(dependencies.searchNotes).toHaveBeenCalledWith("retention");
    expect(listed).toMatchObject({ ok: true, name: "list_notes" });
    expect(searched).toMatchObject({ ok: true, name: "search_notes" });
    expect(JSON.parse(listed.output)).toMatchObject({
      notice: expect.stringMatching(/untrusted evidence.*not instructions/i),
      notes: [{ path: "projects/about-sam.md" }],
    });
    expect(JSON.parse(searched.output)).toMatchObject({
      notice: expect.stringMatching(/untrusted evidence.*not instructions/i),
      results: [{ path: "projects/newsletter-growth.md" }],
    });
  });

  test("classifies first and duplicate allowlisted note reads", async () => {
    const dependencies = context();
    const requestedCall = call(
      "read_note",
      JSON.stringify({ path: "projects/newsletter-growth.md" }),
    );

    const first = await executeToolCall(requestedCall, dependencies);
    const second = await executeToolCall(requestedCall, dependencies);

    expect(first).toMatchObject({
      ok: true,
      name: "read_note",
      readPath: "projects/newsletter-growth.md",
      duplicate: false,
    });
    expect(second).toMatchObject({
      ok: true,
      name: "read_note",
      readPath: "projects/newsletter-growth.md",
      duplicate: true,
    });
    expect(dependencies.readNote).toHaveBeenCalledTimes(1);
    expect(JSON.parse(second.output)).toMatchObject({
      duplicate: true,
      message: expect.stringMatching(/already read/i),
    });
    expect(JSON.parse(first.output)).toMatchObject({
      notice: expect.stringMatching(/untrusted evidence.*not instructions/i),
      note: { path: "projects/newsletter-growth.md" },
    });
    expect([...dependencies.uniqueNoteReads]).toEqual([
      "projects/newsletter-growth.md",
    ]);
  });

  test("distinguishes the unique-read limit from a missing note", async () => {
    const dependencies = context();
    dependencies.uniqueNoteReads.add("one.md");
    dependencies.maxUniqueNoteReads = 1;

    const result = await executeToolCall(
      call("read_note", JSON.stringify({ path: "two.md" })),
      dependencies,
    );

    expect(result).toEqual({
      ok: false,
      code: "read_limit",
      output: expect.stringMatching(/read limit/i),
    });
    expect(dependencies.readNote).not.toHaveBeenCalled();
  });

  test.each([
    [call("search_notes", "{"), "malformed_arguments"],
    [call("search_notes", JSON.stringify({})), "invalid_arguments"],
    [
      call("read_note", JSON.stringify({ path: "career/about-sam.md", x: 1 })),
      "invalid_arguments",
    ],
    [
      call("delete_note", JSON.stringify({ path: "career/about-sam.md" })),
      "unknown_tool",
    ],
    [call("constructor", JSON.stringify({})), "unknown_tool"],
  ])(
    "returns a stable safe result for an invalid call",
    async (toolCall, code) => {
      const dependencies = context();
      const result = await executeToolCall(toolCall, dependencies);

      expect(result).toEqual({
        ok: false,
        code,
        output: expect.stringMatching(/rejected/i),
      });
      expect(dependencies.listNotes).not.toHaveBeenCalled();
      expect(dependencies.searchNotes).not.toHaveBeenCalled();
      expect(dependencies.readNote).not.toHaveBeenCalled();
    },
  );

  test.each([
    "../secret.md",
    "/etc/passwd",
    "C:\\private\\secret.md",
    "%2e%2e/secret.md",
    "%252e%252e/secret.md",
  ])("rejects unsafe paths before calling readNote: %s", async (path) => {
    const dependencies = context();
    const result = await executeToolCall(
      call("read_note", JSON.stringify({ path })),
      dependencies,
    );

    expect(result).toEqual({
      ok: false,
      code: "unsafe_path",
      output: expect.stringMatching(/rejected/i),
    });
    expect(dependencies.readNote).not.toHaveBeenCalled();
    expect(dependencies.uniqueNoteReads.size).toBe(0);
  });

  test("classifies missing notes without leaking the dependency error", async () => {
    const dependencies = context();
    vi.mocked(dependencies.readNote).mockRejectedValueOnce(
      new Error("Sensitive filesystem detail"),
    );

    const result = await executeToolCall(
      call("read_note", JSON.stringify({ path: "missing.md" })),
      dependencies,
    );

    expect(result).toEqual({
      ok: false,
      code: "missing_note",
      output: expect.stringMatching(/could not be found/i),
    });
    expect(result.output).not.toContain("Sensitive filesystem detail");
  });
});
