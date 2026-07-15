# 02. Database Design & Prisma Schema

This document specifies the database design for **VClick OS**. The database is built on **PostgreSQL** and modeled using **Prisma ORM**. To enforce multi-tenant isolation, every website-specific entity contains a `websiteId` foreign key and is backed by appropriate indexing to guarantee database query performance under high load.

---

## 1. Complete Prisma Model Definitions

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ENUMS FOR TYPE SAFETY
enum RoleType {
  SUPERADMIN
  ADMIN
  EDITOR
  AUTHOR
  CONTRIBUTOR
}

enum PublishStatus {
  DRAFT
  UNDER_REVIEW
  NEEDS_CHANGES
  APPROVED
  SCHEDULED
  PUBLISHED
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

// ==========================================
// 1. MULTI-TENANCY CORE
// ==========================================

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

// ==========================================
// 2. USER CONTROL & RBAC
// ==========================================

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
  @@index([userId])
  @@index([websiteId])
}

// ==========================================
// 3. PAGES MODULE
// ==========================================

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
  @@index([websiteId])
  @@index([parentId])
}

// ==========================================
// 4. BLOG MODULE
// ==========================================

model Blog {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  content            String          @db.Text // TipTap JSON structure
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
  @@index([websiteId])
}

// ==========================================
// 5. TAXONOMIES (CATEGORIES & TAGS)
// ==========================================

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
  @@index([websiteId])
}

model CategoryBlog {
  blogId             String
  categoryId         String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  category           Category        @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([blogId, categoryId])
  @@index([blogId])
  @@index([categoryId])
}

model Tag {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  slug               String
  
  blogs              TagBlog[]

  @@unique([websiteId, slug])
  @@index([websiteId])
}

model TagBlog {
  blogId             String
  tagId              String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  tag                Tag             @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([blogId, tagId])
  @@index([blogId])
  @@index([tagId])
}

// ==========================================
// 6. SCHEMA BLOCK
// ==========================================

model SchemaBlock {
  id                 String          @id @default(uuid())
  type               SchemaType
  properties         String          @db.Text // JSON properties
  pageId             String?
  page               Page?           @relation(fields: [pageId], references: [id], onDelete: Cascade)
  blogId             String?
  blog               Blog?           @relation(fields: [blogId], references: [id], onDelete: Cascade)

  @@index([pageId])
  @@index([blogId])
}

// ==========================================
// 7. REVISION HISTORY & DRAFTS
// ==========================================

model Revision {
  id                 String          @id @default(uuid())
  pageId             String?
  page               Page?           @relation("PageRevisions", fields: [pageId], references: [id], onDelete: Cascade)
  blogId             String?
  blog               Blog?           @relation("BlogRevisions", fields: [blogId], references: [id], onDelete: Cascade)
  title              String
  content            String          @db.Text
  seoData            String?         @db.Text // JSON meta dump
  authorId           String
  author             User            @relation(fields: [authorId], references: [id])
  createdAt          DateTime        @default(now())

  @@index([pageId])
  @@index([blogId])
}

// ==========================================
// 8. ENTERPRISE DAM (MEDIA LIBRARY)
// ==========================================

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
  hash               String          // SHA-256
  folderPath         String          @default("/")
  collection         String?
  
  // Image SEO
  alt                String          @default("")
  title              String?
  caption            String?
  description        String?
  focusKeyword       String?

  // Compressed variants
  webpUrl            String?
  avifUrl            String?
  responsiveUrls     String?         // JSON format: { "640": "..." }

  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  pageFeatured       Page[]          @relation("PageFeaturedImage")
  pageSocial         Page[]          @relation("PageSocialImage")
  blogFeatured       Blog[]          @relation("BlogFeaturedImage")
  blogSocial         Blog[]          @relation("BlogSocialImage")

  @@index([websiteId])
  @@index([hash])
}

// ==========================================
// 9. NAVIGATION & MENUS
// ==========================================

model Menu {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  slug               String          @unique
  items              MenuItem[]

  @@index([websiteId])
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

  @@index([menuId])
  @@index([parentId])
}

// ==========================================
// 10. TECHNICAL SEO METRICS
// ==========================================

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
  @@index([websiteId])
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

  @@index([websiteId])
  @@index([url])
}

