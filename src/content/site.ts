import type { Locale } from "@/i18n/config";

// 홈페이지(시술 안내·가이드) 콘텐츠입니다. 대상이 대만이라 번체가 기준이고,
// ko는 내부 검토용입니다. zh-CN은 아직 번역이 없어 번체를 그대로 보여줍니다.
// ponytail: 콘텐츠를 코드에 두는 방식 — 직원이 자주 고치게 되면 CMS로 옮깁니다.
export type Text = { ko: string; "zh-TW": string };

export function tx(text: Text, locale: Locale): string {
  return locale === "ko" ? text.ko : text["zh-TW"];
}

// 아직 확정되지 않은 사실(가격, 의원 정보, 등록번호 등)은 지어내지 않고 이 표시로 남깁니다.
export const DRAFT_NOTICE: Text = {
  ko: "예시 콘텐츠 · 의료진 검수 전",
  "zh-TW": "範例內容 · 尚未經醫師審閱",
};

export const ui = {
  brand: { ko: "Bliss Globals", "zh-TW": "Bliss Globals" },
  consultShort: { ko: "LINE 상담", "zh-TW": "LINE諮詢" },
  consultCta: { ko: "LINE으로 무료 상담 받기", "zh-TW": "透過LINE免費諮詢" },
  scanCta: { ko: "무료 피부 분석 해보기", "zh-TW": "免費肌膚分析" },
  comingSoon: { ko: "준비 중", "zh-TW": "準備中" },
  readMore: { ko: "자세히 보기", "zh-TW": "查看詳情" },
  consultTitle: { ko: "[무료 상담 신청]", "zh-TW": "【免費諮詢申請】" },
  consultInterest: { ko: "관심 시술", "zh-TW": "想諮詢的療程" },
  consultTopic: { ko: "궁금한 내용", "zh-TW": "想了解的內容" },
  home: {
    eyebrow: { ko: "한국 피부과 시술 여행", "zh-TW": "韓國皮膚科療程之旅" },
    heading: {
      ko: "한국 피부과, 상담부터 통역까지 한 번에",
      "zh-TW": "韓國皮膚科，從諮詢到翻譯一次搞定",
    },
    subheading: {
      ko: "내 피부에 맞는 시술을 알아보고, 중국어 상담으로 일정과 비용을 미리 확인하세요.",
      "zh-TW": "了解適合自己的療程，並透過中文諮詢事先確認行程與費用。",
    },
    concernsTitle: { ko: "고민별로 찾아보기", "zh-TW": "依肌膚困擾查詢" },
    treatmentsTitle: { ko: "많이 찾는 시술", "zh-TW": "熱門療程" },
    stepsTitle: { ko: "이용 방법", "zh-TW": "服務流程" },
    guideTitle: { ko: "서울 시술 여행 가이드", "zh-TW": "首爾療程旅遊指南" },
    clinicTitle: { ko: "제휴 의원", "zh-TW": "合作診所" },
    faqTitle: { ko: "자주 묻는 질문", "zh-TW": "常見問題" },
  },
  treatment: {
    forWhom: { ko: "이런 분께 맞아요", "zh-TW": "適合這樣的你" },
    facts: { ko: "한눈에 보기", "zh-TW": "療程速覽" },
    cautions: { ko: "알아두세요", "zh-TW": "注意事項" },
    faq: { ko: "자주 묻는 질문", "zh-TW": "常見問題" },
  },
  guide: {
    title: { ko: "서울 시술 여행 가이드", "zh-TW": "首爾療程旅遊指南" },
    intro: {
      ko: "시술 전후로 들르기 좋은 곳과 챙기면 좋은 것들을 모았어요.",
      "zh-TW": "整理了療程前後適合造訪的地點與值得準備的物品。",
    },
    lastChecked: { ko: "최종 확인일", "zh-TW": "最後確認日期" },
    sponsoredNote: {
      ko: "제휴·협찬이 있는 장소는 '광고'로 표시합니다.",
      "zh-TW": "有合作或贊助的地點會標示「廣告」。",
    },
  },
  footer: {
    company: { ko: "블리스글로벌스", "zh-TW": "Bliss Globals" },
    registration: {
      ko: "외국인환자 유치업 등록번호: (확인 필요)",
      "zh-TW": "外國人患者招攬業登記號碼：（待確認）",
    },
    disclaimer: {
      ko: "본 사이트의 정보는 일반적인 안내이며 의학적 진단이나 처방이 아닙니다. 시술 여부는 반드시 의료진과 상담 후 결정하세요.",
      "zh-TW": "本網站資訊僅為一般說明，並非醫學診斷或處方。是否接受療程請務必與醫師諮詢後決定。",
    },
    privacy: { ko: "개인정보처리방침", "zh-TW": "隱私權政策" },
  },
} satisfies Record<string, unknown>;

export interface Concern {
  slug: string;
  name: Text;
  hint: Text;
  treatmentSlugs: string[];
}

