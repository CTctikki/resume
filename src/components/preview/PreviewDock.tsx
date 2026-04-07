import { useRef, useState, type RefObject } from "react";
import PdfExport from "@/components/shared/PdfExport";
import { useResumeStore } from "@/store/useResumeStore";
import TemplateSheet from "@/components/shared/TemplateSheet";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";

interface PreviewDockProps {
  sidePanelCollapsed: boolean;
  editPanelCollapsed: boolean;
  previewPanelCollapsed: boolean;
  toggleSidePanel: () => void;
  toggleEditPanel: () => void;
  togglePreviewPanel: () => void;
  resumeContentRef: RefObject<HTMLDivElement>;
}

const PreviewDock = ({
  sidePanelCollapsed,
  editPanelCollapsed,
  previewPanelCollapsed,
  toggleSidePanel,
  toggleEditPanel,
  togglePreviewPanel,
}: PreviewDockProps) => {
  const { activeResume, updateGlobalSettings } = useResumeStore();
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);
  const exportTriggerRef = useRef<HTMLDivElement>(null);

  const openExportMenu = () => {
    exportTriggerRef.current?.querySelector<HTMLButtonElement>("button")?.click();
  };

  return (
    <>
      <div
        ref={exportTriggerRef}
        className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <PdfExport />
      </div>
      <WorkbenchActionRail
        sidePanelCollapsed={sidePanelCollapsed}
        editPanelCollapsed={editPanelCollapsed}
        previewPanelCollapsed={previewPanelCollapsed}
        onToggleSidePanel={toggleSidePanel}
        onToggleEditPanel={toggleEditPanel}
        onTogglePreviewPanel={togglePreviewPanel}
        onOpenTemplates={() => setTemplateSheetOpen(true)}
        onOpenExport={openExportMenu}
        onAutoFit={() =>
          updateGlobalSettings({
            autoOnePage: !activeResume?.globalSettings?.autoOnePage,
          })
        }
      />
      <TemplateSheet
        open={templateSheetOpen}
        onOpenChange={setTemplateSheetOpen}
        showTrigger={false}
      />
    </>
  );
};

export default PreviewDock;
