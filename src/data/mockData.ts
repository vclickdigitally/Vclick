import {
  ServiceItem,
  ProjectCase,
  ProcessStep,
  StatCounter,
  ComparisonRow,
  Testimonial,
  IndustrySector,
  FaqItem,
} from '../types';

export const TRUSTED_BRANDS = [
  { name: 'DK Safety Nets', category: 'Safety Solutions', style: 'font-bold tracking-wider uppercase font-display text-base sm:text-lg' },
  { name: 'Girly Colours', category: 'Fashion & Lifestyle', style: 'font-bold tracking-wide uppercase font-sans text-xs sm:text-sm' },
  { name: 'Reverse Axis', category: 'Technology Solutions', style: 'font-bold tracking-widest uppercase italic font-display text-base sm:text-lg' },
  { name: 'Hitech Graphite', category: 'Industrial Manufacturing', style: 'font-black tracking-wider uppercase font-display text-base sm:text-lg' },
  { name: 'Halo Quant', category: 'FinTech & Trading', style: 'font-black tracking-normal uppercase font-display text-base sm:text-lg' },
  { name: 'Murali Academy', category: 'Education & Training', style: 'font-medium tracking-wider uppercase text-xs sm:text-sm font-sans' },
  { name: 'Sky Digitally', category: 'Digital Marketing Agency', style: 'font-black tracking-widest uppercase font-display text-base sm:text-lg' },
  { name: 'JH Rehabilitation Hospital', category: 'Healthcare', style: 'font-semibold tracking-normal uppercase text-xs sm:text-sm font-sans' },
  { name: 'The Apt Consultancy', category: 'Business Consultancy', style: 'font-medium tracking-[0.2em] uppercase text-xs sm:text-sm font-sans' },
  { name: 'Zungle Zest', category: 'Safari & Travel', style: 'font-black tracking-wide uppercase font-display text-base sm:text-lg' },
  { name: 'JS Auto Reviews', category: 'Automotive Media', style: 'font-bold tracking-wider uppercase font-sans text-xs sm:text-sm' },
  { name: 'Vikaza Property Management', category: 'Property Management', style: 'font-bold tracking-normal uppercase font-display text-base sm:text-lg' },
  { name: 'Yalumai Stitching Studio', category: 'Fashion & Tailoring', style: 'font-medium tracking-wide uppercase text-xs sm:text-sm font-sans' },
  { name: 'CRTTrendz', category: 'Fashion E-commerce', style: 'font-black tracking-tight uppercase font-display text-lg sm:text-xl' },
  { name: 'Magic Minds Education', category: 'Education', style: 'font-bold tracking-widest uppercase font-display text-base sm:text-lg' },
  { name: 'Dodecan', category: 'Technology Solutions', style: 'font-extrabold tracking-tight uppercase font-display text-base sm:text-lg' },
  { name: 'Gulfsig', category: 'Industrial Services', style: 'font-black tracking-widest uppercase font-display text-lg sm:text-xl' },
  { name: 'Makkal Choice', category: 'Media & News', style: 'font-extrabold tracking-normal uppercase font-display text-base sm:text-lg' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'WordPress, Shopify, Wix & Custom Web Flagships',
    category: 'DEV',
    description:
      'Business websites to full e-commerce stores — built on WordPress, Shopify, Wix and Squarespace. Fast, clean, conversion-focused and built to rank on Google from day one.',
    keyDeliverables: [
      'WordPress',
      'Shopify',
      'Wix',
      'Squarespace',
      'E-commerce',
      'Business Sites',
    ],
    metrics: [
      { label: 'PageSpeed Guarantee', value: '99+', change: 'Sub-second TTFB' },
      { label: 'Conversion Rate', value: '+140%', change: 'Post-launch avg' },
      { label: 'Google Rank Ready', value: 'Day 1', change: 'Clean code SEO' },
    ],
    simulationData: {
      chartPoints: [45, 99, 99, 100, 99, 100],
      labels: ['TTFB', 'FCP', 'LCP', 'CLS', 'FID', 'INP'],
      highlightText: 'Fast, Clean & Conversion-Focused',
    },
  },
  {
    id: 'organic-growth',
    title: 'Organic Growth',
    tagline: 'Compounding Search Dominance Without Shortcuts',
    category: 'SEO',
    description:
      'SEO for every industry — local, national, international. We build search visibility that compounds over time. No shortcuts, no black-hat tricks — just strategy that holds.',
    keyDeliverables: [
      'On-Page SEO',
      'Technical SEO',
      'Link Building',
      'Content Strategy',
      'Local SEO',
    ],
    metrics: [
      { label: 'Compounding Traffic', value: '4.2x', change: '12-month avg' },
      { label: 'Keyword Rankings', value: 'Top 3', change: 'High intent SERP' },
      { label: 'Penalty Safety', value: '100%', change: 'White-hat guarantee' },
    ],
    simulationData: {
      chartPoints: [12, 28, 45, 82, 140, 210, 340, 580],
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M9', 'M12'],
      highlightText: 'Strategy That Holds & Compounds',
    },
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    tagline: 'Meta & Google Ad Campaigns Built Around Intent & Revenue',
    category: 'PPC',
    description:
      'Meta Ads and Google Ads that pay back. Campaigns built around intent, audience and conversion — not impressions. Every rupee of ad spend tracked and optimised relentlessly.',
    keyDeliverables: [
      'Meta Ads',
      'Google Ads',
      'Search Campaigns',
      'Retargeting',
      'Shopping Ads',
    ],
    metrics: [
      { label: 'Target ROAS', value: '5.4x', change: 'Verified average' },
      { label: 'CPA Reduction', value: '-38%', change: 'First 60 days' },
      { label: 'Spend Optimization', value: '100%', change: 'Zero ad waste' },
    ],
    simulationData: {
      chartPoints: [80, 65, 52, 44, 38, 31, 28, 24],
      labels: ['W1', 'W2', 'W3', 'W4', 'W6', 'W8', 'W10', 'W12'],
      highlightText: 'Tracked & Optimised Relentlessly',
    },
  },
  {
    id: 'social-presence',
    title: 'Social Presence',
    tagline: 'End-to-End Content, Poster Design & On-Brand Management',
    category: 'BRANDING',
    description:
      'Social media end-to-end — strategy, content creation, poster design and posting. Consistent, on-brand presence across Instagram, Facebook and LinkedIn without you lifting a finger.',
    keyDeliverables: [
      'Content Creation',
      'Poster Design',
      'Instagram',
      'Facebook',
      'LinkedIn',
    ],
    metrics: [
      { label: 'Engagement Rate', value: '4.8x', change: 'Above benchmark' },
      { label: 'Brand Consistency', value: '100%', change: 'On-brand design' },
      { label: 'Time Saved', value: '40h/mo', change: 'Fully hands-off' },
    ],
    simulationData: {
      chartPoints: [10, 35, 90, 240, 520, 890, 1500],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      highlightText: 'Consistent On-Brand Authority',
    },
  },
];

