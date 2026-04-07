"use client";

import { useTranslations } from "@/i18n/compat/client";
import { WorkspaceSettingsPanel } from "@/components/settings/WorkspaceSettingsPanel";

export const runtime = "edge";

export default function SettingsPage() {
  const t = useTranslations("dashboard.settings");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">{t("pageTitle")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("pageDescription")}</p>
      <div className="mt-8">
        <WorkspaceSettingsPanel />
      </div>
    </div>
  );
}
