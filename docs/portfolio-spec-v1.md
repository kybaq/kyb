# 포트폴리오 웹사이트 구현 명세 v1

## 1. 프로젝트 목적

프론트엔드 개발자 김영범의 실무 경험을 단순 프로젝트 나열이 아니라 **문제 해결 Case Study 중심**으로 보여주는 정적 웹 포트폴리오를 만든다.

포트폴리오의 목적은 화려한 인터랙션이나 기술 과시가 아니라, 다음 세 가지를 짧은 시간 안에 전달하는 것이다.

1. 운영 중 문제를 어떻게 재현하고 원인을 좁히는가
2. 실시간 상태와 UI 생명주기를 어떻게 설계하는가
3. 테스트하기 어려운 UI 플로우를 어떻게 검증 가능하게 만드는가

---

## 2. 핵심 원칙

### 콘텐츠 우선
- 시각 효과보다 가독성을 우선한다.
- 긴 설명은 줄이고 핵심 흐름을 다이어그램으로 보완한다.
- 각 Case는 “문제 → 판단 → 해결 → 결과” 흐름이 자연스럽게 보이도록 구성한다.

### 회사 자산 보호
- 실제 회사 소스코드 사용 금지
- 내부 API 명세, DB 구조, Jira/Slack/사내 문서 캡처 사용 금지
- 실제 서비스 화면 캡처도 불필요하면 사용하지 않는다.
- 모든 코드와 구조도는 포트폴리오용으로 재구성한다.

### 과도한 구현 금지
- CMS 없음
- DB 없음
- 인증 없음
- 서버 기능 없음
- 과한 페이지 전환 애니메이션 없음
- 포트폴리오 자체가 별도 대형 프로젝트가 되지 않도록 한다.

---

## 3. 권장 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- 정적 렌더링 중심
- Vercel 배포
- 필요 시 lucide-react 정도의 아이콘 사용

선택 사항:
- MDX 또는 TypeScript 객체 기반 Case 데이터 관리

굳이 추가하지 않을 것:
- Zustand
- TanStack Query
- Supabase
- 별도 CMS
- 서버 액션
- API Route

---

## 4. 사이트 구조

```text
/
├─ Intro
├─ Selected Cases
├─ Experience
└─ Contact

/cases/player
/cases/realtime-lifecycle
/cases/ui-verification
```

홈에서 세 개 Case를 카드 형태로 보여주고 상세 페이지로 이동한다.

---

# 5. Home

## 5.1 Hero

표시 내용:

**김영범**
Frontend Developer

소개 문구:

> 실시간 서비스와 레거시 환경에서 문제를 재현하고, 상태의 흐름과 책임을 분석해 개선하는 프론트엔드 개발자입니다.

보조 정보:

- Email
- GitHub
- Blog

Skills는 과하게 나열하지 않는다.

예:

`React · JavaScript · Redux · Redux-Saga · Socket`

---

## 5.2 Selected Cases

세 Case를 가장 중요한 콘텐츠로 배치한다.

### Case 01

**라이브 스트리밍 플레이어 재생 장애 개선**

설명:

> 특정 모바일 송출 → PC 시청 조합에서 발생한 프리징과 지연 재생 문제를 재현하고, 스트림과 플레이어 상태를 분리해 원인을 추적했습니다.

Tags:

`Debugging` `Media Player` `Legacy`

Case가 보여주는 역량:

> 문제를 어떻게 좁혀가는가

---

### Case 02

**실시간 이벤트 생명주기 개선**

설명:

> 화면 생명주기에 종속되어 있던 Socket 이벤트의 수명 관리를 Saga로 이동하고, 이벤트 성격에 따라 서로 다른 lifecycle 전략을 적용했습니다.

Tags:

`Realtime` `State Management` `Redux-Saga`

Case가 보여주는 역량:

> 상태와 책임을 어떻게 설계하는가

---

### Case 03

**복잡한 UI 플로우를 반복 검증 가능하게 만들기**

설명:

> 실제 수행에 긴 시간이 필요한 프로모션에서 UI 상태를 독립적으로 재현할 수 있는 Mock 기반 검증 환경을 만들었습니다.

Tags:

`Testing` `UI State` `Collaboration`

Case가 보여주는 역량:

> 제한된 환경에서 검증 비용을 어떻게 줄이는가

---

# 6. Case 상세 페이지 공통 구조

모든 Case를 동일한 템플릿에 강제로 넣지 않는다.

다만 독자가 익숙하게 읽을 수 있도록 아래 요소는 공통으로 유지한다.

```text
Case Title
↓
Summary
↓
Overview
↓
Main Visual
↓
Problem
↓
Investigation / Solution
↓
Result
```

---

# 7. Case 01 — 라이브 스트리밍 플레이어 재생 장애 개선

