# CT Resume Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Magic Resume identity and page chrome with the approved CT程序定制工作室 “Precision Workspace” design while preserving the existing resume editing core.

**Architecture:** Keep TanStack Start route registration in `src/routes`, keep page implementations in `src/app/app` and `src/app/(public)`, and move all new branding and wording into a centralized config module. Roll the redesign out in phases: test harness and metadata first, then shared tokens and brand primitives, then public pages, dashboard and workbench shells, template and export/settings pages, and finally a legacy-brand cleanup pass with regression guards.

**Tech Stack:** TanStack Start, React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Vitest, React Testing Library, jsdom

---

## File Structure Map

### Existing files to keep and modify

- `package.json` - add test scripts and UI-redesign verification scripts
- `vite.config.ts` - add Vitest config without disturbing TanStack Start
- `src/routes/__root.tsx` - root `<head>` title and icon wiring
- `src/routes/$locale.tsx` - localized SEO metadata and canonical link generation
- `src/app/manifest.ts` - PWA manifest branding
- `src/app/globals.css` - global surface, color, radius, shadow, and motion tokens
- `src/app/font.css` - product-shell font sources
- `src/theme/themeConfig.ts` - shared runtime color references still used by editor surfaces
- `src/components/home/*` - public homepage sections and navigation
- `src/app/(public)/[locale]/page.tsx` - public homepage composition
- `src/app/app/dashboard/client.tsx` - dashboard shell entry
- `src/app/app/workbench/[id]/page.tsx` - workbench entry layout
- `src/app/app/dashboard/templates/page.tsx` - template browser page
- `src/app/app/dashboard/settings/page.tsx` - settings page
- `src/components/editor/EditorHeader.tsx` - either replaced or slimmed down once the new workbench top bar exists
- `src/components/preview/PreviewDock.tsx` - retired after the new workbench action rail lands
- `src/components/shared/Logo.tsx` - point at CT brand assets and alt text
- `src/components/shared/TemplateSheet.tsx` - align with the new workbench action language
- `src/i18n/locales/en.json` - public and dashboard English copy
- `src/i18n/locales/zh.json` - public and dashboard Chinese copy
- `src/config/constants.ts` - remove legacy repo and service URLs and move brand-sensitive constants out
- `src/config/initialResumeData.ts` - replace legacy sample data and legacy social cues

### New files to create

- `.env.example` - document `VITE_SITE_ORIGIN`
- `public/icon.svg` - CT brand app icon
- `public/logo.svg` - CT brand logo source for the shared `Logo` component
- `src/config/brand.ts` - product name, studio name, CT 官网 URL, SEO copy, and site origin helpers
- `src/config/dashboardNav.ts` - dashboard shell navigation config
- `src/config/templateMetadata.ts` - template tags, use cases, and density and ATS labels
- `src/components/shared/BrandWordmark.tsx` - reusable CT brand lockup
- `src/components/dashboard/AppSidebar.tsx` - dashboard navigation surface
- `src/components/dashboard/DashboardTopBar.tsx` - dashboard page header
- `src/components/workbench/WorkbenchTopBar.tsx` - workbench document header
- `src/components/workbench/WorkbenchActionRail.tsx` - workbench secondary action cluster
- `src/components/templates/TemplateMetadataDrawer.tsx` - template detail drawer
- `src/components/export/ExportMethodCard.tsx` - export page building block
- `src/components/settings/WorkspaceSettingsPanel.tsx` - structured settings sections
- `src/app/app/dashboard/export/page.tsx` - export and share hub
- `src/routes/app/dashboard/export.tsx` - route registration for the export hub
- `src/test/setup.ts` - shared Vitest setup
- `src/test/utils/renderWithProviders.tsx` - locale and provider-aware renderer
- `src/test/brand/brand-config.test.ts` - brand configuration regression test
- `src/test/theme/brand-primitives.test.tsx` - BrandWordmark render smoke test
- `src/test/public/landing-page.test.tsx` - homepage structure and copy regression test
- `src/test/dashboard/dashboard-shell.test.tsx` - dashboard shell regression test
- `src/test/workbench/workbench-shell.test.tsx` - workbench shell regression test
- `src/test/templates/template-browser.test.tsx` - template browser regression test
- `src/test/dashboard/export-settings-pages.test.tsx` - export hub and settings regression test
- `src/test/brand/no-legacy-branding.test.ts` - banned-string guard against source-project branding

### Execution note

- Execute this plan in a fresh worktree before implementation so the redesign can proceed without disturbing unrelated local changes.

## Task 1: Add Test Harness and Central Brand Configuration

**Files:**
- Create: `.env.example`
- Create: `src/config/brand.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/utils/renderWithProviders.tsx`
- Create: `src/test/brand/brand-config.test.ts`
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `src/routes/__root.tsx`
- Modify: `src/routes/$locale.tsx`
- Modify: `src/app/manifest.ts`
- Test: `src/test/brand/brand-config.test.ts`

- [ ] **Step 1: Add Vitest scripts, dependencies, and config scaffolding**

Update `package.json` with test scripts and dev dependencies, then extend `vite.config.ts` with a `test` block:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node server.mjs",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^26.1.0",
    "vitest": "^2.1.8"
  }
}
```

```ts
// vite.config.ts
export default defineConfig({
  // existing config...
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true
  }
});
```

Run: `pnpm install`
Expected: install completes with the new test dependencies available

- [ ] **Step 2: Write the failing brand-configuration test**

Create `src/test/brand/brand-config.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `pnpm test -- src/test/brand/brand-config.test.ts`
Expected: FAIL with an import error for `@/config/brand` or with missing expected values

- [ ] **Step 4: Implement the brand config and wire root metadata to it**

Create `src/config/brand.ts`:

