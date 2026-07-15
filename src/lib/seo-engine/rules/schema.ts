import { SEORule } from "../types";

export const schemaRules: SEORule[] = [
  {
    id: "schema-presence-check",
    category: "schema",
    name: "Structured Schema Configured",
    description: "Verify that JSON-LD structured schema script is specified.",
    weight: 40,
    enabled: true,
    severity: "error",
    recommendation: "Generate and configure a JSON-LD schema (FAQPage, LocalBusiness, Article) to obtain search snippets.",
    validate(ctx) {
      const passed = !!ctx.structuredData && ctx.structuredData.trim().length > 0;
      return {
        passed,
        message: passed
          ? "Structured data schema is configured."
          : "Structured data schema (JSON-LD) is missing.",
      };
    },
  },
  {
    id: "schema-syntax-check",
    category: "schema",
    name: "Schema Compilation Check",
    description: "Verify structured schema parses into valid JSON syntax without errors.",
    weight: 40,
    enabled: true,
    severity: "error",
    recommendation: "Ensure your custom JSON-LD structured schema has no missing brackets, tags, or commas.",
    validate(ctx) {
      if (!ctx.structuredData || ctx.structuredData.trim().length === 0) {
        return { passed: false, message: "No schema content to compile." };
      }
      try {
        JSON.parse(ctx.structuredData);
        return {
          passed: true,
          message: "JSON-LD schema compiles successfully.",
        };
      } catch (e) {
        return {
          passed: false,
          message: `JSON syntax error: ${(e as Error).message}`,
        };
      }
    },
  },
  {
    id: "schema-type-check",
    category: "schema",
    name: "Recognized Schema Type",
    description: "Verify that the JSON-LD schema matches a standard schema type (Organization, Service, FAQPage, Article).",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Structure schemas under standard, recognized Google Rich Results types (e.g. FAQPage, Article, LocalBusiness).",
    validate(ctx) {
      if (!ctx.structuredData || ctx.structuredData.trim().length === 0) {
        return { passed: false, message: "No schema content." };
      }
      try {
        const obj = JSON.parse(ctx.structuredData);
        const type = obj["@type"] || (obj["@graph"] && obj["@graph"][0]?.["@type"]);
        
        const standardTypes = ["Organization", "WebSite", "Service", "FAQPage", "Article", "LocalBusiness", "Product", "HowTo"];
        const passed = !!type && standardTypes.includes(type);
        
        return {
          passed,
          actualValue: type || "None",
          message: passed
            ? `Schema type '${type}' is recognized.`
            : `Schema type '${type || "None"}' is not standard. Use FAQPage, LocalBusiness, Article, etc.`,
        };
      } catch (e) {
        return { passed: false, message: "Could not parse schema structure." };
      }
    },
  },
];
