import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n/config";

function localeFromPathname(pathname: string): Locale | undefined {
  return locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

// 브라우저의 첫 번째(가장 선호하는) 언어만 봅니다. 한국어 폰도 보조 언어로
// en·zh를 함께 보내는 경우가 많아서, 포함 여부로 판단하면 잘못 분기됩니다.
// "zh"만 있고 지역 구분이 없으면 대만 대상이 주력이라 번체로 보냅니다.
function preferredLocale(request: NextRequest): Locale {
  const primary = (request.headers.get("accept-language") ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase();

  if (primary.startsWith("zh")) {
    const isSimplified =
      primary.startsWith("zh-cn") || primary.startsWith("zh-sg") || primary.startsWith("zh-hans");
    return isSimplified ? "zh-CN" : "zh-TW";
  }
  if (primary.startsWith("en")) return "en";
  if (primary.startsWith("ko")) return "ko";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트(LINE 웹훅 등)는 언어 프리픽스와 무관한 고정 경로여야 하므로
  // 리다이렉트 대상에서 제외합니다.
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
