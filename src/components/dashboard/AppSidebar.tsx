import { BrandWordmark } from "@/components/shared/BrandWordmark";
import { useTranslations, useLocale } from "@/i18n/compat/client";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type SidebarItem = {
  id: string;
  href: string;
  labelKey: string;
  icon: ComponentType<{ size?: number; active?: boolean; className?: string }>;
};

interface AppSidebarProps {
  items: readonly SidebarItem[];
  currentPath: string;
  expanded: boolean;
  onNavigate?: (href: string) => void;
}

export function AppSidebar({ items, currentPath, expanded, onNavigate }: AppSidebarProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-card">
      <div className="border-b border-border/60 px-4 py-4">
        <BrandWordmark localeHref={`/${locale}`} showStudio={expanded} />
      </div>
      <nav className="flex-1 px-3 py-4">
        {items.map((item) => {
          const active = currentPath === item.href;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.href)}
              className={cn(
                "mb-1 flex h-11 w-full items-center gap-3 rounded-[12px] px-3 text-sm",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} active={active} />
              {expanded ? <span>{t(item.labelKey)}</span> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
