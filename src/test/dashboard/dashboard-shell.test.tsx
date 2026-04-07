import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardShell } from "@/app/app/dashboard/client";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { brand } from "@/config/brand";
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

vi.mock("@/components/ui/sidebar", () => {
  const useSidebar = () => ({
    open: true,
    toggleSidebar: vi.fn()
  });

  function SidebarProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }

  function Sidebar({ children }: { children: React.ReactNode }) {
    return <div data-sidebar="sidebar">{children}</div>;
  }

  function SidebarTrigger({ className }: { className?: string }) {
    return (
      <button type="button" className={className}>
        Toggle Sidebar
      </button>
    );
  }

  return {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    useSidebar
  };
});

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

describe("DashboardShell", () => {
  it("uses CT brand copy and exposes the mobile sidebar trigger in the shell", () => {
    render(
      <DashboardShell
        pathname="/app/dashboard/resumes"
        subtitle={brand.subtitle.en}
        onNavigate={vi.fn()}
      >
        <div>Dashboard body</div>
      </DashboardShell>
    );

    expect(screen.getByRole("heading", { name: brand.productName })).toBeInTheDocument();
    expect(screen.getByText(brand.subtitle.en)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      brand.studioUrl
    );
    expect(screen.getByRole("button", { name: /toggle sidebar/i })).toBeInTheDocument();
    expect(screen.getByText(/templates/i)).toBeInTheDocument();
  });
});
