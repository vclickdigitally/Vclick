import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Review {
  name: string;
  avatarText: string;
  role: string;
  rating: number;
  text: string;
  badge: string;
  gradient: string;
}

const REVIEWS_DATA: Review[] = [
  {
    name: 'DK Safety Nets',
    avatarText: 'DK',
    role: 'Business Website · Chennai 🇮🇳',
    rating: 5,
    text: '"Professional websites and on-time delivery. Highly recommend for WordPress business websites."',
    badge: '✓ Google',
    gradient: 'linear-gradient(135deg, #E11D48, #3A0007)'
  },
  {
    name: 'Girly Colours',
    avatarText: 'GC',
    role: 'E-commerce Website · Chennai 🇮🇳',
    rating: 5,
    text: '"Never met, just phone — more than what we expected. Humble, trusted, very professional. Got them at exactly the right time."',
    badge: '✓ Google',
    gradient: 'linear-gradient(135deg, #1A1A1A, #E11D48)'
  },
  {
    name: 'Prem Kumar',
    avatarText: 'PK',
    role: 'Web Development · Chennai 🇮🇳',
    rating: 5,
    text: '"Good work and excellent service. Highly recommended for all web related works."',
    badge: '✓ Google',
    gradient: 'linear-gradient(135deg, #E11D48, #000000)'
  },
  {
    name: 'Magic Minds Education',
    avatarText: 'MM',
    role: 'Social Media + Ads · Singapore 🇸🇬',
    rating: 5,
    text: '"VClick manages our social media and runs our Meta Ads. Our engagement improved significantly and the results speak for themselves."',
    badge: '✓ Active Client',
    gradient: 'linear-gradient(135deg, #2A2A2A, #121212)'
  },
  {
    name: 'Gulfsig',
    avatarText: 'GS',
    role: 'Engineering Website · Saudi Arabia 🇸🇦',
    rating: 5,
    text: '"VClick built a website that truly represents our engineering capabilities. Clean, professional and exactly what our industrial clients expect to see."',
    badge: '✓ Active Client',
    gradient: 'linear-gradient(135deg, #E11D48, #333333)'
  },
  {
    name: 'Dodecan',
    avatarText: 'DO',
    role: 'Website + SEO · USA 🇺🇸',
    rating: 5,
    text: '"Our US-based translation business needed a web presence that could rank internationally. VClick understood the brief perfectly and delivered clean, functional work."',
    badge: '✓ Active Client',
    gradient: 'linear-gradient(135deg, #111111, #E11D48)'
  },
  {
    name: 'Zungle Zest',
    avatarText: 'ZZ',
    role: 'Website + Social Media · Chennai 🇮🇳',
    rating: 5,
    text: '"They designed our safari tour website and social media posters beautifully. The brand feels premium and our enquiries have noticeably increased."',
    badge: '✓ Client',
    gradient: 'linear-gradient(135deg, #222222, #000000)'
  },
  {
    name: 'Halo Quant',
    avatarText: 'HQ',
    role: 'Fintech Website · Chennai 🇮🇳',
    rating: 5,
    text: '"The fintech website VClick built hits exactly the right tone — professional, credible, and clean. Exactly what our financial audience expects to see."',
    badge: '✓ Client',
    gradient: 'linear-gradient(135deg, #E11D48, #111111)'
  }
];

// Duplicate for seamless infinite loop scrolling
const LOOP_REVIEWS = [...REVIEWS_DATA, ...REVIEWS_DATA];

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section className="relative z-20 pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 bg-[#0C0C0C] max-w-7xl mx-auto w-full border-b border-white/5 overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* ====================================================
            LEFT PANEL: SECTION HEADINGS & STARS
           ==================================================== */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-start">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-6 bg-[#E11D48] flex-shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E11D48] font-sans">
              What Clients Say
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white leading-[0.93] mb-4">
            Real Words.<br />
            Real <span className="text-[#E11D48]">Clients.</span>
          </h2>

          {/* Stars */}
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#FACC15] text-lg select-none">★</span>
            ))}
          </div>

          {/* Rating Tag */}
          <span className="text-[11px] font-bold text-white/35 uppercase tracking-[0.06em] font-sans mb-8">
            5.0 · Google Rating
          </span>

          <div className="w-10 h-[1px] bg-white/10 mb-8" />

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed font-sans max-w-[34ch]">
            Every review below is real — from real clients, posted on Google. No scripts, no incentives.
          </p>
        </div>

        {/* ====================================================
            RIGHT PANEL: VERTICAL AUTO-SCROLLING MARQUEE
           ==================================================== */}
        <div className="col-span-12 lg:col-span-7 w-full relative">
          
          {/* Top/Bottom smooth fading masks */}
          <div className="absolute top-0 inset-x-0 h-[70px] bg-gradient-to-b from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[90px] bg-gradient-to-t from-[#0C0C0C] to-transparent z-10 pointer-events-none" />

          {/* Marquee Viewport */}
          <div className="h-[500px] overflow-hidden relative w-full pr-1">
            
            {/* Scroll Track */}
            <div 
              className="flex flex-col gap-4 animate-[vc-scrollUp_22s_linear_infinite] hover:[animation-play-state:paused]"
              style={{
                willChange: 'transform',
              }}
            >
              {LOOP_REVIEWS.map((review, index) => (
                <div 
                  key={`${review.name}-${index}`}
                  className="bg-[#181818] border border-white/[0.08] hover:border-white/[0.16] rounded-[14px] p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Bar: Stars & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-[#FACC15] text-[11px] select-none">★</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white/30 bg-white/[0.06] px-2 py-0.5 rounded font-sans flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-500/70" />
                      {review.badge}
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-white/[0.55] text-[13px] sm:text-[14px] leading-relaxed mb-4 font-sans italic font-light">
                    {review.text}
                  </blockquote>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    {/* Avatar Initials with unique gradients */}
                    <div 
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white font-black font-display text-sm shrink-0 select-none shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      style={{ background: review.gradient }}
                    >
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white/70 tracking-tight font-sans">{review.name}</h4>
                      <p className="text-[11px] text-white/30 font-sans mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Global CSS injection for vertical marquee scrolling speed and style */}
      <style>{`
        @keyframes vc-scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

    </section>
  );
};
