# 01. VClick OS Product Specification

**VClick OS** is an enterprise-grade, multi-tenant AI-Powered CMS and SEO Platform built natively in Next.js 15 App Router. It is designed to replace traditional CMS platforms like WordPress with a modern, high-performance, and secure architecture. The VClick Digitally website will serve as the flagship application running on this OS, which is architected to scale to support thousands of independent client websites under a single unified administration dashboard.

---

## 1. Product Vision & Core Value Proposition
- **VClick OS** is built for digital agencies, enterprise businesses, and content publishers who require a fast, secure, and SEO-optimized website infrastructure.
- **Key Value Drivers**:
  - **Zero-Dependency Core**: No external CMS plugins, avoiding code bloat and security vulnerabilities.
  - **Multi-Tenant from Day One**: Run unlimited client websites on a single server instance with isolated databases, assets, domains, and configurations.
  - **Native Real-Time SEO Engine**: Superior checks compared to Yoast/Rank Math, incorporating Google Search Console (GSC), Google Analytics 4 (GA4), and Microsoft Clarity data directly in the writing workspace.
  - **Gemini-Powered Content Operations**: AI integrated natively into the content workflow, not just as a text editor overlay, but as a technical validator (EEAT checks, schema builder, internal link suggestions, semantic entity optimizer).

---

## 2. Comprehensive Module Specification

### 01. Pages Module
- **Purpose**: Manage hierarchical structured pages (e.g. Home, About, Landing pages).
- **Key Features**:
  - Drag-and-drop hierarchy mapping.
  - Parent/child page associations.
  - Custom templates assignment.
  - Page duplicate, draft preview, version compare, soft delete, and restore from trash.
  - Autosave (local storage + database revision backups).
  - Author allocation.

### 02. Blogs Module
- **Purpose**: Publish dynamic content.
- **Key Features**:
  - WordPress-level content creation workspace.
  - Fully integration with the TipTap Editor and custom blocks.
  - Category and tag taxonomies.
  - Author allocation (supporting multi-author articles).
  - Excerpt generator and reading time calculator.
  - Post schedule, preview link, draft, version compare.

### 03. Media Library (DAM)
- **Purpose**: Centralized Digital Asset Management.
- **Key Features**:
  - Drag-and-drop bulk file uploads.
  - Automatic conversion to WebP and AVIF.
  - Real-time compression and creation of responsive image sizes (`320w`, `640w`, `1024w`, `1920w`).
  - SHA-256 duplicate detection.
  - Metadata manager (ALT, Title, Caption, Focus Keyword).
  - Virtual folders and Collections.
  - Asset usage tracking (tells you which page/blog is using the image).

### 04. SEO Center
- **Purpose**: Next-generation SEO suite natively integrated into the editing flow.
- **Key Features**:
  - Real-time on-page SEO audits.
  - Dynamic Google SERP desktop & mobile preview with canvas-based pixel-width counters.
  - Multi-schema JSON-LD builder.
  - Technical SEO Dashboard (404 monitor, broken link checker, orphan pages report).
  - Automated redirect engine (suggests redirects on page slug alterations).
  - Direct Google Search Console (GSC) and Google Analytics 4 (GA4) integrations.
  - Semantic entity optimization & LSI keyword checker.

### 05. AI Center
- **Purpose**: Power SEO and content writing workflows using the Google Gemini model.
- **Key Features**:
  - Generate titles, meta descriptions, FAQ lists, schemas, and ALT texts automatically.
  - Content gap analyses, topic clustering, and LSI keyword suggestions.
  - Content Quality Reviews against Google's EEAT and Helpful Content guidelines.
  - Suggest internal linking networks by scanning database entities.

### 06. Forms Module
- **Purpose**: Construct and capture leads.
- **Key Features**:
  - Drag-and-drop form builder.
  - Zod validation schema generation.
  - Form submission dashboard (search, filter, CSV exports).
  - Email notification trigger setup.

### 07. Menus Module
- **Purpose**: Manage website navigation.
- **Key Features**:
  - Hierarchical drag-and-drop navigation items.
  - Link targets setting (`_self`, `_blank`).
  - Custom CSS class hooks.

### 08. Portfolio Module
- **Purpose**: Present agency projects and case portfolios.
- **Key Features**:
  - Metadata for portfolios (Client, industry, date, service category).
  - Grid display layouts.

### 09. Services Module
- **Purpose**: Define service pages with pricing calculators.
- **Key Features**:
  - Core service definition.
  - Dynamic budget estimator blocks.

