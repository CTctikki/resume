import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("@/i18n/compat/client", () => ({
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key),
}));

vi.mock("@/components/templates/TemplatesBrowser", () => ({
  default: ({
    title,
    subtitle,
    browserCopy,
    browserMetadata,
  }: {
    title: string;
    subtitle: string;
    browserCopy: {
      drawerTitle: string;
      idealForLabel: string;
      densityLabel: string;
      atsLabel: string;
      useTemplateLabel: string;
    };
    browserMetadata: {
      classic: { tags: readonly string[]; idealFor: string; density: string };
    };
  }) => (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <section>
        <span>{browserCopy.drawerTitle}</span>
        <span>{browserCopy.useTemplateLabel}</span>
        <span>{browserCopy.idealForLabel}</span>
        <div>{browserMetadata.classic.tags.join(", ")}</div>
        <div>{browserMetadata.classic.idealFor}</div>
      </section>
    </div>
  ),
}));

describe("TemplatesPage", () => {
  it("shows usage metadata instead of only decorative template cards", async () => {
    const { default: TemplatesPage } = await import(
      "@/app/app/dashboard/templates/page"
    );

    const html = renderToStaticMarkup(<TemplatesPage />);

    expect(html).toContain("ATS-friendly");
    expect(html).toContain("balanced");
    expect(html).toMatch(/ideal for/i);
  });
});
