import React, { useState, useEffect } from 'react';

export const BackgroundDecoration: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[140px]"
        style={{
          opacity: 0.12,
          animation: !isMobile ? 'vc-pulse-glow-primary 12s ease-in-out infinite' : undefined,
          willChange: !isMobile ? 'transform, opacity' : undefined
        }}
      />

      {/* Secondary Bottom Left Crimson Core - Static on Mobile, CSS Pulsing on Desktop */}
      <div
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[130px]"
        style={{
          opacity: 0.08,
          animation: !isMobile ? 'vc-pulse-glow-secondary 16s ease-in-out infinite' : undefined,
          willChange: !isMobile ? 'transform' : undefined
        }}
      />

      {/* Deep Center Void vignette gradient */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B0B]/80" />

      {/* Lightweight GPU-accelerated CSS animations for Desktop only */}
      {!isMobile && (
        <style>{`
          @keyframes vc-pulse-glow-primary {
            0%, 100% { transform: scale(1); opacity: 0.12; }
            50% { transform: scale(1.12); opacity: 0.16; }
          }
          @keyframes vc-pulse-glow-secondary {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -20px) scale(1.1); }
          }
        `}</style>
      )}
    </div>
  );
};
