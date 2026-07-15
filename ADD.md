# VClick CMS Architecture Design Document (ADD)

This document provides a comprehensive, enterprise-grade software architecture specification for the **VClick CMS**—a native, multi-tenant Next.js 15 content management system featuring a state-of-the-art SEO Center, rich block editor, Digital Asset Management (DAM) pipeline, and Gemini-powered AI engine.

---

## 1. Overall Architecture

### High-Level Architecture Diagram
The following diagram illustrates the relationship between the edge network, Next.js App Router layers, PostgreSQL database, AI layer, and the multi-tenant routing engine.

```mermaid
graph TD
    Client[Browser / Client] <--> CDN[Edge CDN / Middleware Router]
    
    subgraph VClick CMS Next.js 15 Runtime
        CDN <--> Middleware{Multi-Tenant Router & Redirect Middleware}
        
        %% Routing Scopes
        Middleware -->|Public Site / Domain A| PublicRoutes["/app/(public)/[site_slug]"]
        Middleware -->|Public Site / Domain B| PublicRoutes
        Middleware -->|Auth Protected CMS| AdminRoutes["/app/admin"]
        
        %% App Components
        AdminRoutes --> ServerComp[React Server Components - SSR/PPR]
        AdminRoutes --> ClientComp[React Client Components - Interactive Editors]
        
        %% Execution Layers
        ServerComp --> ServerActions[Server Actions - DB mutations]
        ServerComp --> API[API Route Handlers - XML Sitemaps, Robots, REST API]
        ClientComp --> ServerActions
    end

    subgraph Data & Services Layer
        ServerActions <--> Prisma[Prisma ORM Client]
        API <--> Prisma
        Prisma <--> PostgreSQL[(PostgreSQL Database)]
        
        %% Integrations
        ServerActions -->|Gemini GenAI SDK| GeminiAPI[Google Gemini Studio API]
        ServerActions -->|Analytics OAuth| GoogleAPI[Google GSC & GA4 API]
        ServerActions -->|Image Compression| SharpLib[Sharp Image Optimizer]
        ServerActions -->|Object Storage| R2Storage[S3 / Cloudflare R2 DAM]
    end
    
    classDef edge fill:#2b2d42,stroke:#8d99ae,color:#edf2f4;
    classDef next fill:#003049,stroke:#d62828,color:#fcbf49;
    classDef data fill:#023e8a,stroke:#0077b6,color:#caf0f8;
    class CDN,Middleware edge;
    class PublicRoutes,AdminRoutes,ServerComp,ClientComp,ServerActions,API next;
    class Prisma,PostgreSQL,GeminiAPI,GoogleAPI,SharpLib,R2Storage data;
```

### Folder Structure
We will adopt a modular, clean folder structure designed for Next.js 15 App Router that accommodates multi-site routing and separates administrative concerns from client site rendering.

```text
Vclick/
├── prisma/
│   ├── schema.prisma             # Universal multi-tenant PostgreSQL database models
│   └── seed.ts                   # Initial roles, permissions, and super-admin setup
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   └── [site_slug]/      # Dynamically served tenant pages and blog routes
│   │   │       ├── page.tsx
│   │   │       ├── [page_slug]/
│   │   │       │   └── page.tsx
│   │   │       └── blog/
│   │   │           ├── page.tsx
│   │   │           └── [blog_slug]/
│   │   │               └── page.tsx
│   │   │   └── sitemap.xml/
│   │   │       └── route.ts      # Multi-tenant XML Sitemap generator
│   │   │   └── sitemap-images.xml/
│   │   │       └── route.ts      # Multi-tenant XML Image Sitemap generator
│   │   │   └── robots.txt/
│   │   │       └── route.ts      # Multi-tenant robots.txt serving
│   │   ├── admin/                # Unified Administration Workspace
│   │   │   ├── layout.tsx        # Dashboard shell, Sidebar, Top bar
│   │   │   ├── page.tsx          # Dashboard overview, Core Web Vitals summary
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Auth.js Credential entry point
│   │   │   ├── pages/            # Page Module listing & creation
│   │   │   ├── blogs/            # Blog Module listing & TipTap editor
│   │   │   ├── services/         # Service Module listing & editor
│   │   │   ├── portfolio/        # Portfolio Item editor
│   │   │   ├── case-studies/     # Case Study editor
│   │   │   ├── media/            # DAM dashboard
│   │   │   ├── seo-center/       # GSC, GA4, Crawl Issues & redirects manager
│   │   │   ├── forms/            # Form entries and submissions listing
│   │   │   ├── users/            # RBAC settings (Users, Roles, Permissions)
│   │   │   └── settings/         # Global site setups & integrations config
│   │   ├── layout.tsx            # HTML wrappers, custom scripts hooks
│   │   └── api/                  # REST APIs (for telemetry, background tasks)
│   ├── components/
│   │   ├── ui/                   # shadcn/ui shared components
│   │   ├── cms/
│   │   │   ├── TipTapEditor.tsx  # Extensible rich text block editor
│   │   │   ├── SeoTab.tsx        # Search engine optimization panel
│   │   │   ├── SchemaManager.tsx # Multiple JSON-LD schema builder
│   │   │   ├── EntityOptimizer.tsx# Semantic entity mapper
│   │   │   └── ContentHubGraph.tsx# Visual content hub connector
│   │   └── public/               # Client-facing sections (Hero, Bento services, etc.)
│   ├── lib/
│   │   ├── db.ts                 # Prisma connection client manager
│   │   ├── ai.ts                 # Gemini API interaction wrapper
│   │   ├── seo-score.ts          # Core SEO Checklist calculation engine
│   │   ├── image-processing.ts   # AVIF/WebP conversion wrapper using Sharp
│   │   └── telemetry.ts          # GSC, GA4 and Microsoft Clarity API client helpers
│   ├── auth.ts                   # Auth.js (v5) setup
│   └── middleware.ts             # Hostname mapping, Redirects evaluator & 404 logger
```

