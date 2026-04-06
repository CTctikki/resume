import { brand } from "@/config/brand";
import Link from "@/lib/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

interface BrandWordmarkProps {
  className?: string;
  localeHref: string;
  showStudio?: boolean;
}

export function BrandWordmark({
  className,
  localeHref,
  showStudio = false
}: BrandWordmarkProps) {
  return (
    <Link
      href={localeHref}
      className={cn("flex items-center gap-3 text-left", className)}
      aria-label={brand.productName}
    >
      <Logo size={40} />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {brand.productName}
        </span>
        {showStudio ? (
          <span className="text-xs text-muted-foreground">{brand.studioName}</span>
        ) : null}
      </span>
    </Link>
  );
}
