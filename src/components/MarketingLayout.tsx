"use client";

import React, { Suspense } from 'react';
import { CustomCursor } from './CustomCursor';
import { BackgroundDecoration } from './BackgroundDecoration';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProjectModal } from './ProjectModal';
import { ShowreelModal } from './ShowreelModal';
import { CaseStudyModal } from './CaseStudyModal';

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white flex flex-col justify-between">
      {/* Precision Follower Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Mesh Gradients & Grid Background */}
      <BackgroundDecoration />

      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Main Content Assembly */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {children}
      </div>

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
};
