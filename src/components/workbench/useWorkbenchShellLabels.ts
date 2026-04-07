import { useLocale } from "@/i18n/compat/client";

type WorkbenchShellLabels = {
  aiGrammarCheck: string;
  autoFit: string;
  backToDashboard: string;
  copyResume: string;
  export: string;
  openExport: string;
  openTemplates: string;
  resumeTitle: string;
  templates: string;
  toggleEditor: string;
  togglePreview: string;
  toggleSections: string;
  untitledResume: string;
};

const EN_LABELS: WorkbenchShellLabels = {
  aiGrammarCheck: "AI grammar check",
  autoFit: "Auto fit page",
  backToDashboard: "Back to dashboard",
  copyResume: "Copy resume",
  export: "Export",
  openExport: "Open export",
  openTemplates: "Open templates",
  resumeTitle: "Resume title",
  templates: "Templates",
  toggleEditor: "Toggle editor",
  togglePreview: "Toggle preview",
  toggleSections: "Toggle sections",
  untitledResume: "Untitled Resume"
};

const ZH_LABELS: WorkbenchShellLabels = {
  aiGrammarCheck: "AI语法检查",
  autoFit: "自动适配页面",
  backToDashboard: "返回仪表盘",
  copyResume: "复制简历",
  export: "导出",
  openExport: "打开导出",
  openTemplates: "打开模板",
  resumeTitle: "简历标题",
  templates: "模板",
  toggleEditor: "切换编辑面板",
  togglePreview: "切换预览面板",
  toggleSections: "切换分区面板",
  untitledResume: "未命名简历"
};

export function useWorkbenchShellLabels() {
  const locale = useLocale();

  return locale === "zh" ? ZH_LABELS : EN_LABELS;
}
