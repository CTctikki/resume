import { useLocale } from "@/i18n/compat/client";

type WorkbenchShellLabels = {
  autoFit: string;
  backToDashboard: string;
  export: string;
  openExport: string;
  openTemplates: string;
  resumeTitle: string;
  templates: string;
  toggleEditor: string;
  togglePreview: string;
  toggleSections: string;
};

const EN_LABELS: WorkbenchShellLabels = {
  autoFit: "Auto fit page",
  backToDashboard: "Back to dashboard",
  export: "Export",
  openExport: "Open export",
  openTemplates: "Open templates",
  resumeTitle: "Resume title",
  templates: "Templates",
  toggleEditor: "Toggle editor",
  togglePreview: "Toggle preview",
  toggleSections: "Toggle sections",
};

const ZH_LABELS: WorkbenchShellLabels = {
  autoFit: "自动适配页面",
  backToDashboard: "返回仪表盘",
  export: "导出",
  openExport: "打开导出",
  openTemplates: "打开模板",
  resumeTitle: "简历标题",
  templates: "模板",
  toggleEditor: "切换编辑面板",
  togglePreview: "切换预览面板",
  toggleSections: "切换分区面板",
};

export function useWorkbenchShellLabels() {
  const locale = useLocale();

  return locale === "zh" ? ZH_LABELS : EN_LABELS;
}
