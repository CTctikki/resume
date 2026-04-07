import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";
import PdfExport from "@/components/shared/PdfExport";
import TemplateSheet from "@/components/shared/TemplateSheet";

const resumeStore = vi.hoisted(() => ({
  activeResume: {
    title: "Backend Engineer Resume",
    templateId: "classic",
    globalSettings: {}
  },
  setTemplate: vi.fn(),
  updateGlobalSettings: vi.fn()
}));

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({ children }: { children: unknown }) => children,
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key),
}));

vi.mock("@/store/useResumeStore", () => ({
  useResumeStore: () => resumeStore
}));

vi.mock("@/hooks/useTemplateSnapshots", () => ({
  useTemplateSnapshots: () => ({
    snapshotMap: {}
  })
}));

vi.mock("@/components/shared/PdfExport", () => {
  function MockPdfExport({
    triggerVariant = "button",
    triggerLabel = "button.export"
  }: {
    triggerVariant?: "button" | "icon";
    triggerLabel?: string;
  }) {
    return (
      <div data-testid={triggerVariant === "icon" ? "rail-export-contract" : "topbar-export-contract"}>
        <button type="button" aria-label={triggerLabel}>
          {triggerVariant === "icon" ? "icon-export" : triggerLabel}
        </button>
        <span>
          {triggerVariant === "icon" ? "rail-export-ready" : "topbar-export-ready"}
        </span>
      </div>
    );
  }

  return {
    default: MockPdfExport
  };
});

function ComposedWorkbenchShell({
  templateSheetOpen = false,
  onOpenTemplates = vi.fn()
}: {
  templateSheetOpen?: boolean;
  onOpenTemplates?: () => void;
}) {
  return (
    <>
      <WorkbenchTopBar
        title={resumeStore.activeResume.title}
        onTitleBlur={vi.fn()}
        onBack={vi.fn()}
        onOpenTemplates={onOpenTemplates}
        onOpenExport={vi.fn()}
        exportSlot={<PdfExport />}
      />
      <TemplateSheet
        open={templateSheetOpen}
        onOpenChange={vi.fn()}
        showTrigger={false}
      />
      <WorkbenchActionRail
        sidePanelCollapsed={false}
        editPanelCollapsed={false}
        previewPanelCollapsed={false}
        onToggleSidePanel={vi.fn()}
        onToggleEditPanel={vi.fn()}
        onTogglePreviewPanel={vi.fn()}
        onOpenTemplates={onOpenTemplates}
        onOpenExport={vi.fn()}
        onAutoFit={vi.fn()}
        exportSlot={<PdfExport triggerVariant="icon" triggerLabel="Open export" />}
      />
    </>
  );
}

describe("workbench shell", () => {
  it("shows workspace actions without GitHub branding", () => {
    render(<ComposedWorkbenchShell />);

    expect(
      screen.getByDisplayValue("Backend Engineer Resume")
    ).toBeInTheDocument();
    expect(screen.getByTestId("topbar-export-contract")).toBeInTheDocument();
    expect(screen.getByTestId("rail-export-contract")).toBeInTheDocument();
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
  });

  it("opens template and export controls through the composed shell", async () => {
    const user = userEvent.setup();
    const onOpenTemplates = vi.fn();

    render(<ComposedWorkbenchShell onOpenTemplates={onOpenTemplates} />);

    await user.click(screen.getByRole("button", { name: /open templates/i }));
    expect(onOpenTemplates).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("button", { name: /open export/i })).toBeInTheDocument();
    expect(screen.getByText("rail-export-ready")).toBeInTheDocument();
  });
});
