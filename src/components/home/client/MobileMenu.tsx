import type { Locale } from "@/i18n/config";
import Link from "@/lib/link";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import { getLandingCopy } from "../landingCopy";

interface MobileMenuProps {
  locale?: Locale;
}

export default function MobileMenu({ locale = "en" }: MobileMenuProps) {
  const copy = getLandingCopy(locale).header;

  return (
    <div
      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(320px,calc(100vw-3rem))] rounded-[18px] border border-border bg-background p-5 shadow-lg"
      data-testid="landing-mobile-menu-panel"
    >
      <nav className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        <div className="space-y-2 rounded-[14px] bg-secondary/60 p-4">
          <p className="text-sm font-medium text-foreground">{copy.mobileStudioLabel}</p>
          <a
            href={brand.studioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {copy.mobileStudioLinkLabel}
          </a>
        </div>

        <div className="grid gap-3">
          <Button asChild className="h-11 rounded-[10px]">
            <Link href="/app/dashboard">{copy.openWorkspace}</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-[10px]">
            <Link href="/app/dashboard/templates">{copy.browseTemplates}</Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start rounded-[10px] px-0 text-muted-foreground hover:text-foreground">
            <Link href={`/${locale}`}>{copy.backHome}</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