export const concerns: Concern[] = [
  {
    slug: "pigment",
    name: { ko: "기미·잡티", "zh-TW": "斑點・暗沉" },
    hint: { ko: "색소, 칙칙한 톤", "zh-TW": "色素、膚色暗沉" },
    treatmentSlugs: ["pico-toning"],
  },
  {
    slug: "pore",
    name: { ko: "모공·피부결", "zh-TW": "毛孔・膚質" },
    hint: { ko: "넓은 모공, 거친 결", "zh-TW": "毛孔粗大、膚質粗糙" },
    treatmentSlugs: ["skin-booster"],
  },
  {
    slug: "wrinkle",
    name: { ko: "주름·탄력", "zh-TW": "皺紋・彈力" },
    hint: { ko: "잔주름, 처짐", "zh-TW": "細紋、鬆弛" },
    treatmentSlugs: ["lifting"],
  },
  {
    slug: "acne",
    name: { ko: "여드름·흉터", "zh-TW": "痘痘・痘疤" },
    hint: { ko: "트러블, 패인 흉터", "zh-TW": "肌膚問題、凹疤" },
    treatmentSlugs: [],
  },
];

export interface Treatment {
  slug: string;
  name: Text;
  summary: Text;
  ready: boolean;
  forWhom?: Text[];
  facts?: { label: Text; value: Text }[];
  cautions?: Text[];
  faq?: { q: Text; a: Text }[];
}

const ASK_IN_CONSULT: Text = { ko: "상담 시 안내", "zh-TW": "諮詢時說明" };

export const treatments: Treatment[] = [
  {
    slug: "pico-toning",
    ready: true,
    name: { ko: "피코토닝", "zh-TW": "皮秒淨膚" },
    summary: {
      ko: "아주 짧은 펄스의 레이저로 색소를 잘게 나누어 톤을 정돈하는 시술입니다.",
      "zh-TW": "以極短脈衝雷射將色素細碎化，幫助膚色均勻的療程。",
    },
    forWhom: [
      { ko: "기미·잡티 등 색소가 신경 쓰이는 분", "zh-TW": "在意斑點、暗沉等色素問題的人" },
      { ko: "전체적으로 피부톤이 칙칙한 분", "zh-TW": "整體膚色暗沉的人" },
      { ko: "여행 일정이 짧아 회복 기간이 부담되는 분", "zh-TW": "旅遊行程短、擔心恢復期的人" },
    ],
    facts: [
      { label: { ko: "권장 횟수", "zh-TW": "建議次數" }, value: ASK_IN_CONSULT },
      { label: { ko: "시술 간격", "zh-TW": "療程間隔" }, value: ASK_IN_CONSULT },
      { label: { ko: "회복 기간", "zh-TW": "恢復期" }, value: ASK_IN_CONSULT },
      { label: { ko: "필요 체류 일수", "zh-TW": "建議停留天數" }, value: ASK_IN_CONSULT },
      { label: { ko: "가격대", "zh-TW": "價格範圍" }, value: ASK_IN_CONSULT },
    ],
    cautions: [
      {
        ko: "효과와 회복 기간은 피부 상태에 따라 개인차가 있습니다.",
        "zh-TW": "效果與恢復期會因個人膚況而有所不同。",
      },
      {
        ko: "시술 후에는 자외선 차단이 특히 중요합니다.",
        "zh-TW": "療程後特別需要做好防曬。",
      },
      {
        ko: "시술 가능 여부와 횟수는 의료진 진료 후 결정됩니다.",
        "zh-TW": "是否適合療程及次數，需經醫師看診後決定。",
      },
    ],
    faq: [
      {
        q: { ko: "시술 당일 바로 관광해도 되나요?", "zh-TW": "療程當天可以直接去觀光嗎？" },
        a: {
          ko: "피부 상태에 따라 다릅니다. 상담 시 일정에 맞춰 안내해드려요.",
          "zh-TW": "依膚況而定，諮詢時會配合您的行程說明。",
        },
      },
      {
        q: { ko: "한 번만 받아도 되나요?", "zh-TW": "只做一次可以嗎？" },
        a: {
          ko: "목표와 피부 상태에 따라 다르며, 진료 후 권장 횟수를 안내해드려요.",
          "zh-TW": "依目標與膚況而異，看診後會說明建議次數。",
        },
      },
    ],
  },
  {
    slug: "skin-booster",
    ready: false,
    name: { ko: "스킨부스터", "zh-TW": "水光類療程" },
    summary: { ko: "피부 속 보습과 결 개선", "zh-TW": "改善肌膚保濕與膚質" },
  },
  {
    slug: "lifting",
    ready: false,
    name: { ko: "리프팅", "zh-TW": "拉提療程" },
    summary: { ko: "탄력과 윤곽 관리", "zh-TW": "彈力與輪廓管理" },
  },
];

