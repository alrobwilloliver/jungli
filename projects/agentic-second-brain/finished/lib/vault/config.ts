import path from "node:path";

import type { ProviderConstraints } from "@/lib/model/openrouter";

export interface VaultConfig {
  directory: "vault" | "vault-personal";
  personal: boolean;
  provider?: ProviderConstraints;
}

const unsafe = (): never => {
  throw new Error("unsafe_personal_vault_configuration");
};

const isRouterModel = (model: string) =>
  !model || model.startsWith("openrouter/");

export function resolveVaultConfig(
  env: Record<string, string | undefined> = process.env,
): VaultConfig {
  const directory = env.VAULT_DIRECTORY?.trim() || "vault";
  if (
    path.isAbsolute(directory) ||
    path.win32.isAbsolute(directory) ||
    directory.replaceAll("\\", "/").split("/").includes("..") ||
    (directory !== "vault" && directory !== "vault-personal")
  ) {
    return unsafe();
  }
  if (directory === "vault") return { directory, personal: false };

  const model = env.OPENROUTER_MODEL?.trim() ?? "";
  const provider = env.OPENROUTER_PROVIDER?.trim() ?? "";
  const fallback = env.OPENROUTER_FALLBACK_MODEL?.trim() ?? "";
  if (
    env.NODE_ENV !== "development" ||
    env.VERCEL ||
    env.NEXT_PHASE ||
    isRouterModel(model) ||
    !provider ||
    fallback ||
    env.PERSONAL_VAULT_POLICY_ACCEPTED !== "true"
  ) {
    return unsafe();
  }
  return {
    directory,
    personal: true,
    provider: {
      only: [provider],
      allow_fallbacks: false,
      data_collection: "deny",
      zdr: true,
    },
  };
}
