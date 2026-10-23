import { mapsUrl, type SiteContent } from "./index";

// ko.ts의 번체(대만) 번역입니다. 구조·순서·slug·URL은 ko.ts와 같아야 합니다.
// 의원 이름·주소는 한국어 그대로 둡니다(택시·지도 검색용).
const ASK = "諮詢時說明";

const zhTW: SiteContent = {
  ui: {
    brand: "ZeroLab",
    draftNotice: "範例內容・尚未經醫師審閱",
    consultCta: "透過LINE諮詢診所",
    consultBar: "LINE諮詢",
    scanCta: "開始線上肌膚分析",
    scanBar: "線上肌膚分析",
    comingSoon: "準備中",
    seeAll: "查看全部",
    adLabel: "廣告",
    spotBadges: { visited: "親自造訪", hot: "人氣名店" },
    aiPersonLabel: "AI生成虛擬人物",
    aiPageNotice: "本頁含有AI生成的虛擬人物照片。",
    languageLabel: "語言",
    nav: { treatments: "療程", guide: "周邊指南" },
    consultMessage: {
      title: "【肌膚分析諮詢申請】",
      interest: "感興趣的療程",
      topic: "想詢問的內容",
      concern: "肌膚困擾",
    },
  },

  home: {
    eyebrow: "ZeroLab診所 線上肌膚分析",
    heading: "診所打造的\n線上肌膚分析，\n先來試試看。",
    subheading: "用一張照片查看色斑與皺紋狀態，再帶著精密分析報告諮詢ZeroLab診所。結果僅供參考，並非診斷。",
    chips: ["線上肌膚分析", "精密分析報告", "帶著報告諮詢診所"],
    marquee: ["皮秒雷射", "水光針", "音波拉提", "電波拉提", "飛梭雷射", "痘痘療程", "血管雷射"],
    quote: "分析在線上，\n診斷在診所。",
    quoteBy: "是否接受療程，請在院長看診後自行決定。",
    concernsTitle: "您有哪些肌膚困擾？",
    treatmentsTitle: "熱門療程",
    stepsTitle: "服務流程",
    guideTitle: "弘大周邊 & 首爾旅遊指南",
    clinicTitle: "診所資訊",
    faqTitle: "常見問題",
    finalTitle: "想在診所仔細看看自己的肌膚嗎？",
    finalBody: "先用線上分析確認，再帶著報告透過LINE諮詢。",
  },

  concernPage: {
    causes: "為什麼會出現？",
    treatments: "在診所會這樣處理",
    homeCare: "日常保養這樣做",
    scanTitle: "想了解自己的肌膚狀態？",
    scanBody: "用一張照片輕鬆看看肌膚狀態。照片只會在您的裝置上分析。",
  },

  treatmentPage: {
    indexTitle: "療程介紹",
    indexIntro: "依肌膚困擾整理了常見的療程。適合的療程會在院長看診後決定。",
    relatedConcerns: "適合這些困擾",
    forWhom: "適合這樣的人",
    facts: "重點整理",
    cautions: "注意事項",
    faq: "常見問題",
    related: "相關療程",
  },

  guidePage: {
    title: "弘大周邊 & 首爾旅遊指南",
    intro: "整理了ZeroLab診所周邊值得順道一去的地方，以及首爾代表性的旅遊景點。",
    lastChecked: "最後確認日期",
    sponsoredNote: "有合作或贊助的店家會標示「廣告」。",
  },

  footer: {
    company: "ZeroLab診所（제로랩의원）",
    registration: "代表院長 Kim Dongwon・서울 마포구 양화로 151 욱도빌딩 5~7층・代表電話 1544-5598",
    disclaimer:
      "線上肌膚分析僅供參考，並非醫學診斷或處方。肌膚狀態與是否接受療程，請在到診所看診、與院長諮詢後再決定。",
    aiNotice:
      "本網站的照片皆為AI生成圖像，並非真實人物或療程結果。肌膚分析分數為AI計算的參考資訊。",
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
    { title: "線上肌膚分析", body: "用一張照片查看色斑與皺紋狀態。" },
    { title: "精密分析報告", body: "透過放大拍攝，連毛孔都仔細查看，並取得分析報告。" },
    { title: "透過LINE諮詢報告", body: "傳送報告後，我們會在諮詢時間（韓國時間10:00～18:00）內回覆您。" },
    { title: "預約後到診", body: "依您的行程前往ZeroLab診所。" },
    { title: "看診後決定", body: "經院長看診後，再決定是否接受療程。" },
  ],

  guides: [
    {
      slug: "attractions",
      ready: true,
      lastChecked: "2026-10-23",
      title: "首爾熱門景點",
      summary: "從弘大入口站搭地鐵就能輕鬆抵達的首爾代表性景點",
      sections: [
        {
          heading: "從弘大入口站出發",
          body: "所需時間以 Kakao 地圖大眾運輸路線為準，可能因時段而不同。",
          spots: [
            { name: "동대문디자인플라자(DDP)（東大門設計廣場）", note: "東大門歷史文化公園站（2、4、5號線）・約17分鐘・搭2號線直達・設計地標與購物", sponsored: false, mapUrl: mapsUrl("동대문디자인플라자") },
            { name: "북촌한옥마을·인사동（北村韓屋村・仁寺洞）", note: "安國站（3號線）・約19分鐘・韓屋巷弄與傳統工藝街", sponsored: false, mapUrl: mapsUrl("북촌한옥마을") },
            { name: "경복궁（景福宮）", note: "景福宮站（3號線）・約21分鐘・朝鮮王朝的正宮，韓服體驗熱門地點", sponsored: false, mapUrl: mapsUrl("경복궁") },
            { name: "명동（明洞）", note: "明洞站（4號線）・約22分鐘・購物與街頭小吃", sponsored: false, mapUrl: mapsUrl("명동") },
            { name: "여의도한강공원（汝矣島漢江公園）", note: "汝矣渡口站（5號線）・約25分鐘・漢江野餐與夜景", sponsored: false, mapUrl: mapsUrl("여의도한강공원") },
            { name: "성수동（聖水洞）", note: "聖水站（2號線）・約28分鐘・搭2號線直達・快閃店與咖啡街", sponsored: false, mapUrl: mapsUrl("성수동 카페거리") },
            { name: "N서울타워（N首爾塔）", note: "從明洞站往南山方向・約37分鐘・首爾觀景地標", sponsored: false, mapUrl: mapsUrl("N서울타워") },
            { name: "롯데월드타워·롯데월드（樂天世界塔・樂天世界）", note: "蠶室站（2、8號線）・約39分鐘・搭2號線直達・觀景台與主題樂園", sponsored: false, mapUrl: mapsUrl("롯데월드타워") },
          ],
        },
        {
          heading: "搭配療程行程時",
          body: "依療程種類，可能會出現泛紅或腫脹。療程剛結束時以室內行程為主，並請務必做好防曬。行程會在諮詢時一起為您安排。",
        },
      ],
    },
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-23",
      title: "診所周邊藥局",
      summary: "從ZeroLab診所步行可到的藥局",
      sections: [
        {
          heading: "術後修護包",
          body: "新產品在院長同意後再使用比較安全。",
          items: [
            "防曬乳 — 雷射療程後必備",
            "鎮定・保濕霜 — 選擇香料少、刺激性低的產品",
            "溫和的洗面產品 — 不需搓揉就能洗淨的",
            "帽子・陽傘 — 療程後有戶外行程時",
          ],
        },
        {
          heading: "步行10分鐘內",
          body: "步行時間以ZeroLab診所為起點。",
          spots: [
            { name: "홍익약국", note: "步行約5分鐘・外國客人多・經藥師諮詢後販售醫學美容保養品", sponsored: false, mapUrl: mapsUrl("홍익약국 서울 마포구 양화로18길 7") },
            { name: "홍대 베리뉴약국", note: "步行約5分鐘", sponsored: false, mapUrl: mapsUrl("홍대 베리뉴약국 서울 마포구 양화로18길 12") },
            { name: "광명약국", note: "步行約7分鐘", sponsored: false, mapUrl: mapsUrl("광명약국 서울 마포구 양화로 191") },
            { name: "연남약국", note: "步行約7分鐘・延南洞方向", sponsored: false, mapUrl: mapsUrl("연남약국 서울 마포구 양화로21길 31") },
            { name: "홍익플라자약국", note: "步行約8分鐘", sponsored: false, mapUrl: mapsUrl("홍익플라자약국 서울 마포구 양화로 192") },
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
          body: "是否可退稅與營業時間可能因店家情況而變動。造訪前請先在地圖上確認，辦理退稅請務必攜帶護照。以上資訊與店家沒有任何合作或贊助關係。步行時間以 Kakao 地圖步行路線為準。",
        },
      ],
    },
    {
      slug: "food",
      ready: true,
      lastChecked: "2026-10-23",
      title: "診所周邊美食",
      summary: "合井・弘大入口・無業配推薦餐廳",
      sections: [
        {
          heading: "療程剛結束時這樣做",
          body: "依療程種類而不同，請優先遵照院長的指示。",
          items: [
            "在院長說可以之前，請避免飲酒。",
            "三溫暖、汗蒸幕等會讓身體發熱的地方，請先延後。",
            "很辣或很燙的食物，可能讓臉部發熱泛紅。",
          ],
        },
        {
          heading: "合井・弘大入口",
          body: "2、6號線合井站・2號線弘大入口站",
          spots: [
            { name: "합정옥", note: "合井站8號出口步行4分鐘・牛骨湯・湯頭清淡", sponsored: false, mapUrl: mapsUrl("합정옥 서울 마포구 양화로1길 21") },
            { name: "옥동식 서교점（玉東植）", note: "合井站2號出口步行5分鐘・豬肉清湯飯・湯頭清爽，療程後吃也沒負擔・座位少，可能需要排隊", sponsored: false, badges: ["hot"], mapUrl: mapsUrl("옥동식 서교점 서울 마포구 양화로7길 44-10") },
            { name: "진진", note: "合井站2號出口步行7分鐘・中式料理・療程後不久請避開辣的菜色・可預約", sponsored: false, mapUrl: mapsUrl("진진 서울 마포구 월드컵북로1길 60") },
            { name: "백년토종삼계탕 본점（百年土種蔘雞湯）", note: "弘大入口站9號出口步行7分鐘・蔘雞湯", sponsored: false, mapUrl: mapsUrl("백년토종삼계탕 본점 서울 마포구 양화로 118") },
            { name: "서교난면방", note: "望遠站步行7分鐘・韓國本土小麥麵", sponsored: false, mapUrl: mapsUrl("서교난면방 서울 마포구 동교로12길 16") },
          ],
        },
        {
          heading: "小提醒",
          body: "「親自造訪」是我們親自去過的店家，「人氣名店」是排隊人潮很長的熱門餐廳。營業時間和公休日常有變動，造訪前請先在地圖上確認。以上資訊與店家沒有任何合作或贊助關係。步行時間以 Kakao 地圖步行路線為準。",
        },
      ],
    },
    {
      slug: "cosmetics",
      ready: true,
      lastChecked: "2026-10-23",
      title: "周邊美妝店",
      summary: "從ZeroLab診所步行可到的美妝門市",
      sections: [
        {
          heading: "步行10分鐘內",
          body: "步行時間以ZeroLab診所為起點。",
          spots: [
            { name: "올리브영 홍대입구역점", note: "步行約4分鐘・美妝藥妝店", sponsored: false, mapUrl: mapsUrl("올리브영 홍대입구역점 서울 마포구 양화로 156") },
            { name: "메디큐브 홍대", note: "步行約5分鐘・保養品品牌門市", sponsored: false, mapUrl: mapsUrl("메디큐브 홍대 서울 마포구 홍익로6길 27") },
            { name: "다이소 홍대입구점", note: "步行約6分鐘・生活用品・平價保養品", sponsored: false, mapUrl: mapsUrl("다이소 홍대입구점 서울 마포구 홍익로 25") },
            { name: "무신사 뷰티 홍대", note: "步行約6分鐘・美妝選品店", sponsored: false, mapUrl: mapsUrl("무신사 뷰티 홍대 서울 마포구 홍익로 18") },
            { name: "올리브영 홍대정문점", note: "步行約9分鐘・美妝藥妝店", sponsored: false, mapUrl: mapsUrl("올리브영 홍대정문점 서울 마포구 홍익로 4") },
          ],
        },
        {
          heading: "熱門購買品項",
          items: [
            "防曬乳 — 種類多，很多質地輕薄好推開",
            "片狀面膜 — 也很適合當伴手禮",
            "鎮定霜 — 有很多敏感肌適用的產品",
            "卸妝油・洗面乳",
          ],
        },
        {
          heading: "購買小提醒",
          items: [
            "療程剛結束時，不要立刻使用新產品，請先詢問院長。",
            "是否能辦理外國人退稅，請在店內確認。",
          ],
        },
      ],
    },
    {
      slug: "shopping",
      ready: true,
      lastChecked: "2026-10-23",
      title: "周邊購物景點",
      summary: "弘大・延南・合井適合散步逛街的購物街區",
      sections: [
        {
          heading: "離診所很近",
          body: "步行時間以ZeroLab診所為起點。",
          spots: [
            { name: "홍대 걷고싶은거리", note: "步行約7分鐘・弘大代表性的步行街，街頭表演與商店街", sponsored: false, mapUrl: mapsUrl("홍대 걷고싶은거리") },
            { name: "경의선숲길 (연남동)", note: "步行約7分鐘・由舊鐵道改建的散步道，一路連到延南洞的咖啡廳與雜貨小店", sponsored: false, mapUrl: mapsUrl("경의선숲길 연남동") },
            { name: "AK플라자 홍대", note: "步行約8分鐘・與弘大入口站相連的購物中心", sponsored: false, mapUrl: mapsUrl("AK플라자 홍대 서울 마포구 양화로 188") },
            { name: "메세나폴리스몰", note: "合井站・地鐵一站・複合式購物中心", sponsored: false, mapUrl: mapsUrl("메세나폴리스몰 서울 마포구 양화로 45") },
          ],
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
  ],

  clinicPage: {
    title: "診所資訊",
    intro: "看診時間與療程資訊可在ZeroLab診所官網查看。",
    address: "地址",
    station: "最近車站",
    phone: "電話",
    languages: "外語介紹",
    homepage: "診所官網",
    map: "在地圖上查看",
    formerName: "原名",
    detailNote: "看診時間、療程資訊以診所官網為準，可能會有變動。造訪前會在諮詢時再次為您確認。",
    consultInterest: "希望前往的診所",
  },

  faq: [
    {
      q: "線上肌膚分析是免費的嗎？",
      a: "是的，線上分析與精密分析報告都免費。療程費用依療程而不同，會在諮詢時說明。",
    },
    {
      q: "可以用分析結果當作診斷嗎？",
      a: "不行。線上分析僅供參考，並非診斷。實際狀態需到診所由院長看診確認。",
    },
    {
      q: "LINE諮詢什麼時候會回覆？",
      a: "諮詢時間為韓國時間10:00～18:00。其他時段留下的詢問，會在隔天依序回覆。",
    },
    {
      q: "不會韓文也沒關係嗎？",
      a: "外語服務範圍會在諮詢時說明。",
    },
    {
      q: "要怎麼付款？",
      a: "付款方式與時間會在諮詢時說明。",
    },
    {
      q: "回國後如果出現問題怎麼辦？",
      a: "請透過LINE詢問。（術後照護範圍待確認）",
    },
  ],
};

export default zhTW;
