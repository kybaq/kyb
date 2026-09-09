import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { profile, siteUrl } from "@/data/profile";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${profile.name} | Frontend Developer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.description,
  openGraph: {
    title: `${profile.name} | Frontend Developer`,
    description: profile.description,
    type: "website",
    locale: "ko_KR",
    siteName: `${profile.name} 포트폴리오`,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | Frontend Developer`,
    description: profile.description,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body id="top">
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
