import { getSiteContent } from "@/content/site";

// AI 상담이 근거로 쓰는 병원 안내 자료. 사이트에 실린 내용만 쓰도록 사이트 콘텐츠에서 만듭니다
// (사이트를 고치면 AI 답변도 같이 바뀝니다). 프롬프트 캐시가 깨지지 않게 순서가 고정된 문자열입니다.
export function buildClinicKnowledge(): string {
  const c = getSiteContent("ko");
  const clinic = c.clinics[0];
  const lines: string[] = [
    "## 병원",
    `${clinic.name} (구 ${clinic.formerName ?? "-"}) · 주소: ${clinic.address} · 가까운 역: ${clinic.station} · 대표전화: ${clinic.phone} · 홈페이지: ${clinic.homepage}`,
    `대표원장: 김동원 · 문의 이메일: info@zerolabclinic.com · 외국어 안내: ${clinic.languages}`,
    "진료시간·가격: 확정 안내 자료 없음 → '상담 시 안내' 또는 병원 홈페이지 확인으로 답한다.",
    "",
    "## 온라인 피부 분석 (사이트 skin.zerolabclinic.com)",
    ...c.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
    "",
    "## 시술 일반 정보 (진단·추천 아님)",
    ...c.treatments.map((t) => `- ${t.name}: ${t.summary}`),
    "",
    "## 자주 묻는 질문",
    ...c.faq.map((f) => `Q. ${f.q}\nA. ${f.a}`),
    "",
    "## 주변·여행 가이드",
  ];
  for (const g of c.guides) {
    lines.push(`### ${g.title}`);
    for (const s of g.sections ?? []) {
      if (s.spots) lines.push(...s.spots.map((sp) => `- ${sp.name}: ${sp.note}`));
      if (s.items) lines.push(...s.items.map((it) => `- ${it}`));
      if (s.body && !s.spots) lines.push(s.body);
    }
  }
  return lines.join("\n");
}
