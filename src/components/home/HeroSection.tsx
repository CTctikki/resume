import { CheckCircle2, FileOutput, LayoutTemplate, MonitorSmartphone } from "lucide-react";
import Link from "@/lib/link";
import Image from "@/lib/image";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  locale?: string;
}

const copy = {
  en: {
    badge: "Local-first resume workspace",
    title: "Build a resume in a focused workspace",
    description:
      "Edit content, preview the page in real time, and export a polished PDF without turning the product into a portfolio-style showcase.",
    primaryCta: "Open Workspace",
    secondaryCta: "Browse Templates",
    previewTitle: "Workspace Preview",
    previewDescription:
      "A calm editing surface for content updates, layout checks, and final export.",
    checklist: [
      { icon: MonitorSmartphone, label: "Live preview while editing" },
      { icon: LayoutTemplate, label: "Template switching without losing content" },
      { icon: FileOutput, label: "Reliable PDF export for delivery" },
    ],
  },
  zh: {
    badge: "本地优先的简历工作台",
    title: "在专注的工作区里完成简历",
    description:
      "一边编辑内容，一边实时预览页面，并稳定导出 PDF，让整个流程保持克制、清晰、好交付。",
    primaryCta: "打开工作区",
    secondaryCta: "浏览模板",
    previewTitle: "工作区预览",
    previewDescription: "把编辑、预览和导出放在同一个界面里，减少来回切换。",
    checklist: [
      { icon: MonitorSmartphone, label: "编辑时实时查看页面效果" },
      { icon: LayoutTemplate, label: "切换模板时保留已有内容" },
      { icon: FileOutput, label: "稳定导出 PDF 用于投递" },
    ],
  },
} as const;

export default function HeroSection({ locale = "en" }: HeroSectionProps) {
  const content = locale === "zh" ? copy.zh : copy.en;

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
                Ready to export
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
              {content.checklist.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[12px] border border-border/60 bg-secondary/40 p-3"
                >
                  <item.icon className="mb-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