### Feature-Based Architecture & Separation of Concerns
Each feature is structured vertically:
- **Database Model**: Keeps core properties isolated in explicit database entities.
- **Server Action**: Mutates tables, verifies scopes, triggers background webhooks, and manages caching tags.
- **Client View/Controller**: Interacts with the user, validates properties via Zod schema, and manages real-time UI state.
- **API Router**: Handles read-only endpoints (e.g. sitemaps) that must conform to specific XML structures.

### Server vs. Client Components
- **React Server Components (RSC)**: Used by default for all layout nodes, navigation structures, overview dashboards, and read-only tables. They minimize Client-side JS payloads and fetch data directly from PostgreSQL using Prisma.
- **Client Components (`"use client"`)**: Isolated to highly interactive panels (TipTap block editor, dynamic SEO character/pixel-width validation, Schema Manager drag-and-drop, Media Drag-and-Drop, and Interactive Graph visualization).

### API Architecture
REST and Server Actions will run concurrently. Server Actions handle all state mutations (creating, updating, deleting pages/posts, configurations, media alt descriptions). REST routes are reserved for external integrations (e.g. webhooks, tracking telemetry, XML sitemap formats).

### Authentication & Authorization Flow
Powered by Auth.js (v5) using a secure PostgreSQL adaptor.
1. The client presents email/password credentials to `/admin/login`.
2. Auth.js validates credentials using bcrypt hashing against the `User` table.
3. The session JWT is generated containing `tenant_ids`, `role`, and `permissions` metadata.
4. Middleware intercepts requests to `/admin` and checks JWT availability and role permissions. If unauthorized, they are redirected.

### Database Layer
Prisma ORM is utilized for PostgreSQL access. Multi-tenancy is enforced using a `Website` table where every entity (Page, Blog, Media, Setting, Redirect) holds a foreign key reference to `websiteId`. All queries inside a client path filter by `websiteId`.

### Caching Strategy
- **React 19 Cache**: De-duplicates query loads within a single server request.
- **Next.js `unstable_cache`**: Caches compiled sitemap datasets and public layout menus.
- **On-Demand Revalidation (`revalidateTag`)**: Invoked inside Server Actions upon post publication or metadata changes to clear Next.js fetch cache instantly.

### File Upload Strategy & Media Storage
- Files are intercepted at the server level via Server Actions or handled via signed pre-authorized upload links direct to Cloudflare R2 / AWS S3 buckets.
- Alt text, metadata, perceptual hashes, and image files are referenced inside the `Media` database table.

### Image Optimization
- Large images uploaded to the CMS are processed server-side using the `sharp` library.
- When an image is saved:
  1. The server compresses and converts it into both **WebP** and **AVIF** formats.
  2. The server outputs responsive sizing variants (`320px`, `640px`, `1024px`, `1920px`).
  3. Responsive file coordinates are saved in the `Media` item record, making them ready for `<img srcset>` rendering.

### Error Handling & Logging
- **Error Boundaries**: Next.js custom `error.tsx` layouts catch runtime React renders.
- **Database Logging**: Middleware catches 404s and writes them directly to the `Log404` table for SEO crawl issue reports.
- **System Logs**: Winston writes structured JSON error events to file logs.

### Performance Strategy
- **Streaming**: React Suspense boundaries wrap sluggish calculations (e.g., GSC API requests).
- **Partial Prerendering (PPR)**: Statically generates layout templates (headers, sidebars) and streams dynamic elements (dashboard graphs, user logs) asynchronously.
- **Automatic Code Splitting**: Managed at the App Router level.

---

## 2. Database Design

