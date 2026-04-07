import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import PdfExport from "@/components/shared/PdfExport";
import TemplateSheet from "@/components/shared/TemplateSheet";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";

interface EditorHeaderProps {
  isMobile?: boolean;
}

export function EditorHeader({ isMobile }: EditorHeaderProps) {
  const router = useRouter();
  const { activeResume, updateResumeTitle } = useResumeStore();
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <WorkbenchTopBar
        title={activeResume?.title ?? ""}
        onTitleBlur={(value) => updateResumeTitle(value || "Untitled Resume")}
        onBack={() => router.push("/app/dashboard/resumes")}
        onOpenTemplates={() => setTemplateSheetOpen(true)}
        onOpenExport={() => {}}
        exportSlot={<PdfExport />}
      />
      <TemplateSheet
        open={templateSheetOpen}
        onOpenChange={setTemplateSheetOpen}
        showTrigger={false}
      />
    </>
  );
}
