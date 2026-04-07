import type { ResumeData } from "@/types/resume";
import {
  exportResumeJson,
  exportResumePdf,
  exportResumePrint
} from "@/components/export/exportActions";

type ExportableResume = Pick<ResumeData, "title" | "globalSettings"> | null;

type PdfMessages = {
  noResume: string;
  success: string;
  error: string;
};

type PrintMessages = {
  noResume: string;
  error: string;
};

type JsonMessages = {
  noResume: string;
  success: string;
  error: string;
};

export function createExportActions(resume: ExportableResume) {
  return {
    exportPdf: (messages: PdfMessages) => exportResumePdf(resume, messages),
    exportPrint: (messages: PrintMessages) => exportResumePrint(resume, messages),
    exportJson: (messages: JsonMessages) => exportResumeJson(resume, messages)
  };
}