Below is the complete Prisma Schema configuration capturing all multi-site, user control, blogging, redirect, tracking, and analytics entity relationships.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum RoleType {
  SUPERADMIN
  ADMIN
  EDITOR
  AUTHOR
  CONTRIBUTOR
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

enum RedirectType {
  PERMANENT // 301
  TEMPORARY // 302
}

enum SchemaType {
  ORGANIZATION
  WEBSITE
  WEBPAGE
  ARTICLE
  BLOGPOSTING
  SERVICE
  PRODUCT
  FAQ
  BREADCRUMB
  REVIEW
  RATING
  PERSON
  TEAM
  VIDEO
  IMAGEOBJECT
  COURSE
  JOBPOSTING
  SOFTWAREAPPLICATION
  EVENT
  LOCALBUSINESS
}

// MULTI-TENANCY CORE
model Website {
  id             String          @id @default(uuid())
  domain         String          @unique
  name           String
  active         Boolean         @default(true)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  
  // Relations
  users          UserWebsite[]
  pages          Page[]
  blogs          Blog[]
  categories     Category[]
  tags           Tag[]
  media          Media[]
  menus          Menu[]
  forms          Form[]
  testimonials   Testimonial[]
  services       Service[]
  portfolios     Portfolio[]
  caseStudies    CaseStudy[]
  faqs           Faq[]
  settings       Setting[]
  redirects      Redirect[]
  logs404        Log404[]
  auditLogs      AuditLog[]
  analytics      AnalyticsMetric[]
  topicClusters  TopicCluster[]
  semanticEntities SemanticEntity[]
}

// USER CONTROL & RBAC
model User {
  id             String          @id @default(uuid())
  name           String?
  email          String          @unique
  password       String          // Hashed
  image          String?
  role           RoleType        @default(AUTHOR)
  active         Boolean         @default(true)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  // Relations
  websites       UserWebsite[]
  pages          Page[]
  blogs          Blog[]
  revisions      Revision[]
  auditLogs      AuditLog[]
}

model UserWebsite {
  id             String          @id @default(uuid())
  userId         String
  websiteId      String
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  website        Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)

  @@unique([userId, websiteId])
}

// PAGES MODULE
model Page {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  content            String          @db.Text // TipTap JSON structure
  featuredImageId    String?
  featuredImage      Media?          @relation("PageFeaturedImage", fields: [featuredImageId], references: [id], onDelete: SetNull)
  status             PublishStatus   @default(DRAFT)
  parentId           String?
  parent             Page?           @relation("PageParentChild", fields: [parentId], references: [id], onDelete: SetNull)
  children           Page[]          @relation("PageParentChild")
  order              Int             @default(0)
  authorId           String
  author             User            @relation(fields: [authorId], references: [id])
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt
  publishedAt        DateTime?
  
  // Dynamic SEO metadata
  seoTitle           String?
  seoDescription     String?
  canonicalUrl       String?
  focusKeyword       String?
  secondaryKeywords  String[]
  robotsIndex        Boolean         @default(true)
  robotsFollow       Boolean         @default(true)
  ogTitle            String?
  ogDescription      String?
  twitterTitle       String?
  twitterDescription String?
  twitterCard        String          @default("summary_large_image")
  socialImageId      String?
  socialImage        Media?          @relation("PageSocialImage", fields: [socialImageId], references: [id], onDelete: SetNull)
  breadcrumbTitle    String?
  customH2Suggestions String[]
  customH3Suggestions String[]

  // Relations
  schemas            SchemaBlock[]
  revisions          Revision[]      @relation("PageRevisions")

  @@unique([websiteId, slug])
}

// BLOG MODULE
model Blog {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  content            String          @db.Text // TipTap JSON
  excerpt            String?         @db.Text
  readingTime        Int             @default(1)
  featuredImageId    String?
  featuredImage      Media?          @relation("BlogFeaturedImage", fields: [featuredImageId], references: [id], onDelete: SetNull)
  status             PublishStatus   @default(DRAFT)
  authorId           String
  author             User            @relation(fields: [authorId], references: [id])
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt
  publishedAt        DateTime?

  // SEO Tab
  seoTitle           String?
  seoDescription     String?
  canonicalUrl       String?
  focusKeyword       String?
  secondaryKeywords  String[]
  robotsIndex        Boolean         @default(true)
  robotsFollow       Boolean         @default(true)
  ogTitle            String?
  ogDescription      String?
  twitterTitle       String?
  twitterDescription String?
  twitterCard        String          @default("summary_large_image")
  socialImageId      String?
  socialImage        Media?          @relation("BlogSocialImage", fields: [socialImageId], references: [id], onDelete: SetNull)
  breadcrumbTitle    String?
  customH2Suggestions String[]
  customH3Suggestions String[]

  // Taxonomy & Relations
  categories         CategoryBlog[]
  tags               TagBlog[]
  schemas            SchemaBlock[]
  revisions          Revision[]      @relation("BlogRevisions")
  comments           Comment[]

  @@unique([websiteId, slug])
}