## Summary

모바일 방송 중 송출자가 카메라 송출을 일정 시간 중단한 뒤 다시 시작하면 일부 PC 시청자의 플레이어가 멈추거나 과거 시점의 스트림을 재생하는 문제를 분석하고 개선했다.

## Overview

- 환경: React · Tencent Player · flv.js
- 역할: 문제 발견, 재현 조건 분석, 원인 조사, 개선안 구현
- 문제: 모바일 송출 → PC 시청 조합에서 프리징 및 과거 시점 재생
- 결과: 개선 적용 이후 현재까지 동일 현상 미재현

## Problem

- 모바일 송출 → PC 시청 환경에서 반복 재현
- PC 송출 → PC 시청에서는 재현되지 않음
- 모바일 송출 → 모바일 시청에서도 재현되지 않음
- 같은 방송을 보는 모바일 시청은 정상
- 문제가 발생한 PC에서도 `.flv` 데이터 수신은 지속

## Investigation

표현할 핵심 흐름:

```text
송출/시청 환경 교차 테스트
↓
모바일 송출 → PC 시청에서만 반복 재현
↓
같은 송출의 모바일 시청 정상
↓
PC에서도 .flv 데이터 수신 지속
↓
PC Player의 stream 처리와 재생 상태로 조사 범위 축소
↓
buffer / timeline 관찰
↓
Tencent Player 내부 flv.js까지 조사
```

## Solution

### flv.js Patch

- 기존 Tencent Player는 flv.js 1.5 계열 사용
- 1.6에서 관련 동작이 개선된 것을 확인
- 전체 버전 교체 대신 필요한 수정만 선별해 반영
- 영향 범위를 최소화

### Player 상태 분기

카메라 송출 중단 후 PC 시청 데이터 수신량이 크게 감소하고 기존 buffer를 계속 소비함.

두 가지 상태로 분기:

```text
buffer 소진
↓
Player 중단
↓
상태 확인

A.
buffer 관련 값 비정상
+
재생 상태 재진입
↓
Player destroy / recreate

B.
buffer 정상
+
중단 상태 유지
↓
카메라 송출 재개
↓
Live 위치 보정
```

Live 위치 보정은 최신 live timeline보다 약간 이전 위치로 seek한다.

## Result

> 개선 적용 후 기존 재현 조건으로 반복 테스트했을 때 동일 현상이 다시 발생하지 않았으며, 이후 실제 서비스 운영 과정에서도 현재까지 같은 문제가 다시 확인되지 않았다.

## Main Visuals

1. 송출/시청 환경 교차 테스트 다이어그램
2. Player 상태 분기 및 복구 flow

Constraint 관련 조직/라이선스 이야기는 상세 본문에서 제거한다.
면접 질문용 보조 정보로만 유지한다.

---

# 8. Case 02 — 실시간 이벤트 생명주기 개선

## Summary

후원 조건에 따라 파티클과 Gauge가 노출되는 실시간 프로모션에서, 화면 생명주기에 종속되어 있던 이벤트 수명을 Saga 중심으로 재설계했다.

## Overview

- 환경: React · Redux · Redux-Saga · Socket
- 역할: 기존 구조 분석, 문제 원인 파악, 상태 lifecycle 재설계
- 문제: PIP 중 쌓인 과거 이벤트가 방송방 복귀 후 뒤늦게 재생
- 결과: 이벤트의 수명을 화면과 분리

## Context

후원 금액이 특정 조건을 충족하면 Socket 이벤트를 통해 실시간 인터랙션이 발생한다.

- Particle: 시청자가 클릭해 획득할 수 있음
- Gauge: 현재 누적 후원과 목표 진행 상황 표시

실시간성이 이벤트 규칙의 일부다.

## Problem

기존 구조:

```text
Socket
↓
Saga
↓
Redux Store
↓
React Component
↓
Local State
↓
Timer / Animation
↓
Redux Update
```

PIP 전환 시 관련 컴포넌트가 unmount된다.

하지만:
- Socket 이벤트는 계속 수신됨
- Redux에는 이벤트가 계속 쌓임
- 소비 로직은 컴포넌트와 함께 사라짐
- 방송방 복귀 시 과거 이벤트가 다시 재생됨

문제의 핵심:

> 실시간 이벤트의 생명주기와 화면의 생명주기가 서로 다른데, 기존 구조에서는 둘이 묶여 있었다.

## Solution

이벤트의 수명을:

`Component mount 상태`

가 아니라

`Socket 수신 시점 + 서버 duration`

을 기준으로 관리하도록 변경한다.

After:

```text
Socket
↓
Redux-Saga
├─ Redux Store Update
└─ Lifecycle Task
      ↓
   duration
      ↓
    expire/remove

React Component
↓
Render only
```

