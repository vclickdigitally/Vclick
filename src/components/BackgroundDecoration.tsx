"use client";

import React from 'react';

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Thin Coordinate Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Primary Top Right Glowing Crimson Spotlight - Static on Mobile, CSS Pulsing on Desktop */}
      <div
        className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.12] md:animate-glow-primary"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Secondary Bottom Left Crimson Core - Static on Mobile, CSS Pulsing on Desktop */}
      <div
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[130px] opacity-[0.08] md:animate-glow-secondary"
        style={{ willChange: 'transform' }}
      />

      {/* Deep Center Void vignette gradient */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B0B]/80" />
    </div>
  );
};
