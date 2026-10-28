import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE, SITE_URL, type Lang } from '../site.config';

// 링크 공유용 대표 이미지(1200x630 PNG)를 빌드할 때 만든다.
const fontDir = path.join(process.cwd(), 'node_modules/pretendard/dist/public/static');
const fonts = [
  { name: 'Pretendard', data: fs.readFileSync(path.join(fontDir, 'Pretendard-Medium.otf')), weight: 500 as const },
  { name: 'Pretendard', data: fs.readFileSync(path.join(fontDir, 'Pretendard-Bold.otf')), weight: 700 as const },
];

// 1200 - 좌우 패딩 160 - 왼쪽 바 16
const CONTENT_W = 1024;
const COLORS = { bg: '#161b2c', text: '#f3f4f8', muted: '#a3a9bd', accent: '#8aa8ff', bar: '#2f5bd3' };

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

interface OgInput {
  lang: Lang;
  title: string;
  label?: string;
}

export async function renderOg({ lang, title, label }: OgInput) {
  const host = new URL(SITE_URL).host;
  const titleSize = title.length > 34 ? 56 : 66;

  const tree = h(
    'div',
    {
      // satori는 패딩을 바깥에 더하므로 패딩·테두리를 뺀 크기를 준다
      width: CONTENT_W,
      height: 630 - 72 * 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: COLORS.bg,
      fontFamily: 'Pretendard',
      borderLeft: `16px solid ${COLORS.bar}`,
    },
    [
      h('div', { width: CONTENT_W, alignItems: 'center', gap: 20 }, [
        h('div', { fontSize: 30, fontWeight: 700, color: COLORS.text }, SITE[lang].title),
        label
          ? h(
              'div',
              {
                fontSize: 24,
                fontWeight: 500,
                color: COLORS.accent,
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 999,
                padding: '4px 18px',
              },
              label,
            )
          : null,
      ]),
      h(
        'div',
        {
          width: CONTENT_W,
          fontSize: titleSize,
          fontWeight: 700,
          color: COLORS.text,
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          wordBreak: 'keep-all',
        },
        title,
      ),
      h('div', { width: CONTENT_W, justifyContent: 'space-between', fontSize: 26, fontWeight: 500, color: COLORS.muted }, [
        h('span', {}, SITE[lang].author),
        h('span', {}, host),
      ]),
    ],
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}