### Particle

- 수신 시점부터 독립적으로 수명 계산
- 서버 duration이 지나면 제거
- PIP에서 놓친 파티클은 복귀 후 다시 표시하지 않음

### Gauge

Gauge는 현재 누적 후원 및 목표 상태를 나타낸다.

목표 달성 후 약 30초 대기 시간이 있으며, 이 시간 동안 새 후원이 들어오면 다시 30초부터 시작한다.

```text
Gauge packet
↓
최신 상태 반영
↓
30초 대기
   │
   ├─ 새로운 packet
   │      ↓
   │  이전 task cancel
   │      ↓
   │  다시 30초
   │
   └─ 추가 후원 없음
          ↓
      다음 이벤트
```

서버가 마지막 패킷에 최신 누적 상태를 보장한다는 계약을 전제로 `takeLatest`를 적용한다.

## Result

- PIP 중 발생한 과거 이벤트가 복귀 후 재생되는 문제 제거
- 이벤트 lifetime을 컴포넌트 mount 상태와 분리
- React component는 현재 상태를 표현하는 역할에 집중

## Main Visuals

1. Before / After architecture
2. Particle vs Gauge lifecycle comparison

---

# 9. Case 03 — 복잡한 UI 플로우를 반복 검증 가능하게 만들기

## Summary

실제 수행에 수시간에서 수일이 필요한 빙고 프로모션에서, 백엔드 데이터를 변경하지 않고 UI 상태와 애니메이션을 빠르게 반복 검증할 수 있는 별도 도구를 만들었다.

## Overview

- 환경: React · Mock Data · UI State
- 역할: FE 개발, 검증 환경 구성, 협업 지원
- 문제: 실제 조건 충족 시간이 길어 UI 검증 반복 비용이 큼
- 결과: 주요 UI 상태 및 애니메이션을 독립적으로 반복 확인 가능

## Problem

프로모션에는 다음과 같은 조건이 포함된다.

- 방송 시청 시간
- 채팅 횟수
- 출석
- 빙고 진행
- 보상
- 애니메이션

일부 조건은 실제 검증에 수시간에서 수일이 걸린다.

기능을 수정할 때마다 전체 조건을 다시 수행하기 어렵고, 기획·UI/UX·그래픽 담당자도 실제 화면 전환과 애니메이션을 함께 확인해야 했다.

## Solution

실제 서비스 데이터나 백엔드 상태를 수정하지 않는다.

대신 UI에서 필요한 상태만 독립적으로 재현하는 Mock 기반 테스트 패널을 만든다.

```text
Actual Service

Backend Data
↓
Business Logic
↓
UI
```

```text
Verification Tool

Mock UI State
────────────→ UI
```

재현 가능한 예:

```text
빙고 진행
↓
빙고 완성
↓
완성 인터랙션
↓
보상 상태
↓
애니메이션
```

이 도구가 실제 데이터를 변경하는 관리 도구로 오해되지 않도록 별도 검증 도구라는 점을 명확히 한다.

백엔드까지 포함한 별도 테스트 시스템을 만드는 대신, 제한된 일정 안에서 FE가 직접 통제할 수 있는 UI 검증 범위에 집중한다.

## Result

> 실제 미션을 수행하지 않고도 주요 UI 상태와 애니메이션을 반복 검증할 수 있게 되었고, 기획·UI/UX·그래픽 담당자와 구현 상태를 같은 화면에서 확인하는 데 활용했다.

## Main Visuals

1. Actual Data Flow vs Mock UI State
2. UI verification flow

---

# 10. Experience

홈 하단에 간단히 표시한다.

## (주)플리온

Frontend Developer  
2025.XX – 현재

- 라이브 스트리밍 서비스
- 정기 프로모션 및 이벤트
- Socket 기반 실시간 인터랙션
- 라이브 방송 페이지 및 레거시 유지보수

## 코리아런드리

Frontend Developer Intern  
2025.04 – 2025.07

- 사내 웹 서비스 및 백오피스 프론트엔드 개발
- REST API 연동

## 팀스파르타

교육 운영 PM  
2024.09 – 2025.02

- 교육 과정 운영
- 사용자 데이터 기반 문제 개선 경험

상세 경력은 별도 이력서/경력기술서에서 확인하도록 한다.

---

# 11. Closing

## What I focus on

- 화면에 보이는 증상과 실제 원인을 분리해서 추적하기
- 실시간 데이터의 의미와 유효 시간을 상태 설계에 반영하기
- 테스트하기 어려운 기능을 반복 검증 가능한 형태로 만들기
- 레거시 환경에서 변경 범위와 위험을 고려해 현실적인 개선안 선택하기

하단:

Email · GitHub · Blog

---

# 12. 디자인 방향

전체 분위기:

