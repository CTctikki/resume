"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { Sidebar, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { useLocale } from "@/i18n/compat/client";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { brand } from "@/config/brand";
import { dashboardNav } from "@/config/dashboardNav";

function DashboardSidebarShell({
  pathname,
  onNavigate
}: {
  pathname: string;
  onNavigate: (href: string) => void;
}) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <AppSidebar
        items={dashboardNav}
        currentPath={pathname}
        expanded={open}
        onNavigate={onNavigate}
      />
    </Sidebar>
  );
}

function DashboardMobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      className="h-10 w-10 rounded-full border border-border/60 bg-card text-foreground"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
    >
      <span className="sr-only">Toggle Sidebar</span>
      <span aria-hidden="true">☰</span>
    </button>
  );
}

function DashboardDesktopSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground md:inline-flex"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
    >
      <span className="sr-only">Toggle Sidebar</span>
      <span aria-hidden="true">☰</span>
    </button>
  );
}

export function DashboardShell({
  children,
  pathname,
  subtitle,
  onNavigate
}: {
  children: React.ReactNode;
  pathname: string;
  subtitle: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarProvider defaultOpen>
        <DashboardSidebarShell pathname={pathname} onNavigate={onNavigate} />
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border/60 bg-background px-4 py-3 md:hidden">
            <DashboardMobileSidebarTrigger />
          </div>
          <div className="hidden border-b border-border/60 bg-background px-4 py-3 md:flex md:items-center md:justify-end">
            <DashboardDesktopSidebarTrigger />
          </div>
          <DashboardTopBar subtitle={subtitle} />
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const subtitle = brand.subtitle[locale === "zh" ? "zh" : "en"];

  return (
    <DashboardShell
      pathname={pathname}
      subtitle={subtitle}
      onNavigate={(href) => router.push(href)}
    >
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;
