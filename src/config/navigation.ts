export interface ServiceLink {
  title: string;
  href: string;
  enabled: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  isServices?: boolean;
  isUpcoming?: boolean;
}

export const services: ServiceLink[] = [
  {
    title: "SEO Services",
    href: "/services/seo",
    enabled: true
  },
  {
    title: "Website Development",
    href: "/services/website-development",
    enabled: true
  },
  {
    title: "Performance Marketing",
    href: "/services/performance-marketing",
    enabled: true
  },
  {
    title: "Branding & Social Media",
    href: "/services/branding-social-media",
    enabled: true
  }
];

export const homepageLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services", isServices: true },
  { label: "About", href: "/about" },
  { label: "Blog", href: "https://vclickdigitally.com/blog" },
  { label: "Contact", href: "/contact" }
];

export const internalLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#", isServices: true },
  { label: "About", href: "/about" },
  { label: "Blog", href: "https://vclickdigitally.com/blog" },
  { label: "Contact", href: "/contact" }
];
