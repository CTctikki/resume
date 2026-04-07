import { ExportMethodCard } from "@/components/export/ExportMethodCard";

export const runtime = "edge";

export default function ExportPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">Export and Share</h2>
      <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted-foreground">
        Choose the output method that best matches formal submission, print fallback, or local
        backup.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ExportMethodCard
          title="PDF export"
          description="Use the high-fidelity export flow for a polished final PDF."
          actionLabel="Export PDF"
          onClick={() => {}}
        />
        <ExportMethodCard
          title="Browser print"
          description="Use the browser print dialog when you need a local fallback."
          actionLabel="Open print dialog"
          onClick={() => {}}
        />
        <ExportMethodCard
          title="JSON backup"
          description="Save a local snapshot of your data for backup and later import."
          actionLabel="Download JSON"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
