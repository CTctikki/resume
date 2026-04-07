import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import LandingPage from "@/app/(public)/[locale]/page";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

const serverState = vi.hoisted(() => ({
  locale: "en" as "en" | "zh",
}));

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => children,
  useLocale: () => serverState.locale,
  useTranslations: () => ((key: string) => key),
}));

vi.mock("@/i18n/compat/server", () => ({
  getLocale: async () => serverState.locale,
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

async function renderLandingPage(
  routeLocale: "en" | "zh",
  providerLocale: "en" | "zh" = routeLocale,
  serverLocale: "en" | "zh" = routeLocale
) {
  serverState.locale = serverLocale;
  const page = <LandingPage locale={routeLocale} />;
  return renderWithProviders(page, providerLocale);
}

describe("LandingPage", () => {
  it("renders the English landing copy with the studio link and no GitHub CTA", async () => {
    await renderLandingPage("en");

    expect(
      screen.getByRole("heading", {
        name: /build a resume in a focused workspace/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
    expect(screen.getByRole("img", { name: /ct workspace preview/i })).toBeInTheDocument();
    expect(screen.queryByText(/star on github/i)).not.toBeInTheDocument();
  });

  it("renders the zh landing variant and keeps home links locale-correct", async () => {
    await renderLandingPage("zh", "zh", "en");

    expect(
      screen.getByRole("heading", { name: "在专注的工作区里完成简历" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /build a resume in a focused workspace/i })).not.toBeInTheDocument();
    const brandedLinks = screen.getAllByRole("link", { name: /ct 简历工作台/i });
    expect(brandedLinks.length).toBeGreaterThan(0);
    brandedLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/zh");
    });
    expect(
      screen.getByRole("link", { name: /返回首页/i })
    ).toHaveAttribute("href", "/zh");
    expect(screen.getByRole("img", { name: /ct 工作区预览/i })).toBeInTheDocument();
  });

  it("anchors the mobile menu to a positioned wrapper", async () => {
    await renderLandingPage("en");

    const anchor = screen.getByTestId("landing-mobile-menu-anchor");
    expect(anchor).toHaveClass("relative");

    const panel = within(anchor).getByTestId("landing-mobile-menu-panel");
    expect(panel).toHaveClass("absolute");
  });
});
