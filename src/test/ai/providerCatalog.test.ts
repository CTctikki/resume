import { describe, expect, it } from "vitest";
import {
  AI_PROVIDER_CATALOG,
  HOSTED_PROVIDER_IDS,
  type HostedAIProviderId
} from "@/lib/ai/providerCatalog";

describe("AI provider catalog", () => {
  it("includes six hosted OpenAI-compatible providers", () => {
    expect(HOSTED_PROVIDER_IDS).toHaveLength(6);

    const hostedProviders = HOSTED_PROVIDER_IDS.map((id) => AI_PROVIDER_CATALOG[id]);
    expect(hostedProviders.map((provider) => provider.id)).toEqual([
      "hostedDoubaoSeed",
      "hostedMinimaxM25",
      "hostedDeepseekV32",
      "hostedKimiK25",
      "hostedMimoV2Pro",
      "hostedGlm47"
    ] satisfies HostedAIProviderId[]);
  });

  it("marks hosted providers as managed, limited-time free, and OpenAI-compatible", () => {
    for (const id of HOSTED_PROVIDER_IDS) {
      const provider = AI_PROVIDER_CATALOG[id];
      expect(provider.family).toBe("openai");
      expect(provider.authMode).toBe("server");
      expect(provider.limitedTimeFree).toBe(true);
      expect(provider.requiresClientApiKey).toBe(false);
      expect(provider.requiresApiEndpoint).toBe(false);
      expect(provider.defaultModel).toBeTruthy();
    }
  });
});
