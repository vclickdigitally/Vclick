"use client";

import React, { createContext, useContext } from "react";
import { themeConfig, ThemeConfig } from "@/config/theme";

const ThemeContext = createContext<ThemeConfig>(themeConfig);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={themeConfig}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
