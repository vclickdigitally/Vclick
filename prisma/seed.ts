import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { runSeoDiagnostics, extractContentAssets } from "../src/lib/seo-engine/processor";
import { EvaluationContext } from "../src/lib/seo-engine/types";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting VClick SEO Studio database seeding...");

  // 1. Clean existing records to prevent unique constraints during re-seeding
  await prisma.auditLog.deleteMany({});
  await prisma.redirect.deleteMany({});
  await prisma.mediaAsset.deleteMany({});
  await prisma.linkRelation.deleteMany({});
  await prisma.sEOHistory.deleteMany({});
  await prisma.sEOAnalysis.deleteMany({});
  await prisma.sEOConfiguration.deleteMany({});
  await prisma.pageHistory.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.blogHistory.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.websiteSettings.deleteMany({});
  await prisma.setting.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Hash default admin password
  const defaultPassword = "VClickAdmin2026!";
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(defaultPassword, salt);

  // 3. Seed Users (with EEAT details)
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@vclickdigitally.com",
      name: "Super Administrator",
      password: hashedPassword,
      role: "SUPERADMIN",
      bio: "Google Certified Search Specialist with 10+ years of technical SEO optimization and Next.js page performance engineering experience.",
      credentials: "PhD in Search Engine Semantics & Performance",
      twitterUrl: "https://twitter.com/vclickadmin",
      linkedinUrl: "https://linkedin.com/in/vclickadmin",
      websiteUrl: "https://vclickdigitally.com",
      active: true,
    },
  });
  console.log(`👤 Seeded User: ${adminUser.email}`);

  // 4. Seed Global Registry Settings
  await prisma.setting.createMany({
    data: [
      { key: "google_analytics_id", value: "G-A1B2C3D4E5" },
      { key: "microsoft_clarity_id", value: "clarity-project-id-vclick" },
      { key: "sitemap_auto_ping", value: "true" },
      { key: "robots_txt_content", value: "User-agent: *\nAllow: /\nSitemap: https://vclickdigitally.com/sitemap.xml" },
    ],
  });
  console.log("⚙️ Seeded Global Registry Settings");

  // 5. Seed Website Settings with associated global SEO configuration
  const globalSEOConfig = await prisma.sEOConfiguration.create({
    data: {
      metaTitle: "VClick Digitally | Growth Marketing & Web Development Agency",
      metaDescription: "We build sub-second Next.js edge web applications and deliver organic organic visibility scaling engines.",
      focusKeyword: "Growth Marketing Agency",
      secondaryKeywords: "Next.js dev, Technical SEO, Chennai Agency",
      noIndex: false,
      noFollow: false,
      canonicalUrl: "https://vclickdigitally.com",
      ogTitle: "VClick Digitally | Sub-Second Web Flagships",
      ogDescription: "A custom-tailored, edge-rendered Next.js CMS scaling organic brand traffic.",
      ogImage: "/img/vclick-share-og.png",
      twitterCard: "summary_large_image",
    },
  });

  const websiteSettings = await prisma.websiteSettings.create({
    data: {
      name: "VClick Digitally",
      domain: "vclickdigitally.com",
      globalSEOId: globalSEOConfig.id,
    },
  });
  console.log(`🌐 Seeded WebsiteSettings: ${websiteSettings.name} (${websiteSettings.domain})`);

  // 6. Seed Redirects (with Hit Counts & Status codes)
  await prisma.redirect.createMany({
    data: [
      { source: "/old-about", destination: "/about", code: "R301", active: true, hitCount: 1450, notes: "SEO migration redirect" },
      { source: "/old-blog/growth-tips", destination: "/blog/seo-sprints", code: "R301", active: true, hitCount: 2840, notes: "Merged post redirect" },
      { source: "/promotions/summer-special", destination: "/services/seo", code: "R302", active: true, hitCount: 120, notes: "Temporary seasonal landing redirect" },
      { source: "/legal/old-terms", destination: "/terms-of-service", code: "R308", active: true, hitCount: 45, notes: "Permanent structural redirect" },
      { source: "/outdated-service-page", destination: "", code: "R410", active: true, hitCount: 310, notes: "Deleted page header code response" },
    ],
  });
  console.log("🔀 Seeded Redirect Analytics");

  // 7. Seed Media Assets (with duplicates, PNGs, and missing ALTs for audit tests)
  await prisma.mediaAsset.createMany({
    data: [
      { filename: "vclick-logo-light.webp", url: "/img/vclick-logo-light.webp", altText: "VClick Digitally logo graphic", size: 14200, mimeType: "image/webp", folder: "branding", width: 180, height: 40, hash: "hash-logo-1" },
      { filename: "DSC_8492.png", url: "/img/DSC_8492.png", altText: "", size: 1250000, mimeType: "image/png", folder: "team", width: 1200, height: 800, hash: "hash-generic-1" }, // Fails: PNG, Missing ALT, Generic name, Huge size
      { filename: "team-meeting.webp", url: "/img/team-meeting.webp", altText: "VClick Chennai agency team working", size: 94000, mimeType: "image/webp", folder: "team", width: 1200, height: 800, hash: "hash-optimized-1" },
      { filename: "duplicated-mockup.webp", url: "/img/duplicated-mockup.webp", altText: "Bento dashboard grid graphic", size: 45000, mimeType: "image/webp", folder: "portfolio", width: 800, height: 600, hash: "hash-logo-1" }, // Fails: Duplicate Hash (same as logo)
    ],
  });
  console.log("🖼️ Seeded Media Library assets");

  // 8. Seed Pages & Blogs with SEO Configurations
  // Define content mocks with varying levels of SEO compliance for validation
  const pagesSeedData = [
    {
      title: "Homepage",
      slug: "home",
      content: `
        <h1>Edge Rendered Web Flagships</h1>
        <p>In addition, VClick offers premium organic visibility sprints. We build sub-second web flagships custom-tailored to rank on Google from day one.</p>
        <p>This is a second paragraph. Organic visibility sprints are essential because search visibility compounds organic search traffic over time.</p>
        <p>Furthermore, local optimization is critical. Therefore, technical audits ensure search spiders crawl the structure.</p>
        <ul>
          <li>Keyword tracking</li>
          <li>Sitemap index files</li>
        </ul>
        <img src="/img/DSC_8492.png" alt="" />
        <a href="/services/seo">Technical SEO Details</a>
        <a href="https://google.com">Outbound Authority Reference</a>
      `,
      published: true,
      seo: {
        metaTitle: "Web Flagships & Organic Visibility Sprints | VClick",
        metaDescription: "We build sub-second Next.js edge web applications and deliver organic organic visibility scaling engines.",
        focusKeyword: "organic visibility sprints",
        secondaryKeywords: "Next.js dev, SEO Chennai",
        noIndex: false,
        noFollow: false,
        canonicalUrl: "https://vclickdigitally.com",
        structuredData: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": "VClick" }),
        featuredImage: "/img/homepage-og.webp",
        featuredImageAlt: "VClick Homepage graphics",
      }
    },
    {
      title: "Website Development",
      slug: "services/website-development",
      content: `
        <h1>High-Performance Web Design</h1>
        <p>We build high-converting, sub-second web design agency flagships custom-tailored to rank on Google from day one.</p>
        <p>No bullet points or CTA links here.</p>
        <img src="/img/broken-image.png" alt="Missing alt test" />
      `,
      published: false, // Draft Page
      seo: {
        metaTitle: "Web Development", // Too short (Fails)
        metaDescription: "", // Missing (Fails)
        focusKeyword: "web design agency",
        secondaryKeywords: "",
        noIndex: true, // Fails indexing check
        noFollow: true,
        canonicalUrl: "",
        structuredData: "", // Missing schema (Fails)
        featuredImage: "",
        featuredImageAlt: "",
      }
    }
  ];

  for (const pageData of pagesSeedData) {
    const page = await prisma.page.create({
      data: {
        title: pageData.title,
        slug: pageData.slug,
        content: pageData.content,
        published: pageData.published,
      }
    });

    const assets = extractContentAssets(pageData.content);
    
    // Create SEO Config
    const seoConfig = await prisma.sEOConfiguration.create({
      data: {
        pageId: page.id,
        metaTitle: pageData.seo.metaTitle,
        metaDescription: pageData.seo.metaDescription,
        focusKeyword: pageData.seo.focusKeyword,
        secondaryKeywords: pageData.seo.secondaryKeywords,
        noIndex: pageData.seo.noIndex,
        noFollow: pageData.seo.noFollow,
        canonicalUrl: pageData.seo.canonicalUrl,
        structuredData: pageData.seo.structuredData,
        featuredImage: pageData.seo.featuredImage,
        featuredImageAlt: pageData.seo.featuredImageAlt,
      }
    });

    // Run scoring engine at seed time
    const evalCtx: EvaluationContext = {
      content: page.content,
      metaTitle: seoConfig.metaTitle || "",
      metaDescription: seoConfig.metaDescription || "",
      slug: page.slug,
      focusKeyword: seoConfig.focusKeyword || "",
      secondaryKeywords: seoConfig.secondaryKeywords ? seoConfig.secondaryKeywords.split(",") : [],
      canonicalUrl: seoConfig.canonicalUrl || "",
      noIndex: seoConfig.noIndex,
      noFollow: seoConfig.noFollow,
      structuredData: seoConfig.structuredData || "",
      featuredImage: seoConfig.featuredImage || "",
      featuredImageAlt: seoConfig.featuredImageAlt || "",
      parsedImages: assets.parsedImages,
      parsedLinks: assets.parsedLinks,
      authorBio: adminUser.bio || "",
      authorCredentials: adminUser.credentials || "",
      sitemapPath: "/sitemap.xml",
      hasHttps: true
    };

    const diag = runSeoDiagnostics(evalCtx);

    await prisma.sEOAnalysis.create({
      data: {
        seoConfigId: seoConfig.id,
        overallScore: diag.overallScore,
        seoScore: diag.seoScore,
        readabilityScore: diag.readabilityScore,
        technicalScore: diag.technicalScore,
        schemaScore: diag.schemaScore,
        imagesScore: diag.imagesScore,
        eeatScore: diag.eeatScore,
        wordCount: diag.metrics.wordCount,
        readingTime: diag.metrics.readingTime,
        keywordDensity: diag.metrics.keywordDensity,
        issuesJson: JSON.stringify(diag.issues),
      }
    });

    // Seed Link Relations
    for (const link of assets.parsedLinks) {
      await prisma.linkRelation.create({
        data: {
          sourcePageId: page.id,
          targetUrl: link.url,
          anchorText: link.anchorText,
          isExternal: link.isExternal,
          isBroken: false,
        }
      });
    }

    // Seed History snapshot to demonstrate score progress comparison
    const historyConfig = await prisma.sEOHistory.create({
      data: {
        seoConfigId: seoConfig.id,
        metaTitle: seoConfig.metaTitle,
        metaDescription: "An old description snapshot simulating a lower score state...",
        focusKeyword: seoConfig.focusKeyword,
        noIndex: seoConfig.noIndex,
        noFollow: seoConfig.noFollow,
        canonicalUrl: seoConfig.canonicalUrl,
        structuredData: seoConfig.structuredData,
        changedById: adminUser.id,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      }
    });

    console.log(`📄 Seeded Page: ${page.title} (Initial Score: ${diag.overallScore}/100)`);
  }

  // 9. Seed Blog Posts
  const blogsSeedData = [
    {
      title: "Complete Technical SEO Audit checklist",
      slug: "blog/technical-seo-checklist",
      content: `
        <h1>Compounding Technical Audit Guide</h1>
        <p>In addition, technical audits ensure search engine crawlers understand your site structure.</p>
        <p>We analyze redirects, canonical links, sitemaps, and HTTPS configuration layers.</p>
        <img src="/img/team-meeting.webp" alt="VClick agency team analyzing technical SEO checklist" />
        <a href="/services/seo">SEO Services</a>
      `,
      published: true,
      publishedAt: new Date(),
      scheduledAt: null,
      seo: {
        metaTitle: "Complete Technical SEO Audit Checklist for 2026",
        metaDescription: "A comprehensive checklist covering canonicals, redirects, HTTPS security, and XML sitemaps to optimize crawling.",
        focusKeyword: "Technical SEO Checklist",
        secondaryKeywords: "audit, canonicals",
        noIndex: false,
        noFollow: false,
        canonicalUrl: "https://vclickdigitally.com/blog/technical-seo-checklist",
        structuredData: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Technical SEO Checklist" }),
        featuredImage: "/img/team-meeting.webp",
        featuredImageAlt: "Technical SEO banner logo",
      }
    },
    {
      title: "Future of AI in SEO Sprints",
      slug: "blog/future-of-ai-seo",
      content: `
        <h1>AI in Search Optimizations</h1>
        <p>A look at how AI search results will affect organic rankings.</p>
      `,
      published: false,
      publishedAt: null,
      scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Scheduled in 14 days
      seo: {
        metaTitle: "Future of AI Search Optimizations",
        metaDescription: "How Google SGE and AI-powered search engines alter keyword strategies.",
        focusKeyword: "AI Search",
        secondaryKeywords: "",
        noIndex: false,
        noFollow: false,
        canonicalUrl: "",
        structuredData: "",
        featuredImage: "",
        featuredImageAlt: "",
      }
    }
  ];

  for (const blogData of blogsSeedData) {
    const blog = await prisma.blogPost.create({
      data: {
        title: blogData.title,
        slug: blogData.slug,
        content: blogData.content,
        published: blogData.published,
        publishedAt: blogData.publishedAt,
        scheduledAt: blogData.scheduledAt,
      }
    });

    const assets = extractContentAssets(blogData.content);

    const seoConfig = await prisma.sEOConfiguration.create({
      data: {
        blogId: blog.id,
        metaTitle: blogData.seo.metaTitle,
        metaDescription: blogData.seo.metaDescription,
        focusKeyword: blogData.seo.focusKeyword,
        secondaryKeywords: blogData.seo.secondaryKeywords,
        noIndex: blogData.seo.noIndex,
        noFollow: blogData.seo.noFollow,
        canonicalUrl: blogData.seo.canonicalUrl,
        structuredData: blogData.seo.structuredData,
        featuredImage: blogData.seo.featuredImage,
        featuredImageAlt: blogData.seo.featuredImageAlt,
      }
    });

    const evalCtx: EvaluationContext = {
      content: blog.content,
      metaTitle: seoConfig.metaTitle || "",
      metaDescription: seoConfig.metaDescription || "",
      slug: blog.slug,
      focusKeyword: seoConfig.focusKeyword || "",
      secondaryKeywords: seoConfig.secondaryKeywords ? seoConfig.secondaryKeywords.split(",") : [],
      canonicalUrl: seoConfig.canonicalUrl || "",
      noIndex: seoConfig.noIndex,
      noFollow: seoConfig.noFollow,
      structuredData: seoConfig.structuredData || "",
      featuredImage: seoConfig.featuredImage || "",
      featuredImageAlt: seoConfig.featuredImageAlt || "",
      parsedImages: assets.parsedImages,
      parsedLinks: assets.parsedLinks,
      authorBio: adminUser.bio || "",
      authorCredentials: adminUser.credentials || "",
      sitemapPath: "/sitemap.xml",
      hasHttps: true
    };

    const diag = runSeoDiagnostics(evalCtx);

    await prisma.sEOAnalysis.create({
      data: {
        seoConfigId: seoConfig.id,
        overallScore: diag.overallScore,
        seoScore: diag.seoScore,
        readabilityScore: diag.readabilityScore,
        technicalScore: diag.technicalScore,
        schemaScore: diag.schemaScore,
        imagesScore: diag.imagesScore,
        eeatScore: diag.eeatScore,
        wordCount: diag.metrics.wordCount,
        readingTime: diag.metrics.readingTime,
        keywordDensity: diag.metrics.keywordDensity,
        issuesJson: JSON.stringify(diag.issues),
      }
    });

    for (const link of assets.parsedLinks) {
      await prisma.linkRelation.create({
        data: {
          sourceBlogId: blog.id,
          targetUrl: link.url,
          anchorText: link.anchorText,
          isExternal: link.isExternal,
          isBroken: false,
        }
      });
    }

    console.log(`✍️ Seeded Blog: ${blog.title} (Initial Score: ${diag.overallScore}/100)`);
  }

  console.log("⚙️ Creating initial security logs...");
  await prisma.auditLog.createMany({
    data: [
      { userId: adminUser.id, action: "USER_LOGIN", details: "Successful login from IP 192.168.1.1" },
      { userId: adminUser.id, action: "PUBLISH_PAGE", details: "Published Page 'Homepage'" },
      { userId: adminUser.id, action: "REDIRECT_CREATE", details: "Configured 301 redirect: /old-blog/growth-tips -> /blog/seo-sprints" },
    ],
  });

  console.log("✅ VClick SEO Studio database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
