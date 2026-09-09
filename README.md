# 김영범 · Frontend Developer Portfolio

문제 해결 Case Study 중심 포트폴리오. 첨부 명세의 Phase 1–4를 Next.js App Router, TypeScript, Tailwind CSS로 구현했습니다. 원본 명세는 [docs/portfolio-spec-v1.md](docs/portfolio-spec-v1.md)에 보관합니다.

## 실행 및 검증

Node.js 22 이상 권장.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

`output: "export"`를 사용해 `out/`에 정적 사이트를 생성합니다. DB, CMS, 인증, API Route, 서버 액션이 없습니다. 외부 폰트를 다운로드하지 않고 시스템 폰트를 사용합니다.

## 페이지

- `/`: Intro, Selected Cases, Experience, Contact
- `/cases/player/`: 플레이어 장애 분석과 상태별 복구
- `/cases/realtime-lifecycle/`: Saga로 이동한 이벤트 수명과 Particle/Gauge 비교
- `/cases/ui-verification/`: Mock 기반 UI 검증 구조와 흐름
- 알 수 없는 경로: 404 및 홈 복귀 링크

## 콘텐츠 교체

| 파일                              | 수정 내용                                                      |
| --------------------------------- | -------------------------------------------------------------- |
| `src/data/profile.ts`             | 이름, 소개, 이메일, GitHub, 블로그, 이력서 URL, 미확정 입사 월 |
| `src/data/experience.ts`          | 경력 및 담당 업무                                              |
| `src/data/cases.ts`               | Case 요약, 역할, 환경, 결과                                    |
| `src/components/case-content.tsx` | Case별 상세 설명                                               |
| `src/components/diagrams.tsx`     | 텍스트와 CSS 기반의 재구성 다이어그램                          |
| `src/app/globals.css`             | 색상, 타이포그래피, 반응형 스타일                              |

이메일·블로그·이력서는 `null` placeholder입니다. 입력 전에는 비활성 텍스트로 표시합니다. 실제 값 입력 시 링크가 활성화됩니다. 입사 월 `2025.XX`는 확인 후 교체하세요. GitHub 주소는 확인된 `https://github.com/kybaq`입니다.

## Vercel 배포

1. Vercel에서 GitHub 저장소 `kybaq/kyb`를 Import합니다.
2. Framework Preset: **Next.js**, Root Directory: 저장소 루트, Build Command: `npm run build`를 사용합니다.
3. 실제 도메인 결정 후 환경 변수 `NEXT_PUBLIC_SITE_URL`에 `https://실제도메인` 형식의 origin을 입력하고 재배포합니다.
4. 홈페이지와 세 Case URL, 404, 모바일 가독성, 연락처를 확인합니다.

배포 주소가 미정이면 `.env.example`처럼 값을 비워 둡니다. 잘못된 placeholder 도메인을 검색엔진에 전달하지 않도록 canonical은 생략되고 sitemap은 비어 있습니다. 주소 설정 후 빌드하면 canonical, Open Graph URL, sitemap, robots의 sitemap 링크에 반영됩니다. 페이지별 Open Graph와 Twitter 제목·설명은 제공하며, 별도 공유 이미지는 포함하지 않습니다.

실제 Vercel 배포는 소유자 계정의 GitHub 연결 및 프로젝트 생성이 필요합니다. 로컬 빌드 완료와 실제 배포 완료는 별개입니다.

## 구현 범위

- Phase 1: App Router 정적 라우트, 공통 Header/Footer, 컨테이너 및 기본 스타일
- Phase 2: 명세 기반 홈·세 Case 상세·경력·연락처
- Phase 3: 환경 교차 테스트, Player 복구, Before/After, Particle/Gauge, Mock UI 상태 및 검증 흐름
- Phase 4: 반응형, 목차와 앵커, 개별 metadata, Open Graph, favicon, 404, 키보드 focus, skip link, 시맨틱 HTML, reduced-motion

회사 소스코드, 내부 API/DB 구조, 실제 화면이나 문서 캡처를 포함하지 않습니다. 성과는 제공된 명세를 바탕으로 작성했으며 측정되지 않은 수치를 만들지 않았습니다. 다이어그램은 설명용이며 실제 서비스 실행 코드가 아닙니다.
