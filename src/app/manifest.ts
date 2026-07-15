import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VClick CMS",
    short_name: "VClickCMS",
    description: "Enterprise AI-Powered CMS & SEO Platform",
    start_url: "/admin",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#DD183B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
