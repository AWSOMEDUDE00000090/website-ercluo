import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // Human-readable period ("2024", "Jan–Mar 2025") shown on cards…
      period: z.string(),
      // …and a machine-sortable date used to order the grid.
      date: z.coerce.date(),
      tech: z.array(z.string()).default([]),
      role: z.string().optional(),
      links: z
        .object({
          repo: z.string().url().optional(),
          live: z.string().url().optional(),
          demo: z.string().url().optional(),
          video: z.string().url().optional(),
        })
        .optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string() }))
        .optional(),
      featured: z.boolean().default(false),
      order: z.number().optional(),
      draft: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, projects, pages };
