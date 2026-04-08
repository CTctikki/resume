import { useEffect, useMemo, useState, type ComponentType } from "react";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeepSeekLogo from "@/components/ai/icon/IconDeepseek";
import IconDoubao from "@/components/ai/icon/IconDoubao";
import IconOpenAi from "@/components/ai/icon/IconOpenAi";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { AI_MODEL_CONFIGS } from "@/config/ai";
import {
  AI_PROVIDER_CATALOG,
  CUSTOM_PROVIDER_IDS,
  HOSTED_PROVIDER_IDS,
  getLocalizedProviderText,
  type AIProviderId,
  type UILocale
} from "@/lib/ai/providerCatalog";
import { getProviderPanelMode } from "@/lib/ai/providerSelection";
import { cn } from "@/lib/utils";

const providerIconMap: Partial<Record<AIProviderId, ComponentType<{ className?: string }>>> = {
  deepseek: DeepSeekLogo,
  doubao: IconDoubao,
  openai: IconOpenAi,
  gemini: Sparkles,
  hostedDoubaoSeed: IconDoubao,
  hostedDeepseekV32: DeepSeekLogo
};

const AISettingsPage = () => {
  const locale = useLocale() as UILocale;
  const t = useTranslations();
  const {
    doubaoApiKey,
    doubaoModelId,
    deepseekApiKey,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    geminiApiKey,
    geminiModelId,
    setDoubaoApiKey,
    setDoubaoModelId,
    setDeepseekApiKey,
    setOpenaiApiKey,
    setOpenaiModelId,
    setOpenaiApiEndpoint,
    setGeminiApiKey,
    setGeminiModelId,
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();
  const [currentModel, setCurrentModel] = useState<AIProviderId>(selectedModel);

  useEffect(() => {
    setCurrentModel(selectedModel);
  }, [selectedModel]);

  const providers = useMemo(
    () => [...HOSTED_PROVIDER_IDS, ...CUSTOM_PROVIDER_IDS].map((id) => AI_PROVIDER_CATALOG[id]),
    []
  );

  const currentProvider = AI_PROVIDER_CATALOG[currentModel];
  const currentMode = getProviderPanelMode(currentModel);

  const statusText = (providerId: AIProviderId) => {
    const config = AI_MODEL_CONFIGS[providerId];
    return config.validate({
      doubaoApiKey,
      doubaoModelId,
      deepseekApiKey,
      openaiApiKey,
      openaiModelId,
      openaiApiEndpoint,
      geminiApiKey,
      geminiModelId
    })
      ? t("common.configured")
      : t("common.notConfigured");
  };

  const handleApiKeyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini"
  ) => {
    const newApiKey = e.target.value;
    if (type === "doubao") {
      setDoubaoApiKey(newApiKey);
    } else if (type === "deepseek") {
      setDeepseekApiKey(newApiKey);
    } else if (type === "gemini") {
      setGeminiApiKey(newApiKey);
    } else {
      setOpenaiApiKey(newApiKey);
    }
  };

  const handleModelIdChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "openai" | "gemini"
  ) => {
    const newModelId = e.target.value;
    if (type === "doubao") {
      setDoubaoModelId(newModelId);
    } else if (type === "openai") {
      setOpenaiModelId(newModelId);
    } else {
      setGeminiModelId(newModelId);
    }
  };

  const CurrentIcon = providerIconMap[currentProvider.id] ?? Sparkles;
  const currentTitle = getLocalizedProviderText(currentProvider.title, locale);
  const currentDescription = getLocalizedProviderText(currentProvider.description, locale);
  const freeBadge = locale === "zh" ? "限时免费使用" : "Limited-time free";
  const managedTitle = locale === "zh" ? "平台代管，无需填写密钥" : "Managed by the workspace";
  const managedDescription =
    locale === "zh"
      ? "这个模型已经通过服务端密钥接入。你只需要勾选使用，不会在浏览器里看到我们的 API Key。"
      : "This model is already connected through a server-side key. Users can select it directly without seeing the API key.";

  return (
    <div className="mx-auto py-4 px-4">
      <div className="flex gap-8">
        <div className="w-80 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {locale === "zh" ? "限时免费模型" : "Hosted free models"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {locale === "zh"
                  ? "这些模型已接入，无需你自己填写 API Key。"
                  : "These models are pre-connected and do not require a personal API key."}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              {HOSTED_PROVIDER_IDS.map((providerId) => {
                const provider = AI_PROVIDER_CATALOG[providerId];
                const Icon = providerIconMap[provider.id] ?? Sparkles;
                const isChecked = selectedModel === provider.id;
                const isViewing = currentModel === provider.id;

                return (
                  <div
                    key={provider.id}
                    onClick={() => setCurrentModel(provider.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
                      "transition-all duration-200 cursor-pointer",
                      "hover:bg-primary/10 hover:border-primary/30",
                      isViewing ? "bg-primary/10 border-primary/40" : "border-transparent"
                    )}
                  >
                    <div className={cn("shrink-0", isViewing ? "text-primary" : "text-muted-foreground")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col items-start gap-1">
                      <span className={cn("font-medium text-sm", isViewing && "text-primary")}>
                        {getLocalizedProviderText(provider.title, locale)}
                      </span>
                      <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {freeBadge}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Select ${getLocalizedProviderText(provider.title, locale)}`}
                      onClick={() => {
                        setSelectedModel(provider.id);
                        setCurrentModel(provider.id);
                      }}
                      className={cn(
                        "h-6 w-6 rounded-md flex items-center justify-center border transition-all shrink-0",
                        isChecked
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-transparent border-muted-foreground/40 text-transparent hover:border-primary/40"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {locale === "zh" ? "自定义渠道" : "Custom providers"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {locale === "zh"
                  ? "如果你有自己的 API Key，也可以继续用原来的接入方式。"
                  : "If you have your own API key, you can still use the original custom setup."}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              {CUSTOM_PROVIDER_IDS.map((providerId) => {
                const provider = AI_PROVIDER_CATALOG[providerId];
                const Icon = providerIconMap[provider.id] ?? Sparkles;
                const isChecked = selectedModel === provider.id;
                const isViewing = currentModel === provider.id;

                return (
                  <div
                    key={provider.id}
                    onClick={() => setCurrentModel(provider.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
                      "transition-all duration-200 cursor-pointer",
                      "hover:bg-primary/10 hover:border-primary/30",
                      isViewing ? "bg-primary/10 border-primary/40" : "border-transparent"
                    )}
                  >
                    <div className={cn("shrink-0", isViewing ? "text-primary" : "text-muted-foreground")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                      <span className={cn("font-medium text-sm", isViewing && "text-primary")}>
                        {getLocalizedProviderText(provider.title, locale)}
                      </span>
                      <span className="text-xs text-muted-foreground truncate w-full">
                        {statusText(provider.id)}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Select ${getLocalizedProviderText(provider.title, locale)}`}
                      onClick={() => {
                        setSelectedModel(provider.id);
                        setCurrentModel(provider.id);
                      }}
                      className={cn(
                        "h-6 w-6 rounded-md flex items-center justify-center border transition-all shrink-0",
                        isChecked
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-transparent border-muted-foreground/40 text-transparent hover:border-primary/40"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <div className={cn("shrink-0", currentProvider.limitedTimeFree ? "text-primary" : "text-muted-foreground")}>
                  <CurrentIcon className="h-6 w-6" />
                </div>
                {currentTitle}
              </h2>
              <p className="mt-2 text-muted-foreground">{currentDescription}</p>
              {currentProvider.limitedTimeFree ? (
                <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-sm font-medium text-primary">{freeBadge}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{managedDescription}</p>
                </div>
              ) : null}
            </div>

            {currentMode === "managed" ? (
              <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3">
                <p className="text-base font-medium text-foreground">{managedTitle}</p>
                <p className="text-sm leading-6 text-muted-foreground">{managedDescription}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      {t(`dashboard.settings.ai.${currentProvider.id}.apiKey`)}
                    </Label>
                    {currentProvider.docsUrl ? (
                      <a
                        href={currentProvider.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {t("dashboard.settings.ai.getApiKey")}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                  <Input
                    value={
                      currentProvider.id === "doubao"
                        ? doubaoApiKey
                        : currentProvider.id === "openai"
                          ? openaiApiKey
                          : currentProvider.id === "gemini"
                            ? geminiApiKey
                            : deepseekApiKey
                    }
                    onChange={(e) =>
                      handleApiKeyChange(
                        e,
                        currentProvider.id as "doubao" | "deepseek" | "openai" | "gemini"
                      )
                    }
                    type="password"
                    placeholder={t(`dashboard.settings.ai.${currentProvider.id}.apiKey`)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-900",
                      "border-gray-200 dark:border-gray-800",
                      "focus:ring-2 focus:ring-primary/20"
                    )}
                  />
                </div>

                {currentProvider.id === "doubao" ? (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      {t("dashboard.settings.ai.doubao.modelId")}
                    </Label>
                    <Input
                      value={doubaoModelId}
                      onChange={(e) => handleModelIdChange(e, "doubao")}
                      placeholder={t("dashboard.settings.ai.doubao.modelId")}
                      className={cn(
                        "h-11",
                        "bg-white dark:bg-gray-900",
                        "border-gray-200 dark:border-gray-800",
                        "focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                  </div>
                ) : null}

                {currentProvider.id === "openai" ? (
                  <>
                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        {t("dashboard.settings.ai.openai.modelId")}
                      </Label>
                      <Input
                        value={openaiModelId}
                        onChange={(e) => handleModelIdChange(e, "openai")}
                        placeholder={t("dashboard.settings.ai.openai.modelId")}
                        className={cn(
                          "h-11",
                          "bg-white dark:bg-gray-900",
                          "border-gray-200 dark:border-gray-800",
                          "focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        {t("dashboard.settings.ai.openai.apiEndpoint")}
                      </Label>
                      <Input
                        value={openaiApiEndpoint}
                        onChange={(e) => setOpenaiApiEndpoint(e.target.value)}
                        placeholder={t("dashboard.settings.ai.openai.apiEndpoint")}
                        className={cn(
                          "h-11",
                          "bg-white dark:bg-gray-900",
                          "border-gray-200 dark:border-gray-800",
                          "focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                    </div>
                  </>
                ) : null}

                {currentProvider.id === "gemini" ? (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      {t("dashboard.settings.ai.gemini.modelId")}
                    </Label>
                    <Input
                      value={geminiModelId}
                      onChange={(e) => handleModelIdChange(e, "gemini")}
                      placeholder={t("dashboard.settings.ai.gemini.modelId")}
                      className={cn(
                        "h-11",
                        "bg-white dark:bg-gray-900",
                        "border-gray-200 dark:border-gray-800",
                        "focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const runtime = "edge";

export default AISettingsPage;
