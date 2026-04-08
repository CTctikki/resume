export const CUSTOM_PROVIDER_IDS = [
  "doubao",
  "deepseek",
  "openai",
  "gemini"
] as const;

export const HOSTED_PROVIDER_IDS = [
  "hostedDoubaoSeed",
  "hostedMinimaxM25",
  "hostedDeepseekV32",
  "hostedKimiK25",
  "hostedMimoV2Pro",
  "hostedGlm47"
] as const;

export type HostedAIProviderId = (typeof HOSTED_PROVIDER_IDS)[number];
export type CustomAIProviderId = (typeof CUSTOM_PROVIDER_IDS)[number];
export type AIProviderId = CustomAIProviderId | HostedAIProviderId;

export type AIProviderFamily = "doubao" | "deepseek" | "openai" | "gemini";
export type UILocale = "en" | "zh";

export interface LocalizedCopy {
  en: string;
  zh: string;
}

export interface AIProviderDefinition {
  id: AIProviderId;
  family: AIProviderFamily;
  title: LocalizedCopy;
  description: LocalizedCopy;
  docsUrl?: string;
  authMode: "client" | "server";
  limitedTimeFree: boolean;
  requiresClientApiKey: boolean;
  requiresModelId: boolean;
  requiresApiEndpoint: boolean;
  defaultModel?: string;
  defaultApiEndpoint?: string;
}

const hostedBaseUrl = "https://api.ai.org.kg/v1";

export const AI_PROVIDER_CATALOG: Record<AIProviderId, AIProviderDefinition> = {
  doubao: {
    id: "doubao",
    family: "doubao",
    title: { en: "Doubao", zh: "豆包" },
    description: {
      en: "Use your own Volcengine API key and model ID.",
      zh: "使用你自己的火山引擎 API Key 和模型 ID。"
    },
    docsUrl: "https://console.volcengine.com/ark",
    authMode: "client",
    limitedTimeFree: false,
    requiresClientApiKey: true,
    requiresModelId: true,
    requiresApiEndpoint: false
  },
  deepseek: {
    id: "deepseek",
    family: "deepseek",
    title: { en: "DeepSeek", zh: "DeepSeek" },
    description: {
      en: "Use your own DeepSeek API key.",
      zh: "使用你自己的 DeepSeek API Key。"
    },
    docsUrl: "https://platform.deepseek.com",
    authMode: "client",
    limitedTimeFree: false,
    requiresClientApiKey: true,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "deepseek-chat"
  },
  openai: {
    id: "openai",
    family: "openai",
    title: { en: "OpenAI Compatible", zh: "OpenAI 兼容渠道" },
    description: {
      en: "Use your own API key, model ID, and OpenAI-compatible endpoint.",
      zh: "使用你自己的 API Key、模型 ID 和 OpenAI 兼容端点。"
    },
    docsUrl: "https://platform.openai.com/api-keys",
    authMode: "client",
    limitedTimeFree: false,
    requiresClientApiKey: true,
    requiresModelId: true,
    requiresApiEndpoint: true
  },
  gemini: {
    id: "gemini",
    family: "gemini",
    title: { en: "Gemini", zh: "Gemini" },
    description: {
      en: "Use your own Gemini API key for polish, grammar check, and PDF import.",
      zh: "使用你自己的 Gemini API Key 进行润色、语法检查和 PDF 导入。"
    },
    docsUrl: "https://aistudio.google.com/app/apikey",
    authMode: "client",
    limitedTimeFree: false,
    requiresClientApiKey: true,
    requiresModelId: true,
    requiresApiEndpoint: false,
    defaultModel: "gemini-flash-latest"
  },
  hostedDoubaoSeed: {
    id: "hostedDoubaoSeed",
    family: "openai",
    title: { en: "Doubao Seed 2.0 Pro", zh: "豆包 Seed 2.0 Pro" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "doubao-seed-2.0-pro",
    defaultApiEndpoint: hostedBaseUrl
  },
  hostedMinimaxM25: {
    id: "hostedMinimaxM25",
    family: "openai",
    title: { en: "MiniMax M2.5", zh: "MiniMax M2.5" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "minimax-m2.5",
    defaultApiEndpoint: hostedBaseUrl
  },
  hostedDeepseekV32: {
    id: "hostedDeepseekV32",
    family: "openai",
    title: { en: "DeepSeek V3.2", zh: "DeepSeek V3.2" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "deepseek-v3.2",
    defaultApiEndpoint: hostedBaseUrl
  },
  hostedKimiK25: {
    id: "hostedKimiK25",
    family: "openai",
    title: { en: "Kimi K2.5", zh: "Kimi K2.5" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "kimi-k2.5",
    defaultApiEndpoint: hostedBaseUrl
  },
  hostedMimoV2Pro: {
    id: "hostedMimoV2Pro",
    family: "openai",
    title: { en: "Mimo V2 Pro", zh: "Mimo V2 Pro" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "mimo-v2-pro",
    defaultApiEndpoint: hostedBaseUrl
  },
  hostedGlm47: {
    id: "hostedGlm47",
    family: "openai",
    title: { en: "GLM 4.7", zh: "GLM 4.7" },
    description: {
      en: "Managed OpenAI-compatible access for quick trial use.",
      zh: "平台代管的 OpenAI 兼容接入，适合直接试用。"
    },
    authMode: "server",
    limitedTimeFree: true,
    requiresClientApiKey: false,
    requiresModelId: false,
    requiresApiEndpoint: false,
    defaultModel: "glm-4.7",
    defaultApiEndpoint: hostedBaseUrl
  }
};

export function getLocalizedProviderText(copy: LocalizedCopy, locale: UILocale) {
  return copy[locale];
}
