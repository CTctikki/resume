import {
  IconAI,
  IconResumes,
  IconSettings,
  IconTemplates
} from "@/components/shared/icons/SidebarIcons";
import { Share2 } from "lucide-react";

export const dashboardNav = [
  { id: "resumes", href: "/app/dashboard/resumes", labelKey: "dashboard.sidebar.resumes", icon: IconResumes },
  { id: "templates", href: "/app/dashboard/templates", labelKey: "dashboard.sidebar.templates", icon: IconTemplates },
  { id: "export", href: "/app/dashboard/export", labelKey: "dashboard.sidebar.export", icon: Share2 },
  { id: "ai", href: "/app/dashboard/ai", labelKey: "dashboard.sidebar.ai", icon: IconAI },
  { id: "settings", href: "/app/dashboard/settings", labelKey: "dashboard.sidebar.settings", icon: IconSettings }
] as const;
