import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string; // e.g. "/services/seo"
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  verificationGoogle?: string;
}

export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description,
    path = "",
    image = siteConfig.ogImage,
    noIndex = false,
    type = "website",
    keywords = [],
    verificationGoogle = "google-site-verification-default-key-vclick",
  } = options;

  const pageTitle = title 
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.name} | Marketing & Web Development Agency`;
    
  const pageDescription = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL("https://vclickdigitally.com"),
    title: pageTitle,
    description: pageDescription,
    keywords: [...keywords, "digital agency", "SEO optimization", "Next.js 15 CMS", "web development agency"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${siteConfig.url}${path}`,
      },
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: ["/shortcut-icon.png"],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.shortName,
    },
    verification: {
      google: verificationGoogle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: type as any,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
      creator: "@vclickdigitally",
    },
  };
}

/**
 * Dynamic JSON-LD Structured Data Schema Generator
 */
export function generateJsonLdSchema(type: "Organization" | "WebSite" | "Service", data: Record<string, any> = {}) {
  const defaults = {
    "@context": "https://schema.org",
    "@type": type,
    "name": siteConfig.name,
    "url": siteConfig.url,
  };

  if (type === "Organization") {
    return {
      ...defaults,
      "logo": `${siteConfig.url}/logo.png`,
      "sameAs": [
        siteConfig.links.twitter,
        siteConfig.links.linkedin,
      ],
      ...data,
    };
  }

  if (type === "Service") {
    return {
      ...defaults,
      "provider": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
      },
      ...data,
    };
  }

  return {
    ...defaults,
    ...data,
  };
}
