import { SEORule } from "../types";

export const keywordRules: SEORule[] = [
  {
    id: "keyword-density-check",
    category: "keywords",
    name: "Focus Keyword Density",
    description: "Check if the focus keyword density is between 1.0% and 2.5%.",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Maintain a focus keyword density between 1.0% and 2.5% to avoid keyword stuffing penalties.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const words = ctx.content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      if (wordCount === 0) return { passed: false, message: "No content found." };

      const regex = new RegExp(`\\b${ctx.focusKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
      const occurrences = (ctx.content.replace(/<[^>]*>/g, " ").match(regex) || []).length;
      const density = (occurrences / wordCount) * 100;
      
      const passed = density >= 1.0 && density <= 2.5;
      return {
        passed,
        actualValue: `${density.toFixed(2)}%`,
        message: passed
          ? `Density is optimal (${density.toFixed(2)}% - ${occurrences} matches).`
          : `Density is ${density.toFixed(2)}% (${occurrences} matches). Target: 1.0% - 2.5%.`,
      };
    },
  },
  {
    id: "keyword-in-title-start",
    category: "keywords",
    name: "Focus Keyword in Title Start",
    description: "Ensure the focus keyword is placed in the first half of the SEO Meta Title.",
    weight: 15,
    enabled: true,
    severity: "suggestion",
    recommendation: "Try to place the focus keyword at the beginning or in the first half of the SEO title for higher CTR.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const titleLower = ctx.metaTitle.toLowerCase();
      const kwLower = ctx.focusKeyword.toLowerCase();
      const idx = titleLower.indexOf(kwLower);
      
      const passed = idx >= 0 && idx <= (titleLower.length / 2);
      return {
        passed,
        message: passed
          ? "Focus keyword appears in the first half of the title."
          : "Focus keyword is not at the start of the title.",
      };
    },
  },
  {
    id: "keyword-in-slug-match",
    category: "keywords",
    name: "Focus Keyword in URL Slug",
    description: "Verify that the focus keyword matches part of the URL slug path.",
    weight: 15,
    enabled: true,
    severity: "error",
    recommendation: "Include the primary focus keyword inside the URL slug.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const cleanKeyword = ctx.focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const passed = ctx.slug.toLowerCase().includes(cleanKeyword);
      return {
        passed,
        message: passed
          ? "Focus keyword found in URL slug."
          : "Focus keyword is missing from URL slug.",
      };
    },
  },
  {
    id: "keyword-in-meta-desc",
    category: "keywords",
    name: "Focus Keyword in Meta Description",
    description: "Check if the focus keyword exists in the meta description.",
    weight: 15,
    enabled: true,
    severity: "warning",
    recommendation: "Ensure the primary focus keyword is written naturally inside the meta description tag.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const passed = ctx.metaDescription.toLowerCase().includes(ctx.focusKeyword.toLowerCase());
      return {
        passed,
        message: passed
          ? "Focus keyword found in meta description."
          : "Focus keyword is missing from meta description.",
      };
    },
  },
  {
    id: "keyword-in-intro",
    category: "keywords",
    name: "Focus Keyword in Intro Paragraph",
    description: "Ensure the focus keyword appears within the first 100 words of the text.",
    weight: 15,
    enabled: true,
    severity: "error",
    recommendation: "Incorporate the focus keyword early in the first paragraph of your page copy.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const text = ctx.content.replace(/<[^>]*>/g, " ").toLowerCase();
      const introText = text.split(/\s+/).slice(0, 100).join(" ");
      const passed = introText.includes(ctx.focusKeyword.toLowerCase());
      return {
        passed,
        message: passed
          ? "Focus keyword appears in the first paragraph."
          : "Focus keyword is missing from the first paragraph.",
      };
    },
  },
  {
    id: "keyword-in-outro",
    category: "keywords",
    name: "Focus Keyword in Outro Conclusion",
    description: "Ensure the focus keyword appears in the concluding paragraphs of the text.",
    weight: 10,
    enabled: true,
    severity: "suggestion",
    recommendation: "Reinforce relevance by placing the focus keyword in your final summary paragraph.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const text = ctx.content.replace(/<[^>]*>/g, " ").toLowerCase();
      const words = text.split(/\s+/);
      const outroText = words.slice(Math.max(0, words.length - 100)).join(" ");
      const passed = outroText.includes(ctx.focusKeyword.toLowerCase());
      return {
        passed,
        message: passed
          ? "Focus keyword appears in the conclusion paragraph."
          : "Focus keyword is missing from the conclusion paragraph.",
      };
    },
  },
  {
    id: "keyword-in-headings-check",
    category: "keywords",
    name: "Focus Keyword in Subheadings",
    description: "Verify that the focus keyword appears inside at least one H2 or H3 heading tag.",
    weight: 10,
    enabled: true,
    severity: "warning",
    recommendation: "Place the focus keyword in at least one H2 or H3 subheading tag.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const headingContentMatches = ctx.content.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi) || [];
      const hasKeyword = headingContentMatches.some(h => 
        h.toLowerCase().includes(ctx.focusKeyword.toLowerCase())
      );
      return {
        passed: hasKeyword,
        message: hasKeyword
          ? "Focus keyword is present in subheadings."
          : "Focus keyword is missing from all subheadings.",
      };
    },
  },
];
