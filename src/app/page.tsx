import Link from "next/link";
import type { Metadata } from "next";
import { cases } from "@/data/cases";
import { experience } from "@/data/experience";
import { profile, siteUrl } from "@/data/profile";
import { ContactLinks } from "@/components/layout";
export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
};
export default function Home() {
  return (
    <main id="main" className="container">
      <section className="hero" aria-labelledby="intro-title">
        <p className="eyebrow">
          <span className="status-dot" /> FRONTEND DEVELOPER / PORTFOLIO
        </p>
        <h1 id="intro-title">
          문제를 좁히고,
          <br />
          흐름을 설계합니다<span className="accent">.</span>
        </h1>
        <div className="hero-bottom">
          <div>
            <p className="identity">
              {profile.name} <span>{profile.role}</span>
            </p>
            <p className="intro">{profile.description}</p>
            <ContactLinks />
          </div>
          <div className="hero-note">
            <span className="mono">01 — 03</span>
            <p>
              재현에서 개선까지,
              <br />세 가지 문제 해결 기록
            </p>
            <a href="#cases" className="text-link">
              Case Study 살펴보기 ↓
            </a>
          </div>
        </div>
        <p className="skills mono">
          React · JavaScript · Redux · Redux-Saga · Socket
        </p>
      </section>
      <section id="cases" className="section" aria-labelledby="cases-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORK</p>
            <h2 id="cases-title">문제 해결의 기록</h2>
          </div>
          <p>
            무엇을 만들었는지보다,
            <br />
            어떻게 해결했는지.
          </p>
        </div>
        <div className="case-list">
          {cases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}/`} className="case-card">
              <div className="case-index mono">CASE / {c.index}</div>
              <div className="case-card-body">
                <p className="case-question">{c.question}</p>
                <h3>{c.title}</h3>
                <p className="case-description">{c.description}</p>
                <ul className="tags" aria-label="관련 기술">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <span className="case-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section
        id="experience"
        className="section"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-title">경험이 쌓인 곳</h2>
          </div>
          <p>운영을 이해하고, 제품을 개선합니다.</p>
        </div>
        <div>
          {experience.map((e) => (
            <article key={e.company} className="experience-row">
              <div>
                <p className="mono period">{e.period}</p>
                <h3>{e.company}</h3>
                <p className="muted">{e.role}</p>
              </div>
              <ul>
                {e.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {profile.resume ? (
          <a className="text-link" href={profile.resume}>
            이력서 / 경력기술서 보기 ↗
          </a>
        ) : (
          <p className="muted resume-note">
            상세 이력서 · 경력기술서 링크 준비 중
          </p>
        )}
      </section>
      <section
        id="contact"
        className="section closing"
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">WHAT I FOCUS ON</p>
          <h2 id="contact-title">
            좋은 화면의 뒤에는
            <br />
            분명한 이유가 있습니다.
          </h2>
          <ContactLinks />
        </div>
        <ul className="focus-list">
          {[
            "화면에 보이는 증상과 실제 원인을 분리해서 추적하기",
            "실시간 데이터의 의미와 유효 시간을 상태 설계에 반영하기",
            "테스트하기 어려운 기능을 반복 검증 가능한 형태로 만들기",
            "레거시 환경에서 변경 범위와 위험을 고려해 현실적인 개선안 선택하기",
          ].map((s, i) => (
            <li key={s}>
              <span className="mono">0{i + 1}</span>
              {s}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
