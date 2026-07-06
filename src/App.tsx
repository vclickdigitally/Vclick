import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { Navbar } from './components/Navbar';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TrustedBySection } from './components/TrustedBySection';
import { ClientStatsSection } from './components/ClientStatsSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseVClick } from './components/WhyChooseVClick';
import { InteractivePortfolio } from './components/InteractivePortfolio';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
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

  // Path-based routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle popstate (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept anchor clicks starting with '/services/' for SPA behavior
  useEffect(() => {
    const handleGlobalClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/services/')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setCurrentPath(href);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };
    document.addEventListener('click', handleGlobalClicks);
    return () => document.removeEventListener('click', handleGlobalClicks);
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

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
        {currentPath.startsWith('/services/') ? (
          <ServiceDetailPage
            path={currentPath}
            onNavigateHome={navigateToHome}
            onStartProject={handleStartProject}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onLaunchExperience={handleLaunchExperience}
              onOpenShowreel={handleOpenShowreel}
            />

            {/* About Us Section */}
            <AboutSection />

            {/* 2. Our Services / Core Capabilities (Bento Deep Dive) */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* 3. Why Choose VClick Digitally */}
            <WhyChooseVClick />

            {/* 4. Selected Work Interactive Portfolio */}
            <InteractivePortfolio />

            {/* 5. Our Surgical Process */}
            <ProcessSection />

            {/* 11. Trusted By Industry Leaders (Dual Infinite Marquee) */}
            <TrustedBySection />

            {/* Client Stats Section */}
            <ClientStatsSection />

            {/* Google Reviews Section */}
            <GoogleReviewsSection />

            {/* Dynamic WordPress Blog Section */}
            <BlogSection />

            {/* 12. Frequently Answered Inquiries (FAQ) */}
            <FaqSection />

            {/* 12. Monumental Turning Point CTA */}
            <CtaSection onStartProject={handleStartProject} />
          </>
        )}
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
