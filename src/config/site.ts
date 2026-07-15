export const siteConfig = {
  name: "VClick Digitally",
  shortName: "VClick",
  description: "Enterprise Growth Agency - SEO, Next.js Development, and Visual Product Design.",
  url: process.env.NEXTAUTH_URL || "https://vclickdigitally.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/vclickdigitally",
    github: "https://github.com/vclickdigitally",
    linkedin: "https://linkedin.com/company/vclickdigitally",
  },
  author: "VClick Team",
};

export type SiteConfig = typeof siteConfig;
