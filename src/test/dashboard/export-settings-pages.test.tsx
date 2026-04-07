import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ExportPage from "@/app/app/dashboard/export/page";
import SettingsPage from "@/app/app/dashboard/settings/page";
import enMessages from "@/i18n/locales/en.json";
import { useResumeStore } from "@/store/useResumeStore";
import { createTranslator } from "@/i18n/compat/utils";
import { brand } from "@/config/brand";

const { mockExportPdf, mockExportPrint, mockExportJson } = vi.hoisted(() => ({
  mockExportPdf: vi.fn(),
  mockExportPrint: vi.fn(),
  mockExportJson: vi.fn()
}));

vi.mock("@/components/export/exportActions", () => ({
  exportResumePdf: mockExportPdf,
  exportResumePrint: mockExportPrint,
  exportResumeJson: mockExportJson
}));
vi.mock("@/components/export/ExportPreviewCanvas", () => ({
  ExportPreviewCanvas: () => null
}));
vi.mock("@/components/settings/WorkspaceBackupSyncSection", () => ({
  WorkspaceBackupSyncSection: () => (
    <section>
      <h3>{"Backup and sync"}</h3>
      <button type="button">{"Select Folder"}</button>
    </section>
  )
}));
vi.mock("@/lib/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}));
vi.mock("@/i18n/compat/client", async () => {
  const actual = await vi.importActual<typeof import("@/i18n/compat/client")>(
    "@/i18n/compat/client"
  );

  return {
    ...actual,
    useLocale: () => "en",
    useTranslations: (namespace?: string) => createTranslator(enMessages as any, namespace)
  };
});

const seedResume = () => {
  const resume = {
    id: "resume-1",
    title: "\u6d4b\u8bd5\u7b80\u5386",
    globalSettings: {
      pagePadding: 24,
      fontFamily: "MiSans"
    }
  };

  act(() => {
    useResumeStore.setState({
      resumes: { [resume.id]: resume } as any,
      activeResumeId: resume.id,
      activeResume: resume as any
    } as any);
  });
};

describe("dashboard support pages", () => {
  beforeEach(() => {
    seedResume();
  });

  afterEach(() => {
    act(() => {
      useResumeStore.setState({
        resumes: {},
        activeResumeId: null,
        activeResume: null
      } as any);
    });
    mockExportPdf.mockReset();
    mockExportPrint.mockReset();
    mockExportJson.mockReset();
  });

  it("shows localized export hub actions and triggers the real export hooks", async () => {
    const exportT = createTranslator(enMessages as any, "dashboard.export");

    render(<ExportPage />);

    expect(screen.getByRole("heading", { name: exportT("title") })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: exportT("cards.pdf.action") })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: exportT("cards.print.action") })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: exportT("cards.json.action") })
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: exportT("cards.pdf.action") }));
      fireEvent.click(screen.getByRole("button", { name: exportT("cards.print.action") }));
      fireEvent.click(screen.getByRole("button", { name: exportT("cards.json.action") }));
    });

    expect(mockExportPdf).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "resume-1",
        title: "\u6d4b\u8bd5\u7b80\u5386"
      }),
      expect.objectContaining({
        success: exportT("toast.pdfSuccess")
      })
    );
    expect(mockExportPrint).toHaveBeenCalledTimes(1);
    expect(mockExportJson).toHaveBeenCalledTimes(1);
  });

  it("shows the localized workspace settings surface", () => {
    const settingsT = createTranslator(enMessages as any, "dashboard.settings");
    const workspaceT = createTranslator(enMessages as any, "dashboard.settings.workspace");

    render(<SettingsPage />);

    expect(screen.getByRole("heading", { name: settingsT("pageTitle") })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: workspaceT("overviewTitle") })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: workspaceT("sections.backupSync.title") })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: workspaceT("sections.aiProviders.title") })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: workspaceT("sections.aboutVersion.title") })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: workspaceT("backupSync.selectFolder") }))
      .toBeInTheDocument();
    expect(screen.getByText(brand.studioName)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ctikki.com" })).toHaveAttribute(
      "href",
      brand.studioUrl
    );
  });
});
