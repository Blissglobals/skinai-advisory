import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { linkLineUser } from "@/lib/scanSession";
import { generateDetailedReport } from "@/lib/llm/generateDetailedReport";
import { generateReportPdf } from "@/lib/pdf/generateReportPdf";
import { uploadReportPdf } from "@/lib/r2";
import { pushLineTextMessage } from "@/lib/line/pushMessage";
import { getDictionary } from "@/i18n/getDictionary";

// LLM 생성 + PDF 변환 + R2 업로드 + LINE 발송을 응답 전에 전부 기다리므로
// 기본 타임아웃보다 여유를 둡니다.
export const maxDuration = 30;

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

  try {
    const dict = await getDictionary(session.locale);
    const reportText = await generateDetailedReport(session);
    const pdfBuffer = await generateReportPdf(session, reportText, dict.lineReport.pdf);
    const downloadUrl = await uploadReportPdf(`reports/${token}.pdf`, pdfBuffer);
    const message = dict.lineReport.pushMessage.replace("{url}", downloadUrl);
    await pushLineTextMessage(lineUserId, message);
  } catch (e) {
    // 친구추가·세션 연결 자체는 이미 성공했으니, 리포트 생성/발송 실패를
    // 이유로 사용자에게 "연결 실패"를 보여주지는 않습니다. 로그로만 남깁니다.
    console.error("[link-session] report generation/delivery failed", e);
  }

  return NextResponse.json({ status: "linked" });
}
