import { Redis } from "@upstash/redis";

// 사용자별 대화 상태(Upstash Redis). 키는 LINE 사용자 ID 기준입니다.
// - consent:{id}   민감정보·국외이전 동의 여부 ("yes" | "no")
// - history:{id}   최근 대화(AI 문맥용), 최대 HISTORY_LIMIT개, 30일 후 만료
// - handoff:{id}   직원 상담 중 표시. 있는 동안 AI는 답하지 않습니다(24시간 후 자동 해제)
const HISTORY_LIMIT = 16;
const HISTORY_TTL_SEC = 60 * 60 * 24 * 30;
export const HANDOFF_TTL_SEC = 60 * 60 * 24;

export type Turn = { role: "user" | "assistant"; text: string };

let client: Redis | null = null;
function redis(): Redis {
  client ??= Redis.fromEnv();
  return client;
}

export async function getConsent(userId: string): Promise<"yes" | "no" | null> {
  return redis().get<"yes" | "no">(`consent:${userId}`);
}

export async function setConsent(userId: string, value: "yes" | "no"): Promise<void> {
  await redis().set(`consent:${userId}`, value);
}

export async function getHistory(userId: string): Promise<Turn[]> {
  return (await redis().lrange<Turn>(`history:${userId}`, 0, -1)) ?? [];
}

export async function appendHistory(userId: string, ...turns: Turn[]): Promise<void> {
  const key = `history:${userId}`;
  await redis().rpush(key, ...turns);
  await redis().ltrim(key, -HISTORY_LIMIT, -1);
  await redis().expire(key, HISTORY_TTL_SEC);
}

export async function isHandedOff(userId: string): Promise<boolean> {
  return (await redis().exists(`handoff:${userId}`)) === 1;
}

export async function markHandoff(userId: string): Promise<void> {
  await redis().set(`handoff:${userId}`, Date.now(), { ex: HANDOFF_TTL_SEC });
}

// 같은 메시지가 재전송(LINE 재시도)돼도 한 번만 처리합니다.
export async function claimEvent(eventId: string): Promise<boolean> {
  return (await redis().set(`event:${eventId}`, 1, { nx: true, ex: 60 * 60 })) === "OK";
}
