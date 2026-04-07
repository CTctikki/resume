import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src", "public"];
const BANNED = [
  "Magic Resume",
  "JOYCEQL",
  "api.magicv.art",
  "Star on GitHub",
  "Smart Resume Creation",
  "Make Resume Creation Simple and Smart",
  "Get Started",
  "免费简历制作",
  "让简历制作变得简单而智能",
  "开始使用"
];
const THIS_TEST = "src/test/brand/no-legacy-branding.test.ts";
const RETIRED_GITHUB_SURFACE = [
  {
    file: "src/components/editor/basic/BasicPanel.tsx",
    needles: ["githubContributions", "githubContributionsVisible", "githubKey", "githubUseName"]
  },
  {
    file: "src/components/templates/classic/sections/BaseInfo.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  },
  {
    file: "src/components/templates/creative/index.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  },
  {
    file: "src/components/templates/elegant/sections/BaseInfo.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  },
  {
    file: "src/components/templates/left-right/sections/BaseInfo.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  },
  {
    file: "src/components/templates/minimalist/sections/BaseInfo.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  },
  {
    file: "src/components/templates/timeline/sections/BaseInfo.tsx",
    needles: ["GithubContribution", "githubContributionsVisible"]
  }
] as const;

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

  it("removes the retired GitHub contribution surface from visible product files", () => {
    const offenders = RETIRED_GITHUB_SURFACE.flatMap(({ file, needles }) => {
      const content = readFileSync(file, "utf8");
      return needles.filter((needle) => content.includes(needle)).map((needle) => `${file}: ${needle}`);
    });

    expect(offenders).toEqual([]);
  });
});
