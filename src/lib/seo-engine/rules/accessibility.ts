import { SEORule } from "../types";

export const accessibilityRules: SEORule[] = [
  {
    id: "access-image-alt",
    category: "accessibility",
    name: "Screen Reader Image Alt Presence",
    description: "Check if all content images contain ALT descriptions for screen readers.",
    weight: 35,
    enabled: true,
    severity: "error",
    recommendation: "Ensure every inline image has a descriptive ALT attribute so blind users using screen readers can understand the graphic.",
    validate(ctx) {
      if (ctx.parsedImages.length === 0) return { passed: true, message: "No inline images found." };
      const missing = ctx.parsedImages.filter(img => !img.alt || img.alt.trim().length === 0);
      const passed = missing.length === 0;
      return {
        passed,
        actualValue: missing.length,
        message: passed
          ? "All inline images contain ALT texts."
          : `${missing.length} images lack ALT attributes. This violates WCAG guidelines.`,
      };
    },
  },
  {
    id: "access-heading-sequence",
    category: "accessibility",
    name: "Screen Reader Heading Hierarchy Sequence",
    description: "Verify that heading structures do not jump levels (e.g. H2 to H4 without an H3).",
    weight: 35,
    enabled: true,
    severity: "warning",
    recommendation: "Structure headings sequentially (H1, H2, H3, H4) without skipping levels, enabling screen readers to build clean page navigation trees.",
    validate(ctx) {
      const headingMatches = ctx.content.match(/<h([1-6])/gi) || [];
      const levels = headingMatches.map(h => parseInt(h.replace(/[^1-6]/g, "")));
      
      let passed = true;
      let culprit = "";
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] - levels[i-1] > 1) {
          passed = false;
          culprit = `H${levels[i-1]} to H${levels[i]}`;
          break;
        }
      }
      return {
        passed,
        message: passed
          ? "Heading tag hierarchy sequence is clean."
          : `Skipped levels in heading structure: (${culprit}). Keep hierarchy sequential.`,
      };
    },
  },
  {
    id: "access-descriptive-links",
    category: "accessibility",
    name: "Descriptive Link Anchors Check",
    description: "Ensure anchor labels are descriptive, avoiding generic text like 'click here' or 'read more'.",
    weight: 30,
    enabled: true,
    severity: "warning",
    recommendation: "Replace generic link phrases (e.g. 'click here') with descriptive, target-focused anchor copy.",
    validate(ctx) {
      const genericPhrases = ["click here", "read more", "link", "go here", "visit website", "learn more"];
      const genericLinks = ctx.parsedLinks.filter(l => 
        genericPhrases.includes(l.anchorText.toLowerCase())
      );
      
      const passed = genericLinks.length === 0;
      return {
        passed,
        actualValue: genericLinks.length,
        message: passed
          ? "All link anchor labels appear descriptive."
          : `${genericLinks.length} links use generic anchors (e.g., 'click here'). Describe the target in the link text.`,
      };
    },
  },
];
