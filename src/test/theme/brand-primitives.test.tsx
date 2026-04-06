import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { BrandWordmark } from "@/components/shared/BrandWordmark";

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

describe("BrandWordmark", () => {
  it("renders the CT product and studio names", () => {
    renderWithProviders(
      createElement(BrandWordmark, { showStudio: true, localeHref: "/zh" }),
      "zh"
    );

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
  });
});
