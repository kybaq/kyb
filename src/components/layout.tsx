import Link from "next/link";
import { contacts, profile } from "@/data/profile";
export function ContactLinks() {
  return (
    <div className="contact-links">
      {contacts.map(({ label, href }) =>
        href ? (
          <a key={label} href={href}>
            {label} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="pending" key={label}>
            {label} <small>준비 중</small>
          </span>
        ),
      )}
    </div>
  );
}
export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`${profile.name} 포트폴리오 홈`}
        >
          kyb<span className="accent">.</span>
        </Link>
        <nav aria-label="주요 메뉴">
          <Link href="/#cases">Cases</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact">
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Built with care. Focused on the why.</span>
      <a href="#top">맨 위로 ↑</a>
    </footer>
  );
}