export const FEATURED_PROJECTS: ProjectCase[] = [
  {
    id: 'aether-quantum',
    clientName: 'AETHER QUANTUM',
    logoText: 'A E T H E R',
    industry: 'DeepTech & AI Cloud',
    serviceTags: ['Web Architecture', 'Global SEO', 'Brand Film'],
    heroHeadline: 'Scaling an AI Infrastructure Unicorn to $48M ARR',
    summary:
      'Aether needed a digital presence that matched their sub-millisecond compute hardware. We rebuilt their global flagship site and engineered a hyper-targeted technical SEO cluster.',
    roiStats: {
      primaryNumber: '+340%',
      primaryLabel: 'Enterprise Pipeline Lift',
      secondaryNumber: '$14.2M',
      secondaryLabel: 'New ARR Closed in 180 Days',
    },
    beforeAfter: {
      beforeMetric: '2.4% Demo Conv.',
      afterMetric: '9.8% Demo Conv.',
      metricName: 'Conversion Rate Optimization',
    },
    clientQuote:
      'VClick Digitally operates on another frequency. Within 4 months of launching our new web platform and SEO protocol, our inbound enterprise demos tripled. Best agency investment we have ever made.',
    clientExecutive: 'Dr. Marcus Vance, CEO & Founder',
  },
  {
    id: 'chronos-private',
    clientName: 'CHRONOS HOROLOGY',
    logoText: 'C H R O N O S',
    industry: 'Ultra-Luxury E-Commerce',
    serviceTags: ['Google Ads Sniper', 'Conversion UX', 'Luxury Social'],
    heroHeadline: 'Dominating High-Ticket Swiss Watch Auctions Online',
    summary:
      'For average order values exceeding $35,000, standard PPC fails. We implemented offline conversion tracking and custom bidding algorithms targeting high-net-worth horology collectors.',
    roiStats: {
      primaryNumber: '11.4x',
      primaryLabel: 'Verified Google Ads ROAS',
      secondaryNumber: '-64%',
      secondaryLabel: 'Customer Acquisition Cost',
    },
    beforeAfter: {
      beforeMetric: '$1,420 CPA',
      afterMetric: '$512 CPA',
      metricName: 'High-Ticket Acquisition Cost',
    },
    clientQuote:
      'They do not just generate clicks; they attract qualified billionaires. Our private client waitlist has never been fuller.',
    clientExecutive: 'Laurent Dubois, Managing Director',
  },
  {
    id: 'nexapay-global',
    clientName: 'NEXAPAY CAPITAL',
    logoText: 'N E X A P A Y',
    industry: 'B2B FinTech & Payments',
    serviceTags: ['Full-Stack Growth', 'Organic Search', 'Rebranding'],
    heroHeadline: 'Capturing $4.2B in Annual Payment Processing Volume',
    summary:
      'NexaPay was losing market share to Stripe. We executed a complete brand refresh and deployed 850+ programmatic high-intent SEO pages across EMEA and North America.',
    roiStats: {
      primaryNumber: '840k',
      primaryLabel: 'Monthly High-Intent Visitors',
      secondaryNumber: '89%',
      secondaryLabel: 'Search Share of Voice in FinTech',
    },
    beforeAfter: {
      beforeMetric: '#14 Rank',
      afterMetric: '#1 Rank',
      metricName: 'Core FinTech Keyword Position',
    },
    clientQuote:
      'When board members ask why our organic growth outpaces competitors by 4x, I point directly to VClick Digitally.',
    clientExecutive: 'Sarah Jenkins, Chief Marketing Officer',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Understand Your Business',
    description:
      'Every successful project starts with listening. We learn about your business, industry, competitors, target audience, and goals before recommending any solution.',
    deliverables: ['Business Discovery', 'Competitor Research', 'Market Analysis', 'Goal Definition'],
  },
  {
    step: '02',
    title: 'STRATEGIZE',
    subtitle: 'Build a Custom Roadmap',
    description:
      'Based on our research, we create a tailored strategy designed specifically for your business, combining the right services to achieve measurable growth.',
    deliverables: ['Growth Strategy', 'SEO & Marketing Plan', 'Website Planning', 'Project Roadmap'],
  },
  {
    step: '03',
    title: 'BUILD',
    subtitle: 'Bring Ideas to Life',
    description:
      'Our team transforms strategy into execution through modern websites, SEO implementation, branding, content creation, and digital marketing campaigns.',
    deliverables: ['Website Development', 'SEO Implementation', 'Creative Design', 'Campaign Launch'],
  },
  {
    step: '04',
    title: 'GROW',
    subtitle: 'Optimize & Scale',
    description:
      'Growth doesn\'t stop after launch. We continuously monitor performance, refine strategies, and optimize every opportunity to help your business grow over time.',
    deliverables: ['Performance Monitoring', 'Continuous Optimization', 'Monthly Reporting', 'Long-Term Growth'],
  },
];

