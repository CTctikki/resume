"use client";

import { WorkspaceBackupSyncSection } from "@/components/settings/WorkspaceBackupSyncSection";
import { WorkspaceAIProvidersSection } from "@/components/settings/WorkspaceAIProvidersSection";
import { WorkspaceAboutSection } from "@/components/settings/WorkspaceAboutSection";

export function WorkspaceSettingsSections() {
  return (
    <>
      <WorkspaceBackupSyncSection />
      <WorkspaceAIProvidersSection />
      <WorkspaceAboutSection />
    </>
  );
}
