import { createElement } from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { brand } from "@/config/brand";
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

const i18nState = vi.hoisted(() => ({
  locale: "en" as "en" | "zh"
}));

vi.mock("@/i18n/compat/client", () => ({
  NextIntlClientProvider: ({
    children
  }: {
    children: unknown;
  }) => {
    i18nState.locale = "zh";
    return children;
  },
  useLocale: () => i18nState.locale,
  useTranslations: () => ((key: string) => key)
}));

vi.mock("@/lib/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: unknown;
  }) => createElement("a", { href, ...rest }, children)
}));

describe("BrandWordmark", () => {
  it("renders the CT product and studio names", () => {
    renderWithProviders(
      createElement(BrandWordmark, { showStudio: true, localeHref: "/zh" }),
      "zh"
    );

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(brand.productName).toBe("CT 简历工作台");
    expect(brand.studioName).toBe("CT程序定制工作室");
  });
});
