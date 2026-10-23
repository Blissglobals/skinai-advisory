// 직원 연결 기록을 구글 시트에 한 줄씩 남깁니다.
// 시트에 붙인 Apps Script 웹앱 주소(SHEET_WEBHOOK_URL)로 보냅니다 — 설정법: docs/line/ai-consult.md
// 주소에 비밀값(SHEET_WEBHOOK_SECRET)을 함께 보내 아무나 줄을 추가하지 못하게 합니다.
export interface HandoffRow {
  at: string;
  userId: string;
  category: string;
  staffHours: boolean;
  name: string | null;
  visitDate: string | null;
  stay: string | null;
  concern: string | null;
  note: string | null;
  lastMessage: string;
}

export async function logHandoff(row: HandoffRow): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[consult] SHEET_WEBHOOK_URL not set; handoff not logged", row.userId);
    return;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.SHEET_WEBHOOK_SECRET, ...row }),
  });
  if (!res.ok) console.error("[consult] sheet log failed", res.status);
}
