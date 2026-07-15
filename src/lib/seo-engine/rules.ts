export interface RuleCheckResult {
  passed: boolean;
  actualValue?: string | number;
  message: string;
}

export interface SEORule {
  id: string;
  name: string;
  description: string;
  category: "seo" | "readability" | "technical" | "schema" | "images" | "eeat";
  enabled: boolean;
  weight: number; // Impact weight within its category (0 to 100)
  validate(context: EvaluationContext): RuleCheckResult;
}

export interface EvaluationContext {
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData: string;
  featuredImage: string;
  featuredImageAlt: string;
  parsedImages: { url: string; alt: string }[];
  parsedLinks: { url: string; anchorText: string; isExternal: boolean; isBroken: boolean }[];
  authorBio: string;
  authorCredentials: string;
}

// Configurable rules library
export const seoRules: SEORule[] = [
  // === 1. SEO CATEGORY RULES ===
  {
    id: "keyword-in-title",
    name: "Focus Keyword in Meta Title",
    description: "Check if the focus keyword is present in the SEO Meta Title.",
    category: "seo",
    enabled: true,
    weight: 20,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
      const passed = ctx.metaTitle.toLowerCase().includes(ctx.focusKeyword.toLowerCase());
      return {
        passed,
        message: passed 
          ? "Focus keyword found in SEO title." 
          : "Focus keyword is missing from SEO title.",
      };
    },
  },
  {
    id: "keyword-in-description",
    name: "Focus Keyword in Meta Description",
    description: "Check if the focus keyword is present in the SEO Meta Description.",
    category: "seo",
    enabled: true,
    weight: 15,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
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
    id: "keyword-in-slug",
    name: "Focus Keyword in URL Slug",
    description: "Check if the focus keyword is present in the URL slug.",
    category: "seo",
    enabled: true,
    weight: 15,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
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
    id: "title-length",
    name: "Meta Title Length Check",
    description: "Check if the SEO Meta Title is between 50 and 60 characters.",
    category: "seo",
    enabled: true,
    weight: 10,
    validate(ctx) {
      const len = ctx.metaTitle.length;
      const passed = len >= 50 && len <= 60;
      return {
        passed,
        actualValue: len,
        message: passed 
          ? `Meta title length is optimal (${len} chars).` 
          : `Meta title length is ${len} chars (recommended: 50-60).`,
      };
    },
  },
  {
    id: "description-length",
    name: "Meta Description Length Check",
    description: "Check if the SEO Meta Description is between 120 and 160 characters.",
    category: "seo",
    enabled: true,
    weight: 10,
    validate(ctx) {
      const len = ctx.metaDescription.length;
      const passed = len >= 120 && len <= 160;
      return {
        passed,
        actualValue: len,
        message: passed 
          ? `Meta description length is optimal (${len} chars).` 
          : `Meta description length is ${len} chars (recommended: 120-160).`,
      };
    },
  },
  {
    id: "keyword-in-first-paragraph",
    name: "Focus Keyword in Content Start",
    description: "Check if the focus keyword appears in the first 100 words of content.",
    category: "seo",
    enabled: true,
    weight: 15,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
      const words = ctx.content.slice(0, 500).toLowerCase();
      const passed = words.includes(ctx.focusKeyword.toLowerCase());
      return {
        passed,
        message: passed 
          ? "Focus keyword appears early in the content." 
          : "Focus keyword is missing from the first paragraph.",
      };
    },
  },
  {
    id: "keyword-density",
    name: "Focus Keyword Density Check",
    description: "Verify if the focus keyword density is between 1.0% and 2.5%.",
    category: "seo",
    enabled: true,
    weight: 15,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
      const textWords = ctx.content.split(/\s+/).filter(Boolean);
      const wordCount = textWords.length;
      if (wordCount === 0) return { passed: false, message: "No content found." };

      const regex = new RegExp(`\\b${ctx.focusKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
      const occurrences = (ctx.content.match(regex) || []).length;
      const density = (occurrences / wordCount) * 100;
      const passed = density >= 1.0 && density <= 2.5;
      
      return {
        passed,
        actualValue: `${density.toFixed(2)}%`,
        message: passed
          ? `Keyword density is optimal (${density.toFixed(2)}% - ${occurrences} occurrences).`
          : `Keyword density is ${density.toFixed(2)}% (${occurrences} occurrences). Recommended range: 1.0% - 2.5%.`,
      };
    },
  },

  // === 2. READABILITY CATEGORY RULES ===
  {
    id: "word-count",
    name: "Minimum Word Count Check",
    description: "Ensure the content word count is at least 600 words.",
    category: "readability",
    enabled: true,
    weight: 30,
    validate(ctx) {
      const words = ctx.content.split(/\s+/).filter(Boolean).length;
      const passed = words >= 600;
      return {
        passed,
        actualValue: words,
        message: passed
          ? `Word count is sufficient (${words} words).`
          : `Content contains only ${words} words. Recommended minimum: 600 words.`,
      };
    },
  },
  {
    id: "heading-hierarchy",
    name: "Heading Structures Check",
    description: "Verify if heading tags are ordered correctly (H1 -> H2 -> H3).",
    category: "readability",
    enabled: true,
    weight: 30,
    validate(ctx) {
      const headingMatches = ctx.content.match(/<h([1-6])/gi) || [];
      const levels = headingMatches.map(h => parseInt(h.replace(/[^1-6]/g, "")));
      
      let passed = true;
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] - levels[i-1] > 1) {
          passed = false;
          break;
        }
      }
      return {
        passed,
        message: passed
          ? "Heading hierarchy is correct."
          : "Heading hierarchy has jumps (e.g. H2 directly to H4 without an H3).",
      };
    },
  },
  {
    id: "short-sentences",
    name: "Sentence Complexity Check",
    description: "Check if at least 75% of sentences are under 20 words.",
    category: "readability",
    enabled: true,
    weight: 20,
    validate(ctx) {
      const sentences = ctx.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      if (sentences.length === 0) return { passed: true, message: "No text found." };

      const shortSentences = sentences.filter(s => s.split(/\s+/).filter(Boolean).length < 20);
      const ratio = shortSentences.length / sentences.length;
      const passed = ratio >= 0.75;
      return {
        passed,
        actualValue: `${Math.round(ratio * 100)}%`,
        message: passed
          ? `${Math.round(ratio * 100)}% of sentences are short and clear.`
          : `Only ${Math.round(ratio * 100)}% of sentences are under 20 words. Simplify long sentences.`,
      };
    },
  },
  {
    id: "paragraph-length",
    name: "Paragraph Density Check",
    description: "Ensure no paragraph exceeds 150 words.",
    category: "readability",
    enabled: true,
    weight: 20,
    validate(ctx) {
      // Split by paragraph tags or newlines
      const paragraphs = ctx.content.split(/<\/p>|<br\s*\/?>|\n\n/).filter(p => p.trim().length > 0);
      const longParagraphs = paragraphs.filter(p => p.split(/\s+/).filter(Boolean).length > 150);
      const passed = longParagraphs.length === 0;
      return {
        passed,
        actualValue: longParagraphs.length,
        message: passed
          ? "Paragraph lengths are optimal."
          : `${longParagraphs.length} paragraphs exceed 150 words. Break them down.`,
      };
    },
  },

  // === 3. TECHNICAL CATEGORY RULES ===
  {
    id: "canonical-set",
    name: "Canonical Link Presence",
    description: "Check if a custom canonical URL is specified.",
    category: "technical",
    enabled: true,
    weight: 30,
    validate(ctx) {
      const passed = !!ctx.canonicalUrl;
      return {
        passed,
        message: passed
          ? `Canonical link set to: ${ctx.canonicalUrl}`
          : "Canonical link is missing. Default routing will be used.",
      };
    },
  },
  {
    id: "indexing-enabled",
    name: "Search Indexing Status Check",
    description: "Verify that the page is crawlable (noindex tag is disabled).",
    category: "technical",
    enabled: true,
    weight: 30,
    validate(ctx) {
      const passed = !ctx.noIndex;
      return {
        passed,
        message: passed
          ? "Page is set to INDEX. Search engines can crawl it."
          : "Warning: Page is set to NOINDEX. It will be hidden from search results.",
      };
    },
  },
  {
    id: "internal-links",
    name: "Internal Linking Check",
    description: "Ensure the page has at least 2 internal links.",
    category: "technical",
    enabled: true,
    weight: 20,
    validate(ctx) {
      const count = ctx.parsedLinks.filter(l => !l.isExternal).length;
      const passed = count >= 2;
      return {
        passed,
        actualValue: count,
        message: passed
          ? `Found ${count} internal links.`
          : `Found only ${count} internal links. Add links to relevant local pages.`,
      };
    },
  },
  {
    id: "external-links",
    name: "Outbound External Link Check",
    description: "Ensure the page contains at least 1 external link.",
    category: "technical",
    enabled: true,
    weight: 20,
    validate(ctx) {
      const count = ctx.parsedLinks.filter(l => l.isExternal).length;
      const passed = count >= 1;
      return {
        passed,
        actualValue: count,
        message: passed
          ? `Found ${count} external links.`
          : `Add at least one high-authority external link to outbound sources.`,
      };
    },
  },

  // === 4. SCHEMA STRUCTURE RULES ===
  {
    id: "schema-configured",
    name: "JSON-LD Structured Schema Present",
    description: "Verify structured schema markup exists.",
    category: "schema",
    enabled: true,
    weight: 50,
    validate(ctx) {
      const passed = ctx.structuredData.trim().length > 0;
      return {
        passed,
        message: passed
          ? "JSON-LD schema structured markup is present."
          : "JSON-LD schema is missing. Add schema objects for rich results.",
      };
    },
  },
  {
    id: "schema-valid-json",
    name: "Schema Compilation Check",
    description: "Verify the structured schema compiles into valid JSON syntax.",
    category: "schema",
    enabled: true,
    weight: 50,
    validate(ctx) {
      if (ctx.structuredData.trim().length === 0) {
        return { passed: false, message: "No schema code found." };
      }
      try {
        JSON.parse(ctx.structuredData);
        return { passed: true, message: "JSON-LD compiles successfully." };
      } catch (e) {
        return { passed: false, message: "Invalid JSON-LD schema syntax." };
      }
    },
  },

  // === 5. IMAGES SEO RULES ===
  {
    id: "featured-image",
    name: "Featured Social Image Check",
    description: "Verify a featured banner image is defined.",
    category: "images",
    enabled: true,
    weight: 30,
    validate(ctx) {
      const passed = !!ctx.featuredImage;
      return {
        passed,
        message: passed
          ? "Featured image is configured."
          : "Featured image is missing. Social shares will display blank banners.",
      };
    },
  },
  {
    id: "image-alt-tags",
    name: "Image Alt Text Configuration",
    description: "Check if all parsed images in content have descriptive alt text tags.",
    category: "images",
    enabled: true,
    weight: 40,
    validate(ctx) {
      if (ctx.parsedImages.length === 0) {
        return { passed: true, message: "No inline images found in content." };
      }
      const missingAlt = ctx.parsedImages.filter(img => !img.alt || img.alt.trim().length === 0);
      const passed = missingAlt.length === 0;
      return {
        passed,
        actualValue: missingAlt.length,
        message: passed
          ? "All inline images have ALT descriptions."
          : `${missingAlt.length} images are missing ALT description tags.`,
      };
    },
  },
  {
    id: "image-alt-keyword",
    name: "Focus Keyword in Image Alt",
    description: "Verify that at least one image alt tag contains the focus keyword.",
    category: "images",
    enabled: true,
    weight: 30,
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword defined." };
      const keywordLower = ctx.focusKeyword.toLowerCase();
      const hasKeyword = ctx.parsedImages.some(img => img.alt.toLowerCase().includes(keywordLower));
      
      const passed = hasKeyword || ctx.featuredImageAlt.toLowerCase().includes(keywordLower);
      return {
        passed,
        message: passed
          ? "Focus keyword found in image ALT tag descriptions."
          : "Focus keyword not found in any image ALT tags.",
      };
    },
  },

  // === 6. EEAT AUTHOR PROFILE RULES ===
  {
    id: "author-bio-complete",
    name: "Author Biography Depth Check",
    description: "Verify author description contains at least 30 words.",
    category: "eeat",
    enabled: true,
    weight: 50,
    validate(ctx) {
      const wordCount = ctx.authorBio.split(/\s+/).filter(Boolean).length;
      const passed = wordCount >= 30;
      return {
        passed,
        actualValue: wordCount,
        message: passed
          ? "Author biography is detailed."
          : "Author biography is too short. Describe author expertise in detail.",
      };
    },
  },
  {
    id: "author-credentials",
    name: "Author Credentials Present",
    description: "Verify that academic, professional, or industrial credentials are listed.",
    category: "eeat",
    enabled: true,
    weight: 50,
    validate(ctx) {
      const passed = !!ctx.authorCredentials && ctx.authorCredentials.trim().length > 5;
      return {
        passed,
        message: passed
          ? "Author credentials verified."
          : "Author credentials missing. Add credentials to establish trust (EEAT).",
      };
    },
  },
];
