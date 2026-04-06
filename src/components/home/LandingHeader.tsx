import { Menu } from "lucide-react";
import Link from "@/lib/link";
import { brand } from "@/config/brand";
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import MobileMenu from "./client/MobileMenu";

interface LandingHeaderProps {
  locale?: string;
}

export default function LandingHeader({
  locale = "en",
}: LandingHeaderProps) {
  return (
    <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          <BrandWordmark localeHref={`/${locale}`} />

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={brand.studioUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="ctikki.com"
            >
              ctikki.com
            </a>
            <LanguageSwitch />
            <ThemeToggle />
            <Button asChild className="h-11 rounded-[10px] px-5">
              <Link href="/app/dashboard">Open Workspace</Link>
            </Button>
          </div>

          <details className="group md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[10px] border border-border bg-background text-foreground transition-colors hover:bg-secondary [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </summary>
            <MobileMenu locale={locale} />
          </details>
        </div>
      </div>
    </header>
  );
}
