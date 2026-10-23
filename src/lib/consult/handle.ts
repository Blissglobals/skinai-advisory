import { replyMessage } from "@/lib/line/api";
import type { LineTextMessage, LineWebhookEvent } from "@/lib/line/types";
import { askConsultAI } from "./ai";
import { isStaffHours } from "./hours";
import { logHandoff } from "./sheet";
import { appendHistory, claimEvent, getConsent, getHistory, isHandedOff, markHandoff, setConsent } from "./store";

// 첫 인사 + 동의. 대화 내용이 해외(미국) AI 서비스로 전송되고 피부 고민 같은 건강 정보가 포함될 수 있어
// AI가 메시지를 읽기 전에 동의를 받습니다. 동의하지 않으면 AI 없이 직원 상담으로만 진행합니다.
// ponytail: 안내 문구는 번체 고정(대만 고객 위주). 다른 언어 고객이 늘면 언어별로 나눕니다.
const CONSENT_TEXT =
  "您好！這裡是 ZeroLab 零顏 線上肌膚分析諮詢。\n" +
  "我們先由 AI 諮詢員回覆一般問題（AI 回覆僅供參考，不是診斷），預約與到診相關問題會轉由專人處理。\n\n" +
  "使用 AI 諮詢時，您的訊息（可能包含肌膚困擾等健康相關資訊）會傳送至海外（美國 Anthropic）的 AI 服務處理。" +
  "詳細內容請見隱私權政策：https://skin.zerolabclinic.com/zh-TW/privacy\n\n" +
  "請問您同意嗎？";

const CONSENT_REPLY: LineTextMessage = {
  type: "text",
  text: CONSENT_TEXT,
  quickReply: {
    items: [
      { type: "action", action: { type: "postback", label: "同意", data: "consent=yes", displayText: "同意" } },
      { type: "action", action: { type: "postback", label: "不同意", data: "consent=no", displayText: "不同意" } },
    ],
  },
};

const AFTER_CONSENT = "謝謝您！請直接輸入想詢問的內容。";
const NO_CONSENT =
  "了解，我們不會使用 AI 處理您的訊息。將由專人回覆（韓國時間 10:00～18:00，其他時間的訊息會在隔天依序回覆）。";
const AI_DOWN =
  "目前 AI 諮詢暫時無法使用，已為您轉由專人回覆（韓國時間 10:00～18:00，其他時間的訊息會在隔天依序回覆）。";

export async function handleLineEvent(event: LineWebhookEvent): Promise<void> {
  const userId = event.source.userId;
  if (!userId || event.source.type !== "user") return;

  if (event.type === "follow" && "replyToken" in event) {
    await replyMessage(event.replyToken, [CONSENT_REPLY]);
    return;
  }

  if (event.type === "postback" && "postback" in event) {
    const data = event.postback.data;
    if (data === "consent=yes" || data === "consent=no") {
      await setConsent(userId, data === "consent=yes" ? "yes" : "no");
      if (data === "consent=no") await markHandoff(userId);
      await replyMessage(event.replyToken, [{ type: "text", text: data === "consent=yes" ? AFTER_CONSENT : NO_CONSENT }]);
    }
    return;
  }

  if (event.type !== "message" || !("message" in event) || event.message.type !== "text" || !("text" in event.message)) return;
  if (!(await claimEvent(event.message.id))) return;

  const text = event.message.text;
  // 직원 상담 중이거나 AI 사용에 동의하지 않은 고객은 AI가 끼어들지 않습니다(직원이 관리 화면에서 답변).
  if (await isHandedOff(userId)) return;
  const consent = await getConsent(userId);
  if (consent === "no") return;
  if (consent !== "yes") {
    await replyMessage(event.replyToken, [CONSENT_REPLY]);
    return;
  }

  const staffHours = isStaffHours();
  let result;
  try {
    result = await askConsultAI(await getHistory(userId), text, staffHours);
  } catch (error) {
    // 사용 한도 초과·장애 시: AI를 멈추고 직원 상담으로 넘깁니다.
    console.error("[consult] AI failed", error);
    await markHandoff(userId);
    await replyMessage(event.replyToken, [{ type: "text", text: AI_DOWN }]);
    await logHandoff({
      at: new Date().toISOString(), userId, category: "ai_error", staffHours,
      name: null, visitDate: null, stay: null, concern: null, note: "AI 응답 실패로 직원 연결", lastMessage: text,
    });
    return;
  }

  await replyMessage(event.replyToken, [{ type: "text", text: result.reply }]);
  await appendHistory(userId, { role: "user", text }, { role: "assistant", text: result.reply });

  if (result.handoff) {
    await markHandoff(userId);
    await logHandoff({
      at: new Date().toISOString(), userId, category: result.category, staffHours,
      name: result.intake.name, visitDate: result.intake.visit_date, stay: result.intake.stay,
      concern: result.intake.concern, note: result.intake.note, lastMessage: text,
    });
  }
}
