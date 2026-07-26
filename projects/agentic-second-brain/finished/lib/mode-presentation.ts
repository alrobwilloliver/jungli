import type { ChatResponse } from "./contracts";

export interface ModePresentation {
  mode: "neutral" | ChatResponse["mode"];
  badge: string;
  description: string;
  flow: [string, string, string];
  loading: string;
}

const neutralPresentation: ModePresentation = {
  mode: "neutral",
  badge: "Second brain",
  description:
    "Ask a question, then use the activity panel to see how Sam's notes supported the answer.",
  flow: ["Question", "Sam's notes", "Answer"],
  loading: "Looking through Sam's notes and waiting for the model…",
};

const loadingPresentation: ModePresentation = {
  ...neutralPresentation,
  badge: "Working",
};

const baselinePresentation: ModePresentation = {
  mode: "baseline",
  badge: "Non-agentic baseline",
  description:
    "This answer sent all five notes to the model. The activity and context counters show the cost of that all-context flow.",
  flow: ["Question", "Every note", "One answer"],
  loading: neutralPresentation.loading,
};

const agenticPresentation: ModePresentation = {
  mode: "agentic",
  badge: "Agentic",
  description:
    "This answer let the model search Sam's vault and read selected notes before responding.",
  flow: ["Question", "Selected notes", "One answer"],
  loading: neutralPresentation.loading,
};

export function getModePresentation(
  mode?: ChatResponse["mode"],
  isLoading = false,
): ModePresentation {
  if (isLoading) return loadingPresentation;
  if (mode === "baseline") return baselinePresentation;
  if (mode === "agentic") return agenticPresentation;
  return neutralPresentation;
}
