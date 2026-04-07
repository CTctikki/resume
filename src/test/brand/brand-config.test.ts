import { createElement } from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { brand, normalizeSiteOrigin } from "@/config/brand";
import { useLocale } from "@/i18n/compat/client";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

const i18nState = vi.hoisted(() => ({
  locale: "en" as "en" | "zh"
}));

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({
    locale,
    children
  }: {
    locale: "en" | "zh";
    children: unknown;
  }) => {
    i18nState.locale = locale;
    return children;
  },
  useLocale: () => i18nState.locale,
  useTranslations: () => ((key: string) => key)
}));

function BrandProbe() {
  const locale = useLocale();

  return createElement(
    "section",
    null,
    createElement("h1", null, brand.productName),
    createElement("p", { "data-testid": "locale" }, locale),
    createElement("a", { href: `${brand.siteOrigin}/${locale}` }, "Workspace")
  );
}

describe("brand config", () => {
  it("renders through the shared providers", () => {
    renderWithProviders(createElement(BrandProbe), "zh");

    expect(
      screen.getByRole("heading", { name: brand.productName })
    ).toBeInTheDocument();
    expect(screen.getByTestId("locale")).toHaveTextContent("zh");
    expect(screen.getByRole("link", { name: "Workspace" })).toHaveAttribute(
      "href",
      `${brand.siteOrigin}/zh`
    );
  });

  it("normalizes the site origin before building canonical URLs", () => {
    expect(normalizeSiteOrigin("https://resume.ctikki.com/")).toBe(
      "https://resume.ctikki.com"
    );
    expect(
      new URL("/zh", normalizeSiteOrigin("https://resume.ctikki.com/")).toString()
    ).toBe("https://resume.ctikki.com/zh");
  });

  it("exposes the CT workspace identity", () => {
    expect(brand.productName).toBe("CT 简历工作台");
    expect(brand.productShortName).toBe("CT Resume");
    expect(brand.studioName).toBe("CT程序定制工作室");
    expect(brand.studioUrl).toBe("https://ctikki.com");
  });
});
