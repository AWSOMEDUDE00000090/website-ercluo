import type { CollectionEntry } from "astro:content";

/** ~200 wpm, minimum of one minute, based on the raw markdown body. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function sortPostsNewestFirst(posts: CollectionEntry<"blog">[]) {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Featured first, then explicit `order` (ascending), then newest first. */
export function sortProjects(projects: CollectionEntry<"projects">[]) {
  return [...projects].sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const orderA = a.data.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.data.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

/** Drafts are visible in `astro dev` but excluded from production builds. */
export function isPublished(entry: { data: { draft: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}
