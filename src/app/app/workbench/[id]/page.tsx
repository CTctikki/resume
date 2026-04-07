import { useEffect, useState } from "react";
import { SidePanel } from "@/components/editor/SidePanel";
import { EditPanel } from "@/components/editor/EditPanel";
import PreviewPanel from "@/components/preview";
import { MobileWorkbench } from "@/components/mobile/MobileWorkbench";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import PdfExport from "@/components/shared/PdfExport";
import TemplateSheet from "@/components/shared/TemplateSheet";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";
import { useWorkbenchShellLabels } from "@/components/workbench/useWorkbenchShellLabels";

const LAYOUT_CONFIG = {
  DEFAULT: [20, 32, 48],
};

const DragHandle = ({ show = true }: { show?: boolean }) => {
  if (!show) return null;

  return (
    <ResizableHandle className="group relative w-1.5">
      <div
        className={cn(
          "absolute inset-y-0 left-1/2 w-1 -translate-x-1/2",
          "bg-border group-hover:bg-primary/20 group-data-[dragging=true]:bg-primary"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex h-8 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background",
          "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="h-4 w-0.5 rounded-full bg-muted-foreground/50" />
      </div>
    </ResizableHandle>
  );
};

export const runtime = "edge";

export default function Home() {
  const router = useRouter();
  const labels = useWorkbenchShellLabels();
  const { activeResume, updateResumeTitle, updateGlobalSettings } =
    useResumeStore();
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
  const [editPanelCollapsed, setEditPanelCollapsed] = useState(false);
  const [previewPanelCollapsed, setPreviewPanelCollapsed] = useState(false);
  const [panelSizes, setPanelSizes] = useState<number[]>(LAYOUT_CONFIG.DEFAULT);
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);

  const toggleSidePanel = () => {
    setSidePanelCollapsed(!sidePanelCollapsed);
  };

  const toggleEditPanel = () => {
    setEditPanelCollapsed(!editPanelCollapsed);
  };

  const togglePreviewPanel = () => {
    setPreviewPanelCollapsed(!previewPanelCollapsed);
  };

  const updateLayout = (sizes: number[]) => {
    setPanelSizes(sizes);
  };

  useEffect(() => {
    if (previewPanelCollapsed) return;

    if (window.innerWidth < 1440) {
      setSidePanelCollapsed(true);
    }

    const handleResize = () => {
      if (previewPanelCollapsed) return;

      if (window.innerWidth < 1440) {
        setSidePanelCollapsed(true);
      } else {
        setSidePanelCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [previewPanelCollapsed]);

  useEffect(() => {
    document.body.classList.add("workbench-body-lock");
    return () => {
      document.body.classList.remove("workbench-body-lock");
    };
  }, []);

  useEffect(() => {
    const newSizes = [];

    newSizes.push(sidePanelCollapsed ? 0 : 20);

    if (editPanelCollapsed) {
      newSizes.push(0);
    } else if (sidePanelCollapsed) {
      newSizes.push(36);
    } else if (previewPanelCollapsed) {
      newSizes.push(80);
    } else {
      newSizes.push(32);
    }

    if (previewPanelCollapsed) {
      newSizes.push(0);
    } else if (editPanelCollapsed && sidePanelCollapsed) {
      newSizes.push(100);
    } else if (editPanelCollapsed) {
      newSizes.push(80);
    } else if (sidePanelCollapsed) {
      newSizes.push(64);
    } else {
      newSizes.push(48);
    }

    const total = newSizes.reduce((sum, size) => sum + size, 0);
    if (total < 100) {
      const lastVisibleIndex = newSizes
        .map((size, index) => ({ size, index }))
        .filter(({ size }) => size > 0)
        .pop()?.index;

      if (lastVisibleIndex !== undefined) {
        newSizes[lastVisibleIndex] += 100 - total;
      }
    }

    updateLayout([...newSizes]);
  }, [sidePanelCollapsed, editPanelCollapsed, previewPanelCollapsed]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="hidden md:block">
        <WorkbenchTopBar
          title={activeResume?.title ?? ""}
          onTitleBlur={(value) => updateResumeTitle(value || "Untitled Resume")}
          onBack={() => router.push("/app/dashboard/resumes")}
          onOpenTemplates={() => setTemplateSheetOpen(true)}
          onOpenExport={undefined}
          exportSlot={
            <PdfExport triggerLabel={labels.export} />
          }
        />
      </div>

      <TemplateSheet
        open={templateSheetOpen}
        onOpenChange={setTemplateSheetOpen}
        showTrigger={false}
      />

      <div className="relative hidden h-[calc(100vh-73px)] md:block">
        <div
          className={cn(
            "h-full transition-all duration-300",
            previewPanelCollapsed ? "w-[calc(100%-4rem)]" : "w-full"
          )}
        >
          <ResizablePanelGroup
            key={panelSizes.join("-")}
            direction="horizontal"
            className="h-full border border-border bg-background"
          >
            {!sidePanelCollapsed && (
              <>
                <ResizablePanel
                  id="side-panel"
                  order={1}
                  defaultSize={panelSizes[0]}
                  className="border-r border-border bg-background"
                >
                  <div className="h-full overflow-y-auto">
                    <SidePanel />
                  </div>
                </ResizablePanel>
                <DragHandle />
              </>
            )}

            {!editPanelCollapsed && (
              <>
                <ResizablePanel
                  id="edit-panel"
                  order={2}
                  defaultSize={panelSizes[1]}
                  className="border-r border-border bg-background"
                >
                  <div className="h-full">
                    <EditPanel />
                  </div>
                </ResizablePanel>
                <DragHandle />
              </>
            )}

            <ResizablePanel
              id="preview-panel"
              order={3}
              collapsible={false}
              defaultSize={panelSizes[2]}
              className={cn("bg-gray-100", previewPanelCollapsed && "hidden")}
            >
              <div
                className="h-full overflow-y-auto"
                data-preview-scroll-container="true"
              >
                <PreviewPanel
                  sidePanelCollapsed={sidePanelCollapsed}
                  editPanelCollapsed={editPanelCollapsed}
                  previewPanelCollapsed={previewPanelCollapsed}
                  toggleSidePanel={toggleSidePanel}
                  toggleEditPanel={toggleEditPanel}
                  togglePreviewPanel={togglePreviewPanel}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

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
      </div>

      <div className="md:hidden">
        <MobileWorkbench />
      </div>
    </main>
  );
}
