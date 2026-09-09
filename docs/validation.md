# 구현 및 검증 기록

검증일: 2026-09-09

- Next.js 16.3.4 / React 19 / Tailwind CSS 4 / TypeScript 5
- `npm run lint -- --max-warnings=0`: 통과 (오류 0, 경고 0)
- `npm run build`: 통과. 홈 및 세 Case 상세 페이지 정적 생성 완료
- TypeScript: production build 내 타입 검사 통과
- 생성 HTML: 홈, 세 상세, 404의 한국어 언어 설정·단일 h1·본문 이동 대상·description·내부 링크·앵커 확인
- Open Graph: 홈 및 세 Case의 제목·설명 존재, 각 제목 구분 확인
- 개발 서버: 홈페이지 HTTP 200 확인
- 첨부 명세: 원문 그대로 `docs/portfolio-spec-v1.md`에 포함

접근성은 시맨틱 HTML, 키보드 focus, skip link, 제목 계층, 표 제목, reduced-motion을 소스와 생성 HTML에서 점검했습니다. 실제 브라우저의 모바일 시각 검사 및 스크린리더 검사는 수행하지 않았습니다.

## 소유자 확인 항목

- `src/data/profile.ts`: 이메일, 블로그, 이력서 링크, `2025.XX` 입사 월
- `NEXT_PUBLIC_SITE_URL`: 실제 배포 origin
- Vercel: 저장소 Import 및 실제 배포 (현재 미수행)

Vercel 배포가 가능한 정적 구성까지 완료했습니다. 실제 배포 URL은 발급받지 않았습니다.