// TAXONOMIES
model Category {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  slug               String
  description        String?
  parentId           String?
  parent             Category?       @relation("CategoryParentChild", fields: [parentId], references: [id], onDelete: SetNull)
  children           Category[]      @relation("CategoryParentChild")
  
  blogs              CategoryBlog[]

  @@unique([websiteId, slug])
}

model CategoryBlog {
  blogId             String
  categoryId         String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  category           Category        @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([blogId, categoryId])
}

model Tag {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  slug               String
  
  blogs              TagBlog[]

  @@unique([websiteId, slug])
}

model TagBlog {
  blogId             String
  tagId              String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  tag                Tag             @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([blogId, tagId])
}

// SCHEMA ENGINE
model SchemaBlock {
  id                 String          @id @default(uuid())
  type               SchemaType
  properties         String          @db.Text // JSON structure mapping to schema parameters
  pageId             String?
  page               Page?           @relation(fields: [pageId], references: [id], onDelete: Cascade)
  blogId             String?
  blog               Blog?           @relation(fields: [blogId], references: [id], onDelete: Cascade)
}

// REVISION HISTORY & DRAFTS
model Revision {
  id                 String          @id @default(uuid())
  pageId             String?
  page               Page?           @relation("PageRevisions", fields: [pageId], references: [id], onDelete: Cascade)
  blogId             String?
  blog               Blog?           @relation("BlogRevisions", fields: [blogId], references: [id], onDelete: Cascade)
  title              String
  content            String          @db.Text
  seoData            String?         @db.Text // Cached JSON of all SEO tab metadata
  authorId           String
  author             User            @relation(fields: [authorId], references: [id])
  createdAt          DateTime        @default(now())
}

// ENTERPRISE DAM (MEDIA LIBRARY)
model Media {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  filename           String
  url                String
  mimeType           String
  sizeBytes          Int
  width              Int?
  height             Int?
  hash               String          // SHA-256 for duplicate detection
  folderPath         String          @default("/") // Virtual folders
  collection         String?         // Virtual tags or collections
  
  // Image SEO
  alt                String          @default("")
  title              String?
  caption            String?
  description        String?
  focusKeyword       String?

  // Compressed Variants
  webpUrl            String?
  avifUrl            String?
  responsiveUrls     String?         // JSON format showing widths and urls: { "640": "...", "1024": "..." }

  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  // Usage tracing
  pageFeatured       Page[]          @relation("PageFeaturedImage")
  pageSocial         Page[]          @relation("PageSocialImage")
  blogFeatured       Blog[]          @relation("BlogFeaturedImage")
  blogSocial         Blog[]          @relation("BlogSocialImage")
}

// MENUS & NAVIGATION
model Menu {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  slug               String          @unique
  items              MenuItem[]
}

model MenuItem {
  id                 String          @id @default(uuid())
  menuId             String
  menu               Menu            @relation(fields: [menuId], references: [id], onDelete: Cascade)
  label              String
  url                String
  target             String          @default("_self")
  parentId           String?
  parent             MenuItem?       @relation("MenuParentChild", fields: [parentId], references: [id], onDelete: SetNull)
  children           MenuItem[]      @relation("MenuParentChild")
  order              Int             @default(0)
}

// BUSINESS MODULES
model Service {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  description        String
  content            String          @db.Text
  category           String
  priceEstimate      Float?
  active             Boolean         @default(true)
}

model Portfolio {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  client             String
  category           String
  tags               String[]
  coverImage         String
  description        String
  content            String          @db.Text
}

model CaseStudy {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  client             String
  metrics            String?         // JSON stats: { "Revenue": "+140%", "Traffic": "2.5x" }
  challenge          String          @db.Text
  strategy           String          @db.Text
  results            String          @db.Text
  featured           Boolean         @default(false)
}

model Testimonial {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  clientName         String
  clientCompany      String
  clientRole         String
  rating             Int             @default(5)
  feedback           String          @db.Text
  avatarUrl          String?
  source             String          @default("Google") // GMB Review, manual, etc.
}

model Faq {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  question           String
  answer             String          @db.Text
  order              Int             @default(0)
}

// TECHNICAL SEO & REDIRECTS
model Redirect {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  fromUrl            String          @db.VarChar(512)
  toUrl              String          @db.VarChar(512)
  type               RedirectType    @default(PERMANENT)
  hits               Int             @default(0)
  active             Boolean         @default(true)
  createdAt          DateTime        @default(now())

  @@unique([websiteId, fromUrl])
}

model Log404 {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  url                String          @db.VarChar(512)
  referer            String?         @db.VarChar(512)
  ip                 String?
  userAgent          String?
  createdAt          DateTime        @default(now())
}

