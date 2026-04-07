import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExportPage from "@/app/app/dashboard/export/page";
import SettingsPage from "@/app/app/dashboard/settings/page";

vi.mock("react", async () => await vi.importActual("react"));

describe("dashboard support pages", () => {
  it("shows the export hub and workspace settings sections", () => {
    const { unmount } = render(<ExportPage />);
    expect(screen.getByRole("heading", { name: /export and share/i })).toBeInTheDocument();

    unmount();
    render(<SettingsPage />);
    expect(screen.getByRole("heading", { name: /workspace settings/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /backup and sync/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /select folder/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ai providers/i })).toBeInTheDocument();
    expect(screen.getAllByText(/ct程序定制工作室/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
  });
});