### 10. Case Studies Module
- **Purpose**: Document performance metrics.
- **Key Features**:
  - Challenge/Strategy/Results block fields.
  - Highlighting key metrics badges (e.g. "+140% Conversions").

### 11. Testimonials Module
- **Purpose**: Showcase client reviews.
- **Key Features**:
  - Rating metrics, company name, reviewer avatar, review source (e.g. Google GMB sync).

### 12. Authors Module
- **Purpose**: Manage author profiles.
- **Key Features**:
  - Bio, credentials, social links, profile pictures, and schema validation as `Person`.

### 13. Users Module
- **Purpose**: Internal administration users database.
- **Key Features**:
  - Name, email, password hashing, and website authorizations.

### 14-15. Roles & Permissions Module
- **Purpose**: Enforce RBAC (Role Based Access Control).
- **Key Features**:
  - Predefined system roles: `SUPERADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `CONTRIBUTOR`.
  - Scoped permissions grid (e.g. `pages:publish`, `media:delete`, `seo:edit`).

### 16. Notifications Module
- **Purpose**: In-app notifications.
- **Key Features**:
  - Triggers alerts for form submissions, 404 crawl spikes, and workflow approvals.

### 17. Activity Logs Module
- **Purpose**: Security auditing.
- **Key Features**:
  - Logs user ID, IP address, action type, modified entity, and timestamp.

### 18. Settings Module
- **Purpose**: Configure site parameters.
- **Key Features**:
  - API keys, GSC/GA4 OAuth mappings, Microsoft Clarity IDs, header/footer custom scripts inserts.

### 19. Theme Manager
- **Purpose**: Brand styling control.
- **Key Features**:
  - Custom color token selection (Brutalism, Minimal dark/light tokens).
  - Custom font family selector (Google Fonts integration).

### 20. Analytics Module
- **Purpose**: Internal dashboard displaying user engagement.
- **Key Features**:
  - Renders GA4 data, crawl issues charts, competitor keyword trackers.

### 21. Integrations Module
- **Purpose**: External OAuth management.
- **Key Features**:
  - Configures GSC OAuth, GA4, Bing Webmaster, Google Merchant Center.

### 22. Backup Manager
- **Purpose**: System preservation.
- **Key Features**:
  - Automated database exports to S3/R2.
  - One-click restore scripts.

### 23. Workflow Engine
- **Purpose**: Editor publication pipeline.
- **Key Features**:
  - Post status levels: `DRAFT` -> `UNDER_REVIEW` -> `NEEDS_CHANGES` -> `APPROVED` -> `SCHEDULED` -> `PUBLISHED` -> `ARCHIVED`.

---

## 3. Core Feature Taxonomies (Implementation Tiering)

### MVP Tier (Phase 1 & 2)
- Multi-site routing middleware.
- RBAC Security (Authentication/Credentials Provider).
- Pages CRUD and Category/Tag taxonomies.
- Media Library (DAM) basic uploads.
- Simple SEO Metadata inputs.

### Version 1.0 Tier (Phase 3 & 4)
- TipTap Custom Block Editor.
- Complete Workflow Engine.
- Dynamic XML & Image Sitemaps.
- Real-time SEO Scoring & Canvas-based Pixel checks.
- Redirect Manager & 404 Logging middleware.
- Structured JSON-LD Schema builder.

### Version 2.0 Tier (Phase 5 & 6)
- AI Center (Gemini content suggestions, Vision ALT tags).
- GSC & GA4 API Dashboards.
- Interactive Content Hub force-directed graph.
- Automated redirect recommendation engine.
- Form builder with Zod validation.

### Enterprise Tier (Phase 7 & 8)
- Automated image conversion to AVIF/WebP with sharp.
- Competitor keyword tracking dashboards.
- Multi-language SEO translations (Hreflang).
- Theme Manager style toggling.
- Automated S3/R2 Backup scheduling.

---

## 4. Module Complexity & Dependency Architecture

| Module | Complexity | Dependencies |
| :--- | :--- | :--- |
| **Multi-site Engine** | High | None (Base layer) |
| **RBAC & Users** | Medium | Multi-site |
| **Media (DAM)** | High | Multi-site, sharp |
| **Pages & Blogs** | Medium | Users, Media |
| **TipTap Block Editor**| High | Blogs, Pages |
| **SEO Score Engine** | Very High | Pages, Blogs, Entities |
| **AI Center** | High | Pages, Blogs, Gemini API |
| **Analytics Dashboard**| High | Integrations, GSC/GA4 APIs |
| **Workflow Engine** | Medium | Users, Roles |
| **Page Builder** | Very High | Pages, Media, Forms |
