"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

// 이 페이지는 LIFF 엔드포인트로 등록된 고정 URL이라 [locale] 라우팅 밖에
// 있습니다. 그래서 URL의 locale 쿼리 파라미터로 직접 문구를 선택합니다.
const MESSAGES = {
  ko: {
    connecting: "연결 중...",
    success: "연결이 완료됐어요! 곧 상세 리포트를 보내드릴게요.",
    error: "연결에 실패했어요. 다시 시도해주세요.",
    expired: "세션이 만료됐어요. 앱에서 다시 시도해주세요.",
  },
  "zh-TW": {
    connecting: "連接中...",
    success: "連接完成!很快就會為您發送詳細報告。",
    error: "連接失敗,請重試。",
    expired: "工作階段已過期,請重新從應用程式操作。",
  },
  "zh-CN": {
    connecting: "连接中...",
    success: "连接完成!很快就会为您发送详细报告。",
    error: "连接失败,请重试。",
    expired: "会话已过期,请重新从应用操作。",
  },
} as const;

type Status = "connecting" | "success" | "error" | "expired";
type MessageSet = (typeof MESSAGES)[keyof typeof MESSAGES];

const TOKEN_STORAGE_KEY = "liff-report-token";
const LOCALE_STORAGE_KEY = "liff-report-locale";

function resolveMessages(locale: string | null): MessageSet {
  if (locale === "zh-TW" || locale === "zh-CN") return MESSAGES[locale];
  return MESSAGES.ko;
}

// LINE이 liff.line.me 링크로 접속시킬 때, 우리가 붙인 쿼리스트링(?token=...)을
// 엔드포인트 URL에 그대로 남기지 않고 "liff.state"라는 파라미터 안에
// 한 번 더 인코딩해서 넘겨줍니다. 그래서 최상위 쿼리에서 바로 못 찾고
// liff.state를 한 번 더 까봐야 합니다.
function extractTokenAndLocale(): { token: string | null; locale: string | null } {
  const params = new URLSearchParams(window.location.search);
  let token = params.get("token");
  let locale = params.get("locale");

  if (!token) {
    const liffState = params.get("liff.state");
    if (liffState) {
      const decoded = liffState.startsWith("?") ? liffState.slice(1) : liffState;
      const stateParams = new URLSearchParams(decoded);
      token = stateParams.get("token");
      locale = stateParams.get("locale") ?? locale;
    }
  }

  return { token, locale };
}

export default function LiffReportPage() {
  const [status, setStatus] = useState<Status>("connecting");
  const [messages, setMessages] = useState<MessageSet>(MESSAGES.ko);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // liff.login()이 로그인을 위해 페이지를 한 번 리다이렉트했다가 돌아오면
    // URL의 커스텀 쿼리 파라미터가 유지되지 않을 수 있어서, sessionStorage에
    // 백업해두고 재진입 시 거기서 복구합니다.
    let { token, locale } = extractTokenAndLocale();

    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    }

    if (locale) {
      sessionStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } else {
      locale = sessionStorage.getItem(LOCALE_STORAGE_KEY);
    }

    async function run() {
      setMessages(resolveMessages(locale));

      if (!token) {
        setStatus("error");
        setDebugInfo("no token in URL or sessionStorage");
        return;
      }
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        await liff.init({ liffId: liffId! });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();

        const res = await fetch("/api/line/link-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, lineUserId: profile.userId }),
        });

        if (res.status === 404) {
          setStatus("expired");
          return;
        }
        if (!res.ok) {
          const body = await res.text();
          setStatus("error");
          setDebugInfo(`link-session ${res.status}: ${body}`);
          return;
        }

        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        sessionStorage.removeItem(LOCALE_STORAGE_KEY);
        setStatus("success");
      } catch (e) {
        console.error("[liff/report] failed", e);
        setStatus("error");
        setDebugInfo(e instanceof Error ? `${e.name}: ${e.message}` : String(e));
      }
    }

    run();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-sm text-foreground/80">{messages[status]}</p>
      {/* 임시 디버그 표시 — 원인 확인되면 제거 예정 */}
      {debugInfo && (
        <p className="mt-2 max-w-xs break-words rounded bg-black/5 p-2 text-[11px] text-foreground/50">
          {debugInfo}
        </p>
      )}
    </div>
  );
}
