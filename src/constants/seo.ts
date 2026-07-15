export const SEO_LIMITS = {
  TITLE: {
    MIN_CHARS: 50,
    MAX_CHARS: 60,
    MAX_PIXELS: 600,
  },
  DESCRIPTION: {
    MIN_CHARS: 120,
    MAX_CHARS: 160,
    MAX_PIXELS: 960,
  },
  CONTENT: {
    MIN_WORDS: 600,
  },
} as const;

export const SUPPORTED_SCHEMAS = [
  "ORGANIZATION",
  "WEBSITE",
  "WEBPAGE",
  "ARTICLE",
  "BLOGPOSTING",
  "SERVICE",
  "PRODUCT",
  "FAQ",
  "BREADCRUMB",
  "REVIEW",
  "RATING",
  "PERSON",
  "TEAM",
  "VIDEO",
  "IMAGEOBJECT",
  "COURSE",
  "JOBPOSTING",
  "SOFTWAREAPPLICATION",
  "EVENT",
  "LOCALBUSINESS",
] as const;

export type SupportedSchemaType = typeof SUPPORTED_SCHEMAS[number];
