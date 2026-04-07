export const templateMetadata = {
  en: {
    classic: {
      tags: ["ATS-friendly", "formal", "balanced"],
      idealFor: "General applications and conservative hiring flows",
      density: "Medium",
    },
    modern: {
      tags: ["two-column", "portfolio-ready", "compact"],
      idealFor: "Product, design, and engineering roles with denser content",
      density: "High",
    },
    leftRight: {
      tags: ["split-layout", "balanced", "content-dense"],
      idealFor: "People who want a structured two-zone layout with clear hierarchy",
      density: "High",
    },
    timeline: {
      tags: ["chronological", "experience-led", "formal"],
      idealFor: "Candidates with a clear linear work history",
      density: "Medium",
    },
    minimalist: {
      tags: ["ATS-friendly", "airy", "low-distraction"],
      idealFor: "Simple applications that benefit from a quiet, minimal layout",
      density: "Low",
    },
    elegant: {
      tags: ["polished", "editorial", "balanced"],
      idealFor: "Applicants who want a refined layout with softer visual structure",
      density: "Medium",
    },
    creative: {
      tags: ["expressive", "portfolio-ready", "bold"],
      idealFor: "Creative professionals who want a more distinctive presentation",
      density: "High",
    },
    editorial: {
      tags: ["story-led", "content-rich", "polished"],
      idealFor: "Candidates with layered experience and strong narrative sections",
      density: "High",
    },
  },
  zh: {
    classic: {
      tags: ["适合ATS", "正式", "平衡"],
      idealFor: "通用申请和偏保守的招聘流程",
      density: "中等",
    },
    modern: {
      tags: ["双栏", "适合作品集", "紧凑"],
      idealFor: "适合产品、设计和工程岗位，内容更密集",
      density: "高",
    },
    leftRight: {
      tags: ["左右分栏", "平衡", "内容密集"],
      idealFor: "希望采用清晰层次的双区域布局的人",
      density: "高",
    },
    timeline: {
      tags: ["按时间线", "经历导向", "正式"],
      idealFor: "工作经历线性清晰的候选人",
      density: "中等",
    },
    minimalist: {
      tags: ["适合ATS", "留白充足", "低干扰"],
      idealFor: "适合简洁申请，强调安静克制的版式",
      density: "低",
    },
    elegant: {
      tags: ["精致", "编辑感", "平衡"],
      idealFor: "希望版面更柔和、更精致的申请者",
      density: "中等",
    },
    creative: {
      tags: ["有表现力", "适合作品集", "大胆"],
      idealFor: "希望呈现更强个性的创意从业者",
      density: "高",
    },
    editorial: {
      tags: ["故事化", "内容丰富", "精致"],
      idealFor: "经历层次较多、叙事性较强的候选人",
      density: "高",
    },
  },
} as const;

export const templateBrowserCopy = {
  en: {
    subtitle:
      "Compare density, ATS friendliness, and use cases before starting.",
    drawerTitle: "Template fit",
    idealForLabel: "Ideal for",
    densityLabel: "Density",
    atsLabel: "ATS friendliness",
    useTemplateLabel: "Use this template",
  },
  zh: {
    subtitle: "先比较密度、ATS 友好度和适用场景，再开始创建。",
    drawerTitle: "模板适配",
    idealForLabel: "适合",
    densityLabel: "密度",
    atsLabel: "ATS 友好度",
    useTemplateLabel: "使用此模板",
  },
} as const;

export type TemplateBrowserLocale = keyof typeof templateMetadata;
export type TemplateMetadataKey = keyof typeof templateMetadata.en;

export function getTemplateMetadata(
  locale: TemplateBrowserLocale,
  templateId: TemplateMetadataKey
) {
  return templateMetadata[locale][templateId];
}

export function getTemplateBrowserCopy(locale: TemplateBrowserLocale) {
  return templateBrowserCopy[locale] ?? templateBrowserCopy.en;
}
