import {
  HOSTED_PROVIDER_IDS,
  type AIProviderId,
  type HostedAIProviderId
} from "@/lib/ai/providerCatalog";

const HOSTED_PROVIDER_ENV_KEYS: Record<HostedAIProviderId, string> = {
  hostedDoubaoSeed: "AI_HOSTED_DOUBAO_SEED_KEY",
  hostedMinimaxM25: "AI_HOSTED_MINIMAX_M25_KEY",
  hostedDeepseekV32: "AI_HOSTED_DEEPSEEK_V32_KEY",
  hostedKimiK25: "AI_HOSTED_KIMI_K25_KEY",
  hostedMimoV2Pro: "AI_HOSTED_MIMO_V2_PRO_KEY",
  hostedGlm47: "AI_HOSTED_GLM_47_KEY"
};

export function isHostedProvider(providerId: AIProviderId): providerId is HostedAIProviderId {
  return (HOSTED_PROVIDER_IDS as readonly string[]).includes(providerId);
}

export function resolveProviderApiKey(providerId: AIProviderId, requestApiKey?: string) {
  if (!isHostedProvider(providerId)) {
    if (!requestApiKey) {
      throw new Error("API key is required for this provider.");
    }

    return requestApiKey;
  }

  const envKey = HOSTED_PROVIDER_ENV_KEYS[providerId];
  const resolved = process.env[envKey];

  if (!resolved) {
    throw new Error(`Hosted provider "${providerId}" is not configured on the server.`);
  }

  return resolved;
}
