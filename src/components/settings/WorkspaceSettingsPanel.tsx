"use client";

import { WorkspaceSettingsSidebar } from "@/components/settings/WorkspaceSettingsSidebar";
import { WorkspaceSettingsOverview } from "@/components/settings/WorkspaceSettingsOverview";
import { WorkspaceSettingsSections } from "@/components/settings/WorkspaceSettingsSections";

export function WorkspaceSettingsPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
      <WorkspaceSettingsSidebar />

      <section className="space-y-6">
        <WorkspaceSettingsOverview />
        <WorkspaceSettingsSections />
      </section>
    </div>
  );
}
