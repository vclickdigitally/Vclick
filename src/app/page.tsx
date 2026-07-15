import React, { Suspense } from 'react';
import { CustomCursor } from '../components/CustomCursor';
import { BackgroundDecoration } from '../components/BackgroundDecoration';
import { Navbar } from '../components/Navbar';
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
import { Footer } from '../components/Footer';

// Modals are fully self-contained Client Components, we just import and render them at the bottom.
import { ProjectModal } from '../components/ProjectModal';
import { ShowreelModal } from '../components/ShowreelModal';
import { CaseStudyModal } from '../components/CaseStudyModal';
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
    <div className="relative min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white flex flex-col justify-between">
      {/* Dynamic JSON-LD Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Precision Follower Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Mesh Gradients & Grid Background */}
      <BackgroundDecoration />

      {/* Persistent Navigation Header */}
      <Navbar />

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

      {/* Premium Footer */}
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>

      {/* Modals are self-contained client hooks */}
      <ProjectModal />
      <ShowreelModal />
      <CaseStudyModal />
    </div>
  );
}
