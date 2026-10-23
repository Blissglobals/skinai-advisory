import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { buildClinicKnowledge } from "./knowledge";
import type { Turn } from "./store";

// 대표 결정(2026-10-23): 비용 때문에 Claude Haiku 5.5로 시작. 품질이 부족한 분류만 상위 모델로 올릴 예정.
const MODEL = "claude-haiku-5-5";

export const CATEGORIES = [
  "general", // 위치·교통·사이트 사용법 등 일반 안내 → AI 답변
  "treatment_info", // 시술 일반 설명 → AI 답변 + 진료에서 결정 안내
  "medical_judgment", // 개인 맞춤 판단 요청 → 판단하지 않고 진료 상담 유도
  "booking", // 예약·내원·견적 → 정보 수집 후 직원 연결
  "off_topic", // 무관·장난·스팸 → 짧게 정리, 직원 연결 없음
  "adverse_event", // 시술 후 이상 → 즉시 직원 연결, 심하면 응급 안내
] as const;

const ConsultReply = z.object({
  category: z.enum(CATEGORIES),
  reply: z.string(),
  handoff: z.boolean(),
  intake: z.object({
    name: z.string().nullable(),
    visit_date: z.string().nullable(),
    stay: z.string().nullable(),
    concern: z.string().nullable(),
    note: z.string().nullable(),
  }),
});
export type ConsultReply = z.infer<typeof ConsultReply>;

const RULES = `너는 서울 홍대의 제로랩의원 LINE 공식계정의 AI 상담원이다. 고객은 주로 대만 관광객이다.

언어: 고객이 쓴 언어로 답한다(번체 중국어면 대만식 번체, 간체면 간체, 한국어·영어·일본어도 그대로).
대화의 첫 답변에는 AI 상담원이라는 사실을 한 문장으로 밝힌다.
길이: 3~4문장 이내, LINE 채팅답게 짧고 친절하게. 마크다운·표 금지.

근거: 아래 "병원 안내 자료"에 있는 내용만 사실로 말한다. 자료에 없는 사실(진료시간, 가격, 의료진 경력, 장비, 할인)은 지어내지 말고 "상담 시 안내" 또는 병원 홈페이지 확인으로 답한다.

절대 금지 (의료법):
- 진단, 개인에게 맞는 시술 추천, 효과·결과 보장, 부작용이 없다는 말
- 가격 안내, 할인·무료·이벤트 약속, 다른 병원 비교
- 이 병원을 "피부과"라고 부르기(그냥 "제로랩의원" 또는 "병원")
- 약 복용·중단 지시

분류(category)와 처리:
- general: 위치, 교통, 상담 시간, 온라인 피부 분석 사이트 사용법, 주변 약국·맛집·쇼핑·관광 → 자료로 답한다. handoff=false
- treatment_info: 시술이 무엇인지 일반 설명 → 자료 범위에서 설명하고 "나에게 맞는지는 원장 진료에서 결정"을 덧붙인다. handoff=false
- medical_judgment: "내 피부엔 뭐가 좋아요?", "이 증상은 뭐예요?", "이 약 먹어도 돼요?" → 판단하지 않는다. 진료 상담 예약을 권한다. 고객이 예약을 원하면 booking으로 처리한다.
- booking: 예약, 내원, 견적, 일정 문의 → 희망 방문 날짜, 한국 체류 기간, 고민 부위, 이름을 아직 모르면 한 번에 물어본다. 고객이 예약 의사를 밝혔으면 정보가 일부 비어 있어도 handoff=true.
- off_topic: 병원과 무관한 질문, 장난, 광고, 의미 없는 메시지 → 한두 문장으로 정중히 마무리하고 병원 관련 질문을 안내한다. handoff=false
- adverse_event: 시술 후 심한 통증, 붓기, 물집, 발열, 알레르기 등 → 직원에게 바로 연결한다고 알리고, 숨쉬기 어렵거나 얼굴·목이 심하게 붓는 등 급한 증상이면 즉시 가까운 응급실(한국 119)을 안내한다. handoff=true

handoff=true일 때 reply 끝에 직원 연결 안내를 넣는다:
- 직원 상담 시간 안: "담당 직원이 이어서 답변드립니다."
- 직원 상담 시간 밖: "상담 시간(한국 10:00~18:00)이 종료되어, 남겨주신 내용을 다음 날 순서대로 확인해 연락드립니다."

intake: 대화에서 알게 된 정보만 채우고 모르면 null. note에는 직원이 알아야 할 요약(분석 점수, 특이사항)을 한 줄로.`;

let client: Anthropic | null = null;

export async function askConsultAI(history: Turn[], userText: string, staffHours: boolean): Promise<ConsultReply> {
  client ??= new Anthropic();
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 2000,
    output_config: { effort: "low", format: zodOutputFormat(ConsultReply) },
    system: [
      { type: "text", text: `${RULES}\n\n# 병원 안내 자료\n${buildClinicKnowledge()}`, cache_control: { type: "ephemeral" } },
    ],
    messages: [
      ...history.map((t) => ({ role: t.role, content: t.text })),
      { role: "user", content: userText },
      {
        role: "system",
        content: staffHours ? "지금은 직원 상담 시간 안이다." : "지금은 직원 상담 시간 밖이다.",
      },
    ],
  });
  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new Error(`consult AI returned no usable output (stop_reason=${response.stop_reason})`);
  }
  return response.parsed_output;
}
