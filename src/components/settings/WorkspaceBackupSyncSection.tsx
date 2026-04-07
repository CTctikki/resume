"use client";

import { useEffect, useState } from "react";
import { Folder, Trash2 } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
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

type BackupState = {
  directoryHandle: FileSystemDirectoryHandle | null;
  folderPath: string;
};

export function WorkspaceBackupSyncSection() {
  const t = useTranslations("dashboard.settings.workspace.backupSync");
  const [state, setState] = useState<BackupState>({
    directoryHandle: null,
    folderPath: ""
  });

  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        if (typeof indexedDB === "undefined") {
          return;
        }

        const handle = await getFileHandle("syncDirectory");
        const path = await getConfig("syncDirectoryPath");

        if (handle && path) {
          const hasPermission = await verifyPermission(handle);
          if (hasPermission) {
            setState({
              directoryHandle: handle as FileSystemDirectoryHandle,
              folderPath: path
            });
          }
        }
      } catch (error) {
        console.error("Error loading saved config:", error);
      }
    };

    void loadSavedConfig();
  }, []);

  const handleSelectDirectory = async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        alert(t("browserUnsupported"));
        return;
      }

      const handle = await window.showDirectoryPicker({ mode: "readwrite" });
      const hasPermission = await verifyPermission(handle);

      if (hasPermission) {
        const path = handle.name;
        setState({
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

  const handleRemoveDirectory = async () => {
    try {
      setState({
        directoryHandle: null,
        folderPath: ""
      });
      await storeFileHandle("syncDirectory", null as any);
      await storeConfig("syncDirectoryPath", "");
    } catch (error) {
      console.error("Error removing directory:", error);
    }
  };

  const hasSyncFolder = Boolean(state.directoryHandle && state.folderPath);

  const statusLabel = hasSyncFolder ? t("connected") : t("waiting");

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader id="backupSync" className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Folder className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{t("title")}</CardTitle>
            <CardDescription className="text-sm leading-6">{t("description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[14px] border border-border bg-muted/30 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("currentFolder")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {state.folderPath || t("noFolderConfigured")}
            </p>
          </div>
          <div className="rounded-[14px] border border-border bg-muted/30 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("storageMode")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{t("storageValue")}</p>
          </div>
          <div className="rounded-[14px] border border-border bg-muted/30 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("syncStatus")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{statusLabel}</p>
          </div>
        </div>

        <div className="rounded-[14px] border border-border/70 bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
          {t("supportNote")}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1 rounded-[14px] border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
            {state.folderPath || t("noFolderConfigured")}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSelectDirectory}>{t("selectFolder")}</Button>
            {state.directoryHandle ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleRemoveDirectory}
                aria-label={t("removeFolder")}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
