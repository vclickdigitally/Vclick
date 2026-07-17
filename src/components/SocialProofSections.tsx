import React from 'react';
import { TrustedBySection } from './TrustedBySection';
import { ClientStatsSection } from './ClientStatsSection';
import { GoogleReviewsSection } from './GoogleReviewsSection';
import { BlogSection } from './BlogSection';

export const SocialProofSections: React.FC = () => {
  return (
    <>
      <TrustedBySection />
      <ClientStatsSection />
      <GoogleReviewsSection />
      <BlogSection />
    </>
  );
};
