import { DatabaseBackup, Eye, FileDown } from "lucide-react";

interface FeaturesSectionProps {
  locale?: string;
}

const copy = {
  en: {
    eyebrow: "Product proof",
    title: "Three things the workspace does well",
    description:
      "The homepage should help you start work quickly, not pull you into a long marketing story.",
    items: [
      {
        icon: Eye,
        title: "Preview and editing stay side by side",
        description:
          "Review spacing, hierarchy, and line breaks as you update content instead of bouncing between separate pages.",
      },
      {
        icon: DatabaseBackup,
        title: "Local-first content handling",
        description:
          "Your resume data stays close to the workspace, which makes backup, iteration, and private edits easier to manage.",
      },
      {
        icon: FileDown,
        title: "Exports are built for handoff",
        description:
          "Generate polished PDFs when the page looks right, with templates that stay oriented around real application delivery.",
      },
    ],
  },
  zh: {
    eyebrow: "产品证明",
    title: "这个工作区重点把三件事做好",
    description: "首页只需要把进入工具前最重要的信息讲清楚，而不是变成一长段营销展示。",
    items: [
      {
        icon: Eye,
        title: "编辑和预览始终放在一起",
        description: "修改内容时同步检查层级、间距和换行，不需要来回切换多个页面。",
      },
      {
        icon: DatabaseBackup,
        title: "本地优先，便于备份与迭代",
        description: "简历数据贴近你的工作区保存，更适合私密编辑、反复修改和手动备份。",
      },
      {
        icon: FileDown,
        title: "导出结果面向实际投递",
        description: "当页面状态确认无误后，稳定生成可交付的 PDF，而不是停留在展示层面。",
      },
    ],
  },
} as const;

export default function FeaturesSection({
  locale = "en",
}: FeaturesSectionProps) {
  const content = locale === "zh" ? copy.zh : copy.en;

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
          {content.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[18px] border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
