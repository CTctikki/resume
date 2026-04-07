import { brand } from "@/config/brand";

export function WorkspaceSettingsPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="rounded-[18px] border border-border bg-card p-4">
        <div className="space-y-2 text-sm">
          <p className="font-medium text-foreground">General</p>
          <p className="text-muted-foreground">Backup and sync</p>
          <p className="text-muted-foreground">AI providers</p>
          <p className="text-muted-foreground">About this version</p>
        </div>
      </aside>
      <section className="space-y-6">
        <div className="rounded-[18px] border border-border bg-card p-5">
          <h3 className="text-lg font-semibold text-foreground">About this version</h3>
          <p className="mt-2 text-sm font-medium text-foreground">{brand.studioName}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {brand.productName} is maintained by {brand.studioName}.
          </p>
          <a
            href={brand.studioUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm text-primary"
          >
            ctikki.com
          </a>
        </div>
      </section>
    </div>
  );
}
