const fallbackSiteOrigin = "https://resume.ctikki.com";

export function normalizeSiteOrigin(siteOrigin?: string) {
  const normalized = siteOrigin?.replace(/\/+$/, "");
  return normalized || fallbackSiteOrigin;
}

export const brand = {
  productName: "CT 简历工作台",
  productShortName: "CT Resume",
  studioName: "CT程序定制工作室",
  studioUrl: "https://ctikki.com",
  siteOrigin: normalizeSiteOrigin(import.meta.env.VITE_SITE_ORIGIN),
  subtitle: {
    zh: "专业、克制的简历编辑工作台",
    en: "A focused workspace for building polished resumes"
  },
  description: {
    zh: "本地优先、实时预览、稳定导出，适合真实求职场景的简历编辑工具。",
    en: "A local-first resume workspace with live preview and reliable export."
  }
} as const;
