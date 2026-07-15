import { ruleRegistry } from "./registry";
import { EvaluationContext, DiagnosticIssue, DiagnosticResult, RuleCategory, ActionableFix } from "./types";

/**
 * Optimized Linear O(N) Content Assets Extractor.
 * Prevents catastrophic regex backtracking on large articles by parsing attributes separately.
 */
export function extractContentAssets(content: string) {
  const parsedImages: { url: string; alt: string; title?: string; caption?: string; description?: string }[] = [];
  const parsedLinks: { url: string; anchorText: string; isExternal: boolean; isBroken: boolean }[] = [];

  // Match <img> tags safely
  const imgTagRegex = /<img\s+([^>]*?)>/gi;
  let imgMatch;
  while ((imgMatch = imgTagRegex.exec(content)) !== null) {
    const attrs = imgMatch[1];
    const srcMatch = /src=["']([^"']*)["']/i.exec(attrs);
    const altMatch = /alt=["']([^"']*)["']/i.exec(attrs);
    const titleMatch = /title=["']([^"']*)["']/i.exec(attrs);
    const captionMatch = /data-caption=["']([^"']*)["']/i.exec(attrs);

    if (srcMatch && srcMatch[1]) {
      parsedImages.push({
        url: srcMatch[1],
        alt: altMatch ? altMatch[1] : "",
        title: titleMatch ? titleMatch[1] : undefined,
        caption: captionMatch ? captionMatch[1] : undefined,
      });
    }
  }

  // Match <a> links safely
  const linkTagRegex = /<a\s+([^>]*?)>([\s\S]*?)<\/a>/gi;
  let linkMatch;
  while ((linkMatch = linkTagRegex.exec(content)) !== null) {
    const attrs = linkMatch[1];
    const anchorText = linkMatch[2].replace(/<[^>]*>/g, "").trim();
    const hrefMatch = /href=["']([^"']*)["']/i.exec(attrs);

    if (hrefMatch && hrefMatch[1]) {
      const url = hrefMatch[1];
      const isExternal = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
      parsedLinks.push({
        url,
        anchorText,
        isExternal,
        isBroken: false, // Updated by redirect and page checkers dynamically
      });
    }
  }

  return { parsedImages, parsedLinks };
}

/**
 * Advanced Modular SEO Evaluation Processor
 */
