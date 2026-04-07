"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import Link from "@/lib/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const providerIds = ["deepseek", "doubao", "openai", "gemini"] as const;

export function WorkspaceAIProvidersSection() {
  const t = useTranslations("dashboard.settings.workspace.aiProviders");
  const aiT = useTranslations("dashboard.settings.ai");

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader id="aiProviders" className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{t("title")}</CardTitle>
            <CardDescription className="text-sm leading-6">{t("description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {providerIds.map((providerId) => (
            <div
              key={providerId}
              className="rounded-[14px] border border-border bg-muted/30 px-4 py-3"
            >
              <p className="text-sm font-medium text-foreground">
                {aiT(`${providerId}.title`)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {aiT(`${providerId}.description`)}
              </p>
            </div>
          ))}
        </div>

        <Button asChild variant="outline" className="w-fit">
          <Link href="/app/dashboard/ai">
            {t("openSettings")}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
