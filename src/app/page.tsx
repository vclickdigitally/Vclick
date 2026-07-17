import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '../components/HeroSection';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

// Consolidated groups of below-the-fold sections to decrease dynamic chunk loading overhead while keeping SSR enabled
const CoreMarketingSections = dynamic(() => import('../components/CoreMarketingSections').then(m => m.CoreMarketingSections));
const InteractivePortfolio = dynamic(() => import('../components/InteractivePortfolio').then(m => m.InteractivePortfolio));
const SocialProofSections = dynamic(() => import('../components/SocialProofSections').then(m => m.SocialProofSections));
const ConversionSections = dynamic(() => import('../components/ConversionSections').then(m => m.ConversionSections));

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

        {/* 2. Core Marketing (About, Services, Why Choose VClick) */}
        <CoreMarketingSections />

        {/* 3. Selected Work Interactive Portfolio */}
        <InteractivePortfolio />

        {/* 4. Social Proof & Blog (Trusted By, Client Stats, Google Reviews, Blog) */}
        <SocialProofSections />

        {/* 5. Process, FAQ & CTA */}
        <ConversionSections />
      </main>
    </>
  );
}
