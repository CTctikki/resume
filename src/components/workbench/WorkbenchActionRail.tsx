import {
  Download,
  Eye,
  FileText,
  LayoutTemplate,
  PanelLeft,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkbenchActionRailProps {
  sidePanelCollapsed: boolean;
  editPanelCollapsed: boolean;
  previewPanelCollapsed: boolean;
  onToggleSidePanel: () => void;
  onToggleEditPanel: () => void;
  onTogglePreviewPanel: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onAutoFit: () => void;
}

export function WorkbenchActionRail({
  sidePanelCollapsed,
  editPanelCollapsed,
  previewPanelCollapsed,
  onToggleSidePanel,
  onToggleEditPanel,
  onTogglePreviewPanel,
  onOpenTemplates,
  onOpenExport,
  onAutoFit
}: WorkbenchActionRailProps) {
  return (
    <aside className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:flex">
      <div className="flex flex-col gap-2 rounded-[16px] border border-border bg-card p-2 shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open templates"
          onClick={onOpenTemplates}
        >
          <LayoutTemplate className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open export"
          onClick={onOpenExport}
        >
          <Download className="h-4 w-4" />
        </Button>
        <div className="my-1 h-px w-full bg-border/80" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle sections"
          aria-pressed={!sidePanelCollapsed}
          onClick={onToggleSidePanel}
          className={cn(!sidePanelCollapsed && "bg-accent text-accent-foreground")}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle editor"
          aria-pressed={!editPanelCollapsed}
          onClick={onToggleEditPanel}
          className={cn(!editPanelCollapsed && "bg-accent text-accent-foreground")}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle preview"
          aria-pressed={!previewPanelCollapsed}
          onClick={onTogglePreviewPanel}
          className={cn(!previewPanelCollapsed && "bg-accent text-accent-foreground")}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Auto fit page"
          onClick={onAutoFit}
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
