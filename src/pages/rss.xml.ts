import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "~/site";
import { byNewest, published } from "~/lib";

export async function GET(context: APIContext) {
  const posts = byNewest(await getCollection("blog", published));
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [...post.data.tags],
    })),
  });
}
