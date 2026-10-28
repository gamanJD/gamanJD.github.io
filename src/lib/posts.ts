import { getCollection, type CollectionEntry } from 'astro:content';
import { langPrefix, type Lang } from '../site.config';

export type Post = CollectionEntry<'posts'>;

// entry.id 예: "ko/welcome" → lang "ko", slug "welcome"
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postUrl = (post: Post) => `${langPrefix(postLang(post))}/posts/${postSlug(post)}/`;

export async function getPosts(lang: Lang) {
  const all = await getCollection(
    'posts',
    (p) => postLang(p) === lang && (import.meta.env.DEV || !p.data.draft),
  );
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// 같은 slug의 다른 언어 글이 있으면 반환
export async function getTranslation(post: Post) {
  const other: Lang = postLang(post) === 'ko' ? 'en' : 'ko';
  const list = await getPosts(other);
  return list.find((p) => postSlug(p) === postSlug(post));
}

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