export const CASE_STUDY_STATS: StatCounter[] = [
  {
    id: 'rev-generated',
    value: 142.8,
    decimals: 1,
    prefix: '$',
    suffix: 'M+',
    title: 'CLIENT REVENUE GENERATED',
    description: 'Tracked and verified high-ticket client pipeline closed over the last 36 months.',
  },
  {
    id: 'avg-roi',
    value: 460,
    decimals: 0,
    prefix: '',
    suffix: '%',
    title: 'AVERAGE CLIENT ROI',
    description: 'Measured across SEO and Google Ads PPC cohorts after 90 days of active management.',
  },
  {
    id: 'retention-rate',
    value: 98.4,
    decimals: 1,
    prefix: '',
    suffix: '%',
    title: 'ENTERPRISE RETENTION',
    description: 'Our clients stay because we turn marketing into a predictable profit center.',
  },
  {
    id: 'awards-won',
    value: 34,
    decimals: 0,
    prefix: '',
    suffix: '',
    title: 'INTERNATIONAL AWARDS',
    description: 'Recognized by FWA, Awwwards, CSSDA, and Clutch for engineering excellence.',
  },
];

export const WHY_CHOOSE_US_MATRIX: ComparisonRow[] = [
  {
    feature: 'Design & UI/UX Standard',
    vclick: 'Award-winning dark luxury, custom GSAP animations, unforgettable brand prestige.',
    standard: 'Recycled Elementor/WordPress templates, sluggish loading, generic stock photos.',
  },
  {
    feature: 'SEO Strategy',
    vclick: 'Revenue-first transactional SERP domination, topical authority, digital PR.',
    standard: 'Chasing useless low-intent blog traffic just to show monthly "graph go up".',
  },
  {
    feature: 'Google Ads (PPC) Execution',
    vclick: 'Custom machine learning bidding scripts, offline conversion API, sniper negative shields.',
    standard: 'Relying on default Google auto-recommendations that waste 40% of ad budget.',
  },
  {
    feature: 'Speed & PageSpeed Score',
    vclick: 'Guaranteed 95+ Mobile/Desktop PageSpeed, sub-second edge asset delivery.',
    standard: 'Bloated page builders scoring 35-50, causing high mobile drop-off rates.',
  },
  {
    feature: 'Account Management',
    vclick: 'Direct access to Senior Strategists & Creative Directors. No junior middlemen.',
    standard: 'Handed off to overworked junior account managers handling 60 accounts.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alexander Sterling',
    role: 'Managing Director',
    company: 'Vanguard Capital Partners',
    verifiedRevenue: '+$14.8M AUM Growth',
    quote:
      'We vetted 8 high-end agencies in London and New York before selecting VClick Digitally. Their technical precision and aesthetic taste are on another planet. Our cost per acquisition dropped by 54% within two quarters.',
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Lumière BioTech',
    verifiedRevenue: '3.8x Valuation Lift',
    quote:
      'When you are raising a Series B, your digital brand is everything. VClick built an interactive flagship that stunned our institutional investors. Furthermore, our organic search traffic for core biotech terms grew 620%.',
  },
  {
    id: 'test-3',
    name: 'Liam O’Connor',
    role: 'Head of Growth',
    company: 'Apex Cloud Systems',
    verifiedRevenue: '$840k Monthly Inbound ARR',
    quote:
      'They treat our marketing budget like their own money. The PPC bidding scripts they deployed eliminated nearly $30k of monthly ad waste while doubling our qualified enterprise demo bookings.',
  },
];

