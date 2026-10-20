import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { after } from "next/server";
import { linkLineUser, SESSION_TTL_SECONDS } from "@/lib/scanSession";
import { claimOnce, releaseClaim, isRateLimited } from "@/lib/sessionStore";
import { verifyLiffAccessToken } from "@/lib/line/verifyAccessToken";
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
  accessToken?: string;
}

async function deliverReport(
  token: string,
  lineUserId: string,
  session: ScanSessionData,
  claimKey: string
) {
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
    // 실패했으면 잠금을 풀어서 사용자가 링크를 다시 열 때 재시도되도록 합니다.
    await releaseClaim(claimKey);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (await isRateLimited(`link-session:${ip}`, 30, 60 * 10)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as LinkSessionBody | null;
  const token = body?.token;
  const accessToken = body?.accessToken;
  if (!token || !accessToken) {
    return NextResponse.json({ error: "missing token or accessToken" }, { status: 400 });
  }

  const lineUserId = await verifyLiffAccessToken(accessToken);
  if (!lineUserId) {
    return NextResponse.json({ error: "invalid access token" }, { status: 401 });
  }

  const session = await linkLineUser(token, lineUserId);
  if (!session) {
    return NextResponse.json({ error: "session not found or expired" }, { status: 404 });
  }

  // 새로고침·재진입으로 같은 토큰이 다시 들어와도 리포트는 한 번만 만듭니다.
  const claimKey = `report-claim:${token}`;
  if (await claimOnce(claimKey, SESSION_TTL_SECONDS)) {
    after(() => deliverReport(token, lineUserId, session, claimKey));
  }

  return NextResponse.json({ status: "linked" });
}