// INTEGRATION & TELEMETRY
model AnalyticsMetric {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  timestamp          DateTime        @default(now())
  metricType         String          // "GSC_CLICKS", "GA4_SESSIONS", "FID", "LCP", "CLS"
  value              Float
  dimension          String?         // Holds page slug, browser type, or keyword query
}

model CompetitorKeyword {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  keyword            String
  competitorDomain   String
  rankingPosition    Int
  searchVolume       Int?
  updatedAt          DateTime        @updatedAt
}

model TopicCluster {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  description        String?
  pillarPageSlug     String?
  
  subPages           TopicClusterSubPage[]
}

model TopicClusterSubPage {
  id                 String          @id @default(uuid())
  clusterId          String
  cluster            TopicCluster    @relation(fields: [clusterId], references: [id], onDelete: Cascade)
  subPageSlug        String
}

model SemanticEntity {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  entityName         String
  wikipediaUrl       String?
  density            Float           @default(0.0)
  occurrences        Int             @default(0)
}

// FORM ENTRIES
model Form {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  formName           String          // "Estimate Form", "Contact Form"
  fieldsSchema       String          @db.Text // JSON mapping Zod structures
  submissions        FormSubmission[]
  createdAt          DateTime        @default(now())
}

model FormSubmission {
  id                 String          @id @default(uuid())
  formId             String
  form               Form            @relation(fields: [formId], references: [id], onDelete: Cascade)
  payload            String          @db.Text // JSON of submitted field key/values
  read               Boolean         @default(false)
  createdAt          DateTime        @default(now())
}

// AUDIT LOGS
model AuditLog {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  userId             String
  user               User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  action             String          // "PAGE_CREATE", "BLOG_STATUS_PUBLISH", "REDIRECT_ADD"
  details            String?         @db.Text
  ipAddress          String?
  createdAt          DateTime        @default(now())
}

// INTER-PAGE COMMENTARY
model Comment {
  id                 String          @id @default(uuid())
  blogId             String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  authorName         String
  authorEmail        String
  content            String          @db.Text
  approved           Boolean         @default(false)
  createdAt          DateTime        @default(now())
}

// SETTINGS KEY-VALUE
model Setting {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  key                String
  value              String          @db.Text // Hashed passwords, api keys, or site labels

  @@unique([websiteId, key])
}

// NOTIFICATIONS
model Notification {
  id                 String          @id @default(uuid())
  recipientId        String
  title              String
  message            String
  read               Boolean         @default(false)
  createdAt          DateTime        @default(now())
}
```

---

## 3. CMS Modules

### Dashboard Module
- **Purpose**: Unified command deck showing multi-tenant activity, core business alerts, SEO rankings, and site health summaries.
- **Features**: Total visitors, form submissions graph, 404 crawl alert feeds, Google Search Console click graphs, Core Web Vitals gauges.
- **Routes**: `/admin` (RSC page)
- **UI Layout**:
  - Top Bar: Website tenant switcher, User profile, Quick actions.
  - Bento Layout: Grid of statistics, telemetry graphs, and sitemap health gauges.

### Pages Module
- **Purpose**: CRUD interface managing hierarchical, structural pages (Home, About, Services, custom landings).
- **Features**: Drag-and-drop page ordering, parent page assignment, duplicate helper, live preview.
- **Routes**:
  - `/admin/pages` (RSC table display)
  - `/admin/pages/new` (Client editor dashboard)
  - `/admin/pages/edit/[id]` (Loads item record)
- **Components**: `SeoTab`, `SchemaManager`, `EntityOptimizer`.
- **Permissions**: `SUPERADMIN`, `ADMIN`, `EDITOR`.

### Blogs Module
- **Purpose**: WP-like blogging workspace.
- **Features**: TipTap rich editor, tag/category manager, author assignment, read time calculator, autosave.
- **Routes**:
  - `/admin/blogs`
  - `/admin/blogs/new`
  - `/admin/blogs/edit/[id]`
- **Components**: `TipTapEditor`, `SeoTab`, `SchemaManager`.
- **Permissions**: `SUPERADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `CONTRIBUTOR`.

### Media Module (Digital Asset Management)
- **Purpose**: File cabinet for managing imagery, videos, and PDFs.
- **Features**: Multi-format converter (AVIF/WebP), ALT and meta fields editor, virtual folders, SHA-256 duplicate detection.
- **Routes**: `/admin/media`
- **Permissions**: All roles (Contributors can upload and edit alt texts on their uploads; others have full controls).

### SEO Center Module
- **Purpose**: Central Command for search optimizations and Google API integrations.
- **Features**: Redirects CRUD, robots.txt editor, sitemap status gauges, 404 list, crawler error logs.
- **Routes**: `/admin/seo-center`
- **Permissions**: `SUPERADMIN`, `ADMIN`.

