// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ercluo.com",
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // One theme per color scheme; CSS variables switch between them.
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
