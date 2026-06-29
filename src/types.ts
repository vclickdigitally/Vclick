export type ServiceCategory = 'SEO' | 'PPC' | 'DEV' | 'BRANDING';

export interface ServiceMetric {
  label: string;
  value: string;
  change: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: ServiceCategory;
  description: string;
  keyDeliverables: string[];
  metrics: ServiceMetric[];
  simulationData: {
    chartPoints?: number[];
    labels?: string[];
    highlightText?: string;
  };
}

export interface ProjectCase {
  id: string;
  clientName: string;
  logoText: string;
  industry: string;
  serviceTags: string[];
  heroHeadline: string;
  summary: string;
  roiStats: {
    primaryNumber: string;
    primaryLabel: string;
    secondaryNumber: string;
    secondaryLabel: string;
  };
  beforeAfter: {
    beforeMetric: string;
    afterMetric: string;
    metricName: string;
  };
  clientQuote: string;
  clientExecutive: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface StatCounter {
  id: string;
  value: number;
  decimals?: number;
  prefix: string;
  suffix: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  vclick: string;
  standard: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  verifiedRevenue: string;
  quote: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avgRoi: string;
  caseCount: string;
  sampleChallenge: string;
  solutionOutcome: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GrowthEstimate {
  monthlyBudget: number;
  targetService: 'SEO' | 'PPC' | 'ALL';
  industryMultiplier: number;
  estimatedLeadsMin: number;
  estimatedLeadsMax: number;
  estimatedPipelineMin: number;
  estimatedPipelineMax: number;
}