export const INDUSTRIES_SECTORS: IndustrySector[] = [
  {
    id: 'saas-tech',
    name: 'SaaS & AI Enterprises',
    tagline: 'High-Velocity ARR Scaling & Inbound Demo Funnels',
    description:
      'We help B2B software companies reduce payback periods and dominate high-intent evaluation search queries.',
    avgRoi: '5.4x ROAS',
    caseCount: '42+ Unicorns & Scaleups',
    sampleChallenge: 'High churn on generic PPC keywords & long sales cycles.',
    solutionOutcome: 'Account-Based Search targeting & interactive product interactive calculators.',
  },
  {
    id: 'fintech',
    name: 'FinTech & Capital Markets',
    tagline: 'Institutional Trust & High-Net-Worth Capture',
    description:
      'In financial services, compliance meets fierce competition. We craft authoritative digital brands that convert wealth managers and CFOs.',
    avgRoi: '$420M+ Processed',
    caseCount: '28+ Regulated Entities',
    sampleChallenge: 'Strict advertising compliance restrictions & $100+ PPC clicks.',
    solutionOutcome: 'High-authority organic PR acquisition & conversion-optimized trust UI.',
  },
  {
    id: 'high-ticket-b2b',
    name: 'High-Ticket B2B & Manufacturing',
    tagline: 'Sniper Enterprise Procurement & Long-Form Pipeline',
    description:
      'For contract sizes from $50k to $5M+, you only need 10 right clients a year. We engineer precision sniper funnels.',
    avgRoi: '8.2x Pipeline Lift',
    caseCount: '65+ Enterprise Giants',
    sampleChallenge: 'Gatekeepers blocking traditional outreach & outdated corporate websites.',
    solutionOutcome: 'Executive thought leadership branding & offline conversion tracking API.',
  },
  {
    id: 'luxury-ecom',
    name: 'International Luxury Brands',
    tagline: 'Uncompromising Aesthetic Prestige & Global Scaling',
    description:
      'We protect brand exclusivity while aggressively acquiring affluent global shoppers across Europe, North America, and the Middle East.',
    avgRoi: '6.8x ROAS',
    caseCount: '35+ Heritage & Modern Luxury',
    sampleChallenge: 'Balancing minimal luxury aesthetics with aggressive e-commerce conversion rates.',
    solutionOutcome: 'Sub-second GSAP shopping experiences & VIP segmentation ad algorithms.',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What digital marketing services does VClick Digitally offer?',
    answer:
      'VClick Digitally provides a focused range of digital growth services, including SEO, website design and development, Meta Ads management, branding, social media management, and e-commerce website development. Every solution is tailored to your business goals rather than using one-size-fits-all templates.',
    category: 'Services',
  },
  {
    id: 'faq-2',
    question: 'How long does it take to see results from SEO?',
    answer:
      'SEO is a long-term investment that builds sustainable online visibility. While every business and industry is different, many websites begin to see measurable improvements within 3 to 6 months. Factors such as competition, website quality, content, and technical SEO all influence the timeline. Our approach focuses on building lasting organic growth rather than short-term gains.',
    category: 'SEO',
  },
  {
    id: 'faq-3',
    question: 'Can you redesign my existing website without affecting my business?',
    answer:
      'Yes. We can redesign your existing website while preserving essential content, improving user experience, enhancing performance, and implementing SEO best practices. Our goal is to create a modern, responsive website that supports your business objectives with minimal disruption.',
    category: 'Redesign',
  },
  {
    id: 'faq-4',
    question: 'Do you work with businesses from different industries?',
    answer:
      'Yes. We work with businesses across healthcare, education, e-commerce, real estate, professional services, manufacturing, fashion, and more. Every industry has unique audiences and challenges, so we develop strategies based on your business, market, and growth objectives rather than applying the same approach to every client.',
    category: 'Industries',
  },
  {
    id: 'faq-5',
    question: 'How do I get started with VClick Digitally?',
    answer:
      'Getting started is simple. Contact us to schedule an initial consultation where we\'ll discuss your business, goals, current digital presence, and challenges. Based on that conversation, we\'ll recommend a tailored strategy and the services that best support your long-term growth.',
    category: 'Start',
  },
];
