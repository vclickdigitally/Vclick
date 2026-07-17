"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { BackgroundDecoration } from './BackgroundDecoration';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

// Dynamically import modals with ssr: false to avoid bloat on initial page load/hydration
const ProjectModal = dynamic(() => import('./ProjectModal').then(mod => mod.ProjectModal), { ssr: false });
const ShowreelModal = dynamic(() => import('./ShowreelModal').then(mod => mod.ShowreelModal), { ssr: false });
const CaseStudyModal = dynamic(() => import('./CaseStudyModal').then(mod => mod.CaseStudyModal), { ssr: false });
const FloatingWhatsApp = dynamic(() => import('./FloatingWhatsApp').then(mod => mod.FloatingWhatsApp), { ssr: false });

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white flex flex-col justify-between">
      {/* Atmospheric Mesh Gradients & Grid Background */}
      <BackgroundDecoration />

      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Main Content Assembly */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {children}
      </div>

      {/* Premium Footer */}
      <Footer />

      {/* Modals are self-contained client hooks */}
      <ProjectModal />
      <ShowreelModal />
      <CaseStudyModal />
      <FloatingWhatsApp />
    </div>
  );
};
