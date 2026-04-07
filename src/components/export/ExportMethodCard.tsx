import { Button } from "@/components/ui/button";

interface ExportMethodCardProps {
  title: string;
  description: string;
  onClick: () => void;
  actionLabel: string;
}

export function ExportMethodCard({
  title,
  description,
  onClick,
  actionLabel
}: ExportMethodCardProps) {
  return (
    <section className="rounded-[18px] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <Button className="mt-4" onClick={onClick}>
        {actionLabel}
      </Button>
    </section>
  );
}
