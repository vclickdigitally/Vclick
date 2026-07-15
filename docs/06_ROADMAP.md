# 06. Implementation Roadmap

This document outlines the phased roadmap for building **VClick OS**. Each phase represents a group of deliverables with clear validation points before moving to the next.

---

## 1. Development Phases

```mermaid
gantt
    title VClick OS Phased Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Next.js 15 Migration & Middleware     :active, p1_1, 2026-07-10, 5d
    Prisma Postgres Schema Migration     :p1_2, after p1_1, 3d
    Auth.js RBAC Setup                   :p1_3, after p1_2, 3d
    section Phase 2: Core CMS
    Admin Layout & Core Dashboard        :p2_1, after p1_3, 4d
    Pages & Blogs Basic CRUD             :p2_2, after p2_1, 5d
    Workflow Engine Integration          :p2_3, after p2_2, 3d
    section Phase 3: DAM & Page Builder
    DAM Signed Uploads & Sharp Pipeline  :p3_1, after p2_3, 6d
    TipTap Rich Text Blocks              :p3_2, after p3_1, 6d
    Reusable Page Builder Block Engine   :p3_3, after p3_2, 7d
    section Phase 4: VClick SEO Center
    SERP Canvas Calculator & Realtime check:p4_1, after p3_3, 6d
    JSON-LD Schema Forms Engine          :p4_2, after p4_1, 4d
    Redirects Manager & 404 Monitor      :p4_3, after p4_2, 4d
    section Phase 5: AI Center
    Gemini API Integration & Meta Generator :p5_1, after p4_3, 5d
    Vision API Alt Suggestor             :p5_2, after p5_1, 3d
    EEAT Check & Semantic Link Generator  :p5_3, after p5_2, 4d
    section Phase 6: Analytics & Integrations
    GA4 & GSC OAuth Configurator         :p6_1, after p5_3, 5d
    Clarity & Search Analytics Dashboard :p6_2, after p6_1, 5d
    section Phase 7: Forms, Menus & Theme
    Forms Drag-Drop Builder & Zod parser :p7_1, after p6_2, 5d
    Menus & Theme CSS variables panel    :p7_2, after p7_1, 4d
    section Phase 8: Backups & Scaling
    S3 Backup Script & Multi-site Domains:p8_1, after p7_2, 5d
```

---

## 2. Phase Detail & Key Deliverables

### Phase 1: Foundation (MVP)
- **Goal**: Migrate the existing Vite application structure to Next.js 15 App Router, configure multi-site database scoping, and set up user authentication.
- **Deliverables**:
  - Restructured folder layout inside `Vclick`.
  - Next.js Edge Middleware detecting hostnames and rewriting routes.
  - Active Prisma PostgreSQL database schema containing roles and tenancy tables.
  - Auth.js authentication provider defending the `/admin` routes.
- **Validation**: Verify that trying to access `/admin` redirects unauthorized users to `/admin/login`.

### Phase 2: Core CMS (MVP)
- **Goal**: Build base-level management dashboards and standard page editing workflows.
- **Deliverables**:
  - Dark brutalist dashboard sidebar, layout panels, and top bar.
  - Hierarchical Page and Blog lists with status filtering.
  - Content editing pages supporting custom slug generation.
  - State machine workflow rules (`DRAFT` -> `PUBLISHED` -> `ARCHIVED`).
- **Validation**: Create a new page, save as draft, view in listings table, progress its workflow status, and verify publication.

### Phase 3: Media Library (DAM) & Editor Blocks (v1.0)
- **Goal**: Integrate file uploading and custom content block editing.
- **Deliverables**:
  - Media Drag-and-drop dashboard.
  - Sharp optimization pipeline outputting AVIF/WebP variants and responsive layout image sets.
  - TipTap block editor with custom components (Comparison tables, FAQ accordions, alerts).
  - Drag-and-drop Page Builder block assembler.
- **Validation**: Upload a 5MB JPG file, verify it compiles into WebP/AVIF versions under 200KB, insert the optimized image into a page layout block, and inspect rendering.

### Phase 4: VClick SEO Center (v1.0 / v2.0)
- **Goal**: Implement standard-beating SEO validation tools.
- **Deliverables**:
  - SEO tab component integrated into editors.
  - Canvas-based title and meta description pixel-width calculators.
  - Real-time on-page SEO checklist analyzer.
  - Redirect manager middleware (with automatic suggestion logs).
  - Dynamic XML sitemaps and robots.txt generation.
- **Validation**: In page editor, input a title exceeding 600px width. Confirm the visual warning displays in real time and verify generated sitemaps compile correctly at `/sitemap.xml`.

### Phase 5: AI Center (v2.0)
- **Goal**: Integrate Gemini AI to automate content optimization tasks.
- **Deliverables**:
  - Meta metadata generators.
  - Vision API alt tag description suggetor.
  - AI schema generator and content quality (EEAT) check list parser.
- **Validation**: Click "Auto-Generate Alt" on an image upload. Verify that the Gemini API returns a descriptive, keyword-rich alternative text.

### Phase 6: Analytics & Integrations (Enterprise)
- **Goal**: Connect external telemetry services directly to the CMS dashboard.
- **Deliverables**:
  - Google OAuth credential loader.
  - Search Console impressions/clicks metrics displays.
  - GA4 traffic dashboards.
  - Index coverage and 404 crawl issue reports.
- **Validation**: View the `/admin/seo-center` dashboard and check GSC traffic charts rendering data fetched from Google APIs.

### Phase 7: Forms, Navigation & Styling (Enterprise)
- **Goal**: Build lead collection pipelines and customize styling.
- **Deliverables**:
  - Forms constructor and submissions viewer.
  - Menu nesting manager.
  - Theme variable loader page.
- **Validation**: Build a contact form in the editor, submit a test query on the front-end, and verify it populates the admin forms dashboard.

### Phase 8: Backups & Scaling (Enterprise)
- **Goal**: Maintain platform stability and data safety.
- **Deliverables**:
  - Backup scheduler.
  - Subdomain routing controllers.
- **Validation**: Run backup command and verify the compressed database file is stored in S3/R2 storage.
