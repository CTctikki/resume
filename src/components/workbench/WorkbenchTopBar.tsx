import type { ReactNode } from "react";
import { ArrowLeft, Download, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WorkbenchTopBarProps {
  title: string;
  onTitleBlur: (value: string) => void;
  onBack: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  exportSlot?: ReactNode;
}

export function WorkbenchTopBar({
  title,
  onTitleBlur,
  onBack,
  onOpenTemplates,
  onOpenExport,
  exportSlot
}: WorkbenchTopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex min-h-[49px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Back to dashboard"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Input
            key={title || "resume-title"}
            defaultValue={title}
            aria-label="Resume title"
            onBlur={(event) => onTitleBlur(event.target.value)}
            className="w-full max-w-[320px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onOpenTemplates}>
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Button>
          {exportSlot ?? (
            <Button type="button" onClick={onOpenExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
