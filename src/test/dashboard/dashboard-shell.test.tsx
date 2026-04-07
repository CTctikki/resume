import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { dashboardNav } from "@/config/dashboardNav";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key)
}));

vi.mock("@/lib/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}));

describe("AppSidebar", () => {
  it("shows the CT workspace brand and dashboard sections", () => {
    renderWithProviders(
      <AppSidebar items={dashboardNav} currentPath="/app/dashboard/resumes" expanded />,
      "en"
    );

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText(/resumes/i)).toBeInTheDocument();
    expect(screen.getByText(/templates/i)).toBeInTheDocument();
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
  });
});

describe("DashboardTopBar", () => {
  it("defaults to the CT brand name instead of the legacy dashboard label", () => {
    renderWithProviders(
      <DashboardTopBar subtitle="AI driven resume editor" />,
      "en"
    );

    expect(screen.getByRole("heading", { name: "CT 简历工作台" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
  });
});
