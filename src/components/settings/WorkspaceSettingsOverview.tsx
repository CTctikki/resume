"use client";

import { useTranslations } from "@/i18n/compat/client";

export function WorkspaceSettingsOverview() {
  const t = useTranslations("dashboard.settings.workspace");

  return (
    <div className="rounded-[18px] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-xl font-semibold text-foreground">{t("overviewTitle")}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("overviewDescription")}</p>
    </div>
  );
}
