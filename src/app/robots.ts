import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

// /playground and /svln stay crawlable so crawlers can read their noindex tag.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${profile.site}/sitemap.xml` };
}
