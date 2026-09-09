import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases } from "@/data/cases";
import { profile, siteUrl } from "@/data/profile";
import { CaseContent, CaseVisual } from "@/components/case-content";
export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  if (!c) notFound();
  const url = siteUrl ? `${siteUrl}/cases/${slug}/` : undefined;
  return {
    title: c.title,
    description: c.summary,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${c.title} | ${profile.name}`,
      description: c.summary,
      type: "article",
      locale: "ko_KR",
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary", title: c.title, description: c.summary },
  };
}
export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  if (!c) notFound();
  const next = cases[(cases.indexOf(c) + 1) % cases.length];
  return (
    <main id="main" className="container case-page">
      <Link className="back-link" href="/#cases">
        ← Selected Cases
      </Link>
      <article>
        <header className="case-hero">
          <p className="eyebrow">
            CASE STUDY / {c.index}{" "}
            <span className="case-hero-question">{c.question}</span>
          </p>
          <h1>{c.title}</h1>
          <p className="case-summary">{c.summary}</p>
          <ul className="tags">
            {c.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </header>
        <dl className="overview">
          {[
            ["환경", c.environment],
            ["역할", c.role],
            ["문제", c.problem],
            ["결과", c.result],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <nav className="case-nav" aria-label="Case 본문 목차">
          <a href="#problem">01 문제</a>
          <a href="#solution">02 판단과 해결</a>
          <a href="#result">03 결과</a>
        </nav>
        <CaseVisual slug={slug} />
        <div className="case-prose">
          <CaseContent slug={slug} />
        </div>
        <p className="source-note">
          회사 소스코드·내부 데이터·서비스 캡처를 사용하지 않고 경험을
          재구성했습니다.
        </p>
      </article>
      <Link className="next-case" href={`/cases/${next.slug}/`}>
        <span className="eyebrow">NEXT CASE / {next.index}</span>
        <h2>
          {next.title} <span aria-hidden="true">↗</span>
        </h2>
      </Link>
    </main>
  );
}
