import { useState } from "react";
import { useTranslations } from "@/i18n/compat/client";
import {
  Download,
  Loader2,
  FileJson,
  Printer,
  ChevronDown
} from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createExportActions } from "@/components/export/useExportActions";

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
  const activeResume = useResumeStore((state) => state.activeResume);
  const t = useTranslations("pdfExport");
  const hasResume = Boolean(activeResume);
  const [activeAction, setActiveAction] = useState<"pdf" | "print" | "json" | null>(null);
  const { exportPdf, exportPrint, exportJson } = createExportActions(activeResume);
  const isLoading = activeAction !== null;
  const loadingText = activeAction === "pdf" || activeAction === "print"
    ? t("button.exporting")
    : activeAction === "json"
      ? t("button.exportingJson")
      : "";
  const resolvedTriggerLabel = triggerLabel || t("button.export");

  const handlePdfExport = async () => {
    setActiveAction("pdf");
    try {
      await exportPdf({
        noResume: t("toast.error"),
        success: t("toast.success"),
        error: t("toast.error")
      });
    } finally {
      setActiveAction(null);
    }
  };

  const handlePrintExport = async () => {
    setActiveAction("print");
    try {
      await exportPrint({
        noResume: t("toast.error"),
        error: t("toast.error")
      });
    } finally {
      setActiveAction(null);
    }
  };

  const handleJsonExport = async () => {
    setActiveAction("json");
    try {
      exportJson({
        noResume: t("toast.jsonError"),
        success: t("toast.jsonSuccess"),
        error: t("toast.jsonError")
      });
    } finally {
      setActiveAction(null);
    }
  };

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
            disabled={isLoading || !hasResume}
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
            disabled={isLoading || !hasResume}
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
        <DropdownMenuItem
          onClick={() => void handlePdfExport()}
          disabled={isLoading || !hasResume}
        >
          <Download className="w-4 h-4 mr-2" />
          {t("button.exportPdf")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void handlePrintExport()}
          disabled={isLoading || !hasResume}
        >
          <Printer className="w-4 h-4 mr-2" />
          {t("button.print")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void handleJsonExport()}
          disabled={isLoading || !hasResume}
        >
          <FileJson className="w-4 h-4 mr-2" />
          {t("button.exportJson")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PdfExport;
