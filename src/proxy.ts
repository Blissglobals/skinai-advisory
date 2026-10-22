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

// 출시 전 잠금: SITE_LOCK_PASSWORD 환경변수가 있는 배포에서만 비밀번호를 묻습니다(아이디는 아무거나).
// 출시할 때 Vercel에서 이 변수를 지우면 풀립니다. API(LINE 웹훅 등)는 LINE 서버가 불러야 해서 matcher에서 빠져 있습니다.
function lockedResponse(request: NextRequest): NextResponse | undefined {
  const password = process.env.SITE_LOCK_PASSWORD;
  if (!password) return;
  const [scheme, encoded] = (request.headers.get("authorization") ?? "").split(" ");
  if (scheme === "Basic" && encoded) {
    try {
      const decoded = atob(encoded);
      if (decoded.slice(decoded.indexOf(":") + 1) === password) return;
    } catch {
      // 잘못된 인코딩이면 아래에서 다시 묻습니다.
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Bliss Globals (pre-launch)", charset="UTF-8"' },
  });
}

export function proxy(request: NextRequest) {
  const locked = lockedResponse(request);
  if (locked) return locked;

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
