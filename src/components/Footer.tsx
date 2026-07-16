import React from 'react';
import Link from 'next/link';
import { Logo } from './Navbar';
import { Mail, MapPin, Linkedin, Instagram, Phone, MessageCircle } from 'lucide-react';
import { services } from '@/config/navigation';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#0B0B0B] border-t border-white/10 pt-16 pb-8 px-6 md:px-12 font-sans text-white overflow-hidden">
      
      {/* ====================================================
          TOP PORTION: 4-COLUMN RESPONSIVE GRID
         ==================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-12 border-b border-white/10">
        
        {/* COLUMN 01: LOGO & ABOUT (Span 4 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-5">
            <Logo />
          </div>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm">
            VClick Digitally helps businesses grow through SEO, high-performance websites, branding, social media, and performance marketing.
          </p>
          <p className="text-white/40 text-xs leading-relaxed max-w-sm">
            Helping businesses build stronger digital experiences with strategy, creativity, and measurable growth.
          </p>
        </div>

        {/* COLUMN 02: SERVICES (Span 2.5 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#DD183B] mb-5">
            SERVICES
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-white/50 font-medium">
            {services.map((link) => (
              <li key={link.title}>
                {link.enabled ? (
                  <Link 
                    href={link.href}
                    className="hover:text-[#DD183B] transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DD183B] hover:after:w-full after:transition-all"
                  >
                    {link.title}
                  </Link>
                ) : (
                  <span 
                    className="text-white/35 cursor-not-allowed select-none relative py-0.5 flex items-center gap-1.5"
                  >
                    <span>{link.title}</span>
                    <span className="text-[7px] font-bold uppercase tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-1.5 py-0.5 rounded border border-[#DD183B]/20">Soon</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 03: QUICK LINKS (Span 2.5 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#DD183B] mb-5">
            QUICK LINKS
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-white/75 font-medium">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/#services' },
              { label: 'Blog', href: 'https://vclickdigitally.com/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/#faq' }
            ].map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href}
                  className="hover:text-[#DD183B] transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DD183B] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 04: CONTACT (Span 3 cols) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#DD183B] mb-5">
            CONTACT
          </h4>
          <div className="flex flex-col gap-4 text-xs text-white/80 font-medium">
            {/* Phone link */}
            <a 
              href="tel:+919944941707" 
              className="flex items-center justify-center md:justify-start gap-2 hover:text-[#DD183B] transition-colors group"
            >
              <Phone className="w-4 h-4 text-[#DD183B]" />
              <span>+91 99449 41707</span>
            </a>

            {/* WhatsApp link */}
            <a 
              href="https://wa.me/919944941707" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 hover:text-[#DD183B] transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-[#DD183B]" />
              <span>+91 99449 41707</span>
            </a>

            {/* Email link */}
            <a 
              href="mailto:hello@vclickdigitally.com" 
              className="flex items-center justify-center md:justify-start gap-2 hover:text-[#DD183B] transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#DD183B]" />
              <span>hello@vclickdigitally.com</span>
            </a>

            {/* Location row */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-[#DD183B]" />
              <span>Tamil Nadu, India</span>
            </div>

            {/* Active Social Media platforms */}
            <div className="flex gap-3 mt-2 justify-center md:justify-start">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#DD183B] hover:shadow-[0_0_15px_rgba(221,24,59,0.3)] flex items-center justify-center text-white/70 hover:text-[#DD183B] transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#DD183B] hover:shadow-[0_0_15px_rgba(221,24,59,0.3)] flex items-center justify-center text-white/70 hover:text-[#DD183B] transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ====================================================
          BOTTOM PORTION: COPYRIGHT & POLICIES
         ==================================================== */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#8E8E8E] font-medium font-sans">
        
        {/* Copy */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
          <span>© {currentYear} VClick Digitally. All Rights Reserved.</span>
          <span className="hidden sm:inline text-white/10">|</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

        {/* Credit details */}
        <div className="text-center sm:text-right text-white/60">
          Designed & Developed by <span className="text-white/90 font-bold">VClick Digitally</span>
        </div>

      </div>

    </footer>
  );
};
