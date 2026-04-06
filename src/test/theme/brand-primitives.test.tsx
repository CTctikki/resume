import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
  }) => <a href={href} {...rest}>{children}</a>
}));

describe("BrandWordmark", () => {
  it("renders the CT product and studio names with the shared logo mark", () => {
    renderWithProviders(
      <BrandWordmark showStudio localeHref="/zh" />,
      "zh"
    );

    const link = screen.getByRole("link", { name: "CT 简历工作台" });
    expect(link).toHaveAttribute("href", "/zh");
    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "CT 简历工作台 logo" })
    ).toHaveAttribute("width", "120");
    expect(
      screen.getByRole("img", { name: "CT 简历工作台 logo" })
    ).toHaveAttribute("height", "40");
  });

  it("hides the studio name when showStudio is false", () => {
    renderWithProviders(<BrandWordmark localeHref="/zh" />, "zh");

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.queryByText("CT程序定制工作室")).not.toBeInTheDocument();
  });
});
