import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ExportPage from "@/app/app/dashboard/export/page";
import SettingsPage from "@/app/app/dashboard/settings/page";

describe("dashboard support pages", () => {
  it("shows the export hub and CT about panel", () => {
    const { unmount } = render(<ExportPage />);
    expect(screen.getByRole("heading", { name: /export and share/i })).toBeInTheDocument();

    unmount();
    render(<SettingsPage />);
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
  });
});
