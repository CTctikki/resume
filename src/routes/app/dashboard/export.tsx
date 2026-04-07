import { createFileRoute } from "@tanstack/react-router";
import ExportPage from "@/app/app/dashboard/export/page";

export const Route = createFileRoute("/app/dashboard/export")({
  component: ExportPage
});