### Portfolio & Services Modules
- **Purpose**: Structured database for managing work items and agency deliverables.
- **Features**: Price estimation presets, category tags, interactive grids layout options.
- **Routes**:
  - `/admin/services`, `/admin/services/new`
  - `/admin/portfolio`, `/admin/portfolio/new`
- **Permissions**: `SUPERADMIN`, `ADMIN`, `EDITOR`.

### Forms Module
- **Purpose**: Logs inquiries submitted via client frontend forms.
- **Features**: Dynamic JSON submission viewer, export to CSV, mark as read, Zod layout matching.
- **Routes**: `/admin/forms`
- **Permissions**: `SUPERADMIN`, `ADMIN`.

### Users Module
- **Purpose**: Administer CMS user roles and active websites credentials.
- **Features**: User credentials creation, status switches, multi-site authorization checklist.
- **Routes**: `/admin/users`
- **Permissions**: `SUPERADMIN`.

### Settings Module
- **Purpose**: Central configurations.
- **Features**: API integrations keys (Google, Microsoft Clarity), global branding, inject scripts hooks (Header/Footer).
- **Routes**: `/admin/settings`
- **Permissions**: `SUPERADMIN`, `ADMIN`.

---

## 4. SEO Engine

The **VClick CMS SEO Center** features an optimization engine built natively into the Next.js runtime.

```mermaid
graph LR
    EditorInput[Editor Title & TipTap Content] --> SEOEngine[SEO Scoring Engine]
    SEOEngine --> ValCheck[Checklist Validation]
    SEOEngine --> SerpCalc[SERP Pixel Calculator]
    SEOEngine --> EntityCheck[Semantic Entity Parser]
    
    ValCheck -->|Check Results| VisualScore[Checklist GUI: Pass/Warn/Error]
    SerpCalc -->|Pixel Coordinate| SerpPreview[Google Desktop/Mobile Preview]
    EntityCheck -->|LSI & Schema Suggestions| SchemaBuilder[JSON-LD Generator]
```

### Real-Time SEO Validation Rules
Every post/page is evaluated against the following rules using Zod schemas and character/pixel width scanners:

| Code | Metric / Rule | Severity | Description / Threshold |
| :--- | :--- | :--- | :--- |
| **SEO-01** | Title Missing / Empty | Critical Error | Page cannot render meta title tag |
| **SEO-02** | Title Length (Chars) | Warning | Keep title length between 50 and 60 characters |
| **SEO-03** | Title Width (Pixels) | Warning | Keep title text width under 600 pixels (Google SERP limit) |
| **SEO-04** | Meta Description Missing | Critical Error | Missing search description snippet |
| **SEO-05** | Meta Description Length | Warning | Target description between 120 and 160 characters (Max 960px) |
| **SEO-06** | H1 Title Presence | Critical Error | Exactly one H1 tag is required per page |
| **SEO-07** | Focus Keyword in H1 | Warning | Focus keyword must be present in the H1 tag |
| **SEO-08** | Focus Keyword in Title | Warning | Focus keyword must be at the start of the Title tag |
| **SEO-09** | Focus Keyword in Meta Desc | Warning | Focus keyword must appear in the meta description |
| **SEO-10** | Image ALT Metadata | Warning | All images inside the body must contain descriptive ALT tags |
| **SEO-11** | Internal Links | Warning | Content must contain at least 2 internal links |
| **SEO-12** | External Outbound Links | Warning | Content must reference at least 1 reputable external link (nofollow logic checked) |
| **SEO-13** | Schema Availability | Warning | Page must define at least one valid JSON-LD schema block |
| **SEO-14** | Content Word Count | Info | Content length must be at least 600 words for standard posts |
| **SEO-15** | Open Graph Metadata | Warning | OG Title, Description, and Social image must be specified |
| **SEO-16** | Schema FAQ Count | Warning | FAQ Schema questions must match FAQs rendered in TipTap block |

### Dynamic SERP Preview & Pixel Width Counter
Unlike Yoast (which uses rough character counts), VClick CMS utilizes a Canvas-based pixel-width calculator helper client-side. Using standard Google CSS font specifications (Arial, 20px for titles, 14px for snippets), it determines exact pixel footprints to warn editors of truncated text `...` previews before they save changes.

### Structured Schema Generator (JSON-LD Engine)
- Fully decoupled schema component (`SchemaManager.tsx`).
- Offers form inputs matching schema targets (e.g. FAQ questions, Product prices, Review scores, Person details).
- Automatically formats properties into a standardized JSON-LD object block structure.
- Injects generated scripts inside Next.js layout metadata templates.

