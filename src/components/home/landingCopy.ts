import { brand } from "@/config/brand";
import { defaultLocale, type Locale } from "@/i18n/config";

const landingCopy = {
  en: {
    header: {
      studioLinkLabel: "ctikki.com",
      openWorkspace: "Open Workspace",
      openMenu: "Open menu",
      mobileStudioLabel: "Studio",
      mobileStudioLinkLabel: "Visit studio site",
      browseTemplates: "Browse Templates",
      backHome: "Back to Home",
    },
    hero: {
      badge: "Local-first resume workspace",
      title: "Build a resume in a focused workspace",
      description:
        "Edit content, preview the page in real time, and export a polished PDF without turning the product into a portfolio-style showcase.",
      primaryCta: "Open Workspace",
      secondaryCta: "Browse Templates",
      previewTitle: "Workspace Preview",
      previewDescription:
        "A calm editing surface for content updates, layout checks, and final export.",
      previewAlt: "CT workspace preview",
      exportStatus: "Ready to export",
      checklist: [
        "Live preview while editing",
        "Template switching without losing content",
        "Reliable PDF export for delivery",
      ],
    },
    features: {
      eyebrow: "Product proof",
      title: "Three things the workspace does well",
      description:
        "The homepage should help you start work quickly, not pull you into a long marketing story.",
      items: [
        {
          title: "Preview and editing stay side by side",
          description:
            "Review spacing, hierarchy, and line breaks as you update content instead of bouncing between separate pages.",
        },
        {
          title: "Local-first content handling",
          description:
            "Your resume data stays close to the workspace, which makes backup, iteration, and private edits easier to manage.",
        },
        {
          title: "Exports are built for handoff",
          description:
            "Generate polished PDFs when the page looks right, with templates that stay oriented around real application delivery.",
        },
      ],
    },
    cta: {
      title: "Start from a template, not a blank page",
      description:
        "Open the workspace directly if you know what you need, or scan a few template directions first and pick the one that fits the role.",
      primaryCta: "Browse Templates",
      secondaryCta: "Open Workspace",
      templates: [
        {
          name: "Professional",
          detail: "Balanced spacing for general applications",
        },
        {
          name: "Compact",
          detail: "Tighter layout for experienced candidates",
        },
        {
          name: "Bilingual",
          detail: "A clear option for cross-language resumes",
        },
      ],
    },
    faq: {
      title: "Common questions before you start",
      items: [
        {
          question: "Can I reuse content across different templates?",
          answer:
            "Yes. The workspace is designed so your resume content can move between template layouts without starting over from scratch.",
        },
        {
          question: "How should I back up my resume data?",
          answer:
            "Because the product is local-first, you can keep your files in your normal backup flow and duplicate them whenever you want a safe restore point.",
        },
        {
          question: "What export format should I expect?",
          answer:
            "The main delivery path is a polished PDF export, which is the most common format for sharing resumes with recruiters and hiring teams.",
        },
        {
          question: "Does it work for iterative edits before final export?",
          answer:
            "That is the main workflow. You can keep refining content and layout in the workspace until the preview looks ready, then export when needed.",
        },
      ],
    },
    footer: {
      description:
        "Local-first editing, live preview, and PDF export in one calm workspace.",
      studioLinkLabel: "Studio site",
    },
  },
  zh: {
    header: {
      studioLinkLabel: "ctikki.com",
      openWorkspace: "打开工作区",
      openMenu: "打开菜单",
      mobileStudioLabel: "工作室",
      mobileStudioLinkLabel: "访问工作室官网",
      browseTemplates: "浏览模板",
      backHome: "返回首页",
    },
    hero: {
      badge: "本地优先的简历工作台",
      title: "在专注的工作区里完成简历",
      description:
        "一边编辑内容，一边实时预览页面，并稳定导出 PDF，让整个流程保持克制、清晰、好交付。",
      primaryCta: "打开工作区",
      secondaryCta: "浏览模板",
      previewTitle: "工作区预览",
      previewDescription: "把编辑、预览和导出放在同一个界面里，减少来回切换。",
      previewAlt: "CT 工作区预览",
      exportStatus: "准备导出",
      checklist: [
        "编辑时实时查看页面效果",
        "切换模板时保留已有内容",
        "稳定导出 PDF 用于投递",
      ],
    },
    features: {
      eyebrow: "产品证明",
      title: "这个工作区重点把三件事做好",
      description: "首页只需要把进入工具前最重要的信息讲清楚，而不是变成一长段营销展示。",
      items: [
        {
          title: "编辑和预览始终放在一起",
          description: "修改内容时同步检查层级、间距和换行，不需要来回切换多个页面。",
        },
        {
          title: "本地优先，便于备份与迭代",
          description: "简历数据贴近你的工作区保存，更适合私密编辑、反复修改和手动备份。",
        },
        {
          title: "导出结果面向实际投递",
          description: "当页面状态确认无误后，稳定生成可交付的 PDF，而不是停留在展示层面。",
        },
      ],
    },
    cta: {
      title: "先从模板开始，而不是面对空白页",
      description:
        "如果你已经准备好内容，可以直接进入工作区；如果还在找方向，就先看几个模板再开始。",
      primaryCta: "浏览模板",
      secondaryCta: "打开工作区",
      templates: [
        {
          name: "Professional",
          detail: "适合大多数岗位投递的稳妥版式",
        },
        {
          name: "Compact",
          detail: "更适合经历较多、信息密度较高的简历",
        },
        {
          name: "Bilingual",
          detail: "适合需要中英文双语呈现的场景",
        },
      ],
    },
    faq: {
      title: "开始之前常见的几个问题",
      items: [
        {
          question: "不同模板之间可以复用同一份内容吗？",
          answer: "可以。工作区的目标之一就是让你在切换版式时继续沿用已有简历内容，而不是重新开始。",
        },
        {
          question: "本地数据应该怎么备份？",
          answer: "因为是本地优先的工作流，你可以把文件放进自己熟悉的备份方案里，也可以在关键节点手动复制一份留档。",
        },
        {
          question: "最终导出的格式是什么？",
          answer: "主要交付格式是 PDF，这也是招聘流程里最稳定、最常见的简历分享方式。",
        },
        {
          question: "适合反复修改后再定稿吗？",
          answer: "这正是它的核心流程。先在工作区里持续调整内容和版式，确认预览满意后再导出。",
        },
      ],
    },
    footer: {
      description: "把本地编辑、实时预览和 PDF 导出放进同一个克制的工作区里。",
      studioLinkLabel: "工作室官网",
    },
  },
} as const;

export function getLandingCopy(locale: Locale = defaultLocale) {
  return landingCopy[locale] ?? landingCopy[defaultLocale];
}

export function getLandingStudioName() {
  return brand.studioName;
}
