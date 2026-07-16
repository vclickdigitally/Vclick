"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, Mail } from 'lucide-react';

export const NotFoundContent: React.FC = () => {
  return (
    <section className="relative z-20 min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-[#0B0B0B] text-center overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl w-full flex flex-col items-center relative z-10"
      >
        {/* Large 404 Hero */}
        <h1 className="text-[110px] sm:text-[160px] font-black leading-none font-display text-transparent text-stroke-white tracking-tighter uppercase mb-4 select-none">
          404
        </h1>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display text-white mb-4">
          This Page Doesn't Exist
        </h2>

        {/* Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-sans">
          The page you're looking for may have been moved, renamed, or no longer exists.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mb-14">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-[#DD183B] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-transparent shadow-[0_0_20px_rgba(221,24,59,0.35)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back Home
          </Link>
          <Link
            href="/#services"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white text-xs font-black uppercase tracking-widest rounded-xl border border-white/20 hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white text-xs font-black uppercase tracking-widest rounded-xl border border-white/20 hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Contact Us
          </Link>
        </div>

        {/* Help Directory Card */}
        <div className="w-full max-w-lg bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl text-left mb-10 shadow-2xl">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#DD183B] block mb-4">
            Looking for something?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-white/70 font-sans font-medium">
            <Link href="/services/seo" className="hover:text-[#DD183B] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#DD183B] rounded-full" />
              SEO Services
            </Link>
            <Link href="/services/website-development" className="hover:text-[#DD183B] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#DD183B] rounded-full" />
              Website Development
            </Link>
            <Link href="/services/performance-marketing" className="hover:text-[#DD183B] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#DD183B] rounded-full" />
              Performance Marketing
            </Link>
            <Link href="/about" className="hover:text-[#DD183B] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#DD183B] rounded-full" />
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#DD183B] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#DD183B] rounded-full" />
              Contact
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-white/50 font-sans border-t border-white/5 pt-6 w-full max-w-lg justify-center">
          <span className="font-bold text-white/60">Need help?</span>
          <a href="tel:+919944941707" className="hover:text-[#DD183B] transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            +91 99449 41707
          </a>
          <a href="https://wa.me/919944941707" target="_blank" rel="noopener noreferrer" className="hover:text-[#DD183B] transition-colors flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <a href="mailto:hello@vclickdigitally.com" className="hover:text-[#DD183B] transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            hello@vclickdigitally.com
          </a>
        </div>
      </motion.div>
    </section>
  );
};
