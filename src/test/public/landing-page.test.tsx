import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import LandingPage from "@/app/(public)/[locale]/page";
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

vi.mock("@/lib/navigation", () => ({
  usePathname: () => "/en",
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => () => undefined,
}));

vi.mock("@/lib/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/shared/LanguageSwitch", () => ({
  default: () => <button type="button">Language</button>,
}));

vi.mock("@/components/shared/ThemeToggle", () => ({
  default: ({ children }: { children?: React.ReactNode }) =>
    children ?? <button type="button">Theme</button>,
}));

vi.mock("@/components/home/client/ScrollHeader", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/home/client/ScrollBackground", () => ({
  default: () => null,
}));

vi.mock("@/components/home/client/AnimatedFeature", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("LandingPage", () => {
  it("shows CT branding and no GitHub star CTA", () => {
    renderWithProviders(<LandingPage />, "en");

    expect(
      screen.getByRole("heading", {
        name: /build a resume in a focused workspace/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
    expect(screen.queryByText(/star on github/i)).not.toBeInTheDocument();
  });
});
