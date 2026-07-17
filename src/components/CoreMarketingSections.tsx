import React from 'react';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { WhyChooseVClick } from './WhyChooseVClick';

export const CoreMarketingSections: React.FC = () => {
  return (
    <>
      <AboutSection />
      <ServicesSection />
      <WhyChooseVClick />
    </>
  );
};
