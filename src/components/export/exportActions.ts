import { toast } from "sonner";
import type { ResumeData } from "@/types/resume";
import { PDF_EXPORT_CONFIG } from "@/config";
import { exportToPdf } from "@/utils/export";
import { exportResumeToBrowserPrint } from "@/utils/print";

type ExportableResume = Pick<ResumeData, "title" | "globalSettings"> | null;

type ExportMessages = {
  noResume: string;
  success: string;
  error: string;
  unavailable?: string;
};

type PrintMessages = {
  noResume: string;
  error: string;
};

export async function exportResumePdf(
  resume: ExportableResume,
  messages: ExportMessages
) {
  if (!resume) {
    toast.error(messages.noResume);
    return false;
  }

  const hasPdfExportService = PDF_EXPORT_CONFIG.SERVER_URL.trim().length > 0;
  if (!hasPdfExportService) {
    toast(
      messages.unavailable ??
        "Direct PDF download is unavailable right now. Browser print has been opened instead."
    );

    const resumeContent = document.getElementById("resume-preview");
    if (!resumeContent) {
      toast.error(messages.error);
      return false;
    }

    await exportResumeToBrowserPrint(
      resumeContent,
      resume.globalSettings?.pagePadding || 0,
      resume.globalSettings?.fontFamily
    );

    return true;
  }

  return exportToPdf({
    elementId: "resume-preview",
    title: resume.title || "resume",
    pagePadding: resume.globalSettings?.pagePadding || 0,
    fontFamily: resume.globalSettings?.fontFamily,
    successMessage: messages.success,
    errorMessage: messages.error,
    unavailableMessage: messages.unavailable
  });
}

export function exportResumeJson(
  resume: ExportableResume,
  messages: ExportMessages
) {
  try {
    if (!resume) {
      throw new Error(messages.noResume);
    }

    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.title || "resume"}.json`;
    link.click();

    window.URL.revokeObjectURL(url);
    toast.success(messages.success);
    return true;
  } catch (error) {
    console.error("JSON export error:", error);
    toast.error(messages.error);
    return false;
  }
}

export async function exportResumePrint(
  resume: ExportableResume,
  messages: PrintMessages
) {
  if (!resume) {
    toast.error(messages.noResume);
    return false;
  }

  const resumeContent = document.getElementById("resume-preview");
  if (!resumeContent) {
    toast.error(messages.error);
    return false;
  }

  await exportResumeToBrowserPrint(
    resumeContent,
    resume.globalSettings?.pagePadding || 0,
    resume.globalSettings?.fontFamily
  );

  return true;
}
