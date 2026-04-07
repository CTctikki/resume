import { useState, type RefObject } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import PdfExport from "@/components/shared/PdfExport";
import TemplateSheet from "@/components/shared/TemplateSheet";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";
import { useWorkbenchShellLabels } from "@/components/workbench/useWorkbenchShellLabels";

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
  const labels = useWorkbenchShellLabels();
  const { activeResume, updateGlobalSettings } = useResumeStore();
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);

  return (
    <>
      <WorkbenchActionRail
        sidePanelCollapsed={sidePanelCollapsed}
        editPanelCollapsed={editPanelCollapsed}
        previewPanelCollapsed={previewPanelCollapsed}
        onToggleSidePanel={toggleSidePanel}
        onToggleEditPanel={toggleEditPanel}
        onTogglePreviewPanel={togglePreviewPanel}
        onOpenTemplates={() => setTemplateSheetOpen(true)}
        onOpenExport={undefined}
        exportSlot={
          <PdfExport
            triggerVariant="icon"
            triggerLabel={labels.openExport}
          />
        }
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
