import { Manrope, Big_Shoulders } from "next/font/google";

export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-next-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontDisplay = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-next-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
});
