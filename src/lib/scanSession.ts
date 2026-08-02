import { randomUUID } from "crypto";
import { saveScanSession, getScanSession } from "./sessionStore";
import type { Locale } from "@/i18n/config";
import type { DeepScanResult } from "./analysis/types";

export interface ScanSessionData {
  deepScan: DeepScanResult;
  age: number | null;
  locale: Locale;
  lineUserId?: string;
  createdAt: number;
}

// 사용자가 "라인으로 리포트 받기"를 누른 뒤 실제로 친구추가를 완료할 때까지
// 기다려주는 유예 시간입니다. 이 시간이 지나면 세션은 자동으로 사라집니다.
const SESSION_TTL_SECONDS = 60 * 30;

export async function createScanSession(
  data: Omit<ScanSessionData, "createdAt">
): Promise<string> {
  const token = randomUUID();
  await saveScanSession(token, { ...data, createdAt: Date.now() }, SESSION_TTL_SECONDS);
  return token;
}

export async function linkLineUser(
  token: string,
  lineUserId: string
): Promise<ScanSessionData | null> {
  const session = await getScanSession<ScanSessionData>(token);
  if (!session) return null;

  const updated: ScanSessionData = { ...session, lineUserId };
  await saveScanSession(token, updated, SESSION_TTL_SECONDS);
  return updated;
}

export async function getScanSessionData(
  token: string
): Promise<ScanSessionData | null> {
  return getScanSession<ScanSessionData>(token);
}
