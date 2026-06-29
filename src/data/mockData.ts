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
  { name: 'Vercel', style: 'font-bold tracking-widest uppercase' },
  { name: 'Linear', style: 'font-bold tracking-widest uppercase italic' },
  { name: 'Stripe', style: 'font-bold tracking-widest uppercase' },
  { name: 'Nike', style: 'font-bold tracking-widest uppercase font-black' },
  { name: 'Balenciaga', style: 'font-bold tracking-[0.25em] uppercase text-xs' },
  { name: 'Bang & Olufsen', style: 'font-medium tracking-wider uppercase text-sm' },
  { name: 'Revolut', style: 'font-extrabold tracking-tight uppercase' },
  { name: 'Klarna', style: 'font-black tracking-normal uppercase' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seo-dominance',
    title: 'Aggressive SEO Dominance',
    tagline: 'Algorithmic Monopoly & High-Intent Search Capture',
    category: 'SEO',
    description:
      'We do not chase vanity keywords. We reverse-engineer search intent to dominate high-ticket transactional SERPs across global markets. Engineered for compound organic growth.',
    keyDeliverables: [
      'Semantic Topical Authority Clusters',
      'High-Velocity Technical Core Web Vitals Optimization',
      'High-DR Editorial Digital PR & Backlink Acquisition',
      'AI Grounding & Generative Engine Optimization (GEO)',
    ],
    metrics: [
      { label: 'Avg. Organic ROI', value: '410%', change: '+185% vs industry' },
      { label: 'Index Indexation Velocity', value: '< 24h', change: 'Tier 1 Priority' },
      { label: 'Top 3 Keywords Captured', value: '1,420+', change: 'Per client avg' },
    ],
    simulationData: {
      chartPoints: [12, 28, 45, 82, 140, 210, 340, 580],
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M9', 'M12'],
      highlightText: '+840% Organic Pipeline Growth',
    },
  },
  {
    id: 'google-ads-ppc',
    title: 'Precision Google Ads (PPC)',
    tagline: 'Algorithmic Bidding & Asymmetric Conversion Capture',
    category: 'PPC',
    description:
      'Turn ad spend into predictable revenue architecture. We deploy predictive machine learning scripts and sniper customer segmentation to slash CPA while multiplying customer lifetime value.',
    keyDeliverables: [
      'Sniper High-Ticket Search & Performance Max Campaigns',
      'Custom Conversion Value Rules & Offline Tracking API',
      'Algorithmic Negative Keyword Shields',
      'Dynamic Hyper-Relevant Landing Page Variations',
    ],
    metrics: [
      { label: 'Average ROAS', value: '5.8x', change: 'Verified enterprise' },
      { label: 'CPA Reduction', value: '-42%', change: 'First 60 days' },
      { label: 'Ad Waste Eliminated', value: '99.4%', change: 'AI Audit score' },
    ],
    simulationData: {
      chartPoints: [80, 65, 52, 44, 38, 31, 28, 24],
      labels: ['W1', 'W2', 'W3', 'W4', 'W6', 'W8', 'W10', 'W12'],
      highlightText: 'CPA Dropped from $142 to $24',
    },
  },
  {
    id: 'web-design-dev',
    title: 'Award-Winning Web Engineering',
    tagline: 'Sub-Second Speeds & Unforgettable Interactive UX',
    category: 'DEV',
    description:
      'We build high-converting digital flagships. Combining GSAP motion choreography, Next.js/Vite edge rendering, and bespoke glassmorphic UI that positions your company on another level.',
    keyDeliverables: [
      'Bespoke Interactive GSAP & WebGL Animation Architecture',
      'Headless CMS & Edge-Accelerated E-Commerce Engines',
      'Conversion Rate Optimization (CRO) UX Sprints',
      '99+ Google PageSpeed Performance GUARANTEE',
    ],
    metrics: [
      { label: 'PageSpeed Score', value: '99.8', change: 'Lightning Fast' },
      { label: 'Conversion Lift', value: '+145%', change: 'Post-launch' },
      { label: 'Bounce Rate', value: '18.2%', change: 'Top 1% web UX' },
    ],
    simulationData: {
      chartPoints: [45, 99, 99, 100, 99, 100],
      labels: ['TTFB', 'FCP', 'LCP', 'CLS', 'FID', 'INP'],
      highlightText: 'Instantaneous Edge Rendering',
    },
  },
  {
    id: 'branding-social',
    title: 'Iconic Branding & Social',
    tagline: 'Unignorable Brand Equity & Viral Authority Sprints',
    category: 'BRANDING',
    description:
      'We craft luxury brand identities that command premium pricing. From cinematic social showreels to category-defining visual design, we turn businesses into cult-like global authorities.',
    keyDeliverables: [
      'Cinematic 4K Brand Film Production & Showreels',
      'Category-King Positioning & Luxury Tone of Voice',
      'Executive Thought Leadership & Founder Branding',
      'High-Conversion UGC & Social Advertising Creative',
    ],
    metrics: [
      { label: 'Brand Recall Lift', value: '3.4x', change: 'Unaided survey' },
      { label: 'Social CTR Lift', value: '+210%', change: 'Organic & Paid' },
      { label: 'Valuation Multiplier', value: '2.8x', change: 'Series A/B exit lift' },
    ],
    simulationData: {
      chartPoints: [10, 35, 90, 240, 520, 890, 1500],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      highlightText: '14.2M Organic Impressions Generated',
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
    title: 'THE DIAGNOSTIC AUDIT',
    subtitle: 'Forensic Competitor & Keyword Extraction',
    description:
      'We dissect your industry competitors, ad accounts, and technical infrastructure. We identify hidden revenue leaks and uncaptured keyword monopolies.',
    deliverables: ['Full TAM Search Volume Mapping', 'Competitor Ad Budget Reverse-Engineering', 'Technical Web Vitals Audit'],
  },
  {
    step: '02',
    title: 'THE STRATEGIC BLUEPRINT',
    subtitle: 'Asymmetric Growth Architecture',
    description:
      'We formulate a bespoke battle plan. Selecting exact ad channels, landing page funnels, and content silos engineered for rapid payback cycles.',
    deliverables: ['Custom CPA & LTV Financial Projections', 'GSAP UI/UX Wireframe Systems', 'PPC Bidding Algorithmic Framework'],
  },
  {
    step: '03',
    title: 'THE AGGRESSIVE DEPLOYMENT',
    subtitle: 'Code, Creative & Algorithmic Launch',
    description:
      'Our senior engineers and creative directors build and launch your assets. High-impact video creative, lightning-fast edge pages, and sniper PPC bids go live.',
    deliverables: ['Sub-Second Web Production', 'Server-Side Offline Conversion API', 'High-Velocity Editorial Backlinks'],
  },
  {
    step: '04',
    title: 'THE COMPOUND MONOPOLY',
    subtitle: 'Continuous Optimization & Market Dominance',
    description:
      'We never stagnate. Machine learning scripts optimize ad bids 24/7, while our content team expands your organic footprint until competitors cannot catch up.',
    deliverables: ['Bi-Weekly Executive ROI Reports', 'Continuous CRO Split Testing', 'International Market Expansion Sprints'],
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
    question: 'How is VClick Digitally different from traditional marketing agencies?',
    answer:
      'We operate at the intersection of elite front-end engineering, award-winning GSAP motion design, and algorithmic performance marketing. Most agencies outsource development or use bloated WordPress templates while junior staff run default Google Ad campaigns. At VClick, Senior Architects and Creative Directors personally build your digital monopoly.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'What is your minimum engagement size or investment required?',
    answer:
      'Because we engineer bespoke, high-performance systems rather than cookie-cutter templates, our client engagements typically start at $7,500/month for comprehensive growth partnerships or $15,000+ for standalone award-winning web design & dev flagships. We work exclusively with brands serious about scaling.',
    category: 'Pricing',
  },
  {
    id: 'faq-3',
    question: 'How quickly can we expect measurable revenue impact?',
    answer:
      'For Google Ads (PPC) and Conversion Rate Optimization sprints, performance improvements are typically tracked within the first 14 to 30 days. For international SEO and topical authority campaigns, compounding pipeline growth becomes significant between months 3 and 6.',
    category: 'Performance',
  },
  {
    id: 'faq-4',
    question: 'Do you guarantee Google PageSpeed performance scores?',
    answer:
      'Yes. Every web flagship we build comes with a contractual guarantee of 95+ Desktop and Mobile PageSpeed scores. We write clean, modular Next.js/Vite code with optimized asset pipelines to ensure zero layout shifts and sub-second load times.',
    category: 'Technical',
  },
  {
    id: 'faq-5',
    question: 'Can you work with clients outside the UK or US?',
    answer:
      'Absolutely. Over 60% of our active portfolio consists of international clients across Dubai, Singapore, Germany, Switzerland, and Australia. Our team operates across London, New York, and Dubai time zones.',
    category: 'Global',
  },
];
