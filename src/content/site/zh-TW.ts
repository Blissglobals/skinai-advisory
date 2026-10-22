import { mapsUrl, type SiteContent } from "./index";

// ko.ts의 번체(대만) 번역입니다. 구조·순서·slug·URL은 ko.ts와 같아야 합니다.
// 의원 이름·주소는 한국어 그대로 둡니다(택시·지도 검색용).
const ASK = "諮詢時說明";

const zhTW: SiteContent = {
  ui: {
    brand: "Bliss Globals",
    draftNotice: "範例內容・尚未經醫師審閱",
    consultCta: "透過LINE免費諮詢",
    consultBar: "LINE免費諮詢",
    scanCta: "試試免費肌膚分析",
    scanBar: "免費肌膚分析",
    comingSoon: "準備中",
    seeAll: "查看全部",
    adLabel: "廣告",
    aiPersonLabel: "AI生成虛擬人物",
    aiPageNotice: "本頁含有AI生成的虛擬人物照片。",
    languageLabel: "語言",
    nav: { treatments: "療程", guide: "指南" },
    consultMessage: {
      title: "【免費諮詢申請】",
      interest: "感興趣的療程",
      topic: "想詢問的內容",
      concern: "肌膚困擾",
    },
  },

  home: {
    eyebrow: "免費肌膚分析",
    heading: "一張照片，\n先了解\n自己的肌膚。",
    subheading: "用一張自拍立即查看色斑與皺紋狀態。想進一步了解，還能免費諮詢首爾診所。",
    chips: ["免費肌膚分析", "照片僅在手機內分析", "諮詢與口譯免費"],
    marquee: ["皮秒雷射", "水光針", "音波拉提", "電波拉提", "飛梭雷射", "痘痘療程", "血管雷射"],
    quote: "諮詢可以輕鬆問，\n決定留到看診後。",
    quoteBy: "是否接受療程，請在醫師看診後自行決定。",
    concernsTitle: "您有哪些肌膚困擾？",
    treatmentsTitle: "熱門療程",
    stepsTitle: "服務流程",
    guideTitle: "首爾療程旅遊指南",
    clinicTitle: "合作診所",
    faqTitle: "常見問題",
    finalTitle: "不確定哪種療程適合自己？",
    finalBody: "用一張肌膚照片輕鬆看看，或直接透過諮詢詢問我們。",
  },

  concernPage: {
    causes: "為什麼會出現？",
    treatments: "首爾皮膚診所常見的處理方式",
    homeCare: "日常保養這樣做",
    scanTitle: "想了解自己的肌膚狀態？",
    scanBody: "用一張照片輕鬆看看肌膚狀態。照片只會在您的裝置上分析。",
  },

  treatmentPage: {
    indexTitle: "療程介紹",
    indexIntro: "依肌膚困擾整理了首爾皮膚診所常見的療程。",
    relatedConcerns: "適合這些困擾",
    forWhom: "適合這樣的人",
    facts: "重點整理",
    cautions: "注意事項",
    faq: "常見問題",
    related: "相關療程",
  },

  guidePage: {
    title: "首爾療程旅遊指南",
    intro: "整理了療程前後適合去的地方，以及值得準備的東西。",
    lastChecked: "最後確認日期",
    sponsoredNote: "有合作或贊助的店家會標示「廣告」。",
  },

  footer: {
    company: "Bliss Globals（블리스글로벌스 주식회사）",
    registration: "外國人患者招攬業登錄號碼 A-2025-01-01-06361",
    disclaimer:
      "本網站資訊僅為一般性說明，並非醫學診斷或處方。是否接受療程，請務必與醫師諮詢後再決定。",
    aiNotice:
      "本網站的照片皆為AI生成圖像，並非真實人物、診所或療程結果。肌膚分析分數為AI計算的參考資訊。",
    privacy: "隱私權政策",
  },

  concerns: [
    {
      slug: "pigment",
      name: "肝斑・斑點",
      hint: "色素沉澱、膚色暗沉",
      intro:
        "肝斑和斑點依成因與深度分為許多種類。外觀看起來相似，處理方式卻不同，所以先分辨是哪一種色素很重要。",
      causes: ["紫外線照射", "荷爾蒙變化", "痘痘或刺激後留下的色素"],
      homeCare: [
        "陰天也要每天擦防曬。",
        "減少過度去角質或搓揉的習慣。",
        "先透過看診分辨色素種類，再決定處理方式。",
      ],
      treatmentSlugs: ["pico-toning", "fractional-laser"],
    },
    {
      slug: "pore",
      name: "毛孔・膚質",
      hint: "毛孔粗大、膚質粗糙",
      intro:
        "皮脂分泌、彈性下降、過去的痘疤等因素疊加，會讓毛孔看起來比較明顯。改善膚質比起做一次，持續保養通常更重要。",
      causes: ["皮脂分泌旺盛", "隨年齡下降的彈性", "痘痘留下的痕跡"],
      homeCare: [
        "一天洗臉兩次，不要洗到過於乾澀緊繃。",
        "做好保濕，守護肌膚屏障。",
        "不要用手擠毛孔。",
      ],
      treatmentSlugs: ["skin-booster", "fractional-laser"],
    },
    {
      slug: "wrinkle",
      name: "皺紋・彈性",
      hint: "細紋、鬆弛",
      intro:
        "肌膚裡的膠原蛋白和彈力纖維減少，就會出現細紋與鬆弛。依肌膚深度和部位，適合的療程也不同。",
      causes: ["隨年齡減少的膠原蛋白", "紫外線", "重複的表情習慣"],
      homeCare: [
        "防曬是維持彈性的基本。",
        "做好保濕，讓細紋不那麼明顯。",
        "充足的睡眠和水分補充也有幫助。",
      ],
      treatmentSlugs: ["hifu-lifting", "rf-lifting", "skin-booster"],
    },
    {
      slug: "acne",
      name: "痘痘・痘疤",
      hint: "反覆冒痘、凹陷痘疤",
      intro:
        "正在冒的痘痘和已經留下的痘疤，處理方式不同。有發炎時要先鎮定，痘疤則在下一階段處理。",
      causes: ["皮脂與角質堵塞毛孔", "發炎反應", "用手擠痘造成的傷口"],
      homeCare: [
        "不要用手擠或摸。",
        "不要疊加使用多種刺激性產品。",
        "發炎嚴重時，請先就醫看診。",
      ],
      treatmentSlugs: ["acne-care", "fractional-laser"],
    },
    {
      slug: "redness",
      name: "泛紅・敏感",
      hint: "臉部泛紅、容易發紅",
      intro: "臉部容易泛紅，或紅色久久不退時，可能與血管或肌膚屏障有關。",
      causes: ["臉部血管擴張", "肌膚屏障變弱", "溫度劇烈變化與刺激"],
      homeCare: [
        "減少用熱水洗臉和洗三溫暖。",
        "避開香味濃或刺激性的產品。",
        "用保濕產品持續照顧肌膚屏障。",
      ],
      treatmentSlugs: ["vascular-laser"],
    },
  ],

  treatments: [
    {
      slug: "pico-toning",
      ready: true,
      name: "皮秒雷射",
      summary: "利用脈衝極短的雷射，將色素分解成細小顆粒，幫助均勻膚色的療程。",
      forWhom: [
        "在意肝斑、斑點等色素問題的人",
        "整體膚色暗沉的人",
        "旅遊行程短、擔心恢復期的人",
      ],
      facts: [
        { label: "主要困擾", value: "肝斑・斑點、膚色暗沉" },
        { label: "建議次數", value: ASK },
        { label: "恢復期", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "效果與恢復期會依肌膚狀態而有個人差異。",
        "療程後特別要做好防曬。",
        "依色素種類，其他療程可能更合適。",
      ],
      faq: [
        {
          q: "療程當天可以直接去觀光嗎？",
          a: "依肌膚狀態而定。諮詢時會配合您的行程說明。",
        },
        {
          q: "只做一次可以嗎？",
          a: "依目標和肌膚狀態而定。看診後會說明建議次數。",
        },
      ],
    },
    {
      slug: "fractional-laser",
      ready: true,
      name: "飛梭雷射",
      summary: "以極細小的點狀在肌膚上給予熱刺激、幫助肌膚再生的雷射，常用於痘疤、毛孔與膚質保養。",
      forWhom: [
        "有凹陷痘疤困擾的人",
        "在意毛孔粗大和膚質粗糙的人",
        "打算持續保養膚質的人",
      ],
      facts: [
        { label: "主要困擾", value: "痘疤、毛孔、膚質" },
        { label: "建議次數", value: ASK },
        { label: "恢復期", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "療程後一段時間可能出現泛紅或脫屑，建議行程保留彈性。",
        "療程後要做好防曬。",
        "強度與次數於看診後決定。",
      ],
      faq: [
        {
          q: "旅遊期間可以做嗎？",
          a: "可能需要恢復期，諮詢時會連同回國行程一起考量說明。",
        },
        {
          q: "毛孔也會改善嗎？",
          a: "常用於膚質與毛孔保養，但效果依肌膚狀態而不同。看診後會說明可以期待的範圍。",
        },
      ],
    },
    {
      slug: "skin-booster",
      ready: true,
      name: "水光・肌膚保養針劑",
      summary: "將有助保濕、修護的成分注入肌膚內，以保養膚質與光澤的療程總稱。",
      forWhom: [
        "肌膚乾燥、粗糙沒光澤的人",
        "同時在意細紋與膚質粗糙的人",
        "覺得肌膚內部缺水的人",
      ],
      facts: [
        { label: "主要困擾", value: "膚質、保濕、細紋" },
        { label: "種類", value: "依成分與產品而異" },
        { label: "建議次數", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "注射部位可能暫時出現腫脹或瘀青。",
        "種類很多，會經看診選擇適合肌膚狀態的產品。",
      ],
      faq: [
        {
          q: "哪種產品比較好？",
          a: "依肌膚狀態與目標而定。諮詢時會說明可選擇的方案。",
        },
        {
          q: "療程後可以馬上化妝嗎？",
          a: "依產品與施打方式而不同。請依照療程後醫師的指示。",
        },
      ],
    },
    {
      slug: "hifu-lifting",
      ready: true,
      name: "音波拉提",
      summary: "將高強度聚焦超音波（HIFU）的能量集中在皮膚下較深的層次，幫助保養肌膚彈性的療程。",
      forWhom: [
        "臉部輪廓看起來下垂的人",
        "想做不開刀的彈性保養的人",
        "在意下顎線、臉頰線條的人",
      ],
      facts: [
        { label: "主要困擾", value: "鬆弛、彈性" },
        { label: "建議間隔", value: ASK },
        { label: "恢復期", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "療程中的感受與疼痛程度因人而異。",
        "效果出現的時間與維持期間因人而異。",
      ],
      faq: [
        {
          q: "和電波拉提有什麼不同？",
          a: "能量種類和作用深度不同。會依肌膚狀態，建議其中一種或搭配進行。",
        },
        {
          q: "會痛嗎？",
          a: "感受程度因人而異。各診所也會一併說明減輕疼痛的方式。",
        },
      ],
    },
    {
      slug: "rf-lifting",
      ready: true,
      name: "電波拉提",
      summary: "利用射頻（RF）能量將熱傳遞到肌膚內，幫助保養彈性與膚質的療程。",
      forWhom: [
        "肌膚變薄、彈性下降的人",
        "想同時保養細紋與膚質的人",
        "在意眼周、額頭細紋的人",
      ],
      facts: [
        { label: "主要困擾", value: "彈性、細紋" },
        { label: "建議間隔", value: ASK },
        { label: "恢復期", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: ["療程後可能暫時泛紅。", "儀器與強度於看診後決定。"],
      faq: [
        {
          q: "可以和音波拉提一起做嗎？",
          a: "依肌膚狀態，有時會建議搭配進行。看診後決定組合與順序。",
        },
        {
          q: "效果馬上看得到嗎？",
          a: "感受到效果的時間與維持期間因人而異。諮詢時會說明可以期待的範圍。",
        },
      ],
    },
    {
      slug: "acne-care",
      ready: true,
      name: "痘痘療程",
      summary: "依肌膚狀態組合清粉刺、深層清潔、鎮定保養等的療程。發炎嚴重時，可能需要同時搭配藥物處方。",
      forWhom: [
        "反覆冒痘的人",
        "想在旅行前後整理肌膚狀態的人",
        "同時在意痘印與痘疤的人",
      ],
      facts: [
        { label: "主要困擾", value: "痘痘、肌膚問題" },
        { label: "內容", value: "依肌膚狀態組合" },
        { label: "建議次數", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "短暫停留期間以鎮定為主，長期保養會一起規劃回國後的安排。",
        "處方藥需經看診才能取得。",
      ],
      faq: [
        {
          q: "短期旅遊也可以做嗎？",
          a: "停留期間以鎮定和整理肌膚為主，之後的保養會一起規劃回國後的安排。",
        },
        {
          q: "清粉刺會留下痕跡嗎？",
          a: "醫師會依肌膚狀態決定是否進行以及方式。如果擔心留下痕跡，請在諮詢時事先告訴我們。",
        },
      ],
    },
    {
      slug: "vascular-laser",
      ready: true,
      name: "血管雷射",
      summary: "使用對紅色血管有反應的波長雷射，處理潮紅與泛紅的療程。",
      forWhom: [
        "臉部泛紅久久不退的人",
        "看得到紅血絲的人",
        "遇到溫度變化臉就容易發熱泛紅的人",
      ],
      facts: [
        { label: "主要困擾", value: "潮紅、泛紅" },
        { label: "建議次數", value: ASK },
        { label: "恢復期", value: ASK },
        { label: "價格範圍", value: ASK },
      ],
      cautions: [
        "療程後可能暫時看起來更紅。",
        "三溫暖、飲酒等會讓身體發熱的活動，請依醫師指示避免。",
      ],
      faq: [
        {
          q: "需要做幾次？",
          a: "依泛紅程度與原因而定。看診後會說明建議次數。",
        },
        {
          q: "療程後可以馬上去觀光嗎？",
          a: "可能出現暫時性的泛紅或腫脹，建議行程保留彈性。諮詢時會配合旅遊行程說明。",
        },
      ],
    },
  ],

  steps: [
    { title: "透過LINE諮詢", body: "告訴我們您的肌膚困擾和旅遊行程。" },
    { title: "診所與報價說明", body: "說明適合您的合作診所與預估費用。" },
    { title: "預約後來韓", body: "依預約日期前來韓國。" },
    { title: "看診與療程", body: "經醫師看診後，再決定是否接受療程。" },
    { title: "回國後照護", body: "有任何問題，都可以繼續透過LINE詢問。" },
  ],

  guides: [
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-22",
      title: "藥局 & 美妝店",
      summary: "療程後要準備的東西，以及診所附近可購買的地點",
      sections: [
        {
          heading: "術後修護包",
          body: "新產品在醫師同意後再使用比較安全。",
          items: [
            "防曬乳 — 雷射療程後必備",
            "鎮定・保濕霜 — 選擇香料少、刺激性低的產品",
            "溫和的洗面產品 — 不需搓揉就能洗淨的",
            "帽子・陽傘 — 療程後有戶外行程時",
          ],
        },
        {
          heading: "弘大",
          body: "제로랩의원附近",
          spots: [
            { name: "홍익약국", note: "藥局・可用中文諮詢・出示護照可現場退稅", sponsored: false, mapUrl: mapsUrl("홍익약국 서울 마포구 양화로18길 7") },
            { name: "레디영약국 홍대", note: "藥局・可辦理退稅", sponsored: false, mapUrl: mapsUrl("레디영약국 홍대 서울 마포구 홍익로6길 8") },
            { name: "올리브영 홍대타운", note: "美妝店・大型門市", sponsored: false, mapUrl: mapsUrl("올리브영 홍대타운 서울 마포구 홍익로6길 57") },
          ],
        },
        {
          heading: "江南站",
          body: "디오레의원附近",
          spots: [
            { name: "옵티마웰니스뮤지엄약국 강남", note: "藥局・步行約7分鐘・可用中文、英文、日文諮詢・現場退稅", sponsored: false, mapUrl: mapsUrl("옵티마웰니스뮤지엄약국 강남 서울 강남구 강남대로102길 42") },
            { name: "강남 레디영약국", note: "藥局・步行約6分鐘・可用中文、英文、日文諮詢・可退稅", sponsored: false, mapUrl: mapsUrl("강남 레디영약국 서울 서초구 서초대로77길 5") },
            { name: "강남드림약국", note: "藥局・步行約3分鐘・退稅特約店", sponsored: false, mapUrl: mapsUrl("강남드림약국 서울 서초구 강남대로 435") },
            { name: "올리브영 센트럴 강남 타운", note: "美妝店・步行約5分鐘・有外語服務人員", sponsored: false, mapUrl: mapsUrl("올리브영 센트럴 강남 타운 서울 서초구 강남대로 403") },
          ],
        },
        {
          heading: "狎鷗亭・新沙",
          body: "베이드의원・스케줄의원附近・這一區專為外國旅客服務的藥局不多",
          spots: [
            { name: "압구정퀸약국", note: "藥局・從베이드의원步行約3分鐘・退稅特約店", sponsored: false, mapUrl: mapsUrl("압구정퀸약국 서울 강남구 논현로 853") },
            { name: "올리브영 압구정", note: "美妝店・從베이드의원步行約2分鐘", sponsored: false, mapUrl: mapsUrl("올리브영 압구정 서울 강남구 논현로 842") },
            { name: "올리브영 압구정로데오역점", note: "美妝店・從스케줄의원步行約7分鐘", sponsored: false, mapUrl: mapsUrl("올리브영 압구정로데오역점 서울 강남구 선릉로 817") },
          ],
        },
        {
          heading: "明洞",
          body: "觀光路線上・專為外國旅客服務的藥局集中區",
          spots: [
            { name: "명동레디영약국", note: "藥局・有會說中文、英文、日文的店員・可辦理退稅", sponsored: false, mapUrl: mapsUrl("명동레디영약국 서울 중구 명동8나길 7") },
            { name: "명동타운 레디영약국", note: "藥局・可用中文、英文、日文諮詢・可用微信支付、支付寶", sponsored: false, mapUrl: mapsUrl("명동타운 레디영약국 서울 중구 명동8가길 31") },
            { name: "올리브영 명동타운", note: "美妝店・大型門市", sponsored: false, mapUrl: mapsUrl("올리브영 명동타운 서울 중구 명동길 53") },
          ],
        },
        {
          heading: "在藥局可以出示這些句子",
          items: [
            "자외선 차단제 있나요?（有防曬乳嗎？）",
            "피부 시술 후에 쓸 순한 보습제 추천해 주세요.（請推薦適合皮膚療程後使用的溫和保濕產品。）",
            "이거 하루에 몇 번 바르나요?（這個一天擦幾次？）",
          ],
        },
        {
          heading: "小提醒",
          body: "退稅方式（現場退稅・事後退稅）與營業時間可能因店家情況而變動。造訪前請先在地圖上確認，辦理退稅請務必攜帶護照。以上資訊與店家沒有任何合作或贊助關係。",
        },
      ],
    },
    {
      slug: "must-buy",
      ready: true,
      lastChecked: "2026-10-21",
      title: "韓國必買推薦",
      summary: "旅行途中值得買的保養品",
      sections: [
        {
          heading: "熱門購買品項",
          items: [
            "防曬乳 — 種類多，很多質地輕薄好推開",
            "片狀面膜 — 也很適合當伴手禮",
            "鎮定霜 — 有很多敏感肌適用的產品",
            "清潔產品 — 卸妝油・洗面乳",
            "護唇・護手保濕產品",
          ],
        },
        {
          heading: "在哪裡買？",
          items: [
            "美妝藥妝店（H&B）— 品項最多",
            "藥局 — 療程後保養用產品",
            "免稅店 — 出國前順路逛很方便",
          ],
        },
        {
          heading: "購買小提醒",
          items: [
            "療程剛結束時，不要立刻使用新產品，請先詢問醫師。",
            "是否能辦理外國人退稅，請在店內確認。",
          ],
        },
      ],
    },
    {
      slug: "food",
      ready: true,
      lastChecked: "2026-10-22",
      title: "療程後飲食指南",
      summary: "依地鐵站整理・無業配推薦餐廳",
      sections: [
        {
          heading: "療程剛結束時這樣做",
          body: "依療程種類而不同，請優先遵照醫師的指示。",
          items: [
            "在醫師說可以之前，請避免飲酒。",
            "三溫暖、汗蒸幕等會讓身體發熱的地方，請先延後。",
            "很辣或很燙的食物，可能讓臉部發熱泛紅。",
          ],
        },
        {
          heading: "合井・弘大入口",
          body: "2、6號線合井站・2號線弘大入口站",
          spots: [
            { name: "합정옥", note: "合井站8號出口步行4分鐘・牛骨湯・湯頭清淡", sponsored: false, mapUrl: mapsUrl("합정옥 서울 마포구 양화로1길 21") },
            { name: "옥동식 서교점（玉東植）", note: "合井站2號出口步行5分鐘・豬肉清湯飯・湯頭清爽，療程後吃也沒負擔・座位少，可能需要排隊", sponsored: false, mapUrl: mapsUrl("옥동식 서교점 서울 마포구 양화로7길 44-10") },
            { name: "진진", note: "合井站2號出口步行7分鐘・中式料理・療程後不久請避開辣的菜色・可預約", sponsored: false, mapUrl: mapsUrl("진진 서울 마포구 월드컵북로1길 60") },
            { name: "백년토종삼계탕 본점（百年土種蔘雞湯）", note: "弘大入口站9號出口步行7分鐘・蔘雞湯", sponsored: false, mapUrl: mapsUrl("백년토종삼계탕 본점 서울 마포구 양화로 118") },
            { name: "서교난면방", note: "望遠站步行7分鐘・韓國本土小麥麵", sponsored: false, mapUrl: mapsUrl("서교난면방 서울 마포구 동교로12길 16") },
          ],
        },
        {
          heading: "教大・江南區廳・鶴洞",
          body: "2、3號線教大站・7號線江南區廳站、鶴洞站",
          spots: [
            { name: "3대 삼계장인", note: "教大站14號出口步行4分鐘・蔘雞湯・可能需要排隊", sponsored: false, mapUrl: mapsUrl("3대 삼계장인 서울 서초구 반포대로28길 56-3") },
            { name: "진미평양냉면 본관", note: "江南區廳站3號出口步行7分鐘・平壤冷麵・餃子", sponsored: false, mapUrl: mapsUrl("진미평양냉면 본관 서울 강남구 학동로 307") },
            { name: "유정식당（有情餐館）", note: "鶴洞站步行12分鐘・包飯套餐・辣炒豬肉和泡菜偏辣・2人以上供餐", sponsored: false, mapUrl: mapsUrl("유정식당 서울 강남구 도산대로28길 14") },
          ],
        },
        {
          heading: "明洞・乙支路",
          body: "4號線明洞站・2號線乙支路入口站・2、5號線乙支路4街站",
          spots: [
            { name: "우래옥 본점", note: "乙支路4街站4號出口步行2分鐘・平壤冷麵", sponsored: false, mapUrl: mapsUrl("우래옥 본점 서울 중구 창경궁로 62-29") },
            { name: "영양센타 본점（明洞營養中心）", note: "明洞站6號出口步行3分鐘・蔘雞湯・電烤全雞", sponsored: false, mapUrl: mapsUrl("영양센타 본점 서울 중구 명동2길 52") },
            { name: "하동관（河東館）", note: "乙支路入口站5號出口步行5分鐘・牛骨湯・下午較早打烊，週日公休", sponsored: false, mapUrl: mapsUrl("하동관 서울 중구 명동9길 12") },
            { name: "신선설농탕 명동점（神仙雪濃湯）", note: "明洞站8號出口步行6分鐘・雪濃湯", sponsored: false, mapUrl: mapsUrl("신선설농탕 명동점 서울 중구 명동길 56") },
            { name: "능라도 명동점（綾羅島冷麵）", note: "明洞站8號出口步行6分鐘・平壤冷麵・溫湯飯", sponsored: false, mapUrl: mapsUrl("능라도 명동점 서울 중구 명동길 53") },
            { name: "명동교자（明洞餃子）", note: "明洞站附近・韓式刀切麵・泡菜蒜味較重・排隊人潮多", sponsored: false, mapUrl: mapsUrl("명동교자 본점 서울 중구 명동") },
          ],
        },
        {
          heading: "聖水",
          body: "2號線聖水站",
          spots: [
            { name: "조조칼국수 성수점（朝朝刀削麵）", note: "聖水站2號出口步行2分鐘・蛤蜊刀切麵", sponsored: false, mapUrl: mapsUrl("조조칼국수 성수점 서울 성동구 성수일로8길 55") },
            { name: "능동미나리 성수점（陵洞水芹菜）", note: "聖水站4號出口步行5分鐘・牛骨湯", sponsored: false, mapUrl: mapsUrl("능동미나리 성수점 서울 성동구 연무장길 42") },
            { name: "꿉당 성수점", note: "聖水站步行5分鐘・烤豬肉・療程後不久，最好避開油膩的燒烤", sponsored: false, mapUrl: mapsUrl("꿉당 성수점 서울 성동구 성수이로20길 10") },
            { name: "성수다락", note: "聖水站步行11分鐘・蛋包飯", sponsored: false, mapUrl: mapsUrl("성수다락 서울 성동구 뚝섬로9길 20") },
          ],
        },
        {
          heading: "小提醒",
          body: "熱門店家可能要排隊很久，營業時間和公休日也常有變動。造訪前請先在地圖上確認。以上資訊與店家沒有任何合作或贊助關係。步行時間以 Kakao 地圖步行路線為準。",
        },
      ],
    },
    {
      slug: "itinerary",
      ready: true,
      lastChecked: "2026-10-21",
      title: "療程＋旅遊 4天3夜",
      summary: "考量恢復期的行程範例",
      sections: [
        {
          heading: "第1天・抵達",
          items: ["入住住宿", "簡單吃個晚餐、休息", "確認隔天的看診時間"],
        },
        {
          heading: "第2天・看診與療程",
          items: ["經醫師看診後進行療程", "在藥局準備術後修護包", "安排不勉強的室內行程"],
        },
        {
          heading: "第3天・輕鬆觀光",
          items: ["以購物中心、美術館等室內行程為主", "確實做好防曬", "需要時回診"],
        },
        {
          heading: "第4天・回國",
          items: ["免稅店購物", "回國後有問題，請透過LINE詢問"],
        },
        {
          heading: "請務必確認",
          body: "每種療程的恢復期都不同。需要配合回國日期安排療程時間，請在預約前先透過諮詢確認。",
        },
      ],
    },
  ],

  clinics: [
    {
      slug: "zerolab",
      name: "제로랩의원",
      formerName: "샤인빔의원 홍대",
      area: "弘大",
      address: "서울 마포구 양화로 151 욱도빌딩 5~7층",
      station: "弘大入口站1號出口",
      phone: "1544-5598",
      homepage: "http://zerolabclinic.com",
      languages: "中文（簡體・繁體）、英文、日文、泰文介紹頁面",
      links: [{ label: "Instagram", url: "https://www.instagram.com/zerolabclinic_global/" }],
    },
    {
      slug: "diore",
      name: "디오레의원",
      area: "江南站・新論峴",
      address: "서울 강남구 강남대로 428 만이빌딩 9층",
      station: "新論峴站6號出口・江南站11號出口步行5分鐘",
      phone: "02-553-5533",
      homepage: "https://dioreclinic.com/ko",
      languages: "英文、日文、中文、泰文官網",
      links: [{ label: "Instagram", url: "https://www.instagram.com/diore_clinic_eng/" }],
    },
    {
      slug: "baid",
      name: "베이드의원",
      area: "狎鷗亭・新沙",
      address: "서울 강남구 논현로 839 서원식스 4층",
      station: "狎鷗亭站4號出口步行2分鐘",
      phone: "02-511-1985",
      homepage: "https://www.baidclinic.com",
      languages: "外語服務範圍於諮詢時說明",
      links: [{ label: "Instagram", url: "https://www.instagram.com/baidclinic_kor/" }],
    },
    {
      slug: "schedule",
      name: "스케줄의원",
      area: "狎鷗亭羅德奧・島山公園",
      address: "서울 강남구 도산대로49길 11 IVY빌딩 3층",
      station: "狎鷗亭羅德奧站5號出口",
      phone: "02-511-7773",
      homepage: "http://scheduleclinic.kr",
      languages: "外語服務範圍於諮詢時說明",
      links: [{ label: "Instagram", url: "https://www.instagram.com/schedule_clinic/" }],
    },
  ],

  clinicPage: {
    title: "合作診所",
    intro: "我們會在諮詢時，依您的困擾和行程介紹合適的診所。看診時間與療程資訊可在各診所官網查看。",
    address: "地址",
    station: "最近車站",
    phone: "電話",
    languages: "外語服務",
    homepage: "診所官網",
    map: "在地圖上查看",
    formerName: "原名",
    detailNote: "看診時間、療程資訊以診所官網為準，可能會有變動。造訪前會在諮詢時再次為您確認。",
    consultInterest: "希望前往的診所",
  },

  faq: [
    {
      q: "諮詢真的免費嗎？",
      a: "是的，LINE諮詢免費。療程費用依診所與療程而不同，會在諮詢時說明。",
    },
    {
      q: "會介紹哪些診所？",
      a: "會從合作診所中，介紹適合您困擾和行程的診所。",
    },
    {
      q: "不會韓文也沒關係嗎？",
      a: "沒關係。看診口譯和預約代辦都免費協助。",
    },
    {
      q: "免費口譯與預約代辦，每個人都能使用嗎？",
      a: "適用對象為未加入韓國健保、無韓國外國人登錄的短期訪客。諮詢時會簡單確認。",
    },
    {
      q: "要怎麼付款？",
      a: "付款方式與時間依診所而不同，會在諮詢時說明。",
    },
    {
      q: "回國後如果出現問題怎麼辦？",
      a: "請透過LINE詢問，我們會協助聯繫您看診的診所。（術後照護範圍待確認）",
    },
    {
      q: "肌膚分析結果可以當作診斷嗎？",
      a: "不行。肌膚分析結果僅供參考，並非診斷。實際狀態需經醫師看診確認。",
    },
  ],
};

export default zhTW;
