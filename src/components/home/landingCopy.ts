import { brand } from "@/config/brand";
import { defaultLocale, type Locale } from "@/i18n/config";

const landingCopy = {
  en: {
    header: {
      studioLinkLabel: "Visit Website",
      openWorkspace: "Use Now",
      openMenu: "Open menu",
      mobileStudioLabel: "Studio",
      mobileStudioLinkLabel: "Visit Website",
      browseTemplates: "Browse Templates",
      backHome: "Back to Home",
      brandTitle: "CT Program Custom Studio",
    },
    hero: {
      badge: "CT Resume Workspace",
      title: "Make resume creation simple and intelligent",
      description:
        "Use AI to help create a professional resume quickly. No signup required, free to use, and your data stays secure.",
      primaryCta: "Use Now",
      secondaryCta: "Browse Templates",
      previewTitle: "Workspace Preview",
      previewDescription:
        "Edit on the left, review on the right, and export once everything looks correct.",
      previewAlt: "CT workspace preview",
      exportStatus: "Ready to export",
      checklist: [
        "See changes while editing",
        "Switch templates without losing content",
        "Export PDF and keep a JSON backup",
      ],
    },
    features: {
      eyebrow: "Why it works",
      title: "The workspace is built around three priorities",
      description:
        "Help people start fast, judge the result clearly, and export confidently before anything else.",
      items: [
        {
          title: "See the result immediately",
          description:
            "Adjust the content and check spacing, structure, and line breaks without jumping between views.",
        },
        {
          title: "Keep the content safe first",
          description:
            "Resume data stays local, so switching templates, refining sections, and making backups feels safer.",
        },
        {
          title: "Export something you can actually send",
          description:
            "Once the preview looks right, export a polished PDF and keep a JSON copy for backup and reuse.",
        },
      ],
    },
    cta: {
      title: "Start from a template instead of a blank page",
      description:
        "If you already know what you want, jump straight in. If not, pick a template first and shape the content from there.",
      primaryCta: "Browse Templates",
      secondaryCta: "Open Workspace",
      templates: [
        {
          name: "Professional",
          detail: "A stable layout for most applications",
        },
        {
          name: "Compact",
          detail: "A denser layout for content-heavy resumes",
        },
        {
          name: "Bilingual",
          detail: "A clearer structure for Chinese and English content",
        },
      ],
    },
    faq: {
      title: "Questions people ask before starting",
      items: [
        {
          question: "Can I reuse the same content across templates?",
          answer:
            "Yes. Template switching is designed to preserve your existing resume content instead of forcing a restart.",
        },
        {
          question: "How should I back up my resume?",
          answer:
            "Keep your files in your normal backup flow, or export a JSON copy whenever you want a restore point.",
        },
        {
          question: "What format should I expect at the end?",
          answer:
            "PDF is the primary delivery format because it is still the most common format for real job applications.",
        },
        {
          question: "Is it meant for repeated edits before final export?",
          answer:
            "Yes. That is the core workflow: keep refining until the preview looks right, then export when you are ready.",
        },
      ],
    },
    footer: {
      description:
        "Local editing, live preview, and export in one calm workspace.",
      studioLinkLabel: "Studio site",
    },
  },
  zh: {
    header: {
      studioLinkLabel: "前往官网",
      openWorkspace: "立即使用",
      openMenu: "打开菜单",
      mobileStudioLabel: "工作室",
      mobileStudioLinkLabel: "前往官网",
      browseTemplates: "浏览模板",
      backHome: "返回首页",
      brandTitle: "CT程序定制工作室",
    },
    hero: {
      badge: "CT简历工作台",
      title: "让简历制作变得简单而智能",
      description:
        "用 AI 技术，帮助您快速创建专业的简历。无需注册，免费使用，数据安全存储。",
      primaryCta: "立即使用",
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
