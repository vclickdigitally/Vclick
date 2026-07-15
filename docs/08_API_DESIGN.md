# 08. API Design & Server Actions

This document specifies the Next.js Server Actions and REST API routes for **VClick OS**.

---

## 1. Next.js Server Actions (CMS & Settings Mutations)

All administrative actions that mutate database state are handled securely via Server Actions. These actions validate user roles, check permissions, and manage database transactions using Prisma.

### Pages & Blogs Actions

#### `createPage(payload: PageInputSchema): Promise<ActionResponse<Page>>`
- **Description**: Creates a new page under a tenant site.
- **Payload Schema**:
  ```typescript
  interface PageInputSchema {
    websiteId: string;
    title: string;
    slug: string;
    content: string; // TipTap JSON
    status: PublishStatus;
    parentId?: string;
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
  }
  ```
- **Response Schema**:
  ```typescript
  interface ActionResponse<T> {
    success: boolean;
    data?: T;
    error?: string; // Returns Zod validation or database error details
  }
  ```

#### `updatePage(id: string, payload: PageInputSchema): Promise<ActionResponse<Page>>`
- **Description**: Updates an existing page, creates a version history entry in the `Revision` table, and invalidates Next.js cache.

#### `deletePage(id: string): Promise<ActionResponse<{ id: string }>>`
- **Description**: Moves a page to the trash or deletes it permanently.

---

### Media DAM Actions

#### `getUploadSignature(filename: string, mimeType: string): Promise<ActionResponse<PresignedUploadData>>`
- **Description**: Generates pre-signed upload parameters to allow the client to upload files directly to Cloudflare R2 / AWS S3 storage.
- **Response Schema**:
  ```typescript
  interface PresignedUploadData {
    uploadUrl: string;
    fileUrl: string; // Final CDN address
    fields: Record<string, string>;
  }
  ```

---

## 2. REST API Routes (Public & Dynamic Endpoints)

REST routes are used for dynamic asset delivery and third-party integrations (e.g. sitemaps, webhooks).

### Dynamic XML Sitemap Engine
- **Endpoint**: `GET /sitemap.xml`
- **Headers**: `Host` header resolves the target tenant.
- **Description**: Dynamic route handler fetches all published Pages, Blogs, Services, Portfolios, and Case Studies for the requested domain and returns a structured XML document.
- **Response Format**:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://vclickdigitally.com/</loc>
      <lastmod>2026-07-09T12:00:00Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

### Dynamic Image Sitemap Engine
- **Endpoint**: `GET /sitemap-images.xml`
- **Description**: Fetches all active Media records used in published content to generate a Google-compliant Image Sitemap.
- **Response Format**:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>https://vclickdigitally.com/blogs/seo-guide</loc>
      <image:image>
        <image:loc>https://cdn.vclickdigitally.com/uploads/hero.webp</image:loc>
        <image:title>Next.js Optimization Guide</image:title>
        <image:caption>Visual diagram of Next.js 15 request lifecycle</image:caption>
      </image:image>
    </url>
  </urlset>
  ```

### Dynamic robots.txt
- **Endpoint**: `GET /robots.txt`
- **Description**: Evaluates database `robotsIndex` and `robotsFollow` settings for the tenant and returns plain-text instructions.
- **Response Format**:
  ```text
  User-agent: *
  Allow: /
  Disallow: /admin/
  Sitemap: https://vclickdigitally.com/sitemap.xml
  ```

### Dynamic Lead Form Submissions Handler
- **Endpoint**: `POST /api/forms/submit`
- **Request Payload**:
  ```json
  {
    "formId": "form-uuid-here",
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "budgetEstimate": 15000
    }
  }
  ```
- **Process**: Resolves the target form schema, validates properties using a dynamic Zod validator, logs the entry to the `FormSubmission` table, and triggers an email notification.
