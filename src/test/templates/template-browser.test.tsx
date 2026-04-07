import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import * as React from "react";
import type { PropsWithChildren } from "react";

vi.spyOn(React, "useEffect").mockImplementation(() => undefined);
vi.spyOn(React, "useMemo").mockImplementation((factory: () => unknown) => factory());
vi.spyOn(React, "useRef").mockImplementation((value) => ({ current: value }));
vi.spyOn(React, "useState").mockImplementation((initial) => [
  typeof initial === "function" ? (initial as () => unknown)() : initial,
  vi.fn(),
] as const);

const resumeStoreState = vi.hoisted(() => ({
  createResume: vi.fn(() => "resume-1"),
  getState: vi.fn(() => ({
    resumes: {},
    updateResume: vi.fn(),
  })),
}));

vi.mock("@/i18n/compat/client", () => ({
  useLocale: () => "en",
  useTranslations: () => ((key: string) => key),
}));

vi.mock("@/lib/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial: _initial,
      animate: _animate,
      transition: _transition,
      whileHover: _whileHover,
      whileTap: _whileTap,
      layoutId: _layoutId,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock("@/components/templates", () => ({
  default: () => <div data-testid="template-preview" />,
}));

vi.mock("@/store/useResumeStore", () => ({
  useResumeStore: Object.assign(
    (selector?: (state: { createResume: typeof resumeStoreState.createResume }) => unknown) =>
      selector ? selector({ createResume: resumeStoreState.createResume }) : { createResume: resumeStoreState.createResume },
    resumeStoreState
  ),
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: PropsWithChildren) => <>{children}</>,
  DialogContent: ({ children }: PropsWithChildren) => <>{children}</>,
  DialogTitle: ({ children }: PropsWithChildren) => <>{children}</>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  CardFooter: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <button {...props}>{children}</button>
  ),
}));

if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(window, "ResizeObserver", {
    configurable: true,
    writable: true,
    value: ResizeObserver,
  });
}

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