```ts
const fallbackSiteOrigin = "https://resume.ctikki.com";

export const brand = {
  productName: "CT 简历工作台",
  productShortName: "CT Resume",
  studioName: "CT程序定制工作室",
  studioUrl: "https://ctikki.com",
  siteOrigin: import.meta.env.VITE_SITE_ORIGIN ?? fallbackSiteOrigin,
  subtitle: {
    zh: "专业、克制的简历编辑工作台",
    en: "A focused workspace for building polished resumes"
  },
  description: {
    zh: "本地优先、实时预览、稳定导出，适合真实求职场景的简历编辑工具。",
    en: "A local-first resume workspace with live preview and reliable export."
  }
} as const;
```

Create `.env.example`:

```bash
VITE_SITE_ORIGIN=https://resume.ctikki.com
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `src/test/utils/renderWithProviders.tsx`:

```tsx
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { NextIntlClientProvider } from "@/i18n/compat/client";
import { Providers } from "@/app/providers";
import enMessages from "@/i18n/locales/en.json";
import zhMessages from "@/i18n/locales/zh.json";

export function renderWithProviders(
  ui: ReactElement,
  locale: "en" | "zh" = "en"
) {
  const messages = locale === "en" ? enMessages : zhMessages;

  return render(
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Shanghai">
      <Providers>{ui}</Providers>
    </NextIntlClientProvider>
  );
}
```

Update root metadata:

```tsx
// src/routes/__root.tsx
import { brand } from "@/config/brand";

head: () => ({
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: brand.productName }
  ],
  links: [
    { rel: "stylesheet", href: appCss },
    { rel: "stylesheet", href: appFontCss }
  ]
})
```

```tsx
// src/routes/$locale.tsx
import { brand } from "@/config/brand";

const SEO_BASE_URL = brand.siteOrigin;
// use brand.productName, brand.subtitle, brand.description, and brand.siteOrigin
```

```ts
// src/app/manifest.ts
import { brand } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.productName,
    short_name: brand.productShortName,
    description: brand.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7FA",
    theme_color: "#2457F5",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
```

- [ ] **Step 5: Run the new test and a full build**

Run: `pnpm test -- src/test/brand/brand-config.test.ts`
Expected: PASS

Run: `pnpm build`
Expected: PASS with TanStack Start build artifacts and no TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.ts .env.example src/config/brand.ts src/test/setup.ts src/test/utils/renderWithProviders.tsx src/test/brand/brand-config.test.ts src/routes/__root.tsx src/routes/$locale.tsx src/app/manifest.ts
git commit -m "test: add brand config harness"
```

## Task 2: Apply Design Tokens and Shared CT Brand Primitives

**Files:**
- Create: `public/icon.svg`
- Create: `public/logo.svg`
- Create: `src/components/shared/BrandWordmark.tsx`
- Create: `src/test/theme/brand-primitives.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/font.css`
- Modify: `src/theme/themeConfig.ts`
- Modify: `src/components/shared/Logo.tsx`
- Modify: `src/components/ui/button.tsx`
- Test: `src/test/theme/brand-primitives.test.tsx`

- [ ] **Step 1: Write the failing primitive test**

Create `src/test/theme/brand-primitives.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { BrandWordmark } from "@/components/shared/BrandWordmark";

describe("BrandWordmark", () => {
  it("renders the CT product and studio names", () => {
    renderWithProviders(<BrandWordmark showStudio localeHref="/zh" />, "zh");

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the primitive test to verify it fails**

Run: `pnpm test -- src/test/theme/brand-primitives.test.tsx`
Expected: FAIL because `BrandWordmark` does not exist yet

- [ ] **Step 3: Add the CT logo assets and brand primitives**

Create `public/icon.svg`:

```svg
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="28" fill="#2457F5"/>
  <path d="M38 43H88V53H48V64H78V74H48V85H88V95H38V43Z" fill="white"/>
  <path d="M92 43H104V95H92V43Z" fill="#9FB7FF"/>
</svg>
```

Create `public/logo.svg`:

```svg
<svg width="220" height="56" viewBox="0 0 220 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="10" fill="#2457F5"/>
  <path d="M11 14H29V19H16V23.5H26V28.5H16V34H29V39H11V14Z" fill="white"/>
  <path d="M31 14H35V39H31V14Z" fill="#AFC2FF"/>
  <text x="56" y="26" fill="#0F1720" font-family="Arial, sans-serif" font-size="14" font-weight="700">CT Resume Workspace</text>
  <text x="56" y="42" fill="#5F6B7A" font-family="Arial, sans-serif" font-size="11">CT程序定制工作室</text>
</svg>
```

Create `src/components/shared/BrandWordmark.tsx`:

```tsx
import Link from "@/lib/link";
import { brand } from "@/config/brand";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  className?: string;
  localeHref: string;
  showStudio?: boolean;
}

export function BrandWordmark({
  className,
  localeHref,
  showStudio = false
}: BrandWordmarkProps) {
  return (
    <Link
      href={localeHref}
      className={cn("flex items-center gap-3 text-left", className)}
      aria-label={brand.productName}
    >
      <Logo size={40} />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {brand.productName}
        </span>
        {showStudio ? (
          <span className="text-xs text-muted-foreground">{brand.studioName}</span>
        ) : null}
      </span>
    </Link>
  );
}
```

Update `src/components/shared/Logo.tsx`:

```tsx
import { brand } from "@/config/brand";

<Image
  src="/logo.svg"
  alt={`${brand.productName} logo`}
  width={size}
  height={size}
  className={className}
  onClick={onClick}
  priority={size >= 64}
