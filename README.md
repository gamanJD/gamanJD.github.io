# JD의 기획

개인 블로그. Astro로 만들고 GitHub Pages에 무료로 배포한다.

## 처음 한 번만: 배포 세팅

1. **GitHub 계정 만들기** (개인 이메일로). 아이디가 블로그 주소가 된다 → `https://아이디.github.io`
2. **저장소 만들기**: 이름을 정확히 `아이디.github.io`로, Public으로 만든다.
3. **`src/site.config.ts`의 `SITE_URL`**을 `https://아이디.github.io`로 바꾼다.
4. **올리기** (이 폴더에서):
   ```
   git init
   git add .
   git commit -m "블로그 초기 세팅"
   git branch -M main
   git remote add origin https://github.com/아이디/아이디.github.io.git
   git push -u origin main
   ```
5. GitHub 저장소 → **Settings → Pages → Source를 "GitHub Actions"**로 바꾼다.
6. 1~2분 뒤 `https://아이디.github.io` 접속 확인.

## 그 다음: 검색·분석 연결 (무료)

- **구글 서치콘솔**: 사이트 추가 → HTML 태그 방식 → `content` 값을 `GSC_VERIFICATION`에 넣고 배포 → 인증 → `sitemap-index.xml` 제출
- **구글 애널리틱스**: 속성 만들기 → 측정 ID(`G-...`)를 `GA_ID`에 넣기
- **네이버 서치어드바이저**(선택): 한국 검색 노출용. 같은 방식으로 등록
- **LinkedIn·이메일**: `LINKS`에 넣으면 소개 페이지와 하단에 표시

## 평소 사용

```
npm run dev      # 미리보기 (http://localhost:4321)
npm run build    # 배포 전 빌드 확인
```

글 쓰기 규칙과 보안 원칙은 `CLAUDE.md` 참고.

## 나중에 도메인을 사면

`SITE_URL`을 새 도메인으로 바꾸고, `public/CNAME` 파일에 도메인을 한 줄 적고, GitHub Pages 설정에서 Custom domain을 입력한다.
