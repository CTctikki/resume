import { CheckCircle2, FileOutput, LayoutTemplate, MonitorSmartphone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import Link from "@/lib/link";
import Image from "@/lib/image";
import { Button } from "@/components/ui/button";
import { getLandingCopy } from "./landingCopy";

interface HeroSectionProps {
  locale?: Locale;
}

export default function HeroSection({ locale = "en" }: HeroSectionProps) {
  const content = getLandingCopy(locale).hero;
  const checklistIcons = [MonitorSmartphone, LayoutTemplate, FileOutput];

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
        <div className="flex flex-col justify-center gap-6">
          <span className="inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            {content.badge}
          </span>
          <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {content.title}
          </h1>
          <p className="max-w-[56ch] text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-[10px] px-6">
              <Link href="/app/dashboard">{content.primaryCta}</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-[10px] px-6">
              <Link href="/app/dashboard/templates">{content.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-[18px] border border-border bg-card p-4 shadow-sm">
          <div className="rounded-[14px] border border-border/70 bg-background p-4">
            <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <p className="text-sm font-medium text-foreground">{content.previewTitle}</p>
                <p className="text-sm text-muted-foreground">{content.previewDescription}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {content.exportStatus}
              </span>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-border/70">
              <Image
                src="/web-shot.png"
                alt="CT workspace preview"
                width={1200}
                height={800}
                className="w-full rounded-[12px]"
                priority
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {content.checklist.map((item, index) => {
                const Icon = checklistIcons[index];

                return (
                <div
                  key={item}
                  className="rounded-[12px] border border-border/60 bg-secondary/40 p-3"
                >
                  <Icon className="mb-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