### Advanced Enterprise SEO Tools
1. **Google Search Console & GA4 API Dashboards**: Shows real clicks, impressions, and ranking keywords directly on the CMS dashboard.
2. **Microsoft Clarity Session Recording**: Integrates Clarity tracking scripts and displays user heatmaps and rage-click telemetry within `/admin/seo-center`.
3. **AI Overview Optimization Check**: Uses Gemini to analyze content structure, extract entity relationships, and verify readability formatting (bullet points, clear definitions, FAQ answering format) to maximize the probability of appearing in Google AI Overviews.
4. **Crawl & Index Coverage Monitor**: Displays indexing reports and error codes from GSC inside the CMS.
5. **Content Hub Visualizer**: Renders an interactive, client-side React node graph representing parent-child and internal-linking networks. This allows managers to visualize content silos, topic clusters, and find isolated pages easily.
6. **Automatic Redirect System**: If an editor modifies a page slug, the CMS automatically creates a `Redirect` record mapping the old URL to the new URL to preserve link equity.

---

## 5. Blog System (TipTap Editor)

The VClick editor is built on TipTap, configured to support custom block serialization and enterprise workflows.

```mermaid
graph TD
    TipTap[TipTap Editor Instance] --> StarterKit[StarterKit Editor Core]
    TipTap --> Tables[Tables Extension]
    TipTap --> Highlighter[Code Highlight]
    TipTap --> CustomExtensions[Custom Gutenberg Extensions]
    
    subgraph Custom Blocks
        CustomExtensions --> CustomCTA[VClick Call-To-Action Block]
        CustomExtensions --> CustomFAQ[FAQ Accordion Block]
        CustomExtensions --> Comparison[Comparison Table Builder]
        CustomExtensions --> ProsCons[Pros & Cons list]
    end
    
    TipTap --> HTMLSerializer[Content HTML Serializer]
    TipTap --> JSONSerializer[Content JSON Serializer]
    HTMLSerializer --> DBPage[Save to Page/Blog Table]
    JSONSerializer --> AutosaveRevision[Draft Autosave Revision]
```

### Supported Custom Block Types
- **FAQ Accordion**: Structured question-and-answer container. Its elements are automatically synchronized with JSON-LD FAQ schemas.
- **Callout Block**: Stylized warning/info cards featuring primary, secondary, and error border styling.
- **Comparison Table**: Dynamic grids comparing products or services.
- **Pros & Cons Box**: Visual side-by-side lists with checked green pros and crossed red cons.
- **Video Embeds**: YouTube/Vimeo wrapper handles that load placeholder thumbnails first to maximize page speed.
- **CTA Block**: Custom lead capture forms and conversion buttons.

### Autosave & Revision Comparing
- **Autosave**: Fires every 30 seconds of active editing, writing draft data to the `Revision` table.
- **Revision History**: Logs a permanent record when changes are manually published.
- **Version Compare View**: Loads two revisions side-by-side and displays a visual diff highlights (inserted text marked in green, deleted in red).

---

## 6. Media Library (Enterprise DAM)

The Digital Asset Management module handles asset optimization, conversion, and organization.

```mermaid
graph TD
    Upload[Drag & Drop Upload] --> SHA256[Generate SHA-256 Hash]
    SHA256 --> DupCheck{Hash exists in DB?}
    
    DupCheck -->|Yes| Alert[Prompt Editor: Use Existing File?]
    DupCheck -->|No| Compression[Sharp Image Optimization Pipeline]
    
    subgraph Sharp Image Processing
        Compression --> WebPGen[Convert to WebP]
        Compression --> AvifGen[Convert to AVIF]
        Compression --> Responsive[Generate Responsive Sizes: 320w, 640w, 1024w, 1920w]
    end
    
    WebPGen --> Store[Upload to Cloudflare R2 / AWS S3]
    AvifGen --> Store
    Responsive --> Store
    
    Store --> WriteDB[Write Media Record to DB: urls, alt, width, height, hash]
```

### Features
- **SHA-256 Duplicate Check**: Prevents uploading identical assets.
- **Usage Tracker**: Before deleting an image, the CMS queries `Page` and `Blog` tables to check if the asset is referenced in post contents or featured images.
- **Virtual Folders & Collections**: Virtual paths in database records allow logical grouping without modifying actual files on disk.

---

## 7. AI Layer

Powered by Google's Gemini API, VClick CMS contains an AI assistant designed to automate metadata and content optimization.

### Key Capabilities
1. **AI Meta Title & Description Generator**: Analyzes draft content and suggest high-CTR titles incorporating focus keywords.
2. **Alt Text Generator**: Uses Gemini Vision API to analyze uploaded images and suggest detailed, keyword-rich ALT texts.
3. **Structured Schema Generator**: Extracts entities from drafts and auto-configures Article, Event, FAQ, or Course schemas.
4. **Internal Link Suggestions**: Compares draft keywords against existing published page index databases to suggest relevant anchor links.
5. **EEAT & Quality Audit**: Evaluates articles against Google's Helpful Content guidelines (checking for credentials citations, source lists, layout formatting, first-person reviews).

