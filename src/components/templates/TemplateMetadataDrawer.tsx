import { Button } from "@/components/ui/button";

interface TemplateMetadataDrawerProps {
  open: boolean;
  title: string;
  description: string;
  tags: readonly string[];
  idealFor: string;
  density: string;
  copy: {
    panelTitle: string;
    idealForLabel: string;
    densityLabel: string;
    atsLabel: string;
    useTemplateLabel: string;
  };
  onUse: () => void;
}

export function TemplateMetadataDrawer(props: TemplateMetadataDrawerProps) {
  if (!props.open) return null;

  const atsFriendly = props.tags.some((tag) => /ATS-friendly|适合ATS/i.test(tag));

  return (
    <aside className="h-fit rounded-[18px] border border-border bg-card p-5 shadow-sm xl:sticky xl:top-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {props.copy.panelTitle}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {props.title}
          </h3>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {props.density}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{props.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {props.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3 rounded-2xl bg-muted/40 p-4">
        <p className="text-sm text-foreground">
          <strong>{props.copy.idealForLabel}:</strong> {props.idealFor}
        </p>
        <p className="text-sm text-foreground">
          <strong>{props.copy.densityLabel}:</strong> {props.density}
        </p>
        <p className="text-sm text-foreground">
          <strong>{props.copy.atsLabel}:</strong>{" "}
          {atsFriendly ? "ATS-friendly" : "More design-forward"}
        </p>
      </div>

      <Button className="mt-6 w-full" onClick={props.onUse}>
        {props.copy.useTemplateLabel}
      </Button>
    </aside>
  );
}
