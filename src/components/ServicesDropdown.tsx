"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ServiceLink } from '@/config/navigation';

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceLink[];
}

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  isOpen,
  onClose,
  services,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-3 w-64 bg-[#0B0B0B]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 overflow-hidden"
    >
      <Link
        href="/#services"
        onClick={onClose}
        className="flex items-center justify-between text-white/80 hover:text-white hover:bg-white/[0.04] transition-colors py-2.5 px-4 rounded-xl text-left font-sans text-xs font-bold uppercase tracking-wider"
      >
        View All Services
      </Link>
      {services.map((svc) => (
        svc.enabled ? (
          <Link
            key={svc.title}
            href={svc.href}
            onClick={onClose}
            className="flex items-center justify-between text-white/80 hover:text-white hover:bg-white/[0.04] transition-colors py-2.5 px-4 rounded-xl text-left font-sans text-xs font-bold uppercase tracking-wider"
          >
            {svc.title}
          </Link>
        ) : (
          <div
            key={svc.title}
            className="flex items-center justify-between text-white/35 py-2.5 px-4 rounded-xl text-left font-sans text-xs font-bold uppercase tracking-wider cursor-not-allowed select-none"
          >
            <span>{svc.title}</span>
            <span className="text-[7px] font-bold uppercase tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">Soon</span>
          </div>
        )
      ))}
    </motion.div>
  );
};
