import type { ResumeData } from "@/types/resume";
import {
  exportResumeJson,
  exportResumeLongPageImage,
  exportResumeLongPagePdf,
  exportResumeMarkdown,
  exportResumePdf,
  exportResumePrint
} from "@/components/export/exportActions";
import type { ResumeMarkdownOptions } from "@/utils/markdown";

type ExportableResume = ResumeData | null;

type PdfMessages = {
  noResume: string;
  success: string;
  error: string;
  unavailable?: string;
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

type MarkdownMessages = JsonMessages & {
  markdownOptions?: ResumeMarkdownOptions;
};

export function createExportActions(resume: ExportableResume) {
  return {
    exportPdf: (messages: PdfMessages) => exportResumePdf(resume, messages),
    exportLongPagePdf: (messages: PdfMessages) =>
      exportResumeLongPagePdf(resume, messages),
    exportLongPageImage: (messages: PdfMessages) =>
      exportResumeLongPageImage(resume, messages),
    exportPrint: (messages: PrintMessages) => exportResumePrint(resume, messages),
    exportJson: (messages: JsonMessages) => exportResumeJson(resume, messages),
    exportMarkdown: (messages: MarkdownMessages) =>
      exportResumeMarkdown(resume, messages)
  };
}
