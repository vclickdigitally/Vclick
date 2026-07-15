import React from 'react';
import { SeoServicesPage } from '@/components/SeoServicesPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Advanced SEO Optimization Services",
  description: "Aggressive organic growth and search visibility scaling engines for enterprise brands. Built and delivered entirely in-house.",
  path: "/services/seo",
});

export default function ServicesSeoPage() {
  const serviceSchema = generateJsonLdSchema("Service", {
    name: "Advanced Search Engine Optimization Services",
    description: "Technical SEO audits, keyword mapping, on-page fixes, schema integrations, and digital authority PR campaigns.",
    areaServed: ["IN", "US", "SG", "SA"],
    offers: {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "Negotiable"
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SeoServicesPage />
    </>
  );
}
