import { SEORule } from "../types";

export const linkRules: SEORule[] = [
  {
    id: "links-internal-min",
    category: "links",
    name: "Minimum Internal Links Check",
    description: "Ensure that at least 2 internal links exist to distribute search equity.",
    weight: 35,
    enabled: true,
    severity: "warning",
    recommendation: "Embed at least 2 internal links to other local pages on your website.",
    validate(ctx) {
      const count = ctx.parsedLinks.filter(l => !l.isExternal).length;
      const passed = count >= 2;
      return {
        passed,
        actualValue: count,
        message: passed
          ? `Found ${count} internal links.`
          : `Found only ${count} internal links. Target is at least 2.`,
      };
    },
  },
  {
    id: "links-external-min",
    category: "links",
    name: "Outbound External Reference Link",
    description: "Ensure that the page copy has at least 1 link to a external authoritative source.",
    weight: 35,
    enabled: true,
    severity: "suggestion",
    recommendation: "Provide at least 1 outbound external reference link to back up your research and claims.",
    validate(ctx) {
      const count = ctx.parsedLinks.filter(l => l.isExternal).length;
      const passed = count >= 1;
      return {
        passed,
        actualValue: count,
        message: passed
          ? `Found ${count} external reference links.`
          : "Add at least one high-authority outbound reference link.",
      };
    },
  },
  {
    id: "links-broken-scan",
    category: "links",
    name: "Zero Broken Links Compliance",
    description: "Audit all parsed links to verify that none are broken (returning 404/500).",
    weight: 30,
    enabled: true,
    severity: "error",
    recommendation: "Audit and fix broken links (links marked isBroken) in your SEO Link Center.",
    validate(ctx) {
      const broken = ctx.parsedLinks.filter(l => l.isBroken);
      const passed = broken.length === 0;
      return {
        passed,
        actualValue: broken.length,
        message: passed
          ? "No broken links detected."
          : `Found ${broken.length} broken links. Fix them immediately.`,
      };
    },
  },
];
