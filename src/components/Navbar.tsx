import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Showcase', href: '#projects' },
    { label: 'Method', href: '#process' },
    { label: 'Impact', href: '#case-studies' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/10 py-5 px-6 md:px-12'
          : 'bg-transparent py-8 px-6 md:px-12'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo matching Sleek Interface */}
        <a href="#" className="flex items-center gap-2.5 group" data-interactive="true">
          <div className="w-3 h-8 bg-[#DD183B] group-hover:scale-y-110 transition-transform origin-bottom" />
          <span className="text-2xl font-black tracking-tighter uppercase font-display">
            VClick <span className="text-[#DD183B] group-hover:translate-x-1 inline-block transition-transform">/</span> Digitally
          </span>
        </a>

        {/* Desktop Navigation Links */}
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

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onStartProject}
            data-interactive="true"
            className="group border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-[12px] font-bold uppercase tracking-widest hover:bg-[#DD183B] hover:border-[#DD183B] hover:shadow-[0_0_25px_rgba(221,24,59,0.5)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white border border-white/10 rounded bg-white/5"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#DD183B]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#DD183B] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#DD183B] text-xs">→</span>
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStartProject();
            }}
            className="w-full mt-2 bg-[#DD183B] py-4 text-center font-bold uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(221,24,59,0.4)]"
          >
            Start Project
          </button>
        </div>
      )}
    </nav>
  );
};
