"use client";

import { useLocale, useTranslations } from "@/i18n/compat/client";
import TemplatesBrowser from "@/components/templates/TemplatesBrowser";
import {
  getTemplateBrowserCopy,
  templateMetadata,
  type TemplateBrowserLocale,
} from "@/config/templateMetadata";

export const runtime = "edge";

const TemplatesPage = () => {
  const t = useTranslations("dashboard.templates");
  const locale = useLocale();
  const browserLocale: TemplateBrowserLocale = locale === "zh" ? "zh" : "en";
  const browserCopy = getTemplateBrowserCopy(browserLocale);

  return (
    <TemplatesBrowser
      title={t("title")}
      subtitle={browserCopy.subtitle}
      browserCopy={browserCopy}
      browserMetadata={templateMetadata[browserLocale]}
      browserLocale={browserLocale}
    />
  );
};

export default TemplatesPage;
