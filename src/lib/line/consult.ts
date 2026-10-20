import { LINE_BASIC_ID } from "./constants";

// LINE 공식 계정 대화창을 열고 입력란에 문구를 미리 채웁니다. 서버에는
// 아무것도 저장하지 않고, 사용자가 직접 전송해야 상담 직원에게 전달됩니다.
// 형식: https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/
export function lineConsultUrl(lines: string[]): string {
  return `https://line.me/R/oaMessage/${encodeURIComponent(LINE_BASIC_ID)}/?${encodeURIComponent(
    lines.join("\n")
  )}`;
}
