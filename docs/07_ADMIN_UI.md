# 07. Admin UI & UX Design

This document specifies the design system, page wireframes, and UX workflows for the **VClick OS** administration dashboard.

---

## 1. Design System & Style Guide

To match VClick's branding, the administration dashboard uses a **Luxury Dark Brutalism** design language. This style features dark backdrops, bright accents, card borders with shadow elements, clean grids, and smooth transitions.

### Core Color Palette (CSS Variable Tokens)
- **Backgrounds**:
  - Primary Background: `#0B0B0B` (Deep absolute black)
  - Card/Module Background: `#121212` (Eerie black)
  - Element Hover: `#1B1B1B` (Slightly lighter grey)
- **Borders**:
  - Border Gray: `rgba(255, 255, 255, 0.08)`
  - Active/Accent Border: `#DD183B` (VClick Cherry Red)
- **Typography**:
  - Heading Font: `"Big Shoulders Display"`, ui-sans-serif
  - Body Font: `"Manrope"`, system-ui, sans-serif
  - Text Primary: `#FFFFFF`
  - Text Muted: `#8E8E8E` (Muted gray)
- **Semantic Accents**:
  - Success Green: `#10B981`
  - Warning Orange: `#F59E0B`
  - Error Red: `#EF4444`

---

## 2. Layout Structure

Every page in the `/admin` area shares a unified two-column layout:

```text
+-----------------------------------------------------------------------------------+
|  Logo: VCLICK OS      | Tenant Switcher (Dropdown)          | User Bio (Avatar)   |
+-----------------------------------------------------------------------------------+
|  [ ] Dashboard        | Breadcrumbs: Admin / Blogs / New                          |
|  [ ] Pages            +-----------------------------------------------------------+
|  [ ] Blogs            |                                                           |
|  [ ] Services         |   Main Workspace Panel                                    |
|  [ ] Portfolio        |   (Renders the specific module content)                   |
|  [ ] Media (DAM)      |                                                           |
|  [ ] SEO Center       |                                                           |
|  [ ] Forms            |                                                           |
|  [ ] Users            |                                                           |
|  [ ] Settings         |                                                           |
|                       |                                                           |
+-----------------------------------------------------------------------------------+
```

- **Sidebar (Width: 260px)**:
  - Sticky left-hand nav. Links contain micro-animations on hover (scaling icons and borders sliding left-to-right in Accent Cherry Red).
- **Workspace Header**:
  - Left: Nested breadcrumbs path and page title.
  - Right: Quick stats (e.g. active domain, active user permissions).

---

## 3. UI Wireframes for Key Dashboards

### A. Pages / Blogs Content Editor Interface
The editor workspace adopts a two-pane layout to keep content editing and technical SEO operations side-by-side:

```text
+-------------------------------------------------------------------+-------------------+
| Title: [ Enter Title Here...                                   ]  | Publish Settings  |
+-------------------------------------------------------------------+-------------------+
| Editor Pane (TipTap)                                              | Metadata Sidebar  |
|                                                                   |                   |
|  [H2] Subheading                                                  | Status: Draft     |
|  This is a block of paragraph text. Select content to format.     | Schedule Date     |
|                                                                   | Author            |
|  +-------------------------------------+                          | Template          |
|  | + FAQ ACCORDION BLOCK               |                          +-------------------+
|  | Q: How do we optimize site speed?   |                          | Featured Image    |
|  | A: Use responsive WebP images.      |                          | [ Select Image ]  |
|  +-------------------------------------+                          +-------------------+
|                                                                   | Taxonomies        |
|  +-------------------------------------------------------------+  | Categories        |
|  | SEO CENTER TAB                                              |  | Tags              |
|  +-------------------------------------------------------------+  |                   |
|  | Focus Keyword: [ nextjs optimization                       ] |                   |
|  | Meta Title:    [ How to Optimize Next.js | VClick OS      ] |                   |
|  |                (=== [600px canvas pixel limit] ===)         |                   |
|  | Description:   [ Learn how to build fast sites using...   ] |                   |
|  |                                                             |                   |
|  | SEO Audit Checklist:                                        |                   |
|  |  [x] Focus keyword in Title (Pass)                          |                   |
|  |  [!] Meta Description too short (Warning)                   |                   |
|  |  [x] Multiple H1 tags checked (Pass)                        |                   |
|  +-------------------------------------------------------------+  |                   |
+-------------------------------------------------------------------+-------------------+
```

### B. Media Library (DAM) Workspace
Designed for file organization and bulk metadata edits:

```text
+---------------------------------------------------------------------------------------+
|  [ + Upload Files ]  |  Folders: [ / ] [ /case-studies ] [ /logos ]  |  Search...     |
+---------------------------------------------------------------------------------------+
|  +-------------------+  +-------------------+  +-------------------+  +-------------+  |
|  | [Image Preview]   |  | [Image Preview]   |  | [Image Preview]   |  | Media Info  |  |
|  | logo-webp.webp    |  | hero-bg.avif      |  | stats-chart.png   |  | Drawer      |  |
|  | 320x240 - 12KB    |  | 1920x1080 - 145KB |  | 800x600 - 45KB    |  |             |  |
|  +-------------------+  +-------------------+  +-------------------+  | Name:       |  |
|  | [Image Preview]   |  | [Image Preview]   |  | [Image Preview]   |  | hero-bg.avif|  |
|  | team-photo.avif   |  | icon-check.svg    |  | client-banner.webp|  |             |  |
|  | 1024x768 - 89KB   |  | 48x48 - 1.2KB     |  | 1200x400 - 54KB   |  | ALT Text:   |  |
|  +-------------------+  +-------------------+  +-------------------+  | [Hero bg..] |  |
|                                                                       |             |  |
|                                                                       | [GenerateAlt|  |
+---------------------------------------------------------------------------------------+
```

- **Asset Info Drawer**: Clicking any image opens a slide-out drawer on the right. Editors can enter ALT text, add captions, see exact CDN paths, convert file formats, and trigger the AI Assistant to generate optimized descriptive labels.
- **Bulk Selection Bar**: Selecting multiple images highlights a bottom floating bar. This bar enables bulk tagging, virtual folder assignments, or bulk deletion (after performing usage checks).
