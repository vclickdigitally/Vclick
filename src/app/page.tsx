import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '../components/HeroSection';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

// Below-the-fold components dynamically imported to optimize initial JS bundle and TBT
// Below-the-fold components dynamically imported to optimize initial JS bundle and TBT
const AboutSection = dynamic(() => import('../components/AboutSection').then(m => m.AboutSection));
const ServicesSection = dynamic(() => import('../components/ServicesSection').then(m => m.ServicesSection));
const WhyChooseVClick = dynamic(() => import('../components/WhyChooseVClick').then(m => m.WhyChooseVClick));
const InteractivePortfolio = dynamic(() => import('../components/InteractivePortfolio').then(m => m.InteractivePortfolio));
const ProcessSection = dynamic(() => import('../components/ProcessSection').then(m => m.ProcessSection));
const TrustedBySection = dynamic(() => import('../components/TrustedBySection').then(m => m.TrustedBySection));
const ClientStatsSection = dynamic(() => import('../components/ClientStatsSection').then(m => m.ClientStatsSection));
const GoogleReviewsSection = dynamic(() => import('../components/GoogleReviewsSection').then(m => m.GoogleReviewsSection));
const BlogSection = dynamic(() => import('../components/BlogSection').then(m => m.BlogSection));
const FaqSection = dynamic(() => import('../components/FaqSection').then(m => m.FaqSection));
const CtaSection = dynamic(() => import('../components/CtaSection').then(m => m.CtaSection));

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

        {/* Below-the-fold content */}
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
      </main>
    </>
  );
}