export function runSeoDiagnostics(ctx: EvaluationContext): DiagnosticResult {
  const passedRules: DiagnosticIssue[] = [];
  const failedRules: DiagnosticIssue[] = [];
  const warningRules: DiagnosticIssue[] = [];
  const suggestions: DiagnosticIssue[] = [];

  // Fetch basic text parameters
  const plainText = ctx.content.replace(/<[^>]*>/g, " ");
  const textWords = plainText.split(/\s+/).filter(Boolean);
  const wordCount = textWords.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  let keywordCount = 0;
  if (ctx.focusKeyword && wordCount > 0) {
    // Escaping special characters inside search keyword regex
    const escapedKeyword = ctx.focusKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, "gi");
    keywordCount = (plainText.match(regex) || []).length;
  }
  const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0.0;

  // Retrieve active rules list from registry
  const rules = ruleRegistry.getRules().filter(r => r.enabled);

  // Score mapping trackers grouped by categories
  const categoryWeights: Record<RuleCategory, { passed: number; total: number }> = {
    "basic-seo": { passed: 0, total: 0 },
    "content": { passed: 0, total: 0 },
    "keywords": { passed: 0, total: 0 },
    "images": { passed: 0, total: 0 },
    "links": { passed: 0, total: 0 },
    "schema": { passed: 0, total: 0 },
    "social": { passed: 0, total: 0 },
    "technical": { passed: 0, total: 0 },
    "eeat": { passed: 0, total: 0 },
    "accessibility": { passed: 0, total: 0 },
  };

  let totalPassedWeight = 0;
  let totalEnabledWeight = 0;

  rules.forEach((rule) => {
    let result = { passed: false, actualValue: undefined as any, message: "Check failed." };
    try {
      result = { ...result, ...rule.validate(ctx) };
    } catch (e) {
      result.message = `Analysis crashed: ${(e as Error).message}`;
    }

    const issue: DiagnosticIssue = {
      id: rule.id,
      category: rule.category,
      name: rule.name,
      description: rule.description,
      passed: result.passed,
      weight: rule.weight,
      severity: rule.severity,
      actualValue: result.actualValue,
      message: result.message,
      recommendation: rule.recommendation,
    };

    // Increment weight statistics
    categoryWeights[rule.category].total += rule.weight;
    totalEnabledWeight += rule.weight;

    if (result.passed) {
      categoryWeights[rule.category].passed += rule.weight;
      totalPassedWeight += rule.weight;
      passedRules.push(issue);
    } else {
      if (rule.severity === "error") {
        failedRules.push(issue);
      } else if (rule.severity === "warning") {
        warningRules.push(issue);
      } else {
        suggestions.push(issue);
      }
    }
  });

  // Calculate scores (0 to 100 scale)
  const computeNormalizedScore = (passed: number, total: number): number => {
    if (total === 0) return 100;
    return Math.round((passed / total) * 100);
  };

  const categoryScores: Record<RuleCategory, number> = {
    "basic-seo": computeNormalizedScore(categoryWeights["basic-seo"].passed, categoryWeights["basic-seo"].total),
    "content": computeNormalizedScore(categoryWeights["content"].passed, categoryWeights["content"].total),
    "keywords": computeNormalizedScore(categoryWeights["keywords"].passed, categoryWeights["keywords"].total),
    "images": computeNormalizedScore(categoryWeights["images"].passed, categoryWeights["images"].total),
    "links": computeNormalizedScore(categoryWeights["links"].passed, categoryWeights["links"].total),
    "schema": computeNormalizedScore(categoryWeights["schema"].passed, categoryWeights["schema"].total),
    "social": computeNormalizedScore(categoryWeights["social"].passed, categoryWeights["social"].total),
    "technical": computeNormalizedScore(categoryWeights["technical"].passed, categoryWeights["technical"].total),
    "eeat": computeNormalizedScore(categoryWeights["eeat"].passed, categoryWeights["eeat"].total),
    "accessibility": computeNormalizedScore(categoryWeights["accessibility"].passed, categoryWeights["accessibility"].total),
  };

  const overallScore = computeNormalizedScore(totalPassedWeight, totalEnabledWeight);

  // Compile priority fixes: items failed, sorted by impact weight descending
  const allFailedIssues = [...failedRules, ...warningRules, ...suggestions];
  const sortedFailed = allFailedIssues.sort((a, b) => b.weight - a.weight);

  const priorityFixes: ActionableFix[] = sortedFailed.map((issue) => {
    // Priority classification based on weight threshold
    let priority: "High" | "Medium" | "Low" = "Low";
    if (issue.weight >= 25) {
      priority = "High";
    } else if (issue.weight >= 15) {
      priority = "Medium";
    }

    // Calculate score impact dynamically: (issue weight / total enabled weight) * 100
    const impactVal = totalEnabledWeight > 0
      ? Math.max(1, Math.round((issue.weight / totalEnabledWeight) * 100))
      : 0;

    return {
      priority,
      issue: issue.name,
      impact: `+${impactVal} points`,
      action: issue.recommendation,
    };
  });

  // Estimated Score Improvement = Sum of failed weights / totalEnabledWeight * 100
  const totalFailedWeight = totalEnabledWeight - totalPassedWeight;
  const estimatedScoreImprovement = totalEnabledWeight > 0
    ? Math.round((totalFailedWeight / totalEnabledWeight) * 100)
    : 0;

  return {
    overallScore,
    categoryScores,
    passedRules,
    failedRules,
    warningRules,
    suggestions,
    priorityFixes,
    estimatedScoreImprovement,
    metrics: {
      wordCount,
      readingTime,
      keywordDensity,
    },
  };
}
