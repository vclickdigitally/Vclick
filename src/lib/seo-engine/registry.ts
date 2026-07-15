import { SEORule } from "./types";
import { basicSeoRules } from "./rules/basic-seo";
import { contentRules } from "./rules/content";
import { keywordRules } from "./rules/keywords";
import { imageRules } from "./rules/images";
import { schemaRules } from "./rules/schema";
import { technicalRules } from "./rules/technical";
import { eeatRules } from "./rules/eeat";
import { accessibilityRules } from "./rules/accessibility";
import { linkRules } from "./rules/links";
import { socialRules } from "./rules/social";

// Combine all rules
const defaultRulesList: SEORule[] = [
  ...basicSeoRules,
  ...contentRules,
  ...keywordRules,
  ...imageRules,
  ...schemaRules,
  ...technicalRules,
  ...eeatRules,
  ...accessibilityRules,
  ...linkRules,
  ...socialRules,
];

// Configuration rule store supporting runtime weight overrides
class RuleRegistry {
  private rules: SEORule[] = [];

  constructor() {
    this.reset();
  }

  public reset() {
    // Deep clone default list to avoid mutating static files
    this.rules = defaultRulesList.map((rule) => ({
      ...rule,
    }));
  }

  public getRules(): SEORule[] {
    return this.rules;
  }

  /**
   * Overrides weights and enabled/disabled states dynamically from DB or Settings config
   */
  public configureRules(config: Record<string, { weight?: number; enabled?: boolean }>) {
    this.rules.forEach((rule) => {
      if (config[rule.id]) {
        const overrides = config[rule.id];
        if (overrides.weight !== undefined) {
          rule.weight = overrides.weight;
        }
        if (overrides.enabled !== undefined) {
          rule.enabled = overrides.enabled;
        }
      }
    });
  }
}

export const ruleRegistry = new RuleRegistry();
