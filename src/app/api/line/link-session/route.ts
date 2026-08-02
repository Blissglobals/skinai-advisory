import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { linkLineUser } from "@/lib/scanSession";

interface LinkSessionBody {
  token?: string;
  lineUserId?: string;
}

export async function POST(request: NextRequest) {
  const { token, lineUserId } = (await request.json()) as LinkSessionBody;

  if (!token || !lineUserId) {
    return NextResponse.json({ error: "missing token or lineUserId" }, { status: 400 });
  }

  const session = await linkLineUser(token, lineUserId);
  if (!session) {
    return NextResponse.json({ error: "session not found or expired" }, { status: 404 });
  }

  // TODO(다음 단계): 여기서 GPT-4o mini로 상세 리포트 생성 → PDF 변환 →
  // Cloudflare R2 업로드 → LINE Push Message로 다운로드 링크 발송
  return NextResponse.json({ status: "linked" });
}
