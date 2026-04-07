import React, { useState } from "react";
import { useTranslations } from "@/i18n/compat/client";
import {
  Download,
  Loader2,
  FileJson,
  Printer,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { exportToPdf } from "@/utils/export";
import { exportResumeToBrowserPrint } from "@/utils/print";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface PdfExportProps {
  align?: "start" | "center" | "end";
  className?: string;
  triggerLabel?: string;
  triggerVariant?: "button" | "icon";
}

const PdfExport = ({
  align = "end",
  className,
  triggerLabel,
  triggerVariant = "button"
}: PdfExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingJson, setIsExportingJson] = useState(false);
  const { activeResume } = useResumeStore();
  const { globalSettings = {}, title } = activeResume || {};
  const t = useTranslations("pdfExport");

  const handleExport = async () => {
    await exportToPdf({
      elementId: "resume-preview",
      title: title || "resume",
      pagePadding: globalSettings?.pagePadding || 0,
      fontFamily: globalSettings?.fontFamily,
      onStart: () => setIsExporting(true),
      onEnd: () => setIsExporting(false),
      successMessage: t("toast.success"),
      errorMessage: t("toast.error")
    });
  };

  const handleJsonExport = () => {
    try {
      setIsExportingJson(true);
      if (!activeResume) {
        throw new Error("No active resume");
      }

      const jsonStr = JSON.stringify(activeResume, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.json`;
      link.click();

      window.URL.revokeObjectURL(url);
      toast.success(t("toast.jsonSuccess"));
    } catch (error) {
      console.error("JSON export error:", error);
      toast.error(t("toast.jsonError"));
    } finally {
      setIsExportingJson(false);
    }
  };

  const handlePrint = async () => {
    const resumeContent = document.getElementById("resume-preview");
    if (!resumeContent) {
      console.error("Resume content not found");
      return;
    }

    const pagePadding = globalSettings?.pagePadding || 0;
    await exportResumeToBrowserPrint(
      resumeContent,
      pagePadding,
      globalSettings?.fontFamily
    );
  };

  const isLoading = isExporting || isExportingJson;
  const loadingText = isExporting
    ? t("button.exporting")
    : isExportingJson
      ? t("button.exportingJson")
      : "";
  const resolvedTriggerLabel = triggerLabel || t("button.export");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerVariant === "icon" ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={resolvedTriggerLabel}
            className={cn(className)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingText}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{resolvedTriggerLabel}</span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={handleExport} disabled={isLoading}>
          <Download className="w-4 h-4 mr-2" />
          {t("button.exportPdf")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrint} disabled={isLoading}>
          <Printer className="w-4 h-4 mr-2" />
          {t("button.print")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleJsonExport} disabled={isLoading}>
          <FileJson className="w-4 h-4 mr-2" />
          {t("button.exportJson")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PdfExport;
