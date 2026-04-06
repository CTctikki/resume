import type { Locale } from "@/i18n/config";
import Link from "@/lib/link";
import { Button } from "@/components/ui/button";
import { getLandingCopy } from "./landingCopy";

interface CTASectionProps {
  locale?: Locale;
}

export default function CTASection({ locale = "en" }: CTASectionProps) {
  const content = getLandingCopy(locale).cta;

  return (
    <section className="border-b border-border/60 bg-secondary/20">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-[10px] px-5">
              <Link href="/app/dashboard/templates">{content.primaryCta}</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-[10px] px-5">
              <Link href="/app/dashboard">{content.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {content.templates.map((template, index) => (
            <article
              key={template.name}
              className="rounded-[18px] border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {template.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {template.detail}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
