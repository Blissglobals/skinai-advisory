import { after, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyLineSignature } from "@/lib/line/verifySignature";
import type { LineWebhookBody } from "@/lib/line/types";
import { handleLineEvent } from "@/lib/consult/handle";

// LINE은 웹훅에 빠른 200 응답을 기대해서, 서명만 확인하고 바로 응답한 뒤 처리는 after()로 미룹니다.
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-line-signature");

  if (!verifyLineSignature(rawBody, signature, process.env.LINE_CHANNEL_SECRET)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as LineWebhookBody;
  after(async () => {
    for (const event of body.events) {
      try {
        await handleLineEvent(event);
      } catch (error) {
        console.error("[line] event failed", event.type, error);
      }
    }
  });

  return NextResponse.json({ status: "ok" });
}
