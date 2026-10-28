import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../../site.config';
import { getPosts, postUrl } from '../../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts('en');
  return rss({
    title: SITE.en.title,
    description: SITE.en.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en-US</language>',
  });
}
