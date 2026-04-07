import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src", "public"];
const BANNED = [
  "Magic Resume",
  "JOYCEQL",
  "api.magicv.art",
  "magicv.art",
  "magic-resume-theme",
  "Star on GitHub",
  "Smart Resume Creation",
  "Make Resume Creation Simple and Smart",
  "Get Started",
  "免费简历制作",
  "让简历制作变得简单而智能",
  "开始使用"
];
const THIS_TEST = "src/test/brand/no-legacy-branding.test.ts";
const ACTIVE_BRAND_BOUNDARY = [
  {
    file: "src/app/providers.tsx",
    needles: ["magic-resume-theme"]
  },
  {
    file: "src/app/layout.tsx",
    needles: ["magicv.art"]
  },
  {
    file: "src/app/(public)/[locale]/layout.tsx",
    needles: ["magicv.art"]
  },
  {
    file: "src/app/sitemap.ts",
    needles: ["magicv.art"]
  },
  {
    file: "public/robots.txt",
    needles: ["magicv.art"]
  },
  {
    file: "public/sitemap.xml",
    needles: ["magicv.art"]
  }
] as const;
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
const RETIRED_GITHUB_RESIDUE = [
  {
    file: "src/config/initialResumeData.ts",
    needles: ["githubKey", "githubUseName", "githubContributionsVisible"]
  },
  {
    file: "src/app/app/dashboard/resumes/utils.ts",
    needles: ["githubKey", "githubUseName", "githubContributionsVisible"]
  },
  {
    file: "src/types/resume.ts",
    needles: ["githubKey", "githubUseName", "githubContributionsVisible"]
  },
  {
    file: "src/components/shared/GithubContribution.tsx",
    needles: ["githubKey", "GithubContributionsProps"]
  },
  {
    file: "src/i18n/locales/en.json",
    needles: ["githubContributions"]
  },
  {
    file: "src/i18n/locales/zh.json",
    needles: ["githubContributions"]
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
        /\.(ts|tsx|json|css|svg|txt|xml)$/i.test(file) &&
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

  it("removes active brand traces from current provider, metadata, and public surfaces", () => {
    const offenders = ACTIVE_BRAND_BOUNDARY.flatMap(({ file, needles }) => {
      const content = readFileSync(file, "utf8");
      return needles.filter((needle) => content.includes(needle)).map((needle) => `${file}: ${needle}`);
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

  it("removes retired GitHub contribution residue from model and seed files", () => {
    const offenders = RETIRED_GITHUB_RESIDUE.flatMap(({ file, needles }) => {
      const content = readFileSync(file, "utf8");
      return needles.filter((needle) => content.includes(needle)).map((needle) => `${file}: ${needle}`);
    });

    expect(offenders).toEqual([]);
  });
});
