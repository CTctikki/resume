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
      title: "在一个工作区里完成简历",
      description:
        "在同一个页面里完成编辑、预览和导出，不用来回切换。内容一改，右侧效果立刻更新。",
      primaryCta: "打开工作区",
      secondaryCta: "浏览模板",
      previewTitle: "工作区预览",
      previewDescription: "左侧编辑，右侧实时预览，确认无误后直接导出。",
      previewAlt: "CT 工作区预览",
      exportStatus: "可随时导出",
      checklist: [
        "编辑时同步查看效果",
        "切换模板不丢内容",
        "支持 PDF 导出和 JSON 备份",
      ],
    },
    features: {
      eyebrow: "为什么这样设计",
      title: "做简历，最重要的是这三件事",
      description: "先让你快速开始、看清效果、顺利导出，其他复杂功能都往后放。",
      items: [
        {
          title: "写了什么，立刻看见",
          description: "修改内容后马上看到排版变化，不用反复切页检查。",
        },
        {
          title: "先保内容，再调样式",
          description: "简历内容保存在本地，换模板、改顺序、继续补充都更安心。",
        },
        {
          title: "导出结果能直接投递",
          description: "确认预览没问题后直接导出 PDF，也能顺手保存 JSON 配置做备份。",
        },
      ],
    },
    cta: {
      title: "先选一个模板，再开始写",
      description: "已经有内容，就直接进入工作区；还没想好排版，就先挑一个模板。",
      primaryCta: "浏览模板",
      secondaryCta: "打开工作区",
      templates: [
        {
          name: "Professional",
          detail: "适合大多数岗位的稳妥版式",
        },
        {
          name: "Compact",
          detail: "适合内容较多、想压缩到一页时使用",
        },
        {
          name: "Bilingual",
          detail: "适合需要中英文双语呈现的简历",
        },
      ],
    },
    faq: {
      title: "开始前常见的几个问题",
      items: [
        {
          question: "不同模板之间可以复用同一份内容吗？",
          answer: "可以。切换模板时会尽量保留已有内容，不需要每次从头重写。",
        },
        {
          question: "本地数据应该怎么备份？",
          answer: "你可以把简历文件放进自己的备份目录，也可以随时导出一份 JSON 配置留档。",
        },
        {
          question: "最终导出的格式是什么？",
          answer: "主要交付格式是 PDF，这也是投递简历时最常见、最稳妥的格式。",
        },
        {
          question: "适合反复修改后再定稿吗？",
          answer: "很适合。你可以一直改到预览满意，再导出最终版本。",
        },
      ],
    },
    footer: {
      description: "本地编辑、实时预览、导出成稿，都在一个工作区里完成。",
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
