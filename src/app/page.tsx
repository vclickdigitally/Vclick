import React, { Suspense } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseVClick } from '../components/WhyChooseVClick';
import { InteractivePortfolio } from '../components/InteractivePortfolio';
import { ProcessSection } from '../components/ProcessSection';
import { TrustedBySection } from '../components/TrustedBySection';
import { ClientStatsSection } from '../components/ClientStatsSection';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { BlogSection } from '../components/BlogSection';
import { FaqSection } from '../components/FaqSection';
import { CtaSection } from '../components/CtaSection';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

// Centralized Metadata API Integration
export const metadata = buildMetadata();

export default function Home() {
  // Generate Structured Data for Search Engine Optimization
  const organizationSchema = generateJsonLdSchema("Organization", {
    description: "Enterprise Growth Agency - SEO, Next.js Development, and Visual Product Design.",
    address: {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressCountry": "IN"
    }
  });

  const websiteSchema = generateJsonLdSchema("WebSite", {
    potentialAction: {
      "@type": "SearchAction",
      "target": "https://vclickdigitally.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  return (
    <>
      {/* Dynamic JSON-LD Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Main Content Assembly */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden pt-16">
        {/* 1. Hero Section - Renders instantly */}
        <HeroSection />

        {/* Below-the-fold content - Lazy loaded in Suspense */}
        <Suspense fallback={<div className="min-h-[200px]" />}>
          {/* About Us Section */}
          <AboutSection />

          {/* 2. Our Services / Core Capabilities */}
          <ServicesSection />

          {/* 3. Why Choose VClick */}
          <WhyChooseVClick />

          {/* 4. Selected Work Interactive Portfolio */}
          <InteractivePortfolio />

          {/* 5. Our Surgical Process */}
          <ProcessSection />

          {/* 11. Trusted By Industry Leaders */}
          <TrustedBySection />

          {/* Client Stats Section */}
          <ClientStatsSection />

          {/* Google Reviews Section */}
          <GoogleReviewsSection />

          {/* Dynamic Blog Section */}
          <BlogSection />

          {/* 12. Frequently Answered Inquiries (FAQ) */}
          <FaqSection />

          {/* 12. Monumental Turning Point CTA */}
          <CtaSection />
        </Suspense>
      </main>
    </>
  );
}
