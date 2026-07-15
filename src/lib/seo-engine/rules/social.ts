import { SEORule } from "../types";

export const socialRules: SEORule[] = [
  {
    id: "social-og-image",
    category: "social",
    name: "Open Graph Social Image",
    description: "Verify that an Open Graph preview image URL is defined.",
    weight: 40,
    enabled: true,
    severity: "error",
    recommendation: "Configure a custom Open Graph image overlay to optimize shares on Facebook and LinkedIn.",
    validate(ctx) {
      const passed = !!ctx.ogImage && ctx.ogImage.trim().length > 0;
      return {
        passed,
        message: passed
          ? `Open Graph image set to: ${ctx.ogImage}`
          : "Open Graph image is missing. Social feeds will fall back to site-wide defaults.",
      };
    },
  },
  {
    id: "social-twitter-card",
    category: "social",
    name: "Twitter Card Format Check",
    description: "Verify that the Twitter Card type is configured correctly.",
    weight: 30,
    enabled: true,
    severity: "warning",
    recommendation: "Define the Twitter Card format type (e.g. 'summary_large_image') to display large visual previews.",
    validate(ctx) {
      const passed = !!ctx.twitterCard && ["summary", "summary_large_image", "app", "player"].includes(ctx.twitterCard);
      return {
        passed,
        actualValue: ctx.twitterCard || "None",
        message: passed
          ? `Twitter card layout set to: ${ctx.twitterCard}`
          : "Twitter card format is invalid or missing.",
      };
    },
  },
  {
    id: "social-custom-titles",
    category: "social",
    name: "Custom Social Titles Defined",
    description: "Check if custom titles are defined for Open Graph and Twitter to optimize CTR.",
    weight: 30,
    enabled: true,
    severity: "suggestion",
    recommendation: "Customize your Facebook/Twitter titles to make them more engaging than standard SEO titles.",
    validate(ctx) {
      const passed = (!!ctx.ogTitle && ctx.ogTitle !== ctx.metaTitle) || (!!ctx.twitterTitle && ctx.twitterTitle !== ctx.metaTitle);
      return {
        passed,
        message: passed
          ? "Custom social card title titles are configured."
          : "Social card titles default to the standard SEO Meta Title. Consider custom titles for social sharing.",
      };
    },
  },
];
