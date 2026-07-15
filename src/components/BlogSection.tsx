"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag, AlertCircle } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    title: 'The Future of Search: Optimizing for AI Engines (GEO)',
    excerpt: 'How Generative Engine Optimization is replacing traditional SEO as ChatGPT, Claude, and Gemini change user search behavior.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'SEO & AI',
    date: 'Jul 6, 2026',
    url: 'https://vclickdigitally.com/blog'
  },
  {
    title: 'Next.js vs WordPress: Choosing the Right Web Architecture',
    excerpt: 'A deep dive comparison of static edge rendering speed vs headless content systems for high-converting business sites.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    category: 'Web Dev',
    date: 'Jul 4, 2026',
    url: 'https://vclickdigitally.com/blog'
  },
  {
    title: 'Scaling Meta Ad ROAS: High-Intent Sniper Targeting',
    excerpt: 'Stop wasting budget on broad audiences. Learn how to target customer intent and track offline conversion APIs.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Meta Ads',
    date: 'Jun 28, 2026',
    url: 'https://vclickdigitally.com/blog'
  },
  {
    title: 'Visual Precedent: Why Luxury Brands Rely on Dark UI',
    excerpt: 'Understanding the psychology of premium dark aesthetics, glassmorphism, and GSAP micro-animations in high-end design.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    category: 'Branding',
    date: 'Jun 20, 2026',
    url: 'https://vclickdigitally.com/blog'
  }
];

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasIntersected) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://vclickdigitally.com/blog/wp-json/wp/v2/posts?_embed&per_page=4');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        const formatted: BlogPost[] = data.map((post: any) => {
          // Extract featured image safely
          let image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
          const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
          if (featuredMedia?.source_url) {
            image = featuredMedia.source_url;
          }

          // Extract category safely
          let category = 'Insights';
          const terms = post._embedded?.['wp:term']?.[0];
          if (terms && terms.length > 0) {
            category = terms[0].name;
          }

          // Clean excerpt from HTML tags
          const cleanExcerpt = post.excerpt?.rendered
            ? post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()
            : '';
          const shortExcerpt = cleanExcerpt.length > 100 
            ? cleanExcerpt.substring(0, 100) + '...'
            : cleanExcerpt;

          return {
            title: post.title?.rendered || 'Untitled Article',
            excerpt: shortExcerpt || 'Explore the latest insights from our digital marketing team.',
            image,
            category,
            date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            url: post.link || 'https://vclickdigitally.com/blog'
          };
        });

        if (formatted.length > 0) {
          setPosts(formatted);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      } catch (err) {
        console.error('WP REST API error, falling back to local dataset:', err);
        setError(true);
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hasIntersected]);

  return (
    <section ref={sectionRef} id="insights" className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] border-t border-white/5 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* ====================================================
          SECTION HEADER
         ==================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-8">
        <div>
          {/* Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
              LATEST INSIGHTS
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
            Stay Ahead.<br />
            Stay <span className="text-[#DD183B]">Informed.</span>
          </h2>
        </div>
        {/* Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed font-sans lg:mb-2">
          Explore practical insights, SEO strategies, website development, AI Search, branding, Meta Ads, digital marketing, and business growth from the VClick Digitally blog.
        </p>
      </div>

      {/* ====================================================
          DYNAMIC BLOG GRID / SKELETON
         ==================================================== */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-[#111111]/85 border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-[380px]">
              <div>
                <div className="w-full aspect-[16/10] bg-white/5 rounded-xl mb-4" />
                <div className="w-1/3 h-3 bg-white/10 rounded mb-3" />
                <div className="w-3/4 h-5 bg-white/10 rounded mb-2" />
                <div className="w-full h-4 bg-white/5 rounded mb-1" />
                <div className="w-5/6 h-4 bg-white/5 rounded" />
              </div>
              <div className="w-1/2 h-3 bg-white/10 rounded mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
          {posts.map((post, idx) => (
            <article key={idx} className="h-full flex">
              <a 
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full bg-[#111111]/80 backdrop-blur-xl border border-white/15 hover:border-[#DD183B]/40 p-4 rounded-2xl shadow-2xl transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Ambient crimson glow inside card */}
                <div className="absolute inset-0 bg-[#DD183B]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Featured Image */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#0B0B0B] border border-white/5 mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Card Header Metadata */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-bold tracking-wider text-[#8E8E8E]">
                      <span className="flex items-center gap-1 text-[#DD183B]">
                        <Tag className="w-3 h-3" /> {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black tracking-tight font-display text-white mb-2 leading-snug group-hover:text-[#DD183B] transition-colors line-clamp-2 uppercase">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#8E8E8E] text-xs leading-relaxed line-clamp-3 font-sans mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Trigger */}
                  <div className="flex items-center gap-1.5 text-[#DD183B] font-bold text-xs uppercase tracking-widest font-sans border-t border-white/5 pt-4 mt-auto">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

              </a>
            </article>
          ))}
        </div>
      )}

      {/* ====================================================
          CTA VIEW ALL BUTTON
         ==================================================== */}
      <div className="mt-12 text-center border-t border-white/5 pt-8">
        <a 
          href="https://vclickdigitally.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#8E8E8E] hover:text-[#DD183B] font-bold uppercase tracking-widest font-sans transition-colors duration-300"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </section>
  );
};
