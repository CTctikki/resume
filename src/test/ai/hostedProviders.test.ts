import { afterEach, describe, expect, it } from "vitest";
import { resolveProviderApiKey } from "@/lib/server/hostedProviders";

describe("hosted provider secrets", () => {
  const original = process.env.AI_HOSTED_KIMI_K25_KEY;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.AI_HOSTED_KIMI_K25_KEY;
    } else {
      process.env.AI_HOSTED_KIMI_K25_KEY = original;
    }
  });

  it("uses the server-side key for hosted providers instead of a client key", () => {
    process.env.AI_HOSTED_KIMI_K25_KEY = "server-secret";

    expect(resolveProviderApiKey("hostedKimiK25", "client-secret")).toBe("server-secret");
  });

  it("keeps requiring a client key for custom providers", () => {
    expect(resolveProviderApiKey("openai", "client-secret")).toBe("client-secret");
  });
});
