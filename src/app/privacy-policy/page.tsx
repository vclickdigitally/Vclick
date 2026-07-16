import React from 'react';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for VClick Digitally. Learn how we collect, process, and protect your personal information, contact form inputs, and analytics data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyRoute() {
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
        "name": "Privacy Policy",
        "item": "https://vclickdigitally.com/privacy-policy"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <PrivacyPolicyPage />
    </>
  );
}
