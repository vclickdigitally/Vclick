import { SEORule } from "../types";

export const eeatRules: SEORule[] = [
  {
    id: "author-bio-present",
    category: "eeat",
    name: "Author Biography Present",
    description: "Verify that an author bio is written to provide credentials and establish trust.",
    weight: 35,
    enabled: true,
    severity: "error",
    recommendation: "Provide a detailed author biography in the admin settings profile to verify author identity.",
    validate(ctx) {
      const passed = !!ctx.authorBio && ctx.authorBio.trim().length > 10;
      return {
        passed,
        message: passed
          ? "Author bio is configured."
          : "Author bio is missing. Search engines penalize anonymous content.",
      };
    },
  },
  {
    id: "author-bio-depth",
    category: "eeat",
    name: "Author Bio Word Count",
    description: "Ensure the author bio contains at least 30 words to show expertise.",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Expand the author biography to at least 30 words, stating experience, achievements, and topics covered.",
    validate(ctx) {
      if (!ctx.authorBio) return { passed: false, message: "No biography configured." };
      const words = ctx.authorBio.split(/\s+/).filter(Boolean).length;
      const passed = words >= 30;
      return {
        passed,
        actualValue: words,
        message: passed
          ? `Author bio has sufficient depth (${words} words).`
          : `Author bio has only ${words} words. Recommended minimum: 30 words.`,
      };
    },
  },
  {
    id: "author-credentials-check",
    category: "eeat",
    name: "Author Expertise Credentials",
    description: "Verify that professional credentials, certifications, or titles are configured.",
    weight: 25,
    enabled: true,
    severity: "error",
    recommendation: "Add academic, industrial, or professional qualifications (e.g. 'Certified Next.js Developer') to the author profile.",
    validate(ctx) {
      const passed = !!ctx.authorCredentials && ctx.authorCredentials.trim().length > 3;
      return {
        passed,
        message: passed
          ? `Verified author qualifications: '${ctx.authorCredentials}'`
          : "Author credentials are missing. Add titles to establish author expertise.",
      };
    },
  },
  {
    id: "content-freshness",
    category: "eeat",
    name: "Content Freshness Review",
    description: "Verify if the page content has been updated within the last 6 months.",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Refresh and update content periodically (at least once every 6 months) to preserve accuracy and keyword ranks.",
    validate(ctx) {
      const date = ctx.updatedAt || new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const passed = date >= sixMonthsAgo;
      return {
        passed,
        actualValue: date.toLocaleDateString(),
        message: passed
          ? `Content is fresh (last updated: ${date.toLocaleDateString()}).`
          : `Content was last updated on ${date.toLocaleDateString()} (over 6 months ago). Review and refresh the content.`,
      };
    },
  },
];
