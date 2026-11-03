import { getCollection, type CollectionEntry } from 'astro:content';
import { langPrefix, type Lang } from '../site.config';

export type Post = CollectionEntry<'posts'>;

// entry.id 예: "ko/welcome" → lang "ko", slug "welcome"
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postUrl = (post: Post) => `${langPrefix(postLang(post))}/posts/${postSlug(post)}/`;

// 예약 발행: 배포 빌드에서는 pubDate가 오늘(한국 시간) 이후인 글을 숨긴다.
// GitHub Actions가 매일 0시 5분(KST)에 다시 빌드하므로 그날 자동 공개된다.
const todayKst = () => new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
export const isPublished = (post: Post) =>
  !post.data.draft && post.data.pubDate.toISOString().slice(0, 10) <= todayKst();

export async function getPosts(lang: Lang) {
  const all = await getCollection(
    'posts',
    (p) => postLang(p) === lang && (import.meta.env.DEV || isPublished(p)),
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
