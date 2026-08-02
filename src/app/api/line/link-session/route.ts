import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { after } from "next/server";
import { linkLineUser } from "@/lib/scanSession";
import type { ScanSessionData } from "@/lib/scanSession";
import { generateDetailedReport } from "@/lib/llm/generateDetailedReport";
import { generateReportPdf } from "@/lib/pdf/generateReportPdf";
import { uploadReportPdf } from "@/lib/r2";
import { pushLineTextMessage } from "@/lib/line/pushMessage";
import { getDictionary } from "@/i18n/getDictionary";

// 라인 연결 자체는 즉시 응답하고, LLM 생성 + PDF 변환 + R2 업로드 + LINE 발송처럼
// 오래 걸리는 작업은 after()로 응답 이후에 처리합니다. maxDuration은 그 백그라운드
// 작업이 끝날 때까지 함수가 살아있을 수 있는 여유 시간입니다.
export const maxDuration = 60;

interface LinkSessionBody {
  token?: string;
  lineUserId?: string;
}

async function deliverReport(token: string, lineUserId: string, session: ScanSessionData) {
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

  after(() => deliverReport(token, lineUserId, session));

  return NextResponse.json({ status: "linked" });
}
