import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { templateMetadata } from "@/config/templateMetadata";
import { TemplateMetadataDrawer } from "@/components/templates/TemplateMetadataDrawer";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => children,
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key),
}));

vi.mock("@/app/providers", () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

describe("TemplateMetadataDrawer", () => {
  it("shows usage metadata instead of only decorative template cards", () => {
    renderWithProviders(
      <TemplateMetadataDrawer
        open
        title="Classic"
        description="Conservative, readable, and ready for structured hiring flows."
        tags={templateMetadata.classic.tags}
        idealFor={templateMetadata.classic.idealFor}
        density={templateMetadata.classic.density}
        onUse={() => undefined}
      />,
      "en"
    );

    expect(screen.getAllByText(/ATS-friendly/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/balanced/i)).toBeInTheDocument();
    expect(screen.getByText(/ideal for/i)).toBeInTheDocument();
  });
});
