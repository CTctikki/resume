"use client";

import React from "react";
import { ExternalLink, Folder, Sparkles, Trash2 } from "lucide-react";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  getConfig,
  getFileHandle,
  storeConfig,
  storeFileHandle,
  verifyPermission
} from "@/utils/fileSystem";

type WorkspaceSettingsState = {
  directoryHandle: FileSystemDirectoryHandle | null;
  folderPath: string;
};

const workspaceSections = [
  {
    id: "backup-sync",
    label: "Backup and sync",
    description: "Reconnect the local folder that protects resume data."
  },
  {
    id: "ai-providers",
    label: "AI providers",
    description: "Review which model providers are available to the workspace."
  },
  {
    id: "about-version",
    label: "About this version",
    description: "See product identity and ownership details."
  }
] as const;

const aiProviders = [
  {
    name: "DeepSeek",
    description: "Used for rewriting, analysis, and other AI-assisted workspace actions."
  },
  {
    name: "Doubao",
    description: "Useful when the workspace is configured with Volcengine credentials."
  },
  {
    name: "OpenAI",
    description: "Supports flexible model choices for editing and generation workflows."
  },
  {
    name: "Gemini",
    description: "Supports polish, grammar, and PDF import workflows."
  }
] as const;

export class WorkspaceSettingsPanel extends React.Component<
  Record<string, never>,
  WorkspaceSettingsState
> {
  state: WorkspaceSettingsState = {
    directoryHandle: null,
    folderPath: ""
  };

  componentDidMount() {
    void this.loadSavedConfig();
  }

  loadSavedConfig = async () => {
    try {
      if (typeof indexedDB === "undefined") {
        return;
      }

      const handle = await getFileHandle("syncDirectory");
      const path = await getConfig("syncDirectoryPath");

      if (handle && path) {
        const hasPermission = await verifyPermission(handle);
        if (hasPermission) {
          this.setState({
            directoryHandle: handle as FileSystemDirectoryHandle,
            folderPath: path
          });
        }
      }
    } catch (error) {
      console.error("Error loading saved config:", error);
    }
  };

  handleSelectDirectory = async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        alert("Your browser does not support directory selection. Please use a modern browser.");
        return;
      }

      const handle = await window.showDirectoryPicker({ mode: "readwrite" });
      const hasPermission = await verifyPermission(handle);

      if (hasPermission) {
        const path = handle.name;
        this.setState({
          directoryHandle: handle,
          folderPath: path
        });
        await storeFileHandle("syncDirectory", handle);
        await storeConfig("syncDirectoryPath", path);
      }
    } catch (error) {
      console.error("Error selecting directory:", error);
    }
  };

  handleRemoveDirectory = async () => {
    try {
      this.setState({
        directoryHandle: null,
        folderPath: ""
      });
      await storeFileHandle("syncDirectory", null as any);
      await storeConfig("syncDirectoryPath", "");
    } catch (error) {
      console.error("Error removing directory:", error);
    }
  };

  render() {
    const { directoryHandle, folderPath } = this.state;
    const hasSyncFolder = Boolean(directoryHandle && folderPath);

    const backupItems = [
      {
        label: "Current folder",
        value: folderPath || "No folder configured"
      },
      {
        label: "Storage mode",
        value: "Local-first backup"
      },
      {
        label: "Sync status",
        value: hasSyncFolder ? "Connected" : "Waiting for a folder"
      }
    ];

    return (
      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-[18px] border border-border bg-card p-4 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Workspace</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Keep backup, AI, and product identity settings organized in one place.
              </p>
            </div>

            <nav aria-label="Workspace settings sections" className="space-y-2">
              {workspaceSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-[14px] border border-border/60 px-3 py-3 text-left transition-colors hover:bg-muted/40"
                >
                  <p className="text-sm font-medium text-foreground">{section.label}</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {section.description}
                  </p>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <section className="space-y-6">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-xl">Workspace at a glance</CardTitle>
              <CardDescription className="text-sm leading-6">
                This surface brings together the local sync folder, the AI provider surface, and
                CT-specific ownership information without hiding the operational pieces.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {backupItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[14px] border border-border bg-muted/30 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader id="backup-sync" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Folder className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl">Backup and sync</CardTitle>
                  <CardDescription className="text-sm leading-6">
                    Reconnect a local folder so the workspace can keep backups of resume data and
                    exported configs.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {backupItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[14px] border border-border bg-muted/30 px-4 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[14px] border border-border/70 bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
                The selected folder is stored locally in the browser. When the permission is
                available, the workspace can re-open the same folder and keep the sync workflow
                intact.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 rounded-[14px] border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                  {folderPath || "No folder configured"}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={this.handleSelectDirectory}>Select Folder</Button>
                  {directoryHandle ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={this.handleRemoveDirectory}
                      aria-label="Remove synced folder"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader id="ai-providers" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl">AI providers</CardTitle>
                  <CardDescription className="text-sm leading-6">
                    The workspace keeps the provider surface organized, while detailed model
                    credentials remain in the dedicated AI configuration page.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {aiProviders.map((provider) => (
                  <div
                    key={provider.name}
                    className="rounded-[14px] border border-border bg-muted/30 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-foreground">{provider.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{provider.description}</p>
                  </div>
                ))}
              </div>

              <a
                href="/app/dashboard/ai"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Open AI settings
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader id="about-version" className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-xl">About this version</CardTitle>
                <CardDescription className="text-sm leading-6">
                  Workspace information, ownership, and product identity for the current build.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium text-foreground">{brand.studioName}</p>
              <p className="text-sm text-muted-foreground">
                {brand.productName} is maintained by {brand.studioName}.
              </p>
              <a
                href={brand.studioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                ctikki.com
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }
}
