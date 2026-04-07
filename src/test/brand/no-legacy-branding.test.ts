import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src", "public"];
const BANNED = ["Magic Resume", "JOYCEQL", "api.magicv.art", "Star on GitHub"];
const THIS_TEST = "src/test/brand/no-legacy-branding.test.ts";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return [full];
  });
}

describe("legacy brand guard", () => {
  it("removes source-project product strings from app code", () => {
    const files = ROOTS.flatMap((root) => walk(root)).filter(
      (file) =>
        /\.(ts|tsx|json|css|svg)$/i.test(file) &&
        file.replace(/\\/g, "/") !== THIS_TEST
    );

    const offenders = files.flatMap((file) => {
      const content = readFileSync(file, "utf8");
      return BANNED.filter((needle) => content.includes(needle)).map(
        (needle) => `${file}: ${needle}`
      );
    });

    expect(offenders).toEqual([]);
  });
});
