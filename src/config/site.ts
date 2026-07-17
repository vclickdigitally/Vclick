export const siteConfig = {
  name: "VClick Digitally",
  shortName: "VClick",
  description: "Enterprise Growth Agency - SEO, Next.js Development, and Visual Product Design.",
  url: process.env.APP_URL || "https://vclickdigitally.com",
  ogImage: "/og-image.png",
  links: {
    instagram: "https://www.instagram.com/vclickdigitally",
    linkedin: "https://www.linkedin.com/in/vclick-digitally-b54463383/",
  },
  author: "VClick Team",
};

export type SiteConfig = typeof siteConfig;
