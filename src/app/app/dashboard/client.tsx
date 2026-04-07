import { useState } from "react";
import { usePathname, useRouter } from "@/lib/navigation";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useTranslations } from "@/i18n/compat/client";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { dashboardNav } from "@/config/dashboardNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [open, setOpen] = useState(true);
  const [collapsible] = useState<"offcanvas" | "icon" | "none">("icon");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar collapsible={collapsible} className="border-r border-border bg-card">
          <AppSidebar
            items={dashboardNav}
            currentPath={pathname}
            expanded={open}
            onNavigate={(href) => router.push(href)}
          />
        </Sidebar>
        <main className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar title={t("dashboard.sidebar.appName")} subtitle={t("common.subtitle")} />
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
