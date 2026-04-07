import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import PdfExport from "@/components/shared/PdfExport";
import TemplateSheet from "@/components/shared/TemplateSheet";
import { normalizeResumeTitle } from "@/components/workbench/normalizeResumeTitle";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";
import { useWorkbenchShellLabels } from "@/components/workbench/useWorkbenchShellLabels";

interface EditorHeaderProps {
  isMobile?: boolean;
}

export function EditorHeader({ isMobile }: EditorHeaderProps) {
  const router = useRouter();
  const labels = useWorkbenchShellLabels();
  const { activeResume, updateResumeTitle } = useResumeStore();
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <WorkbenchTopBar
        title={activeResume?.title ?? ""}
        onTitleBlur={(value) =>
          updateResumeTitle(normalizeResumeTitle(value, labels.untitledResume))
        }
        onBack={() => router.push("/app/dashboard/resumes")}
        onOpenTemplates={() => setTemplateSheetOpen(true)}
        onOpenExport={undefined}
        exportSlot={<PdfExport triggerLabel={labels.export} />}
      />
      <TemplateSheet
        open={templateSheetOpen}
        onOpenChange={setTemplateSheetOpen}
        showTrigger={false}
      />
    </>
  );
}
