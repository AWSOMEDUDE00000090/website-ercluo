// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ercluo.com",
  output: "static",
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Dual themes; global.css maps the dark one onto [data-mode="dark"].
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    },
  },
});
