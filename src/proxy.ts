import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n/config";

function localeFromPathname(pathname: string): Locale | undefined {
  return locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

// 대만(번체) 대상이 주력이라 "zh"만 있고 지역 구분이 없는 경우 번체를
// 기본값으로 삼고, 중국 대륙/싱가포르 등 간체 지역 신호가 있을 때만
// 간체로 분기합니다.
function preferredLocale(request: NextRequest): Locale {
  const acceptLanguage = (request.headers.get("accept-language") ?? "").toLowerCase();
  if (!acceptLanguage.includes("zh")) return defaultLocale;

  const isSimplifiedRegion =
    acceptLanguage.includes("zh-cn") ||
    acceptLanguage.includes("zh-sg") ||
    acceptLanguage.includes("zh-hans");
  return isSimplifiedRegion ? "zh-CN" : "zh-TW";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트(LINE 웹훅 등)는 언어 프리픽스와 무관하게 고정 경로여야
  // 하므로 로케일 리다이렉트 대상에서 제외합니다.
  if (pathname.startsWith("/api/")) return;
  if (localeFromPathname(pathname)) return;

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
