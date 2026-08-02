"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

// 이 페이지는 LIFF 엔드포인트로 등록된 고정 URL이라 [locale] 라우팅 밖에
// 있습니다. 그래서 URL의 locale 쿼리 파라미터로 직접 문구를 선택합니다.
// 라인 공식 계정 Basic ID. 친구 추가가 안 된 사용자에게 추가 유도 링크를
// 보여줄 때 사용합니다 (https://line.me/R/ti/p/@아이디 형식은 라인이 공식
// 문서에서 제공하는 "친구 추가" 딥링크 형식입니다).
const LINE_BASIC_ID = "@995xwpnh";
const ADD_FRIEND_URL = `https://line.me/R/ti/p/${LINE_BASIC_ID}`;

const MESSAGES = {
  ko: {
    connecting: "연결 중...",
    success: "연결이 완료됐어요!",
    successDetail: "상세 리포트는 라인 메시지로 보내드려요. 이 창은 닫으시고, 잠시 후 라인 채팅에서 확인해주세요.",
    close: "창 닫기",
    notFriendNotice: "아직 친구 추가가 안 되어 있어요. 추가해두시면 리포트 외에도 다양한 안내를 받아보실 수 있어요.",
    addFriend: "친구 추가하기",
    error: "연결에 실패했어요. 다시 시도해주세요.",
    expired: "세션이 만료됐어요. 앱에서 다시 시도해주세요.",
  },
  "zh-TW": {
    connecting: "連接中...",
    success: "連接完成!",
    successDetail: "詳細報告會透過LINE訊息傳送給您。請關閉此視窗,稍後在LINE聊天室確認。",
    close: "關閉視窗",
    notFriendNotice: "您尚未加入好友。加入後除了報告,還能收到更多資訊。",
    addFriend: "加入好友",
    error: "連接失敗,請重試。",
    expired: "工作階段已過期,請重新從應用程式操作。",
  },
  "zh-CN": {
    connecting: "连接中...",
    success: "连接完成!",
    successDetail: "详细报告会通过LINE消息发送给您。请关闭此窗口,稍后在LINE聊天中确认。",
    close: "关闭窗口",
    notFriendNotice: "您尚未添加好友。添加后除了报告,还能收到更多资讯。",
    addFriend: "添加好友",
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
  const [isFriend, setIsFriend] = useState<boolean | null>(null);

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
          setStatus("error");
          return;
        }

        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        sessionStorage.removeItem(LOCALE_STORAGE_KEY);
        setStatus("success");

        try {
          const friendship = await liff.getFriendship();
          setIsFriend(friendship.friendFlag);
        } catch (e) {
          console.error("[liff/report] getFriendship failed", e);
        }
      } catch (e) {
        console.error("[liff/report] failed", e);
        setStatus("error");
      }
    }

    run();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-sm text-foreground/80">{messages[status]}</p>
      {status === "success" && (
        <>
          <p className="text-sm text-foreground/80">{messages.successDetail}</p>
          {isFriend === false && (
            <>
              <p className="text-sm font-medium text-foreground">{messages.notFriendNotice}</p>
              <a
                href={ADD_FRIEND_URL}
                className="rounded-full bg-[#06C755] px-5 py-2 text-sm font-medium text-white"
              >
                {messages.addFriend}
              </a>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              if (liff.isInClient()) liff.closeWindow();
            }}
            className="mt-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
          >
            {messages.close}
          </button>
        </>
      )}
    </div>
  );
}
