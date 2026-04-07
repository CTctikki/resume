"use client";

import { useTranslations } from "@/i18n/compat/client";
import { useResumeStore } from "@/store/useResumeStore";
import { ExportMethodCard } from "@/components/export/ExportMethodCard";
import { ExportPreviewCanvas } from "@/components/export/ExportPreviewCanvas";
import { createExportActions } from "@/components/export/useExportActions";

export const runtime = "edge";

export default function ExportPage() {
  const t = useTranslations("dashboard.export");
  const activeResume = useResumeStore((state) => state.activeResume);
  const hasResume = Boolean(activeResume);
  const { exportPdf, exportPrint, exportJson } = createExportActions(activeResume);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">{t("title")}</h2>
      <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted-foreground">
        {t("description")}
      </p>

      {!hasResume ? (
        <div className="mt-6 rounded-[18px] border border-border bg-card px-5 py-4 text-sm leading-6 text-muted-foreground shadow-sm">
          <p className="font-medium text-foreground">{t("empty.title")}</p>
          <p className="mt-1">{t("empty.description")}</p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ExportMethodCard
          title={t("cards.pdf.title")}
          description={t("cards.pdf.description")}
          actionLabel={t("cards.pdf.action")}
          onClick={() =>
            void exportPdf({
              noResume: t("empty.title"),
              success: t("toast.pdfSuccess"),
              error: t("toast.pdfError"),
              unavailable: t("toast.pdfUnavailable")
            })
          }
          disabled={!hasResume}
        />
        <ExportMethodCard
          title={t("cards.print.title")}
          description={t("cards.print.description")}
          actionLabel={t("cards.print.action")}
          onClick={() =>
            void exportPrint({
              noResume: t("empty.title"),
              error: t("toast.pdfError")
            })
          }
          disabled={!hasResume}
        />
        <ExportMethodCard
          title={t("cards.json.title")}
          description={t("cards.json.description")}
          actionLabel={t("cards.json.action")}
          onClick={() =>
            void exportJson({
              noResume: t("empty.title"),
              success: t("toast.jsonSuccess"),
              error: t("toast.jsonError")
            })
          }
          disabled={!hasResume}
        />
      </div>

      <ExportPreviewCanvas />
    </div>
  );
}
