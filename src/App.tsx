import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustedBySection } from './components/TrustedBySection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { CaseStudyNumbersSection } from './components/CaseStudyNumbersSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { InteractiveEstimatorSection } from './components/InteractiveEstimatorSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';

// Modals
import { ProjectModal } from './components/ProjectModal';
import { ShowreelModal } from './components/ShowreelModal';
import { CaseStudyModal } from './components/CaseStudyModal';

import { ProjectCase, ServiceItem, IndustrySector } from './types';

export default function App() {
  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedProjectCase, setSelectedProjectCase] = useState<ProjectCase | null>(null);

  // Preset parameters for ProjectModal
  const [initialModalBudget, setInitialModalBudget] = useState<number>(15000);
  const [initialModalService, setInitialModalService] = useState<string>('FULL');

  // Action handlers
  const handleStartProject = () => {
    setInitialModalBudget(15000);
    setInitialModalService('FULL');
    setIsProjectModalOpen(true);
  };

  const handleLaunchExperience = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenShowreel = () => {
    setIsShowreelOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setInitialModalService(service.category);
    setInitialModalBudget(service.category === 'SEO' ? 10000 : service.category === 'PPC' ? 15000 : 25000);
    setIsProjectModalOpen(true);
  };

  const handleExploreCase = (project: ProjectCase) => {
    setSelectedProjectCase(project);
  };

  const handleSelectIndustry = (industry: IndustrySector) => {
    setInitialModalService('FULL');
    setInitialModalBudget(20000);
    setIsProjectModalOpen(true);
  };

  const handleStartWithEstimate = (budget: number, service: string) => {
    setInitialModalBudget(budget);
    setInitialModalService(service);
    setIsProjectModalOpen(true);
  };

  const handleStartFromCaseTag = (serviceTag: string) => {
    setInitialModalService('FULL');
    setIsProjectModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white flex flex-col justify-between">
      {/* Precision Follower Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Mesh Gradients & Grid Background */}
      <BackgroundDecoration />

      {/* Persistent Navigation Header */}
      <Navbar onStartProject={handleStartProject} />

      {/* Main Content Assembly */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* 1. Hero Section */}
        <HeroSection
          onLaunchExperience={handleLaunchExperience}
          onOpenShowreel={handleOpenShowreel}
        />

        {/* 2. Trusted By Global Brands Marquee */}
        <TrustedBySection />

        {/* 3. Our Services / Core Capabilities (Bento Deep Dive) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Featured Case Studies Showcases */}
        <FeaturedProjectsSection onExploreCase={handleExploreCase} />

        {/* 5. Our Surgical Process */}
        <ProcessSection />

        {/* 6. Case Study Numbers Banner */}
        <CaseStudyNumbersSection />

        {/* 7. Why Choose Us Comparison Matrix */}
        <WhyChooseUsSection />

        {/* 8. Verified Executive Testimonials */}
        <TestimonialsSection />

        {/* 9. Vertical Dominance (Industries) */}
        <IndustriesSection onSelectIndustry={handleSelectIndustry} />

        {/* 10. Interactive Growth Simulator (Estimator) */}
        <InteractiveEstimatorSection onStartWithEstimate={handleStartWithEstimate} />

        {/* 11. Frequently Answered Inquiries (FAQ) */}
        <FaqSection />

        {/* 12. Monumental Turning Point CTA */}
        <CtaSection onStartProject={handleStartProject} />
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Confidential Onboarding / Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        initialBudget={initialModalBudget}
        initialService={initialModalService}
      />

      {/* 4K Global Showreel Video Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Detailed Audited Case Study Modal */}
      <CaseStudyModal
        isOpen={selectedProjectCase !== null}
        onClose={() => setSelectedProjectCase(null)}
        project={selectedProjectCase}
        onStartProjectWithTag={handleStartFromCaseTag}
      />
    </div>
  );
}
