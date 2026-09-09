import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container section">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 홈에서 Case Study를 살펴보세요.</p>
      <Link className="text-link" href="/">
        홈으로 돌아가기 →
      </Link>
    </main>
  );
}
