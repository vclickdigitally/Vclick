export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    SERVICES: "/services",
    BLOG: "/blog",
    PORTFOLIO: "/portfolio",
    CASE_STUDIES: "/case-studies",
  },
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin",
    PAGES: "/admin/pages",
    BLOGS: "/admin/blogs",
    MEDIA: "/admin/media",
    SEO: "/admin/seo",
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
  },
  API: {
    AUTH: "/api/auth",
    FORMS: "/api/forms/submit",
    SITEMAP: "/sitemap.xml",
    ROBOTS: "/robots.txt",
  },
} as const;
