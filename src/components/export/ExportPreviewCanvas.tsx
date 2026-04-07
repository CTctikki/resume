"use client";

import { DEFAULT_TEMPLATES } from "@/config";
import ResumeTemplateComponent from "@/components/templates";
import { useResumeStore } from "@/store/useResumeStore";
import { normalizeFontFamily } from "@/utils/fonts";

export function ExportPreviewCanvas() {
  const activeResume = useResumeStore((state) => state.activeResume);

  if (!activeResume) {
    return null;
  }

  const selectedFontFamily = normalizeFontFamily(
    activeResume.globalSettings?.fontFamily
  );
  const template =
    DEFAULT_TEMPLATES.find((item) => item.id === activeResume.templateId) ||
    DEFAULT_TEMPLATES[0];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-10000px] top-0 overflow-hidden"
      style={{ width: "210mm" }}
    >
      <div
        id="resume-preview"
        style={{
          padding: `${activeResume.globalSettings?.pagePadding || 0}px`,
          fontFamily: selectedFontFamily
        }}
      >
        <ResumeTemplateComponent data={activeResume} template={template} />
      </div>
    </div>
  );
}
