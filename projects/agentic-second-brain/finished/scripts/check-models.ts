export interface TrialResult {
  ok: boolean;
  actualModel: string;
  identity: string;
  failure?: string;
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
        identity: `trial-${trial}`,
        failure: error instanceof Error ? error.message : "unknown_failure",
      });
    }
  }
  const successes = trials.filter(({ ok }) => ok).length;
  return {
    timestamp: new Date().toISOString(),
    requestedModel,
    actualModel:
      trials.find(({ actualModel }) => actualModel)?.actualModel ?? "",
    requestCount: trials.length,
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
      "Dry run only: no HTTP request was made. Add --live after configuring an API key to run five model trials.",
    );
    return;
  }

  const adapterPath = "../lib/model/openrouter.ts";
  const { createChatCompletion } = await import(adapterPath);
  const report = await runCompatibilityCheck(
    model,
    async ({ model, trial }) => {
      const completion = await createChatCompletion({
        model,
        messages: [
          {
            role: "user",
            content:
              "Reply with a short answer containing a source path in square brackets.",
          },
        ],
      });
      const content = completion.message.content ?? "";
      return {
        ok: /\[[^\]]+\.md\]/.test(content),
        actualModel: completion.model,
        identity: `trial-${trial}:${completion.model}`,
        ...(!/\[[^\]]+\.md\]/.test(content)
          ? { failure: "missing_citation" }
          : {}),
      };
    },
  );
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
