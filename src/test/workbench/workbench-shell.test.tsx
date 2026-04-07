import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({ children }: { children: unknown }) => children,
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key),
}));

describe("workbench shell", () => {
  it("shows workspace actions without GitHub branding", () => {
    renderWithProviders(
      <>
        <WorkbenchTopBar
          title="Backend Engineer Resume"
          onTitleBlur={vi.fn()}
          onBack={vi.fn()}
          onOpenTemplates={vi.fn()}
          onOpenExport={vi.fn()}
        />
        <WorkbenchActionRail
          sidePanelCollapsed={false}
          editPanelCollapsed={false}
          previewPanelCollapsed={false}
          onToggleSidePanel={vi.fn()}
          onToggleEditPanel={vi.fn()}
          onTogglePreviewPanel={vi.fn()}
          onOpenTemplates={vi.fn()}
          onOpenExport={vi.fn()}
          onAutoFit={vi.fn()}
        />
      </>,
      "en"
    );

    expect(
      screen.getByDisplayValue("Backend Engineer Resume")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
  });

  it("wires template and export actions through the action rail", async () => {
    const user = userEvent.setup();
    const onOpenTemplates = vi.fn();
    const onOpenExport = vi.fn();

    renderWithProviders(
      <WorkbenchActionRail
        sidePanelCollapsed={false}
        editPanelCollapsed={false}
        previewPanelCollapsed={false}
        onToggleSidePanel={vi.fn()}
        onToggleEditPanel={vi.fn()}
        onTogglePreviewPanel={vi.fn()}
        onOpenTemplates={onOpenTemplates}
        onOpenExport={onOpenExport}
        onAutoFit={vi.fn()}
      />,
      "en"
    );

    await user.click(screen.getByRole("button", { name: /open templates/i }));
    await user.click(screen.getByRole("button", { name: /open export/i }));

    expect(onOpenTemplates).toHaveBeenCalledTimes(1);
    expect(onOpenExport).toHaveBeenCalledTimes(1);
  });
});
