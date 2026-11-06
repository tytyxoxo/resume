import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/resume"].map((path) => ({ url: `${profile.site}${path}` }));
}
