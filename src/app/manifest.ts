import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export const runtime = "edge";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.productName,
    short_name: brand.productShortName,
    description: brand.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7FA",
    theme_color: "#2457F5",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
