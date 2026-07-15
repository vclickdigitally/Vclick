import { SEORule } from "../types";

export const technicalRules: SEORule[] = [
  {
    id: "canonical-present-check",
    category: "technical",
    name: "Canonical Tag Configuration",
    description: "Verify that a canonical URL overrides input is present to prevent duplicate indexing.",
    weight: 25,
    enabled: true,
    severity: "warning",
    recommendation: "Configure a canonical URL for this page to instruct search engines which URL version to index.",
    validate(ctx) {
      const passed = !!ctx.canonicalUrl && ctx.canonicalUrl.trim().length > 0;
      return {
        passed,
        message: passed
          ? `Canonical link targets: ${ctx.canonicalUrl}`
          : "No canonical link override. Standard URL routing will fall back.",
      };
    },
  },
  {
    id: "robots-indexing-check",
    category: "technical",
    name: "Search Indexability Checked",
    description: "Check if the page allows indexing and is crawlable by search bots.",
    weight: 30,
    enabled: true,
    severity: "error",
    recommendation: "Ensure that search indexing is enabled ('noindex' is unchecked) unless the page is intentionally private.",
    validate(ctx) {
      const passed = !ctx.noIndex;
      return {
        passed,
        message: passed
          ? "Search bots are allowed to INDEX this page."
          : "Warning: Page is hidden with NOINDEX. Search engines will ignore it.",
      };
    },
  },
  {
    id: "https-enforcement",
    category: "technical",
    name: "Enforced HTTPS Security",
    description: "Verify that the page uses secure HTTPS protocol links.",
    weight: 25,
    enabled: true,
    severity: "error",
    recommendation: "Always serve pages and links using secure HTTPS protocols to maintain search relevance.",
    validate(ctx) {
      const passed = ctx.hasHttps !== false;
      return {
        passed,
        message: passed
          ? "HTTPS protocols are verified."
          : "Warning: Page or canonical references are served over insecure HTTP.",
      };
    },
  },
  {
    id: "sitemap-linked",
    category: "technical",
    name: "Sitemap Configured",
    description: "Verify that sitemap configurations are established in site settings.",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Ensure a sitemap location is specified in site settings to aid automatic crawling.",
    validate(ctx) {
      const passed = !!ctx.sitemapPath && ctx.sitemapPath.trim().length > 0;
      return {
        passed,
        message: passed
          ? `Sitemap linked at: ${ctx.sitemapPath}`
          : "Sitemap path is not configured. Search bots might fail to discover pages.",
      };
    },
  },
];
