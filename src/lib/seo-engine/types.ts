export type RuleCategory =
  | "basic-seo"
  | "content"
  | "keywords"
  | "images"
  | "links"
  | "schema"
  | "social"
  | "technical"
  | "eeat"
  | "accessibility";

export type RuleSeverity = "error" | "warning" | "suggestion";

export interface RuleCheckResult {
  passed: boolean;
  actualValue?: string | number;
  message: string;
}

export interface SEORule {
  id: string;
  category: RuleCategory;
  name: string;
  description: string;
  weight: number;
  enabled: boolean;
  severity: RuleSeverity;
  recommendation: string;
  validate(context: EvaluationContext): RuleCheckResult;
}

export interface EvaluationContext {
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData: string;
  featuredImage: string;
  featuredImageAlt: string;
  
  // Social configs
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  
  parsedImages: { url: string; alt: string; title?: string; caption?: string; description?: string }[];
  parsedLinks: { url: string; anchorText: string; isExternal: boolean; isBroken: boolean }[];
  
  // EEAT Profile
  authorBio: string;
  authorCredentials: string;
  updatedAt?: Date;
  references?: string[];
  
  // Technical configurations
  sitemapPath?: string;
  hasHttps?: boolean;
}

export interface DiagnosticIssue {
  id: string;
  category: RuleCategory;
  name: string;
  description: string;
  passed: boolean;
  weight: number;
  severity: RuleSeverity;
  actualValue?: string | number;
  message: string;
  recommendation: string;
}

export interface ActionableFix {
  priority: "High" | "Medium" | "Low";
  issue: string;
  impact: string;
  action: string;
}

export interface DiagnosticResult {
  overallScore: number;
  categoryScores: Record<RuleCategory, number>;
  
  passedRules: DiagnosticIssue[];
  failedRules: DiagnosticIssue[];
  warningRules: DiagnosticIssue[];
  suggestions: DiagnosticIssue[];
  
  priorityFixes: ActionableFix[];
  estimatedScoreImprovement: number;
  
  metrics: {
    wordCount: number;
    readingTime: number; // in minutes
    keywordDensity: number; // percentage
  };
}
