// 블로그 전체 설정. GitHub 아이디나 도메인이 정해지면 SITE_URL만 바꾸면 된다.
export const SITE_URL = 'https://gamanjd.github.io';

export const SITE = {
  ko: {
    title: 'JD의 기획',
    tagline: '고객이 남는 구조를 설계하는 기획자의 노트',
    description:
      '리텐션·수익화 설계, 서비스 구조 분석, 기획 방법론. 현장에서 일하며 배운 것을 기록합니다.',
    author: '지대욱',
  },
  en: {
    title: "JD's Planning",
    tagline: 'Notes on designing structures that make customers stay',
    description:
      'Retention and monetization design, service teardowns, and planning methods — field notes from a service and marketing planner in Korea.',
    author: 'Daewook Ji',
  },
} as const;

// 구글 애널리틱스 측정 ID (예: 'G-XXXXXXX'). 비워두면 스크립트를 넣지 않는다.
export const GA_ID = '';

// 구글 서치콘솔 HTML 태그 인증 값. 비워두면 넣지 않는다.
export const GSC_VERIFICATION = '';

export const LINKS = {
  linkedin: '',
  email: '',
};

export type Lang = keyof typeof SITE;

export const CATEGORIES = {
  retention: { ko: '리텐션·수익화 설계', en: 'Retention & Monetization' },
  teardown: { ko: '서비스 뜯어보기', en: 'Service Teardowns' },
  method: { ko: '기획 방법론', en: 'Planning Methods' },
  field: { ko: '현장 노트', en: 'Field Notes' },
} as const;

export type Category = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

export const UI = {
  ko: {
    home: '홈',
    about: '소개',
    allPosts: '전체 글',
    latest: '최근 글',
    readMore: '읽기',
    switchLang: 'English',
    updated: '수정',
    noPosts: '아직 글이 없습니다.',
    rss: 'RSS',
  },
  en: {
    home: 'Home',
    about: 'About',
    allPosts: 'All posts',
    latest: 'Latest',
    readMore: 'Read',
    switchLang: '한국어',
    updated: 'Updated',
    noPosts: 'No posts yet.',
    rss: 'RSS',
  },
} as const;

export const langPrefix = (lang: Lang) => (lang === 'ko' ? '' : '/en');
