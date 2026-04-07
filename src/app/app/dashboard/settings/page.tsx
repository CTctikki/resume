import { WorkspaceSettingsPanel } from "@/components/settings/WorkspaceSettingsPanel";

export const runtime = "edge";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <h2 className="text-3xl font-semibold text-foreground">Workspace Settings</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage backup, defaults, AI providers, and version information.
      </p>
      <div className="mt-8">
        <WorkspaceSettingsPanel />
      </div>
    </div>
  );
}
