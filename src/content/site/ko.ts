import { mapsUrl, type SiteContent } from "./index";

// 원칙: 확인되지 않은 사실(가격, 횟수, 의원·업체 정보, 등록번호 등)은 지어내지
// 않고 "상담 시 안내" / "확인 필요"로 남깁니다. 시술 설명은 일반적인 원리
// 수준이며, 공개 전 의료진 검수가 필요합니다.
const ASK = "상담 시 안내";

const ko: SiteContent = {
  ui: {
    brand: "Bliss Globals",
    draftNotice: "예시 콘텐츠 · 의료진 검수 전",
    consultCta: "LINE으로 무료 상담 받기",
    consultBar: "LINE 무료 상담",
    scanCta: "무료 피부 분석 해보기",
    scanBar: "무료 피부 분석",
    comingSoon: "준비 중",
    seeAll: "전체 보기",
    adLabel: "광고",
    aiPersonLabel: "AI 생성 가상인물",
    aiPageNotice: "본 페이지에는 AI로 생성한 가상 인물 사진이 포함되어 있습니다.",
    languageLabel: "언어",
    nav: { treatments: "시술", guide: "가이드" },
    consultMessage: {
      title: "[무료 상담 신청]",
      interest: "관심 시술",
      topic: "궁금한 내용",
      concern: "피부 고민",
    },
  },

  home: {
    eyebrow: "무료 피부 분석",
    heading: "사진 한 장으로\n내 피부 먼저\n알아보세요.",
    subheading: "셀카 한 장으로 색소·주름 상태를 바로 확인해 보세요. 결과가 궁금하면 서울 의원 상담까지 무료로 이어갈 수 있어요.",
    chips: ["무료 피부 분석", "사진은 기기 안에서만 분석", "상담·통역 무료"],
    marquee: ["피코토닝", "스킨부스터", "초음파 리프팅", "고주파 리프팅", "프락셔널 레이저", "여드름 관리", "혈관 레이저"],
    quote: "상담은 가볍게,\n결정은 진료 후에.",
    quoteBy: "시술 여부는 의료진 진료 후 직접 결정하세요.",
    concernsTitle: "어떤 고민이 있으세요?",
    treatmentsTitle: "많이 찾는 시술",
    stepsTitle: "이렇게 진행돼요",
    guideTitle: "서울 시술 여행 가이드",
    clinicTitle: "제휴 의원",
    faqTitle: "자주 묻는 질문",
    finalTitle: "어떤 시술이 맞을지 모르겠다면",
    finalBody: "피부 사진 한 장으로 가볍게 확인해보거나, 바로 상담으로 물어보세요.",
  },

  concernPage: {
    causes: "왜 생길까요?",
    treatments: "서울 피부 클리닉에서는 이렇게 관리해요",
    homeCare: "평소에 이렇게 관리해요",
    scanTitle: "내 피부 상태가 궁금하다면",
    scanBody: "사진 한 장으로 피부 상태를 가볍게 확인해보세요. 사진은 기기 안에서만 분석돼요.",
  },

  treatmentPage: {
    indexTitle: "시술 안내",
    indexIntro: "서울 피부 클리닉에서 많이 받는 시술을 고민별로 정리했어요.",
    relatedConcerns: "이런 고민에",
    forWhom: "이런 분께 맞아요",
    facts: "한눈에 보기",
    cautions: "알아두세요",
    faq: "자주 묻는 질문",
    related: "함께 보면 좋은 시술",
  },

  guidePage: {
    title: "서울 시술 여행 가이드",
    intro: "시술 전후로 들르기 좋은 곳과 챙기면 좋은 것들을 모았어요.",
    lastChecked: "최종 확인일",
    sponsoredNote: "제휴·협찬이 있는 곳은 '광고'로 표시합니다.",
  },

  footer: {
    company: "블리스글로벌스 주식회사",
    registration: "외국인환자 유치업 등록번호 A-2025-01-01-06361",
    disclaimer:
      "본 사이트의 정보는 일반적인 안내이며 의학적 진단이나 처방이 아닙니다. 시술 여부는 반드시 의료진과 상담 후 결정하세요.",
    aiNotice:
      "이 사이트의 사진은 AI로 생성한 이미지이며, 실제 인물·의원·시술 결과가 아닙니다. 피부 분석 점수는 AI가 계산한 참고용 정보입니다.",
    privacy: "개인정보처리방침",
  },

  concerns: [
    {
      slug: "pigment",
      name: "기미·잡티",
      hint: "색소, 칙칙한 톤",
      intro:
        "기미와 잡티는 원인과 깊이에 따라 종류가 여러 가지예요. 겉보기엔 비슷해도 관리 방법이 달라서, 먼저 어떤 색소인지 구분하는 게 중요해요.",
      causes: ["자외선 노출", "호르몬 변화", "트러블이나 자극 뒤에 남은 색소"],
      homeCare: [
        "흐린 날에도 자외선 차단제를 매일 발라요.",
        "강한 각질 제거나 문지르는 습관을 줄여요.",
        "색소 종류는 진료로 구분한 뒤 관리 방법을 정해요.",
      ],
      treatmentSlugs: ["pico-toning", "fractional-laser"],
    },
    {
      slug: "pore",
      name: "모공·피부결",
      hint: "넓은 모공, 거친 결",
      intro:
        "모공은 피지 분비, 탄력 저하, 예전 트러블 자국 등이 겹쳐 넓어 보여요. 결 개선은 한 번보다 꾸준한 관리가 중요한 편이에요.",
      causes: ["많은 피지 분비", "나이에 따른 탄력 저하", "여드름이 남긴 자국"],
      homeCare: [
        "세안은 하루 두 번, 너무 뽀득하지 않게 해요.",
        "보습을 충분히 해서 피부 장벽을 지켜요.",
        "모공을 손으로 짜지 않아요.",
      ],
      treatmentSlugs: ["skin-booster", "fractional-laser"],
    },
    {
      slug: "wrinkle",
      name: "주름·탄력",
      hint: "잔주름, 처짐",
      intro:
        "피부 속 콜라겐과 탄력 섬유가 줄면서 잔주름과 처짐이 생겨요. 피부 깊이와 부위에 따라 맞는 시술이 달라요.",
      causes: ["나이에 따른 콜라겐 감소", "자외선", "반복되는 표정 습관"],
      homeCare: [
        "자외선 차단은 탄력 관리의 기본이에요.",
        "보습으로 잔주름이 도드라지지 않게 해요.",
        "충분한 수면과 수분 섭취도 도움이 돼요.",
      ],
      treatmentSlugs: ["hifu-lifting", "rf-lifting", "skin-booster"],
    },
    {
      slug: "acne",
      name: "여드름·흉터",
      hint: "트러블, 패인 흉터",
      intro:
        "지금 올라오는 여드름과 이미 남은 흉터는 관리 방법이 달라요. 염증이 있을 때는 먼저 진정시키고, 흉터는 그다음 단계로 관리해요.",
      causes: ["피지와 각질이 모공을 막음", "염증 반응", "손으로 짜면서 생긴 상처"],
      homeCare: [
        "손으로 짜거나 만지지 않아요.",
        "자극적인 제품을 여러 개 겹쳐 쓰지 않아요.",
        "염증이 심하면 진료를 먼저 받아요.",
      ],
      treatmentSlugs: ["acne-care", "fractional-laser"],
    },
    {
      slug: "redness",
      name: "홍조·민감",
      hint: "붉은기, 쉽게 붉어짐",
      intro:
        "얼굴이 쉽게 붉어지거나 붉은기가 오래 가는 경우, 혈관이나 피부 장벽과 관련이 있을 수 있어요.",
      causes: ["얼굴 혈관 확장", "약해진 피부 장벽", "급격한 온도 변화와 자극"],
      homeCare: [
        "뜨거운 물 세안과 사우나를 줄여요.",
        "향이 강하거나 자극적인 제품을 피해요.",
        "보습제로 장벽을 꾸준히 관리해요.",
      ],
      treatmentSlugs: ["vascular-laser"],
    },
  ],

  treatments: [
    {
      slug: "pico-toning",
      ready: true,
      name: "피코토닝",
      summary: "아주 짧은 펄스의 레이저로 색소를 잘게 나누어 톤을 정돈하는 시술이에요.",
      forWhom: [
        "기미·잡티 등 색소가 신경 쓰이는 분",
        "전체적으로 피부톤이 칙칙한 분",
        "여행 일정이 짧아 회복 기간이 부담되는 분",
      ],
      facts: [
        { label: "주요 고민", value: "기미·잡티, 칙칙한 톤" },
        { label: "권장 횟수", value: ASK },
        { label: "회복 기간", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "효과와 회복 기간은 피부 상태에 따라 개인차가 있어요.",
        "시술 후에는 자외선 차단이 특히 중요해요.",
        "색소 종류에 따라 다른 시술이 더 맞을 수 있어요.",
      ],
      faq: [
        {
          q: "시술 당일 바로 관광해도 되나요?",
          a: "피부 상태에 따라 달라요. 상담 시 일정에 맞춰 안내해드려요.",
        },
        {
          q: "한 번만 받아도 되나요?",
          a: "목표와 피부 상태에 따라 달라요. 진료 후 권장 횟수를 안내해드려요.",
        },
      ],
    },
    {
      slug: "fractional-laser",
      ready: true,
      name: "프락셔널 레이저",
      summary: "피부에 아주 작은 점 모양으로 열 자극을 주어 재생을 돕는 레이저로, 흉터·모공·피부결 관리에 쓰여요.",
      forWhom: [
        "패인 여드름 흉터가 고민인 분",
        "넓은 모공과 거친 피부결이 고민인 분",
        "피부결을 꾸준히 관리할 계획이 있는 분",
      ],
      facts: [
        { label: "주요 고민", value: "흉터, 모공, 피부결" },
        { label: "권장 횟수", value: ASK },
        { label: "회복 기간", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "시술 후 한동안 붉은기나 각질이 생길 수 있어 일정에 여유를 두는 게 좋아요.",
        "시술 후 자외선 차단이 중요해요.",
        "강도와 횟수는 진료 후 정해요.",
      ],
      faq: [
        {
          q: "여행 중에 받아도 되나요?",
          a: "회복 기간이 필요할 수 있어서, 귀국 일정까지 고려해 상담에서 안내해드려요.",
        },
        {
          q: "모공도 좋아지나요?",
          a: "피부결과 모공 관리에 쓰이지만 효과는 피부 상태에 따라 달라요. 진료 후 기대할 수 있는 범위를 안내해드려요.",
        },
      ],
    },
    {
      slug: "skin-booster",
      ready: true,
      name: "스킨부스터",
      summary: "피부 속에 보습·재생을 돕는 성분을 넣어 결과 윤기를 관리하는 시술을 통틀어 부르는 말이에요.",
      forWhom: [
        "피부가 건조하고 푸석한 분",
        "잔주름과 거친 결이 함께 고민인 분",
        "피부 속 수분감이 부족하게 느껴지는 분",
      ],
      facts: [
        { label: "주요 고민", value: "피부결, 보습, 잔주름" },
        { label: "종류", value: "성분·제품에 따라 다양" },
        { label: "권장 횟수", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "주입 부위에 일시적인 붓기나 멍이 생길 수 있어요.",
        "종류가 많아서 피부 상태에 맞는 제품을 진료로 정해요.",
      ],
      faq: [
        {
          q: "어떤 제품이 좋은가요?",
          a: "피부 상태와 목표에 따라 달라요. 상담에서 선택지를 안내해드려요.",
        },
        {
          q: "시술 후 바로 화장해도 되나요?",
          a: "제품과 시술 방식에 따라 달라요. 시술 후 의료진 안내를 따라주세요.",
        },
      ],
    },
    {
      slug: "hifu-lifting",
      ready: true,
      name: "초음파 리프팅",
      summary: "고강도 집속 초음파(HIFU) 에너지를 피부 아래 깊은 층에 모아 탄력 관리를 돕는 시술이에요.",
      forWhom: [
        "얼굴 윤곽이 처져 보이는 분",
        "절개 없는 탄력 관리를 원하는 분",
        "턱선·볼 라인이 고민인 분",
      ],
      facts: [
        { label: "주요 고민", value: "처짐, 탄력" },
        { label: "권장 주기", value: ASK },
        { label: "회복 기간", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "시술 중 느낌이나 통증 정도는 개인차가 있어요.",
        "효과가 나타나는 시점과 유지 기간은 사람마다 달라요.",
      ],
      faq: [
        {
          q: "고주파 리프팅과 뭐가 다른가요?",
          a: "에너지 종류와 전달 깊이가 달라요. 피부 상태에 따라 하나 또는 함께 권해드려요.",
        },
        {
          q: "아프지 않나요?",
          a: "느끼는 정도는 사람마다 달라요. 의원마다 통증을 줄이는 방법을 함께 안내해요.",
        },
      ],
    },
    {
      slug: "rf-lifting",
      ready: true,
      name: "고주파 리프팅",
      summary: "고주파(RF) 에너지로 피부 속에 열을 전달해 탄력과 결 관리를 돕는 시술이에요.",
      forWhom: [
        "피부가 얇아지고 탄력이 떨어진 분",
        "잔주름과 결을 함께 관리하고 싶은 분",
        "눈가·이마 잔주름이 신경 쓰이는 분",
      ],
      facts: [
        { label: "주요 고민", value: "탄력, 잔주름" },
        { label: "권장 주기", value: ASK },
        { label: "회복 기간", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: ["시술 후 일시적으로 붉어질 수 있어요.", "장비와 강도는 진료 후 정해요."],
      faq: [
        {
          q: "초음파 리프팅과 같이 받을 수 있나요?",
          a: "피부 상태에 따라 함께 권하기도 해요. 진료 후 조합과 순서를 정해요.",
        },
        {
          q: "효과는 바로 보이나요?",
          a: "느끼는 시점과 유지 기간은 사람마다 달라요. 상담에서 기대할 수 있는 범위를 안내해드려요.",
        },
      ],
    },
    {
      slug: "acne-care",
      ready: true,
      name: "여드름 관리",
      summary: "압출, 스케일링, 진정 관리 등을 피부 상태에 맞게 조합하는 관리예요. 염증이 심하면 약 처방이 함께 필요할 수 있어요.",
      forWhom: [
        "반복되는 트러블이 고민인 분",
        "여행 전후로 피부를 정돈하고 싶은 분",
        "여드름 자국과 흉터도 함께 고민인 분",
      ],
      facts: [
        { label: "주요 고민", value: "여드름, 트러블" },
        { label: "구성", value: "피부 상태에 따라 조합" },
        { label: "권장 횟수", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "짧은 체류 동안에는 진정 위주로, 장기 관리는 귀국 후 계획을 함께 세워요.",
        "처방약은 진료를 받아야 받을 수 있어요.",
      ],
      faq: [
        {
          q: "짧은 여행 중에도 받을 수 있나요?",
          a: "체류 기간에는 진정과 정돈 위주로 진행하고, 이후 관리는 귀국 후 계획을 함께 세워요.",
        },
        {
          q: "압출하면 자국이 남지 않나요?",
          a: "의료진이 피부 상태를 보고 진행 여부와 방법을 정해요. 자국이 걱정된다면 상담 때 미리 말씀해 주세요.",
        },
      ],
    },
    {
      slug: "vascular-laser",
      ready: true,
      name: "혈관 레이저",
      summary: "붉은 혈관에 반응하는 파장의 레이저로 홍조와 붉은기를 관리하는 시술이에요.",
      forWhom: [
        "얼굴 붉은기가 오래 가는 분",
        "실핏줄이 비쳐 보이는 분",
        "온도 변화에 얼굴이 쉽게 달아오르는 분",
      ],
      facts: [
        { label: "주요 고민", value: "홍조, 붉은기" },
        { label: "권장 횟수", value: ASK },
        { label: "회복 기간", value: ASK },
        { label: "가격대", value: ASK },
      ],
      cautions: [
        "시술 후 일시적으로 붉은기가 더 보일 수 있어요.",
        "사우나·음주 등 열이 오르는 활동은 의료진 안내에 따라 피해요.",
      ],
      faq: [
        {
          q: "몇 번 받아야 하나요?",
          a: "붉은기 정도와 원인에 따라 달라요. 진료 후 권장 횟수를 안내해드려요.",
        },
        {
          q: "시술 후 바로 관광해도 되나요?",
          a: "일시적인 붉은기나 붓기가 생길 수 있어 일정에 여유를 두는 게 좋아요. 여행 일정에 맞춰 상담에서 안내해드려요.",
        },
      ],
    },
  ],

  steps: [
    { title: "LINE으로 상담", body: "피부 고민과 여행 일정을 알려주세요." },
    { title: "의원·견적 안내", body: "고민에 맞는 제휴 의원과 예상 비용을 안내해요." },
    { title: "예약 후 방한", body: "예약 일정에 맞춰 한국에 오세요." },
    { title: "진료·시술", body: "의료진 진료 후 시술 여부를 결정해요." },
    { title: "귀국 후 관리", body: "궁금한 점은 LINE으로 계속 물어보세요." },
  ],

  guides: [
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-22",
      title: "약국 & 코스메틱 스토어",
      summary: "시술 후 챙길 것과 의원 근처에서 살 수 있는 곳",
      sections: [
        {
          heading: "시술 후 회복 키트",
          body: "새 제품은 의료진이 괜찮다고 한 뒤에 쓰는 게 안전해요.",
          items: [
            "자외선 차단제 — 레이저 시술 후 필수",
            "진정·보습 크림 — 향과 자극이 적은 제품",
            "순한 클렌저 — 문지르지 않고 씻어낼 수 있는 것",
            "모자·양산 — 시술 후 야외 일정이 있다면",
          ],
        },
        {
          heading: "홍대",
          body: "제로랩의원 근처",
          spots: [
            { name: "홍익약국", note: "약국 · 중국어 상담 가능 · 여권 제시 시 즉시 환급", sponsored: false, mapUrl: mapsUrl("홍익약국 서울 마포구 양화로18길 7") },
            { name: "레디영약국 홍대", note: "약국 · 택스리펀 가능", sponsored: false, mapUrl: mapsUrl("레디영약국 홍대 서울 마포구 홍익로6길 8") },
            { name: "올리브영 홍대타운", note: "코스메틱 스토어 · 대형 매장", sponsored: false, mapUrl: mapsUrl("올리브영 홍대타운 서울 마포구 홍익로6길 57") },
          ],
        },
        {
          heading: "강남역",
          body: "디오레의원 근처",
          spots: [
            { name: "옵티마웰니스뮤지엄약국 강남", note: "약국 · 도보 약 7분 · 중국어·영어·일본어 상담 · 즉시 환급", sponsored: false, mapUrl: mapsUrl("옵티마웰니스뮤지엄약국 강남 서울 강남구 강남대로102길 42") },
            { name: "강남 레디영약국", note: "약국 · 도보 약 6분 · 중국어·영어·일본어 상담 · 택스프리", sponsored: false, mapUrl: mapsUrl("강남 레디영약국 서울 서초구 서초대로77길 5") },
            { name: "강남드림약국", note: "약국 · 도보 약 3분 · 택스리펀 가맹점", sponsored: false, mapUrl: mapsUrl("강남드림약국 서울 서초구 강남대로 435") },
            { name: "올리브영 센트럴 강남 타운", note: "코스메틱 스토어 · 도보 약 5분 · 외국어 응대 직원", sponsored: false, mapUrl: mapsUrl("올리브영 센트럴 강남 타운 서울 서초구 강남대로 403") },
          ],
        },
        {
          heading: "압구정·신사",
          body: "베이드·스케줄의원 근처 · 외국인 전문 약국은 많지 않은 지역이에요",
          spots: [
            { name: "압구정퀸약국", note: "약국 · 베이드의원에서 도보 약 3분 · 택스리펀 가맹점", sponsored: false, mapUrl: mapsUrl("압구정퀸약국 서울 강남구 논현로 853") },
            { name: "올리브영 압구정", note: "코스메틱 스토어 · 베이드의원에서 도보 약 2분", sponsored: false, mapUrl: mapsUrl("올리브영 압구정 서울 강남구 논현로 842") },
            { name: "올리브영 압구정로데오역점", note: "코스메틱 스토어 · 스케줄의원에서 도보 약 7분", sponsored: false, mapUrl: mapsUrl("올리브영 압구정로데오역점 서울 강남구 선릉로 817") },
          ],
        },
        {
          heading: "명동",
          body: "관광 동선 · 외국인 대상 약국이 모여 있는 곳",
          spots: [
            { name: "명동레디영약국", note: "약국 · 중국어·영어·일본어 직원 · 택스리펀 가능", sponsored: false, mapUrl: mapsUrl("명동레디영약국 서울 중구 명동8나길 7") },
            { name: "명동타운 레디영약국", note: "약국 · 중국어·영어·일본어 상담 · 위챗페이·알리페이", sponsored: false, mapUrl: mapsUrl("명동타운 레디영약국 서울 중구 명동8가길 31") },
            { name: "올리브영 명동타운", note: "코스메틱 스토어 · 대형 매장", sponsored: false, mapUrl: mapsUrl("올리브영 명동타운 서울 중구 명동길 53") },
          ],
        },
        {
          heading: "약국에서 이렇게 보여주세요",
          items: [
            "자외선 차단제 있나요?",
            "피부 시술 후에 쓸 순한 보습제 추천해 주세요.",
            "이거 하루에 몇 번 바르나요?",
          ],
        },
        {
          heading: "알아두세요",
          body: "환급 방식(즉시·사후)과 영업시간은 매장 사정에 따라 바뀔 수 있어요. 방문 전에 지도에서 확인하고, 환급은 여권을 꼭 챙겨주세요. 제휴·협찬 관계가 없는 정보예요.",
        },
      ],
    },
    {
      slug: "must-buy",
      ready: true,
      lastChecked: "2026-10-21",
      title: "한국 필수 추천템",
      summary: "여행 중 사면 좋은 스킨케어",
      sections: [
        {
          heading: "많이 사가는 제품군",
          items: [
            "선크림 — 종류가 다양하고 가볍게 발리는 제품이 많아요",
            "시트 마스크팩 — 여행 선물로도 좋아요",
            "진정 크림 — 민감한 피부용 제품이 많아요",
            "클렌징 제품 — 클렌징 오일·폼",
            "립·핸드 보습제",
          ],
        },
        {
          heading: "어디서 사나요?",
          items: [
            "드럭스토어(H&B 스토어) — 종류가 가장 많아요",
            "약국 — 피부 시술 후 관리용 제품",
            "면세점 — 출국 전에 들르기 좋아요",
          ],
        },
        {
          heading: "구매 팁",
          items: [
            "시술 직후에는 새로운 제품을 바로 쓰지 말고 의료진에게 먼저 확인해요.",
            "외국인 세금 환급 가능 여부는 매장에서 확인해요.",
          ],
        },
      ],
    },
    {
      slug: "food",
      ready: true,
      lastChecked: "2026-10-22",
      title: "시술 후 식사 가이드",
      summary: "지하철역 기준 · 협찬 없이 고른 식당",
      sections: [
        {
          heading: "시술 직후에는 이렇게",
          body: "시술 종류에 따라 다르니 의료진 안내를 가장 먼저 따라주세요.",
          items: [
            "음주는 의료진이 괜찮다고 할 때까지 피해요.",
            "사우나·찜질방처럼 열이 오르는 곳은 미뤄요.",
            "아주 맵거나 뜨거운 음식은 얼굴이 달아오를 수 있어요.",
          ],
        },
        {
          heading: "합정·홍대입구",
          body: "2·6호선 합정역, 2호선 홍대입구역",
          spots: [
            { name: "합정옥", note: "합정역 8번 출구 도보 4분 · 곰탕 · 담백한 국물", sponsored: false, mapUrl: mapsUrl("합정옥 서울 마포구 양화로1길 21") },
            { name: "옥동식 서교점", note: "합정역 2번 출구 도보 5분 · 돼지곰탕 · 맑은 국물이라 시술 후에도 부담 없어요 · 좌석이 적어 대기가 있을 수 있어요", sponsored: false, mapUrl: mapsUrl("옥동식 서교점 서울 마포구 양화로7길 44-10") },
            { name: "진진", note: "합정역 2번 출구 도보 7분 · 중식 · 매운 메뉴는 시술 직후 피하세요 · 예약 가능", sponsored: false, mapUrl: mapsUrl("진진 서울 마포구 월드컵북로1길 60") },
            { name: "백년토종삼계탕 본점", note: "홍대입구역 9번 출구 도보 7분 · 삼계탕", sponsored: false, mapUrl: mapsUrl("백년토종삼계탕 본점 서울 마포구 양화로 118") },
            { name: "서교난면방", note: "망원역 도보 7분 · 우리밀 국수", sponsored: false, mapUrl: mapsUrl("서교난면방 서울 마포구 동교로12길 16") },
          ],
        },
        {
          heading: "교대·강남구청·학동",
          body: "2·3호선 교대역, 7호선 강남구청역·학동역",
          spots: [
            { name: "3대 삼계장인", note: "교대역 14번 출구 도보 4분 · 삼계탕 · 대기가 있을 수 있어요", sponsored: false, mapUrl: mapsUrl("3대 삼계장인 서울 서초구 반포대로28길 56-3") },
            { name: "진미평양냉면 본관", note: "강남구청역 3번 출구 도보 7분 · 평양냉면·만두", sponsored: false, mapUrl: mapsUrl("진미평양냉면 본관 서울 강남구 학동로 307") },
            { name: "유정식당", note: "학동역 도보 12분 · 쌈밥 정식 · 제육·김치는 매운 편 · 2인 이상", sponsored: false, mapUrl: mapsUrl("유정식당 서울 강남구 도산대로28길 14") },
          ],
        },
        {
          heading: "명동·을지로",
          body: "4호선 명동역, 2호선 을지로입구역, 2·5호선 을지로4가역",
          spots: [
            { name: "우래옥 본점", note: "을지로4가역 4번 출구 도보 2분 · 평양냉면", sponsored: false, mapUrl: mapsUrl("우래옥 본점 서울 중구 창경궁로 62-29") },
            { name: "명동교자 본점", note: "명동역 9번 출구 도보 2분 · 칼국수 · 김치 마늘이 강한 편 · 대기 줄이 길어요", sponsored: false, mapUrl: mapsUrl("명동교자 본점 서울 중구 퇴계로 129") },
            { name: "영양센타 본점", note: "명동역 6번 출구 도보 3분 · 삼계탕·전기구이 통닭", sponsored: false, mapUrl: mapsUrl("영양센타 본점 서울 중구 명동2길 52") },
            { name: "하동관", note: "을지로입구역 5번 출구 도보 5분 · 곰탕 · 오후 일찍 닫고 일요일 휴무", sponsored: false, mapUrl: mapsUrl("하동관 서울 중구 명동9길 12") },
            { name: "신선설농탕 명동점", note: "명동역 8번 출구 도보 6분 · 설렁탕", sponsored: false, mapUrl: mapsUrl("신선설농탕 명동점 서울 중구 명동길 56") },
            { name: "능라도 명동점", note: "명동역 8번 출구 도보 6분 · 평양냉면·온반", sponsored: false, mapUrl: mapsUrl("능라도 명동점 서울 중구 명동길 53") },
          ],
        },
        {
          heading: "성수",
          body: "2호선 성수역",
          spots: [
            { name: "조조칼국수 성수점", note: "성수역 2번 출구 도보 2분 · 조개칼국수", sponsored: false, mapUrl: mapsUrl("조조칼국수 성수점 서울 성동구 성수일로8길 55") },
            { name: "능동미나리 성수점", note: "성수역 4번 출구 도보 5분 · 곰탕", sponsored: false, mapUrl: mapsUrl("능동미나리 성수점 서울 성동구 연무장길 42") },
            { name: "꿉당 성수점", note: "성수역 도보 5분 · 돼지고기 구이 · 시술 직후에는 기름진 구이를 피하는 게 좋아요", sponsored: false, mapUrl: mapsUrl("꿉당 성수점 서울 성동구 성수이로20길 10") },
            { name: "성수다락", note: "성수역 도보 11분 · 오므라이스", sponsored: false, mapUrl: mapsUrl("성수다락 서울 성동구 뚝섬로9길 20") },
          ],
        },
        {
          heading: "알아두세요",
          body: "유명한 곳은 대기가 길 수 있고, 영업시간·휴무는 자주 바뀌어요. 방문 전에 지도에서 확인해주세요. 제휴·협찬 관계가 없는 정보예요. 도보 시간은 카카오맵 도보 경로 기준이에요.",
        },
      ],
    },
    {
      slug: "itinerary",
      ready: true,
      lastChecked: "2026-10-21",
      title: "시술 + 여행 3박 4일",
      summary: "회복 기간을 고려한 일정 예시",
      sections: [
        {
          heading: "1일차 · 도착",
          items: ["숙소 체크인", "가벼운 저녁과 휴식", "다음 날 진료 시간 확인"],
        },
        {
          heading: "2일차 · 진료와 시술",
          items: ["의료진 진료 후 시술", "약국에서 회복 키트 준비", "무리하지 않는 실내 일정"],
        },
        {
          heading: "3일차 · 가벼운 관광",
          items: ["쇼핑몰·미술관 등 실내 위주", "자외선 차단 철저히", "필요하면 재진료"],
        },
        {
          heading: "4일차 · 귀국",
          items: ["면세점 쇼핑", "귀국 후 궁금한 점은 LINE으로 문의"],
        },
        {
          heading: "꼭 확인하세요",
          body: "회복 기간은 시술마다 달라요. 귀국일에 맞춰 시술 일정을 정해야 하니 예약 전에 상담으로 확인해주세요.",
        },
      ],
    },
  ],

  // 출처: 각 의원 공식 홈페이지·카카오맵(2026-10-22 조사). 진료시간은 출처마다
  // 달라서 싣지 않고 공식 홈페이지로 안내합니다. 시술 목록도 의원 광고 영역이라 싣지 않습니다.
  clinics: [
    {
      slug: "zerolab",
      name: "제로랩의원",
      formerName: "샤인빔의원 홍대",
      area: "홍대",
      address: "서울 마포구 양화로 151 욱도빌딩 5~7층",
      station: "홍대입구역 1번 출구",
      phone: "1544-5598",
      homepage: "http://zerolabclinic.com",
      languages: "중국어(간체·번체)·영어·일본어·태국어 안내 페이지",
      links: [{ label: "Instagram", url: "https://www.instagram.com/zerolabclinic_global/" }],
    },
    {
      slug: "diore",
      name: "디오레의원",
      area: "강남역·신논현",
      address: "서울 강남구 강남대로 428 만이빌딩 9층",
      station: "신논현역 6번 출구 · 강남역 11번 출구 도보 5분",
      phone: "02-553-5533",
      homepage: "https://dioreclinic.com/ko",
      languages: "영어·일본어·중국어·태국어 홈페이지",
      links: [{ label: "Instagram", url: "https://www.instagram.com/diore_clinic_eng/" }],
    },
    {
      slug: "baid",
      name: "베이드의원",
      area: "압구정·신사",
      address: "서울 강남구 논현로 839 서원식스 4층",
      station: "압구정역 4번 출구 도보 2분",
      phone: "02-511-1985",
      homepage: "https://www.baidclinic.com",
      languages: "외국어 응대 범위는 상담 시 안내",
      links: [{ label: "Instagram", url: "https://www.instagram.com/baidclinic_kor/" }],
    },
    {
      slug: "schedule",
      name: "스케줄의원",
      area: "압구정로데오·도산공원",
      address: "서울 강남구 도산대로49길 11 IVY빌딩 3층",
      station: "압구정로데오역 5번 출구",
      phone: "02-511-7773",
      homepage: "http://scheduleclinic.kr",
      languages: "외국어 응대 범위는 상담 시 안내",
      links: [{ label: "Instagram", url: "https://www.instagram.com/schedule_clinic/" }],
    },
  ],

  clinicPage: {
    title: "제휴 의원",
    intro: "고민과 일정에 맞는 의원을 상담에서 안내해드려요. 진료시간과 시술 정보는 각 의원 홈페이지에서 확인할 수 있어요.",
    address: "주소",
    station: "가까운 역",
    phone: "전화",
    languages: "외국어 안내",
    homepage: "의원 홈페이지",
    map: "지도에서 보기",
    formerName: "구",
    detailNote: "진료시간·시술 정보는 의원 홈페이지 기준이며 바뀔 수 있어요. 방문 전 상담에서 다시 확인해드려요.",
    consultInterest: "희망 의원",
  },

  faq: [
    {
      q: "상담은 정말 무료인가요?",
      a: "네, LINE 상담은 무료예요. 시술 비용은 의원과 시술에 따라 달라서 상담 때 안내해드려요.",
    },
    {
      q: "어떤 의원을 소개받나요?",
      a: "제휴 의원 중에서 고민과 일정에 맞는 곳을 안내해드려요.",
    },
    {
      q: "한국어를 못해도 괜찮나요?",
      a: "괜찮아요. 진료 통역과 예약 대행은 무료로 도와드려요.",
    },
    {
      q: "무료 통역·예약 대행은 누구나 받을 수 있나요?",
      a: "한국 건강보험에 가입하지 않았고 한국 외국인등록이 없는 단기 방문객이 대상이에요. 상담 때 간단히 확인해드려요.",
    },
    {
      q: "결제는 어떻게 하나요?",
      a: "결제 방법과 시점은 의원마다 달라서 상담 때 안내해드려요.",
    },
    {
      q: "귀국 후에 문제가 생기면요?",
      a: "LINE으로 문의해주시면 진료받은 의원과 연결해드려요. (사후 관리 범위 확인 필요)",
    },
    {
      q: "피부 분석 결과로 진단을 받을 수 있나요?",
      a: "아니요. 피부 분석 결과는 참고용 정보이며 진단이 아니에요. 정확한 상태는 의료진 진료로 확인해요.",
    },
  ],
};

export default ko;
