import type { ReactNode } from "react";
import { ArrowLeft, Download, LayoutTemplate, Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkbenchShellLabels } from "@/components/workbench/useWorkbenchShellLabels";

interface WorkbenchTopBarProps {
  title: string;
  onTitleBlur: (value: string) => void;
  onBack: () => void;
  onOpenTemplates: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onOpenExport?: () => void;
  exportSlot?: ReactNode;
}

export function WorkbenchTopBar({
  title,
  onTitleBlur,
  onBack,
  onOpenTemplates,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onOpenExport,
  exportSlot
}: WorkbenchTopBarProps) {
  const labels = useWorkbenchShellLabels();

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex min-h-[49px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={labels.backToDashboard}
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Input
            key={title || "resume-title"}
            defaultValue={title}
            aria-label={labels.resumeTitle}
            onBlur={(event) => onTitleBlur(event.target.value)}
            className="w-full max-w-[320px]"
          />
        </div>
        <div className="flex items-center gap-2">
          {onUndo ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.undo}
              onClick={onUndo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          ) : null}
          {onRedo ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.redo}
              onClick={onRedo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={onOpenTemplates}>
            <LayoutTemplate className="h-4 w-4" />
            {labels.templates}
          </Button>
          {exportSlot ?? (
            <Button type="button" onClick={onOpenExport}>
              <Download className="h-4 w-4" />
              {labels.export}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
