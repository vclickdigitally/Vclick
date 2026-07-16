import React from 'react';
import { AboutPage } from '@/components/AboutPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about VClick Digitally, a premium digital marketing and web development agency driving compounding growth, high-performance SEO, and luxury brand design.",
  path: "/about",
});

export default function AboutRoute() {
  const organizationSchema = generateJsonLdSchema("Organization", {
    description: "VClick Digitally helps businesses grow through SEO, high-performance websites, branding, social media, and performance marketing."
  });

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vclickdigitally.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://vclickdigitally.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <AboutPage />
    </>
  );
}
