import { describe, expect, test } from "vitest";

import { resolveVaultConfig } from "@/lib/vault/config";

describe("vault configuration", () => {
  test("uses Sam by default and fails closed for personal notes", () => {
    expect(resolveVaultConfig({ NODE_ENV: "development" })).toMatchObject({
      directory: "vault",
      personal: false,
    });
    expect(() =>
      resolveVaultConfig({
        NODE_ENV: "development",
        VAULT_DIRECTORY: "vault-personal",
      }),
    ).toThrow("unsafe_personal_vault_configuration");
    expect(
      resolveVaultConfig({
        NODE_ENV: "development",
        VAULT_DIRECTORY: "vault-personal",
        OPENROUTER_MODEL: "fixed/model",
        OPENROUTER_PROVIDER: "provider-slug",
        OPENROUTER_FALLBACK_MODEL: "",
        PERSONAL_VAULT_POLICY_ACCEPTED: "true",
      }),
    ).toMatchObject({
      directory: "vault-personal",
      personal: true,
      provider: {
        only: ["provider-slug"],
        allow_fallbacks: false,
        data_collection: "deny",
        zdr: true,
      },
    });
  });

  test.each(["/tmp/notes", "../notes", "vault/../notes", "C:\\notes"])(
    "rejects unsafe vault directory %s",
    (directory) => {
      expect(() =>
        resolveVaultConfig({
          NODE_ENV: "development",
          VAULT_DIRECTORY: directory,
        }),
      ).toThrow("unsafe_personal_vault_configuration");
    },
  );
});
