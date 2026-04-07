import { brand } from "@/config/brand";

interface DashboardTopBarProps {
  title?: string;
  subtitle?: string;
}

export function DashboardTopBar({ title, subtitle }: DashboardTopBarProps) {
  const resolvedTitle = title ?? brand.productName;

  return (
    <header className="border-b border-border/60 bg-background px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{resolvedTitle}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <a
          href={brand.studioUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ctikki.com
        </a>
      </div>
    </header>
  );
}
