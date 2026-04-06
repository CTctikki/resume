import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { brand } from "@/config/brand";

interface FooterProps {
  locale?: string;
}

const copy = {
  en: "Local-first editing, live preview, and PDF export in one calm workspace.",
  zh: "把本地编辑、实时预览和 PDF 导出放进同一个克制的工作区里。",
} as const;

export default function Footer({ locale = "en" }: FooterProps) {
  const description = locale === "zh" ? copy.zh : copy.en;

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <BrandWordmark localeHref={`/${locale}`} />
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground md:text-right">
          <p>CT程序定制工作室</p>
          <a
            href={brand.studioUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Studio site
          </a>
        </div>
      </div>
    </footer>
  );
}
