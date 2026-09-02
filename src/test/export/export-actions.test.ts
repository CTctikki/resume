import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  exportResumeLongPageImage,
  exportResumeLongPagePdf,
  exportResumeMarkdown,
  exportResumePdf
} from "@/components/export/exportActions";
import { PDF_EXPORT_CONFIG } from "@/config";
import {
  exportResumeAsMarkdown,
  exportToLongPageImage,
  exportToLongPagePdf,
  exportToPdf
} from "@/utils/export";
import { exportResumeToBrowserPrint } from "@/utils/print";
import type { ResumeData } from "@/types/resume";
import { toast } from "sonner";

vi.mock("@/utils/export", () => ({
  exportResumeAsMarkdown: vi.fn(),
  exportToLongPageImage: vi.fn(),
  exportToLongPagePdf: vi.fn(),
  exportToPdf: vi.fn()
}));

vi.mock("@/utils/print", () => ({
  exportResumeToBrowserPrint: vi.fn()
}));

vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    error: vi.fn(),
    success: vi.fn()
  })
}));

describe("exportResumePdf", () => {
  const resume = {
    title: "测试简历",
    globalSettings: {
      pagePadding: 24,
      fontFamily: "MiSans"
    }
  } as ResumeData;

  beforeEach(() => {
    vi.mocked(exportToPdf).mockReset();
    vi.mocked(exportToLongPagePdf).mockReset();
    vi.mocked(exportToLongPageImage).mockReset();
    vi.mocked(exportResumeAsMarkdown).mockReset();
    vi.mocked(exportResumeToBrowserPrint).mockReset();
    vi.mocked(toast).mockReset();
    vi.mocked(toast.error).mockReset();
    vi.mocked(toast.success).mockReset();
    PDF_EXPORT_CONFIG.SERVER_URL = "";
    document.body.innerHTML = '<div id="resume-preview"></div>';
  });

  it("falls back to browser print when the PDF export service is unavailable", async () => {
    const result = await exportResumePdf(resume, {
      noResume: "请先打开一份简历",
      success: "PDF 导出成功",
      error: "PDF 导出失败",
      unavailable: "当前环境暂不支持直接下载 PDF，已切换到浏览器打印。"
    });

    expect(result).toBe(true);
    expect(exportToPdf).not.toHaveBeenCalled();
    expect(exportResumeToBrowserPrint).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      24,
      "MiSans"
    );
    expect(toast).toHaveBeenCalledWith(
      "当前环境暂不支持直接下载 PDF，已切换到浏览器打印。"
    );
  });

  it("uses the dedicated PDF export service when it is configured", async () => {
    PDF_EXPORT_CONFIG.SERVER_URL = "https://pdf.example.com/render";
    vi.mocked(exportToPdf).mockResolvedValue(true);

    const result = await exportResumePdf(resume, {
      noResume: "请先打开一份简历",
      success: "PDF 导出成功",
      error: "PDF 导出失败",
      unavailable: "当前环境暂不支持直接下载 PDF，已切换到浏览器打印。"
    });

    expect(result).toBe(true);
    expect(exportToPdf).toHaveBeenCalledWith(
      expect.objectContaining({
        elementId: "resume-preview",
        title: "测试简历",
        pagePadding: 24,
        fontFamily: "MiSans"
      })
    );
    expect(exportResumeToBrowserPrint).not.toHaveBeenCalled();
  });

  it("exports long-page PDF and PNG through the local browser utilities", async () => {
    await exportResumeLongPagePdf(resume, {
      noResume: "No resume",
      success: "PDF ready",
      error: "PDF failed"
    });
    await exportResumeLongPageImage(resume, {
      noResume: "No resume",
      success: "PNG ready",
      error: "PNG failed"
    });

    expect(exportToLongPagePdf).toHaveBeenCalledWith(
      expect.objectContaining({
        elementId: "resume-preview",
        title: "测试简历",
        pagePadding: 24,
        fontFamily: "MiSans"
      })
    );
    expect(exportToLongPageImage).toHaveBeenCalledWith(
      expect.objectContaining({
        elementId: "resume-preview",
        title: "测试简历"
      })
    );
  });

  it("exports Markdown with localized basic-field labels", () => {
    exportResumeMarkdown(resume, {
      noResume: "No resume",
      success: "Markdown ready",
      error: "Markdown failed",
      markdownOptions: {
        basicFieldLabels: { name: "姓名" }
      }
    });

    expect(exportResumeAsMarkdown).toHaveBeenCalledWith(
      expect.objectContaining({
        resume,
        title: "测试简历",
        markdownOptions: {
          basicFieldLabels: { name: "姓名" }
        }
      })
    );
  });
});
