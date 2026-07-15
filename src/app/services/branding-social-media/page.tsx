import React from 'react';
import { BrandingSocialMediaPage } from '@/components/BrandingSocialMediaPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Branding & Social Presence",
  description: "Corporate identity alignment, logo designs, and modern content creation campaigns for industry leaders.",
  path: "/services/branding-social-media",
});

export default function ServicesBrandingPage() {
  const serviceSchema = generateJsonLdSchema("Service", {
    name: "Branding & Social Presence Services",
    description: "Brand Strategy, Logo & Visual Identity Design, Content Calendar grids, Reels production, and community management.",
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
      <BrandingSocialMediaPage />
    </>
  );
}
