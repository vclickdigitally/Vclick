import React from 'react';
import { PerformanceMarketingPage } from '@/components/PerformanceMarketingPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Performance Marketing (Meta & Google Ads)",
  description: "Strategic paid acquisition campaigns driving high-intent growth and customer acquisitions across Google, Meta, and LinkedIn.",
  path: "/services/performance-marketing",
});

export default function ServicesPerformancePage() {
  const serviceSchema = generateJsonLdSchema("Service", {
    name: "Performance Marketing Services",
    description: "ROI-focused Google Search Ads, Meta campaigns management, conversion tags mappings, and offline tag integrations.",
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
      <PerformanceMarketingPage />
    </>
  );
}
