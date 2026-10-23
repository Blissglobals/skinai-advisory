# LINE AI 상담 설정

공식계정 `@166hxcxq`(Messaging API 채널 `2012167376`)에 들어오는 메시지를 AI(Claude Haiku 5.5)가 먼저 받고, 예약·내원·이상 증상만 직원에게 넘깁니다.

## 흐름

1. 친구 추가 / 첫 메시지 → AI 안내 + **동의 버튼**(메시지가 해외 AI로 전송됨). 동의 안 하면 AI 없이 직원 상담.
2. 동의한 고객의 메시지 → AI가 6가지로 분류해 답변
   - 일반 안내 · 시술 일반 설명 · 무관/장난 → AI가 답변
   - 개인 맞춤 판단 요청 → 판단하지 않고 진료 상담 권유
   - 예약·내원 → 정보(날짜, 체류 기간, 고민, 이름) 모은 뒤 **직원 연결**
   - 시술 후 이상 → **즉시 직원 연결**, 급하면 119 안내
3. 직원 연결되면 그 고객에게는 **24시간 동안 AI가 답하지 않음** → 직원이 LINE 관리 화면에서 이어서 답변
4. 직원 연결 건은 **구글 시트에 한 줄씩 기록**
5. 상담 시간(한국 10:00~18:00) 밖에는 "다음 날 순서대로 연락" 안내
6. AI 오류·사용 한도 초과 → AI를 멈추고 직원 상담으로 넘김

코드: `src/app/api/line/webhook/route.ts`, `src/lib/consult/*`

## Vercel 환경변수 (Production, 모두 Secret)

| 이름 | 어디서 |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys (월 사용 한도 설정 필수) |
| `LINE_CHANNEL_SECRET` | LINE Developers → 채널 2012167376 → Basic settings → Channel secret (**재발급 후** 넣기) |
| `LINE_CHANNEL_ACCESS_TOKEN` | 같은 채널 → Messaging API → Channel access token (long-lived) 발급 |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Vercel → Storage(Marketplace) → Upstash Redis 연결 시 자동 추가 |
| `SHEET_WEBHOOK_URL` | 아래 구글 시트 Apps Script 배포 주소 |
| `SHEET_WEBHOOK_SECRET` | 아무 긴 문자열(예: 터미널에서 `openssl rand -hex 16`). Apps Script 코드의 SECRET과 같은 값 |

넣는 명령(값은 화면에 직접 입력):
`npx vercel env add 이름 production`

## 구글 시트 (직원 연결 기록)

1. 구글 시트 새로 만들기 → 첫 줄 제목: `접수시각 | 분류 | 시간대 | 이름 | 희망날짜 | 체류기간 | 고민 | 메모 | 마지막메시지 | LINE ID | 처리상태`
2. 확장 프로그램 → Apps Script → 아래 코드 붙여넣기 (SECRET 바꾸기)
3. 배포 → 새 배포 → 유형 "웹 앱" → 실행: 나 / 액세스: 모든 사용자 → 배포 → 나온 URL이 `SHEET_WEBHOOK_URL`

```js
const SECRET = '여기에 SHEET_WEBHOOK_SECRET과 같은 값';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return ContentService.createTextOutput('forbidden');
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    d.at, d.category, d.staffHours ? '상담시간' : '야간', d.name, d.visitDate, d.stay,
    d.concern, d.note, d.lastMessage, d.userId, '대기',
  ]);
  return ContentService.createTextOutput('ok');
}
```

## LINE 공식계정 설정 (manager.line.biz → @166hxcxq → 설정 → 응답 설정)

- 채팅: **켜기** (직원이 같은 대화방에서 답변)
- 웹훅: **켜기**, Webhook URL = `https://skin.zerolabclinic.com/api/line/webhook`
- 인사 메시지·자동 응답 메시지·응답 시간 외 메시지: **끄기** (AI와 중복 답변 방지)

※ 사이트 비밀번호 잠금은 `/api` 경로에 걸리지 않아서 웹훅은 잠금 중에도 동작합니다.
