import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

interface BrandWordmarkProps {
  className?: string;
  localeHref: string;
  showStudio?: boolean;
}

const productName = "CT 简历工作台";
const studioName = "CT程序定制工作室";

export function BrandWordmark({
  className,
  localeHref,
  showStudio = false
}: BrandWordmarkProps) {
  return (
    <a
      href={localeHref}
      className={cn("flex items-center gap-3 text-left", className)}
      aria-label={productName}
    >
      <Logo size={40} />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {productName}
        </span>
        {showStudio ? (
          <span className="text-xs text-muted-foreground">{studioName}</span>
        ) : null}
      </span>
    </a>
  );
}
