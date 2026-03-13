import { defineConfig } from "astro/config";

// Utils and plugins
import remarkModifiedTime from "./src/utils/remark-modified-time.mjs";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// Astro Configuration
import lit from "@astrojs/lit";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Site Information
  site: "https://jnhooper.github.io",

  base: "/theMenu",
  trailingSlash: "never",

  prefetch: {
    prefetchAll: true,
  },


  // Third-party Integrations
  integrations: [
    // Sitemap generator
    sitemap(),
    // MDX support
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
