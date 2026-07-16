import React from 'react';
import { SitemapPage } from '@/components/SitemapPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Sitemap",
  description: "Visual directory sitemap of VClick Digitally. Quickly locate organic SEO configurations, performant website builds, blog insights, and legal compliance guidelines.",
  path: "/sitemap",
});

export default function SitemapRoute() {
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
        "name": "Sitemap",
        "item": "https://vclickdigitally.com/sitemap"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <SitemapPage />
    </>
  );
}
