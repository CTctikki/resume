import { AI_PROVIDER_CATALOG, type AIProviderId } from "@/lib/ai/providerCatalog";

export interface AIProviderSelectionContext {
  selectedModel: AIProviderId;
  doubaoApiKey: string;
  doubaoModelId: string;
  deepseekApiKey: string;
  deepseekModelId: string;
  openaiApiKey: string;
  openaiModelId: string;
  openaiApiEndpoint: string;
  geminiApiKey: string;
  geminiModelId: string;
}

export function getProviderPanelMode(providerId: AIProviderId) {
  return AI_PROVIDER_CATALOG[providerId].authMode === "server" ? "managed" : "custom";
}

export function getProviderRequestDefaults(providerId: AIProviderId) {
  const provider = AI_PROVIDER_CATALOG[providerId];

  return {
    modelType: provider.id,
    apiEndpoint: provider.defaultApiEndpoint,
    model: provider.requiresModelId ? undefined : provider.defaultModel,
    requiresClientApiKey: provider.requiresClientApiKey
  };
}

export function buildProviderRequestPayload(context: AIProviderSelectionContext) {
  const provider = AI_PROVIDER_CATALOG[context.selectedModel];

  const clientApiKey =
    context.selectedModel === "doubao"
      ? context.doubaoApiKey
      : context.selectedModel === "deepseek"
        ? context.deepseekApiKey
        : context.selectedModel === "openai"
          ? context.openaiApiKey
          : context.selectedModel === "gemini"
            ? context.geminiApiKey
            : undefined;

  const clientModelId =
    context.selectedModel === "doubao"
      ? context.doubaoModelId
      : context.selectedModel === "deepseek"
        ? context.deepseekModelId
        : context.selectedModel === "openai"
          ? context.openaiModelId
          : context.selectedModel === "gemini"
            ? context.geminiModelId
            : undefined;

  return {
    modelType: provider.id,
    apiKey: provider.requiresClientApiKey ? clientApiKey : undefined,
    model: provider.requiresModelId ? clientModelId : provider.defaultModel,
    apiEndpoint: provider.requiresApiEndpoint
      ? context.openaiApiEndpoint
      : provider.defaultApiEndpoint
  };
}
