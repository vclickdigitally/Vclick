import { runSeoDiagnostics, extractContentAssets } from "../src/lib/seo-engine/processor";
import { EvaluationContext } from "../src/lib/seo-engine/types";
import { ruleRegistry } from "../src/lib/seo-engine/registry";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

// Helper to create a base mock context
function createBaseContext(): EvaluationContext {
  return {
    content: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    focusKeyword: "",
    secondaryKeywords: [],
    canonicalUrl: "",
    noIndex: false,
    noFollow: false,
    structuredData: "",
    featuredImage: "",
    featuredImageAlt: "",
    parsedImages: [],
    parsedLinks: [],
    authorBio: "",
    authorCredentials: "",
    updatedAt: new Date(),
    sitemapPath: "",
    hasHttps: true
  };
}

async function executeTestSuite() {
  console.log("=================================================================");
  console.log("             VCLICK SEO STUDIO - TEST HARNESS REPORT             ");
  console.log("=================================================================\n");

  const resultsSummary: { test: string; overallScore: number; status: string }[] = [];

  // ==========================================
  // CASE 1: Perfect SEO-Optimized Page
  // ==========================================
  console.log("Executing Test Case 1: Perfect Page...");
  const perfectCtx = createBaseContext();
  perfectCtx.content = `
    <h1>SEO Marketing Sprints Chennai</h1>
    <p>In addition, our expert agency offers SEO marketing sprints to boost organic growth and web conversions.</p>
    <p>This is a secondary paragraph containing SEO marketing sprints keyword mapping. However, we also guarantee performance.</p>
    <p>Furthermore, local optimization is critical. Therefore, technical audits ensure search spiders crawl the structure.</p>
    <ul>
      <li>Keyword tracking tools</li>
      <li>Sitemap validation indexes</li>
    </ul>
    <table>
      <thead><tr><th>Metric</th><th>Yoast</th><th>VClick Studio</th></tr></thead>
      <tbody><tr><td>Speed</td><td>C</td><td>A+</td></tr></tbody>
    </table>
    <img src="/img/audit-flow.webp" alt="SEO marketing sprints audit flowchart" />
    <a href="/services/seo">Technical SEO Details</a>
    <a href="https://google.com">Outbound Authority Reference</a>
  `;
  perfectCtx.metaTitle = "SEO Marketing Sprints Chennai | VClick Digitally";
  perfectCtx.metaDescription = "Get the best SEO marketing sprints in Chennai. We deliver organic optimization, keyword mappings, and technical audits to rank page one.";
  perfectCtx.slug = "seo-marketing-sprints-chennai";
  perfectCtx.focusKeyword = "SEO marketing sprints";
  perfectCtx.secondaryKeywords = ["organic growth", "technical audits"];
  perfectCtx.canonicalUrl = "https://vclickdigitally.com/services/seo-sprints";
  perfectCtx.structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO Sprints"
  });
  perfectCtx.featuredImage = "/img/featured-sprints.webp";
  perfectCtx.featuredImageAlt = "SEO marketing sprints banner";
  perfectCtx.authorBio = "Certified Next.js developer with over 5 years of organic search marketing experience.";
  perfectCtx.authorCredentials = "Google Search Certified Expert";
  perfectCtx.sitemapPath = "/sitemap.xml";

  const perfectAssets = extractContentAssets(perfectCtx.content);
  perfectCtx.parsedImages = perfectAssets.parsedImages;
  perfectCtx.parsedLinks = perfectAssets.parsedLinks;

  const perfectRes = runSeoDiagnostics(perfectCtx);
  assert(perfectRes.overallScore >= 90, `Perfect page should score highly. Got: ${perfectRes.overallScore}`);
  resultsSummary.push({ test: "Perfect Optimized Page", overallScore: perfectRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 2: Empty Page Content
  // ==========================================
  console.log("Executing Test Case 2: Empty Page...");
  const emptyCtx = createBaseContext();
  const emptyRes = runSeoDiagnostics(emptyCtx);
  assert(emptyRes.overallScore < 30, `Empty page should score very low. Got: ${emptyRes.overallScore}`);
  resultsSummary.push({ test: "Empty Content Page", overallScore: emptyRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 3: Missing Metadata
  // ==========================================
  console.log("Executing Test Case 3: Missing Metadata...");
  const missingMetaCtx = { ...perfectCtx, metaTitle: "", metaDescription: "" };
  const missingMetaRes = runSeoDiagnostics(missingMetaCtx);
  assert(missingMetaRes.overallScore < perfectRes.overallScore, "Score should drop if meta title/desc is empty");
  assert(missingMetaRes.failedRules.some(r => r.id === "title-present" || r.id === "description-present"), "Should flag missing metas");
  resultsSummary.push({ test: "Missing Metadata page", overallScore: missingMetaRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 4: Missing JSON-LD Schema
  // ==========================================
  console.log("Executing Test Case 4: Missing Schema...");
  const missingSchemaCtx = { ...perfectCtx, structuredData: "" };
  const missingSchemaRes = runSeoDiagnostics(missingSchemaCtx);
  assert(missingSchemaRes.categoryScores["schema"] === 0, "Schema category score should be 0");
  resultsSummary.push({ test: "Missing Schema page", overallScore: missingSchemaRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 5: No Images
  // ==========================================
  console.log("Executing Test Case 5: No Images...");
  const noImagesCtx = { ...perfectCtx, content: perfectCtx.content.replace(/<img[^>]*>/gi, ""), featuredImage: "" };
  noImagesCtx.parsedImages = [];
  const noImagesRes = runSeoDiagnostics(noImagesCtx);
  assert(noImagesRes.categoryScores["images"] < 50, "Images score should drop significantly");
  resultsSummary.push({ test: "No Images page", overallScore: noImagesRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 6: Large Article (5000+ words)
  // ==========================================
  console.log("Executing Test Case 6: Large Article (5000+ words)...");
  const largeCtx = { ...perfectCtx };
  // Generate 5200 words
  const paragraphText = "VClick Digitally offers advanced search optimization engines and React Next.js development sprint services in Chennai. ";
  largeCtx.content = "<h1>Large SEO Strategy Article</h1>" + paragraphText.repeat(480);
  const largeRes = runSeoDiagnostics(largeCtx);
  assert(largeRes.metrics.wordCount >= 5000, `Word count should exceed 5000. Got: ${largeRes.metrics.wordCount}`);
  resultsSummary.push({ test: "Large Article (5000+ words)", overallScore: largeRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 7: Multiple/Mismatched Keywords
  // ==========================================
  console.log("Executing Test Case 7: Mismatched Keywords...");
  const mismatchCtx = { ...perfectCtx, focusKeyword: "Unused Random Phrase" };
  const mismatchRes = runSeoDiagnostics(mismatchCtx);
  assert(mismatchRes.overallScore < perfectRes.overallScore, "Score should drop if keyword density is 0%");
  assert(mismatchRes.metrics.keywordDensity === 0, "Keyword density should be exactly 0%");
  resultsSummary.push({ test: "Mismatched Keyword page", overallScore: mismatchRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 8: Duplicate H1 Heading Tags
  // ==========================================
  console.log("Executing Test Case 8: Duplicate H1s...");
  const dupH1Ctx = { ...perfectCtx };
  dupH1Ctx.content = "<h1>First H1 Heading</h1><h1>Second H1 Heading</h1>" + perfectCtx.content;
  const dupH1Res = runSeoDiagnostics(dupH1Ctx);
  assert(dupH1Res.failedRules.some(r => r.id === "h1-presence"), "Should fail H1 tag uniqueness check");
  resultsSummary.push({ test: "Duplicate H1 Headings page", overallScore: dupH1Res.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 9: Broken Internal Links
  // ==========================================
  console.log("Executing Test Case 9: Broken Links...");
  const brokenLinksCtx = { ...perfectCtx };
  // Inject a link marked broken
  brokenLinksCtx.parsedLinks = [
    { url: "/broken-path", anchorText: "Broken link test", isExternal: false, isBroken: true }
  ];
  const brokenLinksRes = runSeoDiagnostics(brokenLinksCtx);
  assert(brokenLinksRes.failedRules.some(r => r.id === "links-broken-scan"), "Should fail broken link check");
  resultsSummary.push({ test: "Broken Link page", overallScore: brokenLinksRes.overallScore, status: "PASSED" });

  // ==========================================
  // CASE 10: Invalid JSON-LD Syntax
  // ==========================================
  console.log("Executing Test Case 10: Invalid JSON-LD...");
  const invalidJsonCtx = { ...perfectCtx, structuredData: "{ invalid-json-brackets" };
  const invalidJsonRes = runSeoDiagnostics(invalidJsonCtx);
  assert(invalidJsonRes.failedRules.some(r => r.id === "schema-syntax-check"), "Should fail JSON parsing check");
  resultsSummary.push({ test: "Invalid JSON-LD page", overallScore: invalidJsonRes.overallScore, status: "PASSED" });

  // ==========================================
  // TEST REPORT OUTPUT
  // ==========================================
  console.log("\n=================================================================");
  console.log("                 VCLICK SEO STUDIO TEST HARNESS RESULT SUMMARY  ");
  console.log("=================================================================");
  console.table(resultsSummary);
  console.log("\n=================================================================");
  console.log("ALL 10 UNIT TEST CASES COMPLETED SUCCESSFULLY!");
  console.log("=================================================================");
}

executeTestSuite().catch((e) => {
  console.error("❌ TEST HARNESS CRASHED:", e);
  process.exit(1);
});
