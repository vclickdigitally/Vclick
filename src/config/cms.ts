export const cmsConfig = {
  version: "0.1.0",
  name: "VClick CMS",
  features: {
    multiSite: true,
    workflowEngine: true,
    aiCenter: false, // Set to true in Phase 6
    analyticsCenter: false, // Set to true in Phase 7
    seoCenter: true,
    mediaDAM: true,
  },
  workflows: {
    states: ["DRAFT", "UNDER_REVIEW", "NEEDS_CHANGES", "APPROVED", "SCHEDULED", "PUBLISHED", "ARCHIVED"],
    defaultState: "DRAFT",
  },
};

export type CmsConfig = typeof cmsConfig;