/>
```

- [ ] **Step 4: Move the shell tokens to the CT palette**

Update `src/app/globals.css` and `src/theme/themeConfig.ts` to use the approved palette and tighter workspace-style surfaces:

```css
:root {
  --background: 210 33% 97%;
  --foreground: 215 31% 10%;
  --card: 0 0% 100%;
  --card-foreground: 215 31% 10%;
  --primary: 224 91% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 38% 95%;
  --secondary-foreground: 215 31% 10%;
  --muted: 214 16% 44%;
  --muted-foreground: 214 16% 44%;
  --border: 214 27% 88%;
  --ring: 224 91% 55%;
  --radius: 0.875rem;
}

.dark {
  --background: 218 39% 9%;
  --foreground: 210 25% 93%;
  --card: 217 36% 12%;
  --card-foreground: 210 25% 93%;
  --primary: 223 100% 68%;
  --primary-foreground: 218 39% 9%;
  --secondary: 217 30% 17%;
  --secondary-foreground: 210 25% 93%;
  --muted: 214 16% 67%;
  --muted-foreground: 214 16% 67%;
  --border: 216 29% 24%;
  --ring: 223 100% 68%;
}

body {
  font-family: "MiSans", "IBM Plex Sans", system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: inherit;
}
```

```ts
// src/theme/themeConfig.ts
export const getThemeConfig = () => ({
  bg: "bg-[#F4F7FA] dark:bg-[#0B1220]",
  sidebar: "bg-white dark:bg-[#121A27]",
  text: "text-[#0F1720] dark:text-[#E6ECF3]",
  textSecondary: "text-[#5F6B7A] dark:text-[#AAB6C5]",
  border: "border-[#D9E1EA] dark:border-[#263346]",
  card: "bg-white dark:bg-[#121A27]",
  hover: "hover:bg-[#EEF3F8] dark:hover:bg-[#182232]",
  input: "bg-white border-[#D9E1EA] dark:bg-[#121A27] dark:border-[#263346]",
  button: "bg-white dark:bg-[#121A27]",
  buttonPrimary: "bg-[#2457F5] text-white dark:bg-[#5B82FF] dark:text-[#0B1220]",
  preview: "bg-white dark:bg-[#0F1520]"
});
```

Update the default button shape in `src/components/ui/button.tsx`:

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10"
      }
    }
  }
);
```

- [ ] **Step 5: Run the primitive test and a build**

Run: `pnpm test -- src/test/theme/brand-primitives.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the new SVG icon paths and global token updates

- [ ] **Step 6: Commit**

```bash
git add public/icon.svg public/logo.svg src/components/shared/BrandWordmark.tsx src/components/shared/Logo.tsx src/test/theme/brand-primitives.test.tsx src/app/globals.css src/app/font.css src/theme/themeConfig.ts src/components/ui/button.tsx
git commit -m "feat: add CT brand primitives and tokens"
```

## Task 3: Redesign the Public Homepage Into a Tool Entry Page

**Files:**
- Create: `src/test/public/landing-page.test.tsx`
- Modify: `src/app/(public)/[locale]/page.tsx`
- Modify: `src/components/home/LandingHeader.tsx`
- Modify: `src/components/home/client/MobileMenu.tsx`
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/FeaturesSection.tsx`
- Modify: `src/components/home/CTASection.tsx`
- Modify: `src/components/home/FAQSection.tsx`
- Modify: `src/components/home/Footer.tsx`
- Test: `src/test/public/landing-page.test.tsx`

- [ ] **Step 1: Write the failing homepage regression test**

Create `src/test/public/landing-page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import LandingPage from "@/app/(public)/[locale]/page";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

describe("LandingPage", () => {
  it("shows CT branding and no GitHub star CTA", () => {
    renderWithProviders(<LandingPage />, "en");

    expect(
      screen.getByRole("heading", { name: /build a resume in a focused workspace/i })
    ).toBeInTheDocument();
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
    expect(screen.queryByText(/star on github/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the homepage test to verify it fails**

Run: `pnpm test -- src/test/public/landing-page.test.tsx`
Expected: FAIL because the current page still renders Magic Resume copy and the GitHub star button

- [ ] **Step 3: Replace the header, mobile menu, and hero composition**

Update `src/components/home/LandingHeader.tsx`:

```tsx
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { brand } from "@/config/brand";

<div className="mx-auto max-w-[1240px] px-6">
  <div className="flex h-18 items-center justify-between border-b border-border/60">
    <BrandWordmark localeHref={`/${locale}`} />
    <div className="hidden md:flex items-center gap-3">
      <a
        href={brand.studioUrl}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ctikki.com
      </a>
      <LanguageSwitch />
      <ThemeToggle />
      <GoDashboard>
        <Button className="h-11 rounded-[10px] px-5">Open Workspace</Button>
      </GoDashboard>
    </div>
  </div>
</div>
```

Update `src/components/home/client/MobileMenu.tsx` to remove `GitHubStars` and add the studio link:

```tsx
<div className="flex items-center justify-center gap-6">
  <LanguageSwitch />
  <ThemeToggle />
  <a
    href="https://ctikki.com"
    target="_blank"
    rel="noreferrer"
    className="text-sm text-muted-foreground"
  >
    ctikki.com
  </a>
</div>
```

Update `src/components/home/HeroSection.tsx` to a split utility layout:

```tsx
<section className="border-b border-border/60 bg-background">
  <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_560px]">
    <div className="flex flex-col justify-center gap-6">
      <span className="inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
        Local-first resume workspace
      </span>
      <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-foreground">
        Build a resume in a focused workspace
      </h1>
      <p className="max-w-[56ch] text-lg leading-8 text-muted-foreground">
        Edit content, preview the page in real time, and export a polished PDF without
        turning the product into a portfolio-style showcase.
      </p>
      <div className="flex flex-wrap gap-3">
        <GoDashboard>
          <Button className="h-12 rounded-[10px] px-6">Open Workspace</Button>
        </GoDashboard>
        <GoDashboard type="templates">
          <Button variant="outline" className="h-12 rounded-[10px] px-6">
            Browse Templates
          </Button>
        </GoDashboard>
      </div>
    </div>
    <div className="rounded-[18px] border border-border bg-card p-4 shadow-sm">
      <Image src="/web-shot.png" alt="CT workspace preview" width={1200} height={800} className="rounded-[12px]" />
    </div>
  </div>
