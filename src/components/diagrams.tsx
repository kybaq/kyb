import type { ReactNode } from "react";
function Figure({
  title,
  children,
  caption,
}: {
  title: string;
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="diagram">
      <div className="diagram-heading">
        <span className="diagram-dot" />
        {title}
      </div>
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow">
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  );
}
export function PlayerEnvironmentDiagram() {
  return (
    <Figure
      title="01 / 송출·시청 환경 교차 테스트"
      caption="같은 송출의 모바일 시청은 정상이고 PC의 데이터 수신도 지속되어, PC 플레이어의 처리 상태로 조사 범위를 좁혔습니다."
    >
      <table>
        <caption className="sr-only">송출과 시청 환경별 재현 결과</caption>
        <thead>
          <tr>
            <th scope="col">송출 → 시청</th>
            <th scope="col">관찰 결과</th>
          </tr>
        </thead>
        <tbody>
          <tr className="highlight">
            <th scope="row">모바일 → PC</th>
            <td>프리징 / 과거 시점 재생</td>
          </tr>
          <tr>
            <th scope="row">PC → PC</th>
            <td>미재현</td>
          </tr>
          <tr>
            <th scope="row">모바일 → 모바일</th>
            <td>정상 재생</td>
          </tr>
        </tbody>
      </table>
      <div className="diagram-note">
        PC의 .flv 수신 지속 → buffer / timeline 관찰 → Tencent Player 내부
        flv.js 조사
      </div>
    </Figure>
  );
}
export function PlayerRecoveryFlow() {
  return (
    <Figure
      title="02 / Player 상태에 따른 복구"
      caption="카메라 송출 중단 후 buffer 소진을 관찰하고, 상태에 따라 서로 다른 복구 방식을 적용했습니다."
    >
      <div className="flow-origin">
        수신량 감소 → 기존 buffer 소비 → Player 중단 → 상태 확인
      </div>
      <div className="diagram-columns">
        <div>
          <h4>A. buffer 관련 값 비정상</h4>
          <Flow
            steps={["재생 상태 재진입", "Player destroy", "Player recreate"]}
          />
        </div>
        <div>
          <h4>B. buffer 정상</h4>
          <Flow
            steps={[
              "중단 상태 유지",
              "카메라 송출 재개",
              "최신 live timeline보다 약간 이전으로 seek",
            ]}
          />
        </div>
      </div>
    </Figure>
  );
}
export function LifecycleBeforeAfter() {
  return (
    <Figure
      title="01 / 이벤트 수명의 책임 이동"
      caption="화면이 사라져도 이벤트의 시간은 흐릅니다. 수신 시점과 서버 duration을 기준으로 Saga가 이벤트를 종료합니다."
    >
      <div className="diagram-columns">
        <div>
          <h4>Before · 화면에 종속</h4>
          <Flow
            steps={[
              "Socket → Saga",
              "Redux Store",
              "React Component → Local State",
              "Timer / Animation",
              "Redux Update",
            ]}
          />
          <p className="diagram-note">
            PIP → unmount → 소비 중단 → 과거 이벤트 축적
          </p>
        </div>
        <div>
          <h4>After · 이벤트에 종속</h4>
          <Flow
            steps={[
              "Socket → Redux-Saga",
              "Store Update + Lifecycle Task",
              "duration 경과",
              "expire / remove",
            ]}
          />
          <p className="diagram-note">
            React Component → 현재 상태 Render only
          </p>
        </div>
      </div>
    </Figure>
  );
}
export function ParticleGaugeDiagram() {
  return (
    <Figure
      title="02 / 서로 다른 두 가지 lifecycle"
      caption="Gauge의 takeLatest는 마지막 패킷이 최신 누적 상태를 보장한다는 서버 계약을 전제로 합니다."
    >
      <div className="diagram-columns">
        <div>
          <h4>Particle / 개별 수명</h4>
          <Flow
            steps={[
              "Socket 수신 시점",
              "서버 duration 동안 유효",
              "각 이벤트 독립 제거",
            ]}
          />
          <p>화면 복귀 시 이미 만료된 파티클은 표시하지 않습니다.</p>
        </div>
        <div>
          <h4>Gauge / 최신 상태</h4>
          <Flow
            steps={[
              "목표 달성 후 최신 packet 반영",
              "약 30초 대기",
              "추가 후원 없음 → 다음 이벤트",
            ]}
          />
          <p className="diagram-note">
            새 packet → 이전 task cancel → 다시 30초
          </p>
        </div>
      </div>
    </Figure>
  );
}
export function MockUiStateDiagram() {
  return (
    <Figure
      title="01 / 데이터 대신 UI 상태를 재현"
      caption="실제 서비스 화면이나 내부 코드가 아닌, 포트폴리오용으로 재구성한 구조입니다. 검증 도구는 백엔드 데이터를 변경하지 않습니다."
    >
      <div className="diagram-columns">
        <div>
          <h4>Actual Service</h4>
          <Flow steps={["Backend Data", "Business Logic", "UI"]} />
        </div>
        <div>
          <h4>Verification Tool</h4>
          <Flow
            steps={[
              "Mock UI State",
              "UI 직접 재현",
              "화면 전환 · 애니메이션 확인",
            ]}
          />
        </div>
      </div>
    </Figure>
  );
}
export function VerificationFlow() {
  return (
    <Figure
      title="02 / 반복 검증 흐름"
      caption="실제 미션 수행을 기다리지 않고 각 UI 상태를 반복 확인합니다."
    >
      <Flow
        steps={[
          "빙고 진행",
          "빙고 완성",
          "완성 인터랙션",
          "보상 상태",
          "애니메이션",
        ]}
      />
    </Figure>
  );
}
