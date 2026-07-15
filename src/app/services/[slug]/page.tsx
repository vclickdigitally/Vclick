import React from 'react';
import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const SUPPORTED_SLUGS = ['meta-ads', 'branding-social-media'];

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  
  if (!SUPPORTED_SLUGS.includes(slug)) {
    return buildMetadata({ title: "Page Not Found", noIndex: true });
  }

  let title = "Web Design & Development";
  let description = "Sub-second edge rendered web applications custom built for high search conversion.";

  if (slug === 'meta-ads') {
    title = "Performance Marketing (Meta & Google Ads)";
    description = "Strategic paid acquisition campaigns driving high-intent growth and customer acquisitions.";
  } else if (slug === 'branding-social-media') {
    title = "Branding & Social Presence";
    description = "Corporate identity alignment and modern content creation campaigns for industry leaders.";
  }

  return buildMetadata({
    title,
    description,
    path: `/services/${slug}`,
  });
}

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  if (!SUPPORTED_SLUGS.includes(slug)) {
    notFound();
  }

  let title = "Web Design & Development";
  let description = "Sub-second edge rendered web applications custom built for high search conversion.";

  if (slug === 'meta-ads') {
    title = "Performance Marketing (Meta & Google Ads)";
    description = "Strategic paid acquisition campaigns driving high-intent growth and customer acquisitions.";
  } else if (slug === 'branding-social-media') {
    title = "Branding & Social Presence";
    description = "Corporate identity alignment and modern content creation campaigns for industry leaders.";
  }

  const serviceSchema = generateJsonLdSchema("Service", {
    name: title,
    description: description,
    areaServed: ["IN", "US", "SG", "SA"],
  });

  const mockPath = `/services/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailPage path={mockPath} />
    </>
  );
}
