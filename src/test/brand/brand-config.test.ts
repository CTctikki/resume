import { describe, expect, it } from "vitest";
import { brand } from "@/config/brand";

describe("brand config", () => {
  it("exposes the CT workspace identity", () => {
    expect(brand.productName).toBe("CT 简历工作台");
    expect(brand.productShortName).toBe("CT Resume");
    expect(brand.studioName).toBe("CT程序定制工作室");
    expect(brand.studioUrl).toBe("https://ctikki.com");
  });
});
