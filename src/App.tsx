import { useState, useEffect, lazy, Suspense } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

// Lazy loaded subcomponents below the fold
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const WhyChooseVClick = lazy(() => import('./components/WhyChooseVClick').then(m => ({ default: m.WhyChooseVClick })));
const InteractivePortfolio = lazy(() => import('./components/InteractivePortfolio').then(m => ({ default: m.InteractivePortfolio })));
const ProcessSection = lazy(() => import('./components/ProcessSection').then(m => ({ default: m.ProcessSection })));
const TrustedBySection = lazy(() => import('./components/TrustedBySection').then(m => ({ default: m.TrustedBySection })));
const ClientStatsSection = lazy(() => import('./components/ClientStatsSection').then(m => ({ default: m.ClientStatsSection })));
const GoogleReviewsSection = lazy(() => import('./components/GoogleReviewsSection').then(m => ({ default: m.GoogleReviewsSection })));
const BlogSection = lazy(() => import('./components/BlogSection').then(m => ({ default: m.BlogSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then(m => ({ default: m.FaqSection })));
const CtaSection = lazy(() => import('./components/CtaSection').then(m => ({ default: m.CtaSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const SeoServicesPage = lazy(() => import('./components/SeoServicesPage').then(m => ({ default: m.SeoServicesPage })));

// Modals lazy loaded
const ProjectModal = lazy(() => import('./components/ProjectModal').then(m => ({ default: m.ProjectModal })));
const ShowreelModal = lazy(() => import('./components/ShowreelModal').then(m => ({ default: m.ShowreelModal })));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal').then(m => ({ default: m.CaseStudyModal })));

import { ProjectCase } from './types';

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
        {currentPath === '/services/seo' || currentPath === '/services/seo/' ? (
          <Suspense fallback={<div className="min-h-[80px]" />}>
            <SeoServicesPage
              onNavigateHome={navigateToHome}
              onStartProject={handleStartProject}
            />
          </Suspense>
        ) : currentPath.startsWith('/services/') ? (
          <Suspense fallback={<div className="min-h-[80px]" />}>
            <ServiceDetailPage
              path={currentPath}
              onNavigateHome={navigateToHome}
              onStartProject={handleStartProject}
            />
          </Suspense>
        ) : (
          <>
            {/* 1. Hero Section - Renders instantly */}
            <HeroSection
              onLaunchExperience={handleLaunchExperience}
              onOpenShowreel={handleOpenShowreel}
            />

            {/* Below-the-fold content - Lazy loaded in Suspense */}
            <Suspense fallback={<div className="min-h-[200px]" />}>
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
            </Suspense>
          </>
        )}
      </main>

      {/* Premium Footer */}
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>

      {/* Modals lazy loaded with Suspense wrapper */}
      <Suspense fallback={null}>
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          initialBudget={initialModalBudget}
          initialService={initialModalService}
        />

        <ShowreelModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
        />

        <CaseStudyModal
          isOpen={selectedProjectCase !== null}
          onClose={() => setSelectedProjectCase(null)}
          project={selectedProjectCase}
          onStartProjectWithTag={handleStartFromCaseTag}
        />
      </Suspense>
    </div>
  );
}
