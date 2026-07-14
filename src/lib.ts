import type { CollectionEntry } from "astro:content";

/** ~215 wpm on the raw markdown body; never less than 1 minute. */
export function minutesToRead(body: string | undefined): string {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 215))} min`;
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function byNewest(posts: CollectionEntry<"blog">[]) {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Featured first, then manual `order`, then newest. */
export function byProjectRank(projects: CollectionEntry<"projects">[]) {
  return [...projects].sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const ao = a.data.order ?? Infinity;
    const bo = b.data.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

/** Drafts show in `astro dev`, never in production builds. */
export function published(entry: { data: { draft: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}
