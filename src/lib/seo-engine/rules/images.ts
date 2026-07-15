import { SEORule } from "../types";

export const imageRules: SEORule[] = [
  {
    id: "featured-image-present-check",
    category: "images",
    name: "Featured Image Defined",
    description: "Verify that a featured/OG image is set for social cards and previews.",
    weight: 25,
    enabled: true,
    severity: "error",
    recommendation: "Select a featured image to serve as the default graphic during link sharing.",
    validate(ctx) {
      const passed = !!ctx.featuredImage;
      return {
        passed,
        message: passed
          ? "Featured image configured."
          : "Featured image is missing.",
      };
    },
  },
  {
    id: "inline-images-alt-check",
    category: "images",
    name: "Inline Images Alt Text Check",
    description: "Check if all images embedded within the content body contain alt tags.",
    weight: 25,
    enabled: true,
    severity: "error",
    recommendation: "Add descriptive Alt text tags to all inline content images to aid screen readers and search indexers.",
    validate(ctx) {
      if (ctx.parsedImages.length === 0) return { passed: true, message: "No inline images found." };
      const missing = ctx.parsedImages.filter(img => !img.alt || img.alt.trim().length === 0);
      const passed = missing.length === 0;
      return {
        passed,
        actualValue: missing.length,
        message: passed
          ? "All inline images have ALT tags."
          : `${missing.length} inline images are missing descriptive ALT tags.`,
      };
    },
  },
  {
    id: "image-keyword-alt",
    category: "images",
    name: "Focus Keyword in Image Alt",
    description: "Verify that at least one image alt tag contains the primary focus keyword.",
    weight: 15,
    enabled: true,
    severity: "warning",
    recommendation: "Ensure at least one image has the primary focus keyword in its Alt text description.",
    validate(ctx) {
      if (!ctx.focusKeyword) return { passed: false, message: "No focus keyword configured." };
      const kw = ctx.focusKeyword.toLowerCase();
      const hasInlineKw = ctx.parsedImages.some(img => img.alt.toLowerCase().includes(kw));
      const hasFeaturedKw = ctx.featuredImageAlt.toLowerCase().includes(kw);
      
      const passed = hasInlineKw || hasFeaturedKw;
      return {
        passed,
        message: passed
          ? "Focus keyword matches found in image ALT tags."
          : "Focus keyword not found in any image ALT descriptions.",
      };
    },
  },
  {
    id: "image-filenames-descriptive",
    category: "images",
    name: "Descriptive Image Filenames",
    description: "Ensure image filenames use descriptive hyphenated words instead of default numbers.",
    weight: 15,
    enabled: true,
    severity: "suggestion",
    recommendation: "Rename generic image files (e.g. 'DSC_0023.jpg') to descriptive hyphenated terms matching the graphic topic.",
    validate(ctx) {
      const allImages = [...ctx.parsedImages.map(img => img.url), ctx.featuredImage].filter(Boolean) as string[];
      if (allImages.length === 0) return { passed: true, message: "No images found." };

      const genericPattern = /(?:dsc|img|screenshot|image|photo|pic|Untitled|_\d+|\b\d+\b)/i;
      const genericFiles = allImages.filter(url => {
        const filename = url.split("/").pop() || "";
        return genericPattern.test(filename) || filename.replace(/[^0-9]/g, "").length > 8;
      });

      const passed = genericFiles.length === 0;
      return {
        passed,
        actualValue: genericFiles.length,
        message: passed
          ? "All image filenames appear descriptive."
          : `${genericFiles.length} images use generic filenames (e.g., 'screenshot'). Rename them.`,
      };
    },
  },
  {
    id: "image-formats-nextgen",
    category: "images",
    name: "Next-Gen Image Format Check",
    description: "Verify that inline images utilize WebP or AVIF compression formats.",
    weight: 20,
    enabled: true,
    severity: "warning",
    recommendation: "Convert PNG and JPEG images to WebP or AVIF formats to improve page loading speed.",
    validate(ctx) {
      const allImages = [...ctx.parsedImages.map(img => img.url), ctx.featuredImage].filter(Boolean) as string[];
      if (allImages.length === 0) return { passed: true, message: "No images found." };

      const legacyImages = allImages.filter(url => {
        const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
        return ext === "png" || ext === "jpg" || ext === "jpeg";
      });

      const passed = legacyImages.length === 0;
      return {
        passed,
        actualValue: legacyImages.length,
        message: passed
          ? "All images utilize optimized web formats."
          : `${legacyImages.length} images use legacy formats (PNG/JPG). Convert them to WebP/AVIF.`,
      };
    },
  },
];
