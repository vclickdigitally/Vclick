import React from 'react';
import { motion } from 'motion/react';

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

      {/* Primary Top Right Glowing Crimson Spotlight */}
      <motion.div
        className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.14]"
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.12, 0.18, 0.1, 0.12],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary Bottom Left Crimson Core */}
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-[#DD183B] rounded-full mix-blend-screen filter blur-[130px] opacity-[0.09]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Deep Center Void vignette gradient */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B0B]/80" />
    </div>
  );
};
