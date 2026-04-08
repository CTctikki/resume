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
  it("renders the updated English hero copy", async () => {
    await renderLandingPage("en");

    expect(
      screen.getByRole("heading", {
        name: /make resume creation simple and intelligent/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /use ai to help create a professional resume quickly\. no signup required, free to use, and your data stays secure\./i
      )
    ).toBeInTheDocument();
  });

  it("renders the revised Chinese header and hero actions", async () => {
    await renderLandingPage("zh", "zh", "zh");

    expect(screen.getByRole("link", { name: "CT程序定制工作室" })).toBeInTheDocument();
    expect(screen.getByText("CT简历工作台")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "让简历制作变得简单而智能" })).toBeInTheDocument();
    expect(
      screen.getByText("用 AI 技术，帮助您快速创建专业的简历。无需注册，免费使用，数据安全存储。")
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "前往官网" })
        .some((link) => link.getAttribute("href") === "https://ctikki.com")
    ).toBe(true);
    expect(screen.getAllByRole("link", { name: "立即使用" }).length).toBeGreaterThanOrEqual(2);
  });

  it("centers the hero copy and keeps the workspace preview in its own block", async () => {
    await renderLandingPage("zh", "zh", "zh");

    const previewSection = screen.getByTestId("hero-preview-section");
    const textSection = screen.getByTestId("hero-copy-section");

    expect(textSection.className).toContain("items-center");
    expect(textSection.className).toContain("text-center");
    expect(previewSection).toBeInTheDocument();
    expect(within(previewSection).getByRole("img", { name: "CT 工作区预览" })).toBeInTheDocument();
  });

  it("anchors the mobile menu to a positioned wrapper", async () => {
    await renderLandingPage("en");

    const anchor = screen.getByTestId("landing-mobile-menu-anchor");
    expect(anchor).toHaveClass("relative");

    const panel = within(anchor).getByTestId("landing-mobile-menu-panel");
    expect(panel).toHaveClass("absolute");
  });
});
