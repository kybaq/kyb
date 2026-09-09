// 미확정 정보는 이 파일에서만 수정합니다. null 링크는 클릭 불가능한 준비 중 표시입니다.
export const profile = {
  name: "김영범",
  role: "Frontend Developer",
  description:
    "실시간 서비스와 레거시 환경에서 문제를 재현하고, 상태의 흐름과 책임을 분석해 개선하는 프론트엔드 개발자입니다.",
  email: null as string | null,
  github: "https://github.com/kybaq",
  blog: null as string | null,
  resume: null as string | null,
  currentJobStart: "2025.XX",
};
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configuredUrl
  ? new URL(configuredUrl).origin
  : undefined;
export const contacts = [
  { label: "Email", href: profile.email ? `mailto:${profile.email}` : null },
  { label: "GitHub", href: profile.github },
  { label: "Blog", href: profile.blog },
];
