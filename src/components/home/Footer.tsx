import type { Locale } from "@/i18n/config";
import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { brand } from "@/config/brand";
import { getLandingCopy, getLandingStudioName } from "./landingCopy";

interface FooterProps {
  locale?: Locale;
}

export default function Footer({ locale = "en" }: FooterProps) {
  const copy = getLandingCopy(locale).footer;

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <BrandWordmark localeHref={`/${locale}`} />
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground md:text-right">
          <p>{getLandingStudioName()}</p>
          <a
            href={brand.studioUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {copy.studioLinkLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