export const steps: { title: Text; body: Text }[] = [
  {
    title: { ko: "LINE 상담", "zh-TW": "LINE諮詢" },
    body: { ko: "중국어로 고민과 일정을 알려주세요", "zh-TW": "用中文告訴我們您的困擾與行程" },
  },
  {
    title: { ko: "의원·견적 안내", "zh-TW": "診所與報價" },
    body: { ko: "맞는 의원과 예상 비용을 안내해요", "zh-TW": "推薦合適診所並說明預估費用" },
  },
  {
    title: { ko: "예약·방한", "zh-TW": "預約與來韓" },
    body: { ko: "예약을 잡고 한국에 오세요", "zh-TW": "完成預約後來韓國" },
  },
  {
    title: { ko: "통역·사후 관리", "zh-TW": "翻譯與術後照護" },
    body: { ko: "진료 통역과 귀국 후 문의까지", "zh-TW": "看診翻譯到回國後的諮詢" },
  },
];

export interface GuideSpot {
  name: Text;
  note: Text;
  sponsored: boolean;
  mapUrl?: string;
}

export interface Guide {
  slug: string;
  title: Text;
  summary: Text;
  ready: boolean;
  lastChecked?: string;
  sections?: { heading: Text; spots: GuideSpot[] }[];
}

export const guides: Guide[] = [
  {
    slug: "pharmacies",
    ready: true,
    lastChecked: "2026-10-21",
    title: { ko: "의원 근처 약국 & 시술 후 회복 키트", "zh-TW": "診所附近藥局 & 術後修護清單" },
    summary: {
      ko: "시술 후 챙기면 좋은 제품과 살 수 있는 곳",
      "zh-TW": "術後值得準備的產品與購買地點",
    },
    sections: [
      {
        heading: { ko: "제휴 의원 근처 약국", "zh-TW": "合作診所附近的藥局" },
        spots: [
          {
            name: { ko: "예시 약국 A", "zh-TW": "範例藥局 A" },
            note: { ko: "의원에서 도보 거리 · 중국어 안내 여부 확인 필요", "zh-TW": "距診所步行可達・中文服務待確認" },
            sponsored: false,
          },
          {
            name: { ko: "예시 약국 B", "zh-TW": "範例藥局 B" },
            note: { ko: "영업시간·위치 확인 필요", "zh-TW": "營業時間與位置待確認" },
            sponsored: false,
          },
        ],
      },
      {
        heading: { ko: "시술 후 회복 키트 (제품군)", "zh-TW": "術後修護清單（品項）" },
        spots: [
          {
            name: { ko: "자외선 차단제", "zh-TW": "防曬產品" },
            note: { ko: "레이저 시술 후 필수", "zh-TW": "雷射療程後必備" },
            sponsored: false,
          },
          {
            name: { ko: "진정·재생 크림", "zh-TW": "舒緩修護霜" },
            note: { ko: "자극이 적은 제품 위주", "zh-TW": "以低刺激產品為主" },
            sponsored: false,
          },
          {
            name: { ko: "보습 마스크", "zh-TW": "保濕面膜" },
            note: { ko: "사용 시점은 의료진 안내를 따르세요", "zh-TW": "使用時機請依醫師指示" },
            sponsored: false,
          },
        ],
      },
    ],
  },
  {
    slug: "must-buy",
    ready: false,
    title: { ko: "한국 필수 추천템", "zh-TW": "韓國必買清單" },
    summary: { ko: "여행 중 사면 좋은 스킨케어", "zh-TW": "旅途中值得入手的保養品" },
  },
  {
    slug: "food",
    ready: false,
    title: { ko: "의원 근처 맛집", "zh-TW": "診所附近美食" },
    summary: { ko: "시술 후에도 부담 없는 메뉴", "zh-TW": "術後也能安心享用的餐點" },
  },
  {
    slug: "itinerary",
    ready: false,
    title: { ko: "시술 + 여행 일정 예시", "zh-TW": "療程＋旅遊行程範例" },
    summary: { ko: "회복 기간을 고려한 3박 4일", "zh-TW": "考量恢復期的4天3夜" },
  },
];

export const homeFaq: { q: Text; a: Text }[] = [
  {
    q: { ko: "상담은 정말 무료인가요?", "zh-TW": "諮詢真的免費嗎？" },
    a: {
      ko: "네, LINE 상담은 무료입니다. 시술 비용은 의원에 따라 다르며 상담 시 안내해드려요.",
      "zh-TW": "是的，LINE諮詢免費。療程費用依診所而異，諮詢時會說明。",
    },
  },
  {
    q: { ko: "한국어를 못해도 괜찮나요?", "zh-TW": "不會韓文也沒關係嗎？" },
    a: {
      ko: "중국어로 상담하고, 진료 통역을 지원합니다. (지원 범위 확인 필요)",
      "zh-TW": "可用中文諮詢，並提供看診翻譯。（服務範圍待確認）",
    },
  },
];
