import type { SiteContent } from "./index";

// 아직 확정되지 않은 사실(가격, 의원 정보, 등록번호 등)은 지어내지 않고
// "확인 필요"나 "상담 시 안내"로 남깁니다.
const ASK_IN_CONSULT = "상담 시 안내";

const ko: SiteContent = {
  ui: {
    brand: "Bliss Globals",
    draftNotice: "예시 콘텐츠 · 의료진 검수 전",
    consultShort: "LINE 상담",
    consultCta: "LINE으로 무료 상담 받기",
    scanCta: "무료 피부 분석 해보기",
    comingSoon: "준비 중",
    readMore: "자세히 보기",
    adLabel: "광고",
    languageLabel: "언어",
    consultMessage: {
      title: "[무료 상담 신청]",
      interest: "관심 시술",
      topic: "궁금한 내용",
    },
  },

  home: {
    eyebrow: "한국 피부과 시술 여행",
    heading: "한국 피부과, 상담부터 통역까지 한 번에",
    subheading: "내 피부에 맞는 시술을 알아보고, 상담으로 일정과 비용을 미리 확인하세요.",
    concernsTitle: "고민별로 찾아보기",
    treatmentsTitle: "많이 찾는 시술",
    stepsTitle: "이용 방법",
    guideTitle: "서울 시술 여행 가이드",
    clinicTitle: "제휴 의원",
    faqTitle: "자주 묻는 질문",
  },

  treatmentPage: {
    forWhom: "이런 분께 맞아요",
    facts: "한눈에 보기",
    cautions: "알아두세요",
    faq: "자주 묻는 질문",
  },

  guidePage: {
    title: "서울 시술 여행 가이드",
    intro: "시술 전후로 들르기 좋은 곳과 챙기면 좋은 것들을 모았어요.",
    lastChecked: "최종 확인일",
    sponsoredNote: "제휴·협찬이 있는 장소는 '광고'로 표시합니다.",
  },

  footer: {
    company: "블리스글로벌스",
    registration: "외국인환자 유치업 등록번호: (확인 필요)",
    disclaimer:
      "본 사이트의 정보는 일반적인 안내이며 의학적 진단이나 처방이 아닙니다. 시술 여부는 반드시 의료진과 상담 후 결정하세요.",
    privacy: "개인정보처리방침",
  },

  concerns: [
    { slug: "pigment", name: "기미·잡티", hint: "색소, 칙칙한 톤", treatmentSlugs: ["pico-toning"] },
    { slug: "pore", name: "모공·피부결", hint: "넓은 모공, 거친 결", treatmentSlugs: ["skin-booster"] },
    { slug: "wrinkle", name: "주름·탄력", hint: "잔주름, 처짐", treatmentSlugs: ["lifting"] },
    { slug: "acne", name: "여드름·흉터", hint: "트러블, 패인 흉터", treatmentSlugs: [] },
  ],

  treatments: [
    {
      slug: "pico-toning",
      ready: true,
      name: "피코토닝",
      summary: "아주 짧은 펄스의 레이저로 색소를 잘게 나누어 톤을 정돈하는 시술입니다.",
      forWhom: [
        "기미·잡티 등 색소가 신경 쓰이는 분",
        "전체적으로 피부톤이 칙칙한 분",
        "여행 일정이 짧아 회복 기간이 부담되는 분",
      ],
      facts: [
        { label: "권장 횟수", value: ASK_IN_CONSULT },
        { label: "시술 간격", value: ASK_IN_CONSULT },
        { label: "회복 기간", value: ASK_IN_CONSULT },
        { label: "필요 체류 일수", value: ASK_IN_CONSULT },
        { label: "가격대", value: ASK_IN_CONSULT },
      ],
      cautions: [
        "효과와 회복 기간은 피부 상태에 따라 개인차가 있습니다.",
        "시술 후에는 자외선 차단이 특히 중요합니다.",
        "시술 가능 여부와 횟수는 의료진 진료 후 결정됩니다.",
      ],
      faq: [
        {
          q: "시술 당일 바로 관광해도 되나요?",
          a: "피부 상태에 따라 다릅니다. 상담 시 일정에 맞춰 안내해드려요.",
        },
        {
          q: "한 번만 받아도 되나요?",
          a: "목표와 피부 상태에 따라 다르며, 진료 후 권장 횟수를 안내해드려요.",
        },
      ],
    },
    { slug: "skin-booster", ready: false, name: "스킨부스터", summary: "피부 속 보습과 결 개선" },
    { slug: "lifting", ready: false, name: "리프팅", summary: "탄력과 윤곽 관리" },
  ],

  steps: [
    { title: "LINE 상담", body: "고민과 여행 일정을 알려주세요" },
    { title: "의원·견적 안내", body: "맞는 의원과 예상 비용을 안내해요" },
    { title: "예약·방한", body: "예약을 잡고 한국에 오세요" },
    { title: "통역·사후 관리", body: "진료 통역과 귀국 후 문의까지" },
  ],

  guides: [
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-21",
      title: "의원 근처 약국 & 시술 후 회복 키트",
      summary: "시술 후 챙기면 좋은 제품과 살 수 있는 곳",
      sections: [
        {
          heading: "제휴 의원 근처 약국",
          spots: [
            { name: "예시 약국 A", note: "의원에서 도보 거리 · 외국어 안내 여부 확인 필요", sponsored: false },
            { name: "예시 약국 B", note: "영업시간·위치 확인 필요", sponsored: false },
          ],
        },
        {
          heading: "시술 후 회복 키트 (제품군)",
          spots: [
            { name: "자외선 차단제", note: "레이저 시술 후 필수", sponsored: false },
            { name: "진정·재생 크림", note: "자극이 적은 제품 위주", sponsored: false },
            { name: "보습 마스크", note: "사용 시점은 의료진 안내를 따르세요", sponsored: false },
          ],
        },
      ],
    },
    { slug: "must-buy", ready: false, title: "한국 필수 추천템", summary: "여행 중 사면 좋은 스킨케어" },
    { slug: "food", ready: false, title: "의원 근처 맛집", summary: "시술 후에도 부담 없는 메뉴" },
    { slug: "itinerary", ready: false, title: "시술 + 여행 일정 예시", summary: "회복 기간을 고려한 3박 4일" },
  ],

  clinics: [{ name: "제로랩의원", note: "위치·의료진·진료 정보 준비 중" }],

  faq: [
    {
      q: "상담은 정말 무료인가요?",
      a: "네, LINE 상담은 무료입니다. 시술 비용은 의원에 따라 다르며 상담 시 안내해드려요.",
    },
    {
      q: "한국어를 못해도 괜찮나요?",
      a: "외국어로 상담하고, 진료 통역을 지원합니다. (지원 언어·범위 확인 필요)",
    },
  ],
};

export default ko;
