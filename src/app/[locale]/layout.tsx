import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Serif_KR,
  Noto_Serif_SC,
  Noto_Serif_TC,
} from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 홈페이지(.site-theme)용 한글 서체. 한글 글리프는 Google이 unicode-range로
// 잘라 필요한 조각만 받으므로 미리 불러오기(preload)는 끕니다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: "variable",
  preload: false,
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["500", "600", "700"],
  preload: false,
});

// 중국어 페이지는 한국어 서체로 그리면 한자 모양이 어색하거나(번체) 글자가
// 빠져 시스템 서체로 섞입니다(간체). globals.css에서 html의 lang으로 골라 씁니다.
const notoSansTc = Noto_Sans_TC({ variable: "--font-noto-sans-tc", weight: "variable", preload: false });
const notoSerifTc = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["500", "600", "700"],
  preload: false,
});
const notoSansSc = Noto_Sans_SC({ variable: "--font-noto-sans-sc", weight: "variable", preload: false });
const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["500", "600", "700"],
  preload: false,
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#10161d" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const htmlLang: Locale = locale;

  return (
    <html
      lang={htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} ${notoSerifKr.variable} ${notoSansTc.variable} ${notoSerifTc.variable} ${notoSansSc.variable} ${notoSerifSc.variable} h-full antialiased`}
    >
      <body className="flex min-h-full touch-manipulation flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
