import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
}

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

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Insights', href: '#insights' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-t-[3px] border-t-[#DD183B] border-b border-white/10 py-3 px-6 md:px-12'
          : 'bg-transparent py-8 px-6 md:px-12 border-t-[3px] border-t-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* ====================================================
            LEFT: LOGO (COALESCED PREVIEW & FALLBACK)
           ==================================================== */}
        <a href="#" className="flex items-center group shrink-0" aria-label="VClick Digitally Homepage">
          <Logo isCompact={isScrolled} />
        </a>

        {/* ====================================================
            CENTER: NAVIGATION LINKS
           ==================================================== */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E8E8E]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-[#DD183B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DD183B] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ====================================================
            RIGHT: STANDARDIZED PRIMARY CTA
           ==================================================== */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onStartProject}
            data-interactive="true"
            className={`group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-xl shadow-[0_0_35px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-2 min-h-[48px] ${
              isScrolled ? 'px-8 py-3.5 text-[10px]' : 'px-9 py-4.5 text-[11px]'
            }`}
          >
            <span>Let's Talk Growth</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* ====================================================
            MOBILE TRIGGER HAMBURGER
           ==================================================== */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white border border-white/10 rounded bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#DD183B]" /> : <Menu className="w-6 h-6" />}
        </button>

      </nav>

      {/* ====================================================
          RESPONSIVE MOBILE FULL-SCREEN MENU
         ==================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0B0B0B]/98 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#DD183B] py-3 border-b border-white/5 flex items-center justify-between font-sans min-h-[48px]"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#DD183B]" />
              </a>
            ))}
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStartProject();
            }}
            className="w-full mt-2 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4.5 text-center font-black uppercase text-[11px] tracking-widest shadow-[0_0_20px_rgba(221,24,59,0.4)] rounded-xl min-h-[48px] transition-all flex items-center justify-center gap-2"
          >
            <span>Let's Talk Growth</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
