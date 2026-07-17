import React from 'react';
import { ProcessSection } from './ProcessSection';
import { FaqSection } from './FaqSection';
import { CtaSection } from './CtaSection';

export const ConversionSections: React.FC = () => {
  return (
    <>
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};
