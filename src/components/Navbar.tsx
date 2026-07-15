"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModals } from '@/providers/ModalProvider';
import { services, homepageLinks, internalLinks } from '@/config/navigation';
import { ServicesDropdown } from './ServicesDropdown';

export const Logo: React.FC<{ isCompact?: boolean }> = ({ isCompact }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/logo.png"
        alt="VClick Digitally"
        onError={() => setImgError(true)}
        className={`${isCompact ? 'h-8 sm:h-9' : 'h-10 sm:h-12'} w-auto object-contain transition-all duration-300`}
      />
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 group">
      <div className={`${isCompact ? 'w-2 h-6 sm:h-7' : 'w-3 h-8 sm:h-9'} bg-[#DD183B] group-hover:scale-y-110 transition-transform origin-bottom shrink-0`} />
      <span className={`${isCompact ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'} font-black tracking-tighter uppercase font-display text-white`}>
        VClick <span className="text-[#DD183B] group-hover:translate-x-0.5 inline-block transition-transform">/</span> Digitally
      </span>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const { openProject } = useModals();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth scroll helper for homepage
  const handleScrollToSection = (e: React.MouseEvent, href: string) => {
    const targetId = href.split('#')[1];
    if (targetId && isHomepage) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = isHomepage ? homepageLinks : internalLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-t-[3px] border-t-[#DD183B] border-b border-white/10 py-3 px-6 md:px-12'
          : 'bg-transparent py-8 px-6 md:px-12 border-t-[3px] border-t-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Link */}
        <Link href="/" className="flex items-center group shrink-0" aria-label="VClick Digitally Homepage">
          <Logo isCompact={isScrolled} />
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E8E8E]">
          {navLinks.map((link) => {
            if (link.isServices) {
              return (
                <div key={link.label} ref={dropdownRef} className="relative flex items-center gap-1.5 py-1">
                  {isHomepage ? (
                    <a
                      href="#services"
                      onClick={(e) => handleScrollToSection(e, '#services')}
                      className="text-white/80 hover:text-[#DD183B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DD183B] hover:after:w-full after:transition-all"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="text-white/80 hover:text-[#DD183B] transition-colors cursor-pointer flex items-center gap-1.5 py-1"
                    >
                      {link.label}
                    </button>
                  )}
                  
                  {/* Chevron Button */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-white/50 hover:text-[#DD183B] transition-colors cursor-pointer p-0.5 flex items-center justify-center shrink-0"
                    aria-expanded={dropdownOpen}
                    aria-label="Toggle services menu"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#DD183B]' : ''}`} />
                  </button>

                  {/* Reusable isolated Dropdown */}
                  <AnimatePresence>
                    <ServicesDropdown
                      isOpen={dropdownOpen}
                      onClose={() => setDropdownOpen(false)}
                      services={services}
                    />
                  </AnimatePresence>
                </div>
              );
            }

            if (link.isUpcoming) {
              return (
                <div
                  key={link.label}
                  className="flex items-center gap-1.5 text-white/35 py-1 select-none cursor-not-allowed"
                >
                  <span>{link.label}</span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-1.5 py-0.5 rounded border border-[#DD183B]/20">Soon</span>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-white/80 hover:text-[#DD183B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DD183B] hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => openProject(15000, "FULL")}
            data-interactive="true"
            className={`group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-xl shadow-[0_0_35px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-2 min-h-[48px] ${
              isScrolled ? 'px-8 py-3.5 text-[10px]' : 'px-9 py-4.5 text-[11px]'
            }`}
          >
            <span>Let's Talk Growth</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white border border-white/10 rounded bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#DD183B]" /> : <Menu className="w-6 h-6" />}
        </button>

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-full bg-[#0B0B0B]/98 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 shadow-2xl overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
              {navLinks.map((link) => {
                if (link.isServices) {
                  return (
                    <div key={link.label} className="flex flex-col border-b border-white/5 pb-2">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="text-white hover:text-[#DD183B] py-3 flex items-center justify-between font-sans min-h-[48px] cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-4 h-4 text-[#DD183B] transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden flex flex-col pl-4 border-l border-white/10 mt-1 gap-2"
                          >
                            <Link
                              href="/#services"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className="text-white/70 hover:text-white py-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between"
                            >
                              View All Services
                            </Link>
                            {services.map((svc) => (
                              svc.enabled ? (
                                <Link
                                  key={svc.title}
                                  href={svc.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                  className="text-white/70 hover:text-white py-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between"
                                >
                                  {svc.title}
                                </Link>
                              ) : (
                                <div
                                  key={svc.title}
                                  className="text-white/35 py-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between select-none cursor-not-allowed"
                                >
                                  <span>{svc.title}</span>
                                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">Soon</span>
                                </div>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.isUpcoming) {
                  return (
                    <div
                      key={link.label}
                      className="text-white/35 py-3 border-b border-white/5 flex items-center justify-between font-sans min-h-[48px] select-none cursor-not-allowed"
                    >
                      <span>{link.label}</span>
                      <span className="text-[7px] font-bold uppercase tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">Soon</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleScrollToSection(e, link.href);
                    }}
                    className="text-white hover:text-[#DD183B] py-3 border-b border-white/5 flex items-center justify-between font-sans min-h-[48px]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#DD183B]" />
                  </Link>
                );
              })}
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openProject(15000, "FULL");
              }}
              className="w-full mt-2 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4.5 text-center font-black uppercase text-[11px] tracking-widest shadow-[0_0_20px_rgba(221,24,59,0.4)] rounded-xl min-h-[48px] transition-all flex items-center justify-center gap-2"
            >
              <span>Let's Talk Growth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
