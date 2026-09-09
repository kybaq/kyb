export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  description: string;
  summary: string;
  tags: string[];
  question: string;
  environment: string;
  role: string;
  problem: string;
  result: string;
};
export const cases: CaseStudy[] = [
  {
    slug: "player",
    index: "01",
    title: "라이브 스트리밍 플레이어 재생 장애 개선",
    description:
      "특정 모바일 송출 → PC 시청 조합에서 발생한 프리징과 지연 재생 문제를 재현하고, 스트림과 플레이어 상태를 분리해 원인을 추적했습니다.",
    summary:
      "모바일 방송 중 송출자가 카메라 송출을 일정 시간 중단한 뒤 다시 시작하면 일부 PC 시청자의 플레이어가 멈추거나 과거 시점의 스트림을 재생하는 문제를 분석하고 개선했습니다.",
    tags: ["Debugging", "Media Player", "Legacy"],
    question: "문제를 어떻게 좁혀가는가",
    environment: "React · Tencent Player · flv.js",
    role: "문제 발견, 재현 조건 분석, 원인 조사, 개선안 구현",
    problem: "모바일 송출 → PC 시청 조합에서 프리징 및 과거 시점 재생",
    result: "기존 재현 조건의 반복 테스트와 이후 운영에서 동일 현상 미확인",
  },
  {
    slug: "realtime-lifecycle",
    index: "02",
    title: "실시간 이벤트 생명주기 개선",
    description:
      "화면 생명주기에 종속되어 있던 Socket 이벤트의 수명 관리를 Saga로 이동하고, 이벤트 성격에 따라 서로 다른 lifecycle 전략을 적용했습니다.",
    summary:
      "후원 조건에 따라 파티클과 Gauge가 노출되는 실시간 프로모션에서, 화면 생명주기에 종속되어 있던 이벤트 수명을 Saga 중심으로 재설계했습니다.",
    tags: ["Realtime", "State Management", "Redux-Saga"],
    question: "상태와 책임을 어떻게 설계하는가",
    environment: "React · Redux · Redux-Saga · Socket",
    role: "기존 구조 분석, 문제 원인 파악, 상태 lifecycle 재설계",
    problem: "PIP 중 쌓인 과거 이벤트가 방송방 복귀 후 뒤늦게 재생",
    result: "이벤트의 수명을 화면과 분리하고 과거 이벤트 재생 문제 제거",
  },
  {
    slug: "ui-verification",
    index: "03",
    title: "복잡한 UI 플로우를 반복 검증 가능하게 만들기",
    description:
      "실제 수행에 긴 시간이 필요한 프로모션에서 UI 상태를 독립적으로 재현할 수 있는 Mock 기반 검증 환경을 만들었습니다.",
    summary:
      "실제 수행에 수시간에서 수일이 필요한 빙고 프로모션에서, 백엔드 데이터를 변경하지 않고 UI 상태와 애니메이션을 빠르게 반복 검증할 수 있는 별도 도구를 만들었습니다.",
    tags: ["Testing", "UI State", "Collaboration"],
    question: "제한된 환경에서 검증 비용을 어떻게 줄이는가",
    environment: "React · Mock Data · UI State",
    role: "FE 개발, 검증 환경 구성, 협업 지원",
    problem: "실제 조건 충족 시간이 길어 UI 검증 반복 비용이 큼",
    result: "주요 UI 상태 및 애니메이션을 독립적으로 반복 확인 가능",
  },
];
