import { SEORule } from "../types";

export const basicSeoRules: SEORule[] = [
  {
    id: "title-present",
    category: "basic-seo",
    name: "SEO Meta Title Defined",
    description: "Verify that the SEO Meta Title is present and not empty.",
    weight: 20,
    enabled: true,
    severity: "error",
    recommendation: "Add a compelling SEO Meta Title under 60 characters to encourage search engine clicks.",
    validate(ctx) {
      const passed = !!ctx.metaTitle && ctx.metaTitle.trim().length > 0;
      return {
        passed,
        message: passed ? "SEO Title is present." : "SEO Title is missing.",
      };
    },
  },
  {
    id: "title-length-range",
    category: "basic-seo",
    name: "Optimal Meta Title Length",
    description: "Check if the SEO Meta Title is between 50 and 60 characters.",
    weight: 12,
    enabled: true,
    severity: "warning",
    recommendation: "Keep the title length between 50 and 60 characters to avoid truncation in Google SERP lists.",
    validate(ctx) {
      const len = ctx.metaTitle.length;
      const passed = len >= 50 && len <= 60;
      return {
        passed,
        actualValue: len,
        message: passed 
          ? `Meta title length is optimal (${len} characters).`
          : `Meta title is ${len} characters. Keep it between 50 and 60 characters.`,
      };
    },
  },
  {
    id: "description-present",
    category: "basic-seo",
    name: "SEO Meta Description Defined",
    description: "Verify that the SEO Meta Description is present and configured.",
    weight: 20,
    enabled: true,
    severity: "error",
    recommendation: "Provide a meta description summarization of the page content to display in SERP listings.",
    validate(ctx) {
      const passed = !!ctx.metaDescription && ctx.metaDescription.trim().length > 0;
      return {
        passed,
        message: passed ? "SEO Meta Description is present." : "SEO Meta Description is missing.",
      };
    },
  },
  {
    id: "description-length-range",
    category: "basic-seo",
    name: "Optimal Meta Description Length",
    description: "Check if the SEO Meta Description is between 120 and 160 characters.",
    weight: 12,
    enabled: true,
    severity: "warning",
    recommendation: "Keep the description length between 120 and 160 characters to ensure it fits in search engine snippet layouts.",
    validate(ctx) {
      const len = ctx.metaDescription.length;
      const passed = len >= 120 && len <= 160;
      return {
        passed,
        actualValue: len,
        message: passed 
          ? `Meta description length is optimal (${len} characters).`
          : `Meta description is ${len} characters. Keep it between 120 and 160 characters.`,
      };
    },
  },
  {
    id: "slug-format",
    category: "basic-seo",
    name: "URL Slug Optimization",
    description: "Verify that the URL slug contains only lowercase alphanumeric characters, numbers, and hyphens.",
    weight: 10,
    enabled: true,
    severity: "error",
    recommendation: "Simplify URL paths using only lowercase letters, numbers, and hyphens. Avoid special characters and spacing.",
    validate(ctx) {
      const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      const passed = slugPattern.test(ctx.slug);
      return {
        passed,
        message: passed
          ? "Slug format is clean and SEO-friendly."
          : "URL slug contains uppercase letters or invalid characters. Format with lowercase-hyphenated strings.",
      };
    },
  },
  {
    id: "h1-presence",
    category: "basic-seo",
    name: "Single H1 Tag Check",
    description: "Ensure that there is exactly one H1 tag present in the page layout.",
    weight: 15,
    enabled: true,
    severity: "error",
    recommendation: "Ensure exactly one H1 tag exists, representing the primary heading topic of the page.",
    validate(ctx) {
      const h1Matches = ctx.content.match(/<h1[^>]*>/gi) || [];
      const passed = h1Matches.length === 1;
      return {
        passed,
        actualValue: h1Matches.length,
        message: passed
          ? "Exactly one H1 heading found."
          : `Found ${h1Matches.length} H1 tags (recommended: exactly 1).`,
      };
    },
  },
  {
    id: "subheadings-presence",
    category: "basic-seo",
    name: "Subheadings Density (H2-H4)",
    description: "Ensure that subheadings (H2, H3) exist to segment lengthy body text.",
    weight: 11,
    enabled: true,
    severity: "suggestion",
    recommendation: "Use H2 and H3 tags to divide text sections into logical, scannable parts.",
    validate(ctx) {
      const subheadingMatches = ctx.content.match(/<h[2-4][^>]*>/gi) || [];
      const passed = subheadingMatches.length >= 2;
      return {
        passed,
        actualValue: subheadingMatches.length,
        message: passed
          ? `Page contains ${subheadingMatches.length} subheadings.`
          : `Page contains only ${subheadingMatches.length} subheadings. Divide long copy sections with subheadings.`,
      };
    },
  },
];