model AnalyticsMetric {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  timestamp          DateTime        @default(now())
  metricType         String          // e.g. "FID", "LCP", "CLS"
  value              Float
  dimension          String?

  @@index([websiteId])
  @@index([metricType, timestamp])
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

  @@index([websiteId])
}

model TopicCluster {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  name               String
  description        String?
  pillarPageSlug     String?
  
  subPages           TopicClusterSubPage[]

  @@index([websiteId])
}

model TopicClusterSubPage {
  id                 String          @id @default(uuid())
  clusterId          String
  cluster            TopicCluster    @relation(fields: [clusterId], references: [id], onDelete: Cascade)
  subPageSlug        String

  @@index([clusterId])
}

model SemanticEntity {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  entityName         String
  wikipediaUrl       String?
  density            Float           @default(0.0)
  occurrences        Int             @default(0)

  @@index([websiteId])
  @@index([entityName])
}

// ==========================================
// 11. LEAD INTAKE FORMS
// ==========================================

model Form {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  formName           String
  fieldsSchema       String          @db.Text
  submissions        FormSubmission[]
  createdAt          DateTime        @default(now())

  @@index([websiteId])
}

model FormSubmission {
  id                 String          @id @default(uuid())
  formId             String
  form               Form            @relation(fields: [formId], references: [id], onDelete: Cascade)
  payload            String          @db.Text // JSON input dump
  read               Boolean         @default(false)
  createdAt          DateTime        @default(now())

  @@index([formId])
}

// ==========================================
// 12. AUDITS & AUDIENCE
// ==========================================

model AuditLog {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  userId             String
  user               User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  action             String
  details            String?         @db.Text
  ipAddress          String?
  createdAt          DateTime        @default(now())

  @@index([websiteId])
  @@index([userId])
}

model Comment {
  id                 String          @id @default(uuid())
  blogId             String
  blog               Blog            @relation(fields: [blogId], references: [id], onDelete: Cascade)
  authorName         String
  authorEmail        String
  content            String          @db.Text
  approved           Boolean         @default(false)
  createdAt          DateTime        @default(now())

  @@index([blogId])
}

model Setting {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  key                String
  value              String          @db.Text

  @@unique([websiteId, key])
  @@index([websiteId])
}

model Notification {
  id                 String          @id @default(uuid())
  recipientId        String
  title              String
  message            String
  read               Boolean         @default(false)
  createdAt          DateTime        @default(now())

  @@index([recipientId])
}

// ==========================================
// 13. BUSINESS SECTOR SPECIFICS
// ==========================================

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

  @@unique([websiteId, slug])
  @@index([websiteId])
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

  @@unique([websiteId, slug])
  @@index([websiteId])
}

model CaseStudy {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  title              String
  slug               String
  client             String
  metrics            String?
  challenge          String          @db.Text
  strategy           String          @db.Text
  results            String          @db.Text
  featured           Boolean         @default(false)

  @@unique([websiteId, slug])
  @@index([websiteId])
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
  source             String          @default("Google")

  @@index([websiteId])
}

model Faq {
  id                 String          @id @default(uuid())
  websiteId          String
  website            Website         @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  question           String
  answer             String          @db.Text
  order              Int             @default(0)

  @@index([websiteId])
}
```

---

## 2. Key Database Constraints & Performance Indexes
- **Indexes on `websiteId`**: Enforced on every child entity. When Next.js resolves a domain, all query statements filter by `websiteId`, making single-column B-tree indexes crucial for keeping query times under 5ms.
- **Composite Unique Constraints**: 
  - `@@unique([websiteId, slug])` is defined on `Page`, `Blog`, `Service`, `Portfolio`, and `CaseStudy` to prevent slug collisions within the same website while allowing identical slugs on different websites (e.g. `siteA.com/about` and `siteB.com/about`).
  - `@@unique([websiteId, key])` is defined on `Setting` to maintain clean key-value settings lookups.
- **Cascading Deletes**: `onDelete: Cascade` is set on all parent-child relationships referencing `Website`. Deleting a site tenant will completely scrub its pages, logs, sitemaps, media configurations, and submission records automatically.
