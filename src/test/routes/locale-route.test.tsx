import { describe, expect, it } from "vitest";
import { Route as LocaleRoute } from "@/routes/$locale";

describe("locale route", () => {
  it("rejects invalid locales instead of falling back to the default locale", () => {
    expect(() =>
      (LocaleRoute.options.beforeLoad as NonNullable<typeof LocaleRoute.options.beforeLoad>)({
        params: { locale: "fr" }
      } as never)
    ).toThrow();
  });

  it("accepts configured locales", () => {
    expect(() =>
      (LocaleRoute.options.beforeLoad as NonNullable<typeof LocaleRoute.options.beforeLoad>)({
        params: { locale: "en" }
      } as never)
    ).not.toThrow();
  });
});
