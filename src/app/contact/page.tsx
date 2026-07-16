import React from 'react';
import { ContactPage } from '@/components/ContactPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact VClick Digitally to discuss your organic SEO search monopolies, Next.js web application designs, and ad placement scaling options.",
  path: "/contact",
});

export default function ContactRoute() {
  const localBusinessSchema = generateJsonLdSchema("Service", {
    "@type": "LocalBusiness",
    "name": "VClick Digitally",
    "image": "https://vclickdigitally.com/logo.png",
    "telephone": "+919944941707",
    "email": "hello@vclickdigitally.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
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
        "name": "Contact",
        "item": "https://vclickdigitally.com/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <ContactPage />
    </>
  );
}
