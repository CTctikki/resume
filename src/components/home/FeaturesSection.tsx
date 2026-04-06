import { DatabaseBackup, Eye, FileDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getLandingCopy } from "./landingCopy";

interface FeaturesSectionProps {
  locale?: Locale;
}

export default function FeaturesSection({
  locale = "en",
}: FeaturesSectionProps) {
  const content = getLandingCopy(locale).features;
  const icons = [Eye, DatabaseBackup, FileDown];

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = icons[index];

            return (
            <article
              key={item.title}
              className="rounded-[18px] border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {item.description}
              </p>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
