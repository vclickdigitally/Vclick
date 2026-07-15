export const themeConfig = {
  style: "Luxury Dark Brutalism",
  colors: {
    background: "#0B0B0B",      // Absolute black
    cardBackground: "#121212",  // Card backdrop
    border: "rgba(255, 255, 255, 0.08)", // border lines
    accent: "#DD183B",          // VClick Accent Cherry Red
    textPrimary: "#FFFFFF",
    textMuted: "#8E8E8E",
  },
  animations: {
    duration: "300ms",
    timing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

export type ThemeConfig = typeof themeConfig;
