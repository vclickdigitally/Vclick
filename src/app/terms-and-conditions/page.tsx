import React from 'react';
import { TermsPage } from '@/components/TermsPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions for VClick Digitally. Review our operational sprints, scope of services, payments, revisions, and liability policies.",
  path: "/terms-and-conditions",
});

export default function TermsRoute() {
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
        "name": "Terms & Conditions",
        "item": "https://vclickdigitally.com/terms-and-conditions"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <TermsPage />
    </>
  );
}
