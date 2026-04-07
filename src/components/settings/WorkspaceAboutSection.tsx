"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { brand } from "@/config/brand";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const studioHostname = new URL(brand.studioUrl).hostname;

export function WorkspaceAboutSection() {
  const t = useTranslations("dashboard.settings.workspace.about");

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader id="aboutVersion" className="space-y-4">
        <div className="space-y-1">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription className="text-sm leading-6">{t("description")}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium text-foreground">{brand.studioName}</p>
        <p className="text-sm text-muted-foreground">
          {t("maintainedBy", {
            product: brand.productName,
            studio: brand.studioName
          })}
        </p>
        <a
          href={brand.studioUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {studioHostname}
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}
