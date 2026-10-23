import type { LineTextMessage } from "./types";

// 답장(reply)은 무료이고, 웹훅으로 받은 replyToken으로 1회만 쓸 수 있습니다(약 1분 유효).
export async function replyMessage(replyToken: string, messages: LineTextMessage[]): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  const res = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ replyToken, messages: messages.slice(0, 5) }),
  });
  if (!res.ok) throw new Error(`LINE reply failed: ${res.status} ${await res.text()}`);
}