</section>
```

- [ ] **Step 4: Rework the supporting sections and restore a real footer**

Update `src/components/home/FeaturesSection.tsx` into a three-card proof grid:

```tsx
const proofItems = [
  { title: "Live preview", body: "See exactly how layout decisions affect the final page." },
  { title: "Reliable export", body: "Keep print, PDF, and backup options close to the editing flow." },
  { title: "Local-first privacy", body: "Store and back up resume data without turning the product into a cloud-first funnel." }
];
```

Update `src/components/home/CTASection.tsx` into a restrained template-preview strip instead of a giant marketing CTA:

```tsx
<section className="border-t border-border/60 bg-card">
  <div className="mx-auto max-w-[1240px] px-6 py-16">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Choose a layout that fits the job</h2>
        <p className="mt-2 text-sm text-muted-foreground">Balanced, ATS-friendly, and presentation-forward options.</p>
      </div>
      <GoDashboard type="templates">
        <Button variant="outline" className="h-10 rounded-[10px]">See all templates</Button>
      </GoDashboard>
    </div>
  </div>
</section>
```

Update `src/components/home/FAQSection.tsx` to emphasize compatibility, backup, and export help rather than product storytelling, and restore `Footer` in `src/app/(public)/[locale]/page.tsx`:

```tsx
return (
  <div className="min-h-screen bg-background">
    <LandingHeader />
    <HeroSection />
    <FeaturesSection />
    <CTASection />
    <FAQSection />
    <Footer />
  </div>
);
```

Update `src/components/home/Footer.tsx`:

```tsx
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { brand } from "@/config/brand";

<footer className="border-t border-border/60 bg-card">
  <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
    <BrandWordmark localeHref="/zh" showStudio />
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <a href={brand.studioUrl} target="_blank" rel="noreferrer">ctikki.com</a>
      <span>Maintained by {brand.studioName}</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 5: Run the homepage test and a build**

Run: `pnpm test -- src/test/public/landing-page.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the new public homepage composition

- [ ] **Step 6: Commit**

```bash
git add src/app/(public)/[locale]/page.tsx src/components/home/LandingHeader.tsx src/components/home/client/MobileMenu.tsx src/components/home/HeroSection.tsx src/components/home/FeaturesSection.tsx src/components/home/CTASection.tsx src/components/home/FAQSection.tsx src/components/home/Footer.tsx src/test/public/landing-page.test.tsx
git commit -m "feat: redesign public landing experience"
```

## Task 4: Rebuild the Dashboard Shell Around a CT Workspace Chrome

**Files:**
- Create: `src/config/dashboardNav.ts`
- Create: `src/components/dashboard/AppSidebar.tsx`
- Create: `src/components/dashboard/DashboardTopBar.tsx`
- Create: `src/test/dashboard/dashboard-shell.test.tsx`
- Modify: `src/app/app/dashboard/client.tsx`
- Test: `src/test/dashboard/dashboard-shell.test.tsx`

- [ ] **Step 1: Write the failing dashboard-shell test**

Create `src/test/dashboard/dashboard-shell.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { dashboardNav } from "@/config/dashboardNav";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

