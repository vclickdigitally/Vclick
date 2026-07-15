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
    enabled: false
  },
  {
    title: "Branding & Social Media",
    href: "/services/branding-social-media",
    enabled: false
  }
];

export const homepageLinks: NavLink[] = [
  { label: "Services", href: "#services", isServices: true },
  { label: "Our Work", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "FAQ", href: "/#faq" }
];

export const internalLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#", isServices: true },
  { label: "About", href: "/about", isUpcoming: true },
  { label: "Blog", href: "/blog", isUpcoming: true },
  { label: "Contact", href: "/contact", isUpcoming: true }
];
