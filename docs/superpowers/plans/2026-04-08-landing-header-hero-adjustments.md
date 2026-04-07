# Landing Header And Hero Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the landing header and hero so the branding, CTA language, and preview layout are clearer to end users.

**Architecture:** Keep the landing page split across the existing home components, but move the preview layout responsibility into `HeroSection` and make the header branding override explicit in `LandingHeader`. Copy remains centralized in `landingCopy`.

**Tech Stack:** React, TanStack Start, TypeScript, HeroUI, Vitest, Testing Library

---

### Task 1: Lock In Landing Page Expectations

**Files:**
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\test\public\landing-page.test.tsx`

- [ ] **Step 1: Add failing assertions for the new Chinese header and hero copy**

- [ ] **Step 2: Run the landing page test file and confirm the new assertions fail**

Run: `pnpm test src/test/public/landing-page.test.tsx`
Expected: FAIL because the old branding and CTA text are still rendered

### Task 2: Update Landing Copy

**Files:**
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\components\home\landingCopy.ts`

- [ ] **Step 1: Update the landing header, hero badge, and CTA copy**

- [ ] **Step 2: Align lower-page CTA button text with the new action language**

### Task 3: Update Header Branding And Website Action

**Files:**
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\components\home\LandingHeader.tsx`
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\components\home\client\MobileMenu.tsx`
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\components\shared\BrandWordmark.tsx`

- [ ] **Step 1: Add a landing-safe brand title override instead of changing shared branding globally**

- [ ] **Step 2: Replace the plain website link with a clear `前往官网` button**

- [ ] **Step 3: Use `立即使用` anywhere the landing page currently surfaces the “open workspace” action**

### Task 4: Restructure The Hero Preview

**Files:**
- Modify: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\components\home\HeroSection.tsx`

- [ ] **Step 1: Move the preview card onto its own row below the text block**

- [ ] **Step 2: Increase preview width and image prominence so the screenshot is readable**

- [ ] **Step 3: Add a stable DOM hook for the preview block so tests can assert the dedicated-row layout**

### Task 5: Verify

**Files:**
- Test: `C:\Users\Tikki\Desktop\简历编辑器\magic-resume\src\test\public\landing-page.test.tsx`

- [ ] **Step 1: Re-run the landing page test**

Run: `pnpm test src/test/public/landing-page.test.tsx`
Expected: PASS

- [ ] **Step 2: Run a production build**

Run: `pnpm build`
Expected: build completes successfully