describe("AppSidebar", () => {
  it("shows the CT workspace brand and dashboard sections", () => {
    renderWithProviders(
      <AppSidebar items={dashboardNav} currentPath="/app/dashboard/resumes" expanded />,
      "en"
    );

    expect(screen.getByText("CT 简历工作台")).toBeInTheDocument();
    expect(screen.getByText(/resumes/i)).toBeInTheDocument();
    expect(screen.getByText(/templates/i)).toBeInTheDocument();
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the dashboard-shell test to verify it fails**

Run: `pnpm test -- src/test/dashboard/dashboard-shell.test.tsx`
Expected: FAIL because `AppSidebar` and `dashboardNav` do not exist yet

- [ ] **Step 3: Extract the navigation config and create the new sidebar**

Create `src/config/dashboardNav.ts`:

```ts
import { IconAI, IconResumes, IconSettings, IconTemplates } from "@/components/shared/icons/SidebarIcons";

export const dashboardNav = [
  { id: "resumes", href: "/app/dashboard/resumes", labelKey: "dashboard.sidebar.resumes", icon: IconResumes },
  { id: "templates", href: "/app/dashboard/templates", labelKey: "dashboard.sidebar.templates", icon: IconTemplates },
  { id: "ai", href: "/app/dashboard/ai", labelKey: "dashboard.sidebar.ai", icon: IconAI },
  { id: "settings", href: "/app/dashboard/settings", labelKey: "dashboard.sidebar.settings", icon: IconSettings }
] as const;
```

Create `src/components/dashboard/AppSidebar.tsx`:

```tsx
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { useTranslations, useLocale } from "@/i18n/compat/client";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  items: readonly { id: string; href: string; labelKey: string; icon: any }[];
  currentPath: string;
  expanded: boolean;
  onNavigate?: (href: string) => void;
}

export function AppSidebar({ items, currentPath, expanded, onNavigate }: AppSidebarProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-card">
      <div className="border-b border-border/60 px-4 py-4">
        <BrandWordmark localeHref={`/${locale}`} showStudio={expanded} />
      </div>
      <nav className="flex-1 px-3 py-4">
        {items.map((item) => {
          const active = currentPath === item.href;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.href)}
              className={cn(
                "mb-1 flex h-11 w-full items-center gap-3 rounded-[12px] px-3 text-sm",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} active={active} />
              {expanded ? <span>{t(item.labelKey)}</span> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 4: Add a slim dashboard top bar and wire the shell**

Create `src/components/dashboard/DashboardTopBar.tsx`:

```tsx
import { brand } from "@/config/brand";

interface DashboardTopBarProps {
  title: string;
  subtitle?: string;
}

export function DashboardTopBar({ title, subtitle }: DashboardTopBarProps) {
  return (
    <header className="border-b border-border/60 bg-background px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <a href={brand.studioUrl} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
          ctikki.com
        </a>
      </div>
    </header>
  );
}
```

Update `src/app/app/dashboard/client.tsx`:

```tsx
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { dashboardNav } from "@/config/dashboardNav";

<div className="flex h-screen bg-background text-foreground">
  <SidebarProvider open={open} onOpenChange={setOpen}>
    <Sidebar collapsible={collapsible} className="border-r border-border bg-card">
      <AppSidebar
        items={dashboardNav}
        currentPath={pathname}
        expanded={open}
        onNavigate={(href) => router.push(href)}
      />
    </Sidebar>
    <main className="flex min-w-0 flex-1 flex-col">
      <DashboardTopBar title={t("dashboard.sidebar.appName")} subtitle={t("common.subtitle")} />
      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  </SidebarProvider>
</div>
```

- [ ] **Step 5: Run the dashboard-shell test and a build**

Run: `pnpm test -- src/test/dashboard/dashboard-shell.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the new dashboard shell

- [ ] **Step 6: Commit**

```bash
git add src/config/dashboardNav.ts src/components/dashboard/AppSidebar.tsx src/components/dashboard/DashboardTopBar.tsx src/app/app/dashboard/client.tsx src/test/dashboard/dashboard-shell.test.tsx
git commit -m "feat: rebuild dashboard chrome"
```

## Task 5: Replace the Workbench Header and Floating Dock With a Structured Workspace Shell

**Files:**
- Create: `src/components/workbench/WorkbenchTopBar.tsx`
- Create: `src/components/workbench/WorkbenchActionRail.tsx`
- Create: `src/test/workbench/workbench-shell.test.tsx`
- Modify: `src/app/app/workbench/[id]/page.tsx`
- Modify: `src/components/editor/EditorHeader.tsx`
- Modify: `src/components/shared/TemplateSheet.tsx`
- Modify: `src/components/preview/PreviewDock.tsx`
- Test: `src/test/workbench/workbench-shell.test.tsx`

- [ ] **Step 1: Write the failing workbench-shell test**

Create `src/test/workbench/workbench-shell.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { WorkbenchTopBar } from "@/components/workbench/WorkbenchTopBar";
import { WorkbenchActionRail } from "@/components/workbench/WorkbenchActionRail";

describe("workbench shell", () => {
  it("shows workspace actions without GitHub branding", () => {
    renderWithProviders(
      <>
        <WorkbenchTopBar
          title="Backend Engineer Resume"
          onTitleBlur={vi.fn()}
          onBack={vi.fn()}
          onOpenTemplates={vi.fn()}
          onOpenExport={vi.fn()}
        />
        <WorkbenchActionRail
          sidePanelCollapsed={false}
          editPanelCollapsed={false}
          previewPanelCollapsed={false}
          onToggleSidePanel={vi.fn()}
          onToggleEditPanel={vi.fn()}
          onTogglePreviewPanel={vi.fn()}
          onOpenTemplates={vi.fn()}
          onOpenExport={vi.fn()}
          onAutoFit={vi.fn()}
        />
      </>,
      "en"
    );

    expect(screen.getByDisplayValue("Backend Engineer Resume")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the workbench-shell test to verify it fails**

Run: `pnpm test -- src/test/workbench/workbench-shell.test.tsx`
Expected: FAIL because `WorkbenchTopBar` and `WorkbenchActionRail` do not exist yet

- [ ] **Step 3: Create the new top bar and action rail components**

Create `src/components/workbench/WorkbenchTopBar.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, LayoutTemplate } from "lucide-react";

interface WorkbenchTopBarProps {
  title: string;
  onTitleBlur: (value: string) => void;
  onBack: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
}

export function WorkbenchTopBar({
  title,
  onTitleBlur,
  onBack,
  onOpenTemplates,
  onOpenExport
}: WorkbenchTopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Back to dashboard" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Input defaultValue={title} onBlur={(e) => onTitleBlur(e.target.value)} className="w-[320px]" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onOpenTemplates}>
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Button>
          <Button onClick={onOpenExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
```

Create `src/components/workbench/WorkbenchActionRail.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Eye, FileText, PanelLeft, SlidersHorizontal } from "lucide-react";

interface WorkbenchActionRailProps {
  sidePanelCollapsed: boolean;
  editPanelCollapsed: boolean;
  previewPanelCollapsed: boolean;
  onToggleSidePanel: () => void;
  onToggleEditPanel: () => void;
  onTogglePreviewPanel: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onAutoFit: () => void;
}

export function WorkbenchActionRail(props: WorkbenchActionRailProps) {
  return (
    <aside className="fixed right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 rounded-[16px] border border-border bg-card p-2 shadow-sm">
      <Button variant="ghost" size="icon" aria-label="Toggle sections" onClick={props.onToggleSidePanel}>
        <PanelLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Toggle editor" onClick={props.onToggleEditPanel}>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Toggle preview" onClick={props.onTogglePreviewPanel}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Auto fit page" onClick={props.onAutoFit}>
        <FileText className="h-4 w-4" />
      </Button>
    </aside>
  );
}
```

- [ ] **Step 4: Wire the workbench entry page to the new shell and retire GitHub-heavy controls**

Update `src/app/app/workbench/[id]/page.tsx` so the main shell renders `WorkbenchTopBar` and `WorkbenchActionRail` instead of relying on `EditorHeader` and `PreviewDock` as the only chrome:

```tsx
<main className="min-h-screen overflow-hidden bg-background text-foreground">
  <WorkbenchTopBar
    title={activeResume?.title ?? ""}
    onTitleBlur={(value) => updateResumeTitle(value || "Untitled Resume")}
    onBack={() => router.push("/app/dashboard/resumes")}
    onOpenTemplates={() => setTemplateSheetOpen(true)}
    onOpenExport={() => router.push("/app/dashboard/export")}
  />
  <div className="hidden h-[calc(100vh-72px)] md:block">
    {/* existing resizable panel group stays here */}
  </div>
  <WorkbenchActionRail
    sidePanelCollapsed={sidePanelCollapsed}
    editPanelCollapsed={editPanelCollapsed}
    previewPanelCollapsed={previewPanelCollapsed}
    onToggleSidePanel={toggleSidePanel}
    onToggleEditPanel={toggleEditPanel}
    onTogglePreviewPanel={togglePreviewPanel}
    onOpenTemplates={() => setTemplateSheetOpen(true)}
    onOpenExport={() => router.push("/app/dashboard/export")}
    onAutoFit={() => updateGlobalSettings({ autoOnePage: !globalSettings?.autoOnePage })}
  />
</main>
```

Update `src/components/preview/PreviewDock.tsx` to either export a thin wrapper around `WorkbenchActionRail` or remove the GitHub button and route the remaining actions through the new rail. The end state must remove this block:

```tsx
<DockIcon>
  <Tooltip>
    <TooltipTrigger asChild>
      <button onClick={handleGoGitHub}>...</button>
    </TooltipTrigger>
  </Tooltip>
</DockIcon>
```

Update `src/components/shared/TemplateSheet.tsx` so the trigger button works cleanly with the new top bar and action rail rather than looking like a floating novelty control.

- [ ] **Step 5: Run the workbench-shell test and a build**

Run: `pnpm test -- src/test/workbench/workbench-shell.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the new workbench shell wired in

- [ ] **Step 6: Commit**

```bash
git add src/components/workbench/WorkbenchTopBar.tsx src/components/workbench/WorkbenchActionRail.tsx src/app/app/workbench/[id]/page.tsx src/components/editor/EditorHeader.tsx src/components/shared/TemplateSheet.tsx src/components/preview/PreviewDock.tsx src/test/workbench/workbench-shell.test.tsx
git commit -m "feat: redesign workbench shell"
```

## Task 6: Redesign the Template Browser Around Suitability and Metadata

**Files:**
- Create: `src/config/templateMetadata.ts`
- Create: `src/components/templates/TemplateMetadataDrawer.tsx`
- Create: `src/test/templates/template-browser.test.tsx`
- Modify: `src/app/app/dashboard/templates/page.tsx`
- Test: `src/test/templates/template-browser.test.tsx`

- [ ] **Step 1: Write the failing template-browser test**

Create `src/test/templates/template-browser.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import TemplatesPage from "@/app/app/dashboard/templates/page";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

describe("TemplatesPage", () => {
  it("shows usage metadata instead of only decorative template cards", () => {
    renderWithProviders(<TemplatesPage />, "en");

    expect(screen.getByText(/ATS-friendly/i)).toBeInTheDocument();
    expect(screen.getByText(/balanced/i)).toBeInTheDocument();
    expect(screen.getByText(/ideal for/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the template-browser test to verify it fails**

Run: `pnpm test -- src/test/templates/template-browser.test.tsx`
Expected: FAIL because no metadata tags or “ideal for” content exist yet

- [ ] **Step 3: Add structured template metadata**

Create `src/config/templateMetadata.ts`:

```ts
export const templateMetadata = {
  classic: {
    tags: ["ATS-friendly", "formal", "balanced"],
    idealFor: "General applications and conservative hiring flows",
    density: "Medium"
  },
  modern: {
    tags: ["two-column", "portfolio-ready", "compact"],
    idealFor: "Product, design, and engineering roles with denser content",
    density: "High"
  },
  timeline: {
    tags: ["chronological", "experience-led", "formal"],
    idealFor: "Candidates with a clear linear work history",
    density: "Medium"
  }
} as const;
```

Create `src/components/templates/TemplateMetadataDrawer.tsx`:

```tsx
import { Button } from "@/components/ui/button";

interface TemplateMetadataDrawerProps {
  open: boolean;
  title: string;
  description: string;
  tags: string[];
  idealFor: string;
  density: string;
  onUse: () => void;
}

export function TemplateMetadataDrawer(props: TemplateMetadataDrawerProps) {
  if (!props.open) return null;

  return (
    <aside className="rounded-[18px] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground">{props.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{props.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {props.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-foreground"><strong>Ideal for:</strong> {props.idealFor}</p>
      <p className="mt-1 text-sm text-foreground"><strong>Density:</strong> {props.density}</p>
      <Button className="mt-6 w-full" onClick={props.onUse}>Use this template</Button>
    </aside>
  );
}
```

- [ ] **Step 4: Update the templates page layout to use metadata-driven selection**

Update `src/app/app/dashboard/templates/page.tsx` so the page has:

```tsx
import { templateMetadata } from "@/config/templateMetadata";
import { TemplateMetadataDrawer } from "@/components/templates/TemplateMetadataDrawer";

<div className="mx-auto max-w-[1600px] px-6 py-8">
  <div className="mb-8 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-3xl font-semibold text-foreground">{t("title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Compare density, ATS friendliness, and use cases before starting.
      </p>
    </div>
  </div>

  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
      {/* existing preview cards, now with tag chips injected from templateMetadata */}
    </div>
    <TemplateMetadataDrawer
      open={!!activePreviewTemplate}
      title={t(`${getTemplateKey(activePreviewTemplate.id)}.name`)}
      description={t(`${getTemplateKey(activePreviewTemplate.id)}.description`)}
      tags={templateMetadata[getTemplateKey(activePreviewTemplate.id)]?.tags ?? []}
      idealFor={templateMetadata[getTemplateKey(activePreviewTemplate.id)]?.idealFor ?? ""}
      density={templateMetadata[getTemplateKey(activePreviewTemplate.id)]?.density ?? ""}
      onUse={() => handleCreateResume(activePreviewTemplate.id)}
    />
  </div>
</div>
```

- [ ] **Step 5: Run the template-browser test and a build**

Run: `pnpm test -- src/test/templates/template-browser.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the metadata-driven template browser

- [ ] **Step 6: Commit**

```bash
git add src/config/templateMetadata.ts src/components/templates/TemplateMetadataDrawer.tsx src/app/app/dashboard/templates/page.tsx src/test/templates/template-browser.test.tsx
git commit -m "feat: redesign template browser"
```

## Task 7: Add an Export Hub and Reframe Settings as Workspace Preferences

**Files:**
- Create: `src/app/app/dashboard/export/page.tsx`
- Create: `src/routes/app/dashboard/export.tsx`
- Create: `src/components/export/ExportMethodCard.tsx`
- Create: `src/components/settings/WorkspaceSettingsPanel.tsx`
- Create: `src/test/dashboard/export-settings-pages.test.tsx`
- Modify: `src/config/dashboardNav.ts`
- Modify: `src/app/app/dashboard/settings/page.tsx`
- Test: `src/test/dashboard/export-settings-pages.test.tsx`

- [ ] **Step 1: Write the failing export/settings test**

Create `src/test/dashboard/export-settings-pages.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import ExportPage from "@/app/app/dashboard/export/page";
import SettingsPage from "@/app/app/dashboard/settings/page";
import { renderWithProviders } from "@/test/utils/renderWithProviders";

describe("dashboard support pages", () => {
  it("shows the export hub and CT about panel", () => {
    renderWithProviders(<ExportPage />, "en");
    expect(screen.getByRole("heading", { name: /export and share/i })).toBeInTheDocument();

    renderWithProviders(<SettingsPage />, "en");
    expect(screen.getByText("CT程序定制工作室")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ctikki\.com/i })).toHaveAttribute(
      "href",
      "https://ctikki.com"
    );
  });
});
```

- [ ] **Step 2: Run the export/settings test to verify it fails**

Run: `pnpm test -- src/test/dashboard/export-settings-pages.test.tsx`
Expected: FAIL because the export page route and CT about panel do not exist yet

- [ ] **Step 3: Create the export hub route and shared card component**

Create `src/routes/app/dashboard/export.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import ExportPage from "@/app/app/dashboard/export/page";

export const Route = createFileRoute("/app/dashboard/export")({
  component: ExportPage
});
```

Create `src/components/export/ExportMethodCard.tsx`:

```tsx
import { Button } from "@/components/ui/button";

interface ExportMethodCardProps {
  title: string;
  description: string;
  onClick: () => void;
  actionLabel: string;
}

export function ExportMethodCard({
  title,
  description,
  onClick,
  actionLabel
}: ExportMethodCardProps) {
  return (
    <section className="rounded-[18px] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <Button className="mt-4" onClick={onClick}>{actionLabel}</Button>
    </section>
  );
}
```

Create `src/app/app/dashboard/export/page.tsx`:

```tsx
import { ExportMethodCard } from "@/components/export/ExportMethodCard";

export default function ExportPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">Export and Share</h2>
      <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted-foreground">
        Choose the output method that best matches formal submission, print fallback, or local backup.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ExportMethodCard title="PDF export" description="Use the high-fidelity export flow for a polished final PDF." actionLabel="Export PDF" onClick={() => {}} />
        <ExportMethodCard title="Browser print" description="Use the browser print dialog when you need a local fallback." actionLabel="Open print dialog" onClick={() => {}} />
        <ExportMethodCard title="JSON backup" description="Save a local snapshot of your data for backup and later import." actionLabel="Download JSON" onClick={() => {}} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Restructure settings into workspace sections and add the CT about block**

Update `src/config/dashboardNav.ts` to include the new export route:

```ts
{ id: "export", href: "/app/dashboard/export", labelKey: "dashboard.sidebar.export", icon: IconExport }
```

Create `src/components/settings/WorkspaceSettingsPanel.tsx`:

```tsx
import { brand } from "@/config/brand";

export function WorkspaceSettingsPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="rounded-[18px] border border-border bg-card p-4">
        <div className="space-y-2 text-sm">
          <p className="font-medium text-foreground">General</p>
          <p className="text-muted-foreground">Backup and sync</p>
          <p className="text-muted-foreground">AI providers</p>
          <p className="text-muted-foreground">About this version</p>
        </div>
      </aside>
      <section className="space-y-6">
        <div className="rounded-[18px] border border-border bg-card p-5">
          <h3 className="text-lg font-semibold text-foreground">About this version</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {brand.productName} is maintained by {brand.studioName}.
          </p>
          <a href={brand.studioUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-primary">
            ctikki.com
          </a>
        </div>
      </section>
    </div>
  );
}
```

Update `src/app/app/dashboard/settings/page.tsx`:

```tsx
import { WorkspaceSettingsPanel } from "@/components/settings/WorkspaceSettingsPanel";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">Workspace Settings</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage backup, defaults, AI providers, and version information.
      </p>
      <div className="mt-8">
        <WorkspaceSettingsPanel />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run the export/settings test and a build**

Run: `pnpm test -- src/test/dashboard/export-settings-pages.test.tsx`
Expected: PASS

Run: `pnpm build`
Expected: PASS with the export route added to the dashboard shell

- [ ] **Step 6: Commit**

```bash
git add src/routes/app/dashboard/export.tsx src/app/app/dashboard/export/page.tsx src/components/export/ExportMethodCard.tsx src/components/settings/WorkspaceSettingsPanel.tsx src/config/dashboardNav.ts src/app/app/dashboard/settings/page.tsx src/test/dashboard/export-settings-pages.test.tsx
git commit -m "feat: add export hub and workspace settings"
```

## Task 8: Remove Legacy Brand Traces, Replace Sample Data, and Add a Guard Test

**Files:**
- Create: `src/test/brand/no-legacy-branding.test.ts`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/zh.json`
- Modify: `src/config/constants.ts`
- Modify: `src/config/initialResumeData.ts`
- Modify: `src/components/shared/GitHubStars.tsx`
- Modify: `src/components/shared/GithubContribution.tsx`
- Test: `src/test/brand/no-legacy-branding.test.ts`

- [ ] **Step 1: Write the failing legacy-brand guard**

Create `src/test/brand/no-legacy-branding.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src", "public"];
const BANNED = ["Magic Resume", "JOYCEQL", "api.magicv.art", "Star on GitHub"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return [full];
  });
}

describe("legacy brand guard", () => {
  it("removes source-project product strings from app code", () => {
    const files = ROOTS.flatMap((root) => walk(root)).filter((file) =>
      /\.(ts|tsx|json|css|svg)$/i.test(file)
    );

    const offenders = files.flatMap((file) => {
      const content = readFileSync(file, "utf8");
      return BANNED.filter((needle) => content.includes(needle)).map((needle) => `${file}: ${needle}`);
    });

    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the guard to verify it fails**

Run: `pnpm test -- src/test/brand/no-legacy-branding.test.ts`
Expected: FAIL with matches in `src/i18n/locales/*`, `src/config/constants.ts`, and remaining GitHub helpers

- [ ] **Step 3: Rewrite localized copy and remove legacy service constants**

Update the localized product copy in `src/i18n/locales/en.json` and `src/i18n/locales/zh.json`:

```json
{
  "common": {
    "title": "CT 简历工作台",
    "subtitle": "Focused Resume Workspace"
  },
  "home": {
    "header": {
      "title": "CT 简历工作台",
      "startButton": "Open Workspace"
    },
    "hero": {
      "title": "Build a resume in a focused workspace",
      "subtitle": "Local-first editing, real-time preview, and reliable export for real job applications."
    }
  },
  "dashboard": {
    "sidebar": {
      "appName": "CT 简历工作台",
      "export": "Export"
    }
  }
}
```

Update `src/config/constants.ts`:

```ts
export const PDF_EXPORT_CONFIG = {
  SERVER_URL: import.meta.env.VITE_PDF_EXPORT_URL ?? "",
  TIMEOUT: 45000,
  MAX_RETRY: 2,
  MAX_CONTENT_SIZE: 5 * 1024 * 1024
} as const;
```

- [ ] **Step 4: Replace sample resume data and retire GitHub-first components**

Update `src/config/initialResumeData.ts` with neutral, friend-facing sample data:

```ts
export const initialResumeStateEn = {
  title: "New Resume",
  basic: {
    name: "Alex Chen",
    title: "Full-Stack Engineer",
    employementStatus: "Open to work",
    email: "alex.chen@example.com",
    phone: "(555) 240-7788",
    location: "Shanghai, CN"
  },
  experience: [
    {
      id: "1",
      company: "North Harbor Systems",
      position: "Full-Stack Engineer",
      date: "2022.03 - Present",
      visible: true,
      details: "<ul><li>Built internal tools for operations teams and reduced manual workflow steps by 35%.</li></ul>"
    }
  ]
};
```

Retire `src/components/shared/GitHubStars.tsx` and `src/components/shared/GithubContribution.tsx` by either deleting them or replacing their exports with no-op components that are never imported:

```tsx
export function GitHubStars() {
  return null;
}
```

```tsx
const GithubContributions = () => null;
export default GithubContributions;
```

- [ ] **Step 5: Run the full test suite and build**

Run: `pnpm test`
Expected: PASS across brand, theme, landing, dashboard, workbench, template, export/settings, and legacy-brand tests

Run: `pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n/locales/en.json src/i18n/locales/zh.json src/config/constants.ts src/config/initialResumeData.ts src/components/shared/GitHubStars.tsx src/components/shared/GithubContribution.tsx src/test/brand/no-legacy-branding.test.ts
git commit -m "refactor: remove legacy branding and sample data"
```

## Self-Review

### 1. Spec coverage

- Brand identity, metadata, and CT integration are covered by Tasks 1, 2, and 8.
- Design system changes for color, type, radius, motion direction, and brand primitives are covered by Task 2.
- Homepage and tool-entry redesign are covered by Task 3.
- Dashboard shell and main editor chrome are covered by Tasks 4 and 5.
- Template selection redesign is covered by Task 6.
- Export/share and settings redesign are covered by Task 7.
- “Avoid source-project brand confusion” is explicitly enforced by Task 8’s banned-string regression guard.

No spec requirement is left without a corresponding task.

### 2. Incomplete-instruction scan

- No unfinished markers or deferred-instruction phrases remain.
- Each task includes exact file paths, concrete commands, and concrete code snippets.
- The only deferred item is “Optional future share link capability if product scope expands,” which is intentionally scoped as non-blocking copy in the export page and not required for this implementation pass.

### 3. Type and naming consistency

- Shared identity uses `brand` from `src/config/brand.ts` everywhere.
- Dashboard shell uses `dashboardNav` consistently.
- Workbench shell consistently uses `WorkbenchTopBar` and `WorkbenchActionRail`.
- Template details use `templateMetadata` and `TemplateMetadataDrawer`.
- Tests all rely on `renderWithProviders` from `src/test/utils/renderWithProviders.tsx`.
