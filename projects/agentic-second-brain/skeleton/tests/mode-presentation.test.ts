import { describe, expect, test } from "vitest";

import { getModePresentation } from "@/lib/mode-presentation";

describe("mode presentation", () => {
  test("keeps initial and loading copy neutral", () => {
    const initial = getModePresentation();
    const loading = getModePresentation(undefined, true);
    const loadingAfterAnswer = getModePresentation("agentic", true);

    expect(initial.mode).toBe("neutral");
    expect(loading.mode).toBe("neutral");
    expect(loadingAfterAnswer.mode).toBe("neutral");
    expect(initial.badge).toBe("Second brain");
    expect(loading.badge).toBe("Working");
    expect(loadingAfterAnswer.badge).toBe("Working");
    expect(initial.description).not.toMatch(/all five|every note|agentic/i);
    expect(loading.loading).not.toMatch(/all five|every note|agentic/i);
    expect(initial.flow).toEqual(["Question", "Sam's notes", "Answer"]);
  });

  test("explains the all-context flow after a baseline response", () => {
    const presentation = getModePresentation("baseline");

    expect(presentation.mode).toBe("baseline");
    expect(presentation.badge).toBe("Non-agentic baseline");
    expect(presentation.description).toMatch(/all five notes/i);
    expect(presentation.flow).toEqual(["Question", "Every note", "One answer"]);
  });

  test("explains selected evidence after an agentic response", () => {
    const presentation = getModePresentation("agentic");

    expect(presentation.mode).toBe("agentic");
    expect(presentation.badge).toBe("Agentic");
    expect(presentation.description).toMatch(/search.*selected notes/i);
    expect(presentation.description).not.toMatch(/all five|every note/i);
    expect(presentation.flow).toEqual([
      "Question",
      "Selected notes",
      "One answer",
    ]);
  });
});
