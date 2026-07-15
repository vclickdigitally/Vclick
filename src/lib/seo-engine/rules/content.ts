import { SEORule } from "../types";

export const contentRules: SEORule[] = [
  {
    id: "word-count-min",
    category: "content",
    name: "Word Count Minimum",
    description: "Verify that the text copy contains at least 600 words.",
    weight: 25,
    enabled: true,
    severity: "error",
    recommendation: "Provide comprehensive content with at least 600 words to satisfy search engine query depth requirements.",
    validate(ctx) {
      const words = ctx.content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
      const passed = words >= 600;
      return {
        passed,
        actualValue: words,
        message: passed
          ? `Content word count is sufficient (${words} words).`
          : `Content contains only ${words} words. Expand the text copy.`,
      };
    },
  },
  {
    id: "paragraph-length-limit",
    category: "content",
    name: "Optimal Paragraph Word Count",
    description: "Ensure that no paragraph contains more than 150 words.",
    weight: 15,
    enabled: true,
    severity: "warning",
    recommendation: "Break long paragraphs of text into smaller, scannable paragraphs of 3-4 sentences (under 150 words) to improve mobile reading.",
    validate(ctx) {
      const paragraphs = ctx.content.split(/<\/p>|<br\s*\/?>|\n\n/).map(p => p.replace(/<[^>]*>/g, " ").trim()).filter(p => p.length > 0);
      const longParagraphs = paragraphs.filter(p => p.split(/\s+/).filter(Boolean).length > 150);
      const passed = longParagraphs.length === 0;
      return {
        passed,
        actualValue: longParagraphs.length,
        message: passed
          ? "All paragraph blocks are under the 150 words threshold."
          : `${longParagraphs.length} paragraphs exceed 150 words. Divide them into shorter blocks.`,
      };
    },
  },
  {
    id: "sentence-complexity",
    category: "content",
    name: "Clear Sentence Structuring",
    description: "Check if at least 70% of sentences contain fewer than 20 words.",
    weight: 15,
    enabled: true,
    severity: "warning",
    recommendation: "Use shorter sentences (under 20 words) to make content accessible and easy to parse.",
    validate(ctx) {
      const plainText = ctx.content.replace(/<[^>]*>/g, " ");
      const sentences = plainText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
      if (sentences.length === 0) return { passed: true, message: "No text content detected." };

      const shortSentences = sentences.filter(s => s.split(/\s+/).filter(Boolean).length < 20);
      const ratio = shortSentences.length / sentences.length;
      const passed = ratio >= 0.70;
      return {
        passed,
        actualValue: `${Math.round(ratio * 100)}%`,
        message: passed
          ? `${Math.round(ratio * 100)}% of sentences are short and clear.`
          : `Only ${Math.round(ratio * 100)}% of sentences are under 20 words. Simplify complex sentences.`,
      };
    },
  },
  {
    id: "list-usage",
    category: "content",
    name: "Bullet/Numbered Lists Check",
    description: "Detect if bullet points or numbered list layouts are used to improve scannability.",
    weight: 10,
    enabled: true,
    severity: "suggestion",
    recommendation: "Incorporate lists (bullet points or numbered guides) to break up thick text blocks and summarize steps.",
    validate(ctx) {
      const passed = ctx.content.includes("<ul>") || ctx.content.includes("<ol>") || ctx.content.includes("<li>");
      return {
        passed,
        message: passed
          ? "Lists (ul/ol) are used correctly in the page styling."
          : "No bulleted or ordered lists found. Structure complex lists as bulleted steps.",
      };
    },
  },
  {
    id: "table-usage",
    category: "content",
    name: "Structured Tables Usage",
    description: "Detect if data tables are incorporated to present compared information.",
    weight: 10,
    enabled: true,
    severity: "suggestion",
    recommendation: "Use tables to present numeric metrics, comparison data, or structured specs.",
    validate(ctx) {
      const passed = ctx.content.includes("<table") || ctx.content.includes("</thead>");
      return {
        passed,
        message: passed
          ? "Data tables are utilized for comparative structuring."
          : "No tables found. Consider using a comparison table for structured data.",
      };
    },
  },
  {
    id: "cta-presence",
    category: "content",
    name: "Call To Action (CTA) Detection",
    description: "Verify that the page copy includes links or buttons prompting conversions.",
    weight: 15,
    enabled: true,
    severity: "error",
    recommendation: "Embed at least one call-to-action link or sign-up button to capture intent and conversions.",
    validate(ctx) {
      const ctaPhrases = [
        "get your free", "contact us", "talk to", "sign up", "book a", 
        "schedule", "start project", "estimate", "consultation", "audit"
      ];
      const plainText = ctx.content.toLowerCase();
      const passed = ctaPhrases.some(phrase => plainText.includes(phrase));
      return {
        passed,
        message: passed
          ? "Conversion CTA triggers found in the copy."
          : "No conversion CTA triggers detected (e.g. 'Get Free Audit', 'Contact Us'). Add a call-to-action.",
      };
    },
  },
];
