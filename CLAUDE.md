# JD의 기획 — 블로그 운영 규칙

지대욱의 개인 블로그. Astro 정적 사이트 → GitHub Pages 배포. 한국어(기본, `/`)와 영어(`/en/`) 이중 발행.

## 포지셔닝
"고객이 남는 구조를 설계하는 기획자". 특정 산업(EV 충전 등)은 정체성이 아니라 사례의 출처. 원칙: **주제는 범용, 사례는 현장.**

## 카테고리 (`category` 값)
| 값 | 이름 | 목표 비중 |
|---|---|---|
| `retention` | 리텐션·수익화 설계 | 40% |
| `teardown` | 서비스 뜯어보기 | 30% |
| `method` | 기획 방법론 | 20% |
| `field` | 현장 노트 | 10% |

발행 목표: 주 3회 (칼럼 1 + 서비스 뜯어보기 1 + 해설/방법론 1).

## 보안 원칙 (반드시 지킬 것)
- 회사 내부 문서·수치·미출시 프로젝트·제휴사 협상 내용은 쓰지 않는다. 회사 업무 폴더의 파일을 글에 인용하거나 붙여넣지 않는다.
- 공개된 정보(보도자료, 공식 발표, 공개 앱 화면)와 개인의 생각·교훈만 쓴다.
- 현장 노트는 회사·제휴사를 특정할 수 없게 일반화한다. 애매하면 쓰지 않고 사용자에게 묻는다.
- 저장소는 공개(public)다. 검토 전 초안은 반드시 `drafts/`(gitignore)에 둔다.

## 글 작성 흐름
1. 초안을 `drafts/<slug>.ko.md`, `drafts/<slug>.en.md`로 작성
2. 사용자가 `npm run dev`로 미리보기 검토 (확인용으로 `src/content/posts/`에 `draft: true`로 넣으면 개발 서버에서만 보인다. 이 상태로 커밋하지 않는다.)
3. 승인되면 `src/content/posts/ko/<slug>.md`, `src/content/posts/en/<slug>.md`로 옮기고 `draft` 제거
4. 사용자 승인 후 커밋·푸시 → GitHub Actions가 자동 배포

## 글 형식
- 파일명(slug)은 영문 소문자-하이픈. 한영 짝은 같은 slug.
- frontmatter: `title`, `description`(검색 결과에 노출, 80~150자), `pubDate`, `category`, `tags`, 선택 `updatedDate`, `draft`
- 영어판은 직역하지 않는다. 미국 독자 기준으로 맥락(한국 서비스 설명 등)을 보충해 다시 쓴다.
- 본문은 `##`부터. 제목(`#`)은 레이아웃이 넣는다.
- 글마다 LinkedIn 요약 포스트(한/영)도 `drafts/<slug>.linkedin.md`에 함께 만든다.

## 설정 위치
- 사이트 주소·이름·GA·서치콘솔·링크: `src/site.config.ts`
- 디자인: `src/styles/global.css`