---

## 8. Multi-site Architecture

The VClick CMS features a multi-tenant layout allowing agencies to manage several websites from a single login workspace.

```mermaid
graph TD
    DomainRequest[Request to Domain A or B] --> Edge[Cloudflare / Middleware]
    Edge --> RouteCheck{Determine Website ID from hostname}
    
    RouteCheck -->|Domain A| DBFilterA[Query Prisma: websiteId = Site A]
    RouteCheck -->|Domain B| DBFilterB[Query Prisma: websiteId = Site B]
    
    subgraph Administrative Workspace
        AdminRequest[Request to /admin] --> AuthSession{JWT Session Check}
        AuthSession -->|Authenticated User| VerifyAccess[Verify user is linked to Website ID via UserWebsite]
        VerifyAccess -->|Yes| RenderDashboard[Render admin dashboards matching active website]
    end
```

### Domain Routing & Middleware
The middleware intercepts incoming requests and resolves the hostname:
1. It queries the `Website` table to find the record matching the hostname.
2. It assigns the `websiteId` to the request headers.
3. Dynamic routes (`app/(public)/[site_slug]`) receive the domain context and serve the pages/blogs matching that `websiteId`.

---

## 9. Security

- **Authentication**: Powered by Auth.js (v5) with secure session storage.
- **RBAC (Role Based Access Control)**: Enforces page edits and publishing permissions.
- **XSS Prevention**: TipTap sanitizes inputs on the server using `dompurify` before writing content to the database.
- **CSRF & SQL Injection**: Handled by Next.js Server Actions and Prisma's parameterized queries.
- **Rate Limiting**: Enforced on API routes and logins using Upstash Redis / local memory token bucket algorithm.
- **Audit Logs**: Every state change is tracked in the `AuditLog` table.

---

## 10. Performance

- **Next.js 15 App Router & React Server Components**: Minimal bundle sizes, fast initial page loads.
- **Partial Prerendering (PPR)**: Instantly serves shell components, streaming dynamic assets.
- **Edge Caching**: Public pages use Incremental Static Regeneration (ISR) and revalidate only when mutations occur.
- **DAM WebP/AVIF Support**: Optimizes media payloads.

---

## 11. Deployment

```mermaid
graph TD
    Git[Git Repository Push] --> Vercel[Vercel Deploy Pipeline]
    Vercel --> Serverless[Next.js Serverless Runtime Engine]
    
    DockerBuild[Local Docker Build] --> DockerImg[Docker Image]
    DockerImg --> CloudRun[Google Cloud Run / AWS ECS]
    
    Serverless --> RDS[AWS RDS / Hostinger PostgreSQL Database]
    CloudRun --> RDS
    
    Serverless --> DAM[Cloudflare R2 Bucket]
    CloudRun --> DAM
```

### Configuration Variables
Create a local `.env` containing:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vclick_cms?schema=public"
AUTH_SECRET="your-32-character-secret"
GEMINI_API_KEY="your-gemini-api-key"
CLOUDFLARE_R2_BUCKET="vclick-media"
CLOUDFLARE_R2_ACCESS_KEY="r2-access-key"
CLOUDFLARE_R2_SECRET_KEY="r2-secret-key"
NEXT_PUBLIC_CLARITY_ID="clarity-project-id"
```

---

## 12. Roadmap

```mermaid
gantt
    title VClick CMS Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Environment Setup & Next.js 15 Migration :a1, 2026-07-10, 5d
    Prisma Database Schema Setup             :a2, 2026-07-12, 3d
    Auth.js RBAC Setup                       :a3, 2026-07-15, 3d
    section Phase 2: CMS
    Dashboard Dashboard Layout               :b1, 2026-07-18, 5d
    Pages & Services Module CRUD             :b2, 2026-07-20, 6d
    section Phase 3: SEO
    SEO Center & SERP Preview                :c1, 2026-07-25, 7d
    JSON-LD Schema Engine                    :c2, 2026-07-28, 5d
    section Phase 4: Blog
    TipTap Editor & Custom Blocks            :d1, 2026-08-01, 8d
    Revisions & Autosave                     :d2, 2026-08-05, 4d
    section Phase 5: Media
    DAM Library & Sharp Compressor           :e1, 2026-08-08, 6d
    section Phase 6: AI
    Gemini Metadata & Content Audit          :f1, 2026-08-12, 7d
    section Phase 7: Analytics
    GA4, GSC & Clarity Integrations          :g1, 2026-08-16, 7d
    section Phase 8: Multi-site
    Domain Middleware Routing                :h1, 2026-08-20, 6d
```
