"use client";

import { useTranslations } from "@/i18n/compat/client";

const sectionIds = ["backupSync", "aiProviders", "aboutVersion"] as const;

export function WorkspaceSettingsSidebar() {
  const t = useTranslations("dashboard.settings.workspace");

  return (
    <aside className="rounded-[18px] border border-border bg-card p-4 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{t("title")}</p>
          <p className="text-sm leading-6 text-muted-foreground">{t("intro")}</p>
        </div>

        <nav aria-label={t("sectionsLabel")} className="space-y-2">
          {sectionIds.map((sectionId) => (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              className="block rounded-[14px] border border-border/60 px-3 py-3 text-left transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-medium text-foreground">
                {t(`sections.${sectionId}.title`)}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {t(`sections.${sectionId}.description`)}
              </p>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