- 기술 문서처럼 신뢰감 있게
- 이력서보다 시각적
- 일반 포트폴리오보다 차분하게
- 장식보다 정보 계층 강조

## Layout

- max-width: 약 1040~1120px
- 본문 텍스트 max-width는 더 좁게 제한
- 섹션 사이 큰 vertical spacing
- 모바일에서는 1 column
- 데스크톱에서는 Overview와 diagram 일부를 2 column으로 구성 가능

## Typography

- 제목은 크고 명확하게
- 본문은 16~18px 수준
- line-height 넉넉하게
- 코드/기술 용어에는 monospace 사용 가능

## Color

- 흰색 또는 매우 밝은 배경
- 본문은 짙은 neutral
- border 및 보조 텍스트는 gray 계열
- Case별 강조색은 최대 1개씩만 사용하거나 전체 한 가지 accent 사용

과한 gradient, glassmorphism, neon 효과는 사용하지 않는다.

---

# 13. 컴포넌트 구조 예시

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ cases/
│  │  └─ [slug]/
│  │     └─ page.tsx
│  └─ layout.tsx
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ Container.tsx
│  │
│  ├─ portfolio/
│  │  ├─ Hero.tsx
│  │  ├─ CaseCard.tsx
│  │  ├─ CaseOverview.tsx
│  │  ├─ CaseSection.tsx
│  │  ├─ Tag.tsx
│  │  └─ ExperienceItem.tsx
│  │
│  └─ diagrams/
│     ├─ PlayerEnvironmentDiagram.tsx
│     ├─ PlayerRecoveryFlow.tsx
│     ├─ LifecycleBeforeAfter.tsx
│     ├─ ParticleGaugeDiagram.tsx
│     └─ MockUiStateDiagram.tsx
│
└─ data/
   ├─ cases.ts
   └─ experience.ts
```

---

# 14. Case 데이터 구조 예시

```ts
type CaseStudy = {
  slug: string
  index: string
  title: string
  summary: string
  tags: string[]
  environment: string[]
  role: string[]
  problem: string
  result: string
}
```

상세 본문까지 모두 데이터화할 필요는 없다.

Case별 상세 페이지는 각각 별도 컴포넌트로 관리해도 된다.

콘텐츠가 세 개뿐이므로 지나친 추상화는 피한다.

---

# 15. 구현 우선순위

## Phase 1 — Skeleton

1. Next.js 프로젝트 생성
2. Tailwind 설정
3. 기본 font / container / spacing
4. Header/Footer
5. Home 기본 구조
6. Case 상세 route 구성

## Phase 2 — Content

1. Hero
2. Selected Case cards
3. Case 01 상세
4. Case 02 상세
5. Case 03 상세
6. Experience
7. Contact

## Phase 3 — Visuals

1. Case 01 환경 교차 테스트 diagram
2. Case 01 recovery flow
3. Case 02 Before/After architecture
4. Case 02 Particle/Gauge lifecycle
5. Case 03 Mock UI state diagram

## Phase 4 — Polish

1. 모바일 반응형
2. typography 조정
3. anchor/navigation
4. SEO metadata
5. Open Graph
6. favicon
7. 접근성 점검
8. Vercel 배포

---

# 16. 구현 시 하지 않을 것

- Hero 애니메이션 제작에 시간 쓰기
- custom cursor
- scroll hijacking
- Three.js
- 불필요한 parallax
- 모든 요소 fade-in
- 지나친 카드 UI
- 여러 컬러의 gradient
- 기술 스택 percentage bar
- skill proficiency 표시
- 실제 회사 코드 공개
- 실제 회사 개발자 도구 캡처
- 실제 서비스 내부 데이터 노출

---

# 17. Codex / Work에 전달할 실행 지시문

아래 내용을 그대로 추가로 전달해도 된다.

> 위 명세를 기준으로 Next.js App Router + TypeScript + Tailwind 프로젝트를 구현해 주세요.
>
> 우선 기능보다 콘텐츠 가독성을 최우선으로 해주세요.
> 불필요한 라이브러리는 설치하지 마세요.
> DB, CMS, 인증, API는 필요하지 않습니다.
> 모든 Case Study는 회사 자산을 노출하지 않는 재구성된 설명과 diagram만 사용합니다.
>
> 홈과 세 개 Case 상세 페이지를 먼저 완성하고, 각 diagram은 CSS/Tailwind/SVG 기반의 단순한 시각자료로 구현해 주세요.
>
> 지나친 abstraction보다 수정하기 쉬운 명확한 컴포넌트 구조를 선호합니다.
> 모바일과 데스크톱 모두 읽기 쉬운 반응형 레이아웃으로 구현해 주세요.
> 최종적으로 Vercel 배포가 가능한 상태까지 구성해 주세요.