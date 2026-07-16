import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/services/seo",
    "/services/website-development",
    "/services/performance-marketing",
    "/services/branding-social-media",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/sitemap"
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
