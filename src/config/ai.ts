import { AI_PROVIDER_CATALOG, type AIProviderId } from "@/lib/ai/providerCatalog";

export type AIModelType = AIProviderId;

export interface AIValidationContext {
  doubaoApiKey?: string;
  doubaoModelId?: string;
  deepseekApiKey?: string;
  deepseekModelId?: string;
  openaiApiKey?: string;
  openaiModelId?: string;
  openaiApiEndpoint?: string;
  geminiApiKey?: string;
  geminiModelId?: string;
}

export interface AIModelConfig {
  family: "doubao" | "deepseek" | "openai" | "gemini";
  authMode: "client" | "server";
  url: (endpoint?: string) => string;
  requiresModelId: boolean;
  defaultModel?: string;
  headers: (apiKey: string) => Record<string, string>;
  validate: (context: AIValidationContext) => boolean;
}

const openAICompatibleHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const AI_MODEL_CONFIGS: Record<AIModelType, AIModelConfig> = {
  doubao: {
    family: "doubao",
    authMode: "client",
    url: () => "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    requiresModelId: true,
    headers: openAICompatibleHeaders,
    validate: (context: AIValidationContext) => !!(context.doubaoApiKey && context.doubaoModelId),
  },
  deepseek: {
    family: "deepseek",
    authMode: "client",
    url: () => "https://api.deepseek.com/v1/chat/completions",
    requiresModelId: false,
    defaultModel: "deepseek-chat",
    headers: openAICompatibleHeaders,
    validate: (context: AIValidationContext) => !!context.deepseekApiKey,
  },
  openai: {
    family: "openai",
    authMode: "client",
    url: (endpoint?: string) => `${endpoint}/chat/completions`,
    requiresModelId: true,
    headers: openAICompatibleHeaders,
    validate: (context: AIValidationContext) => !!(context.openaiApiKey && context.openaiModelId && context.openaiApiEndpoint),
  },
  gemini: {
    family: "gemini",
    authMode: "client",
    url: () => "https://generativelanguage.googleapis.com/v1beta",
    requiresModelId: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    }),
    validate: (context: AIValidationContext) => !!(context.geminiApiKey && context.geminiModelId),
  },
  hostedDoubaoSeed: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedDoubaoSeed.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedDoubaoSeed.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  },
  hostedMinimaxM25: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedMinimaxM25.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedMinimaxM25.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  },
  hostedDeepseekV32: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedDeepseekV32.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedDeepseekV32.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  },
  hostedKimiK25: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedKimiK25.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedKimiK25.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  },
  hostedMimoV2Pro: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedMimoV2Pro.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedMimoV2Pro.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  },
  hostedGlm47: {
    family: "openai",
    authMode: "server",
    url: () => `${AI_PROVIDER_CATALOG.hostedGlm47.defaultApiEndpoint}/chat/completions`,
    requiresModelId: false,
    defaultModel: AI_PROVIDER_CATALOG.hostedGlm47.defaultModel,
    headers: openAICompatibleHeaders,
    validate: () => true,
  }
};
