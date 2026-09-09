import type { ReactNode } from "react";
import {
  PlayerEnvironmentDiagram,
  PlayerRecoveryFlow,
  LifecycleBeforeAfter,
  ParticleGaugeDiagram,
  MockUiStateDiagram,
  VerificationFlow,
} from "./diagrams";
export function CaseSection({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="case-section">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export function CaseVisual({ slug }: { slug: string }) {
  return slug === "player" ? (
    <PlayerEnvironmentDiagram />
  ) : slug === "realtime-lifecycle" ? (
    <LifecycleBeforeAfter />
  ) : (
    <MockUiStateDiagram />
  );
}
export function CaseContent({ slug }: { slug: string }) {
  if (slug === "player")
    return (
      <>
        <CaseSection
          id="problem"
          label="01 / PROBLEM"
          title="데이터는 도착하는데, 화면은 멈췄습니다."
        >
          <p>
            송출자가 카메라 송출을 일정 시간 중단했다가 다시 시작하면 일부 PC
            시청자에게 프리징 또는 과거 시점의 재생이 발생했습니다. 같은 방송의
            모바일 시청은 정상이었고, 문제가 발생한 PC에서도 .flv 데이터 수신은
            계속되고 있었습니다.
          </p>
        </CaseSection>
        <CaseSection
          id="solution"
          label="02 / INVESTIGATION & SOLUTION"
          title="송출 환경에서 플레이어 상태로, 범위를 좁혔습니다."
        >
          <p>
            송출·시청 환경을 교차 테스트해 모바일 송출 → PC 시청에서만 반복
            재현되는 것을 확인했습니다. 데이터 수신 여부와 실제 재생 상태를
            분리해 관찰한 뒤, PC Player의 stream 처리와 buffer / timeline으로
            조사 범위를 좁혔습니다. 이어 Tencent Player 내부의 flv.js까지
            확인했습니다.
          </p>
          <h3>01. 필요한 flv.js 수정만 선별 반영</h3>
          <p>
            기존 Tencent Player는 flv.js 1.5 계열을 사용했습니다. 1.6에서 관련
            동작이 개선된 것을 확인하고, 전체 버전 교체 대신 필요한 수정만
            선별해 반영하여 영향 범위를 최소화했습니다.
          </p>
          <h3>02. Player 상태에 맞는 복구 전략</h3>
          <p>
            카메라 송출이 중단되면 PC의 데이터 수신량이 크게 감소하고 플레이어는
            기존 buffer를 계속 소비했습니다. buffer가 소진된 이후에는 buffer
            관련 값과 재생 상태를 함께 확인해 복구 방식을 나누었습니다.
          </p>
          <PlayerRecoveryFlow />
          <p>
            buffer 관련 값이 비정상인 상태에서 재생 상태로 재진입하면 Player를
            destroy / recreate했습니다. buffer가 정상이고 중단 상태가 유지되는
            경우에는 송출 재개 시 최신 live timeline보다 약간 이전 위치로
            seek했습니다.
          </p>
        </CaseSection>
        <CaseSection
          id="result"
          label="03 / RESULT"
          title="같은 조건에서 다시 확인했습니다."
        >
          <blockquote>
            개선 적용 후 기존 재현 조건으로 반복 테스트했을 때 동일 현상이 다시
            발생하지 않았으며, 이후 실제 서비스 운영 과정에서도 명세 작성
            시점까지 같은 문제가 다시 확인되지 않았습니다.
          </blockquote>
          <p className="muted">
            관찰 결과는 제공된 경험 명세에 근거하며, 정량 지표나 확인되지 않은
            성과 수치는 추가하지 않았습니다.
          </p>
        </CaseSection>
      </>
    );
  if (slug === "realtime-lifecycle")
    return (
      <>
        <CaseSection
          id="problem"
          label="01 / CONTEXT & PROBLEM"
          title="화면은 사라졌지만, 이벤트는 남았습니다."
        >
          <p>
            후원 금액이 특정 조건을 충족하면 Socket 이벤트로 파티클과 Gauge가
            노출됩니다. 파티클은 시청자가 클릭해 획득하고, Gauge는 누적 후원과
            목표 진행 상황을 표시합니다. 이 인터랙션에서는 실시간성 자체가
            이벤트 규칙의 일부였습니다.
          </p>
          <p>
            PIP 전환 시 컴포넌트는 unmount되지만 Socket 수신은 계속되었습니다.
            Redux에 이벤트가 쌓이는 동안 소비 로직은 컴포넌트와 함께 사라졌고,
            방송방으로 돌아오면 과거 이벤트가 뒤늦게 재생되었습니다.
          </p>
          <blockquote>
            실시간 이벤트의 생명주기와 화면의 생명주기는 서로 다른데, 기존
            구조에서는 둘이 묶여 있었습니다.
          </blockquote>
        </CaseSection>
        <CaseSection
          id="solution"
          label="02 / SOLUTION"
          title="이벤트의 시간은 Saga가 관리합니다."
        >
          <p>
            이벤트 수명의 기준을 Component mount 상태에서 Socket 수신 시점 +
            서버 duration으로 변경했습니다. Saga는 Store를 갱신하고 Lifecycle
            Task를 시작하며, 시간이 지나면 이벤트를 만료·제거합니다. React
            Component는 현재 상태를 표현하는 역할에 집중합니다.
          </p>
          <ParticleGaugeDiagram />
          <h3>Particle · 수신 시점부터 독립적으로</h3>
          <p>
            각 파티클은 수신 시점부터 수명을 계산하고 서버 duration이 지나면
            제거합니다. PIP에서 놓친 파티클은 복귀 후 다시 표시하지 않습니다.
          </p>
          <h3>Gauge · 최신 누적 상태를 기준으로</h3>
          <p>
            목표 달성 후 약 30초 대기하는 동안 새 후원이 들어오면 이전 task를
            취소하고 다시 30초부터 시작합니다. 추가 후원이 없으면 다음 이벤트로
            진행합니다.
          </p>
          <p>
            마지막 패킷에 최신 누적 상태가 담긴다는 서버 계약을 확인한 뒤{" "}
            <code>takeLatest</code>를 적용했습니다. 모든 이벤트에 같은 전략을
            적용하지 않고, 이벤트의 의미에 따라 수명 관리를 구분했습니다.
          </p>
        </CaseSection>
        <CaseSection
          id="result"
          label="03 / RESULT"
          title="화면과 이벤트의 책임이 명확해졌습니다."
        >
          <ul>
            <li>
              PIP 중 발생한 과거 이벤트가 복귀 후 재생되는 문제를 제거했습니다.
            </li>
            <li>이벤트 lifetime을 컴포넌트 mount 상태와 분리했습니다.</li>
            <li>
              React Component는 현재 상태를 표현하는 역할에 집중하게 되었습니다.
            </li>
          </ul>
        </CaseSection>
      </>
    );
  return (
    <>
      <CaseSection
        id="problem"
        label="01 / PROBLEM"
        title="한 번의 화면 확인에, 수시간에서 수일."
      >
        <p>
          빙고 프로모션은 방송 시청 시간, 채팅 횟수, 출석 등의 조건과 빙고 진행,
          보상, 애니메이션이 연결된 UI였습니다. 일부 조건은 실제 수행에
          수시간에서 수일이 필요해, 기능을 수정할 때마다 전체 조건을 반복하기
          어려웠습니다.
        </p>
        <p>
          기획·UI/UX·그래픽 담당자도 실제 화면 전환과 애니메이션을 함께 확인해야
          했습니다. 반복 확인의 비용을 줄이는 검증 환경이 필요했습니다.
        </p>
      </CaseSection>
      <CaseSection
        id="solution"
        label="02 / SOLUTION"
        title="FE가 통제할 수 있는 상태부터 재현했습니다."
      >
        <p>
          실제 서비스 데이터나 백엔드 상태를 변경하지 않고, UI에 필요한 상태만
          독립적으로 재현하는 Mock 기반 테스트 패널을 만들었습니다. 실제
          데이터를 수정하는 관리 도구가 아닌 별도 UI 검증 도구입니다.
        </p>
        <VerificationFlow />
        <p>
          빙고 진행부터 완성 인터랙션, 보상 상태, 애니메이션까지 필요한 상태를
          직접 구성해 반복 확인했습니다. 백엔드까지 포함한 별도 테스트 시스템을
          만들기보다, 제한된 일정 안에서 FE가 직접 통제할 수 있는 UI 검증 범위에
          집중했습니다.
        </p>
        <p className="callout">
          검증 범위: 화면 상태와 전환, 애니메이션. 실제 미션 집계와 백엔드
          연동의 정확성을 검증하는 통합 테스트를 대체하지 않습니다.
        </p>
      </CaseSection>
      <CaseSection
        id="result"
        label="03 / RESULT"
        title="같은 화면에서, 반복해서 확인할 수 있게."
      >
        <blockquote>
          실제 미션을 수행하지 않고도 주요 UI 상태와 애니메이션을 반복 검증할 수
          있게 되었고, 기획·UI/UX·그래픽 담당자와 구현 상태를 같은 화면에서
          확인하는 데 활용했습니다.
        </blockquote>
      </CaseSection>
    </>
  );
}
