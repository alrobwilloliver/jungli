import type {
  ModelCompletion,
  ModelMessage,
  ModelTool,
} from "../lib/model/openrouter";

export interface TrialResult {
  ok: boolean;
  actualModel: string;
  identity: string;
  failure?: string;
  requestCount?: number;
}

export interface CompatibilityReport {
  timestamp: string;
  requestedModel: string;
  actualModel: string;
  requestCount: number;
  successes: number;
  passed: boolean;
  trials: TrialResult[];
}

type ModelCaller = (input: {
  model: string;
  messages: ModelMessage[];
  tools: ModelTool[];
}) => Promise<ModelCompletion>;

const expectedPath = "projects/newsletter-growth.md";

const failure = (
  trial: number,
  actualModel: string,
  code: string,
  requestCount: number,
): TrialResult => ({
  ok: false,
  actualModel,
  identity: `trial-${trial}:${actualModel || "unknown"}`,
  failure: code,
  requestCount,
});

export async function runCompatibilityTrial(
  requestedModel: string,
  trial: number,
  complete: ModelCaller,
): Promise<TrialResult> {
  const definitionsPath = "../lib/agent/tool-schemas.ts";
  const { NOTE_TOOL_DEFINITIONS } = (await import(definitionsPath)) as {
    NOTE_TOOL_DEFINITIONS: ModelTool[];
  };
  const messages: ModelMessage[] = [
    {
      role: "user",
      content: "How much did Sam grow newsletter subscriptions?",
    },
  ];
  let actualModel = "";

  const first = await complete({
    model: requestedModel,
    messages,
    tools: NOTE_TOOL_DEFINITIONS,
  });
  actualModel = first.model;
  const search = first.message.tool_calls?.[0];
  if (
    first.message.tool_calls?.length !== 1 ||
    search?.function.name !== "search_notes"
  ) {
    return failure(trial, actualModel, "missing_search", 1);
  }
  let searchArguments: unknown;
  try {
    searchArguments = JSON.parse(search.function.arguments);
  } catch {
    return failure(trial, actualModel, "invalid_search_arguments", 1);
  }
  if (
    typeof searchArguments !== "object" ||
    searchArguments === null ||
    !("query" in searchArguments) ||
    typeof searchArguments.query !== "string" ||
    !/newsletter/i.test(searchArguments.query)
  ) {
    return failure(trial, actualModel, "invalid_search_arguments", 1);
  }
  messages.push(first.message, {
    role: "tool",
    tool_call_id: search.id,
    name: "search_notes",
    content: JSON.stringify({
      results: [{ path: expectedPath, snippet: "Subscriptions grew 35%." }],
    }),
  });

  const second = await complete({
    model: actualModel,
    messages,
    tools: NOTE_TOOL_DEFINITIONS,
  });
  if (second.model !== actualModel) {
    return failure(trial, second.model, "model_identity_changed", 2);
  }
  const read = second.message.tool_calls?.[0];
  if (
    second.message.tool_calls?.length !== 1 ||
    read?.function.name !== "read_note"
  ) {
    return failure(trial, actualModel, "missing_read", 2);
  }
  let readArguments: unknown;
  try {
    readArguments = JSON.parse(read.function.arguments);
  } catch {
    return failure(trial, actualModel, "invalid_read_arguments", 2);
  }
  if (
    typeof readArguments !== "object" ||
    readArguments === null ||
    !("path" in readArguments) ||
    readArguments.path !== expectedPath
  ) {
    return failure(trial, actualModel, "unexpected_read_path", 2);
  }
  messages.push(second.message, {
    role: "tool",
    tool_call_id: read.id,
    name: "read_note",
    content: JSON.stringify({
      note: { path: expectedPath, body: "Subscriptions grew 35%." },
    }),
  });

  const third = await complete({
    model: actualModel,
    messages,
    tools: NOTE_TOOL_DEFINITIONS,
  });
  if (third.model !== actualModel) {
    return failure(trial, third.model, "model_identity_changed", 3);
  }
  const answer = third.message.content?.trim() ?? "";
  const citations = [...answer.matchAll(/\[([^\]]+\.md)\]/g)].map(
    (match) => match[1],
  );
  if (citations.some((path) => path !== expectedPath)) {
    return failure(trial, actualModel, "invented_citation", 3);
  }
  if (!citations.includes(expectedPath)) {
    return failure(trial, actualModel, "missing_citation", 3);
  }
  return {
    ok: true,
    actualModel,
    identity: `trial-${trial}:${actualModel}`,
    requestCount: 3,
  };
}

export async function runCompatibilityCheck(
  requestedModel: string,
  call: (input: { model: string; trial: number }) => Promise<TrialResult>,
): Promise<CompatibilityReport> {
  const trials: TrialResult[] = [];
  for (let trial = 1; trial <= 5; trial += 1) {
    try {
      trials.push(await call({ model: requestedModel, trial }));
    } catch (error) {
      trials.push({
        ok: false,
        actualModel: "",
        identity: `trial-${trial}:unknown`,
        failure: error instanceof Error ? error.message : "unknown_failure",
        requestCount: 1,
      });
    }
  }
  const successes = trials.filter(({ ok }) => ok).length;
  return {
    timestamp: new Date().toISOString(),
    requestedModel,
    actualModel:
      trials.find(({ actualModel }) => actualModel)?.actualModel ?? "",
    requestCount: trials.reduce(
      (total, trial) => total + (trial.requestCount ?? 1),
      0,
    ),
    successes,
    passed: successes >= 4,
    trials,
  };
}

async function main() {
  const live = process.argv.includes("--live");
  const model =
    process.argv
      .find((argument) => argument.startsWith("--model="))
      ?.slice(8) ??
    process.env.OPENROUTER_MODEL ??
    "openrouter/free";

  if (!live) {
    console.log(
      "Dry run only: no HTTP request was made. Add --live after configuring an API key to run five search/read/citation trials.",
    );
    return;
  }

  const adapterPath = "../lib/model/openrouter.ts";
  const { createChatCompletion } = await import(adapterPath);
  const report = await runCompatibilityCheck(model, ({ model, trial }) =>
    runCompatibilityTrial(model, trial, createChatCompletion),
  );
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
