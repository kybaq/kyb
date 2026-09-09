import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { siteUrl } from "@/data/profile";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? ["/", ...cases.map((c) => `/cases/${c.slug}/`)].map((path) => ({
        url: `${siteUrl}${path}`,
      }))
    : [];
}
