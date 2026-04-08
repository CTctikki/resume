import { describe, expect, it } from "vitest";
import {
  getProviderPanelMode,
  getProviderRequestDefaults
} from "@/lib/ai/providerSelection";

describe("AI provider selection helpers", () => {
  it("uses managed mode for hosted providers so the UI does not ask for API keys", () => {
    expect(getProviderPanelMode("hostedDoubaoSeed")).toBe("managed");
    expect(getProviderPanelMode("hostedKimiK25")).toBe("managed");
    expect(getProviderPanelMode("openai")).toBe("custom");
  });

  it("returns fixed OpenAI-compatible request defaults for hosted providers", () => {
    expect(getProviderRequestDefaults("hostedMinimaxM25")).toEqual({
      modelType: "hostedMinimaxM25",
      apiEndpoint: "https://api.ai.org.kg/v1",
      model: "minimax-m2.5",
      requiresClientApiKey: false
    });
  });
});
