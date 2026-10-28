import type { APIContext } from 'astro';
import { CATEGORIES, SITE, type Lang } from '../../site.config';
import { getPosts, postSlug } from '../../lib/posts';
import { renderOg } from '../../lib/og';

// /og/ko.png, /og/en.png        → 사이트 기본 이미지
// /og/ko/<slug>.png, /og/en/... → 글별 이미지
export async function getStaticPaths() {
  const paths = [];
  for (const lang of ['ko', 'en'] as Lang[]) {
    paths.push({ params: { path: lang }, props: { lang, title: SITE[lang].tagline } });
    for (const post of await getPosts(lang)) {
      paths.push({
        params: { path: `${lang}/${postSlug(post)}` },
        props: { lang, title: post.data.title, label: CATEGORIES[post.data.category][lang] },
      });
    }
  }
  return paths;
}

export async function GET({ props }: APIContext) {
  const png = await renderOg(props as { lang: Lang; title: string; label?: string });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
