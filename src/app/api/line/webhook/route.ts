import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyLineSignature } from "@/lib/line/verifySignature";
import type { LineWebhookBody } from "@/lib/line/types";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-line-signature");

  const isValid = verifyLineSignature(
    rawBody,
    signature,
    process.env.LINE_CHANNEL_SECRET
  );
  if (!isValid) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as LineWebhookBody;

  for (const event of body.events) {
    if (event.type === "follow") {
      // Phase 2에서 여기에 세션 토큰 매칭 + 상세 리포트 생성/발송 로직이 들어갑니다.
      console.log("[line] follow event", event.source.userId);
    } else if (event.type === "unfollow") {
      console.log("[line] unfollow event", event.source.userId);
    }
  }

  return NextResponse.json({ status: "ok" });
}
